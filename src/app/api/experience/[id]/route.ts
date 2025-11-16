import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb/connect';
import Experience from '@/lib/mongodb/models/Experience';
import mongoose from 'mongoose';
import { writeFile, mkdir } from 'fs/promises';
import path from 'path';

// Updated for Next.js 15 compatibility
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();
    
    const { id } = await params;
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
          body.imageUrl = imageUrl;
          console.log('Image uploaded for experience:', { filename, imageUrl });
        } catch (error) {
          console.error('Error uploading image:', error);
        }
      } else {
        console.log('No image file in update request');
      }
    } else {
      // Handle JSON data
      body = await request.json();
    }
    
    console.log('Updating experience with data:', { 
      id, 
      hasImage: !!body.imageUrl, 
      imageUrl: body.imageUrl,
      current: body.current 
    });
    
    // Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { error: 'Invalid experience ID' },
        { status: 400 }
      );
    }
    
    // Ensure technologies is an array
    if (body.technologies && !Array.isArray(body.technologies)) {
      body.technologies = body.technologies.split(',').map((tech: string) => tech.trim());
    }
    
    // Convert current to boolean
    if (typeof body.current === 'string') {
      body.current = body.current === 'true';
    }
    
    // Handle dates
    if (body.startDate) {
      body.startDate = new Date(body.startDate);
    }
    
    // Prepare update object
    const updateData: any = { 
      title: body.title,
      company: body.company,
      duration: body.duration,
      location: body.location,
      description: body.description,
      technologies: body.technologies,
      current: body.current,
      startDate: body.startDate,
      updatedAt: new Date()
    };
    
    // Add imageUrl if present
    if (body.imageUrl) {
      updateData.imageUrl = body.imageUrl;
    }
    
    // Handle endDate based on current status
    if (body.current === true) {
      // If current job, explicitly remove endDate
      updateData.$unset = { endDate: '' };
    } else if (body.endDate) {
      updateData.endDate = new Date(body.endDate);
    }
    
    console.log('Final updateData:', JSON.stringify(updateData, null, 2));
    
    const updatedExperience = await Experience.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    );
    
    console.log('Updated experience result:', {
      title: updatedExperience?.title,
      imageUrl: updatedExperience?.imageUrl
    });
    
    if (!updatedExperience) {
      return NextResponse.json(
        { error: 'Experience not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({
      message: 'Experience updated successfully',
      experience: updatedExperience
    });
  } catch (error: any) {
    console.error('Error updating experience:', error);
    
    if (error.name === 'ValidationError') {
      return NextResponse.json(
        { error: error.message },
        { status: 400 }
      );
    }
    
    return NextResponse.json(
      { error: 'Failed to update experience' },
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
        { error: 'Invalid experience ID' },
        { status: 400 }
      );
    }
    
    const deletedExperience = await Experience.findByIdAndDelete(id);
    
    if (!deletedExperience) {
      return NextResponse.json(
        { error: 'Experience not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({ 
      message: 'Experience deleted successfully',
      deletedExperience 
    });
  } catch (error) {
    console.error('Error deleting experience:', error);
    return NextResponse.json(
      { error: 'Failed to delete experience' },
      { status: 500 }
    );
  }
}
