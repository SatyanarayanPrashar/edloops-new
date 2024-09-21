"use client";

import { AnimatePresence, motion } from "framer-motion";
import React, { useEffect, useState } from "react";

export default function Loader() {
  const [currentWord, setCurrentWord] = useState(0);
  const words = ["Analyzing Video", "Generating Embeddings", "Creating Vector Database"];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWord((prev) => (prev + 1) % words.length);
    }, 1500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="absolute px-[24rem] w-full min-h-full overlay hero flex flex-col text-[#eceef8]">
      <div className="w-[45%] h-1 rounded-full bg-gradient-to-r from-purple-500 via-white to-green-500 animate-gradient bg-[length:200%_200%]"></div>
      <AnimatePresence mode="popLayout">
          <motion.div
            key={words[currentWord]}
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -10, opacity: 0 }}
            transition={{
              y: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 }
            }}
            className="text-center text-white"
          >
            {words[currentWord]}
          </motion.div>
        </AnimatePresence>
    </div>
  );
}
