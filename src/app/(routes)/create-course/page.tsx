"use client";

import { useState } from "react";
import { IoMdAdd, IoMdClose } from "react-icons/io";
import Modal from "./[components]/model";
import { type Course, type Content, type Chapter, Role } from "@/types/resource";
import ResourceForm from "./[components]/resourceForm";

export default function Course() {
  const [course, setCourse] = useState<Course>({
    id: 0,
    title: "",
    description: "",
    image: "",
    chapters: [{
      id: Date.now(),
      title: "",
      description: "",
      contents: [],
      courseId: 0
    }],
    published: false,
    createdAt: new Date(),
    updatedAt: new Date(),
    // creator: {
    //   id: 1,
    //   createdAt: new Date(),
    //   email: "",
    //   name: "",
    //   role: Role.USER,
    //   courses: [],
    //   enrolledCourses: []
    // },
    // creatorId: 0
  });

  const [iscontentFormOpen, setIscontentFormOpen] = useState(false);
  const [currentChapterIndex, setCurrentChapterIndex] = useState<number | null>(null);

  const addChapter = () => {
    setCourse(prevCourse => ({
      ...prevCourse,
      chapters: [
        ...prevCourse.chapters,
        { id: Date.now(), title: "", description: "", contents: [], courseId: course.id }
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

  // Function to create a course 
  const createCourse = async () => {
    if (!course.title || !course.description || !course.image) {
      alert("Please fill in the course details.");
      return;
    }
  
    if (course.chapters.length === 0 || course.chapters.some(chapter => chapter.contents.length === 0)) {
      alert("Each chapter must have at least one content.");
      return;
    }
  
    try {
      // Create a simplified course object for submission
      const body = JSON.stringify({
        title: course.title,
        description: course.description,
        image: course.image,
        // creatorId: course.creator.id, // Set the creatorId correctly
        chapters: course.chapters.map(chapter => ({
          title: chapter.title,
          description: chapter.description,
          contents: chapter.contents.map(content => ({
            title: content.title,
            description: content.description,
            url: content.url,
            start: content.start,
            end: content.end,
          }))
        })),
      });
  
      console.log("Request body:", body); // Log for debugging
  
      const response = await fetch("/api/course", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: body,
      });
  
      if (!response.ok) {
        throw new Error("Failed to create course");
      }
  
      const data = await response.json();
      console.log("Course created successfully:", data);
    } catch (error) {
      console.error("Error creating course:", error);
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
    closecontentForm(); // Close the form after submitting
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
            <Chapter
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
            <IoMdAdd/> 
          </div>
        </div>
      </div>

      <button
      className="absolute bottom-10 right-10 rounded-lg p-2 mt-2 bg-slate-500 text-white"
      onClick={ ()=>{createCourse()} }
      >Save</button>
      
      <Modal isOpen={iscontentFormOpen} onClose={closecontentForm}>
        {currentChapterIndex !== null && (
          <ResourceForm 
            onSubmit={handleContentSubmit} 
            chapterId={course.chapters[currentChapterIndex].id} // Pass the correct chapterId
          />
        )}
      </Modal>
    </div>
  );
}

interface ChapterProps {
  course: Course;
  chapter: Chapter;
  updateChapter: (updatedChapter: Chapter) => void;
  onAddcontent: () => void;
  onRemoveChapter: () => void;
}

function Chapter({ course, chapter, updateChapter, onAddcontent, onRemoveChapter }: ChapterProps) {
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

      {chapter.contents.map((content: Content, index: number) => (
        <div key={index} className="w-full mt-2 p-2 bg-gray-700 rounded relative">
          <div 
            className="absolute top-1 right-1 text-red-500 cursor-pointer"
            onClick={() => {
              const updatedcontents = chapter.contents.filter((_: any, i: number) => i !== index);
              updateChapter({ ...chapter, contents: updatedcontents });
            }}
          >
            <IoMdClose size={20} />
          </div>
          {content.title}
        </div>
      ))}
      
      <div 
        className="border-dashed border-[#eceef8] border-[1px] rounded-full p-2 mt-5 cursor-pointer" 
        onClick={onAddcontent}
      > 
        <IoMdAdd /> 
      </div>
    </div>
  );
}
