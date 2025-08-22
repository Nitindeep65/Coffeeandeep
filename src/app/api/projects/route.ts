import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb/connect';
import Project from '@/lib/mongodb/models/Project';

export async function GET() {
  try {
    await connectDB();
    
    const projects = await Project.find({})
      .sort({ createdAt: -1 })
      .lean();
    
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
    
    const body = await request.json();
    
    // Validate required fields
    const { title, description, fullDescription, technologies, githubUrl, liveUrl, category } = body;
    
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
      imageUrl: body.imageUrl || null,
      featured: body.featured || false
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
