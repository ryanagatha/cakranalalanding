# cakranalalanding

Institut Cakra Nala — static institutional profile focused on algorithmic ethics, cognitive resilience, and strategic studies. Keeps the original Aksi Indonesia visual language with a teal/gold identity and city/citizen imagery.

## Run locally

From this folder:

```sh
python3 -m http.server 5184 --bind 127.0.0.1
```

Open http://127.0.0.1:5184/ . No package installation or build is required.

## Files

- `index.html`: Indonesian profile, English translations in `data-en`, image descriptions in `data-alt-en`.
- `styles.css`: original layout and responsive styling with Cakra Nala identity overrides.
- `script.js`: navigation, language switching, hero typing/slideshow, staggered per-section scroll reveals, and ambient canvas.
- `assets/`: local photos and logo; `imagegen-prompts.json` contains image provenance and prompts.
- `design-system/cakranala/MASTER.md`: current visual and content guidance.

There is no chatbot, form, backend, database, or tracking. Google Fonts is the only external runtime resource; system fonts provide a fallback.

## Verification

JavaScript syntax checked with `node --check script.js`. Browser checks cover hero progression/pause, ID/EN switching, mobile menu, image loading, reduced-motion preference and desktop/tablet/mobile overflow at 320, 375, 390, 430, 768, 820, 1024 and 1440 px. All 38 scroll-motion targets are checked to reveal after scrolling.
