import { generateOTP } from '../services/otp';
import { sendOtpEmail } from '../../services/email';

export const sendOtpHandler = async (req: Request, res: Response) => {
  const { email } = req.body;
  const otp = generateOTP();
  
  await sendOtpEmail(email, otp);
  
  // Store OTP temporarily (in-memory or Redis)
  tempOtpStore.set(email, otp);
  
  res.json({ message: 'OTP sent successfully' });
};
