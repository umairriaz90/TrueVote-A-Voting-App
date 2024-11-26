import React from 'react';
import { useParams } from 'react-router-dom';
import VotingInterface from './voting/VotingInterface';

// Mock data - in a real app, this would come from an API
const MOCK_ELECTIONS = {
  'presidential-2024': {
    id: 'presidential-2024',
    title: '2024 Presidential Election',
    candidates: [
      {
        id: '1',
        name: 'John Smith',
        party: 'Progressive Party',
        imageUrl: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=256&q=80'
      },
      {
        id: '2',
        name: 'Sarah Johnson',
        party: 'Conservative Party',
        imageUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=256&q=80'
      }
    ],
    allowWriteIn: true
  }
};

export default function Vote() {
  const { electionId } = useParams();
  const election = electionId ? MOCK_ELECTIONS[electionId as keyof typeof MOCK_ELECTIONS] : null;

  if (!election) {
    return (
      <div className="flex-grow flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900">Election Not Found</h2>
          <p className="mt-2 text-gray-600">The election you're looking for doesn't exist or has ended.</p>
        </div>
      </div>
    );
  }

  const handleSubmitVote = async (selection: string) => {
    // TODO: Implement actual vote submission
    console.log('Vote submitted:', selection);
  };

  return (
    <div className="flex-grow py-8">
      <VotingInterface
        electionId={election.id}
        electionTitle={election.title}
        candidates={election.candidates}
        allowWriteIn={election.allowWriteIn}
        onSubmitVote={handleSubmitVote}
      />
    </div>
  );
}