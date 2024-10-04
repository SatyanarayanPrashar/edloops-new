"use client"
import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import Link from 'next/link';

export default function Home() {
  const [currentWord, setCurrentWord] = useState(0);
  const words = ['Faster', 'Better', 'Smarter'];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWord((prev) => (prev + 1) % words.length);
    }, 1500);

    return () => clearInterval(interval);
  }, []);

  const [windowHeight, setWindowHeight] = useState(0);
  const { scrollY } = useScroll();

  useEffect(() => {
    setWindowHeight(window.innerHeight);
  }, []);

  const rotateX = useTransform(
    scrollY,
    [0, windowHeight/3],
    ['40deg', '0deg']
  );

  const scale = useTransform(
    scrollY,
    [0, windowHeight],
    [1, 1]
  );

  return (
    <div className="bg-[#232736 flex flex-col items-cente text-white mx-[10rem]">
      <div className="-z-[2] absolute w-full -mx-[10rem] overflow-hidden">
        <img className='w-full' src="https://cdn.prod.website-files.com/66cc2bd703ccf308a49a6188/66e9ebfcf14a0bce6e73d5bc_hero-bg-dark.avif" alt="" />
      </div>
      <div className="-z-[2] bg-[#232736] h-full mt-[100vh] absolute w-full -mx-[10rem] shadow-[0px_0px_100px_200px_#232736]"></div>
      <div className="-z-5 absolute inset-x-0  -top-0 h-[80%] w-full bg-transparent bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem] opacity-10 [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]"></div>
      <div className=" mt-[7rem] text-center font-bold flex flex-col items-center">
        <h1 className='text-[7rem]'>Learn with AI</h1>
        <AnimatePresence mode="popLayout">
          <motion.div
            key={words[currentWord]}
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -50, opacity: 0 }}
            transition={{
              y: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 }
            }}
            className="text-center text-[7rem] mt-[-2rem] text-red-500"
          >
            {words[currentWord]}
          </motion.div>
        </AnimatePresence>
        <Link href="/dashboard" className='z-[9999] bg-blue-40 flex items-center justify-center px-4 py-2 rounded-3xl w-[10rem]'>Coming Soon</Link>
      </div>

      <div className="flex items-center justify-center mt-6 mb-[10rem]">
        <motion.div
          style={{
            rotateX,
            scale,
            transformPerspective: '1000px',
          }}
          className="shadow-[0_20px_50px_rgba(8,_112,_184,_0.7)] rounded-lg overflow-hidden w-[90%]"
        >
          <img
            src="hero-img.png"
          />
        </motion.div>
      </div>
      
      <motion.div
        initial={{ opacity: 0, paddingTop: "20px" }}
        whileInView={{ opacity: 1, paddingTop: "0px" }}
        transition={{ ease: "linear", duration: 1 }}
        viewport={{ once: true }}
      >
        <h1 className='text-[2rem]'>Navigating Your Learning Journey</h1>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, paddingTop: "20px" }}
        whileInView={{ opacity: 1, paddingTop: "0px" }}
        transition={{ ease: "linear", duration: 1 }}
        viewport={{ once: true }}
      >
        <h1 className='text-[4rem] leading-[70px] my-[20px]'>Top 1% learning materials curated and crafted into courses</h1>
      </motion.div>
      <div className='flex gap-4'>
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          whileInView={ { scale: 1, opacity: 1 } }
          transition={{ duration: 0.6, ease: 'easeOut'}}
          viewport={{ once: true }}
          className="flex-1 h-[14rem] bg-[#303346] text-white flex items-center justify-center rounded-lg shadow-lg"
        >
          <p className="text-xl font-bold">Pop-Out Card</p>
        </motion.div>
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          whileInView={ { scale: 1, opacity: 1 } }
          transition={{ duration: 0.6, ease: 'easeOut', delay: 0.3 }}
          viewport={{ once: true }}
          className="flex-1 h-[14rem] bg-[#303346] text-white flex items-center justify-center rounded-lg shadow-lg"
        >
          <p className="text-xl font-bold">Pop-Out Card</p>
        </motion.div>
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          whileInView={ { scale: 1, opacity: 1 } }
          transition={{ duration: 0.6, ease: 'easeOut', delay: 0.6}}
          viewport={{ once: true }}
          className="flex-1 h-[14rem] bg-[#303346] text-white flex items-center justify-center rounded-lg shadow-lg"
        >
          <p className="text-xl font-bold">Pop-Out Card</p>
        </motion.div>
      </div>

      
      <div className='mb-[20rem]'></div>
    </div>
  );
}