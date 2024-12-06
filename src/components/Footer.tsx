import { Link } from 'react-router-dom';
import { Vote, Shield, Lock, FileCheck, Scale } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-patriot-blue to-patriot-red text-white">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
          <div className="space-y-8 xl:col-span-1">
            <div className="flex items-center">
              <Vote className="h-8 w-8 text-white" />
              <span className="ml-2 text-xl font-bold">TrueVote</span>
            </div>
            <p className="text-base opacity-90">
              Making democracy more secure and accessible through blockchain technology.
            </p>
            <div className="flex space-x-4">
              <Shield className="h-6 w-6" />
              <div>
                <p className="text-sm font-semibold">Certified & Compliant</p>
                <p className="text-sm opacity-90">ISO 27001 Certified</p>
                <p className="text-sm opacity-90">GDPR Compliant</p>
              </div>
            </div>
          </div>
          <div className="mt-12 grid grid-cols-2 gap-8 xl:mt-0 xl:col-span-2">
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold tracking-wider uppercase">Solutions</h3>
                <ul className="mt-4 space-y-4">
                  <li>
                    <Link to="/how-it-works" className="text-base opacity-90 hover:opacity-100">
                      How it Works
                    </Link>
                  </li>
                  <li>
                    <Link to="/security" className="text-base opacity-90 hover:opacity-100">
                      Security
                    </Link>
                  </li>
                  <li>
                    <Link to="/blockchain" className="text-base opacity-90 hover:opacity-100">
                      Blockchain
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="mt-12 md:mt-0">
                <h3 className="text-sm font-semibold tracking-wider uppercase">Support</h3>
                <ul className="mt-4 space-y-4">
                  <li>
                    <Link to="/help" className="text-base opacity-90 hover:opacity-100">
                      Help Center
                    </Link>
                  </li>
                  <li>
                    <Link to="/contact" className="text-base opacity-90 hover:opacity-100">
                      Contact Us
                    </Link>
                  </li>
                  <li>
                    <Link to="/faq" className="text-base opacity-90 hover:opacity-100">
                      FAQ
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold tracking-wider uppercase">Legal</h3>
                <ul className="mt-4 space-y-4">
                  <li>
                    <Link to="/compliance" className="text-base opacity-90 hover:opacity-100 flex items-center">
                      <FileCheck className="h-5 w-5 mr-2" />
                      Compliance
                    </Link>
                  </li>
                  <li>
                    <Link to="/privacy" className="text-base opacity-90 hover:opacity-100 flex items-center">
                      <Lock className="h-5 w-5 mr-2" />
                      Privacy Policy
                    </Link>
                  </li>
                  <li>
                    <Link to="/terms" className="text-base opacity-90 hover:opacity-100 flex items-center">
                      <Scale className="h-5 w-5 mr-2" />
                      Terms & Conditions
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="mt-12 md:mt-0">
                <h3 className="text-sm font-semibold tracking-wider uppercase">Certifications</h3>
                <ul className="mt-4 space-y-4">
                  <li className="flex items-center text-base">
                    <Shield className="h-5 w-5 mr-2 text-white" />
                    SOC 2 Type II
                  </li>
                  <li className="flex items-center text-base">
                    <Shield className="h-5 w-5 mr-2 text-white" />
                    ISO 27001
                  </li>
                  <li className="flex items-center text-base">
                    <Shield className="h-5 w-5 mr-2 text-white" />
                    GDPR Certified
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-white border-opacity-20">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center">
              <Lock className="h-5 w-5 mr-2" />
              <span className="text-sm opacity-90">GDPR Compliant Data Processing</span>
            </div>
            <div className="flex items-center">
              <Shield className="h-5 w-5 mr-2" />
              <span className="text-sm opacity-90">Electoral Commission Certified</span>
            </div>
            <div className="flex items-center">
              <FileCheck className="h-5 w-5 mr-2" />
              <span className="text-sm opacity-90">Blockchain Security Verified</span>
            </div>
          </div>
        </div>

        <div className="mt-8 border-t border-white border-opacity-20 pt-8">
          <p className="text-base opacity-90 text-center">
            &copy; {new Date().getFullYear()} TrueVote. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}