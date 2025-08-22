'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface Project {
  id: number;
  title: string;
  description: string;
  fullDescription: string;
  technologies: string[];
  githubUrl: string;
  liveUrl: string;
  imageUrl: string;
  category: string;
}

const Projects = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [projects, setProjects] = useState<Project[]>([
    {
      id: 1,
      title: "E-Commerce Platform",
      description: "A full-stack e-commerce solution with modern UI and secure payments.",
      fullDescription: "Built a comprehensive e-commerce platform using Next.js and TypeScript. Features include user authentication, product catalog, shopping cart, secure checkout with Stripe integration, order management, and admin dashboard. Implemented responsive design with Tailwind CSS and used MongoDB for data storage.",
      technologies: ["Next.js", "TypeScript", "MongoDB", "Stripe", "Tailwind CSS"],
      githubUrl: "https://github.com/yourusername/ecommerce",
      liveUrl: "https://yourproject.com",
      imageUrl: "/project1.jpg",
      category: "Full Stack"
    },
    {
      id: 2,
      title: "Task Management App",
      description: "Collaborative task management tool with real-time updates.",
      fullDescription: "Developed a collaborative task management application with real-time synchronization. Features drag-and-drop task boards, team collaboration, deadline tracking, file attachments, and notifications. Built with React, Node.js, and Socket.io for real-time functionality.",
      technologies: ["React", "Node.js", "Socket.io", "PostgreSQL", "Material-UI"],
      githubUrl: "https://github.com/yourusername/taskmanager",
      liveUrl: "https://yourtaskapp.com",
      imageUrl: "/project2.jpg",
      category: "Frontend"
    },
    {
      id: 3,
      title: "Weather Dashboard",
      description: "Beautiful weather app with location-based forecasts and analytics.",
      fullDescription: "Created a comprehensive weather dashboard that provides detailed weather information, forecasts, and analytics. Features include location-based weather, 7-day forecasts, weather maps, historical data, and personalized recommendations. Integrated with multiple weather APIs for accurate data.",
      technologies: ["Vue.js", "Python", "FastAPI", "Chart.js", "OpenWeather API"],
      githubUrl: "https://github.com/yourusername/weather",
      liveUrl: "https://yourweather.com",
      imageUrl: "/project3.jpg",
      category: "Frontend"
    }
  ]);

  const [newProject, setNewProject] = useState({
    title: '',
    description: '',
    fullDescription: '',
    technologies: '',
    githubUrl: '',
    liveUrl: '',
    category: 'Frontend',
    imageFile: null as File | null,
    imagePreview: ''
  });

  const openProjectModal = (project: Project) => {
    setSelectedProject(project);
  };

  const closeProjectModal = () => {
    setSelectedProject(null);
  };

  const openAddForm = () => {
    setShowAddForm(true);
  };

  const closeAddForm = () => {
    setShowAddForm(false);
    setNewProject({
      title: '',
      description: '',
      fullDescription: '',
      technologies: '',
      githubUrl: '',
      liveUrl: '',
      category: 'Frontend',
      imageFile: null,
      imagePreview: ''
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewProject(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewProject(prev => ({
          ...prev,
          imageFile: file,
          imagePreview: reader.result as string
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setNewProject(prev => ({
      ...prev,
      imageFile: null,
      imagePreview: ''
    }));
  };

  const handleAddProject = (e: React.FormEvent) => {
    e.preventDefault();
    
    const project: Project = {
      id: projects.length + 1,
      title: newProject.title,
      description: newProject.description,
      fullDescription: newProject.fullDescription,
      technologies: newProject.technologies.split(',').map(tech => tech.trim()),
      githubUrl: newProject.githubUrl,
      liveUrl: newProject.liveUrl,
      imageUrl: newProject.imagePreview || `/project${projects.length + 1}.jpg`,
      category: newProject.category
    };

    setProjects(prev => [...prev, project]);
    closeAddForm();
  };

  return (
    <section id="projects" className="py-20 bg-white dark:bg-black transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            My <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Projects</span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-zinc-400 max-w-3xl mx-auto">
            Here are some of the projects I've worked on. Each one represents a unique challenge and learning experience.
          </p>
        </div>

        {/* Projects Grid - Show only first 3 projects */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {projects.slice(0, 3).map((project) => (
            <div
              key={project.id}
              className="group bg-gray-50 dark:bg-zinc-900 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border dark:border-zinc-800"
            >
              {/* Project Image */}
              <div className="relative h-48 bg-gradient-to-br from-blue-400 to-purple-600 flex items-center justify-center overflow-hidden">
                {project.imageUrl && project.imageUrl.startsWith('data:') ? (
                  // User uploaded image
                  <img 
                    src={project.imageUrl} 
                    alt={project.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  // Placeholder for project image
                  <div className="text-white text-center">
                    <div className="w-16 h-16 mx-auto mb-2 bg-white/20 rounded-lg flex items-center justify-center">
                      <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                      </svg>
                    </div>
                    <p className="text-sm opacity-80">Project Image</p>
                  </div>
                )}
                
                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <button
                    onClick={() => openProjectModal(project)}
                    className="bg-white text-gray-900 px-6 py-2 rounded-lg font-medium hover:bg-gray-100 transition-colors duration-200"
                  >
                    View Details
                  </button>
                </div>
              </div>

              {/* Project Info */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                  {project.title}
                </h3>
                
                <p className="text-gray-600 dark:text-zinc-400 text-sm mb-4 line-clamp-2">
                  {project.description}
                </p>

                {/* Technologies */}
                <div className="flex flex-wrap gap-1 mb-4">
                  {project.technologies.slice(0, 3).map((tech) => (
                    <span
                      key={tech}
                      className="text-xs bg-gray-200 dark:bg-zinc-700 text-gray-700 dark:text-zinc-300 px-2 py-1 rounded"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.technologies.length > 3 && (
                    <span className="text-xs text-gray-500 dark:text-zinc-500">
                      +{project.technologies.length - 3} more
                    </span>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3">
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 bg-gray-900 dark:bg-zinc-700 text-white text-center py-2 rounded-lg text-sm font-medium hover:bg-gray-800 dark:hover:bg-zinc-600 transition-colors duration-200"
                  >
                    GitHub
                  </a>
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 bg-blue-600 text-white text-center py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors duration-200"
                  >
                    Live Demo
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* See More Projects Button */}
        {projects.length >= 3 && (
          <div className="text-center mb-8">
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              <span>See All Projects</span>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        )}

        {/* Add More Projects Button - Only in Development */}
        {process.env.NODE_ENV === 'development' && (
          <div className="text-center">
            <button 
              onClick={openAddForm}
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              + Add New Project
            </button>
          </div>
        )}

        {/* Project Modal */}
        {selectedProject && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white dark:bg-zinc-900 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              {/* Modal Header */}
              <div className="relative">
                <div className="h-64 bg-gradient-to-br from-blue-400 to-purple-600 flex items-center justify-center overflow-hidden">
                  {selectedProject.imageUrl && selectedProject.imageUrl.startsWith('data:') ? (
                    // User uploaded image
                    <img 
                      src={selectedProject.imageUrl} 
                      alt={selectedProject.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    // Placeholder
                    <div className="text-white text-center">
                      <div className="w-20 h-20 mx-auto mb-3 bg-white/20 rounded-lg flex items-center justify-center">
                        <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                        </svg>
                      </div>
                      <h3 className="text-2xl font-bold">{selectedProject.title}</h3>
                    </div>
                  )}
                  
                  {/* Title overlay for uploaded images */}
                  {selectedProject.imageUrl && selectedProject.imageUrl.startsWith('data:') && (
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                      <h3 className="text-3xl font-bold text-white text-center">
                        {selectedProject.title}
                      </h3>
                    </div>
                  )}
                </div>
                
                <button
                  onClick={closeProjectModal}
                  className="absolute top-4 right-4 w-10 h-10 bg-white/20 rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors duration-200"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Modal Content */}
              <div className="p-8">
                <p className="text-gray-700 dark:text-zinc-300 leading-relaxed mb-6">
                  {selectedProject.fullDescription}
                </p>

                {/* Technologies */}
                <div className="mb-6">
                  <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Technologies Used</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="bg-gray-100 dark:bg-zinc-800 text-gray-700 dark:text-zinc-300 px-3 py-1 rounded-full text-sm font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-4">
                  <a
                    href={selectedProject.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 bg-gray-900 dark:bg-zinc-700 text-white text-center py-3 rounded-lg font-medium hover:bg-gray-800 dark:hover:bg-zinc-600 transition-colors duration-200"
                  >
                    View on GitHub
                  </a>
                  <a
                    href={selectedProject.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 bg-blue-600 text-white text-center py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors duration-200"
                  >
                    Live Demo
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Add Project Form Modal - Only in Development */}
        {process.env.NODE_ENV === 'development' && showAddForm && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white dark:bg-zinc-900 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              {/* Form Header */}
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 rounded-t-2xl">
                <h3 className="text-2xl font-bold text-white mb-2">Add New Project</h3>
                <p className="text-blue-100">Fill in the details for your new project</p>
                
                <button
                  onClick={closeAddForm}
                  className="absolute top-4 right-4 w-10 h-10 bg-white/20 rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors duration-200"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Form Content */}
              <form onSubmit={handleAddProject} className="p-6 space-y-6">
                {/* Project Title */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-zinc-300 mb-2">
                    Project Title *
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={newProject.title}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 dark:border-zinc-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-zinc-800 text-gray-900 dark:text-white"
                    placeholder="Enter project title"
                  />
                </div>

                {/* Short Description */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-zinc-300 mb-2">
                    Short Description *
                  </label>
                  <input
                    type="text"
                    name="description"
                    value={newProject.description}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 dark:border-zinc-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-zinc-800 text-gray-900 dark:text-white"
                    placeholder="Brief description for the project card"
                  />
                </div>

                {/* Full Description */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-zinc-300 mb-2">
                    Detailed Description *
                  </label>
                  <textarea
                    name="fullDescription"
                    value={newProject.fullDescription}
                    onChange={handleInputChange}
                    required
                    rows={4}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-zinc-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-zinc-800 text-gray-900 dark:text-white"
                    placeholder="Detailed description for the project modal"
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
                    value={newProject.technologies}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 dark:border-zinc-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-zinc-800 text-gray-900 dark:text-white"
                    placeholder="React, Node.js, MongoDB (comma separated)"
                  />
                  <p className="text-xs text-gray-500 dark:text-zinc-400 mt-1">
                    Separate technologies with commas
                  </p>
                </div>

                {/* Category */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-zinc-300 mb-2">
                    Category
                  </label>
                  <select
                    name="category"
                    value={newProject.category}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-zinc-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-zinc-800 text-gray-900 dark:text-white"
                  >
                    <option value="Frontend">Frontend</option>
                    <option value="Backend">Backend</option>
                    <option value="Full Stack">Full Stack</option>
                    <option value="Mobile">Mobile</option>
                  </select>
                </div>

                {/* Project Image */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-zinc-300 mb-2">
                    Project Image
                  </label>
                  
                  {newProject.imagePreview ? (
                    // Image preview
                    <div className="space-y-3">
                      <div className="relative w-full h-48 bg-gray-100 dark:bg-zinc-800 rounded-lg overflow-hidden">
                        <img 
                          src={newProject.imagePreview} 
                          alt="Project preview"
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
                    // Upload area
                    <label className="block w-full h-32 border-2 border-dashed border-gray-300 dark:border-zinc-600 rounded-lg hover:border-blue-500 dark:hover:border-blue-400 transition-colors duration-200 cursor-pointer">
                      <div className="flex flex-col items-center justify-center h-full text-gray-500 dark:text-zinc-400">
                        <svg className="w-8 h-8 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                        </svg>
                        <span className="text-sm font-medium">Click to upload project image</span>
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
                    Optional: Add a screenshot or image of your project
                  </p>
                </div>

                {/* URLs */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-zinc-300 mb-2">
                      GitHub URL *
                    </label>
                    <input
                      type="url"
                      name="githubUrl"
                      value={newProject.githubUrl}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 dark:border-zinc-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-zinc-800 text-gray-900 dark:text-white"
                      placeholder="https://github.com/..."
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-zinc-300 mb-2">
                      Live Demo URL *
                    </label>
                    <input
                      type="url"
                      name="liveUrl"
                      value={newProject.liveUrl}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 dark:border-zinc-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-zinc-800 text-gray-900 dark:text-white"
                      placeholder="https://yourproject.com"
                    />
                  </div>
                </div>

                {/* Form Actions */}
                <div className="flex gap-4 pt-4">
                  <button
                    type="button"
                    onClick={closeAddForm}
                    className="flex-1 bg-gray-200 dark:bg-zinc-700 text-gray-800 dark:text-zinc-200 py-3 rounded-lg font-medium hover:bg-gray-300 dark:hover:bg-zinc-600 transition-colors duration-200"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 transition-all duration-200"
                  >
                    Add Project
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

export default Projects;