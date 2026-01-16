'use client';

import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

interface Blog {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  author: string;
  authorRole: string;
  authorImage?: string | null;
  coverImage?: string | null;
  category: string;
  tags: string[];
  featured: boolean;
  publishedAt: string;
  readingTime: number;
}

interface BlogDetailProps {
  blog: Blog;
}

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

const BlogDetail = ({ blog }: BlogDetailProps) => {
  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // Simple markdown-like content rendering
  const renderContent = (content: string) => {
    // Split content by paragraphs
    const paragraphs = content.split('\n\n');
    
    return paragraphs.map((paragraph, index) => {
      // Check for headers
      if (paragraph.startsWith('# ')) {
        return (
          <h2 key={index} className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">
            {paragraph.slice(2)}
          </h2>
        );
      }
      if (paragraph.startsWith('## ')) {
        return (
          <h3 key={index} className="text-xl font-semibold text-gray-900 dark:text-white mt-6 mb-3">
            {paragraph.slice(3)}
          </h3>
        );
      }
      if (paragraph.startsWith('### ')) {
        return (
          <h4 key={index} className="text-lg font-medium text-gray-900 dark:text-white mt-4 mb-2">
            {paragraph.slice(4)}
          </h4>
        );
      }
      
      // Check for bullet points
      if (paragraph.startsWith('- ') || paragraph.startsWith('* ')) {
        const items = paragraph.split('\n').filter(line => line.startsWith('- ') || line.startsWith('* '));
        return (
          <ul key={index} className="list-disc list-inside space-y-2 my-4 text-gray-700 dark:text-zinc-300">
            {items.map((item, i) => (
              <li key={i}>{item.slice(2)}</li>
            ))}
          </ul>
        );
      }
      
      // Regular paragraph
      return (
        <p key={index} className="text-gray-700 dark:text-zinc-300 leading-relaxed mb-4">
          {paragraph}
        </p>
      );
    });
  };

  return (
    <div className="py-12 sm:py-16 lg:py-20">
      <div className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-12">
        
        {/* Back Button */}
        <Link 
          href="/blogs"
          className="inline-flex items-center gap-2 text-gray-600 dark:text-zinc-400 hover:text-gray-900 dark:hover:text-white mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Blogs
        </Link>

        {/* Article Header */}
        <header className="mb-8">
          {/* Category & Reading Time */}
          <div className="flex items-center gap-3 mb-4">
            <span className="text-sm font-medium text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30 px-3 py-1 rounded-full">
              {blog.category}
            </span>
            <span className="text-sm text-gray-500 dark:text-zinc-500">
              {blog.readingTime} min read
            </span>
          </div>
          
          {/* Title */}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
            {blog.title}
          </h1>
          
          {/* Excerpt */}
          <p className="text-xl text-gray-600 dark:text-zinc-400 leading-relaxed mb-8">
            {blog.excerpt}
          </p>
          
          {/* Author Info */}
          <div className="flex items-center gap-4 pb-8 border-b border-gray-200 dark:border-zinc-800">
            <div className="w-12 h-12 rounded-full overflow-hidden bg-zinc-200 dark:bg-zinc-700">
              {blog.authorImage ? (
                <img 
                  src={blog.authorImage} 
                  alt={blog.author}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-lg font-medium text-gray-600 dark:text-zinc-400">
                  {blog.author.charAt(0)}
                </div>
              )}
            </div>
            <div>
              <p className="font-medium text-gray-900 dark:text-white">
                {blog.author}
              </p>
              <p className="text-sm text-gray-600 dark:text-zinc-400">
                {blog.authorRole} · {formatDate(blog.publishedAt)}
              </p>
            </div>
          </div>
        </header>

        {/* Cover Image */}
        {blog.coverImage ? (
          <div className="aspect-video w-full rounded-xl overflow-hidden mb-10">
            <img 
              src={blog.coverImage} 
              alt={blog.title}
              className="w-full h-full object-cover"
            />
          </div>
        ) : (
          <div className="aspect-video w-full rounded-xl overflow-hidden mb-10">
            <DottedImage />
          </div>
        )}

        {/* Article Content */}
        <article className="prose prose-lg dark:prose-invert max-w-none">
          {renderContent(blog.content)}
        </article>

        {/* Tags */}
        {blog.tags && blog.tags.length > 0 && (
          <div className="mt-12 pt-8 border-t border-gray-200 dark:border-zinc-800">
            <h4 className="text-sm font-medium text-gray-500 dark:text-zinc-500 mb-3">Tags</h4>
            <div className="flex flex-wrap gap-2">
              {blog.tags.map((tag, index) => (
                <span 
                  key={index}
                  className="text-sm text-gray-700 dark:text-zinc-300 bg-gray-100 dark:bg-zinc-800 px-3 py-1 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Back to Blogs Link */}
        <div className="mt-12 pt-8 border-t border-gray-200 dark:border-zinc-800">
          <Link 
            href="/blogs"
            className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            View all blog posts
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BlogDetail;
