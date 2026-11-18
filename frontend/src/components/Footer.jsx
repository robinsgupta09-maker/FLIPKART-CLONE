import React from 'react';
import { Link } from 'react-router-dom';
import { Briefcase, Award, Gift, HelpCircle } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#172337] text-white text-[12px] mt-10">
      {/* Top Main Columns */}
      <div className="max-w-[1240px] mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-6 gap-8">
        {/* About */}
        <div className="space-y-2">
          <div className="text-[#878787] font-semibold tracking-wider uppercase text-[11px] mb-2">
            About
          </div>
          <ul className="space-y-1.5 text-white/90">
            <li><a href="#" className="hover:underline">Contact Us</a></li>
            <li><a href="#" className="hover:underline">About Us</a></li>
            <li><a href="#" className="hover:underline">Careers</a></li>
            <li><a href="#" className="hover:underline">Flipkart Stories</a></li>
            <li><a href="#" className="hover:underline">Press</a></li>
            <li><a href="#" className="hover:underline">Corporate Information</a></li>
          </ul>
        </div>

        {/* Group Companies */}
        <div className="space-y-2">
          <div className="text-[#878787] font-semibold tracking-wider uppercase text-[11px] mb-2">
            Group Companies
          </div>
          <ul className="space-y-1.5 text-white/90">
            <li><a href="#" className="hover:underline">Myntra</a></li>
            <li><a href="#" className="hover:underline">Cleartrip</a></li>
            <li><a href="#" className="hover:underline">Shopsy</a></li>
          </ul>
        </div>

        {/* Help */}
        <div className="space-y-2">
          <div className="text-[#878787] font-semibold tracking-wider uppercase text-[11px] mb-2">
            Help
          </div>
          <ul className="space-y-1.5 text-white/90">
            <li><a href="#" className="hover:underline">Payments</a></li>
            <li><a href="#" className="hover:underline">Shipping</a></li>
            <li><a href="#" className="hover:underline">Cancellation & Returns</a></li>
            <li><a href="#" className="hover:underline">FAQ</a></li>
            <li><a href="#" className="hover:underline">Report Infringement</a></li>
          </ul>
        </div>

        {/* Consumer Policy */}
        <div className="space-y-2 border-r border-[#454d5e]/50 pr-4">
          <div className="text-[#878787] font-semibold tracking-wider uppercase text-[11px] mb-2">
            Consumer Policy
          </div>
          <ul className="space-y-1.5 text-white/90">
            <li><a href="#" className="hover:underline">Cancellation & Returns</a></li>
            <li><a href="#" className="hover:underline">Terms Of Use</a></li>
            <li><a href="#" className="hover:underline">Security</a></li>
            <li><a href="#" className="hover:underline">Privacy</a></li>
            <li><a href="#" className="hover:underline">Sitemap</a></li>
            <li><a href="#" className="hover:underline">Grievance Redressal</a></li>
            <li><a href="#" className="hover:underline">EPR Compliance</a></li>
          </ul>
        </div>

        {/* Mail Us */}
        <div className="space-y-2 text-white/80 leading-relaxed">
          <div className="text-[#878787] font-semibold tracking-wider uppercase text-[11px] mb-2">
            Mail Us:
          </div>
          <p>
            Flipkart Internet Private Limited,<br />
            Buildings Alyssa, Begonia &amp;<br />
            Clove Embassy Tech Village,<br />
            Outer Ring Road, Devarabeesanahalli Village,<br />
            Bengaluru, 560103,<br />
            Karnataka, India
          </p>
        </div>

        {/* Registered Office */}
        <div className="space-y-2 text-white/80 leading-relaxed">
          <div className="text-[#878787] font-semibold tracking-wider uppercase text-[11px] mb-2">
            Registered Office Address:
          </div>
          <p>
            Flipkart Internet Private Limited,<br />
            Buildings Alyssa, Begonia &amp;<br />
            Clove Embassy Tech Village,<br />
            Outer Ring Road, Devarabeesanahalli Village,<br />
            Bengaluru, 560103,<br />
            Karnataka, India<br />
            CIN: U51109KA2012PTC066107<br />
            Telephone: <span className="text-[#2874f0]">044-45614700</span>
          </p>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-[#454d5e] py-6 bg-[#172337]">
        <div className="max-w-[1240px] mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4 text-white">
          <div className="flex flex-wrap items-center justify-center gap-6">
            <a href="#seller" className="flex items-center gap-2 hover:underline">
              <Briefcase className="w-4 h-4 text-[#ffe500]" />
              <span>Become a Seller</span>
            </a>
            <a href="#advertise" className="flex items-center gap-2 hover:underline">
              <Award className="w-4 h-4 text-[#ffe500]" />
              <span>Advertise</span>
            </a>
            <Link to="/account/gift-cards" className="flex items-center gap-2 hover:underline">
              <Gift className="w-4 h-4 text-[#ffe500]" />
              <span>Gift Cards</span>
            </Link>
            <a href="#help" className="flex items-center gap-2 hover:underline">
              <HelpCircle className="w-4 h-4 text-[#ffe500]" />
              <span>Help Center</span>
            </a>
          </div>

          <div className="text-[#878787]">
            © 2007-2026 Flipkart.com (Portfolio Learning Clone)
          </div>

          {/* Payment Card Badges */}
          <div className="flex items-center gap-2 opacity-80">
            <span className="bg-white/10 px-2 py-0.5 rounded text-[10px] font-bold">VISA</span>
            <span className="bg-white/10 px-2 py-0.5 rounded text-[10px] font-bold">MasterCard</span>
            <span className="bg-white/10 px-2 py-0.5 rounded text-[10px] font-bold">RuPay</span>
            <span className="bg-white/10 px-2 py-0.5 rounded text-[10px] font-bold">UPI</span>
            <span className="bg-white/10 px-2 py-0.5 rounded text-[10px] font-bold">NetBanking</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
