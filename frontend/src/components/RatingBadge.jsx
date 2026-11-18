import React from 'react';
import { Star } from 'lucide-react';

export default function RatingBadge({ rating, size = 'sm' }) {
  if (!rating) return null;

  const isSmall = size === 'sm';
  const bgColor = rating >= 3.8 ? 'bg-[#388e3c]' : rating >= 3.0 ? 'bg-[#ff9f00]' : 'bg-[#e53935]';

  return (
    <span
      className={`inline-flex items-center gap-1 font-semibold text-white rounded-[3px] leading-none ${bgColor} ${
        isSmall ? 'text-[12px] px-1.5 py-0.5' : 'text-[14px] px-2 py-1'
      }`}
    >
      <span>{rating.toFixed(1)}</span>
      <Star className={`${isSmall ? 'w-2.5 h-2.5' : 'w-3 h-3'} fill-white text-white`} />
    </span>
  );
}
