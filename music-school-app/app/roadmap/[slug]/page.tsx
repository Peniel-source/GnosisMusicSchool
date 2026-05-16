"use client";

import { use, useRef, useState } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
  useTransform,
} from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { slugToRoadmap, type Phase } from "@/lib/roadmap";

/* ── Constants ─────────────────────────────────────────── */

// Each card enters from one of these screen-edge positions
const ENTER_FROM = [
  { x: -900, y: -350, rotate: -38, scale: 0.15 },
  { x: 900,  y: -280, rotate:  32, scale: 0.15 },
  { x: -700, y:  480, rotate: -26, scale: 0.15 },
  { x: 800,  y:  420, rotate:  30, scale: 0.15 },
];

// Each card exits to a DIFFERENT edge (creates the "break-apart" effect)
const EXIT_TO = [
  { x: 950,  y:  380, rotate:  42, scale: 0.1 },
  { x: -850, y:  300, rotate: -36, scale: 0.1 },
  { x: 720,  y: -500, rotate:  28, scale: 0.1 },
  { x: -780, y: -460, rotate: -32, scale: 0.1 },
];

const PHASE_ACCENT_COLOR = [
  "oklch(0.72 0.155 182)",   // teal
  "oklch(0.82 0.17  75)",    // amber
  "oklch(0.70 0.18  295)",   // violet
  "oklch(0.72 0.20  15)",    // rose
];

const PHASE_TEXT_CLASS = [
  "text-[oklch(0.72_0.155_182)]",
  "text-[oklch(0.82_0.17_75)]",
  "text-[oklch(0.70_0.18_295)]",
  "text-[oklch(0.72_0.20_15)]",
];

const PHASE_BORDER_CLASS = [
  "border-[oklch(0.72_0.155_182/0.35)]",
  "border-[oklch(0.82_0.17_75/0.35)]",
  "border-[oklch(0.70_0.18_295/0.35)]",
  "border-[oklch(0.72_0.20_15/0.35)]",
];

/* ── SplitText ─────────────────────────────────────────── */

function SplitText({
  text,
  className,
  phaseIdx,
}: {
  text: string;
  className?: string;
  phaseIdx: number;
}) {
  // Each char gets a deterministic "scatter" angle based on index
  return (
    <span className={className} aria-label={text}>
      {text.split("").map((char, i) => {
        const spread = ((i % 5) - 2) * 14;          // -28 to +28 deg
        const vy     = i % 2 === 0 ? -80 : 80;      // alternating vertical
        const vx     = ((i % 3) - 1) * 55;          // -55, 0, +55

        return (
          <motion.span
            key={`${phaseIdx}-${i}`}
            initial={{
              opacity: 0,
              y: vy,
              x: vx,
              rotate: spread,
              filter: "blur(10px)",
            }}
            animate={{
              opacity: 1,
              y: 0,
              x: 0,
              rotate: 0,
              filter: "blur(0px)",
            }}
            exit={{
              opacity: 0,
              y: -vy * 0.8,
              x: -vx * 0.8,
              rotate: -spread,
              filter: "blur(8px)",
              transition: { duration: 0.28, delay: i * 0.018, ease: "easeIn" },
            }}
            transition={{
              duration: 0.55,
              delay: 0.06 + i * 0.038,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="inline-block"
          >
            {char === " " ? " " : char}
          </motion.span>
        );
      })}
    </span>
  );
}

/* ── PhaseScene ─────────────────────────────────────────── */

function PhaseScene({
  phase,
  phaseIdx,
  total,
}: {
  phase: Phase;
  phaseIdx: number;
  total: number;
}) {
  const accent = PHASE_ACCENT_COLOR[phaseIdx % PHASE_ACCENT_COLOR.length];
  const textCls = PHASE_TEXT_CLASS[phaseIdx % PHASE_TEXT_CLASS.length];

  return (
    // This div is the "scene" — it fills the sticky viewport
    <motion.div
      className="absolute inset-0 flex flex-col"
      // No enter/exit here — children handle their own animations
    >
      {/* ── Ambient glow blob (phase-coloured) ── */}
      <motion.div
        initial={{ opacity: 0, scale: 1.6 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.6, transition: { duration: 0.4 } }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[700px] rounded-full"
          style={{
            background: accent,
            opacity: 0.055,
            filter: "blur(160px)",
          }}
        />
      </motion.div>

      {/* ── Big background phase number ── */}
      <motion.div
        initial={{ opacity: 0, scale: 2.4, rotate: 20 }}
        animate={{ opacity: 1, scale: 1, rotate: 0 }}
        exit={{ opacity: 0, scale: 0.4, rotate: -15, transition: { duration: 0.35 } }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        className="pointer-events-none absolute inset-0 flex items-center justify-center select-none"
      >
        <span
          className="font-heading font-black text-white"
          style={{
            fontSize: "clamp(200px, 38vw, 420px)",
            lineHeight: 1,
            opacity: 0.028,
            letterSpacing: "-0.04em",
          }}
        >
          {String(phase.number).padStart(2, "0")}
        </span>
      </motion.div>

      {/* ── Main content ── */}
      <div className="relative z-10 flex flex-col h-full justify-center px-5 sm:px-10 lg:px-16 pt-20 pb-8">

        {/* Phase meta */}
        <motion.div
          initial={{ opacity: 0, y: -18 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 16, transition: { duration: 0.2 } }}
          transition={{ delay: 0.04, duration: 0.4 }}
          className="flex items-center gap-3 mb-4"
        >
          <span
            className={`text-[11px] font-black uppercase tracking-[0.2em] px-3 py-1 rounded-full border ${textCls} ${PHASE_BORDER_CLASS[phaseIdx % 4]}`}
            style={{ background: `${accent}14` }}
          >
            Phase {phase.number} of {total}
          </span>
          <span className="text-xs text-zinc-500 font-semibold">{phase.duration}</span>
          <span className="text-xs text-zinc-600">·</span>
          <span className="text-xs text-zinc-500 font-semibold">{phase.level}</span>
        </motion.div>

        {/* Phase name — character split */}
        <h2
          className="font-heading font-black text-white leading-[0.92] mb-8 sm:mb-10"
          style={{ fontSize: "clamp(3rem, 8vw, 7rem)", letterSpacing: "-0.03em" }}
        >
          <SplitText text={phase.name} phaseIdx={phaseIdx} />
        </h2>

        {/* ── Milestone cards ── */}
        <div className="grid grid-cols-2 xl:grid-cols-4 gap-3 sm:gap-4 flex-1 max-h-[52vh]">
          {phase.milestones.map((ms, mi) => {
            const from = ENTER_FROM[mi % ENTER_FROM.length];
            const to   = EXIT_TO[mi % EXIT_TO.length];

            return (
              <motion.div
                key={`${phaseIdx}-${ms.title}`}
                // ── ENTER: fly in from scattered position ──
                initial={{
                  x: from.x,
                  y: from.y,
                  rotate: from.rotate,
                  scale: from.scale,
                  opacity: 0,
                  filter: "blur(16px)",
                }}
                animate={{
                  x: 0,
                  y: 0,
                  rotate: 0,
                  scale: 1,
                  opacity: 1,
                  filter: "blur(0px)",
                }}
                // ── EXIT: break apart to different corners ──
                exit={{
                  x: to.x,
                  y: to.y,
                  rotate: to.rotate,
                  scale: to.scale,
                  opacity: 0,
                  filter: "blur(10px)",
                  transition: {
                    delay: mi * 0.055,
                    duration: 0.38,
                    ease: [0.36, 0, 0.66, -0.4],
                  },
                }}
                transition={{
                  delay: 0.18 + mi * 0.1,
                  duration: 0.72,
                  ease: [0.22, 1, 0.36, 1],
                }}
                whileHover={{ scale: 1.03, y: -5, transition: { duration: 0.2 } }}
                className="relative flex flex-col bg-white/[0.045] border border-white/[0.09] rounded-2xl overflow-hidden cursor-default group/card"
                style={{ backdropFilter: "blur(6px)" }}
              >
                {/* Top accent bar — slides in from left */}
                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 0.32 + mi * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  style={{ background: accent, transformOrigin: "left" }}
                  className="absolute top-0 left-0 right-0 h-[2px]"
                />

                <div className="p-4 sm:p-5 flex flex-col flex-1">
                  {/* Large muted milestone number */}
                  <span
                    className="font-heading font-black leading-none mb-2 select-none"
                    style={{
                      fontSize: "clamp(2.2rem, 4vw, 3.5rem)",
                      color: accent,
                      opacity: 0.12,
                    }}
                  >
                    {String(mi + 1).padStart(2, "0")}
                  </span>

                  {/* Milestone title */}
                  <h4
                    className="font-heading font-bold text-white leading-snug mb-3 group-hover/card:opacity-90 transition-opacity"
                    style={{ fontSize: "clamp(0.8rem, 1.2vw, 1rem)" }}
                  >
                    {ms.title}
                  </h4>

                  {/* Skills list */}
                  <ul className="mt-auto space-y-1.5">
                    {ms.skills.map((skill, si) => (
                      <motion.li
                        key={skill}
                        initial={{ opacity: 0, x: -8 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{
                          delay: 0.45 + mi * 0.1 + si * 0.055,
                          duration: 0.3,
                        }}
                        className="flex items-start gap-1.5 text-zinc-400"
                        style={{ fontSize: "clamp(0.67rem, 0.9vw, 0.78rem)", lineHeight: 1.5 }}
                      >
                        <span
                          className="mt-[5px] w-[5px] h-[5px] rounded-full shrink-0"
                          style={{ background: accent, opacity: 0.55 }}
                        />
                        {skill}
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}

/* ── Page ────────────────────────────────────────────────── */

export default function RoadmapPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const roadmap = slugToRoadmap(slug);
  if (!roadmap) notFound();

  const outerRef = useRef<HTMLDivElement>(null);

  // scrollYProgress 0→1 across the entire tall container
  const { scrollYProgress } = useScroll({
    target: outerRef,
    offset: ["start start", "end end"],
  });

  // Map scroll → thin top progress bar width
  const barWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  const [activePhase, setActivePhase] = useState(0);
  const [showCta, setShowCta]         = useState(false);
  const phases = roadmap.phases;

  // 0→0.88 = phases, 0.88→1 = CTA
  const PHASE_BAND = 0.88;

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    if (v >= PHASE_BAND) {
      setShowCta(true);
    } else {
      setShowCta(false);
      const idx = Math.min(
        Math.floor((v / PHASE_BAND) * phases.length),
        phases.length - 1
      );
      setActivePhase(idx);
    }
  });

  return (
    // Outer container — its scroll distance drives all animations
    <div
      ref={outerRef}
      style={{ height: `${phases.length * 150 + 100}vh` }}
      className="relative"
    >
      {/* ── Sticky viewport ── */}
      <div
        className="sticky top-0 h-[100dvh] overflow-hidden"
        style={{ background: "linear-gradient(150deg,#07070e 0%,#0b0b15 100%)" }}
      >
        {/* Film grain */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 z-30 mix-blend-overlay"
          style={{
            opacity: 0.032,
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='250' height='250'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.88' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='250' height='250' filter='url(%23n)'/%3E%3C/svg%3E")`,
          }}
        />

        {/* Vignette edges */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 z-20"
          style={{
            background:
              "radial-gradient(ellipse 80% 80% at 50% 50%, transparent 55%, rgba(0,0,0,0.65) 100%)",
          }}
        />

        {/* ── Scroll progress bar (top edge) ── */}
        <motion.div
          className="absolute top-0 left-0 h-[2px] z-50"
          style={{
            width: barWidth,
            background: PHASE_ACCENT_COLOR[activePhase % PHASE_ACCENT_COLOR.length],
            boxShadow: `0 0 12px ${PHASE_ACCENT_COLOR[activePhase % PHASE_ACCENT_COLOR.length]}`,
            transition: "background 0.5s, box-shadow 0.5s",
          }}
        />

        {/* ── Header ── */}
        <div className="absolute top-0 left-0 right-0 z-40 flex items-center justify-between px-5 sm:px-8 py-5">
          <Link
            href="/#instruments"
            className="inline-flex items-center gap-2 text-sm text-zinc-500 hover:text-white transition-colors font-medium"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Instruments</span>
          </Link>

          {/* Phase dot strip */}
          <div className="flex items-center gap-2">
            {phases.map((_, i) => (
              <motion.div
                key={i}
                animate={{
                  width:   i === activePhase && !showCta ? 20 : 6,
                  opacity: i === activePhase && !showCta ? 1  : 0.28,
                }}
                style={{
                  background:
                    i === activePhase
                      ? PHASE_ACCENT_COLOR[i % PHASE_ACCENT_COLOR.length]
                      : "#fff",
                }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
                className="h-1.5 rounded-full"
              />
            ))}
          </div>

          <div className="text-[11px] text-zinc-600 font-semibold uppercase tracking-widest hidden sm:block">
            {roadmap.instrument}
          </div>
        </div>

        {/* ── Scene layer (phases + CTA) ── */}
        <AnimatePresence mode="sync">
          {!showCta ? (
            <PhaseScene
              key={`phase-${activePhase}`}
              phase={phases[activePhase]}
              phaseIdx={activePhase}
              total={phases.length}
            />
          ) : (
            /* ── CTA scene ── */
            <motion.div
              key="cta"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, transition: { duration: 0.2 } }}
              transition={{ duration: 0.6 }}
              className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 z-10"
            >
              {/* Glow */}
              <div
                className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] rounded-full"
                style={{ background: PHASE_ACCENT_COLOR[0], opacity: 0.07, filter: "blur(140px)" }}
              />

              <motion.p
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-zinc-500 uppercase tracking-[0.25em] text-xs font-bold mb-5"
              >
                You&apos;ve seen the path
              </motion.p>

              <motion.h2
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.18 }}
                className="font-heading font-black text-white mb-3 leading-tight"
                style={{ fontSize: "clamp(2.2rem, 6vw, 5rem)" }}
              >
                Begin Your Journey
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.26 }}
                className="text-zinc-400 text-base mb-10 max-w-sm"
              >
                {roadmap.tagline}
              </motion.p>

              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.36, type: "spring", stiffness: 200 }}
              >
                <Link
                  href="/registration"
                  className="inline-flex items-center gap-2 bg-primary text-background font-bold px-9 py-4 rounded-full text-sm"
                  style={{ boxShadow: `0 0 36px ${PHASE_ACCENT_COLOR[0]}60` }}
                >
                  Book Intro — GH₵47 <ArrowRight className="w-4 h-4" />
                </Link>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── Scroll hint (first phase only) ── */}
        <AnimatePresence>
          {activePhase === 0 && !showCta && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ delay: 1 }}
              className="absolute bottom-7 left-1/2 -translate-x-1/2 z-40 flex flex-col items-center gap-2"
            >
              <span className="text-[10px] text-zinc-600 uppercase tracking-[0.25em] font-semibold">
                Scroll
              </span>
              <motion.div
                animate={{ y: [0, 7, 0] }}
                transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}
                className="w-px h-8 bg-gradient-to-b from-zinc-600 to-transparent"
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── Phase label (bottom-left) ── */}
        <AnimatePresence mode="wait">
          {!showCta && (
            <motion.div
              key={activePhase}
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 12, transition: { duration: 0.18 } }}
              transition={{ duration: 0.35 }}
              className="absolute bottom-7 left-5 sm:left-8 z-40 hidden sm:block"
            >
              <p className="text-[10px] text-zinc-600 font-semibold uppercase tracking-widest">
                {activePhase + 1} / {phases.length} — {phases[activePhase].name}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
