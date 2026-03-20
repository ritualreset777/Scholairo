"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Root() {
  const router = useRouter();
  useEffect(() => {
    const stored = localStorage.getItem("scholairo_user");
    if (stored) {
      router.replace("/home");
    } else {
      router.replace("/login");
    }
  }, [router]);
  return null;
}
