import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb/connect';
import Contact from '@/lib/mongodb/models/Contact';

export async function POST(request: NextRequest) {
  try {
    await connectDB();
    
    const body = await request.json();
    const { name, email, subject, message } = body;
    
    // Validate required fields
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }
    
    // Get client info for analytics/security
    const ipAddress = request.headers.get('x-forwarded-for') || 
                     request.headers.get('x-real-ip') || 
                     'unknown';
    const userAgent = request.headers.get('user-agent') || 'unknown';
    
    const newContact = new Contact({
      name,
      email,
      subject,
      message,
      ipAddress,
      userAgent
    });
    
    const savedContact = await newContact.save();
    
    // Log the contact form submission
    console.log('Contact form submission:', {
      id: savedContact._id,
      name,
      email,
      subject,
      timestamp: savedContact.createdAt
    });
    
    // Here you would typically:
    // 1. Send an email using a service like SendGrid, Resend, or Nodemailer
    // 2. Send auto-reply to the sender
    // 3. Send notification to your email
    
    return NextResponse.json({
      message: 'Message sent successfully',
      status: 'success',
      id: savedContact._id
    });
  } catch (error: any) {
    console.error('Contact form error:', error);
    
    if (error.name === 'ValidationError') {
      return NextResponse.json(
        { error: error.message },
        { status: 400 }
      );
    }
    
    return NextResponse.json(
      { error: 'Failed to send message' },
      { status: 500 }
    );
  }
}

// GET route to fetch all contact messages (for admin use)
export async function GET() {
  try {
    await connectDB();
    
    const contacts = await Contact.find({})
      .sort({ createdAt: -1 })
      .lean();
    
    return NextResponse.json(contacts);
  } catch (error) {
    console.error('Error fetching contacts:', error);
    return NextResponse.json(
      { error: 'Failed to fetch contacts' },
      { status: 500 }
    );
  }
}
