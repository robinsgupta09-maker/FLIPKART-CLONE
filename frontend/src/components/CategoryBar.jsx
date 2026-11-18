import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';
import { fetchCategories } from '../services/api';

export default function CategoryBar() {
  const [categories, setCategories] = useState([]);
  const [hoveredCat, setHoveredCat] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCategories().then((data) => setCategories(data));
  }, []);

  const handleSubItemClick = (slug, subItem) => {
    setHoveredCat(null);
    if (subItem === 'All') {
      navigate(`/category/${slug}`);
    } else {
      navigate(`/category/${slug}?subcategory=${encodeURIComponent(subItem)}`);
    }
  };

  return (
    <div className="bg-white shadow-[0_1px_1px_0_rgba(0,0,0,0.16)] mb-2.5 relative z-40">
      <div className="max-w-[1240px] mx-auto px-2">
        <div className="flex items-center justify-between overflow-x-auto no-scrollbar py-3 gap-2">
          {categories.map((cat) => (
            <div
              key={cat.id}
              className="relative group shrink-0 flex flex-col items-center cursor-pointer px-2"
              onMouseEnter={() => setHoveredCat(cat.id)}
              onMouseLeave={() => setHoveredCat(null)}
            >
              <Link
                to={`/category/${cat.slug}`}
                className="flex flex-col items-center group-hover:text-[#2874f0] transition-colors"
              >
                <div className="w-16 h-16 flex items-center justify-center overflow-hidden">
                  <img
                    src={cat.icon}
                    alt={cat.name}
                    className="w-full h-full object-contain transition-transform group-hover:scale-105"
                    loading="lazy"
                  />
                </div>
                <div className="flex items-center gap-0.5 mt-1">
                  <span className="text-[14px] font-semibold text-[#212121] group-hover:text-[#2874f0] whitespace-nowrap">
                    {cat.name}
                  </span>
                  {cat.hasDropdown && (
                    <ChevronDown className="w-3.5 h-3.5 text-gray-500 transition-transform group-hover:rotate-180 group-hover:text-[#2874f0]" />
                  )}
                </div>
              </Link>

              {/* Mega Menu Dropdown */}
              {cat.hasDropdown && hoveredCat === cat.id && cat.subcategories?.length > 0 && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 bg-white rounded-[2px] shadow-2xl border border-gray-100 p-5 z-50 min-w-[580px] max-w-[850px] animate-in fade-in duration-150">
                  <div className="grid grid-cols-3 gap-6 text-[13px]">
                    {cat.subcategories.map((sub, sIdx) => (
                      <div key={sIdx} className="space-y-1.5">
                        <div className="font-bold text-[#212121] uppercase text-[12px] border-b border-gray-100 pb-1 tracking-wide">
                          {sub.title}
                        </div>
                        <ul className="space-y-1 pt-1 text-gray-600">
                          {sub.items.map((item, iIdx) => (
                            <li
                              key={iIdx}
                              onClick={() => handleSubItemClick(cat.slug, item)}
                              className="hover:text-[#2874f0] hover:translate-x-1 cursor-pointer transition-transform py-0.5"
                            >
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
