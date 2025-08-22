import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb/connect';
import Project from '@/lib/mongodb/models/Project';
import mongoose from 'mongoose';

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();
    
    const body = await request.json();
    const { id } = params;
    
    // Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { error: 'Invalid project ID' },
        { status: 400 }
      );
    }
    
    // Ensure technologies is an array
    if (body.technologies && !Array.isArray(body.technologies)) {
      body.technologies = body.technologies.split(',').map((tech: string) => tech.trim());
    }
    
    const updatedProject = await Project.findByIdAndUpdate(
      id,
      { ...body, updatedAt: new Date() },
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
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();
    
    const { id } = params;
    
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
