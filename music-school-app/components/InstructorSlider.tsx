"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import Link from "next/link";

interface Instructor {
  name: string;
  role: string;
  instrument: string;
  image: string;
  bio: string;
}

const instructors: Instructor[] = [
  { 
    name: "Dr. Amara Nkosi", 
    role: "Lead Vocal Coach", 
    instrument: "Vocals", 
    image: "/instructor-amara.png",
    bio: "Dr. Nkosi holds a Doctorate in Music Performance from Berklee College of Music and has performed in over 20 countries. She brings a nurturing, technique-first approach to every student, specializing in classical, gospel, and contemporary styles." 
  },
  { 
    name: "James Harrington", 
    role: "Piano Instructor", 
    instrument: "Piano", 
    image: "/instructor-james.png",
    bio: "A graduate of the Royal Conservatory of Music, James has 15 years of teaching experience spanning classical theory, jazz improvisation, and modern composition. His students consistently advance to competitive recitals." 
  },
  { 
    name: "Sofia Reyes", 
    role: "Guitar Specialist", 
    instrument: "Guitar / Bass", 
    image: "/instructor-sofia.png",
    bio: "Sofia is a session musician with credits on over 40 commercial albums. She teaches acoustic, electric, and bass guitar with a genre-inclusive approach that keeps students motivated and progressing quickly." 
  },
  { 
    name: "Marcus Webb", 
    role: "Drum & Percussion", 
    instrument: "Drums", 
    image: "/instructor-marcus.png",
    bio: "With a background in jazz, funk, and orchestral percussion, Marcus is one of the city's most sought-after rhythm educators. His curriculum builds rock-solid fundamentals while making every lesson feel like a jam session." 
  },
];

export default function InstructorSlider() {
  const [index, setIndex] = useState(0);

  const next = () => setIndex((prev) => (prev + 1) % instructors.length);
  const prev = () => setIndex((prev) => (prev - 1 + instructors.length) % instructors.length);

  const current = instructors[index];

  return (
    <div className="relative w-full max-w-6xl mx-auto px-4 py-20 overflow-hidden">
      <div className="grid lg:grid-cols-[1fr_400px] gap-12 items-center">
        {/* Card Stack / Active Card */}
        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ opacity: 0, x: 50, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: -50, scale: 0.95 }}
              transition={{ duration: 0.5, ease: [0.32, 0.72, 0, 1] }}
              className="relative aspect-[4/3] sm:aspect-[16/9] rounded-[40px] overflow-hidden border border-border/50 shadow-2xl"
            >
              <Image
                src={current.image}
                alt={current.name}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-10 left-10 text-white">
                <motion.h3 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="font-heading font-black text-4xl sm:text-6xl mb-2"
                >
                  {current.instrument}
                </motion.h3>
                <motion.p 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="text-white/80 text-lg"
                >
                  {current.role}
                </motion.p>
              </div>
              
              {/* Play-like Button Decoration */}
              <div className="absolute bottom-10 right-10 w-16 h-16 rounded-full bg-background/20 backdrop-blur-md border border-white/20 flex items-center justify-center">
                <ArrowRight className="w-6 h-6 text-white" />
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Dots/Buttons */}
          <div className="flex items-center gap-4 mt-8">
             <button 
              onClick={prev}
              className="w-12 h-12 rounded-full bg-surface border border-border flex items-center justify-center hover:bg-primary/10 hover:border-primary/40 transition-all"
             >
               <ChevronLeft className="w-5 h-5" />
             </button>
             <button 
              onClick={next}
              className="w-12 h-12 rounded-full bg-surface border border-border flex items-center justify-center hover:bg-primary/10 hover:border-primary/40 transition-all"
             >
               <ChevronRight className="w-5 h-5" />
             </button>
             <div className="flex gap-2 ml-4">
               {instructors.map((_, i) => (
                 <div 
                  key={i} 
                  className={`h-1.5 rounded-full transition-all duration-300 ${i === index ? "w-8 bg-primary" : "w-2 bg-border"}`}
                 />
               ))}
             </div>
          </div>
        </div>

        {/* Content Side */}
        <div className="flex flex-col justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
            >
              <h4 className="font-heading font-bold text-2xl text-foreground mb-1">{current.name}</h4>
              <p className="text-primary font-semibold mb-6 uppercase tracking-widest text-xs">{current.role}</p>
              <p className="text-muted-foreground leading-relaxed text-lg mb-8">
                {current.bio}
              </p>
              <Link 
                href="/about#instructors" 
                className="inline-flex items-center gap-2 text-foreground font-bold hover:text-primary transition-colors group"
              >
                View Case <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
