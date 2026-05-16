"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowRight, ChevronDown } from "lucide-react";
import { LucideIcon } from "lucide-react";
import { getRoadmap, type Phase } from "@/lib/roadmap";

interface Props {
  instrument: string;
  icon: LucideIcon;
  onClose: () => void;
}

const PHASE_COLORS = [
  { dot: "bg-primary", glow: "shadow-[0_0_16px_4px_oklch(0.72_0.155_182/45%)]", ring: "ring-primary/50", bar: "bg-primary" },
  { dot: "bg-amber-400", glow: "shadow-[0_0_16px_4px_rgba(251,191,36,0.4)]",  ring: "ring-amber-400/50", bar: "bg-amber-400" },
  { dot: "bg-violet-400", glow: "shadow-[0_0_16px_4px_rgba(167,139,250,0.4)]", ring: "ring-violet-400/50", bar: "bg-violet-400" },
  { dot: "bg-rose-400",  glow: "shadow-[0_0_16px_4px_rgba(251,113,133,0.4)]",  ring: "ring-rose-400/50",  bar: "bg-rose-400" },
];

function PhaseBlock({ phase, colorIdx, isLast }: { phase: Phase; colorIdx: number; isLast: boolean }) {
  const [open, setOpen] = useState(true);
  const c = PHASE_COLORS[colorIdx % PHASE_COLORS.length];

  return (
    <div className="relative flex gap-5 sm:gap-8">
      {/* Spine */}
      <div className="flex flex-col items-center">
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
          className={`relative z-10 w-10 h-10 rounded-full flex items-center justify-center font-heading font-black text-sm text-background ring-2 ${c.ring} ${c.dot} ${c.glow} shrink-0`}
        >
          {phase.number}
        </motion.div>
        {!isLast && (
          <motion.div
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, ease: "easeInOut", delay: 0.15 }}
            style={{ originY: 0 }}
            className={`w-0.5 flex-1 mt-2 opacity-30 ${c.bar}`}
          />
        )}
      </div>

      {/* Card */}
      <motion.div
        initial={{ opacity: 0, x: 30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.5, ease: "easeOut", delay: 0.08 }}
        className="flex-1 pb-14"
      >
        {/* Phase header */}
        <button
          onClick={() => setOpen((o) => !o)}
          className="w-full flex items-start justify-between gap-4 mb-5 group text-left"
        >
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-1">
              <span className={`text-xs font-bold uppercase tracking-widest px-2.5 py-0.5 rounded-full bg-white/5 border border-white/10 ${c.dot.replace("bg-", "text-")}`}>
                Phase {phase.number}
              </span>
              <span className="text-xs text-zinc-500 font-medium">{phase.duration}</span>
            </div>
            <h3 className="font-heading font-black text-2xl sm:text-3xl text-white leading-tight">
              {phase.name}
            </h3>
            <p className="text-sm text-zinc-400 mt-0.5">{phase.level}</p>
          </div>
          <ChevronDown
            className={`w-5 h-5 text-zinc-500 group-hover:text-white transition-all duration-300 shrink-0 mt-1 ${open ? "rotate-180" : ""}`}
          />
        </button>

        {/* Milestones */}
        <AnimatePresence initial={false}>
          {open && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.35, ease: "easeInOut" }}
              className="overflow-hidden"
            >
              <div className="grid sm:grid-cols-2 gap-3">
                {phase.milestones.map((ms, mi) => (
                  <motion.div
                    key={ms.title}
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-20px" }}
                    transition={{ delay: mi * 0.07, duration: 0.4 }}
                    className="relative bg-white/[0.04] hover:bg-white/[0.07] border border-white/8 rounded-xl p-4 transition-colors group/ms"
                  >
                    {/* Milestone number */}
                    <span className={`absolute -top-2.5 -left-2 w-5 h-5 rounded-full text-[10px] font-black flex items-center justify-center text-background ${c.dot}`}>
                      {mi + 1}
                    </span>
                    <h4 className="font-heading font-bold text-sm text-white mb-2.5 leading-tight group-hover/ms:text-primary transition-colors">
                      {ms.title}
                    </h4>
                    <ul className="space-y-1.5">
                      {ms.skills.map((skill) => (
                        <li key={skill} className="flex items-start gap-2 text-xs text-zinc-400 leading-relaxed">
                          <span className={`mt-1.5 w-1 h-1 rounded-full shrink-0 opacity-70 ${c.dot}`} />
                          {skill}
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}

export default function InstrumentRoadmapModal({ instrument, icon: Icon, onClose }: Props) {
  const roadmap = getRoadmap(instrument);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [scrollPct, setScrollPct] = useState(0);

  // Lock body scroll
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  // Scroll progress
  const onScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    const pct = el.scrollTop / (el.scrollHeight - el.clientHeight);
    setScrollPct(Math.min(1, Math.max(0, pct)));
  };

  if (!roadmap) return null;

  return (
    <AnimatePresence>
      {/* Backdrop */}
      <motion.div
        key="backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm"
      />

      {/* Panel */}
      <motion.div
        key="panel"
        initial={{ opacity: 0, y: "100%" }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: "100%" }}
        transition={{ type: "spring", stiffness: 220, damping: 28 }}
        className="fixed inset-x-0 bottom-0 z-50 h-[92dvh] sm:h-[88dvh] flex flex-col rounded-t-3xl overflow-hidden"
        style={{ background: "linear-gradient(160deg, #0c0c12 0%, #0a0a0e 100%)" }}
      >
        {/* Film grain overlay */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)'/%3E%3C/svg%3E")`,
            backgroundRepeat: "repeat",
          }}
        />

        {/* Vignette */}
        <div className="pointer-events-none absolute inset-0 bg-radial-[ellipse_at_center] from-transparent via-transparent to-black/60" />

        {/* Scroll progress bar */}
        <motion.div
          className="absolute top-0 left-0 h-0.5 bg-primary z-20"
          style={{ width: `${scrollPct * 100}%` }}
          transition={{ duration: 0.05 }}
        />

        {/* Header */}
        <div className="relative z-10 flex items-center justify-between px-5 sm:px-8 py-5 border-b border-white/8 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary/15 border border-primary/30 flex items-center justify-center">
              <Icon className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="text-xs text-zinc-500 font-semibold uppercase tracking-widest">Curriculum Roadmap</p>
              <h2 className="font-heading font-black text-xl text-white leading-tight">{roadmap.instrument}</h2>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-white/6 hover:bg-white/12 border border-white/10 flex items-center justify-center text-zinc-400 hover:text-white transition-colors"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Scrollable body */}
        <div
          ref={scrollRef}
          onScroll={onScroll}
          className="flex-1 overflow-y-auto overscroll-contain"
        >
          <div className="max-w-3xl mx-auto px-5 sm:px-8 py-10">
            {/* Tagline */}
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className="font-heading text-lg sm:text-xl text-zinc-300 italic mb-10 leading-relaxed"
            >
              &ldquo;{roadmap.tagline}&rdquo;
            </motion.p>

            {/* Phase count strip */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="flex flex-wrap gap-2 mb-12"
            >
              {roadmap.phases.map((ph, i) => {
                const c = PHASE_COLORS[i % PHASE_COLORS.length];
                return (
                  <span
                    key={ph.name}
                    className={`text-xs font-semibold px-3 py-1 rounded-full bg-white/5 border border-white/10 ${c.dot.replace("bg-", "text-")}`}
                  >
                    {ph.name} · {ph.level}
                  </span>
                );
              })}
            </motion.div>

            {/* Timeline */}
            <div>
              {roadmap.phases.map((phase, i) => (
                <PhaseBlock
                  key={phase.name}
                  phase={phase}
                  colorIdx={i}
                  isLast={i === roadmap.phases.length - 1}
                />
              ))}
            </div>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mt-4 p-6 rounded-2xl border border-primary/25 bg-primary/5 text-center"
            >
              <p className="text-zinc-300 text-sm mb-1 uppercase tracking-widest font-semibold">Ready to begin?</p>
              <h3 className="font-heading font-black text-2xl text-white mb-4">
                Start Your {roadmap.instrument} Journey
              </h3>
              <Link
                href="/registration"
                onClick={onClose}
                className="inline-flex items-center gap-2 bg-primary text-background font-bold px-7 py-3 rounded-full hover:opacity-90 transition-all text-sm"
                style={{ boxShadow: "0 0 24px oklch(0.72 0.155 182 / 40%)" }}
              >
                Book Intro Lesson — GH₵47 <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>

            <div className="h-8" />
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
