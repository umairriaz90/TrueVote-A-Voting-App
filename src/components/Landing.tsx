import React from 'react';
import { Link } from 'react-router-dom';
import {
  ShieldCheck,
  Lock,
  Vote,
  CheckCircle,
  BarChart,
  ChevronRight,
  Key,
  Fingerprint,
  ScrollText,
  Star
} from 'lucide-react';

export default function Landing() {
  const stats = [
    {
      title: 'Secure Elections',
      value: '1M+',
      description: 'Elections conducted securely'
    },
    {
      title: 'Registered Voters',
      value: '50M+',
      description: 'Active verified voters'
    },
    {
      title: 'Countries',
      value: '25+',
      description: 'Global presence'
    },
    {
      title: 'Success Rate',
      value: '99.99%',
      description: 'Accuracy in vote counting'
    }
  ];

  return (
    <div className="flex-grow bg-gradient-to-b from-patriot-blue to-white">
      {/* Hero Section */}
      <div className="relative bg-patriot-blue overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="relative z-10 pb-8 bg-patriot-blue sm:pb-16 md:pb-20 lg:pb-28 xl:pb-32">
            <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 lg:mt-16 lg:px-8 xl:mt-20">
              <div className="text-center">
                <h1 className="text-4xl tracking-tight font-extrabold text-white sm:text-5xl md:text-6xl">
                  <span className="block">Secure, transparent, and</span>
                  <span className="block">accessible voting for everyone</span>
                </h1>
                <p className="mt-3 text-xl text-white font-medium sm:mt-5 sm:text-2xl sm:max-w-2xl mx-auto md:mt-5 md:text-2xl">
                  through cutting-edge blockchain technology.
                </p>

                <div className="mt-8 flex justify-center space-x-4">
                  <Link to="/register" 
                    className="inline-flex items-center px-8 py-3 text-lg font-medium rounded-md text-white bg-patriot-blue border-2 border-white hover:bg-patriot-red transition-colors duration-300">
                    Register to Vote
                    <ChevronRight className="ml-2 h-5 w-5" />
                  </Link>
                  <Link to="/how-it-works"
                    className="inline-flex items-center px-8 py-3 text-lg font-medium rounded-md text-patriot-blue bg-white hover:bg-gray-100 transition-colors duration-300">
                    Learn More
                  </Link>
                </div>

                {/* Election Day Image */}
                <div className="mt-12 mb-24 max-w-lg mx-auto bg-patriot-blue rounded-xl p-6 shadow-2xl transform hover:scale-105 transition-all duration-300">
                  <div className="flex justify-center space-x-2 mb-4">
                    <Star className="h-6 w-6 text-white" fill="white" />
                    <Star className="h-6 w-6 text-white" fill="white" />
                    <Vote className="h-8 w-8 text-white" />
                    <Star className="h-6 w-6 text-white" fill="white" />
                    <Star className="h-6 w-6 text-white" fill="white" />
                  </div>
                  <div className="bg-patriot-red text-white text-3xl font-bold py-3 px-6 rounded-lg mb-4 transform -rotate-2">
                    ELECTION DAY
                  </div>
                  <div className="text-white text-xl font-medium tracking-wide">
                    YOUR VOICE MATTERS
                  </div>
                </div>
              </div>
            </main>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white rounded-lg shadow-xl p-6 transform hover:scale-105 transition-all duration-300">
              <dt className="text-lg font-medium text-patriot-blue">{stat.title}</dt>
              <dd className="mt-2 text-4xl font-extrabold text-patriot-red">{stat.value}</dd>
              <p className="mt-2 text-sm text-gray-600">{stat.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Features Section */}
      <div className="py-24 bg-white mt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center mb-16">
            <h2 className="text-base text-patriot-red font-semibold tracking-wide uppercase">Features</h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-patriot-blue sm:text-4xl">
              Secure and Transparent Voting
            </p>
            <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
              Our platform combines cutting-edge security with ease of use to deliver a trusted voting experience.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: ShieldCheck,
                title: 'Military-Grade Security',
                description: 'Advanced encryption protects every vote'
              },
              {
                icon: Lock,
                title: 'Blockchain Technology',
                description: 'Immutable and transparent record-keeping'
              },
              {
                icon: Fingerprint,
                title: 'Biometric Verification',
                description: 'Multi-factor authentication ensures voter identity'
              }
            ].map((feature, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-all duration-300">
                <div className="bg-gradient-to-r from-patriot-blue to-patriot-red rounded-lg p-3 w-16 h-16 mb-6">
                  <feature.icon className="h-full w-full text-white" />
                </div>
                <h3 className="text-xl font-bold text-patriot-blue mb-4">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}