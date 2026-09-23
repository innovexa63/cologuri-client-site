const reviews = [
  {
    id: 'r1',
    text: '"সাজেক ট্যুরে একা যেতে চেয়েছিলাম কিছুটা সংশয় নিয়ে। GhurBei-তে অন্য গ্রুপের সাথে জয়েন করে দারুণ কিছু ট্রাভেলার বন্ধু পেয়েছি। হোস্টের সময়ানুবর্তিতা ও ক্যাম্পের সার্বিক নিরাপত্তা ছিল চমৎকার!"',
    name: 'তানভীর আহমেদ',
    role: 'সোলো ব্যাকপ্যাকার • ঢাকা বিশ্ববিদ্যালয়',
    initials: 'তা',
    avatarBg: 'var(--color-primary-container)',
    avatarColor: 'var(--color-on-primary)',
  },
  {
    id: 'r2',
    text: '"পরিবার নিয়ে শ্রীমঙ্গল ও চা বাগান ভ্রমণের জন্য কাস্টম ট্যুর বিল্ডার ব্যবহার করেছি। বাচ্চাদের জন্য আলাদা খাবারের ব্যবস্থা ও শান্ত রিসোর্ট—সবকিছুই আমাদের চাহিদামতো একদম নিখুঁত ছিল।"',
    name: 'নাদিয়া সুলতানা',
    role: 'পারিবারিক ভ্রমণকারী • উত্তরা, ঢাকা',
    initials: 'না',
    avatarBg: 'var(--color-secondary)',
    avatarColor: 'var(--color-on-secondary)',
  },
  {
    id: 'r3',
    text: '"আমাদের ২৫ জনের সফটওয়্যার টিমের বাৎসরিক রিট্রিটে দুইটা অভিজ্ঞ গ্রুপকে একত্রিত করে খুব নিখুঁতভাবে সুন্দরবন সাফারি পরিচালনা করেছে। ইনভয়েসিং ও এসক্রো সিস্টেম কর্পোরেটের জন্য বেস্ট।"',
    name: 'আরিফ মাহমুদ',
    role: 'টিম লিড • টেকনোলজি সল্যুশনস বিডি',
    initials: 'আ',
    avatarBg: 'var(--color-on-tertiary-container)',
    avatarColor: 'var(--color-on-tertiary)',
  },
];

export default function Testimonials() {
  return (
    <section id="reviews" className="w-full py-16 border-b border-surface-variant/30" style={{ backgroundColor: '#FFFFFF' }}>
      <div className="max-w-[1360px] mx-auto px-4 md:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="label-md uppercase font-semibold" style={{ color: 'var(--color-secondary)' }}>
            বাস্তব অভিজ্ঞতা
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold mt-1 tracking-tight"
              style={{ color: 'var(--color-primary)', fontFamily: '"Tiro Bangla", serif' }}>
            ভ্রমণকারীদের মুখেই শুনুন GhurBei-এর গল্প
          </h2>
          <p className="body-md mt-2" style={{ color: 'var(--color-on-surface-variant)' }}>
            একাকী পর্যটক থেকে শুরু করে পরিবার এবং কর্পোরেট টিম — সবার অভিজ্ঞতা এক ক্লিকেই।
          </p>
        </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {reviews.map((review) => (
          <div key={review.id} className="testi-card">
            <div>
              {/* Stars */}
              <div className="flex items-center gap-1 mb-4" style={{ color: '#F59E0B' }}>
                {Array.from({ length: 5 }).map((_, i) => (
                  <span key={i} className="icon text-lg">star</span>
                ))}
              </div>
              <p className="body-md leading-relaxed italic" style={{ color: 'var(--color-on-surface)' }}>
                {review.text}
              </p>
            </div>
            {/* Author */}
            <div className="flex items-center gap-3 pt-4 mt-4 border-t"
                 style={{ borderColor: 'rgba(209,213,210,0.4)' }}>
              <div className="w-10 h-10 rounded-full flex items-center justify-center headline-sm font-bold shrink-0"
                   style={{ backgroundColor: review.avatarBg, color: review.avatarColor }}>
                {review.initials}
              </div>
              <div>
                <h4 className="text-sm font-bold" style={{ color: 'var(--color-primary)', fontFamily: '"Tiro Bangla", serif' }}>{review.name}</h4>
                <span className="body-sm" style={{ color: 'var(--color-on-surface-variant)' }}>{review.role}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);
}
