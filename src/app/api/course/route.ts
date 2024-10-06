import { NextResponse } from 'next/server';
import { PrismaClient } from "@prisma/client";
import { Course, Chapter, Content } from '@/types/resource'; // Adjust import path based on your file structure

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const body: Course = await req.json();
    const { id, title, description, image, chapters } = body;

    // Validate the received data
    if (!title || !description || !image || !chapters || chapters.length === 0) {
      return NextResponse.json({ error: 'Missing required course fields' }, { status: 400 });
    }

    // Ensure each chapter has at least one content
    const invalidChapter = chapters.some((chapter: Chapter) => chapter.contents.length === 0);
    if (invalidChapter) {
      return NextResponse.json({ error: 'Each chapter must have at least one content' }, { status: 400 });
    }

    // If `id` is provided, update the existing course
    if (id) {
      const updatedCourse = await prisma.courses.update({
        where: { id },
        data: {
          title,
          description,
          image,
          chapters: {
            // Update or create chapters
            upsert: chapters.map((chapter: Chapter) => ({
              where: { id: chapter.id ? chapter.id : 0 },  // If `chapter.id` exists, update it
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
                  // Update or create contents within the chapter
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