"use client";

import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";

interface InstrumentCardProps {
  icon: LucideIcon;
  name: string;
  description: string;
  index?: number;
}

export default function InstrumentCard({
  icon: Icon,
  name,
  description,
  index = 0,
}: InstrumentCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ delay: index * 0.08, duration: 0.5 }}
      whileHover={{ 
        y: -10, 
        scale: 1.05,
        rotateX: 2,
        rotateY: -2,
      }}
      className="group relative bg-surface border border-border rounded-2xl p-6 cursor-pointer transition-all duration-300 hover:shadow-[0_20px_50px_oklch(0.72_0.155_182/15%)] hover:border-primary/60 perspective-1000"
    >
      <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
        <Icon className="w-6 h-6 text-primary" />
      </div>
      <h3 className="font-heading font-semibold text-lg text-foreground mb-1">{name}</h3>
      <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
    </motion.div>
  );
}
