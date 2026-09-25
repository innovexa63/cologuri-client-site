import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

const tourGroupsData = [
  {
    id: 'g1',
    name: 'ঘুরি বাংলাদেশ',
    location: 'ঢাকা (মিরপুর ও ধানমন্ডি)',
    rating: 4.9,
    reviews: 320,
    trips: 184,
    travelers: '৩,২০০+',
    badge: 'টপ রেটেড',
    category: 'top-rated',
    color: '#166B47',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&q=80',
    description: '২০১৮ সাল থেকে বাংলাদেশের সব প্রান্তে রোমাঞ্চকর ও পারিবারিক ট্রিপ পরিচালনা করে আসছে। উন্নত বাস ও প্রিমিয়াম রিসোর্টের নিশ্চয়তা।',
    specialties: ['সাজেক ভ্যালি', 'কক্সবাজার', 'ফ্যামিলি ট্যুর', 'ব্যাম্বু চিকেন ডিনার'],
    phone: '+৮৮০ ১৭০০-১১২২৩৩',
    email: 'contact@ghuribangladesh.com',
    facebook: 'facebook.com/ghuribangladesh',
    activeToursCount: 3,
  },
  {
    id: 'g2',
    name: 'সবুজ পথিক ট্রাভেলার্স',
    location: 'চট্টগ্রাম (জিইসি মোড়)',
    rating: 4.8,
    reviews: 210,
    trips: 126,
    travelers: '২,১৫০+',
    badge: 'ভেরিফায়েড',
    category: 'verified',
    color: '#03251A',
    image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=400&q=80',
    description: 'চট্টগ্রাম ও পার্বত্য চট্টগ্রামের গোপন পাহাড়ি ট্রেইল এবং শান্ত ঝর্ণাগুলো ভ্রমণকারীদের সামনে তুলে ধরাই আমাদের প্রধান লক্ষ্য।',
    specialties: ['বান্দরবান ট্রেইল', 'রাঙামাটি বোট রাইড', 'পাহাড়ি উপজাতি ক্যাম্পিং'],
    phone: '+৮৮০ ১৮০০-৪৪৩৩৪৫',
    email: 'info@sobujpathik.com',
    facebook: 'facebook.com/sobujpathik',
    activeToursCount: 2,
  },
  {
    id: 'g3',
    name: 'পাহাড়ি স্বপ্ন অ্যাডভেঞ্চার',
    location: 'বান্দরবান সদর',
    rating: 4.9,
    reviews: 180,
    trips: 98,
    travelers: '১,৬০০+',
    badge: 'ট্রেকিং স্পেশালিস্ট',
    category: 'trekking',
    color: '#EF7F45',
    image: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=400&q=80',
    description: 'কেওক্রাডং, তাজিংডং ও সাকা হাফং সামিটের মতো কঠিন ট্রেইলে সার্টিফাইড গাইড ও সর্বোচ্চ সুরক্ষা ব্যবস্থার জন্য আমরা পরিচিত।',
    specialties: ['কেওক্রাডং সামিট', 'নাফাকুম-অমিয়াখুম', 'বগালেক নাইট ক্যাম্পিং'],
    phone: '+৮৮০ ১৯০০-৫৫৬৬৭৭',
    email: 'trek@pahariswapno.com',
    facebook: 'facebook.com/pahariswapno',
    activeToursCount: 2,
  },
  {
    id: 'g4',
    name: 'নীল দিগন্ত ট্যুরস',
    location: 'কক্সবাজার (লাবণী পয়েন্ট)',
    rating: 4.7,
    reviews: 280,
    trips: 152,
    travelers: '২,৯০০+',
    badge: 'সি-বিচ স্পেশালিস্ট',
    category: 'beach',
    color: '#1F724D',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&q=80',
    description: 'কক্সবাজার সমুদ্র সৈকত, সেন্টমার্টিন ও ইনানীর প্রিমিয়াম বিচ রিসোর্ট ও নিরাপদ ক্রুজিং প্যাকেজে আমাদের ১২ বছরের অভিজ্ঞতা।',
    specialties: ['মেরিন ড্রাইভ রোড ট্রিপ', 'সেন্টমার্টিন জাহাজ টিকিট', 'সি-ফুড ডাইনিং'],
    phone: '+৮৮০ ১৬০০-৭৭৮৮৯৯',
    email: 'booking@neeldiganto.com',
    facebook: 'facebook.com/neeldiganto',
    activeToursCount: 3,
  },
  {
    id: 'g5',
    name: 'সুন্দরবন সাফারি টিম',
    location: 'খুলনা ও বাগেরহাট',
    rating: 4.9,
    reviews: 145,
    trips: 87,
    travelers: '১,৪০০+',
    badge: 'ইকো ট্যুর',
    category: 'eco',
    color: '#1B3B2F',
    image: 'https://images.unsplash.com/photo-1624811532702-fc35e8f9b9ff?w=400&q=80',
    description: 'লাইসেন্সধারী ক্রুজ জাহাজে বিশেষজ্ঞ ওয়াইল্ডলাইফ বায়োলজিস্ট ও সশস্ত্র বনরক্ষীর সাথে সুন্দরবনের শ্বাসরুদ্ধকর সাফারি পরিচালনা করি।',
    specialties: ['কটকা জামতলা ট্রেইল', 'হিরণ পয়েন্ট', 'ওয়াইল্ডলাইফ ফটোগ্রাফি', 'ক্যানাল ক্রুজিং'],
    phone: '+৮৮০ ১৫০০-১১২২৩৪',
    email: 'safari@sundarbanvoyage.com',
    facebook: 'facebook.com/sundarbanteam',
    activeToursCount: 1,
  },
  {
    id: 'g6',
    name: 'মেঘদালান ক্যাম্পার্স',
    location: 'রাঙামাটি ও কাপ্তাই',
    rating: 4.9,
    reviews: 160,
    trips: 110,
    travelers: '১,৮০০+',
    badge: 'ক্যাম্পিং স্পেশাল',
    category: 'camping',
    color: '#C9622B',
    image: 'https://images.unsplash.com/photo-1510312305653-8ed496efae75?w=400&q=80',
    description: 'পাহাড়ের চূড়ায় বা কাপ্তাই লেকের তীরে তাঁবু টাঙিয়ে ক্যাম্পফায়ার, বারবিকিউ ও তারা দেখার অনন্য অনুভূতি উপহার দিই আমরা।',
    specialties: ['কাপ্তai লেক ক্যাম্পিং', 'কায়াকিং', 'বারবিকিউ নাইট', 'স্টারগেজিং'],
    phone: '+৮৮০ ১৭৫০-৬৬৭৭৮৮',
    email: 'camp@meghdalan.com',
    facebook: 'facebook.com/meghdalan',
    activeToursCount: 2,
  },
  {
    id: 'g7',
    name: 'ভ্রমণকন্যা (নারী স্পেশাল ট্রাভেলার্স)',
    location: 'সারাদেশব্যাপী',
    rating: 5.0,
    reviews: 310,
    trips: 145,
    travelers: '২,৮০০+',
    badge: 'নারী-বান্ধব',
    category: 'women-only',
    color: '#8E24AA',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&q=80',
    description: 'শুধুমাত্র নারী ট্রাভেলারদের জন্য ১০০% নিরাপদ, আনন্দময় ও বন্ধুত্বপূর্ণ পরিবেশ নিশ্চিত করে প্রতিটি ট্যুর পরিচালিত হয় নারী গাইডদের তত্ত্বাবধানে।',
    specialties: ['অল-উইমেন টিম', 'উইমেন গাইড', 'নিরাপদ কটেজ', 'ফটোসেশন'],
    phone: '+৮৮০ ১৬৫০-৮৮৯৯০০',
    email: 'vromonkonna@womenbd.com',
    facebook: 'facebook.com/vromonkonna',
    activeToursCount: 2,
  },
  {
    id: 'g8',
    name: 'হাওর বাউল ট্রিপস',
    location: 'সুনামগঞ্জ (তাহিরপুর)',
    rating: 4.8,
    reviews: 120,
    trips: 76,
    travelers: '১,২৫০+',
    badge: 'বোট হাউস স্পেশাল',
    category: 'eco',
    color: '#00695C',
    image: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=400&q=80',
    description: 'টাঙ্গুয়ার হাওর ও নীলাদ্রি লেকে বিলাসবহুল কাঠের হাউসবোটে ভাসমান জীবন, লাল শাপলা ও বাউল গানের রাত নিয়ে আমাদের বিশেষ আয়োজন।',
    specialties: ['লাক্সারি হাউসবোট', 'বাউল গানের রাত', 'শিমুল বাগান সাইটসিয়িং'],
    phone: '+৮৮০ ১৮৫০-৯৯০০১১',
    email: 'haorbaul@tripbd.com',
    facebook: 'facebook.com/haorbaul',
    activeToursCount: 1,
  },
  {
    id: 'g9',
    name: 'চা-দেশ এক্সপ্লোরারস',
    location: 'শ্রীমঙ্গল ও মৌলভীবাজার',
    rating: 4.7,
    reviews: 135,
    trips: 92,
    travelers: '১,৫০০+',
    badge: 'চা-বাগান স্পেশাল',
    category: 'top-rated',
    color: '#2E7D32',
    image: 'https://images.unsplash.com/photo-1587595431973-160d0d94add1?w=400&q=80',
    description: 'সবুজ চা-বাগানের নির্জনতা, লাউয়াছড়া রেইনফরেস্ট হাইকিং এবং মাধবপুর লেকের শান্ত স্নিগ্ধ পরিবেশ উপভোগ করার আদর্শ ট্রাভেল পার্টনার।',
    specialties: ['চা পাতা তোলা অভিজ্ঞতা', 'রেইনফরেস্ট ওয়াক', '৭ কালার চা'],
    phone: '+&#৮৮০ ১৯৫০-২২৩৩৪৪',
    email: 'chadesh@explorebd.com',
    facebook: 'facebook.com/chadeshexplorer',
    activeToursCount: 2,
  },
];

const filterCategories = [
  { id: 'all', label: 'সকল গ্রুপ' },
  { id: 'top-rated', label: 'টপ রেটেড' },
  { id: 'trekking', label: 'ট্রেকিং স্পেশালিস্ট' },
  { id: 'beach', label: 'সি-বিচ' },
  { id: 'eco', label: 'ইকো ও সাফারি' },
  { id: 'camping', label: 'ক্যাম্পিং' },
  { id: 'women-only', label: 'নারী-বান্ধব' },
];

export default function TourGroupsPage() {
  const navigate = useNavigate();
  const [selectedCat, setSelectedCat] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeModalGroup, setActiveModalGroup] = useState(null);

  const filteredGroups = useMemo(() => {
    return tourGroupsData.filter((group) => {
      const matchCat = selectedCat === 'all' || group.category === selectedCat;
      const matchSearch =
        searchQuery.trim() === '' ||
        group.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        group.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        group.specialties.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchCat && matchSearch;
    });
  }, [selectedCat, searchQuery]);

  return (
    <div className="w-full min-h-screen bg-slate-50 pt-20 pb-16">
      {/* Header Banner */}
      <section className="bg-gradient-to-br from-[#03251A] via-[#09412F] to-[#125B42] text-white py-14 px-4 sm:px-8 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#7FE5BA_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />
        <div className="max-w-[1360px] mx-auto relative z-10 text-center sm:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 text-xs font-semibold mb-3">
            <span className="material-symbols-outlined text-sm">verified</span>
            <span>১০০+ লাইসেন্সধারী ও ভেরিফায়েড ভ্রমণ কমিউনিটি</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-serif tracking-tight text-white mb-3">
            বিশ্বস্ত ট্যুর গ্রুপ ও এজেন্সি ডিরেক্টরি
          </h1>
          <p className="text-emerald-100/90 text-sm sm:text-base max-w-2xl leading-relaxed">
            চলোঘুড়িতে যুক্ত প্রতিটি ট্রাভেল গ্রুপ সরকারি লাইসেন্স, পূর্ব অভিজ্ঞতা এবং নিরাপত্তা মানদণ্ডে পরীক্ষিত। আপনার বিশ্বস্ত গ্রুপের সাথে যুক্ত হোন নিশ্চিন্তে।
          </p>
        </div>
      </section>

      {/* Control Bar */}
      <section className="max-w-[1360px] mx-auto px-4 sm:px-8 -mt-6 relative z-20">
        <div className="bg-white rounded-2xl shadow-xl border border-slate-200 p-4 sm:p-5 flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Categories */}
          <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-1 md:pb-0 scrollbar-none">
            {filterCategories.map((c) => (
              <button
                key={c.id}
                onClick={() => setSelectedCat(c.id)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  selectedCat === c.id
                    ? 'bg-[#03251A] text-white shadow-md'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {c.label}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-72">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-lg">
              search
            </span>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="গ্রুপের নাম বা জেলা খুঁজুন..."
              className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 text-slate-800"
            />
          </div>
        </div>
      </section>

      {/* Groups Grid */}
      <section className="max-w-[1360px] mx-auto px-4 sm:px-8 mt-8">
        <div className="flex items-center justify-between mb-6">
          <p className="text-sm font-semibold text-slate-600">
            মোট <span className="text-emerald-700 font-bold">{filteredGroups.length}</span> টি ট্যুর গ্রুপ পাওয়া গেছে
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredGroups.map((group) => (
            <div
              key={group.id}
              className="bg-white rounded-2xl border border-slate-200/80 shadow-[0_4px_20px_rgba(0,0,0,0.06)] hover:shadow-xl transition-all duration-300 hover:-translate-y-1 p-6 flex flex-col justify-between group"
            >
              <div>
                {/* Header: Logo, Verified, Name & Rating */}
                <div className="flex items-start gap-4">
                  <div className="relative shrink-0">
                    <div
                      className="w-16 h-16 rounded-2xl p-0.5 overflow-hidden shadow-md flex items-center justify-center"
                      style={{ background: `linear-gradient(135deg, ${group.color}, #7FE5BA)` }}
                    >
                      <img
                        src={group.image}
                        alt={group.name}
                        className="w-full h-full object-cover rounded-[14px]"
                      />
                    </div>
                    <div
                      className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center shadow-md bg-emerald-600 text-white"
                      title="ভেরিফায়েড পার্টনার"
                    >
                      <span className="material-symbols-outlined text-[13px]">check</span>
                    </div>
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[11px] font-bold border border-emerald-100">
                        {group.badge}
                      </span>
                      <div className="flex items-center gap-1 text-amber-500 font-bold text-xs">
                        <span>★ {group.rating}</span>
                        <span className="text-slate-400 font-normal">({group.reviews})</span>
                      </div>
                    </div>

                    <h3 className="text-lg font-bold text-slate-900 group-hover:text-emerald-700 transition-colors font-serif truncate mt-1">
                      {group.name}
                    </h3>
                    <p className="text-xs text-slate-500 flex items-center gap-1 mt-0.5 truncate">
                      <span className="material-symbols-outlined text-[14px] text-emerald-600">location_on</span>
                      {group.location}
                    </p>
                  </div>
                </div>

                {/* About summary */}
                <p className="text-xs text-slate-600 mt-4 leading-relaxed line-clamp-2">
                  {group.description}
                </p>

                {/* Stat pills */}
                <div className="grid grid-cols-2 gap-2 mt-4 p-2.5 rounded-xl bg-slate-50 border border-slate-100 text-center">
                  <div className="border-r border-slate-200">
                    <span className="text-xs font-bold text-slate-800 font-mono">{group.trips} টি ট্রিপ</span>
                    <span className="text-[10px] text-slate-400 block">সফল ভ্রমণ</span>
                  </div>
                  <div>
                    <span className="text-xs font-bold text-emerald-700 font-mono">{group.travelers}</span>
                    <span className="text-[10px] text-slate-400 block">সন্তুষ্ট সহযাত্রী</span>
                  </div>
                </div>

                {/* Specialties */}
                <div className="flex flex-wrap gap-1.5 mt-3">
                  {group.specialties.map((s, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 text-[11px] font-medium"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              {/* Bottom Actions */}
              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => {
                    const groupSlug = group.id === 'g1' ? 'ghuri-bd' : (group.id === 'g2' ? 'sobuj-pathik' : group.id);
                    navigate(`/live-tours?group=${groupSlug}`);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="flex-1 py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-700 text-white text-xs font-bold hover:shadow-md transition-all flex items-center justify-center gap-1 cursor-pointer"
                >
                  <span>আসন্ন ট্যুর ({group.activeToursCount})</span>
                  <span className="material-symbols-outlined text-[15px]">arrow_forward</span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveModalGroup(group)}
                  className="px-3 py-2 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-100 text-xs font-semibold flex items-center gap-1 transition-colors cursor-pointer"
                  title="যোগাযোগ ও প্রোফাইল"
                >
                  <span className="material-symbols-outlined text-[16px] text-emerald-600">contact_page</span>
                  <span>যোগাযোগ</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Operator Registration CTA */}
      <section className="max-w-[1360px] mx-auto px-4 sm:px-8 mt-16">
        <div className="bg-gradient-to-r from-[#03251A] via-[#09412F] to-[#043323] rounded-3xl p-8 sm:p-12 text-white shadow-2xl flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <span className="px-3 py-1 rounded-full bg-emerald-400/20 text-emerald-300 text-xs font-bold border border-emerald-400/30">
              অপারেটরদের জন্য সুযোগ
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold font-serif mt-3 text-white">
              আপনি কি একজন ট্যুর অপারেটর বা গ্রুপ লিডার?
            </h2>
            <p className="text-sm text-emerald-100/80 mt-2 max-w-xl leading-relaxed">
              চলোঘুড়িতে যুক্ত হয়ে আপনার ট্যুরসমূহ ডিজিটালি হোস্ট করুন। অটোমেটেড সিট বুকিং, ইনস্ট্যান্ট পেমেন্ট এবং এসওএস সিকিউরিটির মাধ্যমে নিজের ব্র্যান্ডকে বড় করুন।
            </p>
          </div>
          <button
            type="button"
            onClick={() => {
              const adminUrl = import.meta.env.VITE_ADMIN_URL || 'http://localhost:5174';
              window.open(`${adminUrl}/login`, '_blank');
            }}
            className="px-6 py-3.5 rounded-2xl bg-amber-400 hover:bg-amber-300 text-slate-900 font-bold text-sm shadow-xl transition-transform hover:scale-105 active:scale-95 shrink-0 flex items-center gap-2 cursor-pointer"
          >
            <span className="material-symbols-outlined text-[20px]">add_circle</span>
            <span>গ্রুপ অ্যাডমিন প্যানেলে লগইন</span>
          </button>
        </div>
      </section>

      {/* Contact Modal */}
      {activeModalGroup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl border border-slate-200 animate-in fade-in zoom-in duration-200">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div className="flex items-center gap-3">
                <img
                  src={activeModalGroup.image}
                  alt={activeModalGroup.name}
                  className="w-12 h-12 rounded-xl object-cover"
                />
                <div>
                  <h4 className="font-bold text-base text-slate-900 font-serif">{activeModalGroup.name}</h4>
                  <span className="text-xs text-emerald-700 font-semibold">{activeModalGroup.badge}</span>
                </div>
              </div>
              <button
                onClick={() => setActiveModalGroup(null)}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-500 cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3.5 py-5 text-sm">
              <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 border border-slate-100">
                <span className="material-symbols-outlined text-emerald-600">call</span>
                <div>
                  <span className="text-xs text-slate-400 block">হটলাইন নম্বর</span>
                  <span className="font-semibold text-slate-800">{activeModalGroup.phone}</span>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 border border-slate-100">
                <span className="material-symbols-outlined text-emerald-600">mail</span>
                <div>
                  <span className="text-xs text-slate-400 block">অফিসিয়াল ইমেইল</span>
                  <span className="font-semibold text-slate-800">{activeModalGroup.email}</span>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 border border-slate-100">
                <span className="material-symbols-outlined text-emerald-600">public</span>
                <div>
                  <span className="text-xs text-slate-400 block">ফেসবুক কমিউনিটি</span>
                  <span className="font-semibold text-slate-800">{activeModalGroup.facebook}</span>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 border border-slate-100">
                <span className="material-symbols-outlined text-emerald-600">location_on</span>
                <div>
                  <span className="text-xs text-slate-400 block">অফিস ঠিকানা</span>
                  <span className="font-semibold text-slate-800">{activeModalGroup.location}</span>
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={() => {
                const groupSlug = activeModalGroup.id === 'g1' ? 'ghuri-bd' : (activeModalGroup.id === 'g2' ? 'sobuj-pathik' : activeModalGroup.id);
                setActiveModalGroup(null);
                navigate(`/live-tours?group=${groupSlug}`);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="w-full py-3 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-sm shadow-md transition-colors cursor-pointer"
            >
              এই গ্রুপের রানিং ট্যুরসমূহ দেখুন
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
