import { BiSend } from "react-icons/bi";

export default function Chatbox() {
    
    return (
        <div className="flex flex-col gap-2 w-full h-full">
            <div className="h-[87%] rounded-lg bg-[#20232D] p-4 text-white">
                hello
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
