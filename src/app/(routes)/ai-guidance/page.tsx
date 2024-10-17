"use client";

import Link from 'next/link';
import { CgAdd } from "react-icons/cg";
import { prisma } from '@/lib/prisma';
// import { getServerSession } from 'next-auth';
// import { authOptions } from "@/lib/authOptions";
import AutoResizeTextarea from '@/app/components/autoresizing-Textarea';
import { useState } from 'react';
import Button from '@/app/components/button';
import { BiSend } from 'react-icons/bi';

export default function AIGuidance() {
    // const session = await getServerSession(authOptions);

    const [text, setText] = useState('');

    const handleTextChange = (value: string) => {
        setText(value);
        console.log('Current text:', value);
    };

    return (
        <div className="flex flex-col w-full justify-center items-center h-full">
            <h2 className="text-white text-4xl md:text-6xl font-bold text-center">
                Confused?
            </h2>
            <p className="text-white text-xl md:text-xl max-w-xl mt-2 mb-10 text-center">
                Get Guidance about what to learn next to be relevant in the industry
            </p>
            <div className="relative w-full md:w-1/2 lg:w-1/2 flex flex-col gap-2">
                <AutoResizeTextarea
                    placeholder="Tell me about yourself..."
                    onChange={handleTextChange}
                />
                <div className='flex justify-end gap-2'>
                    <Button label='Attach resume' classname='m-0'/>
                    <Button label='Attach github' classname='m-0'/>
                    <div className="bg-[#20232D] w-10 h-10 text-white flex items-center justify-center rounded-lg"> <BiSend size={22} color="white" opacity={0.8}/> </div>
                </div>
            </div>
        </div>
    );
}
