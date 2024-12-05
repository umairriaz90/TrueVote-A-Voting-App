import React, { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Resend } from 'resend';

const SendOTPRoute: React.FC = () => {
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const sendOTP = async () => {
      try {
        const resend = new Resend(import.meta.env.VITE_RESEND_API_KEY);
        
        // Implement your OTP sending logic here
        // This is just a placeholder and would need to be adapted to your specific use case
        const { data, error } = await resend.emails.send({
          from: 'TrueVote <noreply@truevote.com>',
          to: ['recipient@example.com'],
          subject: 'Test OTP',
          html: '<p>Your OTP is: 123456</p>'
        });

        if (error) {
          setError(error.toString());
        } else {
          setResult(data);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unknown error occurred');
      }
    };

    sendOTP();
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!result) {
    return <div>Sending OTP...</div>;
  }

  return <div>OTP Sent Successfully</div>;
};

export default function ApiRoutes() {
  return (
    <Routes>
      <Route path="send-otp" element={<SendOTPRoute />} />
      {/* Add more API routes as needed */}
    </Routes>
  );
}
