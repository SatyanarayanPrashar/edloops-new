import { cn } from "@/lib/utils";
import Link from "next/link";
import React from "react";

interface ButtonProps {
  label: string;
  classname?: string;
  href?: string;
  onclick?: () => void; // Ensure this is defined as a function
  children?: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ label, classname, href, onclick, children }) => {
  if (href) {
    return (
      <Link className={cn("px-4 bg-[#20232D] h-10 justify-center items-center flex rounded-lg", classname)} href={href}>
        {label}
      </Link>
    );
  } else {
    return (
      <div
        className={cn("my-2 px-4 bg-[#20232D] h-10 rounded-lg justify-center items-center flex", classname)}
        onClick={onclick}
      >
        {label}
      </div>
    );
  }
};

export default Button;