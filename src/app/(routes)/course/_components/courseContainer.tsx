"use client";

import { useEffect, useState } from "react";
import Chatbox from "./chatbox";
import { Course } from "@/types/resource";
import ChapterList from "./ChapterList";
import Button from "@/app/components/button";
import { Chapter, Enrollment } from "@/types/resource";

interface CourseComponentProps {
  course: Course;
  session: any;
}

export default function CourseComponent({ course, session }: CourseComponentProps) {
  const [isChatOpen, setIsChatOpen] = useState<boolean>(false);
  const [currentContent, setCurrentContent] = useState<[number, number]>([0, 0]);
  const [showDescription, setShowDescription] = useState(false);

  const extractVideoId = (url: string) => {
    try {
      const urlObj = new URL(url);
      const params = new URLSearchParams(urlObj.search);
      return params.get("v") || "";
    } catch (error) {
      console.error("Invalid URL", error);
      return "";
    }
  };
  const videoId = extractVideoId(course.chapters[currentContent[0]].contents[currentContent[1]].url);

  const [enrollments, setEnrollments] = useState<Enrollment[]>([]);
  const [isEnrolled, setIsEnrolled] = useState(false);

  useEffect(() => {
    const fetchEnrollments = async () => {
      try {
        const response = await fetch('/api/course/enrolledcourses');
        const data = await response.json();
        setEnrollments(data.enrollments);

        // Check if the user is enrolled in the current course
        const enrolledInCourse = data.enrollments.some(
          (enrollment: Enrollment) => enrollment.course.id === course.id
        );
        setIsEnrolled(enrolledInCourse);
      } catch (error) {
        console.error('Error fetching enrollments:', error);
      }
    };

    fetchEnrollments();
  }, [course.id]);

  return (
    <div className="flex lg:px-7 gap-7 w-full flex-col md:flex-col lg:flex-row ">
      <div className="flex flex-col gap-2 lg:w-[65%] md:w-full">
        <div>
          <div className="text-[#aea9a9] text-[1.7em] py-1">{course.title}</div>
          <div className="text-white text-[1.7em]">
            {course.chapters[currentContent[0]].contents[currentContent[1]].title}
          </div>
          {showDescription && (
            <div className="text-[#aea9a9]">
              {course.chapters[currentContent[0]].contents[currentContent[1]].description}
            </div>
          )}
          <p className="underline text-[#aea9a9] hover:text-white text-[13px] hover:cursor-pointer w-24" onClick={ ()=> setShowDescription(!showDescription)}>show decription</p>
        </div>
        <div className="relative w-full pb-[56.25%]">
          <iframe
            className="absolute top-0 left-0 w-full h-full rounded-lg"
            src={`https://www.youtube.com/embed/${videoId}`}
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          ></iframe>
        </div>
        <div className="flex justify-end gap-4">
          <Button label={"Summerize"} classname="" > </Button>
          <Button label={"Take Quiz"} classname="" > </Button>
        </div>
      </div>

      <div className="lg:w-[35%] md:w-full h-[90vh] flex flex-col gap-4">
        <div className="h-10 flex border-lg relative">
          <button
            className="flex-1 p-4 items-center justify-center flex relative"
            onClick={() => setIsChatOpen(true)}
          >
            Ai Tutor
          </button>
          <button
            className="flex-1 p-4 items-center justify-center flex relative"
            onClick={() => setIsChatOpen(false)}
          >
            Chapter
          </button>
          <div
            className="absolute bottom-0 h-[4px] bg-white transition-transform duration-300 ease-in-out"
            style={{
              width: "50%",
              transform: isChatOpen ? "translateX(0%)" : "translateX(100%)",
            }}
          ></div>
        </div>

        <div className="relative h-[95%] overflow-x-hidden">
          <div
            className="absolute w-full h-full transition-transform duration-300 ease-in-out"
            style={{
              transform: isChatOpen ? "translateX(0%)" : "translateX(-100%)",
            }}
          >
            {isChatOpen && <Chatbox session={session} />}
          </div>

          <div
            className="absolute w-full transition-transform duration-300 ease-in-out"
            style={{
              transform: isChatOpen ? "translateX(100%)" : "translateX(0%)",
            }}
          >
            {/* {!isChatOpen && <ChapterList chapters={course.chapters} onSelect={ ()=> setCurrentContent }/>} */}
            {!isChatOpen && (
              <ChapterList
                chapters={course.chapters}
                onSelect={(selectedContent) => setCurrentContent(selectedContent)}
                courseId={course.id}
                isEnrolled={isEnrolled}
                onEnroll={ ()=>setIsEnrolled(true) }
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
