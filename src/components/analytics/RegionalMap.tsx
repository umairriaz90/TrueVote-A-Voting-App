import { Map } from 'lucide-react';

export default function RegionalMap() {
  const regions = [
    { id: 1, name: 'North', turnout: 78 },
    { id: 2, name: 'South', turnout: 82 },
    { id: 3, name: 'East', turnout: 75 },
    { id: 4, name: 'West', turnout: 80 },
    { id: 5, name: 'Central', turnout: 85 }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {regions.map(region => (
        <div key={region.id} className="bg-white p-4 rounded-lg shadow-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Map className="h-5 w-5 text-primary-600 mr-2" />
              <h4 className="font-medium text-gray-900">{region.name}</h4>
            </div>
            <span className="text-sm font-medium text-primary-600">{region.turnout}%</span>
          </div>
          <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-primary-600 h-2 rounded-full"
              style={{ width: `${region.turnout}%` }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}