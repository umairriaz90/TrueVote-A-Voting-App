import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useState } from 'react';
import { useWallet } from '../contexts/WalletContext';

export function WalletConnect() {
  const { wallet, setWallet } = useWallet();
  const { isAuthenticated, boundWalletAddress } = useAuth();
  const [showLoginPage, setShowLoginPage] = useState(false);
  const handleConnect = async () => {
    if (wallet) {
      try {
        await wallet.connect();
        const address = await wallet.getAddress();
        setWallet(wallet);
        console.log('Connected to wallet:', address);
      } catch (error) {
        console.error('Error connecting to wallet:', error);
      }
    }
  };

  return (
    <div className="bg-patriot-white p-8 rounded-lg shadow-xl">
      {!isAuthenticated ? (
        <div className="space-y-4">
          <Link 
            to="/login"
            className="w-full bg-patriot-blue hover:bg-patriot-blue-dark text-white font-semibold py-2 px-4 rounded-md transition duration-200"
          >
            Login
          </Link>
        
        </div>
      ) : (
        <div className="space-y-4">
          <p className="text-gray-700">Bound Wallet Address: {boundWalletAddress}</p>
          <button 
            onClick={() => setWallet(null)}
            className="w-full bg-patriot-red hover:bg-patriot-red-dark text-white font-semibold py-2 px-4 rounded-md transition duration-200"
          >
            Disconnect Wallet
          </button>
        </div>
      )}
    </div>
  );
}
