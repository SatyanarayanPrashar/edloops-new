import { cn } from "@/lib/utils";
import Link from "next/link";
import React from "react";

interface ButtonProps {
  label: string;
  href?: string;
  classname?: string;
  disabled?: boolean;
  onclick?: () => void;
  children?: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ label, classname, href, onclick, children, disabled }) => {
  if (href) {
    return (
      <Link className={cn("px-4 bg-[#20232D] h-10 justify-center items-center flex rounded-lg hover:cursor-pointer", classname)} href={href}>
        {label}
        {children}
      </Link>
    );
  } else {
    return (
      <button
      className={cn("my-2 px-4 bg-[#20232D] h-10 rounded-lg justify-center items-center flex hover:cursor-pointer", classname)}
      onClick={onclick}
      disabled={disabled || false}
      >
        {label}
        {children}
      </button>
    );
  }
};

export default Button;