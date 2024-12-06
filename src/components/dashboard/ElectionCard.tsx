import { Calendar } from 'lucide-react';

interface ElectionCardProps {
  title: string;
  date: string;
  status: string;
  description: string;
}

export default function ElectionCard({ title, date, status, description }: ElectionCardProps) {
  return (
    <div className="bg-white overflow-hidden shadow rounded-lg">
      <div className="p-5">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-medium text-gray-900">{title}</h3>
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
            {status}
          </span>
        </div>
        <p className="mt-2 text-sm text-gray-500">{description}</p>
        <div className="mt-4">
          <div className="flex items-center text-sm text-gray-500">
            <Calendar className="h-5 w-5 mr-2" />
            {date}
          </div>
        </div>
        <div className="mt-4">
          <button
            type="button"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
          >
            View Details
          </button>
        </div>
      </div>
    </div>
  );
}