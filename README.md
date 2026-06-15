# Presenter Console

A tiny, dependency-free **presenter view for any HTML slide deck**. Put your slides
full-screen on one monitor and your **speaker notes + a big Advance button** on
another. Click (or press Space) to move the deck - the notes and the slides stay
in sync. No build step, no framework, no server: it's plain HTML/JS.

It works with whatever deck you already have. Bring your own `deck.html`; the
console drives it through the browser's `postMessage`.

---

## Quick start

1. **Copy these files** next to your deck: `presenter.html`, `config.js`, and
   (optional, for control) `deck-adapter.js`.
2. **Edit `config.js`** - set `deckUrl` to your deck and fill in `slides` with
   your notes. That's the only file you edit.
3. **(Optional) connect your deck** so the buttons can drive it - add one line to
   your deck:
   ```html
   <script src="deck-adapter.js"></script>
   ```
4. **Open `presenter.html`** on your off-camera screen → click **Open deck ↗** →
   drag the deck window to your presentation screen and full-screen it → present.

A working demo is in [`example/`](example/deck.html) - open `presenter.html`
as-is (the default `config.js` points at it) and try the Advance button.

---

## The two-screen setup

- **`presenter.html`** → the screen only you see (laptop). Shows the current
  slide's notes, a slide counter, a "Next up →" peek, and **Back / Advance**.
- **Your deck window** → the screen the audience sees. Full-screen it (`F11`).

Controls: **Advance / Back** buttons, or **Space / → / ←**, or **Home / End**.
If you ever navigate on the deck itself, the console follows along (when the
adapter is installed).

---

## Connecting your deck - two levels

**1. Zero-touch** - if your deck already advances on the **arrow keys** (most do,
including reveal.js and exported decks), just include `deck-adapter.js`. The
console's Advance/Back will fire the arrow keys for you.

**2. Full sync** - for exact "jump to slide N" and two-way tracking, expose a
small API on your deck and the adapter uses it automatically:

```js
window.deckAPI = {
  next()      { /* advance one */ },
  prev()      { /* back one    */ },
  goto(i)     { /* jump to 0-based index i */ },
  get index() { return current; },  // 0-based current slide
  get total() { return count; }     // total number of slides
};
// call window.deckReport() whenever your slide changes
```

See [`example/deck.html`](example/deck.html) for a complete `deckAPI` example.

---

## Writing notes (`config.js`)

```js
window.PRESENTER = {
  deckUrl: "my-deck.html",
  slides: [
    { n: 1, title: "Intro", time: "~1 min", notes:
`"What you actually say goes in quotes."

[bracketed lines are dim cues - for your eyes, not spoken]

**double asterisks = emphasis** (highlighted on screen)` },

    { n: 2, title: "Next point", notes: `...` }
  ]
};
```

| Field   | Purpose                                              |
|---------|------------------------------------------------------|
| `n`     | number shown for the slide (optional)                |
| `title` | short label in the console header                    |
| `time`  | optional timing badge, e.g. `~2 min`                 |
| `notes` | your notes - `[brackets]` = cue, `**bold**` = emphasis |

---

## Theming (optional)

The console is your **off-camera** teleprompter, so the default is a dark,
high-contrast theme tuned for glancing at notes in a dim room - it doesn't try to
match your deck (no one but you sees it). If you want to change it anyway, add an
optional `theme` block to `config.js`:

```js
window.PRESENTER = {
  deckUrl: "my-deck.html",
  theme: {
    mode: "auto",                    // "dark" (default) | "light" | "auto" (follow the OS)
    colors: { accent: "#e0457b" }    // override any of: bg, panel, surface, accent,
  },                                 // onAccent, text, ink, muted, cue, teal, line
  slides: [ /* ... */ ]
};
```

Both keys are optional - `mode` alone gives you light/dark; `colors` overrides
just the variables you name. Omit `theme` entirely for the default.

---

## Files

| File              | What it is                                             |
|-------------------|--------------------------------------------------------|
| `presenter.html`  | the console (engine - you don't edit this)             |
| `config.js`       | **your** deck URL + notes (the only file you edit)     |
| `deck-adapter.js` | drop into your deck so the console can drive it         |
| `example/`        | a 3-slide demo deck wired up and ready                  |

---

## Notes & limits

- Pop-ups must be allowed for the console page (one-time browser prompt) so it
  can open the deck window.
- Opening from `file://` works in current browsers; if yours is strict about
  local files, serve the folder over any static server.
- Everything is local - no analytics, no network calls, no dependencies.

## License

MIT - see [LICENSE](LICENSE).
