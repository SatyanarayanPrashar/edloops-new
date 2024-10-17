import Link from 'next/link'
import { CgAdd } from "react-icons/cg"
import { prisma } from '@/lib/prisma'
import { getServerSession } from 'next-auth'
import { authOptions } from "@/lib/authOptions"

export default async function DashBoard() {
  const session = await getServerSession(authOptions)
  const allCourses = await prisma.courses.findMany()

  const repeatedCourses = Array(5).fill(allCourses).flat()

  return (
    <div className=" gap-5 flex flex-col px-7 w-[100%] text-[#eceef8]">
      <div className="relative flex flex-col justify-center items-center border-dashed border-[#eceef8] border-[1px] rounded-lg w-full max-h-60 bg-slate-300/10 overflow-hidden">
          <h2 className="absolute text-white/20 text-[6.5rem] md:text-[7rem] font-bold text-center">
            Confused?
          </h2>
        <img src="documents-dark.png" className='absolute left-0 h-40 opacity-40'/>
        <img src="reading-dark.png" className='absolute right-0 h-40 opacity-40'/>
        <div className="relative w-full pb-[56.25%]">
          <Link href={'/ai-guidance'} className="absolute inset-0 flex justify-center items-center text-xl md:text-xl hover:underline hover:text-blue-300">
            <CgAdd size={24} />
            Get Guidance about what to learn next to be relevant in the industry
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 overflow-hidden" >
        <Link href={'/create-course'} className="relative flex flex-col justify-center items-center border-dashed border-[#eceef8] border-[1px] rounded-lg w-full overflow-hidden hover:underline hover:text-blue-300" >
          <div className="relative w-full pb-[56.25%]" >
            <div className="absolute inset-0 flex justify-center items-center" >
              <CgAdd size={24} />
              Create Course
            </div>
          </div>
        </Link>
        <div  className="relative flex flex-col justify-center items-center border-dashed border-[#eceef8] border-[1px] rounded-lg w-full overflow-hidden">
          <div className="relative w-full pb-[56.25%]">
            <div className="absolute inset-0 flex justify-center items-center">
              <CgAdd size={24} />
              Create Quiz
            </div>
          </div>
        </div>
      </div>

      <h1 className='text-[1.5rem] my-4'>Explore Courses by Others</h1>
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {/* {allCourses.map(course => ( */}
        {repeatedCourses.map(course => (
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
    </div>
  )
}
