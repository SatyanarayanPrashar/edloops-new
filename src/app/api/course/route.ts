import { NextResponse } from 'next/server';
import { PrismaClient } from "@prisma/client";
import { Course, Chapter, Content } from '@/types/resource'; // Adjust import path based on your file structure

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const body: Course = await req.json();

    // Destructure course details from the request body
    const { title, description, image, chapters } = body;

    // Validate the received data
    if (!title || !description || !image || !chapters || chapters.length === 0) {
      return NextResponse.json({ error: 'Missing required course fields' }, { status: 400 });
    }

    // Ensure each chapter has at least one content
    const invalidChapter = chapters.some((chapter: Chapter) => chapter.contents.length === 0);
    if (invalidChapter) {
      return NextResponse.json({ error: 'Each chapter must have at least one content' }, { status: 400 });
    }

    // Create the course in the database
    const createdCourse = await prisma.courses.create({
      data: {
        title,
        description,
        image,
        // creatorId, // Pass the creator ID to link the course
        chapters: {
          create: chapters.map((chapter: Chapter) => ({
            title: chapter.title,
            description: chapter.description,
            contents: {
              create: chapter.contents.map((content: Content) => ({
                title: content.title,
                description: content.description,
                url: content.url,
                start: content.start || -1,  // Set default values for optional fields
                end: content.end || -1
              }))
            }
          }))
        },
      },
      include: {
        chapters: {
          include: {
            contents: true,
          }
        },
      }
    });

    return NextResponse.json({ success: true, course: createdCourse }, { status: 201 });
  } catch (error) {
    console.error('Error creating course:', error);
    return NextResponse.json({ error: 'Failed to create course' }, { status: 500 });
  }
}
