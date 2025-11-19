import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import Hero from "@/components/hero";
import About from "@/components/about";
import Projects from "@/components/projects";
import Contact from "@/components/contact";

export default function Home() {
  return (
    <SidebarProvider defaultOpen={false}>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-14 shrink-0 items-center justify-between gap-3 px-4 lg:hidden border-b sticky top-0 bg-white/80 dark:bg-black/80 backdrop-blur-xl supports-[backdrop-filter]:bg-white/70 dark:supports-[backdrop-filter]:bg-black/70 z-50 border-gray-200/50 dark:border-black/50">
          <SidebarTrigger className="-ml-1 hover:bg-gray-100 dark:hover:bg-zinc-800 rounded-lg p-2 transition-colors" />
          <div className="flex-1 flex items-center justify-center">
            <h1 className="text-base font-bold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-400 bg-clip-text text-transparent">
              Coffeeandeep
            </h1>
          </div>
          <div className="w-8" />
        </header>
        <main className="flex-1">
          <Hero />
          <Projects />
          <About />
          <Contact />
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
