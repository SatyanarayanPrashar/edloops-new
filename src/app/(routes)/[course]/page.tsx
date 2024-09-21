import { BiSend } from "react-icons/bi";
import NextButton from "./[components]/next-button";

export default function Course() {
    return (
        <div className="flex px-7 pt-7 gap-7 w-[100%]">
            <div className="flex flex-col gap-2 w-[65%]">
                <iframe
                className="h-[70%] w-[100%] rounded-lg"
                src="https://www.youtube.com/embed/mx0njuUNvT8?si=nSBsv3Jfi4wXwPWN"
                title="YouTube video player"
                allow="accelerometer; autoplay;clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share">
                </iframe>
                <div className="text-white text-[1.5rem]"> Tune Jo Na Kaha Song </div>
                <div className="flex gap-4 w-full">
                    <NextButton label="Previous" />
                    <NextButton label="Next"/>
                </div>
            </div>
            <div className="flex flex-col gap-2 w-[35%] h-[95vh]">
                <div className="h-[87%] rounded-lg bg-[#474747] p-4 text-white">
                    hello
                </div>
                <div className="w-full h-1 rounded-full bg-[#474747] overflow-hidden relative bg-gradient-to-r from-purple-500 via-blue-500 to-green-500 animate-gradient"></div>
                <div className="flex gap-2 h-[7%]">
                    <input className="w-full rounded-lg bg-[#474747] p-4 text-white" 
                        placeholder="Ask me"
                    />
                    <div className="bg-[#474747] w-12 h-12 text-white flex items-center justify-center rounded-lg"> <BiSend size={22} color="white" opacity={0.8}/> </div>
                </div>
            </div>
        </div>
    );
}
