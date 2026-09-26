import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteFooter, SiteHeader } from "@/components/site-chrome";

export const Route = createFileRoute("/how-it-works")({
  head: () => ({ meta: [
    { title: "How It Works — Argue Back" },
    { name: "description", content: "How Argue Back injects a challenge button, sends a structured challenge to the model, and renders a restructured answer in the same chat." },
    { property: "og:title", content: "How It Works — Argue Back" },
    { property: "og:description", content: "From button injection to a restructured answer: the mechanism behind Argue Back." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ] }), component: HowItWorks,
});

const steps = [
  { title: "Button injected", body: "The extension places an Argue Back button beside an AI response on a supported chat site. The answer stays right where you read it." },
  { title: "Challenge sent", body: "Choosing a mode sends the original answer back to the model with a specific instruction. For The Decay: identify the filler versus the core claim, then strip the filler." },
  { title: "Answer rendered", body: "The model returns a restructured answer. It appears in the same interface, so the challenge and the answer stay in context." },
];
function HowItWorks() {
  return <div className="min-h-screen bg-background"><SiteHeader /><main>
    <section className="mx-auto max-w-6xl px-5 pb-16 pt-20 sm:px-8 sm:pb-24 sm:pt-28"><p className="font-sans text-sm text-muted-foreground">Inside the idea</p><h1 className="mt-5 max-w-4xl font-display text-6xl leading-[.95] sm:text-8xl">A challenge, not a new prompt.</h1><p className="mt-8 max-w-2xl font-sans text-lg leading-relaxed text-muted-foreground">Argue Back is designed to sit inside the conversation you are already having. Each mode asks a precise question of the answer, then shows the result without making you start over.</p></section>
    <section className="border-y border-hairline bg-forest py-16 text-paper sm:py-20"><div className="mx-auto max-w-6xl px-5 sm:px-8"><h2 className="font-display text-4xl sm:text-5xl">From answer to challenge</h2><div className="mt-10 grid gap-0 border-y border-light-line md:grid-cols-4">{["Browser", "Button injected", "Challenge sent", "New answer rendered"].map((item, i) => <div key={item} className="flex min-h-24 items-center gap-4 border-b border-light-line py-5 last:border-b-0 md:min-h-36 md:border-b-0 md:border-r md:px-5 md:first:pl-0 md:last:border-r-0"><span className="font-display text-3xl text-lime">{i + 1}.</span><span className="font-sans text-sm sm:text-base">{item}</span></div>)}</div></div></section>
    <section className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-24"><div className="grid gap-12 md:grid-cols-[.7fr_1.3fr]"><h2 className="font-display text-4xl sm:text-5xl">The mechanism</h2><div>{steps.map((step) => <article key={step.title} className="border-t border-hairline py-6 first:pt-0"><h3 className="font-display text-3xl">{step.title}</h3><p className="mt-3 max-w-xl font-sans leading-relaxed text-muted-foreground">{step.body}</p></article>)}<p className="border-t border-hairline pt-6 font-sans text-sm leading-relaxed text-muted-foreground">The live homepage Decay demonstrates the interaction with a prepared answer. The extension and model round trip described here are the intended mechanism, not a claim that every mode is already available.</p></div></div></section>
    <section className="bg-night py-16 text-paper"><div className="mx-auto max-w-6xl px-5 sm:px-8"><h2 className="font-display text-4xl">See the answer change.</h2><Link to="/" className="mt-6 inline-block border-b border-lime pb-1 font-sans text-lime">Try The Decay</Link></div></section>
  </main><SiteFooter /></div>;
}
