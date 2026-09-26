import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { ChevronDown, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SiteFooter, SiteHeader } from "@/components/site-chrome";
import { SilkBackdrop } from "@/components/silk-backdrop";
import MorphGallery from "@/components/ui/morph-gallery";
import reel1 from "@/assets/argue-reel-1.jpg";
import reel2 from "@/assets/argue-reel-2.jpg";
import reel3 from "@/assets/argue-reel-3.jpg";

export const Route = createFileRoute("/")({
  head: () => ({ meta: [
    { title: "Argue Back — Challenge the first answer" },
    { name: "description", content: "A button to interrogate AI answers. Try The Decay and watch an answer shed its filler until only the claim remains." },
    { property: "og:title", content: "Argue Back — Challenge the first answer" },
    { property: "og:description", content: "Interrogate the AI's answer instead of accepting it. Try The Decay live." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ] }),
  component: Index,
});

const QUESTION = "Should I use a monolith or microservices for my new app?";
const SENTENCES = [
  "That's a great question, and honestly the answer depends quite a bit on your specific situation and what you're optimizing for.",
  "Generally speaking, there are trade-offs on both sides, and many teams find themselves somewhere in the middle of the spectrum.",
  "For a new app, a monolith is usually the better starting point, because it keeps deployment, debugging, and data consistency simple while your domain boundaries are still unclear.",
  "Microservices can offer benefits around independent scaling and team autonomy, though they also introduce meaningful operational overhead that shouldn't be underestimated.",
  "Split services out later, once a specific part of the system has a proven, distinct scaling or ownership need.",
  "Ultimately, it's worth considering your team size, timeline, and long-term goals before committing to either approach.",
];
const CORE = [2, 4];
const MODES = [
  { name: "The Decay", blurb: "The answer deletes itself, sentence by sentence, until only the claim remains.", live: true },
  { name: "The Graveyard", blurb: "The draft answers rejected before the final one was kept.", live: false },
  { name: "The Rebuild", blurb: "Same meaning, different shape. Another phrasing with every challenge.", live: false },
  { name: "The Guess, Highlighted", blurb: "Separate what the model knows from what it is quietly guessing.", live: false },
];
const countWords = (text: string) => text.trim().split(/\s+/).filter(Boolean).length;
const FULL_WORDS = countWords(SENTENCES.join(" "));
const REEL = [
  { src: reel1, alt: "Magnifying glass on a paper answer" },
  { src: reel2, alt: "Lime paper question mark on a dark green desk" },
  { src: reel3, alt: "A bright strip pulled from dark answer sheets" },
];

function Index() {
  const [open, setOpen] = useState(false);
  const [removed, setRemoved] = useState<number[]>([]);
  const [fading, setFading] = useState<number | null>(null);
  const [running, setRunning] = useState(false);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onDown = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) setOpen(false);
    };
    const onEscape = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onEscape);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onEscape);
      timers.current.forEach(clearTimeout);
    };
  }, []);

  const runDecay = () => {
    if (running) return;
    timers.current.forEach(clearTimeout);
    setOpen(false);
    setRemoved([]);
    setFading(null);
    setRunning(true);
    const order = SENTENCES.map((_, i) => i).filter((i) => !CORE.includes(i));
    order.forEach((idx, n) => {
      timers.current.push(setTimeout(() => setFading(idx), 420 + n * 760));
      timers.current.push(setTimeout(() => {
        setFading(null);
        setRemoved((prev) => [...prev, idx]);
        if (n === order.length - 1) setRunning(false);
      }, 420 + n * 760 + 640));
    });
  };
  const reset = () => {
    timers.current.forEach(clearTimeout);
    setRunning(false);
    setFading(null);
    setRemoved([]);
  };
  const words = countWords(SENTENCES.filter((_, i) => !removed.includes(i)).join(" "));

  return (
    <div className="min-h-screen bg-background text-foreground">
      <main>
        <section className="relative isolate overflow-hidden bg-night text-paper [--foreground:var(--paper)]">
          <SilkBackdrop />
          <div className="pointer-events-none absolute inset-0 opacity-65" aria-hidden="true">
            <MorphGallery items={REEL} height="100%" className="h-full" autoplay={4100} duration={1900} loop arrows={false} thumbnails={false} />
          </div>
          <div className="reel-mask pointer-events-none absolute inset-0" aria-hidden="true" />
          <SiteHeader overlay />
          <div className="relative z-10 mx-auto flex max-w-6xl flex-col items-center px-5 pb-20 pt-16 text-center sm:px-8 sm:pt-20">
            <h1 className="font-display text-[clamp(5rem,12vw,10rem)] leading-[.83] text-paper">Argue <em className="font-normal text-lime">Back.</em></h1>
            <p className="mt-7 max-w-2xl font-display text-2xl leading-tight sm:text-3xl">The AI's first answer is <em className="text-lime">an</em> answer. Not the answer.</p>
            <p className="mt-4 max-w-lg font-sans text-sm leading-relaxed text-paper/80 sm:text-base">One button beside any AI response. Four ways to question what it says, what it hides, and what it only guesses.</p>

            <div className="mt-12 w-full max-w-3xl border border-light-line bg-night/90 text-left backdrop-blur-md sm:mt-14">
              <div className="border-b border-light-line px-5 py-5 sm:px-8">
                <p className="font-sans text-xs text-lime">You asked</p>
                <h2 className="mt-2 font-display text-xl leading-snug text-paper sm:text-2xl">{QUESTION}</h2>
              </div>
              <div className="px-5 py-6 sm:px-8 sm:py-8">
                <p className="min-h-[15rem] font-display text-lg leading-[1.48] text-paper sm:min-h-[11rem] sm:text-[1.35rem]" aria-live="off">
                  {SENTENCES.map((sentence, i) => removed.includes(i) ? null : (
                    <span key={i} className={fading === i ? "decay-out inline" : "inline"}>{sentence}{" "}</span>
                  ))}
                </p>
                <div className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-3 border-t border-light-line pt-5">
                  <div className="relative" ref={menuRef}>
                    <Button type="button" onClick={() => setOpen((v) => !v)} aria-expanded={open} aria-haspopup="menu" className="h-10 rounded-none bg-lime px-5 text-night shadow-none hover:bg-lime/85">
                      Argue back <ChevronDown aria-hidden="true" />
                    </Button>
                    {open && <div role="menu" aria-label="Ways to argue back" className="absolute left-0 top-full z-30 mt-1 w-[min(19rem,calc(100vw-3rem))] border border-light-line bg-night text-paper">
                      {MODES.map((mode) => <Button key={mode.name} type="button" role="menuitem" variant="ghost" disabled={!mode.live} onClick={mode.live ? runDecay : undefined} className="h-auto w-full justify-start rounded-none border-b border-light-line px-4 py-3 text-left whitespace-normal last:border-b-0 hover:bg-forest hover:text-paper disabled:opacity-50">
                        <span className="block w-full"><span className="font-display text-lg">{mode.name}</span>{!mode.live && <span className="ml-2 font-sans text-xs text-lime">coming soon</span>}<span className="mt-1 block font-sans text-xs font-normal leading-snug text-paper/70">{mode.blurb}</span></span>
                      </Button>)}
                    </div>}
                  </div>
                  <p className="font-sans text-sm tabular-nums text-paper/75" aria-live="polite">{FULL_WORDS} words {words !== FULL_WORDS && <span className="text-lime">→ {words} words</span>}</p>
                  {removed.length > 0 && !running && <Button type="button" variant="ghost" onClick={reset} className="h-9 rounded-none px-2 text-paper underline underline-offset-4 hover:bg-forest hover:text-paper"><RotateCcw aria-hidden="true" /> Restore the filler</Button>}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="border-b border-hairline bg-background py-20 sm:py-28">
          <div className="mx-auto grid max-w-6xl gap-8 px-5 sm:px-8 md:grid-cols-[.7fr_1.3fr] md:gap-20">
            <p className="font-sans text-sm text-muted-foreground">The problem</p>
            <div><h2 className="max-w-3xl font-display text-4xl leading-[1.02] sm:text-6xl">You can’t currently disagree with an AI. You can only ask again.</h2>
            <p className="mt-8 max-w-xl font-sans text-base leading-relaxed text-muted-foreground">Every chat interface is built around agreement: you ask, it answers, you accept. Contesting the reasoning means retyping the question and hoping. Argue Back makes that challenge a control in the interface.</p></div>
          </div>
        </section>
        <section className="bg-background py-20 sm:py-28">
          <div className="mx-auto max-w-6xl px-5 sm:px-8">
            <div className="flex flex-col justify-between gap-5 border-b border-hairline pb-8 sm:flex-row sm:items-end"><p className="font-sans text-sm text-muted-foreground">Four ways to question an answer</p><h2 className="font-display text-4xl sm:text-6xl">The modes</h2></div>
            <div>{MODES.map((mode) => <div key={mode.name} className={`grid gap-3 border-b border-hairline py-7 md:grid-cols-[1fr_1fr] md:gap-12 ${mode.live ? "" : "opacity-55"}`}>
              <div className="flex items-baseline gap-4"><h3 className="font-display text-3xl sm:text-4xl">{mode.name}</h3><span className="shrink-0 font-sans text-xs">{mode.live ? "live now" : "coming soon"}</span></div>
              <p className="max-w-md font-sans text-sm leading-relaxed sm:text-base">{mode.blurb}</p>
            </div>)}</div>
          </div>
        </section>
        <section className="bg-forest py-20 text-paper sm:py-24"><div className="mx-auto flex max-w-6xl flex-col justify-between gap-8 px-5 sm:px-8 md:flex-row md:items-end"><h2 className="max-w-xl font-display text-4xl leading-none sm:text-6xl">What happens after you press the button?</h2><Link to="/how-it-works" className="w-fit border-b border-lime pb-1 font-sans text-base text-lime hover:text-paper">How it works</Link></div></section>
      </main>
      <SiteFooter />
    </div>
  );
}
