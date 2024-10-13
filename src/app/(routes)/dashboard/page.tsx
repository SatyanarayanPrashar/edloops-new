import Link from 'next/link';
import { CgAdd } from "react-icons/cg";
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from "@/lib/authOptions";

export default async function DashBoard() {
  const session = await getServerSession(authOptions);

  const allCourses = await prisma.courses.findMany();
  // const publishedCourses = allCourses.filter(course => course.creatorId === Number(session?.user.id));
  // const createdCourses = allCourses.filter(course => !course.published );

  // const repeatedCourses = Array(20).fill(allCourses).flat(); to test grid

  return (
    <div className="flex flex-col px-7 w-[100%] text-[#eceef8]">
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
        <Link href={'/create-course'} className="relative flex flex-col justify-center items-center border-dashed border-[#eceef8] mb-10 border-[1px] rounded-lg w-full">
          <div className="relative w-full pb-[56.25%]"> 
            <div className="absolute inset-0 flex justify-center items-center">
              <CgAdd size={24} />
              Create Course
            </div>
          </div>
        </Link>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {allCourses.map(course => (
          <div key={course.id} className="relative overflow-hidden w-full">
            <Link href={`/course/${course.id}`}>
              <div className="relative w-full pb-[56.25%]"> 
                <img src={course.image || "default-course.jpg"} 
                    className="absolute inset-0 h-full w-full object-cover border-[1px] rounded-lg" />
              </div>
              <p className="mt-2">{course.title}</p>
            </Link>
          </div>
        ))}
      </div>

      {/* Explore Courses Section */}
      {/* <h1 className='text-[1.5rem]'>Explore Courses</h1>
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {publishedCourses.map(course => (
          <div key={course.id} className="relative overflow-hidden w-full">
            <Link href={`/course/${course.id}`}>
              <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
                <img src={course.image || "default-course.jpg"} 
                    className="absolute inset-0 h-full w-full object-cover border-[1px] rounded-lg" />
              </div>
              <p className="mt-2">{course.title}</p>
            </Link>
          </div>
        ))}
      </div> */}

    </div>
  );
}
