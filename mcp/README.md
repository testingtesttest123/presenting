# MCP servers

Technical talk with 28 spoken slides, a discussion slide and 15 reference slides. Speaker timing is 45 minutes plus 10–15 minutes of discussion.

## Files

- `content.json`: all 44 slides, speaker notes and primary-source URLs. Content matches the private Spaces presentation at saved sequence 15, including expanded explanations of the 2025–2026 changes.
- `build.mjs`: editable presentation authoring code. Includes six native diagrams for the VS Code host, Copilot tool calls, separate authorization relationships, provider OAuth, token exchange and service authority.
- `mcp-servers.pptx`: generated editable PowerPoint. It contains 44 slides and 44 notes parts. This is a rebuild, not a byte-identical export of the Spaces document. Some generic list/table layouts differ. The Spaces deck was visually checked. The actual rebuilt PPTX passed ZIP and slide/notes-count checks, then was converted through LibreOffice Impress to PDF. Exported slides 3, 5, 16, 19, 23, 34 and 43 were visually inspected: diagrams, dense tables and the JSON example were readable without clipping. This is sampled verification of 7 of 44 exported slides, not a full Microsoft PowerPoint check. Preview the whole deck before presenting.

## Build

Requires Node.js and `@oai/artifact-tool` 2.8.94. This package was available in the authoring environment. It is private and this repository does not assume public npm installation is available.

With the package available to Node:

```sh
node build.mjs mcp-servers.pptx
```

Alternatively set `ARTIFACT_TOOL_MODULE` to the absolute path of its `dist/artifact_tool.mjs` entry point.

No external image assets, credentials or service calls are required to generate the deck. All diagrams remain editable native objects. The JSON content can also be used independently of this rendering package.

## Scope

The normative protocol discussion is pinned to MCP 2026-07-28, compared with 2025-11-25. Product behavior and downstream authorization patterns have separate sources. The VS Code example does not assert current support for every July 2026 protocol feature. OAuth protecting the MCP endpoint and authorization to a backing API are separate relationships.

Sources were checked on 2026-10-21. Recheck current protocol and product versions before a later delivery. Examples are illustrative, not captured traffic or a live integration test.

`speaker-notes.md` is a readable transcript of all notes; `slides.md` contains slide text and table values. Six editable diagrams are defined in `build.mjs`; they are not blank slides in the rebuilt deck.

## Original editable presentation

[Open the original ChatGPT Space](https://chatgpt.com/space/page_659847ea900c8191b46940bac08556e2). This private link retains its existing access controls.
