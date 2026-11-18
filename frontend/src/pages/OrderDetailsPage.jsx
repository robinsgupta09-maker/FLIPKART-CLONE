import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  Package,
  MapPin,
  CreditCard,
  CheckCircle2,
  Clock,
  Truck,
  Download,
  HelpCircle,
  Star,
  ChevronRight,
  ArrowLeft,
  Printer,
  ShieldCheck,
  Building
} from 'lucide-react';
import { fetchOrderById } from '../services/api';
import AssuredBadge from '../components/AssuredBadge';

export default function OrderDetailsPage() {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showInvoiceModal, setShowInvoiceModal] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetchOrderById(orderId)
      .then(setOrder)
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, [orderId]);

  if (loading) {
    return (
      <div className="max-w-[1240px] mx-auto px-4 py-12 text-center text-gray-500 min-h-[60vh]">
        <div className="animate-pulse space-y-4 max-w-2xl mx-auto">
          <div className="h-6 bg-gray-200 rounded w-1/3 mx-auto"></div>
          <div className="h-32 bg-gray-200 rounded"></div>
          <div className="h-64 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="max-w-[1240px] mx-auto px-4 py-16 text-center space-y-4">
        <Package className="w-16 h-16 text-gray-400 mx-auto" />
        <h2 className="text-[20px] font-bold text-gray-800">Order Not Found</h2>
        <p className="text-gray-500 text-[14px]">The requested order ID could not be retrieved.</p>
        <Link
          to="/account/orders"
          className="inline-block bg-[#2874f0] text-white px-6 py-2.5 rounded-[2px] font-semibold text-[13px] uppercase"
        >
          Back to Orders
        </Link>
      </div>
    );
  }

  const orderDateFormatted = new Date(order.createdAt).toLocaleDateString('en-IN', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });

  const address = order.shippingAddress || {};

  return (
    <div className="max-w-[1240px] mx-auto px-2 md:px-4 py-4 min-h-screen">
      {/* Breadcrumb Navigation */}
      <div className="flex items-center gap-1.5 text-[12px] text-gray-500 mb-3">
        <Link to="/" className="hover:text-[#2874f0]">Home</Link>
        <ChevronRight className="w-3 h-3 text-gray-400" />
        <Link to="/account" className="hover:text-[#2874f0]">My Account</Link>
        <ChevronRight className="w-3 h-3 text-gray-400" />
        <Link to="/account/orders" className="hover:text-[#2874f0]">My Orders</Link>
        <ChevronRight className="w-3 h-3 text-gray-400" />
        <span className="font-semibold text-gray-800 font-mono">{order.orderId}</span>
      </div>

      <div className="space-y-4">
        {/* Top Header Card */}
        <div className="bg-white rounded-[2px] shadow-sm border border-gray-100 p-4 md:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[13px] text-gray-500">Order ID:</span>
              <span className="font-mono font-bold text-[14px] text-gray-900">{order.orderId}</span>
            </div>
            <div className="text-[12px] text-gray-500 mt-1">
              Placed on: <span className="font-medium text-gray-800">{orderDateFormatted}</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowInvoiceModal(true)}
              className="border border-[#2874f0] text-[#2874f0] hover:bg-blue-50 px-4 py-2 rounded-[2px] text-[13px] font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Download className="w-4 h-4" />
              <span>Download Invoice</span>
            </button>
            <Link
              to="/account/orders"
              className="border border-gray-300 text-gray-700 hover:bg-gray-50 px-4 py-2 rounded-[2px] text-[13px] font-medium flex items-center gap-1.5 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>All Orders</span>
            </Link>
          </div>
        </div>

        {/* 2-Column: Delivery Address (Left) & Price/Payment (Right) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Delivery Address Card (2 Cols on md) */}
          <div className="md:col-span-2 bg-white rounded-[2px] shadow-sm border border-gray-100 p-5 space-y-3">
            <div className="flex items-center gap-2 border-b border-gray-100 pb-3">
              <MapPin className="w-4 h-4 text-[#2874f0]" />
              <h3 className="font-bold text-[14px] text-[#212121] uppercase tracking-wider">
                Delivery Address
              </h3>
            </div>
            <div className="text-[14px] space-y-1">
              <div className="flex items-center gap-3">
                <span className="font-bold text-[#212121] text-[15px]">{address.name}</span>
                <span className="bg-gray-200 text-gray-700 text-[11px] font-bold px-1.5 py-0.2 rounded uppercase">
                  {address.addressType || 'HOME'}
                </span>
              </div>
              <p className="text-gray-700 leading-relaxed pt-1">
                {address.address}, {address.locality}, {address.city}, {address.state} -{' '}
                <span className="font-semibold text-gray-900">{address.pincode}</span>
              </p>
              {address.landmark && (
                <p className="text-[13px] text-gray-500">
                  <span className="font-medium">Landmark:</span> {address.landmark}
                </p>
              )}
              <p className="text-[13px] text-gray-800 pt-1">
                <span className="font-medium text-gray-500">Phone number:</span>{' '}
                <span className="font-semibold">{address.phone}</span>
              </p>
            </div>
          </div>

          {/* Payment & Total Amount Card */}
          <div className="bg-white rounded-[2px] shadow-sm border border-gray-100 p-5 space-y-3">
            <div className="flex items-center gap-2 border-b border-gray-100 pb-3">
              <CreditCard className="w-4 h-4 text-[#2874f0]" />
              <h3 className="font-bold text-[14px] text-[#212121] uppercase tracking-wider">
                Payment Details
              </h3>
            </div>
            <div className="text-[13px] space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Payment Mode:</span>
                <span className="font-semibold text-[#212121] bg-blue-50 px-2 py-0.5 rounded text-[12px] border border-blue-100">
                  {order.paymentMethod || 'UPI / Card'}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Payment Status:</span>
                <span className="text-[#388e3c] font-bold flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>{order.paymentStatus || 'Completed'}</span>
                </span>
              </div>
              <div className="flex justify-between items-center pt-1 border-t border-gray-100">
                <span className="text-gray-600">Delivery Charges:</span>
                <span className="text-[#388e3c] font-semibold uppercase">Free</span>
              </div>
              {order.discountAmount > 0 && (
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Total Discount:</span>
                  <span className="text-[#388e3c] font-semibold">
                    -₹{order.discountAmount.toLocaleString('en-IN')}
                  </span>
                </div>
              )}
              <div className="flex justify-between items-center pt-2 border-t border-gray-200 text-[15px] font-bold text-[#212121]">
                <span>Total Amount:</span>
                <span>₹{order.totalAmount?.toLocaleString('en-IN')}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Items and Tracking Timeline Section */}
        <div className="bg-white rounded-[2px] shadow-sm border border-gray-100 divide-y divide-gray-100">
          <div className="p-4 bg-gray-50/50 border-b border-gray-100 flex items-center justify-between">
            <span className="font-bold text-[14px] text-gray-800 uppercase tracking-wider">
              Ordered Items ({order.items?.length || 0})
            </span>
            <span className="text-[12px] text-gray-500">
              Delivery by courier partner (Ekart Logistics)
            </span>
          </div>

          {order.items?.map((item, idx) => (
            <div key={idx} className="p-5 md:p-6 flex flex-col lg:flex-row gap-6 items-start">
              {/* Product Info */}
              <div className="flex gap-4 flex-1">
                <Link
                  to={`/product/${item.productId}`}
                  className="w-20 h-20 shrink-0 p-1 bg-gray-50 rounded-[2px] flex items-center justify-center border border-gray-100 overflow-hidden"
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-contain"
                  />
                </Link>

                <div className="space-y-1.5">
                  <Link
                    to={`/product/${item.productId}`}
                    className="text-[15px] font-medium text-[#212121] hover:text-[#2874f0] line-clamp-2"
                  >
                    {item.title}
                  </Link>
                  <div className="text-[12px] text-gray-500 flex items-center gap-2">
                    <span>Seller: {item.sellerName || 'TREASURE MINT'}</span>
                    <AssuredBadge className="scale-75 origin-left" />
                  </div>
                  <div className="flex items-center gap-3 pt-1">
                    <span className="text-[16px] font-bold text-[#212121]">
                      ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                    </span>
                    <span className="text-[12px] text-gray-500">Qty: {item.quantity}</span>
                    {item.originalPrice > item.price && (
                      <span className="text-[12px] text-[#388e3c] font-bold">
                        ₹{(item.originalPrice - item.price).toLocaleString('en-IN')} Saved
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Flipkart Signature Delivery Tracker */}
              <div className="w-full lg:w-[420px] pt-2 lg:pt-0">
                <div className="relative pl-6 lg:pl-0">
                  {/* Step indicators */}
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between relative gap-6 lg:gap-0">
                    {/* Connecting line desktop */}
                    <div className="hidden lg:block absolute top-[9px] left-[10%] right-[10%] h-[3px] bg-gray-200 -z-0">
                      <div className="w-1/3 h-full bg-[#388e3c]"></div>
                    </div>

                    {/* Step 1: Confirmed */}
                    <div className="flex lg:flex-col items-center gap-3 lg:gap-1 text-left lg:text-center z-10">
                      <div className="w-5 h-5 rounded-full bg-[#388e3c] text-white flex items-center justify-center text-[10px]">
                        ✓
                      </div>
                      <div>
                        <div className="text-[12px] font-bold text-[#212121]">Order Confirmed</div>
                        <div className="text-[11px] text-gray-500">{orderDateFormatted}</div>
                      </div>
                    </div>

                    {/* Step 2: Shipped */}
                    <div className="flex lg:flex-col items-center gap-3 lg:gap-1 text-left lg:text-center z-10">
                      <div className="w-5 h-5 rounded-full bg-[#388e3c] text-white flex items-center justify-center text-[10px]">
                        ✓
                      </div>
                      <div>
                        <div className="text-[12px] font-bold text-[#212121]">Shipped</div>
                        <div className="text-[11px] text-gray-500">In Transit</div>
                      </div>
                    </div>

                    {/* Step 3: Out for Delivery */}
                    <div className="flex lg:flex-col items-center gap-3 lg:gap-1 text-left lg:text-center z-10">
                      <div className="w-5 h-5 rounded-full bg-gray-200 border-2 border-white flex items-center justify-center text-[10px]">
                      </div>
                      <div>
                        <div className="text-[12px] font-medium text-gray-500">Out For Delivery</div>
                        <div className="text-[11px] text-gray-400">Expected soon</div>
                      </div>
                    </div>

                    {/* Step 4: Delivery */}
                    <div className="flex lg:flex-col items-center gap-3 lg:gap-1 text-left lg:text-center z-10">
                      <div className="w-5 h-5 rounded-full bg-gray-200 border-2 border-white flex items-center justify-center text-[10px]">
                      </div>
                      <div>
                        <div className="text-[12px] font-medium text-gray-500">Delivery</div>
                        <div className="text-[11px] text-gray-400">Within 2-4 days</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Sub Action buttons */}
                <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between text-[12px] font-semibold text-[#2874f0]">
                  <button
                    onClick={() => alert('Review submitted for: ' + item.title)}
                    className="flex items-center gap-1 hover:underline cursor-pointer"
                  >
                    <Star className="w-3.5 h-3.5 fill-[#2874f0]" />
                    <span>Rate &amp; Review Product</span>
                  </button>
                  <button
                    onClick={() => alert('Support executive will connect shortly.')}
                    className="flex items-center gap-1 text-gray-600 hover:text-[#2874f0] cursor-pointer"
                  >
                    <HelpCircle className="w-3.5 h-3.5" />
                    <span>Need Help?</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Realistic Printable Invoice Modal */}
      {showInvoiceModal && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-[2px] shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 md:p-8 space-y-6">
            <div className="flex items-center justify-between border-b pb-4">
              <div className="flex items-center gap-2">
                <span className="text-[#2874f0] font-black text-[22px] italic tracking-tight">
                  Flipkart
                </span>
                <span className="text-[12px] bg-yellow-400 text-black px-1.5 font-bold italic rounded-xs">
                  Plus
                </span>
              </div>
              <div className="text-right">
                <div className="text-[14px] font-bold text-gray-800">TAX INVOICE</div>
                <div className="text-[11px] text-gray-500 font-mono">Invoice #: FK-INV-{order.orderId}</div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6 text-[12px]">
              <div>
                <span className="font-bold text-gray-700 block uppercase">Sold By:</span>
                <p className="text-gray-600">SuperComNet Retail Pvt. Ltd.</p>
                <p className="text-gray-600">Outer Ring Road, Devarabeesanahalli</p>
                <p className="text-gray-600">Bengaluru, Karnataka - 560103</p>
                <p className="text-gray-600 font-mono">GSTIN: 29AABCS1429B1Z0</p>
              </div>

              <div>
                <span className="font-bold text-gray-700 block uppercase">Billing / Shipping Address:</span>
                <p className="font-semibold text-gray-800">{address.name} ({address.addressType || 'HOME'})</p>
                <p className="text-gray-600">{address.address}, {address.locality}</p>
                <p className="text-gray-600">{address.city}, {address.state} - {address.pincode}</p>
                <p className="text-gray-600">Phone: {address.phone}</p>
              </div>
            </div>

            <div className="border border-gray-200 rounded-[2px] overflow-hidden">
              <table className="w-full text-[12px] text-left">
                <thead className="bg-gray-100 text-gray-700 font-bold border-b border-gray-200">
                  <tr>
                    <th className="p-2.5">Item Description</th>
                    <th className="p-2.5 text-center">Qty</th>
                    <th className="p-2.5 text-right">Gross Amount</th>
                    <th className="p-2.5 text-right">Total</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {order.items?.map((it, idx) => (
                    <tr key={idx}>
                      <td className="p-2.5 font-medium text-gray-800">
                        {it.title}
                        <div className="text-[10px] text-gray-400 font-mono">SKU: {it.productId}</div>
                      </td>
                      <td className="p-2.5 text-center">{it.quantity}</td>
                      <td className="p-2.5 text-right font-mono">₹{it.price.toLocaleString('en-IN')}</td>
                      <td className="p-2.5 text-right font-mono font-bold">
                        ₹{(it.price * it.quantity).toLocaleString('en-IN')}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="flex justify-between items-start text-[13px] border-t pt-4">
              <div className="text-[12px] text-gray-500 space-y-1">
                <div>Payment Method: <span className="font-semibold text-gray-700">{order.paymentMethod}</span></div>
                <div>Status: <span className="font-semibold text-[#388e3c]">COMPLETED</span></div>
              </div>
              <div className="text-right space-y-1">
                <div className="text-gray-600">Total Tax (18% GST Incl.): ₹{Math.round(order.totalAmount * 0.15).toLocaleString('en-IN')}</div>
                <div className="text-[16px] font-bold text-gray-900 font-mono">
                  Final Total: ₹{order.totalAmount?.toLocaleString('en-IN')}
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-2 border-t">
              <button
                onClick={() => window.print()}
                className="bg-[#2874f0] text-white px-5 py-2 rounded-[2px] text-[13px] font-semibold flex items-center gap-1.5"
              >
                <Printer className="w-4 h-4" />
                <span>Print Invoice</span>
              </button>
              <button
                onClick={() => setShowInvoiceModal(false)}
                className="border border-gray-300 text-gray-700 px-5 py-2 rounded-[2px] text-[13px] font-semibold"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
