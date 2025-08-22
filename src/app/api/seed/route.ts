import { NextRequest, NextResponse } from 'next/server';
import { seedDatabase } from '@/lib/mongodb/seed';

export async function POST() {
  try {
    // Only allow seeding in development
    if (process.env.NODE_ENV !== 'development') {
      return NextResponse.json(
        { error: 'Seeding is only allowed in development mode' },
        { status: 403 }
      );
    }
    
    const result = await seedDatabase();
    
    if (result.success) {
      return NextResponse.json(result, { status: 200 });
    } else {
      return NextResponse.json(result, { status: 500 });
    }
  } catch (error) {
    console.error('Seed API error:', error);
    return NextResponse.json(
      { 
        success: false,
        error: 'Failed to seed database' 
      },
      { status: 500 }
    );
  }
}
