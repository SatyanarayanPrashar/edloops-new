import { prisma } from "@/lib/prisma";
import { Course } from "@/types/resource";

export async function fetchCourseData(courseId: number): Promise<Course | null> {
  const course = await prisma.courses.findUnique({
    where: { id: courseId },
    include: {
      chapters: {
        include: {
          contents: true
        }
      },
      creator: {
        select: {
          id: true,
          name: true,
          email: true,
          image: true
        }
      }
    }
  });

  if (!course) {
    return null; // Or handle the error as necessary
  }

  // Structure the object according to the Course interface
  const courseData: Course = {
    id: course.id,
    createdAt: course.createdAt,
    updatedAt: course.updatedAt,
    published: course.published,
    title: course.title,
    description: course.description,
    image: course.image,
    chapters: course.chapters.map((chapter) => ({
      id: chapter.id,
      title: chapter.title,
      description: chapter.description,
      courseId: chapter.courseId,
      contents: chapter.contents.map((content) => ({
        id: content.id,
        url: content.url,
        title: content.title,
        description: content.description,
        start: content.start ?? -1,
        end: content.end ?? -1,
        chapterId: content.chapterId
      }))
    })),
    creator: {
      id: course.creator.id,
      name: course.creator.name,
      email: course.creator.email,
      image: course.creator.image || ""
    } ,
    creatorId: course.creatorId,
    students: []
  };

  return courseData;
}
