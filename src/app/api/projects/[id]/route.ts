import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb/connect';
import Project from '@/lib/mongodb/models/Project';
import mongoose from 'mongoose';
import { writeFile, mkdir } from 'fs/promises';
import path from 'path';

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();
    
    const { id } = await params;
    
    // Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { error: 'Invalid project ID' },
        { status: 400 }
      );
    }
    
    const contentType = request.headers.get('content-type') || '';
    let projectData: any;
    let imageUrl: string | null = null;
    
    if (contentType.includes('application/json')) {
      // Handle JSON data
      projectData = await request.json();
    } else {
      // Handle FormData (with potential image upload)
      const formData = await request.formData();
      projectData = {
        title: formData.get('title'),
        description: formData.get('description'),
        fullDescription: formData.get('fullDescription'),
        technologies: formData.get('technologies'),
        githubUrl: formData.get('githubUrl'),
        liveUrl: formData.get('liveUrl'),
        category: formData.get('category'),
        featured: formData.get('featured'),
      };

      // Handle image upload
      const imageFile = formData.get('image') as File;
      if (imageFile && imageFile.size > 0) {
        console.log('Processing image upload for project update:', { 
          name: imageFile.name, 
          size: imageFile.size, 
          type: imageFile.type 
        });
        
        try {
          // Create uploads directory if it doesn't exist
          const uploadDir = path.join(process.cwd(), 'public', 'uploads');
          try {
            await mkdir(uploadDir, { recursive: true });
          } catch (error) {
            // Directory might already exist, continue
          }

          // Generate unique filename
          const timestamp = Date.now();
          const originalName = imageFile.name.replace(/[^a-zA-Z0-9.-]/g, '');
          const filename = `project-${timestamp}-${originalName}`;
          const filepath = path.join(uploadDir, filename);

          // Convert file to buffer and save
          const bytes = await imageFile.arrayBuffer();
          const buffer = Buffer.from(bytes);
          await writeFile(filepath, buffer);

          // Set the image URL for the database
          imageUrl = `/uploads/${filename}`;
          console.log('Image updated successfully:', { filepath, imageUrl });
        } catch (error) {
          console.error('Error uploading image:', error);
          return NextResponse.json(
            { error: 'Failed to upload image' },
            { status: 500 }
          );
        }
      }
    }
    
    // Ensure technologies is an array
    if (projectData.technologies && !Array.isArray(projectData.technologies)) {
      projectData.technologies = projectData.technologies.split(',').map((tech: string) => tech.trim());
    }

    // Add imageUrl to projectData if we uploaded one
    if (imageUrl) {
      projectData.imageUrl = imageUrl;
    }
    
    const updatedProject = await Project.findByIdAndUpdate(
      id,
      { ...projectData, updatedAt: new Date() },
      { new: true, runValidators: true }
    );
    
    if (!updatedProject) {
      return NextResponse.json(
        { error: 'Project not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({
      message: 'Project updated successfully',
      project: updatedProject
    });
  } catch (error: any) {
    console.error('Error updating project:', error);
    
    if (error.name === 'ValidationError') {
      return NextResponse.json(
        { error: error.message },
        { status: 400 }
      );
    }
    
    return NextResponse.json(
      { error: 'Failed to update project' },
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
    
    // Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { error: 'Invalid project ID' },
        { status: 400 }
      );
    }
    
    const deletedProject = await Project.findByIdAndDelete(id);
    
    if (!deletedProject) {
      return NextResponse.json(
        { error: 'Project not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({ 
      message: 'Project deleted successfully',
      deletedProject 
    });
  } catch (error) {
    console.error('Error deleting project:', error);
    return NextResponse.json(
      { error: 'Failed to delete project' },
      { status: 500 }
    );
  }
}
