import express from 'express';
import nodemailer from 'nodemailer';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD
  }
});

app.post('/api/send-email', async (req, res) => {
  try {
    const { email, votingLink } = req.body;
    await transporter.sendMail({
      from: process.env.SMTP_USER,
      to: email,
      subject: 'Your TrueVote Registration',
      html: `<p>Your voting link: ${votingLink}</p>`
    });
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Failed to send email' });
  }
});

app.listen(3001, () => console.log('Email server running on port 3001'));
