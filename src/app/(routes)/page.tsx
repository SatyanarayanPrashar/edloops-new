"use client"

import React from 'react';
import { motion } from "framer-motion";
import Link from 'next/link';
import { Vortex } from '../components/vortex';
import { ContainerScroll } from '../components/container-scroll-animation';
import { InfiniteMovingCards } from '../components/infinite-moving-cards';
import { Timeline } from '../components/timeline';
import { TextHoverEffect } from '../components/text-hover-effect';
import { useSession } from "next-auth/react";

export default function Home() {
  const { data: session } = useSession();

  return (
    <div className="bg-[#232736] flex flex-col items-cente text-white">
      <div className="z--[2] absolute w-full overflow-hidden">
        <img className='w-full opacity-50' src="https://cdn.prod.website-files.com/66cc2bd703ccf308a49a6188/66e9ebfcf14a0bce6e73d5bc_hero-bg-dark.avif" alt="" />
      </div>
      <div className="z--[2] bg-[#232736] h-full mt-[110vh] absolute w-full -mx-[10rem] shadow-[0px_0px_100px_200px_#232736]"></div>
      <div className="w-full mx-auto rounded-md h-[30rem] mt-[6rem] overflow-hidden">
        <Vortex
          backgroundColor="transparent"
          rangeY={50}
          particleCount={500}
          baseHue={120}
          className="flex items-center flex-col justify-center px-2 md:px-10 py-4 w-full h-full bg-transparent"
        >
          <h2 className="text-white text-4xl md:text-6xl font-bold text-center">
            Master Any Topic 2x Faster
          </h2>
          <p className="text-white text-xl md:text-2xl max-w-xl mt-2 md:mt-6 text-center">
            With Edloops AI Learn the Faster, Better and Smarter Way
          </p>
          {session ?
            <div className="flex flex-col sm:flex-row items-center gap-4 mt-6">
              <Link href="/dashboard" className="px-4 py-2 text-white border-[1px] rounded-lg hover:bg-slate-50/20">
                Home
              </Link>
            </div>
            :
            <div className="flex flex-col sm:flex-row items-center gap-4 mt-6">
              <Link href="/auth/signup/" className="px-4 py-2 bg-blue-600 hover:bg-blue-700 transition duration-200 rounded-lg text-white shadow-[0px_2px_0px_0px_#FFFFFF40_inset]">
                Sign Up
              </Link>
              <Link href="/auth/login/" className="px-4 py-2 text-white">Login</Link>
            </div>
          }
        </Vortex>
      </div>
      <div className="flex flex-col">
        <ContainerScroll >
          <img
            src="hero-img.png"
            alt="hero"
            className="mx-auto rounded-lg object-cover h-full object-left-top"
            draggable={false}
          />
        </ContainerScroll>
      </div>
      
      <motion.div
        initial={{ opacity: 0, paddingTop: "20px" }}
        whileInView={{ opacity: 1, paddingTop: "0px" }}
        transition={{ ease: "linear", duration: 1 }}
        viewport={{ once: true }}
      >
        <h1 className='text-xl md:text-3xl mx-[4rem] md:mx-[12rem]'>Navigating Your Learning Journey</h1>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, paddingTop: "20px" }}
        whileInView={{ opacity: 1, paddingTop: "0px" }}
        transition={{ ease: "linear", duration: 1 }}
        viewport={{ once: true }}
      >
        <h1 className='my-6 text-4xl md:text-6xl mx-[4rem] md:mx-[12rem]'>Top 1% learning materials curated and crafted into courses</h1>
      </motion.div>
      <div className="h-[20rem] rounded-md flex flex-col antialiased bg-transparent items-center justify-center relative overflow-hidden mt-20">
        <InfiniteMovingCards
          items={testimonials}
          direction="right"
          speed="slow"
        />
      </div>
      <Timeline data={data} />
      <div className='mb-[10rem]'></div>
      <TextHoverEffect text="EDLOOPS" />
    </div>
  );
}

const data = [
  {
    title: "Generate Course",
    content: (
      <div>
        <p className="text-neutral-200 font-normal mb-8">
          Filter noise from existing knowledge, and curate them into courses. Edit till you get satisfied.
        </p>
          <img
            src="gen-course.png"
            alt="startup template"
            className="rounded-lg object-cover w-full h-[28rem]"
          />
      </div>
    ),
  },
  {
    title: "Learn 2x Faster",
    content: (
      <div>
        <p className="text-neutral-200 font-normal mb-8">
          Not only watch or read content but interact with it, boost your learning senses to understand difficult concepts in faster and better way
        </p>
        <img
          src="hero-img.png"
          alt="cards template"
          className="rounded-lg object-cover w-full h-[28rem]"
        />
      </div>
    ),
  },
  {
    title: "Challenge yourself",
    content: (
      <div>
        <p className="text-neutral-200 font-normal mb-8">
          Give quizes genrated by GenAI, learn with every mistake you do and get Certified!
        </p>
        <img
          src="https://assets.aceternity.com/pro/bento-grids.png"
          alt="cards template"
          className="rounded-lg object-cover w-full h-[30rem]"
        />
      </div>
    ),
  },
];

const testimonials = [
  {
    quote:
      "It was the best of times, it was the worst of times, it was the age of wisdom, it was the age of foolishness, it was the epoch of belief, it was the epoch of incredulity, it was the season of Light, it was the season of Darkness, it was the spring of hope, it was the winter of despair.",
    name: "Charles Dickens",
    title: "A Tale of Two Cities",
  },
  {
    quote:
      "To be, or not to be, that is the question: Whether 'tis nobler in the mind to suffer The slings and arrows of outrageous fortune, Or to take Arms against a Sea of troubles, And by opposing end them: to die, to sleep.",
    name: "William Shakespeare",
    title: "Hamlet",
  },
  {
    quote: "All that we see or seem is but a dream within a dream.",
    name: "Edgar Allan Poe",
    title: "A Dream Within a Dream",
  },
  {
    quote:
      "It is a truth universally acknowledged, that a single man in possession of a good fortune, must be in want of a wife.",
    name: "Jane Austen",
    title: "Pride and Prejudice",
  },
  {
    quote:
      "Call me Ishmael. Some years ago—never mind how long precisely—having little or no money in my purse, and nothing particular to interest me on shore, I thought I would sail about a little and see the watery part of the world.",
    name: "Herman Melville",
    title: "Moby-Dick",
  },
];