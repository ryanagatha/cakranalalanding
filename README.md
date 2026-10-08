# cakranalalanding

Institut Cakra Nala — static institutional profile focused on algorithmic ethics, cognitive resilience, and strategic studies. Keeps the original Aksi Indonesia visual language with a teal/gold identity and original city and architectural photographs from Aksi Indonesia, without people as visual subjects.

## Run locally

From this folder:

```sh
python3 -m http.server 5184 --bind 127.0.0.1
```

Open http://127.0.0.1:5184/ . The committed `assets/motion-engine.js` bundle allows static serving without installing packages. After changing the Remotion source, run `npm ci` and `npm run build`.

## Files

- `index.html`: Indonesian profile, English translations in `data-en`, image descriptions in `data-alt-en`.
- `styles.css`: original layout and responsive styling with Cakra Nala identity overrides.
- `script.js`: navigation, language switching, hero typing/slideshow, staggered per-section scroll reveals, and motion controls.
- `src/remotion/`: React/Remotion algorithm-flow composition and viewport-aware player.
- `build.mjs`: esbuild production bundle for the static page.
- `assets/`: local photos and logo; `imagegen-prompts.json` contains image provenance and prompts.
- `design-system/cakranala/MASTER.md`: current visual and content guidance.

There is no chatbot, form, backend, database, or tracking. Google Fonts is the only external runtime resource; system fonts provide a fallback.

## Verification

JavaScript syntax checked with `node --check script.js`. Browser checks cover hero progression/pause, ID/EN switching, mobile menu, image loading, reduced-motion preference and desktop/tablet/mobile overflow at 320, 375, 390, 430, 768, 820, 1024 and 1440 px. All 39 scroll-motion targets are checked to reveal after scrolling.

## Motion implementation

The algorithm diagram uses the [Remotion Player](https://www.remotion.dev/docs/player/player), with `useCurrentFrame()` driving deterministic SVG motion. Playback pauses outside the viewport, while the tab is hidden, or when the user pauses motion. The hero typewriter and per-section staggered scroll reveals remain lightweight native JavaScript/CSS. All visible text supports ID/EN. The technical visual uses code-generated geometry, not AI-generated scene imagery.

## Learning outcome

The institutional profile identifies CSCR (Certified Strategist Cognitive Resilience) certification as a learning outcome, through competency assessment and fulfillment of graduation standards. No accreditation body or automatic award is claimed.
