import { Link } from 'react-router-dom';
import { Clock, ChevronRight } from 'lucide-react';
import { LucideIcon } from 'lucide-react';

interface TutorialCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  duration: string;
  link: string;
}

export default function TutorialCard({ title, description, icon: Icon, duration, link }: TutorialCardProps) {
  return (
    <Link to={link} className="block">
      <div className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 p-6">
        <div className="flex items-center space-x-4 mb-4">
          <div className="flex-shrink-0">
            <div className="w-12 h-12 bg-gradient-to-br from-patriot-blue to-patriot-red rounded-lg p-2.5">
              <Icon className="h-full w-full text-white" />
            </div>
          </div>
          <h3 className="text-lg font-medium text-patriot-blue">{title}</h3>
        </div>
        <p className="text-gray-600 mb-4">{description}</p>
        <div className="flex items-center justify-between text-sm">
          <span className="flex items-center text-gray-500">
            <Clock className="h-4 w-4 mr-1" />
            {duration}
          </span>
          <span className="flex items-center text-patriot-blue font-medium">
            Learn More
            <ChevronRight className="h-4 w-4 ml-1" />
          </span>
        </div>
      </div>
    </Link>
  );
}