import React, { useState } from 'react';
import { Search, ChevronDown, ChevronUp } from 'lucide-react';
import AssuredBadge from './AssuredBadge';

export default function FilterSidebar({
  facets = {},
  selectedBrands = [],
  onBrandChange,
  minPrice,
  maxPrice,
  onPriceChange,
  selectedRating,
  onRatingChange,
  selectedDiscount,
  onDiscountChange,
  isAssuredOnly,
  onAssuredChange,
  onClearAll,
}) {
  const [brandSearch, setBrandSearch] = useState('');
  const [brandExpanded, setBrandExpanded] = useState(true);

  const brands = Object.entries(facets.brands || {}).sort((a, b) => b[1] - a[1]);
  const filteredBrands = brands.filter(([b]) =>
    b.toLowerCase().includes(brandSearch.toLowerCase())
  );

  const priceOptions = [
    { label: 'Min', value: '' },
    { label: '₹1,000', value: '1000' },
    { label: '₹5,000', value: '5000' },
    { label: '₹10,000', value: '10000' },
    { label: '₹20,000', value: '20000' },
    { label: '₹30,000', value: '30000' },
    { label: '₹50,000', value: '50000' },
  ];

  const maxPriceOptions = [
    { label: '₹10,000', value: '10000' },
    { label: '₹20,000', value: '20000' },
    { label: '₹30,000', value: '30000' },
    { label: '₹50,000', value: '50000' },
    { label: '₹1,00,000+', value: '150000' },
  ];

  const isAnyFilterActive =
    selectedBrands.length > 0 ||
    minPrice ||
    maxPrice ||
    selectedRating ||
    selectedDiscount ||
    isAssuredOnly;

  return (
    <aside className="w-full md:w-[270px] bg-white rounded-[2px] shadow-sm border border-gray-100 shrink-0 self-start">
      {/* Header */}
      <div className="p-4 border-b border-gray-200 flex items-center justify-between">
        <h3 className="text-[18px] font-semibold text-[#212121]">Filters</h3>
        {isAnyFilterActive && (
          <button
            onClick={onClearAll}
            className="text-[12px] font-bold text-[#2874f0] uppercase tracking-wider hover:underline cursor-pointer"
          >
            Clear all
          </button>
        )}
      </div>

      {/* Active Filter Pills */}
      {isAnyFilterActive && (
        <div className="p-3 border-b border-gray-200 flex flex-wrap gap-1.5">
          {selectedBrands.map((b) => (
            <span
              key={b}
              onClick={() => onBrandChange(b)}
              className="bg-gray-100 text-[12px] text-gray-700 px-2 py-1 rounded cursor-pointer hover:bg-gray-200 flex items-center gap-1"
            >
              ✕ {b}
            </span>
          ))}
          {selectedRating && (
            <span
              onClick={() => onRatingChange(null)}
              className="bg-gray-100 text-[12px] text-gray-700 px-2 py-1 rounded cursor-pointer hover:bg-gray-200 flex items-center gap-1"
            >
              ✕ {selectedRating}★ & above
            </span>
          )}
          {selectedDiscount && (
            <span
              onClick={() => onDiscountChange(null)}
              className="bg-gray-100 text-[12px] text-gray-700 px-2 py-1 rounded cursor-pointer hover:bg-gray-200 flex items-center gap-1"
            >
              ✕ {selectedDiscount}% or more
            </span>
          )}
        </div>
      )}

      {/* Flipkart Assured Filter */}
      <div className="p-4 border-b border-gray-200">
        <label className="flex items-center gap-2 cursor-pointer select-none">
          <input
            type="checkbox"
            checked={isAssuredOnly}
            onChange={(e) => onAssuredChange(e.target.checked)}
            className="w-4 h-4 text-[#2874f0] rounded focus:ring-0 cursor-pointer"
          />
          <AssuredBadge />
        </label>
      </div>

      {/* Price Range Filter */}
      <div className="p-4 border-b border-gray-200 space-y-3">
        <div className="text-[13px] font-bold text-[#212121] uppercase tracking-wider">
          Price
        </div>
        <div className="flex items-center gap-2">
          <select
            value={minPrice || ''}
            onChange={(e) => onPriceChange(e.target.value, maxPrice)}
            className="w-full text-[13px] border border-gray-300 rounded p-1.5 outline-hidden focus:border-[#2874f0]"
          >
            {priceOptions.map((opt, i) => (
              <option key={i} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
          <span className="text-[12px] text-gray-400">to</span>
          <select
            value={maxPrice || ''}
            onChange={(e) => onPriceChange(minPrice, e.target.value)}
            className="w-full text-[13px] border border-gray-300 rounded p-1.5 outline-hidden focus:border-[#2874f0]"
          >
            <option value="">Max</option>
            {maxPriceOptions.map((opt, i) => (
              <option key={i} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Brand Filter */}
      {brands.length > 0 && (
        <div className="p-4 border-b border-gray-200">
          <div
            onClick={() => setBrandExpanded(!brandExpanded)}
            className="flex items-center justify-between cursor-pointer select-none mb-3"
          >
            <span className="text-[13px] font-bold text-[#212121] uppercase tracking-wider">
              Brand
            </span>
            {brandExpanded ? (
              <ChevronUp className="w-4 h-4 text-gray-500" />
            ) : (
              <ChevronDown className="w-4 h-4 text-gray-500" />
            )}
          </div>

          {brandExpanded && (
            <div className="space-y-2">
              {brands.length > 5 && (
                <div className="relative mb-2">
                  <Search className="w-3.5 h-3.5 text-gray-400 absolute left-2 top-2.5" />
                  <input
                    type="text"
                    value={brandSearch}
                    onChange={(e) => setBrandSearch(e.target.value)}
                    placeholder="Search Brand"
                    className="w-full pl-7 pr-2 py-1 text-[13px] border-b border-gray-300 outline-hidden focus:border-[#2874f0]"
                  />
                </div>
              )}
              <div className="max-h-[180px] overflow-y-auto space-y-1.5 pr-1">
                {filteredBrands.map(([brandName, count]) => {
                  const checked = selectedBrands.includes(brandName.toLowerCase());
                  return (
                    <label
                      key={brandName}
                      className="flex items-center justify-between text-[13px] text-gray-700 cursor-pointer select-none hover:text-black py-0.5"
                    >
                      <div className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={checked}
                          onChange={() => onBrandChange(brandName.toLowerCase())}
                          className="w-3.5 h-3.5 text-[#2874f0] rounded focus:ring-0 cursor-pointer"
                        />
                        <span>{brandName}</span>
                      </div>
                      <span className="text-[11px] text-gray-400">({count})</span>
                    </label>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Customer Ratings Filter */}
      <div className="p-4 border-b border-gray-200 space-y-2">
        <div className="text-[13px] font-bold text-[#212121] uppercase tracking-wider mb-2">
          Customer Ratings
        </div>
        {[4, 3, 2].map((stars) => (
          <label
            key={stars}
            className="flex items-center gap-2 text-[13px] text-gray-700 cursor-pointer select-none hover:text-black"
          >
            <input
              type="radio"
              name="ratingFilter"
              checked={selectedRating === stars}
              onChange={() => onRatingChange(stars)}
              className="w-3.5 h-3.5 text-[#2874f0] cursor-pointer"
            />
            <span>{stars}★ & above</span>
          </label>
        ))}
      </div>

      {/* Discount Filter */}
      <div className="p-4 space-y-2">
        <div className="text-[13px] font-bold text-[#212121] uppercase tracking-wider mb-2">
          Discount
        </div>
        {[50, 40, 30, 20, 10].map((disc) => (
          <label
            key={disc}
            className="flex items-center gap-2 text-[13px] text-gray-700 cursor-pointer select-none hover:text-black"
          >
            <input
              type="radio"
              name="discountFilter"
              checked={selectedDiscount === disc}
              onChange={() => onDiscountChange(disc)}
              className="w-3.5 h-3.5 text-[#2874f0] cursor-pointer"
            />
            <span>{disc}% or more</span>
          </label>
        ))}
      </div>
    </aside>
  );
}
