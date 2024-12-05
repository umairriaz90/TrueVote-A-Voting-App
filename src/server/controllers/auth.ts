import { Request, Response } from 'express';
import { emailService } from '@/services/email';
import { generateOtp } from '@/utils/otp';

export const sendOtpHandler = async (req: Request, res: Response) => {
  const { email } = req.body;
  const otp = generateOtp();
  await emailService.sendOtp(email, otp);
  res.json({ success: true });
};

export const verifyOtpHandler = async (req: Request, res: Response) => {
  const { email, otp } = req.body;
  // Add your OTP verification logic here
  res.json({ success: true });
};

export const bindWalletHandler = async (req: Request, res: Response) => {
  const { walletAddress } = req.body;
  // Add your wallet binding logic here
  res.json({ success: true });
};
