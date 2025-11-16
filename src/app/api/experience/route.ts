import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb/connect';
import Experience from '@/lib/mongodb/models/Experience';
import { writeFile, mkdir } from 'fs/promises';
import path from 'path';

export async function GET() {
  try {
    await connectDB();
    
    const experiences = await Experience.find({})
      .sort({ startDate: -1 })
      .lean();
    
    return NextResponse.json(experiences);
  } catch (error) {
    console.error('Error fetching experiences:', error);
    return NextResponse.json(
      { error: 'Failed to fetch experiences' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectDB();
    
    const contentType = request.headers.get('content-type') || '';
    let body: any;
    let imageUrl: string | null = null;
    
    if (contentType.includes('multipart/form-data')) {
      // Handle FormData (with image upload)
      const formData = await request.formData();
      body = {
        title: formData.get('title'),
        company: formData.get('company'),
        duration: formData.get('duration'),
        location: formData.get('location'),
        description: formData.get('description'),
        technologies: formData.get('technologies'),
        current: formData.get('current') === 'true',
        startDate: formData.get('startDate'),
        endDate: formData.get('endDate'),
      };

      // Handle image upload
      const imageFile = formData.get('image') as File;
      if (imageFile && imageFile.size > 0) {
        try {
          const uploadDir = path.join(process.cwd(), 'public', 'uploads');
          await mkdir(uploadDir, { recursive: true });

          const timestamp = Date.now();
          const originalName = imageFile.name.replace(/[^a-zA-Z0-9.-]/g, '');
          const filename = `experience-${timestamp}-${originalName}`;
          const filepath = path.join(uploadDir, filename);

          const bytes = await imageFile.arrayBuffer();
          const buffer = Buffer.from(bytes);
          await writeFile(filepath, buffer);

          imageUrl = `/uploads/${filename}`;
        } catch (error) {
          console.error('Error uploading image:', error);
        }
      }
    } else {
      // Handle JSON data
      body = await request.json();
    }
    
    // Validate required fields
    const { title, company, duration, location, description, technologies } = body;
    
    if (!title || !company || !duration || !location || !description || !technologies) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }
    
    // Ensure technologies is an array
    const techArray = Array.isArray(technologies) 
      ? technologies 
      : technologies.split(',').map((tech: string) => tech.trim());
    
    // Parse start date (you might want to add this field to your form)
    const startDate = body.startDate ? new Date(body.startDate) : new Date();
    const endDate = body.endDate ? new Date(body.endDate) : undefined;
    
    const newExperience = new Experience({
      title,
      company,
      duration,
      location,
      description,
      technologies: techArray,
      current: body.current || false,
      startDate,
      endDate,
      imageUrl: imageUrl || body.imageUrl || undefined
    });
    
    const savedExperience = await newExperience.save();
    
    return NextResponse.json(
      { 
        message: 'Experience created successfully', 
        experience: savedExperience 
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('Error creating experience:', error);
    
    if (error.name === 'ValidationError') {
      return NextResponse.json(
        { error: error.message },
        { status: 400 }
      );
    }
    
    return NextResponse.json(
      { error: 'Failed to create experience' },
      { status: 500 }
    );
  }
}
