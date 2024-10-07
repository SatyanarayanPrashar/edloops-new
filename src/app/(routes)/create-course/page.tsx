"use client";

import { useState, useEffect } from "react";
import { IoMdAdd, IoMdClose } from "react-icons/io";
import Modal from "../../components/model";
import { type Course, type Content, type Chapter, type Enrollment } from "@/types/resource";
import ResourceForm from "./[components]/resourceForm";
import ChapterContainer from "./[components]/chapters";
import { toast } from "react-toastify";

export default function Course() {
  const [course, setCourse] = useState<Course>({
    id: 0,
    title: "",
    description: "",
    image: "",
    chapters: [{
      id: 0,
      title: "",
      description: "",
      contents: [],
      courseId: 0
    }],
    published: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  });

  const [iscontentFormOpen, setIscontentFormOpen] = useState(false);
  const [currentChapterIndex, setCurrentChapterIndex] = useState<number | null>(null);

  const addChapter = () => {
    setCourse(prevCourse => ({
      ...prevCourse,
      chapters: [
        ...prevCourse.chapters,
        { id: 0, title: "", description: "", contents: [], courseId: course.id }
      ]
    }));
  };

  const opencontentForm = (index: number) => {
    setCurrentChapterIndex(index);
    setIscontentFormOpen(true);
  };

  const closecontentForm = () => {
    setIscontentFormOpen(false);
    setCurrentChapterIndex(null);
  };

  const removeChapter = (index: number) => {
    const newChapters = course.chapters?.filter((_, i) => i !== index);
    setCourse({ ...course, chapters: newChapters });
  };

  // Function to create or update a course
  const saveCourse = async () => {
    if (!course.title || !course.description || !course.image) {
      console.log("Please fill in the course details");
      return;
    }
  
    if (course.chapters.length === 0 || course.chapters.some(chapter => chapter.contents.length === 0)) {
      console.log("Each chapter must have at least one content.");
      return;
    }

    try {
      // Create a simplified course object for submission
      const body = JSON.stringify({
        id: course.id !== 0 ? course.id : undefined,
        title: course.title,
        description: course.description,
        image: course.image,
        chapters: course.chapters.map(chapter => ({
          id: chapter.id !== 0 ? chapter.id : undefined,
          title: chapter.title,
          description: chapter.description,
          contents: chapter.contents.map(content => ({
            id: content.id !== 0 ? content.id : undefined,
            title: content.title,
            description: content.description,
            url: content.url,
            start: content.start,
            end: content.end,
          }))
        })),
      });

      console.log("Request body:", body);

      const response = await fetch("/api/course", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: body,
      });

      if (!response.ok) {
        throw new Error("Failed to save course");
      }

      const data = await response.json();
      console.log("Course saved successfully:", data);

      // Update the course state with the response (especially for updates)
      setCourse(data.course);
      console.log("Courrse Saved");
    } catch (error) {
      toast.error("Something went Wrong :(");
      console.error("Error saving course:", error);
    }
  };

  const handleContentSubmit = (newContent: Content) => {
    if (currentChapterIndex !== null) {
      setCourse(prevCourse => {
        const updatedChapters = [...prevCourse.chapters];
        const targetChapter = updatedChapters[currentChapterIndex];

        const updatedChapter = {
          ...targetChapter,
          contents: [...targetChapter.contents, { ...newContent, chapterId: targetChapter.id }]
        };

        updatedChapters[currentChapterIndex] = updatedChapter;
        return { ...prevCourse, chapters: updatedChapters };
      });
    }
    closecontentForm();
  };

  return (
    <div className="flex flex-col px-7 pt-7 gap-7 w-full justify-center items-center">
      <div className="relative w-1/2 border-dashed border-[1px] rounded-lg">
        <div className="w-full rounded-lg flex items-center justify-center">
          <input
          className="absolute w-1/2 rounded-lg bg-gray-100 text-[18px] p-2 text-black border-[1px]"
          placeholder="Enter the url for the cover Image"
          value={course.image}
          onChange={(e) => setCourse({ ...course, image: e.target.value })}
          />
          <img 
            src={course.image ? course.image : "tempimg.jpg"}
            alt="" 
            className="rounded-lg h-[15rem] w-full object-cover" 
          />
        </div>
        <input
          className="w-[95%] rounded-lg bg-transparent text-[40px] text-white m-4"
          placeholder="Course Title"
          value={course.title}
          onChange={(e) => setCourse({ ...course, title: e.target.value })}
        />
        <textarea
          className="w-[95%] rounded-lg bg-transparent text-white mx-4"
          placeholder="Course Description"
          value={course.description}
          onChange={(e) => setCourse({ ...course, description: e.target.value })}
        />
      </div>

      <div className="flex flex-col items-center w-1/2">
        {course.chapters && course.chapters.map((chapter, index) => (
          <div key={chapter.id} className="w-full">
            <ChapterContainer
              course={course}
              chapter={chapter}
              updateChapter={(updatedChapter) => {
                const newChapters = [...course.chapters];
                newChapters[index] = updatedChapter;
                setCourse({ ...course, chapters: newChapters });
              }}
              onAddcontent={() => opencontentForm(index)}
              onRemoveChapter={() => removeChapter(index)}
            />
          </div>
        ))}
        <div className="flex flex-col items-center">
          <div className="h-5 w-[1px] border-dashed border-[1px] border-[#eceef8]" />
          <div
            className="border-dashed border-[#eceef8] border-[1px] rounded-full p-2 cursor-pointer"
            onClick={addChapter}
          >
            <IoMdAdd />
          </div>
        </div>
      </div>

      <button
        className="absolute bottom-10 right-10 rounded-lg p-2 mt-2 bg-slate-500 text-white"
        onClick={() => { saveCourse(); }}
      >
        {course.id !== 0 ? "Update" : "Save"}
      </button>

      <Modal isOpen={iscontentFormOpen} onClose={closecontentForm}>
        {currentChapterIndex !== null && (
          <ResourceForm
            onSubmit={handleContentSubmit}
            chapterId={course.chapters[currentChapterIndex].id}
          />
        )}
      </Modal>
    </div>
  );
}