"use client";

import React from "react";
import { motion, Variants } from "framer-motion";

interface AntigravityTextRevealProps {
  text: string;
  className?: string;
  delay?: number;
}

export default function AntigravityTextReveal({
  text,
  className = "",
  delay = 0,
}: AntigravityTextRevealProps) {
  // Split text into characters for a typewriter/reveal effect
  const characters = text.split("");

  const container: Variants = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.03, delayChildren: delay },
    }),
  };

  const child: Variants = {
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
    hidden: {
      opacity: 0,
      x: -10,
    },
  };

  return (
    <motion.span
      style={{ overflow: "hidden", display: "inline-flex", flexWrap: "wrap" }}
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      className={className}
    >
      {characters.map((char, index) => (
        <motion.span
          variants={child}
          key={index}
          style={{ display: "inline-block", whiteSpace: "pre" }}
        >
          {char}
        </motion.span>
      ))}
      <motion.span
        initial={{ scaleY: 0, opacity: 0 }}
        whileInView={{ 
          scaleY: [0, 1, 1, 0], 
          opacity: [0, 1, 1, 0],
          x: [0, 0] // dummy to sync with text
        }}
        transition={{ 
          duration: 0.8, 
          delay: delay + (characters.length * 0.03),
          times: [0, 0.1, 0.9, 1]
        }}
        viewport={{ once: true }}
        className="inline-block w-[2px] h-[1.2em] bg-primary align-middle ml-1"
      />
    </motion.span>
  );
}
