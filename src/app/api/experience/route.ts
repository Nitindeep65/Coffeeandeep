import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb/connect';
import Experience from '@/lib/mongodb/models/Experience';

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
    
    const body = await request.json();
    
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
      endDate
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
