'use client';

import Image from 'next/image';
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
  const [isUploading, setIsUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const fileInputRef = useRef<HTMLInputElement>(null);

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

  const handleUploadCV = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.includes('pdf')) {
      setUploadStatus('error');
      alert('Please upload a PDF file only.');
      return;
    }

    // Validate file size (max 10MB)
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
        alert('CV uploaded successfully! The download button now uses your new CV.');
      } else {
        setUploadStatus('error');
        alert(result.error || 'Failed to upload CV');
      }
    } catch (error) {
      setUploadStatus('error');
      alert('Error uploading CV. Please try again.');
    } finally {
      setIsUploading(false);
      // Reset file input
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
        <div className="mb-8" suppressHydrationWarning>
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

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center min-h-[calc(100vh-8rem)]">
          
          {/* Left Side - About Me Content */}
          <div className="space-y-8 order-2 lg:order-1">
            <div className="space-y-4">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white leading-tight">
                <span className="text-gray-700 dark:text-zinc-300">Nitindeep Singh</span>
              </h1>
              
              <h2 className="text-xl sm:text-2xl lg:text-3xl text-gray-600 dark:text-zinc-400 font-medium">
                Full Stack Developer & Software Engineer
              </h2>
            </div>
            
            <p className="text-lg text-gray-700 dark:text-zinc-400 leading-relaxed max-w-lg">
              Experienced software engineer specializing in building scalable web applications 
              using React, Next.js, TypeScript, and Node.js. Focused on delivering high-performance 
              solutions and exceptional user experiences.
            </p>
            
            <div className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4">
              <button 
                onClick={() => handleSmoothScroll('projects')}
                className="bg-gray-900 dark:bg-white hover:bg-gray-800 dark:hover:bg-gray-100 text-white dark:text-gray-900 px-6 sm:px-8 py-3 rounded-lg font-medium transition-colors duration-200 text-center"
              >
                View Projects
              </button>
              <Link href="https://calendly.com/nitindeep65/30min" className="w-full sm:w-auto">
              <button 
                className="border bg-blue-700 dark:border-white text-white dark:text-white hover:bg-blue-800 hover:text-white dark:hover:bg-blue-500 dark:hover:text-white px-6 sm:px-8 py-3 rounded-lg font-medium transition-all duration-200 text-center w-full"
              >
                Book a Call on Calendly
              </button>
              </Link>
              
              {/* CV Buttons Row */}
              <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                <button 
                  onClick={handleDownloadCV}
                  className="bg-gray-100 dark:bg-zinc-800 hover:bg-gray-200 dark:hover:bg-zinc-700 text-gray-900 dark:text-white border border-gray-300 dark:border-zinc-600 px-6 sm:px-8 py-3 rounded-lg font-medium transition-all duration-200 flex items-center justify-center gap-2"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
                      className={`${
                        isUploading 
                          ? 'bg-gray-400 cursor-not-allowed' 
                          : uploadStatus === 'success'
                          ? 'bg-green-600 hover:bg-green-700'
                          : uploadStatus === 'error'
                          ? 'bg-red-600 hover:bg-red-700'
                          : 'bg-orange-600 hover:bg-orange-700'
                      } text-white px-6 sm:px-8 py-3 rounded-lg font-medium transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center gap-2`}
                    >
                      {isUploading ? (
                        <>
                          <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Uploading...
                        </>
                      ) : uploadStatus === 'success' ? (
                        <>
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          CV Updated!
                        </>
                      ) : uploadStatus === 'error' ? (
                        <>
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                          Upload Failed
                        </>
                      ) : (
                        <>
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                          </svg>
                          Upload New CV
                        </>
                      )}
                    </button>

                    {/* Hidden file input */}
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
          
          {/* Right Side - Profile Image with Pixel Effect */}
          <div className="flex justify-center lg:justify-end order-1 lg:order-2">
            <div className="relative">
              {/* Image container with pixel animation (circular on mobile, rounded-2xl on lg) */}
              <div className="relative bg-white dark:bg-zinc-900 p-4 rounded-full lg:rounded-2xl border-2 border-gray-300 dark:border-zinc-700 shadow-2xl w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 lg:w-auto lg:h-auto overflow-hidden flex items-center justify-center">
                <div className="w-full h-full flex items-center justify-center translate-y-9 lg:translate-y-0">
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
              </div>
              
              {/* Decorative elements */}
              <div className="absolute -z-10 -top-4 -right-4 w-72 h-72 bg-gradient-to-br from-blue-400/20 to-purple-400/20 dark:from-blue-600/10 dark:to-purple-600/10 rounded-2xl blur-2xl"></div>
              <div className="absolute -z-10 -bottom-4 -left-4 w-72 h-72 bg-gradient-to-tr from-pink-400/20 to-orange-400/20 dark:from-pink-600/10 dark:to-orange-600/10 rounded-2xl blur-2xl"></div>
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
};

export default Hero;