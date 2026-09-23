const groups = [
  {
    id: 'g1',
    name: 'ঘুরি বাংলাদেশ',
    location: 'ঢাকা',
    rating: 4.9,
    trips: 184,
    badge: 'টপ রেটেড',
    color: '#166B47',
    initials: 'ঘুরি',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=200&q=80',
  },
  {
    id: 'g2',
    name: 'সবুজ পথিক ট্রাভেলার্স',
    location: 'চট্টগ্রাম',
    rating: 4.8,
    trips: 126,
    badge: 'ভেরিফায়েড',
    color: '#03251A',
    initials: 'পথিক',
    image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=200&q=80',
  },
  {
    id: 'g3',
    name: 'পাহাড়ি স্বপ্ন অ্যাডভেঞ্চার',
    location: 'বান্দরবান',
    rating: 4.9,
    trips: 98,
    badge: 'ট্রেকিং স্পেশালিস্ট',
    color: '#EF7F45',
    initials: 'পাহাড়',
    image: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=200&q=80',
  },
  {
    id: 'g4',
    name: 'নীল দিগন্ত ট্যুরস',
    location: 'কক্সবাজার',
    rating: 4.7,
    trips: 152,
    badge: 'সি-বিচ স্পেশালিস্ট',
    color: '#1F724D',
    initials: 'দিগন্ত',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=200&q=80',
  },
  {
    id: 'g5',
    name: 'সুন্দরবন সাফারি টিম',
    location: 'খুলনা',
    rating: 4.8,
    trips: 87,
    badge: 'ইকো ট্যুর',
    color: '#1B3B2F',
    initials: 'সাফারি',
    image: 'https://images.unsplash.com/photo-1624811532702-fc35e8f9b9ff?w=200&q=80',
  },
  {
    id: 'g6',
    name: 'মেঘদালান ক্যাম্পার্স',
    location: 'রাঙামাটি',
    rating: 4.9,
    trips: 110,
    badge: 'ক্যাম্পিং স্পেশাল',
    color: '#C9622B',
    initials: 'মেঘ',
    image: 'https://images.unsplash.com/photo-1510312305653-8ed496efae75?w=200&q=80',
  },
  {
    id: 'g7',
    name: 'ভ্রমণকন্যা (নারী স্পেশাল)',
    location: 'সারাদেশ',
    rating: 5.0,
    trips: 145,
    badge: 'নারী-বান্ধব',
    color: '#8E24AA',
    initials: 'কন্যা',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&q=80',
  },
  {
    id: 'g8',
    name: 'হাওর বাউল ট্রিপস',
    location: 'সুনামগঞ্জ',
    rating: 4.8,
    trips: 76,
    badge: 'বোট হাউস স্পেশাল',
    color: '#00695C',
    initials: 'হাওর',
    image: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=200&q=80',
  },
  {
    id: 'g9',
    name: 'চা-দেশ এক্সপ্লোরারস',
    location: 'শ্রীমঙ্গল',
    rating: 4.7,
    trips: 92,
    badge: 'চা-বাগান স্পেশাল',
    color: '#2E7D32',
    initials: 'শ্রীমঙ্গল',
    image: 'https://images.unsplash.com/photo-1587595431973-160d0d94add1?w=200&q=80',
  },
];

export default function TourGroupsMarquee() {
  // Double array to create seamless loop
  const marqueeItems = [...groups, ...groups];

  return (
    <section
      id="tour-groups"
      className="w-full py-16 overflow-hidden border-b border-surface-variant/40"
      style={{ backgroundColor: 'var(--color-surface-container-low)' }}
      aria-label="বিশ্বস্ত ট্যুর গ্রুপসমূহ"
    >
      <div className="max-w-[1360px] mx-auto px-4 md:px-8 mb-10 text-center">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full mb-3 shadow-xs"
             style={{ backgroundColor: 'var(--color-surface-container-highest)', color: 'var(--color-secondary)' }}>
          <span className="material-symbols-outlined text-[16px]">verified</span>
          <span className="text-xs font-semibold tracking-wide">১০০+ নিবন্ধিত ও অনুমোদিত ট্যুর অপারেটর</span>
        </div>
        <h2
          className="text-2xl sm:text-3xl font-bold tracking-tight"
          style={{ color: 'var(--color-primary)', fontFamily: '"Tiro Bangla", serif' }}
        >
          বিশ্বস্ত ট্যুর গ্রুপ ও ট্রাভেল পার্টনার্স
        </h2>
        <p className="text-sm mt-2 max-w-2xl mx-auto" style={{ color: 'var(--color-on-surface-variant)' }}>
          GhurBei প্ল্যাটফর্মে যুক্ত প্রতিটি গ্রুপ কঠোরভাবে ব্যাকগ্রাউন্ড ও নিরাপত্তা যাচাইকৃত। আপনার পছন্দের গ্রুপের সাথে যুক্ত হোন।
        </p>
      </div>

      {/* Marquee track: flowing right to left */}
      <div className="relative w-full overflow-hidden">
        {/* Soft edge gradient masks */}
        <div
          className="absolute left-0 inset-y-0 w-24 sm:w-36 z-10 pointer-events-none"
          style={{
            background: 'linear-gradient(to right, var(--color-surface-container-low), transparent)',
          }}
        />
        <div
          className="absolute right-0 inset-y-0 w-24 sm:w-36 z-10 pointer-events-none"
          style={{
            background: 'linear-gradient(to left, var(--color-surface-container-low), transparent)',
          }}
        />

        {/* Scrolling list */}
        <div className="animate-marquee flex items-center gap-6 py-4">
          {marqueeItems.map((group, index) => (
            <div
              key={`${group.id}-${index}`}
              className="flex flex-col items-center group cursor-pointer transition-transform duration-300 hover:-translate-y-1 shrink-0"
              style={{ width: '180px' }}
            >
              {/* Circular Logo Frame */}
              <div className="relative mb-3">
                <div
                  className="w-20 h-20 rounded-full p-1 transition-all duration-300 group-hover:scale-105 shadow-md flex items-center justify-center overflow-hidden"
                  style={{
                    background: `linear-gradient(135deg, ${group.color}, #a3f4c5)`,
                  }}
                >
                  <div className="w-full h-full rounded-full overflow-hidden bg-white relative flex items-center justify-center">
                    {group.image ? (
                      <img
                        src={group.image}
                        alt={group.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        loading="lazy"
                      />
                    ) : (
                      <span
                        className="font-bold text-lg"
                        style={{ color: group.color, fontFamily: '"Tiro Bangla", serif' }}
                      >
                        {group.initials}
                      </span>
                    )}
                  </div>
                </div>

                {/* Verified Tick Badge */}
                <div
                  className="absolute -bottom-0.5 -right-0.5 w-6 h-6 rounded-full flex items-center justify-center shadow-md"
                  style={{ backgroundColor: '#166B47', color: '#ffffff' }}
                  title="ভেরিফায়েড অপারেটর"
                >
                  <span className="material-symbols-outlined text-[14px]">check</span>
                </div>
              </div>

              {/* Group Name in Tiro Bangla */}
              <h3
                className="text-sm font-bold text-center group-hover:text-secondary transition-colors line-clamp-1"
                style={{ color: 'var(--color-primary)', fontFamily: '"Tiro Bangla", serif' }}
              >
                {group.name}
              </h3>

              {/* Location & Rating */}
              <div className="flex items-center gap-1.5 mt-1 text-xs" style={{ color: 'var(--color-on-surface-variant)' }}>
                <span className="inline-flex items-center gap-0.5 text-amber-500 font-semibold">
                  ★ {group.rating}
                </span>
                <span>•</span>
                <span>{group.trips}টি ট্রিপ</span>
              </div>

              {/* Category chip */}
              <span
                className="mt-2 px-2.5 py-0.5 rounded-full text-[11px] font-semibold transition-colors"
                style={{
                  backgroundColor: 'var(--color-surface-container-highest)',
                  color: 'var(--color-secondary)',
                }}
              >
                {group.badge}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
