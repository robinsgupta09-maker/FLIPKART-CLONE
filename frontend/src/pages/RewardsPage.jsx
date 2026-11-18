import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Gift,
  Coins,
  CheckCircle2,
  Copy,
  ExternalLink,
  Tag,
  Sparkles,
  Zap,
  ArrowRight
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const REWARD_CATALOG = [
  {
    id: 'rew-1',
    title: 'Flat ₹100 Off on Electronics',
    subtitle: 'Valid on Laptops, Headphones, Tablets & Accessories above ₹1,999',
    coins: 50,
    codePrefix: 'ELEC100',
    discount: '₹100 Off',
    category: 'Electronics',
    brand: 'Flipkart Electronics',
    img: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=300&q=80'
  },
  {
    id: 'rew-2',
    title: 'Flat ₹250 Off on Fashion',
    subtitle: 'Valid on Shoes, Apparel & Accessories above ₹1,499',
    coins: 100,
    codePrefix: 'FASH250',
    discount: '₹250 Off',
    category: 'Fashion',
    brand: 'Fashion Hub',
    img: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=300&q=80'
  },
  {
    id: 'rew-3',
    title: 'Free Delivery Pass for 30 Days',
    subtitle: 'Zero delivery charges on all orders across Flipkart',
    coins: 25,
    codePrefix: 'FREEDEL',
    discount: 'Free Delivery',
    category: 'Delivery',
    brand: 'Flipkart Plus',
    img: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=300&q=80'
  },
  {
    id: 'rew-4',
    title: 'Flat ₹500 Off Flight Bookings',
    subtitle: 'Valid on Domestic flight tickets booked on Cleartrip',
    coins: 150,
    codePrefix: 'FLY500',
    discount: '₹500 Off',
    category: 'Travel',
    brand: 'Cleartrip',
    img: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=300&q=80'
  },
  {
    id: 'rew-5',
    title: '3 Months SonyLIV Premium Subscription',
    subtitle: 'Stream live sports, movies & original web series in 4K',
    coins: 80,
    codePrefix: 'SONY3M',
    discount: '100% Free',
    category: 'Entertainment',
    brand: 'SonyLIV',
    img: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?auto=format&fit=crop&w=300&q=80'
  },
  {
    id: 'rew-6',
    title: 'Flat 20% Off on Beauty & Personal Care',
    subtitle: 'Valid on Skincare, Fragrances, Grooming & Haircare products',
    coins: 40,
    codePrefix: 'BEAUTY20',
    discount: '20% Off',
    category: 'Beauty',
    brand: 'Flipkart Beauty',
    img: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=300&q=80'
  }
];

export default function RewardsPage() {
  const { superCoins, redeemReward, redeemedRewards } = useAuth();
  const [activeTab, setActiveTab] = useState('catalog'); // 'catalog' or 'myRewards'
  const [copiedCode, setCopiedCode] = useState('');
  const [toastMessage, setToastMessage] = useState('');

  const handleRedeem = (reward) => {
    const res = redeemReward(reward);
    if (res.success) {
      setToastMessage(`Congratulations! You redeemed "${reward.title}".`);
      setTimeout(() => setToastMessage(''), 3500);
      setActiveTab('myRewards');
    } else {
      alert(res.message);
    }
  };

  const handleCopy = (code) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(''), 2000);
  };

  return (
    <div className="max-w-[1240px] mx-auto px-2 py-4 min-h-screen">
      {/* Toast */}
      {toastMessage && (
        <div className="fixed top-20 right-6 z-50 bg-[#388e3c] text-white px-5 py-3 rounded-[2px] shadow-2xl flex items-center gap-3 animate-in fade-in">
          <CheckCircle2 className="w-5 h-5" />
          <span className="font-semibold text-[14px]">{toastMessage}</span>
        </div>
      )}

      <div className="flex flex-col md:flex-row gap-4 items-start">
        {/* Left Side Account Links */}
        <div className="w-full md:w-[260px] bg-white rounded-[2px] shadow-sm border border-gray-100 p-4 space-y-4 shrink-0">
          <div className="font-bold text-[16px] text-gray-800 border-b border-gray-100 pb-2">
            My Account
          </div>
          <ul className="space-y-2 text-[14px]">
            <li>
              <Link to="/account/orders" className="text-gray-600 hover:text-[#2874f0] block">
                My Orders
              </Link>
            </li>
            <li>
              <Link to="/account/wishlist" className="text-gray-600 hover:text-[#2874f0] block">
                My Wishlist
              </Link>
            </li>
            <li>
              <Link to="/account/rewards" className="text-[#2874f0] font-semibold block">
                SuperCoin &amp; Rewards
              </Link>
            </li>
            <li>
              <Link to="/account/gift-cards" className="text-gray-600 hover:text-[#2874f0] block">
                Gift Cards
              </Link>
            </li>
            <li>
              <Link to="/account" className="text-gray-600 hover:text-[#2874f0] block">
                Profile Information
              </Link>
            </li>
          </ul>
        </div>

        {/* Right Main Content */}
        <div className="flex-1 w-full space-y-4">
          {/* SuperCoins Banner Header */}
          <div className="bg-gradient-to-r from-[#172337] via-[#1a3461] to-[#2874f0] text-white p-6 rounded-[2px] shadow-sm flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden">
            <div className="space-y-2 z-10 text-center md:text-left">
              <span className="bg-[#ffe500] text-[#172337] text-[11px] font-black uppercase px-2.5 py-0.5 rounded-full inline-flex items-center gap-1 shadow-xs">
                <Sparkles className="w-3 h-3 fill-current" />
                Flipkart SuperCoin Zone
              </span>
              <h1 className="text-[26px] md:text-[30px] font-black tracking-tight">
                Flipkart Rewards Hub
              </h1>
              <p className="text-[13px] text-blue-100 max-w-[480px]">
                Earn SuperCoins on every purchase and redeem them for exclusive coupons, discounts, and OTT subscriptions.
              </p>
            </div>

            {/* Coins Balance Badge */}
            <div className="bg-white/10 backdrop-blur-md border border-white/20 p-4 rounded-[6px] text-center min-w-[180px] shrink-0 z-10">
              <div className="text-[12px] uppercase font-bold text-yellow-300 tracking-wider">
                Available Balance
              </div>
              <div className="flex items-center justify-center gap-2 mt-1">
                <div className="w-8 h-8 rounded-full bg-[#ffe500] text-[#2874f0] flex items-center justify-center font-black text-[18px] shadow-md">
                  ★
                </div>
                <span className="text-[32px] font-black text-white">{superCoins}</span>
              </div>
              <div className="text-[11px] text-gray-200 mt-0.5">SuperCoins</div>
            </div>

            {/* Decorative background circle */}
            <div className="absolute -right-10 -bottom-10 w-48 h-48 bg-blue-500/20 rounded-full blur-2xl pointer-events-none" />
          </div>

          {/* Navigation Tabs */}
          <div className="bg-white rounded-[2px] shadow-sm border border-gray-100 p-2 flex items-center gap-4 text-[14px]">
            <button
              onClick={() => setActiveTab('catalog')}
              className={`px-5 py-2 font-semibold rounded-[2px] transition-colors cursor-pointer ${
                activeTab === 'catalog'
                  ? 'bg-[#2874f0] text-white shadow-xs'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              All Available Rewards ({REWARD_CATALOG.length})
            </button>
            <button
              onClick={() => setActiveTab('myRewards')}
              className={`px-5 py-2 font-semibold rounded-[2px] transition-colors cursor-pointer flex items-center gap-2 ${
                activeTab === 'myRewards'
                  ? 'bg-[#2874f0] text-white shadow-xs'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <span>My Claimed Vouchers</span>
              {redeemedRewards.length > 0 && (
                <span
                  className={`text-[11px] font-bold px-1.5 py-0.2 rounded-full ${
                    activeTab === 'myRewards'
                      ? 'bg-white text-[#2874f0]'
                      : 'bg-[#2874f0] text-white'
                  }`}
                >
                  {redeemedRewards.length}
                </span>
              )}
            </button>
          </div>

          {/* Catalog Tab */}
          {activeTab === 'catalog' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {REWARD_CATALOG.map((rew) => {
                const canAfford = superCoins >= rew.coins;
                return (
                  <div
                    key={rew.id}
                    className="bg-white rounded-[2px] shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-all flex flex-col justify-between"
                  >
                    <div>
                      <div className="h-36 relative overflow-hidden bg-slate-900">
                        <img
                          src={rew.img}
                          alt={rew.title}
                          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                        />
                        <div className="absolute top-2 left-2 bg-[#2874f0] text-white text-[11px] font-bold px-2 py-0.5 rounded shadow-xs">
                          {rew.category}
                        </div>
                        <div className="absolute bottom-2 right-2 bg-black/75 text-white text-[11px] font-bold px-2 py-0.5 rounded backdrop-blur-xs flex items-center gap-1">
                          <span className="text-[#ffe500]">★</span>
                          <span>{rew.coins} Coins</span>
                        </div>
                      </div>

                      <div className="p-4 space-y-1.5">
                        <div className="text-[11px] font-bold text-gray-400 uppercase tracking-wide">
                          {rew.brand}
                        </div>
                        <h3 className="text-[15px] font-bold text-[#212121] leading-snug">
                          {rew.title}
                        </h3>
                        <p className="text-[12px] text-gray-500 leading-relaxed">
                          {rew.subtitle}
                        </p>
                      </div>
                    </div>

                    <div className="p-4 pt-0 border-t border-gray-50 flex items-center justify-between gap-3 mt-2">
                      <div className="text-[13px] font-bold text-[#388e3c]">
                        {rew.discount}
                      </div>
                      <button
                        onClick={() => handleRedeem(rew)}
                        disabled={!canAfford}
                        className={`text-[12px] font-bold px-4 py-2 rounded-[2px] uppercase tracking-wide cursor-pointer shadow-xs transition-colors ${
                          canAfford
                            ? 'bg-[#fb641b] hover:bg-[#e0530e] text-white'
                            : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                        }`}
                      >
                        {canAfford ? `Redeem for ${rew.coins} Coins` : `Need ${rew.coins} Coins`}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            /* My Claimed Vouchers Tab */
            <div className="bg-white rounded-[2px] shadow-sm border border-gray-100 overflow-hidden">
              <div className="p-4 border-b border-gray-100 font-bold text-[16px] text-gray-800">
                Your Claimed Vouchers ({redeemedRewards.length})
              </div>

              {redeemedRewards.length === 0 ? (
                <div className="p-16 text-center space-y-3">
                  <div className="w-16 h-16 bg-blue-50 text-[#2874f0] rounded-full flex items-center justify-center mx-auto">
                    <Gift className="w-8 h-8" />
                  </div>
                  <h3 className="text-[17px] font-bold text-gray-800">No Vouchers Claimed Yet</h3>
                  <p className="text-[13px] text-gray-500 max-w-[360px] mx-auto">
                    Use your available SuperCoins to unlock great discounts and special coupons.
                  </p>
                  <button
                    onClick={() => setActiveTab('catalog')}
                    className="bg-[#2874f0] text-white text-[13px] font-bold px-6 py-2.5 rounded-[2px] uppercase shadow-sm cursor-pointer"
                  >
                    Browse Rewards
                  </button>
                </div>
              ) : (
                <div className="divide-y divide-gray-100">
                  {redeemedRewards.map((vouch) => (
                    <div
                      key={vouch.id}
                      className="p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="bg-green-100 text-[#388e3c] text-[11px] font-bold px-2 py-0.5 rounded">
                            ACTIVE
                          </span>
                          <span className="text-[12px] text-gray-400">
                            Claimed on {vouch.redeemedAt}
                          </span>
                        </div>
                        <h4 className="text-[16px] font-bold text-[#212121]">{vouch.title}</h4>
                        <div className="text-[12px] text-gray-500">
                          Benefit: <b className="text-gray-800">{vouch.discount}</b> • Valid till {vouch.expiry}
                        </div>
                      </div>

                      {/* Coupon Code Display Box */}
                      <div className="flex items-center gap-2 bg-gray-50 p-2.5 rounded border border-dashed border-gray-300">
                        <span className="font-mono text-[14px] font-bold text-[#2874f0] tracking-wider px-2">
                          {vouch.couponCode}
                        </span>
                        <button
                          onClick={() => handleCopy(vouch.couponCode)}
                          className="bg-white hover:bg-gray-100 border border-gray-300 text-gray-700 px-3 py-1 rounded text-[12px] font-semibold flex items-center gap-1 cursor-pointer"
                        >
                          <Copy className="w-3.5 h-3.5" />
                          <span>{copiedCode === vouch.couponCode ? 'Copied!' : 'Copy'}</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
