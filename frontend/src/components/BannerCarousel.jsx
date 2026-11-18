import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { fetchBanners } from '../services/api';

export default function BannerCarousel() {
  const [banners, setBanners] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const timerRef = useRef(null);

  useEffect(() => {
    fetchBanners().then((data) => setBanners(data));
  }, []);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % (banners.length || 1));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + banners.length) % (banners.length || 1));
  };

  // Auto slide
  useEffect(() => {
    if (banners.length <= 1) return;
    timerRef.current = setInterval(nextSlide, 4000);
    return () => clearInterval(timerRef.current);
  }, [banners.length, currentIndex]);

  if (!banners.length) return null;

  const currentBanner = banners[currentIndex];

  return (
    <div className="relative max-w-[1240px] mx-auto px-2 mb-3 select-none">
      <div className="relative overflow-hidden rounded-[2px] shadow-sm aspect-[16/3.2] min-h-[160px] md:min-h-[240px] bg-slate-900">
        <Link to={currentBanner.link} className="block w-full h-full relative">
          <img
            src={currentBanner.image}
            alt={currentBanner.title}
            className="w-full h-full object-cover transition-opacity duration-300"
            onError={(e) => {
              // Fallback gradient if remote image fails
              e.target.style.display = 'none';
              e.target.parentElement.style.background = currentBanner.fallbackBg || '#182848';
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/20 to-transparent flex flex-col justify-center px-8 md:px-16 text-white pointer-events-none">
            <span className="text-[12px] md:text-[14px] uppercase tracking-widest text-[#ffe500] font-bold">
              Special Festive Offer
            </span>
            <h2 className="text-[20px] md:text-[34px] font-black tracking-tight mt-1 max-w-[650px] drop-shadow-sm leading-tight">
              {currentBanner.title}
            </h2>
            <p className="text-[13px] md:text-[16px] text-gray-200 mt-1 max-w-[500px]">
              {currentBanner.subtitle}
            </p>
          </div>
        </Link>

        {/* Prev & Next Buttons */}
        <button
          onClick={prevSlide}
          className="absolute left-0 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-gray-800 p-2 md:p-3 rounded-r-[4px] shadow-lg cursor-pointer transition-colors"
          aria-label="Previous Slide"
        >
          <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-0 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-gray-800 p-2 md:p-3 rounded-l-[4px] shadow-lg cursor-pointer transition-colors"
          aria-label="Next Slide"
        >
          <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
        </button>

        {/* Indicator dots */}
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex items-center gap-1.5 z-10">
          {banners.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`h-1.5 rounded-full transition-all cursor-pointer ${
                currentIndex === idx ? 'w-6 bg-white' : 'w-2 bg-white/50 hover:bg-white/75'
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
