import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb/connect';
import Blog from '@/lib/mongodb/models/Blog';
import { writeFile, mkdir } from 'fs/promises';
import path from 'path';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();
    const { id } = await params;
    
    const blog = await Blog.findById(id).lean();
    
    if (!blog) {
      return NextResponse.json(
        { error: 'Blog not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(blog);
  } catch (error) {
    console.error('Error fetching blog:', error);
    return NextResponse.json(
      { error: 'Failed to fetch blog' },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();
    const { id } = await params;
    
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
    
    const tagsArray = body.tags 
      ? (Array.isArray(body.tags) ? body.tags : body.tags.split(',').map((tag: string) => tag.trim()))
      : undefined;
    
    const updateData: any = { ...body };
    if (tagsArray) updateData.tags = tagsArray;
    if (coverImageUrl) updateData.coverImage = coverImageUrl;
    if (authorImageUrl) updateData.authorImage = authorImageUrl;
    if (body.publishedAt) updateData.publishedAt = new Date(body.publishedAt);
    if (body.readingTime) updateData.readingTime = parseInt(body.readingTime);
    
    const blog = await Blog.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    );
    
    if (!blog) {
      return NextResponse.json(
        { error: 'Blog not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({
      message: 'Blog updated successfully',
      blog
    });
  } catch (error) {
    console.error('Error updating blog:', error);
    return NextResponse.json(
      { error: 'Failed to update blog' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();
    const { id } = await params;
    
    const blog = await Blog.findByIdAndDelete(id);
    
    if (!blog) {
      return NextResponse.json(
        { error: 'Blog not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({
      message: 'Blog deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting blog:', error);
    return NextResponse.json(
      { error: 'Failed to delete blog' },
      { status: 500 }
    );
  }
}
