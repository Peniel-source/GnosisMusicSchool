"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Star, Users, Clock, Award, Heart, Lightbulb, GraduationCap, Music, BookOpen, Trophy } from "lucide-react";
import SectionWrapper from "@/components/SectionWrapper";
import InstructorCard from "@/components/InstructorCard";

const instructors = [
  { name: "Dr. Amara Nkosi", role: "Lead Vocal Coach", instrument: "Vocals", bio: "Dr. Nkosi holds a Doctorate in Music Performance from Berklee College of Music and has performed in over 20 countries. She brings a nurturing, technique-first approach to every student, specializing in classical, gospel, and contemporary styles.", image: "/instructor-amara.png" },
  { name: "James Harrington", role: "Piano Instructor", instrument: "Piano", bio: "A graduate of the Royal Conservatory of Music, James has 15 years of teaching experience spanning classical theory, jazz improvisation, and modern composition. His students consistently advance to competitive recitals.", image: "/instructor-james.png" },
  { name: "Sofia Reyes", role: "Guitar Specialist", instrument: "Guitar / Bass", bio: "Sofia is a session musician with credits on over 40 commercial albums. She teaches acoustic, electric, and bass guitar with a genre-inclusive approach that keeps students motivated and progressing quickly.", image: "/instructor-sofia.png" },
  { name: "Kojo Braham", role: "Drum & Percussion", instrument: "Drums", bio: "With a background in jazz, funk, and orchestral percussion, Kojo is one of the city's most sought-after rhythm educators. His curriculum builds rock-solid fundamentals while making every lesson feel like a jam session.", image: "/instructor-imgg.jpeg" },
  { name: "Priya Sundaram", role: "Strings & Theory", instrument: "Violin / Theory", bio: "Priya trained at the Juilliard Pre-College program before completing her degree at Manhattan School of Music. She excels at making complex music theory intuitive and accessible for students at all levels.", image: "/studio-main.png" },
  { name: "Liam O'Brien", role: "Brass Instructor", instrument: "Trumpet / Brass", bio: "A former first-chair trumpeter with the National Symphony, Liam now dedicates his passion to teaching. He specializes in breath control, range development, and classical-to-jazz transition for brass students.", image: "/studio-main.png" },
  { name: "Yuki Tanaka", role: "Electronic & Production", instrument: "Production / Synth", bio: "Yuki bridges the gap between traditional musicianship and modern production. She teaches synthesis, DAW production, and music technology alongside core theory — preparing students for the future of music.", image: "/studio-main.png" },
  { name: "Carlos Mendez", role: "Guitar & Composition", instrument: "Electric Guitar", bio: "With a Masters in Music Composition from UCLA, Carlos specializes in electric guitar technique, original songwriting, and music theory for guitarists. His students have placed in national songwriting competitions.", image: "/studio-main.png" },
  { name: "Fatima Al-Hassan", role: "Early Childhood Music", instrument: "Kids Programs", bio: "Fatima holds a dual certification in Music Education and Early Childhood Development. Her play-based curriculum has introduced hundreds of children aged 3–8 to the joy of music through movement, storytelling, and discovery.", image: "/studio-main.png" },
];

const whyUs = [
  { icon: Star, title: "World-Class Instructors", description: "Every instructor holds advanced degrees or professional performance credentials in their instrument." },
  { icon: Users, title: "Small Class Sizes", description: "Capped enrollment ensures every student receives personalized attention and rapid progression." },
  { icon: Clock, title: "Flexible Scheduling", description: "Lessons available mornings, evenings, and weekends to fit your family's busy lifestyle." },
  { icon: Award, title: "Performance Opportunities", description: "Regular recitals, open mics, and masterclasses give students the stage experience they crave." },
  { icon: Heart, title: "Nurturing Environment", description: "We celebrate every win and support every challenge in a warm, judgment-free creative space." },
  { icon: Lightbulb, title: "Proven Curriculum", description: "Our structured method blends music theory, ear training, technique, and creativity for total musicianship." },
];

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 pb-20 bg-background overflow-hidden">
        <div className="absolute inset-0 pointer-events-none opacity-0 dark:opacity-100">
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full bg-primary/5 blur-[100px]" />
        </div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-block bg-primary/10 border border-primary/30 text-primary text-xs font-semibold uppercase tracking-widest px-4 py-2 rounded-full mb-6"
          >
            Our Story
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-heading font-black text-4xl sm:text-5xl lg:text-6xl text-foreground mb-6 leading-tight text-balance"
          >
            Music Is Not a Hobby.{" "}
            <span className="gradient-text">It&apos;s a Calling.</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto"
          >
            At Gnosis Fundamental Music Academy, we believe every person — regardless of age, background, or experience — has music inside them. Our mission is to bring it out.
          </motion.p>
        </div>
      </section>

      {/* Story */}
      <SectionWrapper variant="surface">
        <div className="grid md:grid-cols-2 gap-14 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-heading font-bold text-3xl sm:text-4xl text-foreground mb-6 text-balance">From a Basement Studio to a Community Institution</h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                Gnosis Fundamental Music Academy was founded over a decade ago by a small group of professional musicians who shared a frustration: most music schools taught students to pass tests, not to truly play. They set out to build something different.
              </p>
              <p>
                What began in a single basement studio with three students and two instructors has grown into a thriving community of over 500 active students, 9 world-class instructors, and a performance venue that hosts dozens of public events each year.
              </p>
              <p>
                Our name — Gnosis — means deep, experiential knowledge. It reflects our belief that music must be felt, not just learned. Every curriculum we design, every instructor we hire, and every class we teach is guided by that principle.
              </p>
            </div>
            <div className="flex gap-4 mt-8">
              <Link
                href="/registration"
                className="inline-flex items-center gap-2 bg-primary text-primary-foreground font-semibold px-6 py-3 rounded-full teal-glow hover:opacity-90 transition-all"
              >
                Start Your Journey <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/pricing"
                className="inline-flex items-center gap-2 border border-border text-foreground font-semibold px-6 py-3 rounded-full hover:border-primary/40 hover:text-primary transition-all"
              >
                View Pricing
              </Link>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative h-80 md:h-[500px] rounded-2xl overflow-hidden border border-border"
          >
            <Image
              src="/studio-main.png"
              alt="Gnosis Music Academy Studio"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
            />
          </motion.div>
        </div>
      </SectionWrapper>

      {/* ── CEO / Founder ── */}
      <SectionWrapper variant="default" id="founder">
        <div className="relative overflow-hidden">
          {/* Background glows */}
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute -top-20 right-0 w-[500px] h-[500px] rounded-full bg-primary/5 blur-[130px]" />
            <div className="absolute bottom-0 left-0 w-[350px] h-[350px] rounded-full bg-primary/4 blur-[100px]" />
          </div>

          {/* Section label */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-14"
          >
            <span className="inline-block bg-primary/10 border border-primary/30 text-primary text-xs font-semibold uppercase tracking-widest px-4 py-2 rounded-full mb-4">
              Leadership
            </span>
            <h2 className="font-heading font-bold text-3xl sm:text-4xl lg:text-5xl text-foreground text-balance">
              Meet Our Founder
            </h2>
          </motion.div>

          <div className="relative grid lg:grid-cols-2 gap-14 items-center">

            {/* ── Image column ── */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="relative"
            >
              {/* Founder badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3, duration: 0.4 }}
                className="absolute -top-4 -left-3 z-10 bg-primary text-primary-foreground px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest teal-glow shadow-lg"
              >
                Founder & CEO
              </motion.div>

              {/* Photo frame */}
              <div className="relative h-[480px] sm:h-[540px] rounded-3xl overflow-hidden border-2 border-primary/25 shadow-2xl">
                <Image
                  src="/ceo-img.jpeg"
                  alt="Adams Elisha — Founder & CEO, Gnosis Fundamental Music Academy"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover object-top"
                  priority
                />
                {/* Bottom gradient fade */}
                <div className="absolute inset-0 bg-gradient-to-t from-background/70 via-transparent to-transparent" />
                {/* Name plate */}
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <p className="font-heading font-black text-2xl text-foreground">Elisha Opoku Adams</p>
                  <p className="text-primary text-sm font-semibold tracking-wide">Founder · CEO · Principal Instructor</p>
                </div>
              </div>

              {/* Floating ABRSM card */}
              <motion.div
                initial={{ opacity: 0, y: 30, x: 20 }}
                whileInView={{ opacity: 1, y: 0, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5, duration: 0.5 }}
                className="absolute -bottom-6 -right-4 sm:-right-8 bg-background border border-border rounded-2xl p-4 shadow-2xl max-w-[200px]"
              >
                <div className="flex items-start gap-3">
                  <div className="w-11 h-11 rounded-xl bg-primary/10 border border-primary/25 flex items-center justify-center shrink-0">
                    <Award className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-[10px] text-muted-foreground font-medium uppercase tracking-wider">Certified by</p>
                    <p className="text-sm font-bold text-foreground leading-tight">ABRSM</p>
                    <p className="text-[11px] text-primary leading-tight">Associated Board of the Royal Schools of Music</p>
                  </div>
                </div>
              </motion.div>

              {/* Floating years card */}
              <motion.div
                initial={{ opacity: 0, y: -20, x: -20 }}
                whileInView={{ opacity: 1, y: 0, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6, duration: 0.5 }}
                className="absolute top-6 -right-4 sm:-right-8 bg-background border border-border rounded-2xl px-4 py-3 shadow-2xl"
              >
                <p className="font-heading font-black text-3xl text-primary leading-none">10+</p>
                <p className="text-xs text-muted-foreground font-medium">Years Teaching</p>
              </motion.div>
            </motion.div>

            {/* ── Content column ── */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="lg:pl-4"
            >
              {/* Bio */}
              <div className="space-y-4 text-muted-foreground leading-relaxed mb-8">
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.15 }}
                >
                  Adams Elisha is the visionary founder and CEO of Gnosis Fundamental Music Academy, bringing over a decade of professional teaching experience to every lesson. Certified by the Associated Board of the Royal Schools of Music (ABRSM) — one of the world&apos;s most respected music examination bodies — Adams combines internationally recognised technical rigour with a deeply personal, faith-grounded approach to music education.
                </motion.p>
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.25 }}
                >
                  Specialising in piano and foundational music theory, he founded Gnosis with a singular mission: to raise a generation of musicians who don&apos;t just play notes, but feel and understand the music they create. What started as a small studio in Teshie has grown into one of Accra&apos;s most trusted music academies.
                </motion.p>
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.35 }}
                >
                  Adams personally oversees every curriculum at Gnosis, ensuring that each student — whether a curious 6-year-old or a returning adult — receives teaching that is structured, joyful, and transformative.
                </motion.p>
              </div>

              {/* Achievement badges */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4, duration: 0.5 }}
                className="grid grid-cols-2 gap-3 mb-8"
              >
                {[
                  { icon: Award,         label: "ABRSM Certified",       sub: "Royal Schools of Music" },
                  { icon: Music,         label: "Piano Specialist",       sub: "Primary instrument" },
                  { icon: GraduationCap, label: "500+ Students",          sub: "Taught & mentored" },
                  { icon: Trophy,        label: "Recital Director",       sub: "Bi-annual performances" },
                  { icon: BookOpen,      label: "Curriculum Author",      sub: "Proprietary syllabus" },
                  { icon: Heart,         label: "Faith-Centred",          sub: "Godly musical values" },
                ].map(({ icon: Icon, label, sub }, i) => (
                  <motion.div
                    key={label}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 + i * 0.07, duration: 0.35 }}
                    className="flex items-center gap-3 bg-surface border border-border rounded-xl p-3 hover:border-primary/40 transition-colors"
                  >
                    <div className="w-8 h-8 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
                      <Icon className="w-4 h-4 text-primary" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs font-semibold text-foreground leading-tight truncate">{label}</p>
                      <p className="text-[11px] text-muted-foreground leading-tight truncate">{sub}</p>
                    </div>
                  </motion.div>
                ))}
              </motion.div>

              {/* Quote */}
              <motion.blockquote
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6, duration: 0.5 }}
                className="relative border-l-2 border-primary pl-5 py-1"
              >
                <p className="text-foreground/85 text-lg font-medium italic leading-relaxed">
                  &ldquo;Raising Godly musicians for the next generation.&rdquo;
                </p>
                <p className="text-primary text-sm font-semibold mt-2">— Adams Elisha</p>
              </motion.blockquote>
            </motion.div>
          </div>
        </div>
      </SectionWrapper>

      {/* Instructors */}
      <SectionWrapper variant="default" id="instructors">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <h2 className="font-heading font-bold text-3xl sm:text-4xl lg:text-5xl text-foreground mb-4 text-balance">Meet Your Instructors</h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Nine dedicated musicians with deep expertise, genuine passion, and a gift for bringing out the best in every student.
          </p>
        </motion.div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {instructors.map((instructor, i) => (
            <InstructorCard key={instructor.name} {...instructor} index={i} />
          ))}
        </div>
      </SectionWrapper>

      {/* Why Choose Us */}
      <SectionWrapper variant="surface">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <h2 className="font-heading font-bold text-3xl sm:text-4xl lg:text-5xl text-foreground mb-4 text-balance">Why Gnosis?</h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Six reasons thousands of families choose us — and keep coming back.
          </p>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {whyUs.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
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
      </SectionWrapper>

      {/* CTA */}
      <section className="py-20 bg-background text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="font-heading font-bold text-3xl sm:text-4xl text-foreground mb-4 text-balance">Ready to Begin?</h2>
          <p className="text-muted-foreground mb-8 max-w-md mx-auto">Book your GH₵47 intro lesson and experience the Gnosis difference firsthand.</p>
          <Link
            href="/registration"
            className="inline-flex items-center gap-2 bg-primary text-primary-foreground font-bold px-10 py-4 rounded-full teal-glow hover:opacity-90 transition-all text-base"
          >
            Book Intro Lesson — GH₵47 <ArrowRight className="w-5 h-5" />
          </Link>
        </motion.div>
      </section>
    </>
  );
}
