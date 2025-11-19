'use client';

import * as React from 'react';
import Image from 'next/image';
import {
  Home,
  User,
  FolderKanban,
  Mail,
  ChevronUp,
  User2,
  Github,
  Linkedin,
  Twitter,
  ExternalLink,
} from 'lucide-react';

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
} from '@/components/ui/sidebar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Separator } from '@/components/ui/separator';

// Menu items.
const items = [
  {
    title: 'Home',
    url: '#home',
    icon: Home,
  },
  {
    title: 'Projects',
    url: '#projects',
    icon: FolderKanban,
  },
  {
    title: 'About',
    url: '#about',
    icon: User,
  },
  {
    title: 'Contact',
    url: '#contact',
    icon: Mail,
  },
];

export function AppSidebar() {
  const [activeSection, setActiveSection] = React.useState('home');

  React.useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'projects', 'about', 'contact'];
      const scrollPosition = window.scrollY + 200;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetBottom = offsetTop + element.offsetHeight;

          if (scrollPosition >= offsetTop && scrollPosition < offsetBottom) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetId = href.replace('#', '');
    const element = document.getElementById(targetId);
    
    if (element) {
      const offsetTop = element.offsetTop - 80;
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
      setActiveSection(targetId);
    }
  };

  return (
    <Sidebar collapsible="icon" className="border-r border-gray-200 dark:border-black bg-white dark:bg-black dark:shadow-none [&[data-state=open]]:border-r-black dark:[&[data-state=open]]:border-r-black [&[data-mobile=true]]:bg-white dark:[&[data-mobile=true]]:bg-black [&[data-mobile=true]]:border-r-gray-200 dark:[&[data-mobile=true]]:border-r-black">
      {/* Mobile Header - Only visible on mobile */}
      <SidebarHeader className="border-b border-gray-200 dark:border-black lg:hidden bg-white dark:bg-black">
        <div className="bg-white dark:bg-black p-6">
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="w-16 h-16 rounded-2xl overflow-hidden shadow-lg ring-2 ring-gray-200 dark:ring-zinc-700">
                <Image
                  src="/image/profile.jpeg"
                  alt="Nitindeep Singh"
                  width={64}
                  height={64}
                  className="object-cover w-full h-full"
                  priority
                />
              </div>
              <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-white dark:border-black"></div>
            </div>
            <div className="flex flex-col gap-1">
              <span className="font-bold text-lg text-gray-900 dark:text-white">Nitindeep Singh</span>
              <span className="text-sm text-gray-600 dark:text-zinc-400">Full Stack Developer</span>
              <div className="flex gap-1 mt-1">
                <span className="text-xs px-2 py-0.5 bg-gray-900 dark:bg-white text-white dark:text-black rounded-full">Available</span>
              </div>
            </div>
          </div>
        </div>
      </SidebarHeader>
      
      {/* Desktop Header - Only visible on desktop */}
      <SidebarHeader className="border-b border-gray-200 dark:border-black pl-3 pt-12 hidden lg:block bg-white dark:bg-black">
      </SidebarHeader>
      
      <SidebarContent className="lg:pl-3 lg:pt-12 pt-6 bg-white dark:bg-black">
        <SidebarGroup>
          <SidebarGroupLabel className="px-3 text-xs font-semibold text-gray-500 dark:text-zinc-500 uppercase tracking-wider mb-2 lg:hidden block">
            Menu
          </SidebarGroupLabel>
          <SidebarGroupLabel className="px-2 text-xs font-medium text-muted-foreground lg:ml-3 lg:mt-6 ml-0 mt-2 hidden lg:block">
            Navigation
          </SidebarGroupLabel>
          <SidebarGroupContent className="lg:ml-3 lg:mt-6 ml-0 mt-2">
            <SidebarMenu className="space-y-1">
              {items.map((item) => {
                const isActive = activeSection === item.url.replace('#', '');
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton 
                      asChild 
                      tooltip={item.title}
                      isActive={isActive}
                      className="lg:px-3 px-4 lg:py-2 py-3 rounded-lg transition-all duration-200 hover:bg-gray-100 dark:hover:bg-zinc-800 data-[active=true]:bg-gray-900 data-[active=true]:text-white dark:data-[active=true]:bg-white dark:data-[active=true]:text-black"
                    >
                      <a 
                        href={item.url} 
                        onClick={(e) => handleSmoothScroll(e, item.url)}
                        className="flex items-center gap-3 w-full"
                      >
                        <item.icon className="lg:w-5 lg:h-5 w-6 h-6" />
                        <span className="lg:hidden block font-medium">{item.title}</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        
        <Separator className="my-6 lg:my-4 bg-gray-200 dark:bg-black" />
        
        <SidebarGroup>
          <SidebarGroupLabel className="px-3 text-xs font-semibold text-gray-500 dark:text-zinc-500 uppercase tracking-wider mb-2 lg:hidden block">
            Social Links
          </SidebarGroupLabel>
          <SidebarGroupLabel className="px-2 text-xs font-medium text-muted-foreground ml-3 mt-6 hidden lg:block">
            Connect
          </SidebarGroupLabel>
          <SidebarGroupContent className="lg:ml-3 lg:mt-6 ml-0 mt-2">
            <SidebarMenu className="space-y-1">
              <SidebarMenuItem>
                <SidebarMenuButton asChild tooltip="GitHub">
                  <a 
                    href="https://github.com/Nitindeep65" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="lg:px-3 px-4 lg:py-2 py-3 rounded-lg transition-all duration-200 hover:bg-gray-100 dark:hover:bg-zinc-800 flex items-center gap-3 w-full group"
                  >
                    <Github className="lg:w-5 lg:h-5 w-6 h-6 group-hover:text-primary transition-colors" />
                    <span className="lg:hidden block font-medium">GitHub</span>
                    <ExternalLink className="ml-auto size-3 opacity-50 lg:block hidden" />
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild tooltip="LinkedIn">
                  <a 
                    href="https://www.linkedin.com/in/singhdeep1/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="lg:px-3 px-4 lg:py-2 py-3 rounded-lg transition-all duration-200 hover:bg-gray-100 dark:hover:bg-zinc-800 flex items-center gap-3 w-full group"
                  >
                    <Linkedin className="lg:w-5 lg:h-5 w-6 h-6 group-hover:text-primary transition-colors" />
                    <span className="lg:hidden block font-medium">LinkedIn</span>
                    <ExternalLink className="ml-auto size-3 opacity-50 lg:block hidden" />
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild tooltip="Twitter">
                  <a 
                    href="https://x.com/_NitindeepSingh" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="lg:px-3 px-4 lg:py-2 py-3 rounded-lg transition-all duration-200 hover:bg-gray-100 dark:hover:bg-zinc-800 flex items-center gap-3 w-full group"
                  >
                    <Twitter className="lg:w-5 lg:h-5 w-6 h-6 group-hover:text-primary transition-colors" />
                    <span className="lg:hidden block font-medium">Twitter</span>
                    <ExternalLink className="ml-auto size-3 opacity-50 lg:block hidden" />
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="border-t border-gray-200 dark:border-black pl-3 pt-12 hidden lg:block bg-white dark:bg-black">
      </SidebarFooter>
    </Sidebar>
  );
}
