import { useState, useMemo } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

const rawLiveTours = [
  {
    id: 'sajek-1',
    title: 'মেঘ ছোঁয়ার সাজেক ভ্যালি ও কংলাক পাহাড়ি অভিযান',
    destination: 'sajek',
    destinationName: 'সাজেক ভ্যালি',
    route: 'ঢাকা → খাগড়াছড়ি → সাজেক → কংলাক পাড়া',
    startDate: '২৮ অক্টোবর ২০২৬',
    duration: '৩ রাত ২ দিন',
    operator: 'ঘুরি বাংলাদেশ',
    coHost: 'সবুজ পথিক ট্রাভেলার্স',
    isJointTour: true,
    tourType: 'combine',
    partnerGroups: [
      {
        groupId: 'g1',
        groupName: 'ঘুরি বাংলাদেশ',
        groupSlug: 'ghuri-bd',
        color: '#166B47',
        customTitle: 'মেঘ ছোঁয়ার সাজেক ভ্যালি ও কংলাক পাহাড়ি অভিযান',
        price: 4800,
        originalPrice: 5500,
        discount: 700,
        allocatedSeats: [
          'A1', 'A2', 'A3', 'A4',
          'B1', 'B2', 'B3', 'B4',
          'C1', 'C2', 'C3', 'C4',
          'D1', 'D2', 'D3', 'D4',
          'E1', 'E2', 'E3'
        ],
        bookedSeats: [
          'A1', 'A2',
          'B1', 'B2', 'B3', 'B4',
          'C1', 'C2',
          'D1', 'D2', 'D3', 'D4',
          'E1', 'E2'
        ],
      },
      {
        groupId: 'g2',
        groupName: 'সবুজ পথিক ট্রাভেলার্স',
        groupSlug: 'sobuj-pathik',
        color: '#C9622B',
        customTitle: 'সাজেক পূর্ণিমা ও হ্যালিপ্যাড ক্যাম্পিং — সবুজ পথিক',
        price: 4600,
        originalPrice: 5200,
        discount: 600,
        allocatedSeats: [
          'E4',
          'F1', 'F2', 'F3', 'F4',
          'G1', 'G2', 'G3', 'G4',
          'H1', 'H2', 'H3', 'H4',
          'I1', 'I2', 'I3', 'I4',
          'J1', 'J2', 'J3', 'J4'
        ],
        bookedSeats: [
          'F1', 'F2', 'F3',
          'G1', 'G2',
          'H1', 'H2', 'H3', 'H4',
          'I1', 'I2', 'I3', 'I4',
          'J1', 'J2', 'J3', 'J4'
        ],
      },
    ],
    operatorRating: 4.9,
    operatorTrips: 184,
    price: 4800,
    originalPrice: 5500,
    seatsTotal: 40,
    seatsBooked: 31,
    remainingSeats: 9,
    busType: 'হিনো ১জে এসি লাক্সারি চেয়ার কোচ',
    tag: '🤝 মাল্টি-গ্রুপ জয়েন্ট ট্যুর',
    tagColor: '#EF7F45',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80',
    features: ['এসি বাস', 'কাঠের কটেজ', 'ব্যাম্বু চিকেন', 'রিজার্ভ চান্দের গাড়ি'],
  },
  {
    id: 'coxsbazar-1',
    title: 'কক্সবাজার সমুদ্র সৈকত, ইনানী ও মেরিন ড্রাইভ রিল্যাক্স',
    destination: 'coxsbazar',
    destinationName: 'কক্সবাজার',
    route: 'ঢাকা → চট্টগ্রাম → কক্সবাজার → ইনানী বিচ',
    startDate: '০২ নভেম্বর ২০২৬',
    duration: '৩ রাত ৩ দিন',
    operator: 'নীল দিগন্ত ট্যুরস',
    operatorRating: 4.8,
    operatorTrips: 152,
    price: 4200,
    originalPrice: 4800,
    seatsTotal: 36,
    seatsBooked: 31,
    remainingSeats: 5,
    busType: 'হুন্দাই ইউনিভার্স এসি স্লিপার কোচ',
    tag: 'বীচ ভিউ রিসোর্ট',
    tagColor: '#127A52',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80',
    features: ['স্লিপার বাস', 'সি-ফেসিং হোটেল', 'সি-ফুড ডিনার', 'মেরিন ড্রাইভ জিপ'],
  },
  {
    id: 'sundarban-1',
    title: 'সুন্দরবন ম্যানগ্রোভ ক্রুজ, ওয়াইল্ডলাইফ ও কটকা ট্রেইল',
    destination: 'sundarban',
    destinationName: 'সুন্দরবন',
    route: 'খুলনা জেলখানা ঘাট → হিরণ পয়েন্ট → কটকা জামতলা',
    startDate: '০৫ নভেম্বর ২০২৬',
    duration: '৩ রাত ৪ দিন',
    operator: 'সুন্দরবন সাফারি টিম',
    operatorRating: 4.9,
    operatorTrips: 87,
    price: 8900,
    originalPrice: 9800,
    seatsTotal: 30,
    seatsBooked: 24,
    remainingSeats: 6,
    busType: 'লাক্সারি উডেন ক্রুজ ভেসেল (এসি কেবিন)',
    tag: 'প্রিমিয়াম সাফারি',
    tagColor: '#065F46',
    image: 'https://images.unsplash.com/photo-1547036967-23d11aacaee0?w=800&q=80',
    features: ['এসি কেবিন শিপ', 'ফরেস্ট গার্ড গানম্যান', 'জালে ধরা তাজা মাছ', 'ক্যানাল ক্রুজ'],
  },
  {
    id: 'bandarban-1',
    title: 'কেওক্রাডং সামিট, বগালেক ও নাফাকুম রোমাঞ্চ ট্রেইল',
    destination: 'bandarban',
    destinationName: 'বান্দরবান',
    route: 'ঢাকা → বান্দরবান সদর → রুমা বাজার → বগালেক → সামিট',
    startDate: '১২ নভেম্বর ২০২৬',
    duration: '৪ রাত ৩ দিন',
    operator: 'পাহাড়ি স্বপ্ন অ্যাডভেঞ্চার',
    operatorRating: 4.9,
    operatorTrips: 98,
    price: 5400,
    originalPrice: 6200,
    seatsTotal: 28,
    seatsBooked: 22,
    remainingSeats: 6,
    busType: 'নন-এসি চেয়ার কোচ + ফোর-হুইল জিপ',
    tag: 'ট্রেকার্স স্পেশাল',
    tagColor: '#B45309',
    image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&q=80',
    features: ['বগালেক কটেজ', 'ট্রেকিং স্টিক ও ফার্স্টএইড', 'লোকাল বোম ট্রাইবাল ডিশ', 'অভিজ্ঞ গাইড'],
  },
  {
    id: 'sreemangal-1',
    title: 'শ্রীমঙ্গল সবুজ চা-বাগান, লাউয়াছড়া রেইনফরেস্ট ও মাধবপুর লেক',
    destination: 'sreemangal',
    destinationName: 'শ্রীমঙ্গল ও সিলেট',
    route: 'ঢাকা → শ্রীমঙ্গল → লাউয়াছড়া → হামহাম ঝর্ণা',
    startDate: '১৬ নভেম্বর ২০২৬',
    duration: '২ রাত ২ দিন',
    operator: 'চা-দেশ এক্সপ্লোরারস',
    operatorRating: 4.7,
    operatorTrips: 92,
    price: 3600,
    originalPrice: 4200,
    seatsTotal: 32,
    seatsBooked: 27,
    remainingSeats: 5,
    busType: 'এয়ার সাসপেনশন এসি মিনিবাস',
    tag: 'নেচার ওয়াক',
    tagColor: '#047857',
    image: 'https://images.unsplash.com/photo-1587595431973-160d0d94add1?w=800&q=80',
    features: ['ইকো রিসোর্ট স্টে', '৭ রঙের চা আস্বাদন', 'ট্রেইল হাইকিং', 'লেমন গার্ডেন ট্যুর'],
  },
  {
    id: 'tanguar-1',
    title: 'টাঙ্গুয়ার হাওর লাক্সারি হাউসবোট ও শিমুল বাগান ম্যাজিক',
    destination: 'sylhet',
    destinationName: 'সুনামগঞ্জ',
    route: 'সুনামগঞ্জ ঘাট → টাঙ্গুয়ার হাওর → নীলাদ্রি লেক → যাদুকাটা',
    startDate: '২০ নভেম্বর ২০২৬',
    duration: '২ রাত ২ দিন',
    operator: 'হাওর বাউল ট্রিপস',
    operatorRating: 4.8,
    operatorTrips: 76,
    price: 6800,
    originalPrice: 7500,
    seatsTotal: 24,
    seatsBooked: 20,
    remainingSeats: 4,
    busType: 'প্রিমিয়াম কাঠের হাউসবোট (সংযুক্ত ওয়াশরুম)',
    tag: 'লাক্সারি হাউসবোট',
    tagColor: '#0E7490',
    image: 'https://images.unsplash.com/photo-1501854140801-50d01698950b?w=800&q=80',
    features: ['হাউসবোটে রাতযাপন', 'হাওরের খাঁটি তাজা মাছ', 'বারবিকিউ ও গান', 'লাইফ জ্যাকেট'],
  },
];

// ─────────────────────────────────────────────────────────────
// Expand combined tours into per-group separate listings.
// Each partner group in a combine tour gets its OWN card on the
// client site showing:  customTitle, group's price, group's
// operator name, and group's allocated seat availability.
// ─────────────────────────────────────────────────────────────
function expandCombinedTours(tours) {
  const result = [];
  tours.forEach((tour) => {
    if (tour.isJointTour && tour.tourType === 'combine' && Array.isArray(tour.partnerGroups) && tour.partnerGroups.length > 0) {
      // Create one listing per partner group
      tour.partnerGroups.forEach((partner) => {
        const allocatedTotal = (partner.allocatedSeats || []).length;
        const allocatedBooked = (partner.bookedSeats || []).length;
        const allocatedRemaining = allocatedTotal - allocatedBooked;
        result.push({
          ...tour,
          // Override with partner-specific values
          id: `${tour.id}__${partner.groupSlug || partner.groupId}`,
          baseId: tour.id,
          title: partner.customTitle || tour.title,
          operator: partner.groupName,
          operatorGroupId: partner.groupId,
          operatorGroupSlug: partner.groupSlug,
          operatorColor: partner.color,
          price: partner.price || tour.price,
          originalPrice: partner.originalPrice || tour.originalPrice,
          // Seat counts scoped to this group's allocation
          seatsTotal: allocatedTotal,
          seatsBooked: allocatedBooked,
          remainingSeats: Math.max(0, allocatedRemaining),
          allocatedSeats: partner.allocatedSeats || [],
          groupBookedSeats: partner.bookedSeats || [],
          // Badge to show it's a combined / multi-group bus
          tag: `🤝 ${partner.groupName} — জয়েন্ট ট্যুর`,
          tagColor: partner.color || '#C9622B',
          isCombineTourGroup: true,
          hostGroupName: tour.operator || (tour.partnerGroups[0]?.groupName ?? 'ঘুরি বাংলাদেশ'),
        });
      });
    } else {
      result.push({ ...tour, isCombineTourGroup: false });
    }
  });
  return result;
}

const allLiveTours = expandCombinedTours(rawLiveTours);

const categoryTabs = [
  { id: 'all', label: 'সকল লাইভ ট্যুর' },
  { id: 'sajek', label: 'সাজেক ভ্যালি' },
  { id: 'coxsbazar', label: 'কক্সবাজার' },
  { id: 'sundarban', label: 'সুন্দরবন' },
  { id: 'bandarban', label: 'বান্দরবান' },
  { id: 'sreemangal', label: 'শ্রীমঙ্গল' },
];

export default function LiveToursPage() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const groupFilter = searchParams.get('group');
  const [selectedTab, setSelectedTab] = useState('all');
  const [searchKeyword, setSearchKeyword] = useState('');
  const [sortBy, setSortBy] = useState('default');

  const filteredTours = useMemo(() => {
    return allLiveTours
      .filter((tour) => {
        if (groupFilter) {
          const groupNameMap = {
            'ghuri-bd': 'ঘুরি বাংলাদেশ',
            'sobuj-pathik': 'সবুজ পথিক',
          };
          const target = groupNameMap[groupFilter] || groupFilter;
          const matchOperator = tour.operator.toLowerCase().includes(target.toLowerCase());
          const matchCoHost = tour.coHost && tour.coHost.toLowerCase().includes(target.toLowerCase());
          if (!matchOperator && !matchCoHost) {
            return false;
          }
        }
        const matchesTab = selectedTab === 'all' || tour.destination === selectedTab;
        const matchesSearch =
          searchKeyword.trim() === '' ||
          tour.title.toLowerCase().includes(searchKeyword.toLowerCase()) ||
          tour.destinationName.toLowerCase().includes(searchKeyword.toLowerCase()) ||
          tour.operator.toLowerCase().includes(searchKeyword.toLowerCase()) ||
          tour.route.toLowerCase().includes(searchKeyword.toLowerCase());
        return matchesTab && matchesSearch;
      })
      .sort((a, b) => {
        if (sortBy === 'price-low') return a.price - b.price;
        if (sortBy === 'price-high') return b.price - a.price;
        if (sortBy === 'seats-left') return a.remainingSeats - b.remainingSeats;
        return 0;
      });
  }, [selectedTab, searchKeyword, sortBy, groupFilter]);

  return (
    <div className="w-full min-h-screen bg-slate-50 pt-20 pb-16">
      {/* Header Banner */}
      <section className="bg-gradient-to-br from-[#021f15] via-[#043323] to-[#0a4833] text-white py-14 px-4 sm:px-8 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#7FE5BA_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />
        <div className="max-w-[1360px] mx-auto relative z-10">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 text-xs font-semibold mb-3">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                <span>রিয়েল-টাইম লাইভ সিট বুকিং ইকোসিস্টেম</span>
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-serif tracking-tight text-white mb-3">
                সক্রিয় লাইভ ট্যুরসমূহ
              </h1>
              <p className="text-emerald-100/90 text-sm sm:text-base max-w-2xl leading-relaxed">
                ভেরিফায়েড ট্যুর অপারেটরদের আগামী ট্রিপগুলোতে সরাসরি ডিজিটাল সিট ম্যাপ দেখে আপনার পছন্দের আসন বেছে নিন। বুকিং করার সাথে সাথে ১০ মিনিটের জন্য সিট সংরক্ষিত হবে।
              </p>
            </div>

            {/* Quick Stat Counter */}
            <div className="flex items-center gap-4 bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/15 shrink-0">
              <div className="text-center px-3 border-r border-white/20">
                <div className="text-2xl sm:text-3xl font-bold text-amber-400 font-mono">০৬+</div>
                <div className="text-xs text-emerald-200">সক্রিয় ট্যুর</div>
              </div>
              <div className="text-center px-3 border-r border-white/20">
                <div className="text-2xl sm:text-3xl font-bold text-emerald-300 font-mono">৩৪</div>
                <div className="text-xs text-emerald-200">সিট অবশিষ্ট</div>
              </div>
              <div className="text-center px-3">
                <div className="text-2xl sm:text-3xl font-bold text-white font-mono">১০০%</div>
                <div className="text-xs text-emerald-200">ভেরিফায়েড</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Control Bar: Tabs, Search & Sort */}
      <section className="max-w-[1360px] mx-auto px-4 sm:px-8 -mt-6 relative z-20">
        <div className="bg-white rounded-2xl shadow-xl border border-slate-200 p-4 sm:p-5 flex flex-col lg:flex-row items-center justify-between gap-4">
          
          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto w-full lg:w-auto pb-1 lg:pb-0 scrollbar-none">
            {categoryTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSelectedTab(tab.id)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  selectedTab === tab.id
                    ? 'bg-[#03251A] text-white shadow-md'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Search & Sort Controls */}
          <div className="flex items-center gap-3 w-full lg:w-auto">
            {/* Search Input */}
            <div className="relative flex-1 lg:w-64">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-lg">
                search
              </span>
              <input
                type="text"
                value={searchKeyword}
                onChange={(e) => setSearchKeyword(e.target.value)}
                placeholder="ট্যুর বা গন্তব্য খুঁজুন..."
                className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 text-slate-800"
              />
            </div>

            {/* Sort Dropdown */}
            <div className="relative shrink-0">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-3 py-2 text-xs sm:text-sm rounded-xl border border-slate-200 bg-slate-50 text-slate-700 font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500 cursor-pointer"
              >
                <option value="default">ফিল্টার / বাছাই</option>
                <option value="price-low">প্যাকেজ: কম থেকে বেশি</option>
                <option value="price-high">প্যাকেজ: বেশি থেকে কম</option>
                <option value="seats-left">দ্রুত পূরণ হচ্ছে (কম সিট)</option>
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Active Group Filter Banner if present */}
      {groupFilter && (
        <section className="max-w-[1360px] mx-auto px-4 sm:px-8 mt-6">
          <div className="p-3.5 sm:p-4 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-between gap-3 text-xs text-emerald-950 shadow-xs">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-emerald-700 text-lg">verified</span>
              <span>
                <strong>{groupFilter === 'sobuj-pathik' ? 'সবুজ পথিক ট্রাভেলার্স' : (groupFilter === 'ghuri-bd' ? 'ঘুরি বাংলাদেশ' : groupFilter)}</strong>-এর অধীনে পরিচালিত ও কো-হোস্টেড জয়েন্ট ট্যুরসমূহ প্রদর্শন করা হচ্ছে।
              </span>
            </div>
            <button
              type="button"
              onClick={() => {
                searchParams.delete('group');
                setSearchParams(searchParams);
              }}
              className="text-emerald-800 font-bold hover:underline shrink-0 cursor-pointer"
            >
              সকল গ্রুপ দেখুন
            </button>
          </div>
        </section>
      )}

      {/* Main Tour Grid */}
      <section className="max-w-[1360px] mx-auto px-4 sm:px-8 mt-8">
        <div className="flex items-center justify-between mb-6">
          <p className="text-sm font-semibold text-slate-600">
            মোট <span className="text-emerald-700 font-bold">{filteredTours.length}</span> টি সক্রিয় ট্যুর পাওয়া গেছে
          </p>
        </div>

        {filteredTours.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 text-center border border-slate-200 shadow-sm max-w-lg mx-auto">
            <span className="material-symbols-outlined text-5xl text-slate-400 mb-2">search_off</span>
            <h3 className="text-lg font-bold text-slate-800">কোনো ট্যুর পাওয়া যায়নি</h3>
            <p className="text-sm text-slate-500 mt-1 mb-4">অন্য কোনো কিওয়ার্ড বা ফিল্টার সিলেক্ট করে পুনরায় চেষ্টা করুন।</p>
            <button
              onClick={() => {
                setSelectedTab('all');
                setSearchKeyword('');
              }}
              className="px-4 py-2 bg-emerald-700 text-white text-xs font-semibold rounded-xl hover:bg-emerald-800 cursor-pointer"
            >
              সকল ট্যুর দেখুন
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredTours.map((tour) => {
              const bookedPct = Math.min(100, Math.round(((tour.seatsBooked || 0) / (tour.seatsTotal || 1)) * 100));
              const groupColor = tour.isCombineTourGroup ? (tour.operatorColor || '#C9622B') : '#166B47';
              const baseNavigateId = tour.baseId || tour.id;
              return (
                <div
                  key={tour.id}
                  onClick={() => {
                    navigate(`/tours/${baseNavigateId}`);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="bg-white rounded-2xl overflow-hidden border border-slate-200/80 shadow-[0_4px_20px_rgba(0,0,0,0.06)] hover:shadow-xl transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between group cursor-pointer"
                  style={{ borderTopColor: groupColor, borderTopWidth: tour.isCombineTourGroup ? '3px' : '1px' }}
                >
                  {/* Image & Top Badges */}
                  <div>
                    <div className="relative h-52 sm:h-56 w-full overflow-hidden bg-slate-900">
                      <img
                        src={tour.image}
                        alt={tour.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                      
                      {/* Remaining Seats Badge */}
                      <div className="absolute top-3 left-3 flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/90 text-white text-xs font-bold shadow-md backdrop-blur-xs">
                        <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
                        <span>{tour.remainingSeats ?? (tour.seatsTotal - tour.seatsBooked)}টি সিট বাকি</span>
                      </div>

                      {/* Date Badge */}
                      <div className="absolute top-3 right-3 flex items-center gap-1 px-3 py-1 rounded-full bg-black/60 text-white text-xs font-semibold border border-white/20 backdrop-blur-xs">
                        <span className="material-symbols-outlined text-[15px] text-emerald-400">calendar_today</span>
                        <span>{tour.startDate}</span>
                      </div>

                      {/* Tag pill bottom left of image */}
                      <div className="absolute bottom-3 left-3">
                        <span
                          className="px-2.5 py-0.5 rounded-md text-[11px] font-bold text-white shadow-sm"
                          style={{ backgroundColor: tour.tagColor }}
                        >
                          {tour.tag}
                        </span>
                      </div>

                      {/* Duration */}
                      <div className="absolute bottom-3 right-3 text-xs font-medium text-white/90">
                        {tour.duration}
                      </div>
                    </div>

                    {/* Card Content */}
                    <div className="p-5">
                      {/* Host & Rating */}
                      <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
                        <div className="flex items-center gap-1.5">
                          {/* Group color dot for combined tours */}
                          {tour.isCombineTourGroup ? (
                            <span
                              className="w-3 h-3 rounded-full shrink-0 shadow-sm"
                              style={{ backgroundColor: groupColor }}
                              title={`${tour.operator} এর কোটা`}
                            />
                          ) : (
                            <span className="material-symbols-outlined text-[16px] text-emerald-600">groups</span>
                          )}
                          <span className="font-semibold text-slate-700">{tour.operator}</span>
                          {/* Shared bus badge */}
                          {tour.isCombineTourGroup && (
                            <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-200 ml-1">
                              🚌 শেয়ার্ড বাস
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-1 text-amber-500 font-bold">
                          <span>★ {tour.operatorRating}</span>
                          <span className="text-slate-400 font-normal">({tour.operatorTrips})</span>
                        </div>
                      </div>

                      {/* Title */}
                      <h3 className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-emerald-700 transition-colors line-clamp-2 leading-snug font-serif">
                        {tour.title}
                      </h3>

                      {/* Route */}
                      <p className="text-xs text-slate-500 mt-2 flex items-center gap-1.5">
                        <span className="material-symbols-outlined text-[16px] text-emerald-600 shrink-0">route</span>
                        <span className="truncate">{tour.route}</span>
                      </p>

                      {/* Vehicle / Bus Type */}
                      <p className="text-xs text-slate-500 mt-1 flex items-center gap-1.5">
                        <span className="material-symbols-outlined text-[16px] text-teal-600 shrink-0">directions_bus</span>
                        <span className="truncate">{tour.busType}</span>
                      </p>

                      {/* Feature Tags */}
                      <div className="flex flex-wrap gap-1.5 mt-3">
                        {(tour.features || []).slice(0, 3).map((f, i) => (
                          <span key={i} className="px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-800 text-[11px] font-medium border border-emerald-100">
                            {f}
                          </span>
                        ))}
                      </div>

                      {/* Seat Progress Bar — scoped to this group's allocation */}
                      <div className="mt-4 p-3 rounded-xl bg-slate-50 border border-slate-100">
                        <div className="flex items-center justify-between text-xs text-slate-600 font-medium mb-1.5">
                          <span>
                            {tour.isCombineTourGroup ? 'এই গ্রুপের সিট' : 'সিট বুকিং'}:{' '}
                            {tour.seatsBooked}/{tour.seatsTotal}
                          </span>
                          <span className="font-bold" style={{ color: groupColor }}>{bookedPct}% পূর্ণ</span>
                        </div>
                        <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                          <div
                            className="h-full rounded-full transition-all duration-500"
                            style={{ width: `${bookedPct}%`, backgroundColor: groupColor }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Card Bottom Pricing & Action */}
                  <div className="px-5 pb-5 pt-3 border-t border-slate-100 flex items-center justify-between">
                    <div>
                      <span className="text-[11px] text-slate-400 block">প্রতি জন প্যাকেজ</span>
                      <div className="flex items-baseline gap-1.5">
                        <span className="text-xl font-extrabold text-[#03251A] font-mono">
                          ৳{(tour.price || 0).toLocaleString('bn-BD')}
                        </span>
                        {tour.originalPrice && (
                          <span className="text-xs text-slate-400 line-through">
                            ৳{tour.originalPrice.toLocaleString('bn-BD')}
                          </span>
                        )}
                        {tour.originalPrice && tour.price && (tour.originalPrice - tour.price) > 0 && (
                          <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded">
                            ৳{(tour.originalPrice - tour.price).toLocaleString()} ছাড়
                          </span>
                        )}
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        const queryParam = groupFilter ? `?group=${groupFilter}` : '';
                        navigate(`/tours/${baseNavigateId}${queryParam}`);

                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-700 text-white text-xs font-bold shadow-md hover:shadow-emerald-600/30 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center gap-1 cursor-pointer"
                    >
                      <span>সিট বুক করুন</span>
                      <span className="material-symbols-outlined text-[16px]">chevron_right</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* Safety & Booking Guarantee Band */}
      <section className="max-w-[1360px] mx-auto px-4 sm:px-8 mt-16">
        <div className="bg-gradient-to-br from-[#063323] to-[#03251A] rounded-3xl p-6 sm:p-10 text-white shadow-xl relative overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 border border-emerald-400/30 flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-2xl text-emerald-300">timer</span>
              </div>
              <div>
                <h4 className="font-bold text-base text-white">১০ মিনিট লাইভ সিট লক</h4>
                <p className="text-xs text-emerald-100/80 mt-1 leading-relaxed">
                  সিট সিলেক্ট করার সাথে সাথে ১০ মিনিটের জন্য লক হয়ে যায়, ফলে একই সিট ডাবল বুকিং হওয়ার সুযোগ নেই।
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 border border-emerald-400/30 flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-2xl text-emerald-300">verified_user</span>
              </div>
              <div>
                <h4 className="font-bold text-base text-white">নিরাপদ এসক্রো পেমেন্ট</h4>
                <p className="text-xs text-emerald-100/80 mt-1 leading-relaxed">
                  bKash বা কার্ডে নিরাপদে পে করুন। ভ্রমণ সফলভাবে সম্পন্ন না হওয়া পর্যন্ত আপনার অর্থ সম্পূর্ণ সুরক্ষিত থাকে।
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 border border-emerald-400/30 flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-2xl text-emerald-300">support_agent</span>
              </div>
              <div>
                <h4 className="font-bold text-base text-white">২৪/৭ ট্রাভেলার এসওএস হেল্প</h4>
                <p className="text-xs text-emerald-100/80 mt-1 leading-relaxed">
                  ট্যুরের প্রতিটি পদক্ষেপে যে কোনো তথ্য বা জরুরী প্রয়োজনে আমাদের নিবেদিত টিম সার্বক্ষণিক সহযোগিতায় নিয়োজিত।
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
