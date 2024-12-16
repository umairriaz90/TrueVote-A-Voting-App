import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: Number(process.env.SMTP_PORT) || 587,
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD
  }
});

interface EmailResponse {
  success: boolean;
  data?: any;
  error?: any;
}

export const sendVotingLink = async (email: string, votingLink: string): Promise<EmailResponse> => {
  try {
    const info = await transporter.sendMail({
      from: `"TrueVote" <${process.env.SMTP_USER}>`,
      to: email,
      subject: 'Your TrueVote Registration Confirmation',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #1a365d;">Welcome to TrueVote!</h2>
          <p>Thank you for registering with TrueVote. Your account has been successfully created.</p>
          <p>Click the link below to access your secure voting portal:</p>
          <a 
            href="${votingLink}" 
            style="display: inline-block; padding: 10px 20px; background-color: #1a365d; color: white; text-decoration: none; border-radius: 5px; margin: 15px 0;"
          >
            Access Voting Portal
          </a>
          <p style="color: #666; font-size: 12px;">
            If you didn't register for TrueVote, please ignore this email.
          </p>
        </div>
      `
    });

    return { success: true, data: info };
  } catch (error) {
    console.error('Failed to send email:', error);
    return { success: false, error };
  }
};
