import express from 'express';
import { sendOtpHandler, verifyOtpHandler, bindWalletHandler } from '../controllers/auth';

const router = express.Router();

router.post('/send-otp', sendOtpHandler);
router.post('/verify-otp', verifyOtpHandler);
router.post('/bind-wallet', bindWalletHandler);

export default router;
