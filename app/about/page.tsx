"use client";

import { useState } from "react";

const SUBJECTS = [
  "Mathematics",
  "English",
  "Science",
  "History",
  "Geography",
  "French",
  "Spanish",
  "Art",
  "Music",
  "PE",
  "Computing",
  "Religious Studies",
];

const YEAR_GROUPS = [
  "Year 1", "Year 2", "Year 3", "Year 4", "Year 5", "Year 6",
  "Year 7", "Year 8", "Year 9", "Year 10", "Year 11",
  "Year 12", "Year 13",
];

export default function Home() {
  const [subjects, setSubjects] = useState<string[]>([]);
  const [submitted, setSubmitted] = useState(false);

  const toggleSubject = (s: string) =>
    setSubjects((prev) =>
      prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s]
    );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div style={{ background: "#f0f6fb", color: "#0d1829", fontFamily: "var(--font-dm-sans), 'DM Sans', sans-serif" }}>

      {/* ── NAV ── */}
      <nav style={{ background: "#ffffff", borderBottom: "1px solid #b8d4ec" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 24px", height: 68, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <span style={{ fontFamily: "var(--font-playfair), 'Playfair Display', serif", fontSize: 22, fontWeight: 700, color: "#0d1829", letterSpacing: "-0.3px" }}>
            Scholairo
          </span>
          <div className="nav-links">
            <a href="#how-it-works" className="nav-text-link" style={{ color: "#4a6280", fontSize: 15, textDecoration: "none", fontWeight: 500 }}>How It Works</a>
            <a href="#signup" className="nav-text-link" style={{ color: "#4a6280", fontSize: 15, textDecoration: "none", fontWeight: 500 }}>Sign Up</a>
            <a
              href="#signup"
              style={{
                background: "#96C8A2",
                color: "#0d1829",
                padding: "10px 22px",
                borderRadius: 8,
                fontSize: 14,
                fontWeight: 600,
                textDecoration: "none",
                transition: "background 0.2s",
              }}
            >
              Get Started
            </a>
          </div>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section style={{ maxWidth: 1100, margin: "0 auto", padding: "80px 24px 96px" }}>
        <div className="hero-grid">

          {/* Left */}
          <div>
            <div style={{ display: "inline-block", background: "#b8d4ec", color: "#2a4e8a", fontSize: 13, fontWeight: 600, padding: "5px 14px", borderRadius: 20, marginBottom: 24, letterSpacing: "0.5px", textTransform: "uppercase" }}>
              Weekly Digests for Parents
            </div>
            <h1 style={{ fontFamily: "var(--font-playfair), 'Playfair Display', serif", fontSize: "clamp(36px, 4vw, 52px)", fontWeight: 700, lineHeight: 1.15, margin: "0 0 20px", letterSpacing: "-0.5px" }}>
              Your child&apos;s week,<br />
              <span style={{ color: "#4a8abf" }}>beautifully summarised.</span>
            </h1>
            <p style={{ fontSize: 17, lineHeight: 1.7, color: "#4a6280", margin: "0 0 36px", maxWidth: 420 }}>
              Every Sunday, Scholairo delivers a personalised email to parents with a clear breakdown of what their child studied that week — plus tailored revision tips to keep learning on track.
            </p>
            <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
              <a
                href="#signup"
                style={{
                  background: "#96C8A2",
                  color: "#0d1829",
                  padding: "14px 28px",
                  borderRadius: 9,
                  fontSize: 15,
                  fontWeight: 600,
                  textDecoration: "none",
                  boxShadow: "0 2px 8px rgba(106,171,120,0.25)",
                }}
              >
                Get Started — Free
              </a>
              <a
                href="#how-it-works"
                style={{
                  background: "transparent",
                  color: "#0d1829",
                  padding: "14px 28px",
                  borderRadius: 9,
                  fontSize: 15,
                  fontWeight: 600,
                  textDecoration: "none",
                  border: "1.5px solid #b8d4ec",
                }}
              >
                See How It Works
              </a>
            </div>
          </div>

          {/* Mock Email Card */}
          <div style={{ background: "#ffffff", borderRadius: 16, boxShadow: "0 4px 32px rgba(13,24,41,0.08)", border: "1px solid #b8d4ec", overflow: "hidden" }}>
            {/* Email chrome */}
            <div style={{ background: "#f0f6fb", borderBottom: "1px solid #b8d4ec", padding: "14px 20px", display: "flex", alignItems: "center", gap: 8 }}>
              <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#f28b82" }} />
              <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#fbbc04" }} />
              <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#34a853" }} />
              <span style={{ marginLeft: 12, fontSize: 12, color: "#4a6280", fontWeight: 500 }}>Weekly Digest — Ollie&apos;s Week at School</span>
            </div>
            <div style={{ padding: "24px 24px 28px" }}>
              <div style={{ borderBottom: "1px solid #b8d4ec", paddingBottom: 16, marginBottom: 18 }}>
                <p style={{ fontSize: 11, color: "#4a6280", margin: "0 0 4px", textTransform: "uppercase", letterSpacing: "0.8px", fontWeight: 600 }}>From Scholairo · Sunday 9 March</p>
                <h3 style={{ fontFamily: "var(--font-playfair), 'Playfair Display', serif", fontSize: 18, fontWeight: 700, margin: 0, color: "#0d1829" }}>
                  Ollie&apos;s Weekly Learning Summary
                </h3>
              </div>

              {[
                { subject: "Mathematics", topic: "Quadratic equations & factorising", tip: "Try the 'ac method' — practice 5 examples tonight." },
                { subject: "History", topic: "Causes of World War I — alliances", tip: "Sketch a mind-map linking the four main causes." },
                { subject: "English", topic: "Analysing Macbeth Act III", tip: "Focus on Shakespeare's use of ambition as a theme." },
              ].map((item) => (
                <div key={item.subject} style={{ marginBottom: 16 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                    <span style={{ background: "#b8d4ec", color: "#2a4e8a", fontSize: 11, fontWeight: 700, padding: "2px 9px", borderRadius: 20, textTransform: "uppercase", letterSpacing: "0.4px" }}>
                      {item.subject}
                    </span>
                  </div>
                  <p style={{ fontSize: 13, fontWeight: 600, color: "#0d1829", margin: "0 0 2px" }}>{item.topic}</p>
                  <p style={{ fontSize: 12, color: "#4a6280", margin: 0 }}>💡 {item.tip}</p>
                </div>
              ))}

              <div style={{ background: "#f0f6fb", borderRadius: 8, padding: "12px 14px", marginTop: 8, border: "1px solid #b8d4ec" }}>
                <p style={{ fontSize: 12, color: "#4a6280", margin: 0, fontStyle: "italic" }}>
                  Next week Ollie has a History test. We&apos;ll send extra revision prompts on Thursday.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section id="how-it-works" style={{ background: "#ffffff", borderTop: "1px solid #b8d4ec", borderBottom: "1px solid #b8d4ec", padding: "80px 24px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 64 }}>
            <p style={{ fontSize: 13, fontWeight: 600, color: "#4a8abf", textTransform: "uppercase", letterSpacing: "1px", marginBottom: 12 }}>Simple to set up</p>
            <h2 style={{ fontFamily: "var(--font-playfair), 'Playfair Display', serif", fontSize: "clamp(28px, 3.5vw, 42px)", fontWeight: 700, margin: "0 auto", maxWidth: 520 }}>
              How Scholairo works
            </h2>
          </div>

          <div className="steps-grid">
            {[
              {
                n: "01",
                title: "Set up your child's profile",
                desc: "Tell us your child's name, year group, and which subjects they study. It takes less than two minutes.",
              },
              {
                n: "02",
                title: "We track their syllabus",
                desc: "Scholairo maps your child's curriculum week by week, so our summaries are always accurate and relevant.",
              },
              {
                n: "03",
                title: "You get a weekly email every Sunday",
                desc: "A beautifully formatted digest lands in your inbox each Sunday — with what was covered and how to help at home.",
              },
            ].map((step) => (
              <div key={step.n} style={{ padding: "36px 32px", background: "#f0f6fb", borderRadius: 14, border: "1px solid #b8d4ec", position: "relative" }}>
                <div style={{ fontFamily: "var(--font-playfair), 'Playfair Display', serif", fontSize: 56, fontWeight: 700, color: "#b8d4ec", lineHeight: 1, marginBottom: 20 }}>
                  {step.n}
                </div>
                <h3 style={{ fontFamily: "var(--font-playfair), 'Playfair Display', serif", fontSize: 20, fontWeight: 700, margin: "0 0 12px", color: "#0d1829" }}>
                  {step.title}
                </h3>
                <p style={{ fontSize: 15, lineHeight: 1.7, color: "#4a6280", margin: 0 }}>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TRUST STRIP ── */}
      <section style={{ maxWidth: 1100, margin: "0 auto", padding: "56px 24px" }}>
        <div className="stats-grid">
          {[
            { stat: "Every Sunday", label: "Consistent, reliable delivery" },
            { stat: "Curriculum-aligned", label: "Mapped to the national syllabus" },
            { stat: "100% personalised", label: "Unique to your child's subjects" },
          ].map((item) => (
            <div key={item.stat}>
              <div style={{ fontFamily: "var(--font-playfair), 'Playfair Display', serif", fontSize: 26, fontWeight: 700, color: "#0d1829", marginBottom: 6 }}>{item.stat}</div>
              <div style={{ fontSize: 14, color: "#4a6280" }}>{item.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── SIGN UP ── */}
      <section id="signup" style={{ padding: "0 24px 96px" }}>
        <div style={{ maxWidth: 700, margin: "0 auto", background: "#ffffff", borderRadius: 20, border: "1px solid #b8d4ec", boxShadow: "0 4px 40px rgba(13,24,41,0.06)", overflow: "hidden" }}>

          {/* Header band */}
          <div className="form-header">
            <p style={{ fontSize: 13, fontWeight: 600, color: "rgba(255,255,255,0.75)", textTransform: "uppercase", letterSpacing: "1px", margin: "0 0 8px" }}>Join Scholairo</p>
            <h2 style={{ fontFamily: "var(--font-playfair), 'Playfair Display', serif", fontSize: "clamp(24px, 3vw, 32px)", fontWeight: 700, color: "#ffffff", margin: 0, lineHeight: 1.2 }}>
              Start receiving weekly summaries
            </h2>
          </div>

          {/* Form body */}
          <div className="form-body">
            {submitted ? (
              <div style={{ textAlign: "center", padding: "24px 0" }}>
                <div style={{ fontSize: 48, marginBottom: 16 }}>✉️</div>
                <h3 style={{ fontFamily: "var(--font-playfair), 'Playfair Display', serif", fontSize: 24, fontWeight: 700, marginBottom: 12 }}>You&apos;re on the list!</h3>
                <p style={{ color: "#4a6280", fontSize: 15 }}>We&apos;ll send your first digest this Sunday. Check your inbox.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div className="form-row">
                  <div>
                    <label style={labelStyle}>Your name</label>
                    <input required placeholder="e.g. Sarah Mitchell" style={inputStyle} />
                  </div>
                  <div>
                    <label style={labelStyle}>Child&apos;s name</label>
                    <input required placeholder="e.g. Ollie" style={inputStyle} />
                  </div>
                </div>

                <div style={{ marginBottom: 20 }}>
                  <label style={labelStyle}>Year group</label>
                  <select required style={inputStyle}>
                    <option value="">Select year group…</option>
                    {YEAR_GROUPS.map((y) => (
                      <option key={y} value={y}>{y}</option>
                    ))}
                  </select>
                </div>

                <div style={{ marginBottom: 20 }}>
                  <label style={labelStyle}>Subjects (select all that apply)</label>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 8 }}>
                    {SUBJECTS.map((s) => {
                      const active = subjects.includes(s);
                      return (
                        <button
                          key={s}
                          type="button"
                          onClick={() => toggleSubject(s)}
                          style={{
                            padding: "7px 14px",
                            borderRadius: 20,
                            fontSize: 13,
                            fontWeight: 500,
                            cursor: "pointer",
                            border: active ? "1.5px solid #4a8abf" : "1.5px solid #b8d4ec",
                            background: active ? "#e8f2fb" : "#ffffff",
                            color: active ? "#2a4e8a" : "#4a6280",
                            transition: "all 0.15s",
                          }}
                        >
                          {s}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div style={{ marginBottom: 28 }}>
                  <label style={labelStyle}>Email address</label>
                  <input required type="email" placeholder="you@example.com" style={inputStyle} />
                </div>

                <button
                  type="submit"
                  style={{
                    width: "100%",
                    background: "#96C8A2",
                    color: "#0d1829",
                    border: "none",
                    borderRadius: 9,
                    padding: "15px 0",
                    fontSize: 15,
                    fontWeight: 700,
                    cursor: "pointer",
                    boxShadow: "0 2px 10px rgba(106,171,120,0.3)",
                  }}
                >
                  Start my weekly summaries →
                </button>

                <p style={{ textAlign: "center", fontSize: 12, color: "#4a6280", marginTop: 14 }}>
                  Free to join. No payment details required.
                </p>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{ borderTop: "1px solid #b8d4ec", background: "#ffffff" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "36px 24px", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
          <div>
            <span style={{ fontFamily: "var(--font-playfair), 'Playfair Display', serif", fontSize: 20, fontWeight: 700, color: "#0d1829" }}>Scholairo</span>
            <p style={{ fontSize: 13, color: "#4a6280", margin: "4px 0 0", fontStyle: "italic" }}>Every week, every child.</p>
          </div>
          <p style={{ fontSize: 13, color: "#4a6280", margin: 0 }}>© {new Date().getFullYear()} Scholairo. All rights reserved.</p>
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
