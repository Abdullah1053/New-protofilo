import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Activity,
  ChevronDown,
  Cloud,
  Cpu,
  Database,
  Layers,
  ShieldCheck,
  Smartphone,
} from "lucide-react";
import { careerData } from "../data/careerData";

gsap.registerPlugin(ScrollTrigger);

interface SpecMeta {
  id: string;
  goldKey: string;
  layerTag: string;
  metricBadge: string;
  proofSummary: string;
  icon: typeof Cloud;
}

const SPEC_METADATA: Record<string, SpecMeta> = {
  cb_exp_0_0: {
    id: "cb_exp_0_0",
    goldKey: "01 · Cloud Infrastructure",
    layerTag: "AWS EC2 · RDS MySQL · S3",
    metricBadge: "99.9% Uptime",
    proofSummary:
      "Provisioned hardened EC2 compute clusters, RDS MySQL primary/replica persistence, and automated S3 backup snapshots for zero-data-loss durability.",
    icon: Cloud,
  },
  cb_exp_0_1: {
    id: "cb_exp_0_1",
    goldKey: "02 · Client Engineering",
    layerTag: "ReactJS · RESTful State",
    metricBadge: "Client Performance",
    proofSummary:
      "Engineered responsive ReactJS interfaces wired to normalized REST endpoints, minimizing re-renders and optimizing perceived client latency.",
    icon: Layers,
  },
  cb_exp_0_2: {
    id: "cb_exp_0_2",
    goldKey: "03 · Security & Access",
    layerTag: "OAuth · Sanctum · AWS IAM",
    metricBadge: "RBAC Hardened",
    proofSummary:
      "Enforced scoped token lifecycles via OAuth and Laravel Sanctum alongside least-privilege AWS IAM policies across buckets, databases, and runtime services.",
    icon: ShieldCheck,
  },
  cb_exp_0_3: {
    id: "cb_exp_0_3",
    goldKey: "04 · Multi-System Fleet",
    layerTag: "Full-Stack & Mobile",
    metricBadge: "10+ Production Apps",
    proofSummary:
      "Shipped and sustained over 10 interconnected production web and mobile applications across backend APIs, relational schemas, frontends, and mobile clients.",
    icon: Cpu,
  },
  cb_exp_0_4: {
    id: "cb_exp_0_4",
    goldKey: "05 · Reliability & Ops",
    layerTag: "Query Tuning · Monitoring",
    metricBadge: "Zero-Downtime Ops",
    proofSummary:
      "Eliminated production bottlenecks through SQL execution plan tuning, rapid incident resolution, and disciplined deployment & telemetry workflows.",
    icon: Database,
  },
  cb_exp_0_5: {
    id: "cb_exp_0_5",
    goldKey: "06 · Delivery Pipelines",
    layerTag: "Reusable APIs · iOS & Android",
    metricBadge: "End-to-End CI/CD",
    proofSummary:
      "Standardized reusable API contracts, third-party service integrations, and automated build/release pipelines for Google Play and Apple App Store.",
    icon: Smartphone,
  },
};

export function RevealSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [selectedBulletId, setSelectedBulletId] = useState<string>("cb_exp_0_0");
  const [expandedIds, setExpandedIds] = useState<Record<string, boolean>>({
    cb_exp_0_0: true,
  });

  const exp = careerData.experience[0];
  const activeMeta = SPEC_METADATA[selectedBulletId] ?? SPEC_METADATA.cb_exp_0_0;
  const activeBullet =
    exp.bullets.find((b) => b.id === selectedBulletId) ?? exp.bullets[0];

  const toggleExpand = (id: string) => {
    setSelectedBulletId(id);
    setExpandedIds((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const items = section.querySelectorAll<HTMLElement>("[data-reveal-item]");
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
            duration: 0.9,
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

  const ActiveIcon = activeMeta.icon;

  return (
    <section
      ref={sectionRef}
      id="reveal"
      data-ambient="#100C08"
      data-glow="0.55"
      className="relative py-28 sm:py-36"
    >
      <div className="mx-auto max-w-[var(--maxw)] px-5 sm:px-8 lg:px-14">
        {/* Editorial Section Header */}
        <div data-reveal-item className="mb-14 max-w-3xl">
          <div className="mb-3 flex items-center gap-3">
            <span className="font-mono text-xs tracking-[0.26em] text-[var(--gold)] uppercase">
              01 — PRODUCTION TRACK RECORD
            </span>
          </div>
          <h2 className="gold-text font-[family-name:var(--font-display)] text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
            {exp.company}
          </h2>
          <p className="mt-3 font-mono text-xs tracking-[0.18em] text-[var(--ink-soft)] uppercase sm:text-sm">
            {exp.role} · {exp.period}
          </p>
        </div>

        {/* Split Editorial Layout */}
        <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-12 lg:gap-14">
          {/* Left: Interactive Architectural Blueprint Card */}
          <div
            data-reveal-item
            className="lg:sticky lg:top-24 lg:col-span-5"
          >
            <div className="relative overflow-hidden rounded-2xl border border-[var(--line)] bg-[linear-gradient(155deg,rgba(255,248,235,0.045),rgba(11,8,5,0.92))] p-6 shadow-[0_30px_80px_-28px_rgba(0,0,0,0.9)] backdrop-blur-md sm:p-8">
              {/* Subtle Architectural Blueprint Grid */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 opacity-20"
                style={{
                  backgroundImage:
                    "linear-gradient(to right, rgba(194,151,74,0.14) 1px, transparent 1px), linear-gradient(to bottom, rgba(194,151,74,0.14) 1px, transparent 1px)",
                  backgroundSize: "28px 28px",
                }}
              />

              <div className="relative z-10">
                <div className="flex items-center justify-between gap-4 border-b border-[var(--line-soft)] pb-5">
                  <div>
                    <div className="font-mono text-[10px] tracking-[0.22em] text-[var(--gold)] uppercase">
                      System Blueprint · Live Telemetry
                    </div>
                    <h3 className="mt-1 font-[family-name:var(--font-display)] text-xl font-semibold text-[var(--ink)]">
                      {exp.contextLabel}
                    </h3>
                  </div>
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 font-mono text-[10px] tracking-[0.16em] text-emerald-300 uppercase">
                    <Activity className="h-3 w-3" />
                    Nominal
                  </span>
                </div>

                {/* Telemetry Readout Grid */}
                <div className="mt-5 grid grid-cols-3 gap-2.5">
                  <div className="rounded-xl border border-[var(--line-soft)] bg-black/35 p-3">
                    <div className="font-mono text-[10px] text-[var(--ink-faint)] uppercase">
                      Availability
                    </div>
                    <div className="mt-1 font-mono text-sm font-semibold text-[var(--gold-bright)]">
                      99.9%
                    </div>
                  </div>
                  <div className="rounded-xl border border-[var(--line-soft)] bg-black/35 p-3">
                    <div className="font-mono text-[10px] text-[var(--ink-faint)] uppercase">
                      Fleet Scale
                    </div>
                    <div className="mt-1 font-mono text-sm font-semibold text-[var(--gold-bright)]">
                      10+ Apps
                    </div>
                  </div>
                  <div className="rounded-xl border border-[var(--line-soft)] bg-black/35 p-3">
                    <div className="font-mono text-[10px] text-[var(--ink-faint)] uppercase">
                      Auth Mesh
                    </div>
                    <div className="mt-1 font-mono text-sm font-semibold text-[var(--gold-bright)]">
                      IAM/OAuth
                    </div>
                  </div>
                </div>

                {/* Interactive Layer Selector */}
                <div className="mt-5">
                  <div className="mb-2.5 font-mono text-[10px] tracking-[0.2em] text-[var(--ink-faint)] uppercase">
                    Inspect Architectural Layer
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    {exp.bullets.map((b) => {
                      const meta = SPEC_METADATA[b.id];
                      const active = b.id === selectedBulletId;
                      return (
                        <button
                          key={b.id}
                          type="button"
                          onClick={() => setSelectedBulletId(b.id)}
                          className={[
                            "rounded-lg border px-3 py-2 text-left font-mono text-[11px] transition-all duration-300",
                            active
                              ? "border-[var(--gold)] bg-[rgba(194,151,74,0.14)] text-[var(--gold-bright)]"
                              : "border-[var(--line-soft)] bg-black/25 text-[var(--ink-soft)] hover:border-[var(--line)] hover:text-[var(--ink)]",
                          ].join(" ")}
                        >
                          {meta?.goldKey ?? b.id}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Active Layer Proof Panel */}
                <div className="mt-5 rounded-xl border border-[var(--line)] bg-black/45 p-4">
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2.5">
                      <span className="flex h-8 w-8 items-center justify-center rounded-lg border border-[var(--line)] bg-[var(--surface)] text-[var(--gold-bright)]">
                        <ActiveIcon className="h-4 w-4" />
                      </span>
                      <div>
                        <div className="font-mono text-[11px] font-medium text-[var(--ink)]">
                          {activeMeta.layerTag}
                        </div>
                        <div className="font-mono text-[10px] text-[var(--gold)]">
                          {activeMeta.metricBadge}
                        </div>
                      </div>
                    </div>
                    <span className="font-mono text-[10px] text-[var(--ink-faint)]">
                      {activeBullet.id}
                    </span>
                  </div>
                  <p className="mt-3 text-xs leading-relaxed text-[var(--ink-soft)]">
                    {activeMeta.proofSummary}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right: 6 Verified Experience Milestones as Luxury Spec Rows */}
          <div className="lg:col-span-7">
            <ul className="divide-y divide-[var(--line)] border-t border-b border-[var(--line)]">
              {exp.bullets.map((bullet) => {
                const meta = SPEC_METADATA[bullet.id];
                const isExpanded = Boolean(expandedIds[bullet.id]);
                const isSelected = selectedBulletId === bullet.id;

                return (
                  <li
                    key={bullet.id}
                    data-reveal-item
                    className={[
                      "group transition-colors duration-300",
                      isSelected ? "bg-[rgba(194,151,74,0.03)]" : "",
                    ].join(" ")}
                  >
                    <button
                      type="button"
                      onClick={() => toggleExpand(bullet.id)}
                      aria-expanded={isExpanded}
                      className="flex w-full items-start justify-between gap-4 px-2 py-6 text-left transition-colors sm:px-4"
                    >
                      <div className="space-y-2.5">
                        <div className="flex flex-wrap items-center gap-2.5">
                          <span className="font-mono text-xs font-medium tracking-[0.16em] text-[var(--gold-bright)] uppercase">
                            {meta?.goldKey ?? bullet.id}
                          </span>
                          <span className="rounded-full border border-[var(--line)] px-2.5 py-0.5 font-mono text-[10px] tracking-[0.12em] text-[var(--ink-soft)] uppercase">
                            {meta?.metricBadge}
                          </span>
                        </div>
                        <p className="text-sm leading-relaxed text-[var(--ink)] sm:text-base">
                          {bullet.text}
                        </p>
                      </div>

                      <span
                        className={[
                          "mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[var(--line-soft)] text-[var(--gold)] transition-transform duration-300 group-hover:border-[var(--gold)]",
                          isExpanded ? "rotate-180 bg-[rgba(194,151,74,0.12)]" : "",
                        ].join(" ")}
                      >
                        <ChevronDown className="h-4 w-4" />
                      </span>
                    </button>

                    {isExpanded && (
                      <div className="px-2 pb-6 sm:px-4">
                        <div className="rounded-xl border border-[var(--line-soft)] bg-black/30 p-4">
                          <p className="text-xs leading-relaxed text-[var(--ink-soft)] sm:text-sm">
                            {meta?.proofSummary}
                          </p>
                          <div className="mt-3 flex flex-wrap gap-2">
                            {bullet.highlights.map((tag) => (
                              <span
                                key={tag}
                                className="rounded-full border border-[var(--line)] bg-[var(--surface)] px-2.5 py-1 font-mono text-[10px] tracking-[0.12em] text-[var(--gold-bright)] uppercase"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

