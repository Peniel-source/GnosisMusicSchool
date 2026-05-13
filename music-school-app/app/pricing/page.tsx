"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { CheckCircle2, ArrowRight, Sparkles } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import SectionWrapper from "@/components/SectionWrapper";

const tiers = [
  {
    name: "Starter",
    price: 156,
    badge: null,
    description: "Perfect for beginners finding their rhythm and exploring a new instrument.",
    features: [
      "2 x 30-minute lessons per month",
      "Access to group theory classes",
      "Practice portal & lesson recordings",
      "Email support from instructor",
      "Bi-annual recital participation",
    ],
    cta: "Get Started",
    href: "/registration",
    highlight: false,
  },
  {
    name: "Academy",
    price: 249,
    badge: "Most Popular",
    description: "Our most popular plan for committed students ready to make real progress.",
    features: [
      "4 x 45-minute lessons per month",
      "Group ensemble workshops",
      "Priority scheduling",
      "Monthly progress reports",
      "All recitals + open mic access",
      "Studio recording session (1/qtr)",
    ],
    cta: "Join Academy",
    href: "/registration",
    highlight: true,
  },
  {
    name: "Performance",
    price: 389,
    badge: "For Serious Students",
    description: "Designed for advanced students pursuing auditions, competitions, or professional goals.",
    features: [
      "8 x 60-minute lessons per month",
      "Masterclass access",
      "Competition & audition coaching",
      "Unlimited studio time",
      "One-on-one theory tutoring",
      "Dedicated performance coaching",
      "VIP event seating",
    ],
    cta: "Level Up",
    href: "/registration",
    highlight: false,
  },
];

const faqs = [
  {
    q: "What's included in the $47 intro lesson?",
    a: "Your intro lesson is a full 45-minute one-on-one session with a specialist instructor in your chosen instrument. It's a real lesson — not a sales call. We'll assess your current level, discuss your goals, and create a personalized plan. If you decide to join a membership, the $47 is credited toward your first month.",
  },
  {
    q: "Can I cancel my membership at any time?",
    a: "Yes. All memberships are month-to-month with no long-term contracts. Simply give us 30 days' written notice before your next billing date and your membership will not renew. We believe you stay because you love it, not because you're locked in.",
  },
  {
    q: "What happens if I miss a lesson?",
    a: "Life happens. Academy and Performance members get one makeup lesson per month at no extra charge. Starter members can purchase additional makeup slots at a discounted rate. We ask for at least 24 hours' notice to reschedule.",
  },
  {
    q: "Can I switch instruments after joining?",
    a: "Absolutely. Many of our students explore multiple instruments over time. You can switch instruments at the start of any new billing cycle. There's no penalty or administrative fee for switching.",
  },
  {
    q: "Do you offer family discounts?",
    a: "Yes! Families with two or more students enrolled receive 10% off each additional membership. Contact us directly to set up a family account and we'll apply the discount automatically.",
  },
];

export default function PricingPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 pb-20 bg-background text-center overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] rounded-full bg-primary/5 blur-[100px]" />
        </div>
        <div className="relative max-w-3xl mx-auto px-4 sm:px-6">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-block bg-primary/10 border border-primary/30 text-primary text-xs font-semibold uppercase tracking-widest px-4 py-2 rounded-full mb-6"
          >
            Transparent Pricing
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-heading font-black text-5xl lg:text-6xl text-foreground mb-5 leading-tight"
          >
            Invest in Your <span className="gradient-text">Musical Growth</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-muted-foreground leading-relaxed"
          >
            No hidden fees. No long-term contracts. Just world-class music education at a price that makes sense.
          </motion.p>
        </div>
      </section>

      {/* Intro Lesson Card */}
      <SectionWrapper variant="surface">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-2xl mx-auto bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/30 rounded-2xl p-8 text-center teal-glow"
        >
          <div className="inline-flex items-center gap-2 bg-primary/20 border border-primary/40 text-primary text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full mb-5">
            <Sparkles className="w-3.5 h-3.5" />
            Most Popular First Step
          </div>
          <h2 className="font-heading font-black text-4xl text-foreground mb-2">Intro Lesson</h2>
          <div className="flex items-end justify-center gap-1 mb-4">
            <span className="font-heading font-black text-7xl text-primary">$47</span>
            <span className="text-muted-foreground mb-3">/ one-time</span>
          </div>
          <p className="text-muted-foreground mb-8 max-w-lg mx-auto leading-relaxed">
            A full 45-minute private lesson with a specialist instructor. Real instruction, honest feedback, and a personalized plan — no pressure to commit. The $47 credits toward your first month if you join.
          </p>
          <ul className="flex flex-col sm:flex-row flex-wrap gap-3 justify-center mb-8">
            {["Any instrument", "Any skill level", "Any age", "45 minutes 1-on-1", "Personalized plan"].map((f) => (
              <li key={f} className="flex items-center gap-1.5 text-sm text-foreground/80">
                <CheckCircle2 className="w-4 h-4 text-primary shrink-0" /> {f}
              </li>
            ))}
          </ul>
          <Link
            href="/registration"
            className="inline-flex items-center gap-2 bg-primary text-primary-foreground font-bold text-lg px-10 py-4 rounded-full hover:opacity-90 transition-all"
          >
            Book My Intro Lesson <ArrowRight className="w-5 h-5" />
          </Link>
        </motion.div>
      </SectionWrapper>

      {/* Membership Tiers */}
      <SectionWrapper variant="default">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <h2 className="font-heading font-bold text-4xl lg:text-5xl text-foreground mb-4">Monthly Memberships</h2>
          <p className="text-muted-foreground max-w-xl mx-auto">Choose the plan that fits your goals. Upgrade, downgrade, or cancel anytime.</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
          {tiers.map((tier, i) => (
            <motion.div
              key={tier.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12, duration: 0.5 }}
              className={`relative flex flex-col rounded-2xl p-8 border transition-all duration-300 ${
                tier.highlight
                  ? "bg-gradient-to-b from-primary/10 to-primary/5 border-primary/50 shadow-[0_0_40px_oklch(0.72_0.155_182/20%)]"
                  : "bg-surface border-border hover:border-primary/30"
              }`}
            >
              {tier.badge && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                  <span className="inline-block bg-primary text-primary-foreground text-xs font-bold uppercase tracking-wider px-4 py-1.5 rounded-full">
                    {tier.badge}
                  </span>
                </div>
              )}
              <div className="mb-6">
                <h3 className="font-heading font-bold text-2xl text-foreground mb-1">{tier.name}</h3>
                <p className="text-sm text-muted-foreground mb-4">{tier.description}</p>
                <div className="flex items-end gap-1">
                  <span className="font-heading font-black text-5xl text-primary">${tier.price}</span>
                  <span className="text-muted-foreground mb-1.5">/month</span>
                </div>
              </div>
              <ul className="space-y-2.5 mb-8 flex-1">
                {tier.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm text-foreground/80">
                    <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                    {f}
                  </li>
                ))}
              </ul>
              <Link
                href={tier.href}
                className={`block text-center font-bold py-3 rounded-full transition-all ${
                  tier.highlight
                    ? "bg-primary text-primary-foreground teal-glow hover:opacity-90"
                    : "border border-primary/50 text-primary hover:bg-primary/10"
                }`}
              >
                {tier.cta}
              </Link>
            </motion.div>
          ))}
        </div>
      </SectionWrapper>

      {/* FAQ */}
      <SectionWrapper variant="surface">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="font-heading font-bold text-4xl text-foreground mb-4">Frequently Asked Questions</h2>
          <p className="text-muted-foreground max-w-xl mx-auto">Everything you need to know before booking.</p>
        </motion.div>
        <div className="max-w-3xl mx-auto">
          <Accordion className="space-y-3">
            {faqs.map((faq, i) => (
              <AccordionItem
                key={i}
                value={String(i)}
                className="bg-background border border-border rounded-xl px-6"
              >
                <AccordionTrigger className="font-heading font-semibold text-left text-foreground hover:text-primary hover:no-underline py-5">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground text-sm leading-relaxed pb-5">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </SectionWrapper>
    </>
  );
}
