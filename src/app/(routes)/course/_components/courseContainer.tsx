"use client";

import { useState } from "react";
import Chatbox from "./chatbox";
import { Course } from "@/types/resource";
import ChapterList from "./ChapterList";

interface CourseComponentProps {
  course: Course;
}

export default function CourseComponent({ course }: CourseComponentProps) {
  const [isChatOpen, setIsChatOpen] = useState<boolean>(false);
  const [currentContent, setCurrentContent] = useState<[number, number]>([0, 0]);

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

  return (
    <div className="flex px-7 gap-7 w-[100%]">
      <div className="flex flex-col gap-2 w-[65%]">
        {/* Display the Content Title and Video */}
        <div className="text-[#aea9a9] text-[1.7em] py-1">{course.title} </div>
        <iframe
          className="h-[67%] w-[100%] rounded-lg"
          src={`https://www.youtube.com/embed/${videoId}`}
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        ></iframe>

        <div className="text-white text-[1.7em] py-1">{course.chapters[currentContent[0]].contents[currentContent[1]].title} </div>
        <div className="text-[#aea9a9] py-1">{course.chapters[currentContent[0]].contents[currentContent[1]].description} </div>
      </div>

      <div className="w-[35%] h-[90vh] flex flex-col gap-4">
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
            {isChatOpen && <Chatbox />}
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
                onSelect={(selectedContent) => setCurrentContent(selectedContent)} // Pass the selected content properly
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
