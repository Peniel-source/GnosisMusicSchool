"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, ChevronLeft, ChevronRight, CheckCircle2 } from "lucide-react";

interface Testimonial {
  id: number;
  name: string;
  rating: number;
  date: string;
  text: string;
  role: string;
  initials: string;
  color: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Kojo Mensah",
    rating: 5,
    date: "2 weeks ago",
    text: "My son has been taking piano lessons here for 6 months. The progress he's made is unbelievable. The instructors don't just teach notes; they teach the soul of the music. Highly recommend Gnosis!",
    role: "Parent",
    initials: "KM",
    color: "from-blue-500 to-cyan-400",
  },
  {
    id: 2,
    name: "Abena Appiah",
    rating: 5,
    date: "1 month ago",
    text: "As an adult beginner, I was nervous about starting guitar. Dr. Reyes made me feel so comfortable. The environment is professional yet extremely welcoming. GH₵47 for an intro lesson is a steal.",
    role: "Adult Student",
    initials: "AA",
    color: "from-purple-500 to-pink-400",
  },
  {
    id: 3,
    name: "Emmanuel Tetteh",
    rating: 5,
    date: "3 months ago",
    text: "The recording studio sessions are a game changer. I've learned more about music production here in 3 months than I did in 3 years of self-teaching. Best music school in the city, hands down.",
    role: "Production Student",
    initials: "ET",
    color: "from-orange-500 to-amber-400",
  },
  {
    id: 4,
    name: "Naa Ayeley",
    rating: 5,
    date: "5 days ago",
    text: "The Gnosis method is unique. They focus on fundamentals while keeping it fun. My daughter actually looks forward to her violin practice now. It's transformed our home!",
    role: "Parent",
    initials: "NA",
    color: "from-emerald-500 to-teal-400",
  },
];

export default function TestimonialSlider() {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const next = () => {
    setDirection(1);
    setIndex((prev: number) => (prev + 1) % testimonials.length);
  };

  const prev = () => {
    setDirection(-1);
    setIndex((prev: number) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  useEffect(() => {
    const timer = setInterval(next, 8000);
    return () => clearInterval(timer);
  }, []);

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 100 : -100,
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 100 : -100,
      opacity: 0,
    }),
  };

  return (
    <div className="relative w-full max-w-4xl mx-auto px-4 py-12">
      <div className="flex flex-col md:flex-row items-center justify-between mb-10 gap-6">
        <div>
          <div className="flex items-center gap-1 mb-2">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-5 h-5 fill-primary text-primary" />
            ))}
            <span className="ml-2 font-bold text-foreground">4.9 / 5.0</span>
          </div>
          <h2 className="font-heading font-bold text-3xl text-foreground">What Our Community Says</h2>
        </div>
        <div className="flex gap-2">
          <button
            onClick={prev}
            className="p-3 rounded-full border border-border hover:border-primary/40 hover:bg-primary/5 transition-all"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="w-5 h-5 text-foreground" />
          </button>
          <button
            onClick={next}
            className="p-3 rounded-full border border-border hover:border-primary/40 hover:bg-primary/5 transition-all"
            aria-label="Next testimonial"
          >
            <ChevronRight className="w-5 h-5 text-foreground" />
          </button>
        </div>
      </div>

      <div className="relative h-[320px] md:h-[260px] overflow-hidden">
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={index}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 },
            }}
            className="absolute inset-0"
          >
            <div className="bg-surface border border-border rounded-3xl p-8 md:p-10 shadow-sm h-full flex flex-col justify-center">
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center gap-4">
                  <div className={`w-14 h-14 rounded-full bg-gradient-to-br ${testimonials[index].color} flex items-center justify-center text-white font-bold text-xl shadow-lg`}>
                    {testimonials[index].initials}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-bold text-lg text-foreground">{testimonials[index].name}</h3>
                      <div className="flex items-center gap-1 text-[10px] bg-primary/10 text-primary px-2 py-0.5 rounded-full font-bold uppercase tracking-wider border border-primary/20">
                        <CheckCircle2 className="w-2.5 h-2.5" />
                        Verified
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground">{testimonials[index].role} • {testimonials[index].date}</p>
                  </div>
                </div>
                <div className="hidden sm:flex gap-0.5">
                  {[...Array(testimonials[index].rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                  ))}
                </div>
              </div>
              <p className="text-lg md:text-xl text-foreground leading-relaxed italic">
                &ldquo;{testimonials[index].text}&rdquo;
              </p>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="flex justify-center gap-2 mt-8">
        {testimonials.map((_, i) => (
          <button
            key={i}
            onClick={() => {
              setDirection(i > index ? 1 : -1);
              setIndex(i);
            }}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              i === index ? "w-8 bg-primary" : "w-2 bg-border hover:bg-primary/40"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
