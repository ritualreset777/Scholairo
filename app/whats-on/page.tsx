"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";

type EtonEvent = { EventID: string; StartDate: string; EndDate: string; StartTime: string; EndTime: string; Venue: string; Category: string; Title: string; SportName: string; TeamName?: string };

const ALLOWED_KEYWORDS = ["music", "sport", "drama", "play", "competition", "concert", "society", "societies", "fixture", "match"];
function isAllowed(category: string) {
  return ALLOWED_KEYWORDS.some(k => category.toLowerCase().includes(k));
}

type CatStyle = { accent: string; pillBg: string; pillColor: string };
function calCatStyle(category: string): CatStyle {
  const lower = category.toLowerCase();
  if (lower.includes("sport") || lower.includes("fixture") || lower.includes("match") || lower.includes("rugby") || lower.includes("cricket") || lower.includes("football") || lower.includes("rowing") || lower.includes("athletics") || lower.includes("competition"))
    return { accent: "#3563e9", pillBg: "#e8f0ff", pillColor: "#3563e9" };
  if (lower.includes("music") || lower.includes("concert") || lower.includes("choir") || lower.includes("ensemble"))
    return { accent: "#c07a00", pillBg: "#fff3d6", pillColor: "#c07a00" };
  if (lower.includes("drama") || lower.includes("play") || lower.includes("theatre"))
    return { accent: "#d83c6b", pillBg: "#ffe4ea", pillColor: "#d83c6b" };
  if (lower.includes("societ") || lower.includes("club"))
    return { accent: "#2f8f5b", pillBg: "#e7f6ee", pillColor: "#2f8f5b" };
  return { accent: "#2f6b47", pillBg: "#e8f3ec", pillColor: "#2f6b47" };
}

const BLOCKS = [
  { label: "F Block", year: "Year 9",  age: ["U14", "U13"] },
  { label: "E Block", year: "Year 10", age: ["U15"] },
  { label: "D Block", year: "Year 11", age: ["U16"] },
  { label: "C Block", year: "Year 12", age: ["U17"] },
  { label: "B Block", year: "Year 13", age: ["U18", "1st", "2nd"] },
];

function matchesBlock(ev: EtonEvent, block: typeof BLOCKS[0]) {
  const lower = ev.Category.toLowerCase();
  const isSport = lower.includes("sport") || lower.includes("fixture") || lower.includes("match");
  if (!isSport) return true;
  const upper = ev.Title.toUpperCase();
  return block.age.some(ag => upper.includes(ag));
}

const HOUSES = [
  { short: "JDM",  full: "Angelo's" },
  { short: "SPH",  full: "Baldwin's Bec" },
  { short: "Coll", full: "College" },
  { short: "IRS",  full: "Common Lane House" },
  { short: "PAH",  full: "Cotton Hall House" },
  { short: "HJRM", full: "Durnford House" },
  { short: "CDNP", full: "Evans's" },
  { short: "JD",   full: "Farrer House" },
  { short: "HWTA", full: "Godolphin House" },
  { short: "IRG",  full: "Hawtrey House" },
  { short: "DWBA", full: "Holland House" },
  { short: "ABH",  full: "Jourdelay's" },
  { short: "EJNR", full: "Keate House" },
  { short: "PEPW", full: "Manor House" },
  { short: "AMM",  full: "Mustians" },
  { short: "DMT",  full: "Penn House" },
  { short: "RCH",  full: "South Lawn" },
  { short: "AGDF", full: "The Hopgarden" },
  { short: "WING", full: "The Timbralls" },
  { short: "JNO",  full: "Villiers House" },
  { short: "JCAJ", full: "Walpole House" },
  { short: "ECY",  full: "Warre House" },
  { short: "JMOB", full: "Waynflete" },
  { short: "PRKB", full: "Westbury" },
  { short: "NA",   full: "Wotton House" },
];

function matchesHouse(ev: EtonEvent, house: typeof HOUSES[0]) {
  const haystack = `${ev.Title} ${ev.TeamName ?? ""}`.toLowerCase();
  if (haystack.includes(house.full.toLowerCase())) return true;
  const shortRegex = new RegExp(`(?<![a-z])${house.short.toLowerCase()}(?![a-z])`);
  return shortRegex.test(haystack);
}

export default function WhatsOn() {
  const [events, setEvents] = useState<EtonEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [eventWeek, setEventWeek] = useState("");
  const [selectedBlock, setSelectedBlock] = useState<typeof BLOCKS[0] | null>(null);
  const [selectedHouse, setSelectedHouse] = useState<typeof HOUSES[0] | null>(null);
  const [showFilters, setShowFilters] = useState(false);
  const filterRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetch("/api/eton-events")
      .then(r => r.json())
      .then(data => {
        setEvents((data.events || []).filter((e: EtonEvent) => isAllowed(e.Category)));
        setEventWeek(`${data.from} – ${data.to}`);
        setLoading(false);
      })
      .catch(() => { setError(true); setLoading(false); });
  }, []);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (filterRef.current && !filterRef.current.contains(e.target as Node)) {
        setShowFilters(false);
      }
    }
    if (showFilters) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showFilters]);

  return (
    <div style={{ background: "#f6f9fc", minHeight: "100vh", fontFamily: "'Inter', system-ui, sans-serif" }}>
      <style>{`
        .btn-ghost { transition: background 0.15s ease, color 0.15s ease; }
        .btn-ghost:hover { background: #f3f4f6 !important; color: #111827 !important; }
        .btn-apply { transition: background 0.15s ease, transform 0.15s ease; }
        .btn-apply:hover { background: #374151 !important; transform: translateY(-1px); }
        @keyframes fadeUp { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes filterDrop { from { opacity: 0; transform: translateY(-5px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>

      {/* Nav */}
      <nav style={{ background: "rgba(255,255,255,0.85)", backdropFilter: "blur(10px)", WebkitBackdropFilter: "blur(10px)", borderBottom: "1px solid #e5e7eb", position: "sticky", top: 0, zIndex: 50 }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px", height: 68, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <Link href="/" style={{ fontFamily: "'Playfair Display', serif", fontSize: 22, fontWeight: 700, color: "#0d1829", letterSpacing: "-0.3px", textDecoration: "none" }}>
            Schol<span style={{ color: "#96C8A2" }}>AI</span>ro
          </Link>
          <Link
            href="/#signup"
            style={{ background: "#111827", color: "#ffffff", padding: "10px 22px", borderRadius: 8, fontSize: 14, fontWeight: 600, textDecoration: "none", boxShadow: "0 4px 12px rgba(0,0,0,0.08)" }}
          >
            Get Started
          </Link>
        </div>
      </nav>

      {/* Page content */}
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "60px 24px 80px" }}>

        {/* Header */}
        <div style={{ marginBottom: 40 }}>
          <p style={{ fontSize: 13, fontWeight: 600, color: "#9bc8a6", textTransform: "uppercase", letterSpacing: "2px", margin: "0 0 10px" }}>
            What&apos;s happening at school
          </p>
          <h1 style={{ fontSize: "clamp(28px, 3.5vw, 40px)", fontWeight: 700, color: "#1f2937", margin: "0 0 6px", letterSpacing: "-0.5px", lineHeight: 1.1 }}>
            This week
          </h1>
          {eventWeek && <p style={{ fontSize: 16, color: "#6b7280", margin: 0 }}>{eventWeek}</p>}
        </div>

        {/* Filter bar */}
        <div ref={filterRef} style={{ position: "relative", marginBottom: 40 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
            <button
              onClick={() => setShowFilters(v => !v)}
              className="btn-ghost"
              style={{ display: "flex", alignItems: "center", gap: 6, background: showFilters ? "#f3f4f6" : "#ffffff", border: `1px solid ${(selectedBlock || selectedHouse) ? "#9bc8a6" : "#e5e7eb"}`, borderRadius: 10, padding: "8px 14px", fontSize: 14, fontWeight: 500, color: "#374151", cursor: "pointer" }}
            >
              <svg width="15" height="15" viewBox="0 0 15 15" fill="none" style={{ flexShrink: 0 }}>
                <path d="M1 3.5h13M3 7.5h9M5.5 11.5h4" stroke="#6b7280" strokeWidth="1.4" strokeLinecap="round"/>
              </svg>
              Filters
              {(selectedBlock || selectedHouse) && (
                <span style={{ background: "#9bc8a6", color: "#1a3d2a", fontSize: 11, fontWeight: 700, borderRadius: 999, padding: "1px 6px", marginLeft: 2 }}>
                  {[selectedBlock, selectedHouse].filter(Boolean).length}
                </span>
              )}
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none" style={{ marginLeft: 2, transition: "transform 0.2s", transform: showFilters ? "rotate(180deg)" : "rotate(0deg)" }}>
                <path d="M2 3.5l3 3 3-3" stroke="#9ca3af" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>

            {selectedBlock && (
              <span style={{ display: "flex", alignItems: "center", gap: 5, background: "#e8f3ec", color: "#2f6b47", border: "1px solid #9bc8a6", borderRadius: 999, padding: "6px 12px", fontSize: 13, fontWeight: 600 }}>
                {selectedBlock.label}
                <button onClick={() => setSelectedBlock(null)} style={{ background: "none", border: "none", cursor: "pointer", color: "#2f6b47", padding: 0, lineHeight: 1, fontSize: 14 }}>×</button>
              </span>
            )}
            {selectedHouse && (
              <span style={{ display: "flex", alignItems: "center", gap: 5, background: "#e8f0ff", color: "#3563e9", border: "1px solid #93afe8", borderRadius: 999, padding: "6px 12px", fontSize: 13, fontWeight: 600 }}>
                {selectedHouse.short} ({selectedHouse.full})
                <button onClick={() => setSelectedHouse(null)} style={{ background: "none", border: "none", cursor: "pointer", color: "#3563e9", padding: 0, lineHeight: 1, fontSize: 14 }}>×</button>
              </span>
            )}
          </div>

          {showFilters && (
            <div style={{ position: "absolute", top: "calc(100% + 8px)", left: 0, zIndex: 100, background: "#ffffff", border: "1px solid #e5e7eb", borderRadius: 14, boxShadow: "0 12px 32px rgba(0,0,0,0.12)", padding: "20px 24px", width: 480, maxWidth: "calc(100vw - 48px)", animation: "filterDrop 0.18s ease both" }}>
              <p style={{ fontSize: 13, fontWeight: 700, color: "#111827", margin: "0 0 16px", textTransform: "uppercase", letterSpacing: "1px" }}>Filters</p>

              <p style={{ fontSize: 12, fontWeight: 600, color: "#9ca3af", textTransform: "uppercase", letterSpacing: "1px", margin: "0 0 10px" }}>Block</p>
              <div style={{ display: "flex", flexDirection: "column", gap: 6, marginBottom: 20 }}>
                {BLOCKS.map(b => (
                  <label key={b.label} style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer", padding: "6px 8px", borderRadius: 8, background: selectedBlock?.label === b.label ? "#f0faf4" : "transparent", transition: "background 0.12s" }}>
                    <input type="radio" name="block" checked={selectedBlock?.label === b.label} onChange={() => setSelectedBlock(selectedBlock?.label === b.label ? null : b)} style={{ accentColor: "#2f6b47", width: 15, height: 15, cursor: "pointer" }} />
                    <span style={{ fontSize: 14, fontWeight: 500, color: "#111827" }}>{b.label}</span>
                    <span style={{ fontSize: 13, color: "#9ca3af" }}>({b.year})</span>
                  </label>
                ))}
              </div>

              <p style={{ fontSize: 12, fontWeight: 600, color: "#9ca3af", textTransform: "uppercase", letterSpacing: "1px", margin: "0 0 10px" }}>House</p>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4px 16px", marginBottom: 20, maxHeight: 260, overflowY: "auto" }}>
                {HOUSES.map(h => (
                  <label key={h.short} style={{ display: "flex", alignItems: "center", gap: 8, cursor: "pointer", padding: "6px 8px", borderRadius: 8, background: selectedHouse?.short === h.short ? "#eff4ff" : "transparent", transition: "background 0.12s" }}>
                    <input type="radio" name="house" checked={selectedHouse?.short === h.short} onChange={() => setSelectedHouse(selectedHouse?.short === h.short ? null : h)} style={{ accentColor: "#3563e9", width: 15, height: 15, cursor: "pointer", flexShrink: 0 }} />
                    <span style={{ fontSize: 13 }}>
                      <span style={{ fontWeight: 600, color: "#111827" }}>{h.short}</span>
                      <span style={{ color: "#9ca3af" }}> ({h.full})</span>
                    </span>
                  </label>
                ))}
              </div>

              <div style={{ borderTop: "1px solid #f3f4f6", paddingTop: 14, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <button onClick={() => { setSelectedBlock(null); setSelectedHouse(null); }} className="btn-ghost" style={{ background: "none", border: "none", fontSize: 13, fontWeight: 500, color: "#6b7280", cursor: "pointer", padding: "4px 8px", borderRadius: 6 }}>
                  Clear all
                </button>
                <button onClick={() => setShowFilters(false)} className="btn-apply" style={{ background: "#111827", color: "#ffffff", border: "none", borderRadius: 8, padding: "8px 18px", fontSize: 13, fontWeight: 600, cursor: "pointer" }}>
                  Apply
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Integrate button */}
        <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 32 }}>
          <button
            style={{ display: "flex", alignItems: "center", gap: 8, background: "#ef4444", border: "none", borderRadius: 10, padding: "10px 18px", fontSize: 14, fontWeight: 600, color: "#ffffff", cursor: "pointer", boxShadow: "0 2px 8px rgba(239,68,68,0.25)", transition: "all 0.15s ease" }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = "translateY(-1px)"; (e.currentTarget as HTMLElement).style.background = "#dc2626"; (e.currentTarget as HTMLElement).style.boxShadow = "0 6px 16px rgba(239,68,68,0.35)"; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = "translateY(0)"; (e.currentTarget as HTMLElement).style.background = "#ef4444"; (e.currentTarget as HTMLElement).style.boxShadow = "0 2px 8px rgba(239,68,68,0.25)"; }}
          >
            <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
              <rect x="1" y="2" width="13" height="12" rx="2" stroke="white" strokeWidth="1.3"/>
              <path d="M1 6h13" stroke="white" strokeWidth="1.3"/>
              <path d="M5 1v2M10 1v2" stroke="white" strokeWidth="1.3" strokeLinecap="round"/>
            </svg>
            Integrate with Calendar App
          </button>
        </div>

        {/* Events */}
        {loading && <div style={{ textAlign: "center", padding: "60px 0", color: "#9ca3af", fontSize: 14 }}>Loading calendar…</div>}
        {error && <div style={{ textAlign: "center", padding: "60px 0", color: "#9ca3af", fontSize: 14 }}>Could not load calendar. Please try again later.</div>}

        {!loading && !error && (() => {
          const filtered = events
            .filter(e => !selectedBlock || matchesBlock(e, selectedBlock))
            .filter(e => !selectedHouse || matchesHouse(e, selectedHouse));
          const byDate: Record<string, EtonEvent[]> = {};
          filtered.forEach(e => {
            if (!byDate[e.StartDate]) byDate[e.StartDate] = [];
            byDate[e.StartDate].push(e);
          });

          if (Object.keys(byDate).length === 0) return (
            <p style={{ color: "#9ca3af", fontSize: 14, textAlign: "center", padding: "40px 0" }}>No events found for this week.</p>
          );

          return (
            <div style={{ display: "flex", flexDirection: "column", gap: 48 }}>
              {Object.entries(byDate).map(([date, evs]) => {
                const d = new Date(date);
                const dayName = d.toLocaleDateString("en-GB", { weekday: "long" });
                const dayNum  = d.getDate();
                const month   = d.toLocaleDateString("en-GB", { month: "long" });
                return (
                  <div key={date}>
                    <div style={{ marginBottom: 20, paddingBottom: 16, borderBottom: "1px solid #e5e7eb" }}>
                      <span style={{ fontSize: 22, fontWeight: 600, color: "#1f2937" }}>{dayNum} {month}</span>
                      <span style={{ fontSize: 15, fontWeight: 400, color: "#9ca3af", marginLeft: 10 }}>{dayName}</span>
                    </div>
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: 16 }}>
                      {evs.map((ev, i) => {
                        const cs = calCatStyle(ev.Category);
                        const cancelled = ev.Title.toLowerCase().includes("cancel");
                        return (
                          <div
                            key={ev.EventID}
                            style={{ background: "#ffffff", borderRadius: 16, padding: "20px 22px", border: "1px solid #e5e7eb", borderTop: `3px solid ${cs.accent}`, opacity: cancelled ? 0.5 : 1, display: "flex", flexDirection: "column", gap: 8, boxShadow: "0 2px 8px rgba(0,0,0,0.04)", transition: "transform 0.2s ease, box-shadow 0.2s ease", cursor: "default", animation: "fadeUp 0.3s ease both", animationDelay: `${i * 40}ms` }}
                            onMouseEnter={e => { if (cancelled) return; (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)"; (e.currentTarget as HTMLElement).style.boxShadow = "0 10px 24px rgba(0,0,0,0.08)"; }}
                            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = "translateY(0)"; (e.currentTarget as HTMLElement).style.boxShadow = "0 2px 8px rgba(0,0,0,0.04)"; }}
                          >
                            <div style={{ fontSize: 18, fontWeight: 700, color: "#111827", lineHeight: 1 }}>
                              {ev.StartTime === "All Day" ? "All day" : ev.StartTime}
                              {ev.EndTime && ev.EndTime !== ev.StartTime && ev.StartTime !== "All Day" && (
                                <span style={{ fontSize: 13, fontWeight: 400, color: "#9ca3af", marginLeft: 8 }}>→ {ev.EndTime}</span>
                              )}
                            </div>
                            <div style={{ fontSize: 16, fontWeight: 600, color: "#111827", lineHeight: 1.4, marginTop: 4, textDecoration: cancelled ? "line-through" : "none" }}>{ev.Title.replace(/^Cancelled\s*/i, "")}</div>
                            <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap", marginTop: 2 }}>
                              <span style={{ background: cs.pillBg, color: cs.pillColor, fontSize: 12, fontWeight: 600, padding: "4px 10px", borderRadius: 999 }}>
                                {ev.Category.split(",")[0].trim()}
                              </span>
                              {ev.SportName && <span style={{ fontSize: 13, color: "#6b7280", fontWeight: 500 }}>{ev.SportName}</span>}
                              {cancelled && <span style={{ fontSize: 12, fontWeight: 600, color: "#d83c6b", background: "#ffe4ea", padding: "3px 8px", borderRadius: 999 }}>Cancelled</span>}
                            </div>
                            {ev.Venue && (
                              <div style={{ fontSize: 13, color: "#9ca3af", display: "flex", alignItems: "center", gap: 5 }}>
                                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                                  <path d="M6 1a3.5 3.5 0 0 1 3.5 3.5C9.5 7.5 6 11 6 11S2.5 7.5 2.5 4.5A3.5 3.5 0 0 1 6 1Z" stroke="currentColor" strokeWidth="1.2"/>
                                  <circle cx="6" cy="4.5" r="1" fill="currentColor"/>
                                </svg>
                                {{ H: "Home", A: "Away", N: "Neutral" }[ev.Venue] ?? ev.Venue}
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          );
        })()}
      </div>
    </div>
  );
}
