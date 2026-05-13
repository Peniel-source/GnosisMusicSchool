"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Star, Users, Clock, Award, Heart, Lightbulb } from "lucide-react";
import SectionWrapper from "@/components/SectionWrapper";
import InstructorCard from "@/components/InstructorCard";

const instructors = [
  { name: "Dr. Amara Nkosi", role: "Lead Vocal Coach", instrument: "Vocals", bio: "Dr. Nkosi holds a Doctorate in Music Performance from Berklee College of Music and has performed in over 20 countries. She brings a nurturing, technique-first approach to every student, specializing in classical, gospel, and contemporary styles." },
  { name: "James Harrington", role: "Piano Instructor", instrument: "Piano", bio: "A graduate of the Royal Conservatory of Music, James has 15 years of teaching experience spanning classical theory, jazz improvisation, and modern composition. His students consistently advance to competitive recitals." },
  { name: "Sofia Reyes", role: "Guitar Specialist", instrument: "Guitar / Bass", bio: "Sofia is a session musician with credits on over 40 commercial albums. She teaches acoustic, electric, and bass guitar with a genre-inclusive approach that keeps students motivated and progressing quickly." },
  { name: "Marcus Webb", role: "Drum & Percussion", instrument: "Drums", bio: "With a background in jazz, funk, and orchestral percussion, Marcus is one of the city's most sought-after rhythm educators. His curriculum builds rock-solid fundamentals while making every lesson feel like a jam session." },
  { name: "Priya Sundaram", role: "Strings & Theory", instrument: "Violin / Theory", bio: "Priya trained at the Juilliard Pre-College program before completing her degree at Manhattan School of Music. She excels at making complex music theory intuitive and accessible for students at all levels." },
  { name: "Liam O'Brien", role: "Brass Instructor", instrument: "Trumpet / Brass", bio: "A former first-chair trumpeter with the National Symphony, Liam now dedicates his passion to teaching. He specializes in breath control, range development, and classical-to-jazz transition for brass students." },
  { name: "Yuki Tanaka", role: "Electronic & Production", instrument: "Production / Synth", bio: "Yuki bridges the gap between traditional musicianship and modern production. She teaches synthesis, DAW production, and music technology alongside core theory — preparing students for the future of music." },
  { name: "Carlos Mendez", role: "Guitar & Composition", instrument: "Electric Guitar", bio: "With a Masters in Music Composition from UCLA, Carlos specializes in electric guitar technique, original songwriting, and music theory for guitarists. His students have placed in national songwriting competitions." },
  { name: "Fatima Al-Hassan", role: "Early Childhood Music", instrument: "Kids Programs", bio: "Fatima holds a dual certification in Music Education and Early Childhood Development. Her play-based curriculum has introduced hundreds of children aged 3–8 to the joy of music through movement, storytelling, and discovery." },
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
        <div className="absolute inset-0 pointer-events-none">
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
            className="font-heading font-black text-5xl lg:text-6xl text-foreground mb-6 leading-tight"
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
            <h2 className="font-heading font-bold text-4xl text-foreground mb-6">From a Basement Studio to a Community Institution</h2>
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
              src="/placeholder.svg?width=700&height=600&text=Our+Studio"
              alt="Gnosis Music Academy Studio"
              fill
              unoptimized
              className="object-cover"
            />
          </motion.div>
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
          <h2 className="font-heading font-bold text-4xl lg:text-5xl text-foreground mb-4">Meet Your Instructors</h2>
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
          <h2 className="font-heading font-bold text-4xl lg:text-5xl text-foreground mb-4">Why Gnosis?</h2>
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
          <h2 className="font-heading font-bold text-4xl text-foreground mb-4">Ready to Begin?</h2>
          <p className="text-muted-foreground mb-8 max-w-md mx-auto">Book your $47 intro lesson and experience the Gnosis difference firsthand.</p>
          <Link
            href="/registration"
            className="inline-flex items-center gap-2 bg-primary text-primary-foreground font-bold px-10 py-4 rounded-full teal-glow hover:opacity-90 transition-all text-base"
          >
            Book Intro Lesson — $47 <ArrowRight className="w-5 h-5" />
          </Link>
        </motion.div>
      </section>
    </>
  );
}
