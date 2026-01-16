'use client';

import { useState, useEffect } from 'react';
import { apiService } from '@/lib/api';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

interface Blog {
  _id?: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  author: string;
  authorRole: string;
  authorImage?: string;
  coverImage?: string;
  category: string;
  tags: string[];
  featured: boolean;
  publishedAt: Date;
  readingTime: number;
}

// Default blog data for initial display
const defaultBlogs: Blog[] = [
  {
    _id: '1',
    title: 'Next-Gen AI: Transforming Business Operations',
    slug: 'next-gen-ai-transforming-business',
    excerpt: 'Exploring how artificial intelligence is revolutionizing the way businesses operate and make decisions in the modern digital landscape.',
    content: `The AI Revolution in Business

Artificial Intelligence is no longer a futuristic concept. It's here, and it's fundamentally changing how businesses operate. From automating routine tasks to providing deep insights through data analysis, AI is becoming an indispensable tool for modern enterprises.

Customer Experience

AI-powered chatbots and virtual assistants are transforming customer service. These systems can handle thousands of queries simultaneously, providing instant responses around the clock. Machine learning algorithms analyze customer behavior to deliver personalized experiences at scale.

Data-Driven Decision Making

Gone are the days of gut-feeling decisions. AI systems process vast amounts of data to identify patterns and trends that humans might miss. Predictive analytics help businesses anticipate market changes, optimize inventory, and forecast demand with unprecedented accuracy.

Process Automation

Robotic Process Automation combined with AI is eliminating repetitive tasks across industries. From invoice processing to HR onboarding, these intelligent systems free up human workers to focus on creative and strategic work.

Implementation Strategies

Successfully integrating AI requires a thoughtful approach. Start with clear business objectives and invest in data infrastructure and quality. Build cross-functional teams that combine domain expertise with technical skills. Begin with pilot projects before scaling, and prioritize ethical AI practices and transparency.

The Road Ahead

As AI technology continues to evolve, we'll see even more sophisticated applications. Natural Language Processing is enabling more natural human-machine interactions. Computer vision is opening new possibilities in quality control and security. The businesses that embrace these technologies today will be the leaders of tomorrow.

The key is not to view AI as a replacement for human intelligence, but as an amplifier of human capability. When humans and AI work together, the results are transformative.`,
    author: 'Nitindeep Singh',
    authorRole: 'Software Engineer',
    authorImage: '/image/profile.jpg',
    coverImage: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&q=80',
    category: 'AI',
    tags: ['AI', 'Business', 'Technology'],
    featured: true,
    publishedAt: new Date(),
    readingTime: 8
  },
  {
    _id: '2',
    title: 'Exploring cost-effective cloud migration patterns and multi-cloud management',
    slug: 'cloud-migration-patterns',
    excerpt: 'A comprehensive guide to migrating your infrastructure to the cloud while optimizing costs and leveraging multi-cloud strategies.',
    content: `Why Cloud Migration Matters

In today's digital-first world, cloud migration isn't just about moving servers. It's about transforming how your organization operates. The cloud offers scalability, flexibility, and cost efficiencies that on-premise infrastructure simply cannot match.

Common Migration Patterns

There are six main approaches to consider when planning a migration. Rehost, often called lift and shift, moves applications as-is to the cloud. It's the fastest approach but may not fully leverage cloud benefits. Replatform involves making minor optimizations during migration, like moving to managed databases. Repurchase means switching to SaaS solutions, such as moving from an on-prem CRM to Salesforce. Refactor requires re-architecting applications to be cloud-native, which takes more effort but delivers maximum benefits. Retain keeps some workloads on-premise when it makes sense. Finally, retire decommissions applications that are no longer needed.

Multi-Cloud Strategy

A multi-cloud approach offers several advantages. You avoid vendor lock-in and can negotiate better pricing. You can use the best services from each provider. Geographic reach improves as you deploy closer to users worldwide. And resilience increases by reducing the risk of single-provider outages.

Cost Optimization Tips

Right-sizing is essential. Monitor usage and adjust instance sizes since most organizations are over-provisioned by 30-40%. Consider reserved instances by committing to 1-3 year terms for predictable workloads, saving up to 70%. Use spot instances for fault-tolerant workloads at up to 90% discount. Implement auto-scaling to match resources to demand rather than peak capacity.

Getting Started

Assess your current infrastructure and applications first. Define clear business objectives and success metrics. Start with low-risk, high-impact workloads. Build internal cloud expertise. Implement robust governance and security from day one.

The cloud journey is a marathon, not a sprint. Take it step by step, learn continuously, and optimize as you go.`,
    author: 'Nitindeep Singh',
    authorRole: 'Software Engineer',
    coverImage: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=800&q=80',
    category: 'Cloud',
    tags: ['Cloud', 'Migration', 'AWS', 'Azure', 'DevOps'],
    featured: false,
    publishedAt: new Date(),
    readingTime: 6
  },
  {
    _id: '3',
    title: 'Implementing adaptive security frameworks for distributed workforces',
    slug: 'adaptive-security-frameworks',
    excerpt: 'How to build robust security systems that protect your organization in the era of remote work and distributed teams.',
    content: `The New Security Landscape

The traditional security perimeter has dissolved. With employees working from home, coffee shops, and co-working spaces around the world, the concept of inside and outside the network no longer applies. This demands a fundamental shift in how we approach security.

Zero Trust Architecture

The core principle is simple: never trust, always verify. Every user must prove their identity regardless of location. Only compliant, healthy devices get access. Users receive minimum permissions needed for their role. The network is divided into small zones to contain breaches. And real-time analysis monitors user behavior and network traffic continuously.

Building Your Framework

Start by assessing your current state. Inventory all assets, applications, and data flows. Identify critical business processes and map current security controls.

Next, define your security policies. Create role-based access policies. Establish device compliance requirements. Set data classification standards.

Then implement technical controls. Deploy identity and access management. Implement multi-factor authentication. Set up endpoint detection and response. Enable secure access service edge.

Finally, train your people. Security is only as strong as its weakest link. Regular training should cover phishing awareness, password hygiene, data handling procedures, and incident reporting.

Adaptive Response

Modern security frameworks must adapt in real-time. Risk-based authentication increases verification for unusual behavior. Automated threat response contains threats before they spread. Continuous compliance ensures regular audits and policy updates.

The Human Element

Technology alone isn't enough. Create a security-conscious culture where everyone understands their role in security. Reporting incidents should be encouraged, not punished. Security should be seen as an enabler, not a blocker.

Remember that security is a journey, not a destination. Stay vigilant and stay adaptive.`,
    author: 'Nitindeep Singh',
    authorRole: 'Software Engineer',
    coverImage: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&q=80',
    category: 'Security',
    tags: ['Security', 'Remote Work', 'Zero Trust', 'Cybersecurity'],
    featured: false,
    publishedAt: new Date(),
    readingTime: 5
  },
  {
    _id: '4',
    title: 'Reducing latency in smart city deployments through fog computing',
    slug: 'fog-computing-smart-cities',
    excerpt: 'How edge and fog computing are enabling real-time processing for smart city applications, from traffic management to emergency response.',
    content: `The Smart City Challenge

Smart cities generate enormous amounts of data every second from traffic sensors, surveillance cameras, environmental monitors, and smart meters. Sending all this data to centralized cloud servers creates unacceptable latency for time-critical applications.

Enter Fog Computing

Fog computing extends cloud capabilities to the edge of the network, processing data closer to where it's generated. Think of it as a fog that sits between the cloud and IoT devices.

The benefits for smart cities are significant. Processing achieves ultra-low latency, measured in milliseconds rather than seconds. Bandwidth efficiency improves since only relevant data goes to the cloud. Reliability increases because operations continue even when cloud connectivity is lost. And privacy improves by keeping sensitive data local.

Real-World Applications

In traffic management, fog nodes at intersections analyze traffic patterns in real-time, adjusting signal timing to optimize flow. Response time drops from seconds to milliseconds, reducing congestion and emissions.

For emergency response, where seconds matter, fog computing enables instant video analysis for incident detection, automatic dispatch optimization, and real-time coordination between emergency services.

Environmental monitoring uses distributed sensors to track air quality, noise levels, and weather conditions. Fog nodes process data locally, triggering immediate alerts when thresholds are exceeded.

Smart lighting allows intelligent streetlights to adjust brightness based on pedestrian and vehicle traffic, saving energy while maintaining safety.

Architecture Considerations

A hierarchical processing approach works best. At the device level, basic filtering and aggregation occurs. At the fog level, real-time analytics and local decisions happen. At the cloud level, historical analysis and machine learning training take place.

Key technologies include containerization with Docker and Kubernetes for portable workloads, message queuing with MQTT and Kafka for reliable data streams, and edge AI for local inference.

Implementation Challenges

Several challenges must be addressed. Heterogeneous infrastructure means dealing with diverse devices and protocols. Security requires protecting a distributed attack surface. Management of thousands of fog nodes needs automated orchestration. And power budgets are limited on many edge devices.

The Future

As 5G networks roll out and edge hardware becomes more powerful, fog computing will enable even more ambitious smart city applications. Autonomous vehicles, augmented reality, and real-time city-wide optimization are just the beginning.

The smart cities of tomorrow are being built today, one fog node at a time.`,
    author: 'Nitindeep Singh',
    authorRole: 'Software Engineer',
    coverImage: 'https://images.unsplash.com/photo-1558346490-a72e53ae2d4f?w=800&q=80',
    category: 'IoT',
    tags: ['IoT', 'Smart Cities', 'Edge Computing', 'Fog Computing'],
    featured: false,
    publishedAt: new Date(),
    readingTime: 7
  },
  {
    _id: '5',
    title: 'Enterprise applications of distributed ledger technology in supply chains',
    slug: 'blockchain-supply-chains',
    excerpt: 'Discover how blockchain and distributed ledger technology are revolutionizing supply chain transparency, traceability, and efficiency.',
    content: `Beyond Cryptocurrency

While blockchain gained fame through Bitcoin, its most transformative applications may be in enterprise supply chains. Distributed ledger technology offers something supply chains desperately need: a single source of truth that all parties can trust.

The Supply Chain Problem

Modern supply chains are incredibly complex. They involve multiple parties including suppliers, manufacturers, logistics providers, and retailers. They span cross-border transactions. They rely on paper-based processes prone to errors. They suffer from limited visibility into upstream and downstream activities. And counterfeit goods cost billions annually.

How Blockchain Helps

Immutable record keeping means once data is recorded on the blockchain, it cannot be altered. This creates an auditable trail from raw materials to end consumer.

Shared visibility ensures all authorized parties see the same data in real-time, eliminating information silos and disputes.

Smart contracts enable automated execution of business logic. They can release payment when goods are delivered, trigger alerts when conditions are violated, and automatically update inventory systems.

Provenance tracking traces any product back to its origin, which is essential for food safety recalls, conflict mineral compliance, luxury goods authentication, and pharmaceutical supply chain integrity.

Real-World Implementations

In the food industry, major retailers track produce from farm to shelf. When contamination is detected, affected products are identified in seconds instead of days.

Pharmaceutical companies track medications through the supply chain, ensuring authenticity and proper handling of temperature and humidity.

Automotive OEMs and suppliers share production data, improving quality control and enabling faster recalls.

In logistics, shipping documents digitized on blockchain reduce processing time from days to hours.

Implementation Considerations

Choose the right platform by evaluating permissioned versus permissionless options, transaction throughput requirements, integration capabilities, and consortium governance models.

Start with a focused use case rather than trying to apply blockchain everywhere. Identify high-value problems in areas with trust issues between parties, processes with high documentation overhead, and products requiring strict traceability.

Build the consortium carefully since blockchain value comes from network effects. Engage key trading partners, industry associations, and regulators where appropriate.

Plan for integration because blockchain doesn't replace existing systems. It connects them. APIs and middleware are essential.

Challenges to Address

Scalability presents transaction throughput limits. Privacy requires balancing transparency with competitive secrets. Adoption depends on getting all parties on board. And standards for interoperability between different platforms are still evolving.

The Road Ahead

As the technology matures and standards emerge, blockchain will become invisible infrastructure, as fundamental to supply chains as the internet is today. Companies investing now are building competitive advantages that will compound over time.

The future supply chain is transparent, automated, and trustworthy. Blockchain makes it possible.`,
    author: 'Nitindeep Singh',
    authorRole: 'Software Engineer',
    coverImage: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=800&q=80',
    category: 'Blockchain',
    tags: ['Blockchain', 'Supply Chain', 'DLT', 'Enterprise'],
    featured: false,
    publishedAt: new Date(),
    readingTime: 6
  }
];

// Pixelated/Dotted Image Component
const DottedImage = ({ src, alt }: { src: string; alt: string }) => {
  return (
    <div className="relative w-full h-full bg-zinc-100 dark:bg-zinc-900 overflow-hidden rounded-lg">
      <img 
        src={src} 
        alt={alt}
        className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
      />
    </div>
  );
};

// Small thumbnail with actual image
const DottedThumbnail = ({ src, alt }: { src: string; alt: string }) => {
  return (
    <div className="w-20 h-14 bg-zinc-200 dark:bg-zinc-800 rounded-md overflow-hidden flex-shrink-0">
      <img 
        src={src} 
        alt={alt}
        className="w-full h-full object-cover"
      />
    </div>
  );
};

const Blog = () => {
  const [blogs, setBlogs] = useState<Blog[]>(defaultBlogs);
  const [showAddBlogForm, setShowAddBlogForm] = useState(false);
  const [newBlog, setNewBlog] = useState({
    title: '',
    excerpt: '',
    content: '',
    author: '',
    authorRole: '',
    category: '',
    tags: '',
    featured: false
  });

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const data = await apiService.getBlogs();
        if (data && data.length > 0) {
          setBlogs(data);
        }
      } catch (err) {
        console.error('Error fetching blogs:', err);
        // Keep default blogs on error
      }
    };

    fetchBlogs();
  }, []);

  const featuredBlog = blogs.find(blog => blog.featured) || blogs[0];
  const secondaryBlogs = blogs.filter(blog => blog._id !== featuredBlog?._id).slice(0, 4);

  const handleBlogInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setNewBlog(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  const handleAddBlog = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const formData = new FormData();
      formData.append('title', newBlog.title);
      formData.append('excerpt', newBlog.excerpt);
      formData.append('content', newBlog.content);
      formData.append('author', newBlog.author);
      formData.append('authorRole', newBlog.authorRole);
      formData.append('category', newBlog.category);
      formData.append('tags', newBlog.tags);
      formData.append('featured', String(newBlog.featured));

      const savedBlog = await apiService.createBlog(formData);
      setBlogs(prev => [savedBlog.blog, ...prev]);
      setNewBlog({
        title: '',
        excerpt: '',
        content: '',
        author: '',
        authorRole: '',
        category: '',
        tags: '',
        featured: false
      });
      setShowAddBlogForm(false);
    } catch (error) {
      console.error('Error adding blog:', error);
      alert('Failed to add blog. Please try again.');
    }
  };

  const deleteBlog = async (id: string) => {
    if (!confirm('Are you sure you want to delete this blog post?')) {
      return;
    }

    try {
      await apiService.deleteBlog(id);
      setBlogs(prev => prev.filter(blog => blog._id !== id));
    } catch (error) {
      console.error('Error deleting blog:', error);
      alert('Failed to delete blog. Please try again.');
    }
  };

  return (
    <section id="blog" className="py-12 sm:py-16 lg:py-20 bg-white dark:bg-black transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-12">
          <div>
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Tech Insights
            </h2>
            <p className="text-lg text-gray-600 dark:text-zinc-400 max-w-2xl">
              Exploring cutting-edge technologies shaping tomorrow's digital landscape
            </p>
          </div>
          
          <div className="mt-6 sm:mt-0 flex items-center gap-4">
            {process.env.NODE_ENV === 'development' && (
              <button
                onClick={() => setShowAddBlogForm(true)}
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                + Add Blog
              </button>
            )}
            <Link 
              href="/blogs"
              className="group flex items-center gap-2 text-gray-900 dark:text-white border border-gray-300 dark:border-zinc-700 px-6 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-zinc-900 transition-all duration-200"
            >
              Read More
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>

        {/* Blog Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          
          {/* Featured Blog - Left Side */}
          {featuredBlog && (
            <div className="space-y-6">
              <Link href={`/blogs/${featuredBlog.slug}`} className="block">
                {/* Featured Image with Dotted Effect */}
                <div className="aspect-[4/3] w-full">
                  <DottedImage 
                    src={featuredBlog.coverImage || '/image/placeholder.jpg'} 
                    alt={featuredBlog.title}
                  />
                  </div>
                </Link>
                
                {/* Featured Blog Info */}
                <div className="space-y-4">
                  <Link href={`/blogs/${featuredBlog.slug}`}>
                    <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white leading-tight hover:text-blue-600 dark:hover:text-blue-400 transition-colors cursor-pointer">
                      {featuredBlog.title}
                    </h3>
                  </Link>
                  
                  {/* Author Info */}
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full overflow-hidden bg-zinc-700 flex-shrink-0">
                      {featuredBlog.authorImage ? (
                        <img
                          src={featuredBlog.authorImage}
                          alt={featuredBlog.author}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-white text-sm font-medium">
                          {featuredBlog.author.charAt(0)}
                        </div>
                      )}
                    </div>
                    <div>
                      <p className="text-gray-900 dark:text-white font-medium">
                        {featuredBlog.author}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-zinc-400">
                        {featuredBlog.authorRole}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Dev Mode Controls */}
                {process.env.NODE_ENV === 'development' && featuredBlog._id && !featuredBlog._id.match(/^\d+$/) && (
                  <button
                    onClick={() => deleteBlog(featuredBlog._id!)}
                    className="text-sm text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
                  >
                    Delete Featured
                  </button>
                )}
              </div>
            )}
            
            {/* Secondary Blogs - Right Side */}
            <div className="space-y-4">
              {secondaryBlogs.map((blog) => (
                <Link
                  key={blog._id}
                  href={`/blogs/${blog.slug}`}
                  className="flex items-center gap-4 p-4 rounded-lg hover:bg-gray-50 dark:hover:bg-zinc-900/50 transition-colors duration-200 cursor-pointer group"
                >
                  {/* Thumbnail */}
                  <DottedThumbnail 
                    src={blog.coverImage || '/image/placeholder.jpg'} 
                    alt={blog.title}
                  />
                  
                  {/* Blog Title */}
                  <div className="flex-1 min-w-0">
                    <h4 className="text-gray-900 dark:text-white font-medium leading-snug group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2">
                      {blog.title}
                    </h4>
                  </div>

                  {/* Dev Mode Delete */}
                  {process.env.NODE_ENV === 'development' && blog._id && !blog._id.match(/^\d+$/) && (
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        deleteBlog(blog._id!);
                      }}
                      className="text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  )}
                </Link>
              ))}
            </div>
          </div>

        {/* Add Blog Form Modal - Only in Development */}
        {process.env.NODE_ENV === 'development' && showAddBlogForm && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white dark:bg-zinc-900 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              {/* Form Header */}
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 rounded-t-2xl relative">
                <h3 className="text-2xl font-bold text-white mb-2">Add Blog Post</h3>
                <p className="text-blue-100">Share your tech insights</p>
                
                <button
                  onClick={() => setShowAddBlogForm(false)}
                  className="absolute top-4 right-4 w-10 h-10 bg-white/20 rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors duration-200"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Form Content */}
              <form onSubmit={handleAddBlog} className="p-6 space-y-6">
                {/* Title */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-zinc-300 mb-2">
                    Title *
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={newBlog.title}
                    onChange={handleBlogInputChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 dark:border-zinc-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-zinc-800 text-gray-900 dark:text-white"
                    placeholder="e.g., Next-Gen AI: Transforming Business Operations"
                  />
                </div>

                {/* Excerpt */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-zinc-300 mb-2">
                    Excerpt *
                  </label>
                  <textarea
                    name="excerpt"
                    value={newBlog.excerpt}
                    onChange={handleBlogInputChange}
                    required
                    rows={2}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-zinc-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-zinc-800 text-gray-900 dark:text-white resize-none"
                    placeholder="Brief summary of the blog post..."
                  />
                </div>

                {/* Content */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-zinc-300 mb-2">
                    Content *
                  </label>
                  <textarea
                    name="content"
                    value={newBlog.content}
                    onChange={handleBlogInputChange}
                    required
                    rows={4}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-zinc-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-zinc-800 text-gray-900 dark:text-white resize-none"
                    placeholder="Full blog content..."
                  />
                </div>

                {/* Author and Role */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-zinc-300 mb-2">
                      Author *
                    </label>
                    <input
                      type="text"
                      name="author"
                      value={newBlog.author}
                      onChange={handleBlogInputChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 dark:border-zinc-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-zinc-800 text-gray-900 dark:text-white"
                      placeholder="e.g., John Doe"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-zinc-300 mb-2">
                      Author Role *
                    </label>
                    <input
                      type="text"
                      name="authorRole"
                      value={newBlog.authorRole}
                      onChange={handleBlogInputChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 dark:border-zinc-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-zinc-800 text-gray-900 dark:text-white"
                      placeholder="e.g., AI Researcher"
                    />
                  </div>
                </div>

                {/* Category and Tags */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-zinc-300 mb-2">
                      Category *
                    </label>
                    <input
                      type="text"
                      name="category"
                      value={newBlog.category}
                      onChange={handleBlogInputChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 dark:border-zinc-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-zinc-800 text-gray-900 dark:text-white"
                      placeholder="e.g., AI, Cloud, Security"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-zinc-300 mb-2">
                      Tags * (comma-separated)
                    </label>
                    <input
                      type="text"
                      name="tags"
                      value={newBlog.tags}
                      onChange={handleBlogInputChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 dark:border-zinc-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-zinc-800 text-gray-900 dark:text-white"
                      placeholder="e.g., AI, Machine Learning, Business"
                    />
                  </div>
                </div>

                {/* Featured Checkbox */}
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="featured"
                    name="featured"
                    checked={newBlog.featured}
                    onChange={handleBlogInputChange}
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <label htmlFor="featured" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                    Feature this post
                  </label>
                </div>

                {/* Submit Button */}
                <div className="flex gap-4 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowAddBlogForm(false)}
                    className="flex-1 px-6 py-3 border border-gray-300 dark:border-zinc-600 text-gray-700 dark:text-zinc-300 rounded-lg hover:bg-gray-100 dark:hover:bg-zinc-800 transition-colors duration-200"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl"
                  >
                    Add Blog Post
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

export default Blog;
