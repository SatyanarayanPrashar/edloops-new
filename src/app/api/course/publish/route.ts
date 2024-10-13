import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(req: Request) {
  const { searchParams } = new URL(req.url);
  const courseId = searchParams.get('id');

  if (!courseId) {
    return NextResponse.json({ error: 'Course ID is required' }, { status: 400 });
  }

  try {
    // Update the course's 'published' field to true
    const updatedCourse = await prisma.courses.update({
      where: { id: Number(courseId) },
      data: { published: true },
    });

    // Return the updated course in the response
    return NextResponse.json({ message: 'Course published successfully', updatedCourse }, { status: 200 });
  } catch (error) {
    console.error('Error publishing course:', error);
    return NextResponse.json({ error: 'Error publishing the course' }, { status: 500 });
  }
}
