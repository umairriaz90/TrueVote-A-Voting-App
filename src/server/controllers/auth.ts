import { Request, Response } from 'express';
import { emailService } from '@/services/email';
import { generateOtp, isValidOtp } from '@/utils/otp';

export const sendOtpHandler = async (req: Request, res: Response) => {
  const { email } = req.body;
  const otp = generateOtp();
  await emailService.sendOtp(email, otp);
  // Store OTP temporarily (in-memory or Redis)
  tempOtpStore.set(email, otp);
  res.json({ message: 'OTP sent successfully' });
};

export const verifyOtpHandler = async (req: Request, res: Response) => {
  const { email, otp } = req.body;
  const storedOtp = tempOtpStore.get(email);
  if (isValidOtp(storedOtp, otp)) {
    // OTP verification successful, proceed with further logic
    res.json({ success: true });
  } else {
    res.status(401).json({ error: 'Invalid OTP' });
  }
};

export const bindWalletHandler = async (req: Request, res: Response) => {
  const { walletAddress } = req.body;
  // Add your wallet binding logic here
  res.json({ success: true });
};
