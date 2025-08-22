import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb/connect';
import Project from '@/lib/mongodb/models/Project';

export async function POST(request: NextRequest) {
  try {
    await connectDB();
    
    // Sample image URLs (you can replace these with actual project screenshots)
    const sampleImages = [
      'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=600&h=400&fit=crop',
      'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=600&h=400&fit=crop',
      'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&h=400&fit=crop',
      'https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?w=600&h=400&fit=crop',
      'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=600&h=400&fit=crop'
    ];
    
    // Find all projects without images
    const projectsWithoutImages = await Project.find({ 
      $or: [
        { imageUrl: { $exists: false } },
        { imageUrl: null },
        { imageUrl: '' }
      ]
    });
    
    console.log(`Found ${projectsWithoutImages.length} projects without images`);
    
    // Update each project with a sample image
    const updates = [];
    for (let i = 0; i < projectsWithoutImages.length; i++) {
      const project = projectsWithoutImages[i];
      const imageUrl = sampleImages[i % sampleImages.length];
      
      const updateResult = await Project.findByIdAndUpdate(
        project._id,
        { imageUrl },
        { new: true }
      );
      
      updates.push({
        id: project._id,
        title: project.title,
        newImageUrl: imageUrl
      });
    }
    
    return NextResponse.json({
      message: `Updated ${updates.length} projects with sample images`,
      updates
    });
    
  } catch (error) {
    console.error('Error updating projects:', error);
    return NextResponse.json(
      { error: 'Failed to update projects' },
      { status: 500 }
    );
  }
}
