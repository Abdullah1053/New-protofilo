import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  ArrowUpRight,
  CheckCircle2,
  ExternalLink,
  Layers,
  X,
} from "lucide-react";
import { CaseStudy, careerData } from "../data/careerData";

gsap.registerPlugin(ScrollTrigger);

export function ProjectsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeProject, setActiveProject] = useState<CaseStudy | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const cards = section.querySelectorAll<HTMLElement>("[data-project-card]");
    if (reduceMotion) {
      cards.forEach((el) => {
        el.style.opacity = "1";
        el.style.transform = "none";
      });
      return;
    }

    const ctx = gsap.context(() => {
      cards.forEach((el, idx) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 34 },
          {
            opacity: 1,
            y: 0,
            duration: 0.95,
            delay: idx * 0.08,
            ease: "power3.out",
            scrollTrigger: {
              trigger: el,
              start: "top 86%",
              once: true,
            },
          },
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (!activeProject) return;

    const lenis = (window as unknown as { lenis?: { stop: () => void; start: () => void } }).lenis;
    lenis?.stop();
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setActiveProject(null);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = prevOverflow;
      lenis?.start();
    };
  }, [activeProject]);

  return (
    <section
      ref={sectionRef}
      id="projects"
      data-ambient="#140F0A"
      data-glow="0.5"
      className="relative py-28 sm:py-36"
    >
      <div className="mx-auto max-w-[var(--maxw)] px-5 sm:px-8 lg:px-14">
        {/* Section Header */}
        <div
          data-project-card
          className="mb-14 flex flex-col justify-between gap-6 md:flex-row md:items-end"
        >
          <div>
            <div className="mb-3 font-mono text-xs tracking-[0.26em] text-[var(--gold)] uppercase">
              02 — SELECTED ARCHITECTURES
            </div>
            <h2 className="gold-text font-[family-name:var(--font-display)] text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              Flagship Case Studies
            </h2>
          </div>

          <a
            href={careerData.identity.githubUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 self-start rounded-full border border-[var(--line)] bg-[var(--surface)] px-5 py-2.5 font-mono text-xs tracking-[0.18em] text-[var(--gold-bright)] uppercase transition-all duration-300 hover:border-[var(--gold)] hover:bg-[var(--gold)] hover:text-[var(--obsidian)] md:self-auto"
          >
            <span>View GitHub</span>
            <ExternalLink className="h-3.5 w-3.5" />
          </a>
        </div>

        {/* Luxury Editorial Case Study Cards */}
        <div className="grid grid-cols-1 gap-7 lg:grid-cols-3">
          {careerData.projects.map((project) => (
            <article
              key={project.id}
              data-project-card
              className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-[var(--line)] bg-[linear-gradient(165deg,rgba(255,248,235,0.045),rgba(11,8,5,0.9))] p-7 transition-all duration-500 hover:-translate-y-1.5 hover:border-[var(--gold)]/60 hover:shadow-[0_34px_80px_-28px_rgba(194,151,74,0.28)] sm:p-8"
            >
              {/* Top Gold Hairline */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[var(--gold-bright)]/50 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"
              />

              <div>
                {/* Index & Headline Metric */}
                <div className="mb-6 flex items-center justify-between gap-3">
                  <span className="font-mono text-xs tracking-[0.22em] text-[var(--gold)]">
                    {project.index}
                  </span>
                  <span className="rounded-full border border-[var(--line)] bg-[rgba(194,151,74,0.1)] px-3 py-1 font-mono text-[10px] tracking-[0.15em] text-[var(--gold-bright)] uppercase">
                    {project.headlineMetric}
                  </span>
                </div>

                <div className="font-mono text-[10px] tracking-[0.2em] text-[var(--ink-faint)] uppercase">
                  {project.category}
                </div>

                <h3 className="mt-2 font-[family-name:var(--font-display)] text-2xl font-bold tracking-tight text-[var(--ink)] transition-colors duration-300 group-hover:text-[var(--gold-bright)]">
                  {project.title}
                </h3>

                <p className="mt-1.5 font-editorial text-xs tracking-[0.18em] text-[var(--gold)]">
                  {project.subtitle}
                </p>

                <p className="mt-5 text-sm leading-relaxed text-[var(--ink-soft)]">
                  {project.summary}
                </p>

                {/* Preview of first 2 bullets */}
                <ul className="mt-5 space-y-2.5 border-t border-[var(--line-soft)] pt-5">
                  {project.bullets.slice(0, 2).map((b) => (
                    <li
                      key={b.id}
                      className="flex items-start gap-2.5 text-xs leading-relaxed text-[var(--ink-soft)]"
                    >
                      <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[var(--gold)]" />
                      <span>{b.text}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-7">
                {/* Tech Stack Pills */}
                <div className="mb-6 flex flex-wrap gap-1.5">
                  {project.tech.slice(0, 6).map((tech) => (
                    <span
                      key={tech}
                      className="rounded-full border border-[var(--line-soft)] bg-black/35 px-2.5 py-1 font-mono text-[10px] text-[var(--ink-soft)]"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.tech.length > 6 && (
                    <span className="rounded-full border border-[var(--line-soft)] bg-black/35 px-2.5 py-1 font-mono text-[10px] text-[var(--gold)]">
                      +{project.tech.length - 6}
                    </span>
                  )}
                </div>

                {/* Drawer Trigger */}
                <div className="flex items-center justify-between border-t border-[var(--line-soft)] pt-5">
                  <button
                    type="button"
                    onClick={() => setActiveProject(project)}
                    className="inline-flex items-center gap-2 font-mono text-xs tracking-[0.16em] text-[var(--gold-bright)] uppercase transition-colors hover:text-[var(--ink)]"
                  >
                    <Layers className="h-3.5 w-3.5" />
                    <span>Inspect Architecture</span>
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </button>

                  <a
                    href={project.link}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`Open ${project.title} on GitHub`}
                    className="flex h-8 w-8 items-center justify-center rounded-full border border-[var(--line-soft)] text-[var(--ink-soft)] transition-colors hover:border-[var(--gold)] hover:text-[var(--gold-bright)]"
                  >
                    <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Interactive Case Study Drawer / Modal Inspector */}
      {activeProject && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="case-study-modal-title"
          className="fixed inset-0 z-[80] flex items-center justify-center bg-black/80 p-4 backdrop-blur-md sm:p-6"
          onClick={() => setActiveProject(null)}
        >
          <div
            className="relative max-h-[88vh] w-full max-w-2xl overflow-y-auto rounded-2xl border border-[var(--gold)]/40 bg-[#0B0805] p-6 shadow-[0_40px_120px_-20px_rgba(0,0,0,0.95)] sm:p-9"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4 border-b border-[var(--line)] pb-5">
              <div>
                <div className="flex flex-wrap items-center gap-2.5 font-mono text-[10px] tracking-[0.2em] text-[var(--gold)] uppercase">
                  <span>Case Study {activeProject.index}</span>
                  <span>·</span>
                  <span>{activeProject.category}</span>
                </div>
                <h3
                  id="case-study-modal-title"
                  className="gold-text mt-2 font-[family-name:var(--font-display)] text-2xl font-bold sm:text-3xl"
                >
                  {activeProject.title}
                </h3>
                <p className="mt-1 font-mono text-xs text-[var(--ink-soft)]">
                  {activeProject.subtitle}
                </p>
              </div>

              <button
                type="button"
                onClick={() => setActiveProject(null)}
                aria-label="Close architecture inspector"
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[var(--line)] bg-[var(--surface)] text-[var(--ink-soft)] transition-colors hover:border-[var(--gold)] hover:text-[var(--ink)]"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="mt-6 space-y-6">
              <div className="flex flex-wrap items-center gap-3">
                <span className="rounded-full border border-[var(--gold)]/50 bg-[rgba(194,151,74,0.12)] px-3.5 py-1 font-mono text-xs tracking-[0.14em] text-[var(--gold-bright)] uppercase">
                  {activeProject.headlineMetric}
                </span>
              </div>

              <p className="text-sm leading-relaxed text-[var(--ink-soft)] sm:text-base">
                {activeProject.summary}
              </p>

              <div>
                <h4 className="mb-3 font-mono text-[11px] tracking-[0.2em] text-[var(--gold)] uppercase">
                  Verified Architectural Deliverables
                </h4>
                <ul className="space-y-3">
                  {activeProject.bullets.map((b) => (
                    <li
                      key={b.id}
                      className="flex items-start gap-3 rounded-xl border border-[var(--line-soft)] bg-black/40 p-3.5 text-sm leading-relaxed text-[var(--ink)]"
                    >
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[var(--gold-bright)]" />
                      <div>
                        <span>{b.text}</span>
                        <div className="mt-1 font-mono text-[10px] text-[var(--ink-faint)]">
                          ref: {b.id}
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="mb-3 font-mono text-[11px] tracking-[0.2em] text-[var(--gold)] uppercase">
                  Production Stack
                </h4>
                <div className="flex flex-wrap gap-2">
                  {activeProject.tech.map((t) => (
                    <span
                      key={t}
                      className="rounded-full border border-[var(--line)] bg-[var(--surface)] px-3 py-1 font-mono text-xs text-[var(--gold-bright)]"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-[var(--line)] pt-5">
              <a
                href={activeProject.link}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-gradient-to-b from-[var(--gold-bright)] to-[var(--gold)] px-5 py-2.5 font-mono text-xs font-medium tracking-[0.16em] text-[var(--obsidian)] uppercase transition-transform hover:-translate-y-0.5"
              >
                <span>Explore GitHub Profile</span>
                <ExternalLink className="h-3.5 w-3.5" />
              </a>

              <button
                type="button"
                onClick={() => setActiveProject(null)}
                className="rounded-full border border-[var(--line)] px-5 py-2.5 font-mono text-xs tracking-[0.16em] text-[var(--ink-soft)] uppercase transition-colors hover:border-[var(--gold)] hover:text-[var(--ink)]"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
