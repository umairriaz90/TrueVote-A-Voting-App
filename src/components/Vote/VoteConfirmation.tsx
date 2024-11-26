import React from 'react';
import { AlertCircle, Check } from 'lucide-react';

interface VoteConfirmationProps {
  selection: {
    name: string;
    party?: string;
  };
  onConfirm: () => void;
  onBack: () => void;
  isSubmitting: boolean;
}

export default function VoteConfirmation({ selection, onConfirm, onBack, isSubmitting }: VoteConfirmationProps) {
  return (
    <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-lg">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Confirm Your Vote</h2>
        <div className="flex items-center justify-center text-yellow-600 mb-4">
          <AlertCircle className="h-6 w-6 mr-2" />
          <p className="text-sm">Please review your selection carefully</p>
        </div>
      </div>

      <div className="bg-gray-50 rounded-lg p-6 mb-8">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Your Selection:</h3>
        <div className="flex items-center space-x-2">
          <Check className="h-5 w-5 text-green-500" />
          <div>
            <p className="font-medium text-gray-900">{selection.name}</p>
            {selection.party && (
              <p className="text-sm text-gray-500">{selection.party}</p>
            )}
          </div>
        </div>
      </div>

      <div className="flex space-x-4">
        <button
          onClick={onConfirm}
          disabled={isSubmitting}
          className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:bg-blue-300"
        >
          {isSubmitting ? 'Submitting...' : 'Confirm Vote'}
        </button>
        <button
          onClick={onBack}
          disabled={isSubmitting}
          className="flex-1 px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 disabled:bg-gray-100"
        >
          Go Back
        </button>
      </div>
    </div>
  );
}