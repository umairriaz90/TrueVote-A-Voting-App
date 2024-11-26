import React from 'react';
import { Book, Video, FileText, HelpCircle, Shield, CheckCircle } from 'lucide-react';
import TutorialCard from './TutorialCard';
import VideoGuide from './VideoGuide';
import FAQSection from './FAQSection';

export default function EducationPortal() {
  const tutorials = [
    {
      title: 'Getting Started with TrueVote',
      description: 'Learn the basics of secure online voting',
      icon: Book,
      duration: '5 min read',
      link: '/education/basics'
    },
    {
      title: 'Security Features Guide',
      description: 'Understanding our security measures',
      icon: Shield,
      duration: '8 min read',
      link: '/education/security'
    },
    {
      title: 'Voter Verification Process',
      description: 'Step-by-step guide to voter verification',
      icon: CheckCircle,
      duration: '6 min read',
      link: '/education/verification'
    }
  ];

  const videoGuides = [
    {
      title: 'How to Cast Your Vote',
      thumbnail: 'https://images.unsplash.com/photo-1540910419892-4a36d2c3266c?auto=format&fit=crop&q=80&w=500',
      duration: '3:45',
      link: '/videos/casting-vote'
    },
    {
      title: 'Security Features Explained',
      thumbnail: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?auto=format&fit=crop&q=80&w=500',
      duration: '4:20',
      link: '/videos/security'
    }
  ];

  return (
    <div className="flex-grow bg-gradient-to-b from-patriot-blue to-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">Voter Education Center</h1>
          <p className="text-xl text-gray-100">Learn everything you need to know about secure online voting</p>
        </div>

        {/* Quick Start Guide */}
        <div className="bg-white rounded-xl p-8 mb-12 shadow-lg hover:shadow-xl transition-all duration-300">
          <div className="flex flex-col md:flex-row md:items-center md:space-x-6">
            <div className="flex-shrink-0 mb-4 md:mb-0">
              <div className="bg-gradient-to-br from-patriot-blue to-patriot-red rounded-full p-4">
                <HelpCircle className="h-12 w-12 text-white" />
              </div>
            </div>
            <div className="flex-grow">
              <h2 className="text-2xl font-bold text-patriot-blue mb-4">New to TrueVote?</h2>
              <p className="text-gray-600 mb-6">
                Start with our comprehensive guide to online voting. Learn about our security measures, voting process, and verification steps.
              </p>
              <button className="bg-patriot-blue text-white px-6 py-3 rounded-lg font-medium hover:bg-patriot-red transition-all duration-300 shadow-md hover:shadow-lg">
                Start Quick Guide
              </button>
            </div>
          </div>
        </div>

        {/* Tutorial Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-6">Written Guides</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tutorials.map((tutorial, index) => (
              <TutorialCard key={index} {...tutorial} />
            ))}
          </div>
        </section>

        {/* Video Guides */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-6">Video Tutorials</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {videoGuides.map((video, index) => (
              <VideoGuide key={index} {...video} />
            ))}
          </div>
        </section>

        {/* FAQ Section */}
        <section className="bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-patriot-blue mb-6">Frequently Asked Questions</h2>
          <FAQSection />
        </section>
      </div>
    </div>
  );
}