import { useState } from 'react';
import logoImg from '../assets/logo.png';
import { navigationData } from '../data/navigation';

export const Navbar = ({ data = navigationData }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 h-[58px] border-b border-[rgba(16,32,58,0.14)]"
      style={{
        backgroundColor: 'rgba(248, 250, 253, 0.82)',
        backdropFilter: 'blur(14px)',
        WebkitBackdropFilter: 'blur(14px)',
        paddingTop: 'env(safe-area-inset-top, 0px)',
      }}
    >
      <div className="max-w-[1400px] mx-auto h-full px-4 sm:px-8 lg:px-12 xl:px-16 flex items-center justify-between">
        {/* Left: Academy Logo */}
        <a
          href="#"
          className="flex items-center gap-2 group transition-opacity hover:opacity-90"
          aria-label="Rhythmic Beat Dance Court Home"
        >
          <img
            src={logoImg}
            alt={data.logoAlt}
            className="h-[34px] w-auto object-contain"
            decoding="async"
            width={120}
            height={34}
          />
        </a>

        {/* Desktop Navigation (>= 820px) */}
        <nav className="hidden min-[820px]:flex items-center gap-7 lg:gap-9" aria-label="Main Navigation">
          {data.links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-[10.5px] font-semibold text-[#10203A] tracking-[0.14em] uppercase transition-colors duration-150 hover:text-[#F28C1E] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1E5BB8] rounded-sm"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Right: Filled Navy Pill Button (Single filled button in the interface) */}
        <div className="hidden min-[820px]:flex items-center">
          <a
            href={data.trialCta.href}
            className="inline-flex items-center justify-center px-5 py-2 rounded-full text-[12px] font-medium tracking-[0.04em] bg-[#10203A] text-white hover:bg-[#1A3158] active:scale-[0.98] transition-all duration-150 shadow-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1E5BB8]"
          >
            {data.trialCta.label}
          </a>
        </div>

        {/* Mobile Menu Trigger (< 820px) */}
        <div className="flex min-[820px]:hidden items-center gap-3">
          <a
            href={data.trialCta.href}
            className="inline-flex items-center justify-center px-3.5 py-1.5 rounded-full text-[11px] font-medium bg-[#10203A] text-white"
          >
            Trial
          </a>
          <button
            type="button"
            onClick={toggleMobileMenu}
            aria-expanded={isMobileMenuOpen}
            aria-label="Toggle Navigation Menu"
            className="p-1.5 text-[#10203A] hover:text-[#F28C1E] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1E5BB8]"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              {isMobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M4 7h16M4 12h16M4 17h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Dropdown (< 820px) */}
      {isMobileMenuOpen && (
        <div
          className="min-[820px]:hidden w-full border-b border-[rgba(16,32,58,0.14)] bg-[#F8FAFD]/95 backdrop-blur-md px-6 py-6 transition-all duration-200"
          style={{ boxShadow: '0 10px 24px -6px rgba(16, 32, 58, 0.08)' }}
        >
          <div className="flex flex-col gap-4">
            {data.links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={closeMobileMenu}
                className="text-[12px] font-semibold text-[#10203A] tracking-[0.14em] uppercase py-2 border-b border-[rgba(16,32,58,0.06)] hover:text-[#F28C1E] transition-colors"
              >
                {link.label}
              </a>
            ))}
            <div className="pt-2">
              <a
                href={data.trialCta.href}
                onClick={closeMobileMenu}
                className="w-full inline-flex items-center justify-center py-2.5 rounded-full text-[13px] font-medium bg-[#10203A] text-white"
              >
                {data.trialCta.label}
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
