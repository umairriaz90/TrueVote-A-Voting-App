import { Link } from 'react-router-dom';
import {
  UserCheck,
  Vote,
  CheckCircle,
  ChevronRight,
  Fingerprint,
  Lock
} from 'lucide-react';

export default function HowItWorks() {
  const steps = [
    {
      icon: UserCheck,
      title: 'Register',
      description: 'Create your secure voting account',
      details: [
        'Submit government-issued ID',
        'Verify your identity',
        'Create secure credentials'
      ]
    },
    {
      icon: Fingerprint,
      title: 'Verify',
      description: 'Complete identity verification',
      details: [
        'Biometric authentication',
        'Two-factor verification',
        'Digital signature creation'
      ]
    },
    {
      icon: Vote,
      title: 'Vote',
      description: 'Cast your ballot securely',
      details: [
        'Access your digital ballot',
        'Make your selection',
        'Review your choices'
      ]
    },
    {
      icon: Lock,
      title: 'Confirm',
      description: 'Your vote is securely recorded',
      details: [
        'End-to-end encryption',
        'Blockchain verification',
        'Anonymous confirmation'
      ]
    }
  ];

  return (
    <div className="flex-grow bg-gradient-to-b from-patriot-blue to-white">
      {/* Hero Section */}
      <div className="relative py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-extrabold text-white sm:text-5xl md:text-6xl">
              How It Works
            </h1>
            <p className="mt-3 max-w-md mx-auto text-base text-gray-100 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
              Simple, secure, and transparent voting in four easy steps
            </p>
          </div>
        </div>
      </div>

      {/* Process Steps */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="space-y-12">
          {steps.map((step, index) => (
            <div key={index} className="bg-white rounded-lg shadow-lg p-8 hover:shadow-xl transition-all duration-300">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-gradient-to-br from-patriot-blue to-patriot-red rounded-lg p-3 flex-shrink-0">
                  <step.icon className="h-full w-full text-white" />
                </div>
                <div className="flex-grow">
                  <div className="flex items-center">
                    <span className="bg-patriot-blue text-white text-xs font-bold px-2 py-1 rounded-full mr-3">
                      STEP {index + 1}
                    </span>
                    <h3 className="text-2xl font-bold text-gray-900">{step.title}</h3>
                  </div>
                  <p className="text-lg text-gray-600 mt-1">{step.description}</p>
                </div>
              </div>
              <div className="mt-6 ml-20">
                <ul className="space-y-4">
                  {step.details.map((detail, idx) => (
                    <li key={idx} className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-patriot-blue mr-3 flex-shrink-0" />
                      <span className="text-gray-600">{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="mt-16 text-center">
          <Link
            to="/register"
            className="inline-flex items-center justify-center px-8 py-4 border border-transparent text-lg font-medium rounded-md text-white bg-patriot-blue hover:bg-blue-700 transition-colors duration-200 shadow-lg hover:shadow-xl"
          >
            Get Started Now
            <ChevronRight className="ml-2 h-6 w-6" />
          </Link>
          <p className="mt-4 text-gray-600">
            Join millions of voters using secure blockchain voting
          </p>
        </div>
      </div>
    </div>
  );
}