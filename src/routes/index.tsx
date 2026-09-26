import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { ChevronDown, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SiteFooter, SiteHeader } from "@/components/site-chrome";
import { LiquidButton } from "@/components/ui/liquid-glass-button";
import { GuessText } from "@/components/mode-examples";
import { CORE, FULL_WORDS, GRAVEYARD, GRAVEYARD_SURVIVOR, MODES, QUESTION, REBUILDS, SENTENCES, countWords } from "@/lib/mode-examples";
import { SilkBackdrop } from "@/components/silk-backdrop";
import { SilkShader } from "@/components/silk-shader";
import type { ModeAccent } from "@/lib/mode-examples";

const ACCENT: Record<ModeAccent, { dot: string; text: string; box: string }> = {
  lime: { dot: "bg-lime", text: "text-lime", box: "border-lime bg-lime/35 group-hover:bg-lime/60" },
  coral: { dot: "bg-coral", text: "text-coral", box: "border-coral bg-coral/20 group-hover:bg-coral/35" },
  sky: { dot: "bg-sky", text: "text-sky", box: "border-sky bg-sky/25 group-hover:bg-sky/45" },
  amber: { dot: "bg-amber", text: "text-amber", box: "border-amber bg-amber/25 group-hover:bg-amber/45" },
};
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
  const [mode, setMode] = useState<string | null>(null);
  const [rebuildVersion, setRebuildVersion] = useState(0);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onDown = (e: PointerEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) setOpen(false);
    };
    const onEscape = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    document.addEventListener("pointerdown", onDown);
    document.addEventListener("keydown", onEscape);
    return () => {
      document.removeEventListener("pointerdown", onDown);
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
    setMode("The Decay");
    const order = SENTENCES.map((_, i) => i).filter((i) => !CORE.includes(i));
    order.forEach((idx, n) => {
      timers.current.push(setTimeout(() => setFading(idx), 220 + n * 960));
      timers.current.push(setTimeout(() => {
        setFading(null);
        setRemoved((prev) => [...prev, idx]);
        if (n === order.length - 1) setRunning(false);
      }, 220 + n * 960 + 840));
    });
  };
  const reset = () => {
    timers.current.forEach(clearTimeout);
    setRunning(false);
    setFading(null);
    setRemoved([]);
    setMode(null);
  };
  const selectMode = (name: string) => {
    if (name === "The Decay") { runDecay(); return; }
    timers.current.forEach(clearTimeout);
    setRunning(false);
    setFading(null);
    setRemoved([]);
    setMode(name);
    setOpen(false);
    if (name === "The Rebuild") setRebuildVersion((value) => value + 1);
  };
  const words = countWords(SENTENCES.filter((_, i) => !removed.includes(i)).join(" "));

  return (
    <div className="min-h-screen bg-background text-foreground">
      <main>
        <section className="relative isolate z-20 bg-night text-paper [--foreground:var(--paper)]">
          <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden" aria-hidden="true">
            <SilkBackdrop />
            <div className="absolute inset-0 opacity-65">
              <MorphGallery items={REEL} height="100%" className="h-full" autoplay={4100} duration={1900} loop arrows={false} thumbnails={false} />
            </div>
            <div className="reel-mask absolute inset-0" />
          </div>
          <SiteHeader overlay />
          <div className="relative z-10 mx-auto flex max-w-6xl flex-col items-center px-5 pb-20 pt-16 text-center sm:px-8 sm:pt-20">
            <h1 className="font-display text-[clamp(5rem,12vw,10rem)] leading-[.83] text-paper">Argue <em className="font-normal text-lime">Back.</em></h1>
            <p className="mt-7 max-w-2xl font-display text-2xl leading-tight sm:text-3xl">The AI's first answer is <em className="text-lime">an</em> answer. Not the answer.</p>
             <p className="mt-4 max-w-lg font-sans text-sm leading-relaxed text-paper/80 sm:text-base">One button beside an AI response. Four ways to question what it says, what it hides, and what it only guesses.</p>

            <div className="mt-12 w-full max-w-3xl border border-light-line bg-night/90 text-left backdrop-blur-md sm:mt-14">
              <div className="border-b border-light-line px-5 py-5 sm:px-8">
                <p className="font-sans text-xs text-lime">You asked</p>
                <h2 className="mt-2 font-display text-xl leading-snug text-paper sm:text-2xl">{QUESTION}</h2>
              </div>
              <div className="px-5 py-6 sm:px-8 sm:py-8">
                 <div className="min-h-[14rem] font-display text-lg leading-[1.45] text-paper sm:min-h-[12rem] sm:text-xl" aria-live="polite">
                   {mode === "The Graveyard" ? <div className="space-y-4"><p className="text-lime">Other answers considered</p>{GRAVEYARD.map((item) => <p key={item.answer} className="border-l border-light-line pl-4 text-paper/65">{`“${item.answer}”`}</p>)}<p className="border-l border-lime pl-4">{GRAVEYARD_SURVIVOR}</p></div> : mode === "The Rebuild" ? <p>{REBUILDS[rebuildVersion % REBUILDS.length]?.text}</p> : mode === "The Guess, Highlighted" ? <GuessText compact /> : <div className="space-y-1">{SENTENCES.map((sentence, i) => !removed.includes(i) && <div key={i} className={`decay-sentence ${fading === i ? "decay-sentence-exit" : ""}`}><span>{sentence}</span></div>)}</div>}
                 </div>
                <div className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-3 border-t border-light-line pt-5">
                  <div className="relative" ref={menuRef}>
                    <LiquidButton type="button" size="lg" onClick={() => setOpen((v) => !v)} aria-expanded={open} aria-haspopup="menu" className="dark bg-lime/10 font-sans text-base text-lime">
                      Argue back <ChevronDown aria-hidden="true" />
                    </LiquidButton>
                    {open && <div role="menu" aria-label="Ways to argue back" className="absolute left-0 top-full z-50 mt-2 w-[min(20rem,calc(100vw-3rem))] overflow-hidden rounded-xl border border-light-line bg-night/95 text-paper shadow-2xl shadow-black/50 backdrop-blur-xl">
                       {MODES.map((item) => <Button key={item.name} type="button" role="menuitem" variant="ghost" onClick={() => selectMode(item.name)} className={`h-auto w-full justify-start gap-3 rounded-none border-b border-light-line px-4 py-3 text-left whitespace-normal last:border-b-0 hover:bg-forest hover:text-paper ${mode === item.name ? "bg-forest/70" : ""}`}>
                         <span aria-hidden="true" className={`mt-2 size-2 shrink-0 self-start rounded-full ${ACCENT[item.accent].dot}`} />
                         <span className="block w-full"><span className={`font-display text-lg ${ACCENT[item.accent].text}`}>{item.name}</span><span className="mt-1 block font-sans text-xs font-normal leading-snug text-paper/70">{item.blurb}</span></span>
                      </Button>)}
                    </div>}
                  </div>
                   {(!mode || mode === "The Decay") && <p className="font-sans text-sm tabular-nums text-paper/75" aria-live="polite">{FULL_WORDS} words {words !== FULL_WORDS && <span className="text-lime">→ {words} words</span>}</p>}
                  {removed.length > 0 && !running && <Button type="button" variant="ghost" onClick={reset} className="h-9 rounded-none px-2 text-paper underline underline-offset-4 hover:bg-forest hover:text-paper"><RotateCcw aria-hidden="true" /> Restore the filler</Button>}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="relative isolate overflow-hidden text-paper">
          <SilkShader />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-night/80 via-night/40 to-transparent" aria-hidden="true" />
          <div className="relative mx-auto grid max-w-6xl gap-8 px-5 py-24 sm:px-8 sm:py-32 md:grid-cols-[.7fr_1.3fr] md:gap-20">
            <p className="font-sans text-sm text-lime">The problem</p>
            <div><h2 className="max-w-3xl font-display text-4xl leading-[1.02] sm:text-6xl">You can’t currently disagree with an AI. <em className="text-lime">You can only ask again.</em></h2>
            <p className="mt-8 max-w-xl font-sans text-base leading-relaxed text-paper/80">Every chat interface is built around agreement: you ask, it answers, you accept. Contesting the reasoning means retyping the question and hoping. Argue Back makes that challenge a control in the interface.</p></div>
          </div>
        </section>
         <section className="bg-background py-20 sm:py-28">
          <div className="mx-auto max-w-6xl px-5 sm:px-8">
            <div className="flex flex-col justify-between gap-5 border-b border-hairline pb-8 sm:flex-row sm:items-end"><p className="font-sans text-sm text-muted-foreground">Four ways to question an answer</p><h2 className="font-display text-4xl sm:text-6xl">The modes</h2></div>
             <div>{MODES.map((item, index) => <div key={item.name} className="group grid gap-5 border-b border-hairline py-8 md:grid-cols-[1fr_1fr] md:gap-12">
               <div className="flex items-start gap-4">
                 <span className={`mt-1 flex size-10 shrink-0 items-center justify-center rounded-full font-sans text-sm font-semibold tabular-nums text-night transition-transform duration-300 group-hover:scale-110 ${ACCENT[item.accent].dot}`}>{`0${index + 1}`}</span>
                 <div><h3 className="font-display text-3xl sm:text-4xl">{item.name}</h3><p className="mt-2 max-w-sm font-sans text-sm leading-relaxed text-muted-foreground sm:text-base">{item.blurb}</p></div>
               </div>
               <div className={`rounded-lg border-l-4 px-5 py-4 transition-colors duration-300 ${ACCENT[item.accent].box}`}>
                 <p className="font-sans text-xs font-semibold uppercase tracking-wider text-night/70">The problem it fixes</p>
                 <p className="mt-2 font-sans text-sm leading-relaxed text-night">{item.problem}</p>
               </div>
            </div>)}</div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
