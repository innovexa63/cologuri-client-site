import { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getTourById } from '../../data/toursData';
import { useStore } from '../../store/useStore';
import { emitLockSeat, emitReleaseSeat } from '../../services/socket';

const boardingOptions = [
  'আরামবাগ বাস টার্মিনাল কাউন্টার (ঢাকা) — রাত ১০:০০ টা',
  'সায়েদাবাদ জনপথ মোড় কাউন্টার (ঢাকা) — রাত ১০:১৫ টা',
  'ফকিরাপুল বাস কাউন্টার (ঢাকা) — রাত ১০:২০ টা',
  'মহাখালী বাস টার্মিনাল (ঢাকা) — রাত ১০:৪৫ টা',
  'আব্দুল্লাহপুর বাসস্ট্যান্ড, উত্তরা (ঢাকা) — রাত ১১:১৫ টা',
];

const EMPTY_SEATS = [];

export default function TourDetailsPage({
  tourId,
  onBack,
  onNavigateHome,
}) {
  const tour = useMemo(() => getTourById(tourId), [tourId]);

  const [searchParams, setSearchParams] = useSearchParams();
  const queryGroup = searchParams.get('group');

  const lockedSeats = useStore((state) => state.lockedSeats);
  const lockedSeatsMap = lockedSeats[tourId] || EMPTY_SEATS;

  // Partner groups for Combine Tour
  const partnerGroups = useMemo(() => {
    return tour.partnerGroups || (tour.isJointTour ? [
      {
        groupId: 'g1',
        groupName: 'ঘুরি বাংলাদেশ',
        groupSlug: 'ghuri-bd',
        color: '#166B47',
        allocatedSeats: [
          'A1', 'A2', 'A3', 'A4',
          'B1', 'B2', 'B3', 'B4',
          'C1', 'C2', 'C3', 'C4',
          'D1', 'D2', 'D3', 'D4',
          'E1', 'E2', 'E3'
        ],
      },
      {
        groupId: 'g2',
        groupName: 'সবুজ পথিক ট্রাভেলার্স',
        groupSlug: 'sobuj-pathik',
        color: '#C9622B',
        allocatedSeats: [
          'E4',
          'F1', 'F2', 'F3', 'F4',
          'G1', 'G2', 'G3', 'G4',
          'H1', 'H2', 'H3', 'H4',
          'I1', 'I2', 'I3', 'I4',
          'J1', 'J2', 'J3', 'J4'
        ],
      },
    ] : []);
  }, [tour]);

  const isCombineTour = Boolean(tour.isJointTour || tour.tourType === 'combine' || partnerGroups.length > 1);

  // Active Group for branding and seat booking
  const [activeGroupIndex, setActiveGroupIndex] = useState(() => {
    if (queryGroup && partnerGroups.length > 0) {
      const idx = partnerGroups.findIndex((p) => p.groupSlug === queryGroup || p.groupId === queryGroup);
      return idx !== -1 ? idx : 0;
    }
    return 0;
  });

  const activeGroup = isCombineTour && partnerGroups.length > 0 ? partnerGroups[activeGroupIndex] : null;

  // Sync if query param changes
  useEffect(() => {
    if (queryGroup && partnerGroups.length > 0) {
      const idx = partnerGroups.findIndex((p) => p.groupSlug === queryGroup || p.groupId === queryGroup);
      if (idx !== -1 && idx !== activeGroupIndex) {
        setActiveGroupIndex(idx);
        setSelectedSeats([]);
      }
    }
  }, [queryGroup, partnerGroups]);


  // Seat booking state
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [selectedBoarding, setSelectedBoarding] = useState(boardingOptions[0]);
  const [passengerName, setPassengerName] = useState('');
  const [passengerPhone, setPassengerPhone] = useState('');
  const [passengerGender, setPassengerGender] = useState('male');
  const [activeTab, setActiveTab] = useState('seats');
  const [activeImage, setActiveImage] = useState(tour.image);

  // Booking confirmation modal state
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [bookingId, setBookingId] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('bkash');

  // Generate 10 rows (A to J), 4 seats per row
  const rows = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];

  const isBooked = (seatNo) => tour.busInfo.bookedSeats.includes(seatNo);
  const isLockedByOther = (seatNo) => lockedSeatsMap.includes(seatNo) && !selectedSeats.includes(seatNo);
  const isFemale = (seatNo) => tour.busInfo.femaleSeats.includes(seatNo);
  const isSelected = (seatNo) => selectedSeats.includes(seatNo);

  const getSeatOwner = (seatNo) => {
    if (!isCombineTour) return null;
    return partnerGroups.find((p) => (p.allocatedSeats || []).includes(seatNo)) || null;
  };

  const isMyGroupSeat = (seatNo) => {
    if (!isCombineTour || !activeGroup) return true;
    const owner = getSeatOwner(seatNo);
    return owner ? owner.groupId === activeGroup.groupId : true;
  };

  const isSeatTransferred = (seatNo) => {
    if (!tour.seatTransfers || !Array.isArray(tour.seatTransfers)) return false;
    return tour.seatTransfers.some((t) => t.seatNo === seatNo || (Array.isArray(t.seatNumbers) && t.seatNumbers.includes(seatNo)));
  };

  const toggleSeat = (seatNo) => {
    if (isBooked(seatNo) || isLockedByOther(seatNo)) return;

    if (isCombineTour && !isMyGroupSeat(seatNo)) {
      const owner = getSeatOwner(seatNo);
      if (owner) {
        const targetIdx = partnerGroups.findIndex((p) => p.groupId === owner.groupId);
        if (targetIdx !== -1) {
          setActiveGroupIndex(targetIdx);
          setSelectedSeats([seatNo]);
          setSearchParams({ group: owner.groupSlug || owner.groupId });
          emitLockSeat(tourId, seatNo, passengerPhone || 'guest');
        }
      }
      return;
    }

    if (isSelected(seatNo)) {
      setSelectedSeats(selectedSeats.filter((s) => s !== seatNo));
      emitReleaseSeat(tourId, seatNo, passengerPhone || 'guest');
    } else {
      if (selectedSeats.length >= 6) {
        alert('একবারে সর্বোচ্চ ৬টি সিট নির্বাচন করা যাবে।');
        return;
      }
      setSelectedSeats([...selectedSeats, seatNo]);
      emitLockSeat(tourId, seatNo, passengerPhone || 'guest');
    }
  };

  const totalPrice = selectedSeats.length * tour.price;

  const handleBookingSubmit = (e) => {
    e.preventDefault();
    if (selectedSeats.length === 0) {
      alert('অনুগ্রহ করে বাসের অন্তত একটি সিট নির্বাচন করুন।');
      return;
    }
    if (!passengerName.trim()) {
      alert('অনুগ্রহ করে প্রধান যাত্রীর নাম লিখুন।');
      return;
    }
    if (!passengerPhone.trim() || passengerPhone.length < 11) {
      alert('অনুগ্রহ করে সঠিক ১১ ডিজিটের মোবাইল নম্বর লিখুন।');
      return;
    }

    // Generate reference ID
    const randomId = 'GB-' + Math.floor(100000 + Math.random() * 900000);
    setBookingId(randomId);
    setShowConfirmation(true);
  };

  return (
    <div className="min-h-screen bg-[#F7FBF8] text-[#111E16] pb-24">
      {/* Top Breadcrumb & Return Header */}
      <section className="w-full bg-[#03251A] text-white pt-24 pb-8 border-b border-[#166B47]/40 relative overflow-hidden shadow-lg">
        {/* Subtle Scrim */}
        <div
          className="absolute inset-0 z-0 opacity-20 bg-cover bg-center transition-all duration-500"
          style={{ backgroundImage: `url('${activeImage}')` }}
        />

        <div className="max-w-[1360px] mx-auto px-4 md:px-8 relative z-10">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
            <button
              onClick={onBack}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold bg-white/10 hover:bg-white/20 text-[#F0FDF8] transition-all cursor-pointer border border-[#7FE5BA]/30 backdrop-blur-md"
            >
              <span className="material-symbols-outlined text-[18px]">arrow_back</span>
              <span>পূর্বের পাতায় ফিরুন</span>
            </button>

            <div className="flex items-center gap-2 text-xs text-[#7FE5BA]">
              <span className="cursor-pointer hover:underline" onClick={onNavigateHome}>হোম</span>
              <span>/</span>
              <span>{tour.destinationName}</span>
              <span>/</span>
              <span className="text-white font-medium truncate max-w-[200px]">{tour.title}</span>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <span
                  className="px-3 py-1 rounded-full text-xs font-bold text-white shadow-xs"
                  style={{ backgroundColor: tour.tagColor }}
                >
                  {tour.tag}
                </span>
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-[#166B47]/80 text-[#EDFEEF] border border-[#7FE5BA]/30">
                  {tour.category}
                </span>
                <span className="px-3 py-1 rounded-full text-xs font-medium bg-black/30 text-[#F0FDF8]">
                  {tour.duration}
                </span>
              </div>

              <h1
                className="text-2xl sm:text-3xl md:text-4xl font-bold text-white tracking-tight leading-snug max-w-3xl"
                style={{ fontFamily: '"Tiro Bangla", serif' }}
              >
                {tour.title}
              </h1>

              <div className="flex flex-wrap items-center gap-4 mt-3 text-sm text-[#F0FDF8]">
                <div className="flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[18px] text-[#7FE5BA]">verified</span>
                  <span>হোস্ট: <strong>{activeGroup ? activeGroup.groupName : tour.operator}</strong></span>
                </div>
                <div className="flex items-center gap-1 text-amber-300">
                  <span className="material-symbols-outlined text-[18px] fill-current">star</span>
                  <span className="font-bold">{tour.operatorRating}</span>
                  <span className="text-xs text-white/70">({tour.operatorTrips}টি সফল ট্যুর)</span>
                </div>
                <div className="flex items-center gap-1.5 text-[#EDFEEF]">
                  <span className="material-symbols-outlined text-[18px] text-[#7FE5BA]">calendar_month</span>
                  <span>যাত্রা: {tour.startDate}</span>
                </div>
              </div>

              {isCombineTour && partnerGroups.length > 0 && (
                <div className="inline-flex flex-wrap items-center gap-2 mt-3 py-1.5 px-3 rounded-xl bg-white/10 border border-white/20 text-xs backdrop-blur-md">
                  <span className="font-bold text-amber-300">🤝 মাল্টি-গ্রুপ জয়েন্ট পার্টনারশিপ:</span>
                  <span>{partnerGroups.map((p) => p.groupName).join(' × ')}</span>
                  <span className="text-emerald-200 text-[11px] bg-emerald-950/40 px-2 py-0.5 rounded-full border border-emerald-400/20">
                    বর্তমান বুকিং কাউন্টার: {activeGroup?.groupName}
                  </span>
                </div>
              )}
            </div>

            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-[#7FE5BA]/30 shrink-0 text-right">
              <span className="text-xs text-[#7FE5BA] block">প্যাকেজ মূল্য (প্রতি জন)</span>
              <span
                className="text-3xl font-extrabold text-white block mt-0.5"
                style={{ fontFamily: '"Tiro Bangla", serif' }}
              >
                ৳{tour.price.toLocaleString('bn-BD')}
              </span>
              <span className="text-[11px] text-emerald-200 mt-1 inline-flex items-center gap-1">
                <span className="material-symbols-outlined text-[14px]">event_seat</span>
                {tour.seatsTotal - tour.seatsBooked}টি সিট খালি আছে
              </span>
            </div>
          </div>

          {/* Photo Gallery Thumbnails */}
          {tour.gallery && tour.gallery.length > 0 && (
            <div className="flex items-center gap-3 mt-6 pt-4 border-t border-white/10 overflow-x-auto pb-1">
              <span className="text-xs text-[#7FE5BA] font-semibold flex items-center gap-1 shrink-0">
                <span className="material-symbols-outlined text-[16px]">photo_library</span>
                <span>ছবি গ্যালারি:</span>
              </span>
              {[tour.image, ...tour.gallery].map((imgUrl, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setActiveImage(imgUrl)}
                  className={`w-14 h-10 rounded-lg overflow-hidden shrink-0 border-2 transition-all cursor-pointer ${
                    activeImage === imgUrl ? 'border-[#7FE5BA] scale-105 shadow-md' : 'border-white/30 opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={imgUrl} alt="Tour thumbnail" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Main Content Area */}
      <main className="max-w-[1360px] mx-auto px-4 md:px-8 mt-8">
        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 border-b border-gray-200 mb-8 overflow-x-auto pb-2">
          <button
            onClick={() => setActiveTab('seats')}
            className={`px-5 py-3 rounded-xl text-sm font-bold flex items-center gap-2 transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'seats'
                ? 'bg-[#03251A] text-white shadow-md'
                : 'bg-white text-[#414844] hover:bg-[#EDFEEF] border border-gray-200'
            }`}
          >
            <span className="material-symbols-outlined text-[18px]">airline_seat_recline_extra</span>
            <span>বাসের সিট সিলেকশন ও বুকিং</span>
            {selectedSeats.length > 0 && (
              <span className="w-5 h-5 rounded-full bg-[#EF7F45] text-white text-xs flex items-center justify-center ml-1">
                {selectedSeats.length}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('itinerary')}
            className={`px-5 py-3 rounded-xl text-sm font-bold flex items-center gap-2 transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'itinerary'
                ? 'bg-[#03251A] text-white shadow-md'
                : 'bg-white text-[#414844] hover:bg-[#EDFEEF] border border-gray-200'
            }`}
          >
            <span className="material-symbols-outlined text-[18px]">map</span>
            <span>ভ্রমণ পরিকল্পনা (Itinerary)</span>
          </button>

          <button
            onClick={() => setActiveTab('inclusions')}
            className={`px-5 py-3 rounded-xl text-sm font-bold flex items-center gap-2 transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'inclusions'
                ? 'bg-[#03251A] text-white shadow-md'
                : 'bg-white text-[#414844] hover:bg-[#EDFEEF] border border-gray-200'
            }`}
          >
            <span className="material-symbols-outlined text-[18px]">checklist</span>
            <span>প্যাকেজে অন্তর্ভুক্ত সুবিধা</span>
          </button>

          <button
            onClick={() => setActiveTab('guidelines')}
            className={`px-5 py-3 rounded-xl text-sm font-bold flex items-center gap-2 transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'guidelines'
                ? 'bg-[#03251A] text-white shadow-md'
                : 'bg-white text-[#414844] hover:bg-[#EDFEEF] border border-gray-200'
            }`}
          >
            <span className="material-symbols-outlined text-[18px]">policy</span>
            <span>নিয়মাবলী ও নিরাপত্তা</span>
          </button>
        </div>

        {/* TAB 1: BUS SEAT SELECTION & BOOKING */}
        {activeTab === 'seats' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Col: Interactive Bus Seat Layout */}
            <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-[#CFE3D5] shadow-sm">
              <div className="flex flex-wrap items-center justify-between gap-4 mb-6 pb-4 border-b border-gray-100">
                <div>
                  <h2
                    className="text-xl sm:text-2xl font-bold text-[#03251A]"
                    style={{ fontFamily: '"Tiro Bangla", serif' }}
                  >
                    বাসের আসন নির্বাচন করুন
                  </h2>
                  <p className="text-xs text-[#5C6B60] mt-0.5">
                    {tour.busInfo.busName} • {tour.busInfo.busType}
                  </p>
                </div>
                <div className="text-right">
                  <span className="text-xs font-semibold text-[#166B47] bg-[#EDFEEF] px-3 py-1 rounded-full border border-[#BCEEDB]">
                    ডিপার্চার: {tour.busInfo.departureTime}
                  </span>
                </div>
              </div>

              {/* Group Channel Switcher for Combine Tour */}
              {isCombineTour && partnerGroups.length > 0 && (
                <div className="mb-6 p-4 rounded-2xl bg-amber-50/70 border border-amber-200">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2.5">
                    <div>
                      <span className="text-xs font-bold text-amber-950 uppercase tracking-wider block">
                        গ্রুপভিত্তিক বুকিং কোটা (Group Booking Channel)
                      </span>
                      <p className="text-[11px] text-amber-800/80">
                        যে গ্রুপের জন্য যে সিট বরাদ্দ, কেবল সেই গ্রুপের চ্যানেলে সংশ্লিষ্ট সিট বুক করা যাবে।
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {partnerGroups.map((p, idx) => {
                      const isCurrent = activeGroupIndex === idx;
                      const myQuota = p.allocatedSeats || [];
                      const bookedCount = myQuota.filter((s) => tour.busInfo.bookedSeats.includes(s)).length;
                      const remaining = myQuota.length - bookedCount;

                      return (
                        <button
                          key={p.groupId}
                          type="button"
                          onClick={() => {
                            setActiveGroupIndex(idx);
                            setSelectedSeats([]);
                            setSearchParams({ group: p.groupSlug || p.groupId });
                          }}
                          className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                            isCurrent
                              ? 'bg-[#03251A] text-white shadow-sm ring-2 ring-emerald-500/30'
                              : 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-200'
                          }`}
                        >
                          <span className="w-3 h-3 rounded-full" style={{ backgroundColor: p.color }} />
                          <span>{p.groupName}</span>
                          <span className={`text-[10px] px-2 py-0.5 rounded-full font-semibold ${
                            isCurrent ? 'bg-emerald-800 text-emerald-100' : 'bg-slate-100 text-slate-600'
                          }`}>
                            {remaining}টি সিট উন্মুক্ত
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Seat Legend */}
              <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-5 p-3.5 rounded-2xl bg-[#F7FBF8] border border-[#CFE3D5] mb-6 text-xs font-semibold text-[#414844]">
                <div className="flex items-center gap-1.5">
                  <div className="w-5 h-5 rounded-lg bg-white border-2 border-[#168B5E] shadow-2xs" />
                  <span>আপনার কোটা (খালি)</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-5 h-5 rounded-lg bg-[#EF7F45] text-white flex items-center justify-center text-[10px] font-bold shadow-xs">
                    ✓
                  </div>
                  <span className="text-[#C9622B] font-bold">নির্বাচিত</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-5 h-5 rounded-lg bg-[#E2E8F0] border border-gray-300 flex items-center justify-center text-[9px] text-gray-500">
                    ✕
                  </div>
                  <span className="text-gray-500">বুকড</span>
                </div>
                {isCombineTour && (
                  <div className="flex items-center gap-1.5">
                    <div className="w-5 h-5 rounded-lg bg-slate-100 border-2 border-dashed border-orange-400 flex items-center justify-center text-[8px] text-slate-500 font-bold">
                      কোটা
                    </div>
                    <span className="text-slate-600">পার্টনার কোটা</span>
                  </div>
                )}
                {isCombineTour && (
                  <div className="flex items-center gap-1.5">
                    <span className="text-[12px]">🔄</span>
                    <span className="text-amber-800">রেফার্ড সিট</span>
                  </div>
                )}
                <div className="flex items-center gap-1.5">
                  <div className="w-5 h-5 rounded-lg bg-[#F5E8FF] border-2 border-[#9333EA] text-[#9333EA] flex items-center justify-center text-[10px]">
                    ♀
                  </div>
                  <span className="text-[#7E22CE]">নারী সংরক্ষিত</span>
                </div>
              </div>

              {/* Visual Bus Interior Graphic */}
              <div className="max-w-[420px] mx-auto bg-[#FDFEFE] rounded-3xl p-5 border-4 border-[#03251A]/20 shadow-md relative">
                {/* Front of Bus: Door (Left) & Driver with Steering Wheel (Right) */}
                <div className="flex items-center justify-between pb-3.5 mb-5 border-b-2 border-dashed border-gray-300">
                  {/* Passenger Door (Left Side) */}
                  <div className="flex items-center gap-1.5 bg-amber-50 px-3 py-1.5 rounded-xl border border-amber-200 text-amber-800 shadow-2xs">
                    <span className="material-symbols-outlined text-[18px]">sensor_door</span>
                    <span className="text-xs font-bold">দরজা</span>
                  </div>

                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                    সামনের দিক (Front)
                  </span>

                  {/* Driver Cabin with Steering Wheel Symbol (Right Side) */}
                  <div className="flex items-center gap-2 bg-[#EDFEEF] px-3 py-1.5 rounded-xl border border-[#BCEEDB] text-[#03251A] shadow-2xs" title="ড্রাইভার সিট (ডান পাশ)">
                    <span className="text-xs font-bold text-[#03251A]">ড্রাইভার</span>
                    <svg className="w-5 h-5 text-[#166B47] shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-label="Steering wheel">
                      <circle cx="12" cy="12" r="10" />
                      <circle cx="12" cy="12" r="2.5" />
                      <line x1="12" y1="2" x2="12" y2="9.5" />
                      <line x1="2.5" y1="14" x2="9.8" y2="13" />
                      <line x1="21.5" y1="14" x2="14.2" y2="13" />
                    </svg>
                  </div>
                </div>

                {/* Seats Grid: 10 rows (A to J) */}
                <div className="space-y-3">
                  {rows.map((row) => {
                    const seat1 = `${row}1`;
                    const seat2 = `${row}2`;
                    const seat3 = `${row}3`;
                    const seat4 = `${row}4`;

                    const renderSeatButton = (seatNo) => {
                      const booked = isBooked(seatNo);
                      const locked = isLockedByOther(seatNo);
                      const selected = isSelected(seatNo);
                      const female = isFemale(seatNo);
                      const owner = getSeatOwner(seatNo);
                      const isMine = isMyGroupSeat(seatNo);
                      const transferred = isSeatTransferred(seatNo);

                      let btnStyle = 'bg-white border-2 border-[#168B5E] text-[#111E16] hover:bg-[#EDFEEF] shadow-xs';
                      if (booked) {
                        btnStyle = 'bg-[#E2E8F0] border border-gray-300 text-gray-400 cursor-not-allowed shadow-none';
                      } else if (locked) {
                        btnStyle = 'bg-amber-100 border border-amber-400 text-amber-800 cursor-not-allowed shadow-none';
                      } else if (selected) {
                        btnStyle = 'bg-[#EF7F45] border-2 border-[#D96327] text-white shadow-md scale-105 font-extrabold ring-2 ring-[#EF7F45]/30';
                      } else if (!isMine && isCombineTour) {
                        btnStyle = 'bg-slate-50/90 border-2 border-dashed text-slate-500 hover:bg-slate-100 shadow-2xs opacity-80 hover:opacity-100';
                      } else if (female) {
                        btnStyle = 'bg-[#FAF5FF] border-2 border-[#9333EA] text-[#7E22CE] hover:bg-[#F3E8FF] shadow-xs';
                      }

                      return (
                        <button
                          key={seatNo}
                          type="button"
                          disabled={booked || locked}
                          onClick={() => toggleSeat(seatNo)}
                          className={`w-11 h-11 sm:w-12 sm:h-12 rounded-xl flex flex-col items-center justify-center text-xs font-bold transition-all duration-150 cursor-pointer relative ${btnStyle}`}
                          style={{
                            borderColor: (!isMine && isCombineTour && !booked && !locked) ? owner?.color || '#CBD5E1' : undefined,
                          }}
                          title={`সিট ${seatNo} ${
                            booked
                              ? '(ইতিমধ্যে বুকড)'
                              : locked
                              ? '(অন্য কেউ লক করে রেখেছেন)'
                              : !isMine && isCombineTour
                              ? `(পার্টনার গ্রুপ ${owner?.groupName}-এর কোটায় বরাদ্দকৃত - ক্লিক করে তাদের গ্রুপে সুইচ করুন)`
                              : selected
                              ? '(আপনার নির্বাচিত)'
                              : '(ক্লিক করে সিলেক্ট করুন)'
                          }`}
                        >
                          <span className="text-[12px] leading-none">{seatNo}</span>
                          {selected ? (
                            <span className="text-[10px] leading-none mt-0.5">✓</span>
                          ) : !isMine && isCombineTour && !booked && !locked ? (
                            <span className="text-[7px] leading-none mt-0.5 font-semibold text-slate-500 truncate max-w-[28px]">
                              {owner?.groupName ? owner.groupName.slice(0, 3) : 'কোটা'}
                            </span>
                          ) : female && !booked && !locked ? (
                            <span className="text-[9px] leading-none mt-0.5 text-[#9333EA]">♀</span>
                          ) : locked ? (
                            <span className="text-[8px] leading-none mt-0.5 text-amber-700">লক</span>
                          ) : null}

                          {transferred && isMine && !booked && (
                            <span className="absolute -top-1 -right-1 text-[9px] leading-none" title="রেফার্ড সিট">
                              🔄
                            </span>
                          )}
                        </button>
                      );
                    };

                    return (
                      <div key={row} className="flex items-center justify-between gap-2">
                        {/* Left Side: 2 Seats */}
                        <div className="flex items-center gap-2">
                          {renderSeatButton(seat1)}
                          {renderSeatButton(seat2)}
                        </div>

                        {/* Center Gangway / Aisle (Clean spacing, text removed) */}
                        <div className="w-6 sm:w-8 shrink-0" aria-hidden="true" />

                        {/* Right Side: 2 Seats */}
                        <div className="flex items-center gap-2">
                          {renderSeatButton(seat3)}
                          {renderSeatButton(seat4)}
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Back of bus indicator */}
                <div className="mt-6 pt-3 border-t-2 border-dashed border-gray-300 text-center">
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                    পেছনের দিক (Rear)
                  </span>
                </div>
              </div>
            </div>

            {/* Right Col: Booking Form & Fare Summary */}
            <div className="lg:col-span-5 flex flex-col gap-6">
              {/* Selected Seats Summary Box */}
              <div className="bg-white rounded-3xl p-6 border border-[#CFE3D5] shadow-sm">
                <h3
                  className="text-lg font-bold text-[#03251A] mb-4 flex items-center justify-between"
                  style={{ fontFamily: '"Tiro Bangla", serif' }}
                >
                  <span>নির্বাচিত সিট বিবরণ</span>
                  <span className="text-xs font-normal px-2.5 py-1 rounded-full bg-[#EDFEEF] text-[#166B47]">
                    {selectedSeats.length > 0 ? `${selectedSeats.length}টি সিট নির্বাচিত` : 'সিট নির্বাচন করুন'}
                  </span>
                </h3>

                {selectedSeats.length > 0 ? (
                  <div className="flex flex-wrap gap-2 mb-4">
                    {selectedSeats.map((seat) => (
                      <span
                        key={seat}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#EF7F45] text-white text-sm font-bold shadow-xs animate-fadeIn"
                      >
                        <span>সিট {seat}</span>
                        <button
                          type="button"
                          onClick={() => toggleSeat(seat)}
                          className="hover:bg-white/20 rounded-full w-4 h-4 flex items-center justify-center text-xs cursor-pointer"
                        >
                          ✕
                        </button>
                      </span>
                    ))}
                  </div>
                ) : (
                  <div className="p-4 rounded-2xl bg-[#F7FBF8] border border-dashed border-gray-300 text-center mb-4">
                    <span className="material-symbols-outlined text-3xl text-gray-400 mb-1 block">
                      event_seat
                    </span>
                    <p className="text-xs text-[#5C6B60]">
                      বাম পাশের বাসের লেআউট থেকে আপনার পছন্দের সিটে ক্লিক করে নির্বাচন করুন।
                    </p>
                  </div>
                )}

                {/* Price Breakdown */}
                <div className="space-y-2.5 py-3 border-t border-b border-gray-100 text-sm">
                  <div className="flex justify-between text-[#5C6B60]">
                    <span>প্যাকেজ ভাড়া (প্রতি সিট)</span>
                    <span className="font-semibold text-[#111E16]">৳{tour.price.toLocaleString('bn-BD')}</span>
                  </div>
                  <div className="flex justify-between text-[#5C6B60]">
                    <span>নির্বাচিত সিটের সংখ্যা</span>
                    <span className="font-semibold text-[#111E16]">{selectedSeats.length} টি</span>
                  </div>
                  <div className="flex justify-between text-[#5C6B60]">
                    <span>প্ল্যাটফর্ম ফি ও সার্ভিস চার্জ</span>
                    <span className="font-semibold text-[#166B47]">ফ্রি (৳০)</span>
                  </div>
                </div>

                <div className="flex justify-between items-center pt-4">
                  <span className="text-base font-bold text-[#03251A]">সর্বমোট প্রদেয়</span>
                  <span
                    className="text-2xl font-extrabold text-[#166B47]"
                    style={{ fontFamily: '"Tiro Bangla", serif' }}
                  >
                    ৳{totalPrice.toLocaleString('bn-BD')}
                  </span>
                </div>
              </div>

              {/* Traveler Information Form */}
              <form
                onSubmit={handleBookingSubmit}
                className="bg-white rounded-3xl p-6 border border-[#CFE3D5] shadow-sm space-y-4"
              >
                <h3
                  className="text-lg font-bold text-[#03251A] border-b border-gray-100 pb-3"
                  style={{ fontFamily: '"Tiro Bangla", serif' }}
                >
                  যাত্রীর তথ্য ও বোর্ডিং point
                </h3>

                {/* Full Name */}
                <div>
                  <label className="block text-xs font-bold text-[#414844] mb-1.5">
                    প্রধান যাত্রীর পুরো নাম *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="যেমন: তানভীর আহমেদ"
                    value={passengerName}
                    onChange={(e) => setPassengerName(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#166B47] text-sm bg-[#FDFEFE]"
                  />
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-xs font-bold text-[#414844] mb-1.5">
                    মোবাইল নম্বর (এসএমএস ও টিকিটের জন্য) *
                  </label>
                  <div className="relative">
                    <input
                      type="tel"
                      required
                      placeholder="০১৭১XXXXXXXX"
                      value={passengerPhone}
                      onChange={(e) => setPassengerPhone(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#166B47] text-sm bg-[#FDFEFE]"
                    />
                    <span className="material-symbols-outlined absolute right-3 top-2.5 text-[20px] text-gray-400">
                      call
                    </span>
                  </div>
                </div>

                {/* Gender */}
                <div>
                  <label className="block text-xs font-bold text-[#414844] mb-1.5">
                    যাত্রীর ধরন
                  </label>
                  <div className="flex gap-4">
                    <label className="flex items-center gap-2 text-sm cursor-pointer">
                      <input
                        type="radio"
                        name="gender"
                        checked={passengerGender === 'male'}
                        onChange={() => setPassengerGender('male')}
                        className="text-[#166B47] focus:ring-[#166B47]"
                      />
                      <span>পুরুষ</span>
                    </label>
                    <label className="flex items-center gap-2 text-sm cursor-pointer">
                      <input
                        type="radio"
                        name="gender"
                        checked={passengerGender === 'female'}
                        onChange={() => setPassengerGender('female')}
                        className="text-[#166B47] focus:ring-[#166B47]"
                      />
                      <span>মহিলা</span>
                    </label>
                  </div>
                </div>

                {/* Boarding Point Dropdown */}
                <div>
                  <label className="block text-xs font-bold text-[#414844] mb-1.5">
                    বাস বোর্ডিং পয়েন্ট নির্বাচন করুন *
                  </label>
                  <div className="relative">
                    <select
                      value={selectedBoarding}
                      onChange={(e) => setSelectedBoarding(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#166B47] text-sm bg-[#FDFEFE] appearance-none pr-8 cursor-pointer"
                    >
                      {boardingOptions.map((opt) => (
                        <option key={opt} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>
                    <span className="material-symbols-outlined absolute right-2.5 top-2.5 text-[20px] text-gray-500 pointer-events-none">
                      expand_more
                    </span>
                  </div>
                </div>

                {/* Submit Booking Button */}
                <button
                  type="submit"
                  disabled={selectedSeats.length === 0}
                  className={`w-full py-3.5 px-6 rounded-2xl text-base font-bold text-white shadow-lg transition-all duration-200 cursor-pointer flex items-center justify-center gap-2 mt-4 ${
                    selectedSeats.length > 0
                      ? 'bg-[#168B5E] hover:bg-[#03251A] hover:scale-101'
                      : 'bg-gray-300 cursor-not-allowed shadow-none'
                  }`}
                  style={{ fontFamily: '"Tiro Bangla", serif' }}
                >
                  <span className="material-symbols-outlined text-[20px]">check_circle</span>
                  <span>
                    {selectedSeats.length > 0
                      ? `বুকিং নিশ্চিত করুন (৳${totalPrice.toLocaleString('bn-BD')})`
                      : 'প্রথমে বাসের সিট সিলেক্ট করুন'}
                  </span>
                </button>

                <p className="text-[11px] text-center text-[#5C6B60] mt-2 flex items-center justify-center gap-1">
                  <span className="material-symbols-outlined text-[14px] text-[#168B5E]">shield</span>
                  <span>১০০% নিরাপদ ট্রিপ • ভেরিফায়েড ট্যুর অপারেটর গ্যারান্টি</span>
                </p>
              </form>
            </div>
          </div>
        )}

        {/* TAB 2: ITINERARY */}
        {activeTab === 'itinerary' && (
          <div className="bg-white rounded-3xl p-6 sm:p-10 border border-[#CFE3D5] shadow-sm">
            <h2
              className="text-2xl font-bold text-[#03251A] mb-8 flex items-center gap-2"
              style={{ fontFamily: '"Tiro Bangla", serif' }}
            >
              <span className="material-symbols-outlined text-[26px] text-[#166B47]">calendar_today</span>
              <span>দিনভিত্তিক পূর্ণাঙ্গ ভ্রমণ পরিকল্পনা (Itinerary)</span>
            </h2>

            <div className="space-y-8 relative before:absolute before:left-4 sm:before:left-6 before:top-4 before:bottom-4 before:w-0.5 before:bg-[#7FE5BA]/50">
              {tour.itinerary.map((dayPlan) => (
                <div key={dayPlan.day} className="relative pl-12 sm:pl-16">
                  {/* Day Badge Marker */}
                  <div className="absolute left-0 top-0 w-8 h-8 sm:w-12 sm:h-12 rounded-2xl bg-[#03251A] text-white flex flex-col items-center justify-center shadow-md border-2 border-[#7FE5BA]">
                    <span className="text-[9px] sm:text-[10px] uppercase font-bold text-[#7FE5BA]">দিন</span>
                    <span className="text-sm sm:text-base font-extrabold leading-none">{dayPlan.day}</span>
                  </div>

                  <div className="bg-[#F7FBF8] rounded-2xl p-6 border border-[#CFE3D5]">
                    <h3
                      className="text-lg sm:text-xl font-bold text-[#03251A] mb-3"
                      style={{ fontFamily: '"Tiro Bangla", serif' }}
                    >
                      {dayPlan.title}
                    </h3>

                    <ul className="space-y-2 mb-4">
                      {dayPlan.activities.map((act, i) => (
                        <li key={i} className="flex items-start gap-2.5 text-sm text-[#414844]">
                          <span className="material-symbols-outlined text-[18px] text-[#166B47] shrink-0 mt-0.5">
                            check_circle
                          </span>
                          <span>{act}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="flex flex-wrap gap-4 pt-3 border-t border-gray-200 text-xs text-[#5C6B60]">
                      <div className="flex items-center gap-1.5">
                        <span className="material-symbols-outlined text-[16px] text-[#C9622B]">restaurant</span>
                        <span>খাবার: <strong>{dayPlan.meals}</strong></span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span className="material-symbols-outlined text-[16px] text-[#166B47]">bed</span>
                        <span>অবস্থান: <strong>{dayPlan.stay}</strong></span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: INCLUSIONS & EXCLUSIONS */}
        {activeTab === 'inclusions' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Inclusions */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#CFE3D5] shadow-sm">
              <div className="flex items-center gap-2 mb-6 text-[#166B47]">
                <span className="material-symbols-outlined text-2xl">check_circle</span>
                <h3
                  className="text-xl font-bold"
                  style={{ fontFamily: '"Tiro Bangla", serif' }}
                >
                  প্যাকেজে যা যা অন্তর্ভুক্ত
                </h3>
              </div>
              <ul className="space-y-3">
                {tour.inclusions.map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-[#111E16]">
                    <span className="material-symbols-outlined text-[18px] text-[#168B5E] shrink-0 mt-0.5">
                      done_all
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Exclusions */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#CFE3D5] shadow-sm">
              <div className="flex items-center gap-2 mb-6 text-[#BA1A1A]">
                <span className="material-symbols-outlined text-2xl">cancel</span>
                <h3
                  className="text-xl font-bold"
                  style={{ fontFamily: '"Tiro Bangla", serif' }}
                >
                  প্যাকেজে যা অন্তর্ভুক্ত নয়
                </h3>
              </div>
              <ul className="space-y-3">
                {tour.exclusions.map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-[#5C6B60]">
                    <span className="material-symbols-outlined text-[18px] text-[#BA1A1A] shrink-0 mt-0.5">
                      close
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {/* TAB 4: GUIDELINES & SAFETY */}
        {activeTab === 'guidelines' && (
          <div className="bg-white rounded-3xl p-6 sm:p-10 border border-[#CFE3D5] shadow-sm space-y-6">
            <h2
              className="text-2xl font-bold text-[#03251A] flex items-center gap-2"
              style={{ fontFamily: '"Tiro Bangla", serif' }}
            >
              <span className="material-symbols-outlined text-[26px] text-[#166B47]">security</span>
              <span>ভ্রমণ নির্দেশিকা ও নীতিমালা</span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-5 rounded-2xl bg-[#EDFEEF] border border-[#BCEEDB]">
                <h4 className="font-bold text-[#03251A] mb-2 text-base flex items-center gap-2">
                  <span className="material-symbols-outlined text-[20px] text-[#166B47]">verified_user</span>
                  <span>জরুরি নির্দেশনাবলী</span>
                </h4>
                <ul className="space-y-2 text-sm text-[#414844]">
                  {tour.guidelines.map((guide, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-[#166B47]">•</span>
                      <span>{guide}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-5 rounded-2xl bg-amber-50 border border-amber-200">
                <h4 className="font-bold text-amber-900 mb-2 text-base flex items-center gap-2">
                  <span className="material-symbols-outlined text-[20px] text-amber-700">info</span>
                  <span>বাতিল ও রিফান্ড পলিসি</span>
                </h4>
                <ul className="space-y-2 text-sm text-amber-900">
                  <li className="flex items-start gap-2">
                    <span>•</span>
                    <span>ট্যুর শুরুর ৭ দিন পূর্বে বাতিল করলে ৯০% রিফান্ড যোগ্য।</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span>•</span>
                    <span>ট্যুর শুরুর ৩ দিন পূর্বে বাতিল করলে ৫০% রিফান্ড যোগ্য।</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span>•</span>
                    <span>২৪ ঘণ্টার মধ্যে বাতিল করলে কোনো প্রকার রিফান্ড কার্যকর হবে না।</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* BOOKING CONFIRMATION MODAL */}
      {showConfirmation && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-gray-200 relative max-h-[90vh] overflow-y-auto">
            {/* Header / Success */}
            <div className="text-center mb-6">
              <div className="w-16 h-16 rounded-full bg-[#EDFEEF] border-2 border-[#168B5E] text-[#168B5E] flex items-center justify-center mx-auto mb-3 shadow-md">
                <span className="material-symbols-outlined text-4xl">check_circle</span>
              </div>
              <h2
                className="text-2xl font-bold text-[#03251A]"
                style={{ fontFamily: '"Tiro Bangla", serif' }}
              >
                বুকিং সফলভাবে সম্পন্ন হয়েছে!
              </h2>
              <p className="text-xs text-[#5C6B60] mt-1">
                আপনার সিট সফলভাবে সংরক্ষিত করা হয়েছে। বিস্তারিত নিচে দেওয়া হলো।
              </p>
            </div>

            {/* Ticket Preview Card */}
            <div className="bg-[#F7FBF8] rounded-2xl p-5 border border-[#CFE3D5] space-y-3 mb-6">
              <div className="flex justify-between items-center pb-3 border-b border-dashed border-gray-300">
                <div>
                  <span className="text-[10px] text-gray-500 uppercase tracking-wider block">বুকিং আইডি</span>
                  <span className="text-sm font-extrabold text-[#03251A]">{bookingId}</span>
                </div>
                <div className="text-right">
                  <span className="text-[10px] text-gray-500 uppercase tracking-wider block">বুকিং কাউন্টার / অপারেটর</span>
                  <span className="text-sm font-bold text-[#166B47]">{activeGroup ? activeGroup.groupName : tour.operator}</span>
                </div>
              </div>

              <div>
                <span className="text-[10px] text-gray-500 uppercase tracking-wider block">ট্যুর প্যাকেজ</span>
                <span className="text-sm font-bold text-[#111E16]">{tour.title}</span>
              </div>

              <div className="grid grid-cols-2 gap-2 pt-2 border-t border-gray-200 text-xs">
                <div>
                  <span className="text-gray-500 block">যাত্রীর নাম</span>
                  <span className="font-semibold text-[#111E16]">{passengerName}</span>
                </div>
                <div>
                  <span className="text-gray-500 block">মোবাইল নম্বর</span>
                  <span className="font-semibold text-[#111E16]">{passengerPhone}</span>
                </div>
                <div>
                  <span className="text-gray-500 block">নির্বাচিত আসন (সিট)</span>
                  <span className="font-bold text-[#EF7F45] text-sm">
                    {selectedSeats.join(', ')} ({selectedSeats.length}টি)
                  </span>
                </div>
                <div>
                  <span className="text-gray-500 block">যাত্রা শুরুর সময়</span>
                  <span className="font-semibold text-[#03251A]">{tour.busInfo.departureTime}</span>
                </div>
              </div>

              <div className="pt-2 border-t border-gray-200 text-xs">
                <span className="text-gray-500 block">বোর্ডিং পয়েন্ট</span>
                <span className="font-semibold text-[#111E16]">{selectedBoarding}</span>
              </div>

              <div className="pt-3 border-t border-dashed border-gray-300 flex justify-between items-center">
                <span className="text-xs font-bold text-gray-700">মোট পরিশোধযোগ্য</span>
                <span
                  className="text-xl font-extrabold text-[#166B47]"
                  style={{ fontFamily: '"Tiro Bangla", serif' }}
                >
                  ৳{totalPrice.toLocaleString('bn-BD')}
                </span>
              </div>
            </div>

            {/* Payment Method Selector */}
            <div className="mb-6">
              <label className="block text-xs font-bold text-[#414844] mb-2">
                পেমেন্ট পদ্ধতি নির্বাচন করুন
              </label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('bkash')}
                  className={`py-2.5 px-3 rounded-xl border text-xs font-bold transition-all cursor-pointer flex flex-col items-center gap-1 ${
                    paymentMethod === 'bkash'
                      ? 'border-[#E2136E] bg-[#FCE8F3] text-[#E2136E] ring-2 ring-[#E2136E]/30'
                      : 'border-gray-200 bg-white text-gray-600'
                  }`}
                >
                  <span>বিকাশ (bKash)</span>
                </button>
                <button
                  type="button"
                  onClick={() => setPaymentMethod('nagad')}
                  className={`py-2.5 px-3 rounded-xl border text-xs font-bold transition-all cursor-pointer flex flex-col items-center gap-1 ${
                    paymentMethod === 'nagad'
                      ? 'border-[#F7941D] bg-[#FEF4E8] text-[#D87405] ring-2 ring-[#F7941D]/30'
                      : 'border-gray-200 bg-white text-gray-600'
                  }`}
                >
                  <span>নগদ (Nagad)</span>
                </button>
                <button
                  type="button"
                  onClick={() => setPaymentMethod('cash')}
                  className={`py-2.5 px-3 rounded-xl border text-xs font-bold transition-all cursor-pointer flex flex-col items-center gap-1 ${
                    paymentMethod === 'cash'
                      ? 'border-[#168B5E] bg-[#EDFEEF] text-[#168B5E] ring-2 ring-[#168B5E]/30'
                      : 'border-gray-200 bg-white text-gray-600'
                  }`}
                >
                  <span>ক্যাশ / কাউন্টারে</span>
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-2.5">
              <button
                type="button"
                onClick={() => {
                  alert(`ধন্যবাদ! ${passengerPhone} নম্বরে টিকিটের এসএমএস কনফার্মেশন ও ডিজিটাল ইনভয়েস লিংক পাঠানো হয়েছে।`);
                  setShowConfirmation(false);
                  onNavigateHome();
                }}
                className="w-full py-3 rounded-xl bg-[#03251A] hover:bg-[#1B3B2F] text-white text-sm font-bold shadow-md transition-colors cursor-pointer"
                style={{ fontFamily: '"Tiro Bangla", serif' }}
              >
                টিকিট সংরক্ষণ ও হোমপেজে ফিরুন
              </button>

              <button
                type="button"
                onClick={() => setShowConfirmation(false)}
                className="w-full py-2.5 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-semibold transition-colors cursor-pointer"
              >
                বন্ধ করুন
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
