"use client";

interface CurriculumItem {
  title: string;
  description: string;
}

interface CurriculumListProps {
  curriculumData: CurriculumItem[];
}

export default function CurriculumList({ curriculumData }: CurriculumListProps) {
  return (
    <div className="flex flex-col gap-2 w-full h-full overflow-y-auto pr-4 scrollbar-track-black scrollbar-thumb-gray-700">
      {curriculumData.map((item, index) => (
        <div
          key={index}
          className="flex flex-col gap-2 rounded-lg bg-[#20232D] p-4 group max-h-14 hover:max-h-[8.5rem] transition-all duration-300 ease-in-out overflow-hidden"
        >
          <div className="flex justify-between items-center">
            <div className="flex gap-2">
              <p>{index + 1}.</p>
              <p>{item.title}</p>
            </div>
          </div>
          <p className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            {item.description}
          </p>
        </div>
      ))}
    </div>
  );
}
