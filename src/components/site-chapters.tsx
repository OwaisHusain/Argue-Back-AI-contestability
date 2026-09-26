import { Link } from "@tanstack/react-router";
import { Ghost, Highlighter, MousePointerClick, RefreshCw, Repeat2, Scissors, Swords } from "lucide-react";
import { SilkShader } from "@/components/silk-shader";
import { ModeExamples } from "@/components/mode-examples";
import RadialOrbitalTimeline, { type OrbitalItem } from "@/components/ui/radial-orbital-timeline";

const steps = [
  { title: "The button appears", body: "Argue Back sits beside the answer, right where you're already reading." },
  { title: "You choose a challenge", body: "Each mode asks a different question of the same response — no new prompt to write." },
  { title: "The answer changes", body: "A more useful version appears in the conversation, with the original thought still in context." },
];

const ORBIT: OrbitalItem[] = [
  { id: 1, title: "The Decay", label: "Cut the filler", content: "Removes hedges, flattery, and restated questions sentence by sentence until only the load-bearing claim is left.", href: "#example-decay", icon: Scissors, relatedIds: [3], intensity: 85 },
  { id: 2, title: "The Graveyard", label: "Show the alternatives", content: "Surfaces the answers the model could have given, and why each one lost to the answer you got.", href: "#example-graveyard", icon: Ghost, relatedIds: [4], intensity: 65 },
  { id: 3, title: "The Rebuild", label: "Say it differently", content: "Restates the same claim in new forms. A point that only survives in one wording is a fragile point.", href: "#example-rebuild", icon: Repeat2, relatedIds: [1], intensity: 45 },
  { id: 4, title: "The Guess", label: "Mark the assumptions", content: "Highlights where the answer quietly fills in details you never gave it, and what changes if they're wrong.", href: "#example-guess", icon: Highlighter, relatedIds: [2], intensity: 95 },
];

export function HowChapter() {
  return (
    <section className="relative isolate overflow-hidden text-paper">
      <SilkShader className="-z-10" />
      <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-night/30 via-night/70 to-night" aria-hidden="true" />
      <div className="relative z-10 mx-auto max-w-6xl px-5 pb-20 pt-36 sm:px-8 sm:pb-28 sm:pt-40">
        <div className="grid gap-8 md:grid-cols-[.85fr_1.15fr] md:gap-20">
          <div>
            <p className="font-sans text-sm text-lime">The next question</p>
            <h1 className="mt-5 font-display text-6xl leading-[.95] sm:text-8xl">How it <em className="text-lime">works.</em></h1>
          </div>
          <p className="max-w-xl self-end font-display text-2xl leading-snug sm:text-4xl">A challenge, not another prompt. Stay with the answer and ask more of it.</p>
        </div>
        <div className="mt-20 grid border-y border-light-line md:grid-cols-3">
          {steps.map((step, index) => (
            <article key={step.title} className="border-b border-light-line py-8 last:border-b-0 md:border-b-0 md:border-r md:px-8 md:first:pl-0 md:last:border-r-0">
              {(() => { const StepIcon = [MousePointerClick, Swords, RefreshCw][index] ?? RefreshCw; return <StepIcon className="size-9 text-lime/80" strokeWidth={1.5} aria-hidden="true" />; })()}
              <h2 className="mt-7 font-display text-3xl">{step.title}</h2>
              <p className="mt-3 max-w-xs font-sans text-sm leading-relaxed text-paper/70">{step.body}</p>
            </article>
          ))}
        </div>

        <div className="mt-24 grid items-center gap-6 md:grid-cols-[.7fr_1.3fr] md:gap-10">
          <div>
            <p className="font-sans text-sm text-lime">Four orbits around one answer</p>
            <h2 className="mt-4 font-display text-5xl leading-[.95] sm:text-6xl">Pick a <em className="text-lime">mode.</em></h2>
            <p className="mt-6 max-w-sm font-sans text-sm leading-relaxed text-paper/75">Each mode circles the same response from a different angle. Select one to see what it asks, then jump to its worked example below.</p>
          </div>
          <RadialOrbitalTimeline items={ORBIT} />
        </div>

        <div className="mt-16">
          <ModeExamples />
        </div>

        <p className="mt-12 max-w-xl font-sans text-sm leading-relaxed text-paper/65">These examples use prepared answers to show how each mode behaves. The extension's model-powered round trip is the intended experience as these modes go live.</p>
        <Link to="/about" className="mt-10 inline-block border-b border-lime pb-1 font-sans text-lime">Continue to About</Link>
      </div>
    </section>
  );
}

export function AboutChapter() {
  return (
    <section className="relative isolate overflow-hidden text-paper">
      <SilkShader className="-z-10" />
      <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-br from-night/20 via-night/60 to-night/90" aria-hidden="true" />
      <div className="relative z-10 mx-auto max-w-6xl px-5 pb-20 pt-36 sm:px-8 sm:pb-28 sm:pt-40">
        <div className="grid gap-10 md:grid-cols-[.85fr_1.15fr] md:gap-20">
          <div>
            <p className="font-sans text-sm text-lime">Why we built it</p>
            <h1 className="mt-5 font-display text-6xl leading-[.95] sm:text-8xl">About <em className="text-lime">us.</em></h1>
          </div>
          <div className="self-end">
            <p className="font-display text-3xl leading-tight sm:text-5xl">The missing button is <em className="text-lime">disagree.</em></p>
            <p className="mt-8 max-w-xl font-sans text-base leading-relaxed text-paper/75">AI can give you a long, careful-sounding paragraph and treat that as the end of the exchange. If a claim feels padded or uncertain, you should be able to push back without starting over. We built Argue Back around contestability: making the ability to challenge an answer part of the interface itself.</p>
          </div>
        </div>
        <div className="mt-20 border-t border-light-line pt-8">
          <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-end"><h2 className="font-display text-5xl">The team</h2><p className="font-sans text-sm text-paper/65">BitNBuild '26 · UAE Regional Qualifying Round</p></div>
          <div className="mt-9 grid border-t border-light-line sm:grid-cols-2">
            {[{ name: "[Owais Husain]", role: "Frontend & Design" }, { name: "[Adwait]", role: "AI / Backend" }].map((person) => (
              <article key={person.name} className="border-b border-light-line py-7 sm:pr-8 sm:even:border-l sm:even:pl-8">
                <h3 className="font-display text-4xl">{person.name}</h3>
                <p className="mt-2 font-sans text-sm text-paper/65">[Role] · {person.role}</p>
              </article>
            ))}
          </div>
          <p className="mt-8 font-sans text-sm text-paper/65">GDG CRCE × GDGoC BPDC</p>
        </div>
        <Link to="/" className="mt-14 inline-block border-b border-lime pb-1 font-sans text-lime">Explore Argue Back</Link>
      </div>
    </section>
  );
}
