"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, ArrowRight, ArrowLeft, Music, User, Target } from "lucide-react";
import Link from "next/link";

const instruments = [
  "Vocals", "Piano", "Guitar (Acoustic)", "Electric Guitar",
  "Bass Guitar", "Drums", "Trumpet / Brass", "After-School Program",
];

const goals = [
  "Learn for fun", "Play at events / recitals",
  "Pursue music professionally", "Pass music exams",
  "Join a band", "Songwriting & production",
];

const steps = [
  { label: "Student Info", icon: User },
  { label: "Goals & Instrument", icon: Target },
  { label: "Confirm", icon: CheckCircle2 },
];

export default function RegistrationPage() {
  const [step, setStep] = useState(0);
  const [done, setDone] = useState(false);
  const [form, setForm] = useState({
    firstName: "", lastName: "", email: "", phone: "", age: "",
    instrument: "", experience: "", goals: [] as string[], notes: "",
  });

  function update(field: string, value: string | string[]) {
    setForm((p) => ({ ...p, [field]: value }));
  }

  function toggleGoal(g: string) {
    setForm((p) => ({
      ...p,
      goals: p.goals.includes(g) ? p.goals.filter((x) => x !== g) : [...p.goals, g],
    }));
  }

  function next() { setStep((s) => Math.min(s + 1, 2)); }
  function back() { setStep((s) => Math.max(s - 1, 0)); }
  function submit(e: React.FormEvent) { e.preventDefault(); setDone(true); }

  if (done) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center pt-20 px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center max-w-lg"
        >
          <div className="w-20 h-20 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center mx-auto mb-6 teal-glow">
            <CheckCircle2 className="w-10 h-10 text-primary" />
          </div>
          <h2 className="font-heading font-black text-4xl text-foreground mb-4">
            You&apos;re Registered!
          </h2>
          <p className="text-muted-foreground mb-8 leading-relaxed">
            Welcome to the Gnosis family, <strong className="text-foreground">{form.firstName}</strong>!
            We&apos;ve sent a confirmation to <strong className="text-primary">{form.email}</strong>.
            Your instructor will reach out within 24 hours to schedule your first lesson.
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 bg-primary text-primary-foreground font-bold px-8 py-3 rounded-full teal-glow hover:opacity-90 transition-all"
          >
            Back to Homepage
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pt-24 pb-16 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <span className="inline-block bg-primary/10 border border-primary/30 text-primary text-xs font-semibold uppercase tracking-widest px-4 py-2 rounded-full mb-4">
            Book Intro Lesson — GH₵47
          </span>
          <h1 className="font-heading font-black text-4xl text-foreground mb-2">Start Your Journey</h1>
          <p className="text-muted-foreground">Complete the form below and we&apos;ll match you with the perfect instructor.</p>
        </div>

        {/* Progress bar */}
        <div className="flex items-center justify-between mb-10 relative">
          <div className="absolute top-5 left-0 right-0 h-px bg-border -z-0" />
          <div
            className="absolute top-5 left-0 h-px bg-primary transition-all duration-500 -z-0"
            style={{ width: `${(step / 2) * 100}%` }}
          />
          {steps.map((s, i) => (
            <div key={s.label} className="flex flex-col items-center gap-2 z-10">
              <div className={`w-10 h-10 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
                i < step
                  ? "bg-primary border-primary text-primary-foreground"
                  : i === step
                  ? "bg-background border-primary text-primary"
                  : "bg-background border-border text-muted-foreground"
              }`}>
                {i < step ? <CheckCircle2 className="w-5 h-5" /> : <s.icon className="w-4 h-4" />}
              </div>
              <span className={`text-xs font-medium hidden sm:block ${i === step ? "text-primary" : "text-muted-foreground"}`}>
                {s.label}
              </span>
            </div>
          ))}
        </div>

        {/* Form card */}
        <div className="bg-surface border border-border rounded-2xl p-8">
          <form onSubmit={submit}>
            <AnimatePresence mode="wait">
              {/* Step 0: Student Info */}
              {step === 0 && (
                <motion.div
                  key="step0"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.25 }}
                  className="space-y-4"
                >
                  <div className="flex items-center gap-2 mb-6">
                    <Music className="w-5 h-5 text-primary" />
                    <h2 className="font-heading font-bold text-xl text-foreground">Tell Us About Yourself</h2>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <Field label="First Name *" name="firstName" value={form.firstName} onChange={(v) => update("firstName", v)} placeholder="Jane" required />
                    <Field label="Last Name *" name="lastName" value={form.lastName} onChange={(v) => update("lastName", v)} placeholder="Smith" required />
                  </div>
                  <Field label="Email Address *" name="email" type="email" value={form.email} onChange={(v) => update("email", v)} placeholder="jane@example.com" required />
                  <Field label="Phone Number" name="phone" type="tel" value={form.phone} onChange={(v) => update("phone", v)} placeholder="+1 (555) 000-0000" />
                  <div>
                    <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1.5">Age / Age Range</label>
                    <select
                      value={form.age}
                      onChange={(e) => update("age", e.target.value)}
                      className="w-full bg-background border border-border rounded-xl px-4 py-3 text-sm text-foreground focus:outline-none focus:border-primary/60 focus:ring-1 focus:ring-primary/30 transition-colors"
                    >
                      <option value="">Select age range...</option>
                      {["4–7 years", "8–12 years", "13–17 years", "18–25 years", "26–40 years", "41+ years"].map((a) => (
                        <option key={a} value={a}>{a}</option>
                      ))}
                    </select>
                  </div>
                </motion.div>
              )}

              {/* Step 1: Instrument + Goals */}
              {step === 1 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.25 }}
                  className="space-y-6"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <Target className="w-5 h-5 text-primary" />
                    <h2 className="font-heading font-bold text-xl text-foreground">Your Instrument & Goals</h2>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">Choose Your Instrument *</label>
                    <div className="grid grid-cols-2 gap-2">
                      {instruments.map((inst) => (
                        <button
                          key={inst}
                          type="button"
                          onClick={() => update("instrument", inst)}
                          className={`py-2.5 px-3 rounded-xl border text-sm font-medium text-left transition-all ${
                            form.instrument === inst
                              ? "border-primary bg-primary/10 text-primary"
                              : "border-border text-muted-foreground hover:border-primary/40 hover:text-foreground"
                          }`}
                        >
                          {inst}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1.5">Experience Level</label>
                    <select
                      value={form.experience}
                      onChange={(e) => update("experience", e.target.value)}
                      className="w-full bg-background border border-border rounded-xl px-4 py-3 text-sm text-foreground focus:outline-none focus:border-primary/60 transition-colors"
                    >
                      <option value="">Select experience level...</option>
                      {["Complete beginner", "Some experience (< 1 year)", "Intermediate (1–3 years)", "Advanced (3+ years)"].map((e) => (
                        <option key={e} value={e}>{e}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">Your Goals (select all that apply)</label>
                    <div className="grid grid-cols-2 gap-2">
                      {goals.map((g) => (
                        <button
                          key={g}
                          type="button"
                          onClick={() => toggleGoal(g)}
                          className={`py-2.5 px-3 rounded-xl border text-sm font-medium text-left transition-all ${
                            form.goals.includes(g)
                              ? "border-primary bg-primary/10 text-primary"
                              : "border-border text-muted-foreground hover:border-primary/40 hover:text-foreground"
                          }`}
                        >
                          {g}
                        </button>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Step 2: Confirm */}
              {step === 2 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.25 }}
                  className="space-y-6"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <CheckCircle2 className="w-5 h-5 text-primary" />
                    <h2 className="font-heading font-bold text-xl text-foreground">Confirm Your Details</h2>
                  </div>

                  <div className="bg-background border border-border rounded-xl p-5 space-y-3">
                    {[
                      { label: "Name", value: `${form.firstName} ${form.lastName}` },
                      { label: "Email", value: form.email },
                      { label: "Phone", value: form.phone || "—" },
                      { label: "Age Range", value: form.age || "—" },
                      { label: "Instrument", value: form.instrument || "—" },
                      { label: "Experience", value: form.experience || "—" },
                      { label: "Goals", value: form.goals.length ? form.goals.join(", ") : "—" },
                    ].map(({ label, value }) => (
                      <div key={label} className="flex justify-between gap-4 text-sm">
                        <span className="text-muted-foreground shrink-0">{label}</span>
                        <span className="text-foreground text-right">{value}</span>
                      </div>
                    ))}
                  </div>

                  <div className="bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/30 rounded-xl p-5">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-semibold text-foreground">Intro Lesson (45 min)</span>
                      <span className="font-heading font-bold text-2xl text-primary">GH₵47</span>
                    </div>
                    <p className="text-xs text-muted-foreground">Credit applied toward first membership month if you join.</p>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1.5">Additional Notes</label>
                    <textarea
                      rows={3}
                      value={form.notes}
                      onChange={(e) => update("notes", e.target.value)}
                      placeholder="Any additional info you'd like your instructor to know..."
                      className="w-full bg-background border border-border rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/60 transition-colors resize-none"
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Navigation */}
            <div className="flex justify-between items-center mt-8 pt-6 border-t border-border">
              <button
                type="button"
                onClick={back}
                disabled={step === 0}
                className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground disabled:opacity-30 disabled:pointer-events-none transition-colors"
              >
                <ArrowLeft className="w-4 h-4" /> Back
              </button>

              {step < 2 ? (
                <button
                  type="button"
                  onClick={next}
                  className="inline-flex items-center gap-2 bg-primary text-primary-foreground font-bold px-6 py-2.5 rounded-full teal-glow hover:opacity-90 transition-all text-sm"
                >
                  Continue <ArrowRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 bg-primary text-primary-foreground font-bold px-6 py-2.5 rounded-full teal-glow hover:opacity-90 transition-all text-sm"
                >
                  Book My Intro — GH₵47 <CheckCircle2 className="w-4 h-4" />
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

function Field({
  label, name, type = "text", value, onChange, placeholder, required,
}: {
  label: string; name: string; type?: string; value: string;
  onChange: (v: string) => void; placeholder: string; required?: boolean;
}) {
  return (
    <div>
      <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1.5">{label}</label>
      <input
        type={type}
        name={name}
        required={required}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full bg-background border border-border rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/60 focus:ring-1 focus:ring-primary/30 transition-colors"
      />
    </div>
  );
}
