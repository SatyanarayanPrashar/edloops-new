import React, { useRef, useEffect, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';

const images = [
  '/path-to-image1.png',
  '/path-to-image2.png',
  '/path-to-image3.png',
  '/path-to-image4.png'
];

const SequentialImageConnections: React.FC = () => {
  const controls = useAnimation();
  const [activeIndex, setActiveIndex] = useState(-1);
  const refs = useRef<Array<React.RefObject<HTMLDivElement>>>(
    images.map(() => React.createRef<HTMLDivElement>())
  );

  useEffect(() => {
    const observers = refs.current.map((ref, index) => 
      new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveIndex(index);
            controls.start(`visible${index}`);
          }
        },
        { threshold: 0.5 }
      )
    );

    refs.current.forEach((ref, index) => {
      if (ref.current) {
        observers[index].observe(ref.current);
      }
    });

    return () => {
      observers.forEach(observer => observer.disconnect());
    };
  }, [controls]);

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible0: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
    visible1: { opacity: 1, scale: 1, transition: { duration: 0.5, delay: 0.2 } },
    visible2: { opacity: 1, scale: 1, transition: { duration: 0.5, delay: 0.4 } },
    visible3: { opacity: 1, scale: 1, transition: { duration: 0.5, delay: 0.6 } },
  };

  const connectionVariants = {
    hidden: { pathLength: 0 },
    visible: { pathLength: 1, transition: { duration: 0.5, delay: 0.8 } },
  };

  return (
    <div className="relative w-full h-[300vh] bg-pink-100">
      <div className="sticky top-0 w-full h-screen flex items-center justify-center">
        <svg className="absolute w-full h-full" viewBox="0 0 400 400">
          <motion.path
            d="M100,100 C150,150 250,150 300,100"
            stroke="#000"
            strokeWidth="2"
            fill="none"
            initial="hidden"
            animate={activeIndex >= 3 ? "visible" : "hidden"}
            variants={connectionVariants}
          />
          <motion.path
            d="M100,200 C150,250 250,250 300,200"
            stroke="#000"
            strokeWidth="2"
            fill="none"
            initial="hidden"
            animate={activeIndex >= 3 ? "visible" : "hidden"}
            variants={connectionVariants}
          />
          <motion.path
            d="M100,300 C150,350 250,350 300,300"
            stroke="#000"
            strokeWidth="2"
            fill="none"
            initial="hidden"
            animate={activeIndex >= 3 ? "visible" : "hidden"}
            variants={connectionVariants}
          />
        </svg>
        
        {images.map((src, index) => (
          <motion.div
            key={index}
            ref={refs.current[index]}
            className="absolute w-24 h-24 rounded-lg overflow-hidden shadow-lg"
            style={{
              top: `${25 + index * 20}%`,
              left: index % 2 === 0 ? '20%' : '70%',
            }}
            initial="hidden"
            animate={controls}
            variants={imageVariants}
          >
            <img src={src} alt={`Image ${index + 1}`}/>
          </motion.div>
        ))}
        
        <motion.div
          className="absolute right-10 top-1/2 w-32 h-48 bg-white rounded-lg shadow-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: activeIndex >= 3 ? 1 : 0 }}
          transition={{ delay: 1 }}
        >
            <img src="path-to-image5.png" alt=""/>
          {/* Content for box 5 */}
        </motion.div>
      </div>
    </div>
  );
};

export default SequentialImageConnections;