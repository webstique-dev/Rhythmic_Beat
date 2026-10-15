import { useState, useEffect } from 'react';
import logoImg from '../assets/logo.png';
import { navigationData } from '../data/navigation';

export const Navbar = ({
  data = navigationData,
  currentPath = typeof window !== 'undefined' ? window.location.pathname : '/',
  onNavigate,
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState(() => data.links?.[0]?.label || '');

  // Format labels to match the clean, title-cased reference typography
  const formatLabel = (label) => {
    if (!label) return '';
    if (label !== label.toUpperCase()) return label;
    return label
      .split(' ')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');
  };

  // Close mobile menu on ESC key press
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Track scroll position for active section spy
  useEffect(() => {
    const handleScroll = () => {
      // On home page, detect visible section
      if (currentPath === '/' || currentPath === '') {
        if (!data.links || data.links.length === 0) return;
        const sections = data.links.map((l) => l.href.replace('#', ''));

        if (window.scrollY < 200) {
          setActiveLink(data.links[0]?.label || '');
          return;
        }

        const scrollPos = window.scrollY + 260;
        for (let i = sections.length - 1; i >= 0; i--) {
          const id = sections[i];
          const el = document.getElementById(id);

          if (el && el.offsetTop <= scrollPos) {
            setActiveLink(data.links[i].label);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [data.links, currentPath]);

  // Navigate to Contact Us page
  const handleContactClick = (e) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    if (onNavigate) {
      onNavigate('/contact');
    } else {
      window.history.pushState(null, '', '/contact');
      window.dispatchEvent(new PopStateEvent('popstate'));
    }
  };

  // Navigate to Logo / Home
  const handleLogoClick = (e) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    if (onNavigate) {
      onNavigate('/');
    } else {
      window.history.pushState(null, '', '/');
      window.dispatchEvent(new PopStateEvent('popstate'));
    }
  };

  // Smooth scroll handler preserving all navigation functionality
  const handleNavClick = (e, href, label) => {
    if (label) setActiveLink(label);
    setIsMobileMenuOpen(false);

    const isContactPage =
      currentPath === '/contact' ||
      (typeof window !== 'undefined' && window.location.pathname === '/contact');

    // If currently on Contact page, navigate back to home with the hash
    if (isContactPage) {
      e.preventDefault();
      const targetHash = href.startsWith('#') ? href : `#${href}`;
      if (onNavigate) {
        onNavigate(`/${targetHash}`);
      } else {
        window.history.pushState(null, '', `/${targetHash}`);
        window.dispatchEvent(new PopStateEvent('popstate'));
      }
      return;
    }

    // On Home page, smoothly scroll to the section
    if (href && href.startsWith('#')) {
      const targetId = href.slice(1);
      const targetElement = document.getElementById(targetId);

      if (targetElement) {
        e.preventDefault();
        targetElement.scrollIntoView({ behavior: 'smooth' });
        window.history.pushState(null, '', href);
      }
    }
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  const isContactActive = currentPath === '/contact';

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 h-[80px] bg-transparent pointer-events-none"
      style={{
        paddingTop: 'env(safe-area-inset-top, 0px)',
      }}
    >
      <div className="max-w-[1440px] mx-auto h-full px-3 xs:px-4 sm:px-8 lg:px-12 flex items-center justify-between">
        {/* Left Column: Logo (transparent background) */}
        <div className="flex-1 flex items-center justify-start pointer-events-auto min-w-0">
          <a
            href="/"
            onClick={handleLogoClick}
            className="inline-flex items-center group transition-opacity hover:opacity-85 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/20 rounded-md"
            aria-label="Rhythmic Beat Dance Court Home"
          >
            <img
              src={logoImg}
              alt={data.logoAlt || 'Rhythmic Beat Dance Court Logo'}
              className="h-[30px] xs:h-[36px] sm:h-[42px] md:h-[46px] w-auto max-w-[125px] xs:max-w-none object-contain transition-transform duration-200 group-hover:scale-[1.02]"
              decoding="async"
              width={150}
              height={46}
            />
          </a>
        </div>

        {/* Center Column: Rounded Navigation Pill (Desktop >= 1040px) */}
        <div className="hidden min-[1040px]:flex flex-shrink-0 items-center justify-center pointer-events-auto">
          <nav
            className="flex items-center bg-white rounded-full px-7 py-2.5 border border-[#ECE7DC] shadow-[0_4px_20px_-2px_rgba(0,0,0,0.08),0_1px_3px_rgba(0,0,0,0.03)] transition-shadow duration-200 hover:shadow-[0_6px_24px_-2px_rgba(0,0,0,0.12),0_2px_4px_rgba(0,0,0,0.03)]"
            aria-label="Main Navigation"
          >
            {/* Pill Navigation Links */}
            <div className="flex items-center gap-6 xl:gap-8">
              {data.links.map((link) => {
                const isActive = !isContactActive && activeLink === link.label;
                return (
                  <a
                    key={link.label}
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href, link.label)}
                    className={`text-[13px] xl:text-[13.5px] tracking-normal transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/20 rounded-full px-1 ${
                      isActive
                        ? 'font-semibold text-[#18181B]'
                        : 'font-medium text-[#71717A] hover:text-[#18181B]'
                    }`}
                  >
                    {formatLabel(link.label)}
                  </a>
                );
              })}
            </div>
          </nav>
        </div>

        {/* Right Column: Contact Us Button (Desktop >= 1040px) */}
        <div className="hidden min-[1040px]:flex flex-1 items-center justify-end pointer-events-auto">
          <a
            href="/contact"
            onClick={handleContactClick}
            className={`inline-flex items-center justify-center px-5 py-2 rounded-full text-[13px] font-medium tracking-normal transition-all duration-150 shadow-[0_2px_8px_rgba(24,24,27,0.25)] hover:shadow-[0_4px_12px_rgba(24,24,27,0.35)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/40 cursor-pointer ${
              isContactActive
                ? 'bg-[#F28C1E] text-white hover:bg-[#d97b15]'
                : 'bg-[#18181B] text-white hover:bg-black active:scale-[0.98]'
            }`}
          >
            Contact Us
          </a>
        </div>

        {/* Mobile / Tablet Controls (< 1040px) */}
        <div className="flex min-[1040px]:hidden items-center gap-1.5 xs:gap-2.5 pointer-events-auto shrink-0">
          <a
            href="/contact"
            onClick={handleContactClick}
            className="inline-flex items-center justify-center px-3 py-1.5 xs:px-4 xs:py-2 rounded-full text-[11px] xs:text-[12px] font-medium bg-[#18181B] text-white hover:bg-black active:scale-[0.98] transition-all shadow-[0_2px_6px_rgba(24,24,27,0.2)] whitespace-nowrap"
          >
            Contact Us
          </a>
          <button
            type="button"
            onClick={toggleMobileMenu}
            aria-expanded={isMobileMenuOpen}
            aria-label="Toggle Navigation Menu"
            className="p-2 xs:p-2.5 rounded-full text-[#18181B] bg-white border border-[#ECE7DC] hover:bg-white active:bg-white/80 transition-colors shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/20 cursor-pointer shrink-0"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              {isMobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu (< 1040px) */}
      {isMobileMenuOpen && (
        <div className="min-[1040px]:hidden max-w-[480px] mx-auto px-4 pt-2 pointer-events-auto">
          <div
            className="w-full rounded-3xl border border-[#ECE7DC] bg-[#FAF7EE]/98 backdrop-blur-xl px-5 sm:px-6 py-5 transition-all duration-200 animate-in fade-in slide-in-from-top-2 shadow-2xl"
          >
            <div className="flex flex-col gap-3">
              {/* Mobile Pill-styled Navigation Card */}
              <div className="bg-white rounded-2xl p-2.5 border border-[#ECE7DC] shadow-sm flex flex-col divide-y divide-[#F2EFE8]">
                {data.links.map((link) => {
                  const isActive = !isContactActive && activeLink === link.label;
                  return (
                    <a
                      key={link.label}
                      href={link.href}
                      onClick={(e) => handleNavClick(e, link.href, link.label)}
                      className={`text-[13.5px] px-3 py-2.5 rounded-lg transition-colors flex items-center justify-between ${
                        isActive
                          ? 'font-semibold text-[#18181B] bg-[#FAF7EE]'
                          : 'font-medium text-[#71717A] hover:text-[#18181B] hover:bg-black/[0.02]'
                      }`}
                    >
                      <span>{formatLabel(link.label)}</span>
                      {isActive && (
                        <span className="w-1.5 h-1.5 rounded-full bg-[#18181B]" />
                      )}
                    </a>
                  );
                })}
              </div>

              {/* Mobile Contact Button */}
              <div className="pt-1">
                <a
                  href="/contact"
                  onClick={handleContactClick}
                  className="w-full inline-flex items-center justify-center py-2.5 rounded-full text-[13.5px] font-medium bg-[#18181B] text-white hover:bg-black active:scale-[0.99] transition-all shadow-sm"
                >
                  Contact Us
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
