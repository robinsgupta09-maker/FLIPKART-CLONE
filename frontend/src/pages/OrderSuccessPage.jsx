import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { CheckCircle2, Package, ArrowRight, Home } from 'lucide-react';
import { fetchOrderById } from '../services/api';

export default function OrderSuccessPage() {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    fetchOrderById(orderId)
      .then(setOrder)
      .catch((err) => console.error(err));
  }, [orderId]);

  return (
    <div className="max-w-[800px] mx-auto px-4 py-12 min-h-[70vh]">
      <div className="bg-white rounded-[2px] shadow-sm border border-gray-100 p-8 text-center space-y-6">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto text-[#388e3c]">
          <CheckCircle2 className="w-12 h-12" />
        </div>

        <div>
          <h1 className="text-[24px] font-bold text-[#212121]">
            Order Placed Successfully!
          </h1>
          <p className="text-[14px] text-gray-500 mt-1">
            Thank you for shopping with Flipkart. We are getting your items ready.
          </p>
          <div className="inline-block mt-3 bg-gray-100 px-4 py-1.5 rounded-[2px] text-[13px] font-mono font-semibold text-gray-800">
            Order ID: {orderId}
          </div>
        </div>

        {order && (
          <div className="border-t border-b border-gray-100 py-6 text-left space-y-4">
            <div className="text-[14px]">
              <span className="text-gray-500">Delivering to: </span>
              <span className="font-semibold text-gray-800">
                {order.shippingAddress?.name}, {order.shippingAddress?.city} (
                {order.shippingAddress?.pincode})
              </span>
            </div>

            <div className="space-y-3 pt-2">
              <span className="text-[12px] font-bold text-gray-400 uppercase tracking-wider block">
                Items in this order:
              </span>
              {order.items?.map((it, idx) => (
                <div key={idx} className="flex items-center gap-4 text-[14px]">
                  <img src={it.image} alt={it.title} className="w-12 h-12 object-contain" />
                  <div className="flex-1">
                    <div className="font-medium text-gray-800 line-clamp-1">{it.title}</div>
                    <div className="text-[12px] text-gray-500">Qty: {it.quantity}</div>
                  </div>
                  <div className="font-bold text-black">
                    ₹{(it.price * it.quantity).toLocaleString('en-IN')}
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-3 flex justify-between text-[15px] font-bold border-t border-gray-100">
              <span>Total Paid:</span>
              <span className="text-[#388e3c]">₹{order.totalAmount?.toLocaleString('en-IN')}</span>
            </div>
          </div>
        )}

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
          <Link
            to={`/account/orders/${orderId}`}
            className="w-full sm:w-auto bg-[#fb641b] hover:bg-[#e0530e] text-white font-bold text-[14px] px-8 py-3 rounded-[2px] shadow-sm uppercase tracking-wide flex items-center justify-center gap-2"
          >
            <Package className="w-4 h-4" />
            <span>Track &amp; View Order</span>
          </Link>
          <Link
            to="/account/orders"
            className="w-full sm:w-auto bg-[#2874f0] hover:bg-[#1259c7] text-white font-semibold text-[14px] px-8 py-3 rounded-[2px] shadow-sm uppercase tracking-wide flex items-center justify-center gap-2"
          >
            <Package className="w-4 h-4" />
            <span>View All Orders</span>
          </Link>
          <Link
            to="/"
            className="w-full sm:w-auto border border-gray-300 text-gray-700 hover:bg-gray-50 font-semibold text-[14px] px-8 py-3 rounded-[2px] uppercase tracking-wide flex items-center justify-center gap-2"
          >
            <Home className="w-4 h-4" />
            <span>Continue Shopping</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
