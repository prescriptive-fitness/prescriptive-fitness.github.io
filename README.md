# prescriptivefitness.com

Static site for Prescriptive Fitness (SouthPark, Charlotte). Plain HTML/CSS/JS, no build step. Hosted on GitHub Pages.

- `index.html`, `team.html`, `personal-training.html`, `golf.html`, `start.html`: the pages
- `assets/js/media.js`: **the only file to edit to add photos and video.** Paste YouTube/Vimeo links or `assets/img/...` / `assets/video/...` paths. Client stories (video + quote) are at the bottom of the same file.
- `assets/img/`, `assets/video/`: drop photos and compressed .mp4 files here (keep each video under ~20 MB; GitHub rejects files over 100 MB)
- `assets/css/site.css`: styles. Colours are tokens at the top (PF red `#E62129`, black `#0B0B0C`)
- `assets/js/site.js`: media loader, mobile menu, consultation form. Set `FORM_ENDPOINT` to a Formspree URL to have the form email the studio directly.
- `meet-the-team/`, `personal-training/`, `tpi-certified-golf-training/`, `contact-us/`, `register-today/`: forward the old WordPress URLs to the new pages so existing links and Google results keep working.

Fonts: Archivo and Inter, self-hosted under the SIL Open Font License (see `assets/fonts/`).
