import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb/connect';
import Blog from '@/lib/mongodb/models/Blog';
import { writeFile, mkdir } from 'fs/promises';
import path from 'path';

export async function GET() {
  try {
    await connectDB();
    
    const blogs = await Blog.find({})
      .sort({ publishedAt: -1 })
      .lean();
    
    return NextResponse.json(blogs);
  } catch (error) {
    console.error('Error fetching blogs:', error);
    return NextResponse.json(
      { error: 'Failed to fetch blogs' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectDB();
    
    const contentType = request.headers.get('content-type') || '';
    let body: any;
    let coverImageUrl: string | null = null;
    let authorImageUrl: string | null = null;
    
    if (contentType.includes('multipart/form-data')) {
      const formData = await request.formData();
      body = {
        title: formData.get('title'),
        slug: formData.get('slug'),
        excerpt: formData.get('excerpt'),
        content: formData.get('content'),
        author: formData.get('author'),
        authorRole: formData.get('authorRole'),
        category: formData.get('category'),
        tags: formData.get('tags'),
        featured: formData.get('featured') === 'true',
        publishedAt: formData.get('publishedAt'),
        readingTime: formData.get('readingTime'),
      };

      // Handle cover image upload
      const coverImage = formData.get('coverImage') as File;
      if (coverImage && coverImage.size > 0) {
        try {
          const uploadDir = path.join(process.cwd(), 'public', 'uploads');
          await mkdir(uploadDir, { recursive: true });

          const timestamp = Date.now();
          const originalName = coverImage.name.replace(/[^a-zA-Z0-9.-]/g, '');
          const filename = `blog-cover-${timestamp}-${originalName}`;
          const filepath = path.join(uploadDir, filename);

          const bytes = await coverImage.arrayBuffer();
          const buffer = Buffer.from(bytes);
          await writeFile(filepath, buffer);

          coverImageUrl = `/uploads/${filename}`;
        } catch (error) {
          console.error('Error uploading cover image:', error);
        }
      }

      // Handle author image upload
      const authorImage = formData.get('authorImage') as File;
      if (authorImage && authorImage.size > 0) {
        try {
          const uploadDir = path.join(process.cwd(), 'public', 'uploads');
          await mkdir(uploadDir, { recursive: true });

          const timestamp = Date.now();
          const originalName = authorImage.name.replace(/[^a-zA-Z0-9.-]/g, '');
          const filename = `author-${timestamp}-${originalName}`;
          const filepath = path.join(uploadDir, filename);

          const bytes = await authorImage.arrayBuffer();
          const buffer = Buffer.from(bytes);
          await writeFile(filepath, buffer);

          authorImageUrl = `/uploads/${filename}`;
        } catch (error) {
          console.error('Error uploading author image:', error);
        }
      }
    } else {
      body = await request.json();
    }
    
    const { title, excerpt, content, author, authorRole, category, tags } = body;
    
    if (!title || !excerpt || !content || !author || !authorRole || !category || !tags) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }
    
    const tagsArray = Array.isArray(tags) 
      ? tags 
      : tags.split(',').map((tag: string) => tag.trim());
    
    const slug = body.slug || title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
    
    const newBlog = new Blog({
      title,
      slug,
      excerpt,
      content,
      author,
      authorRole,
      authorImage: authorImageUrl || body.authorImage,
      coverImage: coverImageUrl || body.coverImage,
      category,
      tags: tagsArray,
      featured: body.featured || false,
      publishedAt: body.publishedAt ? new Date(body.publishedAt) : new Date(),
      readingTime: body.readingTime ? parseInt(body.readingTime) : 5
    });
    
    await newBlog.save();
    
    return NextResponse.json(
      { message: 'Blog created successfully', blog: newBlog },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating blog:', error);
    return NextResponse.json(
      { error: 'Failed to create blog' },
      { status: 500 }
    );
  }
}
