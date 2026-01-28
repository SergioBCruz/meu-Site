import { Hero } from "./components/Hero";
import { Services } from "./components/Services";
import { Projects } from "./components/Projects";
import { Contact } from "./components/Contact";
import { FloatingCTA } from "./components/FloatingCTA";

export function Home() {
  return (
    <div className="bg-hero" style={{ minHeight: "100vh" }}>
      <Hero />
      <Services />
      <Projects />
      <Contact />
      <FloatingCTA />
    </div>
  );
}
