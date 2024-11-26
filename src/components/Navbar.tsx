import React from 'react';
import { Link } from 'react-router-dom';
import { Vote, Menu, X } from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <nav className="bg-gradient-to-r from-patriot-blue to-patriot-red">
      <div className="max-w-7xl mx-auto">
        <div className="relative px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo and Brand */}
            <div className="flex-shrink-0 mr-8">
              <Link to="/" className="flex items-center space-x-3">
                <Vote className="h-9 w-9 text-white" />
                <span className="text-2xl font-bold text-white tracking-tight">TrueVote</span>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden sm:flex sm:items-center sm:justify-between flex-1">
              <div className="flex items-center space-x-8">
                <Link 
                  to="/about" 
                  className="text-white hover:text-gray-200 transition-colors duration-200 text-sm font-medium"
                >
                  About
                </Link>
                <Link 
                  to="/how-it-works" 
                  className="text-white hover:text-gray-200 transition-colors duration-200 text-sm font-medium"
                >
                  How it Works
                </Link>
                <Link 
                  to="/education" 
                  className="text-white hover:text-gray-200 transition-colors duration-200 text-sm font-medium"
                >
                  Education
                </Link>
                <Link 
                  to="/analytics" 
                  className="text-white hover:text-gray-200 transition-colors duration-200 text-sm font-medium"
                >
                  Analytics
                </Link>
              </div>
              <div className="ml-12">
                <Link 
                  to="/register" 
                  className="inline-flex items-center px-6 py-2.5 border border-white text-sm font-medium rounded-md text-white bg-gradient-to-r from-patriot-red to-patriot-blue hover:from-patriot-blue hover:to-patriot-red transition-all duration-300 shadow-sm hover:shadow-md transform hover:-translate-y-0.5"
                >
                  Register / Login to Vote
                </Link>
              </div>
            </div>

            {/* Mobile menu button */}
            <div className="flex items-center sm:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-white hover:text-gray-200 hover:bg-patriot-blue focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white transition-colors duration-200"
                aria-expanded="false"
              >
                <span className="sr-only">Open main menu</span>
                {isOpen ? (
                  <X className="block h-6 w-6" aria-hidden="true" />
                ) : (
                  <Menu className="block h-6 w-6" aria-hidden="true" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        <div className={`${isOpen ? 'block' : 'hidden'} sm:hidden`}>
          <div className="px-2 pt-2 pb-3 space-y-1 bg-white shadow-lg rounded-b-lg">
            <Link
              to="/about"
              className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-patriot-blue hover:bg-gray-50 rounded-md transition-colors duration-200"
              onClick={() => setIsOpen(false)}
            >
              About
            </Link>
            <Link
              to="/how-it-works"
              className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-patriot-blue hover:bg-gray-50 rounded-md transition-colors duration-200"
              onClick={() => setIsOpen(false)}
            >
              How it Works
            </Link>
            <Link
              to="/education"
              className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-patriot-blue hover:bg-gray-50 rounded-md transition-colors duration-200"
              onClick={() => setIsOpen(false)}
            >
              Education
            </Link>
            <Link
              to="/analytics"
              className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-patriot-blue hover:bg-gray-50 rounded-md transition-colors duration-200"
              onClick={() => setIsOpen(false)}
            >
              Analytics
            </Link>
            <Link
              to="/register"
              className="block px-3 py-2 text-base font-medium text-white bg-gradient-to-r from-patriot-blue to-patriot-red hover:from-patriot-red hover:to-patriot-blue rounded-md transition-colors duration-200"
              onClick={() => setIsOpen(false)}
            >
              Register / Login to Vote
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}