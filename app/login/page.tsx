"use client";

import { useState } from "react";
import Link from "next/link";

export default function LoginPage() {
  const [tab, setTab] = useState<"login" | "signup">("login");
  const [submitted, setSubmitted] = useState(false);

  return (
    <div style={{ minHeight: "100vh", background: "#f6f9fc", display: "flex", flexDirection: "column", fontFamily: "var(--font-dm-sans), 'DM Sans', sans-serif" }}>
      <style>{`
        input:focus { outline: none; border-color: #96C8A2 !important; box-shadow: 0 0 0 3px rgba(150,200,162,0.2); }
        .tab-btn { transition: color 0.15s, border-color 0.15s; }
        .auth-input { width: 100%; padding: 11px 14px; border: 1.5px solid #e5e7eb; border-radius: 9px; font-size: 15px; font-family: inherit; background: #fff; color: #0d1829; transition: border-color 0.15s; }
        .submit-btn { width: 100%; padding: 13px; background: #111827; color: #fff; border: none; border-radius: 10px; font-size: 15px; font-weight: 600; cursor: pointer; font-family: inherit; transition: background 0.15s, transform 0.15s; }
        .submit-btn:hover { background: #1f2937; transform: translateY(-1px); }
        .guest-btn { width: 100%; padding: 13px; background: transparent; color: #4a6280; border: 1.5px solid #e5e7eb; border-radius: 10px; font-size: 15px; font-weight: 500; cursor: pointer; font-family: inherit; transition: background 0.15s, border-color 0.15s; }
        .guest-btn:hover { background: #fff; border-color: #b8d4ec; }
      `}</style>

      {/* Nav */}
      <nav style={{ background: "rgba(255,255,255,0.85)", backdropFilter: "blur(10px)", borderBottom: "1px solid #e5e7eb", padding: "0 24px", height: 64, display: "flex", alignItems: "center" }}>
        <Link href="/" style={{ fontFamily: "var(--font-playfair), 'Playfair Display', serif", fontSize: 21, fontWeight: 700, color: "#0d1829", textDecoration: "none", letterSpacing: "-0.3px" }}>
          Schol<span style={{ color: "#96C8A2" }}>AI</span>ro
        </Link>
      </nav>

      {/* Card */}
      <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: "40px 24px" }}>
        <div style={{ width: "100%", maxWidth: 420 }}>

          {submitted ? (
            <div style={{ background: "#fff", borderRadius: 20, padding: "48px 40px", boxShadow: "0 8px 32px rgba(0,0,0,0.08)", border: "1px solid #e5e7eb", textAlign: "center" }}>
              <div style={{ fontSize: 48, marginBottom: 20 }}>✉️</div>
              <h2 style={{ fontFamily: "var(--font-playfair), 'Playfair Display', serif", fontSize: 24, fontWeight: 700, color: "#0d1829", margin: "0 0 12px" }}>Check your inbox</h2>
              <p style={{ color: "#6b7280", fontSize: 15, lineHeight: 1.6, margin: "0 0 28px" }}>We&apos;ve sent you a link to get started. Your first overview arrives this Sunday.</p>
              <Link href="/" style={{ display: "inline-block", background: "#111827", color: "#fff", padding: "12px 28px", borderRadius: 10, fontWeight: 600, fontSize: 15, textDecoration: "none" }}>Back to home</Link>
            </div>
          ) : (
            <div style={{ background: "#fff", borderRadius: 20, padding: "40px 40px", boxShadow: "0 8px 32px rgba(0,0,0,0.08)", border: "1px solid #e5e7eb" }}>

              {/* Logo */}
              <div style={{ textAlign: "center", marginBottom: 28 }}>
                <span style={{ fontFamily: "var(--font-playfair), 'Playfair Display', serif", fontSize: 26, fontWeight: 700, color: "#0d1829" }}>
                  Schol<span style={{ color: "#96C8A2" }}>AI</span>ro
                </span>
                <p style={{ fontSize: 14, color: "#9ca3af", margin: "6px 0 0" }}>Weekly overviews for Eton parents</p>
              </div>

              {/* Tabs */}
              <div style={{ display: "flex", borderBottom: "2px solid #f3f4f6", marginBottom: 28 }}>
                {(["login", "signup"] as const).map(t => (
                  <button
                    key={t}
                    className="tab-btn"
                    onClick={() => setTab(t)}
                    style={{ flex: 1, padding: "10px 0", background: "none", border: "none", borderBottom: `2px solid ${tab === t ? "#96C8A2" : "transparent"}`, marginBottom: -2, fontSize: 15, fontWeight: 600, color: tab === t ? "#0d1829" : "#9ca3af", cursor: "pointer", fontFamily: "inherit", textTransform: "capitalize" }}
                  >
                    {t === "login" ? "Log In" : "Sign Up"}
                  </button>
                ))}
              </div>

              {/* Login form */}
              {tab === "login" && (
                <form onSubmit={e => { e.preventDefault(); setSubmitted(true); }} style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                  <div>
                    <label style={{ fontSize: 13, fontWeight: 600, color: "#374151", display: "block", marginBottom: 6 }}>Email address</label>
                    <input className="auth-input" type="email" placeholder="you@example.com" required />
                  </div>
                  <div>
                    <label style={{ fontSize: 13, fontWeight: 600, color: "#374151", display: "block", marginBottom: 6 }}>Password</label>
                    <input className="auth-input" type="password" placeholder="••••••••" required />
                  </div>
                  <div style={{ textAlign: "right", marginTop: -4 }}>
                    <a href="#" style={{ fontSize: 13, color: "#4a8abf", textDecoration: "none", fontWeight: 500 }}>Forgot password?</a>
                  </div>
                  <button className="submit-btn" type="submit" style={{ marginTop: 4 }}>Log In</button>
                </form>
              )}

              {/* Sign up form */}
              {tab === "signup" && (
                <form onSubmit={e => { e.preventDefault(); setSubmitted(true); }} style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                    <div>
                      <label style={{ fontSize: 13, fontWeight: 600, color: "#374151", display: "block", marginBottom: 6 }}>Your name</label>
                      <input className="auth-input" type="text" placeholder="Sarah Mitchell" required />
                    </div>
                    <div>
                      <label style={{ fontSize: 13, fontWeight: 600, color: "#374151", display: "block", marginBottom: 6 }}>Child&apos;s name</label>
                      <input className="auth-input" type="text" placeholder="Ollie" required />
                    </div>
                  </div>
                  <div>
                    <label style={{ fontSize: 13, fontWeight: 600, color: "#374151", display: "block", marginBottom: 6 }}>Year group</label>
                    <select className="auth-input" required style={{ appearance: "none" }}>
                      <option value="">Select year group</option>
                      <option>F Block (Year 9)</option>
                      <option>E Block (Year 10)</option>
                      <option>D Block (Year 11)</option>
                      <option>C Block (Year 12)</option>
                      <option>B Block (Year 13)</option>
                    </select>
                  </div>
                  <div>
                    <label style={{ fontSize: 13, fontWeight: 600, color: "#374151", display: "block", marginBottom: 6 }}>Email address</label>
                    <input className="auth-input" type="email" placeholder="you@example.com" required />
                  </div>
                  <div>
                    <label style={{ fontSize: 13, fontWeight: 600, color: "#374151", display: "block", marginBottom: 6 }}>Password</label>
                    <input className="auth-input" type="password" placeholder="••••••••" required />
                  </div>
                  <button className="submit-btn" type="submit" style={{ marginTop: 4 }}>Create Account</button>
                </form>
              )}

              {/* Divider */}
              <div style={{ display: "flex", alignItems: "center", gap: 12, margin: "20px 0" }}>
                <div style={{ flex: 1, height: 1, background: "#f3f4f6" }} />
                <span style={{ fontSize: 13, color: "#9ca3af", fontWeight: 500 }}>or</span>
                <div style={{ flex: 1, height: 1, background: "#f3f4f6" }} />
              </div>

              {/* Guest */}
              <Link href="/whats-on" style={{ textDecoration: "none" }}>
                <button className="guest-btn">
                  Browse as guest
                  <span style={{ fontSize: 12, color: "#9ca3af", marginLeft: 6 }}>— view the Eton calendar</span>
                </button>
              </Link>

            </div>
          )}
        </div>
      </div>
    </div>
  );
}
