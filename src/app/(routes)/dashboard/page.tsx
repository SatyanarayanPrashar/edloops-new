import Link from 'next/link';
import { CgAdd } from "react-icons/cg";
import { prisma } from '@/lib/prisma';

export default async function DashBoard() {
  // Fetch all courses once
  const allCourses = await prisma.courses.findMany();

  // Segregate courses into published and unpublished (created)
  const publishedCourses = allCourses.filter(course => course.published);
  const createdCourses = allCourses.filter(course => !course.published);

  return (
    <div className="flex flex-col px-7 gap-7 w-[100%] text-[#eceef8]">
      {/* Created Courses Section */}
      <div className="flex gap-4">
        {createdCourses.map(course => (
            <div key={course.id} className="w-[16rem] overflow-hidden">
                <Link href={`/course/${course.id}`}>
                    <img src={course.image || "default-course.jpg"} className="h-[10rem] w-full object-cover border-[1px] rounded-lg " />
                    <p className="mt-2">{course.title}</p>
                </Link>
            </div>
          )
        )}
        <Link href={'/create-course'}  className="h-[10rem] w-[16rem] flex flex-col justify-center items-center border-dashed border-[#eceef8] border-[1px] rounded-lg">
            <CgAdd size={24} />
            Create Course
        </Link>
      </div>

      {/* Explore Courses Section */}
      <h1 className='text-[1.5rem]'>Explore Courses</h1>
      <div className="flex gap-4">
        {publishedCourses.map(course => (
          <div key={course.id} className="w-[16rem] overflow-hidden">
            <Link href={`/course/${course.id}`}>
                <img src={course.image || "default-course.jpg"} className="h-[10rem] w-full object-cover border-[1px] rounded-lg " />
                <p className="mt-2">{course.title}</p>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
