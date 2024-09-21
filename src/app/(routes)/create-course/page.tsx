"use client";

import { cn } from "@/lib/utils";
import { useState } from "react";
import { FaFileAlt } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";
import Loader from "./[components]/loading";

export default function Course() {
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
        // const formData = new FormData();
        // formData.append('file', selectedFile);
        // const response = await axios.post('/api/upload', formData);
        // console.log(response.data);
      } catch (error) {
        console.error("Error uploading file:", error);
      }
    }
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

  return (
    <>
      {isLoading && <Loader />}
      {!isLoading && (
        <div className="flex flex-col px-[24rem] pt-7 gap-7 w-[100%] text-[#eceef8]">
        <div className="flex flex-col">
          <div className="flex gap-2 h-[40px]">
            <input
              className="w-full rounded-lg bg-[#20232D] p-4 text-white"
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
        <div className="w-full">
          <p>Upload the Trancript of the video</p>
          <div className="h-[7rem] w-full border-dotted border border-black p-4 flex justify-center items-center rounded-lg">
            {!fileSelected ? (
              <label
                htmlFor="fileUpload"
                className="cursor-pointer flex flex-col justify-center items-center"
              >
                <FaFileAlt size="35px" />
                <p className="text-center text-[#9e9ea1] text-[12px]">
                  click here to select file
                </p>
              </label>
            ) : (
              <div className="flex justify-center items-center">
                <div className="flex flex-col mr-5 items-end justify-center">
                  <p className="text-[#9e9ea1] text-[14px]">
                    Selected file: {selectedFile?.name}
                  </p>
                  <a
                    className="text-[14px] underline hover:text-[blue] cursor-pointer"
                    onClick={handleChooseAnotherFile}
                  >
                    Choose another file
                  </a>
                </div>
                <div className="flex">
                  <button
                    className="mr-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg"
                    onClick={handleFileUpload}
                  >
                    Upload
                  </button>
                </div>
              </div>
            )}
            <input
              type="file"
              id="fileUpload"
              className="hidden"
              accept=".doc,.docx,.pdf,.txt"
              onChange={handleFileChange}
            />
          </div>
        </div>
        <div>
          <p>Title</p>
          <input
            className="w-full rounded-lg bg-[#20232D] p-4 text-white"
            placeholder="Title"
            value={title}
            onChange={ (e)=>{setTitle(e.target.value)} }
            />
        </div>
        <div>
          <p>Description</p>
          <textarea
            className="w-full rounded-lg bg-[#20232D] p-4 text-white h-[7rem]"
            placeholder="Comment"
            value={description}
            onChange={ (e)=>{setDescription(e.target.value)} }
          />
        </div>
        <div
          className="flex h-10 w-[7rem] justify-center items-center border-[1px] border-[#474747] rounded-lg hover:shadow-[4px_4px_0px_0px_#8a8a8a] hover:cursor-pointer bg-blue-500 hover:bg-blue-700 transition-shadow duration-470 group text-gray-200 mb-20"
          onClick={() => {
            setLoading(true);
          }}
        >
          Done
        </div>
      </div>
      )}
    </>
  );
}
