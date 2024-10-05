"use client";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import React from "react";;

interface ToolTipProps {
    mssg: string;
    classname?: string;
    children?: React.ReactNode;
}

const ToolTip: React.FC<ToolTipProps> = ({mssg, classname, children}) => {
    return (
        <motion.div
        className={cn("absolute p-2 bg-[#eceef8] text-black rounded-lg rounded-tl-none overflow-hidden", classname)}
        initial={{ height: 0, opacity: 0 }}
        animate={{ height: "auto", opacity: 1 }}
        transition={{
            duration: 0.2,
            ease: [0.42, 0, 0.58, 1],
        }}
        >
        <p>{mssg}</p>
        {children}
        </motion.div>
    )
}

export default ToolTip;