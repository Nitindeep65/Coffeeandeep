'use client';

import { useState, useEffect } from 'react';
import { apiService } from '@/lib/api';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

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
  publishedAt: Date | string;
  readingTime: number;
}

// Default static blogs
const defaultBlogs: Blog[] = [
  {
    _id: '1',
    title: 'Next-Gen AI: Transforming Business Operations',
    slug: 'next-gen-ai-transforming-business',
    excerpt: 'Exploring how artificial intelligence is revolutionizing the way businesses operate and make decisions in the modern digital landscape.',
    content: '',
    author: 'Nitindeep Singh',
    authorRole: 'Software Engineer',
    authorImage: '/image/profile.jpg',
    coverImage: '/image/ai-blog.jpg',
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
    content: '',
    author: 'Nitindeep Singh',
    authorRole: 'Software Engineer',
    coverImage: '/image/cloud.jpg',
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
    content: '',
    author: 'Nitindeep Singh',
    authorRole: 'Software Engineer',
    coverImage: '/image/security.jpg',
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
    content: '',
    author: 'Nitindeep Singh',
    authorRole: 'Software Engineer',
    coverImage: '/image/iot.jpg',
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
    content: '',
    author: 'Nitindeep Singh',
    authorRole: 'Software Engineer',
    coverImage: '/image/blockchain.jpg',
    category: 'Blockchain',
    tags: ['Blockchain', 'Supply Chain', 'DLT', 'Enterprise'],
    featured: false,
    publishedAt: new Date(),
    readingTime: 6
  }
];

// Dotted Image Component
const DottedImage = () => {
  return (
    <div className="relative w-full h-full bg-zinc-900 overflow-hidden rounded-lg flex items-center justify-center">
      <div 
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(circle at 50% 50%, transparent 0%, #18181b 70%),
            radial-gradient(circle, rgba(255,255,255,0.8) 1px, transparent 1px)
          `,
          backgroundSize: '100% 100%, 6px 6px',
          backgroundPosition: 'center, center'
        }}
      />
      <div 
        className="relative w-3/4 h-2/3 rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(255,255,255,0.6) 1.5px, transparent 1.5px)',
          backgroundSize: '8px 8px',
          filter: 'blur(0.3px)'
        }}
      />
    </div>
  );
};

const BlogList = () => {
  const [blogs, setBlogs] = useState<Blog[]>(defaultBlogs);

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

  const formatDate = (date: Date | string) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="py-12 sm:py-16 lg:py-20">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        
        {/* Back Button */}
        <Link 
          href="/"
          className="inline-flex items-center gap-2 text-gray-600 dark:text-zinc-400 hover:text-gray-900 dark:hover:text-white mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>

        {/* Page Header */}
        <div className="mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Tech Insights
          </h1>
          <p className="text-lg text-gray-600 dark:text-zinc-400 max-w-2xl">
            Exploring cutting-edge technologies shaping tomorrow's digital landscape
          </p>
        </div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs.map((blog) => (
            <Link 
              key={blog._id} 
              href={`/blogs/${blog.slug}`}
              className="group"
            >
              <article className="bg-white dark:bg-zinc-900 rounded-xl overflow-hidden border border-gray-200 dark:border-zinc-800 hover:border-gray-300 dark:hover:border-zinc-700 transition-all duration-300 hover:shadow-lg">
                {/* Cover Image */}
                <div className="aspect-video w-full">
                  {blog.coverImage ? (
                    <img 
                      src={blog.coverImage} 
                      alt={blog.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <DottedImage />
                  )}
                </div>
                
                {/* Content */}
                <div className="p-6">
                  {/* Category & Reading Time */}
                  <div className="flex items-center gap-3 mb-3">
                      <span className="text-xs font-medium text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30 px-2 py-1 rounded">
                        {blog.category}
                      </span>
                      <span className="text-xs text-gray-500 dark:text-zinc-500">
                        {blog.readingTime} min read
                      </span>
                    </div>
                    
                    {/* Title */}
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2">
                      {blog.title}
                    </h2>
                    
                    {/* Excerpt */}
                    <p className="text-gray-600 dark:text-zinc-400 text-sm line-clamp-2 mb-4">
                      {blog.excerpt}
                    </p>
                    
                    {/* Author & Date */}
                    <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-zinc-800">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full overflow-hidden bg-zinc-200 dark:bg-zinc-700">
                          {blog.authorImage ? (
                            <img 
                              src={blog.authorImage} 
                              alt={blog.author}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-xs font-medium text-gray-600 dark:text-zinc-400">
                              {blog.author.charAt(0)}
                            </div>
                          )}
                        </div>
                        <span className="text-sm text-gray-700 dark:text-zinc-300">
                          {blog.author}
                        </span>
                      </div>
                      <span className="text-xs text-gray-500 dark:text-zinc-500">
                        {formatDate(blog.publishedAt)}
                      </span>
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>
      </div>
    </div>
  );
};

export default BlogList;
