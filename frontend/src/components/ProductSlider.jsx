import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function ProductSlider({
  title,
  subtitle = 'Grab Now',
  viewAllLink = '/category/electronics',
  products = [],
  sideBannerImg = 'https://images.unsplash.com/photo-1550009158-9ebf69173e03?auto=format&fit=crop&w=500&q=80'
}) {
  const scrollContainerRef = useRef(null);

  const scroll = (direction) => {
    if (scrollContainerRef.current) {
      const offset = direction === 'left' ? -600 : 600;
      scrollContainerRef.current.scrollBy({ left: offset, behavior: 'smooth' });
    }
  };

  if (!products.length) return null;

  return (
    <div className="max-w-[1240px] mx-auto px-2 mb-3">
      <div className="bg-white shadow-[0_2px_4px_0_rgba(0,0,0,0.08)] rounded-[2px] flex flex-col md:flex-row min-h-[310px] relative overflow-hidden">
        {/* Left Side Teaser Banner */}
        <div className="w-full md:w-[230px] p-6 shrink-0 flex flex-col justify-between items-center text-center bg-gradient-to-b from-blue-50/60 to-white border-b md:border-b-0 md:border-r border-gray-100">
          <div className="space-y-2 mt-4">
            <h3 className="text-[22px] font-semibold text-[#212121] leading-tight">
              {title}
            </h3>
            <p className="text-[14px] text-gray-500 font-medium">{subtitle}</p>
          </div>

          <Link
            to={viewAllLink}
            className="mt-6 md:mt-0 bg-[#2874f0] hover:bg-[#1259c7] text-white text-[13px] font-bold px-6 py-2.5 rounded-[2px] uppercase tracking-wide shadow-sm transition-colors cursor-pointer"
          >
            View All
          </Link>

          <div className="hidden md:block w-full h-24 overflow-hidden rounded opacity-80 mt-2">
            <img
              src={sideBannerImg}
              alt="Promotion"
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.style.display = 'none';
              }}
            />
          </div>
        </div>

        {/* Right Scrollable Product List */}
        <div className="relative flex-1 overflow-hidden flex items-center">
          {/* Scroll Buttons */}
          <button
            onClick={() => scroll('left')}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/95 hover:bg-white text-gray-800 p-3 shadow-md rounded-r-[4px] cursor-pointer"
            aria-label="Scroll Left"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={() => scroll('right')}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/95 hover:bg-white text-gray-800 p-3 shadow-md rounded-l-[4px] cursor-pointer"
            aria-label="Scroll Right"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          <div
            ref={scrollContainerRef}
            className="flex items-stretch overflow-x-auto no-scrollbar py-6 px-4 gap-6 scroll-smooth w-full"
          >
            {products.map((prod) => (
              <Link
                key={prod.id}
                to={`/product/${prod.id}`}
                className="w-[170px] shrink-0 flex flex-col items-center text-center p-2 rounded-[2px] hover:shadow-lg transition-all group"
              >
                <div className="w-[150px] h-[150px] flex items-center justify-center p-1 mb-3 overflow-hidden rounded-[4px] bg-gray-50/50">
                  <img
                    src={prod.images?.[0]}
                    alt={prod.title}
                    className="w-full h-full object-cover rounded-[3px] transition-transform duration-300 group-hover:scale-105"
                    loading="lazy"
                  />
                </div>
                <div className="w-full">
                  <h4 className="text-[14px] font-medium text-[#212121] truncate w-full group-hover:text-[#2874f0]">
                    {prod.title}
                  </h4>
                  <div className="text-[14px] font-semibold text-[#388e3c] mt-1">
                    {prod.discount ? `Up to ${prod.discount}% Off` : `From ₹${prod.price.toLocaleString('en-IN')}`}
                  </div>
                  <div className="text-[13px] text-[#878787] truncate mt-0.5">
                    {prod.brand} • {prod.subcategory || prod.category}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
