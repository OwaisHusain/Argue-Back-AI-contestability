import { CORE, CORE_WORDS, FULL_WORDS, GRAVEYARD, GRAVEYARD_SURVIVOR, GUESSES, GUESS_PARTS, MODES, QUESTION, REBUILDS, SENTENCES, type ModeId } from "@/lib/mode-examples";

export function GuessText({ compact = false }: { compact?: boolean }) {
  return (
    <p>
      {GUESS_PARTS.map((part, i) =>
        part.guess ? (
          <mark key={i} className="bg-lime px-0.5 text-night">
            {part.text}
            {!compact && <sup className="ml-0.5 font-sans text-[0.6em]">{part.guess}</sup>}
          </mark>
        ) : (
          <span key={i}>{part.text}</span>
        ),
      )}
    </p>
  );
}

function DecayExample() {
  return (
    <div>
      <p className="font-sans text-xs uppercase tracking-wider text-paper/60">Original answer · {FULL_WORDS} words</p>
      <div className="mt-4 space-y-2 font-display text-lg leading-relaxed sm:text-xl">
        {SENTENCES.map((sentence, i) =>
          CORE.includes(i) ? (
            <p key={i} className="text-paper">{sentence}</p>
          ) : (
            <p key={i} className="text-paper/35 line-through decoration-paper/30">{sentence}</p>
          ),
        )}
      </div>
      <div className="mt-6 border-l-2 border-lime pl-5">
        <p className="font-sans text-xs uppercase tracking-wider text-lime">After The Decay · {CORE_WORDS} words</p>
        <p className="mt-2 font-display text-xl leading-snug text-paper sm:text-2xl">{CORE.map((i) => SENTENCES[i]).join(" ")}</p>
      </div>
      <p className="mt-5 font-sans text-sm text-paper/70">Four sentences hedged, flattered, or restated the question. Two carried the actual recommendation and the reason for it.</p>
    </div>
  );
}

function GraveyardExample() {
  return (
    <div>
      <p className="font-sans text-xs uppercase tracking-wider text-paper/60">Answers that were considered and buried</p>
      <ol className="mt-4 space-y-4">
        {GRAVEYARD.map((item, i) => (
          <li key={item.answer} className="border-l border-light-line pl-5">
            <p className="font-sans text-xs text-paper/50">Buried answer {String(i + 1).padStart(2, "0")}</p>
            <p className="mt-1 font-display text-lg leading-snug text-paper/75 sm:text-xl">{`“${item.answer}”`}</p>
            <p className="mt-2 font-sans text-sm text-paper/60">Why it lost: {item.buried}</p>
          </li>
        ))}
      </ol>
      <div className="mt-6 border-l-2 border-lime pl-5">
        <p className="font-sans text-xs uppercase tracking-wider text-lime">The answer that survived</p>
        <p className="mt-2 font-display text-xl leading-snug text-paper sm:text-2xl">{GRAVEYARD_SURVIVOR}</p>
      </div>
    </div>
  );
}

function RebuildExample() {
  return (
    <div>
      <p className="font-sans text-xs uppercase tracking-wider text-paper/60">The core claim</p>
      <p className="mt-2 font-display text-lg leading-snug text-paper/70 sm:text-xl">{SENTENCES[CORE[0] ?? 0]}</p>
      <ul className="mt-6 grid gap-px border border-light-line bg-light-line sm:grid-cols-3">
        {REBUILDS.map((item) => (
          <li key={item.label} className="bg-night/85 p-5">
            <p className="font-sans text-xs uppercase tracking-wider text-lime">{item.label}</p>
            <p className="mt-3 font-display text-lg leading-snug text-paper">{item.text}</p>
          </li>
        ))}
      </ul>
      <p className="mt-5 font-sans text-sm text-paper/70">Same recommendation three ways. If a claim only holds up in its original wording, that is worth knowing.</p>
    </div>
  );
}

function GuessExample() {
  return (
    <div>
      <p className="font-sans text-xs uppercase tracking-wider text-paper/60">The answer, with its assumptions marked</p>
      <div className="mt-4 font-display text-xl leading-relaxed text-paper sm:text-2xl">
        <GuessText />
      </div>
      <ol className="mt-6 space-y-3 border-t border-light-line pt-5">
        {GUESSES.map((note, i) => (
          <li key={note} className="flex gap-3 font-sans text-sm leading-relaxed text-paper/75">
            <span className="flex h-5 w-5 shrink-0 items-center justify-center bg-lime font-sans text-xs text-night">{i + 1}</span>
            {note}
          </li>
        ))}
      </ol>
    </div>
  );
}

const EXAMPLES: Record<ModeId, () => React.JSX.Element> = {
  decay: DecayExample,
  graveyard: GraveyardExample,
  rebuild: RebuildExample,
  guess: GuessExample,
};

export function ModeExamples() {
  return (
    <section aria-labelledby="examples-heading" className="relative">
      <div className="flex flex-col justify-between gap-6 border-b border-light-line pb-10 md:flex-row md:items-end">
        <div>
          <p className="font-sans text-sm text-lime">Every mode, one question</p>
          <h2 id="examples-heading" className="mt-4 font-display text-5xl leading-[.95] sm:text-7xl">The examples.</h2>
        </div>
        <div className="max-w-md border border-light-line bg-night/70 p-5 backdrop-blur-sm">
          <p className="font-sans text-xs text-lime">You asked</p>
          <p className="mt-2 font-display text-xl leading-snug sm:text-2xl">{QUESTION}</p>
        </div>
      </div>
      <div>
        {MODES.map((mode, index) => {
          const Example = EXAMPLES[mode.id];
          return (
            <article key={mode.id} id={`example-${mode.id}`} className="grid scroll-mt-8 gap-8 border-b border-light-line py-14 md:grid-cols-[.75fr_1.25fr] md:gap-16">
              <div>
                <span className="font-display text-6xl text-lime/70" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
                <h3 className="mt-4 font-display text-4xl sm:text-5xl">{mode.name}</h3>
                <p className="mt-3 max-w-xs font-sans text-sm leading-relaxed text-paper/75">{mode.blurb}</p>
                <p className="mt-6 max-w-xs border-t border-light-line pt-4 font-display text-lg italic leading-snug text-paper/85">{mode.asks}</p>
              </div>
              <Example />
            </article>
          );
        })}
      </div>
    </section>
  );
}
