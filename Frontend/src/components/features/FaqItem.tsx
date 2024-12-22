import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface FAQItemProps {
  question: string;
  answer: string;
}

export function FAQItem({ question, answer }: FAQItemProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-gray-200">
    <button
        className={`w-full py-5 px-4 flex items-center justify-between text-white ${
            isOpen ? '' : 'hover:bg-white/10'
        } transition-colors rounded-md`}
        onClick={() => setIsOpen(!isOpen)}
    >
        <span className="text-xl font-medium text-gray-400 flex items-center rounded-md">{question}</span>
        {isOpen ? (
            <ChevronUp className="h-5 w-5 text-gray-500" />
        ) : (
            <ChevronDown className="h-5 w-5 text-gray-500" />
        )}
    </button>
      {isOpen && (
        <div className="px-4 pb-5">
          <p className="text-gray-400">{answer}</p>
        </div>
      )}
    </div>
  );
}
