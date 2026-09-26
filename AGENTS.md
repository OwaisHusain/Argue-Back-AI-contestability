<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

- Keep Home's live Decay demo independent of the visual backdrop; the photo reel and silk backdrop are presentational only, so interaction stays reliable.
- Share the compact site navigation/footer through `site-chrome.tsx` across the three public pages, so their destinations and event credit remain consistent.
- Home, How It Works, and About are separate linked pages (no single scrolling journey); How It Works and About render from `site-chapters.tsx`.
- Mode example content (the monolith vs microservices question) lives in `src/lib/mode-examples.ts` and is shared by the Home demo and the How It Works examples, so they never drift apart.
