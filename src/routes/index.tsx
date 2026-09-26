import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import MorphGallery from "@/components/ui/morph-gallery";
import morph1 from "@/assets/morph-1.jpg";
import morph2 from "@/assets/morph-2.jpg";
import morph3 from "@/assets/morph-3.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Argue Back — push back on the AI's answer" },
      {
        name: "description",
        content:
          "Argue Back is a browser extension concept that adds one button to AI chat: a way to interrogate an answer instead of accepting it. Watch The Decay strip an answer to its core.",
      },
      { property: "og:title", content: "Argue Back — push back on the AI's answer" },
      {
        property: "og:description",
        content:
          "AI chat assumes agreement. Argue Back gives you a button to contest the reasoning — starting with The Decay.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
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

const countWords = (text: string) => text.trim().split(/\s+/).filter(Boolean).length;
const FULL_WORDS = countWords(SENTENCES.join(" "));

const MODES = [
  {
    name: "The Decay",
    blurb: "The answer deletes itself, sentence by sentence, until only the claim remains.",
    live: true,
  },
  {
    name: "The Graveyard",
    blurb: "Every draft the model rejected before it settled. Drafts 1–7 discarded, draft 8 shipped.",
    live: false,
  },
  {
    name: "The Rebuild",
    blurb: "Same meaning, different shape. Click again and the answer re-forms in another structure.",
    live: false,
  },
  {
    name: "The Guess, Highlighted",
    blurb: "Marks which sentences are stated knowledge and which are quiet pattern-matching.",
    live: false,
  },
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
    document.addEventListener("mousedown", onDown);
    return () => {
      document.removeEventListener("mousedown", onDown);
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
    const step = 760;
    order.forEach((idx, n) => {
      timers.current.push(
        setTimeout(() => setFading(idx), 420 + n * step),
      );
      timers.current.push(
        setTimeout(() => {
          setFading(null);
          setRemoved((prev) => [...prev, idx]);
          if (n === order.length - 1) setRunning(false);
        }, 420 + n * step + 640),
      );
    });
  };

  const reset = () => {
    timers.current.forEach(clearTimeout);
    setRunning(false);
    setFading(null);
    setRemoved([]);
  };

  const visible = SENTENCES.filter((_, i) => !removed.includes(i));
  const words = countWords(visible.join(" "));

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="mx-auto max-w-5xl px-6 py-8">
        <span className="font-display text-lg font-semibold tracking-tight">Argue Back</span>
      </header>

      {/* Hero */}
      <main className="mx-auto max-w-5xl px-6">
        <section className="max-w-3xl pb-14 pt-6">
          <h1 className="font-display text-4xl leading-[1.05] font-semibold tracking-tight sm:text-6xl">
            The AI's answer is <em className="text-primary not-italic">an</em> answer. Not the
            answer.
          </h1>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground">
            A button that sits beside any AI response and lets you interrogate it — the hedging, the
            drafts it buried, the parts it's guessing.
          </p>
        </section>

        {/* Demo card */}
        <section className="border border-hairline bg-card">
          <div className="border-b border-hairline px-6 py-4 sm:px-8">
            <p className="font-sans text-sm text-muted-foreground">You asked</p>
            <p className="mt-1 font-display text-lg">{QUESTION}</p>
          </div>

          <div className="px-6 py-7 sm:px-8">
            <p className="font-display text-[1.2rem] leading-[1.75]">
              {SENTENCES.map((s, i) =>
                removed.includes(i) ? null : (
                  <span key={i} className={fading === i ? "decay-out inline" : "inline"}>
                    {s}{" "}
                  </span>
                ),
              )}
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4 border-t border-hairline pt-5">
              <div className="relative" ref={menuRef}>
                <button
                  onClick={() => setOpen((v) => !v)}
                  className="border border-foreground bg-foreground px-4 py-2 font-sans text-sm font-medium text-background transition-opacity hover:opacity-85"
                >
                  Argue back
                </button>

                {open && (
                  <div className="absolute left-0 z-20 mt-1 w-[19rem] border border-hairline bg-card">
                    {MODES.map((m) => (
                      <button
                        key={m.name}
                        disabled={!m.live}
                        onClick={m.live ? runDecay : undefined}
                        className="block w-full border-b border-hairline px-4 py-3 text-left last:border-b-0 transition-colors enabled:hover:bg-secondary disabled:cursor-not-allowed disabled:opacity-45"
                      >
                        <span className="font-display text-base">{m.name}</span>
                        {!m.live && (
                          <span className="ml-2 font-sans text-[0.7rem] uppercase text-muted-foreground">
                            soon
                          </span>
                        )}
                        <span className="mt-0.5 block font-sans text-xs leading-snug text-muted-foreground">
                          {m.blurb}
                        </span>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <p className="font-sans text-sm tabular-nums text-muted-foreground">
                {FULL_WORDS} words
                {words !== FULL_WORDS && (
                  <>
                    {" — "}
                    <span className="text-primary">{words} words</span>
                  </>
                )}
              </p>

              {removed.length > 0 && !running && (
                <button
                  onClick={reset}
                  className="font-sans text-sm text-muted-foreground underline underline-offset-4 hover:text-foreground"
                >
                  Restore the filler
                </button>
              )}
            </div>
          </div>
        </section>

        {/* Evidence reel — constantly morphing */}
        <section className="pt-16">
          <MorphGallery
            items={[
              { src: morph1, alt: "Interrogation table under a single lamp" },
              { src: morph2, alt: "Typed page with red strike-throughs" },
              { src: morph3, alt: "Torn newspaper fragments on a desk" },
            ]}
            height="420px"
            autoplay={3500}
            loop
          />
        </section>

        {/* Problem */}
        <section className="max-w-2xl py-20">
          <h2 className="font-display text-2xl font-semibold tracking-tight sm:text-3xl">
            You can't currently disagree with an AI. You can only ask again.
          </h2>
          <div className="mt-5 space-y-4 text-base leading-relaxed text-muted-foreground">
            <p>
              Every chat interface is built around agreement: you ask, it answers, you accept. The
              only lever it gives you is retyping the question with "be more concise" bolted on.
            </p>
            <p>
              There is no control for contesting the reasoning — no way to ask what got padded, what
              got thrown away, or which sentence the model wasn't sure about. Argue Back is that
              control.
            </p>
          </div>
        </section>

        {/* Features */}
        <section className="pb-24">
          <h2 className="font-display text-2xl font-semibold tracking-tight sm:text-3xl">
            Four ways to push back
          </h2>
          <div className="mt-8 border-t border-hairline">
            {MODES.map((m) => (
              <div
                key={m.name}
                className={`grid gap-2 border-b border-hairline py-6 sm:grid-cols-[14rem_1fr] ${
                  m.live ? "" : "opacity-50"
                }`}
              >
                <div className="flex items-baseline gap-3">
                  <h3 className="font-display text-xl">{m.name}</h3>
                  {m.live ? (
                    <span className="font-sans text-xs font-medium text-primary">live</span>
                  ) : (
                    <span className="font-sans text-xs text-muted-foreground">coming soon</span>
                  )}
                </div>
                <p className="max-w-xl text-base leading-relaxed text-muted-foreground">{m.blurb}</p>
              </div>
            ))}
          </div>
        </section>
      </main>

      <footer className="border-t border-hairline">
        <div className="mx-auto max-w-5xl px-6 py-8">
          <p className="font-sans text-sm text-muted-foreground">
            Built for BitNBuild '26 — UAE Regional Qualifying Round.
          </p>
        </div>
      </footer>
    </div>
  );
}
