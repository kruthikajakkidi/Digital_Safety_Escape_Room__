import React from 'react';
import { Star } from 'lucide-react';

export const StarRating = ({ rating = 5, maxStars = 5, size = 'md', showText = false, percentage = null }) => {
  const sizeMap = {
    sm: 'w-3.5 h-3.5',
    md: 'w-5 h-5',
    lg: 'w-7 h-7',
    xl: 'w-9 h-9'
  };

  return (
    <div className="inline-flex items-center gap-1">
      <div className="flex items-center gap-1">
        {Array.from({ length: maxStars }).map((_, index) => {
          const isFilled = index < rating;
          return (
            <Star
              key={index}
              className={`${sizeMap[size]} transition-all duration-300 ${
                isFilled
                  ? 'fill-amber-400 text-amber-400 drop-shadow-[0_0_8px_rgba(251,191,36,0.6)]'
                  : 'text-gray-500/40'
              }`}
            />
          );
        })}
      </div>
      {showText && (
        <span className="ml-1 text-xs font-mono font-bold text-amber-400">
          {rating}/{maxStars} Stars {percentage !== null && `(${percentage}%)`}
        </span>
      )}
    </div>
  );
};
