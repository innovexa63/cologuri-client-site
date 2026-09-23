import { useEffect, useRef, useState } from 'react';

const stats = [
  { val: '১২০+', target: 120, label: 'সক্রিয় ভেরিফায়েড ট্যুর গ্রুপ', sub: 'কঠোর নথিপত্র যাচাই সম্পন্ন', color: 'var(--color-primary)' },
  { val: '৪৫,০০০+', target: 45000, label: 'সফল ও সন্তুষ্ট ভ্রমণকারী', sub: 'দেশ ও প্রবাস থেকে যুক্ত', color: 'var(--color-primary)' },
  { val: '৬৪', target: 64, label: 'জেলার ৩০০+ দর্শনীয় স্থান', sub: 'প্রতিটি প্রান্তে নির্ভরযোগ্য রুট', color: 'var(--color-primary)' },
  { val: '৯৯.৪%', target: 99.4, label: 'সময়মতো ট্রিপ নিশ্চিত হওয়ার হার', sub: 'জিরো ক্যান্সেলেশন গ্যারান্টি', color: 'var(--color-secondary)' },
];

export default function StatsSection() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => { if (entries[0].isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.4 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section className="w-full py-16 border-b border-surface-variant/30" style={{ backgroundColor: 'var(--color-surface-container-low)' }}>
      <div className="max-w-[1360px] mx-auto px-4 md:px-8">
        <div
          ref={ref}
          className="grid grid-cols-2 lg:grid-cols-4 gap-6 p-8 lg:p-10 rounded-2xl shadow-sm text-center"
          style={{ backgroundColor: '#FFFFFF' }}
        >
        {stats.map((stat) => (
          <div key={stat.label} className={`flex flex-col items-center transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <span
              className="font-bold tracking-tight"
              style={{
                color: stat.color,
                fontFamily: '"Tiro Bangla", serif',
                fontSize: 'clamp(2rem, 4vw, 3rem)',
                lineHeight: 1.1,
              }}
            >
              {stat.val}
            </span>
            <span className="label-lg font-semibold mt-1" style={{ color: 'var(--color-on-surface)' }}>
              {stat.label}
            </span>
            <span className="body-sm mt-0.5" style={{ color: 'var(--color-on-surface-variant)' }}>
              {stat.sub}
            </span>
          </div>
        ))}
        </div>
      </div>
    </section>
  );
}
