import React, { useState } from 'react';
import { CheckCircle2, AlertCircle } from 'lucide-react';
import CandidateCard from './CandidateCard.tsx';
import WriteInBallot from './WriteInBallot.tsx';
import VoteConfirmation from './VoteConfirmation.tsx';

interface Candidate {
  id: string;
  name: string;
  party: string;
  imageUrl: string;
}

interface VotingInterfaceProps {
  electionId: string;
  electionTitle: string;
  candidates: Candidate[];
  allowWriteIn: boolean;
  onSubmitVote: (selection: string) => Promise<void>;
}

export default function VotingInterface({
  electionId,
  electionTitle,
  candidates,
  allowWriteIn,
  onSubmitVote
}: VotingInterfaceProps) {
  const [selectedCandidate, setSelectedCandidate] = useState<string | null>(null);
  const [writeInName, setWriteInName] = useState('');
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleCandidateSelect = (candidateId: string) => {
    setSelectedCandidate(candidateId);
    setWriteInName('');
    setError('');
  };

  const handleWriteInSelect = (name: string) => {
    setSelectedCandidate('write-in');
    setWriteInName(name);
    setError('');
  };

  const handleSubmit = async () => {
    if (!selectedCandidate && !writeInName) {
      setError('Please select a candidate or write in a name');
      return;
    }

    setShowConfirmation(true);
  };

  const handleConfirm = async () => {
    try {
      setIsSubmitting(true);
      setError('');
      const selection = selectedCandidate === 'write-in' ? writeInName : selectedCandidate;
      await onSubmitVote(selection!);
      // Show success message or redirect
    } catch (err) {
      setError('Failed to submit vote. Please try again.');
    } finally {
      setIsSubmitting(false);
      setShowConfirmation(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="bg-white shadow rounded-lg p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">{electionTitle}</h1>

        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 rounded-md p-4 flex items-center">
            <AlertCircle className="h-5 w-5 text-red-400 mr-3" />
            <p className="text-sm text-red-600">{error}</p>
          </div>
        )}

        <div className="space-y-6">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            {candidates.map((candidate) => (
              <CandidateCard
                key={candidate.id}
                candidate={candidate}
                isSelected={selectedCandidate === candidate.id}
                onSelect={handleCandidateSelect}
              />
            ))}
          </div>

          {allowWriteIn && (
            <WriteInBallot
              value={writeInName}
              isSelected={selectedCandidate === 'write-in'}
              onChange={handleWriteInSelect}
            />
          )}

          <div className="mt-8 flex justify-end">
            <button
              onClick={handleSubmit}
              disabled={isSubmitting || (!selectedCandidate && !writeInName)}
              className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Submitting...' : 'Review Vote'}
            </button>
          </div>
        </div>

        {showConfirmation && (
          <VoteConfirmation
            candidate={
              selectedCandidate === 'write-in'
                ? { id: 'write-in', name: writeInName, party: 'Write-in', imageUrl: '' }
                : candidates.find((c) => c.id === selectedCandidate)!
            }
            onConfirm={handleConfirm}
            onCancel={() => setShowConfirmation(false)}
            isSubmitting={isSubmitting}
          />
        )}
      </div>
    </div>
  );
}