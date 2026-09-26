import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteFooter, SiteHeader } from "@/components/site-chrome";

export const Route = createFileRoute("/about")({
  head: () => ({ meta: [
    { title: "About — Argue Back" },
    { name: "description", content: "Why Argue Back was built: contestability should be a real part of the AI chat interface, not only a research concept." },
    { property: "og:title", content: "About — Argue Back" },
    { property: "og:description", content: "Meet the thinking behind Argue Back and its BitNBuild '26 team." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ] }), component: About,
});
function About() {
  return <div className="min-h-screen bg-background"><SiteHeader /><main>
    <section className="mx-auto max-w-6xl px-5 pb-20 pt-20 sm:px-8 sm:pt-28"><p className="font-sans text-sm text-muted-foreground">Why we built it</p><h1 className="mt-5 max-w-4xl font-display text-6xl leading-[.95] sm:text-8xl">The missing button is <em>disagree.</em></h1><div className="mt-12 grid gap-8 border-t border-hairline pt-8 md:grid-cols-[.7fr_1.3fr]"><span className="font-sans text-sm text-muted-foreground">The idea</span><div className="max-w-2xl space-y-6 font-sans text-lg leading-relaxed"><p>AI chat gives you a long, hedge-y paragraph, and the interface treats it as the end of the exchange. If a claim feels padded or uncertain, your only option is to write another prompt and hope it understands what bothered you.</p><p>We built Argue Back around contestability: the ability to challenge a system’s output. That should be an actual interface feature, not just a research concept. One visible button makes the next question more specific.</p></div></div></section>
    <section className="border-t border-hairline bg-muted py-20 sm:py-24"><div className="mx-auto max-w-6xl px-5 sm:px-8"><div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end"><h2 className="font-display text-5xl sm:text-6xl">The team</h2><p className="font-sans text-sm text-muted-foreground">BitNBuild '26 · UAE Regional Qualifying Round</p></div><div className="mt-10 grid gap-4 sm:grid-cols-2">{["Frontend & Design", "AI / Backend"].map((role) => <article key={role} className="border border-hairline bg-background p-7 sm:p-9"><h3 className="font-display text-4xl">[Name]</h3><p className="mt-3 font-sans text-sm text-muted-foreground">[Role] · {role}</p><p className="mt-8 max-w-sm font-sans text-sm leading-relaxed">Working together to make questioning an AI answer feel as natural as asking one.</p></article>)}</div><p className="mt-10 font-sans text-sm text-muted-foreground">GDG CRCE × GDGoC BPDC</p></div></section>
    <section className="bg-forest py-16 text-paper"><div className="mx-auto max-w-6xl px-5 sm:px-8"><h2 className="font-display text-4xl">The question is only the beginning.</h2><Link to="/how-it-works" className="mt-6 inline-block border-b border-lime pb-1 font-sans text-lime">How it works</Link></div></section>
  </main><SiteFooter /></div>;
}
