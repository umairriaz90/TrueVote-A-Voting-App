import React from 'react';
import { CheckCircle2, Edit3 } from 'lucide-react';

interface WriteInBallotProps {
  value: string;
  isSelected: boolean;
  onChange: (value: string) => void;
}

export default function WriteInBallot({ value, isSelected, onChange }: WriteInBallotProps) {
  return (
    <div className={`rounded-lg border-2 p-4 ${
      isSelected ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
    }`}>
      <div className="flex items-center space-x-3 mb-3">
        <Edit3 className="h-5 w-5 text-gray-400" />
        <h3 className="text-lg font-medium text-gray-900">Write-in Candidate</h3>
      </div>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Enter candidate name"
        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
      />
    </div>
  );
}