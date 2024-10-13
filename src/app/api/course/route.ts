import { NextResponse } from 'next/server';
import { PrismaClient } from "@prisma/client";
import { Course, Chapter, Content } from '@/types/resource';

const prisma = new PrismaClient();

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');

  if (!id) {
    return NextResponse.json({ error: 'Course ID is required' }, { status: 400 });
  }

  try {
    const course = await prisma.courses.findUnique({
      where: {
        id: Number(id),
      },
      include: {
        chapters: {
          include: {
            contents: true, 
          },
        },
      },
    });

    if (!course) {
      return NextResponse.json({ error: 'Course not found' }, { status: 404 });
    }

    return NextResponse.json(course, { status: 200 });
  } catch (error) {
    console.error('Error retrieving course:', error);
    return NextResponse.json({ error: 'Failed to retrieve the course' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body: Course = await req.json();
    const { id, title, description, image, chapters, creatorId } = body;

    if (!title || !description || !image || !chapters || chapters.length === 0) {
      return NextResponse.json({ error: 'Missing required course fields' }, { status: 400 });
    }

    const invalidChapter = chapters.some((chapter: Chapter) => chapter.contents.length === 0);
    if (invalidChapter) {
      return NextResponse.json({ error: 'Each chapter must have at least one content' }, { status: 400 });
    }

    if (!creatorId) {
      return NextResponse.json({ error: 'Missing creatorId' }, { status: 400 });
    }

    // If `id` is provided, update the existing course
    if (id) {
      const existingCourse = await prisma.courses.findUnique({
        where: { id },
        include: {
          chapters: {
            include: {
              contents: true,
            },
          },
        },
      });

      if (!existingCourse) {
        return NextResponse.json({ error: 'Course not found' }, { status: 404 });
      }

      // Find chapters to delete (that are in the database but not in the update request)
      const chaptersToDelete = existingCourse.chapters.filter(
        (existingChapter) => !chapters.some((chapter) => chapter.id === existingChapter.id)
      );

      // Find contents to delete within updated chapters
      const contentsToDelete = chapters.flatMap((chapter) => {
        const existingChapter = existingCourse.chapters.find((ch) => ch.id === chapter.id);
        if (!existingChapter) return [];
        return existingChapter.contents.filter(
          (existingContent) => !chapter.contents.some((content) => content.id === existingContent.id)
        );
      });

      // Delete chapters and contents
      await prisma.$transaction(async (prisma) => {
        // Delete contents first within the filtered chapters
        await prisma.content.deleteMany({
          where: {
            id: {
              in: contentsToDelete.map((content) => content.id),
            },
          },
        });
      
        // Then delete the chapters
        await prisma.chapters.deleteMany({
          where: {
            id: {
              in: chaptersToDelete.map((chapter) => chapter.id),
            },
          },
        });
      });      

      // Now update or create chapters and contents
      const updatedCourse = await prisma.courses.update({
        where: { id },
        data: {
          title,
          description,
          image,
          chapters: {
            upsert: chapters.map((chapter: Chapter) => ({
              where: { id: chapter.id || 0 },
              create: {
                title: chapter.title,
                description: chapter.description,
                contents: {
                  create: chapter.contents.map((content: Content) => ({
                    title: content.title,
                    description: content.description,
                    url: content.url,
                    start: content.start || -1,
                    end: content.end || -1,
                  })),
                },
              },
              update: {
                title: chapter.title,
                description: chapter.description,
                contents: {
                  upsert: chapter.contents.map((content: Content) => ({
                    where: { id: content.id || 0 },
                    create: {
                      title: content.title,
                      description: content.description,
                      url: content.url,
                      start: content.start || -1,
                      end: content.end || -1,
                    },
                    update: {
                      title: content.title,
                      description: content.description,
                      url: content.url,
                      start: content.start || -1,
                      end: content.end || -1,
                    },
                  })),
                },
              },
            })),
          },
        },
        include: {
          chapters: {
            include: {
              contents: true,
            },
          },
        },
      });

      return NextResponse.json({ success: true, course: updatedCourse }, { status: 200 });
    }

    // If no `id` is provided, create a new course
    const createdCourse = await prisma.courses.create({
      data: {
        title,
        description,
        image,
        chapters: {
          create: chapters.map((chapter: Chapter) => ({
            title: chapter.title,
            description: chapter.description,
            contents: {
              create: chapter.contents.map((content: Content) => ({
                title: content.title,
                description: content.description,
                url: content.url,
                start: content.start || -1,
                end: content.end || -1,
              })),
            },
          })),
        },
        creatorId
      },
      include: {
        chapters: {
          include: {
            contents: true,
          },
        },
      },
    });

    return NextResponse.json({ success: true, course: createdCourse }, { status: 201 });
  } catch (error) {
    console.error('Error handling course request:', error);
    return NextResponse.json({ error: 'Failed to handle course request' }, { status: 500 });
  }
}
