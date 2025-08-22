'use client';

import Image from 'next/image';
import { useState, useRef } from 'react';

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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center min-h-[80vh]">
          
          {/* Left Side - About Me Content */}
          <div className="space-y-8 order-2 lg:order-1">
            <div className="space-y-4">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white leading-tight">
                Hi, I'm{' '}
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Nitindeep
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
            
            <div className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4">
              <button 
                onClick={() => handleSmoothScroll('projects')}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 sm:px-8 py-3 rounded-lg font-medium transition-colors duration-200 shadow-lg hover:shadow-xl text-center"
              >
                View My Work
              </button>
              <button 
                onClick={() => handleSmoothScroll('contact')}
                className="border-2 border-gray-300 dark:border-zinc-600 text-gray-700 dark:text-zinc-300 hover:border-blue-600 dark:hover:border-blue-400 hover:text-blue-600 dark:hover:text-blue-400 px-6 sm:px-8 py-3 rounded-lg font-medium transition-all duration-200 text-center"
              >
                Contact Me
              </button>
              
              {/* CV Buttons Row */}
              <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                <button 
                  onClick={handleDownloadCV}
                  className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-6 sm:px-8 py-3 rounded-lg font-medium transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
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