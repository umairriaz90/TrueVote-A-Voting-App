import express from 'express';
import nodemailer from 'nodemailer';
import cors from 'cors';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config();
// Rest of the code remains same


const app = express();
app.use(cors());
app.use(express.json());

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: true, // true for 465, false for other ports
  tls: {
    // Required for some hosts
    rejectUnauthorized: true,
    minVersion: "TLSv1.2"
  },
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD
  }
});
app.post('/api/send-email', async (req, res) => {
  try {
    const { email, votingLink } = req.body;
    await transporter.sendMail({
      from: `"TrueVote" <${process.env.SMTP_USER}>`,
      to: email,
      subject: 'Your TrueVote Registration',
      html: `
        <div style="font-family: Arial, sans-serif;">
          <h2>Welcome to TrueVote!</h2>
          <p>Here's your secure voting link: ${votingLink}</p>
        </div>
      `
    });
    res.json({ success: true });
  } catch (error) {
    console.error('Email error:', error);
    res.status(500).json({ error: 'Failed to send email' });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Email server running on port ${PORT}`));

// Add after transporter creation
transporter.verify(function(error, success) {
  if (error) {
    console.log('Server connection failed:', error);
  } else {
    console.log('Server is ready to take our messages');
  }
});
