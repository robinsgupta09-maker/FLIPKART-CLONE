import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle2, Plus, ShieldCheck, CreditCard, Smartphone, Building, Banknote } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { createOrder } from '../services/api';

export default function CheckoutPage() {
  const navigate = useNavigate();
  const { user, savedAddresses, selectedAddressId, setSelectedAddressId, addAddress } = useAuth();
  const { cartItems, finalTotal, totalDiscount, deliveryCharges, packagingFee, clearCart } = useCart();

  const [activeStep, setActiveStep] = useState(2); // Step 1 is Login (already authenticated), Step 2 = Address, Step 3 = Summary, Step 4 = Payment
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

  const [paymentMethod, setPaymentMethod] = useState('UPI');
  const [cardDetails, setCardDetails] = useState({ number: '', expiry: '', cvv: '' });
  const [upiId, setUpiId] = useState('user@okhdfcbank');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const selectedAddress = savedAddresses.find((a) => a.id === selectedAddressId) || savedAddresses[0];

  const handleAddNewAddress = (e) => {
    e.preventDefault();
    if (!newAddress.name || !newAddress.phone || !newAddress.pincode || !newAddress.address) {
      alert('Please fill in all required address fields.');
      return;
    }
    const created = addAddress(newAddress);
    setShowNewAddressForm(false);
    setSelectedAddressId(created.id);
  };

  const handleConfirmOrder = async () => {
    if (!selectedAddress) {
      alert('Please select a delivery address');
      return;
    }
    setIsSubmitting(true);
    try {
      const orderPayload = {
        items: cartItems.map(({ product, quantity }) => ({
          productId: product.id,
          title: product.title,
          price: product.price,
          originalPrice: product.originalPrice,
          image: product.images?.[0] || '',
          quantity: quantity,
          sellerName: product.seller?.name || 'SuperComNet'
        })),
        totalAmount: finalTotal,
        discountAmount: totalDiscount,
        deliveryFee: deliveryCharges,
        shippingAddress: selectedAddress,
        paymentMethod: paymentMethod,
        paymentStatus: 'COMPLETED'
      };

      const res = await createOrder(orderPayload);
      clearCart();
      navigate(`/order-success/${res.orderId}`);
    } catch (err) {
      alert('Failed to place order. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-[1240px] mx-auto px-2 py-6 min-h-screen">
      <div className="flex flex-col lg:flex-row gap-6 items-start">
        {/* Left 4 Accordion Steps */}
        <div className="flex-1 w-full space-y-4">
          {/* STEP 1: LOGIN */}
          <div className="bg-white rounded-[2px] shadow-sm border border-gray-200 overflow-hidden">
            <div className="p-4 flex items-center justify-between bg-white border-b border-gray-100">
              <div className="flex items-center gap-3">
                <span className="w-6 h-6 rounded-xs bg-[#2874f0] text-white text-[12px] font-bold flex items-center justify-center">
                  1
                </span>
                <span className="text-[14px] font-bold text-[#878787] uppercase tracking-wider">
                  Login
                </span>
                <CheckCircle2 className="w-4 h-4 text-[#388e3c]" />
              </div>
            </div>
            <div className="px-12 py-3 bg-gray-50/50 text-[14px] text-gray-700 flex items-center justify-between">
              <div>
                <span className="font-semibold">{user?.name || 'Customer'}</span>
                <span className="text-gray-500 ml-2">+{user?.phone || '9876543210'}</span>
              </div>
            </div>
          </div>

          {/* STEP 2: DELIVERY ADDRESS */}
          <div className="bg-white rounded-[2px] shadow-sm border border-gray-200 overflow-hidden">
            <div
              onClick={() => setActiveStep(2)}
              className="p-4 flex items-center justify-between bg-white border-b border-gray-100 cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <span
                  className={`w-6 h-6 rounded-xs text-[12px] font-bold flex items-center justify-center ${
                    activeStep === 2 ? 'bg-[#2874f0] text-white' : 'bg-gray-200 text-gray-700'
                  }`}
                >
                  2
                </span>
                <span className="text-[14px] font-bold text-[#878787] uppercase tracking-wider">
                  Delivery Address
                </span>
                {activeStep > 2 && <CheckCircle2 className="w-4 h-4 text-[#388e3c]" />}
              </div>
              {activeStep > 2 && (
                <button
                  type="button"
                  className="text-[#2874f0] text-[13px] font-semibold border border-gray-300 px-4 py-1 rounded-[2px] hover:bg-blue-50"
                >
                  Change
                </button>
              )}
            </div>

            {activeStep === 2 ? (
              <div className="p-6 space-y-4">
                {/* Saved addresses */}
                <div className="space-y-3">
                  {savedAddresses.map((addr) => (
                    <label
                      key={addr.id}
                      className={`block p-4 border rounded-[2px] cursor-pointer transition-colors ${
                        selectedAddressId === addr.id
                          ? 'border-[#2874f0] bg-blue-50/20'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <input
                          type="radio"
                          name="addressRadio"
                          checked={selectedAddressId === addr.id}
                          onChange={() => setSelectedAddressId(addr.id)}
                          className="mt-1 w-4 h-4 text-[#2874f0] cursor-pointer"
                        />
                        <div className="text-[14px] space-y-1">
                          <div className="flex items-center gap-3">
                            <span className="font-bold text-[#212121]">{addr.name}</span>
                            <span className="bg-gray-200 text-gray-700 text-[11px] font-bold px-1.5 py-0.2 rounded uppercase">
                              {addr.addressType}
                            </span>
                            <span className="font-semibold text-gray-800">{addr.phone}</span>
                          </div>
                          <p className="text-gray-600">
                            {addr.address}, {addr.locality}, {addr.city}, {addr.state} -{' '}
                            <span className="font-semibold">{addr.pincode}</span>
                          </p>
                          {selectedAddressId === addr.id && (
                            <button
                              type="button"
                              onClick={() => setActiveStep(3)}
                              className="mt-3 bg-[#fb641b] hover:bg-[#e0530e] text-white text-[13px] font-bold px-8 py-2.5 rounded-[2px] uppercase tracking-wide cursor-pointer shadow-sm"
                            >
                              Deliver Here
                            </button>
                          )}
                        </div>
                      </div>
                    </label>
                  ))}
                </div>

                {/* Add new address toggle */}
                {!showNewAddressForm ? (
                  <button
                    type="button"
                    onClick={() => setShowNewAddressForm(true)}
                    className="flex items-center gap-2 text-[#2874f0] text-[14px] font-semibold py-2 hover:underline cursor-pointer"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add a new address</span>
                  </button>
                ) : (
                  <form
                    onSubmit={handleAddNewAddress}
                    className="border border-gray-200 p-5 rounded-[2px] bg-gray-50/40 space-y-4"
                  >
                    <div className="text-[14px] font-bold text-gray-800">Add New Address</div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-[13px]">
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
                        placeholder="Address (Area and Street)"
                        value={newAddress.address}
                        onChange={(e) => setNewAddress({ ...newAddress, address: e.target.value })}
                        className="p-2.5 border border-gray-300 rounded bg-white outline-hidden focus:border-[#2874f0] md:col-span-2"
                        rows={2}
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

                    <div className="flex items-center gap-4 pt-2">
                      <button
                        type="submit"
                        className="bg-[#2874f0] text-white text-[13px] font-bold px-6 py-2 rounded-[2px] uppercase cursor-pointer"
                      >
                        Save and Deliver Here
                      </button>
                      <button
                        type="button"
                        onClick={() => setShowNewAddressForm(false)}
                        className="text-gray-500 text-[13px] hover:underline cursor-pointer"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                )}
              </div>
            ) : (
              <div className="px-12 py-3 bg-gray-50/50 text-[14px] text-gray-700">
                <span className="font-semibold">{selectedAddress?.name}</span> -{' '}
                {selectedAddress?.address}, {selectedAddress?.city} ({selectedAddress?.pincode})
              </div>
            )}
          </div>

          {/* STEP 3: ORDER SUMMARY */}
          <div className="bg-white rounded-[2px] shadow-sm border border-gray-200 overflow-hidden">
            <div
              onClick={() => activeStep > 2 && setActiveStep(3)}
              className="p-4 flex items-center justify-between bg-white border-b border-gray-100 cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <span
                  className={`w-6 h-6 rounded-xs text-[12px] font-bold flex items-center justify-center ${
                    activeStep === 3 ? 'bg-[#2874f0] text-white' : 'bg-gray-200 text-gray-700'
                  }`}
                >
                  3
                </span>
                <span className="text-[14px] font-bold text-[#878787] uppercase tracking-wider">
                  Order Summary
                </span>
                {activeStep > 3 && <CheckCircle2 className="w-4 h-4 text-[#388e3c]" />}
              </div>
            </div>

            {activeStep === 3 && (
              <div className="p-6 space-y-4">
                <div className="divide-y divide-gray-100">
                  {cartItems.map(({ product, quantity }) => (
                    <div key={product.id} className="py-4 flex gap-4 items-center">
                      <img
                        src={product.images?.[0]}
                        alt={product.title}
                        className="w-16 h-16 object-contain shrink-0"
                      />
                      <div className="flex-1 text-[14px]">
                        <div className="font-medium text-[#212121] line-clamp-1">{product.title}</div>
                        <div className="text-[12px] text-gray-500">Qty: {quantity}</div>
                        <div className="text-[15px] font-bold text-black mt-1">
                          ₹{(product.price * quantity).toLocaleString('en-IN')}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                  <span className="text-[13px] text-gray-500">
                    Order confirmation email will be sent to <b>{user?.email || 'customer@flipkart.demo'}</b>
                  </span>
                  <button
                    onClick={() => setActiveStep(4)}
                    className="bg-[#fb641b] hover:bg-[#e0530e] text-white text-[14px] font-bold px-10 py-3 rounded-[2px] uppercase tracking-wide cursor-pointer shadow-sm"
                  >
                    Continue
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* STEP 4: PAYMENT OPTIONS */}
          <div className="bg-white rounded-[2px] shadow-sm border border-gray-200 overflow-hidden">
            <div className="p-4 flex items-center gap-3 bg-white border-b border-gray-100">
              <span
                className={`w-6 h-6 rounded-xs text-[12px] font-bold flex items-center justify-center ${
                  activeStep === 4 ? 'bg-[#2874f0] text-white' : 'bg-gray-200 text-gray-700'
                }`}
              >
                4
              </span>
              <span className="text-[14px] font-bold text-[#878787] uppercase tracking-wider">
                Payment Options
              </span>
            </div>

            {activeStep === 4 && (
              <div className="p-6 space-y-4">
                {/* Payment Option Radios */}
                <div className="space-y-3">
                  {/* UPI */}
                  <label className="block p-4 border rounded-[2px] cursor-pointer hover:border-[#2874f0]">
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="payMethod"
                        checked={paymentMethod === 'UPI'}
                        onChange={() => setPaymentMethod('UPI')}
                        className="w-4 h-4 text-[#2874f0]"
                      />
                      <Smartphone className="w-5 h-5 text-[#2874f0]" />
                      <div className="font-semibold text-[14px] text-gray-800">
                        UPI (Google Pay / PhonePe / Paytm / BHIM)
                      </div>
                    </div>
                    {paymentMethod === 'UPI' && (
                      <div className="mt-3 pl-7">
                        <input
                          type="text"
                          value={upiId}
                          onChange={(e) => setUpiId(e.target.value)}
                          placeholder="Enter UPI ID (e.g. mobile@upi)"
                          className="w-full max-w-[320px] p-2 border border-gray-300 rounded text-[13px] outline-hidden focus:border-[#2874f0]"
                        />
                      </div>
                    )}
                  </label>

                  {/* Credit/Debit Card */}
                  <label className="block p-4 border rounded-[2px] cursor-pointer hover:border-[#2874f0]">
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="payMethod"
                        checked={paymentMethod === 'CARD'}
                        onChange={() => setPaymentMethod('CARD')}
                        className="w-4 h-4 text-[#2874f0]"
                      />
                      <CreditCard className="w-5 h-5 text-[#2874f0]" />
                      <div className="font-semibold text-[14px] text-gray-800">
                        Credit / Debit / ATM Card
                      </div>
                    </div>
                    {paymentMethod === 'CARD' && (
                      <div className="mt-3 pl-7 grid grid-cols-2 md:grid-cols-3 gap-3 text-[13px]">
                        <input
                          type="text"
                          maxLength={19}
                          placeholder="Card Number (Dummy)"
                          value={cardDetails.number}
                          onChange={(e) => setCardDetails({ ...cardDetails, number: e.target.value })}
                          className="col-span-2 p-2 border border-gray-300 rounded outline-hidden"
                        />
                        <input
                          type="text"
                          placeholder="MM / YY"
                          value={cardDetails.expiry}
                          onChange={(e) => setCardDetails({ ...cardDetails, expiry: e.target.value })}
                          className="p-2 border border-gray-300 rounded outline-hidden"
                        />
                        <input
                          type="password"
                          maxLength={3}
                          placeholder="CVV"
                          value={cardDetails.cvv}
                          onChange={(e) => setCardDetails({ ...cardDetails, cvv: e.target.value })}
                          className="p-2 border border-gray-300 rounded outline-hidden"
                        />
                      </div>
                    )}
                  </label>

                  {/* Net Banking */}
                  <label className="block p-4 border rounded-[2px] cursor-pointer hover:border-[#2874f0]">
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="payMethod"
                        checked={paymentMethod === 'NETBANKING'}
                        onChange={() => setPaymentMethod('NETBANKING')}
                        className="w-4 h-4 text-[#2874f0]"
                      />
                      <Building className="w-5 h-5 text-[#2874f0]" />
                      <div className="font-semibold text-[14px] text-gray-800">Net Banking</div>
                    </div>
                  </label>

                  {/* Cash On Delivery */}
                  <label className="block p-4 border rounded-[2px] cursor-pointer hover:border-[#2874f0]">
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="payMethod"
                        checked={paymentMethod === 'COD'}
                        onChange={() => setPaymentMethod('COD')}
                        className="w-4 h-4 text-[#2874f0]"
                      />
                      <Banknote className="w-5 h-5 text-[#388e3c]" />
                      <div className="font-semibold text-[14px] text-gray-800">
                        Cash on Delivery (Pay at Doorstep)
                      </div>
                    </div>
                  </label>
                </div>

                <div className="pt-4 border-t border-gray-100 flex justify-end">
                  <button
                    onClick={handleConfirmOrder}
                    disabled={isSubmitting}
                    className="bg-[#fb641b] hover:bg-[#e0530e] text-white font-bold text-[15px] px-12 py-3.5 rounded-[2px] uppercase tracking-wide cursor-pointer shadow-md transition-colors disabled:opacity-50"
                  >
                    {isSubmitting ? 'Processing Payment...' : `Pay ₹${finalTotal.toLocaleString('en-IN')}`}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Sticky Column: Price Details */}
        <div className="w-full lg:w-[360px] shrink-0 sticky top-20">
          <div className="bg-white rounded-[2px] shadow-sm border border-gray-200 overflow-hidden">
            <div className="p-4 border-b border-gray-200">
              <h3 className="text-[14px] font-bold text-[#878787] uppercase tracking-wider">
                Price Details
              </h3>
            </div>
            <div className="p-4 space-y-3.5 text-[14px] text-gray-800 border-b border-gray-200">
              <div className="flex justify-between">
                <span>Total Items</span>
                <span>{cartItems.length}</span>
              </div>
              <div className="flex justify-between">
                <span>Discount</span>
                <span className="text-[#388e3c] font-semibold">
                  - ₹{totalDiscount.toLocaleString('en-IN')}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Delivery Charges</span>
                <span className="text-[#388e3c] font-semibold">FREE</span>
              </div>
              <div className="flex justify-between">
                <span>Secured Packaging Fee</span>
                <span>₹{packagingFee}</span>
              </div>
            </div>
            <div className="p-4 flex justify-between items-center text-[18px] font-bold text-[#212121]">
              <span>Amount Payable</span>
              <span>₹{finalTotal.toLocaleString('en-IN')}</span>
            </div>
          </div>

          <div className="mt-4 flex items-center gap-3 text-gray-500 text-[12px] p-2">
            <ShieldCheck className="w-6 h-6 text-[#878787] shrink-0" />
            <p>100% Safe and Secure Payment with Mock Gateway.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
