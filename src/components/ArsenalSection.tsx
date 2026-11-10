import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { GitHubCalendar } from "react-github-calendar";
import {
  Activity,
  Award,
  Code2,
  Cpu,
  Database,
  GraduationCap,
  Layers,
  Server,
} from "lucide-react";
import { careerData } from "../data/careerData";

gsap.registerPlugin(ScrollTrigger);

const SKILL_ICONS: Record<string, typeof Code2> = {
  cb_skill_0: Code2,
  cb_skill_1: Layers,
  cb_skill_2: Database,
  cb_skill_3: Server,
  cb_skill_4: Cpu,
};

export function ArsenalSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const items = section.querySelectorAll<HTMLElement>("[data-arsenal-item]");
    if (reduceMotion) {
      items.forEach((el) => {
        el.style.opacity = "1";
        el.style.transform = "none";
      });
      return;
    }

    const ctx = gsap.context(() => {
      items.forEach((el, idx) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 28 },
          {
            opacity: 1,
            y: 0,
            duration: 0.85,
            delay: Math.min(idx * 0.05, 0.25),
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

  return (
    <section
      ref={sectionRef}
      id="skills"
      data-ambient="#0D0A07"
      data-glow="0.45"
      className="relative py-28 sm:py-36"
    >
      <div className="mx-auto max-w-[var(--maxw)] px-5 sm:px-8 lg:px-14">
        {/* Section Header */}
        <div data-arsenal-item className="mb-14 max-w-3xl">
          <div className="mb-3 font-mono text-xs tracking-[0.26em] text-[var(--gold)] uppercase">
            03 — TECHNICAL ARSENAL &amp; PEDIGREE
          </div>
          <h2 className="gold-text font-[family-name:var(--font-display)] text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
            Engineering Capabilities
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-[var(--ink-soft)] sm:text-base">
            End-to-end command across systems programming, full-stack web &amp;
            mobile frameworks, indexed persistence, AWS cloud topology, and
            cryptographic security architectures.
          </p>
        </div>

        {/* 5 Skill Category Cards */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {careerData.skills.map((cat, idx) => {
            const Icon = SKILL_ICONS[cat.id] ?? Cpu;
            const spanClass =
              idx === careerData.skills.length - 1
                ? "md:col-span-2 lg:col-span-2"
                : "";

            return (
              <div
                key={cat.id}
                data-arsenal-item
                className={[
                  "group relative overflow-hidden rounded-2xl border border-[var(--line)] bg-[linear-gradient(155deg,rgba(255,248,235,0.038),rgba(11,8,5,0.9))] p-7 transition-all duration-500 hover:border-[var(--gold)]/65 hover:shadow-[0_24px_70px_-28px_rgba(194,151,74,0.28)]",
                  spanClass,
                ].join(" ")}
              >
                {/* Subtle Gold Hover Sheen */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute -top-24 -right-24 h-48 w-48 rounded-full bg-[radial-gradient(circle,rgba(229,193,120,0.16),transparent_70%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                />

                <div className="relative z-10">
                  <div className="mb-5 flex items-center justify-between">
                    <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-[var(--line)] bg-[var(--surface)] text-[var(--gold-bright)] transition-colors duration-300 group-hover:border-[var(--gold)] group-hover:bg-[var(--gold)] group-hover:text-[var(--obsidian)]">
                      <Icon className="h-5 w-5" />
                    </span>
                    <span className="font-mono text-xs tracking-[0.2em] text-[var(--ink-faint)]">
                      {cat.index}
                    </span>
                  </div>

                  <h3 className="font-[family-name:var(--font-display)] text-xl font-bold text-[var(--ink)] transition-colors group-hover:text-[var(--gold-bright)]">
                    {cat.name}
                  </h3>
                  <p className="mt-1 font-mono text-[11px] tracking-[0.14em] text-[var(--gold)] uppercase">
                    {cat.subtitle}
                  </p>

                  <div className="mt-5 flex flex-wrap gap-2">
                    {cat.items.map((item) => (
                      <span
                        key={item}
                        className="rounded-full border border-[var(--line-soft)] bg-black/40 px-3 py-1.5 font-mono text-[11px] text-[var(--ink-soft)] transition-colors duration-300 group-hover:border-[var(--line)] hover:border-[var(--gold)] hover:text-[var(--gold-bright)]"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Open Source GitHub Contributions + Academic Pedigree */}
        <div className="mt-12 grid grid-cols-1 gap-7 lg:grid-cols-12">
          {/* Live GitHub Calendar */}
          <div
            data-arsenal-item
            className="rounded-2xl border border-[var(--line)] bg-[linear-gradient(155deg,rgba(255,248,235,0.03),rgba(11,8,5,0.94))] p-7 lg:col-span-7"
          >
            <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3.5">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-[var(--line)] bg-[var(--surface)] text-[var(--gold-bright)]">
                  <Activity className="h-5 w-5" />
                </span>
                <div>
                  <div className="font-mono text-[10px] tracking-[0.22em] text-[var(--gold)] uppercase">
                    Open Source Cadence
                  </div>
                  <h3 className="font-[family-name:var(--font-display)] text-xl font-bold text-[var(--ink)]">
                    GitHub Contributions
                  </h3>
                </div>
              </div>

              <a
                href={careerData.identity.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="font-mono text-xs tracking-[0.14em] text-[var(--ink-soft)] transition-colors hover:text-[var(--gold-bright)]"
              >
                @{careerData.identity.githubUsername}
              </a>
            </div>

            <div className="flex w-full justify-center overflow-x-auto rounded-xl border border-[var(--line-soft)] bg-black/45 px-4 py-6">
              <GitHubCalendar
                username={careerData.identity.githubUsername}
                colorScheme="dark"
                theme={{
                  light: [
                    "#14100C",
                    "#5C3D18",
                    "#8A6128",
                    "#C2974A",
                    "#E5C178",
                  ],
                  dark: [
                    "#14100C",
                    "#5C3D18",
                    "#8A6128",
                    "#C2974A",
                    "#E5C178",
                  ],
                }}
                fontSize={12}
                blockSize={11}
                blockMargin={4}
              />
            </div>
          </div>

          {/* Editorial Diploma & Certification Showcase */}
          <div
            data-arsenal-item
            className="flex flex-col justify-between gap-5 rounded-2xl border border-[var(--line)] bg-[linear-gradient(155deg,rgba(255,248,235,0.038),rgba(11,8,5,0.94))] p-7 lg:col-span-5"
          >
            <div>
              <div className="mb-5 font-mono text-[10px] tracking-[0.22em] text-[var(--gold)] uppercase">
                Academic Pedigree &amp; Credentials
              </div>

              <div className="space-y-5">
                {careerData.educationAndCerts.map((entry) => {
                  const isDegree = entry.type === "degree";
                  const BadgeIcon = isDegree ? GraduationCap : Award;

                  return (
                    <div
                      key={entry.id}
                      className="relative rounded-xl border border-[var(--line-soft)] bg-black/40 p-5 transition-colors hover:border-[var(--line)]"
                    >
                      <div className="flex items-start gap-3.5">
                        <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-[var(--line)] bg-[var(--surface)] text-[var(--gold-bright)]">
                          <BadgeIcon className="h-4 w-4" />
                        </span>
                        <div>
                          <div className="flex flex-wrap items-center gap-2 font-mono text-[10px] tracking-[0.16em] text-[var(--gold)] uppercase">
                            <span>{entry.period}</span>
                            {entry.distinction && (
                              <>
                                <span>·</span>
                                <span className="text-[var(--gold-bright)]">
                                  {entry.distinction}
                                </span>
                              </>
                            )}
                          </div>
                          <h4 className="mt-1.5 font-[family-name:var(--font-display)] text-base font-semibold leading-snug text-[var(--ink)]">
                            {entry.title}
                          </h4>
                          <p className="mt-1 text-xs text-[var(--ink-soft)]">
                            {entry.institution}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="border-t border-[var(--line-soft)] pt-4 font-mono text-[11px] tracking-[0.16em] text-[var(--ink-faint)] uppercase">
              Verified Foundation · Sana&apos;a, Yemen / Remote
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

