"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

interface InstructorCardProps {
  name: string;
  role: string;
  instrument: string;
  bio: string;
  index?: number;
}

export default function InstructorCard({
  name,
  role,
  instrument,
  bio,
  index = 0,
}: InstructorCardProps) {
  const [expanded, setExpanded] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ delay: index * 0.07, duration: 0.5 }}
      className="group bg-surface border border-border rounded-2xl overflow-hidden hover:border-primary/40 transition-all duration-300"
    >
      <div className="relative h-64 overflow-hidden">
        <Image
          src={`/placeholder.svg?width=400&height=320&text=${encodeURIComponent(name)}`}
          alt={name}
          fill
          unoptimized
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/20 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <span className="inline-block bg-primary/20 border border-primary/40 text-primary text-xs px-2.5 py-1 rounded-full font-medium">
            {instrument}
          </span>
        </div>
      </div>
      <div className="p-5">
        <h3 className="font-heading font-bold text-lg text-foreground">{name}</h3>
        <p className="text-sm text-primary mb-3">{role}</p>
        <AnimatePresence initial={false}>
          {expanded && (
            <motion.p
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="text-sm text-muted-foreground leading-relaxed mb-3 overflow-hidden"
            >
              {bio}
            </motion.p>
          )}
        </AnimatePresence>
        <button
          onClick={() => setExpanded(!expanded)}
          className="flex items-center gap-1 text-xs font-semibold text-primary/80 hover:text-primary transition-colors"
        >
          {expanded ? "Show less" : "Read bio"}
          <ChevronDown
            className={`w-3.5 h-3.5 transition-transform duration-200 ${expanded ? "rotate-180" : ""}`}
          />
        </button>
      </div>
    </motion.div>
  );
}
