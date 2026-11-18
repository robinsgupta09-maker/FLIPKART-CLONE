import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  ShieldCheck,
  Plus,
  Minus,
  ShoppingCart,
  Trash2,
  Heart,
  MapPin,
  X,
  CheckCircle2
} from 'lucide-react';
import AssuredBadge from '../components/AssuredBadge';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

export default function CartPage() {
  const navigate = useNavigate();
  const {
    cartItems,
    savedForLater,
    itemCount,
    totalOriginalPrice,
    totalPrice,
    totalDiscount,
    deliveryCharges,
    packagingFee,
    finalTotal,
    totalSavings,
    updateQuantity,
    removeFromCart,
    saveForLater,
    moveToCart,
    removeFromSavedForLater
  } = useCart();

  const {
    user,
    isLoggedIn,
    openLoginModal,
    savedAddresses,
    selectedAddressId,
    setSelectedAddressId,
    addAddress
  } = useAuth();

  const [addressModalOpen, setAddressModalOpen] = useState(false);
  const [showNewAddressForm, setShowNewAddressForm] = useState(false);
  const [newAddress, setNewAddress] = useState({
    name: '',
    phone: '',
    pincode: '',
    locality: '',
    address: '',
    city: '',
    state: '',
    landmark: '',
    addressType: 'HOME'
  });

  const currentAddress =
    savedAddresses.find((a) => a.id === selectedAddressId) || savedAddresses[0];

  const handlePlaceOrder = () => {
    if (!isLoggedIn) {
      openLoginModal();
    } else {
      navigate('/checkout');
    }
  };

  const handleSaveNewAddress = (e) => {
    e.preventDefault();
    if (!newAddress.name || !newAddress.phone || !newAddress.pincode || !newAddress.address) {
      alert('Please fill all required address fields.');
      return;
    }
    const created = addAddress(newAddress);
    setSelectedAddressId(created.id);
    setShowNewAddressForm(false);
  };

  if (cartItems.length === 0 && savedForLater.length === 0) {
    return (
      <div className="max-w-[1240px] mx-auto px-4 py-12 min-h-[60vh] flex flex-col items-center justify-center text-center">
        <div className="w-48 h-48 bg-white rounded-full flex items-center justify-center shadow-sm mb-6 border border-gray-100">
          <ShoppingCart className="w-24 h-24 text-[#2874f0]/40 stroke-[1.2]" />
        </div>
        <h2 className="text-[20px] font-semibold text-[#212121]">Your cart is empty!</h2>
        <p className="text-[14px] text-[#878787] mt-1 mb-6">
          Explore our wide range of products and discover great deals.
        </p>
        <Link
          to="/"
          className="bg-[#2874f0] hover:bg-[#1259c7] text-white font-semibold text-[14px] px-10 py-3 rounded-[2px] shadow-sm uppercase tracking-wide transition-colors"
        >
          Shop Now
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-[1240px] mx-auto px-2 py-4 min-h-screen">
      <div className="flex flex-col lg:flex-row gap-4 items-start">
        {/* Left Column: Delivery Strip & Cart Items */}
        <div className="flex-1 w-full space-y-3">
          {/* Deliver To Strip */}
          <div className="bg-white p-4 rounded-[2px] shadow-sm border border-gray-100 flex items-center justify-between">
            <div className="text-[14px] flex items-start gap-3">
              <MapPin className="w-5 h-5 text-[#2874f0] shrink-0 mt-0.5" />
              <div>
                <div>
                  <span className="text-gray-500">Deliver to: </span>
                  <span className="font-bold text-[#212121]">
                    {currentAddress?.name}, {currentAddress?.pincode}
                  </span>
                  <span className="ml-2 bg-gray-100 text-gray-700 text-[11px] font-bold px-1.5 py-0.2 rounded uppercase">
                    {currentAddress?.addressType || 'HOME'}
                  </span>
                </div>
                <div className="text-[13px] text-gray-600 mt-0.5 truncate max-w-[500px]">
                  {currentAddress?.address}, {currentAddress?.locality}, {currentAddress?.city}
                </div>
              </div>
            </div>
            <button
              onClick={() => setAddressModalOpen(true)}
              className="text-[#2874f0] border border-gray-300 px-4 py-1.5 rounded-[2px] text-[13px] font-bold hover:bg-blue-50 cursor-pointer uppercase transition-colors"
            >
              Change
            </button>
          </div>

          {/* Cart Items List */}
          <div className="bg-white rounded-[2px] shadow-sm border border-gray-100 divide-y divide-gray-100">
            {cartItems.map(({ product, quantity }) => (
              <div key={product.id} className="p-4 md:p-6 flex flex-col md:flex-row gap-6">
                {/* Image and Quantity Controls */}
                <div className="flex md:flex-col items-center gap-4 shrink-0">
                  <Link
                    to={`/product/${product.id}`}
                    className="w-24 h-24 flex items-center justify-center p-1 overflow-hidden rounded-[3px] bg-gray-50/50"
                  >
                    <img
                      src={product.images?.[0]}
                      alt={product.title}
                      className="w-full h-full object-cover rounded-[2px]"
                    />
                  </Link>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => updateQuantity(product.id, -1)}
                      className="w-7 h-7 rounded-full border border-gray-300 flex items-center justify-center text-gray-600 hover:bg-gray-100 font-bold cursor-pointer"
                      title="Decrease quantity"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="w-9 py-0.5 border border-gray-300 text-center text-[14px] font-semibold rounded-xs">
                      {quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(product.id, 1)}
                      className="w-7 h-7 rounded-full border border-gray-300 flex items-center justify-center text-gray-600 hover:bg-gray-100 font-bold cursor-pointer"
                      title="Increase quantity"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Details */}
                <div className="flex-1 space-y-2">
                  <Link
                    to={`/product/${product.id}`}
                    className="text-[16px] font-medium text-[#212121] hover:text-[#2874f0] line-clamp-2"
                  >
                    {product.title}
                  </Link>
                  <div className="text-[12px] text-[#878787] flex items-center gap-2">
                    <span>Seller: {product.seller?.name || 'SuperComNet'}</span>
                    {product.isAssured && <AssuredBadge className="scale-90" />}
                  </div>

                  <div className="flex items-baseline gap-2 pt-1">
                    <span className="text-[18px] font-bold text-[#212121]">
                      ₹{(product.price * quantity).toLocaleString('en-IN')}
                    </span>
                    {product.originalPrice > product.price && (
                      <>
                        <span className="text-[13px] text-[#878787] line-through">
                          ₹{(product.originalPrice * quantity).toLocaleString('en-IN')}
                        </span>
                        <span className="text-[13px] font-bold text-[#388e3c]">
                          {product.discount}% Off
                        </span>
                      </>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-6 pt-3 text-[14px] font-semibold">
                    <button
                      onClick={() => saveForLater(product.id)}
                      className="text-[#212121] hover:text-[#2874f0] uppercase tracking-wide cursor-pointer"
                    >
                      Save For Later
                    </button>
                    <button
                      onClick={() => removeFromCart(product.id)}
                      className="text-[#212121] hover:text-[#2874f0] uppercase tracking-wide cursor-pointer"
                    >
                      Remove
                    </button>
                  </div>
                </div>

                {/* Delivery Estimate */}
                <div className="text-[13px] text-gray-600 shrink-0 text-left md:text-right">
                  Delivery by Tomorrow | <span className="text-[#388e3c] font-semibold">Free</span>
                </div>
              </div>
            ))}

            {/* Sticky / Bottom Place Order Action Bar */}
            {cartItems.length > 0 && (
              <div className="p-4 bg-white flex justify-end shadow-[0_-2px_10px_0_rgba(0,0,0,0.06)]">
                <button
                  onClick={handlePlaceOrder}
                  className="bg-[#fb641b] hover:bg-[#e0530e] text-white font-bold text-[15px] px-12 py-3.5 rounded-[2px] uppercase tracking-wide shadow-md cursor-pointer transition-colors"
                >
                  Place Order
                </button>
              </div>
            )}
          </div>

          {/* Saved For Later Section */}
          {savedForLater.length > 0 && (
            <div className="bg-white rounded-[2px] shadow-sm border border-gray-100 overflow-hidden">
              <div className="p-4 border-b border-gray-200 font-semibold text-[16px] text-gray-800">
                Saved For Later ({savedForLater.length})
              </div>
              <div className="divide-y divide-gray-100">
                {savedForLater.map(({ product }) => (
                  <div key={product.id} className="p-4 flex flex-col md:flex-row gap-6 items-center">
                    <div className="w-20 h-20 shrink-0 flex items-center justify-center">
                      <img
                        src={product.images?.[0]}
                        alt={product.title}
                        className="max-h-full max-w-full object-contain"
                      />
                    </div>
                    <div className="flex-1 space-y-1">
                      <h4 className="text-[15px] font-medium text-gray-800 line-clamp-1">
                        {product.title}
                      </h4>
                      <div className="text-[16px] font-bold text-black">
                        ₹{product.price.toLocaleString('en-IN')}
                      </div>
                      <div className="flex items-center gap-6 pt-2 text-[13px] font-semibold">
                        <button
                          onClick={() => moveToCart(product.id)}
                          className="text-[#2874f0] hover:underline uppercase"
                        >
                          Move To Cart
                        </button>
                        <button
                          onClick={() => removeFromSavedForLater(product.id)}
                          className="text-gray-500 hover:text-red-600 uppercase"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Column: Price Details */}
        <div className="w-full lg:w-[360px] shrink-0 sticky top-20">
          <div className="bg-white rounded-[2px] shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-4 border-b border-gray-200">
              <h3 className="text-[14px] font-bold text-[#878787] uppercase tracking-wider">
                Price Details
              </h3>
            </div>

            <div className="p-4 space-y-3.5 text-[14px] text-gray-800 border-b border-gray-200">
              <div className="flex justify-between">
                <span>Price ({itemCount} {itemCount === 1 ? 'item' : 'items'})</span>
                <span>₹{totalOriginalPrice.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between">
                <span>Discount</span>
                <span className="text-[#388e3c] font-semibold">
                  - ₹{totalDiscount.toLocaleString('en-IN')}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Delivery Charges</span>
                <span className="text-[#388e3c] font-semibold">
                  {deliveryCharges === 0 ? 'FREE' : `₹${deliveryCharges}`}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Secured Packaging Fee</span>
                <span>₹{packagingFee}</span>
              </div>
            </div>

            <div className="p-4 border-b border-gray-200 flex justify-between items-center text-[17px] font-bold text-[#212121]">
              <span>Total Amount</span>
              <span>₹{finalTotal.toLocaleString('en-IN')}</span>
            </div>

            {totalSavings > 0 && (
              <div className="p-3.5 bg-green-50/70 text-[#388e3c] text-[13px] font-bold text-center">
                You will save ₹{totalSavings.toLocaleString('en-IN')} on this order
              </div>
            )}
          </div>

          {/* Safe & Secure Guarantee */}
          <div className="mt-4 flex items-center gap-3 text-gray-500 text-[12px] p-3">
            <ShieldCheck className="w-7 h-7 text-[#878787] shrink-0" />
            <p>
              Safe and Secure Payments. Easy returns. 100% Authentic products.
            </p>
          </div>
        </div>
      </div>

      {/* DELIVERY ADDRESS SELECTION MODAL */}
      {addressModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 animate-in fade-in">
          <div className="relative w-full max-w-[700px] max-h-[85vh] bg-white rounded-[2px] shadow-2xl flex flex-col overflow-hidden">
            {/* Modal Header */}
            <div className="bg-[#2874f0] text-white p-4 flex items-center justify-between">
              <div className="flex items-center gap-2 font-bold text-[16px]">
                <MapPin className="w-5 h-5 text-yellow-300" />
                <span>Select Delivery Address</span>
              </div>
              <button
                onClick={() => setAddressModalOpen(false)}
                className="text-white hover:text-gray-200 cursor-pointer p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 overflow-y-auto space-y-4">
              {/* Address List */}
              <div className="space-y-3">
                {savedAddresses.map((addr) => (
                  <label
                    key={addr.id}
                    className={`block p-4 border rounded-[2px] cursor-pointer transition-colors ${
                      selectedAddressId === addr.id
                        ? 'border-[#2874f0] bg-blue-50/20 ring-1 ring-[#2874f0]'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <input
                        type="radio"
                        name="cartAddressSelect"
                        checked={selectedAddressId === addr.id}
                        onChange={() => setSelectedAddressId(addr.id)}
                        className="mt-1 w-4 h-4 text-[#2874f0] cursor-pointer"
                      />
                      <div className="flex-1 text-[14px] space-y-1">
                        <div className="flex items-center gap-3">
                          <span className="font-bold text-[#212121]">{addr.name}</span>
                          <span className="bg-gray-100 text-gray-700 text-[11px] font-bold px-1.5 py-0.2 rounded uppercase">
                            {addr.addressType}
                          </span>
                          <span className="font-semibold text-gray-800">{addr.phone}</span>
                        </div>
                        <p className="text-gray-600 leading-relaxed">
                          {addr.address}, {addr.locality}, {addr.city}, {addr.state} -{' '}
                          <span className="font-semibold">{addr.pincode}</span>
                        </p>
                      </div>
                    </div>
                  </label>
                ))}
              </div>

              {/* Add New Address Form or Trigger */}
              {!showNewAddressForm ? (
                <button
                  type="button"
                  onClick={() => setShowNewAddressForm(true)}
                  className="flex items-center gap-2 text-[#2874f0] font-bold text-[14px] py-2 hover:underline cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add a new delivery address</span>
                </button>
              ) : (
                <form
                  onSubmit={handleSaveNewAddress}
                  className="border border-gray-200 p-5 rounded-[2px] bg-gray-50/50 space-y-4 text-[13px]"
                >
                  <div className="font-bold text-[15px] text-[#212121]">Add New Delivery Address</div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <input
                      type="text"
                      required
                      placeholder="Full Name"
                      value={newAddress.name}
                      onChange={(e) => setNewAddress({ ...newAddress, name: e.target.value })}
                      className="p-2.5 border border-gray-300 rounded bg-white outline-hidden focus:border-[#2874f0]"
                    />
                    <input
                      type="tel"
                      required
                      maxLength={10}
                      placeholder="10-digit mobile number"
                      value={newAddress.phone}
                      onChange={(e) => setNewAddress({ ...newAddress, phone: e.target.value })}
                      className="p-2.5 border border-gray-300 rounded bg-white outline-hidden focus:border-[#2874f0]"
                    />
                    <input
                      type="text"
                      required
                      maxLength={6}
                      placeholder="Pincode"
                      value={newAddress.pincode}
                      onChange={(e) => setNewAddress({ ...newAddress, pincode: e.target.value })}
                      className="p-2.5 border border-gray-300 rounded bg-white outline-hidden focus:border-[#2874f0]"
                    />
                    <input
                      type="text"
                      required
                      placeholder="Locality"
                      value={newAddress.locality}
                      onChange={(e) => setNewAddress({ ...newAddress, locality: e.target.value })}
                      className="p-2.5 border border-gray-300 rounded bg-white outline-hidden focus:border-[#2874f0]"
                    />
                    <textarea
                      required
                      rows={2}
                      placeholder="Address (Area and Street)"
                      value={newAddress.address}
                      onChange={(e) => setNewAddress({ ...newAddress, address: e.target.value })}
                      className="p-2.5 border border-gray-300 rounded bg-white outline-hidden focus:border-[#2874f0] md:col-span-2"
                    />
                    <input
                      type="text"
                      required
                      placeholder="City/District/Town"
                      value={newAddress.city}
                      onChange={(e) => setNewAddress({ ...newAddress, city: e.target.value })}
                      className="p-2.5 border border-gray-300 rounded bg-white outline-hidden focus:border-[#2874f0]"
                    />
                    <input
                      type="text"
                      required
                      placeholder="State"
                      value={newAddress.state}
                      onChange={(e) => setNewAddress({ ...newAddress, state: e.target.value })}
                      className="p-2.5 border border-gray-300 rounded bg-white outline-hidden focus:border-[#2874f0]"
                    />
                  </div>

                  <div className="flex items-center gap-3 pt-2">
                    <button
                      type="submit"
                      className="bg-[#2874f0] text-white font-bold px-6 py-2 rounded-[2px] uppercase cursor-pointer"
                    >
                      Save and Select
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowNewAddressForm(false)}
                      className="text-gray-500 hover:underline cursor-pointer"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              )}
            </div>

            {/* Modal Footer */}
            <div className="p-4 bg-gray-50 border-t border-gray-200 flex justify-end gap-3">
              <button
                onClick={() => setAddressModalOpen(false)}
                className="bg-[#fb641b] hover:bg-[#e0530e] text-white font-bold text-[14px] px-8 py-2.5 rounded-[2px] uppercase tracking-wide cursor-pointer shadow-sm transition-colors"
              >
                Deliver to this Address
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
