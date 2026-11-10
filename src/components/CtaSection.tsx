import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  ArrowUpRight,
  FileText,
  Github,
  Linkedin,
  Mail,
  Phone,
} from "lucide-react";
import { careerData } from "../data/careerData";

gsap.registerPlugin(ScrollTrigger);

const clamp = (v: number, a: number, b: number) => Math.max(a, Math.min(b, v));

const smoothstep = (e0: number, e1: number, x: number) => {
  const t = clamp((x - e0) / (e1 - e0), 0, 1);
  return t * t * (3 - 2 * t);
};

export function CtaSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const dimRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const stage = stageRef.current;
    const canvas = canvasRef.current;
    const dim = dimRef.current;
    const content = contentRef.current;
    if (!section || !stage || !canvas || !dim || !content) return;

    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    let isVisible = false;
    let phase = 0;

    const resize = () => {
      const dpr = Math.min(2, window.devicePixelRatio || 1);
      const w = stage.clientWidth;
      const h = stage.clientHeight;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
    };

    const drawAmbientArchitecture = (t: number) => {
      const w = canvas.width;
      const h = canvas.height;
      const cx = w * 0.5;
      const cy = h * 0.5;
      const minDim = Math.min(w, h);

      ctx.fillStyle = "#080604";
      ctx.fillRect(0, 0, w, h);

      // Deep radial luxury aura
      const aura = ctx.createRadialGradient(cx, cy, 10, cx, cy, minDim * 0.58);
      aura.addColorStop(0, "rgba(229, 193, 120, 0.16)");
      aura.addColorStop(0.45, "rgba(194, 151, 74, 0.06)");
      aura.addColorStop(0.75, "rgba(249, 115, 22, 0.025)");
      aura.addColorStop(1, "rgba(8, 6, 4, 0)");
      ctx.fillStyle = aura;
      ctx.fillRect(0, 0, w, h);

      // Slowly rotating orbital rings & architectural nodes
      const rings = [
        { rx: minDim * 0.32, ry: minDim * 0.13, tilt: -0.32, speed: 0.25, color: "rgba(229, 193, 120, 0.36)" },
        { rx: minDim * 0.36, ry: minDim * 0.15, tilt: 0.34, speed: -0.19, color: "rgba(194, 151, 74, 0.28)" },
        { rx: minDim * 0.22, ry: minDim * 0.22, tilt: 0, speed: 0.14, color: "rgba(249, 115, 22, 0.22)" },
      ];

      for (let i = 0; i < rings.length; i++) {
        const ring = rings[i];
        ctx.save();
        ctx.translate(cx, cy);
        ctx.rotate(ring.tilt + t * ring.speed * 0.12);

        ctx.beginPath();
        ctx.ellipse(0, 0, ring.rx, ring.ry, 0, 0, Math.PI * 2);
        ctx.strokeStyle = ring.color;
        ctx.lineWidth = i === 2 ? 1.1 : 1.3;
        if (i === 2) ctx.setLineDash([4, 8]);
        ctx.stroke();

        // Orbiting telemetry nodes
        for (let n = 0; n < 2; n++) {
          const ang = t * ring.speed + n * Math.PI;
          const nx = Math.cos(ang) * ring.rx;
          const ny = Math.sin(ang) * ring.ry;

          const glow = ctx.createRadialGradient(nx, ny, 0, nx, ny, 14);
          glow.addColorStop(0, "#FBF8F2");
          glow.addColorStop(0.4, "#E5C178");
          glow.addColorStop(1, "rgba(194, 151, 74, 0)");
          ctx.fillStyle = glow;
          ctx.beginPath();
          ctx.arc(nx, ny, 14, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.restore();
      }

      // Precision central reticle
      ctx.save();
      ctx.strokeStyle = "rgba(194, 151, 74, 0.22)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(cx, cy, minDim * 0.085, 0, Math.PI * 2);
      ctx.stroke();

      ctx.font = `${Math.max(11, Math.round(minDim * 0.016))}px "Cormorant Garamond", Georgia, serif`;
      ctx.fillStyle = "rgba(229, 193, 120, 0.72)";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText("AA", cx, cy);
      ctx.restore();
    };

    resize();
    drawAmbientArchitecture(0);

    const handleResize = () => {
      resize();
      drawAmbientArchitecture(phase);
    };

    if (reduceMotion) {
      dim.style.opacity = "0.92";
      content.style.opacity = "1";
      content.style.transform = "none";
      window.addEventListener("resize", handleResize, { passive: true });
      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }

    // Use GSAP's single shared ticker (never a separate rAF loop) only while section is visible
    const tick = (_time: number, deltaTime: number) => {
      if (!isVisible) return;
      phase += (deltaTime / 1000) * 0.9;
      drawAmbientArchitecture(phase);
    };

    gsap.ticker.add(tick);

    const visibilityST = ScrollTrigger.create({
      trigger: section,
      start: "top bottom",
      end: "bottom top",
      onEnter: () => {
        isVisible = true;
      },
      onEnterBack: () => {
        isVisible = true;
      },
      onLeave: () => {
        isVisible = false;
      },
      onLeaveBack: () => {
        isVisible = false;
      },
    });

    // Smoothstep-gated reveal: ambient stage alone for first ~34%, then wash + CTA fade in (0.34 -> 0.72)
    const scrubST = ScrollTrigger.create({
      trigger: section,
      start: "top top",
      end: "bottom bottom",
      scrub: true,
      onUpdate: (self) => {
        const p = self.progress;
        const dimOpacity = smoothstep(0.34, 0.66, p);
        const contentReveal = smoothstep(0.4, 0.72, p);
        dim.style.opacity = dimOpacity.toFixed(3);
        content.style.opacity = contentReveal.toFixed(3);
        content.style.transform = `translateY(${(28 * (1 - contentReveal)).toFixed(1)}px)`;
      },
    });

    window.addEventListener("resize", handleResize, { passive: true });

    return () => {
      gsap.ticker.remove(tick);
      visibilityST.kill();
      scrubST.kill();
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      <section
        ref={sectionRef}
        id="cta"
        data-ambient="#080604"
        data-glow="0.7"
        className="relative h-[240vh]"
      >
        <div
          ref={stageRef}
          className="stage sticky top-0 grid h-[100svh] w-full place-items-center overflow-hidden bg-[#080604]"
        >
          {/* Ambient Architectural Canvas Loop (plays alone first 0.00 -> 0.34) */}
          <canvas
            ref={canvasRef}
            aria-hidden="true"
            className="absolute inset-0 block h-full w-full"
          />

          {/* Smoothstep Radial Dim / Wash Layer */}
          <div
            ref={dimRef}
            id="ctaDim"
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 opacity-0 backdrop-blur-[3px]"
            style={{
              background:
                "radial-gradient(120% 100% at 50% 50%, rgba(8,6,4,0.72) 0%, rgba(7,6,5,0.95) 75%)",
            }}
          />

          {/* Executive Contact Invitation */}
          <div
            ref={contentRef}
            id="ctaContent"
            className="relative z-10 mx-auto max-w-4xl px-5 text-center opacity-0"
            style={{ transform: "translateY(28px)" }}
          >
            <span className="font-editorial block text-xs tracking-[0.38em] text-[var(--gold)]">
              EXECUTIVE ENGAGEMENT · AVAILABLE FOR ARCHITECTURE &amp; LEADERSHIP
            </span>

            <h2 className="gold-text mt-4 font-[family-name:var(--font-display)] text-4xl font-bold tracking-tight sm:text-6xl md:text-7xl lg:leading-[0.96]">
              HAVE A SYSTEM TO ARCHITECT?
            </h2>

            <p className="mx-auto mt-5 max-w-xl text-sm leading-relaxed text-[var(--ink-soft)] sm:text-base">
              Partner on high-availability AWS infrastructure, sub-80ms search &amp;
              data pipelines, or end-to-end production web and mobile platforms.
            </p>

            {/* Primary Direct Channels */}
            <div className="mt-9 flex flex-wrap items-center justify-center gap-3.5">
              <a
                href={`mailto:${careerData.identity.email}`}
                className="inline-flex items-center gap-2.5 rounded-full bg-gradient-to-b from-[var(--gold-bright)] to-[var(--gold)] px-7 py-3.5 font-mono text-xs font-medium tracking-[0.16em] text-[var(--obsidian)] uppercase shadow-[0_18px_45px_-14px_rgba(194,151,74,0.7)] transition-transform duration-300 hover:-translate-y-0.5"
              >
                <Mail className="h-4 w-4" />
                <span>{careerData.identity.email}</span>
              </a>

              <a
                href={`tel:${careerData.identity.phone}`}
                className="inline-flex items-center gap-2.5 rounded-full border border-[var(--gold)]/60 bg-[rgba(18,14,10,0.7)] px-6 py-3.5 font-mono text-xs tracking-[0.16em] text-[var(--gold-bright)] uppercase backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5 hover:bg-[var(--gold)] hover:text-[var(--obsidian)]"
              >
                <Phone className="h-4 w-4" />
                <span>{careerData.identity.phone}</span>
              </a>
            </div>

            {/* Secondary Links: Resume, GitHub, LinkedIn */}
            <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
              <a
                href={careerData.identity.resumeUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-[var(--line)] bg-[var(--surface)] px-5 py-2.5 font-mono text-[11px] tracking-[0.16em] text-[var(--ink)] uppercase transition-colors hover:border-[var(--gold)] hover:text-[var(--gold-bright)]"
              >
                <FileText className="h-3.5 w-3.5" />
                <span>Download Resume</span>
                <ArrowUpRight className="h-3.5 w-3.5" />
              </a>

              <a
                href={careerData.identity.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-[var(--line)] bg-[var(--surface)] px-5 py-2.5 font-mono text-[11px] tracking-[0.16em] text-[var(--ink)] uppercase transition-colors hover:border-[var(--gold)] hover:text-[var(--gold-bright)]"
              >
                <Github className="h-3.5 w-3.5" />
                <span>GitHub</span>
              </a>

              <a
                href={careerData.identity.linkedinUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-[var(--line)] bg-[var(--surface)] px-5 py-2.5 font-mono text-[11px] tracking-[0.16em] text-[var(--ink)] uppercase transition-colors hover:border-[var(--gold)] hover:text-[var(--gold-bright)]"
              >
                <Linkedin className="h-3.5 w-3.5" />
                <span>LinkedIn</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Luxury Minimalist Footer */}
      <footer className="relative border-t border-[var(--line)] bg-[#070605] py-14 text-center">
        <div className="mx-auto flex max-w-[var(--maxw)] flex-col items-center justify-between gap-6 px-5 sm:px-8 md:flex-row lg:px-14">
          <div className="flex items-center gap-3">
            <span className="flex h-9 w-9 items-center justify-center rounded-full border border-[var(--line)] font-mono text-xs tracking-[0.18em] text-[var(--gold-bright)]">
              {careerData.identity.monogram}
            </span>
            <div className="text-left">
              <div className="gold-text font-[family-name:var(--font-display)] text-base font-bold tracking-[0.16em] uppercase">
                {careerData.identity.name}
              </div>
              <div className="font-mono text-[10px] tracking-[0.16em] text-[var(--ink-faint)] uppercase">
                {careerData.identity.location}
              </div>
            </div>
          </div>

          <nav
            aria-label="Footer Navigation"
            className="flex flex-wrap justify-center gap-6 font-mono text-[11px] tracking-[0.18em] text-[var(--ink-soft)] uppercase"
          >
            <a href="#film" className="transition-colors hover:text-[var(--gold-bright)]">
              Architecture
            </a>
            <a href="#reveal" className="transition-colors hover:text-[var(--gold-bright)]">
              Track Record
            </a>
            <a href="#projects" className="transition-colors hover:text-[var(--gold-bright)]">
              Case Studies
            </a>
            <a href="#skills" className="transition-colors hover:text-[var(--gold-bright)]">
              Arsenal
            </a>
          </nav>

          <div className="font-mono text-[11px] tracking-[0.16em] text-[var(--ink-faint)] uppercase">
            © 2026 {careerData.identity.name}
          </div>
        </div>
      </footer>
    </>
  );
}
