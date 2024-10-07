"use client";

import Button from "@/app/components/button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export const SignupForm = () => {
  const router = useRouter();

  const [showLogin, setShowLogin] = useState(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);
  const [signInError, setSignInError] = useState("");

  return (
    <div className="flex flex-col items-center justify-center text-center text-[#20232D]">
      <p className="my-5">Create your Edloops account</p>
      {showLogin && (
        <>
          <input
            className="w-full h-10 rounded-lg bg-transparent  border-[1px] px-2 text-white mb-2"
            placeholder="Full Name"
            onChange={(e) => {}}
          />
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
        label={"Continue with Email"}
        classname={"text-white hover:bg-slate-800 w-full"}
        onclick={() => setShowLogin(true)}
        children={undefined}
      />
      <Button
        label={"Continue with Google"}
        classname={"bg-slate-200 hover:bg-slate-300 border-[1px] w-full"}
        onclick={() => setShowLogin(true)}
        children={undefined}
      />

      <p className="text-[13px] text-slate-500 font-thin mt-2">By signing up, you agree to our</p>
      <p className="text-[13px] text-slate-500 font-semibold">Terms of Service and Privacy Policy.</p>
      <div className="w-[80%] h-1px border-t-[1px] my-5"></div>

      <p className="text-[13px] text-slate-500 font-thin">Have an account?</p>
      <Link href="/auth/login" className="text-[13px] text-slate-600 underline font-semibold">Log in.</Link>
    </div>
  );
};
