import { useAuth } from '../contexts/AuthContext';

export function WalletConnect() {
  const { wallet, setWallet, onboard } = useWallet();
  const { isAuthenticated, boundWalletAddress, bindWallet } = useAuth();
  const [showOtpForm, setShowOtpForm] = useState(false);
  const [loginMethod, setLoginMethod] = useState<'email' | 'phone' | null>(null);

  const handleOtpLogin = async (credentials: {email?: string, phone?: string}) => {
    try {
      await login(credentials);
      if (wallet?.accounts[0]?.address) {
        await bindWallet(wallet.accounts[0].address);
      }
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return (
    <div>
      {!isAuthenticated ? (
        <div>
          <button onClick={() => {setShowOtpForm(true); setLoginMethod('email')}}>
            Login with Email
          </button>
          <button onClick={() => {setShowOtpForm(true); setLoginMethod('phone')}}>
            Login with Phone
          </button>
          {showOtpForm && <OtpLoginForm method={loginMethod} onSubmit={handleOtpLogin} />}
        </div>
      ) : (
        <div>
          <p>Bound Wallet Address: {boundWalletAddress}</p>
          <button onClick={() => setWallet(null)}>Disconnect Wallet</button>
        </div>
      )}
    </div>
  );
}
