import { CinematicEngine } from "./components/CinematicEngine";
import { HeroSection } from "./components/HeroSection";
import { ScrollFilmSection } from "./components/ScrollFilmSection";
import { RevealSection } from "./components/RevealSection";
import { ProjectsSection } from "./components/ProjectsSection";
import { ArsenalSection } from "./components/ArsenalSection";
import { CtaSection } from "./components/CtaSection";

export default function App() {
  return (
    <div className="relative min-h-screen text-[var(--ink)] selection:bg-[var(--gold)] selection:text-[var(--obsidian)]">
      <CinematicEngine />

      <main>
        <HeroSection />
        <ScrollFilmSection />
        <RevealSection />
        <ProjectsSection />
        <ArsenalSection />
        <CtaSection />
      </main>
    </div>
  );
}
