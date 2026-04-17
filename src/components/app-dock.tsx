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
  BookOpen,
  Sparkles,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Dock, DockIcon, DockItem, DockLabel } from '@/components/ui/shadcn-io/dock';

const navigationItems = [
  { title: 'Home', url: '#home', icon: Home },
  { title: 'Projects', url: '#projects', icon: FolderKanban },
  { title: 'About', url: '#about', icon: User },
  { title: 'Blog', url: '#blog', icon: BookOpen },
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
  const [isVisible, setIsVisible] = React.useState(true);
  const [lastScrollY, setLastScrollY] = React.useState(0);

  React.useEffect(() => {
    setIsDesktop(window.innerWidth >= 768);
    const handleResize = () => setIsDesktop(window.innerWidth >= 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Hide dock on rapid scroll down, show on scroll up
  React.useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY && currentScrollY > 300) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  React.useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'projects', 'about', 'blog', 'contact'];
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
    <AnimatePresence>
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{
          y: isVisible ? 0 : 100,
          opacity: isVisible ? 1 : 0,
        }}
        transition={{ duration: 0.4, ease: [0.25, 0.4, 0.25, 1] }}
        className="fixed bottom-3 md:bottom-6 left-1/2 -translate-x-1/2 z-50 w-fit"
      >
        {/* Ambient glow behind dock */}
        <div className="absolute -inset-2 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-cyan-500/20 rounded-3xl blur-xl opacity-60 dark:opacity-40 pointer-events-none" />
        
        <Dock 
          magnification={isDesktop ? 70 : 45} 
          distance={isDesktop ? 140 : 80}
          panelHeight={isDesktop ? 64 : 46}
          className="relative shadow-2xl shadow-black/20 dark:shadow-black/50 border border-white/20 dark:border-white/10 px-1.5 md:px-4 gap-1 md:gap-3 bg-black/80 dark:bg-white/90 backdrop-blur-2xl rounded-2xl"
        >
          {navigationItems.map((item) => {
            const isActive = activeSection === item.url.replace('#', '');
            return (
              <DockItem key={item.title}>
                <DockLabel className="text-xs font-medium bg-black/90 dark:bg-white/95 text-white dark:text-black border-white/20 dark:border-black/10 shadow-xl backdrop-blur-md">
                  {item.title}
                </DockLabel>
                <DockIcon>
                  <a 
                    href={item.url} 
                    onClick={(e) => handleSmoothScroll(e, item.url)}
                    className="relative flex items-center justify-center w-full h-full rounded-xl transition-all duration-300"
                  >
                    {/* Active indicator glow */}
                    {isActive && (
                      <motion.div
                        layoutId="dock-active-glow"
                        className="absolute inset-0 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 shadow-lg shadow-blue-500/30"
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      />
                    )}
                    
                    {/* Active dot indicator below icon */}
                    {isActive && (
                      <motion.div
                        layoutId="dock-active-dot"
                        className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-blue-400 shadow-sm shadow-blue-400/50"
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      />
                    )}
                    
                    <item.icon 
                      className={`relative z-10 w-4 h-4 md:w-5 md:h-5 transition-colors duration-300 ${
                        isActive 
                          ? 'text-white' 
                          : 'text-white/70 dark:text-black/60 hover:text-white dark:hover:text-black'
                      }`} 
                    />
                  </a>
                </DockIcon>
              </DockItem>
            );
          })}
          
          {/* Professional separator with gradient */}
          <div className="relative w-px h-6 md:h-8 mx-0.5">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/30 dark:via-black/20 to-transparent" />
          </div>
          
          {socialLinks.map((link) => (
            <DockItem key={link.title}>
              <DockLabel className="text-xs font-medium bg-black/90 dark:bg-white/95 text-white dark:text-black border-white/20 dark:border-black/10 shadow-xl backdrop-blur-md">
                {link.title}
              </DockLabel>
              <DockIcon>
                <a 
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-full h-full rounded-xl text-white/70 dark:text-black/60 hover:text-white dark:hover:text-black transition-all duration-300 hover:scale-110"
                >
                  <link.icon className="w-4 h-4 md:w-5 md:h-5" />
                </a>
              </DockIcon>
            </DockItem>
          ))}
        </Dock>
      </motion.div>
    </AnimatePresence>
  );
}
