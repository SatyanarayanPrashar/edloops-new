import Link from 'next/link';

import { CgAdd } from "react-icons/cg";


export default function Course() {
    return (
        <div className="flex flex-col px-7 pt-7 gap-7 w-[100%] text-[#eceef8]">
            <Link  href={ '/create-course' } className="flex flex-col gap-4">
                <h1 className='text-[1.5rem]'>Your Courses</h1>
                <div className="h-[7rem] w-[12rem] flex flex-col justify-center items-center border-dashed border-[#eceef8] border-[1px] rounded-lg">
                    <CgAdd size={24}/>
                    Create Course
                </div>
            </Link>
            <Link href={"/course"} className="flex flex-col gap-4">
                <h1 className='text-[1.5rem]'>Explore Courses</h1>
                <div className="h-[7rem] w-[12rem] border-[1px] rounded-lg overflow-hidden">
                    <img src="hero-img.png" className="h-full w-full object-cover" />
                </div>
            </Link>
        </div>
    );
}