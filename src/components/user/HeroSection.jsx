import { useState, useEffect, useRef } from 'react';

const destinations = ['সাজেক', 'সুন্দরবন', 'কক্সবাজার', 'বান্দরবান', 'শ্রীমঙ্গল', 'সেন্টমার্টিন'];

const destOptions = [
  { value: 'sajek', label: 'সাজেক ভ্যালি (রাঙামাটি)' },
  { value: 'sundarbans', label: 'সুন্দরবন ম্যানগ্রোভ' },
  { value: 'coxsbazar', label: 'কক্সবাজার সমুদ্র সৈকত' },
  { value: 'saintmartin', label: 'সেন্টমার্টিন দ্বীপ' },
  { value: 'sreemangal', label: 'শ্রীমঙ্গল চা বাগান' },
  { value: 'bandarban', label: 'বান্দরবান পর্বতমালা' },
];

const popularRoutes = [
  'সাজেক ৩ দিন ২ রাত',
  'সুন্দরবন বিলাসবহুল ক্রুজ',
  'কেওক্রাডং সামিট',
  'শ্রীমঙ্গল হামহাম ঝর্ণা',
];

export default function HeroSection({ onSearch }) {
  const [destIdx, setDestIdx] = useState(0);
  const [visible, setVisible] = useState(true);
  const [selectedDest, setSelectedDest] = useState('sajek');
  const [travelDate, setTravelDate] = useState('2026-10-28');
  const [passengers, setPassengers] = useState('2');
  const timerRef = useRef(null);

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) return;
    timerRef.current = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setDestIdx((i) => (i + 1) % destinations.length);
        setVisible(true);
      }, 300);
    }, 3000);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, []);

  return (
    <section
      className="relative w-full flex items-center justify-center overflow-hidden"
      style={{ minHeight: '92vh', marginTop: '-5rem', paddingTop: '7rem', paddingBottom: '4rem' }}
      aria-label="হিরো সেকশন"
      id="hero"
    >
      {/* Background Image */}
      <div className="absolute inset-0 z-0 bg-cover bg-center" style={{
        backgroundImage: `url('https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1600&q=80')`,
      }} aria-hidden="true">
        {/* Deep emerald scrim */}
        <div className="absolute inset-0" style={{
          background: 'linear-gradient(180deg, rgba(3,37,26,0.85) 0%, rgba(3,37,26,0.70) 50%, var(--color-surface) 100%)',
        }} />
        <div className="absolute inset-0" style={{
          background: 'radial-gradient(ellipse at top, rgba(22,107,71,0.2) 0%, transparent 60%)',
        }} />
      </div>

      <div className="relative z-10 w-full max-w-[1360px] mx-auto px-4 md:px-8 flex flex-col items-center text-center">

        {/* Headline with rotator */}
        <h1 className="display-lg max-w-4xl tracking-tight leading-tight mb-4"
            style={{ color: 'var(--color-surface-bright)', fontFamily: '"Tiro Bangla", serif' }}>
          এবার ঘুরে আসুন{' '}
          <span
            id="destination-rotator"
            style={{
              color: 'var(--color-on-tertiary-container)',
              fontFamily: '"Tiro Bangla", serif',
              opacity: visible ? 1 : 0,
              transition: 'opacity 0.3s ease',
              display: 'inline-block',
              minWidth: '140px',
            }}
            aria-live="polite"
            aria-atomic="true"
          >
            {destinations[destIdx]}
          </span>
          -এ নিশ্চিন্তে
        </h1>

        <p className="body-lg max-w-2xl mb-8 leading-relaxed"
           style={{ color: 'var(--color-surface-variant)' }}>
          দেশসেরা বিশ্বস্ত ট্যুর গ্রুপের সাথে যৌথ উদ্যোগে সাশ্রয়ী ভ্রমণ।
          সিট বুক করুন এখনই অথবা তৈরি করুন নিজস্ব গ্রুপ ট্যুর।
        </p>

        {/* CTA buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4 mb-8">
          <a href="#live-tours" className="btn-cta" id="hero-search-btn">
            <span className="icon text-xl">explore</span>
            লাইভ ট্যুর
          </a>
          <a href="#custom-tour" className="btn-ghost" id="hero-custom-btn">
            <span className="icon text-xl">tune</span>
            কাস্টম ট্যুর তৈরি করুন
          </a>
        </div>

        {/* Search dock */}
        <div className="w-full max-w-5xl rounded-xl p-5 text-left shadow-xl"
             style={{ backgroundColor: 'rgba(255,255,255,0.97)', backdropFilter: 'blur(20px)' }}>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
            {/* Destination */}
            <div className="flex flex-col gap-1.5">
              <label htmlFor="dest-select" className="label-sm flex items-center gap-1"
                     style={{ color: 'var(--color-on-surface-variant)' }}>
                <span className="icon text-base" style={{ color: 'var(--color-secondary)' }}>location_on</span>
                গন্তব্য নির্বাচন করুন
              </label>
              <div className="relative">
                <select
                  id="dest-select"
                  className="form-select pr-8 cursor-pointer"
                  value={selectedDest}
                  onChange={(e) => setSelectedDest(e.target.value)}
                >
                  {destOptions.map((d) => (
                    <option key={d.value} value={d.value}>{d.label}</option>
                  ))}
                </select>
                <span className="icon absolute right-2.5 top-2.5 text-lg pointer-events-none"
                      style={{ color: 'var(--color-outline)' }}>expand_more</span>
              </div>
            </div>

            {/* Date */}
            <div className="flex flex-col gap-1.5">
              <label htmlFor="tour-date" className="label-sm flex items-center gap-1"
                     style={{ color: 'var(--color-on-surface-variant)' }}>
                <span className="icon text-base" style={{ color: 'var(--color-secondary)' }}>calendar_month</span>
                ভ্রমণের তারিখ
              </label>
              <input
                id="tour-date"
                type="date"
                className="form-input cursor-pointer"
                value={travelDate}
                onChange={(e) => setTravelDate(e.target.value)}
              />
            </div>

            {/* Passengers */}
            <div className="flex flex-col gap-1.5">
              <label htmlFor="passengers-select" className="label-sm flex items-center gap-1"
                     style={{ color: 'var(--color-on-surface-variant)' }}>
                <span className="icon text-base" style={{ color: 'var(--color-secondary)' }}>group</span>
                যাত্রী সংখ্যা
              </label>
              <div className="relative">
                <select
                  id="passengers-select"
                  className="form-select pr-8 cursor-pointer"
                  value={passengers}
                  onChange={(e) => setPassengers(e.target.value)}
                >
                  <option value="1">১ জন (সোলো ট্রাভেলার)</option>
                  <option value="2">২ জন (শেয়ার্ড রুম)</option>
                  <option value="4">৪-৬ জন (গ্রুপ সিট)</option>
                  <option value="10">১০+ জন (সম্পূর্ণ টিম)</option>
                </select>
                <span className="icon absolute right-2.5 top-2.5 text-lg pointer-events-none"
                      style={{ color: 'var(--color-outline)' }}>expand_more</span>
              </div>
            </div>

            {/* Search button */}
            <div className="flex items-end">
              <button
                type="button"
                onClick={() => onSearch?.({ destination: selectedDest, date: travelDate, guests: passengers })}
                className="btn-primary w-full label-lg flex items-center justify-center gap-2 cursor-pointer transition-transform duration-150 hover:scale-102"
                style={{ height: '46px' }}
                id="search-tours-btn"
              >
                <span className="icon text-xl">search</span>
                ট্যুর দেখুন
              </button>
            </div>
          </div>

          {/* Popular routes */}
          <div className="flex flex-wrap items-center gap-2 pt-4 mt-4 border-t"
               style={{ borderColor: 'var(--color-surface-container-high)' }}>
            <span className="label-sm" style={{ color: 'var(--color-on-surface-variant)' }}>জনপ্রিয় রুট:</span>
            {popularRoutes.map((r) => {
              const destMap = {
                'সাজেক ৩ দিন ২ রাত': 'sajek',
                'সুন্দরবন বিলাসবহুল ক্রুজ': 'sundarbans',
                'কেওক্রাডং সামিট': 'bandarban',
                'শ্রীমঙ্গল হামহাম ঝর্ণা': 'sreemangal',
              };
              return (
                <button
                  key={r}
                  onClick={() => onSearch?.({ destination: destMap[r] || 'all', date: travelDate, guests: passengers })}
                  className="px-2.5 py-1 rounded label-sm transition-colors cursor-pointer"
                  style={{
                    backgroundColor: 'var(--color-surface-container)',
                    color: 'var(--color-on-surface)',
                  }}
                  onMouseOver={(e) => (e.currentTarget.style.backgroundColor = 'var(--color-surface-container-high)')}
                  onMouseOut={(e) => (e.currentTarget.style.backgroundColor = 'var(--color-surface-container)')}
                  type="button"
                >
                  {r}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
