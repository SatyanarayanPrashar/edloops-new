"use client";

import { useState } from "react";
import { IoMdAdd, IoMdClose } from "react-icons/io"; // Import the close icon
import ResourceForm from "./[components]/resourceForm";
import Modal from "./[components]/model"; // Adjust the import path if needed
import type { Course, Resource, Chapter } from "@/types/resource";

export default function Course() {
  const [course, setCourse] = useState<Course>({
    title: "",
    description: "",
    image: "",
    chapters: [{ id: Date.now().toString(), title: "", description: "", resources: [] }], // Default empty chapter
  });

  const [isResourceFormOpen, setIsResourceFormOpen] = useState(false);
  const [currentChapterIndex, setCurrentChapterIndex] = useState<number | null>(null);

  const addChapter = () => {
    setCourse(prevCourse => ({
      ...prevCourse,
      chapters: [
        ...prevCourse.chapters,
        { id: Date.now().toString(), title: "", description: "", resources: [] }
      ]
    }));
  };

  const openResourceForm = (index: number) => {
    setCurrentChapterIndex(index);
    setIsResourceFormOpen(true);
  };

  const closeResourceForm = () => {
    setIsResourceFormOpen(false);
    setCurrentChapterIndex(null);
  };

  // Function to remove a chapter
  const removeChapter = (index: number) => {
    const newChapters = course.chapters.filter((_, i) => i !== index);
    setCourse({ ...course, chapters: newChapters });
  };

  return (
    <div className="flex flex-col px-7 pt-7 gap-7 w-full justify-center items-center">
      <div className="w-1/2">
        <div className="w-full rounded-lg">
          <img 
            src="tempimg.jpg" 
            alt="" 
            className="rounded-lg h-[15rem] w-full object-cover" 
          />
        </div>
        <input
          className="w-full rounded-lg bg-transparent text-[40px] text-white"
          placeholder="Course Title"
          value={course.title}
          onChange={(e) => setCourse({ ...course, title: e.target.value })}
        />
        <textarea
          className="w-full rounded-lg bg-transparent text-white"
          placeholder="Course Description"
          value={course.description}
          onChange={(e) => setCourse({ ...course, description: e.target.value })}
        />
      </div>

      <div className="flex flex-col items-center w-1/2">
        {course.chapters.map((chapter, index) => (
          <div key={chapter.id} className="w-full">
            <Chapter 
              chapter={chapter} 
              updateChapter={(updatedChapter) => {
                const newChapters = [...course.chapters];
                newChapters[index] = updatedChapter;
                setCourse({ ...course, chapters: newChapters });
              }}
              onAddResource={() => openResourceForm(index)}
              onRemoveChapter={() => removeChapter(index)} // Pass remove function
            />
          </div>
        ))}
        <div className="flex flex-col items-center">
          <div className="h-5 w-[1px] border-dashed border-[1px] border-[#eceef8]" />
          <div 
            className="border-dashed border-[#eceef8] border-[1px] rounded-full p-2 cursor-pointer" 
            onClick={addChapter}
          > 
            <IoMdAdd/> 
          </div>
        </div>
      </div>
      
      <Modal isOpen={isResourceFormOpen} onClose={closeResourceForm}>
        {currentChapterIndex !== null && (
          <ResourceForm 
            onSubmit={(resource: Resource) => {
              const updatedChapters = [...course.chapters];
              updatedChapters[currentChapterIndex].resources.push(resource);
              setCourse({ ...course, chapters: updatedChapters });
              closeResourceForm();
            }}
          />
        )}
      </Modal>
    </div>
  );
}

interface ChapterProps {
  chapter: Chapter;
  updateChapter: (updatedChapter: Chapter) => void;
  onAddResource: () => void;
  onRemoveChapter: () => void;
}

function Chapter({ chapter, updateChapter, onAddResource, onRemoveChapter }: ChapterProps) {
  return (
    <div className="w-full p-4 flex flex-col justify-center items-center border-dashed border-[#eceef8] border-[1px] rounded-lg mt-4 relative">
      <div 
        className="absolute top-2 right-2 text-red-500 cursor-pointer"
        onClick={onRemoveChapter}
      >
        <IoMdClose size={20} />
      </div>

      <input
        className="w-full rounded-lg bg-transparent text-[25px] text-white"
        placeholder="Chapter Title"
        value={chapter.title}
        onChange={(e) => updateChapter({ ...chapter, title: e.target.value })}
      />
      <textarea
        className="w-full rounded-lg bg-transparent text-white"
        placeholder="Chapter Description"
        value={chapter.description}
        onChange={(e) => updateChapter({ ...chapter, description: e.target.value })}
      />
      
      {chapter.resources.map((resource: Resource, index: number) => (
        <div key={index} className="w-full mt-2 p-2 bg-gray-700 rounded relative">
          <div 
            className="absolute top-1 right-1 text-red-500 cursor-pointer"
            onClick={() => {
              const updatedResources = chapter.resources.filter((_, i) => i !== index);
              updateChapter({ ...chapter, resources: updatedResources }); // Update chapter's resources
            }}
          >
            <IoMdClose size={20} />
          </div>
          {resource.title}
        </div>
      ))}
      
      <div 
        className="border-dashed border-[#eceef8] border-[1px] rounded-full p-2 mt-5 cursor-pointer" 
        onClick={onAddResource}
      > 
        <IoMdAdd /> 
      </div>
    </div>
  );
}