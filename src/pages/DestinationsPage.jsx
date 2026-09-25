import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { allDestinations } from '../data/destinationsData';

export default function DestinationsPage() {
  const navigate = useNavigate();

  // Cascading Filter State: বিভাগ -> জেলা -> উপজেলা
  const [selectedDivision, setSelectedDivision] = useState('all');
  const [selectedDistrict, setSelectedDistrict] = useState('all');
  const [selectedUpazila, setSelectedUpazila] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState('grouped'); // 'grouped' | 'grid'

  // Extract unique Divisions
  const divisions = useMemo(() => {
    return [...new Set(allDestinations.map((d) => d.division))];
  }, []);

  // Extract unique Districts based on selected Division
  const availableDistricts = useMemo(() => {
    const filtered =
      selectedDivision === 'all'
        ? allDestinations
        : allDestinations.filter((d) => d.division === selectedDivision);
    return [...new Set(filtered.map((d) => d.district))];
  }, [selectedDivision]);

  // Extract unique Upazilas based on selected District
  const availableUpazilas = useMemo(() => {
    const filtered = allDestinations.filter((d) => {
      const matchDiv = selectedDivision === 'all' || d.division === selectedDivision;
      const matchDist = selectedDistrict === 'all' || d.district === selectedDistrict;
      return matchDiv && matchDist;
    });
    return [...new Set(filtered.map((d) => d.upazila))];
  }, [selectedDivision, selectedDistrict]);

  // Reset dependent filters when parent changes
  const handleDivisionChange = (div) => {
    setSelectedDivision(div);
    setSelectedDistrict('all');
    setSelectedUpazila('all');
  };

  const handleDistrictChange = (dist) => {
    setSelectedDistrict(dist);
    setSelectedUpazila('all');
  };

  const handleResetFilters = () => {
    setSelectedDivision('all');
    setSelectedDistrict('all');
    setSelectedUpazila('all');
    setSearchQuery('');
  };

  // Filtered Destinations
  const filteredDestinations = useMemo(() => {
    return allDestinations.filter((d) => {
      const matchDiv = selectedDivision === 'all' || d.division === selectedDivision;
      const matchDist = selectedDistrict === 'all' || d.district === selectedDistrict;
      const matchUp = selectedUpazila === 'all' || d.upazila === selectedUpazila;
      const matchSearch =
        searchQuery.trim() === '' ||
        d.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        d.division.toLowerCase().includes(searchQuery.toLowerCase()) ||
        d.district.toLowerCase().includes(searchQuery.toLowerCase()) ||
        d.upazila.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (d.highlights && d.highlights.some((h) => h.toLowerCase().includes(searchQuery.toLowerCase())));
      return matchDiv && matchDist && matchUp && matchSearch;
    });
  }, [selectedDivision, selectedDistrict, selectedUpazila, searchQuery]);

  // Grouped by Division -> District -> Upazila
  const groupedData = useMemo(() => {
    const groups = {};
    filteredDestinations.forEach((item) => {
      if (!groups[item.division]) {
        groups[item.division] = {};
      }
      if (!groups[item.division][item.district]) {
        groups[item.division][item.district] = {};
      }
      if (!groups[item.division][item.district][item.upazila]) {
        groups[item.division][item.district][item.upazila] = [];
      }
      groups[item.division][item.district][item.upazila].push(item);
    });
    return groups;
  }, [filteredDestinations]);

  const handleCardClick = (destId) => {
    navigate(`/destinations/${destId}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="w-full min-h-screen bg-slate-50 pt-20 pb-16">
      {/* Header Banner */}
      <section className="bg-gradient-to-br from-[#063323] via-[#03251A] to-[#01170F] text-white py-14 px-4 sm:px-8 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#7FE5BA_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />
        <div className="max-w-[1360px] mx-auto relative z-10 text-center sm:text-left">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 text-xs font-semibold mb-3">
            <span className="material-symbols-outlined text-sm">hub</span>
            <span>প্রশাসনিক শ্রেণিবিন্যাস: বিভাগ ❯ জেলা ❯ উপজেলা ভিত্তিক ভ্রমণ</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-serif tracking-tight text-white mb-3">
            বাংলাদেশের দর্শনীয় স্থানসমূহ
          </h1>
          <p className="text-emerald-100/90 text-sm sm:text-base max-w-2xl leading-relaxed">
            বিভাগ, জেলা এবং উপজেলা অনুযায়ী প্রতিটি অঞ্চলের বিখ্যাত দর্শনীয় স্থানসমূহ কার্ড আকারে সাজানো। যে কোনো কার্ডে ক্লিক করে সেই স্থানের বিস্তারিত ইতিহাস, ছবি ও ভ্রমণ নির্দেশিকা দেখুন।
          </p>
        </div>
      </section>

      {/* Cascading Filter Suite: বিভাগ -> জেলা -> উপজেলা */}
      <section className="max-w-[1360px] mx-auto px-4 sm:px-8 -mt-7 relative z-20">
        <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-5 sm:p-6">
          <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4 pb-4 border-b border-slate-100">
            
            {/* Title / Info */}
            <div className="flex items-center gap-2">
              <span className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-xl">travel_explore</span>
              </span>
              <div>
                <h3 className="font-bold text-slate-900 text-sm sm:text-base font-serif">
                  ফিল্টার করুন (বিভাগ ❯ জেলা ❯ উপজেলা)
                </h3>
                <span className="text-xs text-slate-500">
                  উপজেলা ফিল্টার করলে সেই উপজেলার সমস্ত দর্শনীয় স্থান কার্ড গ্রিডে প্রদর্শিত হবে
                </span>
              </div>
            </div>

            {/* View Mode Switcher */}
            <div className="flex items-center gap-2 bg-slate-100 p-1 rounded-2xl self-start sm:self-auto">
              <button
                type="button"
                onClick={() => setViewMode('grouped')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                  viewMode === 'grouped'
                    ? 'bg-[#03251A] text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <span className="material-symbols-outlined text-[16px]">account_tree</span>
                <span>বিভাগ ও উপজেলা ভিত্তিক সাজানো</span>
              </button>
              <button
                type="button"
                onClick={() => setViewMode('grid')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                  viewMode === 'grid'
                    ? 'bg-[#03251A] text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <span className="material-symbols-outlined text-[16px]">grid_view</span>
                <span>সকল কার্ড গ্রিড</span>
              </button>
            </div>
          </div>

          {/* 3-Tier Cascading Selectors */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 pt-4">
            
            {/* 1. বিভাগ (Division) Selector */}
            <div>
              <label className="block text-[11px] font-bold text-slate-500 mb-1 flex items-center gap-1">
                <span className="w-4 h-4 rounded-full bg-emerald-600 text-white text-[10px] flex items-center justify-center">১</span>
                <span>বিভাগ নির্বাচন করুন</span>
              </label>
              <select
                value={selectedDivision}
                onChange={(e) => handleDivisionChange(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 text-xs sm:text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-500 cursor-pointer"
              >
                <option value="all">সকল বিভাগ (সারাদেশ)</option>
                {divisions.map((div) => (
                  <option key={div} value={div}>
                    {div} বিভাগ
                  </option>
                ))}
              </select>
            </div>

            {/* 2. জেলা (District) Selector */}
            <div>
              <label className="block text-[11px] font-bold text-slate-500 mb-1 flex items-center gap-1">
                <span className="w-4 h-4 rounded-full bg-teal-600 text-white text-[10px] flex items-center justify-center">২</span>
                <span>জেলা নির্বাচন করুন</span>
              </label>
              <select
                value={selectedDistrict}
                onChange={(e) => handleDistrictChange(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 text-xs sm:text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-500 cursor-pointer"
              >
                <option value="all">
                  {selectedDivision === 'all' ? 'সকল জেলা' : `${selectedDivision} বিভাগের সকল জেলা`}
                </option>
                {availableDistricts.map((dist) => (
                  <option key={dist} value={dist}>
                    {dist} জেলা
                  </option>
                ))}
              </select>
            </div>

            {/* 3. উপজেলা (Upazila) Selector */}
            <div>
              <label className="block text-[11px] font-bold text-slate-500 mb-1 flex items-center gap-1">
                <span className="w-4 h-4 rounded-full bg-cyan-700 text-white text-[10px] flex items-center justify-center">৩</span>
                <span>উপজেলা নির্বাচন করুন</span>
              </label>
              <select
                value={selectedUpazila}
                onChange={(e) => setSelectedUpazila(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 text-xs sm:text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-500 cursor-pointer"
              >
                <option value="all">সকল উপজেলা</option>
                {availableUpazilas.map((up) => (
                  <option key={up} value={up}>
                    {up} উপজেলা
                  </option>
                ))}
              </select>
            </div>

            {/* Search & Reset */}
            <div className="flex items-end gap-2">
              <div className="relative flex-1">
                <label className="block text-[11px] font-bold text-slate-500 mb-1">
                  স্থানের নাম খুঁজুন
                </label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400 text-base">
                    search
                  </span>
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="নাম লিখুন..."
                    className="w-full pl-8 pr-3 py-2 text-xs sm:text-sm rounded-xl border border-slate-200 bg-slate-50 text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
              </div>

              {(selectedDivision !== 'all' || selectedDistrict !== 'all' || selectedUpazila !== 'all' || searchQuery) && (
                <button
                  type="button"
                  onClick={handleResetFilters}
                  className="p-2 rounded-xl border border-rose-200 text-rose-600 hover:bg-rose-50 text-xs font-bold shrink-0 cursor-pointer transition-colors"
                  title="ফিল্টার রিসেট করুন"
                >
                  রিসেট
                </button>
              )}
            </div>
          </div>

          {/* Quick Division Badges Strip */}
          <div className="flex items-center gap-1.5 overflow-x-auto pt-4 mt-4 border-t border-slate-100 scrollbar-none">
            <span className="text-xs font-bold text-slate-400 shrink-0 mr-1">দ্রুত বিভাগ:</span>
            <button
              onClick={() => handleDivisionChange('all')}
              className={`px-3 py-1 rounded-full text-xs font-bold shrink-0 transition-all cursor-pointer ${
                selectedDivision === 'all'
                  ? 'bg-emerald-700 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              সারাদেশ (সব)
            </button>
            {divisions.map((div) => (
              <button
                key={div}
                onClick={() => handleDivisionChange(div)}
                className={`px-3 py-1 rounded-full text-xs font-bold shrink-0 transition-all cursor-pointer ${
                  selectedDivision === div
                    ? 'bg-emerald-700 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {div}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Results Header Info */}
      <section className="max-w-[1360px] mx-auto px-4 sm:px-8 mt-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6">
          <div className="flex items-center gap-2 text-sm text-slate-600 font-medium">
            <span>ফলাফল:</span>
            <span className="font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-lg border border-emerald-100">
              {filteredDestinations.length} টি দর্শনীয় স্থান পাওয়া গেছে
            </span>
            {selectedDivision !== 'all' && (
              <span className="text-xs text-slate-500 hidden sm:inline">
                • {selectedDivision} বিভাগ {selectedDistrict !== 'all' && `❯ ${selectedDistrict} জেলা`} {selectedUpazila !== 'all' && `❯ ${selectedUpazila} উপজেলা`}
              </span>
            )}
          </div>
          <span className="text-xs text-emerald-700 font-semibold">
            💡 যে কোনো কার্ডে ক্লিক করে সম্পূর্ণ ছবি ও ইতিহাস দেখুন
          </span>
        </div>

        {filteredDestinations.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 shadow-sm max-w-lg mx-auto">
            <span className="material-symbols-outlined text-5xl text-slate-400 mb-2">location_off</span>
            <h3 className="text-lg font-bold text-slate-800">কোনো স্থান পাওয়া যায়নি</h3>
            <p className="text-sm text-slate-500 mt-1 mb-4">
              আপনার নির্বাচিত বিভাগ, জেলা বা উপজেলায় কোনো দর্শনীয় স্থান মেলেনি। ফিল্টার পরিবর্তন করে পুনরায় চেষ্টা করুন।
            </p>
            <button
              onClick={handleResetFilters}
              className="px-5 py-2.5 bg-emerald-700 text-white text-xs font-bold rounded-xl hover:bg-emerald-800 cursor-pointer shadow-sm"
            >
              সকল ফিল্টার রিসেট করুন
            </button>
          </div>
        ) : viewMode === 'grouped' ? (
          /* ============================================================== */
          /* VIEW 1: GROUPED BY DIVISION -> DISTRICT -> UPAZILA             */
          /* ============================================================== */
          <div className="space-y-12">
            {Object.entries(groupedData).map(([divisionName, districtsObj]) => (
              <div key={divisionName} className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm">
                
                {/* Division Header */}
                <div className="flex items-center justify-between pb-5 mb-6 border-b border-slate-100">
                  <div className="flex items-center gap-3">
                    <span className="w-10 h-10 rounded-2xl bg-gradient-to-br from-emerald-600 to-teal-800 text-white flex items-center justify-center font-bold text-base shadow-sm">
                      📍
                    </span>
                    <div>
                      <h2 className="text-xl sm:text-2xl font-extrabold text-[#03251A] font-serif">
                        {divisionName} বিভাগ
                      </h2>
                      <span className="text-xs text-slate-500">
                        {Object.keys(districtsObj).length} টি জেলায় দর্শনীয় স্থানসমূহ
                      </span>
                    </div>
                  </div>

                  <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-bold">
                    {Object.values(districtsObj).flatMap((u) => Object.values(u)).flat().length} টি স্থান
                  </span>
                </div>

                {/* Districts and Upazilas inside this Division */}
                <div className="space-y-8">
                  {Object.entries(districtsObj).map(([districtName, upazilasObj]) => (
                    <div key={districtName} className="pl-0 sm:pl-3 border-l-0 sm:border-l-2 border-emerald-500/30">
                      
                      {/* District Header */}
                      <div className="flex items-center gap-2 mb-4">
                        <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                        <h3 className="text-base sm:text-lg font-bold text-slate-800 font-serif">
                          {districtName} জেলা
                        </h3>
                        <span className="text-xs text-slate-400 font-normal">
                          ({Object.values(upazilasObj).flat().length} টি স্থান)
                        </span>
                      </div>

                      {/* Upazilas Loop */}
                      <div className="space-y-6">
                        {Object.entries(upazilasObj).map(([upazilaName, items]) => (
                          <div key={upazilaName} className="bg-slate-50/70 p-4 sm:p-5 rounded-2xl border border-slate-100">
                            
                            {/* Upazila Badge / Title */}
                            <div className="flex items-center justify-between mb-4 pb-2 border-b border-slate-200/60">
                              <div className="flex items-center gap-2">
                                <span className="material-symbols-outlined text-emerald-700 text-base">pin_drop</span>
                                <span className="font-bold text-sm text-slate-900 font-serif">
                                  {upazilaName} উপজেলা
                                </span>
                              </div>
                              <span className="text-xs text-emerald-700 font-semibold bg-emerald-100/70 px-2 py-0.5 rounded-md">
                                {items.length} টি দর্শনীয় স্থান
                              </span>
                            </div>

                            {/* Cards Grid for this Upazila */}
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                              {items.map((dest) => (
                                <DestinationCard
                                  key={dest.id}
                                  dest={dest}
                                  onClick={() => handleCardClick(dest.id)}
                                />
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* ============================================================== */
          /* VIEW 2: FLAT ALL GRID VIEW                                     */
          /* ============================================================== */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredDestinations.map((dest) => (
              <DestinationCard
                key={dest.id}
                dest={dest}
                onClick={() => handleCardClick(dest.id)}
              />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

// Subcomponent: Reusable Destination Card with Hierarchy and Click Handler
function DestinationCard({ dest, onClick }) {
  const navigate = useNavigate();

  return (
    <div
      onClick={onClick}
      className="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between group cursor-pointer"
    >
      <div>
        {/* Cover Image */}
        <div className="relative h-48 sm:h-52 w-full overflow-hidden bg-slate-900">
          <img
            src={dest.image}
            alt={dest.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />

          {/* Active tours badge */}
          <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-emerald-600/90 text-white text-[11px] font-bold backdrop-blur-xs flex items-center gap-1 shadow-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
            <span>{dest.activeTours}টি সক্রিয় ট্যুর</span>
          </div>

          {/* Bottom strip on image */}
          <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between text-[11px] text-white/90">
            <span className="flex items-center gap-1 font-medium">
              <span className="material-symbols-outlined text-[14px] text-amber-400">landscape</span>
              {dest.altitude}
            </span>
            <span className="flex items-center gap-1 font-medium">
              <span className="material-symbols-outlined text-[14px] text-emerald-400">sunny</span>
              {dest.bestSeason ? dest.bestSeason.split('(')[0] : ''}
            </span>
          </div>
        </div>

        {/* Card Body */}
        <div className="p-5">
          {/* Breadcrumb Hierarchy: বিভাগ ❯ জেলা ❯ উপজেলা */}
          <div className="flex flex-wrap items-center gap-1 text-[11px] font-semibold text-emerald-800 bg-emerald-50/90 px-2.5 py-1 rounded-lg border border-emerald-100 mb-3">
            <span className="material-symbols-outlined text-[13px] text-emerald-600">location_on</span>
            <span>{dest.division} বিভাগ</span>
            <span className="text-slate-400">❯</span>
            <span>{dest.district} জেলা</span>
            <span className="text-slate-400">❯</span>
            <span className="text-emerald-950 font-bold">{dest.upazila} উপজেলা</span>
          </div>

          <div className="flex items-center justify-between mb-1">
            <span className="text-[11px] font-bold text-slate-500 uppercase">{dest.category}</span>
            <div className="flex items-center gap-1 text-amber-500 font-bold text-xs">
              <span>★ {dest.rating}</span>
              <span className="text-slate-400 font-normal">({dest.reviews})</span>
            </div>
          </div>

          <h4 className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-emerald-700 transition-colors font-serif line-clamp-1">
            {dest.name}
          </h4>

          <p className="text-xs text-slate-600 mt-2 leading-relaxed line-clamp-2">
            {dest.description}
          </p>

          {/* Highlights Chips */}
          <div className="flex flex-wrap gap-1.5 mt-3 pt-3 border-t border-slate-100">
            {dest.highlights && dest.highlights.slice(0, 3).map((h, idx) => (
              <span
                key={idx}
                className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 text-[10px] font-medium"
              >
                {h}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Price & Action */}
      <div className="px-5 pb-5 pt-3 border-t border-slate-100 flex items-center justify-between">
        <div>
          <span className="text-[10px] text-slate-400 block">গড় প্যাকেজ শুরু</span>
          <span className="text-base font-extrabold text-[#03251A] font-mono">{dest.avgCost}</span>
          <span className="text-[10px] text-slate-400 ml-0.5">/জন</span>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/destinations/${dest.id}`);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-700 text-white text-xs font-bold hover:shadow-md transition-all flex items-center gap-1 cursor-pointer"
          >
            <span>বিস্তারিত ও ইতিহাস</span>
            <span className="material-symbols-outlined text-[15px]">arrow_forward</span>
          </button>
        </div>
      </div>
    </div>
  );
}
