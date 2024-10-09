"use client";

import { useState } from "react";
import Chatbox from "./chatbox";
import CurriculumList from "./CurriculumList";

interface ContentItem {
  id: number;
  title: string;
  url: string;
  description: string;
}

interface ChapterItem {
  id: number;
  title: string;
  description: string;
  contents: ContentItem[];
}

interface CourseComponentProps {
  courseId: number;
  curriculumData: ChapterItem[];
}

export default function CourseComponent({ courseId, curriculumData }: CourseComponentProps) {
  const [isChatOpen, setIsChatOpen] = useState<boolean>(false);

  return (
    <div className="flex px-7 gap-7 w-[100%]">
      <div className="flex flex-col gap-2 w-[65%]">
        {/* Display the Content Title and Video */}
        <div className="text-white text-[1.7em] py-1"> Course ID: {courseId} </div>
        <iframe
          className="h-[70%] w-[100%] rounded-lg"
          src={curriculumData[0]?.contents[0]?.url || "https://www.youtube.com/embed/mx0njuUNvT8"}
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        ></iframe>
        <div className="text-slate-300 mt-4">
          {curriculumData[0]?.contents[0]?.description || "No content description available."}
        </div>
      </div>

      {/* Right Sidebar with Chat and Curriculum Toggle */}
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
            Curriculum
          </button>
          <div
            className="absolute bottom-0 h-[4px] bg-white transition-transform duration-300 ease-in-out"
            style={{
              width: "50%",
              transform: isChatOpen ? "translateX(0%)" : "translateX(100%)",
            }}
          ></div>
        </div>

        {/* Chatbox and CurriculumList Views */}
        <div className="relative h-[95%] overflow-x-hidden">
          {/* Chatbox */}
          <div
            className="absolute w-full h-full transition-transform duration-300 ease-in-out"
            style={{
              transform: isChatOpen ? "translateX(0%)" : "translateX(-100%)",
            }}
          >
            {isChatOpen && <Chatbox />}
          </div>

          {/* Curriculum List */}
          <div
            className="absolute w-full transition-transform duration-300 ease-in-out"
            style={{
              transform: isChatOpen ? "translateX(100%)" : "translateX(0%)",
            }}
          >
            {!isChatOpen && <CurriculumList curriculumData={curriculumData} />}
          </div>
        </div>
      </div>
    </div>
  );
}
