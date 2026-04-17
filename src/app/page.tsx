import Hero from "@/components/hero";
import About from "@/components/about";
import Projects from "@/components/projects";
import Contact from "@/components/contact";
import Blog from "@/components/blog";
import { AppDock } from "@/components/app-dock";
import { getProjects, getBlogs } from "@/lib/data";

// Revalidate this page every 60 seconds so fresh MongoDB data shows up quickly
export const revalidate = 60;

export default async function Home() {
  // Fetch projects + blogs in parallel on the SERVER — no client-side loading delay
  const [projects, blogs] = await Promise.all([
    getProjects(),
    getBlogs(),
  ]);

  return (
    <div className="min-h-screen">
      <main className="w-full">
        <Hero />
        <Projects initialProjects={projects} />
        <About />
        <Blog initialBlogs={blogs} />
        <Contact />
      </main>
      <AppDock />
    </div>
  );
}
