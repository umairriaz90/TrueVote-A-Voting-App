import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, AlertCircle, Wallet } from 'lucide-react';
import { ethers } from 'ethers';
import { onboard } from '../utils/web3Provider';
import { WalletState, TrueVoteContract } from '../types/contract';
import TrueVoteABI from './contracts/TrueVote.json';

const CONTRACT_ADDRESS = '0x5B7e9aFd3dDe1D2a4D948Cd46b4E0c98e16900FE';

export default function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [wallet, setWallet] = useState<WalletState | null>(null);
  const [contract, setContract] = useState<TrueVoteContract | null>(null);

  const connectWallet = async (): Promise<void> => {
    const wallets = await onboard.connectWallet();
    
    if (wallets[0]) {
      const ethersProvider = new ethers.providers.Web3Provider(wallets[0].provider);
      const signer = ethersProvider.getSigner();
      
      const trueVoteContract = new ethers.Contract(
        CONTRACT_ADDRESS,
        TrueVoteABI,
        signer
      ) as TrueVoteContract;

      setWallet(wallets[0]);
      setContract(trueVoteContract);
      contract;
    }
  };

  const disconnectWallet = async (): Promise<void> => {
    if (wallet) {
      await onboard.disconnectWallet({ label: wallet.label });
      setWallet(null);
      setContract(null);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!wallet) {
      setError('Please connect your wallet first');
      return;
    }

    try {
      // Implement login logic with both wallet and credentials
      console.log('Login attempt:', {
        ...formData,
        password: '[REDACTED]',
        walletAddress: wallet.accounts[0].address

      });
      const navigate = useNavigate();
      navigate('/dashboard');
    
    } catch (err) {
      setError('Login failed. Please check your credentials and wallet connection.');
    }
  };

  return (
    <div className="flex-grow flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-patriot-blue to-white">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-xl">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Sign in to True Vote
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Don't have an account?{' '}
            <Link to="/register" className="font-medium text-patriot-blue hover:text-blue-700">
              Register here
            </Link>
          </p>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-md p-4 flex items-center">
            <AlertCircle className="h-5 w-5 text-red-400 mr-3" />
            <p className="text-sm text-red-600">{error}</p>
          </div>
        )}

        <div className="flex justify-center">
          {!wallet ? (
            <button
              onClick={connectWallet}
              className="flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-patriot-blue hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-patriot-blue transition-colors duration-200"
            >
              <Wallet className="h-5 w-5 mr-2" />
              Connect Wallet
            </button>
          ) : (
            <button
              onClick={disconnectWallet}
              className="flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-patriot-blue transition-colors duration-200"
            >
              <Wallet className="h-5 w-5 mr-2" />
              {wallet.accounts[0].address.slice(0, 6)}...{wallet.accounts[0].address.slice(-4)}
            </button>
          )}
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {/* Existing form fields */}
          <div className="rounded-md shadow-sm space-y-4">
            <div>
              <label htmlFor="email" className="sr-only">
                Email address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="appearance-none relative block w-full px-3 py-2 pl-10 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-patriot-blue focus:border-patriot-blue focus:z-10 sm:text-sm"
                  placeholder="Email address"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className="appearance-none relative block w-full px-3 py-2 pl-10 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-patriot-blue focus:border-patriot-blue focus:z-10 sm:text-sm"
                  placeholder="Password"
                />
              </div>
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-patriot-blue hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-patriot-blue transition-colors duration-200"
            >
              Sign in
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
