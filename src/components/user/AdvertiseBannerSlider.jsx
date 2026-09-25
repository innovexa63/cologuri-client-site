import { useState, useEffect, useRef } from 'react';


// ৩টি প্রিমিয়াম গ্রুপ ডিসকাউন্ট অফার ব্যানার (বাংলা ফন্ট ও যথাযথ রেশিও অনুযায়ী)
const advertiseBanners = [
  {
    id: 'banner-sajek-discount',
    tourId: 'sajek-1',
    badgeText: 'গ্রুপ অফার • ৩৫% ছাড়',
    tag: 'মেঘের রাজ্য সাজেক ভ্যালি',
    title: 'বন্ধুদের নিয়ে মেঘের রাজ্যে ট্যুরে মেগা ডিসকাউন্ট!',
    subtitle: '৪ বা ততোধিক ব্যক্তির গ্রুপ বুকিংয়ে পাচ্ছেন স্পেশাল ৩৫% পর্যন্ত ক্যাশ ডিসকাউন্ট।',
    discountAmount: '৩৫%',
    discountLabel: 'ছাড়',
    discountSub: 'গ্রুপ মেগা ডিল',
    features: ['প্রিমিয়াম রিসোর্ট কটেজ', 'চান্দের গাড়ি রাইড', 'স্পেশাল বার-বি-কিউ ডিনার'],
    ctaText: 'অফারটি লুফে নিন',
    bgImage: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1600&h=750&fit=crop&q=85',
    gradient: 'from-[#021f15]/95 via-[#03251a]/85 to-transparent',
    accentColor: '#10b981',
    badgeBg: 'bg-emerald-500/20 border-emerald-400/40 text-emerald-300',
  },
  {
    id: 'banner-cox-discount',
    tourId: 'coxsbazar-1',
    badgeText: 'কর্পোরেট ও ফ্রেন্ডস • ৩০% ছাড়',
    tag: 'কক্সবাজার ও সেন্টমার্টিন',
    title: 'নীল জলরাশির দ্বীপে গ্রুপ ভ্যাকেশনে ফ্ল্যাট ৩০% ডিসকাউন্ট!',
    subtitle: 'বিশ্বের দীর্ঘতম সমুদ্র সৈকত ও প্রবাল দ্বীপে দলবেঁধে আনন্দ ভ্রমণের আকর্ষণীয় সুযোগ।',
    discountAmount: '৩০%',
    discountLabel: 'ছাড়',
    discountSub: 'ফ্যামিলি ও কর্পোরেট ডিল',
    features: ['বিলাসবহুল সী-ক্রুজ', 'বিচ-ভিউ স্টার হোটেল', 'আনলিমিটেড সী-ফুড ব্যুফে'],
    ctaText: 'সিট বুক করুন',
    bgImage: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1600&h=750&fit=crop&q=85',
    gradient: 'from-[#071e3d]/95 via-[#0b2b5c]/85 to-transparent',
    accentColor: '#38bdf8',
    badgeBg: 'bg-sky-500/20 border-sky-400/40 text-sky-300',
  },
  {
    id: 'banner-haor-discount',
    tourId: 'sajek-1',
    badgeText: 'উইকেন্ড স্পেশাল • ৪০% ছাড়',
    tag: 'টাঙ্গুয়ার হাওড় ও শিমুল বাগান',
    title: 'প্রিমিয়াম লাক্সারি হাউসবোটে জাদুকরি হাওড় ভ্রমণ — ৪০% পর্যন্ত ছাড়!',
    subtitle: 'মেঘালয় পাহাড়ের পাদদেশে স্বচ্ছ নীলাভ জলের মাঝে প্রিমিয়াম হাউসবোট গ্রুপ অভিজ্ঞতা।',
    discountAmount: '৪০%',
    discountLabel: 'ছাড়',
    discountSub: 'বিগ গ্রুপ সেভার',
    features: ['বিলাসবহুল এসি কেবিন', '২৬ পদের ঐতিহ্যবাহী খাবার', 'নিরাপদ লাইফ-জ্যাকেট ও কায়াকিং'],
    ctaText: 'এখনই অফারটি নিন',
    bgImage: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=1600&h=750&fit=crop&q=85',
    gradient: 'from-[#172312]/95 via-[#1c3319]/85 to-transparent',
    accentColor: '#fbbf24',
    badgeBg: 'bg-amber-500/20 border-amber-400/40 text-amber-300',

// Banners list - add as many banner images as you want here
const advertiseBanners = [
  {
    id: 'banner-1',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1600&h=650&fit=crop&q=85',
    alt: 'সাজেক ভ্যালি মেঘের মেলা স্পেশাল অফার ব্যানার',
    tourId: 'sajek-1',
  },
  {
    id: 'banner-2',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1600&h=650&fit=crop&q=85',
    alt: 'কক্সবাজার সমুদ্র সৈকত ও ইনানী ড্রাইভ ব্যানার',
    tourId: 'coxsbazar-1',
  },
  {
    id: 'banner-3',
    image: 'https://images.unsplash.com/photo-1547036967-23d11aacaee0?w=1600&h=650&fit=crop&q=85',
    alt: 'সুন্দরবন ম্যানগ্রোভ ক্রুজ সাফারি ব্যানার',
    tourId: 'sundarban-1',
  },
  {
    id: 'banner-4',
    image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1600&h=650&fit=crop&q=85',
    alt: 'বান্দরবান কেওক্রাডং সামিট ট্রেকিং ব্যানার',
    tourId: 'bandarban-1',
  },
  {
    id: 'banner-5',
    image: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=1600&h=650&fit=crop&q=85',
    alt: 'টাঙ্গুয়ার হাওর লাক্সারি হাউসবোট ব্যানার',
    tourId: 'sajek-1',

  },
];

export default function AdvertiseBannerSlider({ onSelectBannerTour }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef(null);

  const total = advertiseBanners.length;


  // Auto-slide every 4.5 seconds (মাউস হোভার করলে পজ হবে)

  // Auto-slide every 4 seconds (pauses on mouse hover)

  useEffect(() => {
    if (isPaused) return;

    timerRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % total);

    }, 4500);

    }, 4000);


    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPaused, total]);

  const handleBannerClick = (tourId) => {
    if (onSelectBannerTour) {
      onSelectBannerTour(tourId);
    } else {
      const el = document.getElementById('live-tours');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section

      className="w-full max-w-[1360px] mx-auto px-4 md:px-8 py-3 sm:py-5 relative z-20"
      aria-label="গ্রুপ ডিসকাউন্ট অফার ব্যানার স্লাইডার"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Banner Outer Container with Balanced Height & Width Ratio */}
      <div className="relative w-full rounded-2xl sm:rounded-3xl overflow-hidden shadow-[0_16px_45px_rgba(2,31,21,0.18)] border border-[#CFE3D5] min-h-[260px] sm:min-h-[300px] md:min-h-[340px] lg:h-[370px] bg-slate-950 group select-none">
        
        {/* Banner Slides */}

        {advertiseBanners.map((banner, index) => {
          const isActive = index === currentIndex;
          return (
            <div
              key={banner.id}
              onClick={() => handleBannerClick(banner.tourId)}
              className={`absolute inset-0 cursor-pointer transition-opacity duration-700 ease-in-out ${
                isActive ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
              }`}
            >

              {/* Background Photo */}
              <img
                src={banner.bgImage}
                alt={banner.title}
                className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-1000 ease-out group-hover:scale-105"
                loading={index === 0 ? 'eager' : 'lazy'}
              />

              {/* Dynamic Gradient Overlay */}
              <div className={`absolute inset-0 bg-gradient-to-r ${banner.gradient}`} />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-black/30" />

              {/* Banner Content Container (Proper Grid Ratio for Content & Big Badge) */}
              <div className="relative z-10 w-full h-full px-5 sm:px-8 md:px-12 py-6 sm:py-8 flex flex-col justify-between">
                
                {/* Top Row: Tag & Promo Badge */}
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs sm:text-sm font-semibold tracking-wide bg-white/15 backdrop-blur-md text-white border border-white/20 shadow-sm">
                      <span className="material-symbols-outlined text-[16px] text-amber-300">sparkles</span>
                      {banner.tag}
                    </span>
                    <span className={`hidden sm:inline-flex items-center px-3 py-1 rounded-full text-xs sm:text-sm font-bold border backdrop-blur-md ${banner.badgeBg}`}>
                      {banner.badgeText}
                    </span>
                  </div>

                  {/* Corner Limited Time Ribbon */}
                  <div className="inline-flex items-center gap-1 text-[11px] sm:text-xs font-medium text-amber-200 bg-amber-500/20 border border-amber-400/40 px-2.5 py-0.5 rounded-full backdrop-blur-md">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-ping" />
                    সীমিত সময়ের অফার
                  </div>
                </div>

                {/* Middle Row: Headline & Big Discount Graphic Badge */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center my-auto">
                  
                  {/* Left Column: Bangla Typography Details (7 cols) */}
                  <div className="md:col-span-8 lg:col-span-8 space-y-2 sm:space-y-3">
                    <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-extrabold text-white leading-tight drop-shadow-md tracking-tight font-sans">
                      {banner.title}
                    </h2>
                    
                    <p className="text-xs sm:text-sm md:text-base text-gray-200 line-clamp-2 max-w-xl font-normal leading-relaxed">
                      {banner.subtitle}
                    </p>

                    {/* Features checklist pills */}
                    <div className="hidden sm:flex flex-wrap items-center gap-2 pt-1">
                      {banner.features.map((feat, fIdx) => (
                        <span
                          key={fIdx}
                          className="inline-flex items-center gap-1 text-xs text-white/90 bg-black/40 backdrop-blur-sm px-2.5 py-1 rounded-lg border border-white/10"
                        >
                          <span className="text-emerald-400 text-xs font-bold">✓</span>
                          {feat}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Right Column: Eye-Catching Round/Shield Discount Badge (4 cols) */}
                  <div className="hidden md:flex md:col-span-4 lg:col-span-4 justify-end items-center">
                    <div className="relative group/badge">
                      {/* Ambient Glow */}
                      <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-amber-400 via-rose-500 to-emerald-400 opacity-70 blur-md group-hover/badge:opacity-100 transition-opacity duration-500" />
                      
                      {/* Badge Card */}
                      <div className="relative bg-gradient-to-b from-slate-900/95 via-[#03251a]/95 to-black/95 border-2 border-amber-300/80 px-6 py-4 rounded-2xl text-center shadow-2xl backdrop-blur-xl min-w-[170px] transform group-hover/badge:scale-105 transition-transform duration-300">
                        <span className="block text-[11px] font-bold uppercase tracking-wider text-amber-300">
                          {banner.discountSub}
                        </span>
                        <div className="flex items-baseline justify-center gap-1 my-0.5">
                          <span className="text-3xl lg:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-yellow-300 to-amber-400 font-sans tracking-tight">
                            {banner.discountAmount}
                          </span>
                          <span className="text-lg lg:text-xl font-bold text-white font-sans">
                            {banner.discountLabel}
                          </span>
                        </div>
                        <span className="inline-block text-[10px] text-gray-300 bg-white/10 px-2 py-0.5 rounded-full border border-white/10">
                          গ্রুপ বুকিংয়ে প্রযোজ্য
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Bottom Row: CTA Button & Mobile Badge */}
                <div className="flex items-center justify-between gap-4 pt-1 sm:pt-2">
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      className="inline-flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 rounded-xl font-bold text-xs sm:text-sm bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 shadow-lg shadow-amber-500/30 hover:from-amber-300 hover:to-amber-400 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
                    >
                      <span>{banner.ctaText}</span>
                      <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                    </button>
                    
                    <span className="text-[11px] sm:text-xs text-white/70 hidden sm:inline-block">
                      *গ্রুপ সাইজ ৪+ জন হলে স্পেশাল অফার কার্যকর
                    </span>
                  </div>

                  {/* Mobile discount text badge */}
                  <div className="md:hidden flex items-center gap-1 bg-amber-400/20 border border-amber-300/40 px-3 py-1 rounded-xl text-amber-300 font-bold text-xs">
                    <span>{banner.discountAmount} {banner.discountLabel}</span>
                  </div>
                </div>

              </div>

            </div>
          );
        })}

        {/* Centered Slide Changer Dots (মাঝে অবস্থিত ডট নেভিগেশন) */}

        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-20 flex items-center justify-center gap-2 bg-black/50 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/20 shadow-lg">

          {advertiseBanners.map((_, idx) => (
            <button
              key={idx}
              type="button"

              onClick={(e) => {
                e.stopPropagation();
                setCurrentIndex(idx);
              }}
              aria-label={`ব্যানার স্লাইড ${idx + 1}`}
              className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                idx === currentIndex
                  ? 'w-7 bg-amber-400 shadow-sm'

                  : 'w-2 bg-white/50 hover:bg-white/90'
              }`}
            />
          ))}
        </div>



      </div>
    </section>
  );
}
