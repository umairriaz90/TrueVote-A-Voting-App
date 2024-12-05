import express from 'express';
import { body } from 'express-validator';
import { sendOtpHandler, verifyOtpHandler, bindWalletHandler } from '../controllers/auth';

const router = express.Router();

router.post('/send-otp',
  body('email').isEmail(),
  sendOtpHandler
);

router.post('/verify-otp',
  body('email').isEmail(),
  body('otp').isLength({ min: 6, max: 6 }),
  verifyOtpHandler
);

router.post('/bind-wallet',
  body('walletAddress').isString(),
  bindWalletHandler
);

export default router;
