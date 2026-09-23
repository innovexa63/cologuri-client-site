const liveTours = [
  {
    id: 'lt1',
    title: 'মেঘ ছোঁয়ার সাজেক ভ্যালি ৩ রাত ২ দিন',
    route: 'ঢাকা → খাগড়াছড়ি → সাজেক → কংলাক',
    date: '২৮-২৯ মার্চ',
    seats: 18, totalSeats: 24,
    price: '৳৫,৫০০',
    remaining: '৩টি সিট বাকি',
    host: 'Cholo Bangladesh + Green Voyagers',
    img: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=600&q=80',
  },
  {
    id: 'lt2',
    title: 'সুন্দরবন ক্রুজ ও ওয়াইল্ডলাইফ সাফারি',
    route: 'খুলনা → হিরণ পয়েন্ট → কটকা জামতলা',
    date: '১-৩ এপ্রিল',
    seats: 22, totalSeats: 30,
    price: '৳৮,৯০০',
    remaining: '৪টি সিট বাকি',
    host: 'Sundarban Eco Tours + ৩টি গ্রুপ',
    img: 'https://images.unsplash.com/photo-1547036967-23d11aacaee0?w=600&q=80',
  },
  {
    id: 'lt3',
    title: 'কক্সবাজার ও ইনানী রিল্যাক্স বিচ ট্রিপ',
    route: 'ঢাকা → মেরিন ড্রাইভ → ইনানী → টেকনাফ',
    date: '১০-১৩ এপ্রিল',
    seats: 28, totalSeats: 32,
    price: '৳৪,২০০',
    remaining: '২টি সিট বাকি',
    host: 'Sea Breeze Backpackers',
    img: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&q=80',
  },
];

export default function LiveJointTours({ onSelectTour }) {
  const tourMapping = {
    lt1: 'sajek-1',
    lt2: 'sundarban-1',
    lt3: 'coxsbazar-1',
  };

  const handleCardClick = (id) => {
    if (onSelectTour) {
      onSelectTour(tourMapping[id] || 'sajek-1');
    }
  };

  return (
    <section
      id="live-tours"
      className="w-full py-16 relative overflow-hidden border-b border-surface-variant/30"
      style={{ backgroundColor: '#FFFFFF' }}
    >
      <div className="max-w-[1360px] mx-auto px-4 md:px-8">
        {/* Header */}
        <div className="mb-8">
          <h2
            className="text-2xl sm:text-3xl font-bold tracking-tight"
            style={{ color: 'var(--color-primary)', fontFamily: '"Tiro Bangla", serif' }}
          >
            লাইভ ট্যুর
          </h2>
        </div>

        {/* Tour Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {liveTours.map((tour) => {
            const pct = Math.round((tour.seats / tour.totalSeats) * 100);
            return (
              <div
                key={tour.id}
                onClick={() => handleCardClick(tour.id)}
                className="card-base group flex flex-col justify-between cursor-pointer hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
              >
                <div>
                  {/* Image */}
                  <div className="relative h-48 w-full overflow-hidden">
                    <img
                      src={tour.img}
                      alt={tour.title}
                      className="w-full h-full object-cover img-hover"
                    />
                    <div className="absolute inset-0"
                         style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.6), transparent 40%, rgba(0,0,0,0.2))' }} />
                    {/* Remaining seats */}
                    <div className="absolute top-3 left-3">
                      <span className="pill pill-orange">{tour.remaining}</span>
                    </div>
                    {/* Date */}
                    <div className="absolute top-3 right-3">
                      <span className="label-sm px-2.5 py-1 rounded-full flex items-center gap-1"
                            style={{ backgroundColor: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(8px)', color: 'white', border: '1px solid rgba(255,255,255,0.2)' }}>
                        <span className="icon text-sm">schedule</span>
                        {tour.date}
                      </span>
                    </div>
                  </div>

                  <div className="p-4">
                    <h3 className="text-base sm:text-lg font-bold transition-colors group-hover:text-secondary line-clamp-2"
                        style={{ color: 'var(--color-primary)', fontFamily: '"Tiro Bangla", serif' }}>
                      {tour.title}
                    </h3>
                    <p className="body-sm mt-1 flex items-center gap-1" style={{ color: '#5C6B60' }}>
                      <span className="icon text-base" style={{ color: 'var(--color-secondary)' }}>route</span>
                      {tour.route}
                    </p>

                    {/* Seat bar */}
                    <div className="p-3 rounded-xl my-4"
                         style={{ backgroundColor: '#F9F8F5', border: '1px solid #ECE7DE' }}>
                      <div className="flex items-center justify-between label-sm mb-1.5" style={{ color: '#414844' }}>
                        <span>সিট পূরণ: {tour.seats}/{tour.totalSeats} জন</span>
                        <span className="font-bold" style={{ color: 'var(--color-secondary)' }}>{pct}% বুকড</span>
                      </div>
                      <div className="seat-bar-track">
                        <div className="seat-bar-fill" style={{ width: `${pct}%` }} />
                      </div>
                    </div>

                    {/* Host */}
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md body-sm"
                         style={{ backgroundColor: '#F0EFEB', color: '#4A554D' }}>
                      <span className="icon text-base" style={{ color: 'var(--color-secondary)' }}>diversity_3</span>
                      হোস্ট: <strong>{tour.host}</strong>
                    </div>
                  </div>
                </div>

                {/* Bottom action */}
                <div className="px-4 pb-4">
                  <div className="pt-4 flex items-center justify-between" style={{ borderTop: '1px solid #F0EFEB' }}>
                    <div>
                      <span className="label-sm block" style={{ color: '#5C6B60' }}>প্রতি জন প্যাকেজ</span>
                      <span className="headline-md font-bold" style={{ color: '#1B3B2F' }}>{tour.price}</span>
                    </div>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleCardClick(tour.id);
                      }}
                      className="btn-cta px-4 py-2 label-md flex items-center gap-1"
                      style={{ fontSize: '0.75rem', padding: '0.5rem 1rem', boxShadow: 'none' }}
                      id={`book-${tour.id}`}
                    >
                      সিট বুক করুন
                      <span className="icon text-base">chevron_right</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
