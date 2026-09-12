import React, { useState } from 'react';
import { 
  MessageSquare, 
  Video, 
  TrendingUp, 
  Calendar, 
  FileText, 
  Sparkles, 
  CreditCard 
} from 'lucide-react';

export default function Sidebar({ activeTab, setActiveTab }) {
  const [showSubscriptionModal, setShowSubscriptionModal] = useState(false);
  const [promoCode, setPromoCode] = useState('');
  const [discountApplied, setDiscountApplied] = useState(false);

  const originalPrice = 429;
  const discountedPrice = 199; // Promo code apply hone ke baad discount price

  const handleApplyPromo = () => {
    if (promoCode.trim().toUpperCase() === 'NEW2MASTRSTRK') {
      setDiscountApplied(true);
    } else {
      alert('Invalid Promo Code!');
    }
  };

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard & Live AI Chat', icon: MessageSquare },
    { id: 'lectures', label: 'Chapter Lectures (Multi-Lang)', icon: Video },
    { id: 'progress', label: 'Progress Tracking', icon: TrendingUp },
    { id: 'attendance', label: 'Attendance Record & Logs', icon: Calendar },
    { id: 'papers', label: 'PDF Practice Papers & Keys', icon: FileText },
  ];

  return (
    <aside className="w-64 bg-[#0a0f1d] border-r border-slate-800 text-slate-200 h-screen flex flex-col justify-between p-4">
      <div>
        {/* Logo */}
        <div className="flex items-center gap-2 mb-8 px-2">
          <Sparkles className="w-6 h-6 text-cyan-400" />
          <h1 className="text-xl font-bold tracking-wider text-white">MASTERSTROKE</h1>
        </div>

        {/* 2-Day Free Trial Banner */}
        <div className="bg-gradient-to-r from-cyan-900/50 to-purple-900/50 border border-cyan-500/30 rounded-xl p-3 mb-6 text-xs text-cyan-200">
          <p className="font-semibold mb-1">🎁 2-Day Free Trial Active</p>
          <p className="text-slate-400">Access all AI Faculty & Lectures free.</p>
        </div>

        {/* Menu List */}
        <nav className="space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                  isActive 
                    ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/30' 
                    : 'text-slate-400 hover:bg-slate-800/50 hover:text-slate-200'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Subscription Upgrade Button */}
      <div className="pt-4 border-t border-slate-800">
        <button
          onClick={() => setShowSubscriptionModal(true)}
          className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-semibold py-2.5 px-4 rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/20 text-sm transition-all"
        >
          <CreditCard className="w-4 h-4" />
          Upgrade Plan (₹429)
        </button>
      </div>

      {/* Subscription & Promo Code Modal */}
      {showSubscriptionModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-[#0f172a] border border-cyan-500/30 rounded-2xl max-w-md w-full p-6 relative">
            <button 
              onClick={() => setShowSubscriptionModal(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white"
            >
              ✕
            </button>

            <h2 className="text-xl font-bold text-white mb-2">Subscribe to Masterstroke</h2>
            <p className="text-sm text-slate-400 mb-6">Unlock unlimited AI Live Faculty doubts, multi-language videos, and downloadable PDFs.</p>

            <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 mb-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-slate-300">Monthly Plan</span>
                <span className={`text-lg font-bold ${discountApplied ? 'line-through text-slate-500' : 'text-white'}`}>
                  ₹{originalPrice}/mo
                </span>
              </div>
              {discountApplied && (
                <div className="flex justify-between items-center text-cyan-400 font-bold text-lg">
                  <span>Discounted Price</span>
                  <span>₹{discountedPrice}/mo</span>
                </div>
              )}
            </div>

            {/* Promo Code Entry */}
            <div className="flex gap-2 mb-6">
              <input
                type="text"
                placeholder="Enter Promo Code (NEW2MASTRSTRK)"
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value)}
                className="bg-slate-900 border border-slate-700 text-white rounded-lg px-3 py-2 text-sm flex-1 focus:outline-none focus:border-cyan-500"
              />
              <button
                onClick={handleApplyPromo}
                className="bg-cyan-500 hover:bg-cyan-400 text-black font-semibold px-4 py-2 rounded-lg text-sm"
              >
                Apply
              </button>
            </div>

            <button className="w-full bg-cyan-500 hover:bg-cyan-400 text-black font-bold py-3 rounded-xl shadow-lg shadow-cyan-500/20 text-center">
              Activate Autopay & Subscribe
            </button>
          </div>
        </div>
      )}
    </aside>
  );
}
