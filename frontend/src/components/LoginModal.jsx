import React, { useState } from 'react';
import { X, ShieldCheck } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { sendOtp, verifyOtp } from '../services/api';

export default function LoginModal() {
  const { loginModalOpen, closeLoginModal, login } = useAuth();
  const [phoneOrEmail, setPhoneOrEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [step, setStep] = useState(1); // 1 = enter phone/email, 2 = enter otp
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [demoOtpHint, setDemoOtpHint] = useState('');

  if (!loginModalOpen) return null;

  const handleRequestOtp = async (e) => {
    e.preventDefault();
    if (!phoneOrEmail.trim()) {
      setError('Please enter a valid Mobile Number or Email ID');
      return;
    }
    setError('');
    setLoading(true);
    try {
      const res = await sendOtp(phoneOrEmail);
      if (res.success) {
        setDemoOtpHint(res.dummyOtp || '123456');
        setStep(2);
      } else {
        setError(res.message || 'Failed to send OTP');
      }
    } catch (err) {
      setError('Connection error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    if (!otp.trim()) {
      setError('Please enter the 6-digit OTP');
      return;
    }
    setError('');
    setLoading(true);
    try {
      const res = await verifyOtp(phoneOrEmail, otp);
      if (res.success) {
        login(res.user, res.token);
        // Reset modal state
        setStep(1);
        setPhoneOrEmail('');
        setOtp('');
      } else {
        setError('Invalid OTP. Please check and try again.');
      }
    } catch (err) {
      setError('Verification failed. Please retry.');
    } finally {
      setLoading(false);
    }
  };

  const resetAndClose = () => {
    setStep(1);
    setPhoneOrEmail('');
    setOtp('');
    setError('');
    closeLoginModal();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 animate-in fade-in duration-200">
      <div className="relative w-full max-w-[850px] min-h-[520px] bg-white rounded-xs shadow-2xl flex flex-col md:flex-row overflow-hidden">
        {/* Close Button */}
        <button
          onClick={resetAndClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-black z-10 p-1 cursor-pointer"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Left Blue Column */}
        <div className="md:w-[40%] bg-[#2874f0] p-8 text-white flex flex-col justify-between">
          <div>
            <h2 className="text-[28px] font-semibold tracking-tight">Login</h2>
            <p className="mt-4 text-[16px] text-[#db7be] leading-relaxed text-blue-100 font-normal">
              Get access to your Orders, Wishlist and Recommendations
            </p>
          </div>
          <div className="hidden md:flex justify-center pb-8">
            {/* Flipkart style illustrated login graphic */}
            <div className="w-36 h-36 rounded-full bg-blue-600/50 flex items-center justify-center border-4 border-blue-400/30">
              <ShieldCheck className="w-20 h-20 text-[#ffe500]" />
            </div>
          </div>
        </div>

        {/* Right Form Column */}
        <div className="md:w-[60%] p-8 md:p-10 flex flex-col justify-between bg-white">
          {step === 1 ? (
            <form onSubmit={handleRequestOtp} className="space-y-6">
              <div className="relative pt-4">
                <input
                  type="text"
                  required
                  value={phoneOrEmail}
                  onChange={(e) => setPhoneOrEmail(e.target.value)}
                  placeholder="Enter Email/Mobile number"
                  className="w-full border-b border-gray-300 py-2.5 text-[15px] text-[#212121] outline-hidden focus:border-[#2874f0] transition-colors"
                />
              </div>

              {error && <p className="text-[13px] text-red-600">{error}</p>}

              <p className="text-[12px] text-[#878787] leading-relaxed">
                By continuing, you agree to Flipkart's{' '}
                <a href="#" className="text-[#2874f0] hover:underline">
                  Terms of Use
                </a>{' '}
                and{' '}
                <a href="#" className="text-[#2874f0] hover:underline">
                  Privacy Policy
                </a>
                .
              </p>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#fb641b] hover:bg-[#e0530e] text-white font-semibold py-3 text-[15px] rounded-[2px] shadow-sm uppercase tracking-wide cursor-pointer transition-colors disabled:opacity-50"
              >
                {loading ? 'Sending OTP...' : 'Request OTP'}
              </button>

              <div className="pt-4 text-center">
                <span className="text-[14px] text-[#2874f0] font-semibold cursor-pointer hover:underline">
                  New to Flipkart? Create an account
                </span>
              </div>
            </form>
          ) : (
            <form onSubmit={handleVerifyOtp} className="space-y-6">
              <div>
                <p className="text-[14px] text-[#212121]">
                  Please enter the OTP sent to{' '}
                  <span className="font-semibold">{phoneOrEmail}</span>.{' '}
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="text-[#2874f0] text-[13px] font-semibold ml-1 hover:underline cursor-pointer"
                  >
                    Change
                  </button>
                </p>
                {demoOtpHint && (
                  <p className="mt-2 text-[12px] bg-yellow-50 text-yellow-800 p-2 rounded border border-yellow-200">
                    💡 Test Hint: Enter OTP <b>{demoOtpHint}</b> (or any 6-digit code)
                  </p>
                )}
              </div>

              <div className="relative pt-2">
                <input
                  type="text"
                  maxLength={6}
                  required
                  autoFocus
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  placeholder="Enter 6-Digit OTP"
                  className="w-full tracking-widest text-center text-[22px] font-bold border-b-2 border-gray-300 py-2 text-[#212121] outline-hidden focus:border-[#2874f0] transition-colors"
                />
              </div>

              {error && <p className="text-[13px] text-red-600 text-center">{error}</p>}

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#fb641b] hover:bg-[#e0530e] text-white font-semibold py-3 text-[15px] rounded-[2px] shadow-sm uppercase tracking-wide cursor-pointer transition-colors disabled:opacity-50"
              >
                {loading ? 'Verifying...' : 'Verify'}
              </button>

              <div className="text-center text-[13px] text-[#878787]">
                Not received your code?{' '}
                <button
                  type="button"
                  onClick={handleRequestOtp}
                  className="text-[#2874f0] font-semibold hover:underline cursor-pointer"
                >
                  Resend OTP
                </button>
              </div>
            </form>
          )}

          <div className="pt-8 border-t border-gray-100 flex items-center justify-center gap-2 text-[13px] text-gray-500">
            <ShieldCheck className="w-4 h-4 text-green-600" />
            <span>100% Safe & Secure Login</span>
          </div>
        </div>
      </div>
    </div>
  );
}
