"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { CalendarDays, MapPin, ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface EventCardProps {
  title: string;
  date: string;
  location: string;
  type: string;
  description: string;
  index?: number;
}

export default function EventCard({
  title,
  date,
  location,
  type,
  description,
  index = 0,
}: EventCardProps) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      className="group bg-surface border border-border rounded-2xl overflow-hidden hover:border-primary/40 transition-all duration-300 hover:shadow-[0_0_30px_oklch(0.72_0.155_182/15%)]"
    >
      <div className="relative h-40 sm:h-48 overflow-hidden">
        <motion.div style={{ scale }} className="absolute inset-0">
          <Image
            src="/studio-main.png"
            alt={title}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-t from-background/40 to-transparent dark:from-surface/80" />
        <Badge className="absolute top-3 right-3 bg-primary text-primary-foreground border-0">
          {type}
        </Badge>
      </div>
      <div className="p-6">
        <h3 className="font-heading font-bold text-xl text-foreground mb-3 group-hover:text-primary transition-colors">
          {title}
        </h3>
        <p className="text-sm text-muted-foreground mb-4 leading-relaxed">{description}</p>
        <div className="flex flex-col gap-1.5 mb-5">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <CalendarDays className="w-4 h-4 text-primary" />
            {date}
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <MapPin className="w-4 h-4 text-primary" />
            {location}
          </div>
        </div>
        <Link
          href="/registration"
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:gap-2.5 transition-all duration-200"
        >
          Register Now <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </motion.article>
  );
}
