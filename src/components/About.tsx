import { Link } from 'react-router-dom';
import {
  Shield,
  Users,
  Globe,
  ChevronRight,
  Fingerprint,
  Scale,
  LineChart,
  Lock,
  Vote
} from 'lucide-react';

export default function About() {
  const stats = [
    { label: 'Secure Elections Conducted', value: '1,000+' },
    { label: 'Registered Voters', value: '5M+' },
    { label: 'Countries Served', value: '25+' },
    { label: 'Success Rate', value: '99.99%' }
  ];

  const values = [
    {
      icon: Shield,
      title: 'Security First',
      description: 'Military-grade encryption and blockchain technology ensure tamper-proof voting.'
    },
    {
      icon: Users,
      title: 'Accessibility',
      description: 'Making democratic participation possible for everyone, everywhere.'
    },
    {
      icon: Scale,
      title: 'Transparency',
      description: 'Open, verifiable processes that maintain vote secrecy while ensuring accuracy.'
    },
    {
      icon: Globe,
      title: 'Global Impact',
      description: 'Supporting democratic processes worldwide with localized solutions.'
    }
  ];

  const features = [
    {
      icon: Lock,
      title: 'End-to-End Encryption',
      description: 'Every vote is encrypted and secured using advanced cryptographic protocols.'
    },
    {
      icon: Fingerprint,
      title: 'Biometric Verification',
      description: 'Multi-factor authentication ensures only eligible voters participate.'
    },
    {
      icon: LineChart,
      title: 'Real-time Analytics',
      description: 'Instant, accurate vote counting with complete audit trails.'
    }
  ];

  return (
    <div className="flex-grow">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-patriot-blue to-patriot-red text-white">
        <div className="absolute inset-0 pattern-grid"></div>
        <div className="relative max-w-7xl mx-auto py-24 px-4 sm:py-32 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center text-center">
            <Vote className="h-16 w-16 mb-6 text-white" />
            <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
              Revolutionizing Democracy
            </h1>
            <p className="mt-6 max-w-3xl text-xl text-white opacity-90">
              TrueVote combines cutting-edge blockchain technology with user-friendly design to create the most secure and accessible voting platform in the world.
            </p>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="relative -mt-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white overflow-hidden shadow-lg rounded-lg transform hover:scale-105 transition-all duration-300">
              <div className="px-4 py-5 sm:p-6">
                <dt className="text-sm font-medium text-gray-500 truncate">{stat.label}</dt>
                <dd className="mt-1 text-3xl font-semibold text-patriot-blue">{stat.value}</dd>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Mission Section */}
      <div className="py-16 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center">
            <h2 className="text-base text-patriot-red font-semibold tracking-wide uppercase">Our Mission</h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-patriot-blue sm:text-4xl">
              Empowering Global Democracy
            </p>
            <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
              We're building a future where every voice counts and every vote matters, using technology to make democracy more accessible, secure, and transparent.
            </p>
          </div>

          <div className="mt-16">
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {values.map((value, index) => (
                <div key={index} className="pt-6">
                  <div className="flow-root bg-white rounded-lg px-6 pb-8 h-full hover:shadow-xl transition-all duration-300">
                    <div className="-mt-6">
                      <div>
                        <span className="inline-flex items-center justify-center p-3 bg-gradient-to-r from-patriot-blue to-patriot-red rounded-md shadow-lg">
                          <value.icon className="h-6 w-6 text-white" aria-hidden="true" />
                        </span>
                      </div>
                      <h3 className="mt-8 text-lg font-medium text-patriot-blue tracking-tight">{value.title}</h3>
                      <p className="mt-5 text-base text-gray-500">{value.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
            {features.map((feature, index) => (
              <div key={index} className="bg-gradient-to-br from-patriot-blue to-patriot-red rounded-xl p-1">
                <div className="bg-white h-full rounded-lg p-8 hover:bg-gray-50 transition-colors duration-300">
                  <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0">
                      <feature.icon className="h-6 w-6 text-patriot-red" />
                    </div>
                    <h3 className="text-lg font-medium text-patriot-blue">{feature.title}</h3>
                  </div>
                  <p className="mt-4 text-base text-gray-500">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-patriot-blue to-patriot-red text-white">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between">
          <div className="text-center lg:text-left">
            <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
              <span className="block">Ready to experience secure voting?</span>
              <span className="block text-white opacity-90">Join TrueVote today.</span>
            </h2>
            <p className="mt-4 text-lg text-white opacity-80">
              Be part of the future of democratic participation.
            </p>
          </div>
          <div className="mt-8 lg:mt-0 lg:flex-shrink-0">
            <Link
              to="/register"
              className="inline-flex items-center justify-center px-8 py-4 border-2 border-white text-lg font-medium rounded-md text-white hover:bg-white hover:text-patriot-blue transition-all duration-300"
            >
              Get Started
              <ChevronRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}