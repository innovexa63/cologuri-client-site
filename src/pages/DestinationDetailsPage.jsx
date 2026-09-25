import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { allDestinations } from '../data/destinationsData';

export default function DestinationDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  // Find destination by id, fallback to first
  const dest = allDestinations.find((d) => d.id === id) || allDestinations[0];

  const [activeTab, setActiveTab] = useState('overview');
  const [selectedPhoto, setSelectedPhoto] = useState(dest ? dest.image : '');
  const [lightboxImg, setLightboxImg] = useState(null);

  useEffect(() => {
    if (dest) {
      setSelectedPhoto(dest.image);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [dest]);

  if (!dest) {
    return (
      <div className="w-full min-h-screen bg-slate-50 pt-28 pb-20 text-center">
        <h2 className="text-xl font-bold text-slate-800 font-serif">গন্তব্যটি পাওয়া যায়নি</h2>
        <button
          onClick={() => navigate('/destinations')}
          className="mt-4 px-5 py-2.5 bg-emerald-700 text-white rounded-xl font-bold text-sm cursor-pointer"
        >
          সকল দর্শনীয় স্থান দেখুন
        </button>
      </div>
    );
  }

  const galleryList = [dest.image, ...(dest.gallery || [])].filter(Boolean);

  return (
    <div className="w-full min-h-screen bg-slate-50 pt-20 pb-20">
      
      {/* Top Breadcrumb Navigation */}
      <section className="bg-white border-b border-slate-200 py-3.5 px-4 sm:px-8">
        <div className="max-w-[1360px] mx-auto flex flex-wrap items-center justify-between gap-3 text-xs sm:text-sm">
          <nav aria-label="ব্রেডক্রাম্ব" className="flex flex-wrap items-center gap-1.5 text-slate-500 font-medium">
            <Link to="/" className="hover:text-emerald-700 transition-colors">হোম</Link>
            <span>/</span>
            <Link to="/destinations" className="hover:text-emerald-700 transition-colors">দর্শনীয় স্থান</Link>
            <span>/</span>
            <span className="text-slate-700 font-semibold">{dest.division} বিভাগ</span>
            <span>/</span>
            <span className="text-slate-700 font-semibold">{dest.district} জেলা</span>
            <span>/</span>
            <span className="text-slate-700 font-semibold">{dest.upazila} উপজেলা</span>
            <span>/</span>
            <span className="text-emerald-800 font-bold truncate max-w-[200px]">{dest.name}</span>
          </nav>

          <button
            type="button"
            onClick={() => navigate('/destinations')}
            className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 hover:text-emerald-900 cursor-pointer transition-colors"
          >
            <span className="material-symbols-outlined text-[16px]">arrow_back</span>
            <span>সকল দর্শনীয় স্থানে ফিরুন</span>
          </button>
        </div>
      </section>

      {/* Hero Showcase & Gallery */}
      <section className="max-w-[1360px] mx-auto px-4 sm:px-8 mt-6">
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm">
          
          {/* Header Title & Badges */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 border-b border-slate-100">
            <div>
              {/* Hierarchy Badge */}
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200/80 text-xs font-bold mb-3 shadow-xs">
                <span className="material-symbols-outlined text-[15px] text-emerald-600">location_on</span>
                <span>{dest.division} বিভাগ</span>
                <span className="text-slate-400">❯</span>
                <span>{dest.district} জেলা</span>
                <span className="text-slate-400">❯</span>
                <span className="text-emerald-950">{dest.upazila} উপজেলা</span>
              </div>

              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#03251A] font-serif leading-tight">
                {dest.name}
              </h1>
              <p className="text-slate-600 text-sm sm:text-base mt-1.5 font-medium">
                {dest.tagline}
              </p>
            </div>

            {/* Quick Actions & Ratings */}
            <div className="flex flex-wrap items-center gap-3 shrink-0">
              <div className="flex items-center gap-1.5 px-3.5 py-2 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 font-bold text-sm">
                <span className="text-amber-500">★</span>
                <span>{dest.rating}</span>
                <span className="text-slate-400 font-normal text-xs">({dest.reviews} রিভিউ)</span>
              </div>

              <button
                type="button"
                onClick={() => {
                  navigate(`/tours/${dest.relatedTourId || 'sajek-1'}`);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="px-5 py-2.5 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-700 text-white text-xs sm:text-sm font-bold shadow-md hover:shadow-emerald-600/30 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <span className="material-symbols-outlined text-[18px]">airplane_ticket</span>
                <span>লাইভ ট্যুরে সিট বুক করুন</span>
              </button>
            </div>
          </div>

          {/* Photo Gallery Grid (Pic Showcase) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 mt-6">
            
            {/* Big Main Featured Photo */}
            <div className="lg:col-span-8 relative h-[300px] sm:h-[420px] rounded-2xl overflow-hidden shadow-md bg-slate-900 group">
              <img
                src={selectedPhoto || dest.image}
                alt={dest.name}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

              {/* Expand button */}
              <button
                type="button"
                onClick={() => setLightboxImg(selectedPhoto || dest.image)}
                className="absolute bottom-4 right-4 px-3.5 py-1.5 rounded-xl bg-black/60 hover:bg-black/80 text-white text-xs font-semibold backdrop-blur-md border border-white/20 flex items-center gap-1.5 cursor-pointer transition-colors"
              >
                <span className="material-symbols-outlined text-[16px]">fullscreen</span>
                <span>বড় করে দেখুন</span>
              </button>
            </div>

            {/* Thumbnails Stack */}
            <div className="lg:col-span-4 grid grid-cols-2 lg:grid-cols-1 gap-3">
              {galleryList.slice(0, 4).map((imgUrl, idx) => (
                <div
                  key={idx}
                  onClick={() => setSelectedPhoto(imgUrl)}
                  className={`relative h-[90px] sm:h-[130px] lg:h-[97px] rounded-xl overflow-hidden cursor-pointer border-2 transition-all shadow-xs ${
                    selectedPhoto === imgUrl
                      ? 'border-emerald-600 scale-[1.02] ring-2 ring-emerald-500/20'
                      : 'border-transparent opacity-80 hover:opacity-100 hover:border-slate-300'
                  }`}
                >
                  <img
                    src={imgUrl}
                    alt={`${dest.name} ছবি ${idx + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Key Facts Pill Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 p-4 rounded-2xl bg-slate-50 border border-slate-100 text-slate-800">
            <div className="flex items-center gap-3">
              <span className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-xl">landscape</span>
              </span>
              <div>
                <span className="text-[11px] text-slate-400 block font-medium">ভৌগোলিক উচ্চতা</span>
                <span className="text-xs sm:text-sm font-bold text-slate-900">{dest.altitude || 'প্রাকৃতিক উচ্চতা'}</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <span className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-xl">sunny</span>
              </span>
              <div>
                <span className="text-[11px] text-slate-400 block font-medium">ভ্রমণের সেরা সময়</span>
                <span className="text-xs sm:text-sm font-bold text-slate-900">{(dest.bestSeason || 'সারা বছর').split('(')[0]}</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <span className="w-10 h-10 rounded-xl bg-teal-100 text-teal-800 flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-xl">payments</span>
              </span>
              <div>
                <span className="text-[11px] text-slate-400 block font-medium">গড় ট্যুর খরচ</span>
                <span className="text-xs sm:text-sm font-bold text-emerald-800 font-mono">{dest.avgCost || '৳৪,৫০০'} / জন</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <span className="w-10 h-10 rounded-xl bg-purple-100 text-purple-800 flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-xl">confirmation_number</span>
              </span>
              <div>
                <span className="text-[11px] text-slate-400 block font-medium">প্রবেশ ফি / পারমিট</span>
                <span className="text-xs sm:text-sm font-bold text-slate-900">{dest.entryFee || 'বিনামূল্যে'}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Detailed Tabs & Content Layout */}
      <section className="max-w-[1360px] mx-auto px-4 sm:px-8 mt-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Main Content Area (8 Cols) */}
          <div className="lg:col-span-8 space-y-8">
            
            {/* Tab Buttons */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1 border-b border-slate-200 scrollbar-none">
              {[
                { id: 'overview', label: 'বিবরণ ও আকর্ষণ', icon: 'visibility' },
                { id: 'history', label: 'ঐতিহাসিক পটভূমি', icon: 'menu_book' },
                { id: 'route', label: 'কীভাবে যাবেন', icon: 'route' },
                { id: 'stay', label: 'থাকা ও খাওয়া', icon: 'hotel' },
                { id: 'tips', label: 'ভ্রমণ টিপস', icon: 'tips_and_updates' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-1.5 shrink-0 cursor-pointer ${
                    activeTab === tab.id
                      ? 'bg-[#03251A] text-white shadow-md'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  <span className="material-symbols-outlined text-[16px]">{tab.icon}</span>
                  <span>{tab.label}</span>
                </button>
              ))}
            </div>

            {/* TAB 1: OVERVIEW & HIGHLIGHTS */}
            {activeTab === 'overview' && (
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
                <div>
                  <h3 className="text-xl font-bold font-serif text-[#03251A] mb-3 flex items-center gap-2">
                    <span className="material-symbols-outlined text-emerald-700">info</span>
                    <span>{dest.name} এর বিস্তারিত বিবরণ</span>
                  </h3>
                  <p className="text-slate-700 text-sm sm:text-base leading-relaxed leading-7">
                    {dest.description}
                  </p>
                </div>

                {/* Highlights Grid */}
                <div className="pt-4 border-t border-slate-100">
                  <h4 className="text-base font-bold font-serif text-slate-900 mb-4 flex items-center gap-2">
                    <span className="material-symbols-outlined text-emerald-600">stars</span>
                    <span>এই উপজেলা ও অঞ্চলের প্রধান দর্শনীয় আকর্ষণসমূহ</span>
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {(dest.highlights || []).map((h, i) => (
                      <div
                        key={i}
                        className="flex items-start gap-2.5 p-3.5 rounded-2xl bg-slate-50 border border-slate-100"
                      >
                        <span className="material-symbols-outlined text-emerald-600 text-lg shrink-0 mt-0.5">
                          check_circle
                        </span>
                        <span className="text-xs sm:text-sm font-semibold text-slate-800">
                          {h}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* TAB 2: RICH HISTORY (ইতিহাস একদম সুন্দরভাবে) */}
            {activeTab === 'history' && (
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
                <div>
                  <h3 className="text-xl font-bold font-serif text-[#03251A] mb-3 flex items-center gap-2">
                    <span className="material-symbols-outlined text-amber-600">history_edu</span>
                    <span>ঐতিহাসিক পটভূমি ও সাংস্কৃতিক ঐতিহ্য</span>
                  </h3>

                  {/* Highlight Quote Box */}
                  <div className="p-4 sm:p-5 rounded-2xl bg-amber-50/70 border-l-4 border-amber-500 mb-5">
                    <p className="text-xs sm:text-sm text-amber-950 font-medium italic leading-relaxed">
                      "{dest.name} শুধুমাত্র একটি মনোমুগ্ধকর প্রাকৃতিক স্থান নয়, এর প্রতিটি পাহাড়, নদী ও লোকালয়ে জড়িয়ে রয়েছে শত শত বছরের সমৃদ্ধ ইতিহাস, ঐতিহ্য ও কৃষ্টি।"
                    </p>
                  </div>

                  {/* History Narrative */}
                  <div className="prose text-slate-700 text-sm sm:text-base leading-relaxed leading-8 space-y-4">
                    <p>{dest.history}</p>
                  </div>
                </div>

                {/* Administrative Note */}
                <div className="p-4 rounded-2xl bg-emerald-50/80 border border-emerald-100 flex items-center gap-3">
                  <span className="material-symbols-outlined text-emerald-700 text-2xl shrink-0">
                    account_balance
                  </span>
                  <div className="text-xs text-emerald-950">
                    <strong>প্রশাসনিক তথ্য:</strong> {dest.name} এলাকাটি গণপ্রজাতন্ত্রী বাংলাদেশের <strong>{dest.division}</strong> বিভাগের <strong>{dest.district}</strong> জেলার অন্তর্গত <strong>{dest.upazila}</strong> উপজেলার অধীন পরিচালিত হয়।
                  </div>
                </div>
              </div>
            )}

            {/* TAB 3: HOW TO GO (কীভাবে যাবেন) */}
            {activeTab === 'route' && (
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
                <h3 className="text-xl font-bold font-serif text-[#03251A] mb-3 flex items-center gap-2">
                  <span className="material-symbols-outlined text-teal-600">directions_bus</span>
                  <span>যাতায়াত ও রুট গাইড</span>
                </h3>

                <div className="space-y-4">
                  {(dest.howToGo || []).map((step, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-100"
                    >
                      <span className="w-8 h-8 rounded-full bg-emerald-700 text-white font-bold text-xs flex items-center justify-center shrink-0">
                        {idx + 1}
                      </span>
                      <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
                        {step}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 4: WHERE TO STAY & FOOD (থাকা ও খাওয়া) */}
            {activeTab === 'stay' && (
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
                <div>
                  <h3 className="text-xl font-bold font-serif text-[#03251A] mb-3 flex items-center gap-2">
                    <span className="material-symbols-outlined text-indigo-600">hotel</span>
                    <span>হোটেল, কটেজ ও থাকার ব্যবস্থা</span>
                  </h3>
                  <div className="space-y-2.5">
                    {(dest.whereToStay || []).map((stay, idx) => (
                      <div key={idx} className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-100 text-xs sm:text-sm text-slate-700 font-medium">
                        <span className="material-symbols-outlined text-emerald-600 text-base">check</span>
                        <span>{stay}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100">
                  <h3 className="text-xl font-bold font-serif text-[#03251A] mb-3 flex items-center gap-2">
                    <span className="material-symbols-outlined text-orange-600">restaurant</span>
                    <span>স্থানীয় বিখ্যাত খাবার ও স্পেশালিটি</span>
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {(dest.foodSpecialty || []).map((food, idx) => (
                      <div key={idx} className="p-3.5 rounded-xl bg-orange-50/60 border border-orange-100 text-xs sm:text-sm text-orange-950 font-semibold flex items-center gap-2">
                        <span className="material-symbols-outlined text-orange-500 text-lg">local_dining</span>
                        <span>{food}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* TAB 5: TIPS (টিপস) */}
            {activeTab === 'tips' && (
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-4">
                <h3 className="text-xl font-bold font-serif text-[#03251A] mb-3 flex items-center gap-2">
                  <span className="material-symbols-outlined text-amber-500">lightbulb</span>
                  <span>ভ্রমণকারীদের জন্য প্রয়োজনীয় পরামর্শ ও সতর্কতা</span>
                </h3>
                <div className="space-y-3">
                  {(dest.tips || []).map((tip, idx) => (
                    <div key={idx} className="flex items-start gap-3 p-4 rounded-2xl bg-amber-50/60 border border-amber-200/80 text-xs sm:text-sm text-amber-950">
                      <span className="material-symbols-outlined text-amber-600 text-lg shrink-0 mt-0.5">warning</span>
                      <p className="font-medium leading-relaxed">{tip}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Sticky Sidebar (4 Cols) */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Booking Card */}
            <div className="bg-gradient-to-br from-[#03251A] via-[#053d2c] to-[#042f22] text-white rounded-3xl p-6 sm:p-7 shadow-xl border border-emerald-500/20 sticky top-24">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-300">ভ্রমণ পরিকল্পনা</span>
              <h3 className="text-xl font-bold font-serif text-white mt-1 mb-4">
                এই গন্তব্যে যেতে চান?
              </h3>

              <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 mb-5 space-y-2.5 text-xs text-emerald-100">
                <div className="flex justify-between">
                  <span>প্রশাসনিক এলাকা:</span>
                  <span className="font-bold text-white">{dest.upazila}, {dest.district}</span>
                </div>
                <div className="flex justify-between">
                  <span>সক্রিয় ট্যুর:</span>
                  <span className="font-bold text-amber-400">{dest.activeTours || 4} টি রানিং ট্যুর</span>
                </div>
                <div className="flex justify-between">
                  <span>প্যাকেজ শুরু:</span>
                  <span className="font-bold text-white font-mono">{dest.avgCost || '৳৪,৫০০'} হতে</span>
                </div>
              </div>

              <div className="space-y-3">
                <button
                  type="button"
                  onClick={() => {
                    navigate(`/tours/${dest.relatedTourId || 'sajek-1'}`);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="w-full py-3.5 rounded-2xl bg-amber-400 hover:bg-amber-300 text-slate-900 font-extrabold text-xs sm:text-sm shadow-lg transition-transform hover:scale-[1.02] flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <span className="material-symbols-outlined text-lg">event_seat</span>
                  <span>লাইভ সিট ম্যাপ ও বুকিং</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    navigate('/custom-tour');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="w-full py-3 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs border border-white/20 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <span className="material-symbols-outlined text-lg">tune</span>
                  <span>কাস্টম ট্যুর রিকোয়েস্ট করুন</span>
                </button>
              </div>

              <div className="mt-6 pt-4 border-t border-white/10 text-[11px] text-emerald-200/70 text-center leading-relaxed">
                🛡️ চলোঘুড়ির সকল ট্যুর ১০০% ভেরিফায়েড অপারেটর ও ১০ মিনিট নিরাপদ সিট লকিং সুরক্ষা দ্বারা পরিচালিত।
              </div>
            </div>

            {/* Other Nearby Spots in same Division */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm">
              <h4 className="font-bold text-slate-900 text-sm font-serif mb-4 flex items-center gap-1.5">
                <span className="material-symbols-outlined text-emerald-600 text-base">explore</span>
                <span>{dest.division} বিভাগের অন্যান্য স্থান</span>
              </h4>

              <div className="space-y-3">
                {allDestinations
                  .filter((d) => d.division === dest.division && d.id !== dest.id)
                  .slice(0, 3)
                  .map((item) => (
                    <div
                      key={item.id}
                      onClick={() => navigate(`/destinations/${item.id}`)}
                      className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-slate-50 transition-colors cursor-pointer border border-transparent hover:border-slate-200"
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-14 h-14 rounded-xl object-cover shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <span className="text-[10px] text-emerald-700 font-bold block">{item.upazila}, {item.district}</span>
                        <h5 className="text-xs font-bold text-slate-900 truncate font-serif">{item.name}</h5>
                        <span className="text-[11px] text-slate-400 font-mono">প্যাকেজ: {item.avgCost}</span>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Lightbox Modal */}
      {lightboxImg && (
        <div
          onClick={() => setLightboxImg(null)}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md cursor-pointer animate-in fade-in duration-200"
        >
          <div className="relative max-w-4xl max-h-[85vh] overflow-hidden rounded-2xl" onClick={(e) => e.stopPropagation()}>
            <img src={lightboxImg} alt="বড় ছবি" className="w-full h-auto max-h-[85vh] object-contain" />
            <button
              type="button"
              onClick={() => setLightboxImg(null)}
              className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/60 text-white flex items-center justify-center cursor-pointer hover:bg-black/90 transition-colors"
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
