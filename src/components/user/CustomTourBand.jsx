import { useState, useEffect } from 'react';

const calcItems = [
  { id: 'transport', label: 'নন-এসি / এসি চেয়ার কোচ যাতায়াত', cost: 1200, checked: true },
  { id: 'food', label: 'ট্রেডিশনাল ব্যাম্বু চিকেন ও সকল বেলার খাবার', cost: 850, checked: true },
  { id: 'stay', label: 'পাহাড়ি ইকো কটেজ / ৩-স্টার রিসোর্ট স্টে', cost: 2400, checked: true },
  { id: 'guide', label: 'স্থানীয় ট্রেকিং গাইড ও রিজার্ভ চান্দের গাড়ি', cost: 1100, checked: true },
];

function toBn(n) {
  return n.toLocaleString('bn-BD');
}

export default function CustomTourBand() {
  const [checked, setChecked] = useState(
    Object.fromEntries(calcItems.map((i) => [i.id, i.checked]))
  );
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const sum = calcItems.reduce((acc, item) => acc + (checked[item.id] ? item.cost : 0), 0);
    setTotal(sum);
  }, [checked]);

  const toggle = (id) => setChecked((prev) => ({ ...prev, [id]: !prev[id] }));

  return (
    <section id="custom-tour" className="w-full py-16 border-b border-surface-variant/30" style={{ backgroundColor: '#FFFFFF' }}>
      <div className="max-w-[1360px] mx-auto px-4 md:px-8">
        <div className="rounded-2xl p-6 lg:p-10 shadow-md"
             style={{ backgroundColor: 'var(--color-surface-container)' }}>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">

            {/* Left: pitch */}
            <div className="lg:col-span-6 flex flex-col gap-4">
              <div className="inline-flex items-center gap-1 label-md uppercase font-semibold"
                   style={{ color: 'var(--color-on-tertiary-container)' }}>
                <span className="icon text-lg">build</span>
                ফ্লেক্সিবল ট্রাভেল আর্কিটেক্ট
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold leading-tight"
                  style={{ color: 'var(--color-primary)', fontFamily: '"Tiro Bangla", serif' }}>
                নির্দিষ্ট প্যাকেজ পছন্দ হচ্ছে না? নিজের মতো করে ট্যুর প্ল্যান সাজান
              </h2>
            <p className="body-lg leading-relaxed" style={{ color: 'var(--color-on-surface-variant)' }}>
              আপনার বাজেট এবং সময় অনুযায়ী উপাদানগুলো নির্বাচন করুন। GhurBei প্ল্যাটফর্মে থাকা রেজিস্টার্ড ট্যুর গ্রুপগুলো আপনার প্রস্তাবিত বাজেটে বিড করে সাশ্রয়ী কোটেশন প্রদান করবে।
            </p>
            <div className="flex flex-col gap-3 pt-1">
              {[
                'কোনো মধ্যস্বত্বভোগী কমিশন নেই, সরাসরি লোকাল দলের সাথে যোগাযোগ',
                'নিরাপদ এসক্রো পেমেন্ট: ট্যুর সম্পন্ন না হওয়া পর্যন্ত টাকা সুরক্ষিত',
                'ফ্যামিলি ও কর্পোরেট দলের জন্য বিশেষ ট্রাভেল ইনস্যুরেন্স কভারেজ',
              ].map((point) => (
                <div key={point} className="flex items-center gap-3">
                  <span className="icon text-2xl shrink-0" style={{ color: 'var(--color-secondary)' }}>check_circle</span>
                  <span className="body-md" style={{ color: 'var(--color-on-surface)' }}>{point}</span>
                </div>
              ))}
            </div>
            <div className="pt-2">
              <button type="button" className="btn-primary label-lg px-6 py-3" id="get-quote-btn">
                কাস্টম কোটেশন চান
              </button>
            </div>
          </div>

          {/* Right: interactive calculator */}
          <div className="lg:col-span-6">
            <div className="rounded-xl p-6 shadow-lg"
                 style={{ backgroundColor: 'var(--color-surface-container-lowest)' }}>
              {/* Calculator header */}
              <div className="flex items-center justify-between pb-4 mb-4 border-b"
                   style={{ borderColor: 'var(--color-surface-container)' }}>
                <div>
                  <span className="label-sm font-semibold block" style={{ color: 'var(--color-secondary)' }}>
                    রিয়েল-টাইম ক্যালকুলেটর
                  </span>
                  <h4 className="text-lg font-bold" style={{ color: 'var(--color-primary)', fontFamily: '"Tiro Bangla", serif' }}>
                    ট্যুর কস্ট ক্যালকুলেটর
                  </h4>
                </div>
                <span className="px-2.5 py-1 rounded-full label-sm"
                      style={{ backgroundColor: 'var(--color-surface-container)', color: 'var(--color-on-surface)' }}>
                  সাজেক ৩ দিন ২ রাত
                </span>
              </div>

              {/* Checkbox items */}
              <div className="flex flex-col gap-2" id="calculator-options">
                {calcItems.map((item) => (
                  <label key={item.id} className="calc-row" htmlFor={`calc-${item.id}`}>
                    <div className="flex items-center gap-3">
                      <input
                        id={`calc-${item.id}`}
                        type="checkbox"
                        className="w-4 h-4 rounded cursor-pointer"
                        style={{ accentColor: 'var(--color-secondary)' }}
                        checked={checked[item.id]}
                        onChange={() => toggle(item.id)}
                        data-cost={item.cost}
                      />
                      <span className="body-md" style={{ color: 'var(--color-on-surface)' }}>{item.label}</span>
                    </div>
                    <span className="label-md font-bold shrink-0" style={{ color: 'var(--color-primary)' }}>
                      + ৳{toBn(item.cost)}
                    </span>
                  </label>
                ))}
              </div>

              {/* Total bar */}
              <div className="mt-6 p-4 rounded-xl flex flex-col sm:flex-row items-center justify-between gap-4"
                   style={{ backgroundColor: 'var(--color-surface-container)' }}>
                <div>
                  <span className="label-sm block" style={{ color: 'var(--color-on-surface-variant)' }}>
                    আনুমানিক মোট খরচ:
                  </span>
                  <span className="headline-lg font-bold" id="calculated-total"
                        style={{ color: 'var(--color-primary)' }}>
                    ৳{toBn(total)}
                  </span>
                  <span className="body-sm ml-1" style={{ color: 'var(--color-on-surface-variant)' }}>
                    / প্রতি জন
                  </span>
                </div>
                <button type="button" className="btn-cta label-md w-full sm:w-auto flex items-center justify-center gap-1"
                        id="share-invite-btn">
                  <span className="icon text-lg">share</span>
                  গ্রুপ ইনভাইট লিংক তৈরি করুন
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  </section>
  );
}
