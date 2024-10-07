"use client";

import Button from "@/app/components/button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export const SigninForm = () => {
  const router = useRouter();

  const [showLogin, setShowLogin] = useState(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);
  const [signInError, setSignInError] = useState("");

  return (
    <div className="items-center justify-center text-center text-[#20232D]">
      <p className="my-5">Login to your account</p>
      {showLogin && (
        <>
          <input
            className="w-full h-10 rounded-lg bg-transparent  border-[1px] px-2 text-white mb-2"
            placeholder="abc@email.com"
            onChange={(e) => {}}
          />
          <input
            className="w-full h-10 rounded-lg bg-transparent border-[1px] px-2 text-white"
            placeholder="******"
            onChange={(e) => {}}
          />
        </>
      )}
      <Button
        label={"Login with Email"}
        classname={"text-white hover:bg-slate-800"}
        onclick={() => setShowLogin(true)}
        children={undefined}
      />
      <Button
        label={"Continue with Google"}
        classname={"bg-slate-200 hover:bg-slate-300 border-[1px]"}
        onclick={() => setShowLogin(true)}
        children={undefined}
      />

      <p className="text-[13px] text-slate-500 font-thin mt-5">New to Edloops?</p>
      <Link href="/auth/signup" className="text-[13px] text-slate-600 underline font-semibold">Create an account</Link>
    </div>
  );
};
