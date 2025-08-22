import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb/connect';
import Contact from '@/lib/mongodb/models/Contact';
import nodemailer from 'nodemailer';

// Create email transporter
const createTransporter = () => {
  return nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.SMTP_EMAIL,
      pass: process.env.SMTP_PASSWORD,
    },
  });
};

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
    
    // Send email notification
    try {
      const transporter = createTransporter();
      
      // Send notification to you
      await transporter.sendMail({
        from: process.env.SMTP_EMAIL,
        to: process.env.SMTP_EMAIL,
        subject: `Portfolio Contact: ${subject}`,
        html: `
          <h2>New Contact Form Submission</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Subject:</strong> ${subject}</p>
          <p><strong>Message:</strong></p>
          <p>${message.replace(/\n/g, '<br>')}</p>
          <hr>
          <p><small>Submitted at: ${new Date().toLocaleString()}</small></p>
        `,
      });
      
      // Send auto-reply to the sender
      await transporter.sendMail({
        from: process.env.SMTP_EMAIL,
        to: email,
        subject: 'Thank you for contacting me!',
        html: `
          <h2>Thank you for reaching out!</h2>
          <p>Hi ${name},</p>
          <p>Thank you for your message. I've received your inquiry about "${subject}" and will get back to you as soon as possible.</p>
          <p>Your message:</p>
          <blockquote style="border-left: 4px solid #ccc; padding-left: 16px; margin: 16px 0;">
            ${message.replace(/\n/g, '<br>')}
          </blockquote>
          <p>I typically respond within 24 hours.</p>
          <p>Best regards,<br>Nitindeep Singh</p>
        `,
      });
      
      console.log('Emails sent successfully');
    } catch (emailError) {
      console.error('Email sending failed:', emailError);
      // Don't fail the request if email fails - the contact is still saved
    }
    
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
