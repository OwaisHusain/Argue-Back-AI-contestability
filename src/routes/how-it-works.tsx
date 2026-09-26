import { createFileRoute } from "@tanstack/react-router";
import { SiteFooter, SiteHeader } from "@/components/site-chrome";
import { HowChapter } from "@/components/site-chapters";

export const Route = createFileRoute("/how-it-works")({
  head: () => ({ meta: [
    { title: "How It Works — Argue Back" },
    { name: "description", content: "See all four Argue Back modes — The Decay, The Graveyard, The Rebuild, and The Guess — applied to one real question." },
    { property: "og:title", content: "How It Works — Argue Back" },
    { property: "og:description", content: "Four ways to challenge one AI answer, with a worked example for each." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ] }), component: HowItWorks,
});

function HowItWorks() {
  return (
    <div className="min-h-screen bg-night text-paper [--foreground:var(--paper)]">
      <div className="relative isolate">
        <div className="absolute inset-x-0 top-0 z-20"><SiteHeader overlay /></div>
        <main><HowChapter /></main>
      </div>
      <div className="[--foreground:#071d18]"><SiteFooter /></div>
    </div>
  );
}
