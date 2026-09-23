const steps = [
  {
    num: '০১',
    title: 'খুঁজুন ও তুলনা করুন',
    desc: 'পছন্দের গন্তব্যে একাধিক ভেরিফায়েড ট্যুর গ্রুপের ভ্রমণ পরিকল্পনা, হোটেল মান এবং খরচ পাশাপাশি তুলনা করুন।',
    tag: '১০০% রেটিং যাচাইকৃত',
    icon: 'verified',
    tagColor: 'var(--color-secondary)',
    numBg: 'var(--color-surface-container)',
    numColor: 'var(--color-primary)',
  },
  {
    num: '০২',
    title: 'গ্রুপ বা সিট বেছে নিন',
    desc: 'অন্যান্য সহযাত্রীদের সাথে শেয়ার্ড সিট বেছে নিন কিংবা নারী-বান্ধব ও ফ্যামিলি স্পেশাল ট্রিপে বুকিং কনফার্ম করুন।',
    tag: 'লাইভ সিট ম্যাপিং',
    icon: 'airline_seat_recline_normal',
    tagColor: 'var(--color-secondary)',
    numBg: 'var(--color-secondary-container)',
    numColor: 'var(--color-on-secondary-container)',
  },
  {
    num: '০৩',
    title: 'অথবা কাস্টম সাজান',
    desc: 'নিজের সুবিধামতো বাহন, রিসোর্টের ক্যাটাগরি ও পছন্দের লোকাল ট্রাইবাল খাবারের মেন্যু যোগ করে খরচ হিসাব করুন।',
    tag: 'রিয়েল-টাইম কোটেশন',
    icon: 'calculate',
    tagColor: 'var(--color-on-tertiary-container)',
    numBg: 'var(--color-tertiary-fixed)',
    numColor: 'var(--color-tertiary-container)',
  },
  {
    num: '০৪',
    title: 'নিশ্চিন্তে ঘুরুন',
    desc: 'ভেরিফায়েড গাইড ও GhurBei সার্বক্ষণিক এসওএস (SOS) সাপোর্ট নেটওয়ার্কের সুরক্ষায় নিরাপদে ভ্রমণ উপভোগ করুন।',
    tag: '২৪/৭ হেল্পলাইন সক্রিয়',
    icon: 'support_agent',
    tagColor: 'var(--color-primary)',
    numBg: 'var(--color-primary-container)',
    numColor: 'var(--color-on-primary)',
  },
];

export default function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="w-full py-16 my-4"
      style={{ backgroundColor: 'var(--color-surface-container-low)' }}
    >
      <div className="max-w-[1360px] mx-auto px-4 md:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="label-md uppercase tracking-widest" style={{ color: 'var(--color-secondary)' }}>
            সহজ ও বিশ্বস্ত প্রক্রিয়া
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold mt-1 tracking-tight"
              style={{ color: 'var(--color-primary)', fontFamily: '"Tiro Bangla", serif' }}>
            GhurBei-তে কীভাবে নিশ্চিত করবেন নিরাপদ ভ্রমণ?
          </h2>
          <p className="body-md mt-2 leading-relaxed" style={{ color: 'var(--color-on-surface-variant)' }}>
            অনলাইন পর্যটনে মিথ্যা আশ্বাস ও লুকানো খরচের দিন শেষ। আমাদের ৪-ধাপের ভেরিফায়েড সিস্টেমে মিলবে ঝামেলাহীন অবকাশ।
          </p>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {steps.map((step) => (
            <div key={step.num} className="step-card flex flex-col justify-between">
              <div>
                {/* Step number */}
                <div className="w-12 h-12 rounded-xl flex items-center justify-center text-lg font-bold mb-6"
                     style={{ backgroundColor: step.numBg, color: step.numColor, fontFamily: '"Tiro Bangla", serif' }}>
                  {step.num}
                </div>
                <h3 className="text-lg font-bold mb-3" style={{ color: 'var(--color-primary)', fontFamily: '"Tiro Bangla", serif' }}>
                  {step.title}
                </h3>
                <p className="body-md leading-relaxed" style={{ color: 'var(--color-on-surface-variant)' }}>
                  {step.desc}
                </p>
              </div>
              {/* Tag */}
              <div className="mt-6 flex items-center gap-1 label-md" style={{ color: step.tagColor }}>
                <span className="icon text-lg">{step.icon}</span>
                <span>{step.tag}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
