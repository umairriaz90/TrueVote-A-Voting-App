import { Check } from 'lucide-react';

interface CandidateCardProps {
  id: string;
  name: string;
  party: string;
  imageUrl: string;
  isSelected: boolean;
  onSelect: (id: string) => void;
}

export default function CandidateCard({
  id,
  name,
  party,
  imageUrl,
  isSelected,
  onSelect,
}: CandidateCardProps) {
  return (
    <div
      onClick={() => onSelect(id)}
      className={`relative p-4 border rounded-lg cursor-pointer transition-all ${
        isSelected
          ? 'border-blue-500 bg-blue-50 ring-2 ring-blue-500'
          : 'border-gray-200 hover:border-blue-300'
      }`}
    >
      <div className="flex items-center space-x-4">
        <img
          src={imageUrl}
          alt={name}
          className="w-16 h-16 rounded-full object-cover"
        />
        <div className="flex-grow">
          <h3 className="text-lg font-medium text-gray-900">{name}</h3>
          <p className="text-sm text-gray-500">{party}</p>
        </div>
        {isSelected && (
          <div className="absolute right-4 top-4">
            <Check className="h-6 w-6 text-blue-600" />
          </div>
        )}
      </div>
    </div>
  );
}