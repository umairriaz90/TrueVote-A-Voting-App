interface VotingDashboardProps {
  electionId: number;
  candidates: Array<{
    id: number;
    firstName: string;
    lastName: string;
    voterId: string;
    email: string;
    voteCount: number;
  }>;
}

const VotingDashboard = ({ electionId, candidates }: VotingDashboardProps) => {
  const [votingStatus, setVotingStatus] = useState<{
    totalVoters: number;
    votedCount: number;
    turnoutPercentage: number;
  }>();

  const handleVote = async (candidateId: number) => {
    try {
      const tx = await contract.castVote(electionId, candidateId);
      await tx.wait();
      // Refresh voting status
      await fetchVotingStatus();
    } catch (error) {
      console.error('Error casting vote:', error);
    }
  };

  const fetchVotingStatus = async () => {
    const status = await contract.getVoterAnalytics(electionId);
    setVotingStatus(status);
  };

  return (
    <div className="container mx-auto p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-2xl font-bold text-patriot-blue mb-4">Current Results</h2>
          {candidates.map(candidate => (
            <div key={candidate.id} className="mb-4">
              <div className="flex justify-between mb-2">
                <span>{`${candidate.firstName} ${candidate.lastName}`}</span>
                <span>{candidate.voteCount} votes</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div 
                  className="bg-patriot-blue h-2.5 rounded-full"
                  style={{ 
                    width: `${(candidate.voteCount / (votingStatus?.totalVoters || 1)) * 100}%` 
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
