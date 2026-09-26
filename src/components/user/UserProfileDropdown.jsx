import { useState, useRef, useEffect } from 'react';
import {
  Calendar,
  CircleHelp,
  LogOut,
  ChevronDown,
  ChevronUp,
  X,
  User,
  Phone,
  Mail,
  MapPin,
  CheckCircle2,
  Clock,
  ArrowRight,
  ShieldCheck,
  CreditCard,
  MessageCircle,
  Headphones,
  FileText
} from 'lucide-react';

// Custom SVG: Traveler with luggage (matches the screenshot silhouette exactly)
export function TravelerIcon({ className = "w-5 h-5", color = "currentColor" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill={color}
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Head */}
      <circle cx="15.5" cy="4" r="2.1" />
      {/* Torso & Walking stride */}
      <path d="M14.2 6.8c-.8 0-1.6.4-2.2 1.1l-2.2 2.6c-.3.4-.3 1 .1 1.4.4.3 1 .3 1.4-.1l1.7-2v4.3l-2.6 6.8c-.2.5.1 1.1.6 1.3.5.2 1.1-.1 1.3-.6l2.1-5.7 1.9 3.6c.3.5.9.8 1.5.8h1c.6 0 1-.4 1-1s-.4-1-1-1h-.6l-2.3-4.4.4-3.5 1.5 1.5c.4.4 1 .4 1.4 0 .4-.4.4-1 0-1.4l-2.1-2.1c-.5-.6-1-.9-1.8-.9z" />
      {/* Trolley Suitcase */}
      <rect x="2.5" y="13" width="5.2" height="7.8" rx="1.2" />
      {/* Handle */}
      <path
        d="M6.2 13V8.8a1 1 0 0 0-1-1H4.5"
        stroke={color}
        strokeWidth="1.4"
        strokeLinecap="round"
        fill="none"
      />
      {/* Wheels */}
      <circle cx="3.8" cy="21.5" r="0.8" />
      <circle cx="6.4" cy="21.5" r="0.8" />
    </svg>
  );
}

// Custom SVG: Circular Refund Arrow with Bengali Taka sign ৳ inside
export function RefundAccountIcon({ className = "w-5 h-5", color = "currentColor" }) {
  return (
    <div className={`relative flex items-center justify-center shrink-0 ${className}`}>
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-full h-full"
      >
        <path d="M3 12a9 9 0 1 0 3-6.7L3 8" />
        <path d="M3 3v5h5" />
      </svg>
      <span
        className="absolute inset-0 flex items-center justify-center text-[10px] font-bold select-none leading-none pt-0.5"
        style={{ color, fontFamily: 'sans-serif' }}
      >
        ৳
      </span>
    </div>
  );
}

export default function UserProfileDropdown({ scrolled = false }) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeModal, setActiveModal] = useState(null); // 'profile' | 'trips' | 'refund' | 'help' | null
  const dropdownRef = useRef(null);

  // User state
  const [userData, setUserData] = useState({
    name: 'Md Nurunnabi Reachad',
    phone: '01712-345678',
    email: 'nurunnabi@cologuri.com',
    emergencyContact: '01898-765432',
    address: 'ঢাকা, বাংলাদেশ',
  });

  // Refund account state
  const [refundData, setRefundData] = useState({
    method: 'bKash',
    accountNumber: '01712-345678',
    accountType: 'Personal',
    balance: '৳ ১,২০০',
  });

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleAction = (modalType) => {
    setIsOpen(false);
    setActiveModal(modalType);
  };

  const handleLogout = () => {
    setIsOpen(false);
    if (window.confirm('আপনি কি নিশ্চিত যে আপনি লগআউট করতে চান?')) {
      alert('সফলভাবে লগআউট করা হয়েছে।');
    }
  };

  return (
    <div className="relative" ref={dropdownRef}>
      {/* ── Trigger Button (Matches Screenshot) ── */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-1.5 rounded-xl border transition-all duration-200 cursor-pointer shadow-xs select-none bg-white hover:bg-slate-50 border-slate-200/90 text-slate-800"
        aria-expanded={isOpen}
        aria-haspopup="true"
        title="ব্যবহারকারী প্রোফাইল মেনু"
      >
        <TravelerIcon className="w-5 h-5 text-slate-800 shrink-0" />
        <span className="text-[13.5px] font-semibold text-slate-800 tracking-tight whitespace-nowrap">
          Hi! Md Nurunnabi ...
        </span>
        {isOpen ? (
          <ChevronUp className="w-4 h-4 text-slate-600 shrink-0 stroke-[2.5]" />
        ) : (
          <ChevronDown className="w-4 h-4 text-slate-600 shrink-0 stroke-[2.5]" />
        )}
      </button>

      {/* ── Dropdown Menu (Matches Screenshot) ── */}
      {isOpen && (
        <div
          className="absolute right-0 top-full mt-2 w-56 sm:w-60 bg-white rounded-2xl shadow-[0_12px_36px_rgba(0,0,0,0.12)] border border-slate-100 p-2 z-50 animate-in fade-in zoom-in-95 duration-150"
          style={{ fontFamily: '"Hind Siliguri", "Noto Sans Bengali", sans-serif' }}
        >
          {/* 1. My Profile */}
          <button
            onClick={() => handleAction('profile')}
            className="w-full flex items-center gap-3.5 px-3.5 py-2.5 rounded-xl text-[14.5px] font-medium text-slate-700 hover:text-slate-900 hover:bg-slate-50/90 transition-colors text-left cursor-pointer group"
          >
            <TravelerIcon className="w-5 h-5 text-slate-600 group-hover:text-emerald-700 transition-colors shrink-0" />
            <span>My Profile</span>
          </button>

          {/* 2. My Trips */}
          <button
            onClick={() => handleAction('trips')}
            className="w-full flex items-center gap-3.5 px-3.5 py-2.5 rounded-xl text-[14.5px] font-medium text-slate-700 hover:text-slate-900 hover:bg-slate-50/90 transition-colors text-left cursor-pointer group"
          >
            <Calendar className="w-5 h-5 text-slate-600 group-hover:text-emerald-700 transition-colors shrink-0 stroke-[1.8]" />
            <span>My Trips</span>
          </button>

          {/* 3. Refund Account */}
          <button
            onClick={() => handleAction('refund')}
            className="w-full flex items-center gap-3.5 px-3.5 py-2.5 rounded-xl text-[14.5px] font-medium text-slate-700 hover:text-slate-900 hover:bg-slate-50/90 transition-colors text-left cursor-pointer group"
          >
            <RefundAccountIcon className="w-5 h-5 text-slate-600 group-hover:text-emerald-700 transition-colors shrink-0" />
            <span>Refund Account</span>
          </button>

          {/* 4. Help Centre */}
          <button
            onClick={() => handleAction('help')}
            className="w-full flex items-center gap-3.5 px-3.5 py-2.5 rounded-xl text-[14.5px] font-medium text-slate-700 hover:text-slate-900 hover:bg-slate-50/90 transition-colors text-left cursor-pointer group"
          >
            <CircleHelp className="w-5 h-5 text-slate-600 group-hover:text-emerald-700 transition-colors shrink-0 stroke-[1.8]" />
            <span>Help Centre</span>
          </button>

          {/* Divider */}
          <div className="my-1.5 border-t border-slate-100" />

          {/* 5. Logout */}
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3.5 px-3.5 py-2.5 rounded-xl text-[14.5px] font-medium text-slate-700 hover:text-rose-600 hover:bg-rose-50/80 transition-colors text-left cursor-pointer group"
          >
            <LogOut className="w-5 h-5 text-slate-600 group-hover:text-rose-600 transition-colors shrink-0 stroke-[1.8]" />
            <span>Logout</span>
          </button>
        </div>
      )}

      {/* ── MODALS FOR ACTIONS ── */}

      {/* Modal 1: My Profile */}
      {activeModal === 'profile' && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-xs p-4 animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-md w-full shadow-2xl overflow-hidden border border-slate-100 animate-in zoom-in-95">
            <div className="p-6 bg-gradient-to-r from-emerald-800 to-[#03251A] text-white flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-white/10 backdrop-blur-sm flex items-center justify-center">
                  <TravelerIcon className="w-6 h-6 text-emerald-300" />
                </div>
                <div>
                  <h3 className="text-lg font-bold">আমার প্রোফাইল</h3>
                  <p className="text-xs text-emerald-200/80">ভ্রমণকারীর ব্যক্তিগত তথ্য</p>
                </div>
              </div>
              <button
                onClick={() => setActiveModal(null)}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors cursor-pointer"
              >
                <X size={16} />
              </button>
            </div>

            <div className="p-6 space-y-4 text-sm">
              <div>
                <label className="text-xs font-bold text-slate-500 block mb-1">পূর্ণ নাম</label>
                <div className="relative">
                  <User size={16} className="absolute left-3.5 top-3 text-slate-400" />
                  <input
                    type="text"
                    value={userData.name}
                    onChange={(e) => setUserData({ ...userData, name: e.target.value })}
                    className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-hidden focus:border-emerald-600 font-medium"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-slate-500 block mb-1">মোবাইল নম্বর</label>
                  <div className="relative">
                    <Phone size={16} className="absolute left-3.5 top-3 text-slate-400" />
                    <input
                      type="text"
                      value={userData.phone}
                      onChange={(e) => setUserData({ ...userData, phone: e.target.value })}
                      className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-hidden focus:border-emerald-600 font-medium"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-500 block mb-1">ইমেইল</label>
                  <div className="relative">
                    <Mail size={16} className="absolute left-3.5 top-3 text-slate-400" />
                    <input
                      type="email"
                      value={userData.email}
                      onChange={(e) => setUserData({ ...userData, email: e.target.value })}
                      className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-hidden focus:border-emerald-600 font-medium"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-500 block mb-1">জরুরি যোগাযোগ নম্বর</label>
                <input
                  type="text"
                  value={userData.emergencyContact}
                  onChange={(e) => setUserData({ ...userData, emergencyContact: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-hidden focus:border-emerald-600 font-medium"
                  placeholder="যেমন: পিতা / অভিভাবকের নম্বর"
                />
              </div>

              <div className="pt-2">
                <button
                  onClick={() => {
                    alert('প্রোফাইল তথ্য সফলভাবে সংরক্ষণ করা হয়েছে!');
                    setActiveModal(null);
                  }}
                  className="w-full py-3 bg-[#168B5E] hover:bg-[#03251A] text-white rounded-xl font-bold transition-all shadow-md cursor-pointer"
                >
                  তথ্য সংরক্ষণ করুন
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal 2: My Trips */}
      {activeModal === 'trips' && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-xs p-4 animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-lg w-full shadow-2xl overflow-hidden border border-slate-100 animate-in zoom-in-95 max-h-[90vh] flex flex-col">
            <div className="p-6 bg-gradient-to-r from-emerald-800 to-[#03251A] text-white flex items-center justify-between shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-white/10 backdrop-blur-sm flex items-center justify-center">
                  <Calendar className="w-6 h-6 text-emerald-300" />
                </div>
                <div>
                  <h3 className="text-lg font-bold">আমার বুকিং ও ট্রিপসমূহ</h3>
                  <p className="text-xs text-emerald-200/80">বুক করা ট্যুরের টিকিট ও স্থিতি</p>
                </div>
              </div>
              <button
                onClick={() => setActiveModal(null)}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors cursor-pointer"
              >
                <X size={16} />
              </button>
            </div>

            <div className="p-6 overflow-y-auto space-y-4">
              {/* Trip 1 (Active) */}
              <div className="p-4 rounded-2xl border border-emerald-200 bg-emerald-50/50 relative overflow-hidden">
                <div className="flex items-start justify-between gap-3 mb-2">
                  <div>
                    <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-emerald-600 text-white">
                      আসন্ন ভ্রমণ
                    </span>
                    <h4 className="text-base font-bold text-slate-900 mt-1.5">
                      সাজেক ভ্যালি প্রিমিয়াম মেঘের রাজ্য ট্যুর
                    </h4>
                    <p className="text-xs text-slate-500">গ্রুপ: চলো যাই ট্রাভেলার্স · ৩ দিন / ২ রাত</p>
                  </div>
                  <div className="text-right">
                    <p className="text-base font-extrabold text-[#168B5E]">৳ ৯,৬০০</p>
                    <p className="text-[11px] text-emerald-700 font-semibold">পেমেন্ট সম্পন্ন</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs py-2 my-2 border-y border-emerald-200/60 text-slate-600">
                  <div>
                    <span className="text-slate-400">যাত্রার তারিখ:</span> <strong className="text-slate-800">২৮ অক্টোবর, ২০২৬</strong>
                  </div>
                  <div>
                    <span className="text-slate-400">সিট নম্বর:</span> <strong className="text-emerald-700">A1, A2 (২ সিট)</strong>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-1">
                  <span className="text-[11px] text-slate-400 font-mono">PNR: CG-2026-9812</span>
                  <button
                    onClick={() => alert('ই-টিকিট ডাউনলোড হচ্ছে...')}
                    className="text-xs font-bold text-[#168B5E] hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    টিকিট ডাউনলোড <ArrowRight size={13} />
                  </button>
                </div>
              </div>

              {/* Trip 2 (Past) */}
              <div className="p-4 rounded-2xl border border-slate-200 bg-slate-50/50">
                <div className="flex items-start justify-between gap-3 mb-1">
                  <div>
                    <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-slate-200 text-slate-700">
                      সম্পন্ন
                    </span>
                    <h4 className="text-sm font-bold text-slate-800 mt-1">
                      সুন্দরবন প্রিমিয়াম লাক্সারি ক্রুজ
                    </h4>
                    <p className="text-xs text-slate-400">১৫ আগস্ট, ২০২৬ · ১ সিট</p>
                  </div>
                  <p className="text-sm font-bold text-slate-700">৳ ৫,৮০০</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal 3: Refund Account */}
      {activeModal === 'refund' && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-xs p-4 animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-md w-full shadow-2xl overflow-hidden border border-slate-100 animate-in zoom-in-95">
            <div className="p-6 bg-gradient-to-r from-emerald-800 to-[#03251A] text-white flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-white/10 backdrop-blur-sm flex items-center justify-center">
                  <RefundAccountIcon className="w-6 h-6 text-emerald-300" />
                </div>
                <div>
                  <h3 className="text-lg font-bold">রিফান্ড অ্যাকাউন্ট</h3>
                  <p className="text-xs text-emerald-200/80">বুকিং বাতিলের দ্রুত রিফান্ড ব্যালেন্স</p>
                </div>
              </div>
              <button
                onClick={() => setActiveModal(null)}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors cursor-pointer"
              >
                <X size={16} />
              </button>
            </div>

            <div className="p-6 space-y-4 text-sm">
              <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold text-emerald-800">বর্তমান রিফান্ড ব্যালেন্স</p>
                  <p className="text-2xl font-extrabold text-[#168B5E] mt-0.5">{refundData.balance}</p>
                </div>
                <button
                  onClick={() => alert('উত্তোলন রিকোয়েস্ট গৃহীত হয়েছে। ২৪ ঘণ্টার মধ্যে আপনার একাউন্টে টাকা পৌঁছাবে।')}
                  className="px-3.5 py-2 bg-[#168B5E] hover:bg-[#03251A] text-white text-xs font-bold rounded-xl transition-all shadow-xs cursor-pointer"
                >
                  উত্তোলন করুন
                </button>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-500 block mb-1">পেমেন্ট মেথড</label>
                <div className="grid grid-cols-3 gap-2">
                  {['bKash', 'Nagad', 'Bank'].map((m) => (
                    <button
                      key={m}
                      type="button"
                      onClick={() => setRefundData({ ...refundData, method: m })}
                      className={`py-2 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                        refundData.method === m
                          ? 'border-emerald-600 bg-emerald-50 text-emerald-800'
                          : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                      }`}
                    >
                      {m}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-500 block mb-1">
                  {refundData.method} একাউন্ট নম্বর
                </label>
                <input
                  type="text"
                  value={refundData.accountNumber}
                  onChange={(e) => setRefundData({ ...refundData, accountNumber: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-hidden focus:border-emerald-600 font-medium"
                />
              </div>

              <p className="text-[11px] text-slate-400 leading-relaxed">
                * ট্যুর বাতিল বা সিট পরিবর্তন হলে স্বয়ংক্রিয়ভাবে উক্ত একাউন্টে ৭২ ঘণ্টার মধ্যে রিফান্ড প্রসেস সম্পন্ন হয়।
              </p>

              <button
                onClick={() => {
                  alert('রিফান্ড অ্যাকাউন্ট সফলভাবে আপডেট করা হয়েছে!');
                  setActiveModal(null);
                }}
                className="w-full py-3 bg-[#168B5E] hover:bg-[#03251A] text-white rounded-xl font-bold transition-all shadow-md cursor-pointer"
              >
                সংরক্ষণ করুন
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal 4: Help Centre */}
      {activeModal === 'help' && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-xs p-4 animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-md w-full shadow-2xl overflow-hidden border border-slate-100 animate-in zoom-in-95">
            <div className="p-6 bg-gradient-to-r from-emerald-800 to-[#03251A] text-white flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-white/10 backdrop-blur-sm flex items-center justify-center">
                  <CircleHelp className="w-6 h-6 text-emerald-300" />
                </div>
                <div>
                  <h3 className="text-lg font-bold">সহায়তা কেন্দ্র (Help Centre)</h3>
                  <p className="text-xs text-emerald-200/80">যেকোনো জিজ্ঞাসা বা সহযোগিতার জন্য</p>
                </div>
              </div>
              <button
                onClick={() => setActiveModal(null)}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors cursor-pointer"
              >
                <X size={16} />
              </button>
            </div>

            <div className="p-6 space-y-3.5 text-sm">
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0">
                  <Headphones size={20} />
                </div>
                <div className="flex-1">
                  <h5 className="font-bold text-slate-800 text-xs">২৪/৭ কাস্টমার সাপোর্ট হেল্পলাইন</h5>
                  <p className="text-emerald-700 font-extrabold text-sm">09612-887766</p>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-emerald-50/60 border border-emerald-100 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0">
                  <MessageCircle size={20} />
                </div>
                <div className="flex-1">
                  <h5 className="font-bold text-slate-800 text-xs">হোয়াটসঅ্যাপ চ্যাট সাপোর্ট</h5>
                  <p className="text-slate-600 text-xs mt-0.5">+880 1700-000000</p>
                </div>
                <a
                  href="https://wa.me/8801700000000"
                  target="_blank"
                  rel="noreferrer"
                  className="px-3 py-1.5 bg-emerald-600 text-white text-xs font-bold rounded-lg hover:bg-emerald-700"
                >
                  চ্যাট
                </a>
              </div>

              <div className="p-3.5 rounded-xl border border-slate-200/80 text-xs space-y-1.5">
                <p className="font-bold text-slate-800">সাধারণ প্রশ্নোত্তর (FAQ):</p>
                <p className="text-slate-600">• কিভাবে টিকিট বাতিল ও রিফান্ড পাওয়া যাবে?</p>
                <p className="text-slate-600">• জয়েন্ট ট্যুরে অন্য গ্রুপের সিট দেখা যায় কেন?</p>
                <p className="text-slate-600">• ট্যুর শুরুর কতদিন পূর্বে বুকিং কনফার্ম করতে হয়?</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
