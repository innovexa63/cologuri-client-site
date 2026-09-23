const destinations = [
  {
    id: 'sajek',
    name: 'সাজেক ভ্যালি — মেঘ ও পাহাড়ের আলিঙ্গন',
    district: 'রাঙামাটি • বাঘাইছড়ি',
    badge: 'মেঘের রাজ্য',
    altitude: '১,৮০০ ফুট',
    rating: '৪.৯',
    reviews: '৮৫০+',
    desc: 'রুইলুই পাড়া ও কংলাক পাহাড় থেকে ভাসমান মেঘমালার অপূর্ব দৃশ্য। প্রতি সপ্তাহে ১৫+ নিবন্ধিত ট্যুর গ্রুপ পরিচালিত হচ্ছে।',
    activeTours: '৮টি সক্রিয় ট্যুর টিম রওয়ানা হচ্ছে',
    img: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80',
    price: null,
    featured: true,
  },
  {
    id: 'sundarbans',
    name: 'সুন্দরবন ম্যানগ্রোভ',
    district: 'খুলনা • বাগেরহাট',
    tours: '৬টি গ্রুপ ট্যুর',
    desc: 'হরিণ, কুমির ও রয়্যাল বেঙ্গল টাইগারের বিশ্বখ্যাত প্রাকৃতিক আবাসস্থল।',
    price: '৳৭,৫০০',
    img: 'https://images.unsplash.com/photo-1547036967-23d11aacaee0?w=400&q=80',
    featured: false,
  },
  {
    id: 'coxsbazar',
    name: 'কক্সবাজার সমুদ্র সৈকত',
    district: 'চট্টগ্রাম • কক্সবাজার',
    tours: '১২টি গ্রুপ ট্যুর',
    desc: 'বিশ্বের দীর্ঘতম ১২০ কিলোমিটারের প্রাকৃতিক বালুকাময় সমুদ্র সৈকত।',
    price: '৳৩,৮০০',
    img: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&q=80',
    featured: false,
  },
  {
    id: 'bandarban',
    name: 'কেওক্রাডং ও নাফাকুম',
    district: 'পার্বত্য বান্দরবান',
    tours: '৯টি গ্রুপ ট্যুর',
    desc: 'অভিযাত্রীদের প্রিয় পাহাড়ি ট্রেইল, বগালেক ও রোমাঞ্চকর ঝর্ণা দর্শন।',
    price: '৳৫,২০০',
    img: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=400&q=80',
    featured: false,
  },
];

export default function DestinationsGrid() {
  const featured = destinations.find((d) => d.featured) || destinations[0];
  const rest = destinations.filter((d) => !d.featured);

  return (
    <section id="destinations" className="w-full py-16 border-b border-surface-variant/30" style={{ backgroundColor: '#FFFFFF' }}>
      <div className="max-w-[1360px] mx-auto px-4 md:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <div className="inline-flex items-center gap-1 label-md uppercase tracking-wider mb-1"
                 style={{ color: 'var(--color-secondary)' }}>
              <span className="icon text-base">map</span>
              দর্শনার্থীদের শীর্ষ পছন্দ
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight"
                style={{ color: 'var(--color-primary)', fontFamily: '"Tiro Bangla", serif' }}>
              বাংলার সেরা দৃশ্যপট ও অ্যাডভেঞ্চার
            </h2>
          </div>
        <a href="#" className="inline-flex items-center gap-2 label-lg transition-colors group"
           style={{ color: 'var(--color-secondary)' }}>
          <span>সকল ৬৪ জেলার তালিকা দেখুন</span>
          <span className="icon text-lg" style={{ transition: 'transform 0.2s' }}>arrow_forward</span>
        </a>
      </div>

      {/* Asymmetrical Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Featured — 7 cols */}
        <div className="md:col-span-7 rounded-xl overflow-hidden shadow-sm flex flex-col justify-between group hover:shadow-md transition-all duration-300"
             style={{ backgroundColor: 'var(--color-surface-container)' }}>
          {/* Image */}
          <div className="relative overflow-hidden" style={{ height: '24rem' }}>
            <div className="w-full h-full bg-cover bg-center img-hover"
                 style={{ backgroundImage: `url('${featured.img}')` }} />
            <div className="absolute inset-0"
                 style={{ background: 'linear-gradient(to top, rgba(3,37,26,0.9) 0%, rgba(3,37,26,0.3) 50%, transparent 100%)' }} />
            {/* Badges */}
            <div className="absolute top-4 left-4 flex gap-2">
              <span className="px-3 py-1 rounded-full label-sm shadow"
                    style={{ backgroundColor: 'var(--color-on-tertiary-container)', color: 'var(--color-on-tertiary)' }}>
                {featured.badge}
              </span>
              <span className="px-3 py-1 rounded-full label-sm"
                    style={{ backgroundColor: 'rgba(255,255,255,0.85)', backdropFilter: 'blur(8px)', color: 'var(--color-primary)' }}>
                {featured.district}
              </span>
            </div>
            {/* Info overlay */}
            <div className="absolute bottom-4 left-4 right-4" style={{ color: 'var(--color-surface-bright)' }}>
              <div className="flex items-center gap-2 mb-1">
                <span className="icon text-base" style={{ color: 'var(--color-secondary-fixed)' }}>altitude</span>
                <span className="label-sm" style={{ color: 'var(--color-surface-variant)' }}>উচ্চতা: {featured.altitude}</span>
                <span style={{ color: 'var(--color-surface-variant)' }}>•</span>
                <span className="icon text-base" style={{ color: '#FBBF24' }}>star</span>
                <span className="label-sm">{featured.rating} ({featured.reviews} রিভিউ)</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold" style={{ color: 'var(--color-on-primary)', fontFamily: '"Tiro Bangla", serif' }}>{featured.name}</h3>
              <p className="body-md line-clamp-2 mt-1" style={{ color: 'var(--color-surface-variant)' }}>{featured.desc}</p>
            </div>
          </div>

          {/* Footer bar */}
          <div className="p-4 flex items-center justify-between"
               style={{ backgroundColor: 'var(--color-surface-container-high)' }}>
            <div className="flex items-center gap-2">
              <span className="relative flex h-3 w-3">
                <span className="absolute inline-flex h-full w-full rounded-full opacity-75"
                      style={{ backgroundColor: 'var(--color-secondary)', animation: 'ping 1.5s cubic-bezier(0,0,0.2,1) infinite' }} />
                <span className="relative inline-flex rounded-full h-3 w-3"
                      style={{ backgroundColor: 'var(--color-secondary)' }} />
              </span>
              <span className="label-md" style={{ color: 'var(--color-on-surface)' }}>
                এই সপ্তাহে {featured.activeTours}
              </span>
            </div>
            <a href="#live-tours" className="btn-primary px-4 py-2 label-md">ট্যুরসমূহ দেখুন</a>
          </div>
        </div>

        {/* Right stack — 5 cols */}
        <div className="md:col-span-5 flex flex-col gap-4">
          {rest.map((dest) => (
            <div key={dest.id}
                 className="rounded-xl overflow-hidden shadow-sm flex flex-row group hover:shadow-md transition-all duration-300"
                 style={{ backgroundColor: 'var(--color-surface-container)' }}>
              {/* Thumbnail */}
              <div className="w-1/3 overflow-hidden" style={{ minHeight: '140px' }}>
                <div className="w-full h-full bg-cover bg-center img-hover"
                     style={{ backgroundImage: `url('${dest.img}')`, minHeight: '140px' }} />
              </div>
              {/* Info */}
              <div className="w-2/3 p-4 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between">
                    <span className="px-2 py-0.5 rounded label-sm"
                          style={{ backgroundColor: 'var(--color-surface-container-highest)', color: 'var(--color-secondary)' }}>
                      {dest.district}
                    </span>
                    <span className="label-sm" style={{ color: 'var(--color-on-surface-variant)' }}>{dest.tours}</span>
                  </div>
                  <h4 className="text-base font-bold mt-1 line-clamp-1" style={{ color: 'var(--color-primary)', fontFamily: '"Tiro Bangla", serif' }}>{dest.name}</h4>
                  <p className="body-sm line-clamp-1 mt-0.5" style={{ color: 'var(--color-on-surface-variant)' }}>{dest.desc}</p>
                </div>
                <div className="flex items-center justify-between pt-2">
                  <span className="label-md font-semibold" style={{ color: 'var(--color-primary)' }}>
                    প্যাকেজ শুরু {dest.price} হতে
                  </span>
                  <span className="icon text-lg" style={{ color: 'var(--color-secondary)' }}>arrow_forward</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
);
}
