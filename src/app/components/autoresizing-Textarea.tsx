"use client";

import React, { useRef, useEffect, ChangeEvent } from 'react';

interface AutoResizeTextareaProps {
  onChange?: (value: string) => void;
  placeholder?: string;
}

const AutoResizeTextarea: React.FC<AutoResizeTextareaProps> = ({ onChange, placeholder = "Tell me about yourself" }) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const resizeTextarea = () => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    textarea.style.height = 'auto';
    const singleLineHeight = 15;
    const maxHeight = singleLineHeight * 5;
    
    if (textarea.scrollHeight <= singleLineHeight) {
      textarea.style.height = `${singleLineHeight}px`;
    } else if (textarea.scrollHeight > maxHeight) {
      textarea.style.height = `${maxHeight}px`;
      textarea.style.overflowY = 'auto';
    } else {
      textarea.style.height = `${textarea.scrollHeight}px`;
      textarea.style.overflowY = 'hidden';
    }
  };

  useEffect(() => {
    resizeTextarea();
  }, []);

  const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    resizeTextarea();
    if (onChange) {
      onChange(event.target.value);
    }
  };

  return (
    <textarea
        ref={textareaRef}
        className="w-full rounded-lg bg-transparent text-white border-[1px] p-3 text-[18px] resize-none overflow-hidden"
        placeholder={placeholder}
        onChange={handleChange}
    />
  );
};

export default AutoResizeTextarea;