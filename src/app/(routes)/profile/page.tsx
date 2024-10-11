import { authOptions } from "@/lib/authOptions";
import { prisma } from "@/lib/prisma";
import { getServerSession } from 'next-auth';
import Link from "next/link";
import { redirect } from 'next/navigation';
import { CgAdd } from "react-icons/cg";


export default async function Profile() {
    const session = await getServerSession(authOptions);

    // Redirect to the login page if no session exists
    if (!session) {
        return redirect('/api/auth/signin');
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
            <div className="flex flex-col gap-2 w-[75%]">
                <p className="text-slate-300">My Courses</p>
                <div className="flex gap-4">
                    {user?.createdCourses?.length && user?.createdCourses?.length > 0 && (
                        user.createdCourses.map(course => (
                            <div key={course.id} className="w-[16rem] overflow-hidden">
                                <Link href={`/course/${course.id}`}>
                                    <img src={course.image || "default-course.jpg"} className="h-[10rem] w-full object-cover border-[1px] rounded-lg " />
                                    <p className="mt-2">{course.title}</p>
                                </Link>
                            </div>
                        ))
                    )}
                    <Link href={'/create-course'}  className="h-[10rem] w-[16rem] flex flex-col justify-center items-center border-dashed border-[#eceef8] border-[1px] rounded-lg">
                        <CgAdd size={24} />
                        Create Course
                    </Link>
                </div>
                <>
                    <p className="text-slate-300 mt-10">Enrolled Courses</p>
                    {user?.enrolledCourses?.length && user?.enrolledCourses?.length > 0 ? (
                        user.enrolledCourses.map(({ course }) => (
                            <div key={course.id} className="h-[7rem] w-[12rem] border-[1px] rounded-lg overflow-hidden">
                                <Link href={`/course/${course.id}`}>
                                    <img src={course.image || "default-enrolled.jpg"} className="h-full w-full object-cover" />
                                    <p className="mt-2">{course.title}</p>
                                </Link>
                            </div>
                        ))
                    ) : (
                        <p>Not enrolled in any courses</p>
                    )}
                </>
            </div>
        </div>
    );
}
