import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

const faqs = [
  {
    question: 'How does TrueVote ensure vote security?',
    answer: 'TrueVote uses end-to-end encryption and blockchain technology to secure every vote. Each vote is encrypted and recorded on an immutable ledger, making it impossible to tamper with while maintaining voter privacy.'
  },
  {
    question: 'What do I need to vote online?',
    answer: 'You\'ll need a government-issued ID, internet access, and a device (computer, tablet, or smartphone). We also require two-factor authentication for additional security.'
  },
  {
    question: 'How can I verify my vote was counted?',
    answer: 'After voting, you\'ll receive a unique verification code. You can use this code on our verification portal to confirm your vote was recorded correctly, without revealing your specific voting choices.'
  },
  {
    question: 'What happens if I lose internet connection while voting?',
    answer: 'Our system automatically saves your progress. If you lose connection, you can resume from where you left off when you reconnect. No vote is submitted until you explicitly confirm your choices.'
  }
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="space-y-4">
      {faqs.map((faq, index) => (
        <div key={index} className="border-b border-gray-200 last:border-0">
          <button
            className="w-full py-4 flex items-center justify-between text-left focus:outline-none"
            onClick={() => setOpenIndex(openIndex === index ? null : index)}
          >
            <span className="text-lg font-medium text-patriot-blue">{faq.question}</span>
            {openIndex === index ? (
              <ChevronUp className="h-5 w-5 text-patriot-red" />
            ) : (
              <ChevronDown className="h-5 w-5 text-gray-400" />
            )}
          </button>
          {openIndex === index && (
            <div className="pb-4">
              <p className="text-gray-600">{faq.answer}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}