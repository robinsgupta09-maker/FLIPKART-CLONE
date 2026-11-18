import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  CreditCard,
  Plus,
  ShieldCheck,
  CheckCircle2,
  Copy,
  Gift,
  Eye,
  EyeOff,
  Sparkles
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function GiftCardsPage() {
  const { giftCards, totalGiftCardBalance, applyGiftCard, buyGiftCard } = useAuth();

  const [activeTab, setActiveTab] = useState('manage'); // 'manage' or 'buy'
  const [cardNumberInput, setCardNumberInput] = useState('');
  const [pinInput, setPinInput] = useState('');
  const [revealedPins, setRevealedPins] = useState({});
  const [copiedText, setCopiedText] = useState('');
  const [toastMessage, setToastMessage] = useState('');

  // Buy Gift Card form
  const [buyAmount, setBuyAmount] = useState(1000);
  const [recipientEmail, setRecipientEmail] = useState('');
  const [recipientName, setRecipientName] = useState('');
  const [giftMessage, setGiftMessage] = useState('Best wishes from Flipkart!');
  const [selectedTheme, setSelectedTheme] = useState('Festive');

  const handleApplyGiftCard = (e) => {
    e.preventDefault();
    if (!cardNumberInput.trim() || !pinInput.trim()) {
      alert('Please enter both 16-digit Card Number and PIN.');
      return;
    }
    const res = applyGiftCard(cardNumberInput, pinInput);
    if (res.success) {
      setToastMessage(res.message);
      setCardNumberInput('');
      setPinInput('');
      setTimeout(() => setToastMessage(''), 3500);
    } else {
      alert(res.message);
    }
  };

  const handleBuyGiftCard = (e) => {
    e.preventDefault();
    if (!buyAmount || buyAmount <= 0) {
      alert('Please enter a valid amount');
      return;
    }
    const res = buyGiftCard(
      Number(buyAmount),
      recipientEmail || 'self@flipkart.demo',
      giftMessage
    );
    if (res.success) {
      setToastMessage(`Success! Purchased ₹${buyAmount} Flipkart Gift Card.`);
      setTimeout(() => setToastMessage(''), 3500);
      setActiveTab('manage');
    }
  };

  const togglePin = (id) => {
    setRevealedPins((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    setCopiedText(text);
    setTimeout(() => setCopiedText(''), 2000);
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
              <Link to="/account/rewards" className="text-gray-600 hover:text-[#2874f0] block">
                SuperCoin &amp; Rewards
              </Link>
            </li>
            <li>
              <Link to="/account/gift-cards" className="text-[#2874f0] font-semibold block">
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
          {/* Gift Card Wallet Balance Header */}
          <div className="bg-gradient-to-r from-[#0f1724] via-[#1a3461] to-[#2874f0] text-white p-6 rounded-[2px] shadow-sm flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden">
            <div className="space-y-2 z-10 text-center md:text-left">
              <span className="bg-[#ffe500] text-[#172337] text-[11px] font-black uppercase px-2.5 py-0.5 rounded-full inline-flex items-center gap-1 shadow-xs">
                <Sparkles className="w-3 h-3 fill-current" />
                Flipkart Digital Wallet
              </span>
              <h1 className="text-[26px] md:text-[30px] font-black tracking-tight">
                Flipkart Gift Cards
              </h1>
              <p className="text-[13px] text-blue-100 max-w-[480px]">
                Instant cash credit on 100% of products with seamless checkout and zero convenience fee.
              </p>
            </div>

            {/* Total Balance Card */}
            <div className="bg-white/10 backdrop-blur-md border border-white/20 p-4 rounded-[6px] text-center min-w-[200px] shrink-0 z-10">
              <div className="text-[12px] uppercase font-bold text-yellow-300 tracking-wider">
                Total Gift Card Balance
              </div>
              <div className="text-[34px] font-black text-white mt-1">
                ₹{totalGiftCardBalance.toLocaleString('en-IN')}
              </div>
              <div className="text-[11px] text-gray-200 mt-0.5">
                {giftCards.length} Active {giftCards.length === 1 ? 'Card' : 'Cards'}
              </div>
            </div>

            <div className="absolute -right-10 -bottom-10 w-48 h-48 bg-blue-500/20 rounded-full blur-2xl pointer-events-none" />
          </div>

          {/* Action Tabs */}
          <div className="bg-white rounded-[2px] shadow-sm border border-gray-100 p-2 flex items-center gap-4 text-[14px]">
            <button
              onClick={() => setActiveTab('manage')}
              className={`px-5 py-2 font-semibold rounded-[2px] transition-colors cursor-pointer ${
                activeTab === 'manage'
                  ? 'bg-[#2874f0] text-white shadow-xs'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              My Gift Cards &amp; Add Card
            </button>
            <button
              onClick={() => setActiveTab('buy')}
              className={`px-5 py-2 font-semibold rounded-[2px] transition-colors cursor-pointer ${
                activeTab === 'buy'
                  ? 'bg-[#2874f0] text-white shadow-xs'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              Buy a Gift Card
            </button>
          </div>

          {/* Tab 1: Manage & Add Gift Card */}
          {activeTab === 'manage' ? (
            <div className="space-y-4">
              {/* Add Card Form */}
              <div className="bg-white rounded-[2px] shadow-sm border border-gray-100 p-6 space-y-4">
                <h3 className="text-[16px] font-bold text-[#212121] flex items-center gap-2">
                  <Plus className="w-5 h-5 text-[#2874f0]" />
                  <span>Add a Gift Card to Account</span>
                </h3>
                <form
                  onSubmit={handleApplyGiftCard}
                  className="grid grid-cols-1 md:grid-cols-3 gap-4 text-[13px] pt-1"
                >
                  <input
                    type="text"
                    required
                    placeholder="16-Digit Card Number (e.g. FKGC-1234...)"
                    value={cardNumberInput}
                    onChange={(e) => setCardNumberInput(e.target.value)}
                    className="p-2.5 border border-gray-300 rounded font-mono uppercase outline-hidden focus:border-[#2874f0]"
                  />
                  <input
                    type="password"
                    maxLength={6}
                    required
                    placeholder="6-Digit PIN"
                    value={pinInput}
                    onChange={(e) => setPinInput(e.target.value)}
                    className="p-2.5 border border-gray-300 rounded font-mono outline-hidden focus:border-[#2874f0]"
                  />
                  <button
                    type="submit"
                    className="bg-[#2874f0] hover:bg-[#1259c7] text-white font-bold py-2.5 rounded-[2px] uppercase tracking-wide cursor-pointer shadow-sm transition-colors"
                  >
                    Apply Gift Card
                  </button>
                </form>
                <div className="text-[12px] text-gray-500">
                  Tip: Enter any 16-digit card number and 6-digit PIN to simulate adding gift card funds instantly!
                </div>
              </div>

              {/* Active Cards List */}
              <div className="bg-white rounded-[2px] shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-4 border-b border-gray-100 font-bold text-[16px] text-gray-800 flex justify-between items-center">
                  <span>Your Active Gift Cards ({giftCards.length})</span>
                  <span className="text-[13px] text-[#388e3c] font-bold">
                    Total: ₹{totalGiftCardBalance.toLocaleString('en-IN')}
                  </span>
                </div>

                <div className="divide-y divide-gray-100">
                  {giftCards.map((gc) => (
                    <div
                      key={gc.id}
                      className="p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-blue-50 text-[#2874f0] flex items-center justify-center shrink-0">
                          <CreditCard className="w-6 h-6" />
                        </div>
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="font-mono text-[15px] font-bold text-[#212121]">
                              {gc.cardNumber}
                            </span>
                            <button
                              onClick={() => handleCopy(gc.cardNumber)}
                              className="text-gray-400 hover:text-black cursor-pointer"
                              title="Copy Card Number"
                            >
                              <Copy className="w-3.5 h-3.5" />
                            </button>
                          </div>
                          <div className="text-[12px] text-gray-500 flex items-center gap-3">
                            <span>
                              PIN:{' '}
                              <b className="font-mono text-gray-800">
                                {revealedPins[gc.id] ? gc.pin : '••••••'}
                              </b>
                            </span>
                            <button
                              onClick={() => togglePin(gc.id)}
                              className="text-[#2874f0] hover:underline cursor-pointer flex items-center gap-1 text-[11px] font-semibold"
                            >
                              {revealedPins[gc.id] ? (
                                <>
                                  <EyeOff className="w-3 h-3" /> Hide PIN
                                </>
                              ) : (
                                <>
                                  <Eye className="w-3 h-3" /> Show PIN
                                </>
                              )}
                            </button>
                            <span>• Valid till {gc.expiry}</span>
                          </div>
                        </div>
                      </div>

                      <div className="text-left md:text-right space-y-0.5">
                        <div className="text-[20px] font-black text-[#388e3c]">
                          ₹{gc.balance.toLocaleString('en-IN')}
                        </div>
                        <div className="text-[11px] text-gray-400 font-semibold uppercase">
                          Available Balance
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            /* Tab 2: Buy a Gift Card Form */
            <div className="bg-white rounded-[2px] shadow-sm border border-gray-100 p-6 space-y-6">
              <div>
                <h3 className="text-[18px] font-bold text-[#212121]">
                  Purchase a Digital Gift Card
                </h3>
                <p className="text-[13px] text-gray-500 mt-1">
                  Gift your family and friends the freedom of shopping across millions of products.
                </p>
              </div>

              <form onSubmit={handleBuyGiftCard} className="space-y-6 max-w-[650px]">
                {/* Denominations */}
                <div className="space-y-2">
                  <label className="text-[13px] font-bold text-gray-700 block">
                    Select Amount (₹)
                  </label>
                  <div className="flex flex-wrap gap-3">
                    {[500, 1000, 2000, 5000].map((amt) => (
                      <button
                        type="button"
                        key={amt}
                        onClick={() => setBuyAmount(amt)}
                        className={`px-6 py-2.5 rounded-[2px] text-[14px] font-bold border cursor-pointer transition-all ${
                          buyAmount === amt
                            ? 'bg-[#2874f0] text-white border-[#2874f0] shadow-sm'
                            : 'border-gray-300 text-gray-700 hover:border-gray-500'
                        }`}
                      >
                        ₹{amt.toLocaleString('en-IN')}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Custom Amount */}
                <div>
                  <label className="text-[12px] text-gray-500 block mb-1">
                    Or Enter Custom Amount (₹250 - ₹10,000)
                  </label>
                  <input
                    type="number"
                    min={250}
                    max={10000}
                    value={buyAmount}
                    onChange={(e) => setBuyAmount(e.target.value)}
                    className="w-full max-w-[300px] p-2.5 border border-gray-300 rounded text-[14px] font-semibold outline-hidden focus:border-[#2874f0]"
                  />
                </div>

                {/* Occasion Theme */}
                <div className="space-y-2">
                  <label className="text-[13px] font-bold text-gray-700 block">
                    Choose Occasion Theme
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {['Festive', 'Birthday', 'Wedding', 'Congratulations', 'Thank You'].map(
                      (theme) => (
                        <button
                          type="button"
                          key={theme}
                          onClick={() => setSelectedTheme(theme)}
                          className={`px-4 py-1.5 rounded-[2px] text-[13px] font-medium border cursor-pointer ${
                            selectedTheme === theme
                              ? 'bg-blue-50 text-[#2874f0] border-[#2874f0] font-bold'
                              : 'border-gray-200 text-gray-600'
                          }`}
                        >
                          {theme}
                        </button>
                      )
                    )}
                  </div>
                </div>

                {/* Recipient Details */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-[13px]">
                  <div>
                    <label className="text-[12px] text-gray-500 block mb-1">
                      Recipient Name
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Priya Sharma"
                      value={recipientName}
                      onChange={(e) => setRecipientName(e.target.value)}
                      className="w-full p-2.5 border border-gray-300 rounded outline-hidden focus:border-[#2874f0]"
                    />
                  </div>
                  <div>
                    <label className="text-[12px] text-gray-500 block mb-1">
                      Recipient Email
                    </label>
                    <input
                      type="email"
                      placeholder="e.g. friend@example.com"
                      value={recipientEmail}
                      onChange={(e) => setRecipientEmail(e.target.value)}
                      className="w-full p-2.5 border border-gray-300 rounded outline-hidden focus:border-[#2874f0]"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[12px] text-gray-500 block mb-1">Gift Message</label>
                  <textarea
                    rows={2}
                    value={giftMessage}
                    onChange={(e) => setGiftMessage(e.target.value)}
                    className="w-full p-2.5 border border-gray-300 rounded text-[13px] outline-hidden focus:border-[#2874f0]"
                  />
                </div>

                <button
                  type="submit"
                  className="bg-[#fb641b] hover:bg-[#e0530e] text-white font-bold text-[15px] px-10 py-3.5 rounded-[2px] uppercase tracking-wide cursor-pointer shadow-md transition-colors"
                >
                  Pay ₹{Number(buyAmount || 0).toLocaleString('en-IN')} &amp; Issue Card
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
