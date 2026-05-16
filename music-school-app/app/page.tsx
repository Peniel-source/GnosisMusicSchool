"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  Mic2,
  Piano,
  Guitar,
  Music2,
  Drum,
  GraduationCap,
  ArrowRight,
  CheckCircle2,
  Star,
  Users,
  Clock,
  Award,
  Heart,
  Lightbulb,
  CalendarDays,
  Waves,
} from "lucide-react";
import SectionWrapper from "@/components/SectionWrapper";
import AnimatedCounter from "@/components/AnimatedCounter";
import InstrumentCard from "@/components/InstrumentCard";
import EventCard from "@/components/EventCard";
import dynamic from "next/dynamic";
import AnimeReveal from "@/components/AnimeReveal";
import AntigravityParticles from "@/components/AntigravityParticles";
import AntigravityTextReveal from "@/components/AntigravityTextReveal";
import { useMousePosition } from "@/lib/hooks/use-mouse-position";
import ParallaxWrapper from "@/components/ParallaxWrapper";
import ScrollScaleWrapper from "@/components/ScrollScaleWrapper";
import { blogPosts } from "@/lib/blog";
import { instrumentToSlug } from "@/lib/roadmap";
import { useRouter } from "next/navigation";

const AnimeWaveform    = dynamic(() => import("@/components/AnimeWaveform"),    { ssr: false });
const InstructorSlider = dynamic(() => import("@/components/InstructorSlider"), { ssr: false });
const VideoSlider      = dynamic(() => import("@/components/VideoSlider"),      { ssr: false });
const TestimonialSlider= dynamic(() => import("@/components/TestimonialSlider"),{ ssr: false });

/* ── data ─────────────────────────────────────────────── */

const instruments = [
  { icon: Mic2,         name: "Vocals",               image: "/instrument-vocals.jpeg",       description: "Build confidence, range, and stage presence with expert vocal coaching." },
  { icon: Piano,        name: "Piano",                 image: "/instrument-piano.jpeg",        description: "From classical foundations to modern improvisation and songwriting." },
  { icon: Guitar,       name: "Guitar (Acoustic)",     image: "/instrument-guitar.jpeg",       description: "Fingerpicking, chords, and music theory for beginners to advanced players." },
  { icon: Guitar,       name: "Bass Guitar",           image: "/instrument-bass.jpeg",         description: "Groove-focused instruction covering rhythm, timing, and band dynamics." },
  { icon: Music2,       name: "Electric Guitar",       image: "/instrument-electric.jpeg",     description: "Rock, blues, jazz, and everything in between with tone-shaping technique." },
  { icon: Waves,        name: "Trumpet / Brass",       image: "/instrument-brass.jpeg",        description: "Breath control, embouchure, and repertoire for orchestral and jazz settings." },
  { icon: Drum,         name: "Drums",                 image: "/instrument-drum.jpeg",        description: "Coordination, independence, and pocket — from rudiments to full kit performance." },
  { icon: GraduationCap, name: "After-School Programs", image: "/instrument-afterschool.jpeg", description: "Structured music enrichment designed for school-age learners in a fun group setting." },
];

const events = [
  {
    title: "Spring Recital 2025",
    date: "Saturday, May 17, 2025 · 3:00 PM",
    location: "Gnosis Main Hall",
    type: "Performance",
    description: "Watch our students shine on stage in our beloved bi-annual recital showcasing all instruments and skill levels.",
  },
  {
    title: "Summer Music Intensive",
    date: "July 7–11, 2025 · 9:00 AM",
    location: "Gnosis Studio Complex",
    type: "Workshop",
    description: "A five-day deep-dive camp covering theory, ensemble playing, recording techniques, and live performance skills.",
  },
  {
    title: "Jazz Night Open Mic",
    date: "Friday, June 6, 2025 · 7:00 PM",
    location: "The Grove Lounge",
    type: "Open Mic",
    description: "Students and alumni gather for an evening of improvisation, collaboration, and community in a relaxed venue setting.",
  },
];

const whyUs = [
  { icon: Star, title: "World-Class Instructors", description: "Every instructor holds advanced degrees or professional performance credentials in their instrument." },
  { icon: Users, title: "Small Class Sizes", description: "Capped enrollment ensures every student receives personalized attention and rapid progression." },
  { icon: Clock, title: "Flexible Scheduling", description: "Lessons available mornings, evenings, and weekends to fit your family's busy lifestyle." },
  { icon: Award, title: "Performance Opportunities", description: "Regular recitals, open mics, and masterclasses give students the stage experience they crave." },
  { icon: Heart, title: "Nurturing Environment", description: "We celebrate every win and support every challenge in a warm, judgment-free creative space." },
  { icon: Lightbulb, title: "Proven Curriculum", description: "Our structured method blends music theory, ear training, technique, and creativity for total musicianship." },
];

const programs = {
  kids: {
    title: "Kids (Ages 4–9)",
    description: "Our youngest musicians discover the joy of music through play-based learning, movement, and creativity. We nurture curiosity, build foundational rhythm and pitch skills, and instill a lifelong love of music in a safe, encouraging environment built specifically for little learners.",
    features: ["30-minute individual lessons", "Group rhythm classes", "Twice-yearly recitals", "Take-home practice guides"],
    image: "/program-kids.jpeg",
  },
  teens: {
    title: "Kids & Teens (Ages 10–17)",
    description: "Pre-teens and teens thrive in our dynamic program that balances technical mastery with creative freedom. Students explore genres they love, work in ensembles, record original music, and build real-world performance confidence.",
    features: ["45-minute individual lessons", "Ensemble & band workshops", "Studio recording sessions", "Competition prep support"],
    image: "/program-teens.jpeg",
  },
  adults: {
    title: "Adults (18+)",
    description: "Whether you're picking up an instrument for the first time or returning after years away, our adult program meets you exactly where you are. No judgment, no pressure — just skilled guidance and genuine progress at your own pace.",
    features: ["60-minute individual lessons", "Adult ensemble groups", "Flexible weeknight hours", "Theory workshops"],
    image: "/program-adults.jpeg",
  },
  private: {
    title: "Private Lessons",
    description: "Our flagship one-on-one lessons are fully customized to your goals, timeline, and learning style. Work directly with a specialist instructor in a dedicated weekly session, track your progress with milestone reviews, and accelerate toward your musical ambitions.",
    features: ["Any instrument, any level", "Customized curriculum", "Monthly progress reviews", "Priority scheduling"],
    image: "/program-private.jpeg",
  },
};


const noteSymbols = ["♩", "♪", "♫", "♬", "𝄞", "♭"];
const notePositions = [
  { x: "8%", delay: 0, duration: 7 },
  { x: "22%", delay: 1.5, duration: 9 },
  { x: "42%", delay: 0.8, duration: 6 },
  { x: "62%", delay: 2, duration: 8 },
  { x: "78%", delay: 0.3, duration: 7.5 },
  { x: "92%", delay: 1.2, duration: 6.5 },
];

/* ── page ─────────────────────────────────────────────── */

export default function HomePage() {
  const mousePosition = useMousePosition();
  const [activeProgram, setActiveProgram] = useState<keyof typeof programs>("kids");
  const router = useRouter();

  return (
    <>
      <AntigravityParticles />

      {/* Mouse Glow */}
      <motion.div
        className="pointer-events-none fixed inset-0 z-10 opacity-30 blur-[100px]"
        animate={{
          background: `radial-gradient(circle 250px at ${mousePosition.x}px ${mousePosition.y}px, oklch(0.72 0.155 182 / 0.15), transparent)`,
        }}
      />

      {/* ── Hero ── */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
        <div className="absolute inset-0 z-0">
          <Image
            src="/hero-bg.jpeg"
            alt="Music Studio"
            fill
            priority
            sizes="100vw"
            className="object-cover opacity-100"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-transparent to-background/40 dark:from-background/80 dark:via-background/20 dark:to-background/80" />
          <div className="absolute inset-0 bg-background/5 dark:bg-background/20" />
        </div>

        <div className="absolute inset-0 pointer-events-none z-10 opacity-0 dark:opacity-100">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[280px] h-[280px] sm:w-[500px] sm:h-[500px] lg:w-[700px] lg:h-[700px] rounded-full bg-primary/10 blur-[120px]" />
          {/* Animejs equalizer waveform — bottom of hero */}
          <div className="absolute bottom-16 left-1/2 -translate-x-1/2 text-primary/15 w-full flex justify-center overflow-hidden">
            <AnimeWaveform bars={28} />
          </div>
        </div>

        {notePositions.map((note, i) => (
          <div key={i} className="absolute bottom-0 select-none pointer-events-none" style={{ left: note.x }}>
            <motion.span
              className="text-xl sm:text-3xl text-primary/20 block"
              animate={{ y: [-10, -150], opacity: [0.15, 0.35, 0] }}
              transition={{ duration: note.duration, delay: note.delay, repeat: Infinity, ease: "easeOut" }}
            >
              {noteSymbols[i % 6]}
            </motion.span>
          </div>
        ))}

        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="inline-block bg-primary/10 border border-primary/30 text-primary text-xs font-semibold uppercase tracking-widest px-4 py-2 rounded-full mb-6">
              Enrolling Now · Summer 2025
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-heading font-black text-4xl sm:text-5xl lg:text-7xl xl:text-8xl text-foreground leading-[1.05] mb-6"
          >
            <AntigravityTextReveal text="Learn Music From " />
            <br className="hidden sm:block" />
            <span className="gradient-text">
              <AntigravityTextReveal text="World-Class" delay={0.5} />
            </span>{" "}
            <br className="hidden sm:block" />
            <AntigravityTextReveal text="Instructors" delay={0.8} />
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            Private lessons, group workshops, and live performances for kids, teens, and adults.
            Start your musical journey with a single intro lesson.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link
              href="/registration"
              className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground font-bold text-base px-8 py-4 rounded-full teal-glow hover:opacity-90 transition-all duration-200"
            >
              Book Intro Lesson — GH₵47
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href="/#instruments"
              className="inline-flex items-center justify-center gap-2 border border-border text-foreground font-semibold text-base px-8 py-4 rounded-full hover:border-primary/50 hover:text-primary transition-all duration-200"
            >
              Explore Programs
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="flex flex-wrap items-center justify-center gap-6 mt-14 text-sm text-muted-foreground"
          >
            {["No experience needed", "Any age welcome", "Cancel anytime"].map((t) => (
              <span key={t} className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-primary" /> {t}
              </span>
            ))}
          </motion.div>
        </div>

        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.8 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 w-5 h-8 border-2 border-border rounded-full flex items-start justify-center pt-1"
        >
          <div className="w-1 h-2 bg-primary rounded-full" />
        </motion.div>
      </section>

      {/* ── Trust Bar ── */}
      <div className="bg-surface border-y border-border py-5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
            {[
              { value: "9", label: "Instructors" },
              { value: "8", label: "Instruments" },
              { value: "500+", label: "Students" },
              { value: "10+", label: "Years of Excellence" },
            ].map((item, i) => (
              <div key={item.label} className="flex items-center gap-2">
                <span className="font-heading font-bold text-xl text-primary">{item.value}</span>
                <span className="text-sm text-muted-foreground">{item.label}</span>
                {i < 3 && <span className="hidden sm:block w-px h-4 bg-border ml-3" />}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── How It Works ── */}
      <section className="relative py-20 lg:py-28 overflow-hidden">
        {/* Background image */}
        <Image
          src="/how-it-does-not-works-bg.jpeg"
          alt=""
          fill
          sizes="100vw"
          className="object-cover object-center"
        />
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-background/90 via-background/75 to-background/90" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-14"
          >
            <h2 className="font-heading font-bold text-3xl sm:text-4xl lg:text-5xl text-foreground mb-4 text-balance">
              <AntigravityTextReveal text="How It Works" />
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">Three simple steps stand between you and a lifetime of musical growth.</p>
          </motion.div>
          <ScrollScaleWrapper>
            <div className="flex flex-col md:flex-row items-stretch gap-4">
              {[
                { step: "01", title: "Register Free", desc: "Create your free student profile and tell us about your goals and experience level. It takes under 2 minutes." },
                { step: "02", title: "Book Your GH₵47 Intro Lesson", desc: "Choose your instrument, pick a time that works, and meet your instructor for a personalized 45-minute session." },
                { step: "03", title: "Join a Membership", desc: "Love your intro lesson? Lock in your spot with a monthly membership starting at just GH₵156/month." },
              ].map((item, i) => (
                <div key={i} className="flex flex-col md:flex-row items-center flex-1">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.15, duration: 0.5 }}
                    className="bg-surface/80 backdrop-blur-sm border border-border rounded-2xl p-8 text-center flex-1 hover:border-primary/40 transition-colors h-full"
                  >
                    <div className="w-14 h-14 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center mx-auto mb-5">
                      <span className="font-heading font-bold text-xl text-primary">{item.step}</span>
                    </div>
                    <h3 className="font-heading font-bold text-xl text-foreground mb-2">{item.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                  </motion.div>
                  {i < 2 && (
                    <div className="flex items-center justify-center w-10 shrink-0 text-primary/30 rotate-90 md:rotate-0 my-2 md:my-0">
                      <ArrowRight className="w-6 h-6" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </ScrollScaleWrapper>
        </div>
      </section>

      {/* ── Instruments Grid ── */}
      <SectionWrapper variant="surface" id="instruments">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <h2 className="font-heading font-bold text-3xl sm:text-4xl lg:text-5xl text-foreground mb-4 text-balance">
            <AntigravityTextReveal text="Instruments We Teach" />
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">From classical piano to electric guitar — find your voice in the instrument that moves you.</p>
        </motion.div>
        <ParallaxWrapper offset={30}>
          <AnimeReveal className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5" staggerMs={70}>
            {instruments.map((inst, i) => (
              <InstrumentCard
                key={inst.name + i}
                {...inst}
                image={inst.image}
                index={i}
                onClick={() => router.push(`/roadmap/${instrumentToSlug(inst.name)}`)}
              />
            ))}
          </AnimeReveal>
        </ParallaxWrapper>
      </SectionWrapper>

      {/* ── Events ── */}
      <SectionWrapper variant="default" id="events">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <h2 className="font-heading font-bold text-3xl sm:text-4xl lg:text-5xl text-foreground mb-4 text-balance">
            <AntigravityTextReveal text="Upcoming Events" />
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">Recitals, workshops, open mics — life at Gnosis is always in rhythm.</p>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {events.map((event, i) => (
            <EventCard key={event.title} {...event} index={i} />
          ))}
        </div>
      </SectionWrapper>

      {/* ── Instructors Slider ── */}
      <section className="bg-surface py-20 border-y border-border">
        <div className="max-w-7xl mx-auto px-4 text-center mb-10">
          <h2 className="font-heading font-bold text-3xl sm:text-4xl lg:text-6xl text-foreground mb-4 text-balance">
            <AntigravityTextReveal text="Learn From the Best" />
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Our faculty consists of world-class performers and dedicated educators committed to your musical growth.
          </p>
        </div>
        <InstructorSlider />
      </section>

      {/* ── Why Choose Us ── */}
      <SectionWrapper variant="surface">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <h2 className="font-heading font-bold text-3xl sm:text-4xl lg:text-5xl text-foreground mb-4 text-balance">
            <AntigravityTextReveal text="Why Gnosis?" />
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            We&apos;re not just a music school — we&apos;re a creative community built on standards that make a real difference.
          </p>
        </motion.div>
        <ScrollScaleWrapper>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {whyUs.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ delay: i * 0.08, duration: 0.5 }}
                className="bg-background border border-border rounded-2xl p-6 hover:border-primary/40 transition-colors"
              >
                <div className="w-11 h-11 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-4">
                  <item.icon className="w-5 h-5 text-primary" />
                </div>
                <h3 className="font-heading font-semibold text-lg text-foreground mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </ScrollScaleWrapper>
      </SectionWrapper>

      {/* ── Programs by Age ── */}
      <SectionWrapper variant="default" id="programs">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <h2 className="font-heading font-bold text-3xl sm:text-4xl lg:text-5xl text-foreground mb-4 text-balance">
            <AntigravityTextReveal text="Programs For Every Stage" />
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">Music education that grows with you — from your first notes to the concert stage.</p>
        </motion.div>

        {/* Category pills */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {[
            { value: "kids" as const, label: "Kids (4–9)" },
            { value: "teens" as const, label: "Kids & Teens (10–17)" },
            { value: "adults" as const, label: "Adults (18+)" },
            { value: "private" as const, label: "Private Lessons" },
          ].map((tab) => (
            <button
              key={tab.value}
              onClick={() => setActiveProgram(tab.value)}
              className={`px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-200 ${
                activeProgram === tab.value
                  ? "bg-primary text-primary-foreground teal-glow"
                  : "bg-surface border border-border text-muted-foreground hover:border-primary/40 hover:text-foreground"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Program content */}
        {(() => {
          const prog = programs[activeProgram];
          return (
            <motion.div
              key={activeProgram}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="grid md:grid-cols-2 gap-10 items-center"
            >
              <div className="relative rounded-2xl overflow-hidden h-56 sm:h-72 md:h-96 border border-border">
                <Image
                  src={prog.image}
                  alt={prog.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
              <div>
                <h3 className="font-heading font-bold text-3xl text-foreground mb-4">{prog.title}</h3>
                <p className="text-muted-foreground leading-relaxed mb-6">{prog.description}</p>
                <ul className="space-y-2 mb-8">
                  {prog.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm text-foreground/80">
                      <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
                <Link
                  href="/registration"
                  className="inline-flex items-center gap-2 bg-primary text-primary-foreground font-semibold px-6 py-3 rounded-full teal-glow hover:opacity-90 transition-all"
                >
                  Enroll Now <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </motion.div>
          );
        })()}
      </SectionWrapper>

      {/* ── Animated Stats ── */}
      <div className="bg-surface border-y border-border py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-10">
            <AnimatedCounter target={9} label="Expert Instructors" />
            <AnimatedCounter target={10} suffix="+" label="Years of Excellence" />
            <AnimatedCounter target={8} label="Instruments Offered" />
            <AnimatedCounter target={500} suffix="+" label="Students Taught" />
          </div>
        </div>
      </div>

      {/* ── CTA Banner ── */}
      <section className="relative py-24 overflow-hidden bg-background">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-primary/8 blur-[120px] rounded-full" />
        </div>
        <ParallaxWrapper offset={-40}>
          <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="font-heading font-black text-3xl sm:text-4xl lg:text-6xl text-foreground mb-6 text-balance">
                <AntigravityTextReveal text="Your Musical Journey " />
                <span className="gradient-text">
                  <AntigravityTextReveal text="Starts Today" delay={0.4} />
                </span>
              </h2>
              <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
                One GH₵47 intro lesson is all it takes to discover your potential. No commitment required.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Link
                  href="/registration"
                  className="inline-flex items-center gap-2 bg-primary text-primary-foreground font-bold text-lg px-10 py-4 rounded-full teal-glow hover:opacity-90 transition-all"
                >
                  Book Your Intro Lesson <ArrowRight className="w-5 h-5" />
                </Link>
                <a href="tel:+233265410878" className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors font-medium">
                  <CalendarDays className="w-5 h-5 text-primary" />
                  Call Us: 026 541 0878
                </a>
              </div>
            </motion.div>
          </div>
        </ParallaxWrapper>
      </section>

      {/* ── Video Slider ── */}
      <section className="py-24 bg-surface border-y border-border">
        <VideoSlider />
      </section>

      {/* ── Testimonials ── */}
      <section className="py-24 bg-background">
        <TestimonialSlider />
      </section>

      {/* ── Blog Preview ── */}
      <SectionWrapper variant="surface" id="blog">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <h2 className="font-heading font-bold text-3xl sm:text-4xl lg:text-5xl text-foreground mb-4 text-balance">From Our Blog</h2>
          <p className="text-muted-foreground max-w-xl mx-auto">Practical tips, research, and stories from inside the Gnosis community.</p>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {blogPosts.map((post, i) => (
            <motion.article
              key={post.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="group bg-background border border-border rounded-2xl overflow-hidden hover:border-primary/40 transition-all duration-300"
            >
              <Link href={`/blog/${post.slug}`} className="relative h-44 overflow-hidden block">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </Link>
              <div className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xs font-semibold text-primary bg-primary/10 border border-primary/20 px-2.5 py-1 rounded-full">{post.tag}</span>
                  <span className="text-xs text-muted-foreground">{post.date}</span>
                </div>
                <Link href={`/blog/${post.slug}`}>
                  <h3 className="font-heading font-bold text-lg text-foreground mb-2 group-hover:text-primary transition-colors leading-snug">{post.title}</h3>
                </Link>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4">{post.excerpt}</p>
                <Link href={`/blog/${post.slug}`} className="inline-flex items-center gap-1 text-sm font-semibold text-primary hover:gap-2 transition-all">
                  Read More <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </motion.article>
          ))}
        </div>
      </SectionWrapper>

    </>
  );
}
