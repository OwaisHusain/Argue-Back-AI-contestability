export const QUESTION = "Should I use a monolith or microservices for my new app?";

export const SENTENCES = [
  "That's a great question, and honestly the answer depends quite a bit on your specific situation and what you're optimizing for.",
  "Generally speaking, there are trade-offs on both sides, and many teams find themselves somewhere in the middle of the spectrum.",
  "For a new app, a monolith is usually the better starting point, because it keeps deployment, debugging, and data consistency simple while your domain boundaries are still unclear.",
  "Microservices can offer benefits around independent scaling and team autonomy, though they also introduce meaningful operational overhead that shouldn't be underestimated.",
  "Split services out later, once a specific part of the system has a proven, distinct scaling or ownership need.",
  "Ultimately, it's worth considering your team size, timeline, and long-term goals before committing to either approach.",
];

export const CORE = [2, 4];

export const countWords = (text: string) => text.trim().split(/\s+/).filter(Boolean).length;
export const FULL_WORDS = countWords(SENTENCES.join(" "));
export const CORE_WORDS = countWords(CORE.map((i) => SENTENCES[i]).join(" "));

export type ModeId = "decay" | "graveyard" | "rebuild" | "guess";

export const MODES: { id: ModeId; name: string; blurb: string; asks: string }[] = [
  { id: "decay", name: "The Decay", blurb: "Strip away the padding until only the answer remains.", asks: "Which of these sentences actually say something?" },
  { id: "graveyard", name: "The Graveyard", blurb: "See the other answers that might have been given.", asks: "What did the model consider, and why did it bury it?" },
  { id: "rebuild", name: "The Rebuild", blurb: "The same point, put differently.", asks: "Does the claim survive being said another way?" },
  { id: "guess", name: "The Guess, Highlighted", blurb: "Spot where an answer becomes an assumption.", asks: "Where is the model filling gaps you never filled in?" },
];

export const GRAVEYARD = [
  { answer: "Go microservices from day one — it's how the big tech companies scale.", buried: "Copies the architecture of companies with hundreds of engineers and problems you don't have yet." },
  { answer: "Skip the debate and build everything as serverless functions.", buried: "Swaps one trade-off for another: cold starts, vendor lock-in, and scattered logic." },
  { answer: "Build a modular monolith: one deploy, strict boundaries inside.", buried: "Nearly won. It's a refinement of the surviving answer rather than a different one." },
];

export const GRAVEYARD_SURVIVOR = "Start with a monolith and split services out only when a part of the system proves it needs to.";

export const REBUILDS = [
  { label: "Plainly", text: "Build one app first. Break a piece out only when that piece clearly needs to scale or be owned on its own." },
  { label: "As a rule of thumb", text: "Microservices are an optimization you earn, not an architecture you start with." },
  { label: "As a checklist", text: "Choose a monolith unless you already have several teams, independently scaling components, and the tooling to run a distributed system." },
];

export type GuessPart = { text: string; guess?: number };

export const GUESS_PARTS: GuessPart[] = [
  { text: "For a new app" },
  { text: " built by a small team", guess: 1 },
  { text: ", a monolith is usually the better starting point, because it keeps deployment and debugging simple " },
  { text: "while your domain boundaries are still unclear", guess: 2 },
  { text: ". Split services out later, " },
  { text: "once traffic grows unevenly across the system", guess: 3 },
  { text: "." },
];

export const GUESSES = [
  "Team size was never mentioned. A monolith is less obvious with five teams working in parallel.",
  "Assumes the product is still being discovered. A rewrite of a known system can have clear boundaries on day one.",
  "Assumes scaling is the trigger. Compliance, ownership, or a different language can justify a split sooner.",
];
