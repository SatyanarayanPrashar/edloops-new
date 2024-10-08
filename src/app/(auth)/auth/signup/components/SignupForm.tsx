"use client";

import Button from "@/app/components/button";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { redirect, useRouter } from "next/navigation";
import { useState } from "react";

export const SignupForm = () => {
  const router = useRouter();

  const [email, setEmail] = useState<string>('');
  const [fullname, setFullname] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !fullname || !password) {
      setError('Please fill in all fields');
      return;
    }

    try {
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        body: JSON.stringify({
          fullname,
          email,
          password,
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      if(res.ok){
        router.push('/auth/signin');
      }
    } catch(error){
      console.log(error)
    }
    
  };

  return (
    <form
    onSubmit={handleSubmit}
    className="flex flex-col items-center justify-center text-center text-[#20232D]"
    >
      <p className="my-5">Create your Edloops account</p>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          placeholder="Enter your email"
          required
        />
        <input
          id="fullname"
          type="text"
          value={fullname}
          onChange={(e) => setFullname(e.target.value)}
          className="mt-3 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          placeholder="Enter your full name"
          required
        />
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mt-3 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          required
          placeholder="******"
        />
      <button
        type="submit"
        className="border-[1px] rounded-lg mt-3 bg-cyan-600 hover:bg-cyan-500 text-white w-full px-4 h-10 justify-center items-center flex"
      >
        Sign up
      </button>

      <p className="text-[13px] text-slate-500 font-thin mt-2">By signing up, you agree to our</p>
      <p className="text-[13px] text-slate-500 font-semibold">Terms of Service and Privacy Policy.</p>
      <div className="w-[80%] h-1px border-t-[1px] my-5"></div>

      <p className="text-[13px] text-slate-500 font-thin">Have an account?</p>
      <Link href="/auth/login" className="text-[13px] text-slate-600 underline font-semibold">Log in.</Link>
    </form>
  );
};
