"use client";

import { useEffect, useRef, useState } from "react";
import { animate, stagger } from "animejs";

interface AnimeWaveformProps {
  bars?: number;
  className?: string;
}

export default function AnimeWaveform({ bars = 40, className = "" }: AnimeWaveformProps) {
  const containerRef = useRef<SVGSVGElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const svg = containerRef.current;
    if (!svg) return;

    const rects = svg.querySelectorAll("rect");
    if (!rects.length) return;

    // Continuous looping equalizer pulse using animejs stagger
    const anim = animate(rects, {
      scaleY: [
        { to: () => 0.15 + Math.random() * 0.85 },
        { to: () => 0.15 + Math.random() * 0.85 },
        { to: () => 0.15 + Math.random() * 0.85 },
      ],
      duration: 900,
      ease: "inOutSine",
      loop: true,
      delay: stagger(30, { start: 0 }),
    });

    return () => {
      anim.pause();
    };
  }, []);

  const barWidth = 3;
  const gap = 4;
  const totalWidth = bars * (barWidth + gap) - gap;
  const height = 80;

  return (
    <svg
      ref={containerRef}
      width={totalWidth}
      height={height}
      viewBox={`0 0 ${totalWidth} ${height}`}
      aria-hidden="true"
      className={className}
      style={{ transformOrigin: "center" }}
    >
      {Array.from({ length: bars }).map((_, i) => {
        const x = i * (barWidth + gap);
        const initialH = mounted ? 8 + Math.random() * (height - 8) : 20;
        return (
          <rect
            key={i}
            x={x}
            y={0}
            width={barWidth}
            height={initialH}
            rx={1.5}
            fill="currentColor"
            style={{
              transformBox: "fill-box",
              transformOrigin: "center bottom",
            }}
          />
        );
      })}
    </svg>
  );
}
