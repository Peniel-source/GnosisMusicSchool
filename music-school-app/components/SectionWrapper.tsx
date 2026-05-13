import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface SectionWrapperProps {
  children: ReactNode;
  className?: string;
  variant?: "default" | "surface" | "dark";
  id?: string;
}

export default function SectionWrapper({
  children,
  className,
  variant = "default",
  id,
}: SectionWrapperProps) {
  const variants = {
    default: "bg-background",
    surface: "bg-surface",
    dark: "bg-surface border-y border-border",
  };

  return (
    <section id={id} className={cn(variants[variant], "py-20 lg:py-28", className)}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">{children}</div>
    </section>
  );
}
