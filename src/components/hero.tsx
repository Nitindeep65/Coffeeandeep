'use client';

import Image from 'next/image';

const Hero = () => {
  const handleSmoothScroll = (targetId: string) => {
    const element = document.getElementById(targetId);
    
    if (element) {
      const offsetTop = element.offsetTop - 80; // Account for navbar height
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
    }
  };

  const handleDownloadCV = () => {
    // You can replace this with your actual CV file path
    const cvUrl = '/cv/your-cv.pdf'; // Place your CV in public/cv/ folder
    const link = document.createElement('a');
    link.href = cvUrl;
    link.download = 'Developer-CV.pdf'; // The name for the downloaded file
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  return (
    <section id="home" className="min-h-screen bg-white dark:bg-black transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center min-h-[80vh]">
          
          {/* Left Side - About Me Content */}
          <div className="space-y-8 order-2 lg:order-1">
            <div className="space-y-4">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white leading-tight">
                Hi, I'm{' '}
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Developer
                </span>
              </h1>
              
              <h2 className="text-xl sm:text-2xl lg:text-3xl text-gray-600 dark:text-zinc-300 font-light">
                Full Stack Developer & UI/UX Designer
              </h2>
            </div>
            
            <p className="text-lg text-gray-700 dark:text-zinc-400 leading-relaxed max-w-lg">
              I'm a passionate developer with expertise in building modern web applications. 
              I love creating intuitive user experiences and bringing ideas to life through code.
            </p>
            
            <div className="flex flex-wrap gap-4">
              <button 
                onClick={() => handleSmoothScroll('projects')}
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-medium transition-colors duration-200 shadow-lg hover:shadow-xl"
              >
                View My Work
              </button>
              <button 
                onClick={() => handleSmoothScroll('contact')}
                className="border-2 border-gray-300 dark:border-zinc-600 text-gray-700 dark:text-zinc-300 hover:border-blue-600 dark:hover:border-blue-400 hover:text-blue-600 dark:hover:text-blue-400 px-8 py-3 rounded-lg font-medium transition-all duration-200"
              >
                Contact Me
              </button>
              <button 
                onClick={handleDownloadCV}
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-3 rounded-lg font-medium transition-all duration-200 shadow-lg hover:shadow-xl flex items-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Download CV
              </button>
            </div>
            
            {/* Skills/Technologies */}
            <div className="space-y-3">
              <p className="text-sm font-medium text-gray-600 dark:text-zinc-400 uppercase tracking-wide">
                Technologies I work with
              </p>
              <div className="flex flex-wrap gap-3">
                {['React', 'Next.js', 'TypeScript', 'Node.js', 'Python', 'Tailwind CSS'].map((tech) => (
                  <span 
                    key={tech}
                    className="px-3 py-1 bg-gray-100 dark:bg-zinc-800 text-gray-700 dark:text-zinc-300 rounded-full text-sm font-medium border dark:border-zinc-700"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
          
          {/* Right Side - Profile Image */}
          <div className="flex justify-center lg:justify-end order-1 lg:order-2">
            <div className="relative">
              {/* Background decoration */}
              <div className="absolute -inset-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl blur-2xl opacity-20 animate-pulse"></div>
              
              {/* Image container */}
              <div className="relative bg-white dark:bg-zinc-900 p-2 rounded-2xl shadow-2xl border dark:border-zinc-800">
                <div className="w-80 h-80 sm:w-96 sm:h-96 relative rounded-xl overflow-hidden bg-gray-200 dark:bg-zinc-800">
                  {/* Placeholder for your image */}
                  <div className="w-full h-full flex items-center justify-center text-gray-500 dark:text-zinc-400">
                    <div className="text-center space-y-2">
                      <div className="w-20 h-20 mx-auto bg-gray-300 dark:bg-zinc-700 rounded-full flex items-center justify-center">
                        <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                        </svg>
                      </div>
                      <p className="text-sm">Your Photo Here</p>
                    </div>
                  </div>

                  {/* Uncomment and add your image when ready */}
                 <Image
                    src="/image/pic.jpeg"
                    alt="Developer Profile"
                    fill
                    className="object-cover"
                    priority
                  /> 
                </div>
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
};

export default Hero;