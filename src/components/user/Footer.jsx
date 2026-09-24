import { useState } from 'react';
import { Link } from 'react-router-dom';
import BrandLogo from '../common/BrandLogo';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <footer
      className="w-full pt-16 pb-8"
      style={{
        backgroundColor: 'var(--color-primary-container)',
        color: 'var(--color-on-primary-container)',
      }}
    >
      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 pb-12 border-b border-white/10">
          {/* Brand Column */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center">
              <BrandLogo theme="dark" className="h-12 w-auto" alt="চলোঘুড়ি" />
            </div>
            <p className="text-sm leading-relaxed" style={{ color: 'var(--color-on-primary-container)' }}>
              ঘুরবে সবাই একসাথে সহজে — বাংলাদেশের প্রতিটি কোণে অ্যাডভেঞ্চার এবং আস্থার নির্ভরযোগ্য ট্যুর মার্কেটপ্লেস।
            </p>
            <div className="flex items-center gap-2 pt-1">
              <a
                aria-label="Facebook"
                href="#facebook"
                className="w-9 h-9 rounded-full flex items-center justify-center text-white transition-colors"
                style={{ backgroundColor: 'var(--color-primary)' }}
              >
                <span className="material-symbols-outlined text-[18px]">public</span>
              </a>
              <a
                aria-label="Instagram"
                href="#instagram"
                className="w-9 h-9 rounded-full flex items-center justify-center text-white transition-colors"
                style={{ backgroundColor: 'var(--color-primary)' }}
              >
                <span className="material-symbols-outlined text-[18px]">photo_camera</span>
              </a>
              <a
                aria-label="YouTube"
                href="#youtube"
                className="w-9 h-9 rounded-full flex items-center justify-center text-white transition-colors"
                style={{ backgroundColor: 'var(--color-primary)' }}
              >
                <span className="material-symbols-outlined text-[18px]">play_circle</span>
              </a>
              <a
                aria-label="WhatsApp"
                href="#whatsapp"
                className="w-9 h-9 rounded-full flex items-center justify-center text-white transition-colors"
                style={{ backgroundColor: 'var(--color-primary)' }}
              >
                <span className="material-symbols-outlined text-[18px]">chat</span>
              </a>
            </div>
          </div>

          {/* Platform Links */}
          <div className="flex flex-col gap-3">
            <h4
              className="text-base font-bold text-white tracking-wide"
              style={{ fontFamily: '"Tiro Bangla", serif' }}
            >
              প্ল্যাটফর্ম লিংক
            </h4>
            <ul className="flex flex-col gap-2 text-sm">
              <li>
                <Link to="/live-tours" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="hover:text-white transition-colors py-0.5 inline-block">
                  লাইভ ট্যুর ক্যালেন্ডার
                </Link>
              </li>
              <li>
                <Link to="/tour-groups" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="hover:text-white transition-colors py-0.5 inline-block">
                  ট্যুর গ্রুপ ও এজেন্সি
                </Link>
              </li>
              <li>
                <Link to="/destinations" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="hover:text-white transition-colors py-0.5 inline-block">
                  দর্শনীয় স্থান
                </Link>
              </li>
              <li>
                <Link to="/how-it-works" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="hover:text-white transition-colors py-0.5 inline-block">
                  কীভাবে কাজ করে
                </Link>
              </li>
              <li>
                <Link to="/custom-tour" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="hover:text-white transition-colors py-0.5 inline-block">
                  কাস্টম ট্যুর বিল্ডার
                </Link>
              </li>
              <li>
                <Link to="/blog" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="hover:text-white transition-colors py-0.5 inline-block">
                  ভ্রমণ ব্লগ ও গাইড
                </Link>
              </li>
            </ul>
          </div>

          {/* Operators */}
          <div className="flex flex-col gap-3">
            <h4
              className="text-base font-bold text-white tracking-wide"
              style={{ fontFamily: '"Tiro Bangla", serif' }}
            >
              ট্যুর গ্রুপদের জন্য
            </h4>
            <ul className="flex flex-col gap-2 text-sm">
              <li>
                <a
                  href="http://localhost:5174/login"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-white transition-colors py-0.5 inline-block"
                >
                  হোস্ট হিসেবে যুক্ত হোন (অ্যাডমিন)
                </a>
              </li>
              <li>
                <Link to="/how-it-works" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="hover:text-white transition-colors py-0.5 inline-block">
                  গ্রুপ গাইডলাইন ও ভেরিফিকেশন
                </Link>
              </li>
              <li>
                <Link to="/live-tours" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="hover:text-white transition-colors py-0.5 inline-block">
                  জয়েন্ট ট্যুর পার্টনারশিপ
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact & Newsletter */}
          <div className="flex flex-col gap-3">
            <h4
              className="text-base font-bold text-white tracking-wide"
              style={{ fontFamily: '"Tiro Bangla", serif' }}
            >
              যোগাযোগ ও নিউজলেটার
            </h4>
            <p className="text-sm" style={{ color: 'var(--color-on-primary-container)' }}>
              নতুন ট্যুর প্যাকেজ ও ডিসকাউন্ট আপডেট পেতে সাবস্ক্রাইব করুন।
            </p>
            {subscribed ? (
              <div
                className="p-3 rounded-lg text-sm font-medium"
                style={{
                  backgroundColor: 'rgba(163, 244, 197, 0.2)',
                  color: 'var(--color-secondary-fixed)',
                }}
              >
                ধন্যবাদ! সাবস্ক্রিপশন সফল হয়েছে।
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex items-center gap-2 mt-1">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="আপনার ইমেইল দিন"
                  required
                  className="w-full px-3 py-2 text-sm rounded text-gray-900 bg-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-secondary"
                />
                <button
                  type="submit"
                  className="px-4 py-2 text-sm font-semibold rounded shrink-0 transition-colors shadow"
                  style={{
                    backgroundColor: 'var(--color-on-tertiary-container)',
                    color: '#ffffff',
                  }}
                >
                  যুক্ত হোন
                </button>
              </form>
            )}

            <div className="flex items-center gap-2 pt-2 text-white">
              <span className="material-symbols-outlined text-[20px]" style={{ color: 'var(--color-secondary-fixed)' }}>
                support_agent
              </span>
              <span className="text-sm font-semibold">হেল্পলাইন: +৮৮০ ১৭০০-০০০০০০</span>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs" style={{ color: 'var(--color-on-primary-container)' }}>
          <p className="text-center sm:text-left">
            © ২০২৫ চলোঘুড়ি (Cologuri) — সর্বস্বত্ব সংরক্ষিত। প্রেমে ও গর্বে বাংলাদেশে তৈরি।
          </p>
          <div className="flex items-center gap-4">
            <a href="#terms" className="hover:text-white transition-colors">
              শর্তাবলী
            </a>
            <a href="#privacy" className="hover:text-white transition-colors">
              গোপনীয়তা নীতি
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
