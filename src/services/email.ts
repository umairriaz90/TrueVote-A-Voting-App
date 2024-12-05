import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export const emailService = {
  async sendOtp(email: string, otp: string) {
    return resend.emails.send({
      from: 'TrueVote <noreply@truevote.com>',
      to: email,
      subject: 'Your Verification Code',
      html: `
        <div style="font-family: Arial, sans-serif;">
          <h2>Your TrueVote Verification Code</h2>
          <p>Your verification code is: <strong>${otp}</strong></p>
          <p>This code will expire in 10 minutes.</p>
        </div>
      `
    });
  }
};
