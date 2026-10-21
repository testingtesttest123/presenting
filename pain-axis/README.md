# The Pain Axis: updated evidence and limits

Nine-slide technical briefing, about 13.5 minutes plus questions. Source baseline: arXiv:2609.16247v2, 25 September 2026, with an explicit comparison to v1.

## Files

- `content.json`: slide text, editable table values, speaker notes and source URLs. `savedNotes` preserves the exact notes read back from the reviewed presentation.
- `build.mjs`: editable 1280x720 layout using Artifact Tool. Arial, off-white background, navy text and native tables. No external assets.
- `check.mjs`: constructs the deck and verifies slide count and exact notes without exporting a file.
- `export.mjs`: optional local PowerPoint export.

## Reproduction

Requires Node.js and an existing authorized installation of `@oai/artifact-tool` 2.8.94. No dependency installation is part of these scripts. Make that package available to Node module resolution, then run:

```sh
node check.mjs
node export.mjs pain-axis-v2.pptx
```

The export command refuses to overwrite an existing file. Render and inspect a local export before distribution. The included `pain-axis-v2.pptx` was rebuilt locally. ZIP integrity passed, and it contains nine slide XML files and nine speaker-note XML files. This local PowerPoint export has structural verification only. Its rendered appearance has not been checked; the separate Spaces original was visually checked.

`buildPainDeck(presentation, data)` also supports a new Spaces presentation with one blank slide. Invoke it in an Artifact Tool callback with the parsed `content.json`. Do not run it on an existing populated presentation.

## Verification

The original private Spaces presentation was saved at sequence 3 with nine slides. All changed slides were rendered and inspected after the activation-steering addition. An independent reviewer checked the claims against the paper. The local authoring module constructs nine slides and reproduces the saved speaker notes. The paper's experiments were not independently reproduced.

The presentation distinguishes generated choices from actual harmful actions, activation steering from fine-tuning, and behavioral evidence from claims about subjective experience. It preserves the v2 controls that weaken the relief-seeking interpretation.

## Sources

Primary sources and section links are included in each slide's notes. The source paper is available at https://arxiv.org/abs/2609.16247 and https://arxiv.org/html/2609.16247v2 . No paper figures or model artifacts are bundled.

## Original editable presentation

[Open the original ChatGPT Space](https://chatgpt.com/space/page_622a17776f988191aeaada8294a5523d). This private link retains its existing access controls.

`speaker-notes.md` is a readable transcript of all notes; `slides.md` contains slide text and table values.
