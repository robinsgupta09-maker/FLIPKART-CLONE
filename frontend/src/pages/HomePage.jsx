import React, { useEffect, useState } from 'react';
import CategoryBar from '../components/CategoryBar';
import BannerCarousel from '../components/BannerCarousel';
import ProductSlider from '../components/ProductSlider';
import { fetchDeals, fetchBestOf, fetchTopPicks } from '../services/api';

export default function HomePage() {
  const [deals, setDeals] = useState([]);
  const [bestOf, setBestOf] = useState([]);
  const [topPicks, setTopPicks] = useState([]);

  useEffect(() => {
    fetchDeals().then(setDeals);
    fetchBestOf().then(setBestOf);
    fetchTopPicks().then(setTopPicks);
  }, []);

  return (
    <div className="min-h-screen bg-[#f1f3f6]">
      {/* Category Strip */}
      <CategoryBar />

      {/* Hero Carousel */}
      <BannerCarousel />

      {/* Best of Electronics Slider */}
      <ProductSlider
        title="Best of Electronics"
        subtitle="Audio, Laptops & More"
        viewAllLink="/category/electronics"
        products={bestOf.filter((p) => p.category === 'electronics')}
      />

      {/* Deals of the Day Slider */}
      <ProductSlider
        title="Deals of the Day"
        subtitle="Up to 70% Off Today"
        viewAllLink="/category/mobiles"
        products={deals}
      />

      {/* 3-Column Middle Promotion Cards */}
      <div className="max-w-[1240px] mx-auto px-2 mb-3">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div className="bg-white p-4 rounded-[2px] shadow-sm flex items-center justify-between group cursor-pointer hover:shadow-md transition-shadow">
            <div>
              <span className="text-[11px] font-bold text-[#878787] uppercase tracking-wider">
                Home Makeover
              </span>
              <h4 className="text-[17px] font-bold text-[#212121] mt-0.5 group-hover:text-[#2874f0]">
                Up to 60% Off
              </h4>
              <p className="text-[13px] text-gray-500">Cookware, Decor &amp; Beds</p>
            </div>
            <img
              src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=200&q=80"
              alt="Home"
              className="w-20 h-20 object-cover rounded-[4px]"
            />
          </div>

          <div className="bg-white p-4 rounded-[2px] shadow-sm flex items-center justify-between group cursor-pointer hover:shadow-md transition-shadow">
            <div>
              <span className="text-[11px] font-bold text-[#878787] uppercase tracking-wider">
                Trending Fashion
              </span>
              <h4 className="text-[17px] font-bold text-[#212121] mt-0.5 group-hover:text-[#2874f0]">
                Min 50% Off
              </h4>
              <p className="text-[13px] text-gray-500">PUMA, Nike, Levi's &amp; more</p>
            </div>
            <img
              src="https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&w=200&q=80"
              alt="Fashion"
              className="w-20 h-20 object-cover rounded-[4px]"
            />
          </div>

          <div className="bg-white p-4 rounded-[2px] shadow-sm flex items-center justify-between group cursor-pointer hover:shadow-md transition-shadow">
            <div>
              <span className="text-[11px] font-bold text-[#878787] uppercase tracking-wider">
                Next-Gen EVs
              </span>
              <h4 className="text-[17px] font-bold text-[#212121] mt-0.5 group-hover:text-[#2874f0]">
                Zero Emission
              </h4>
              <p className="text-[13px] text-gray-500">Ather, Ola &amp; Hero Bikes</p>
            </div>
            <img
              src="https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&w=200&q=80"
              alt="EVs"
              className="w-20 h-20 object-cover rounded-[4px]"
            />
          </div>
        </div>
      </div>

      {/* Top Picks Slider */}
      <ProductSlider
        title="Top Picks for You"
        subtitle="Handpicked Collection"
        viewAllLink="/category/fashion"
        products={topPicks}
      />
    </div>
  );
}
