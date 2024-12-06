import { Calendar, BarChart2 } from 'lucide-react';

interface VoteHistoryItemProps {
  title: string;
  date: string;
  status: string;
  result: string;
}

export default function VoteHistoryItem({ title, date, status, result }: VoteHistoryItemProps) {
  return (
    <div className="px-4 py-4 sm:px-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <BarChart2 className="h-5 w-5 text-gray-400 mr-2" />
          <p className="text-sm font-medium text-gray-900">{title}</p>
        </div>
        <div className="flex items-center">
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
            {status}
          </span>
        </div>
      </div>
      <div className="mt-2 sm:flex sm:justify-between">
        <div className="sm:flex">
          <p className="flex items-center text-sm text-gray-500">
            <Calendar className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" />
            {date}
          </p>
        </div>
        <div className="mt-2 sm:mt-0">
          <p className="text-sm text-gray-500">{result}</p>
        </div>
      </div>
    </div>
  );
}