# pritik_sys — personal site

A static, no-framework portfolio site for an ML systems / distributed training
engineer. Plain HTML/CSS/JS — no build step, no dependencies.

## Structure

```
.
├── index.html      # all page content/sections
├── style.css       # design tokens + layout + animation
├── script.js       # hero terminal typewriter, metric counters, scroll reveals
└── assets/         # put a resume PDF, favicon, or og-image here if you want one
```

## Run it locally

Just open `index.html` in a browser — no server required. If you want a local
dev server (recommended, since some browsers restrict local file access):

```bash
python3 -m http.server 8000
# then visit http://localhost:8000
```

## Before you publish — things to edit

1. **Contact info** — `index.html`, `#contact` section and footer:
   - `mailto:youremail@example.com` → your real email
   - LinkedIn URL placeholder → your real profile
2. **GitHub username** — nav/hero links currently point to
   `github.com/Pritiks23`; update if it changes.
3. **Favicon / meta image** — add a file to `assets/` and reference it in the
   `<head>` of `index.html` if you want a tab icon or social preview card.
4. **Resume** — drop a PDF into `assets/` and link it from the hero or contact
   section if you want a direct download button.

## Deploying

This is a static site, so any of these work with zero config:

- **GitHub Pages**: push this repo, enable Pages on the `main` branch.
- **Netlify / Vercel**: drag-and-drop the folder or connect the repo — no
  build command needed, "publish directory" is `.`.

## Design notes

- **Palette**: near-black background with amber (`#f4b860`) as the primary
  signature accent and cool blue (`#5fb3d9`) for anything representing
  data/network flow — a nod to GPU telemetry dashboards rather than a generic
  neon-on-black theme. Green/red are reserved for status states (converged /
  incident).
- **Type**: JetBrains Mono for headings, labels, and anything "data" (metrics,
  status tags); IBM Plex Sans for body copy, so long paragraphs stay readable.
- **Signature element**: the hero terminal literally replays your DDP training
  run — the loss/accuracy/throughput numbers animate from your first-epoch
  values to your final ones, and the two "rank" dots pulse in sync to suggest
  an NCCL all-reduce. It's built from your own project data rather than a
  decorative animation.
- **Motion**: one orchestrated sequence on load (the terminal), scroll reveals
  on project cards, and a couple of ambient pulses — everything respects
  `prefers-reduced-motion`.

## Extending

- To add a 4th project, copy one `<article class="project reveal">` block in
  `index.html` and update the tag/status/metrics/chips/link.
- To swap the accent color, change `--amber` and `--blue` in `:root` at the
  top of `style.css` — everything else derives from those two variables.
