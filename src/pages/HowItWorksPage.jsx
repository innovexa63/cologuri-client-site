import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const travelerSteps = [
  {
    step: '০১',
    title: 'পছন্দের গন্তব্য খুঁজুন ও তুলনা করুন',
    description: 'চলোঘুড়ি প্ল্যাটফর্মে সাজেক, কক্সবাজার, সুন্দরবনসহ দেশের যেকোনো জনপ্রিয় গন্তব্যে একাধিক ভেরিফায়েড ট্যুর গ্রুপের শিডিউল, হোটেল মান, বাসের ধরন এবং খরচ সরাসরি তুলনা করুন।',
    icon: 'search_check',
    tag: '১০০% ভেরিফায়েড তথ্য',
  },
  {
    step: '০২',
    title: 'লাইভ সিট পছন্দ করুন ও ১০ মিনিট লক',
    description: 'বাস বা বোটে আপনার পছন্দের আসনটি লাইভ সিট ম্যাপ দেখে ক্লিক করুন। ক্লিক করা মাত্রই ১০ মিনিটের জন্য সিটটি আপনার জন্য লক হয়ে যাবে, যাতে অন্য কেউ তা বুক করতে না পারে।',
    icon: 'airline_seat_recline_normal',
    tag: 'রিয়েল-টাইম ডাবল বুকিং সুরক্ষা',
  },
  {
    step: '০৩',
    title: 'সহজ ও নিরাপদ ডিজিটাল পেমেন্ট',
    description: 'bKash, Nagad, রকেট বা যেকোনো ব্যাংক কার্ডের মাধ্যমে ১০ মিনিটের মধ্যে নিরাপদ এসক্রো অ্যাকাউন্টে পেমেন্ট করুন। ভ্রমণ সম্পন্ন হওয়ার আগে অপারেটর কোনো অর্থ উত্তোলন করতে পারে না।',
    icon: 'verified_user',
    tag: 'এসক্রো মানি সুরক্ষা',
  },
  {
    step: '০৪',
    title: 'এসএমএস কনফার্মেশন ও যাত্রা শুরু',
    description: 'বুকিং সফল হলে আপনার ফোনে ডিজিটাল টিকিট ও ইনভয়েস চলে যাবে। যাত্রা শুরুর দিন নির্ধারিত স্থানে পৌঁছান এবং চলোঘুড়ির ২৪/৭ এসওএস নিরাপত্তা নেটওয়ার্কে নিশ্চিন্তে ঘুরুন।',
    icon: 'luggage',
    tag: '২৪/৭ সার্বক্ষণিক এসওএস সহায়তা',
  },
];

const operatorSteps = [
  {
    step: '০১',
    title: 'সহজে রেজিস্টার করুন ও ডকুমেন্টস জমা দিন',
    description: 'আপনার ট্যুর গ্রুপ বা ট্রাভেল এজেন্সির ট্রেড লাইসেন্স ও পরিচয়পত্র দিয়ে গ্রুপ অ্যাডমিন প্যানেলে আবেদন করুন। আমাদের ভেরিফিকেশন টিম সর্বোচ্চ ২৪ ঘণ্টার মধ্যে রিভিউ করবে।',
    icon: 'badge',
    tag: 'দ্রুত ভেরিফিকেশন',
  },
  {
    step: '০২',
    title: 'নতুন ট্যুর শিডিউল ও সিট ম্যাপ তৈরি করুন',
    description: 'আমাদের অ্যাডমিন ড্যাশবোর্ডে বাসের মডেল (যেমন হিনো ১জে বা হুন্দাই ইউনিভার্স), সিট লেআউট, হোটেল ডিটেইলস, খাবারের মেন্যু এবং প্যাকেজ মূল্য কয়েক ক্লিকে সেট করুন।',
    icon: 'event_available',
    tag: 'ডায়নামিক সিট ম্যাপ বিল্ডার',
  },
  {
    step: '০৩',
    title: 'হাজারো ভ্রমণকারীর কাছে লাইভ টিকেট বিক্রি',
    description: 'আপনার প্রকাশিত ট্যুরটি সাথে সাথে চলোঘুড়ি ওয়েবসাইটে লাইভ হয়ে যাবে। ভ্রমণকারীরা সিট বুক করলে স্বয়ংক্রিয়ভাবে নোটিফিকেশন পাবেন এবং সিট ম্যাপ আপডেট হবে।',
    icon: 'campaign',
    tag: 'জিরো ট্রাফিক লস',
  },
  {
    step: '০৪',
    title: 'সফল ট্রিপ পরিচালনা ও ইনস্ট্যান্ট পে-আউট',
    description: 'ট্যুর সফলভাবে শেষ হওয়ার সাথে সাথে সিস্টেম থেকে স্বয়ংক্রিয়ভাবে অপারেটরের ব্যাংক বা মোবাইল ব্যাংকিং অ্যাকাউন্টে ফান্ড ট্রান্সফার সম্পন্ন করা হয়।',
    icon: 'payments',
    tag: 'স্বচ্ছ ও দ্রুত উত্তোলন',
  },
];

const faqs = [
  {
    q: '১০ মিনিট সিট লক কীভাবে কাজ করে?',
    a: 'যখন আপনি সিট ম্যাপ থেকে কোনো সিটে ক্লিক করবেন, আমাদের রিয়েল-টাইম সকেট সার্ভার সেই নির্দিষ্ট সিটটি আপনার সেশনের জন্য ১০ মিনিটের জন্য রিজার্ভ করে রাখে। এই সময়ে অন্য কোনো ডিভাইস থেকে সেই সিট সিলেক্ট করা যায় না। নির্ধারিত ১০ মিনিটের মধ্যে পেমেন্ট সম্পন্ন না হলে সিটটি স্বয়ংক্রিয়ভাবে আনলক হয়ে পুনরায় সবার জন্য উন্মুক্ত হয়ে যায়।',
  },
  {
    q: 'পেমেন্ট কতটা নিরাপদ এবং রিফান্ড পলিসি কী?',
    a: 'চলোঘুড়িতে সকল পেমেন্ট সরকারি অনুমোদিত পেমেন্ট গেটওয়ের মাধ্যমে এসক্রো সিস্টেমে জমা থাকে। ট্যুর অপারেটর ট্যুর বাতিল করলে বা প্রাকৃতিক দুর্যোগের কারণে যাত্রা স্থগিত হলে আপনি ১০০% রিফান্ড পাবেন।',
  },
  {
    q: 'নারী ট্রাভেলারদের জন্য আলাদা কোনো সুবিধা বা নিরাপত্তা আছে কি?',
    a: 'হ্যাঁ! আমাদের প্ল্যাটফর্মে নারী ট্রাভেলারদের জন্য স্পেশাল উইমেন-ওনলি গ্রুপ ও ডেডিকেটেড নারী আসন ব্যবস্থা রয়েছে। সিট ম্যাপে গোলাপি রঙে চিহ্নিত আসনগুলো শুধুমাত্র নারী সহযাত্রীদের জন্য সংরক্ষিত।',
  },
  {
    q: 'গ্রুপ অ্যাডমিন প্যানেলে কীভাবে লগইন করব?',
    a: 'আপনি একজন ট্যুর অপারেটর হলে আমাদের অ্যাডমিন পোর্টালে (http://localhost:5174/) গিয়ে আপনার অপারেটর ইমেইল ও পাসওয়ার্ড দিয়ে লগইন করে নিজের ট্যুর ও সিট ম্যাপ পরিচালনা করতে পারবেন।',
  },
];

export default function HowItWorksPage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('traveler');
  const [openFaq, setOpenFaq] = useState(0);

  const stepsToRender = activeTab === 'traveler' ? travelerSteps : operatorSteps;

  return (
    <div className="w-full min-h-screen bg-slate-50 pt-20 pb-16">
      {/* Header Banner */}
      <section className="bg-gradient-to-br from-[#021f15] via-[#043323] to-[#0a4833] text-white py-14 px-4 sm:px-8 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#7FE5BA_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />
        <div className="max-w-[1360px] mx-auto relative z-10 text-center sm:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 text-xs font-semibold mb-3">
            <span className="material-symbols-outlined text-sm">help_center</span>
            <span>সহজ ও স্বচ্ছ ডিজিটাল গাইডলাইন</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-serif tracking-tight text-white mb-3">
            চলোঘুড়ি কীভাবে কাজ করে?
          </h1>
          <p className="text-emerald-100/90 text-sm sm:text-base max-w-2xl leading-relaxed">
            অনলাইন পর্যটনে মিথ্যা আশ্বাস, লুকানো খরচ কিংবা একই সিট একাধিক ব্যক্তির কাছে বিক্রির হয়রানির দিন শেষ। চলোঘুড়ির ৪-ধাপের ভেরিফায়েড সিস্টেমে মিলবে শতভাগ নির্ভাবনার ছুটি।
          </p>
        </div>
      </section>

      {/* Role Toggle Bar */}
      <section className="max-w-[1360px] mx-auto px-4 sm:px-8 -mt-6 relative z-20">
        <div className="bg-white rounded-2xl shadow-xl border border-slate-200 p-2 sm:p-3 flex items-center justify-center max-w-md mx-auto">
          <button
            onClick={() => setActiveTab('traveler')}
            className={`flex-1 py-3 px-4 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
              activeTab === 'traveler'
                ? 'bg-[#03251A] text-white shadow-md'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <span className="material-symbols-outlined text-lg">person</span>
            <span>ভ্রমণকারীদের জন্য</span>
          </button>
          <button
            onClick={() => setActiveTab('operator')}
            className={`flex-1 py-3 px-4 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
              activeTab === 'operator'
                ? 'bg-[#03251A] text-white shadow-md'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <span className="material-symbols-outlined text-lg">domain</span>
            <span>ট্যুর অপারেটরদের জন্য</span>
          </button>
        </div>
      </section>

      {/* 4 Steps Showcase */}
      <section className="max-w-[1360px] mx-auto px-4 sm:px-8 mt-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stepsToRender.map((stepItem, index) => (
            <div
              key={index}
              className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/90 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between"
            >
              <div>
                {/* Step number badge & icon */}
                <div className="flex items-center justify-between mb-6">
                  <span className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-800 font-extrabold text-lg flex items-center justify-center font-mono border border-emerald-100">
                    {stepItem.step}
                  </span>
                  <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center">
                    <span className="material-symbols-outlined text-2xl text-emerald-700">{stepItem.icon}</span>
                  </div>
                </div>

                <h3 className="text-lg font-bold text-slate-900 font-serif mb-3 leading-snug">
                  {stepItem.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {stepItem.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100">
                <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-700">
                  <span className="material-symbols-outlined text-[16px]">check_circle</span>
                  <span>{stepItem.tag}</span>
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Seat Locking Architecture Visual Callout */}
      <section className="max-w-[1360px] mx-auto px-4 sm:px-8 mt-16">
        <div className="bg-gradient-to-r from-[#03251A] via-[#09412F] to-[#043323] rounded-3xl p-8 sm:p-12 text-white shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7">
              <span className="px-3 py-1 rounded-full bg-emerald-400/20 text-emerald-300 text-xs font-bold border border-emerald-400/30">
                স্মার্ট টেকনোলজি
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold font-serif mt-3 text-white">
                রিয়েল-টাইম লাইভ সিট লকিং কীভাবে আপনাকে সুরক্ষিত রাখে?
              </h2>
              <p className="text-sm text-emerald-100/90 mt-3 leading-relaxed">
                ঐতিহ্যবাহী বুকিংয়ে একই সময়ে একাধিক গ্রাহক ফোনে বা মেসেঞ্জারে একই সিট চাইলে ডাবল বুকিংয়ের বিপত্তি ঘটে। চলোঘুড়িতে আমাদের সকেট কানেকশন প্রতিটি ক্লিকের সাথে সাথে সিট রিজার্ভ করে এবং লাইভ সিট ম্যাপে লাল রঙে অন্য সবার জন্য বন্ধ করে দেয়।
              </p>
              <div className="flex flex-wrap gap-4 mt-6">
                <button
                  type="button"
                  onClick={() => {
                    navigate('/live-tours');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="px-6 py-3 rounded-2xl bg-amber-400 hover:bg-amber-300 text-slate-900 font-bold text-xs sm:text-sm shadow-md transition-all cursor-pointer"
                >
                  লাইভ সিট ম্যাপ দেখুন
                </button>
                <button
                  type="button"
                  onClick={() => {
                    navigate('/custom-tour');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="px-6 py-3 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs sm:text-sm border border-white/20 transition-all cursor-pointer"
                >
                  কাস্টম ট্যুর রিকোয়েস্ট করুন
                </button>
              </div>
            </div>

            <div className="lg:col-span-5 bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
              <h4 className="font-bold text-white text-base mb-4 flex items-center gap-2">
                <span className="material-symbols-outlined text-amber-400">lock_clock</span>
                <span>সিট স্ট্যাটাস লেজেন্ড</span>
              </h4>
              <div className="space-y-3 text-xs sm:text-sm">
                <div className="flex items-center gap-3">
                  <span className="w-5 h-5 rounded-md bg-white border border-slate-300 shrink-0" />
                  <span>সাদা — খালি সিট (যে কেউ সিলেক্ট করতে পারবেন)</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="w-5 h-5 rounded-md bg-amber-400 border border-amber-500 shrink-0 animate-pulse" />
                  <span>হলুদ — সিট লক (১০ মিনিটের সাময়িক রিজার্ভেশন)</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="w-5 h-5 rounded-md bg-emerald-600 border border-emerald-700 shrink-0" />
                  <span>সবুজ — আপনার নির্বাচিত সিট</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="w-5 h-5 rounded-md bg-pink-500 border border-pink-600 shrink-0" />
                  <span>গোলাপি — শুধুমাত্র নারী সহযাত্রীদের জন্য সংরক্ষিত</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="w-5 h-5 rounded-md bg-slate-500 border border-slate-600 shrink-0" />
                  <span>ধূসর — নিশ্চিত বুকড সিট</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQs Section */}
      <section className="max-w-[900px] mx-auto px-4 sm:px-8 mt-16">
        <div className="text-center mb-10">
          <span className="text-xs font-bold text-emerald-700 uppercase tracking-widest">সাধারণ প্রশ্ন ও উত্তর</span>
          <h2 className="text-2xl sm:text-3xl font-bold font-serif text-slate-900 mt-1">
            সচরাচর জিজ্ঞাসিত প্রশ্নসমূহ
          </h2>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs"
            >
              <button
                type="button"
                onClick={() => setOpenFaq(openFaq === idx ? -1 : idx)}
                className="w-full text-left p-5 flex items-center justify-between font-bold text-slate-900 text-sm sm:text-base hover:bg-slate-50 transition-colors cursor-pointer"
              >
                <span>{faq.q}</span>
                <span className="material-symbols-outlined text-slate-400 transition-transform duration-200" style={{ transform: openFaq === idx ? 'rotate(180deg)' : 'none' }}>
                  expand_more
                </span>
              </button>
              {openFaq === idx && (
                <div className="p-5 pt-0 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 bg-slate-50/50">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
