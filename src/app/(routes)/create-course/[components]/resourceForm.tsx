"use client";

import { cn } from "@/lib/utils";
import { useState } from "react";
import { RxCross2 } from "react-icons/rx";
import Loader from "./loading";
import type { Content } from "@/types/resource";

interface ResourceFormProps {
  onSubmit: (content: Content) => void;
  chapterId: number; // New prop for chapterId
}

export default function ResourceForm({ onSubmit, chapterId }: ResourceFormProps) {
  const [isLoading, setLoading] = useState(false);
  const [v_URL, setVurl] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [fileSelected, setFileSelected] = useState(false);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setSelectedFile(event.target.files[0]);
      setFileSelected(true);
    }
  };

  const handleFileUpload = async () => {
    if (selectedFile) {
      try {
        // Logic for uploading the file should go here
        return selectedFile.name; // or return a URL/path after uploading
      } catch (error) {
        console.error("Error uploading file:", error);
      }
    }
    return "NA";
  };

  const handleChooseAnotherFile = () => {
    setSelectedFile(null);
    setFileSelected(false);
  };

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

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVurl(e.target.value);
  };

  const videoId = extractVideoId(v_URL);

  const handleSubmit = async () => {
    setLoading(true);
    
    if (!videoId || !title || !description || !v_URL) {
      alert("Please fill in all fields and provide a valid YouTube URL.");
      setLoading(false);
      return;
    }

    try {
      const newContent: Content = {
        url: v_URL,
        title: title,
        description: description,
        start: -1,
        end: -1,
        id: 0,
        chapterId: chapterId // Assign the passed chapterId to the content
      };

      onSubmit(newContent); // Submit content with chapterId
    } catch (error) {
      console.error("Error creating resource:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {isLoading && <Loader />}
      {!isLoading && (
        <div className="flex flex-col pt-7 gap-7 w-full text-[#eceef8]">
          <div className="flex flex-col">
            <div className="flex gap-2 h-[40px]">
              <input
                className="w-full rounded-lg bg-[#34394a] p-4 text-white"
                placeholder="Paste the YouTube URL"
                value={v_URL}
                onChange={handleUrlChange}
              />
              <div
                className="bg-[#20232D] w-12 h-full text-white flex items-center justify-center rounded-lg cursor-pointer"
                onClick={() => setVurl("")}
              >
                <RxCross2 size={22} color="white" opacity={0.8} />
              </div>
            </div>
            {!videoId && v_URL && (
              <p className="text-red-500 text-[13px]">Please check the URL</p>
            )}
            <iframe
              className={cn(
                "h-0 w-[100%] rounded-lg mt-4 transition-all duration-200",
                videoId && "h-[22rem]"
              )}
              src={`https://www.youtube.com/embed/${videoId}`}
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            />
          </div>
          {/* Title input */}
          <div>
            <p>Title</p>
            <input
              className="w-full rounded-lg bg-[#34394a] p-4 text-white"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          {/* Description input */}
          <div>
            <p>Description</p>
            <textarea
              className="w-full rounded-lg bg-[#34394a] p-4 text-white h-[7rem]"
              placeholder="Comment"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          {/* Submit button */}
          <div
            className="flex h-10 w-[7rem] justify-center items-center border-[1px] border-[#474747] rounded-lg hover:shadow-[4px_4px_0px_0px_#8a8a8a] hover:cursor-pointer bg-blue-500 hover:bg-blue-700 transition-shadow duration-470 group text-gray-200 mb-2"
            onClick={handleSubmit}
          >
            Done
          </div>
        </div>
      )}
    </>
  );
}
