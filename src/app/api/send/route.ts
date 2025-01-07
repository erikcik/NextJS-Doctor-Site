import { EmailTemplate } from '@/components/email-template';
import { Resend } from 'resend';
import { NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { firstName, lastName, email, phone, message } = body;

    const data = await resend.emails.send({
      from: 'Contact Form <onboarding@resend.dev>', // Update this with your verified domain
      to: ['info@drcunettamam.com'],
      subject: 'New Contact Form Submission',
      react: EmailTemplate({ firstName, lastName, email, phone, message }),
      replyTo: email,
    });

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error }, { status: 400 });
  }
} 