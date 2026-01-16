'use client';

import * as React from 'react';
import {
  Home,
  User,
  FolderKanban,
  Mail,
  Github,
  Linkedin,
  Twitter,
} from 'lucide-react';
import { Dock, DockIcon, DockItem, DockLabel } from '@/components/ui/shadcn-io/dock';

const navigationItems = [
  { title: 'Home', url: '#home', icon: Home },
  { title: 'Projects', url: '#projects', icon: FolderKanban },
  { title: 'About', url: '#about', icon: User },
  { title: 'Contact', url: '#contact', icon: Mail },
];

const socialLinks = [
  { title: 'GitHub', url: 'https://github.com/Nitindeep65', icon: Github },
  { title: 'LinkedIn', url: 'https://www.linkedin.com/in/singhdeep1/', icon: Linkedin },
  { title: 'Twitter', url: 'https://x.com/_NitindeepSingh', icon: Twitter },
];

export function AppDock() {
  const [activeSection, setActiveSection] = React.useState('home');
  const [isDesktop, setIsDesktop] = React.useState(false);

  React.useEffect(() => {
    // Set initial value
    setIsDesktop(window.innerWidth >= 768);

    // Handle resize
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

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
    handleScroll();
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
    <div className="fixed bottom-3 md:bottom-6 left-1/2 -translate-x-1/2 z-50 w-fit">
      <Dock 
        magnification={isDesktop ? 70 : 45} 
        distance={isDesktop ? 140 : 80}
        panelHeight={isDesktop ? 64 : 46}
        className="shadow-xl border border-gray-200 dark:border-gray-700 px-1.5 md:px-4 gap-1 md:gap-3 bg-black dark:bg-white backdrop-blur-xl"
      >
        {navigationItems.map((item) => {
          const isActive = activeSection === item.url.replace('#', '');
          return (
            <DockItem key={item.title}>
              <DockLabel className="text-xs">{item.title}</DockLabel>
              <DockIcon>
                <a 
                  href={item.url} 
                  onClick={(e) => handleSmoothScroll(e, item.url)}
                  className={`flex items-center justify-center w-full h-full rounded-md md:rounded-lg transition-colors ${
                    isActive 
                      ? 'bg-white dark:bg-black text-black dark:text-white' 
                      : 'hover:bg-white/20 dark:hover:bg-black/20 text-white dark:text-black'
                  }`}
                >
                  <item.icon className="w-4 h-4 md:w-5 md:h-5" />
                </a>
              </DockIcon>
            </DockItem>
          );
        })}
        
        {/* Separator */}
        <div className="w-px h-6 md:h-8 bg-white/30 dark:bg-black/30" />
        
        {socialLinks.map((link) => (
          <DockItem key={link.title}>
            <DockLabel className="text-xs">{link.title}</DockLabel>
            <DockIcon>
              <a 
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-full h-full rounded-md md:rounded-lg hover:bg-white/20 dark:hover:bg-black/20 text-white dark:text-black transition-colors"
              >
                <link.icon className="w-4 h-4 md:w-5 md:h-5" />
              </a>
            </DockIcon>
          </DockItem>
        ))}
      </Dock>
    </div>
  );
}
