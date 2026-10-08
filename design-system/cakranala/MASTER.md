# Institut Cakra Nala — website identity

## Source and scope

User direction: preserve the Aksi Indonesia site's visual language, with Institut Cakra Nala's name, teal/gold identity, city and citizen photography, and institutional copy focused on algorithms. No chatbot, complaint form, invented contact details, or fabricated outcomes.

Brand reference: `../cakranala/output/slides-v4/slide-01.png` and slides 02, 03, 08, 09 from the supplied institute presentation. Profile framing: cognitive resilience, algorithmic ethics, strategic studies; the institute's intended contribution, not measured outcomes or accreditation claims.

## Visual language

- White canvas, generous editorial spacing, large centered photographic hero, rotating typed words, subtle ambient dots, city and neighborhood imagery.
- Preserve original Figtree typography and responsive section rhythm.
- Primary teal `#07545B`; darkest teal `#082F34`; text `#172D30`; secondary text `#526568`.
- Gold `#D8AC50`, pale gold `#F6D994` on dark surfaces; teal for text on white.
- Rectangular hero and feature sections; gently rounded photo cards and pill buttons.
- Breakpoints: 980px navigation change and 680px single-column mobile layouts.

## Content and interactions

- Indonesian default; full English alternative through authored `data-en` attributes.
- Hero: “Membaca algoritma. / pengaruhnya. / dampaknya.”
- Focus: algorithmic ethics, cognitive resilience, strategic studies; city and citizen images supply the human context.
- All navigation stays within the institutional profile. No chatbot, submission forms, analytics, backend, or external contact endpoints.
- Motion pause control stops the hero rotation and ambient dots. Reduced-motion preference starts with motion paused; the user can explicitly enable it.
- Visible focus, semantic headings, mobile language selector, skip link, image alternative text, and no horizontal overflow.

## Image assets

`assets/imagegen-prompts.json` records exact built-in ImageGen prompts. City/community scenes are illustrative; a short footer note makes this clear. The logo was extracted with ImageGen from the supplied slide, since no standalone original logo file was present.
