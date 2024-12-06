import { CheckCircle2 } from 'lucide-react';

interface CandidateCardProps {
  candidate: {
    id: string;
    name: string;
    party: string;
    imageUrl: string;
  };
  isSelected: boolean;
  onSelect: (id: string) => void;
}

export default function CandidateCard({ candidate, isSelected, onSelect }: CandidateCardProps) {
  return (
    <div
      onClick={() => onSelect(candidate.id)}
      className={`relative rounded-lg border-2 p-4 cursor-pointer transition-all ${
        isSelected
          ? 'border-blue-500 bg-blue-50'
          : 'border-gray-200 hover:border-blue-200 hover:bg-gray-50'
      }`}
    >
      <div className="flex items-start space-x-4">
        <img
          src={candidate.imageUrl}
          alt={candidate.name}
          className="w-20 h-20 rounded-full object-cover"
        />
        <div className="flex-1">
          <h3 className="text-lg font-medium text-gray-900">{candidate.name}</h3>
          <p className="text-sm text-gray-500">{candidate.party}</p>
        </div>
        {isSelected && (
          <div className="absolute top-2 right-2">
            <CheckCircle2 className="h-6 w-6 text-blue-500" />
          </div>
        )}
      </div>
    </div>
  );
}