import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb/connect';
import Profile from '@/lib/mongodb/models/Profile';

export async function GET() {
  try {
    await connectDB();
    
    // Get the active profile (you might have multiple profiles, but usually just one)
    let profile = await Profile.findOne({ isActive: true }).lean();
    
    // If no profile exists, create a default one
    if (!profile) {
      const defaultProfile = new Profile({
        name: "Your Name",
        title: "Full Stack Developer",
        email: "your.email@example.com",
        location: "Your City, Country",
        bio: "Passionate full-stack developer with expertise in modern web technologies.",
        skills: {
          frontend: ["React", "Next.js", "TypeScript", "Tailwind CSS", "JavaScript", "HTML5"],
          backend: ["Node.js", "Express.js", "Python", "RESTful APIs", "GraphQL", "MongoDB"],
          tools: ["Git", "Docker", "AWS", "Figma", "VS Code", "Linux"]
        },
        social: {
          linkedin: "https://linkedin.com/in/yourprofile",
          github: "https://github.com/yourusername",
          twitter: "https://twitter.com/yourusername"
        },
        stats: {
          experience: "3+",
          projects: "50+",
          clients: "25+",
          quality: "100%"
        }
      });
      
      profile = await defaultProfile.save();
    }
    
    return NextResponse.json(profile);
  } catch (error) {
    console.error('Error fetching profile:', error);
    return NextResponse.json(
      { error: 'Failed to fetch profile' },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    await connectDB();
    
    const body = await request.json();
    
    // Find the active profile or create one if it doesn't exist
    let profile = await Profile.findOne({ isActive: true });
    
    if (!profile) {
      // Create new profile
      profile = new Profile({
        ...body,
        isActive: true
      });
    } else {
      // Update existing profile
      Object.assign(profile, body);
    }
    
    const savedProfile = await profile.save();
    
    return NextResponse.json({
      message: 'Profile updated successfully',
      profile: savedProfile
    });
  } catch (error: any) {
    console.error('Error updating profile:', error);
    
    if (error.name === 'ValidationError') {
      return NextResponse.json(
        { error: error.message },
        { status: 400 }
      );
    }
    
    return NextResponse.json(
      { error: 'Failed to update profile' },
      { status: 500 }
    );
  }
}
