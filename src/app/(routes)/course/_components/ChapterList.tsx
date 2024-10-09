"use client";

import { cn } from "@/lib/utils";
import { Chapter } from "@/types/resource";
import { useState } from "react";
import { BsYoutube } from "react-icons/bs";
import { FaArrowDown, FaArrowUp } from "react-icons/fa";

interface ChapterListProps {
  chapters: Chapter[];
  onSelect: (content: [number, number]) => void;
}

export default function ChapterList({ chapters, onSelect }: ChapterListProps) {
  const [showChapter, setShowChapter] = useState<number | null>(null);
  const [currentContent, setCurrentContent] = useState<[number, number]>([0, 0]);
  const [hoveredChapter, setHoveredChapter] = useState<number | null>(null);

  return (
    <div className="flex flex-col gap-2 w-full h-full overflow-y-auto pr-4 scrollbar-track-black scrollbar-thumb-gray-700">
      {chapters.map((item, index) => (
        <div
          key={index}
          className={cn(
            "flex flex-col gap-2 rounded-lg bg-[#20232D] p-4 group transition-all duration-300 ease-in-out overflow-hidden",
            (currentContent?.[0] === index || showChapter === index) && "h-full",
            hoveredChapter === index ? "h-full" : ""
          )}
          onClick={() => setShowChapter(index)}
          onMouseEnter={() => setHoveredChapter(index)}
          onMouseLeave={() => setHoveredChapter(null)}
        >
          <div className="flex justify-between items-center">
            <div className="flex gap-2">
              <p>{index + 1}.</p>
              <p>{item.title}</p>
            </div>
            {currentContent?.[0] !== index && (hoveredChapter === index && showChapter!==index) &&( <FaArrowDown size={14}/> )}
            {currentContent?.[0] !== index && ( showChapter===index) && ( <FaArrowUp size={14}/> )}
          </div>
          <p
            className={cn(
              "text-transparent group-hover:text-[#aea9a9] transition-opacity duration-300 h-0",
              (currentContent?.[0] === index || showChapter === index || hoveredChapter === index) && "text-[#aea9a9] h-[1.2rem]"
            )}
          >
            {item.description.slice(0, 50)}
          </p>
          
          {(showChapter === index || currentContent?.[0] === index) && (
            <div>
              {item.contents.map((content, i) => (
                <div
                  key={i}
                  className={cn(
                    "flex gap-2 items-center mt-3",
                    currentContent?.[1] === i && currentContent?.[0] === index && "bg-[#303346] px-4 py-2 rounded-lg"
                  )}
                  onClick={() => {
                    setCurrentContent([index, i])
                    onSelect([index, i])
                  }}
                >
                  <BsYoutube color="red" size={20} />
                  <p>{content.title.slice(0, 40) + "..."}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
