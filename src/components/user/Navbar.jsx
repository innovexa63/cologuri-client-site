import { useState, useEffect } from 'react';

const navLinks = [
  { label: 'লাইভ ট্যুর', href: '#live-tours' },
  { label: 'ট্যুর গ্রুপ', href: '#tour-groups' },
  { label: 'দর্শনীয় স্থান', href: '#destinations' },
  { label: 'কীভাবে কাজ করে', href: '#how-it-works' },
  { label: 'কাস্টম ট্যুর', href: '#custom-tour' },
  { label: 'ব্লগ', href: '#blog' },
];

export default function Navbar({
  currentRole,
  onRoleChange,
  onNavigateHome,
  isSearchPage = false,
}) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [roleOpen, setRoleOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20);
    fn();
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  const roleLabels = {
    user: 'ভ্রমণকারী',
    groupAdmin: 'গ্রুপ অ্যাডমিন',
    superAdmin: 'সুপার অ্যাডমিন',
  };

  const handleLinkClick = (e, href) => {
    if (isSearchPage && onNavigateHome) {
      e.preventDefault();
      onNavigateHome(href);
    }
  };

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#EEFCF7]/95 backdrop-blur-xl border-b border-[#BCEEDB] shadow-[0_4px_20px_rgba(3,37,26,0.08)]'
          : 'bg-transparent border-b border-transparent'
      }`}
    >
      <div className="h-20 max-w-[1360px] mx-auto px-4 md:px-8 flex items-center justify-between gap-4">
        {/* Logo */}
        <a
          href="#"
          onClick={(e) => {
            if (onNavigateHome) {
              e.preventDefault();
              onNavigateHome();
            }
          }}
          className="flex items-center gap-2.5 shrink-0 group cursor-pointer"
          aria-label="GhurBei হোমপেজ"
        >
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center shadow-md transition-transform duration-200 group-hover:scale-105"
            style={{
              background: 'linear-gradient(135deg, #168B5E 0%, #03251A 100%)',
              border: '1px solid rgba(127, 229, 186, 0.5)',
            }}
          >
            <span
              className="text-xl font-bold leading-none text-white"
              style={{ fontFamily: '"Tiro Bangla", serif' }}
            >
              ঘ
            </span>
          </div>
          <div className="flex flex-col leading-tight">
            <span
              className="text-2xl font-bold tracking-tight transition-colors duration-200"
              style={{
                color: scrolled ? '#03251A' : '#FFFFFF',
                fontFamily: '"Tiro Bangla", serif',
              }}
            >
              GhurBei
            </span>
            <span
              className="text-xs font-semibold tracking-wider -mt-1 transition-colors duration-200"
              style={{
                color: scrolled ? '#127A52' : '#7FE5BA',
                fontFamily: '"Tiro Bangla", serif',
              }}
            >
              ঘুরবে সবাই
            </span>
          </div>
        </a>

        {/* Desktop Nav Links */}
        <nav className="hidden lg:flex items-center gap-1.5" aria-label="প্রধান নেভিগেশন">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => handleLinkClick(e, link.href)}
              className={`px-3.5 py-2 rounded-lg text-[16px] font-semibold transition-all duration-200 ${
                scrolled
                  ? 'hover:text-[#127A52] hover:bg-[#7FE5BA]/20'
                  : 'hover:text-[#7FE5BA] hover:bg-white/12'
              }`}
              style={{
                color: scrolled ? '#03251A' : '#F0FDF8',
                fontFamily: '"Hind Siliguri", "Noto Sans Bengali", sans-serif',
              }}
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Right actions */}
        <div className="flex items-center gap-3 shrink-0">
          {/* Role switcher */}
          <div className="relative hidden sm:block">
            <button
              onClick={() => setRoleOpen(!roleOpen)}
              className="px-3.5 py-2 rounded-xl text-sm font-semibold transition-all flex items-center gap-1.5 shadow-xs cursor-pointer"
              style={{
                backgroundColor: scrolled ? 'rgba(127, 229, 186, 0.2)' : 'rgba(255, 255, 255, 0.14)',
                color: scrolled ? '#03251A' : '#F0FDF8',
                border: scrolled ? '1px solid rgba(127, 229, 186, 0.5)' : '1px solid rgba(127, 229, 186, 0.35)',
                fontFamily: '"Hind Siliguri", "Noto Sans Bengali", sans-serif',
              }}
              aria-expanded={roleOpen}
              id="role-btn"
            >
              <span
                className="material-symbols-outlined text-[18px]"
                style={{ color: scrolled ? '#127A52' : '#7FE5BA' }}
              >
                account_circle
              </span>
              <span>{roleLabels[currentRole]}</span>
              <span
                className="material-symbols-outlined text-[18px]"
                style={{ color: scrolled ? '#03251A' : 'rgba(240, 253, 248, 0.7)' }}
              >
                expand_more
              </span>
            </button>

            {roleOpen && (
              <div
                className="absolute right-0 top-full mt-2 w-48 rounded-xl shadow-2xl border z-50 overflow-hidden py-1"
                style={{
                  backgroundColor: '#FFFFFF',
                  borderColor: '#CFE3D5',
                }}
                role="listbox"
              >
                {Object.keys(roleLabels).map((r) => (
                  <button
                    key={r}
                    onClick={() => {
                      onRoleChange(r);
                      setRoleOpen(false);
                    }}
                    className="w-full text-left px-4 py-2.5 text-sm transition-colors flex items-center justify-between hover:bg-[#EDFEEF] cursor-pointer"
                    style={{
                      backgroundColor: currentRole === r ? '#E7F8EA' : 'transparent',
                      color: currentRole === r ? '#166B47' : '#111E16',
                      fontWeight: currentRole === r ? '700' : '500',
                      fontFamily: '"Hind Siliguri", "Noto Sans Bengali", sans-serif',
                    }}
                    role="option"
                    aria-selected={currentRole === r}
                  >
                    <span>{roleLabels[r]}</span>
                    {currentRole === r && (
                      <span className="material-symbols-outlined text-[16px]" style={{ color: '#166B47' }}>
                        check
                      </span>
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* User profile avatar */}
          <a
            href="#profile"
            className="w-10 h-10 rounded-full flex items-center justify-center transition-all hover:scale-105 shadow-xs"
            style={{
              backgroundColor: scrolled ? '#03251A' : 'rgba(255, 255, 255, 0.18)',
              border: scrolled ? 'none' : '1px solid rgba(127, 229, 186, 0.4)',
              color: '#FFFFFF',
            }}
            aria-label="ব্যবহারকারী প্রোফাইল"
          >
            <span className="material-symbols-outlined text-[20px]">person</span>
          </a>

          {/* Mobile menu toggle */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="lg:hidden w-10 h-10 rounded-xl flex items-center justify-center transition-colors cursor-pointer"
            style={{
              backgroundColor: scrolled ? 'rgba(127, 229, 186, 0.2)' : 'rgba(255, 255, 255, 0.14)',
              color: scrolled ? '#03251A' : '#F0FDF8',
              border: scrolled ? '1px solid rgba(127, 229, 186, 0.5)' : '1px solid rgba(127, 229, 186, 0.35)',
            }}
            aria-label={menuOpen ? 'মেনু বন্ধ' : 'মেনু খুলুন'}
            aria-expanded={menuOpen}
          >
            <span className="material-symbols-outlined text-[22px]">{menuOpen ? 'close' : 'menu'}</span>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div
          className="lg:hidden border-t shadow-2xl"
          style={{
            backgroundColor: scrolled ? '#EEFCF7' : '#03251A',
            borderColor: scrolled ? '#BCEEDB' : 'rgba(127, 229, 186, 0.2)',
          }}
        >
          <div className="max-w-[1360px] mx-auto px-4 py-4 flex flex-col gap-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => {
                  setMenuOpen(false);
                  handleLinkClick(e, link.href);
                }}
                className="px-4 py-2.5 text-[16px] font-semibold rounded-lg transition-colors"
                style={{
                  color: scrolled ? '#03251A' : '#F0FDF8',
                  fontFamily: '"Hind Siliguri", "Noto Sans Bengali", sans-serif',
                }}
              >
                {link.label}
              </a>
            ))}
            <div className="flex flex-wrap gap-2 mt-3 pt-3 border-t border-white/10">
              {Object.keys(roleLabels).map((r) => (
                <button
                  key={r}
                  onClick={() => {
                    onRoleChange(r);
                    setMenuOpen(false);
                  }}
                  className="px-3.5 py-1.5 text-xs font-semibold rounded-full transition-colors cursor-pointer"
                  style={{
                    backgroundColor:
                      currentRole === r ? '#168B5E' : 'rgba(255, 255, 255, 0.1)',
                    color: '#FFFFFF',
                    fontFamily: '"Hind Siliguri", "Noto Sans Bengali", sans-serif',
                  }}
                >
                  {roleLabels[r]}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
