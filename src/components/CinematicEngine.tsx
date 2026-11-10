import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import { ArrowUpRight, FileText } from "lucide-react";
import { careerData } from "../data/careerData";

gsap.registerPlugin(ScrollTrigger);

type LenisHost = { lenis?: Lenis };
const getLenisHost = () => window as unknown as LenisHost;

export interface HeaderNavItem {
  label: string;
  href: string;
}

const DEFAULT_NAV_ITEMS: HeaderNavItem[] = [
  { label: "Architecture", href: "#film" },
  { label: "Track Record", href: "#reveal" },
  { label: "Case Studies", href: "#projects" },
  { label: "Arsenal", href: "#skills" },
  { label: "Contact", href: "#cta" },
];

/**
 * Helper hook that drives `#ambient` background-color and `#glow` opacity
 * via GSAP ScrollTrigger as `[data-ambient]` sections enter/leave the viewport.
 */
export function useAmbientObserver(enabled = true) {
  useEffect(() => {
    if (!enabled || typeof window === "undefined") return;

    const ambientEl = document.getElementById("ambient");
    const glowEl = document.getElementById("glow");
    if (!ambientEl || !glowEl) return;

    const sections = Array.from(
      document.querySelectorAll<HTMLElement>("[data-ambient]"),
    );
    if (sections.length === 0) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const applyAmbient = (color: string, glowOpacity: number) => {
      if (reduceMotion) {
        ambientEl.style.backgroundColor = color;
        glowEl.style.opacity = String(glowOpacity);
        return;
      }

      gsap.to(ambientEl, {
        backgroundColor: color,
        duration: 1.1,
        overwrite: "auto",
        ease: "power2.out",
      });
      gsap.to(glowEl, {
        opacity: glowOpacity,
        duration: 1.1,
        overwrite: "auto",
        ease: "power2.out",
      });
    };

    const triggers: ScrollTrigger[] = sections.map((sec) => {
      const color = sec.dataset.ambient || "#070605";
      const parsedGlow = Number.parseFloat(sec.dataset.glow ?? "0.45");
      const glow = Number.isFinite(parsedGlow) ? parsedGlow : 0.45;

      return ScrollTrigger.create({
        trigger: sec,
        start: "top 60%",
        end: "bottom 40%",
        onEnter: () => applyAmbient(color, glow),
        onEnterBack: () => applyAmbient(color, glow),
      });
    });

    // Apply initial ambient state from the first observed section
    const firstColor = sections[0].dataset.ambient || "#070605";
    const firstGlow = Number.parseFloat(sections[0].dataset.glow ?? "0.45");
    ambientEl.style.backgroundColor = firstColor;
    glowEl.style.opacity = String(Number.isFinite(firstGlow) ? firstGlow : 0.45);

    return () => {
      triggers.forEach((st) => st.kill());
    };
  }, [enabled]);
}

/**
 * Single-ticker Lenis + GSAP ScrollTrigger engine hook.
 * Strictly drives Lenis exclusively via `gsap.ticker` with `lagSmoothing(0)`.
 */
export function useCinematicEngine() {
  useEffect(() => {
    if (typeof window === "undefined") return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    let lenis: Lenis | null = null;
    let tickerCallback: ((time: number) => void) | null = null;

    if (!reduceMotion) {
      lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
      });

      lenis.on("scroll", ScrollTrigger.update);

      tickerCallback = (time: number) => {
        lenis?.raf(time * 1000);
      };

      gsap.ticker.add(tickerCallback);
      gsap.ticker.lagSmoothing(0);
      getLenisHost().lenis = lenis;
    }

    const handleAnchorClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      const anchor = target?.closest<HTMLAnchorElement>('a[href^="#"]');
      if (!anchor) return;

      const href = anchor.getAttribute("href");
      if (!href || href === "#") return;

      const dest = document.querySelector<HTMLElement>(href);
      if (!dest) return;

      event.preventDefault();
      if (lenis) {
        lenis.scrollTo(dest, { offset: 0 });
      } else {
        dest.scrollIntoView({ behavior: "auto" });
      }
    };

    document.addEventListener("click", handleAnchorClick);

    const progressEl = document.getElementById("progress");
    const progressTrigger = ScrollTrigger.create({
      start: 0,
      end: "max",
      onUpdate: (self) => {
        if (progressEl) {
          progressEl.style.transform = `scaleX(${self.progress})`;
        }
      },
    });

    const handleLoad = () => ScrollTrigger.refresh();
    window.addEventListener("load", handleLoad);
    if (document.fonts?.ready) {
      document.fonts.ready.then(() => ScrollTrigger.refresh());
    }

    return () => {
      document.removeEventListener("click", handleAnchorClick);
      window.removeEventListener("load", handleLoad);
      progressTrigger.kill();

      if (tickerCallback) {
        gsap.ticker.remove(tickerCallback);
      }
      if (lenis) {
        lenis.destroy();
        const host = getLenisHost();
        if (host.lenis === lenis) {
          delete host.lenis;
        }
      }
    };
  }, []);

  useAmbientObserver(true);
}

/**
 * Renders the 5 fixed cinematic background/HUD layers:
 * `#ambient`, `#glow`, `#vignette`, `#grain`, and `#progress`.
 */
export function CinematicLayers() {
  return (
    <>
      <div id="ambient" aria-hidden="true" />
      <div id="glow" aria-hidden="true" />
      <div id="vignette" aria-hidden="true" />
      <div id="grain" aria-hidden="true" />
      <div id="progress" aria-hidden="true" />
    </>
  );
}

interface HeaderProps {
  navItems?: HeaderNavItem[];
}

/**
 * Smart Luxury Header:
 * - Adds `.solid` (blurred obsidian glass) when scrollY > 40
 * - Hides (`translateY(-115%)` via `.is-hidden`) on scroll-down past 140px
 * - Immediately returns on scroll-up
 */
export function Header({ navItems = DEFAULT_NAV_ITEMS }: HeaderProps) {
  const headerRef = useRef<HTMLElement>(null);
  const [isSolid, setIsSolid] = useState(false);
  const [isHidden, setIsHidden] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const st = ScrollTrigger.create({
      start: 0,
      end: "max",
      onUpdate: (self) => {
        const y = self.scroll();
        setIsSolid(y > 40);
        if (y > 140) {
          setIsHidden(self.direction === 1);
        } else {
          setIsHidden(false);
        }
      },
    });

    return () => {
      st.kill();
    };
  }, []);

  return (
    <header
      ref={headerRef}
      id="header"
      className={[
        "cinematic-header",
        isSolid ? "solid py-3.5" : "py-5 md:py-7",
        isHidden ? "is-hidden" : "",
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <div className="mx-auto flex w-full max-w-[var(--maxw)] items-center justify-between px-5 sm:px-8 lg:px-14">
        <a
          href="#hero"
          className="group flex items-center gap-3 text-decoration-none"
          aria-label={`${careerData.identity.name} — Back to top`}
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-full border border-[var(--line)] bg-[var(--surface)] font-mono text-xs tracking-[0.18em] text-[var(--gold-bright)] transition-colors duration-300 group-hover:border-[var(--gold)]">
            {careerData.identity.monogram}
          </span>
          <span className="flex flex-col">
            <span className="font-[family-name:var(--font-display)] text-sm font-semibold tracking-[0.22em] text-[var(--ink)] uppercase">
              {careerData.identity.name}
            </span>
            <span className="hidden font-mono text-[10px] tracking-[0.2em] text-[var(--ink-faint)] uppercase sm:block">
              Systems Architect
            </span>
          </span>
        </a>

        <nav
          aria-label="Primary Navigation"
          className="hidden items-center gap-7 md:flex lg:gap-9"
        >
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="font-mono text-[11px] tracking-[0.22em] text-[var(--ink-soft)] uppercase transition-colors duration-300 hover:text-[var(--gold-bright)]"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href={careerData.identity.resumeUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-[var(--gold)]/55 bg-[var(--surface)] px-4 py-2 font-mono text-[11px] tracking-[0.18em] text-[var(--gold-bright)] uppercase transition-all duration-300 hover:border-[var(--gold-bright)] hover:bg-[var(--gold)] hover:text-[var(--obsidian)]"
          >
            <FileText className="h-3.5 w-3.5" />
            <span>Resume</span>
            <ArrowUpRight className="h-3.5 w-3.5" />
          </a>
        </div>
      </div>
    </header>
  );
}

/**
 * Convenience wrapper that initializes the single-ticker Lenis + GSAP engine
 * and renders the fixed cinematic layers + smart Header.
 */
export function CinematicEngine({
  navItems,
}: {
  navItems?: HeaderNavItem[];
}) {
  useCinematicEngine();

  return (
    <>
      <CinematicLayers />
      <Header navItems={navItems} />
    </>
  );
}
