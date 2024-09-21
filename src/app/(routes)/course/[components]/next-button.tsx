import { BiSend } from "react-icons/bi";

export default function NextButton( {label}: {label: string} ) {
    
    return (
        <div className="flex h-20 w-full justify-center items-center border-[1px] border-[#474747] rounded-lg hover:shadow-[4px_4px_0px_0px_#8a8a8a] hover:cursor-pointer hover:bg-green-500 transition-shadow duration-470 group text-gray-200">
            {label}
        </div>
    );
}
