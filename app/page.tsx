"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Hero from "@/components/ui/animated-shader-hero";

export default function LandingPage() {
  const router = useRouter();

  useEffect(() => {
    const stored = localStorage.getItem("scholairo_user");
    if (stored) {
      router.replace("/home");
    }
  }, [router]);

  return (
    <Hero
      trustBadge={{
        text: "The weekly digest every Eton parent needs.",
        icons: ["✨"]
      }}
      headline={{
        line1: "Your son's Eton,",
        line2: "Made Clear."
      }}
      subtitle="ScholAIro curates Eton's news, events, and announcements into one beautiful weekly overview — so you're always in the know."
      buttons={{
        primary: {
          text: "Get Started",
          onClick: () => router.push("/login")
        },
        secondary: {
          text: "Browse Events",
          onClick: () => router.push("/whats-on")
        }
      }}
    />
  );
}
