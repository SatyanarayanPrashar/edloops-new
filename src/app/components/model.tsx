import { cn } from "@/lib/utils";
import React from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  classname?: string;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children, classname }) => {
  if (!isOpen) return null;
  

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 overflow-y-scroll">
      <div className={cn("bg-[#20232D] max-h-[95%] rounded-lg p-5 relative w-1/2 ml-16 h-[90% scrollbar-none overflow-y-scroll flex justify-center items-center", classname)}>
        <button
          className="absolute top-2 right-2 text-white"
          onClick={onClose}
        >
          &times;
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
