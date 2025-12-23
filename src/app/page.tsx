import Hero from "@/components/hero";
import About from "@/components/about";
import Projects from "@/components/projects";
import Contact from "@/components/contact";
import { AppDock } from "@/components/app-dock";

export default function Home() {
  return (
    <div className="min-h-screen">
      <main className="w-full">
        <Hero />
        <Projects />
        <About />
        <Contact />
      </main>
      <AppDock />
    </div>
  );
}
