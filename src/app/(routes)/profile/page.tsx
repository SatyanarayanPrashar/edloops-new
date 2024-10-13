import Button from "@/app/components/button";
import { authOptions } from "@/lib/authOptions";
import { prisma } from "@/lib/prisma";
import { getServerSession } from 'next-auth';
import Link from "next/link";
import { redirect } from 'next/navigation';
import { BiEdit } from "react-icons/bi";
import { CgAdd } from "react-icons/cg";


export default async function Profile() {
    const session = await getServerSession(authOptions);

    // Redirect to the login page if no session exists
    if (!session) {
        return redirect('/auth/login');
    }

    // Fetch the user profile and courses data from the server
    const user = await prisma.user.findUnique({
        where: { email: session.user?.email || '' },
        include: {
            createdCourses: true,
            enrolledCourses: {
                include: {
                    course: true,
                },
            },
        },
    });

    return (
        <div className="flex px-7 gap-7 w-[100%] h-full">
            <div className="flex flex-col gap-2 w-full">
                <p className="text-slate-300">My Courses</p>
                {user?.createdCourses?.length && user.createdCourses.length > 0 && (
                    <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
                        {user.createdCourses.map(course => (
                            <div key={course.id} className="relative overflow-hidden w-full">
                                <Link href={`/course/${course.id}`}>
                                    <div className="relative w-full pb-[56.25%]">
                                        <img src={course.image || "default-course.jpg"}
                                            className="absolute inset-0 h-full w-full object-cover border-[1px] rounded-lg" />
                                    </div>
                                    <p className="mt-2">{course.title}</p>
                                </Link>
                                <Button label={""} href={`/create-course/edit/${course.id}`} classname="absolute top-1 right-3 hover:bg-[#20232D] bg-[#20232D]/20 text-white/40 hover:text-white/80 border-[1px] border-[#20232D]"> <BiEdit /> </Button>
                            </div>
                        ))}
                        <Link href={'/create-course'} className="relative flex flex-col justify-center items-center border-dashed border-[#eceef8] mb-20 border-[1px] rounded-lg w-full">
                            <div className="relative w-full pb-[56.25%]">
                                <div className="absolute inset-0 flex justify-center items-center">
                                    <CgAdd size={24} />
                                    Create Course
                                </div>
                            </div>
                        </Link>
                    </div>
                )}
                <p className="text-slate-300 mt-10">Enrolled Courses</p>
                {user?.enrolledCourses?.length && user?.enrolledCourses?.length > 0 && (
                    <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
                        {user.enrolledCourses.map(({ course }) => (
                            <div key={course.id} className="relative overflow-hidden w-full">
                                <Link href={`/course/${course.id}`}>
                                    {/* Aspect ratio 7:12 */}
                                    <div className="relative w-full pb-[56.25%]">
                                        <img src={course.image || "default-enrolled.jpg"}
                                            className="absolute inset-0 h-full w-full object-cover border-[1px] rounded-lg" />
                                    </div>
                                </Link>
                                    <p className="mt-2">{course.title}</p>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
