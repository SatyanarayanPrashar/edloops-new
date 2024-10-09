"use client"

import { BiSend } from "react-icons/bi";
import NextButton from "./_components/next-button";
import { useState } from "react";
import { cn } from "@/lib/utils";
import Chatbox from "./_components/chatbox";
import ChapterList from "./_components/ChapterList";

export default function Course() {
    const [isChatOpen, setIsChatOpen] = useState<boolean>(false);

    return (
        <div className="flex px-7 gap-7 w-[100%]">
            <div className="flex flex-col gap-2 w-[65%]">
                <div className="text-white text-[1.7em] py-1"> Tune Jo Na Kaha Song </div>
                <iframe
                    className="h-[70%] w-[100%] rounded-lg"
                    src="https://www.youtube.com/embed/mx0njuUNvT8?si=nSBsv3Jfi4wXwPWN"
                    title="YouTube video player"
                    allow="accelerometer; autoplay;clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share">
                </iframe>
                <div className="flex gap-4 w-full">
                    <NextButton label="Previous" />
                    <NextButton label="Next" />
                </div>
            </div>
            <div className="w-[35%] h-[90vh] flex flex-col gap-4">
                <div className="h-10 flex border-lg relative">
                    <button
                        className="flex-1 p-4 items-center justify-center flex relative"
                        onClick={() => setIsChatOpen(true)}
                    >
                        Ai tutor
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
                            width: '50%',
                            transform: isChatOpen ? 'translateX(0%)' : 'translateX(100%)',
                        }}
                    ></div>
                </div>

                {/* Content transition */}
                <div className="relative h-[95%] overflow-x-hidden">
                    <div
                        className="absolute w-full h-full transition-transform duration-300 ease-in-out"
                        style={{
                            transform: isChatOpen ? 'translateX(0%)' : 'translateX(-100%)'
                        }}
                    >
                        {isChatOpen && <Chatbox />}
                    </div>
                    <div
                        className="absolute w-full transition-transform duration-300 ease-in-out"
                        style={{
                            transform: isChatOpen ? 'translateX(100%)' : 'translateX(0%)'
                        }}
                    >
                        {/* {!isChatOpen && <ChapterList />} */}
                    </div>
                </div>

            </div>
        </div>
    );
}
