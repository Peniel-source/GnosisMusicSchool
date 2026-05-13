"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Phone, Mail, MapPin, Clock, Send, CheckCircle2 } from "lucide-react";
import SectionWrapper from "@/components/SectionWrapper";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 pb-16 bg-background text-center overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] rounded-full bg-primary/5 blur-[100px]" />
        </div>
        <div className="relative max-w-3xl mx-auto px-4 sm:px-6">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-block bg-primary/10 border border-primary/30 text-primary text-xs font-semibold uppercase tracking-widest px-4 py-2 rounded-full mb-6"
          >
            Get In Touch
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-heading font-black text-5xl lg:text-6xl text-foreground mb-5 leading-tight"
          >
            We&apos;d Love to <span className="gradient-text">Hear From You</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-muted-foreground"
          >
            Questions about programs, schedules, or pricing? Our team responds within one business day.
          </motion.p>
        </div>
      </section>

      <SectionWrapper variant="surface">
        <div className="grid md:grid-cols-2 gap-12">
          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-background border border-border rounded-2xl p-8"
          >
            {submitted ? (
              <div className="flex flex-col items-center justify-center h-full py-16 text-center">
                <div className="w-16 h-16 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center mb-5">
                  <CheckCircle2 className="w-8 h-8 text-primary" />
                </div>
                <h3 className="font-heading font-bold text-2xl text-foreground mb-3">Message Sent!</h3>
                <p className="text-muted-foreground">Thanks for reaching out. We&apos;ll get back to you within one business day.</p>
              </div>
            ) : (
              <>
                <h2 className="font-heading font-bold text-2xl text-foreground mb-6">Send Us a Message</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1.5">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        required
                        value={form.name}
                        onChange={handleChange}
                        placeholder="Jane Smith"
                        className="w-full bg-surface border border-border rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/60 focus:ring-1 focus:ring-primary/30 transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1.5">
                        Phone
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={form.phone}
                        onChange={handleChange}
                        placeholder="+1 (555) 000-0000"
                        className="w-full bg-surface border border-border rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/60 focus:ring-1 focus:ring-primary/30 transition-colors"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1.5">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={form.email}
                      onChange={handleChange}
                      placeholder="jane@example.com"
                      className="w-full bg-surface border border-border rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/60 focus:ring-1 focus:ring-primary/30 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1.5">
                      Message *
                    </label>
                    <textarea
                      name="message"
                      required
                      rows={5}
                      value={form.message}
                      onChange={handleChange}
                      placeholder="Tell us about your goals, preferred instrument, or any questions you have..."
                      className="w-full bg-surface border border-border rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/60 focus:ring-1 focus:ring-primary/30 transition-colors resize-none"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground font-bold py-3.5 rounded-xl teal-glow hover:opacity-90 transition-all"
                  >
                    Send Message <Send className="w-4 h-4" />
                  </button>
                </form>
              </>
            )}
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            <div>
              <h2 className="font-heading font-bold text-2xl text-foreground mb-6">Contact Information</h2>
              <div className="space-y-5">
                {[
                  { icon: Phone, label: "Phone", value: "+1 (555) 123-4567", href: "tel:+15551234567" },
                  { icon: Mail, label: "Email", value: "hello@gnosismusic.com", href: "mailto:hello@gnosismusic.com" },
                  { icon: MapPin, label: "Address", value: "123 Music Lane, Suite 200\nHarmony City, CA 90210", href: null },
                ].map(({ icon: Icon, label, value, href }) => (
                  <div key={label} className="flex items-start gap-4 p-4 bg-background border border-border rounded-xl">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
                      <Icon className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-0.5">{label}</p>
                      {href ? (
                        <a href={href} className="text-sm text-foreground hover:text-primary transition-colors whitespace-pre-line">{value}</a>
                      ) : (
                        <p className="text-sm text-foreground whitespace-pre-line">{value}</p>
                      )}
                    </div>
                  </div>
                ))}

                <div className="flex items-start gap-4 p-4 bg-background border border-border rounded-xl">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
                    <Clock className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1.5">Studio Hours</p>
                    <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-sm text-foreground">
                      <span className="text-muted-foreground">Mon – Fri</span><span>9:00 AM – 8:00 PM</span>
                      <span className="text-muted-foreground">Saturday</span><span>10:00 AM – 6:00 PM</span>
                      <span className="text-muted-foreground">Sunday</span><span>12:00 PM – 5:00 PM</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Map placeholder */}
            <div className="rounded-2xl overflow-hidden border border-border h-56 bg-surface flex items-center justify-center">
              <div className="text-center text-muted-foreground">
                <MapPin className="w-8 h-8 text-primary mx-auto mb-2" />
                <p className="text-sm font-medium">Google Maps Embed</p>
                <p className="text-xs">123 Music Lane, Harmony City CA</p>
              </div>
            </div>
          </motion.div>
        </div>
      </SectionWrapper>
    </>
  );
}
