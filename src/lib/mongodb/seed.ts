import connectDB from '@/lib/mongodb/connect';
import Project from '@/lib/mongodb/models/Project';
import Experience from '@/lib/mongodb/models/Experience';
import Profile from '@/lib/mongodb/models/Profile';

// Sample data to seed the database
const sampleProjects = [
  {
    title: "E-Commerce Platform",
    description: "A full-stack e-commerce solution with modern UI and secure payments.",
    fullDescription: "Built a comprehensive e-commerce platform using Next.js and TypeScript. Features include user authentication, product catalog, shopping cart, secure checkout with Stripe integration, order management, and admin dashboard. Implemented responsive design with Tailwind CSS and used MongoDB for data storage.",
    technologies: ["Next.js", "TypeScript", "MongoDB", "Stripe", "Tailwind CSS"],
    githubUrl: "https://github.com/yourusername/ecommerce",
    liveUrl: "https://yourproject.com",
    category: "Full Stack",
    featured: true
  },
  {
    title: "Task Management App",
    description: "Collaborative task management tool with real-time updates.",
    fullDescription: "Developed a collaborative task management application with real-time synchronization. Features drag-and-drop task boards, team collaboration, deadline tracking, file attachments, and notifications. Built with React, Node.js, and Socket.io for real-time functionality.",
    technologies: ["React", "Node.js", "Socket.io", "PostgreSQL", "Material-UI"],
    githubUrl: "https://github.com/yourusername/taskmanager",
    liveUrl: "https://yourtaskapp.com",
    category: "Frontend",
    featured: false
  },
  {
    title: "Weather Dashboard",
    description: "Beautiful weather app with location-based forecasts and analytics.",
    fullDescription: "Created a comprehensive weather dashboard that provides detailed weather information, forecasts, and analytics. Features include location-based weather, 7-day forecasts, weather maps, historical data, and personalized recommendations. Integrated with multiple weather APIs for accurate data.",
    technologies: ["Vue.js", "Python", "FastAPI", "Chart.js", "OpenWeather API"],
    githubUrl: "https://github.com/yourusername/weather",
    liveUrl: "https://yourweather.com",
    category: "Frontend",
    featured: false
  }
];

const sampleExperiences = [
  {
    title: "Senior Full Stack Developer",
    company: "Tech Solutions Inc.",
    duration: "2022 - Present",
    location: "Remote",
    description: "Led development of scalable web applications using React, Node.js, and cloud technologies. Mentored junior developers and collaborated with cross-functional teams to deliver high-quality solutions.",
    technologies: ["React", "Node.js", "AWS", "MongoDB", "TypeScript"],
    current: true,
    startDate: new Date('2022-01-01'),
  },
  {
    title: "Frontend Developer",
    company: "Digital Agency Pro",
    duration: "2021 - 2022",
    location: "New York, NY",
    description: "Developed responsive web applications and improved user experience across multiple client projects. Collaborated with designers to implement pixel-perfect interfaces.",
    technologies: ["React", "JavaScript", "CSS3", "Figma", "Git"],
    current: false,
    startDate: new Date('2021-01-01'),
    endDate: new Date('2022-01-01')
  },
  {
    title: "Junior Web Developer",
    company: "StartUp Ventures",
    duration: "2020 - 2021",
    location: "San Francisco, CA",
    description: "Built and maintained company websites, learned modern development practices, and contributed to the development of internal tools and dashboards.",
    technologies: ["HTML5", "CSS3", "JavaScript", "PHP", "MySQL"],
    current: false,
    startDate: new Date('2020-01-01'),
    endDate: new Date('2021-01-01')
  }
];

const sampleProfile = {
  name: "Your Name",
  title: "Full Stack Developer",
  email: "your.email@example.com",
  phone: "+1 (555) 123-4567",
  location: "Your City, Country",
  bio: "Passionate full-stack developer with expertise in modern web technologies. I love creating digital experiences that make a difference.",
  skills: {
    frontend: ["React", "Next.js", "TypeScript", "Tailwind CSS", "JavaScript", "HTML5"],
    backend: ["Node.js", "Express.js", "Python", "RESTful APIs", "GraphQL", "MongoDB"],
    tools: ["Git", "Docker", "AWS", "Figma", "VS Code", "Linux"]
  },
  social: {
    linkedin: "https://linkedin.com/in/yourprofile",
    github: "https://github.com/yourusername",
    twitter: "https://twitter.com/yourusername"
  },
  stats: {
    experience: "3+",
    projects: "50+",
    clients: "25+",
    quality: "100%"
  },
  isActive: true
};

export async function seedDatabase() {
  try {
    await connectDB();
    
    // Clear existing data
    await Project.deleteMany({});
    await Experience.deleteMany({});
    await Profile.deleteMany({});
    
    // Seed projects
    const projects = await Project.insertMany(sampleProjects);
    console.log(`Created ${projects.length} sample projects`);
    
    // Seed experiences
    const experiences = await Experience.insertMany(sampleExperiences);
    console.log(`Created ${experiences.length} sample experiences`);
    
    // Seed profile
    const profile = await Profile.create(sampleProfile);
    console.log(`Created profile for ${profile.name}`);
    
    return {
      success: true,
      message: 'Database seeded successfully',
      data: {
        projects: projects.length,
        experiences: experiences.length,
        profile: 1
      }
    };
  } catch (error) {
    console.error('Error seeding database:', error);
    return {
      success: false,
      message: 'Failed to seed database',
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  }
}

// Export individual functions for selective seeding
export async function seedProjects() {
  await connectDB();
  await Project.deleteMany({});
  return await Project.insertMany(sampleProjects);
}

export async function seedExperiences() {
  await connectDB();
  await Experience.deleteMany({});
  return await Experience.insertMany(sampleExperiences);
}

export async function seedProfile() {
  await connectDB();
  await Profile.deleteMany({});
  return await Profile.create(sampleProfile);
}
