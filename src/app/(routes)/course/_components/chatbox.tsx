import { BiSend } from "react-icons/bi";

export default function Chatbox() {
    
    return (
        <div className="flex flex-col gap-2 w-full h-full">
            <div className="h-[87%] rounded-lg bg-[#20232D] p-4 text-white flex flex-col-reverse gap-4 overflow-y-scroll">
                <div className="flex">
                    <div className="rounded-lg rounded-bl-none bg-[#303346] max-w-[70%] p-2"> The kernel is like the brain of your computer. It controls how programs talk to the hardware (like memory and the CPU) and makes sure everything works together smoothly. It's the part that helps your computer run multiple tasks and keeps things secure.</div>
                </div>
                <div className="flex text-end justify-end">
                    <div className="rounded-lg rounded-br-none bg-[#303346] max-w-[70%] text-end p-2">What does kernal do then?</div>
                </div>
                <div className="flex">
                    <div className="rounded-lg rounded-bl-none bg-[#303346] max-w-[70%] p-2"> In simple terms:
                        Multitasking: The computer switches quickly between different tasks (like apps) to make it seem like everything is running at once, but there's only one brain (CPU) doing all the work.
                        Multiprocessing: The computer has multiple brains (CPUs), so it can actually do many tasks at the same time, each handled by a different brain.</div>
                </div>
                <div className="flex text-end justify-end">
                    <div className="rounded-lg rounded-br-none bg-[#303346] max-w-[70%] text-end p-2"> What is the difference between Multitasking and Multiprocessing OS?</div>
                </div>
            </div>
            <div className="w-full h-1 rounded-full bg-gradient-to-r from-purple-500 via-blue-500 to-green-500 animate-gradient bg-[length:200%_200%]"></div>
            <div className="flex gap-2 h-[7%]">
                <input className="w-full rounded-lg bg-[#20232D] p-4 text-white" 
                    placeholder="Ask me"
                />
                <div className="bg-[#20232D] w-12 h-full text-white flex items-center justify-center rounded-lg"> <BiSend size={22} color="white" opacity={0.8}/> </div>
            </div>
        </div>
    );
}
