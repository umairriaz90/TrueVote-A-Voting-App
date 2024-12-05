import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendOtpEmail = async (email: string, otp: string) => {
  await resend.emails.send({
    from: 'TrueVote <no-reply@truevote.com>',
    to: email,
    subject: 'Your TrueVote verification code',
    html: `<p>Your verification code is: <strong>${otp}</strong></p>`
  });
};
