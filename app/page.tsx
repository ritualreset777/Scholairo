"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const YEAR_GROUPS = [
  "F Block (Year 9)",
  "E Block (Year 10)",
  "D Block (Year 11)",
  "C Block (Year 12)",
  "B Block (Year 13)",
];


const EMAIL_EXAMPLES = [
  {
    name: "Ollie",
    date: "Sunday 9 March",
    items: [
      { subject: "This Week", topic: "Rugby vs Harrow — Away fixture on Wednesday", tip: "Ollie's U16 team. Kick-off at 14:30." },
      { subject: "School News", topic: "Drama production rehearsals begin this week", tip: "Ollie is listed in the cast for the spring play." },
      { subject: "Upcoming", topic: "Half-term exeat starts Friday 28th March", tip: "Collection from School Yard from 12:00." },
    ],
  },
  {
    name: "James",
    date: "Sunday 16 March",
    items: [
      { subject: "This Week", topic: "1st XI Cricket vs Winchester — Home fixture Thursday", tip: "James is in the squad. Match starts at 13:00." },
      { subject: "School News", topic: "Chapel Choir concert in College Chapel on Friday", tip: "James is listed in the programme." },
      { subject: "Upcoming", topic: "Long Leave weekend begins Saturday 22nd March", tip: "Departure from Common Lane from 09:30." },
    ],
  },
  {
    name: "Harry",
    date: "Sunday 23 March",
    items: [
      { subject: "This Week", topic: "Swimming gala vs Eton rivals — Eton Baths, Tuesday", tip: "Harry is competing in the 200m freestyle." },
      { subject: "School News", topic: "History Society talk: The Fall of the Berlin Wall", tip: "Open to all — Harry's division attends Tuesday evening." },
      { subject: "Upcoming", topic: "End of Half celebrations on Thursday", tip: "Boys released from lessons at 12:00." },
    ],
  },
  {
    name: "Tom",
    date: "Sunday 30 March",
    items: [
      { subject: "This Week", topic: "Football — U18s vs Radley, Away fixture Wednesday", tip: "Tom is starting. Coach departs at 11:00." },
      { subject: "School News", topic: "Science Olympiad results announced — Tom's team placed 2nd", tip: "Well done to Tom and his team." },
      { subject: "Upcoming", topic: "Options choices deadline next Friday", tip: "Tom should confirm his B Block subject selections." },
    ],
  },
  {
    name: "Will",
    date: "Sunday 6 April",
    items: [
      { subject: "This Week", topic: "1st XI Hockey vs Marlborough — Home, Saturday", tip: "Will is in the starting line-up. 11:00 push-back." },
      { subject: "School News", topic: "Orchestra rehearsals for summer concert begin Monday", tip: "Will is playing violin in the first violin section." },
      { subject: "Upcoming", topic: "Exeat weekend: boys away Friday to Monday", tip: "Will should be collected by 18:00 Friday." },
    ],
  },
];


export default function Home() {
  useEffect(() => { window.scrollTo(0, 0); }, []);

const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: "", childName: "", yearGroup: "", email: "" });
  const [emailIndex, setEmailIndex] = useState(0);
  const [emailVisible, setEmailVisible] = useState(true);
  const [emailHovered, setEmailHovered] = useState(false);

  useEffect(() => {
    const id = setInterval(() => {
      if (emailHovered) return;
      setEmailVisible(false);
      setTimeout(() => {
        setEmailIndex(i => (i + 1) % EMAIL_EXAMPLES.length);
        setEmailVisible(true);
      }, 600);
    }, 3000);
    return () => clearInterval(id);
  }, [emailHovered]);
  const [transitioning, setTransitioning] = useState(false);

  const fadeToSection = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    setTransitioning(true);
    setTimeout(() => {
      const target = document.getElementById(targetId);
      if (target) target.scrollIntoView();
      setTimeout(() => setTransitioning(false), 50);
    }, 350);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch("/api/subscribe", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
    setSubmitted(true);
  };

  return (
    <div style={{ background: "#f6f9fc", color: "#0d1829", fontFamily: "var(--font-dm-sans), 'DM Sans', sans-serif" }}>
      <div style={{ position: "fixed", inset: 0, background: "#ffffff", zIndex: 9999, pointerEvents: "none", opacity: transitioning ? 1 : 0, transition: "opacity 0.35s ease" }} />
      <style>{`
        .btn-cta { transition: transform 0.18s ease, box-shadow 0.18s ease, background 0.18s ease; }
        .btn-cta:hover { transform: translateY(-2px); background: #1f2937 !important; box-shadow: 0 12px 24px rgba(0,0,0,0.18) !important; }
        .btn-cta:active { transform: translateY(0); }

        .btn-secondary { transition: background 0.15s ease, transform 0.15s ease; }
        .btn-secondary:hover { background: #f3f4f6 !important; transform: translateY(-1px); }
        .btn-secondary:active { transform: translateY(0); }

        .btn-ghost { transition: background 0.15s ease, color 0.15s ease; }
        .btn-ghost:hover { background: #f3f4f6 !important; color: #111827 !important; }

        .btn-apply { transition: background 0.15s ease, transform 0.15s ease; }
        .btn-apply:hover { background: #374151 !important; transform: translateY(-1px); }
        .btn-apply:active { transform: translateY(0); }

        .btn-submit { transition: background 0.18s ease, transform 0.18s ease, box-shadow 0.18s ease; }
        .btn-submit:hover { background: #7ac98a !important; transform: translateY(-2px); box-shadow: 0 8px 20px rgba(106,171,120,0.4) !important; }
        .btn-submit:active { transform: translateY(0); }

        .nav-text-link { transition: color 0.15s ease; }
        .nav-text-link:hover { color: #111827 !important; }


        @keyframes welcomeFade {
          from { opacity: 0; transform: translateY(12px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes emailFloat {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-8px); }
        }
        .email-card-float {
          animation: emailFloat 4s ease-in-out 1s infinite;
        }
        .email-card-float:hover {
          box-shadow: 0 20px 40px rgba(0,0,0,0.12) !important;
        }
      `}</style>

      {/* ── NAV ── */}
      <nav style={{ background: "rgba(255,255,255,0.85)", backdropFilter: "blur(10px)", WebkitBackdropFilter: "blur(10px)", borderBottom: "1px solid #e5e7eb", position: "sticky", top: 0, zIndex: 50 }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px", height: 68, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <span style={{ fontFamily: "var(--font-playfair), 'Playfair Display', serif", fontSize: 22, fontWeight: 700, color: "#0d1829", letterSpacing: "-0.3px" }}>
            Schol<span style={{ color: "#96C8A2" }}>AI</span>ro
          </span>
          <div className="nav-links">
            <a href="#how-it-works" onClick={e => fadeToSection(e as React.MouseEvent<HTMLAnchorElement>, "how-it-works")} className="nav-text-link" style={{ color: "#4a6280", fontSize: 15, textDecoration: "none", fontWeight: 500 }}>How It Works</a>
            <a href="/whats-on" className="nav-text-link" style={{ color: "#4a6280", fontSize: 15, textDecoration: "none", fontWeight: 500 }}>What&apos;s On</a>
            <a href="#pricing" onClick={e => fadeToSection(e as React.MouseEvent<HTMLAnchorElement>, "pricing")} className="nav-text-link" style={{ color: "#4a6280", fontSize: 15, textDecoration: "none", fontWeight: 500 }}>Pricing</a>
            <a href="/login" className="nav-text-link" style={{ color: "#4a6280", fontSize: 15, textDecoration: "none", fontWeight: 500 }}>Login</a>
            <a
              href="#signup"
              onClick={e => fadeToSection(e as React.MouseEvent<HTMLAnchorElement>, "signup")}
              className="btn-cta"
              style={{ background: "#111827", color: "#ffffff", padding: "10px 22px", borderRadius: 8, fontSize: 14, fontWeight: 600, textDecoration: "none", boxShadow: "0 4px 12px rgba(0,0,0,0.08)" }}
            >
              Get Started
            </a>
          </div>
        </div>
      </nav>

      {/* ── WELCOME BANNER ── */}
      <section style={{ height: "100vh", background: "#f6f9fc", display: "flex", alignItems: "center", justifyContent: "center", textAlign: "center" }}>
        <h1 style={{ fontFamily: "var(--font-playfair), 'Playfair Display', serif", fontSize: "clamp(2.4rem, 5vw, 4rem)", fontWeight: 700, color: "#0d1829", letterSpacing: "-0.5px", animation: "welcomeFade 2s ease both" }}>
          Welcome to Schol<span style={{ color: "#96C8A2" }}>AI</span>ro
        </h1>
      </section>

      {/* ── HERO ── */}
      <section style={{ position: "relative", overflow: "hidden" }}>
        {/* Decorative orbs */}
        <div style={{ position: "absolute", top: -120, right: -80, width: 600, height: 600, borderRadius: "50%", background: "radial-gradient(circle, rgba(150,200,162,0.18) 0%, transparent 70%)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", bottom: -80, left: -100, width: 500, height: 500, borderRadius: "50%", background: "radial-gradient(circle, rgba(90,155,214,0.12) 0%, transparent 70%)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", top: "40%", left: "50%", width: 400, height: 400, borderRadius: "50%", background: "radial-gradient(circle, rgba(122,176,227,0.08) 0%, transparent 70%)", pointerEvents: "none" }} />
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "120px 24px 120px", position: "relative" }}>
        <div className="hero-grid">

          {/* Left */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.12 } } }}
          >
            <motion.div
              variants={{ hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } } }}
              style={{ display: "inline-block", background: "rgba(110,160,220,0.12)", color: "#4a7cb3", fontSize: 13, fontWeight: 600, padding: "6px 14px", borderRadius: 999, marginBottom: 28, letterSpacing: "0.02em" }}
            >
              Built exclusively for Eton parents
            </motion.div>
            <motion.h1
              variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } } }}
              style={{ fontFamily: "var(--font-playfair), 'Playfair Display', serif", fontSize: "clamp(40px, 4.5vw, 56px)", fontWeight: 700, lineHeight: 1.1, margin: "0 0 24px", letterSpacing: "-0.02em", maxWidth: 520 }}
            >
              Know your son&apos;s week<br />
              <span style={{ background: "linear-gradient(90deg, #5a9bd6, #7ab0e3)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>at Eton, every Sunday.</span>
            </motion.h1>
            <motion.p
              variants={{ hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } } }}
              style={{ fontSize: 17, lineHeight: 1.75, color: "#4a6280", margin: "0 0 36px", maxWidth: 460 }}
            >
              Scholairo pulls fixtures, concerts, news and upcoming dates straight from Eton&apos;s calendar and delivers a personalised summary to your inbox every Sunday morning.
            </motion.p>
            <motion.div
              variants={{ hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } } }}
              style={{ display: "flex", gap: 12, flexWrap: "wrap", alignItems: "center" }}
            >
              <motion.a
                href="#signup"
                onClick={e => fadeToSection(e as React.MouseEvent<HTMLAnchorElement>, "signup")}
                className="btn-cta"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                style={{ background: "#111827", color: "#ffffff", padding: "14px 26px", borderRadius: 10, fontSize: 15, fontWeight: 600, textDecoration: "none", boxShadow: "0 6px 16px rgba(0,0,0,0.10)", display: "inline-block" }}
              >
                Get Started
              </motion.a>
              <motion.a
                href="#how-it-works"
                onClick={e => fadeToSection(e as React.MouseEvent<HTMLAnchorElement>, "how-it-works")}
                className="btn-secondary"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                style={{ background: "#ffffff", color: "#374151", padding: "14px 26px", borderRadius: 10, fontSize: 15, fontWeight: 600, textDecoration: "none", border: "1px solid #e5e7eb", boxShadow: "0 1px 4px rgba(0,0,0,0.04)", display: "inline-block" }}
              >
                See How It Works
              </motion.a>
            </motion.div>
          </motion.div>

          {/* Mock Email Card */}
          <div
            className="email-card-float"
            style={{ background: "#ffffff", borderRadius: 16, boxShadow: "0 10px 30px rgba(0,0,0,0.08), 0 2px 8px rgba(0,0,0,0.04)", border: "1px solid #e5e7eb", overflow: "hidden" }}
            onMouseEnter={() => setEmailHovered(true)}
            onMouseLeave={() => setEmailHovered(false)}
          >
            {/* Email chrome */}
            <div style={{ background: "#f0f6fb", borderBottom: "1px solid #b8d4ec", padding: "14px 20px", display: "flex", alignItems: "center", gap: 8 }}>
              <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#f28b82" }} />
              <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#fbbc04" }} />
              <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#34a853" }} />
              <span style={{ marginLeft: 12, fontSize: 12, color: "#4a6280", fontWeight: 500, opacity: emailVisible ? 1 : 0, transition: "opacity 0.5s ease" }}>
                Your Weekly Overview — {EMAIL_EXAMPLES[emailIndex].name}&apos;s Week at School
              </span>
            </div>

            <div style={{ padding: "24px 24px 28px" }}>
              <div style={{ opacity: emailVisible ? 1 : 0, transition: "opacity 0.5s ease" }}>
                  <div style={{ borderBottom: "1px solid #b8d4ec", paddingBottom: 16, marginBottom: 18 }}>
                    <p style={{ fontSize: 11, color: "#4a6280", margin: "0 0 4px", textTransform: "uppercase", letterSpacing: "0.8px", fontWeight: 600 }}>
                      From Scholairo · {EMAIL_EXAMPLES[emailIndex].date}
                    </p>
                    <h3 style={{ fontFamily: "var(--font-playfair), 'Playfair Display', serif", fontSize: 18, fontWeight: 700, margin: 0, color: "#0d1829" }}>
                      {EMAIL_EXAMPLES[emailIndex].name}&apos;s Weekly Overview
                    </h3>
                  </div>

                  {EMAIL_EXAMPLES[emailIndex].items.map((item) => (
                    <div key={item.subject} style={{ marginBottom: 16 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                        <span style={{ background: "#b8d4ec", color: "#2a4e8a", fontSize: 11, fontWeight: 700, padding: "2px 9px", borderRadius: 20, textTransform: "uppercase", letterSpacing: "0.4px" }}>
                          {item.subject}
                        </span>
                      </div>
                      <p style={{ fontSize: 13, fontWeight: 600, color: "#0d1829", margin: "0 0 2px" }}>{item.topic}</p>
                      <p style={{ fontSize: 12, color: "#4a6280", margin: 0 }}>{item.tip}</p>
                    </div>
                  ))}

                  <div style={{ background: "#f0f6fb", borderRadius: 8, padding: "12px 14px", marginTop: 8, border: "1px solid #b8d4ec" }}>
                    <p style={{ fontSize: 12, color: "#4a6280", margin: 0, fontStyle: "italic" }}>
                      Next Sunday you&apos;ll receive {EMAIL_EXAMPLES[emailIndex].name}&apos;s full weekly overview, including events, news and a summary of the week.
                    </p>
                  </div>
              </div>
            </div>

          </div>
        </div>
        </div>
      </section>

      {/* ── WHY PARENTS LOVE SCHOLAIRO ── */}
      <section style={{ padding: "100px 24px", background: "#ffffff" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, ease: "easeOut" }}
            style={{ textAlign: "center", marginBottom: 60 }}
          >
            <h2 style={{ fontFamily: "var(--font-playfair), 'Playfair Display', serif", fontSize: 36, fontWeight: 700, color: "#0d1829", margin: "0 0 16px", letterSpacing: "-0.02em" }}>
              Why parents love Scholairo
            </h2>
            <p style={{ fontSize: 18, color: "#6b7280", margin: "0 auto", maxWidth: 600, lineHeight: 1.6 }}>
              Stay informed about your child&apos;s school life without the noise.
            </p>
          </motion.div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 28 }}>
            {[
              {
                icon: "📊",
                title: "Clear weekly overview",
                desc: "Get a simple summary of everything your child did at school this week — from lessons and activities to important announcements.",
              },
              {
                icon: "📅",
                title: "Never miss key events",
                desc: "Sports fixtures, school productions, exams, and trips are all included in your weekly digest.",
              },
              {
                icon: "📚",
                title: "Smarter revision support",
                desc: "Know what your child should focus on revising each week so you can support their learning at home.",
              },
            ].map((card, i) => (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease: "easeOut", delay: i * 0.1 }}
                whileHover={{ y: -4, boxShadow: "0 16px 32px rgba(0,0,0,0.08)" }}
                style={{ background: "#ffffff", borderRadius: 16, padding: 28, border: "1px solid #e5e7eb", boxShadow: "0 6px 18px rgba(0,0,0,0.05)", cursor: "default" }}
              >
                <div style={{ fontSize: 28, marginBottom: 16 }}>{card.icon}</div>
                <h3 style={{ fontSize: 18, fontWeight: 600, color: "#0d1829", margin: "0 0 8px", letterSpacing: "-0.01em" }}>{card.title}</h3>
                <p style={{ fontSize: 15, color: "#6b7280", lineHeight: 1.6, margin: 0 }}>{card.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHAT'S ON TEASER ── */}
      <section style={{ background: "#f6f9fc", padding: "0 24px 100px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <motion.a
            href="/whats-on"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, ease: "easeOut" }}
            whileHover={{ y: -3, boxShadow: "0 20px 40px rgba(0,0,0,0.09)" }}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 32,
              background: "#ffffff",
              borderRadius: 20,
              padding: "36px 44px",
              border: "1px solid #e5e7eb",
              boxShadow: "0 6px 20px rgba(0,0,0,0.06)",
              textDecoration: "none",
              flexWrap: "wrap",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
              <div style={{ width: 52, height: 52, borderRadius: 14, background: "linear-gradient(135deg, #d4edda, #b8d4ec)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, fontSize: 24 }}>
                📆
              </div>
              <div>
                <p style={{ fontSize: 12, fontWeight: 600, color: "#4a8abf", textTransform: "uppercase", letterSpacing: "1.5px", margin: "0 0 4px" }}>Live calendar</p>
                <h3 style={{ fontFamily: "var(--font-playfair), 'Playfair Display', serif", fontSize: 22, fontWeight: 700, color: "#0d1829", margin: "0 0 6px", letterSpacing: "-0.01em" }}>
                  What&apos;s on at Eton this week
                </h3>
                <p style={{ fontSize: 15, color: "#6b7280", margin: 0, lineHeight: 1.5 }}>
                  Browse fixtures, concerts, plays, and school events — updated live from the Eton calendar.
                </p>
              </div>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 8, background: "#0d1829", color: "#ffffff", borderRadius: 10, padding: "12px 22px", fontSize: 14, fontWeight: 600, flexShrink: 0, whiteSpace: "nowrap" }}>
              View calendar
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style={{ marginLeft: 4 }}>
                <path d="M3 7h8M7.5 3.5L11 7l-3.5 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </motion.a>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section id="how-it-works" style={{ background: "#0d1829", padding: "100px 24px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            style={{ textAlign: "center", marginBottom: 72 }}
          >
            <p style={{ fontSize: 12, fontWeight: 600, color: "#96C8A2", textTransform: "uppercase", letterSpacing: "2px", marginBottom: 14 }}>Simple to set up</p>
            <h2 style={{ fontFamily: "var(--font-playfair), 'Playfair Display', serif", fontSize: "clamp(28px, 3.5vw, 42px)", fontWeight: 700, margin: "0 auto", maxWidth: 520, color: "#ffffff" }}>
              How Scholairo works
            </h2>
          </motion.div>

          <div className="steps-grid">
            {[
              { n: "01", color: "#96C8A2", title: "Set up your child's profile", desc: "Tell us your child's name, year group, and house. It takes less than two minutes." },
              { n: "02", color: "#5a9bd6", title: "We pull together what's happening", desc: "Scholairo gathers the week's events, news, and school activity into a clear, readable summary — no logging in required." },
              { n: "03", color: "#e0a86e", title: "You get a weekly email every Sunday", desc: "A beautifully formatted overview lands in your inbox each Sunday — everything you need to know about your child's week." },
            ].map((step, i) => (
              <motion.div
                key={step.n}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease: "easeOut", delay: i * 0.12 }}
                whileHover={{ y: -6 }}
                style={{ padding: "36px 32px", background: "rgba(255,255,255,0.04)", borderRadius: 16, border: "1px solid rgba(255,255,255,0.08)", position: "relative", borderTop: `3px solid ${step.color}`, cursor: "default" }}
              >
                <div style={{ fontSize: 13, fontWeight: 700, color: step.color, letterSpacing: "1px", marginBottom: 20 }}>{step.n}</div>
                <h3 style={{ fontFamily: "var(--font-playfair), 'Playfair Display', serif", fontSize: 20, fontWeight: 700, margin: "0 0 12px", color: "#ffffff" }}>
                  {step.title}
                </h3>
                <p style={{ fontSize: 15, lineHeight: 1.7, color: "rgba(255,255,255,0.5)", margin: 0 }}>{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TRUST STRIP ── */}
      <section style={{ background: "#f6f9fc", borderBottom: "1px solid #e5e7eb", padding: "64px 24px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div className="stats-grid">
            {[
              { stat: "Every Sunday", label: "Consistent, reliable delivery", icon: "📅" },
              { stat: "Personalised", label: "Tailored to your child's year and house", icon: "✨" },
              { stat: "2 minutes", label: "To set up, then nothing else to do", icon: "⚡" },
            ].map((item, i) => (
              <motion.div
                key={item.stat}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, ease: "easeOut", delay: i * 0.1 }}
                whileHover={{ y: -5, boxShadow: "0 10px 24px rgba(0,0,0,0.08)" }}
                style={{ padding: "28px 24px", background: "#ffffff", borderRadius: 14, border: "1px solid #e5e7eb", boxShadow: "0 2px 8px rgba(0,0,0,0.04)", textAlign: "center", cursor: "default" }}
              >
                <div style={{ fontSize: 28, marginBottom: 10 }}>{item.icon}</div>
                <div style={{ fontFamily: "var(--font-playfair), 'Playfair Display', serif", fontSize: 22, fontWeight: 700, color: "#0d1829", marginBottom: 6 }}>{item.stat}</div>
                <div style={{ fontSize: 14, color: "#6b7280", lineHeight: 1.5 }}>{item.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRICING ── */}
      <section id="pricing" style={{ background: "linear-gradient(180deg, #f6f9fc 0%, #f8fbff 100%)", padding: "100px 24px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, ease: "easeOut" }}
            style={{ textAlign: "center", marginBottom: 64 }}
          >
            <p style={{ fontSize: 12, fontWeight: 600, color: "#4a8abf", textTransform: "uppercase", letterSpacing: "2px", marginBottom: 14 }}>Pricing</p>
            <h2 style={{ fontFamily: "var(--font-playfair), 'Playfair Display', serif", fontSize: "clamp(28px, 3.5vw, 42px)", fontWeight: 700, margin: "0 0 16px", color: "#0d1829", letterSpacing: "-0.02em" }}>
              Simple pricing for parents
            </h2>
            <p style={{ fontSize: 17, color: "#6b7280", maxWidth: 500, margin: "0 auto", lineHeight: 1.6 }}>
              Stay on top of your child&apos;s school life with one simple weekly summary.
            </p>
          </motion.div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 28, maxWidth: 780, margin: "0 auto" }}>
            {/* Parent Plan */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
              whileHover={{ y: -4, boxShadow: "0 20px 40px rgba(0,0,0,0.09)" }}
              style={{ background: "#ffffff", borderRadius: 16, padding: 36, border: "1px solid #e5e7eb", boxShadow: "0 8px 24px rgba(0,0,0,0.06)", cursor: "default" }}
            >
              <p style={{ fontSize: 12, fontWeight: 600, color: "#4a6280", textTransform: "uppercase", letterSpacing: "1.5px", margin: "0 0 14px" }}>Parent Plan</p>
              <div style={{ display: "flex", alignItems: "baseline", gap: 2, marginBottom: 6 }}>
                <span style={{ fontFamily: "var(--font-playfair), 'Playfair Display', serif", fontSize: 40, fontWeight: 700, color: "#0d1829", letterSpacing: "-0.02em" }}>£4.99</span>
                <span style={{ fontSize: 14, color: "#9ca3af" }}>&nbsp;/ month</span>
              </div>
              <p style={{ fontSize: 14, color: "#6b7280", margin: "0 0 24px", lineHeight: 1.5 }}>For parents of one child.</p>
              <div style={{ borderTop: "1px solid #f3f4f6", paddingTop: 20, marginBottom: 28 }}>
                {["Weekly school summaries", "School events and activities", "Revision insights", "Parent notifications"].map(f => (
                  <div key={f} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 11 }}>
                    <span style={{ color: "#7db78c", fontWeight: 700, fontSize: 14 }}>✓</span>
                    <span style={{ fontSize: 14, color: "#374151" }}>{f}</span>
                  </div>
                ))}
              </div>
              <a href="#signup" onClick={e => fadeToSection(e as React.MouseEvent<HTMLAnchorElement>, "signup")} style={{ display: "block", textAlign: "center", background: "#7db78c", color: "#ffffff", padding: "13px 22px", borderRadius: 10, fontWeight: 600, fontSize: 15, textDecoration: "none" }}>
                Start Free Trial
              </a>
            </motion.div>

            {/* Family Plan */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: "easeOut", delay: 0.2 }}
              whileHover={{ y: -4, boxShadow: "0 20px 40px rgba(0,0,0,0.09)" }}
              style={{ background: "#ffffff", borderRadius: 16, padding: 36, border: "2px solid #7db78c", boxShadow: "0 8px 24px rgba(0,0,0,0.06)", position: "relative", cursor: "default" }}
            >
              <div style={{ position: "absolute", top: -13, left: 32, background: "#7db78c", color: "#ffffff", fontSize: 11, fontWeight: 700, padding: "4px 12px", borderRadius: 999, letterSpacing: "0.4px" }}>
                Most popular
              </div>
              <p style={{ fontSize: 12, fontWeight: 600, color: "#4a6280", textTransform: "uppercase", letterSpacing: "1.5px", margin: "0 0 14px" }}>Family Plan</p>
              <div style={{ display: "flex", alignItems: "baseline", gap: 2, marginBottom: 6 }}>
                <span style={{ fontFamily: "var(--font-playfair), 'Playfair Display', serif", fontSize: 40, fontWeight: 700, color: "#0d1829", letterSpacing: "-0.02em" }}>£6.99</span>
                <span style={{ fontSize: 14, color: "#9ca3af" }}>&nbsp;/ month</span>
              </div>
              <p style={{ fontSize: 14, color: "#6b7280", margin: "0 0 24px", lineHeight: 1.5 }}>For families with more than one child at school.</p>
              <div style={{ borderTop: "1px solid #f3f4f6", paddingTop: 20, marginBottom: 28 }}>
                {["Everything in Parent Plan", "Support for multiple children", "Priority summaries", "Family dashboard"].map(f => (
                  <div key={f} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 11 }}>
                    <span style={{ color: "#7db78c", fontWeight: 700, fontSize: 14 }}>✓</span>
                    <span style={{ fontSize: 14, color: "#374151" }}>{f}</span>
                  </div>
                ))}
              </div>
              <a href="#signup" onClick={e => fadeToSection(e as React.MouseEvent<HTMLAnchorElement>, "signup")} style={{ display: "block", textAlign: "center", background: "#7db78c", color: "#ffffff", padding: "13px 22px", borderRadius: 10, fontWeight: 600, fontSize: 15, textDecoration: "none" }}>
                Start Free Trial
              </a>
            </motion.div>
          </div>

          <p style={{ textAlign: "center", color: "#9ca3af", fontSize: 14, marginTop: 32 }}>
            14-day free trial. No credit card required.
          </p>
        </div>
      </section>

      {/* ── SIGN UP ── */}
      <section id="signup" style={{ padding: "80px 24px 100px", background: "linear-gradient(180deg, #f6f9fc 0%, #eef4fb 100%)" }}>
        <div style={{ maxWidth: 580, margin: "0 auto" }}>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, ease: "easeOut" }}
            style={{ textAlign: "center", marginBottom: 40 }}
          >
            <p style={{ fontSize: 12, fontWeight: 600, color: "#4a8abf", textTransform: "uppercase", letterSpacing: "2px", marginBottom: 12 }}>Join Scholairo</p>
            <h2 style={{ fontFamily: "var(--font-playfair), 'Playfair Display', serif", fontSize: "clamp(26px, 3vw, 36px)", fontWeight: 700, color: "#0d1829", margin: "0 0 12px", lineHeight: 1.2 }}>
              Start receiving weekly summaries
            </h2>
            <p style={{ fontSize: 16, color: "#6b7280", margin: 0 }}>Free to join. Your first overview arrives this Sunday.</p>
          </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
          style={{ background: "#ffffff", borderRadius: 20, border: "1px solid #e5e7eb", boxShadow: "0 8px 40px rgba(0,0,0,0.08)", overflow: "hidden" }}
        >
          <div style={{ height: 4, background: "linear-gradient(90deg, #96C8A2, #5a9bd6, #e0a86e)" }} />
          <div className="form-body">
            {submitted ? (
              <div style={{ textAlign: "center", padding: "24px 0" }}>
                <div style={{ width: 48, height: 48, background: "#96C8A2", borderRadius: 10, marginBottom: 16, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px" }}><svg width="22" height="18" viewBox="0 0 22 18" fill="none"><rect x="1" y="1" width="20" height="16" rx="2" stroke="#0d1829" strokeWidth="1.8"/><path d="M1 4l10 7 10-7" stroke="#0d1829" strokeWidth="1.8" strokeLinecap="round"/></svg></div>
                <h3 style={{ fontFamily: "var(--font-playfair), 'Playfair Display', serif", fontSize: 24, fontWeight: 700, marginBottom: 12 }}>You&apos;re on the list!</h3>
                <p style={{ color: "#4a6280", fontSize: 15 }}>We&apos;ll send your first digest this Sunday. Check your inbox.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div className="form-row">
                  <div>
                    <label style={labelStyle}>Your name</label>
                    <input required placeholder="e.g. Sarah Mitchell" style={inputStyle} value={formData.name} onChange={e => setFormData(f => ({ ...f, name: e.target.value }))} />
                  </div>
                  <div>
                    <label style={labelStyle}>Child&apos;s name</label>
                    <input required placeholder="e.g. Ollie" style={inputStyle} value={formData.childName} onChange={e => setFormData(f => ({ ...f, childName: e.target.value }))} />
                  </div>
                </div>

                <div style={{ marginBottom: 20 }}>
                  <label style={labelStyle}>Year group</label>
                  <select required style={inputStyle} value={formData.yearGroup} onChange={e => setFormData(f => ({ ...f, yearGroup: e.target.value }))}>
                    <option value="">Select year group…</option>
                    {YEAR_GROUPS.map((y) => (
                      <option key={y} value={y}>{y}</option>
                    ))}
                  </select>
                </div>

<div style={{ marginBottom: 28 }}>
                  <label style={labelStyle}>Email address</label>
                  <input required type="email" placeholder="you@example.com" style={inputStyle} value={formData.email} onChange={e => setFormData(f => ({ ...f, email: e.target.value }))} />
                </div>

                <motion.button
                  type="submit"
                  className="btn-submit"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  style={{ width: "100%", background: "#96C8A2", color: "#0d1829", border: "none", borderRadius: 9, padding: "15px 0", fontSize: 15, fontWeight: 700, cursor: "pointer", boxShadow: "0 2px 10px rgba(106,171,120,0.3)" }}
                >
                  Start my weekly summaries →
                </motion.button>

                <p style={{ textAlign: "center", fontSize: 12, color: "#4a6280", marginTop: 14 }}>
                  Free to join. No payment details required.
                </p>
              </form>
            )}
          </div>
        </motion.div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{ background: "#0d1829" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "48px 24px", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 16 }}>
          <div>
            <span style={{ fontFamily: "var(--font-playfair), 'Playfair Display', serif", fontSize: 22, fontWeight: 700, color: "#ffffff" }}>Schol<span style={{ color: "#96C8A2" }}>AI</span>ro</span>
            <p style={{ fontSize: 13, color: "rgba(255,255,255,0.35)", margin: "6px 0 0", fontStyle: "italic" }}>Every week, every child.</p>
          </div>
          <p style={{ fontSize: 13, color: "rgba(255,255,255,0.3)", margin: 0 }}>© {new Date().getFullYear()} Scholairo. All rights reserved.</p>
        </div>
      </footer>

    </div>
  );
}

const labelStyle: React.CSSProperties = {
  display: "block",
  fontSize: 13,
  fontWeight: 600,
  color: "#0d1829",
  marginBottom: 6,
  letterSpacing: "0.1px",
};

const inputStyle: React.CSSProperties = {
  width: "100%",
  border: "1.5px solid #b8d4ec",
  borderRadius: 8,
  padding: "11px 14px",
  fontSize: 14,
  color: "#0d1829",
  background: "#ffffff",
  outline: "none",
  fontFamily: "var(--font-dm-sans), 'DM Sans', sans-serif",
  appearance: "none" as const,
};
