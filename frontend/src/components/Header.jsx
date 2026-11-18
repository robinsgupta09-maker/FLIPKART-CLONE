import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Search,
  ShoppingCart,
  ChevronDown,
  User,
  Package,
  Heart,
  Gift,
  CreditCard,
  Bell,
  HelpCircle,
  TrendingUp,
  Download,
  LogOut,
  Menu,
  X,
  Sparkles
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';

export default function Header() {
  const navigate = useNavigate();
  const { user, isLoggedIn, logout, openLoginModal } = useAuth();
  const { itemCount } = useCart();
  const { wishlist } = useWishlist();

  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const searchRef = useRef(null);

  const popularSearches = [
    'iPhone 15',
    'Samsung Galaxy S24',
    'Laptops',
    'Air Conditioners',
    'Smart Watches',
    'Sneakers',
    'Electric Scooters',
    'Headphones'
  ];

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setIsSearchFocused(false);
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const selectSuggestion = (term) => {
    setSearchQuery(term);
    setIsSearchFocused(false);
    navigate(`/search?q=${encodeURIComponent(term)}`);
  };

  // Close search suggestions on click outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setIsSearchFocused(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="sticky top-0 z-50 bg-[#2874f0] shadow-md">
      <div className="max-w-[1240px] mx-auto px-4 h-[56px] flex items-center justify-between gap-4">
        {/* Mobile menu trigger */}
        <button
          onClick={() => setMobileMenuOpen(true)}
          className="md:hidden text-white p-1 hover:bg-blue-600 rounded"
        >
          <Menu className="w-6 h-6" />
        </button>

        {/* Flipkart Logo */}
        <Link to="/" className="flex flex-col items-end leading-none shrink-0 group">
          <span className="text-[20px] font-bold italic tracking-tight text-white font-sans flex items-center">
            Flipkart
          </span>
          <span className="text-[11px] italic text-[#f0f0f0] flex items-center gap-0.5 mt-[-2px]">
            Explore <span className="text-[#ffe500] font-semibold">Plus</span>
            <span className="text-[#ffe500] text-[10px] ml-0.5">★</span>
          </span>
        </Link>

        {/* Search Bar */}
        <div ref={searchRef} className="relative flex-1 max-w-[560px] mx-2">
          <form onSubmit={handleSearchSubmit} className="relative w-full">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setIsSearchFocused(true)}
              placeholder="Search for products, brands and more"
              className="w-full bg-white text-[#212121] text-[14px] px-4 py-2 pr-10 rounded-[2px] shadow-sm outline-hidden placeholder:text-gray-400 placeholder:text-[14px]"
            />
            <button
              type="submit"
              className="absolute right-0 top-0 bottom-0 px-3 flex items-center justify-center text-[#2874f0] hover:text-blue-700 cursor-pointer"
            >
              <Search className="w-4 h-4 stroke-[2.5]" />
            </button>
          </form>

          {/* Auto-suggest dropdown */}
          {isSearchFocused && (
            <div className="absolute top-full left-0 right-0 mt-1 bg-white rounded-[2px] shadow-xl border border-gray-200 z-50 py-2">
              <div className="px-3 py-1 text-[11px] font-bold text-gray-400 uppercase tracking-wider">
                Discover More
              </div>
              {popularSearches.map((term, idx) => (
                <div
                  key={idx}
                  onMouseDown={() => selectSuggestion(term)}
                  className="px-4 py-2 hover:bg-gray-100 flex items-center gap-3 cursor-pointer text-[14px] text-gray-700"
                >
                  <Search className="w-3.5 h-3.5 text-gray-400" />
                  <span>{term}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right Navigation Actions */}
        <div className="hidden md:flex items-center gap-6 text-white text-[15px] font-semibold shrink-0">
          {/* Login Button with Hover Dropdown */}
          <div className="relative group">
            {isLoggedIn ? (
              <button className="flex items-center gap-1.5 py-1 px-3 hover:text-gray-200 cursor-pointer text-white font-medium">
                <span className="truncate max-w-[120px]">{user?.name || 'Customer'}</span>
                <ChevronDown className="w-4 h-4 transition-transform group-hover:rotate-180" />
              </button>
            ) : (
              <button
                onClick={openLoginModal}
                className="bg-white text-[#2874f0] px-9 py-1 text-[15px] font-semibold rounded-[2px] hover:bg-gray-50 transition-colors shadow-sm cursor-pointer"
              >
                Login
              </button>
            )}

            {/* Dropdown Menu */}
            <div className="absolute top-full -left-6 hidden group-hover:block pt-2 w-[240px] z-50">
              <div className="bg-white text-[#212121] rounded-[2px] shadow-2xl border border-gray-100 py-1 text-[14px] font-normal">
                {!isLoggedIn && (
                  <div className="px-4 py-3 flex items-center justify-between border-b border-gray-100">
                    <span className="font-semibold text-gray-800">New customer?</span>
                    <button
                      onClick={openLoginModal}
                      className="text-[#2874f0] font-semibold hover:underline cursor-pointer"
                    >
                      Sign Up
                    </button>
                  </div>
                )}
                <Link
                  to="/account"
                  className="px-4 py-2.5 flex items-center gap-3 hover:bg-blue-50/60 hover:text-[#2874f0] transition-colors"
                >
                  <User className="w-4 h-4 text-[#2874f0]" />
                  <span>My Profile</span>
                </Link>
                <Link
                  to="/account/orders"
                  className="px-4 py-2.5 flex items-center gap-3 hover:bg-blue-50/60 hover:text-[#2874f0] transition-colors"
                >
                  <Package className="w-4 h-4 text-[#2874f0]" />
                  <span>Orders</span>
                </Link>
                <Link
                  to="/account/wishlist"
                  className="px-4 py-2.5 flex items-center justify-between hover:bg-blue-50/60 hover:text-[#2874f0] transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <Heart className="w-4 h-4 text-[#2874f0]" />
                    <span>Wishlist</span>
                  </div>
                  {wishlist.length > 0 && (
                    <span className="bg-[#2874f0] text-white text-[11px] font-bold px-1.5 py-0.2 rounded-full">
                      {wishlist.length}
                    </span>
                  )}
                </Link>
                <Link
                  to="/account/rewards"
                  className="px-4 py-2.5 flex items-center gap-3 hover:bg-blue-50/60 hover:text-[#2874f0] transition-colors"
                >
                  <Gift className="w-4 h-4 text-[#2874f0]" />
                  <span>Rewards</span>
                </Link>
                <Link
                  to="/account/gift-cards"
                  className="px-4 py-2.5 flex items-center gap-3 hover:bg-blue-50/60 hover:text-[#2874f0] transition-colors"
                >
                  <CreditCard className="w-4 h-4 text-[#2874f0]" />
                  <span>Gift Cards</span>
                </Link>
                {isLoggedIn && (
                  <button
                    onClick={logout}
                    className="w-full text-left px-4 py-2.5 flex items-center gap-3 hover:bg-red-50 text-red-600 border-t border-gray-100 cursor-pointer"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Logout</span>
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Become a Seller */}
          <a
            href="#seller"
            onClick={(e) => {
              e.preventDefault();
              alert('Flipkart Seller Hub Portal (Mock)');
            }}
            className="hover:text-blue-100 transition-colors whitespace-nowrap"
          >
            Become a Seller
          </a>

          {/* More Dropdown */}
          <div className="relative group">
            <button className="flex items-center gap-1 hover:text-blue-100 transition-colors py-1 cursor-pointer">
              <span>More</span>
              <ChevronDown className="w-4 h-4 transition-transform group-hover:rotate-180" />
            </button>
            <div className="absolute top-full -left-4 hidden group-hover:block pt-2 w-[220px] z-50">
              <div className="bg-white text-[#212121] rounded-[2px] shadow-2xl border border-gray-100 py-1 text-[14px] font-normal">
                <div className="px-4 py-2.5 flex items-center gap-3 hover:bg-blue-50 cursor-pointer">
                  <Bell className="w-4 h-4 text-[#2874f0]" />
                  <span>Notification Preferences</span>
                </div>
                <div className="px-4 py-2.5 flex items-center gap-3 hover:bg-blue-50 cursor-pointer">
                  <HelpCircle className="w-4 h-4 text-[#2874f0]" />
                  <span>24x7 Customer Care</span>
                </div>
                <div className="px-4 py-2.5 flex items-center gap-3 hover:bg-blue-50 cursor-pointer">
                  <TrendingUp className="w-4 h-4 text-[#2874f0]" />
                  <span>Advertise</span>
                </div>
                <div className="px-4 py-2.5 flex items-center gap-3 hover:bg-blue-50 cursor-pointer">
                  <Download className="w-4 h-4 text-[#2874f0]" />
                  <span>Download App</span>
                </div>
              </div>
            </div>
          </div>

          {/* Cart Button */}
          <Link
            to="/cart"
            className="flex items-center gap-2 hover:text-blue-100 transition-colors py-1 relative"
          >
            <div className="relative">
              <ShoppingCart className="w-5 h-5 fill-current" />
              {itemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-[#ff6161] text-white text-[11px] font-bold px-1.5 py-0.2 rounded-full border border-white">
                  {itemCount}
                </span>
              )}
            </div>
            <span>Cart</span>
          </Link>
        </div>

        {/* Mobile Right Cart Icon */}
        <div className="flex md:hidden items-center gap-3 text-white">
          <Link to="/cart" className="relative p-1">
            <ShoppingCart className="w-6 h-6 fill-current" />
            {itemCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-[#ffe500] text-[#2874f0] text-[10px] font-black w-4 h-4 rounded-full flex items-center justify-center">
                {itemCount}
              </span>
            )}
          </Link>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 flex md:hidden">
          <div
            className="fixed inset-0 bg-black/50"
            onClick={() => setMobileMenuOpen(false)}
          />
          <div className="relative w-[80%] max-w-[300px] bg-white h-full shadow-2xl flex flex-col z-10">
            <div className="bg-[#2874f0] text-white p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-blue-700 flex items-center justify-center">
                  <User className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="font-semibold">{isLoggedIn ? user?.name : 'Welcome!'}</div>
                  <div className="text-[12px] text-blue-200">
                    {isLoggedIn ? user?.email : 'Login to explore more'}
                  </div>
                </div>
              </div>
              <button onClick={() => setMobileMenuOpen(false)} className="text-white p-1">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto py-2 divide-y divide-gray-100 text-[14px]">
              {!isLoggedIn ? (
                <div className="p-4">
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      openLoginModal();
                    }}
                    className="w-full bg-[#fb641b] text-white font-semibold py-2.5 rounded-[2px] shadow-sm uppercase tracking-wide"
                  >
                    Login / Sign Up
                  </button>
                </div>
              ) : null}

              <div className="py-2">
                <Link
                  to="/"
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-5 py-3 flex items-center gap-4 text-gray-700 hover:bg-gray-50"
                >
                  <Sparkles className="w-5 h-5 text-[#2874f0]" />
                  <span>Home</span>
                </Link>
                <Link
                  to="/account/orders"
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-5 py-3 flex items-center gap-4 text-gray-700 hover:bg-gray-50"
                >
                  <Package className="w-5 h-5 text-[#2874f0]" />
                  <span>My Orders</span>
                </Link>
                <Link
                  to="/cart"
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-5 py-3 flex items-center gap-4 text-gray-700 hover:bg-gray-50"
                >
                  <ShoppingCart className="w-5 h-5 text-[#2874f0]" />
                  <span>My Cart ({itemCount})</span>
                </Link>
                <Link
                  to="/account/wishlist"
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-5 py-3 flex items-center gap-4 text-gray-700 hover:bg-gray-50"
                >
                  <Heart className="w-5 h-5 text-[#2874f0]" />
                  <span>My Wishlist ({wishlist.length})</span>
                </Link>
                <Link
                  to="/account/rewards"
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-5 py-3 flex items-center gap-4 text-gray-700 hover:bg-gray-50"
                >
                  <Gift className="w-5 h-5 text-[#2874f0]" />
                  <span>Rewards &amp; SuperCoins</span>
                </Link>
                <Link
                  to="/account/gift-cards"
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-5 py-3 flex items-center gap-4 text-gray-700 hover:bg-gray-50"
                >
                  <CreditCard className="w-5 h-5 text-[#2874f0]" />
                  <span>Gift Cards</span>
                </Link>
                <Link
                  to="/account"
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-5 py-3 flex items-center gap-4 text-gray-700 hover:bg-gray-50"
                >
                  <User className="w-5 h-5 text-[#2874f0]" />
                  <span>My Account</span>
                </Link>
              </div>

              {isLoggedIn && (
                <div className="p-4">
                  <button
                    onClick={() => {
                      logout();
                      setMobileMenuOpen(false);
                    }}
                    className="w-full py-2 border border-red-500 text-red-600 font-semibold rounded-[2px]"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
