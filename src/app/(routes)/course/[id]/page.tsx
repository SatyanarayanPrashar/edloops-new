import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import CourseComponent from '../_components/courseContainer';
import { fetchCourseData } from '@/lib/fetchcourse';
import { authOptions } from '@/lib/authOptions';

export async function generateMetadata({ params }: { params: { id: number } }) {
  const courseId = params.id;
  const courseData = await fetchCourseData(Number(courseId))

  return courseData
}

export default async function CoursePage({ params }: { params: { id: number } }) {
  const session = await getServerSession(authOptions);
  
  if (!session) {
    return redirect('/api/auth/signin');
  }

  const courseId = params.id;
  const courseData = await fetchCourseData(Number(courseId));

  if(courseData){
    return (
      <CourseComponent course={courseData} />
    )
  }else{
    return (
      <div className='text-[1rem]'>
        Somthing went wrong!
      </div>
    )

  }
}
