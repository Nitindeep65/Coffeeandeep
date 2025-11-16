'use client';

import { useState, useEffect } from 'react';
import { apiService } from '@/lib/api';
import { Progress } from '@/components/ui/progress';
import { AnimatedTestimonials, type Testimonial } from '@/components/ui/shadcn-io/animated-testimonials';
import { Terminal, AnimatedSpan, TypingAnimation } from '@/components/ui/shadcn-io/terminal';

interface Experience {
  _id?: string;
  id?: number;
  title: string;
  company: string;
  duration: string;
  location: string;
  description: string;
  technologies: string[];
  current?: boolean;
  startDate?: Date;
  endDate?: Date;
  imageUrl?: string; // Add this field for experience images
}

const About = () => {
  const [showAddExperienceForm, setShowAddExperienceForm] = useState(false);
  const [showEditExperienceForm, setShowEditExperienceForm] = useState(false);
  const [editingExperience, setEditingExperience] = useState<Experience | null>(null);
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [newExperience, setNewExperience] = useState({
    title: '',
    company: '',
    duration: '',
    location: '',
    description: '',
    technologies: '',
    current: false,
    startDate: '',
    endDate: '',
    imageFile: null as File | null,
    imagePreview: ''
  });

  // Fetch experiences from API
  useEffect(() => {
    const fetchExperiences = async () => {
      try {
        setLoading(true);
        const data = await apiService.getExperience();
        console.log('Experiences data received:', data);
        setExperiences(data);
        setError(null);
      } catch (err) {
        console.error('Error fetching experiences:', err);
        setError('Failed to load experiences');
      } finally {
        setLoading(false);
      }
    };

    fetchExperiences();
  }, []);

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

  const handleExperienceInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setNewExperience(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewExperience(prev => ({
          ...prev,
          imageFile: file,
          imagePreview: reader.result as string
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setNewExperience(prev => ({
      ...prev,
      imageFile: null,
      imagePreview: ''
    }));
  };

  const openEditExperienceForm = (experience: Experience) => {
    setEditingExperience(experience);
    setNewExperience({
      title: experience.title,
      company: experience.company,
      duration: experience.duration,
      location: experience.location,
      description: experience.description,
      technologies: Array.isArray(experience.technologies) ? experience.technologies.join(', ') : '',
      current: experience.current || false,
      startDate: experience.startDate ? new Date(experience.startDate).toISOString().split('T')[0] : '',
      endDate: experience.endDate ? new Date(experience.endDate).toISOString().split('T')[0] : '',
      imageFile: null,
      imagePreview: experience.imageUrl || ''
    });
    setShowEditExperienceForm(true);
  };

  const closeEditExperienceForm = () => {
    setShowEditExperienceForm(false);
    setEditingExperience(null);
    setNewExperience({
      title: '',
      company: '',
      duration: '',
      location: '',
      description: '',
      technologies: '',
      current: false,
      startDate: '',
      endDate: '',
      imageFile: null,
      imagePreview: ''
    });
  };

  const handleAddExperience = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const formData = new FormData();
      formData.append('title', newExperience.title);
      formData.append('company', newExperience.company);
      formData.append('duration', newExperience.duration);
      formData.append('location', newExperience.location);
      formData.append('description', newExperience.description);
      formData.append('technologies', newExperience.technologies);
      formData.append('current', String(newExperience.current));
      
      // Send dates as ISO strings
      const startDate = newExperience.startDate ? new Date(newExperience.startDate).toISOString() : new Date().toISOString();
      formData.append('startDate', startDate);
      
      // Only add endDate if not current job
      if (!newExperience.current && newExperience.endDate) {
        const endDate = new Date(newExperience.endDate).toISOString();
        formData.append('endDate', endDate);
      }
      
      // Add image file if present
      if (newExperience.imageFile) {
        formData.append('image', newExperience.imageFile);
        console.log('Adding image file to FormData:', newExperience.imageFile.name);
      }

      if (editingExperience) {
        // Update existing experience
        const updatedExperience = await apiService.updateExperience(editingExperience._id!, formData);
        setExperiences(prev => prev.map(exp => exp._id === editingExperience._id ? updatedExperience.experience : exp));
        closeEditExperienceForm();
      } else {
        // Create new experience
        const savedExperience = await apiService.createExperience(formData);
        setExperiences(prev => [savedExperience.experience, ...prev]);
        setNewExperience({
          title: '',
          company: '',
          duration: '',
          location: '',
          description: '',
          technologies: '',
          current: false,
          startDate: '',
          endDate: '',
          imageFile: null,
          imagePreview: ''
        });
        setShowAddExperienceForm(false);
      }
    } catch (error) {
      console.error('Error handling experience:', error);
      alert(`Failed to ${editingExperience ? 'update' : 'add'} experience. Please try again.`);
    }
  };

  const deleteExperience = async (id: string) => {
    if (!confirm('Are you sure you want to delete this experience?')) {
      return;
    }

    try {
      await apiService.deleteExperience(id);
      setExperiences(prev => prev.filter(exp => exp._id !== id));
    } catch (error) {
      console.error('Error deleting experience:', error);
      alert('Failed to delete experience. Please try again.');
    }
  };

  const skills = [
    { category: "Frontend", items: ["React", "Next.js", "TypeScript", "Tailwind CSS", "JavaScript", "HTML5"] },
    { category: "Backend", items: ["Node.js", "Python", "Express.js", "RESTful APIs", "GraphQL", "MongoDB"] },
    { category: "Tools & Others", items: ["Git", "Docker", "AWS", "Figma", "VS Code", "Linux"] }
  ];

  const stats = [
    { number: "1.5+", label: "Years Experience" },
    { number: "15+", label: "Projects Completed" },
    { number: "100%", label: "Code Quality" }
  ];

  return (
    <section id="about" className="py-12 sm:py-16 lg:py-20 bg-white dark:bg-black transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Professional Background
          </h2>
          <p className="text-xl text-gray-600 dark:text-zinc-400 max-w-3xl mx-auto">
            Software engineer with a proven track record of delivering scalable solutions and exceptional user experiences.
          </p>
        </div>

        {/* Work Experience Section */}
        <div className="mt-20">
          <div className="flex items-center justify-between mb-12">
            <h3 className="text-3xl font-bold text-gray-900 dark:text-white">
              Professional Experience
            </h3>
            
            {/* Add Experience Button - Only in Development */}
            {process.env.NODE_ENV === 'development' && (
              <button
                onClick={() => setShowAddExperienceForm(true)}
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                + Add Experience
              </button>
            )}
          </div>

          {/* Experience with Animated Testimonials */}
          {loading ? (
            <div className="text-center py-12 space-y-4">
              <p className="text-gray-600 dark:text-zinc-400 mb-4">Loading experiences...</p>
              <div className="max-w-md mx-auto">
                <Progress value={66} className="h-2 bg-gray-200 dark:bg-zinc-800" />
              </div>
            </div>
          ) : error ? (
            <div className="text-center py-12">
              <p className="text-red-600 dark:text-red-400">{error}</p>
            </div>
          ) : experiences.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-600 dark:text-zinc-400 mb-4">No work experience found.</p>
              {process.env.NODE_ENV === 'development' && (
                <button 
                  onClick={() => fetch('/api/seed', { method: 'POST' }).then(() => window.location.reload())}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg"
                >
                  Seed Database
                </button>
              )}
            </div>
          ) : (
            <>
              <AnimatedTestimonials
                autoplay={true}
                testimonials={experiences.map((experience, idx): Testimonial => ({
                  quote: experience.description,
                  name: experience.title,
                  designation: `${experience.company} • ${experience.duration} • ${experience.location}`,
                  src: experience.imageUrl || 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=400&h=400&fit=crop',
                }))}
              />
              
              {/* Edit Experience Controls - Only in Development */}
              {process.env.NODE_ENV === 'development' && (
                <div className="mt-8 flex flex-wrap gap-3 justify-center">
                  {experiences.map((experience) => (
                    <div key={experience._id || experience.id} className="flex gap-2 items-center bg-white dark:bg-zinc-900 border dark:border-zinc-800 rounded-lg p-3">
                      <span className="text-sm font-medium text-gray-700 dark:text-zinc-300 truncate max-w-[200px]">
                        {experience.title}
                      </span>
                      <button
                        onClick={() => openEditExperienceForm(experience)}
                        className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 p-1.5 rounded transition-colors duration-200"
                        title="Edit experience"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                      </button>
                      <button
                        onClick={() => deleteExperience(experience._id!)}
                        className="text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 p-1.5 rounded transition-colors duration-200"
                        title="Delete experience"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-start mt-12 sm:mt-16 lg:mt-20">
          
          {/* Left Side - Story & Description */}
          <div className="space-y-6 sm:space-y-8">
            <div className="space-y-4 sm:space-y-6">
              <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white">
                Technical Expertise
              </h3>
              
              <div className="space-y-3 sm:space-y-4 text-sm sm:text-base text-gray-700 dark:text-zinc-300 leading-relaxed">
                <p>
                  Full-stack software engineer with 1.5+ years of professional experience building 
                  scalable web applications. Specialized in modern JavaScript frameworks including React, 
                  Next.js, and Node.js, with strong expertise in TypeScript and database design.
                </p>
                
                <p>
                  Focused on delivering high-quality code through test-driven development, implementing 
                  best practices for performance optimization, and creating responsive user interfaces 
                  that enhance user engagement and satisfaction.
                </p>
                
                <p>
                  Experienced in cloud technologies, containerization with Docker, and CI/CD pipelines. 
                  Committed to staying current with industry trends and continuously expanding technical 
                  skills to deliver innovative solutions.
                </p>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-2 sm:gap-3 lg:gap-6">
              {stats.map((stat, index) => (
                <div key={index} className="text-center p-2 sm:p-3 lg:p-6 bg-white dark:bg-zinc-900 rounded-lg sm:rounded-xl border dark:border-zinc-800 shadow-sm">
                  <div className="text-lg sm:text-2xl lg:text-3xl font-bold text-blue-600 dark:text-blue-400 mb-0.5 sm:mb-1 lg:mb-2">
                    {stat.number}
                  </div>
                  <div className="text-gray-600 dark:text-zinc-400 text-[9px] sm:text-xs lg:text-sm font-medium leading-tight">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Side - Skills */}
          <div className="space-y-4 sm:space-y-6 lg:space-y-8">
            <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white">
              Skills & Technologies
            </h3>
            
            {/* Terminal Component for Skills */}
            <Terminal className="w-full h-[300px] sm:h-[380px] lg:h-[450px]">
              <AnimatedSpan delay={100}>
                <span className="text-green-500">Nitindeep@portfolio</span>
                <span className="text-gray-500">:</span>
                <span className="text-blue-500">~/skills</span>
                <span className="text-gray-500">$ </span>
                <TypingAnimation delay={500} duration={40}>
                  cat frontend.txt
                </TypingAnimation>
              </AnimatedSpan>
              <AnimatedSpan delay={2000} className="text-cyan-400 pl-4">
                → React • Next.js • TypeScript • Tailwind CSS • JavaScript • HTML5
              </AnimatedSpan>
              <AnimatedSpan delay={2200}>{" "}</AnimatedSpan>
              
              <AnimatedSpan delay={2500}>
                <span className="text-green-500">Nitindeep@portfolio</span>
                <span className="text-gray-500">:</span>
                <span className="text-blue-500">~/skills</span>
                <span className="text-gray-500">$ </span>
                <TypingAnimation delay={3000} duration={40}>
                  cat backend.txt
                </TypingAnimation>
              </AnimatedSpan>
              <AnimatedSpan delay={4500} className="text-cyan-400 pl-4">
                → Node.js • Python • Express.js • RESTful APIs • GraphQL • MongoDB
              </AnimatedSpan>
              <AnimatedSpan delay={4700}>{" "}</AnimatedSpan>
              
              <AnimatedSpan delay={5000}>
                <span className="text-green-500">Nitindeep@portfolio</span>
                <span className="text-gray-500">:</span>
                <span className="text-blue-500">~/skills</span>
                <span className="text-gray-500">$ </span>
                <TypingAnimation delay={5500} duration={40}>
                  cat tools.txt
                </TypingAnimation>
              </AnimatedSpan>
              <AnimatedSpan delay={7000} className="text-cyan-400 pl-4">
                → Git • Docker • AWS • Figma • VS Code • Linux
              </AnimatedSpan>
              <AnimatedSpan delay={7200}>{" "}</AnimatedSpan>
              
              <AnimatedSpan delay={7500}>
                <span className="text-green-500">Nitindeep@portfolio</span>
                <span className="text-gray-500">:</span>
                <span className="text-blue-500">~/skills</span>
                <span className="text-gray-500">$ </span>
                <TypingAnimation delay={8000} duration={40}>
                  echo "Total projects: 15+"
                </TypingAnimation>
              </AnimatedSpan>
              <AnimatedSpan delay={9500} className="text-yellow-400 pl-4">
                Total projects: 15+
              </AnimatedSpan>
            </Terminal>
          </div>
        </div>

        {/* Add Experience Form Modal - Only in Development */}
        {process.env.NODE_ENV === 'development' && showAddExperienceForm && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white dark:bg-zinc-900 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              {/* Form Header */}
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 rounded-t-2xl">
                <h3 className="text-2xl font-bold text-white mb-2">Add Work Experience</h3>
                <p className="text-blue-100">Fill in your professional experience details</p>
                
                <button
                  onClick={() => setShowAddExperienceForm(false)}
                  className="absolute top-4 right-4 w-10 h-10 bg-white/20 rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors duration-200"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Form Content */}
              <form onSubmit={handleAddExperience} className="p-6 space-y-6">
                {/* Job Title */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-zinc-300 mb-2">
                    Job Title *
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={newExperience.title}
                    onChange={handleExperienceInputChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 dark:border-zinc-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-zinc-800 text-gray-900 dark:text-white"
                    placeholder="e.g., Senior Frontend Developer"
                  />
                </div>

                {/* Company */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-zinc-300 mb-2">
                    Company *
                  </label>
                  <input
                    type="text"
                    name="company"
                    value={newExperience.company}
                    onChange={handleExperienceInputChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 dark:border-zinc-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-zinc-800 text-gray-900 dark:text-white"
                    placeholder="e.g., Tech Solutions Inc."
                  />
                </div>

                {/* Duration and Location */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-zinc-300 mb-2">
                      Duration *
                    </label>
                    <input
                      type="text"
                      name="duration"
                      value={newExperience.duration}
                      onChange={handleExperienceInputChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 dark:border-zinc-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-zinc-800 text-gray-900 dark:text-white"
                      placeholder="e.g., 2022 - Present"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-zinc-300 mb-2">
                      Location *
                    </label>
                    <input
                      type="text"
                      name="location"
                      value={newExperience.location}
                      onChange={handleExperienceInputChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 dark:border-zinc-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-zinc-800 text-gray-900 dark:text-white"
                      placeholder="e.g., Remote, New York, NY"
                    />
                  </div>
                </div>

                {/* Current Job Checkbox */}
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="current-add"
                    name="current"
                    checked={newExperience.current}
                    onChange={handleExperienceInputChange}
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <label htmlFor="current-add" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                    This is my current job
                  </label>
                </div>

                {/* Description */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-zinc-300 mb-2">
                    Job Description *
                  </label>
                  <textarea
                    name="description"
                    value={newExperience.description}
                    onChange={handleExperienceInputChange}
                    required
                    rows={4}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-zinc-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-zinc-800 text-gray-900 dark:text-white resize-none"
                    placeholder="Describe your role, responsibilities, and achievements..."
                  />
                </div>

                {/* Technologies */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-zinc-300 mb-2">
                    Technologies Used *
                  </label>
                  <input
                    type="text"
                    name="technologies"
                    value={newExperience.technologies}
                    onChange={handleExperienceInputChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 dark:border-zinc-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-zinc-800 text-gray-900 dark:text-white"
                    placeholder="React, Node.js, MongoDB (comma separated)"
                  />
                  <p className="text-xs text-gray-500 dark:text-zinc-400 mt-1">
                    Separate technologies with commas
                  </p>
                </div>

                {/* Experience Image */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-zinc-300 mb-2">
                    Experience Image
                  </label>
                  
                  {newExperience.imagePreview ? (
                    <div className="space-y-3">
                      <div className="relative w-full h-48 bg-gray-100 dark:bg-zinc-800 rounded-lg overflow-hidden">
                        <img 
                          src={newExperience.imagePreview} 
                          alt="Experience preview"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex gap-2">
                        <label className="flex-1 bg-blue-600 text-white text-center py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors duration-200 cursor-pointer">
                          Change Image
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                            className="hidden"
                          />
                        </label>
                        <button
                          type="button"
                          onClick={removeImage}
                          className="bg-red-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-red-700 transition-colors duration-200"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  ) : (
                    <label className="block w-full h-32 border-2 border-dashed border-gray-300 dark:border-zinc-600 rounded-lg hover:border-blue-500 dark:hover:border-blue-400 transition-colors duration-200 cursor-pointer">
                      <div className="flex flex-col items-center justify-center h-full text-gray-500 dark:text-zinc-400">
                        <svg className="w-8 h-8 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                        </svg>
                        <span className="text-sm font-medium">Click to upload image</span>
                        <span className="text-xs">PNG, JPG, GIF up to 10MB</span>
                      </div>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="hidden"
                      />
                    </label>
                  )}
                  
                  <p className="text-xs text-gray-500 dark:text-zinc-400 mt-1">
                    Optional: Upload a company logo or related image
                  </p>
                </div>

                {/* Start and End Dates */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-zinc-300 mb-2">
                      Start Date *
                    </label>
                    <input
                      type="date"
                      name="startDate"
                      value={newExperience.startDate}
                      onChange={handleExperienceInputChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 dark:border-zinc-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-zinc-800 text-gray-900 dark:text-white"
                    />
                  </div>

                  {!newExperience.current && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-zinc-300 mb-2">
                        End Date
                      </label>
                      <input
                        type="date"
                        name="endDate"
                        value={newExperience.endDate}
                        onChange={handleExperienceInputChange}
                        className="w-full px-4 py-2 border border-gray-300 dark:border-zinc-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-zinc-800 text-gray-900 dark:text-white"
                      />
                    </div>
                  )}
                </div>

                {/* Form Actions */}
                <div className="flex gap-4 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowAddExperienceForm(false)}
                    className="flex-1 bg-gray-200 dark:bg-zinc-700 text-gray-800 dark:text-zinc-200 py-3 rounded-lg font-medium hover:bg-gray-300 dark:hover:bg-zinc-600 transition-colors duration-200"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 transition-all duration-200"
                  >
                    Add Experience
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Edit Experience Form Modal - Only in Development */}
        {process.env.NODE_ENV === 'development' && showEditExperienceForm && editingExperience && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white dark:bg-zinc-900 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              {/* Form Header */}
              <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-6 rounded-t-2xl">
                <h3 className="text-2xl font-bold text-white mb-2">Edit Experience</h3>
                <p className="text-purple-100">Update your work experience details</p>
                
                <button
                  onClick={closeEditExperienceForm}
                  className="absolute top-4 right-4 w-10 h-10 bg-white/20 rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors duration-200"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Form Content */}
              <form onSubmit={handleAddExperience} className="p-6 space-y-6">
                {/* Job Title */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-zinc-300 mb-2">
                    Job Title *
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={newExperience.title}
                    onChange={handleExperienceInputChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 dark:border-zinc-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-zinc-800 text-gray-900 dark:text-white"
                    placeholder="Enter your job title"
                  />
                </div>

                {/* Company Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-zinc-300 mb-2">
                    Company Name *
                  </label>
                  <input
                    type="text"
                    name="company"
                    value={newExperience.company}
                    onChange={handleExperienceInputChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 dark:border-zinc-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-zinc-800 text-gray-900 dark:text-white"
                    placeholder="Enter company name"
                  />
                </div>

                {/* Duration and Location */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-zinc-300 mb-2">
                      Duration *
                    </label>
                    <input
                      type="text"
                      name="duration"
                      value={newExperience.duration}
                      onChange={handleExperienceInputChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 dark:border-zinc-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-zinc-800 text-gray-900 dark:text-white"
                      placeholder="e.g., 2022 - Present"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-zinc-300 mb-2">
                      Location *
                    </label>
                    <input
                      type="text"
                      name="location"
                      value={newExperience.location}
                      onChange={handleExperienceInputChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 dark:border-zinc-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-zinc-800 text-gray-900 dark:text-white"
                      placeholder="e.g., Remote, New York, NY"
                    />
                  </div>
                </div>

                {/* Current Job Checkbox */}
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="current"
                    name="current"
                    checked={newExperience.current}
                    onChange={handleExperienceInputChange}
                    className="w-4 h-4 text-purple-600 bg-gray-100 border-gray-300 rounded focus:ring-purple-500 dark:focus:ring-purple-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <label htmlFor="current" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                    This is my current job
                  </label>
                </div>

                {/* Description */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-zinc-300 mb-2">
                    Job Description *
                  </label>
                  <textarea
                    name="description"
                    value={newExperience.description}
                    onChange={handleExperienceInputChange}
                    required
                    rows={4}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-zinc-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-zinc-800 text-gray-900 dark:text-white resize-none"
                    placeholder="Describe your role, responsibilities, and achievements..."
                  />
                </div>

                {/* Technologies */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-zinc-300 mb-2">
                    Technologies Used *
                  </label>
                  <input
                    type="text"
                    name="technologies"
                    value={newExperience.technologies}
                    onChange={handleExperienceInputChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 dark:border-zinc-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-zinc-800 text-gray-900 dark:text-white"
                    placeholder="React, Node.js, MongoDB (comma separated)"
                  />
                  <p className="text-sm text-gray-500 dark:text-zinc-400 mt-1">
                    Separate technologies with commas
                  </p>
                </div>

                {/* Experience Image */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-zinc-300 mb-2">
                    Experience Image
                  </label>
                  
                  {newExperience.imagePreview ? (
                    <div className="space-y-3">
                      <div className="relative w-full h-48 bg-gray-100 dark:bg-zinc-800 rounded-lg overflow-hidden">
                        <img 
                          src={newExperience.imagePreview} 
                          alt="Experience preview"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex gap-2">
                        <label className="flex-1 bg-blue-600 text-white text-center py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors duration-200 cursor-pointer">
                          Change Image
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                            className="hidden"
                          />
                        </label>
                        <button
                          type="button"
                          onClick={removeImage}
                          className="bg-red-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-red-700 transition-colors duration-200"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  ) : (
                    <label className="block w-full h-32 border-2 border-dashed border-gray-300 dark:border-zinc-600 rounded-lg hover:border-blue-500 dark:hover:border-blue-400 transition-colors duration-200 cursor-pointer">
                      <div className="flex flex-col items-center justify-center h-full text-gray-500 dark:text-zinc-400">
                        <svg className="w-8 h-8 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                        </svg>
                        <span className="text-sm font-medium">Click to upload image</span>
                        <span className="text-xs">PNG, JPG, GIF up to 10MB</span>
                      </div>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="hidden"
                      />
                    </label>
                  )}
                  
                  <p className="text-xs text-gray-500 dark:text-zinc-400 mt-1">
                    Optional: Upload a company logo or related image
                  </p>
                </div>

                {/* Start and End Dates */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-zinc-300 mb-2">
                      Start Date *
                    </label>
                    <input
                      type="date"
                      name="startDate"
                      value={newExperience.startDate}
                      onChange={handleExperienceInputChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 dark:border-zinc-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-zinc-800 text-gray-900 dark:text-white"
                    />
                  </div>

                  {!newExperience.current && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-zinc-300 mb-2">
                        End Date
                      </label>
                      <input
                        type="date"
                        name="endDate"
                        value={newExperience.endDate}
                        onChange={handleExperienceInputChange}
                        className="w-full px-4 py-2 border border-gray-300 dark:border-zinc-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-zinc-800 text-gray-900 dark:text-white"
                      />
                    </div>
                  )}
                </div>

                {/* Form Actions */}
                <div className="flex gap-4 pt-4">
                  <button
                    type="button"
                    onClick={closeEditExperienceForm}
                    className="flex-1 bg-gray-200 dark:bg-zinc-700 text-gray-800 dark:text-zinc-200 py-3 rounded-lg font-medium hover:bg-gray-300 dark:hover:bg-zinc-600 transition-colors duration-200"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 rounded-lg font-medium hover:from-purple-700 hover:to-pink-700 transition-all duration-200"
                  >
                    Update Experience
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default About;