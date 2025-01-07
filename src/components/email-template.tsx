import * as React from 'react';

interface EmailTemplateProps {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  message: string;
}

export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
  firstName,
  lastName,
  email,
  phone,
  message,
}) => (
  <div style={{
    padding: '32px',
    maxWidth: '600px',
    margin: '0 auto',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    backgroundColor: '#ffffff',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  }}>
    <h1 style={{
      fontSize: '24px',
      color: '#1a1a1a',
      borderBottom: '2px solid #5c6ac4',
      paddingBottom: '12px',
      marginBottom: '24px',
    }}>
      ✨ New Contact Form Submission
    </h1>
    
    <div style={{
      backgroundColor: '#f7f9fc',
      padding: '20px',
      borderRadius: '6px',
      marginBottom: '24px',
    }}>
      <p style={{
        fontSize: '18px',
        margin: '0 0 8px 0',
        color: '#2d3748',
      }}>
        From: <span style={{ fontWeight: 600 }}>{firstName} {lastName}</span>
      </p>
      <p style={{
        fontSize: '16px',
        margin: '0 0 8px 0',
        color: '#4a5568',
      }}>
        📧 <a href={`mailto:${email}`} style={{ color: '#5c6ac4', textDecoration: 'none' }}>{email}</a>
      </p>
      <p style={{
        fontSize: '16px',
        margin: '0',
        color: '#4a5568',
      }}>
        📱 <a href={`tel:${phone}`} style={{ color: '#5c6ac4', textDecoration: 'none' }}>{phone}</a>
      </p>
    </div>

    <div style={{
      backgroundColor: '#f7f9fc',
      padding: '20px',
      borderRadius: '6px',
    }}>
      <h2 style={{
        fontSize: '20px',
        color: '#2d3748',
        marginTop: '0',
        marginBottom: '16px',
      }}>
        💬 Message
      </h2>
      <p style={{
        fontSize: '16px',
        lineHeight: '1.6',
        color: '#4a5568',
        margin: '0',
        whiteSpace: 'pre-wrap',
      }}>
        {message}
      </p>
    </div>
  </div>
); 