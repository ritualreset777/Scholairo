"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

const features = {
  parent: [
    "Weekly school summaries",
    "School events and activities",
    "Revision insights",
    "Parent notifications",
  ],
  family: [
    "Everything in Parent Plan",
    "Support for multiple children",
    "Priority summaries",
    "Family dashboard",
  ],
};

const faqs = [
  { q: "When does my free trial start?", a: "Your 14-day free trial begins the moment you sign up. No credit card is required until you decide to continue." },
  { q: "Can I cancel at any time?", a: "Yes — you can cancel your subscription at any time with no questions asked. You'll retain access until the end of your billing period." },
  { q: "What schools does Scholairo support?", a: "Scholairo currently supports Eton College, with more schools being added. If your school isn't listed, get in touch and we'll let you know when it's available." },
  { q: "What's the difference between the plans?", a: "The Parent Plan covers one child. The Family Plan supports multiple children under one account, making it ideal for families with more than one pupil at the school." },
];

export default function Pricing() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div style={{ background: "linear-gradient(180deg, #f6f9fc 0%, #f8fbff 100%)", minHeight: "100vh", color: "#0d1829", fontFamily: "'DM Sans', sans-serif" }}>
      <style>{`
        .price-card { transition: transform 0.25s ease, box-shadow 0.25s ease; }
        .price-card:hover { transform: translateY(-4px); box-shadow: 0 20px 40px rgba(0,0,0,0.09) !important; }
        .btn-plan { transition: background 0.18s ease, transform 0.18s ease; }
        .btn-plan:hover { background: #6aa87a !important; transform: translateY(-1px); }
        .btn-plan:active { transform: translateY(0); }
        .btn-contact { transition: background 0.15s ease, transform 0.15s ease; }
        .btn-contact:hover { background: #f3f4f6 !important; transform: translateY(-1px); }
        .faq-row { transition: background 0.15s ease; }
        .faq-row:hover { background: #f9fafb; }
        .nav-link { transition: color 0.15s ease; }
        .nav-link:hover { color: #111827 !important; }
      `}</style>

      {/* Nav */}
      <nav style={{ background: "rgba(255,255,255,0.85)", backdropFilter: "blur(10px)", WebkitBackdropFilter: "blur(10px)", borderBottom: "1px solid #e5e7eb", position: "sticky", top: 0, zIndex: 50 }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px", height: 68, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <Link href="/" style={{ fontFamily: "'Playfair Display', serif", fontSize: 22, fontWeight: 700, color: "#0d1829", letterSpacing: "-0.3px", textDecoration: "none" }}>
            Schol<span style={{ color: "#96C8A2" }}>AI</span>ro
          </Link>
          <div style={{ display: "flex", alignItems: "center", gap: 32 }}>
            <Link href="/#how-it-works" className="nav-link" style={{ color: "#4a6280", fontSize: 15, fontWeight: 500, textDecoration: "none" }}>How It Works</Link>
            <Link href="/pricing" className="nav-link" style={{ color: "#0d1829", fontSize: 15, fontWeight: 600, textDecoration: "none" }}>Pricing</Link>
            <Link href="/login" className="nav-link" style={{ color: "#4a6280", fontSize: 15, fontWeight: 500, textDecoration: "none" }}>Login</Link>
            <Link href="/#signup" style={{ background: "#111827", color: "#ffffff", padding: "10px 22px", borderRadius: 8, fontSize: 14, fontWeight: 600, textDecoration: "none" }}>
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section style={{ padding: "90px 24px 0", textAlign: "center" }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <p style={{ fontSize: 13, fontWeight: 600, color: "#4a8abf", textTransform: "uppercase", letterSpacing: "2px", marginBottom: 16 }}>Pricing</p>
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(32px, 4vw, 48px)", fontWeight: 700, margin: "0 0 16px", letterSpacing: "-0.02em", color: "#0d1829" }}>
            Simple pricing for parents
          </h1>
          <p style={{ fontSize: 18, color: "#6b7280", maxWidth: 560, margin: "0 auto 80px", lineHeight: 1.6 }}>
            Stay on top of your child&apos;s school life with one simple weekly summary.
          </p>
        </motion.div>
      </section>

      {/* Pricing Cards */}
      <section style={{ padding: "0 24px 40px" }}>
        <div style={{ maxWidth: 900, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: 32 }}>

          {/* Parent Plan */}
          <motion.div
            className="price-card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
            style={{ background: "#ffffff", borderRadius: 16, padding: 36, border: "1px solid #e5e7eb", boxShadow: "0 8px 24px rgba(0,0,0,0.06)" }}
          >
            <p style={{ fontSize: 13, fontWeight: 600, color: "#4a6280", textTransform: "uppercase", letterSpacing: "1.5px", marginBottom: 12 }}>Parent Plan</p>
            <div style={{ display: "flex", alignItems: "baseline", gap: 4, marginBottom: 8 }}>
              <span style={{ fontFamily: "'Playfair Display', serif", fontSize: 40, fontWeight: 700, color: "#0d1829", letterSpacing: "-0.02em" }}>£4.99</span>
              <span style={{ fontSize: 15, color: "#9ca3af", fontWeight: 400 }}>&nbsp;/ month</span>
            </div>
            <p style={{ fontSize: 14, color: "#6b7280", marginBottom: 28, lineHeight: 1.5 }}>
              Perfect for parents of one child. Everything you need to stay informed.
            </p>
            <div style={{ borderTop: "1px solid #f3f4f6", paddingTop: 24, marginBottom: 28 }}>
              {features.parent.map(f => (
                <div key={f} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
                  <span style={{ color: "#7db78c", fontSize: 15, fontWeight: 700, flexShrink: 0 }}>✓</span>
                  <span style={{ fontSize: 15, color: "#374151" }}>{f}</span>
                </div>
              ))}
            </div>
            <Link
              href="/#signup"
              className="btn-plan"
              style={{ display: "block", textAlign: "center", background: "#7db78c", color: "#ffffff", padding: "13px 22px", borderRadius: 10, fontWeight: 600, fontSize: 15, textDecoration: "none" }}
            >
              Start Free Trial
            </Link>
          </motion.div>

          {/* Family Plan */}
          <motion.div
            className="price-card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut", delay: 0.2 }}
            style={{ background: "#ffffff", borderRadius: 16, padding: 36, border: "2px solid #7db78c", boxShadow: "0 8px 24px rgba(0,0,0,0.06)", position: "relative" }}
          >
            <div style={{ position: "absolute", top: -13, left: 36, background: "#7db78c", color: "#ffffff", fontSize: 12, fontWeight: 700, padding: "4px 12px", borderRadius: 999, letterSpacing: "0.3px" }}>
              Most popular
            </div>
            <p style={{ fontSize: 13, fontWeight: 600, color: "#4a6280", textTransform: "uppercase", letterSpacing: "1.5px", marginBottom: 12 }}>Family Plan</p>
            <div style={{ display: "flex", alignItems: "baseline", gap: 4, marginBottom: 8 }}>
              <span style={{ fontFamily: "'Playfair Display', serif", fontSize: 40, fontWeight: 700, color: "#0d1829", letterSpacing: "-0.02em" }}>£6.99</span>
              <span style={{ fontSize: 15, color: "#9ca3af", fontWeight: 400 }}>&nbsp;/ month</span>
            </div>
            <p style={{ fontSize: 14, color: "#6b7280", marginBottom: 28, lineHeight: 1.5 }}>
              For families with more than one child at school. One account, full visibility.
            </p>
            <div style={{ borderTop: "1px solid #f3f4f6", paddingTop: 24, marginBottom: 28 }}>
              {features.family.map(f => (
                <div key={f} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
                  <span style={{ color: "#7db78c", fontSize: 15, fontWeight: 700, flexShrink: 0 }}>✓</span>
                  <span style={{ fontSize: 15, color: "#374151" }}>{f}</span>
                </div>
              ))}
            </div>
            <Link
              href="/#signup"
              className="btn-plan"
              style={{ display: "block", textAlign: "center", background: "#7db78c", color: "#ffffff", padding: "13px 22px", borderRadius: 10, fontWeight: 600, fontSize: 15, textDecoration: "none" }}
            >
              Start Free Trial
            </Link>
          </motion.div>
        </div>

        {/* Free trial note */}
        <p style={{ textAlign: "center", color: "#9ca3af", fontSize: 14, marginTop: 32 }}>
          14-day free trial. No credit card required.
        </p>
      </section>

      {/* FAQ */}
      <section style={{ padding: "80px 24px 100px" }}>
        <div style={{ maxWidth: 640, margin: "0 auto" }}>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            style={{ textAlign: "center", marginBottom: 48 }}
          >
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 30, fontWeight: 700, margin: "0 0 12px", color: "#0d1829" }}>Questions?</h2>
            <p style={{ fontSize: 16, color: "#6b7280", margin: 0, lineHeight: 1.6 }}>
              If you have any questions about Scholairo or how it works with your child&apos;s school, feel free to get in touch.
            </p>
          </motion.div>

          <div style={{ display: "flex", flexDirection: "column", gap: 2, marginBottom: 40 }}>
            {faqs.map((faq, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, ease: "easeOut", delay: i * 0.07 }}
              >
                <button
                  className="faq-row"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  style={{ width: "100%", textAlign: "left", background: "transparent", border: "none", borderBottom: "1px solid #f3f4f6", padding: "18px 4px", cursor: "pointer", display: "flex", justifyContent: "space-between", alignItems: "center", gap: 16, borderRadius: 4 }}
                >
                  <span style={{ fontSize: 15, fontWeight: 600, color: "#111827" }}>{faq.q}</span>
                  <svg
                    width="16" height="16" viewBox="0 0 16 16" fill="none"
                    style={{ flexShrink: 0, transition: "transform 0.2s ease", transform: openFaq === i ? "rotate(180deg)" : "rotate(0deg)" }}
                  >
                    <path d="M3 6l5 5 5-5" stroke="#9ca3af" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
                {openFaq === i && (
                  <div style={{ padding: "12px 4px 20px", borderBottom: "1px solid #f3f4f6" }}>
                    <p style={{ fontSize: 14, color: "#6b7280", lineHeight: 1.7, margin: 0 }}>{faq.a}</p>
                  </div>
                )}
              </motion.div>
            ))}
          </div>

          <div style={{ textAlign: "center" }}>
            <a
              href="mailto:hello@scholairo.com"
              className="btn-contact"
              style={{ display: "inline-block", background: "#ffffff", color: "#374151", padding: "12px 28px", borderRadius: 10, fontSize: 15, fontWeight: 600, textDecoration: "none", border: "1px solid #e5e7eb", boxShadow: "0 2px 8px rgba(0,0,0,0.04)" }}
            >
              Contact Us
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ background: "#0d1829" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "48px 24px", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 16 }}>
          <div>
            <span style={{ fontFamily: "'Playfair Display', serif", fontSize: 22, fontWeight: 700, color: "#ffffff" }}>Schol<span style={{ color: "#96C8A2" }}>AI</span>ro</span>
            <p style={{ fontSize: 13, color: "rgba(255,255,255,0.35)", margin: "6px 0 0", fontStyle: "italic" }}>Every week, every child.</p>
          </div>
          <p style={{ fontSize: 13, color: "rgba(255,255,255,0.3)", margin: 0 }}>© {new Date().getFullYear()} Scholairo. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
