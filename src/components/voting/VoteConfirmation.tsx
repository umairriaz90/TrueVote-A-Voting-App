import React from 'react';
import { AlertTriangle } from 'lucide-react';

interface VoteConfirmationProps {
  candidate: {
    id: string;
    name: string;
    party: string;
    imageUrl: string;
  };
  onConfirm: () => void;
  onCancel: () => void;
  isSubmitting: boolean;
}

export default function VoteConfirmation({
  candidate,
  onConfirm,
  onCancel,
  isSubmitting
}: VoteConfirmationProps) {
  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-md w-full p-6">
        <div className="flex items-center space-x-3 mb-4">
          <AlertTriangle className="h-6 w-6 text-yellow-500" />
          <h3 className="text-lg font-medium text-gray-900">Confirm Your Vote</h3>
        </div>

        <div className="mb-6">
          <p className="text-sm text-gray-500 mb-4">
            Please review your selection carefully. Once confirmed, your vote cannot be changed.
          </p>

          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-center space-x-4">
              {candidate.imageUrl && (
                <img
                  src={candidate.imageUrl}
                  alt={candidate.name}
                  className="w-16 h-16 rounded-full object-cover"
                />
              )}
              <div>
                <h4 className="font-medium text-gray-900">{candidate.name}</h4>
                <p className="text-sm text-gray-500">{candidate.party}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex space-x-3">
          <button
            onClick={onCancel}
            disabled={isSubmitting}
            className="flex-1 px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Go Back
          </button>
          <button
            onClick={onConfirm}
            disabled={isSubmitting}
            className="flex-1 px-4 py-2 border border-transparent rounded-md text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-blue-300"
          >
            {isSubmitting ? 'Submitting...' : 'Confirm Vote'}
          </button>
        </div>
      </div>
    </div>
  );
}