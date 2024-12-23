import React from 'react';
import { Star } from 'lucide-react';

interface Comment {
  name: string;
  rating: number;
  description: string;
}

interface InfiniteCardsProps {
  comments: Comment[];
}

export const InfiniteCards: React.FC<InfiniteCardsProps> = ({ comments }) => {
  return (
    <div className="relative flex flex-col items-center justify-center overflow-hidden bg-white">
      <div className="relative w-full flex overflow-x-hidden">
        <div className="animate-infinite-scroll flex gap-4 py-12">
          {[...comments, ...comments].map((comment, idx) => (
            <div
              key={idx}
              className="flex-shrink-0 w-[350px] bg-white rounded-2xl shadow-lg p-6 border border-gray-200 hover:border-blue-500 transition-all duration-300 hover:shadow-xl"
            >
              <div className="flex items-center gap-2 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-semibold text-lg">
                    {comment.name.charAt(0)}
                  </span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">{comment.name}</h3>
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm text-gray-600">{comment.rating}</span>
                  </div>
                </div>
              </div>
              <p className="text-gray-600 leading-relaxed">{comment.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
