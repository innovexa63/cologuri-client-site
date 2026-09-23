import { useState, useMemo } from 'react';

const mockTourList = [
  {
    id: 'sajek-1',
    title: 'মেঘ ছোঁয়ার সাজেক ভ্যালি ও কংলাক পাহাড়ি অভিযান',
    destination: 'sajek',
    destinationName: 'সাজেক ভ্যালি',
    route: 'ঢাকা → খাগড়াছড়ি → সাজেক → কংলাক পাড়া',
    startDate: '২৮ অক্টোবর ২০২৬',
    duration: '৩ রাত ২ দিন',
    operator: 'ঘুরি বাংলাদেশ',
    operatorRating: 4.9,
    operatorTrips: 184,
    price: 4800,
    seatsTotal: 40,
    seatsBooked: 35,
    isJointTour: true,
    tag: 'লাইভ জয়েন্ট ট্যুর',
    tagColor: '#C9622B',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80',
    inclusions: ['নন-এসি বাস', 'ব্যাম্বু চিকেন', 'রিসোর্ট স্টে', 'চান্দের গাড়ি'],
  },
  {
    id: 'sajek-2',
    title: 'সাজেক উইকএন্ড রিল্যাক্স ও তারা দেখার ক্যাম্পিং',
    destination: 'sajek',
    destinationName: 'সাজেক ভ্যালি',
    route: 'ঢাকা → দিঘীনালা → সাজেক ভ্যালি',
    startDate: '০২ নভেম্বর ২০২৬',
    duration: '২ রাত ৩ দিন',
    operator: 'মেঘদালান ক্যাম্পার্স',
    operatorRating: 4.8,
    operatorTrips: 110,
    price: 5200,
    seatsTotal: 25,
    seatsBooked: 21,
    isJointTour: true,
    tag: 'ক্যাম্পিং স্পেশাল',
    tagColor: '#166B47',
    image: 'https://images.unsplash.com/photo-1510312305653-8ed496efae75?w=800&q=80',
    inclusions: ['এসি বাস', 'বারবিকিউ ডিনার', 'ইকো কটেজ', 'গাইড'],
  },
  {
    id: 'sundarbans-1',
    title: 'সুন্দরবন ম্যানগ্রোভ সাফারি ও ওয়াইল্ডলাইফ ক্রুজ',
    destination: 'sundarbans',
    destinationName: 'সুন্দরবন',
    route: 'ঢাকা → মোংলা → কটকা → হিরণ পয়েন্ট → করমজল',
    startDate: '১০ নভেম্বর ২০২৬',
    duration: '৩ রাত ৪ দিন',
    operator: 'সুন্দরবন সাফারি টিম',
    operatorRating: 4.8,
    operatorTrips: 87,
    price: 6500,
    seatsTotal: 35,
    seatsBooked: 24,
    isJointTour: true,
    tag: 'ইকো ট্যুরিজম',
    tagColor: '#00695C',
    image: 'https://images.unsplash.com/photo-1624811532702-fc35e8f9b9ff?w=800&q=80',
    inclusions: ['লাক্সারি জাহাজ', 'সব বেলার খাবার', 'বনবিভাগ অনুমতি', 'সশস্ত্র বনরক্ষী'],
  },
  {
    id: 'coxsbazar-1',
    title: 'কক্সবাজার সমুদ্র বিলাস ও মেরিন ড্রাইভ লং ড্রাইভ',
    destination: 'coxsbazar',
    destinationName: 'কক্সবাজার',
    route: 'ঢাকা → কক্সবাজার → হিমছড়ি → ইনানী সৈকত',
    startDate: '১৫ নভেম্বর ২০২৬',
    duration: '৩ রাত ২ দিন',
    operator: 'নীল দিগন্ত ট্যুরস',
    operatorRating: 4.7,
    operatorTrips: 152,
    price: 4200,
    seatsTotal: 45,
    seatsBooked: 43,
    isJointTour: true,
    tag: 'লাস্ট ২ সিট বাকি',
    tagColor: '#BA1A1A',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80',
    inclusions: ['এসি বাস', '৩-স্টার হোটেল', 'বুফে নাস্তা', 'মেরিন ড্রাইভ জিপ'],
  },
  {
    id: 'bandarban-1',
    title: 'বান্দরবান নীলগিরি ও কেওক্রাডং সামিট ট্রেকিং',
    destination: 'bandarban',
    destinationName: 'বান্দরবান',
    route: 'ঢাকা → বান্দরবান সদর → বগালেক → কেওক্রাডং',
    startDate: '১৮ নভেম্বর ২০২৬',
    duration: '৪ রাত ৩ দিন',
    operator: 'পাহাড়ি স্বপ্ন অ্যাডভেঞ্চার',
    operatorRating: 4.9,
    operatorTrips: 98,
    price: 5900,
    seatsTotal: 20,
    seatsBooked: 16,
    isJointTour: false,
    tag: 'অ্যাডভেঞ্চার ট্রেকিং',
    tagColor: '#EF7F45',
    image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&q=80',
    inclusions: ['নন-এসি বাস', 'চান্দের গাড়ি', 'ট্রেকিং গাইড', 'আদিবাসী খাবার'],
  },
  {
    id: 'sreemangal-1',
    title: 'শ্রীমঙ্গল সবুজ চা বাগান ও লাউয়াছড়া রেইনফরেস্ট',
    destination: 'sreemangal',
    destinationName: 'শ্রীমঙ্গল',
    route: 'ঢাকা → শ্রীমঙ্গল → হামহাম ঝর্ণা → মাধবপুর লেক',
    startDate: '২২ নভেম্বর ২০২৬',
    duration: '২ রাত ২ দিন',
    operator: 'চা-দেশ এক্সপ্লোরারস',
    operatorRating: 4.7,
    operatorTrips: 92,
    price: 3600,
    seatsTotal: 30,
    seatsBooked: 18,
    isJointTour: true,
    tag: 'ফ্যামিলি ফ্রেন্ডলি',
    tagColor: '#2E7D32',
    image: 'https://images.unsplash.com/photo-1467436072131-2063809e7898?w=800&q=80',
    inclusions: ['নন-এসি বাস', 'ইকো রিসোর্ট', '৭ রঙের চা', 'গাইড'],
  },
  {
    id: 'saintmartin-1',
    title: 'সেন্টমার্টিন নীল জল ও প্রবাল দ্বীপ পূর্ণিমা উৎসব',
    destination: 'saintmartin',
    destinationName: 'সেন্টমার্টিন দ্বীপ',
    route: 'ঢাকা → টেকনাফ → সেন্টমার্টিন → ছেঁড়াদ্বীপ',
    startDate: '০১ ডিসেম্বর ২০২৬',
    duration: '৩ রাত ২ দিন',
    operator: 'ঘুরি বাংলাদেশ',
    operatorRating: 4.9,
    operatorTrips: 184,
    price: 6800,
    seatsTotal: 50,
    seatsBooked: 38,
    isJointTour: true,
    tag: 'দ্বীপ অভিযান',
    tagColor: '#00695C',
    image: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=800&q=80',
    inclusions: ['এসি বাস', 'শিপ টিকিট', 'বিচ রিসোর্ট', 'বারবিকিউ ডিনার'],
  },
  {
    id: 'tanguar-1',
    title: 'টাঙ্গুয়ার হাওর প্রিমিয়াম বোট হাউস এক্সপেরিয়েন্স',
    destination: 'tanguar',
    destinationName: 'টাঙ্গুয়ার হাওর',
    route: 'ঢাকা → সুনামগঞ্জ → তাহিরপুর → টাঙ্গুয়ার হাওর',
    startDate: '০৫ ডিসেম্বর ২০২৬',
    duration: '২ রাত ৩ দিন',
    operator: 'হাওর বাউল ট্রিপস',
    operatorRating: 4.8,
    operatorTrips: 76,
    price: 7500,
    seatsTotal: 22,
    seatsBooked: 17,
    isJointTour: true,
    tag: 'লাক্সারি হাউসবোট',
    tagColor: '#8E24AA',
    image: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=800&q=80',
    inclusions: ['এসি হাউসবোট', 'দেশি হাঁসের মাংস', 'লাইফ জ্যাকেট', 'জাদুকাটা নদী দর্শন'],
  },
];

const destFilterOptions = [
  { value: 'all', label: 'সকল গন্তব্য' },
  { value: 'sajek', label: 'সাজেক ভ্যালি' },
  { value: 'sundarbans', label: 'সুন্দরবন' },
  { value: 'coxsbazar', label: 'কক্সবাজার' },
  { value: 'saintmartin', label: 'সেন্টমার্টিন দ্বীপ' },
  { value: 'sreemangal', label: 'শ্রীমঙ্গল' },
  { value: 'bandarban', label: 'বান্দরবান' },
  { value: 'tanguar', label: 'টাঙ্গুয়ার হাওর' },
];

export default function SearchResultsPage({ initialQuery = {}, onBackToHome, onSelectTour }) {
  const [destination, setDestination] = useState(initialQuery.destination || 'all');
  const [date, setDate] = useState(initialQuery.date || '');
  const [guests, setGuests] = useState(initialQuery.guests || '2');
  const [selectedTag, setSelectedTag] = useState('all');
  const [sortBy, setSortBy] = useState('recommended');
  const [bookingSuccessId, setBookingSuccessId] = useState(null);

  // Filter logic
  const filteredTours = useMemo(() => {
    return mockTourList.filter((tour) => {
      // Destination filter
      if (destination !== 'all' && tour.destination !== destination) {
        return false;
      }
      // Tag filter
      if (selectedTag === 'joint' && !tour.isJointTour) return false;
      if (selectedTag === 'camping' && !tour.tag.includes('ক্যাম্পিং')) return false;
      if (selectedTag === 'trekking' && !tour.tag.includes('ট্রেকিং')) return false;

      return true;
    }).sort((a, b) => {
      if (sortBy === 'priceLow') return a.price - b.price;
      if (sortBy === 'priceHigh') return b.price - a.price;
      if (sortBy === 'seatsLeft') {
        const leftA = a.seatsTotal - a.seatsBooked;
        const leftB = b.seatsTotal - b.seatsBooked;
        return leftA - leftB;
      }
      return b.operatorRating - a.operatorRating;
    });
  }, [destination, selectedTag, sortBy]);

  const handleBooking = (tourId) => {
    if (onSelectTour) {
      onSelectTour(tourId);
      return;
    }
    setBookingSuccessId(tourId);
    setTimeout(() => {
      setBookingSuccessId(null);
    }, 4000);
  };

  return (
    <div className="min-h-screen bg-[#F7FBF8] text-[#111E16] pb-20">
      {/* Top Header / Search Section */}
      <section className="w-full bg-[#03251A] text-white pt-24 pb-8 border-b border-[#166B47]/40 relative overflow-hidden shadow-lg">
        {/* Subtle background overlay */}
        <div
          className="absolute inset-0 z-0 opacity-15 bg-cover bg-center"
          style={{ backgroundImage: `url('https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1600&q=80')` }}
        />

        <div className="max-w-[1360px] mx-auto px-4 md:px-8 relative z-10">

          <h1
            className="text-2xl sm:text-3xl font-bold mb-6 text-white tracking-tight"
            style={{ fontFamily: '"Tiro Bangla", serif' }}
          >
            ট্যুর অনুসন্ধান ও ফলাফল
          </h1>

          {/* Search Dock (Pinned at top of this page) */}
          <div
            className="w-full bg-white rounded-2xl p-5 shadow-2xl text-[#111E16]"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-end">
              {/* Destination */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-[#414844] flex items-center gap-1">
                  <span className="material-symbols-outlined text-[16px] text-[#166B47]">location_on</span>
                  <span>গন্তব্য নির্বাচন করুন</span>
                </label>
                <div className="relative">
                  <select
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                    className="w-full bg-[#EDFEEF] px-3.5 py-2.5 rounded-xl text-sm font-medium text-[#111E16] focus:outline-none focus:ring-2 focus:ring-[#166B47] appearance-none cursor-pointer pr-8 border border-[#CFE3D5]"
                  >
                    {destFilterOptions.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                  <span className="material-symbols-outlined absolute right-2.5 top-2.5 text-[20px] text-[#727974] pointer-events-none">
                    expand_more
                  </span>
                </div>
              </div>

              {/* Date */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-[#414844] flex items-center gap-1">
                  <span className="material-symbols-outlined text-[16px] text-[#166B47]">calendar_month</span>
                  <span>ভ্রমণের তারিখ</span>
                </label>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full bg-[#EDFEEF] px-3.5 py-2.5 rounded-xl text-sm font-medium text-[#111E16] focus:outline-none focus:ring-2 focus:ring-[#166B47] cursor-pointer border border-[#CFE3D5]"
                />
              </div>

              {/* Passengers */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-[#414844] flex items-center gap-1">
                  <span className="material-symbols-outlined text-[16px] text-[#166B47]">group</span>
                  <span>যাত্রী সংখ্যা</span>
                </label>
                <div className="relative">
                  <select
                    value={guests}
                    onChange={(e) => setGuests(e.target.value)}
                    className="w-full bg-[#EDFEEF] px-3.5 py-2.5 rounded-xl text-sm font-medium text-[#111E16] focus:outline-none focus:ring-2 focus:ring-[#166B47] appearance-none cursor-pointer pr-8 border border-[#CFE3D5]"
                  >
                    <option value="1">১ জন (সোলো ট্রাভেলার)</option>
                    <option value="2">২ জন (শেয়ার্ড রুম)</option>
                    <option value="4">৪-৬ জন (গ্রুপ সিট)</option>
                    <option value="10">১০+ জন (সম্পূর্ণ টিম)</option>
                  </select>
                  <span className="material-symbols-outlined absolute right-2.5 top-2.5 text-[20px] text-[#727974] pointer-events-none">
                    expand_more
                  </span>
                </div>
              </div>

              {/* Action Button */}
              <div>
                <button
                  type="button"
                  onClick={() => {}}
                  className="w-full h-[46px] rounded-xl text-sm font-bold flex items-center justify-center gap-1.5 transition-all duration-200 shadow-md cursor-pointer hover:shadow-lg hover:-translate-y-0.5"
                  style={{
                    backgroundColor: 'var(--color-on-tertiary-container)',
                    color: '#ffffff',
                  }}
                >
                  <span className="material-symbols-outlined text-[20px]">search</span>
                  <span>সার্চ আপডেট করুন</span>
                </button>
              </div>
            </div>

            {/* Filter tags below dock */}
            <div className="flex flex-wrap items-center gap-2 pt-4 mt-4 border-t border-gray-100 text-xs">
              <span className="font-semibold text-[#414844]">ফিল্টার:</span>
              <button
                onClick={() => setSelectedTag('all')}
                className={`px-3 py-1 rounded-full font-medium transition-colors cursor-pointer ${
                  selectedTag === 'all'
                    ? 'bg-[#03251A] text-white font-bold'
                    : 'bg-[#EDFEEF] text-[#111E16] hover:bg-[#DCEEDE]'
                }`}
              >
                সকল ট্যুর ({mockTourList.length})
              </button>
              <button
                onClick={() => setSelectedTag('joint')}
                className={`px-3 py-1 rounded-full font-medium transition-colors cursor-pointer ${
                  selectedTag === 'joint'
                    ? 'bg-[#03251A] text-white font-bold'
                    : 'bg-[#EDFEEF] text-[#111E16] hover:bg-[#DCEEDE]'
                }`}
              >
                জয়েন্ট ট্যুর
              </button>
              <button
                onClick={() => setSelectedTag('camping')}
                className={`px-3 py-1 rounded-full font-medium transition-colors cursor-pointer ${
                  selectedTag === 'camping'
                    ? 'bg-[#03251A] text-white font-bold'
                    : 'bg-[#EDFEEF] text-[#111E16] hover:bg-[#DCEEDE]'
                }`}
              >
                ক্যাম্পিং
              </button>
              <button
                onClick={() => setSelectedTag('trekking')}
                className={`px-3 py-1 rounded-full font-medium transition-colors cursor-pointer ${
                  selectedTag === 'trekking'
                    ? 'bg-[#03251A] text-white font-bold'
                    : 'bg-[#EDFEEF] text-[#111E16] hover:bg-[#DCEEDE]'
                }`}
              >
                ট্রেকিং অভিযান
              </button>

              {destination !== 'all' && (
                <button
                  onClick={() => setDestination('all')}
                  className="px-2.5 py-1 rounded-full font-medium bg-[#FFDAD6] text-[#93000A] flex items-center gap-1 hover:bg-[#FFB4AB] cursor-pointer ml-auto"
                >
                  <span>গন্তব্য ফিল্টার মুছুন</span>
                  <span className="material-symbols-outlined text-[14px]">close</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Booking Notification Banner */}
      {bookingSuccessId && (
        <div className="max-w-[1360px] mx-auto px-4 md:px-8 mt-6">
          <div className="p-4 rounded-xl bg-[#A3F4C5]/30 border border-[#166B47] text-[#03251A] flex items-center justify-between shadow-sm animate-fade-in">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[24px] text-[#166B47]">check_circle</span>
              <span className="text-sm font-semibold">
                আপনার সিট বুকিং অনুরোধ সফলভাবে গ্রহণ করা হয়েছে! ট্যুর গ্রুপ টিম শীঘ্রই হোয়াটসঅ্যাপে নিশ্চিতকরণ পাঠাবে।
              </span>
            </div>
            <button
              onClick={() => setBookingSuccessId(null)}
              className="text-xs font-bold text-[#166B47] hover:underline"
            >
              বন্ধ করুন
            </button>
          </div>
        </div>
      )}

      {/* Results Section (Beneath Search) */}
      <main className="max-w-[1360px] mx-auto px-4 md:px-8 mt-8">
        {/* Result summary and sort bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 mb-6 border-b border-gray-200">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-[#166B47]">
              অনুসন্ধান ফলাফল
            </span>
            <h2
              className="text-xl sm:text-2xl font-bold tracking-tight text-[#03251A]"
              style={{ fontFamily: '"Tiro Bangla", serif' }}
            >
              খুঁজে পাওয়া গেছে {filteredTours.length}টি প্যাকেজ
            </h2>
          </div>

          {/* Sort selector */}
          <div className="flex items-center gap-2">
            <span className="text-xs text-[#414844]">সাজান:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-white border border-gray-200 rounded-lg px-3 py-1.5 text-xs font-medium text-[#111E16] focus:outline-none focus:ring-1 focus:ring-[#166B47] cursor-pointer shadow-xs"
            >
              <option value="recommended">রেটিং (সেরা প্রথম)</option>
              <option value="priceLow">মূল্য: কম থেকে বেশি</option>
              <option value="priceHigh">মূল্য: বেশি থেকে কম</option>
              <option value="seatsLeft">জরুরি (কম সিট বাকি)</option>
            </select>
          </div>
        </div>

        {/* Tour Cards Grid */}
        {filteredTours.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTours.map((tour) => {
              const pct = Math.round((tour.seatsBooked / tour.seatsTotal) * 100);
              const remaining = tour.seatsTotal - tour.seatsBooked;

              return (
                <div
                  key={tour.id}
                  onClick={() => handleBooking(tour.id)}
                  className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between border border-[#E2DDD3]/80 group cursor-pointer transform hover:-translate-y-1"
                >
                  <div>
                    {/* Image Header */}
                    <div className="relative h-52 w-full overflow-hidden">
                      <img
                        src={tour.image}
                        alt={tour.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />

                      {/* Tag / Badge */}
                      <div className="absolute top-3 left-3">
                        <span
                          className="px-2.5 py-1 rounded-full text-xs font-bold text-white shadow-sm"
                          style={{ backgroundColor: tour.tagColor }}
                        >
                          {tour.tag}
                        </span>
                      </div>

                      {/* Duration */}
                      <div className="absolute top-3 right-3">
                        <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-black/60 text-white backdrop-blur-md flex items-center gap-1 border border-white/20">
                          <span className="material-symbols-outlined text-[14px]">schedule</span>
                          <span>{tour.duration}</span>
                        </span>
                      </div>

                      {/* Destination badge on image */}
                      <div className="absolute bottom-3 left-3 flex items-center gap-1 text-white text-xs font-semibold">
                        <span className="material-symbols-outlined text-[16px] text-[#A3F4C5]">location_on</span>
                        <span>{tour.destinationName}</span>
                      </div>
                    </div>

                    {/* Card Content */}
                    <div className="p-5">
                      <h3
                        className="text-base sm:text-lg font-bold leading-snug transition-colors group-hover:text-[#166B47] line-clamp-2"
                        style={{ color: '#03251A', fontFamily: '"Tiro Bangla", serif' }}
                      >
                        {tour.title}
                      </h3>

                      <p className="text-xs text-[#414844] mt-1.5 flex items-center gap-1 line-clamp-1">
                        <span className="material-symbols-outlined text-[16px] text-[#166B47]">route</span>
                        <span>{tour.route}</span>
                      </p>

                      {/* Inclusions tags */}
                      <div className="flex flex-wrap gap-1.5 mt-3">
                        {tour.inclusions.map((inc) => (
                          <span
                            key={inc}
                            className="px-2 py-0.5 rounded text-[11px] font-medium bg-[#EDFEEF] text-[#166B47]"
                          >
                            ✓ {inc}
                          </span>
                        ))}
                      </div>

                      {/* Seat Progress Meter */}
                      <div className="p-3 rounded-xl my-4 bg-[#F8FAF8] border border-[#E7EEE9]">
                        <div className="flex items-center justify-between text-xs mb-1.5 text-[#414844]">
                          <span>সিট পূরণ: {tour.seatsBooked}/{tour.seatsTotal} জন</span>
                          <span className="font-bold text-[#166B47]">{remaining}টি সিট বাকি ({pct}%)</span>
                        </div>
                        <div className="w-full h-2 rounded-full bg-[#E0E7E2] overflow-hidden">
                          <div
                            className="h-full rounded-full transition-all duration-700"
                            style={{
                              width: `${pct}%`,
                              backgroundColor: pct > 85 ? '#BA1A1A' : '#166B47',
                            }}
                          />
                        </div>
                      </div>

                      {/* Host & Date */}
                      <div className="flex items-center justify-between text-xs pt-1 border-t border-gray-100">
                        <div className="flex items-center gap-1.5 text-[#414844]">
                          <span className="material-symbols-outlined text-[16px] text-[#166B47]">diversity_3</span>
                          <span>হোস্ট: <strong>{tour.operator}</strong></span>
                        </div>
                        <div className="flex items-center gap-0.5 text-amber-500 font-semibold">
                          <span>★ {tour.operatorRating}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Bottom Price & Action */}
                  <div className="p-5 pt-0">
                    <div className="pt-4 flex items-center justify-between border-t border-gray-100">
                      <div>
                        <span className="text-xs text-[#727974] block">প্যাকেজ শুরু</span>
                        <span
                          className="text-xl font-bold text-[#03251A]"
                          style={{ fontFamily: '"Tiro Bangla", serif' }}
                        >
                          ৳{tour.price.toLocaleString('bn-BD')}
                        </span>
                        <span className="text-[11px] text-[#727974]"> / জন</span>
                      </div>

                      <button
                        type="button"
                        onClick={() => handleBooking(tour.id)}
                        className="px-4 py-2.5 rounded-xl text-xs font-bold text-white shadow transition-all duration-200 cursor-pointer flex items-center gap-1 hover:opacity-95 hover:scale-102"
                        style={{ backgroundColor: 'var(--color-on-tertiary-container)' }}
                      >
                        <span>সিট বুক করুন</span>
                        <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          /* Empty state */
          <div className="bg-white rounded-2xl p-12 text-center border border-gray-200 max-w-lg mx-auto my-12 shadow-sm">
            <span className="material-symbols-outlined text-5xl text-[#727974] mb-3 block">search_off</span>
            <h3
              className="text-xl font-bold text-[#03251A] mb-2"
              style={{ fontFamily: '"Tiro Bangla", serif' }}
            >
              কোনো ট্যুর প্যাকেজ পাওয়া যায়নি
            </h3>
            <p className="text-sm text-[#414844] mb-6">
              আপনার নির্বাচিত গন্তব্য বা ফিল্টারে বর্তমানে কোনো সক্রিয় ট্যুর নেই। অন্য গন্তব্য নির্বাচন করুন অথবা সকল ট্যুর দেখুন।
            </p>
            <div className="flex items-center justify-center gap-3">
              <button
                onClick={() => {
                  setDestination('all');
                  setSelectedTag('all');
                }}
                className="px-5 py-2.5 rounded-xl text-sm font-bold bg-[#03251A] text-white hover:bg-[#1B3B2F] transition-colors cursor-pointer"
              >
                সকল ট্যুর পুনরায় দেখুন
              </button>
              {onBackToHome && (
                <button
                  onClick={onBackToHome}
                  className="px-5 py-2.5 rounded-xl text-sm font-semibold bg-[#EDFEEF] text-[#166B47] hover:bg-[#D6E7D9] transition-colors cursor-pointer border border-[#CFE3D5]"
                >
                  হোমপেজে ফিরে যান
                </button>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
