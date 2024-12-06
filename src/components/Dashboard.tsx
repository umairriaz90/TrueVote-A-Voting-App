import { Link, useLocation } from 'react-router-dom';
import { Vote, Calendar, CheckCircle, BarChart2, Clock } from 'lucide-react';

export default function Dashboard() {
  const location = useLocation();
  const voteSubmitted = location.state?.voteSubmitted;

  const upcomingElections = [
    {
      id: 1,
      title: 'Presidential Election 2024',
      date: 'November 5, 2024',
      status: 'Upcoming',
      description: 'National Presidential Election'
    },
    {
      id: 2,
      title: 'State Governor Election',
      date: 'March 15, 2024',
      status: 'Registration Open',
      description: 'State Gubernatorial Election'
    }
  ];

  const votingHistory = [
    {
      id: 1,
      title: 'Local Council Election',
      date: 'January 15, 2024',
      status: 'Completed',
      result: 'Vote Recorded'
    }
  ];

  return (
    <div className="flex-grow py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {voteSubmitted && (
          <div className="mb-6 bg-green-50 border border-green-200 rounded-md p-4 flex items-center">
            <CheckCircle className="h-5 w-5 text-green-400 mr-3" />
            <p className="text-sm text-green-700">Your vote has been successfully recorded on the blockchain.</p>
          </div>
        )}

        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold text-gray-900">Voter Dashboard</h1>
          <div className="flex items-center space-x-4">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
              <CheckCircle className="h-4 w-4 mr-1" />
              Verified Voter
            </span>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <Calendar className="h-6 w-6 text-gray-400" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      Next Election
                    </dt>
                    <dd className="text-lg font-medium text-gray-900">
                      March 15, 2024
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <Vote className="h-6 w-6 text-gray-400" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      Total Votes Cast
                    </dt>
                    <dd className="text-lg font-medium text-gray-900">1</dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <Clock className="h-6 w-6 text-gray-400" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      Registration Status
                    </dt>
                    <dd className="text-lg font-medium text-green-600">Active</dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Upcoming Elections */}
        <div className="mt-8">
          <h2 className="text-lg font-medium text-gray-900">Upcoming Elections</h2>
          <div className="mt-4 grid gap-5 grid-cols-1 sm:grid-cols-2">
            {upcomingElections.map((election) => (
              <div
                key={election.id}
                className="bg-white overflow-hidden shadow rounded-lg"
              >
                <div className="p-5">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-medium text-gray-900">
                      {election.title}
                    </h3>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      {election.status}
                    </span>
                  </div>
                  <p className="mt-2 text-sm text-gray-500">
                    {election.description}
                  </p>
                  <div className="mt-4">
                    <div className="flex items-center text-sm text-gray-500">
                      <Calendar className="h-5 w-5 mr-2" />
                      {election.date}
                    </div>
                  </div>
                  <div className="mt-4">
                    <Link
                      to={`/vote/${election.id}`}
                      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
                    >
                      Vote Now
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Voting History */}
        <div className="mt-8">
          <h2 className="text-lg font-medium text-gray-900">Voting History</h2>
          <div className="mt-4">
            <div className="bg-white shadow overflow-hidden sm:rounded-md">
              <ul className="divide-y divide-gray-200">
                {votingHistory.map((vote) => (
                  <li key={vote.id}>
                    <div className="px-4 py-4 sm:px-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <BarChart2 className="h-5 w-5 text-gray-400 mr-2" />
                          <p className="text-sm font-medium text-gray-900">
                            {vote.title}
                          </p>
                        </div>
                        <div className="flex items-center">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            {vote.status}
                          </span>
                        </div>
                      </div>
                      <div className="mt-2 sm:flex sm:justify-between">
                        <div className="sm:flex">
                          <p className="flex items-center text-sm text-gray-500">
                            <Calendar className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" />
                            {vote.date}
                          </p>
                        </div>
                        <div className="mt-2 sm:mt-0">
                          <p className="text-sm text-gray-500">{vote.result}</p>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}