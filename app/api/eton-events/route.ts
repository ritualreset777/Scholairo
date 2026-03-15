import { NextResponse } from "next/server";

const MONTHS = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

function formatDate(d: Date) {
  return `${d.getDate()} ${MONTHS[d.getMonth()]} ${d.getFullYear()}`;
}

function weekBounds() {
  const today = new Date();
  const end = new Date(today);
  end.setDate(today.getDate() + 7);
  return { from: formatDate(today), to: formatDate(end) };
}

export type CalEvent = {
  EventID: string;
  DateID: string;
  StartDate: string;
  EndDate: string;
  StartTime: string;
  EndTime: string;
  Venue: string;
  Category: string;
  Title: string;
  TeamName: string;
  SportName: string;
};

export async function GET() {
  const { from, to } = weekBounds();
  const url = `https://calendar.etoncollege.com/CalendarEventHandler.ashx?V=2&ID=65&FD=${encodeURIComponent(from)}&TD=${encodeURIComponent(to)}`;

  try {
    const res = await fetch(url, {
      headers: {
        Referer: "https://calendar.etoncollege.com/week.aspx?ID=65",
        Accept: "application/json, text/javascript, */*; q=0.01",
        "X-Requested-With": "XMLHttpRequest",
        "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36",
      },
      next: { revalidate: 0 },
    });

    if (!res.ok) throw new Error(`HTTP ${res.status}`);

    const data: CalEvent[] = await res.json();

    const todayStr = formatDate(new Date());

    // Only events from today onwards, deduplicated
    const seen = new Set<string>();
    const events = data.filter(e => {
      if (e.StartDate !== todayStr && new Date(e.StartDate) < new Date(todayStr)) return false;
      const key = `${e.StartDate}|${e.StartTime}|${e.Title}`;
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });

    return NextResponse.json({ events, from, to });
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
