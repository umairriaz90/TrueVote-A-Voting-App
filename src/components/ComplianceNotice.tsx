import React from 'react';
import { Shield, Lock, FileCheck, AlertCircle } from 'lucide-react';

export default function ComplianceNotice() {
  return (
    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
      <div className="flex items-start">
        <div className="flex-shrink-0">
          <Shield className="h-5 w-5 text-blue-400" />
        </div>
        <div className="ml-3">
          <h3 className="text-sm font-medium text-blue-800">
            Legal and Regulatory Compliance
          </h3>
          <div className="mt-2 text-sm text-blue-700">
            <ul className="list-disc pl-5 space-y-1">
              <li>GDPR and Data Protection compliant voting process</li>
              <li>Electoral Commission certified system</li>
              <li>Blockchain-based immutable audit trail</li>
              <li>End-to-end encryption of all voter data</li>
            </ul>
          </div>
          <div className="mt-4 flex items-center space-x-4">
            <div className="flex items-center">
              <Lock className="h-4 w-4 text-blue-500 mr-1" />
              <span className="text-xs text-blue-700">Data Protected</span>
            </div>
            <div className="flex items-center">
              <FileCheck className="h-4 w-4 text-blue-500 mr-1" />
              <span className="text-xs text-blue-700">Legally Compliant</span>
            </div>
            <div className="flex items-center">
              <AlertCircle className="h-4 w-4 text-blue-500 mr-1" />
              <span className="text-xs text-blue-700">Fully Auditable</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}