'use client';

import { useState, useRef } from 'react';
import { PixelImage } from '@/components/ui/shadcn-io/pixel-image';
import { 
  RelativeTime, 
  RelativeTimeZone, 
  RelativeTimeZoneLabel, 
  RelativeTimeZoneDisplay 
} from '@/components/ui/shadcn-io/relative-time';
import Link from 'next/link';

const Hero = () => {
  const [hoveredService, setHoveredService] = useState<number | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const services = [
    {
      title: 'Full Stack Development',
      description: 'Building end-to-end web applications with modern technologies. From database design to frontend interfaces, I create scalable and maintainable solutions.'
    },
    {
      title: 'Frontend Engineering',
      description: 'Crafting beautiful, responsive user interfaces with React, Next.js, and TypeScript. Focused on performance, accessibility, and exceptional user experience.'
    },
    {
      title: 'Backend Development',
      description: 'Designing robust APIs and server-side solutions using Node.js, Express, and MongoDB. Building secure, scalable backend architectures.'
    },
    {
      title: 'Freelancer',
      description: 'Available for freelance projects and collaborations. Delivering high-quality solutions with flexible engagement models, transparent communication, and on-time delivery.'
    },
    {
      title: 'Cloud & DevOps',
      description: 'Deploying and managing applications on AWS, Docker, and CI/CD pipelines. Ensuring reliability, scalability, and continuous delivery.'
    }
  ];

  const handleDownloadCV = () => {
    const cvUrl = '/cv/your-cv.pdf';
    const link = document.createElement('a');
    link.href = cvUrl;
    link.download = 'Developer-CV.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleUploadCV = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.type.includes('pdf')) {
      setUploadStatus('error');
      alert('Please upload a PDF file only.');
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      setUploadStatus('error');
      alert('File size must be less than 10MB.');
      return;
    }

    setIsUploading(true);
    setUploadStatus('idle');

    try {
      const formData = new FormData();
      formData.append('cv', file);

      const response = await fetch('/api/upload-cv', {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();

      if (response.ok) {
        setUploadStatus('success');
        alert('CV uploaded successfully!');
      } else {
        setUploadStatus('error');
        alert(result.error || 'Failed to upload CV');
      }
    } catch (error) {
      setUploadStatus('error');
      alert('Error uploading CV. Please try again.');
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const triggerFileUpload = () => {
    fileInputRef.current?.click();
  };

  return (
    <section id="home" className="min-h-screen bg-white dark:bg-black transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-12 sm:py-16 lg:py-20">
        
        {/* Relative Time Display at Top */}
        <div className="mb-12" suppressHydrationWarning>
          <RelativeTime
            timeFormatOptions={{
              hour: '2-digit',
              minute: '2-digit',
              second: '2-digit',
              hour12: true,
            }}
            className="flex justify-center"
          >
            <RelativeTimeZone zone="Asia/Kolkata">
              <RelativeTimeZoneLabel>IST</RelativeTimeZoneLabel>
              <RelativeTimeZoneDisplay />
            </RelativeTimeZone>
          </RelativeTime>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
          
          {/* Left Side - Image and Description */}
          <div className="space-y-6">
            {/* Profile Image */}
            <div>
              <PixelImage
                src="/image/pic.jpeg"
                grid="8x8"
                grayscaleAnimation={true}
                pixelFadeInDuration={800}
                maxAnimationDelay={1500}
                colorRevealDelay={1600}
                showReplayButton={false}
              />
            </div>
            
            {/* About Me */}
            <div className="w-72 md:w-96">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Nitindeep Singh
              </h3>
              <p className="text-gray-600 dark:text-zinc-400 leading-relaxed text-sm">
                Full-stack developer passionate about building modern web applications. 
                I specialize in React, Next.js, Node.js, and cloud technologies. 
                Currently open to freelance projects and exciting opportunities.
              </p>
            </div>
          </div>
          
          {/* Right Side - Services List */}
          <div className="flex flex-col justify-between">
            <div className="space-y-0">
              {services.map((service, index) => {
                const isHovered = hoveredService === index;
                return (
                  <div
                    key={index}
                    onMouseEnter={() => setHoveredService(index)}
                    onMouseLeave={() => setHoveredService(null)}
                    className="group cursor-pointer border-b border-gray-200 dark:border-zinc-800 py-3 transition-all duration-200"
                  >
                    {/* Service Title Row */}
                    <div className="flex items-baseline justify-between">
                      <h2 
                        className={`text-2xl sm:text-3xl lg:text-4xl font-light transition-colors duration-200 ${
                          isHovered 
                            ? 'text-gray-900 dark:text-white' 
                            : 'text-gray-400 dark:text-zinc-600 group-hover:text-gray-700 dark:group-hover:text-zinc-300'
                        }`}
                      >
                        {service.title}
                      </h2>
                      <div className="flex items-center gap-2">
                        <span 
                          className={`text-sm font-mono transition-all duration-200 ${
                            isHovered 
                              ? 'text-red-500' 
                              : 'text-gray-300 dark:text-zinc-700 group-hover:text-red-400'
                          }`}
                        >
                          0{index + 1}
                        </span>
                        <span 
                          className={`text-sm transition-all duration-200 ${
                            isHovered 
                              ? 'text-red-500 translate-x-1' 
                              : 'text-gray-300 dark:text-zinc-700 group-hover:text-red-400 group-hover:translate-x-0.5'
                          } transform`}
                        >
                          →
                        </span>
                      </div>
                    </div>
                    
                    {/* Dropdown Description */}
                    <div 
                      className={`overflow-hidden transition-all duration-300 ease-out ${
                        isHovered 
                          ? 'max-h-32 opacity-100 translate-y-0 mt-3' 
                          : 'max-h-0 opacity-0 -translate-y-2 mt-0'
                      }`}
                    >
                      <p className="text-sm sm:text-base text-gray-600 dark:text-zinc-400 leading-relaxed pr-8">
                        {service.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row flex-wrap gap-2 sm:gap-3 mt-8 sm:mt-12">
              <Link href="https://calendly.com/nitindeep65/30min" className="w-full sm:w-auto">
                <button className="w-full sm:w-auto group border-2 border-red-500 text-red-500 hover:bg-red-500 hover:text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg text-sm sm:text-base font-medium transition-all duration-200 flex items-center justify-center gap-2">
                  Get Started
                  <svg 
                    className="w-3 h-3 sm:w-4 sm:h-4 transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17L17 7M17 7H7M17 7V17" />
                  </svg>
                </button>
              </Link>

              <Link href="https://calendly.com/nitindeep65/30min" className="w-full sm:w-auto">
                <button className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg text-sm sm:text-base font-medium transition-all duration-200 flex items-center justify-center gap-2">
                  <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span className="hidden xs:inline">Book a Call on Calendly</span>
                  <span className="xs:hidden">Book a Call</span>
                </button>
              </Link>

              <button 
                onClick={handleDownloadCV}
                className="w-full sm:w-auto border-2 border-gray-300 dark:border-zinc-700 text-gray-700 dark:text-zinc-300 hover:bg-gray-100 dark:hover:bg-zinc-800 px-4 sm:px-6 py-2 sm:py-3 rounded-lg text-sm sm:text-base font-medium transition-all duration-200 flex items-center justify-center gap-2"
              >
                <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Download CV
              </button>

              {/* CV Upload - Only in Development */}
              {process.env.NODE_ENV === 'development' && (
                <>
                  <button 
                    onClick={triggerFileUpload}
                    disabled={isUploading}
                    className={`w-full sm:w-auto ${
                      isUploading 
                        ? 'bg-gray-400 cursor-not-allowed' 
                        : uploadStatus === 'success'
                        ? 'bg-green-600 hover:bg-green-700'
                        : uploadStatus === 'error'
                        ? 'bg-red-600 hover:bg-red-700'
                        : 'bg-orange-600 hover:bg-orange-700'
                    } text-white px-6 sm:px-10 py-4 sm:py-5 rounded-xl text-base sm:text-lg font-medium transition-all duration-200 flex items-center justify-center gap-2`}
                  >
                    {isUploading ? (
                      <>
                        <svg className="w-4 h-4 sm:w-5 sm:h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Uploading...
                      </>
                    ) : (
                      <>
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                        </svg>
                        Upload CV
                      </>
                    )}
                  </button>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept=".pdf"
                    onChange={handleUploadCV}
                    className="hidden"
                  />
                </>
              )}
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
};

export default Hero;
