import { NextRequest, NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import path from 'path';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('cv') as File;

    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    }

    // Validate file type (PDF only)
    if (!file.type.includes('pdf')) {
      return NextResponse.json({ error: 'Only PDF files are allowed' }, { status: 400 });
    }

    // Validate file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      return NextResponse.json({ error: 'File size must be less than 10MB' }, { status: 400 });
    }

    // Create cv directory if it doesn't exist
    const uploadDir = path.join(process.cwd(), 'public', 'cv');
    try {
      await mkdir(uploadDir, { recursive: true });
    } catch (error) {
      // Directory might already exist, continue
    }

    // Convert file to buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Save file with timestamp to avoid conflicts
    const timestamp = Date.now();
    const filename = `cv-${timestamp}.pdf`;
    const filepath = path.join(uploadDir, filename);

    await writeFile(filepath, buffer);

    // Also save as the main CV file (overwrite existing)
    const mainCvPath = path.join(uploadDir, 'your-cv.pdf');
    await writeFile(mainCvPath, buffer);

    return NextResponse.json({ 
      message: 'CV uploaded successfully',
      filename: filename,
      path: `/cv/${filename}`,
      mainPath: '/cv/your-cv.pdf'
    });

  } catch (error) {
    console.error('Error uploading CV:', error);
    return NextResponse.json({ error: 'Failed to upload CV' }, { status: 500 });
  }
}
