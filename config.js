/* =====================================================================
   YOUR DECK + YOUR NOTES  -  this is the only file you need to edit.

   • deckUrl : path (or URL) to your HTML slide deck.
   • slides  : one entry per slide, in order.
       n     : the number shown on the slide (optional; defaults to order)
       title : short label shown in the console header
       time  : optional timing badge, e.g. "~2 min"
       notes : your speaker notes. Formatting:
                 - a line wholly in [brackets] = a dim cue (not spoken)
                 - **double asterisks** = emphasis (highlighted)
                 - blank lines = spacing
   ===================================================================== */
window.PRESENTER = {
  deckUrl: "example/deck.html",

  // theme: {                          // OPTIONAL - delete this block for the default (dark) look.
  //   mode: "dark",                   //   "dark" | "light" | "auto" (auto follows the OS).
  //   colors: { accent: "#f2c230" }   //   override any of: bg, panel, surface, accent, onAccent,
  // },                                //   text, ink, muted, cue, teal, line. (The console is your
  //                                   //   off-camera teleprompter - readability beats brand-matching.)

  slides: [
    {
      n: 1,
      title: "Welcome",
      time: "~1 min",
      notes:
`[NOTE: this is the example. Replace deckUrl and these slides in config.js.]

"Welcome, everyone. Thanks for being here."

[smile, wait for the room to settle]

This is your speaker-notes area. Click **Advance** below (or press Space / →) and the deck window moves with you.`
    },
    {
      n: 2,
      title: "The idea",
      time: "~2 min",
      notes:
`"Here's the one idea I want you to leave with."

**This bold line is the thing to land.**

[pause]

Everything in brackets is just for you - it never gets spoken.`
    },
    {
      n: 3,
      title: "Wrap up",
      time: "~1 min",
      notes:
`"That's it - thank you."

[advance to the closing slide and stop]

When you're done, swap this file's contents for your own deck and notes.`
    }
  ]
};
