import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

const destinations = [
  { id: 'sajek', label: 'সাজেক ভ্যালি', baseCost: 3500 },
  { id: 'coxsbazar', label: 'কক্সবাজার ও ইনানী', baseCost: 3200 },
  { id: 'sundarban', label: 'সুন্দরবন ম্যানগ্রোভ', baseCost: 6500 },
  { id: 'bandarban', label: 'বান্দরবান পাহাড়ি ট্রেইল', baseCost: 4000 },
  { id: 'tanguar', label: 'টাঙ্গুয়ার হাওর ও হাউসবোট', baseCost: 5000 },
  { id: 'sreemangal', label: 'শ্রীমঙ্গল চা-বাগান', baseCost: 2800 },
  { id: 'kuakata', label: 'কুয়াকাটা সাগরকন্যা', baseCost: 3400 },
  { id: 'saintmartin', label: 'সেন্টমার্টিন প্রবাল দ্বীপ', baseCost: 5500 },
];

const vehicleOptions = [
  { id: 'non-ac', label: 'নন-এসি চেয়ার কোচ', cost: 1000 },
  { id: 'ac-coach', label: 'প্রিমিয়াম এসি চেয়ার কোচ', cost: 1800 },
  { id: 'hiace', label: 'রিজার্ভ এসি হাইস (HiAce)', cost: 2500 },
  { id: 'jeep', label: 'রিজার্ভ পাহাড়ি চান্দের গাড়ি', cost: 2200 },
];

const stayTiers = [
  { id: 'economy', label: 'বাজেট ইকো কটেজ / স্ট্যান্ডার্ড হোটেল', multiplier: 1.0 },
  { id: 'standard', label: '৩-স্টার মানের আধুনিক রিসোর্ট', multiplier: 1.35 },
  { id: 'luxury', label: 'লাক্সারি ব্যালকনি রিসোর্ট / উডেন বাংলো', multiplier: 1.8 },
];

const extraServices = [
  { id: 'food', label: 'সকল বেলার পাহাড়ি স্পেশাল ও ব্যাম্বু চিকেন খাবার', cost: 1200 },
  { id: 'bbq', label: 'লাইভ ক্যাম্পফায়ার ও স্পেশাল চিকেন বারবিকিউ', cost: 600 },
  { id: 'guide', label: 'সার্টিফাইড স্থানীয় ট্রেইল ও ট্রেকিং গাইড', cost: 500 },
  { id: 'photo', label: 'অভিজ্ঞ ট্রাভেল ফটোগ্রাফার ও ডিএসএলআর ফটোসেশন', cost: 800 },
];

export default function CustomTourPage() {
  const navigate = useNavigate();

  // Form State
  const [selectedDest, setSelectedDest] = useState('sajek');
  const [tripType, setTripType] = useState('friends');
  const [travelersCount, setTravelersCount] = useState(4);
  const [durationDays, setDurationDays] = useState(3);
  const [selectedVehicle, setSelectedVehicle] = useState('ac-coach');
  const [selectedStay, setSelectedStay] = useState('standard');
  const [selectedExtras, setSelectedExtras] = useState({
    food: true,
    bbq: true,
    guide: true,
    photo: false,
  });

  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [travelDate, setTravelDate] = useState('2026-11-15');
  const [notes, setNotes] = useState('');
  const [submitted, setSubmitted] = useState(false);

  // Dynamic estimate calculation
  const estimatedCostPerPerson = useMemo(() => {
    const dest = destinations.find((d) => d.id === selectedDest) || destinations[0];
    const veh = vehicleOptions.find((v) => v.id === selectedVehicle) || vehicleOptions[0];
    const stay = stayTiers.find((s) => s.id === selectedStay) || stayTiers[0];

    const extrasTotal = Object.entries(selectedExtras).reduce((acc, [key, isChecked]) => {
      if (!isChecked) return acc;
      const item = extraServices.find((s) => s.id === key);
      return acc + (item ? item.cost : 0);
    }, 0);

    const base = dest.baseCost + veh.cost;
    const stayCost = base * (stay.multiplier - 1.0);
    const dayFactor = (durationDays / 3);

    const subtotal = Math.round((base + stayCost + extrasTotal) * dayFactor);
    return subtotal;
  }, [selectedDest, selectedVehicle, selectedStay, selectedExtras, durationDays]);

  const totalTripCost = estimatedCostPerPerson * travelersCount;

  const toggleExtra = (id) => {
    setSelectedExtras((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!customerName || !customerPhone) {
      alert('দয়া করে আপনার নাম ও মোবাইল নম্বর পূরণ করুন।');
      return;
    }
    setSubmitted(true);
  };

  return (
    <div className="w-full min-h-screen bg-slate-50 pt-20 pb-16">
      {/* Header Banner */}
      <section className="bg-gradient-to-br from-[#021f15] via-[#043323] to-[#0a4833] text-white py-14 px-4 sm:px-8 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#7FE5BA_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />
        <div className="max-w-[1360px] mx-auto relative z-10 text-center sm:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 text-xs font-semibold mb-3">
            <span className="material-symbols-outlined text-sm">tune</span>
            <span>১০০% কাস্টমাইজড ট্রাভেল প্যাকেজ প্ল্যানার</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-serif tracking-tight text-white mb-3">
            আপনার পছন্দের কাস্টম ট্যুর সাজান
          </h1>
          <p className="text-emerald-100/90 text-sm sm:text-base max-w-2xl leading-relaxed">
            রেডিমেড কোনো প্যাকেজ পছন্দ হচ্ছে না? নিজের সময়, বাজেট, হোটেল ও পছন্দের বাহন সিলেক্ট করুন। চলোঘুড়িতে থাকা ভেরিফায়েড লোকাল অপারেটররা সরাসরি সেরা কোটেশন অফার করবে।
          </p>
        </div>
      </section>

      {/* Main Form & Estimator Grid */}
      <section className="max-w-[1360px] mx-auto px-4 sm:px-8 -mt-6 relative z-20">
        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column: Form Fields (7 Cols) */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-200 space-y-8">
            
            {/* 1. Destination */}
            <div>
              <label className="block text-sm font-bold text-slate-900 mb-3 flex items-center gap-2">
                <span className="w-6 h-6 rounded-lg bg-emerald-100 text-emerald-800 text-xs font-bold flex items-center justify-center">১</span>
                <span>ভ্রমণের গন্তব্য নির্বাচন করুন</span>
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {destinations.map((d) => (
                  <button
                    key={d.id}
                    type="button"
                    onClick={() => setSelectedDest(d.id)}
                    className={`p-3 rounded-2xl text-xs font-bold transition-all border text-center cursor-pointer ${
                      selectedDest === d.id
                        ? 'bg-[#03251A] text-white border-[#03251A] shadow-md scale-[1.02]'
                        : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    {d.label}
                  </button>
                ))}
              </div>
            </div>

            {/* 2. Trip Type & Member Count */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-bold text-slate-900 mb-2 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-lg bg-emerald-100 text-emerald-800 text-xs font-bold flex items-center justify-center">২</span>
                  <span>ভ্রমণের ধরন</span>
                </label>
                <select
                  value={tripType}
                  onChange={(e) => setTripType(e.target.value)}
                  className="w-full p-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500 cursor-pointer"
                >
                  <option value="friends">বন্ধুবান্ধব ও সহযাত্রী (Friends Group)</option>
                  <option value="family">পারিবারিক ভ্রমণ (Family Trip)</option>
                  <option value="couple">কাপল / হানিমুন ট্যুর (Couple Special)</option>
                  <option value="corporate">অফিস ও কর্পোরেট টিম (Corporate Event)</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-900 mb-2 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-lg bg-emerald-100 text-emerald-800 text-xs font-bold flex items-center justify-center">৩</span>
                  <span>যাত্রী সংখ্যা</span>
                </label>
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setTravelersCount((prev) => Math.max(1, prev - 1))}
                    className="w-11 h-11 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-lg flex items-center justify-center cursor-pointer"
                  >
                    -
                  </button>
                  <div className="flex-1 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-center font-mono font-bold text-lg text-slate-900">
                    {travelersCount} জন
                  </div>
                  <button
                    type="button"
                    onClick={() => setTravelersCount((prev) => prev + 1)}
                    className="w-11 h-11 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-lg flex items-center justify-center cursor-pointer"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            {/* 3. Duration & Date */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-bold text-slate-900 mb-2 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-lg bg-emerald-100 text-emerald-800 text-xs font-bold flex items-center justify-center">৪</span>
                  <span>সম্ভাব্য শুরুর তারিখ</span>
                </label>
                <input
                  type="date"
                  value={travelDate}
                  onChange={(e) => setTravelDate(e.target.value)}
                  className="w-full p-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-900 mb-2 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-lg bg-emerald-100 text-emerald-800 text-xs font-bold flex items-center justify-center">৫</span>
                  <span>সময়কাল / দিন সংখ্যা</span>
                </label>
                <select
                  value={durationDays}
                  onChange={(e) => setDurationDays(Number(e.target.value))}
                  className="w-full p-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500 cursor-pointer"
                >
                  <option value={2}>২ দিন ১ রাত (কুইক ট্যুর)</option>
                  <option value={3}>৩ দিন ২ রাত (সবচেয়ে জনপ্রিয়)</option>
                  <option value={4}>৪ দিন ৩ রাত (রিল্যাক্সড ট্রিপ)</option>
                  <option value={5}>৫ দিন ৪ রাত (লং ভ্যাকেশন)</option>
                </select>
              </div>
            </div>

            {/* 4. Vehicle & Hotel Tier */}
            <div>
              <label className="block text-sm font-bold text-slate-900 mb-3 flex items-center gap-2">
                <span className="w-6 h-6 rounded-lg bg-emerald-100 text-emerald-800 text-xs font-bold flex items-center justify-center">৬</span>
                <span>যাতায়াত ও পরিবহনের পছন্দ</span>
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {vehicleOptions.map((v) => (
                  <label
                    key={v.id}
                    className={`flex items-center justify-between p-3 rounded-xl border cursor-pointer transition-all ${
                      selectedVehicle === v.id
                        ? 'bg-emerald-50/70 border-emerald-500 text-emerald-950 font-bold'
                        : 'bg-slate-50 border-slate-200 text-slate-700'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <input
                        type="radio"
                        name="vehicle"
                        checked={selectedVehicle === v.id}
                        onChange={() => setSelectedVehicle(v.id)}
                        className="accent-emerald-600"
                      />
                      <span className="text-xs sm:text-sm">{v.label}</span>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* Hotel Tier */}
            <div>
              <label className="block text-sm font-bold text-slate-900 mb-3 flex items-center gap-2">
                <span className="w-6 h-6 rounded-lg bg-emerald-100 text-emerald-800 text-xs font-bold flex items-center justify-center">৭</span>
                <span>হোটেল বা রিসোর্টের ধরন</span>
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                {stayTiers.map((s) => (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => setSelectedStay(s.id)}
                    className={`p-3 rounded-xl border text-left text-xs font-bold transition-all cursor-pointer ${
                      selectedStay === s.id
                        ? 'bg-[#03251A] text-white border-[#03251A] shadow-md'
                        : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    {s.label}
                  </button>
                ))}
              </div>
            </div>

            {/* 5. Extra Add-ons */}
            <div>
              <label className="block text-sm font-bold text-slate-900 mb-3 flex items-center gap-2">
                <span className="w-6 h-6 rounded-lg bg-emerald-100 text-emerald-800 text-xs font-bold flex items-center justify-center">৮</span>
                <span>অতিরিক্ত সুবিধাসমূহ (ঐচ্ছিক)</span>
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {extraServices.map((extra) => (
                  <label
                    key={extra.id}
                    className={`flex items-center justify-between p-3 rounded-xl border cursor-pointer transition-all ${
                      selectedExtras[extra.id]
                        ? 'bg-emerald-50/70 border-emerald-500 text-emerald-950 font-bold'
                        : 'bg-slate-50 border-slate-200 text-slate-700'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <input
                        type="checkbox"
                        checked={selectedExtras[extra.id]}
                        onChange={() => toggleExtra(extra.id)}
                        className="w-4 h-4 accent-emerald-600 rounded"
                      />
                      <span className="text-xs">{extra.label}</span>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* 6. Contact Details */}
            <div className="pt-4 border-t border-slate-200">
              <h4 className="text-sm font-bold text-slate-900 mb-3 flex items-center gap-2">
                <span className="w-6 h-6 rounded-lg bg-emerald-100 text-emerald-800 text-xs font-bold flex items-center justify-center">৯</span>
                <span>আপনার যোগাযোগের তথ্য</span>
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
                <input
                  type="text"
                  required
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  placeholder="আপনার পূর্ণ নাম *"
                  className="w-full p-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
                <input
                  type="tel"
                  required
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                  placeholder="মোবাইল নম্বর (bKash/WhatsApp) *"
                  className="w-full p-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={2}
                placeholder="কোনো বিশেষ অনুরোধ বা নোট থাকলে এখানে লিখুন (ঐচ্ছিক)..."
                className="w-full p-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
          </div>

          {/* Right Column: Dynamic Price Summary Box (5 Cols) */}
          <div className="lg:col-span-5">
            <div className="bg-gradient-to-br from-[#03251A] via-[#053d2c] to-[#042f22] text-white rounded-3xl p-6 sm:p-8 shadow-2xl sticky top-24 border border-emerald-500/20">
              <div className="flex items-center justify-between pb-4 border-b border-white/15">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-emerald-300">রিয়েল-টাইম হিসাব</span>
                  <h3 className="text-xl font-bold font-serif text-white">আনুমানিক বাজেট সারাংশ</h3>
                </div>
                <span className="material-symbols-outlined text-3xl text-amber-400">calculate</span>
              </div>

              {/* Breakdown details */}
              <div className="py-4 space-y-3 text-xs sm:text-sm text-emerald-100/90">
                <div className="flex justify-between">
                  <span>গন্তব্য:</span>
                  <span className="font-bold text-white">
                    {destinations.find((d) => d.id === selectedDest)?.label}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>সময়কাল:</span>
                  <span className="font-bold text-white">{durationDays} দিন</span>
                </div>
                <div className="flex justify-between">
                  <span>যাত্রী সংখ্যা:</span>
                  <span className="font-bold text-white">{travelersCount} জন</span>
                </div>
                <div className="flex justify-between">
                  <span>বাহন:</span>
                  <span className="font-bold text-white">
                    {vehicleOptions.find((v) => v.id === selectedVehicle)?.label}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>হোটেল মান:</span>
                  <span className="font-bold text-white">
                    {stayTiers.find((s) => s.id === selectedStay)?.label.split('/')[0]}
                  </span>
                </div>
              </div>

              {/* Total Calculation */}
              <div className="pt-4 border-t border-white/15">
                <div className="flex items-baseline justify-between mb-1">
                  <span className="text-xs text-emerald-200">জনপ্রতি আনুমানিক খরচ:</span>
                  <span className="text-2xl font-extrabold text-amber-400 font-mono">
                    ৳{estimatedCostPerPerson.toLocaleString('bn-BD')}
                  </span>
                </div>
                <div className="flex items-baseline justify-between mb-4">
                  <span className="text-xs text-emerald-200">মোট গ্রুপ বাজেট:</span>
                  <span className="text-lg font-bold text-emerald-300 font-mono">
                    ৳{totalTripCost.toLocaleString('bn-BD')}
                  </span>
                </div>

                <p className="text-[11px] text-emerald-200/70 mb-5 leading-relaxed">
                  * এটি একটি প্রাক্কলিত বাজেট। আপনার রিকোয়েস্ট পাঠানোর পর ভেরিফায়েড অপারেটররা তাদের চূড়ান্ত প্যাকেজ ও বিশেষ ডিসকাউন্ট প্রদান করবে।
                </p>

                <button
                  type="submit"
                  className="w-full py-4 rounded-2xl bg-amber-400 hover:bg-amber-300 text-slate-900 font-extrabold text-sm sm:text-base shadow-xl transition-all hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span className="material-symbols-outlined text-xl">send</span>
                  <span>কাস্টম ট্যুর রিকোয়েস্ট পাঠান</span>
                </button>
              </div>
            </div>
          </div>
        </form>
      </section>

      {/* Confirmation Modal */}
      {submitted && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl border border-slate-200 text-center animate-in fade-in zoom-in duration-200">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto mb-4">
              <span className="material-symbols-outlined text-3xl">check_circle</span>
            </div>
            <h3 className="text-xl font-bold text-slate-900 font-serif mb-2">
              রিকোয়েস্ট সফলভাবে গৃহীত হয়েছে!
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-6">
              ধন্যবাদ <strong>{customerName}</strong>! আপনার কাস্টম ট্যুর প্রস্তাবটি চলোঘুড়ির নিবন্ধিত অপারেটরদের কাছে পাঠানো হয়েছে। খুব শীঘ্রই আপনার মোবাইল নম্বরে (<strong>{customerPhone}</strong>) সেরা কোটেশনসহ যোগাযোগ করা হবে।
            </p>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setSubmitted(false)}
                className="flex-1 py-3 rounded-xl border border-slate-200 text-slate-700 text-xs font-bold hover:bg-slate-100 cursor-pointer"
              >
                আরেকটি রিকোয়েস্ট তৈরি করুন
              </button>
              <button
                type="button"
                onClick={() => {
                  setSubmitted(false);
                  navigate('/live-tours');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="flex-1 py-3 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold shadow-md cursor-pointer"
              >
                লাইভ ট্যুরসমূহ দেখুন
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
