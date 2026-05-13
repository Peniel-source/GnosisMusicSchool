"use client";

import { useEffect, useRef, ReactNode } from "react";
import { animate, stagger } from "animejs";

interface AnimeRevealProps {
  children: ReactNode;
  className?: string;
  selector?: string;
  delay?: number;
  staggerMs?: number;
}

/**
 * Wraps children and uses animejs to stagger-reveal direct children
 * when the container scrolls into view.
 */
export default function AnimeReveal({
  children,
  className = "",
  selector = ":scope > *",
  delay = 0,
  staggerMs = 80,
}: AnimeRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const triggered = useRef(false);

  useEffect(() => {
    const container = ref.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !triggered.current) {
          triggered.current = true;
          const targets = container.querySelectorAll(selector);
          animate(targets, {
            opacity: [0, 1],
            translateY: [32, 0],
            duration: 600,
            ease: "outCubic",
            delay: stagger(staggerMs, { start: delay }),
          });
        }
      },
      { threshold: 0.1 }
    );

    // Set initial hidden state
    const targets = container.querySelectorAll(selector);
    targets.forEach((el) => {
      (el as HTMLElement).style.opacity = "0";
      (el as HTMLElement).style.transform = "translateY(32px)";
    });

    observer.observe(container);
    return () => observer.disconnect();
  }, [selector, delay, staggerMs]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
