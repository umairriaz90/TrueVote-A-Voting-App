import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ethers } from 'ethers';
import { useWallet } from '../contexts/WalletContext';
import { TrueVoteContract } from '../types/contract';
import TrueVoteABI from './contracts/TrueVote.json';

const CONTRACT_ADDRESS = '0x5B7e9aFd3dDe1D2a4D948Cd46b4E0c98e16900FE';

const MOCK_CANDIDATES = [
  {
    id: "1",
    name: "John Smith",
    party: "Democratic Party",
    description: "Experienced leader with 20 years in public service"
  },
  {
    id: "2",
    name: "Sarah Johnson",
    party: "Republican Party",
    description: "Business leader focused on economic growth"
  },
  {
    id: "3",
    name: "Michael Chen",
    party: "Independent",
    description: "Community organizer and education advocate"
  },
  {
    id: "4",
    name: "Lisa Rodriguez",
    party: "Green Party",
    description: "Environmental scientist and climate policy expert"
  }
];

export default function Vote() {
  const { electionId } = useParams();
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [selectedCandidate, setSelectedCandidate] = useState('');
  const { wallet, connectWallet, isConnecting } = useWallet();
  const [contract, setContract] = useState<TrueVoteContract | null>(null);

  const handleVote = async () => {
    
    const contract = new ethers.Contract(
      CONTRACT_ADDRESS,
      TrueVoteABI,
      wallet
    ) as TrueVoteContract;
    setContract(contract);
    

    if (!contract || !wallet) {
      setError('Please connect your wallet first');
      return;
    }
    

    if (!selectedCandidate) {
      setError('Please select a candidate');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const tx = await contract.castVote(
        electionId,
        selectedCandidate
      );
      
      const receipt = await tx.wait();
      console.log('Vote cast successfully:', receipt);
      
      navigate('/analytics');
    } catch (err: any) {
      console.error('Error casting vote:', err);
      setError(err.reason || 'Failed to cast vote');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-bold mb-6">2024 Presidential Election</h1>
        
        {!wallet ? (
          <div className="text-center">
            <button
              onClick={connectWallet}
              className="bg-patriot-blue text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Connect Wallet to cast vote
            </button>
          </div>
        ) : (
          <>
            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-4">Select Your Candidate</h2>
              <div className="space-y-4">
                {MOCK_CANDIDATES.map((candidate) => (
                  <div
                    key={candidate.id}
                    className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                      selectedCandidate === candidate.id
                        ? 'border-patriot-blue bg-blue-50'
                        : 'border-gray-200 hover:border-patriot-blue'
                    }`}
                    onClick={() => setSelectedCandidate(candidate.id)}
                  >
                    <div className="flex items-center">
                      <input
                        type="radio"
                        checked={selectedCandidate === candidate.id}
                        onChange={() => setSelectedCandidate(candidate.id)}
                        className="h-4 w-4 text-patriot-blue"
                      />
                      <label className="ml-4 flex-grow">
                        <div className="font-medium">{candidate.name}</div>
                        <div className="text-gray-500">{candidate.party}</div>
                        <div className="text-sm text-gray-600 mt-1">{candidate.description}</div>
                      </label>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {error && (
              <div className="mb-4 p-4 bg-red-50 text-red-600 rounded-lg">
                {error}
              </div>
            )}

            <div className="flex justify-end">
              <button
                onClick={handleVote}
                disabled={loading || !selectedCandidate}
                className={`px-6 py-3 rounded-lg ${
                  loading || !selectedCandidate
                    ? 'bg-gray-300 cursor-not-allowed'
                    : 'bg-patriot-blue text-white hover:bg-blue-700'
                } transition-colors`}
              >
                {loading ? 'Casting Vote...' : 'Cast Vote'}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
