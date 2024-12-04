import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendEmailOTP(email: string, otp: string) {
  return resend.emails.send({
    from: 'voting@truevote.com',
    to: email,
    subject: 'Your TrueVote Authentication Code',
    text: `Your verification code is: ${otp}`
  });
}
