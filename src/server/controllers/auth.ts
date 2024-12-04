import { Request, Response } from 'express';
import { generateOTP, sendEmailOTP, sendSMSOTP } from '../services/otp';
import { prisma } from '../db';
import { ethers } from 'ethers';

export async function sendOtpHandler(req: Request, res: Response) {
  const { type, identifier } = req.body;
  const otp = generateOTP();
  
  try {
    if (type === 'email') {
      await sendEmailOTP(identifier, otp);
    } else {
      await sendSMSOTP(identifier, otp);
    }
    
    await prisma.otpCode.create({
      data: {
        code: otp,
        identifier,
        type,
        expiresAt: new Date(Date.now() + 10 * 60 * 1000) // 10 minutes
      }
    });
    
    res.status(200).json({ message: 'OTP sent successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to send OTP' });
  }
}

export async function verifyOtpHandler(req: Request, res: Response) {
  const { type, identifier, otp } = req.body;
  
  try {
    const otpRecord = await prisma.otpCode.findFirst({
      where: {
        identifier,
        code: otp,
        type,
        expiresAt: { gt: new Date() }
      }
    });
    
    if (!otpRecord) {
      return res.status(400).json({ error: 'Invalid or expired OTP' });
    }
    
    const user = await prisma.user.upsert({
      where: { [type]: identifier },
      update: {},
      create: { [type]: identifier }
    });
    
    const token = generateJWT(user.id);
    res.status(200).json({ token, userId: user.id });
  } catch (error) {
    res.status(500).json({ error: 'Verification failed' });
  }
}

export async function bindWalletHandler(req: Request, res: Response) {
  const { userId, walletAddress } = req.body;
  
  try {
    if (!ethers.utils.isAddress(walletAddress)) {
      return res.status(400).json({ error: 'Invalid wallet address' });
    }
    
    await prisma.user.update({
      where: { id: userId },
      data: { walletAddress }
    });
    
    res.status(200).json({ message: 'Wallet bound successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to bind wallet' });
  }
}
