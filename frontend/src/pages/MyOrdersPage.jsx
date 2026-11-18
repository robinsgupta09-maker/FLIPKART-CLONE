import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Search,
  Star,
  Package,
  MapPin,
  CreditCard,
  ChevronRight,
  ExternalLink,
  CheckCircle2
} from 'lucide-react';
import { fetchOrders } from '../services/api';

export default function MyOrdersPage() {
  const [orders, setOrders] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders()
      .then(setOrders)
      .finally(() => setLoading(false));
  }, []);

  const filteredOrders = orders.filter((order) => {
    const s = search.toLowerCase();
    return (
      order.orderId?.toLowerCase().includes(s) ||
      order.shippingAddress?.name?.toLowerCase().includes(s) ||
      order.shippingAddress?.city?.toLowerCase().includes(s) ||
      order.items?.some((it) => it.title?.toLowerCase().includes(s))
    );
  });

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
              <Link to="/account/orders" className="text-[#2874f0] font-semibold block">
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
              <Link to="/account" className="text-gray-600 hover:text-[#2874f0] block">
                Profile Information
              </Link>
            </li>
          </ul>
        </div>

        {/* Right Main Orders List */}
        <div className="flex-1 w-full space-y-3">
          {/* Search bar */}
          <div className="bg-white p-3 rounded-[2px] shadow-sm border border-gray-100 flex items-center">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search your orders here (by Product, Order ID or City)"
              className="flex-1 text-[14px] outline-hidden px-2 text-[#212121]"
            />
            <button className="bg-[#2874f0] text-white px-5 py-2 rounded-[2px] text-[13px] font-semibold flex items-center gap-1.5 cursor-pointer">
              <Search className="w-4 h-4" />
              <span>Search Orders</span>
            </button>
          </div>

          {/* Orders list */}
          {loading ? (
            <div className="p-12 text-center text-gray-400">Loading orders...</div>
          ) : filteredOrders.length === 0 ? (
            <div className="bg-white p-12 rounded-[2px] shadow-sm border border-gray-100 text-center space-y-4">
              <Package className="w-16 h-16 text-gray-300 mx-auto" />
              <h3 className="text-[18px] font-bold text-gray-800">No Orders Found</h3>
              <p className="text-[13px] text-gray-500">
                Looks like you haven't placed an order yet or no orders match your search.
              </p>
              <Link
                to="/"
                className="inline-block bg-[#2874f0] text-white text-[13px] font-bold px-8 py-2.5 rounded-[2px] uppercase"
              >
                Start Shopping
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredOrders.map((order) => {
                const addr = order.shippingAddress || {};
                return (
                  <div
                    key={order.orderId}
                    className="bg-white rounded-[2px] shadow-sm border border-gray-200 hover:border-gray-300 hover:shadow-md transition-all overflow-hidden"
                  >
                    {/* Order Card Top Bar */}
                    <div className="bg-gray-50/70 px-5 py-3 border-b border-gray-200 flex flex-wrap items-center justify-between gap-3 text-[12px] text-gray-600">
                      <div className="flex items-center gap-4 flex-wrap">
                        <div>
                          <span className="text-gray-400 uppercase font-semibold">Order ID: </span>
                          <span className="font-mono font-bold text-gray-900">{order.orderId}</span>
                        </div>
                        <div className="hidden sm:block text-gray-300">•</div>
                        <div>
                          <span className="text-gray-400 uppercase font-semibold">Order Date: </span>
                          <span className="font-medium text-gray-800">
                            {new Date(order.createdAt).toLocaleDateString('en-IN', {
                              day: 'numeric',
                              month: 'short',
                              year: 'numeric'
                            })}
                          </span>
                        </div>
                        <div className="hidden sm:block text-gray-300">•</div>
                        <div>
                          <span className="text-gray-400 uppercase font-semibold">Total: </span>
                          <span className="font-bold text-[#212121]">
                            ₹{order.totalAmount?.toLocaleString('en-IN')}
                          </span>
                        </div>
                      </div>

                      <Link
                        to={`/account/orders/${order.orderId}`}
                        className="text-[#2874f0] font-bold hover:underline flex items-center gap-1 text-[13px]"
                      >
                        <span>View Order Details</span>
                        <ChevronRight className="w-4 h-4" />
                      </Link>
                    </div>

                    {/* Ordered Items */}
                    <div className="p-5 divide-y divide-gray-100">
                      {order.items?.map((it, idx) => (
                        <div
                          key={idx}
                          className="py-4 first:pt-0 last:pb-0 flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
                        >
                          <div className="flex items-center gap-4 flex-1">
                            <Link
                              to={`/account/orders/${order.orderId}`}
                              className="w-16 h-16 bg-gray-50 rounded-[2px] p-1 border border-gray-100 flex items-center justify-center shrink-0"
                            >
                              <img
                                src={it.image}
                                alt={it.title}
                                className="w-full h-full object-contain"
                              />
                            </Link>
                            <div>
                              <Link
                                to={`/account/orders/${order.orderId}`}
                                className="text-[14px] font-medium text-gray-900 hover:text-[#2874f0] line-clamp-2"
                              >
                                {it.title}
                              </Link>
                              <div className="text-[12px] text-gray-500 mt-1 flex items-center gap-2">
                                <span>Qty: {it.quantity}</span>
                                <span>•</span>
                                <span>Seller: {it.sellerName || 'Flipkart Seller'}</span>
                              </div>
                            </div>
                          </div>

                          <div className="text-[15px] font-bold text-gray-900 w-28 text-left md:text-right">
                            ₹{(it.price * it.quantity).toLocaleString('en-IN')}
                          </div>

                          <div className="w-56 text-left md:text-right space-y-1">
                            <div className="flex items-center gap-2 md:justify-end text-[13px] font-bold text-[#212121]">
                              <span className="w-2.5 h-2.5 rounded-full bg-[#388e3c] inline-block" />
                              <span>{order.status || 'Order Confirmed'}</span>
                            </div>
                            <div className="text-[12px] text-gray-500">
                              {order.expectedDelivery || 'Expected within 2-4 business days'}
                            </div>
                            <button
                              type="button"
                              onClick={() => alert('Rate and review submitted!')}
                              className="text-[#2874f0] text-[12px] font-bold flex items-center gap-1 md:justify-end hover:underline pt-1 cursor-pointer"
                            >
                              <Star className="w-3.5 h-3.5 fill-[#2874f0]" />
                              <span>Rate &amp; Review Product</span>
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Delivery Address & Payment Summary Footer */}
                    <div className="bg-gray-50/50 px-5 py-3 border-t border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-[12px]">
                      <div className="flex items-start sm:items-center gap-2 text-gray-700">
                        <MapPin className="w-3.5 h-3.5 text-[#2874f0] shrink-0 mt-0.5 sm:mt-0" />
                        <div>
                          <span className="font-semibold text-gray-900">
                            Delivering to {addr.name || 'Customer'}:
                          </span>{' '}
                          <span className="text-gray-600">
                            {addr.address ? `${addr.address}, ${addr.city} (${addr.pincode})` : 'Bengaluru, Karnataka'}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-1 text-gray-700 bg-white px-2.5 py-1 rounded border border-gray-200">
                          <CreditCard className="w-3.5 h-3.5 text-[#388e3c]" />
                          <span>
                            Payment: <strong className="text-gray-900">{order.paymentMethod || 'UPI'}</strong>
                          </span>
                          <CheckCircle2 className="w-3 h-3 text-[#388e3c] ml-0.5" />
                        </div>
                        <Link
                          to={`/account/orders/${order.orderId}`}
                          className="text-[#2874f0] font-semibold hover:underline"
                        >
                          Details →
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
