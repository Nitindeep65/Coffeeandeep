'use client';

import { useState } from 'react';

const About = () => {
  const [showAddExperienceForm, setShowAddExperienceForm] = useState(false);
  const [experiences, setExperiences] = useState([
    {
      id: 1,
      title: "Senior Full Stack Developer",
      company: "Tech Solutions Inc.",
      duration: "2022 - Present",
      location: "Remote",
      description: "Led development of scalable web applications using React, Node.js, and cloud technologies. Mentored junior developers and collaborated with cross-functional teams to deliver high-quality solutions.",
      technologies: ["React", "Node.js", "AWS", "MongoDB", "TypeScript"]
    },
    {
      id: 2,
      title: "Frontend Developer",
      company: "Digital Agency Pro",
      duration: "2021 - 2022",
      location: "New York, NY",
      description: "Developed responsive web applications and improved user experience across multiple client projects. Collaborated with designers to implement pixel-perfect interfaces.",
      technologies: ["React", "JavaScript", "CSS3", "Figma", "Git"]
    },
    {
      id: 3,
      title: "Junior Web Developer",
      company: "StartUp Ventures",
      duration: "2020 - 2021",
      location: "San Francisco, CA",
      description: "Built and maintained company websites, learned modern development practices, and contributed to the development of internal tools and dashboards.",
      technologies: ["HTML5", "CSS3", "JavaScript", "PHP", "MySQL"]
    }
  ]);

  const [newExperience, setNewExperience] = useState({
    title: '',
    company: '',
    duration: '',
    location: '',
    description: '',
    technologies: ''
  });

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

  const handleExperienceInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewExperience(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAddExperience = (e: React.FormEvent) => {
    e.preventDefault();
    
    const experience = {
      id: experiences.length + 1,
      title: newExperience.title,
      company: newExperience.company,
      duration: newExperience.duration,
      location: newExperience.location,
      description: newExperience.description,
      technologies: newExperience.technologies.split(',').map(tech => tech.trim())
    };

    setExperiences(prev => [experience, ...prev]);
    setNewExperience({
      title: '',
      company: '',
      duration: '',
      location: '',
      description: '',
      technologies: ''
    });
    setShowAddExperienceForm(false);
  };

  const deleteExperience = (id: number) => {
    setExperiences(prev => prev.filter(exp => exp.id !== id));
  };

  const skills = [
    { category: "Frontend", items: ["React", "Next.js", "TypeScript", "Tailwind CSS", "JavaScript", "HTML5"] },
    { category: "Backend", items: ["Node.js", "Python", "Express.js", "RESTful APIs", "GraphQL", "MongoDB"] },
    { category: "Tools & Others", items: ["Git", "Docker", "AWS", "Figma", "VS Code", "Linux"] }
  ];

  const stats = [
    { number: "3+", label: "Years Experience" },
    { number: "50+", label: "Projects Completed" },
    { number: "25+", label: "Happy Clients" },
    { number: "100%", label: "Code Quality" }
  ];

  return (
    <section id="about" className="py-20 bg-gray-50 dark:bg-zinc-950 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            About <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Me</span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-zinc-400 max-w-3xl mx-auto">
            Passionate about creating digital experiences that make a difference
          </p>
        </div>

        {/* Work Experience Section */}
        <div className="mt-20">
          <div className="flex items-center justify-between mb-12">
            <h3 className="text-3xl font-bold text-gray-900 dark:text-white">
              Work <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Experience</span>
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

          {/* Experience Timeline */}
          <div className="space-y-8">
            {experiences.map((experience, index) => (
              <div key={experience.id} className="relative">
                {/* Timeline line */}
                {index !== experiences.length - 1 && (
                  <div className="absolute left-4 top-12 w-0.5 h-full bg-gray-200 dark:bg-zinc-700"></div>
                )}
                
                <div className="flex gap-6">
                  {/* Timeline dot */}
                  <div className="flex-shrink-0 w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center mt-2">
                    <div className="w-3 h-3 bg-white rounded-full"></div>
                  </div>
                  
                  {/* Experience content */}
                  <div className="flex-1 bg-white dark:bg-zinc-900 rounded-xl p-6 border dark:border-zinc-800 shadow-sm hover:shadow-md transition-shadow duration-200">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
                          {experience.title}
                        </h4>
                        <div className="flex flex-wrap items-center gap-4 text-gray-600 dark:text-zinc-400 text-sm">
                          <span className="font-medium text-blue-600 dark:text-blue-400">
                            {experience.company}
                          </span>
                          <span>{experience.duration}</span>
                          <span>{experience.location}</span>
                        </div>
                      </div>
                      
                      {/* Delete button - Only in Development */}
                      {process.env.NODE_ENV === 'development' && (
                        <button
                          onClick={() => deleteExperience(experience.id)}
                          className="text-red-500 hover:text-red-700 p-1 rounded transition-colors duration-200"
                          title="Delete experience"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      )}
                    </div>
                    
                    <p className="text-gray-700 dark:text-zinc-300 leading-relaxed mb-4">
                      {experience.description}
                    </p>
                    
                    {/* Technologies used */}
                    <div className="flex flex-wrap gap-2">
                      {experience.technologies.map((tech, techIndex) => (
                        <span
                          key={techIndex}
                          className="text-xs bg-gray-100 dark:bg-zinc-800 text-gray-700 dark:text-zinc-300 px-3 py-1 rounded-full font-medium"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-start mt-20">
          
          {/* Left Side - Story & Description */}
          <div className="space-y-8">
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                My Journey
              </h3>
              
              <div className="space-y-4 text-gray-700 dark:text-zinc-300 leading-relaxed">
                <p>
                  I'm a passionate full-stack developer with over 3 years of experience in building 
                  modern web applications. My journey started with curiosity about how websites work, 
                  and it has evolved into a deep love for creating seamless digital experiences.
                </p>
                
                <p>
                  I specialize in React, Next.js, and modern JavaScript frameworks, with a strong 
                  foundation in backend technologies like Node.js and Python. I believe in writing 
                  clean, maintainable code and creating user interfaces that are both beautiful and functional.
                </p>
                
                <p>
                  When I'm not coding, you'll find me exploring new technologies, contributing to 
                  open-source projects, or sharing knowledge with the developer community. I'm always 
                  excited to take on new challenges and collaborate on innovative projects.
                </p>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-6">
              {stats.map((stat, index) => (
                <div key={index} className="text-center p-6 bg-white dark:bg-zinc-900 rounded-xl border dark:border-zinc-800 shadow-sm">
                  <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                    {stat.number}
                  </div>
                  <div className="text-gray-600 dark:text-zinc-400 text-sm font-medium">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Side - Skills */}
          <div className="space-y-8">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
              Skills & Technologies
            </h3>
            
            <div className="space-y-8">
              {skills.map((skillGroup, index) => (
                <div key={index} className="space-y-4">
                  <h4 className="text-lg font-semibold text-gray-800 dark:text-zinc-200">
                    {skillGroup.category}
                  </h4>
                  
                  <div className="grid grid-cols-2 gap-3">
                    {skillGroup.items.map((skill, skillIndex) => (
                      <div 
                        key={skillIndex}
                        className="flex items-center space-x-3 p-3 bg-white dark:bg-zinc-900 rounded-lg border dark:border-zinc-800 hover:border-blue-300 dark:hover:border-blue-600 transition-colors duration-200"
                      >
                        <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                        <span className="text-gray-700 dark:text-zinc-300 text-sm font-medium">
                          {skill}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
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
                    className="w-full px-4 py-2 border border-gray-300 dark:border-zinc-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-zinc-800 text-gray-900 dark:text-white"
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
      </div>
    </section>
  );
};

export default About;