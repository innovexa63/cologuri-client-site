import { useState, useMemo } from 'react';

const allBlogPosts = [
  {
    id: 'sajek-guide',
    tag: 'ভ্রমণ গাইড',
    category: 'guide',
    readTime: '৪ মিনিট পাঠ',
    date: '২৪ অক্টোবর ২০২৬',
    author: 'তানভীর আহমেদ',
    authorRole: 'মাউন্টেন ট্রাভেলার',
    title: 'সাজেক ভ্যালি ভ্রমণের সেরা সময় ও খরচ বাঁচানোর ৭টি কৌশল',
    excerpt: 'অফ-সিজনে কটেজের বিশেষ ছাড় এবং স্থানীয় চান্দের গাড়ি শেয়ারিংয়ের গোপন টিপস জেনে নিন অভিজ্ঞ ট্রাভেলারদের কাছ থেকে।',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&q=80',
    content: `সাজেক ভ্যালি এখন বাংলাদেশের ভ্রমণপিপাসুদের এক অনন্য ভালোবাসার নাম। কিন্তু সঠিক পরিকল্পনার অভাবে অনেক সময় ভ্রমণ ব্যয়বহুল ও ক্লান্তিকর হয়ে পড়ে।

১. চান্দের গাড়ি শেয়ারিং:
খাগড়াছড়ি বাস টার্মিনাল থেকেই অন্যান্য ভ্রমণকারীদের সাথে মিলে চাঁদের গাড়ি শেয়ার করুন। এতে জনপ্রতি খরচ ১,২০০ টাকা থেকে কমে মাত্র ৪০০-৫০০ টাকায় নেমে আসে।

২. কটেজ বুকিং টিপস:
রুইলুই পাড়ার চেয়ে কংলাক পাড়ার কটেজগুলো কিছুটা সাশ্রয়ী এবং ভোরে মেঘের সরাসরি সান্নিধ্য পাওয়া যায়। শুক্রবার-শনিবার এড়িয়ে রবি থেকে বুধবার গেলে কটেজ ভাড়ায় ৩০% পর্যন্ত ছাড় পাওয়া সম্ভব।

৩. লোকাল পাহাড়ি খাবার:
ব্যাম্বু চিকেন খাওয়ার সময় আগে থেকেই স্থানীয় রেস্তোরাঁয় অর্ডার দিয়ে রাখুন। এতে সময় ও খরচ দুটোই বাঁচে।`,
  },
  {
    id: 'sundarban-guide',
    tag: 'ইকো ট্যুরিজম',
    category: 'eco',
    readTime: '৬ মিনিট পাঠ',
    date: '২০ অক্টোবর ২০২৬',
    author: 'ফারহানা ইয়াসমিন',
    authorRole: 'ওয়াইল্ডলাইফ ফটোগ্রাফার',
    title: 'সুন্দরবনে নিরাপদ ভ্রমণের পূর্ণাঙ্গ নির্দেশিকা ও পরিবেশগত করণীয়',
    excerpt: 'বন বিভাগের অনুমতি, সশস্ত্র বনরক্ষী ব্যবস্থাপনা এবং প্লাস্টিক মুক্ত ভ্রমণ সুনিশ্চিত করার খুঁটিনাটি নিয়মাবলী।',
    image: 'https://images.unsplash.com/photo-1547036967-23d11aacaee0?w=1200&q=80',
    content: `সুন্দরবন শুধুমাত্র একটি পর্যটন স্থান নয়, এটি পৃথিবীর অন্যতম সংবেদনশীল প্রাকৃতিক ইকোসিস্টেম।

১. বন বিভাগের অনুমতি ও গার্ড:
জাহাজে ওঠার আগেই মোংলা বা খুলনা ঘাট থেকে বন বিভাগের ফরেস্ট পারমিট নিশ্চিত করুন। কটকা ও কচিখালী ট্রেইলে অবশ্যই সশস্ত্র বনরক্ষী সাথে রাখুন।

২. প্লাস্টিক মুক্ত ভ্রমণ:
বনের মধ্যে কোনো প্রকার প্লাস্টিকের বোতল বা চিপসের প্যাকেট ফেলা কঠোরভাবে নিষিদ্ধ। নিজের সাথে রি-ইউজেবল পানির বোতল রাখুন।

৩. শান্ত থাকুন ও শব্দ দূষণ এড়িয়ে চলুন:
খালে ক্যানাল ক্রুজের সময় ইঞ্জিনের শব্দ বন্ধ করে বৈঠা দিয়ে নৌকা চালনা উপভোগ করুন। এতে বুনো হরিণ ও পাখির ডাক শোনার অপূর্ব অভিজ্ঞতা হবে।`,
  },
  {
    id: 'bandarban-guide',
    tag: 'ট্রেকিং টিপস',
    category: 'trekking',
    readTime: '৫ মিনিট পাঠ',
    date: '১৫ অক্টোবর ২০২৬',
    author: 'রাকিবুল হাসান',
    authorRole: 'ট্রেকিং লিডার',
    title: 'বর্ষায় বান্দরবানের ঝর্ণা দর্শন: যা সাথে রাখা অপরিহার্য',
    excerpt: 'নাফাকুম ও অমিয়াখুমের পিচ্ছিল ট্রেইলে নিরাপদ গ্রিপ জুতো, জোঁক প্রতিরোধক ব্যবস্থা এবং প্রয়োজনীয় ব্যাকপ্যাকিং সামগ্রী।',
    image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1200&q=80',
    content: `বান্দরবানের পাহাড়ি ট্রেইলগুলো বর্ষায় যেমন রূপবতী হয়ে ওঠে, তেমনি পথ থাকে বেশ পিচ্ছিল ও ঝুঁকিপূর্ণ।

১. সঠিক গ্রিপ জুতো:
ট্রেইলে নামার আগে স্থানীয় রাবারের ডিউ শ্যু (পাহাড়ি জুতো) সংগ্রহ করুন। সাধারণ কেডস এই ট্রেইলে পিচ্ছিল হয়ে বিপজ্জনক হতে পারে।

২. জোঁক প্রতিরোধ:
তামাক পাতা গোলমরিচের সাথে গুঁড়ো করে মোজায় লাগিয়ে নিতে পারেন কিংবা হ্যান্ড স্যানিটাইজার বা লবণ স্প্রে সাথে রাখুন।

৩. ওয়াটারপ্রুফ ড্রাই ব্যাগ:
ফোন, ক্যামেরা ও অতিরিক্ত জামাকাপড় রক্ষার জন্য ভালো মানের ড্রাই ব্যাগ ও রেইন কভার ব্যবহার করুন।`,
  },
  {
    id: 'packing-guide',
    tag: 'প্যাকিং ও নিরাপত্তা',
    category: 'safety',
    readTime: '৪ মিনিট পাঠ',
    date: '১০ অক্টোবর ২০২৬',
    author: 'সাকিব ইকবাল',
    authorRole: 'ব্যাকপ্যাকার',
    title: 'ট্যুরে বের হওয়ার আগে স্মার্ট ব্যাকপ্যাকিং ও ফার্স্টএইড কিট গাইড',
    excerpt: 'কম ওজনের ব্যাকপ্যাকে সর্বোচ্চ প্রয়োজনীয় জিনিস গুছিয়ে নেওয়ার আর্ট ও ট্রাভেল মেডিকেশন টিপস।',
    image: 'https://images.unsplash.com/photo-1510312305653-8ed496efae75?w=1200&q=80',
    content: `অতিরিক্ত ওজনের ব্যাগ যেকোনো আনন্দময় ভ্রমণকে বিষাদময় করে দিতে পারে।

১. রোলিং মেথড:
কাপড় ভাঁজ না করে রোল করে রাখলে ব্যাগে জায়গা বাঁচে এবং কাপড় কুঁচকে যায় না।

২. জরুরি ফার্স্টএইড কিট:
প্যারাসিটামল, এন্টাসিড, স্যালাইন, ব্যান্ডএইড, অ্যান্টিসেপটিক ক্রিম এবং মুভ স্প্রে সবসময় একটি ছোট স্বচ্ছ পাউচে রাখুন।

৩. পাওয়ার ব্যাংক ও অফলাইন ম্যাপ:
পাহাড়ি এলাকায় মোবাইল নেটওয়ার্ক দুর্বল থাকে। যাওয়ার আগেই গুগল ম্যাপে সংশ্লিষ্ট এলাকা অফলাইন ডাউনলোড করে রাখুন।`,
  },
  {
    id: 'photo-tips',
    tag: 'ফটোগ্রাফি',
    category: 'photo',
    readTime: '৩ মিনিট পাঠ',
    date: '০৫ অক্টোবর ২০২৬',
    author: 'মেহজাবিন আলম',
    authorRole: 'ট্রাভেল ফটোগ্রাফার',
    title: 'স্মার্টফোনে সেরা ট্রাভেল ফটো তোলার ৫টি সহজ ট্রিকস',
    excerpt: 'গোল্ডেন আওয়ারের আলো, লিডিং লাইনস ও প্রাকৃতিক ফ্রেমিং কাজে লাগিয়ে কীভাবে প্রফেশনাল ছবি তুলবেন।',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200&q=80',
    content: `দামী ক্যামেরা ছাড়াই আপনার হাতের স্মার্টফোনটি দিয়ে তুলতে পারেন অসাধারণ সব ট্রাভেল শট।

১. গোল্ডেন আওয়ার ব্যবহার:
ভোরের সূর্যোদয়ের প্রথম এক ঘণ্টা এবং সূর্যাস্তের আগের এক ঘণ্টার নরম আলোতে ল্যান্ডস্কেপ ও পোর্ট্রেট ছবি সবচেয়ে সুন্দর আসে।

২. রুল অফ থার্ডস ও গ্রিডলাইনস:
ক্যামেরা সেটিংসে গিয়ে ৩x৩ গ্রিডলাইন অন করুন। মূল সাবজেক্টকে গ্রিডের সংযোগস্থলে রাখুন।

৩. লেন্স পরিষ্কার রাখা:
ছবি তোলার ঠিক আগে লেন্সটি টিস্যু বা নরম কাপড় দিয়ে মুছে নিন। সামান্য ধুলো বা আঙুলের ছাপ ছবির শার্পনেস নষ্ট করে।`,
  },
  {
    id: 'haor-story',
    tag: 'ভ্রমণ গাইড',
    category: 'guide',
    readTime: '৫ মিনিট পাঠ',
    date: '০১ অক্টোবর ২০২৬',
    author: 'ইশতিয়াক চৌধুরী',
    authorRole: 'ট্রাভেলার',
    title: 'টাঙ্গুয়ার হাওরে হাউসবোট ভ্রমণের রোজনামচা ও সেরা অভিজ্ঞতা',
    excerpt: 'সুনামগঞ্জের জলে ভাসমান জীবন, লাল শাপলার ঝিলমিল ও মেঘালয়ের ছায়ায় এক অলস ছুটির ইতিবৃত্ত।',
    image: 'https://images.unsplash.com/photo-1501854140801-50d01698950b?w=1200&q=80',
    content: `মেঘালয়ের পাহাড় থেকে নেমে আসা স্বচ্ছ যাদুকাটা নদী আর সীমানাহীন টাঙ্গুয়ার হাওরে কাঠের হাউসবোটে কাটানো রাতগুলো যেন কোনো রূপকথার মতো।

১. সেরা সময়:
বর্ষাকালে হাওর পানিতে পরিপূর্ণ থাকে এবং শীতে আসে হাজারো অতিথি পাখি। জুলাই থেকে অক্টোবর হলো হাউসবোট উপভোগের পিক সিজন।

২. হাউসবোটে খাবার:
হাওরের তাজা বোয়াল, রুই ও দেশি মুরগির ভুনা দিয়ে দুপুরের খাবার ট্রিপের অন্যতম বড় আকর্ষণ।

৩. যাদুকাটা নদী ও বারেকের টিলা:
হাওর দেখার পাশাপাশি যাদুকাটার স্ফটিক স্বচ্ছ পানিতে স্নান করার অনুভূতি কোনোভাবেই মিস করবেন না।`,
  },
];

const categoryTabs = [
  { id: 'all', label: 'সকল ব্লগ' },
  { id: 'guide', label: 'ভ্রমণ গাইড' },
  { id: 'trekking', label: 'ট্রেকিং টিপস' },
  { id: 'eco', label: 'ইকো ট্যুরিজম' },
  { id: 'safety', label: 'প্যাকিং ও নিরাপত্তা' },
  { id: 'photo', label: 'ফটোগ্রাফি' },
];

export default function BlogPage() {
  const [selectedCat, setSelectedCat] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeArticle, setActiveArticle] = useState(null);

  const filteredPosts = useMemo(() => {
    return allBlogPosts.filter((post) => {
      const matchCat = selectedCat === 'all' || post.category === selectedCat;
      const matchSearch =
        searchQuery.trim() === '' ||
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.author.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCat && matchSearch;
    });
  }, [selectedCat, searchQuery]);

  return (
    <div className="w-full min-h-screen bg-slate-50 pt-20 pb-16">
      {/* Header Banner */}
      <section className="bg-gradient-to-br from-[#021f15] via-[#043323] to-[#0a4833] text-white py-14 px-4 sm:px-8 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#7FE5BA_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />
        <div className="max-w-[1360px] mx-auto relative z-10 text-center sm:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 text-xs font-semibold mb-3">
            <span className="material-symbols-outlined text-sm">article</span>
            <span>চলোঘুড়ি ট্রাভেল আর্কাইভ ও গাইডবুক</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-serif tracking-tight text-white mb-3">
            ভ্রমণ ব্লগ ও ফিল্ড গাইডলাইন
          </h1>
          <p className="text-emerald-100/90 text-sm sm:text-base max-w-2xl leading-relaxed">
            অভিজ্ঞ ট্রাভেলার ও লোকাল গাইডদের বাস্তব অভিজ্ঞতা, রুট ম্যাপ, হিডেন স্পট এবং খরচ বাঁচানোর প্র্যাকটিক্যাল টিপস জেনে নিন ভ্রমণের আগেই।
          </p>
        </div>
      </section>

      {/* Control Bar */}
      <section className="max-w-[1360px] mx-auto px-4 sm:px-8 -mt-6 relative z-20">
        <div className="bg-white rounded-2xl shadow-xl border border-slate-200 p-4 sm:p-5 flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-1 md:pb-0 scrollbar-none">
            {categoryTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSelectedCat(tab.id)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  selectedCat === tab.id
                    ? 'bg-[#03251A] text-white shadow-md'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {tab.label}
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
              placeholder="ব্লগ বা বিষয় খুঁজুন..."
              className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 text-slate-800"
            />
          </div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="max-w-[1360px] mx-auto px-4 sm:px-8 mt-8">
        <div className="flex items-center justify-between mb-6">
          <p className="text-sm font-semibold text-slate-600">
            মোট <span className="text-emerald-700 font-bold">{filteredPosts.length}</span> টি আর্টিকেল প্রকাশিত
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredPosts.map((post) => (
            <article
              key={post.id}
              onClick={() => setActiveArticle(post)}
              className="bg-white rounded-3xl overflow-hidden border border-slate-200/80 shadow-[0_4px_20px_rgba(0,0,0,0.06)] hover:shadow-xl transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between group cursor-pointer"
            >
              <div>
                {/* Thumbnail */}
                <div className="relative h-52 sm:h-56 w-full overflow-hidden bg-slate-900">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  
                  {/* Category Pill */}
                  <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-emerald-700 text-white text-xs font-bold shadow-md">
                    {post.tag}
                  </div>

                  {/* Read time pill */}
                  <div className="absolute bottom-3 right-3 px-2.5 py-0.5 rounded-full bg-black/60 text-white/90 text-[11px] font-medium backdrop-blur-xs flex items-center gap-1">
                    <span className="material-symbols-outlined text-[13px]">schedule</span>
                    <span>{post.readTime}</span>
                  </div>
                </div>

                {/* Article Info */}
                <div className="p-6">
                  <div className="flex items-center gap-2 text-xs text-slate-400 mb-2">
                    <span>{post.date}</span>
                    <span>•</span>
                    <span className="text-slate-600 font-medium">{post.author}</span>
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 group-hover:text-emerald-700 transition-colors font-serif leading-snug line-clamp-2">
                    {post.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-600 mt-2.5 leading-relaxed line-clamp-3">
                    {post.excerpt}
                  </p>
                </div>
              </div>

              {/* Card Footer */}
              <div className="px-6 pb-6 pt-2 flex items-center justify-between text-xs font-bold text-emerald-700 group-hover:text-emerald-800">
                <span>সম্পূর্ণ পড়ুন</span>
                <span className="material-symbols-outlined text-[18px] group-hover:translate-x-1 transition-transform">
                  arrow_forward
                </span>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Full Article Reader Modal */}
      {activeArticle && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200 animate-in fade-in zoom-in duration-200">
            {/* Modal Image */}
            <div className="relative h-64 w-full overflow-hidden bg-slate-900">
              <img
                src={activeArticle.image}
                alt={activeArticle.title}
                className="w-full h-full object-cover"
              />
              <button
                type="button"
                onClick={() => setActiveArticle(null)}
                className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/50 text-white hover:bg-black/80 flex items-center justify-center cursor-pointer transition-colors backdrop-blur-xs"
              >
                ✕
              </button>
              <div className="absolute bottom-4 left-4 px-3 py-1 rounded-full bg-emerald-700 text-white text-xs font-bold">
                {activeArticle.tag}
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-6 sm:p-8">
              <div className="flex items-center gap-3 pb-4 border-b border-slate-100 text-xs text-slate-500">
                <span className="font-bold text-slate-700">{activeArticle.author}</span>
                <span>({activeArticle.authorRole})</span>
                <span>•</span>
                <span>{activeArticle.date}</span>
                <span>•</span>
                <span>{activeArticle.readTime}</span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-bold font-serif text-slate-900 mt-4 mb-4 leading-tight">
                {activeArticle.title}
              </h2>

              <div className="text-slate-700 text-sm sm:text-base leading-relaxed whitespace-pre-line space-y-4">
                {activeArticle.content}
              </div>

              <div className="mt-8 pt-6 border-t border-slate-100 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setActiveArticle(null)}
                  className="px-6 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs cursor-pointer"
                >
                  বন্ধ করুন
                </button>
                <div className="flex items-center gap-2 text-xs text-slate-400">
                  <span className="material-symbols-outlined text-[16px] text-emerald-600">verified</span>
                  <span>চলোঘুড়ি ভেরিফায়েড গাইডবুক</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
