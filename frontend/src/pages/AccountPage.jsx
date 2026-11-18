import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { User, Mail, Phone, MapPin, Shield } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function AccountPage() {
  const { user, savedAddresses } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(user?.name || 'Rahul Sharma');
  const [gender, setGender] = useState('Male');

  return (
    <div className="max-w-[1240px] mx-auto px-2 py-4 min-h-screen">
      <div className="flex flex-col md:flex-row gap-4 items-start">
        {/* Left Nav */}
        <div className="w-full md:w-[260px] bg-white rounded-[2px] shadow-sm border border-gray-100 p-4 space-y-4 shrink-0">
          <div className="flex items-center gap-3 border-b border-gray-100 pb-4">
            <div className="w-12 h-12 rounded-full bg-[#2874f0] text-white flex items-center justify-center font-bold text-[18px]">
              {name.charAt(0)}
            </div>
            <div>
              <div className="text-[12px] text-gray-500">Hello,</div>
              <div className="font-bold text-[15px] text-[#212121]">{name}</div>
            </div>
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
              <Link to="/account" className="text-[#2874f0] font-semibold block">
                Profile Information
              </Link>
            </li>
          </ul>
        </div>

        {/* Right Main Profile */}
        <div className="flex-1 w-full bg-white rounded-[2px] shadow-sm border border-gray-100 p-6 space-y-8">
          {/* Personal Information */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-[18px] font-bold text-[#212121]">Personal Information</h2>
              <button
                onClick={() => setIsEditing(!isEditing)}
                className="text-[#2874f0] text-[14px] font-semibold hover:underline cursor-pointer"
              >
                {isEditing ? 'Cancel' : 'Edit'}
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-[500px]">
              <div>
                <label className="text-[12px] text-gray-500 block mb-1">Full Name</label>
                <input
                  type="text"
                  disabled={!isEditing}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full p-2.5 border border-gray-300 rounded text-[14px] disabled:bg-gray-50 disabled:text-gray-700 outline-hidden focus:border-[#2874f0]"
                />
              </div>

              <div>
                <label className="text-[12px] text-gray-500 block mb-1">Your Gender</label>
                <div className="flex items-center gap-4 mt-2">
                  <label className="flex items-center gap-2 text-[14px] cursor-pointer">
                    <input
                      type="radio"
                      name="gender"
                      disabled={!isEditing}
                      checked={gender === 'Male'}
                      onChange={() => setGender('Male')}
                      className="text-[#2874f0]"
                    />
                    <span>Male</span>
                  </label>
                  <label className="flex items-center gap-2 text-[14px] cursor-pointer">
                    <input
                      type="radio"
                      name="gender"
                      disabled={!isEditing}
                      checked={gender === 'Female'}
                      onChange={() => setGender('Female')}
                      className="text-[#2874f0]"
                    />
                    <span>Female</span>
                  </label>
                </div>
              </div>
            </div>

            {isEditing && (
              <button
                onClick={() => setIsEditing(false)}
                className="bg-[#2874f0] text-white px-6 py-2 rounded text-[13px] font-bold uppercase cursor-pointer"
              >
                Save Changes
              </button>
            )}
          </div>

          {/* Email Address */}
          <div className="space-y-3 pt-6 border-t border-gray-100">
            <h3 className="text-[16px] font-bold text-[#212121]">Email Address</h3>
            <div className="max-w-[400px]">
              <input
                type="email"
                disabled
                value={user?.email || 'customer@flipkart.demo'}
                className="w-full p-2.5 border border-gray-300 rounded text-[14px] bg-gray-50 text-gray-700"
              />
            </div>
          </div>

          {/* Mobile Number */}
          <div className="space-y-3 pt-6 border-t border-gray-100">
            <h3 className="text-[16px] font-bold text-[#212121]">Mobile Number</h3>
            <div className="max-w-[400px]">
              <input
                type="tel"
                disabled
                value={`+91 ${user?.phone || '9876543210'}`}
                className="w-full p-2.5 border border-gray-300 rounded text-[14px] bg-gray-50 text-gray-700"
              />
            </div>
          </div>

          {/* Saved Addresses Summary */}
          <div className="space-y-3 pt-6 border-t border-gray-100">
            <h3 className="text-[16px] font-bold text-[#212121]">Manage Addresses</h3>
            <div className="space-y-2">
              {savedAddresses.map((addr) => (
                <div key={addr.id} className="p-3 border border-gray-200 rounded-[2px] text-[13px] text-gray-700">
                  <div className="font-semibold text-black">{addr.name} ({addr.addressType})</div>
                  <div>{addr.address}, {addr.locality}, {addr.city}, {addr.state} - {addr.pincode}</div>
                  <div className="text-gray-500 mt-0.5">Phone: {addr.phone}</div>
                </div>
              ))}
            </div>
          </div>

          {/* FAQs */}
          <div className="pt-6 border-t border-gray-100 text-[13px] text-gray-600 space-y-2">
            <h4 className="font-bold text-[#212121]">FAQs</h4>
            <p><b>What happens when I update my email address (or mobile number)?</b><br />Your login credentials will be updated immediately across Flipkart services.</p>
            <p><b>When will my Flipkart account be updated with the new email address (or mobile number)?</b><br />It happens in real-time as soon as you confirm the verification OTP.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
