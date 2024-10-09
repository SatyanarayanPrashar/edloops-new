// src/app/(routes)/course/(routes)/[profile]/page.tsx (Server Component)
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from '@/lib/prisma';
import CourseComponent from '../../[components]/courseContainer';


interface Chapter {
  id: number;
  title: string;
  description: string;
}

interface Content {
  id: number;
  url: string;
  title: string;
  description: string;
}

interface CourseProps {
  params: { courseId: string };
}

export default async function CoursePage({ params }: CourseProps) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return redirect('/api/auth/signin');
  }

  const courseId = 1;

  if (isNaN(courseId)) {
    throw new Error(`Invalid courseId: ${params.courseId}`);
  }

  const chapters = await prisma.chapters.findMany({
    where: { courseId },
    include: { contents: true },
  });

  const curriculumData = chapters.map((chapter: { id: any; title: any; description: any; contents: any[]; }) => ({
    id: chapter.id,
    title: chapter.title,
    description: chapter.description,
    contents: chapter.contents.map((content) => ({
      id: content.id,
      title: content.title,
      url: content.url,
      description: content.description,
    })),
  }));

  return (
    <CourseComponent
      courseId={courseId}
      curriculumData={curriculumData}
    />
  );
}
