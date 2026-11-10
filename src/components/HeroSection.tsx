import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowDownRight, ArrowUpRight, MapPin } from "lucide-react";
import { careerData } from "../data/careerData";

gsap.registerPlugin(ScrollTrigger);

const MOTES = [
  { left: "18%", top: "64%", size: 6, duration: "9s", delay: "0s" },
  { left: "32%", top: "72%", size: 4, duration: "11s", delay: "1.4s" },
  { left: "48%", top: "58%", size: 7, duration: "13s", delay: "3.1s" },
  { left: "63%", top: "70%", size: 4, duration: "10s", delay: "0.7s" },
  { left: "74%", top: "64%", size: 5, duration: "12s", delay: "2.3s" },
  { left: "41%", top: "78%", size: 5, duration: "14s", delay: "4.2s" },
  { left: "26%", top: "54%", size: 3, duration: "11s", delay: "5.1s" },
  { left: "58%", top: "80%", size: 6, duration: "9.5s", delay: "6.1s" },
];

export function HeroSection() {
  const [hasCutout, setHasCutout] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const auraRef = useRef<HTMLDivElement>(null);
  const motesRef = useRef<HTMLDivElement>(null);
  const tiltRef = useRef<HTMLDivElement>(null);
  const emblemRef = useRef<HTMLDivElement>(null);
  const eyebrowRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const telemetryRef = useRef<HTMLDivElement>(null);
  const actionsRef = useRef<HTMLDivElement>(null);
  const cueRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let active = true;
    const probe = new Image();
    probe.decoding = "async";
    probe.onload = () => {
      if (active && probe.naturalWidth > 0) setHasCutout(true);
    };
    probe.onerror = () => {
      if (active) setHasCutout(false);
    };
    probe.src = "assets/product-cut.png";
    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    const stage = stageRef.current;
    if (!section || !stage) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const ctx = gsap.context(() => {
      if (reduceMotion) {
        gsap.set(
          [
            eyebrowRef.current,
            emblemRef.current,
            titleRef.current,
            subRef.current,
            telemetryRef.current,
            actionsRef.current,
            cueRef.current,
          ],
          { opacity: 1, y: 0, scale: 1, rotateZ: 0, clipPath: "none" },
        );
        return;
      }

      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.fromTo(
        emblemRef.current,
        { opacity: 0, scale: 0.82, y: 48, rotateZ: -6 },
        { opacity: 1, scale: 1, y: 0, rotateZ: 0, duration: 1.45 },
        0.1,
      )
        .fromTo(
          eyebrowRef.current,
          { opacity: 0, y: 14 },
          { opacity: 1, y: 0, duration: 0.8 },
          0.4,
        )
        .fromTo(
          titleRef.current,
          { opacity: 0, y: 24, clipPath: "inset(0 0 100% 0)" },
          { opacity: 1, y: 0, clipPath: "inset(0 0 0% 0)", duration: 1.1 },
          0.6,
        )
        .fromTo(
          subRef.current,
          { opacity: 0, y: 12 },
          { opacity: 1, y: 0, duration: 0.8 },
          0.9,
        )
        .fromTo(
          telemetryRef.current,
          { opacity: 0, y: 16 },
          { opacity: 1, y: 0, duration: 0.85 },
          1.02,
        )
        .fromTo(
          actionsRef.current,
          { opacity: 0, y: 14 },
          { opacity: 1, y: 0, duration: 0.8 },
          1.14,
        )
        .fromTo(
          cueRef.current,
          { opacity: 0 },
          { opacity: 1, duration: 0.8 },
          1.3,
        );

      gsap.to(innerRef.current, {
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "80% top",
          scrub: true,
        },
        y: -56,
        opacity: 0,
        ease: "none",
      });

      gsap.to(auraRef.current, {
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
        scale: 1.5,
        opacity: 0,
        ease: "none",
      });
    }, sectionRef);

    const handlePointerMove = (e: PointerEvent) => {
      if (reduceMotion) return;
      const rect = stage.getBoundingClientRect();
      const nx = (e.clientX - rect.left) / rect.width - 0.5;
      const ny = (e.clientY - rect.top) / rect.height - 0.5;

      if (tiltRef.current) {
        tiltRef.current.style.setProperty("--ty", `${(nx * 14).toFixed(2)}deg`);
        tiltRef.current.style.setProperty("--tx", `${(-ny * 10).toFixed(2)}deg`);
      }
      if (auraRef.current) {
        auraRef.current.style.setProperty("--px", `${(-nx * 46).toFixed(1)}px`);
        auraRef.current.style.setProperty("--py", `${(-ny * 34).toFixed(1)}px`);
      }
      if (motesRef.current) {
        motesRef.current.style.transform = `translate3d(${(nx * 22).toFixed(1)}px, ${(ny * 16).toFixed(1)}px, 0)`;
      }
    };

    const handlePointerLeave = () => {
      if (tiltRef.current) {
        tiltRef.current.style.setProperty("--ty", "0deg");
        tiltRef.current.style.setProperty("--tx", "0deg");
      }
      if (auraRef.current) {
        auraRef.current.style.setProperty("--px", "0px");
        auraRef.current.style.setProperty("--py", "0px");
      }
      if (motesRef.current) {
        motesRef.current.style.transform = "translate3d(0, 0, 0)";
      }
    };

    stage.addEventListener("pointermove", handlePointerMove);
    stage.addEventListener("pointerleave", handlePointerLeave);

    return () => {
      ctx.revert();
      stage.removeEventListener("pointermove", handlePointerMove);
      stage.removeEventListener("pointerleave", handlePointerLeave);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="hero"
      data-ambient="#070605"
      data-glow="0.65"
      className="relative h-[135vh] min-h-[840px]"
    >
      <div
        ref={stageRef}
        className="stage sticky top-0 flex h-[100svh] w-full flex-col items-center justify-center overflow-hidden px-5 pt-14 pb-10 text-center sm:px-8"
        style={{ perspective: "1300px" }}
      >
        {/* Radial Gold / Ember Aura */}
        <div
          ref={auraRef}
          aria-hidden="true"
          className="aura top-[42%] left-1/2 h-[84vmin] w-[84vmin]"
          style={{
            background:
              "radial-gradient(circle, rgba(229,193,120,0.26) 0%, rgba(249,115,22,0.1) 36%, rgba(194,151,74,0.04) 55%, transparent 70%)",
            transform:
              "translate3d(calc(-50% + var(--px, 0px)), calc(-50% + var(--py, 0px)), 0)",
          }}
        />

        {/* 8 Drifting Gold Dust Motes */}
        <div ref={motesRef} className="motes" aria-hidden="true">
          {MOTES.map((mote, idx) => (
            <span
              key={idx}
              style={{
                left: mote.left,
                top: mote.top,
                width: `${mote.size}px`,
                height: `${mote.size}px`,
                animationDuration: mote.duration,
                animationDelay: mote.delay,
              }}
            />
          ))}
        </div>

        {/* Hero Inner Composition */}
        <div
          ref={innerRef}
          className="hero-inner relative z-10 mx-auto flex w-full max-w-[var(--maxw)] flex-col items-center"
        >
          {/* Eyebrow */}
          <div
            ref={eyebrowRef}
            className="mb-3 flex flex-wrap items-center justify-center gap-3 opacity-0"
          >
            <span className="font-editorial text-[11px] font-medium tracking-[0.38em] text-[var(--gold-bright)] sm:text-xs">
              SYSTEMS ARCHITECT · CLOUD &amp; FULL-STACK ENGINEER
            </span>
          </div>

          {/* 3D Architectural Centerpiece (No blend-mode trap; circular silhouette mask on specular) */}
          <div className="media-float my-2 sm:my-3">
            <div
              ref={tiltRef}
              className="media-tilt relative transition-transform duration-300 ease-out"
              style={{
                transformStyle: "preserve-3d",
                transform:
                  "rotateX(var(--tx, 0deg)) rotateY(var(--ty, 0deg))",
              }}
            >
              <div
                ref={emblemRef}
                className={
                  hasCutout
                    ? "relative flex h-[clamp(140px,26vh,240px)] w-[clamp(140px,26vh,240px)] items-center justify-center opacity-0"
                    : "specular relative flex h-[clamp(118px,20vh,188px)] w-[clamp(118px,20vh,188px)] items-center justify-center rounded-full border border-[var(--line)] bg-[radial-gradient(circle_at_30%_24%,rgba(229,193,120,0.2),rgba(18,14,10,0.96)_66%)] opacity-0 shadow-[0_32px_80px_-14px_rgba(194,151,74,0.34)]"
                }
              >
                {hasCutout ? (
                  <>
                    <img
                      src="assets/product-cut.png"
                      alt={`${careerData.identity.name} Architectural Core`}
                      loading="eager"
                      className="h-full w-full object-contain drop-shadow-[0_28px_40px_rgba(194,151,74,0.28)]"
                    />
                    <span
                      className="hero-cutout-specular"
                      aria-hidden="true"
                      style={{
                        WebkitMaskImage: "url(assets/product-cut.png)",
                        maskImage: "url(assets/product-cut.png)",
                      }}
                    />
                  </>
                ) : (
                  <svg
                    viewBox="0 0 220 220"
                    className="h-[92%] w-[92%]"
                    fill="none"
                    aria-hidden="true"
                  >
                    <defs>
                      <linearGradient
                        id="heroGoldStroke"
                        x1="0%"
                        y1="0%"
                        x2="100%"
                        y2="100%"
                      >
                        <stop offset="0%" stopColor="#E5C178" />
                        <stop offset="50%" stopColor="#C2974A" />
                        <stop offset="100%" stopColor="#8A6128" />
                      </linearGradient>
                      <linearGradient
                        id="heroEmberStroke"
                        x1="0%"
                        y1="100%"
                        x2="100%"
                        y2="0%"
                      >
                        <stop offset="0%" stopColor="#8A6128" />
                        <stop offset="55%" stopColor="#F97316" />
                        <stop offset="100%" stopColor="#E5C178" />
                      </linearGradient>
                    </defs>

                    {/* Outer Precision Bezel */}
                    <circle
                      cx="110"
                      cy="110"
                      r="98"
                      stroke="url(#heroGoldStroke)"
                      strokeWidth="0.75"
                      strokeOpacity="0.45"
                      strokeDasharray="2 5"
                    />
                    <circle
                      cx="110"
                      cy="110"
                      r="82"
                      stroke="url(#heroGoldStroke)"
                      strokeWidth="1.1"
                      strokeOpacity="0.65"
                    />

                    {/* Interlocking Cloud & Data Orbitals */}
                    <ellipse
                      cx="110"
                      cy="110"
                      rx="72"
                      ry="28"
                      transform="rotate(-28 110 110)"
                      stroke="url(#heroGoldStroke)"
                      strokeWidth="0.9"
                      strokeOpacity="0.55"
                    />
                    <ellipse
                      cx="110"
                      cy="110"
                      rx="72"
                      ry="28"
                      transform="rotate(28 110 110)"
                      stroke="url(#heroEmberStroke)"
                      strokeWidth="0.9"
                      strokeOpacity="0.45"
                    />

                    {/* Architectural Octagon Core */}
                    <polygon
                      points="110,42 158,62 178,110 158,158 110,178 62,158 42,110 62,62"
                      stroke="url(#heroGoldStroke)"
                      strokeWidth="0.85"
                      strokeOpacity="0.45"
                    />

                    {/* Cardinal System Nodes (Cloud / Code / Cache / Delivery) */}
                    <circle cx="110" cy="28" r="3.2" fill="#E5C178" />
                    <circle cx="192" cy="110" r="3.2" fill="#C2974A" />
                    <circle cx="110" cy="192" r="3.2" fill="#F97316" />
                    <circle cx="28" cy="110" r="3.2" fill="#E5C178" />

                    {/* Inner Obsidian Medallion + AA Monogram */}
                    <circle
                      cx="110"
                      cy="110"
                      r="36"
                      fill="#070605"
                      stroke="url(#heroGoldStroke)"
                      strokeWidth="1.35"
                    />
                    <circle
                      cx="110"
                      cy="110"
                      r="30"
                      stroke="url(#heroGoldStroke)"
                      strokeWidth="0.5"
                      strokeOpacity="0.4"
                    />
                    <text
                      x="110"
                      y="117"
                      textAnchor="middle"
                      fill="#E5C178"
                      fontSize="22"
                      fontFamily="Cormorant Garamond, Georgia, serif"
                      fontWeight="600"
                      letterSpacing="4"
                    >
                      AA
                    </text>
                  </svg>
                )}
              </div>
            </div>
          </div>

          {/* Wordmark */}
          <h1
            ref={titleRef}
            className="mt-2 font-[family-name:var(--font-display)] text-4xl font-bold tracking-[-0.03em] text-[var(--ink)] opacity-0 sm:text-6xl md:text-7xl lg:text-[5.5rem] lg:leading-[0.94]"
          >
            ABDULLAH <span className="gold-text">ADEMI</span>
          </h1>

          {/* Tagline */}
          <p
            ref={subRef}
            className="mt-3 max-w-2xl text-sm leading-relaxed text-[var(--ink-soft)] opacity-0 sm:mt-4 sm:text-base"
          >
            {careerData.identity.summary}
          </p>

          {/* Floating Glass Telemetry Strip */}
          <div
            ref={telemetryRef}
            className="mt-5 inline-flex flex-wrap items-center justify-center gap-x-5 gap-y-2 rounded-full border border-[var(--line)] bg-[rgba(18,14,10,0.72)] px-5 py-2.5 opacity-0 backdrop-blur-md shadow-[0_18px_50px_-20px_rgba(0,0,0,0.85)]"
          >
            <span className="inline-flex items-center gap-2 font-mono text-[11px] tracking-[0.14em] text-[var(--ink)] uppercase">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
              <strong className="text-[var(--gold-bright)]">99.9%</strong> AWS Uptime
            </span>
            <span className="hidden h-3 w-px bg-[var(--line)] sm:block" />
            <span className="font-mono text-[11px] tracking-[0.14em] text-[var(--ink)] uppercase">
              <strong className="text-[var(--gold-bright)]">&lt;80ms</strong> Latency
            </span>
            <span className="hidden h-3 w-px bg-[var(--line)] sm:block" />
            <span className="font-mono text-[11px] tracking-[0.14em] text-[var(--ink)] uppercase">
              <strong className="text-[var(--gold-bright)]">10+</strong> Production Systems
            </span>
            <span className="hidden h-3 w-px bg-[var(--line)] md:block" />
            <span className="hidden items-center gap-1.5 font-mono text-[11px] tracking-[0.14em] text-[var(--ink-soft)] uppercase md:inline-flex">
              <MapPin className="h-3 w-3 text-[var(--gold)]" />
              {careerData.identity.location}
            </span>
          </div>

          {/* Actions */}
          <div
            ref={actionsRef}
            className="mt-6 flex flex-wrap items-center justify-center gap-3.5 opacity-0"
          >
            <a
              href="#film"
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-b from-[var(--gold-bright)] to-[var(--gold)] px-6 py-3 font-mono text-xs font-medium tracking-[0.16em] text-[var(--obsidian)] uppercase shadow-[0_16px_40px_-14px_rgba(194,151,74,0.6)] transition-transform duration-300 hover:-translate-y-0.5"
            >
              <span>Watch System Film</span>
              <ArrowDownRight className="h-4 w-4" />
            </a>
            <a
              href="#cta"
              className="inline-flex items-center gap-2 rounded-full border border-[var(--line)] bg-[var(--surface)] px-6 py-3 font-mono text-xs tracking-[0.16em] text-[var(--ink)] uppercase backdrop-blur-md transition-colors duration-300 hover:border-[var(--gold)] hover:text-[var(--gold-bright)]"
            >
              <span>Initiate Contact</span>
              <ArrowUpRight className="h-4 w-4" />
            </a>
          </div>
        </div>

        {/* Scroll Cue */}
        <div
          ref={cueRef}
          className="scrollcue pointer-events-none absolute bottom-4 left-1/2 z-20 flex -translate-x-1/2 flex-col items-center gap-1.5 opacity-0"
        >
          <span className="font-editorial text-[10px] tracking-[0.34em] text-[var(--ink-faint)]">
            Scroll
          </span>
          <span className="scrollcue-bar !h-7" />
        </div>
      </div>
    </section>
  );
}
