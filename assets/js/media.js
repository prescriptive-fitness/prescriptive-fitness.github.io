/* ============================================================
   PRESCRIPTIVE FITNESS · MEDIA
   This is the only file you edit to put photos and video on the site.

   Paste a link between the quotes next to a slot name. Accepts:
     - YouTube:  https://www.youtube.com/watch?v=...  /  https://youtu.be/...  /  .../shorts/...
     - Vimeo:    https://vimeo.com/123456789
     - Your own video, uploaded into assets/video/:  "assets/video/hero.mp4"
     - A photo, uploaded into assets/img/:           "assets/img/paul.jpg"

   Leave it as "" and the slot shows a labelled grey placeholder.
   Own .mp4 files: 1080p H.264, keep each under ~20 MB (GitHub refuses anything over 100 MB).
   Hero videos play muted on a loop with no controls. Everything else gets play controls.
   ============================================================ */

window.PF_MEDIA = {

  /* ---- Logo ---- */
  "logo":              "",   // White-on-dark PF logo (PNG or SVG), e.g. "assets/img/logo.png". Empty = typed wordmark.

  /* ---- Home ---- */
  "home-hero":         "",   // Full-screen background · 16:9 · 15–30s silent loop of real sessions in the studio
  "home-founders":     "",   // Founders section · 3:2 · Paul & Sandy coaching clients in the studio (keep it about the studio, not their online brand)
  "home-private":      "",   // Program card · 3:2 · trainer + client, one-on-one
  "home-semi":         "",   // Program card · 3:2 · two clients training together
  "home-golf":         "",   // Program card · 3:2 · golf rotation / TPI screen
  "home-golf-band":    "",   // Golf band · 4:5 · golfer training, cable rotation or med ball
  "studio-01":         "",   // Studio gallery · large · wide shot of the full floor
  "studio-02":         "",   // Studio gallery · equipment detail
  "studio-03":         "",   // Studio gallery · showers / locker room
  "studio-04":         "",   // Studio gallery · coaching moment
  "studio-05":         "",   // Studio gallery · entrance / front desk

  /* ---- Team page (these portraits also fill the trainer grid on the home page) ---- */
  "team-hero":         "",   // Team page header · 16:9 · whole team or a coaching montage, silent loop
  "team-paul":         "",   // Team · 4:5 portrait
  "team-paul-video":   "",   // Team · 16:9 · Paul on his approach (optional)
  "team-sandy":        "",   // Team · 4:5 portrait
  "team-sandy-video":  "",   // Team · 16:9 · Sandy on her approach (optional)
  "team-marc":         "",   // Team · 4:5 portrait · Marc Arnone
  "team-schriffen":    "",   // Team · 4:5 portrait · Joe Schriffen
  "team-harrison":     "",   // Team · 4:5 portrait · Harrison Sklar
  "team-jackie":       "",   // Team · 4:5 portrait · Jackie John
  "team-matt":         "",   // Team · 4:5 portrait · Matt Vittorioso
  "team-jane":         "",   // Team · 4:5 portrait · Jane Hanisch
  "team-schuster":     "",   // Team · 4:5 portrait · Joe Schuster

  /* ---- Personal training page ---- */
  "training-hero":     "",   // Page header · 16:9 · one-on-one session, silent loop
  "training-private":  "",   // Private section · 4:5 · trainer cueing a client
  "training-semi":     "",   // Semi-private section · 4:5 · two clients, one trainer
  "training-session":  "",   // "What a session looks like" · 16:9 · walkthrough video (optional, with sound)

  /* ---- Golf page ---- */
  "golf-hero":         "",   // Page header · 16:9 · golf fitness session, silent loop
  "golf-assessment":   "",   // Assessment section · 9:16 · TPI screen being run (reel works)
  "golf-training":     "",   // Program section · 4:5 · rotational power / mobility work
  "golf-video":        "",   // Golf · 16:9 · Joe on what the program fixes (optional, with sound)

  /* ---- Book page ---- */
  "book-photo":        ""    // Book page · 4:5 · welcoming shot at the front of the studio
};

/* Custom thumbnails for YouTube slots (shown with the play button until clicked).
   Leave a slot out and it uses YouTube's own thumbnail. */
window.PF_POSTERS = {
  // "home-owners-video": "assets/img/owners-thumb.jpg"
};

/* ============================================================
   CLIENT STORIES (home page)
   Up to three. Each can have a vertical video, a quote, or both.
   Only use real clients, with their permission. Leave a story
   completely empty and it shows as a grey video placeholder.
   ============================================================ */
window.PF_STORIES = [
  { video: "", quote: "", name: "", detail: "" },   // e.g. detail: "Client since 2014 · golfer"
  { video: "", quote: "", name: "", detail: "" },
  { video: "", quote: "", name: "", detail: "" }
];
