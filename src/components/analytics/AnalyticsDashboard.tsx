import { BarChart2, Users, Clock, Map } from "lucide-react";
import StatCard from "./StatCard";
import VoterTurnoutChart from "./VoterTurnoutChart";
import RegionalMap from "./RegionalMap";
import TimelineChart from "./TimelineChart";

export default function AnalyticsDashboard() {
  const stats = [
    {
      title: "Total Voters",
      value: "12,847",
      icon: Users,
      change: "+14%",
      changeType: "positive"
    },
    {
      title: "Current Turnout",
      value: "67.5%",
      icon: BarChart2,
      change: "+5.2%",
      changeType: "positive"
    },
    {
      title: "Peak Voting Time",
      value: "2:30 PM",
      icon: Clock,
      change: "High Activity",
      changeType: "neutral"
    },
    {
      title: "Active Regions",
      value: "24/25",
      icon: Map,
      change: "96% Coverage",
      changeType: "positive"
    }
  ];

  return (
    <div className="p-6 bg-gradient-to-br from-blue-50 to-white">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Analytics Dashboard</h2>
        
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <StatCard
              key={index}
              title={stat.title}
              value={stat.value}
              icon={stat.icon}
              change={stat.change}
              changeType={stat.changeType as "positive" | "neutral" | "negative"}
            />
          ))}
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Voter Turnout Chart */}
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Voter Turnout by Age Group</h3>
            <div className="h-80">
              <VoterTurnoutChart />
            </div>
          </div>

          {/* Timeline Chart */}
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Voting Activity Timeline</h3>
            <div className="h-80">
              <TimelineChart />
            </div>
          </div>

          {/* Regional Map */}
          <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Regional Voting Distribution</h3>
            <div className="h-96">
              <RegionalMap />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}