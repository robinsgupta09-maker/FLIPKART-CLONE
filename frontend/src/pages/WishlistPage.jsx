import React from 'react';
import { Link } from 'react-router-dom';
import { Trash2, Heart, ShoppingCart } from 'lucide-react';
import RatingBadge from '../components/RatingBadge';
import AssuredBadge from '../components/AssuredBadge';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';

export default function WishlistPage() {
  const { wishlist, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();

  const handleMoveToCart = (product) => {
    addToCart(product, 1);
    removeFromWishlist(product.id);
  };

  return (
    <div className="max-w-[1240px] mx-auto px-2 py-4 min-h-screen">
      <div className="flex flex-col md:flex-row gap-4 items-start">
        {/* Left Side Account Quick Links */}
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
              <Link to="/account/wishlist" className="text-[#2874f0] font-semibold block">
                My Wishlist ({wishlist.length})
              </Link>
            </li>
            <li>
              <Link to="/account/rewards" className="text-gray-600 hover:text-[#2874f0] block">
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

        {/* Right Main Wishlist Content */}
        <div className="flex-1 w-full bg-white rounded-[2px] shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-4 border-b border-gray-100">
            <h2 className="text-[17px] font-bold text-[#212121]">
              My Wishlist ({wishlist.length})
            </h2>
          </div>

          {wishlist.length === 0 ? (
            <div className="p-16 text-center space-y-4">
              <div className="w-20 h-20 bg-red-50 text-[#ff6161] rounded-full flex items-center justify-center mx-auto">
                <Heart className="w-10 h-10 fill-current" />
              </div>
              <h3 className="text-[18px] font-bold text-gray-800">Empty Wishlist</h3>
              <p className="text-[13px] text-gray-500">
                You have no items in your wishlist. Start adding!
              </p>
              <Link
                to="/"
                className="inline-block bg-[#2874f0] text-white text-[13px] font-bold px-8 py-2.5 rounded-[2px] uppercase shadow-sm"
              >
                Continue Shopping
              </Link>
            </div>
          ) : (
            <div className="divide-y divide-gray-100">
              {wishlist.map((prod) => (
                <div key={prod.id} className="p-4 flex flex-col md:flex-row items-center gap-6 group">
                  <Link
                    to={`/product/${prod.id}`}
                    className="w-24 h-24 shrink-0 flex items-center justify-center p-1 overflow-hidden rounded-[3px] bg-gray-50/50"
                  >
                    <img
                      src={prod.images?.[0]}
                      alt={prod.title}
                      className="w-full h-full object-cover rounded-[2px]"
                    />
                  </Link>

                  <div className="flex-1 space-y-1">
                    <Link
                      to={`/product/${prod.id}`}
                      className="text-[16px] font-medium text-[#212121] hover:text-[#2874f0] line-clamp-1"
                    >
                      {prod.title}
                    </Link>

                    <div className="flex items-center gap-2">
                      <RatingBadge rating={prod.rating} />
                      <span className="text-[12px] text-gray-400">
                        ({prod.ratingCount?.toLocaleString('en-IN')})
                      </span>
                      {prod.isAssured && <AssuredBadge className="scale-90" />}
                    </div>

                    <div className="flex items-baseline gap-2 pt-1">
                      <span className="text-[18px] font-bold text-[#212121]">
                        ₹{prod.price.toLocaleString('en-IN')}
                      </span>
                      {prod.originalPrice > prod.price && (
                        <>
                          <span className="text-[13px] text-[#878787] line-through">
                            ₹{prod.originalPrice.toLocaleString('en-IN')}
                          </span>
                          <span className="text-[13px] font-bold text-[#388e3c]">
                            {prod.discount}% off
                          </span>
                        </>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-4 shrink-0">
                    <button
                      onClick={() => handleMoveToCart(prod)}
                      className="bg-[#2874f0] hover:bg-[#1259c7] text-white text-[13px] font-bold px-5 py-2 rounded-[2px] uppercase tracking-wide flex items-center gap-1.5 cursor-pointer shadow-xs"
                    >
                      <ShoppingCart className="w-3.5 h-3.5" />
                      <span>Move to Cart</span>
                    </button>
                    <button
                      onClick={() => removeFromWishlist(prod.id)}
                      className="p-2 text-gray-400 hover:text-red-600 cursor-pointer"
                      title="Remove from wishlist"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
