"use client"

import Link from 'next/link';
import { CgAdd } from "react-icons/cg";
import { useEffect, useState } from 'react';


export default function Course() {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch resources from the API
  useEffect(() => {
    // const fetchResources = async () => {
    //   try {
    //     const response = await fetch('/api/resources');
    //     if (!response.ok) {
    //       throw new Error('Failed to fetch resources');
    //     }
    //     const data = await response.json();
    //     setResources(data);
    //   } catch (error) {
    //     setError(error instanceof Error ? error.message : 'Unknown error');
    //   } finally {
    //     setLoading(false);
    //   }
    // };

    // fetchResources();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className="flex flex-col px-7 gap-7 w-[100%] text-[#eceef8]">
      <div className="flex flex-col gap-4">
        <h1 className='text-[1.5rem]'>Your Courses</h1>
        <Link href={'/create-course'}  className="h-[7rem] w-[12rem] flex flex-col justify-center items-center border-dashed border-[#eceef8] border-[1px] rounded-lg">
          <CgAdd size={24} />
          Create Course
        </Link>
      </div>
      <div className="flex flex-col gap-4" >
        <h1 className='text-[1.5rem]'>Explore Courses</h1>
        <Link  href={"/course"} className="h-[7rem] w-[12rem] border-[1px] rounded-lg overflow-hidden">
          <img src="hero-img.png" className="h-full w-full object-cover" />
        </Link>
      </div>

      <h1 className='text-[1.5rem]'>Available Resources</h1>
      {/* <div className="flex flex-col gap-4">
        {resources.map((resource) => (
          <div key={resource.id} className="border rounded-lg p-4">
            <h2 className='text-[1.2rem]'>{resource.title}</h2>
            <p>{resource.description}</p>
            <p className='text-sm text-gray-500'>{resource.transcript}</p>
          </div>
        ))}
      </div> */}
    </div>
  );
}