import { Router } from 'react-router-dom';
import { sendOtpHandler } from '../controllers/auth';

const router = Router('/api/auth');

router.post('/send-otp', sendOtpHandler);
router.post('/verify-otp', verifyOtpHandler);
router.post('/bind-wallet', bindWalletHandler);

export default router;
