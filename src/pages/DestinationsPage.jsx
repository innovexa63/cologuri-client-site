import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

const destinationsData = [
  {
    id: 'sajek',
    name: 'সাজেক ভ্যালি — মেঘের রাজ্য',
    division: 'চট্টগ্রাম',
    district: 'রাঙামাটি',
    upazila: 'বাঘাইছড়ি',
    category: 'পাহাড় ও মেঘ',
    altitude: '১,৮০০ ফুট',
    bestSeason: 'অক্টোবর — মার্চ',
    rating: 4.9,
    reviews: 850,
    activeTours: 8,
    avgCost: '৳৪,৮০০',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80',
    description: 'রুইলুই পাড়া ও কংলাক পাহাড় থেকে ভাসমান মেঘমালার অপূর্ব দৃশ্য। রাতে পাহাড়ি কাঠের কটেজে বসে আকাশের কোটি তারার মেলা দেখার এক স্বর্গীয় অনুভূতি।',
    highlights: ['কংলাক পাহাড় সামিট', 'রুইলুই পাড়া', 'সানসেট হেলিপ্যাড', 'ব্যাম্বু চিকেন'],
  },
  {
    id: 'coxsbazar',
    name: 'কক্সবাজার সমুদ্র সৈকত ও হিমছড়ি',
    division: 'চট্টগ্রাম',
    district: 'কক্সবাজার',
    upazila: 'কক্সবাজার সদর',
    category: 'সমুদ্র সৈকত',
    altitude: 'সমুদ্রপৃষ্ঠ',
    bestSeason: 'নভেম্বর — এপ্রিল',
    rating: 4.8,
    reviews: 1420,
    activeTours: 12,
    avgCost: '৳৪,২০০',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80',
    description: 'পৃথিবীর দীর্ঘতম ১২০ কিলোমিটারের প্রাকৃতিক বালুকাময় সমুদ্র সৈকত। খোলা জিপে মেরিন ড্রাইভ রোড ধরে রোমাঞ্চকর রাইড এবং হিমছড়ি পাহাড়ের সবুজ রূপ।',
    highlights: ['লাবণী বিচ সানসেট', 'হিমছড়ি ঝর্ণা ও পাহাড়', 'সি-ফুড ডাইনিং', 'বার্মিজ মার্কেট'],
  },
  {
    id: 'inani',
    name: 'ইনানী কোরাল বিচ ও মেরিন ড্রাইভ',
    division: 'চট্টগ্রাম',
    district: 'কক্সবাজার',
    upazila: 'উখিয়া',
    category: 'সমুদ্র সৈকত',
    altitude: 'সমুদ্রপৃষ্ঠ',
    bestSeason: 'নভেম্বর — এপ্রিল',
    rating: 4.8,
    reviews: 790,
    activeTours: 9,
    avgCost: '৳৪,৫০০',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80',
    description: 'প্রবাল পাথরে ঘেরা শান্ত ও নীল জলরাশির সৈকত। পাথরের ওপর আছড়ে পড়া ঢেউ আর সূর্যাস্তের অসাধারণ রঙে মন জুড়িয়ে যায়।',
    highlights: ['প্রবাল পাথরের খাঁজ', 'খোলা জিপে মেরিন ড্রাইভ', 'পাটুয়ারটেক পাথুরে সৈকত'],
  },
  {
    id: 'saintmartin',
    name: 'সেন্টমার্টিন ও ছেঁড়াদ্বীপ প্রবাল দ্বীপ',
    division: 'চট্টগ্রাম',
    district: 'কক্সবাজার',
    upazila: 'টেকনাফ',
    category: 'সমুদ্র সৈকত',
    altitude: 'প্রবাল দ্বীপ',
    bestSeason: 'নভেম্বর — ফেব্রুয়ারি',
    rating: 4.9,
    reviews: 1200,
    activeTours: 6,
    avgCost: '৳৭,২০০',
    image: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=800&q=80',
    description: 'বাংলাদেশের একমাত্র প্রবাল দ্বীপ। স্বচ্ছ নীলাভ সমুদ্র, নারিকেল কুঞ্জ, জোয়ার-ভাটায় জেগে ওঠা ছেঁড়াদ্বীপ আর জাহাজে গাঙচিলের ওড়াউড়ি।',
    highlights: ['ছেঁড়াদ্বীপ কোরাল রিফ', 'জাহাজে গাঙচিল দর্শন', 'তাজা ডাবের পানি ও মাছ ফ্রাই', 'বিচ সাইক্লিং'],
  },
  {
    id: 'keokradong',
    name: 'কেওক্রাডং সামিট ও বগালেক',
    division: 'চট্টগ্রাম',
    district: 'বান্দরবান',
    upazila: 'রুমা',
    category: 'পাহাড় ও মেঘ',
    altitude: '৩,১৭২ ফুট',
    bestSeason: 'অক্টোবর — মার্চ',
    rating: 4.9,
    reviews: 740,
    activeTours: 9,
    avgCost: '৳৫,৪০০',
    image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&q=80',
    description: 'পাহাড় ও রোমাঞ্চপ্রিয়দের সেরা পছন্দ। রহস্যময় নীল জলরাশির বগালেক, পাহাড়ি আদিবাসী পাড়া এবং কেওক্রাডং চূড়া জয়ের দুর্লভ আনন্দ।',
    highlights: ['কেওক্রাডং সামিট', 'রহস্যময় বগালেক', 'দার্জিলিং পাড়া', 'বোম আদিবাসী খাবার'],
  },
  {
    id: 'nilgiri',
    name: 'নীলগিরি রিসোর্ট ও নীলাচল',
    division: 'চট্টগ্রাম',
    district: 'বান্দরবান',
    upazila: 'বান্দরবান সদর',
    category: 'পাহাড় ও মেঘ',
    altitude: '২,২০০ ফুট',
    bestSeason: 'সারা বছর',
    rating: 4.8,
    reviews: 910,
    activeTours: 7,
    avgCost: '৳৪,৮০০',
    image: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=800&q=80',
    description: 'পাহাড়ের শীর্ষের মেঘের স্পর্শ। মেঘলার ঝুলন্ত সেতু, স্বর্ণ মন্দির এবং নীলাচল থেকে পুরো বান্দরবানের সবুজ ল্যান্ডস্কেপ দেখার অভিজ্ঞতা।',
    highlights: ['নীলগিরি ক্লাউড পয়েন্ট', 'নীলাচল সানসেট', 'স্বর্ণ মন্দির', 'মেঘলা লেক'],
  },
  {
    id: 'tanguar',
    name: 'টাঙ্গুয়ার হাওর ও নীলাদ্রি লেক',
    division: 'সিলেট',
    district: 'সুনামগঞ্জ',
    upazila: 'তাহিরপুর',
    category: 'হাওর ও জলপ্রপাত',
    altitude: 'রামসার জলাভূমি',
    bestSeason: 'জুলাই — সেপ্টেম্বর ও শীত',
    rating: 4.8,
    reviews: 510,
    activeTours: 5,
    avgCost: '৳৬,৮০০',
    image: 'https://images.unsplash.com/photo-1501854140801-50d01698950b?w=800&q=80',
    description: 'মেঘালয় পাহাড়ের পাদদেশে বিশাল জলরাশি। ঐতিহ্যবাহী কাঠের হাউসবোটে রাতযাপন, পরিষ্কার নীল পানির নীলাদ্রি লেক এবং বাউল গানের আসর।',
    highlights: ['লাক্সারি হাউসবোট স্টে', 'নীলাদ্রি লেক (শহীদ সিরাজ লেক)', 'ওয়াচ টাওয়ার পাখি দর্শন'],
  },
  {
    id: 'jadukata',
    name: 'যাদুকাটা নদী ও শিমুল বাগান',
    division: 'সিলেট',
    district: 'সুনামগঞ্জ',
    upazila: 'তাহিরপুর',
    category: 'হাওর ও জলপ্রপাত',
    altitude: 'পাহাড় ও নদী',
    bestSeason: 'ফেব্রুয়ারি — মার্চ ও বর্ষা',
    rating: 4.8,
    reviews: 440,
    activeTours: 4,
    avgCost: '৳৫,২০০',
    image: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=800&q=80',
    description: 'বসন্তে রক্তিম লাল শিমুল ফুলের মেলা আর ভারতের মেঘালয় পাহাড়ের বুক চিড়ে বয়ে আসা স্বচ্ছ বালিময় যাদুকাটা নদীর অপরূপ দৃশ্য।',
    highlights: ['জৈনাল আবেদীন শিমুল বাগান', 'যাদুকাটা নদীর স্বচ্ছ পানি', 'বারেকের টিলা ভিউপয়েন্ট'],
  },
  {
    id: 'sreemangal',
    name: 'শ্রীমঙ্গল চা-বাগান ও লাউয়াছড়া',
    division: 'সিলেট',
    district: 'মৌলভীবাজার',
    upazila: 'শ্রীমঙ্গল',
    category: 'চা-বাগান',
    altitude: 'সবুজ উপত্যকা',
    bestSeason: 'সারা বছর উপযুক্ত',
    rating: 4.7,
    reviews: 480,
    activeTours: 7,
    avgCost: '৳৩,৬০০',
    image: 'https://images.unsplash.com/photo-1587595431973-160d0d94add1?w=800&q=80',
    description: 'দুটি পাতা একটি কুঁড়ির সবুজ শ্যামলিমায় ঘেরা চায়ের রাজধানী। লাউয়াছড়া জাতীয় উদ্যানের ছায়াঘন ট্রেইল, বিরল উল্লুক ও নীলকণ্ঠের ৭ রঙের চা।',
    highlights: ['ফিনলে চা-বাগান', 'লাউয়াছড়া রেইনফরেস্ট', 'নীলকণ্ঠ ৭ রঙের চা', 'মাধবপুর লেক'],
  },
  {
    id: 'madhabkunda',
    name: 'মাধবকুণ্ড জলপ্রপাত ও ইকোপার্ক',
    division: 'সিলেট',
    district: 'মৌলভীবাজার',
    upazila: 'বড়লেখা',
    category: 'হাওর ও জলপ্রপাত',
    altitude: '২০০ ফুট ঝর্ণা',
    bestSeason: 'বর্ষা ও শরৎ',
    rating: 4.6,
    reviews: 390,
    activeTours: 4,
    avgCost: '৳৩,৮০০',
    image: 'https://images.unsplash.com/photo-1510312305653-8ed496efae75?w=800&q=80',
    description: 'বাংলাদেশের অন্যতম বৃহৎ প্রাকৃতিক জলপ্রপাত। প্রায় ২০০ ফুট উঁচু পাহাড় থেকে অবিরাম ধারায় ঝরে পড়া জলপ্রপাতের গর্জন ও চা বাগানের নিবিড় পরিবেশ।',
    highlights: ['মাধবকুণ্ড ঝর্ণা', 'পাহাড়ি ইকোপার্ক ট্রেইল', 'হাকালুকি হাওর সাইটসিয়িং'],
  },
  {
    id: 'ratargul',
    name: 'রাতারগুল সোয়াম্প ফরেস্ট ও বিছনাকান্দি',
    division: 'সিলেট',
    district: 'সিলেট',
    upazila: 'গোয়াইনঘাট',
    category: 'ম্যানগ্রোভ ও বন',
    altitude: 'মিঠাপানির জলাবন',
    bestSeason: 'জুলাই — অক্টোবর',
    rating: 4.8,
    reviews: 670,
    activeTours: 6,
    avgCost: '৳৪,৫০০',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80',
    description: 'বাংলার আমাজন খ্যাত মিঠাপানির জলাবন রাতারগুল। ডিঙি নৌকায় গাছের ডালপালার নিচ দিয়ে ঘুরে বেড়ানো এবং বিছনাকান্দির পাথুরে পাহাড়ি জলপ্রপাত।',
    highlights: ['রাতারগুল জলাবনে নৌকা ভ্রমণ', 'বিছনাকান্দি পাথুরে নদী', 'পান্তুমাই ঝর্ণা ভিউ'],
  },
  {
    id: 'sundarban-east',
    name: 'সুন্দরবন ম্যানগ্রোভ, কটকা ও জামতলা',
    division: 'খুলনা',
    district: 'বাগেরহাট',
    upazila: 'মোংলা ও শরণখোলা',
    category: 'ম্যানগ্রোভ ও বন',
    altitude: 'জোয়ার-ভাটার বন',
    bestSeason: 'নভেম্বর — ফেব্রুয়ারি',
    rating: 4.9,
    reviews: 620,
    activeTours: 6,
    avgCost: '৳৮,৯০০',
    image: 'https://images.unsplash.com/photo-1547036967-23d11aacaee0?w=800&q=80',
    description: 'UNESCO বিশ্ব ঐতিহ্য এবং পৃথিবীর বৃহত্তম ম্যানগ্রোভ বন। হরিণ, কুমির, ডলফিন এবং রয়েল বেঙ্গল টাইগারের বিশ্বখ্যাত প্রাকৃতিক আবাসস্থল।',
    highlights: ['কটকা জামতলা সি-বিচ', 'হিরণ পয়েন্ট ওয়াচটাওয়ার', 'সশস্ত্র বনরক্ষী ট্রেইল', 'ক্যানাল ক্রুজিং'],
  },
  {
    id: 'sundarban-west',
    name: 'সুন্দরবন কলাগাছিয়া ও শ্যামনগর ইকো ট্যুর',
    division: 'খুলনা',
    district: 'সাতক্ষীরা',
    upazila: 'শ্যামনগর',
    category: 'ম্যানগ্রোভ ও বন',
    altitude: 'ম্যানগ্রোভ ইকো-জোন',
    bestSeason: 'নভেম্বর — মার্চ',
    rating: 4.7,
    reviews: 350,
    activeTours: 4,
    avgCost: '৳৫,৫০০',
    image: 'https://images.unsplash.com/photo-1624811532702-fc35e8f9b9ff?w=800&q=80',
    description: 'পশ্চিম সুন্দরবনের কলাগাছিয়া ইকো-ট্যুরিজম কেন্দ্র। বানর, হরিণ ও ওয়াচ টাওয়ার থেকে বনের সবুজ চাদর দেখার সুযোগ।',
    highlights: ['কলাগাছিয়া ট্রেইল', 'ম্যানগ্রোভ ফরেস্ট ওয়াক', 'মধুর চাকা পরিদর্শন'],
  },
  {
    id: 'kuakata',
    name: 'কুয়াকাটা সূর্যোদয়-সূর্যাস্ত সৈকত ও লেম্বুর চর',
    division: 'বরিশাল',
    district: 'পটুয়াখালী',
    upazila: 'কলাপাড়া',
    category: 'সমুদ্র সৈকত',
    altitude: 'সমুদ্র সৈকত',
    bestSeason: 'নভেম্বর — মার্চ',
    rating: 4.7,
    reviews: 430,
    activeTours: 4,
    avgCost: '৳৪,৫০০',
    image: 'https://images.unsplash.com/photo-1510312305653-8ed496efae75?w=800&q=80',
    description: 'একই সৈকতে দাঁড়িয়ে সূর্যোদয় ও সূর্যাস্ত দেখার দুর্লভ প্রাকৃতিক লীলাভূমি। লেম্বুর চরের ম্যানগ্রোভ বন, শুঁটকি পল্লী ও রাখাইন মহিলা মার্কেট।',
    highlights: ['সূর্যোদয় ও সূর্যাস্ত ভিউ', 'লেম্বুর চর বন', 'রাখাইন পল্লী ও প্রাচীন কুয়া', 'ঝাউবন'],
  },
  {
    id: 'nikli',
    name: 'নিকলী হাওর ও অল-ওয়েদার সড়ক',
    division: 'ঢাকা',
    district: 'কিশোরগঞ্জ',
    upazila: 'নিকলী',
    category: 'হাওর ও জলপ্রপাত',
    altitude: 'হাওর অঞ্চল',
    bestSeason: 'জুলাই — অক্টোবর',
    rating: 4.7,
    reviews: 580,
    activeTours: 5,
    avgCost: '৳২,২০০',
    image: 'https://images.unsplash.com/photo-1501854140801-50d01698950b?w=800&q=80',
    description: 'বর্ষায় চারদিকে অথৈ জলরাশি আর মাঝখান দিয়ে চলে যাওয়া সোজা অল-ওয়েদার সড়ক। কাঠের নৌকায় চড়ে হাওরের বুকে সূর্যাস্ত দেখার মনোরম ট্রিপ।',
    highlights: ['নিকলী হাওরে নৌকা ভ্রমণ', 'অল-ওয়েদার সড়ক রাইড', 'মিঠামইন-ইটনা ভিউ', 'তাজা হাওরের মাছ'],
  },
];

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
    const list = [...new Set(destinationsData.map((d) => d.division))];
    return list;
  }, []);

  // Extract unique Districts based on selected Division
  const availableDistricts = useMemo(() => {
    const filtered =
      selectedDivision === 'all'
        ? destinationsData
        : destinationsData.filter((d) => d.division === selectedDivision);
    return [...new Set(filtered.map((d) => d.district))];
  }, [selectedDivision]);

  // Extract unique Upazilas based on selected District
  const availableUpazilas = useMemo(() => {
    const filtered = destinationsData.filter((d) => {
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
    return destinationsData.filter((d) => {
      const matchDiv = selectedDivision === 'all' || d.division === selectedDivision;
      const matchDist = selectedDistrict === 'all' || d.district === selectedDistrict;
      const matchUp = selectedUpazila === 'all' || d.upazila === selectedUpazila;
      const matchSearch =
        searchQuery.trim() === '' ||
        d.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        d.division.toLowerCase().includes(searchQuery.toLowerCase()) ||
        d.district.toLowerCase().includes(searchQuery.toLowerCase()) ||
        d.upazila.toLowerCase().includes(searchQuery.toLowerCase()) ||
        d.highlights.some((h) => h.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchDiv && matchDist && matchUp && matchSearch;
    });
  }, [selectedDivision, selectedDistrict, selectedUpazila, searchQuery]);

  // Grouped by Division -> District
  const groupedData = useMemo(() => {
    const groups = {};
    filteredDestinations.forEach((item) => {
      if (!groups[item.division]) {
        groups[item.division] = {};
      }
      if (!groups[item.division][item.district]) {
        groups[item.division][item.district] = [];
      }
      groups[item.division][item.district].push(item);
    });
    return groups;
  }, [filteredDestinations]);

  return (
    <div className="w-full min-h-screen bg-slate-50 pt-20 pb-16">
      {/* Header Banner */}
      <section className="bg-gradient-to-br from-[#063323] via-[#03251A] to-[#01170F] text-white py-14 px-4 sm:px-8 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#7FE5BA_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />
        <div className="max-w-[1360px] mx-auto relative z-10 text-center sm:text-left">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 text-xs font-semibold mb-3">
            <span className="material-symbols-outlined text-sm">hub</span>
            <span>প্রশাসনিক শ্রেণিবিন্যাস: বিভাগ ❯ জেলা ❯ উপজেলা</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-serif tracking-tight text-white mb-3">
            বাংলাদেশের দর্শনীয় স্থানসমূহ
          </h1>
          <p className="text-emerald-100/90 text-sm sm:text-base max-w-2xl leading-relaxed">
            বিভাগ, জেলা এবং উপজেলা অনুযায়ী সাজানো দেশের সেরা ভ্রমণ স্পটগুলো খুঁজে নিন। আপনার কাঙ্ক্ষিত এলাকার পর্যটন সম্ভাবনা ও রানিং ট্যুর এক নজরে দেখুন।
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
                  নির্দিষ্ট প্রশাসনিক এলাকা নির্বাচন করে স্থানসমূহ ফিল্টার করুন
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
                <span>বিভাগভিত্তিক দলবদ্ধ</span>
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
                <span>সকল গ্রিড ভিউ</span>
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
              {filteredDestinations.length} টি দর্শনীয় স্থান
            </span>
            {selectedDivision !== 'all' && (
              <span className="text-xs text-slate-500">
                • {selectedDivision} বিভাগ {selectedDistrict !== 'all' && `❯ ${selectedDistrict} জেলা`} {selectedUpazila !== 'all' && `❯ ${selectedUpazila} উপজেলা`}
              </span>
            )}
          </div>
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
                    {Object.values(districtsObj).flat().length} টি স্থান
                  </span>
                </div>

                {/* Districts and Upazilas inside this Division */}
                <div className="space-y-8">
                  {Object.entries(districtsObj).map(([districtName, items]) => (
                    <div key={districtName} className="pl-0 sm:pl-3 border-l-0 sm:border-l-2 border-emerald-500/30">
                      
                      {/* District Label */}
                      <div className="flex items-center gap-2 mb-4">
                        <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                        <h3 className="text-base sm:text-lg font-bold text-slate-800 font-serif">
                          {districtName} জেলা
                        </h3>
                        <span className="text-xs text-slate-400 font-normal">
                          ({items.length} টি স্থান)
                        </span>
                      </div>

                      {/* Cards Grid */}
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {items.map((dest) => (
                          <DestinationCard
                            key={dest.id}
                            dest={dest}
                            onExplore={() => {
                              navigate('/live-tours');
                              window.scrollTo({ top: 0, behavior: 'smooth' });
                            }}
                          />
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
                onExplore={() => {
                  navigate('/live-tours');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
              />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

// Subcomponent: Reusable Destination Card with Full Administrative Hierarchy Breadcrumb
function DestinationCard({ dest, onExplore }) {
  return (
    <div className="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between group">
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
              {dest.bestSeason}
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
            {dest.highlights.slice(0, 3).map((h, idx) => (
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

        <button
          type="button"
          onClick={onExplore}
          className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-700 text-white text-xs font-bold hover:shadow-md transition-all flex items-center gap-1 cursor-pointer"
        >
          <span>ট্যুর দেখুন</span>
          <span className="material-symbols-outlined text-[15px]">arrow_forward</span>
        </button>
      </div>
    </div>
  );
}
