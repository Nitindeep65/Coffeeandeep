import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb/connect';
import Project from '@/lib/mongodb/models/Project';
import { writeFile, mkdir } from 'fs/promises';
import path from 'path';

export async function GET() {
  try {
    await connectDB();
    
    const projects = await Project.find({})
      .sort({ createdAt: -1 })
      .lean();
    
    // Debug: Log what we're returning
    console.log('API: Returning projects:', projects.map(p => ({ 
      title: p.title, 
      imageUrl: p.imageUrl,
      hasImage: !!p.imageUrl 
    })));
    
    return NextResponse.json(projects);
  } catch (error) {
    console.error('Error fetching projects:', error);
    return NextResponse.json(
      { error: 'Failed to fetch projects' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectDB();
    
    const contentType = request.headers.get('content-type') || '';
    let projectData: any;
    let imageUrl: string | null = null;
    
    if (contentType.includes('application/json')) {
      // Handle JSON data
      projectData = await request.json();
    } else {
      // Handle FormData (with image upload)
      const formData = await request.formData();
      projectData = {
        title: formData.get('title'),
        description: formData.get('description'),
        fullDescription: formData.get('fullDescription'),
        technologies: formData.get('technologies'),
        githubUrl: formData.get('githubUrl'),
        liveUrl: formData.get('liveUrl'),
        category: formData.get('category'),
      };

      // Handle image upload
      const imageFile = formData.get('image') as File;
      if (imageFile && imageFile.size > 0) {
        console.log('Processing image upload:', { 
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
          console.log('Image saved successfully:', { filepath, imageUrl });
        } catch (error) {
          console.error('Error uploading image:', error);
          return NextResponse.json(
            { error: 'Failed to upload image' },
            { status: 500 }
          );
        }
      } else {
        console.log('No image file provided or file is empty');
      }
    }
    
    // Validate required fields
    const { title, description, fullDescription, technologies, githubUrl, liveUrl, category } = projectData;
    
    if (!title || !description || !fullDescription || !technologies || !githubUrl || !liveUrl) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }
    
    // Ensure technologies is an array
    const techArray = Array.isArray(technologies) 
      ? technologies 
      : technologies.split(',').map((tech: string) => tech.trim());
    
    const newProject = new Project({
      title,
      description,
      fullDescription,
      technologies: techArray,
      githubUrl,
      liveUrl,
      category: category || 'Frontend',
      imageUrl: imageUrl || projectData.imageUrl || null,
      featured: projectData.featured || false
    });
    
    const savedProject = await newProject.save();
    
    return NextResponse.json(
      { 
        message: 'Project created successfully', 
        project: savedProject 
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('Error creating project:', error);
    
    if (error.name === 'ValidationError') {
      return NextResponse.json(
        { error: error.message },
        { status: 400 }
      );
    }
    
    return NextResponse.json(
      { error: 'Failed to create project' },
      { status: 500 }
    );
  }
}
