"use client";

import { useEffect, useRef, useState } from "react";
import { animate } from "animejs";

interface AnimatedCounterProps {
  target: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
  label: string;
}

export default function AnimatedCounter({
  target,
  suffix = "",
  prefix = "",
  duration = 2000,
  label,
}: AnimatedCounterProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [value, setValue] = useState(0);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const obj = { count: 0 };
          animate(obj, {
            count: target,
            duration,
            ease: "outExpo",
            onUpdate: () => setValue(Math.round(obj.count)),
          });
        }
      },
      { threshold: 0.4 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [target, duration]);

  return (
    <div ref={ref} className="text-center">
      <p className="font-heading font-bold text-5xl lg:text-6xl text-primary mb-2 tabular-nums">
        {prefix}{value.toLocaleString()}{suffix}
      </p>
      <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider">{label}</p>
    </div>
  );
}
