import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const SEQ_FILE_COUNT = 93;
const PROCEDURAL_FRAME_COUNT = 96;
const FRAME_W = 1280;
const FRAME_H = 720;

interface FilmActCaption {
  index: string;
  eyebrow: string;
  title: string;
  metric: string;
  detail: string;
  a: number;
  b: number;
}

const FILM_CAPTIONS: FilmActCaption[] = [
  {
    index: "ACT I",
    eyebrow: "0.00 — 0.24 · EDGE & IDENTITY GATE",
    title: "Zero-Trust Request Ingress",
    metric: "OAuth · Sanctum · AWS IAM",
    detail:
      "Every incoming client request passes through cryptographic token verification and fine-grained IAM role-based access control.",
    a: 0.0,
    b: 0.24,
  },
  {
    index: "ACT II",
    eyebrow: "0.25 — 0.52 · INDEXED DATA ENGINE",
    title: "Sub-80ms Query Velocity",
    metric: "<80ms Search Latency",
    detail:
      "Composite SQL schema indexing across MySQL & PostgreSQL paired with hot Redis memory caches eliminates read bottlenecks.",
    a: 0.25,
    b: 0.52,
  },
  {
    index: "ACT III",
    eyebrow: "0.53 — 0.78 · CLOUD & WEBHOOK MESH",
    title: "Autonomous Orchestration",
    metric: "EC2 · RDS · S3 · Docker",
    detail:
      "Containerized Laravel and Node.js workers synchronize direct S3 media pipelines, RDS persistence, and real-time webhook streams.",
    a: 0.53,
    b: 0.78,
  },
  {
    index: "ACT IV",
    eyebrow: "0.79 — 1.00 · ECOSYSTEM CONSTELLATION",
    title: "Unified Production Scale",
    metric: "10+ Apps · 99.9% Uptime",
    detail:
      "Interconnected Web, Android, and iOS platforms running in continuous high-availability harmony at Doing Platform.",
    a: 0.79,
    b: 1.0,
  },
];

const clamp = (v: number, a: number, b: number) => Math.max(a, Math.min(b, v));

const smoothstep = (e0: number, e1: number, x: number) => {
  if (e1 === e0) return x >= e1 ? 1 : 0;
  const t = clamp((x - e0) / (e1 - e0), 0, 1);
  return t * t * (3 - 2 * t);
};

/**
 * Renders one luxury 3D isometric architectural frame (1280x720) for progress `p` in [0, 1].
 */
function renderProceduralFrame(
  ctx: CanvasRenderingContext2D,
  frameIdx: number,
  totalFrames: number,
) {
  const p = totalFrames > 1 ? frameIdx / (totalFrames - 1) : 1;
  const w = FRAME_W;
  const h = FRAME_H;
  const cx = w * 0.48;
  const cy = h * 0.46;

  // Seamless dark espresso ground matching #0B0805
  ctx.fillStyle = "#0B0805";
  ctx.fillRect(0, 0, w, h);

  // Subtle ambient warm core glow
  const act2 = smoothstep(0.2, 0.45, p);
  const act3 = smoothstep(0.48, 0.74, p);
  const act4 = smoothstep(0.75, 0.96, p);

  const bgGrad = ctx.createRadialGradient(
    cx,
    cy,
    20,
    cx,
    cy,
    460 + act4 * 140,
  );
  bgGrad.addColorStop(0, `rgba(229, 193, 120, ${0.14 + act4 * 0.08})`);
  bgGrad.addColorStop(0.45, `rgba(194, 151, 74, ${0.06 + act3 * 0.05})`);
  bgGrad.addColorStop(0.75, "rgba(249, 115, 22, 0.025)");
  bgGrad.addColorStop(1, "rgba(11, 8, 5, 0)");
  ctx.fillStyle = bgGrad;
  ctx.fillRect(0, 0, w, h);

  // Camera zoom / rotation interpolation across the 4 acts
  const camRot = p * Math.PI * 0.45 - 0.35;
  const camTilt = 0.56 - act4 * 0.08;
  const scale = 1 + Math.sin(p * Math.PI) * 0.14;

  const iso = (x: number, y: number, z: number): [number, number] => {
    const cosR = Math.cos(camRot);
    const sinR = Math.sin(camRot);
    const rx = x * cosR - z * sinR;
    const rz = x * sinR + z * cosR;
    const px = cx + rx * scale;
    const py = cy + (rz * camTilt - y) * scale;
    return [px, py];
  };

  // Isometric architectural floor grid (fades in smoothly in Act I -> IV)
  ctx.save();
  ctx.strokeStyle = `rgba(194, 151, 74, ${0.07 + act2 * 0.05})`;
  ctx.lineWidth = 1;
  const gridSpan = 280;
  const step = 40;
  for (let g = -gridSpan; g <= gridSpan; g += step) {
    const [x1, y1] = iso(g, -90, -gridSpan);
    const [x2, y2] = iso(g, -90, gridSpan);
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();

    const [x3, y3] = iso(-gridSpan, -90, g);
    const [x4, y4] = iso(gridSpan, -90, g);
    ctx.beginPath();
    ctx.moveTo(x3, y3);
    ctx.lineTo(x4, y4);
    ctx.stroke();
  }
  ctx.restore();

  // Helper to draw an isometric 3D brushed-gold / obsidian slab
  const drawIsoBox = (
    bx: number,
    by: number,
    bz: number,
    bw: number,
    bh: number,
    bd: number,
    alpha: number,
    accent = false,
  ) => {
    if (alpha <= 0.01) return;
    const hw = bw / 2;
    const hh = bh / 2;
    const hd = bd / 2;

    const p000 = iso(bx - hw, by - hh, bz - hd);
    const p100 = iso(bx + hw, by - hh, bz - hd);
    const p110 = iso(bx + hw, by + hh, bz - hd);
    const p010 = iso(bx - hw, by + hh, bz - hd);

    const p001 = iso(bx - hw, by - hh, bz + hd);
    const p101 = iso(bx + hw, by - hh, bz + hd);
    const p111 = iso(bx + hw, by + hh, bz + hd);
    const p011 = iso(bx - hw, by + hh, bz + hd);

    ctx.save();
    ctx.globalAlpha = alpha;

    // Top face
    ctx.beginPath();
    ctx.moveTo(p010[0], p010[1]);
    ctx.lineTo(p110[0], p110[1]);
    ctx.lineTo(p111[0], p111[1]);
    ctx.lineTo(p011[0], p011[1]);
    ctx.closePath();
    ctx.fillStyle = accent
      ? "rgba(229, 193, 120, 0.14)"
      : "rgba(18, 14, 10, 0.92)";
    ctx.fill();
    ctx.strokeStyle = accent
      ? "rgba(229, 193, 120, 0.85)"
      : "rgba(194, 151, 74, 0.52)";
    ctx.lineWidth = accent ? 1.4 : 1;
    ctx.stroke();

    // Wireframe vertical & bottom edges
    const edges: [[number, number], [number, number]][] = [
      [p000, p100],
      [p100, p101],
      [p101, p001],
      [p001, p000],
      [p000, p010],
      [p100, p110],
      [p101, p111],
      [p001, p011],
    ];
    ctx.beginPath();
    for (const [a, b] of edges) {
      ctx.moveTo(a[0], a[1]);
      ctx.lineTo(b[0], b[1]);
    }
    ctx.strokeStyle = accent
      ? "rgba(249, 115, 22, 0.55)"
      : "rgba(194, 151, 74, 0.28)";
    ctx.lineWidth = 0.9;
    ctx.stroke();
    ctx.restore();
  };

  // ACT I (0.00 - 0.24): Incoming Request Packet + OAuth/Sanctum/IAM Cryptographic Rings
  const packetProgress = smoothstep(0.0, 0.24, p);
  const packetX = -260 + packetProgress * 260;
  const packetY = 110 - packetProgress * 110;
  const [px, py] = iso(packetX, packetY, 0);

  // Incoming light trail
  const trailAlpha = (1 - act3 * 0.65) * 0.9;
  if (trailAlpha > 0.02) {
    const [tx0, ty0] = iso(-280, 120, 0);
    const trailGrad = ctx.createLinearGradient(tx0, ty0, px, py);
    trailGrad.addColorStop(0, "rgba(249, 115, 22, 0)");
    trailGrad.addColorStop(0.6, "rgba(194, 151, 74, 0.45)");
    trailGrad.addColorStop(1, "rgba(229, 193, 120, 0.95)");
    ctx.strokeStyle = trailGrad;
    ctx.lineWidth = 2.2;
    ctx.beginPath();
    ctx.moveTo(tx0, ty0);
    ctx.lineTo(px, py);
    ctx.stroke();
  }

  // Cryptographic security rings around the core
  const ringOpacity = smoothstep(0.04, 0.2, p);
  if (ringOpacity > 0.01) {
    ctx.save();
    for (let r = 0; r < 3; r++) {
      const radius = 78 + r * 32;
      const segments = 48;
      ctx.beginPath();
      for (let s = 0; s <= segments; s++) {
        const ang = (s / segments) * Math.PI * 2 + p * (r % 2 === 0 ? 2.4 : -1.8);
        const [rx, ry] = iso(
          Math.cos(ang) * radius,
          (r - 1) * 18,
          Math.sin(ang) * radius,
        );
        if (s === 0) ctx.moveTo(rx, ry);
        else ctx.lineTo(rx, ry);
      }
      ctx.strokeStyle =
        r === 1
          ? `rgba(249, 115, 22, ${0.42 * ringOpacity})`
          : `rgba(229, 193, 120, ${0.38 * ringOpacity})`;
      ctx.lineWidth = r === 0 ? 1.4 : 1;
      ctx.setLineDash(r === 2 ? [5, 7] : []);
      ctx.stroke();
    }
    ctx.restore();
  }

  // Central Obsidian & Gold Kernel Core
  drawIsoBox(0, 0, 0, 74, 38, 74, 0.4 + smoothstep(0.05, 0.25, p) * 0.6, true);

  // ACT II (0.25 - 0.52): Redis Cache & MySQL/PostgreSQL Indexed Nodes
  const dataNodes = [
    { x: -115, y: 12, z: -90, label: "REDIS CACHE", accent: true },
    { x: 115, y: 12, z: -90, label: "MYSQL RDS", accent: false },
    { x: 0, y: -22, z: 125, label: "POSTGRESQL", accent: false },
  ];

  if (act2 > 0.02) {
    for (let i = 0; i < dataNodes.length; i++) {
      const node = dataNodes[i];
      const lift = (1 - act2) * 35;
      drawIsoBox(
        node.x * act2,
        node.y - lift,
        node.z * act2,
        66,
        24,
        66,
        act2,
        node.accent,
      );

      // High-speed query vectors pulsing between core and cache/DB
      const [c0x, c0y] = iso(0, 0, 0);
      const [nx, ny] = iso(node.x * act2, node.y - lift, node.z * act2);
      ctx.save();
      ctx.strokeStyle = `rgba(229, 193, 120, ${0.5 * act2})`;
      ctx.lineWidth = 1.3;
      ctx.beginPath();
      ctx.moveTo(c0x, c0y);
      ctx.lineTo(nx, ny);
      ctx.stroke();

      // Animated data pulse dot along vector
      const tPulse = ((p * 8 + i * 0.33) % 1 + 1) % 1;
      const dotX = c0x + (nx - c0x) * tPulse;
      const dotY = c0y + (ny - c0y) * tPulse;
      ctx.fillStyle = "#F97316";
      ctx.beginPath();
      ctx.arc(dotX, dotY, 3.2 * act2, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }
  }

  // ACT III (0.53 - 0.78): AWS EC2, S3, Docker & Webhook Orbitals
  const cloudNodes = [
    { x: -175, y: 65, z: 60, label: "AWS EC2" },
    { x: 175, y: 65, z: 60, label: "AWS S3" },
    { x: -140, y: 80, z: -145, label: "DOCKER / PM2" },
    { x: 140, y: 80, z: -145, label: "WEBHOOK BUS" },
  ];

  if (act3 > 0.02) {
    for (let i = 0; i < cloudNodes.length; i++) {
      const n = cloudNodes[i];
      const orbitAngle = (p - 0.5) * 1.4;
      const ox = n.x * Math.cos(orbitAngle * 0.25) - n.z * Math.sin(orbitAngle * 0.25);
      const oz = n.x * Math.sin(orbitAngle * 0.25) + n.z * Math.cos(orbitAngle * 0.25);

      drawIsoBox(ox, n.y * act3, oz, 58, 20, 58, act3, i % 2 === 1);

      const [c0x, c0y] = iso(0, 10, 0);
      const [nx, ny] = iso(ox, n.y * act3, oz);
      ctx.save();
      ctx.strokeStyle = `rgba(249, 115, 22, ${0.42 * act3})`;
      ctx.setLineDash([4, 5]);
      ctx.lineWidth = 1.1;
      ctx.beginPath();
      ctx.moveTo(c0x, c0y);
      ctx.lineTo(nx, ny);
      ctx.stroke();
      ctx.restore();
    }
  }

  // ACT IV (0.79 - 1.00): Unified Ecosystem Constellation (Web + Android + iOS)
  if (act4 > 0.02) {
    const endpoints = [
      { x: -210, y: 125, z: 0, label: "NEXT.JS / REACT / VUE" },
      { x: 0, y: 145, z: 160, label: "ANDROID PLAY STORE" },
      { x: 210, y: 125, z: 0, label: "APPLE APP STORE" },
    ];

    // Outer constellation ring
    ctx.save();
    ctx.beginPath();
    const segs = 64;
    for (let s = 0; s <= segs; s++) {
      const ang = (s / segs) * Math.PI * 2;
      const [rx, ry] = iso(Math.cos(ang) * 235, 115, Math.sin(ang) * 235);
      if (s === 0) ctx.moveTo(rx, ry);
      else ctx.lineTo(rx, ry);
    }
    ctx.strokeStyle = `rgba(229, 193, 120, ${0.42 * act4})`;
    ctx.lineWidth = 1.2;
    ctx.stroke();
    ctx.restore();

    for (const ep of endpoints) {
      drawIsoBox(ep.x, ep.y, ep.z, 76, 14, 48, act4, true);
      const [c0x, c0y] = iso(0, 20, 0);
      const [ex, ey] = iso(ep.x, ep.y, ep.z);
      ctx.save();
      ctx.strokeStyle = `rgba(229, 193, 120, ${0.65 * act4})`;
      ctx.lineWidth = 1.4;
      ctx.beginPath();
      ctx.moveTo(c0x, c0y);
      ctx.lineTo(ex, ey);
      ctx.stroke();
      ctx.restore();
    }
  }

  // Glowing packet / core spark
  ctx.save();
  const sparkGrad = ctx.createRadialGradient(px, py, 1, px, py, 16);
  sparkGrad.addColorStop(0, "#FBF8F2");
  sparkGrad.addColorStop(0.35, "#E5C178");
  sparkGrad.addColorStop(0.7, "rgba(249, 115, 22, 0.55)");
  sparkGrad.addColorStop(1, "rgba(249, 115, 22, 0)");
  ctx.fillStyle = sparkGrad;
  ctx.beginPath();
  ctx.arc(px, py, 16, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();
}

export function ScrollFilmSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const loaderRef = useRef<HTMLDivElement>(null);
  const stageHudRef = useRef<HTMLDivElement>(null);
  const frameHudRef = useRef<HTMLDivElement>(null);
  const capRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const section = sectionRef.current;
    const stage = stageRef.current;
    const canvas = canvasRef.current;
    if (!section || !stage || !canvas) return;

    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    let cancelled = false;
    let ready = false;
    let cur = -1;
    let lastIdx = 0;
    let totalFrames = PROCEDURAL_FRAME_COUNT;
    let frames: (HTMLImageElement | HTMLCanvasElement | undefined)[] = [];
    let filmST: ScrollTrigger | null = null;
    let bakeTimer: number | null = null;
    let safetyTimer: number | null = null;

    const progIdx = () =>
      filmST
        ? Math.round(clamp(filmST.progress, 0, 1) * (totalFrames - 1))
        : 0;

    const updateCaps = (p: number) => {
      FILM_CAPTIONS.forEach((cap, idx) => {
        const el = capRefs.current[idx];
        if (!el) return;
        if (reduceMotion) {
          el.style.opacity = idx === FILM_CAPTIONS.length - 1 ? "1" : "0";
          el.style.transform = "translateY(0px)";
          return;
        }
        const mid = (cap.a + cap.b) / 2;
        const fadeIn = smoothstep(cap.a, cap.a + (mid - cap.a) * 0.55, p);
        const fadeOut =
          cap.b >= 0.99
            ? 1
            : 1 - smoothstep(mid + (cap.b - mid) * 0.45, cap.b, p);
        const opacity = Math.max(0, Math.min(fadeIn, fadeOut));
        el.style.opacity = opacity.toFixed(3);
        el.style.transform = `translateY(${(14 * (1 - opacity)).toFixed(1)}px)`;
      });
    };

    const draw = (index: number) => {
      if (cancelled) return;
      const i = clamp(index, 0, totalFrames - 1);
      let frame = frames[i];
      if (!frame) {
        for (let d = 1; d < totalFrames; d++) {
          if (frames[i - d]) {
            frame = frames[i - d];
            break;
          }
          if (frames[i + d]) {
            frame = frames[i + d];
            break;
          }
        }
      }
      if (!frame) return;
      if (i === cur) return;
      cur = i;
      lastIdx = i;

      const cw = canvas.width;
      const ch = canvas.height;
      const iw =
        frame instanceof HTMLImageElement ? frame.naturalWidth : frame.width;
      const ih =
        frame instanceof HTMLImageElement ? frame.naturalHeight : frame.height;
      if (!iw || !ih) return;

      // Full-bleed cover on landscape; portrait-safe fit on narrow screens so architecture is never cropped
      const s =
        cw >= ch
          ? Math.max(cw / iw, ch / ih)
          : Math.min(cw / (iw * 0.56), ch / ih);
      const dw = iw * s;
      const dh = ih * s;

      ctx.fillStyle = "#0B0805";
      ctx.fillRect(0, 0, cw, ch);
      ctx.drawImage(frame, (cw - dw) / 2, (ch - dh) / 2, dw, dh);

      if (stageHudRef.current) {
        const progress = totalFrames > 1 ? i / (totalFrames - 1) : 1;
        stageHudRef.current.textContent =
          progress < 0.25
            ? "STAGE 01 // OAUTH · SANCTUM · AWS IAM"
            : progress < 0.53
              ? "STAGE 02 // REDIS CACHE · <80MS SQL INDEXING"
              : progress < 0.79
                ? "STAGE 03 // AWS EC2 · RDS · S3 · WEBHOOKS"
                : "STAGE 04 // 10+ PRODUCTION SYSTEMS · 99.9% UPTIME";
      }
      if (frameHudRef.current) {
        frameHudRef.current.textContent = `FRAME ${String(i + 1).padStart(3, "0")} / ${String(totalFrames).padStart(3, "0")}`;
      }
    };

    const resize = () => {
      const dpr = Math.min(2, window.devicePixelRatio || 1);
      const w = stage.clientWidth;
      const h = stage.clientHeight;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      cur = -1;
      if (ready) {
        draw(lastIdx);
      } else {
        ctx.fillStyle = "#0B0805";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }
    };

    resize();

    if (reduceMotion) {
      totalFrames = 1;
      const off = document.createElement("canvas");
      off.width = FRAME_W;
      off.height = FRAME_H;
      const octx = off.getContext("2d");
      if (octx) {
        renderProceduralFrame(octx, 95, 96);
        frames = [off];
      }
      ready = true;
      if (loaderRef.current) loaderRef.current.style.opacity = "0";
      draw(0);
      updateCaps(1);
      window.addEventListener("resize", resize, { passive: true });
      return () => {
        cancelled = true;
        window.removeEventListener("resize", resize);
      };
    }

    const markReady = () => {
      if (ready || cancelled) return;
      ready = true;
      if (loaderRef.current) {
        loaderRef.current.textContent = "… 100%";
        loaderRef.current.style.opacity = "0";
      }
      resize();
      draw(progIdx());
    };

    const startProceduralBake = () => {
      if (cancelled) return;
      totalFrames = PROCEDURAL_FRAME_COUNT;
      frames = new Array(totalFrames);
      let baked = 0;
      const BATCH_SIZE = 6;

      const bakeBatch = () => {
        if (cancelled) return;
        const end = Math.min(baked + BATCH_SIZE, totalFrames);
        for (let i = baked; i < end; i++) {
          const off = document.createElement("canvas");
          off.width = FRAME_W;
          off.height = FRAME_H;
          const octx = off.getContext("2d", { alpha: false });
          if (octx) {
            renderProceduralFrame(octx, i, totalFrames);
          }
          frames[i] = off;
        }
        baked = end;

        if (loaderRef.current && !ready) {
          const pct = Math.round((baked / totalFrames) * 100);
          loaderRef.current.textContent = `… ${pct}%`;
        }

        if (baked >= Math.ceil(totalFrames * 0.6) && !ready) {
          markReady();
        }

        if (baked < totalFrames) {
          bakeTimer = window.setTimeout(bakeBatch, 0);
        } else if (!ready) {
          markReady();
        }
      };

      bakeBatch();
    };

    const startImageSequenceLoad = (firstImg: HTMLImageElement) => {
      if (cancelled) return;
      totalFrames = SEQ_FILE_COUNT;
      frames = new Array(totalFrames);
      frames[0] = firstImg;
      let loaded = 1;
      let errored = 0;

      const checkReady = () => {
        if (cancelled || ready) return;
        const pct = Math.round((loaded / totalFrames) * 100);
        if (loaderRef.current) {
          loaderRef.current.textContent = `… ${pct}%`;
        }
        if (
          loaded + errored >= totalFrames ||
          loaded >= Math.ceil(totalFrames * 0.6)
        ) {
          if (loaded === 0) {
            startProceduralBake();
          } else {
            markReady();
          }
        }
      };

      for (let i = 1; i < totalFrames; i++) {
        const im = new Image();
        im.decoding = "async";
        im.onload = () => {
          frames[i] = im;
          loaded++;
          checkReady();
        };
        im.onerror = () => {
          errored++;
          checkReady();
        };
        im.src = `assets/seq/f${String(i).padStart(3, "0")}.jpg`;
      }
    };

    // Dual-mode probe: check if pre-rendered `assets/seq/f000.jpg` exists; otherwise bake 96 procedural frames
    const probe = new Image();
    probe.decoding = "async";
    probe.onload = () => {
      if (!cancelled) startImageSequenceLoad(probe);
    };
    probe.onerror = () => {
      if (!cancelled) startProceduralBake();
    };
    probe.src = "assets/seq/f000.jpg";

    safetyTimer = window.setTimeout(() => {
      if (!ready && !cancelled) {
        if (frames.some(Boolean)) {
          markReady();
        } else {
          startProceduralBake();
        }
      }
    }, 9000);

    filmST = ScrollTrigger.create({
      trigger: section,
      start: "top top",
      end: "bottom bottom",
      scrub: true,
      onUpdate: (self) => {
        const p = self.progress;
        if (ready) {
          draw(Math.round(p * (totalFrames - 1)));
        }
        updateCaps(p);
      },
    });

    updateCaps(0);
    window.addEventListener("resize", resize, { passive: true });

    return () => {
      cancelled = true;
      if (bakeTimer !== null) window.clearTimeout(bakeTimer);
      if (safetyTimer !== null) window.clearTimeout(safetyTimer);
      filmST?.kill();
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="film"
      data-ambient="#0B0805"
      data-glow="0.85"
      className="relative h-[600vh]"
    >
      <div
        ref={stageRef}
        className="stage sticky top-0 h-[100svh] w-full overflow-hidden bg-[#0B0805]"
      >
        <canvas
          ref={canvasRef}
          id="filmCanvas"
          className="absolute inset-0 block h-full w-full"
        />

        {/* Crisp Vector Stage Telemetry HUD */}
        <div
          ref={stageHudRef}
          className="pointer-events-none absolute top-[clamp(76px,11vh,108px)] left-[clamp(18px,5vw,44px)] z-10 rounded-full border border-[var(--line)] bg-[rgba(7,6,5,0.65)] px-3.5 py-1.5 font-mono text-[10px] tracking-[0.18em] text-[var(--gold-bright)] uppercase backdrop-blur-md sm:text-[11px]"
        >
          STAGE 01 // OAUTH · SANCTUM · AWS IAM
        </div>

        <div
          ref={frameHudRef}
          className="pointer-events-none absolute bottom-[clamp(22px,4vh,36px)] left-[clamp(18px,5vw,44px)] z-10 font-mono text-[10px] tracking-[0.2em] text-[var(--ink-faint)] uppercase"
        >
          FRAME 001 / 096
        </div>

        {/* Off-Center Editorial Captions (Right / Bottom-Right) */}
        <div
          id="filmCaps"
          className="pointer-events-none absolute right-[clamp(20px,6vw,96px)] bottom-[clamp(56px,11vh,130px)] z-10 w-[min(86vw,440px)] text-right"
        >
          {FILM_CAPTIONS.map((cap, idx) => (
            <div
              key={cap.index}
              ref={(el) => {
                capRefs.current[idx] = el;
              }}
              data-a={cap.a}
              data-b={cap.b}
              className="cap absolute right-0 bottom-0 w-full rounded-2xl border border-[var(--line)] bg-[rgba(7,6,5,0.72)] p-6 opacity-0 backdrop-blur-md shadow-[0_24px_60px_-20px_rgba(0,0,0,0.9)]"
            >
              <div className="mb-2 flex items-center justify-end gap-2.5 font-mono text-[10px] tracking-[0.22em] text-[var(--gold)] uppercase">
                <span>{cap.eyebrow}</span>
              </div>
              <h2 className="gold-text font-[family-name:var(--font-display)] text-2xl font-bold tracking-tight sm:text-3xl">
                {cap.title}
              </h2>
              <div className="mt-2 inline-block rounded-full border border-[var(--line)] bg-[var(--surface)] px-3 py-1 font-mono text-[11px] tracking-[0.14em] text-[var(--gold-bright)] uppercase">
                {cap.metric}
              </div>
              <p className="mt-3 text-xs leading-relaxed text-[var(--ink-soft)] sm:text-sm">
                {cap.detail}
              </p>
            </div>
          ))}
        </div>

        {/* Sleek Preloader Status */}
        <div
          ref={loaderRef}
          id="filmLoader"
          className="pointer-events-none absolute top-[clamp(76px,11vh,108px)] right-[clamp(20px,6vw,96px)] z-10 font-editorial text-xs tracking-[0.28em] text-[var(--gold)] transition-opacity duration-500"
        >
          … 0%
        </div>
      </div>
    </section>
  );
}

