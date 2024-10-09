"use client";

import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export const SignInForm = () => {
  const router = useRouter();

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }

    try {
      signIn('credentials', {
        email,
        password,
        callbackUrl: '/dashboard'
      })
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
        Log in
      </button>

      <p className="text-[13px] text-slate-500 font-thin mt-10">New to Edloops?</p>
      <Link href="/auth/signup" className="text-[13px] text-slate-600 underline font-semibold">Create account</Link>
    </form>
  );
};
