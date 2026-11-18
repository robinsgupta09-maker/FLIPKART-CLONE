import React from 'react';
import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';
import RatingBadge from './RatingBadge';
import AssuredBadge from './AssuredBadge';
import { useWishlist } from '../context/WishlistContext';

export default function ProductCard({ product, viewMode = 'list' }) {
  const { toggleWishlist, isInWishlist } = useWishlist();
  const wishlisted = isInWishlist(product.id);

  const handleWishlistClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product);
  };

  if (viewMode === 'list') {
    return (
      <div className="bg-white p-6 border-b border-gray-100 hover:shadow-lg transition-shadow relative group flex flex-col md:flex-row gap-6">
        {/* Wishlist Button */}
        <button
          onClick={handleWishlistClick}
          className="absolute top-4 right-4 md:right-auto md:left-[210px] z-10 p-1.5 rounded-full hover:bg-gray-100 cursor-pointer"
          aria-label="Wishlist"
        >
          <Heart
            className={`w-5 h-5 transition-colors ${
              wishlisted ? 'fill-[#ff6161] text-[#ff6161]' : 'text-gray-400 hover:text-gray-600'
            }`}
          />
        </button>

        {/* Product Image */}
        <Link
          to={`/product/${product.id}`}
          className="w-full md:w-[200px] h-[200px] shrink-0 flex items-center justify-center p-1 rounded-[3px] bg-gray-50/50 overflow-hidden"
        >
          <img
            src={product.images?.[0]}
            alt={product.title}
            className="w-full h-full object-cover rounded-[2px] transition-transform duration-300 group-hover:scale-105"
            loading="lazy"
          />
        </Link>

        {/* Center Details */}
        <div className="flex-1 space-y-2">
          <Link
            to={`/product/${product.id}`}
            className="text-[18px] font-medium text-[#212121] group-hover:text-[#2874f0] leading-snug line-clamp-2"
          >
            {product.title}
          </Link>

          {/* Rating and Assured */}
          <div className="flex items-center gap-3">
            <RatingBadge rating={product.rating} />
            <span className="text-[13px] font-semibold text-[#878787]">
              {product.ratingCount?.toLocaleString('en-IN')} Ratings &{' '}
              {product.reviewCount?.toLocaleString('en-IN')} Reviews
            </span>
            {product.isAssured && <AssuredBadge />}
          </div>

          {/* Highlights */}
          {product.highlights?.length > 0 && (
            <ul className="text-[13px] text-gray-700 space-y-1 pt-1 list-disc list-inside">
              {product.highlights.slice(0, 4).map((h, i) => (
                <li key={i} className="truncate">
                  {h}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Right Price & Delivery */}
        <div className="w-full md:w-[220px] shrink-0 flex flex-col md:items-start space-y-1">
          <div className="flex items-baseline gap-2">
            <span className="text-[25px] font-bold text-[#212121]">
              ₹{product.price.toLocaleString('en-IN')}
            </span>
            {product.originalPrice > product.price && (
              <>
                <span className="text-[14px] text-[#878787] line-through">
                  ₹{product.originalPrice.toLocaleString('en-IN')}
                </span>
                <span className="text-[14px] font-semibold text-[#388e3c]">
                  {product.discount}% off
                </span>
              </>
            )}
          </div>

          <div className="text-[12px] text-[#212121] font-normal pt-1">
            Free delivery
          </div>

          {product.offers?.length > 0 && (
            <div className="text-[12px] font-semibold text-[#388e3c]">
              Bank Offers Available
            </div>
          )}

          <div className="text-[12px] text-[#878787] pt-1">
            Upto <span className="font-semibold text-gray-800">₹15,000</span> Off on Exchange
          </div>
        </div>
      </div>
    );
  }

  // Grid Mode
  return (
    <div className="bg-white p-4 border border-gray-100 hover:shadow-xl transition-all relative group flex flex-col justify-between rounded-[2px]">
      {/* Wishlist Button */}
      <button
        onClick={handleWishlistClick}
        className="absolute top-3 right-3 z-10 p-1.5 rounded-full hover:bg-gray-100 cursor-pointer"
        aria-label="Wishlist"
      >
        <Heart
          className={`w-5 h-5 transition-colors ${
            wishlisted ? 'fill-[#ff6161] text-[#ff6161]' : 'text-gray-400 hover:text-gray-600'
          }`}
        />
      </button>

      <Link to={`/product/${product.id}`} className="block">
        <div className="w-full h-[190px] flex items-center justify-center p-1 mb-3 overflow-hidden rounded-[3px] bg-gray-50/50">
          <img
            src={product.images?.[0]}
            alt={product.title}
            className="w-full h-full object-cover rounded-[2px] transition-transform duration-300 group-hover:scale-105"
            loading="lazy"
          />
        </div>

        <div className="text-[12px] font-bold text-[#878787] uppercase tracking-wider">
          {product.brand}
        </div>
        <h4 className="text-[14px] font-medium text-[#212121] group-hover:text-[#2874f0] line-clamp-1 mt-0.5">
          {product.title}
        </h4>

        <div className="flex items-center gap-2 mt-1.5">
          <RatingBadge rating={product.rating} />
          <span className="text-[12px] text-[#878787]">
            ({product.ratingCount?.toLocaleString('en-IN')})
          </span>
          {product.isAssured && <AssuredBadge className="scale-90" />}
        </div>

        <div className="flex items-baseline gap-2 mt-2">
          <span className="text-[16px] font-bold text-[#212121]">
            ₹{product.price.toLocaleString('en-IN')}
          </span>
          {product.originalPrice > product.price && (
            <>
              <span className="text-[12px] text-[#878787] line-through">
                ₹{product.originalPrice.toLocaleString('en-IN')}
              </span>
              <span className="text-[12px] font-bold text-[#388e3c]">
                {product.discount}% off
              </span>
            </>
          )}
        </div>
        <div className="text-[11px] text-gray-500 mt-1">Free delivery</div>
      </Link>
    </div>
  );
}
