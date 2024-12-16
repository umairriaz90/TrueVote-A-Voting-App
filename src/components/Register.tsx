import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Lock, AlertCircle, CreditCard } from 'lucide-react';
import { ethers } from 'ethers';
import { TrueVoteContract } from '../types/contract';
import { useWallet } from '../contexts/WalletContext';
import TrueVoteABI from './contracts/TrueVote.json';
import { sendVotingLink } from '../services/emailService';


const CONTRACT_ADDRESS = '0x5B7e9aFd3dDe1D2a4D948Cd46b4E0c98e16900FE';

export default function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    voterID: '',
    email: '',
    age: '',
    region: '',
    group: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { wallet, connectWallet, isConnecting } = useWallet();
  const [contract, setContract] = useState<TrueVoteContract | null>(null);


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const [emailSent, setEmailSent] = useState(false);
  const [canResend, setCanResend] = useState(true);

  const handleEmailSend = async (email: string, votingLink: string) => {
    try {
      const response = await fetch('http://localhost:3001/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, votingLink })
      });
      const result = await response.json();
      setEmailSent(result.success);
      setCanResend(!result.success);
      return result.success;
    } catch (error) {
      console.error('Email sending failed:', error);
      setCanResend(true);
      return false;
    }
  };
  
  const registerVoter = async () => {
    const contractAddress = CONTRACT_ADDRESS;
    const provider = new ethers.providers.Web3Provider(wallet.provider);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(contractAddress, TrueVoteABI, signer) as TrueVoteContract;
    setContract(contract);

    if (!contract || !wallet) {
      setError('Please connect your wallet first');
      return false;
    }
  
    try {
      // Create bytes32 hashed password
      const hashedPassword = ethers.utils.keccak256(
        ethers.utils.toUtf8Bytes(formData.password)
      );
  
      const tx = await contract.registerVoter(
        formData.firstName,
        formData.lastName,
        formData.voterID,
        formData.email,
        Number(formData.age),
        formData.region,
        formData.group,
        hashedPassword
      );
      
      const receipt = await tx.wait();
      console.log('Transaction confirmed:', receipt);
      return true;
    } catch (err: any) {
      console.error('Contract error:', err);
      setError(err.reason || 'Failed to register voter on blockchain');
      return false;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      if (!wallet) {
        await connectWallet();
      }
      // Register on blockchain
      const registrationSuccess = await registerVoter();
      
      if (registrationSuccess) {
        // Generate unique voting link with user's voterID
        const votingLink = `${window.location.origin}/vote/0`;
        
        // Send confirmation email
        const emailResult = await handleEmailSend(formData.email, votingLink);
        
        if (!emailResult.success) {
          console.error('Failed to send voting link email');
          setError('Registration successful but failed to send confirmation email');
        } else {
          // Navigate to login on success
          navigate('/login');
        }
      }
    } catch (err) {
      setError('Registration failed. Please try again.');
      console.error('Registration error:', err);
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <div className="flex-grow flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-patriot-blue to-white">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-xl">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Register for True Vote
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Already have an account?{' '}
            <Link to="/login" className="font-medium text-patriot-blue hover:text-blue-700">
              Sign in here
            </Link>
          </p>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-md p-4 flex items-center">
            <AlertCircle className="h-5 w-5 text-red-400 mr-3" />
            <p className="text-sm text-red-600">{error}</p>
          </div>
        )}
          {canResend && (
              <button
                type="button"
                onClick={() => handleEmailSend(formData.email, `${window.location.origin}/vote/${formData.voterID}`)}
                className="mt-4 w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-yellow-600 hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
              >
                Resend Email
              </button>
              )}

        <div className="flex justify-center">
          
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm space-y-4">
  <div>
    <input
      name="firstName"
      type="text"
      required
      value={formData.firstName}
      onChange={handleChange}
      className="appearance-none relative block w-full px-3 py-2 pl-10 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-patriot-blue focus:border-patriot-blue focus:z-10 sm:text-sm"
      placeholder="First Name"
    />
  </div>
  <div>
    <input
      name="lastName"
      type="text"
      required
      value={formData.lastName}
      onChange={handleChange}
      className="appearance-none relative block w-full px-3 py-2 pl-10 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-patriot-blue focus:border-patriot-blue focus:z-10 sm:text-sm"
      placeholder="Last Name"
    />
  </div>
<div>
  <input
    name="email"
    type="email"
    required
    value={formData.email}
    onChange={handleChange}
    className="appearance-none relative block w-full px-3 py-2 pl-10 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-patriot-blue focus:border-patriot-blue focus:z-10 sm:text-sm"
    placeholder="Email Address"
  />
</div>


  <div>
  <label htmlFor="voterID" className="sr-only">
                Voter ID
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <CreditCard className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="voterID"
                  name="voterID"
                  type="text"
                  required
                  value={formData.voterID}
                  onChange={handleChange}
                  className="appearance-none relative block w-full px-3 py-2 pl-10 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-patriot-blue focus:border-patriot-blue focus:z-10 sm:text-sm"
                  placeholder="Voter ID Number"
                />
              </div>
  </div>
  <div>
    <input
      name="age"
      type="number"
      required
      value={formData.age}
      onChange={handleChange}
      className="appearance-none relative block w-full px-3 py-2 pl-10 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-patriot-blue focus:border-patriot-blue focus:z-10 sm:text-sm"
      placeholder="Age"
    />
  </div>
  <div>
    <input
      name="region"
      type="text"
      required
      value={formData.region}
      onChange={handleChange}
      className="appearance-none relative block w-full px-3 py-2 pl-10 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-patriot-blue focus:border-patriot-blue focus:z-10 sm:text-sm"
      placeholder="Region"
    />
  </div>
  <div>
    <input
      name="group"
      type="text"
      required
      value={formData.group}
      onChange={handleChange}
      className="appearance-none relative block w-full px-3 py-2 pl-10 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-patriot-blue focus:border-patriot-blue focus:z-10 sm:text-sm"
      placeholder="Group"
    />
  </div>

            <div>
              <label htmlFor="password" className="sr-only">Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="password"
                  name="password"
                  type="password"
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
                disabled={loading}
                className={`group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white ${
                  loading 
                  ? 'bg-gray-400 cursor-not-allowed' 
                  : 'bg-patriot-blue hover:bg-blue-700'
                  } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-patriot-blue transition-colors duration-200`}
                  >
                  {loading ? 'Registering...' : 'Register'}
                  </button>

          </div>
        </form>
      </div>
    </div>
  );
}
