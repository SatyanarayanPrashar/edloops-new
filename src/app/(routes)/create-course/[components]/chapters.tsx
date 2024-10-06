import { Course, Chapter } from "@/types/resource";
import { Content } from "@prisma/client";
import { IoMdClose, IoMdAdd } from "react-icons/io";

interface ChapterProps {
    course: Course;
    chapter: Chapter; 
    updateChapter: (updatedChapter: Chapter) => void;
    onAddcontent: () => void;
    onRemoveChapter: () => void;
  }
  
export default function ChapterContainer({ course, chapter, updateChapter, onAddcontent, onRemoveChapter }: ChapterProps) {
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
  