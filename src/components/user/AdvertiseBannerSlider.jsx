import { useState, useEffect, useRef } from 'react';

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

  // Auto-slide every 4 seconds (pauses on mouse hover)
  useEffect(() => {
    if (isPaused) return;

    timerRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % total);
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
      className="w-full max-w-[1360px] mx-auto px-4 md:px-8 py-4 sm:py-6 relative z-20"
      aria-label="বিজ্ঞাপন ব্যানার স্লাইডার"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Banner Outer Container */}
      <div className="relative w-full rounded-2xl sm:rounded-3xl overflow-hidden shadow-[0_12px_40px_rgba(3,37,26,0.12)] border border-[#CFE3D5] h-[220px] sm:h-[280px] md:h-[340px] lg:h-[380px] bg-slate-900 group">
        
        {/* Only Images - Smooth Crossfade Carousel */}
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
              <img
                src={banner.image}
                alt={banner.alt}
                className="w-full h-full object-cover select-none transition-transform duration-700 ease-out hover:scale-[1.02]"
                loading={index === 0 ? 'eager' : 'lazy'}
              />
            </div>
          );
        })}

        {/* Centered Slide Changer Dots (মাঝে অবস্থিত ডট নেভিগেশন) */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex items-center justify-center gap-2 bg-black/40 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/20 shadow-md">
          {advertiseBanners.map((_, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setCurrentIndex(idx)}
              aria-label={`ব্যানার স্লাইড ${idx + 1}`}
              className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                idx === currentIndex
                  ? 'w-7 bg-emerald-400 shadow-sm'
                  : 'w-2 bg-white/50 hover:bg-white/90'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
