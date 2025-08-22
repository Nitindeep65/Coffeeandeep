'use client';

import Link from 'next/link';

const Navbar = () => {
  const navItems = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Projects', href: '#projects' },
    { name: 'Contact Me', href: '#contact' },
  ];

  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetId = href.replace('#', '');
    const element = document.getElementById(targetId);
    
    if (element) {
      const offsetTop = element.offsetTop - 80; // Account for navbar height
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
    }
  };

  return (
    <nav className="bg-white dark:bg-black shadow-lg dark:shadow-zinc-900/50 fixed w-full top-0 z-50 transition-colors duration-300 border-b border-gray-200 dark:border-zinc-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-center items-center h-14 sm:h-16 lg:h-20">
          {/* Navigation - Always visible and centered */}
          <div className="flex items-baseline space-x-2 sm:space-x-4 md:space-x-6 lg:space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={(e) => handleSmoothScroll(e, item.href)}
                className="relative text-gray-700 dark:text-zinc-100 hover:text-blue-600 dark:hover:text-white px-1 py-2 sm:px-2 md:px-3 lg:px-4 rounded-md text-xs sm:text-sm lg:text-base font-medium transition-all duration-200 group"
              >
                {item.name}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 dark:bg-white transition-all duration-300 group-hover:w-full"></span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;