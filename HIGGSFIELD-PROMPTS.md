# Higgsfield Prompt List — Abdullah Ademi | Systems Architect & Full-Stack Engineer

Generated following `memory/03-seamless-transitions.md`, `memory/06-higgsfield-pipeline.md`, and `templates/HIGGSFIELD-PROMPTS.template.md`.

Models used:
- **Text-to-Image (`gpt_image_2`)** — initial architectural concept keyframe (`K1`) and optional gallery backdrops.
- **Image-to-Image (`nano_banana_2`)** — identity-preserving transformation keyframes (`K2`–`K5`).
- **Image-to-Video (`seedance_2_0`)** — boundary-matched clips (`V1`–`V5`).
- **Background-Remove (`image_background_remover`)** — transparent hero cutout (`public/assets/product-cut.png`).

---

## 0 · Setup & Shared Spec

Pre-upload `K1` (and each verified keyframe) once to avoid transient re-fetch errors:
```bash
mkdir -p public/assets/seq-src public/assets/seq
higgsfield upload create public/assets/seq-src/k1.jpg --json
```

### Shared Visual & Edge Spec (paste into EVERY keyframe prompt)
> **Edge & Lighting Spec (Dark Luxury):**
> `Deep espresso near-black #0B0805 fading to pure black #070605 at every edge and corner, dramatic single warm raking gold light (#C2974A) and subtle ember rim light (#F97316), editorial luxury macro hardware photography, no text, no watermark.`

> **Identity Preservation Clause (paste into K2–K5):**
> `Keep the exact obsidian monolithic processor core proportions, chamfered geometry, and brushed gold metallurgy identical across every stage.`

---

## A · Transformation Film Keyframes (`K1` → `K5`) & Boundary-Matched Clips (`V1` → `V4`)

```
K1 ──V1──▶ K2 ──V2──▶ K3 ──V3──▶ K4 ──V4──▶ K5
(image)    (image)    (image)    (image)    (image)
each Vn: --start-image K(n)  --end-image K(n+1)
```

### Keyframes (`public/assets/seq-src/`)

1. **K1 — `public/assets/seq-src/k1.jpg`** (`gpt_image_2`, `16:9`, `resolution 2k`, `quality high`)
   - *Prompt:*
     `A precision-machined monolithic obsidian processor core floating centered in infinite dark void, subtle bevels and brushed dark titanium casing, faint hairline gold circuitry veins (#C2974A) just beginning to awaken across the dark matte surface. Deep espresso near-black #0B0805 fading to pure black #070605 at every edge and corner, dramatic single warm raking gold light (#C2974A) and subtle ember rim light (#F97316), editorial luxury macro hardware photography, no text, no watermark.`

2. **K2 — `public/assets/seq-src/k2.jpg`** (`nano_banana_2`, `--image <k1_id>`, `16:9`, `resolution 2k`)
   - *Prompt:*
     `From the reference obsidian monolith, the outer obsidian housing splits cleanly along precision-machined gold seams (#C2974A), revealing an illuminated inner matrix of glowing amber and optical fiber data pathways pulsing cleanly at its core (sub-80ms high-speed data metaphor). Keep the exact obsidian monolithic processor core proportions, chamfered geometry, and brushed gold metallurgy identical. Deep espresso near-black #0B0805 fading to pure black #070605 at every edge and corner, dramatic single warm raking gold light (#C2974A) and subtle ember rim light (#F97316), editorial luxury macro hardware photography, no text, no watermark.`

3. **K3 — `public/assets/seq-src/k3.jpg`** (`nano_banana_2`, `--image <k2_id>`, `16:9`, `resolution 2k`)
   - *Prompt:*
     `From the reference split-core monolith, four precision-crafted orbital satellite modules (obsidian cubes edged in brushed gold and sapphire glass representing distributed cloud compute, storage, database, and IAM security shields) lock symmetrically around the illuminated gold core, connected by crisp thin gold light beams. Keep the exact obsidian monolithic processor core proportions and brushed gold metallurgy identical. Deep espresso near-black #0B0805 fading to pure black #070605 at every edge and corner, dramatic single warm raking gold light (#C2974A) and subtle ember rim light (#F97316), editorial luxury macro hardware photography, no text, no watermark.`

4. **K4 — `public/assets/seq-src/k4.jpg`** (`nano_banana_2`, `--image <k3_id>`, `16:9`, `resolution 2k`)
   - *Prompt:*
     `From the reference orbital core assembly, the architectural processor core and its four synchronized modules settle into full equilibrium, encased inside a crystal-clear cylindrical sapphire glass enclosure framed by two thin brushed gold (#E5C178) precision telemetry rings. Keep the exact obsidian monolithic processor core proportions and brushed gold metallurgy identical. Deep espresso near-black #0B0805 fading to pure black #070605 at every edge and corner, dramatic single warm raking gold light (#C2974A) and subtle ember rim light (#F97316), editorial luxury macro hardware photography, no text, no watermark.`

5. **K5 — `public/assets/seq-src/k5.jpg`** (`nano_banana_2`, `--image <k4_id>`, `16:9`, `resolution 2k`)
   - *Prompt:*
     `Wide luxury gallery pullback of the exact reference sapphire-glass and brushed-gold obsidian architectural monolith, now resting majestically on a monolithic matte black obsidian museum pedestal under soft overhead raking warm gold spotlighting. Keep the exact monolith geometry unchanged. Deep espresso near-black #0B0805 fading to pure black #070605 at every edge and corner, dramatic single warm raking gold light (#C2974A) and subtle ember rim light (#F97316), editorial luxury macro hardware photography, no text, no watermark.`

> **Verify K1–K5 visually before generating clips:** confirm identical `#0B0805` edge tones, sharp silhouettes, zero stray text/watermarks, and smooth scale progression.

---

### Boundary-Matched Video Clips (`public/assets/v1.mp4` .. `v4.mp4`)

All clips use `seedance_2_0` with:
`--aspect_ratio 16:9 --resolution 1080p --duration 5 --bitrate_mode high --generate_audio false`

- **V1 — `public/assets/v1.mp4`** (`--start-image <k1_id> --end-image <k2_id>`)
  - *Prompt:* `Slow, ultra-smooth locked cinematic push-in; the obsidian monolithic processor core rotates 15 degrees as precision gold seams part smoothly to reveal the glowing optical fiber data pathways within. Slow motion, locked framing, no cuts, no flicker, no morphing artifacts.`

- **V2 — `public/assets/v2.mp4`** (`--start-image <k2_id> --end-image <k3_id>`)
  - *Prompt:* `Seamless slow-motion continuation from the split gold core; four dark obsidian and brushed-gold satellite modules emerge symmetrically from the shadow field and lock into orbital equilibrium linked by fine gold light vectors. Slow motion, locked framing, no cuts, no flicker, no morphing artifacts.`

- **V3 — `public/assets/v3.mp4`** (`--start-image <k3_id> --end-image <k4_id>`)
  - *Prompt:* `Seamless slow-motion assembly; precision brushed-gold telemetry rings glide smoothly into alignment as a crystal-clear sapphire glass cylinder seals around the synchronized core and modules in warm studio raking light. Slow motion, locked framing, no cuts, no flicker, no morphing artifacts.`

- **V4 — `public/assets/v4.mp4`** (`--start-image <k4_id> --end-image <k5_id>`)
  - *Prompt:* `Seamless slow-motion museum camera pullback; the finished sapphire-encased architectural monolith settles gracefully onto a dark obsidian pedestal bathed in warm gold gallery light. Slow motion, locked framing, no cuts, no flicker, no morphing artifacts.`

---

## B · Hero Cutout & Pinned CTA Loop

- **CUT — `public/assets/product-cut.png`** (`image_background_remover`, `--image <k4_id>`)
  - Produces the transparent background-removed PNG of `K4` for `#hero .media-tilt` and `.specular` mask (`-webkit-mask: url(assets/product-cut.png)`), avoiding `mix-blend-mode` stacking bugs under GSAP transforms.

- **V5 (Optional CTA Loop) — `public/assets/cta.mp4`** (`seedance_2_0`, `--start-image <k4_id> --end-image <k4_id>`, `--aspect_ratio 16:9 --resolution 1080p --duration 5 --bitrate_mode high --generate_audio false`)
  - *Prompt:* `Seamless 360-degree slow meditative rotation of the sapphire-glass and brushed-gold obsidian monolith in deep #080604 darkness with warm raking gold highlights and gentle ambient light reflections. Locked framing, no cuts, no flicker.`

---

## C · CLI Execution & Extraction Workflow

1. **Generate & Poll Safely (No `jq` Required):**
   ```bash
   higgsfield generate create nano_banana_2 --image "$K1_ID" --aspect_ratio 16:9 --resolution 2k \
     --prompt "..." --wait --wait-timeout 25m --json > k2.json

   URL=$(grep -oE '"result_url":[[:space:]]*"[^"]+"' k2.json | grep -oE 'https://[^"]+' | head -1)
   for d in 1 2 3; do curl -fsSL "$URL" -o public/assets/seq-src/k2.jpg && [ -s public/assets/seq-src/k2.jpg ] && break; sleep 3; done
   ```
   *(Wrap every generation in a 3–4× retry loop to recover from transient 502 or input-fetch errors.)*

2. **Extract 93 Seamless Scroll-Film Frames:**
   ```bash
   python scripts/extract_frames.py
   ```
   - Samples `24` frames per clip (`v1.mp4`–`v4.mp4`), resizes to `1280px` width at JPEG quality `80`, and drops the duplicated first frame of clips `2..4` (`24 × 4 - 3 = 93` frames: `public/assets/seq/f000.jpg` through `f092.jpg`).
   - Whenever `public/assets/seq/f000.jpg` is not yet generated, `ScrollFilmSection.tsx` automatically falls back to its 96-frame procedural isometric architectural renderer.

