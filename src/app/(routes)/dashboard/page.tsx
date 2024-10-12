import Link from 'next/link';
import { CgAdd } from "react-icons/cg";
import { prisma } from '@/lib/prisma';

export default async function DashBoard() {
  const allCourses = await prisma.courses.findMany();

  // Segregate courses into published and unpublished (created)
  const publishedCourses = allCourses.filter(course => course.published);
  const createdCourses = allCourses.filter(course => !course.published);

  return (
    <div className="flex flex-col px-7 gap-7 w-[100%] text-[#eceef8]">
      {/* Created Courses Section */}
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {createdCourses.map(course => (
          <div key={course.id} className="relative overflow-hidden w-full">
            <Link href={`/course/${course.id}`}>
              {/* Aspect ratio 16:9 for maintaining width-to-height ratio */}
              <div className="relative w-full" style={{ paddingBottom: '56.25%' }}> 
                <img src={course.image || "default-course.jpg"} 
                    className="absolute inset-0 h-full w-full object-cover border-[1px] rounded-lg" />
              </div>
              <p className="mt-2">{course.title}</p>
            </Link>
          </div>
        ))}
        <Link href={'/create-course'} className="relative flex flex-col justify-center items-center border-dashed border-[#eceef8] mb-20 border-[1px] rounded-lg w-full">
          {/* Aspect ratio 16:9 */}
          <div className="relative w-full pb-[56.25%]" style={{ paddingBottom: '56.25%' }}> 
            <div className="absolute inset-0 flex justify-center items-center">
              <CgAdd size={24} />
              Create Course
            </div>
          </div>
        </Link>
      </div>

      {/* Explore Courses Section */}
      <h1 className='text-[1.5rem]'>Explore Courses</h1>
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {publishedCourses.map(course => (
          <div key={course.id} className="relative overflow-hidden w-full">
            <Link href={`/course/${course.id}`}>
              {/* Aspect ratio 16:9 */}
              <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
                <img src={course.image || "default-course.jpg"} 
                    className="absolute inset-0 h-full w-full object-cover border-[1px] rounded-lg" />
              </div>
              <p className="mt-2">{course.title}</p>
            </Link>
          </div>
        ))}
      </div>

    </div>
  );
}
