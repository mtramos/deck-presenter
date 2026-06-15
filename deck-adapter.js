/* =====================================================================
   DECK ADAPTER  -  drop this into your own HTML slide deck so the
   Presenter Console can advance it and stay in sync.

   Add to your deck's <head> or before </body>:
       <script src="deck-adapter.js"></script>

   TWO LEVELS OF INTEGRATION
   -------------------------
   1) Zero-touch (any deck that advances on the arrow keys):
      just include this file. The console's Advance/Back will fire
      ArrowRight / ArrowLeft for you. Works with most decks.

   2) Full sync (exact "go to slide N" + the console follows you):
      expose a tiny API on your deck and the adapter will use it:

        window.deckAPI = {
          next()        { ... },          // advance one
          prev()        { ... },          // back one
          goto(i)       { ... },          // jump to 0-based index i
          get index()   { return current; },   // 0-based current slide
          get total()   { return count; }      // total slides
        };

      Call window.deckReport() whenever the slide changes (e.g. via
      your own arrow-key handler) so the console stays in lockstep.
   ===================================================================== */
(function () {
  var idx = 0;
  var total = (typeof window.DECK_TOTAL === "number") ? window.DECK_TOTAL : null;

  function api() { return window.deckAPI || null; }

  function snapshot() {
    var a = api();
    if (a) {
      if (typeof a.index === "number") idx = a.index;
      if (typeof a.total === "number") total = a.total;
    }
  }

  function report() {
    snapshot();
    try {
      if (window.opener && !window.opener.closed) {
        window.opener.postMessage({ source: "presenter-deck", index: idx, total: total }, "*");
      }
    } catch (e) {}
  }
  // expose so a deck's own nav handler can report position changes
  window.deckReport = report;

  function fireKey(key) {
    var ev = new KeyboardEvent("keydown", { key: key, bubbles: true });
    document.dispatchEvent(ev);
    window.dispatchEvent(ev);
  }

  function act(action, index) {
    var a = api();
    if (a) {
      if (action === "next" && a.next) a.next();
      else if (action === "prev" && a.prev) a.prev();
      else if (action === "goto" && a.goto && typeof index === "number") a.goto(index);
    } else {
      if (action === "next") { idx = (total ? Math.min(total - 1, idx + 1) : idx + 1); fireKey("ArrowRight"); }
      else if (action === "prev") { idx = Math.max(0, idx - 1); fireKey("ArrowLeft"); }
      else if (action === "goto" && typeof index === "number") {
        while (idx < index) { idx++; fireKey("ArrowRight"); }
        while (idx > index) { idx--; fireKey("ArrowLeft"); }
      }
    }
    report();
  }

  window.addEventListener("message", function (e) {
    var d = e.data || {};
    if (d.source !== "presenter-console") return;
    if (d.action === "ping") { report(); return; }
    act(d.action, d.index);
  });

  window.addEventListener("load", report);
  report(); // announce to the console that the deck is live
})();
