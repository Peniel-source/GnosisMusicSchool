"use client";

import React, { useEffect, useRef } from "react";
import { animate, stagger } from "animejs";

interface Particle {
  x: number;
  y: number;
  size: number;
  vx: number;
  vy: number;
  opacity: number;
  color: string;
}

export default function AntigravityParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let rafId: number;
    let particles: Particle[] = [];

    // Gnosis brand teal palette
    const colors = [
      "#00c4b0", // primary teal
      "#00d9c8", // light teal
      "#009e90", // dark teal
      "#ccfaf6", // cream-teal
      "#33d4c4", // mid teal
    ];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initParticles();
    };

    const initParticles = () => {
      particles = [];
      const count = Math.floor((canvas.width * canvas.height) / 10000);
      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 1.5 + 0.4,
          vx: (Math.random() - 0.5) * 0.35,
          vy: -Math.random() * 0.4 - 0.1, // slight upward drift (anti-gravity)
          opacity: Math.random() * 0.5 + 0.1,
          color: colors[Math.floor(Math.random() * colors.length)],
        });
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        ctx.save();
        ctx.globalAlpha = p.opacity;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.fill();
        ctx.restore();

        p.x += p.vx;
        p.y += p.vy;

        // Wrap at edges
        if (p.x < -2) p.x = canvas.width + 2;
        if (p.x > canvas.width + 2) p.x = -2;
        if (p.y < -2) {
          p.y = canvas.height + 2;
          p.x = Math.random() * canvas.width;
        }
        if (p.y > canvas.height + 2) p.y = -2;
      });
      rafId = requestAnimationFrame(draw);
    };

    window.addEventListener("resize", resize);
    resize();
    draw();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ opacity: 0.45 }}
      aria-hidden="true"
    />
  );
}
