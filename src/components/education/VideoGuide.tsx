import React from 'react';
import { Play, Clock } from 'lucide-react';

interface VideoGuideProps {
  title: string;
  thumbnail: string;
  duration: string;
  link: string;
}

export default function VideoGuide({ title, thumbnail, duration, link }: VideoGuideProps) {
  return (
    <div className="relative group bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300">
      <div className="relative aspect-video">
        <img 
          src={thumbnail} 
          alt={title}
          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-black bg-opacity-40 group-hover:bg-opacity-30 transition-opacity flex items-center justify-center">
          <div className="bg-white rounded-full p-4 shadow-lg transform group-hover:scale-110 transition-transform">
            <Play className="h-8 w-8 text-patriot-red" />
          </div>
        </div>
      </div>
      <div className="p-4 bg-white">
        <h3 className="text-lg font-medium text-patriot-blue mb-2">{title}</h3>
        <div className="flex items-center text-gray-600 text-sm">
          <Clock className="h-4 w-4 mr-1" />
          {duration}
        </div>
      </div>
    </div>
  );
}