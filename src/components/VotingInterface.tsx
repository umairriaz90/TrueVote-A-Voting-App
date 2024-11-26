import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle, AlertCircle, Info, User, Flag } from 'lucide-react';

interface Candidate {
  id: string;
  name: string;
  party: string;
  photoUrl: string;
}

interface Ballot {
  id: string;
  title: string;
  description: string;
  candidates: Candidate[];
  allowWriteIn: boolean;
}

export default function VotingInterface() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState<'voting' | 'review' | 'confirmation'>('voting');
  const [selectedCandidate, setSelectedCandidate] = useState<string | null>(null);
  const [writeInCandidate, setWriteInCandidate] = useState('');
  const [isWriteIn, setIsWriteIn] = useState(false);
  const [error, setError] = useState('');

  // Mock ballot data - in production, this would come from an API
  const ballot: Ballot = {
    id: 'election-2024',
    title: 'Presidential Election 2024',
    description: 'Select one candidate for the office of President of the United States',
    candidates: [
      {
        id: 'candidate-1',
        name: 'Jane Smith',
        party: 'Progressive Party',
        photoUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200&h=200'
      },
      {
        id: 'candidate-2',
        name: 'John Davis',
        party: 'Conservative Party',
        photoUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=200&h=200'
      },
      {
        id: 'candidate-3',
        name: 'Sarah Johnson',
        party: 'Liberty Party',
        photoUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=200&h=200'
      }
    ],
    allowWriteIn: true
  };

  const handleCandidateSelect = (candidateId: string) => {
    setSelectedCandidate(candidateId);
    setIsWriteIn(false);
    setError('');
  };

  const handleWriteInToggle = () => {
    setIsWriteIn(!isWriteIn);
    setSelectedCandidate(null);
    setError('');
  };

  const handleReview = () => {
    if (!selectedCandidate && !isWriteIn) {
      setError('Please select a candidate or write in a name');
      return;
    }
    if (isWriteIn && !writeInCandidate.trim()) {
      setError('Please enter a write-in candidate name');
      return;
    }
    setCurrentStep('review');
  };

  const handleConfirm = async () => {
    try {
      // Mock API call - in production, this would be a real blockchain transaction
      const voteData = {
        ballotId: ballot.id,
        candidateId: selectedCandidate,
        writeInCandidate: isWriteIn ? writeInCandidate : null,
        timestamp: new Date().toISOString()
      };
      
      console.log('Submitting vote:', voteData);
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setCurrentStep('confirmation');
    } catch (err) {
      setError('Failed to submit vote. Please try again.');
      setCurrentStep('voting');
    }
  };

  const getSelectedCandidateName = () => {
    if (isWriteIn) return writeInCandidate;
    const candidate = ballot.candidates.find(c => c.id === selectedCandidate);
    return candidate ? candidate.name : '';
  };

  if (currentStep === 'confirmation') {
    return (
      <div className="flex-grow flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-md">
          <div className="text-center">
            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
              <CheckCircle className="h-6 w-6 text-green-600" />
            </div>
            <h2 className="mt-6 text-3xl font-extrabold text-gray-900">Vote Submitted</h2>
            <p className="mt-2 text-sm text-gray-600">
              Your vote has been securely recorded on the blockchain
            </p>
          </div>
          <div className="mt-8">
            <button
              onClick={() => navigate('/dashboard')}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Return to Dashboard
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-grow bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-white shadow rounded-lg p-6 mb-8">
          <h1 className="text-3xl font-bold text-gray-900">{ballot.title}</h1>
          <p className="mt-2 text-gray-600">{ballot.description}</p>
          <div className="mt-4 flex items-center text-sm text-gray-500">
            <Info className="h-5 w-5 mr-2" />
            Select one candidate or write in a name
          </div>
        </div>

        {error && (
          <div className="mb-8 bg-red-50 border border-red-200 rounded-md p-4 flex items-center">
            <AlertCircle className="h-5 w-5 text-red-400 mr-3" />
            <p className="text-sm text-red-600">{error}</p>
          </div>
        )}

        {currentStep === 'voting' ? (
          <div className="space-y-8">
            {/* Candidates Grid */}
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {ballot.candidates.map((candidate) => (
                <div
                  key={candidate.id}
                  className={`relative bg-white rounded-lg shadow-sm p-6 cursor-pointer hover:shadow-md transition-shadow ${
                    selectedCandidate === candidate.id ? 'ring-2 ring-blue-500' : ''
                  }`}
                  onClick={() => handleCandidateSelect(candidate.id)}
                >
                  <div className="flex items-center space-x-4">
                    <img
                      src={candidate.photoUrl}
                      alt={candidate.name}
                      className="h-16 w-16 rounded-full object-cover"
                    />
                    <div>
                      <h3 className="text-lg font-medium text-gray-900">{candidate.name}</h3>
                      <p className="text-sm text-gray-500">{candidate.party}</p>
                    </div>
                  </div>
                  {selectedCandidate === candidate.id && (
                    <div className="absolute top-2 right-2">
                      <CheckCircle className="h-6 w-6 text-blue-500" />
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Write-in Section */}
            {ballot.allowWriteIn && (
              <div className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <User className="h-6 w-6 text-gray-400" />
                    <h3 className="text-lg font-medium text-gray-900">Write-in Candidate</h3>
                  </div>
                  <button
                    onClick={handleWriteInToggle}
                    className={`px-4 py-2 rounded-md text-sm font-medium ${
                      isWriteIn
                        ? 'bg-blue-50 text-blue-700'
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    {isWriteIn ? 'Cancel Write-in' : 'Add Write-in'}
                  </button>
                </div>
                {isWriteIn && (
                  <div className="mt-4">
                    <input
                      type="text"
                      value={writeInCandidate}
                      onChange={(e) => setWriteInCandidate(e.target.value)}
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      placeholder="Enter candidate name"
                    />
                  </div>
                )}
              </div>
            )}

            {/* Review Button */}
            <div className="flex justify-end">
              <button
                onClick={handleReview}
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Review Vote
              </button>
            </div>
          </div>
        ) : (
          /* Review Screen */
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Review Your Vote</h2>
            <div className="border-t border-b border-gray-200 py-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Selected Candidate</p>
                  <p className="text-lg font-medium text-gray-900">
                    {getSelectedCandidateName()}
                  </p>
                  {!isWriteIn && selectedCandidate && (
                    <p className="text-sm text-gray-500">
                      {ballot.candidates.find(c => c.id === selectedCandidate)?.party}
                    </p>
                  )}
                </div>
                <Flag className="h-6 w-6 text-gray-400" />
              </div>
            </div>
            <div className="mt-6 flex items-center justify-between">
              <button
                onClick={() => setCurrentStep('voting')}
                className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Change Selection
              </button>
              <button
                onClick={handleConfirm}
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
              >
                Confirm and Submit
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}