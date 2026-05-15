"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronLeft, ChevronRight, Volume2, VolumeX } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const videos = [
  { src: "/Images_tmp2/WhatsApp%20Video%202026-05-14%20at%2011.02.13%20AM.mp4", type: "video/mp4" },
  { src: "/Images_tmp2/WhatsApp%20Video%202026-05-14%20at%2011.02.13%20AM%20(1).mp4", type: "video/mp4" },
  { src: "/Images_tmp2/WhatsApp%20Video%202026-05-14%20at%2011.02.14%20AM.mp4", type: "video/mp4" },
  { src: "/Images_tmp2/IMG_1029.MOV", type: "video/quicktime" },
];

export default function VideoSlider() {
  const [current, setCurrent] = useState(0);
  const [muted, setMuted] = useState(true);
  const [direction, setDirection] = useState<1 | -1>(1);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  const pauseAll = () => {
    videoRefs.current.forEach((v) => {
      if (v) { v.pause(); v.currentTime = 0; }
    });
  };

  const go = (next: number, dir: 1 | -1) => {
    pauseAll();
    setDirection(dir);
    setCurrent(next);
  };

  const prev = () => go((current - 1 + videos.length) % videos.length, -1);
  const next = () => go((current + 1) % videos.length, 1);

  useEffect(() => {
    const v = videoRefs.current[current];
    if (v) v.play().catch(() => {});
  }, [current]);

  const variants = {
    enter: (d: number) => ({ x: d * 80, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (d: number) => ({ x: d * -80, opacity: 0 }),
  };

  return (
    <div className="max-w-4xl mx-auto px-4">
      {/* Header */}
      <div className="text-center mb-10">
        <h2 className="font-heading font-bold text-4xl lg:text-5xl text-foreground mb-4">
          See Us in Action
        </h2>
        <p className="text-muted-foreground max-w-xl mx-auto">
          Real moments from our students, performances, and events — straight from the Gnosis stage.
        </p>
      </div>

      {/* Slider */}
      <div className="relative">
        {/* Video frame */}
        <div className="relative rounded-2xl overflow-hidden bg-black aspect-video border border-border shadow-2xl">
          <AnimatePresence custom={direction} mode="wait">
            <motion.div
              key={current}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.35, ease: "easeInOut" }}
              className="absolute inset-0"
            >
              <video
                ref={(el) => { videoRefs.current[current] = el; }}
                src={videos[current].src}
                muted={muted}
                playsInline
                controls
                className="w-full h-full object-contain"
              />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Prev / Next arrows */}
        <button
          onClick={prev}
          aria-label="Previous video"
          className="absolute left-2 sm:left-0 sm:-translate-x-1/2 top-1/2 -translate-y-1/2 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-background/90 sm:bg-background border border-border shadow-lg flex items-center justify-center text-foreground hover:text-primary hover:border-primary/50 transition-colors z-10"
        >
          <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>
        <button
          onClick={next}
          aria-label="Next video"
          className="absolute right-2 sm:right-0 sm:translate-x-1/2 top-1/2 -translate-y-1/2 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-background/90 sm:bg-background border border-border shadow-lg flex items-center justify-center text-foreground hover:text-primary hover:border-primary/50 transition-colors z-10"
        >
          <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>
      </div>

      {/* Dots + mute toggle */}
      <div className="flex items-center justify-center gap-6 mt-6">
        <div className="flex items-center gap-1">
          {videos.map((_, i) => (
            <button
              key={i}
              onClick={() => go(i, i > current ? 1 : -1)}
              aria-label={`Go to video ${i + 1}`}
              className="p-2 flex items-center justify-center"
            >
              <span className={`rounded-full transition-all duration-200 block ${
                i === current
                  ? "w-6 h-2 bg-primary"
                  : "w-2 h-2 bg-border hover:bg-primary/50"
              }`} />
            </button>
          ))}
        </div>

        <button
          onClick={() => setMuted((m) => !m)}
          aria-label="Toggle mute"
          className="p-1.5 rounded-full text-muted-foreground hover:text-primary transition-colors"
        >
          {muted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
        </button>
      </div>

      {/* Counter */}
      <p className="text-center text-xs text-muted-foreground mt-3">
        {current + 1} / {videos.length}
      </p>
    </div>
  );
}
