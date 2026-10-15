import { useState, useEffect } from 'react';
import logoImg from '../assets/logo.png';
import { navigationData } from '../data/navigation';

export const Navbar = ({
  data = navigationData,
  currentPath = typeof window !== 'undefined' ? window.location.pathname : '/',
  onNavigate,
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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

  // Check active state for a given nav link
  const isLinkActive = (href) => {
    if (href === '/') {
      return currentPath === '/' || currentPath === '';
    }
    if (href === '/contact-us') {
      return currentPath === '/contact-us' || currentPath === '/contact';
    }
    if (href === '/about-us') {
      return currentPath === '/about-us' || currentPath === '/about';
    }
    if (href === '/our-facilities') {
      return currentPath === '/our-facilities' || currentPath === '/facilities';
    }
    return currentPath === href || currentPath.startsWith(href);
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
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Nav link click handler
  const handleNavClick = (e, href) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);

    if (onNavigate) {
      onNavigate(href);
    } else {
      window.history.pushState(null, '', href);
      window.dispatchEvent(new PopStateEvent('popstate'));
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  const centerLinks = data.links.filter((link) => link.label !== 'Contact Us');
  const contactLink = data.links.find((link) => link.label === 'Contact Us') || {
    label: 'Contact Us',
    href: '/contact-us',
  };
  const isContactActive = isLinkActive(contactLink.href);

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 h-[80px] bg-transparent pointer-events-none flex items-center justify-center px-3 xs:px-4 sm:px-6 lg:px-8"
      style={{
        paddingTop: 'env(safe-area-inset-top, 0px)',
      }}
    >
      <div className="w-full max-w-[1360px] pointer-events-auto">
        {/* Single Unified Rounded Navigation Pill Container */}
        <nav
          className="w-full flex items-center justify-between bg-white rounded-full px-4 sm:px-5 md:px-6 py-2 sm:py-2.5 border border-[#ECE7DC] shadow-[0_4px_20px_-2px_rgba(0,0,0,0.08),0_1px_3px_rgba(0,0,0,0.03)] transition-shadow duration-200 hover:shadow-[0_6px_24px_-2px_rgba(0,0,0,0.12),0_2px_4px_rgba(0,0,0,0.03)]"
          aria-label="Main Navigation"
        >
          {/* Left: Logo inside the pill container */}
          <div className="flex items-center shrink-0">
            <a
              href="/"
              onClick={handleLogoClick}
              className="inline-flex items-center group transition-opacity hover:opacity-85 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/20 rounded-md py-0.5"
              aria-label="Rhythmic Beat Dance Court Home"
            >
              <img
                src={logoImg}
                alt={data.logoAlt || 'Rhythmic Beat Dance Court Logo'}
                className="h-[28px] xs:h-[32px] sm:h-[36px] md:h-[40px] w-auto max-w-[125px] xs:max-w-none object-contain transition-transform duration-200 group-hover:scale-[1.02]"
                decoding="async"
                width={130}
                height={40}
              />
            </a>
          </div>

          {/* Center: Centered Navigation Links (Desktop >= 1040px) */}
          <div className="hidden min-[1040px]:flex items-center justify-center gap-1.5 md:gap-2.5 xl:gap-4 flex-1 px-3">
            {centerLinks.map((link) => {
              const isActive = isLinkActive(link.href);
              return (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className={`text-[12.5px] xl:text-[13.5px] tracking-normal transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/20 rounded-full px-2.5 py-1 whitespace-nowrap ${
                    isActive
                      ? 'font-semibold text-[#18181B]'
                      : 'font-medium text-[#71717A] hover:text-[#18181B]'
                  }`}
                >
                  {link.label}
                </a>
              );
            })}
          </div>

          {/* Right: Contact Us Button inside the pill (Desktop >= 1040px) */}
          <div className="hidden min-[1040px]:flex items-center shrink-0">
            <a
              href={contactLink.href}
              onClick={(e) => handleNavClick(e, contactLink.href)}
              className={`text-[12.5px] xl:text-[13px] px-4 xl:px-5 py-2 rounded-full transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/20 cursor-pointer whitespace-nowrap ${
                isContactActive
                  ? 'bg-[#F28C1E] text-white font-semibold shadow-xs'
                  : 'bg-[#18181B] text-white hover:bg-black font-medium shadow-xs hover:scale-[1.02] active:scale-[0.98]'
              }`}
            >
              {contactLink.label}
            </a>
          </div>

          {/* Mobile / Tablet Controls (< 1040px): Contact Button + Hamburger inside the pill */}
          <div className="flex min-[1040px]:hidden items-center gap-1.5 xs:gap-2 shrink-0">
            <a
              href={contactLink.href}
              onClick={(e) => handleNavClick(e, contactLink.href)}
              className={`text-[11px] xs:text-[12px] px-3 xs:px-3.5 py-1.5 rounded-full transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/20 cursor-pointer whitespace-nowrap ${
                isContactActive
                  ? 'bg-[#F28C1E] text-white font-semibold'
                  : 'bg-[#18181B] text-white hover:bg-black font-medium'
              }`}
            >
              Contact Us
            </a>
            <button
              type="button"
              onClick={toggleMobileMenu}
              aria-expanded={isMobileMenuOpen}
              aria-label="Toggle Navigation Menu"
              className="p-1.5 xs:p-2 rounded-full text-[#18181B] hover:bg-black/[0.05] active:bg-black/[0.08] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/20 cursor-pointer shrink-0"
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
        </nav>

        {/* Mobile Dropdown Menu (< 1040px) */}
        {isMobileMenuOpen && (
          <div className="min-[1040px]:hidden max-w-[480px] mx-auto px-2 pt-2 pointer-events-auto">
            <div className="w-full rounded-3xl border border-[#ECE7DC] bg-[#FAF7EE]/98 backdrop-blur-xl px-5 sm:px-6 py-5 transition-all duration-200 animate-in fade-in slide-in-from-top-2 shadow-2xl">
              <div className="flex flex-col gap-3">
                {/* Mobile Pill-styled Navigation Card */}
                <div className="bg-white rounded-2xl p-2.5 border border-[#ECE7DC] shadow-sm flex flex-col divide-y divide-[#F2EFE8]">
                  {data.links.map((link) => {
                    const isActive = isLinkActive(link.href);
                    const isContact = link.label === 'Contact Us';
                    return (
                      <a
                        key={link.label}
                        href={link.href}
                        onClick={(e) => handleNavClick(e, link.href)}
                        className={`text-[13.5px] px-3 py-2.5 rounded-lg transition-colors flex items-center justify-between ${
                          isActive
                            ? isContact
                              ? 'font-semibold text-white bg-[#18181B]'
                              : 'font-semibold text-[#18181B] bg-[#FAF7EE]'
                            : isContact
                            ? 'font-semibold text-[#18181B] hover:bg-black/[0.04]'
                            : 'font-medium text-[#71717A] hover:text-[#18181B] hover:bg-black/[0.02]'
                        }`}
                      >
                        <span>{link.label}</span>
                        {isActive && (
                          <span
                            className={`w-1.5 h-1.5 rounded-full ${
                              isContact ? 'bg-[#F28C1E]' : 'bg-[#18181B]'
                            }`}
                          />
                        )}
                      </a>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
