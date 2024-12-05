import React, { useState } from 'react';
import { Resend } from 'resend';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, AlertCircle, Wallet, Key } from 'lucide-react';
import { ethers } from 'ethers';
import { onboard } from '../utils/web3Provider';
import { WalletState, TrueVoteContract } from '../types/contract';
import TrueVoteABI from './contracts/TrueVote.json';

const CONTRACT_ADDRESS = '0x5B7e9aFd3dDe1D2a4D948Cd46b4E0c98e16900FE';

// Initialize Resend with your API key
const resend = new Resend(import.meta.env.VITE_RESEND_API_KEY);


export default function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    otp: ''
  });
  const [error, setError] = useState('');
  const [wallet, setWallet] = useState<WalletState | null>(null);
  const [contract, setContract] = useState<TrueVoteContract | null>(null);
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);

  const generateOTP = (): string => {
    return Math.floor(100000 + Math.random() * 900000).toString();
  };

  const sendOTP = async () => {
    if (!formData.email) {
      setError('Please enter an email address');
      return;
    }
  
    try {
      // Generate OTP
      const otp = generateOTP();
      
      // Send OTP via API route
      const response = await fetch('/api/send-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          otp
        })
      });
  
      // Detailed error handling
      if (!response.ok) {
        const errorText = await response.text();
        console.error('Error response:', {
          status: response.status,
          statusText: response.statusText,
          body: errorText
        });
  
        setError(`Failed to send OTP. Status: ${response.status}`);
        return;
      }
  
      // Parse JSON response
      const result = await response.json();
  
      if (!result.success) {
        setError(result.error || 'Failed to send OTP');
        return;
      }
  
      // Store OTP in local storage
      localStorage.setItem('loginOTP', JSON.stringify({
        otp,
        timestamp: Date.now()
      }));
      
      setOtpSent(true);
      setError('');
    } catch (err) {
      console.error('Full error:', err);
      setError('Failed to send OTP. Please try again.');
    }
  };
  
  
  
  

  const verifyOTP = () => {
    const storedOTP = localStorage.getItem('loginOTP');
    
    if (formData.otp === storedOTP) {
      setOtpVerified(true);
      setError('');
      localStorage.removeItem('loginOTP');
    } else {
      setError('Invalid OTP. Please try again.');
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

    if (!otpVerified) {
      setError('Please verify OTP before logging in');
      return;
    }

    try {
      // Implement full login logic
      console.log('Login successful', {
        email: formData.email,
        walletAddress: wallet.accounts[0].address
      });

      // Navigate to dashboard or next page
      navigate('/dashboard');
    
    } catch (err) {
      setError('Login failed. Please try again.');
    }
  };

  return (
    <div className="flex-grow flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-patriot-blue to-white">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-xl">
        {/* Existing wallet connection section */}
        {/* ... previous wallet connection code ... */}

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {/* Email Input */}
          <div className="rounded-md shadow-sm space-y-4">
            <div>
              <label htmlFor="email" className="sr-only">Email address</label>
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
                  disabled={otpSent}
                  className="appearance-none relative block w-full px-3 py-2 pl-10 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-patriot-blue focus:border-patriot-blue focus:z-10 sm:text-sm"
                  placeholder="Email address"
                />
              </div>
            </div>

            {/* OTP Section */}
            {otpSent && !otpVerified && (
              <div>
                <label htmlFor="otp" className="sr-only">OTP</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Key className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="otp"
                    name="otp"
                    type="text"
                    required
                    value={formData.otp}
                    onChange={handleChange}
                    className="appearance-none relative block w-full px-3 py-2 pl-10 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-patriot-blue focus:border-patriot-blue focus:z-10 sm:text-sm"
                    placeholder="Enter OTP"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-md p-4 flex items-center">
              <AlertCircle className="h-5 w-5 text-red-400 mr-3" />
              <p className="text-sm text-red-600">{error}</p>
            </div>
          )}

          {/* Action Buttons */}
          <div className="space-y-4">
            {!otpSent ? (
              <button
                type="button"
                onClick={sendOTP}
                className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-patriot-blue hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-patriot-blue transition-colors duration-200"
              >
                Send OTP
              </button>
            ) : !otpVerified ? (
              <button
                type="button"
                onClick={verifyOTP}
                className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-patriot-blue hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-patriot-blue transition-colors duration-200"
              >
                Verify OTP
              </button>
            ) : (
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-patriot-blue hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-patriot-blue transition-colors duration-200"
              >
                Sign In
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
