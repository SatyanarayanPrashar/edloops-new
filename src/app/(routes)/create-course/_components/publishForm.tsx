"use client";

import { useState } from "react";
import { Logo } from "@/app/components/logo";
import Button from "@/app/components/button";

interface PublishFormProps {
  onSubmit: () => void;
  courseId: number;
}

export default function PublishForm({ onSubmit, courseId }: PublishFormProps) {
  const [isChecked, setIsChecked] = useState(false);

  const handlePublish = async () => {
    if (!isChecked) return;
    try {
      const response = await fetch(`/api/course/publish?id=${courseId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to publish course');
      }

      onSubmit();
      alert('Course published successfully!');
    } catch (error) {
      console.error('Error publishing course:', error);
    }
  };

  return (
    <div className="flex flex-col pt-7 gap-7 w-full text-[#eceef8]/80">
      <Logo theme="light"/>

      <div>
        <p>By publishing the course you agree with edloops terms and conditions</p>
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="agree-checkbox"
            checked={isChecked}
            onChange={(e) => setIsChecked(e.target.checked)}
          />
          <label htmlFor="agree-checkbox">I agree with the terms and conditions</label>
        </div>
      </div>
      <Button
        label="Publish"
        classname={isChecked ? "bg-slate-500 hover:bg-slate-500/50" : "bg-red-700/40"}
        onclick={handlePublish}
        disabled = {!isChecked}
      />
    </div>
  );
}
