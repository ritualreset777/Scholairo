import { NextResponse } from "next/server";
import * as cheerio from "cheerio";

export const revalidate = 1800; // re-fetch every 30 minutes

export async function GET() {
  try {
    const res = await fetch("https://www.etoncollege.com/news/", {
      headers: {
        "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        Accept: "text/html,application/xhtml+xml",
        "Accept-Language": "en-GB,en;q=0.9",
      },
      next: { revalidate: 1800 },
    });

    if (!res.ok) throw new Error(`HTTP ${res.status}`);

    const html = await res.text();
    const $ = cheerio.load(html);

    const articles: {
      title: string;
      date: string;
      category: string;
      image: string | null;
      url: string;
    }[] = [];

    // Each article is a .news-item inside an <a> wrapper
    $(".news-item").each((_, el) => {
      const $el = $(el);

      const title = $el.find("h3.title--sm, h3.title").first().text().trim();
      if (!title) return;

      // URL: the wrapping <a> or closest anchor
      const $anchor = $el.closest("a");
      let url = $anchor.attr("href") || $el.find("a").first().attr("href") || "";
      if (url && !url.startsWith("http")) url = "https://www.etoncollege.com" + url;

      // Date and category are the two <p> tags inside .post-meta
      const $meta = $el.find(".post-meta");
      const metaPs = $meta.find("p").map((_, p) => $(p).text().trim()).get();
      const date = metaPs[0] || "";
      const category = metaPs[1] || $el.find(".corner-category__inner").text().trim() || "News";

      // Image — prefer data-lazy-src (lazy loaded), fallback to src
      const $img = $el.find("img").first();
      const image = $img.attr("data-lazy-src") || $img.attr("src") || null;

      articles.push({ title, date, category, image: image || null, url });
    });

    return NextResponse.json({ articles: articles.slice(0, 12), fetchedAt: new Date().toISOString() });
  } catch (err) {
    console.error("Eton news fetch error:", err);
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
