import { useState, useEffect, useRef } from 'react';
import { ChevronDown, ArrowRight } from 'lucide-react';
import logoImg from '../assets/logo.png';
import { navigationData } from '../data/navigation';
import { DISCIPLINES_LIST } from '../data/disciplines';

export const Navbar = ({
  data = navigationData,
  currentPath = typeof window !== 'undefined' ? window.location.pathname : '/',
  onNavigate,
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCoursesDropdownOpen, setIsCoursesDropdownOpen] = useState(false);
  const [isMobileCoursesOpen, setIsMobileCoursesOpen] = useState(false);
  const hoverTimeoutRef = useRef(null);

  // Close menus on ESC key press
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setIsMobileMenuOpen(false);
        setIsCoursesDropdownOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Close dropdowns on path change
  useEffect(() => {
    setIsCoursesDropdownOpen(false);
    setIsMobileMenuOpen(false);
  }, [currentPath]);

  // Clean up timeout on unmount
  useEffect(() => {
    return () => {
      if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
    };
  }, []);

  const handleCoursesMouseEnter = () => {
    if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
    setIsCoursesDropdownOpen(true);
  };

  const handleCoursesMouseLeave = () => {
    hoverTimeoutRef.current = setTimeout(() => {
      setIsCoursesDropdownOpen(false);
    }, 180);
  };

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
    if (href === '/courses') {
      return currentPath.startsWith('/courses') || currentPath.startsWith('/disciplines');
    }
    return currentPath === href || currentPath.startsWith(href);
  };

  // Navigate to Logo / Home
  const handleLogoClick = (e) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    setIsCoursesDropdownOpen(false);
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
    setIsCoursesDropdownOpen(false);

    if (onNavigate) {
      onNavigate(href);
    } else {
      window.history.pushState(null, '', href);
      window.dispatchEvent(new PopStateEvent('popstate'));
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleDisciplineClick = (e, discId) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    setIsCoursesDropdownOpen(false);
    const targetUrl = `/courses/${discId}`;
    if (onNavigate) {
      onNavigate(targetUrl);
    } else {
      window.history.pushState(null, '', targetUrl);
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
          className="w-full flex items-center justify-between bg-white rounded-full px-4 sm:px-5 md:px-6 py-2 sm:py-2.5 border border-[#F1F3F5] shadow-[0_4px_20px_-2px_rgba(34,34,34,0.08),0_1px_3px_rgba(34,34,34,0.03)] transition-shadow duration-200 hover:shadow-[0_6px_24px_-2px_rgba(34,34,34,0.12),0_2px_4px_rgba(34,34,34,0.03)]"
          aria-label="Main Navigation"
        >
          {/* Left: Logo inside the pill container */}
          <div className="flex items-center shrink-0">
            <a
              href="/"
              onClick={handleLogoClick}
              className="inline-flex items-center group transition-opacity hover:opacity-85 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#145A96]/30 rounded-md py-0.5"
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

          {/* Center: Centered Navigation Links with Disciplines Dropdown ON Courses (Desktop >= 1040px) */}
          <div className="hidden min-[1040px]:flex items-center justify-center gap-1.5 md:gap-2 lg:gap-3 xl:gap-4 flex-1 px-3">
            {centerLinks.map((link) => {
              const isActive = isLinkActive(link.href);
              const isCourses = link.label === 'Courses';

              if (isCourses) {
                return (
                  <div
                    key={link.label}
                    className="relative"
                    onMouseEnter={handleCoursesMouseEnter}
                    onMouseLeave={handleCoursesMouseLeave}
                  >
                    {/* Courses Link with Dropdown Chevron Indicator */}
                    <a
                      href="/courses"
                      onClick={(e) => handleNavClick(e, '/courses')}
                      onFocus={handleCoursesMouseEnter}
                      aria-expanded={isCoursesDropdownOpen}
                      aria-haspopup="true"
                      className={`inline-flex items-center gap-1 text-[12.5px] xl:text-[13.5px] tracking-normal transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#145A96]/30 rounded-full px-2.5 py-1 whitespace-nowrap cursor-pointer ${
                        isActive || isCoursesDropdownOpen
                          ? 'font-semibold text-[#145A96] bg-[#145A96]/5'
                          : 'font-medium text-[#222222]/70 hover:text-[#222222]'
                      }`}
                    >
                      <span>Courses</span>
                      <ChevronDown
                        className={`w-3.5 h-3.5 transition-transform duration-200 ${
                          isCoursesDropdownOpen ? 'rotate-180 text-[#145A96]' : 'text-[#222222]/50'
                        }`}
                      />
                    </a>

                    {/* Dropdown Floating Panel on Hover over Courses */}
                    {isCoursesDropdownOpen && (
                      <div
                        className="absolute top-full mt-2.5 -left-28 xl:-left-20 w-[640px] max-w-[94vw] z-50 animate-in fade-in slide-in-from-top-2 duration-150 pointer-events-auto"
                        onMouseEnter={handleCoursesMouseEnter}
                        onMouseLeave={handleCoursesMouseLeave}
                      >
                        <div className="bg-white/98 backdrop-blur-2xl rounded-3xl border border-[rgba(34,34,34,0.08)] shadow-[0_20px_50px_-8px_rgba(20,90,150,0.18),0_6px_20px_rgba(0,0,0,0.08)] p-4 sm:p-5">
                          {/* Dropdown Header Row */}
                          <div className="flex items-center justify-between pb-3 mb-3 border-b border-[rgba(34,34,34,0.06)]">
                            <div className="flex items-center gap-2">
                              <span className="w-2 h-2 rounded-full bg-[#F28C28]" />
                              <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#145A96]">
                                Academy Disciplines &amp; Tracks
                              </span>
                            </div>
                            <a
                              href="/courses"
                              onClick={(e) => {
                                e.preventDefault();
                                setIsCoursesDropdownOpen(false);
                                handleNavClick(e, '/courses');
                              }}
                              className="text-[11px] font-semibold text-[#F28C28] hover:text-[#145A96] transition-colors flex items-center gap-1 cursor-pointer"
                            >
                              <span>View All Courses &amp; Directory</span>
                              <ArrowRight className="w-3 h-3" />
                            </a>
                          </div>

                          {/* 2-Column Responsive Grid of All 8 Disciplines */}
                          <div className="grid grid-cols-2 gap-2">
                            {DISCIPLINES_LIST.map((disc) => (
                              <a
                                key={disc.id}
                                href={`/courses/${disc.id}`}
                                onClick={(e) => handleDisciplineClick(e, disc.id)}
                                className="group flex items-center gap-3 p-2.5 rounded-2xl hover:bg-[#F1F3F5] transition-all border border-transparent hover:border-[rgba(34,34,34,0.06)] cursor-pointer"
                              >
                                <div className="w-10 h-10 rounded-xl bg-[#145A96]/10 flex items-center justify-center p-1.5 shrink-0 group-hover:bg-[#145A96] transition-colors">
                                  <img
                                    src={disc.figure || disc.figurePng}
                                    alt={disc.name}
                                    className="w-full h-full object-contain filter group-hover:brightness-0 group-hover:invert transition-all"
                                  />
                                </div>
                                <div className="min-w-0 flex-1">
                                  <div className="flex items-center justify-between gap-1">
                                    <span className="text-xs sm:text-sm font-bold text-[#222222] group-hover:text-[#145A96] transition-colors truncate">
                                      {disc.name}
                                    </span>
                                    <ArrowRight className="w-3 h-3 text-[#222222]/30 group-hover:text-[#F28C28] group-hover:translate-x-0.5 transition-all shrink-0" />
                                  </div>
                                  <p className="text-[10.5px] text-[#222222]/60 truncate group-hover:text-[#222222]/80">
                                    {disc.tagline}
                                  </p>
                                </div>
                              </a>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              }

              return (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className={`text-[12.5px] xl:text-[13.5px] tracking-normal transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#145A96]/30 rounded-full px-2.5 py-1 whitespace-nowrap ${
                    isActive
                      ? 'font-semibold text-[#145A96]'
                      : 'font-medium text-[#222222]/70 hover:text-[#222222]'
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
              className={`text-[12.5px] xl:text-[13px] px-4 xl:px-5 py-2 rounded-full transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#145A96]/30 cursor-pointer whitespace-nowrap ${
                isContactActive
                  ? 'bg-[#F28C28] text-white font-semibold shadow-xs'
                  : 'bg-[#145A96] text-white hover:bg-[#145A96]/90 font-medium shadow-xs hover:scale-[1.02] active:scale-[0.98]'
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
              className={`text-[11px] xs:text-[12px] px-3 xs:px-3.5 py-1.5 rounded-full transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#145A96]/30 cursor-pointer whitespace-nowrap ${
                isContactActive
                  ? 'bg-[#F28C28] text-white font-semibold'
                  : 'bg-[#145A96] text-white hover:bg-[#145A96]/90 font-medium'
              }`}
            >
              Contact Us
            </a>
            <button
              type="button"
              onClick={toggleMobileMenu}
              aria-expanded={isMobileMenuOpen}
              aria-label="Toggle Navigation Menu"
              className="p-1.5 xs:p-2 rounded-full text-[#222222] hover:bg-[#222222]/5 active:bg-[#222222]/10 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#145A96]/30 cursor-pointer shrink-0"
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
            <div className="w-full rounded-3xl border border-[#F1F3F5] bg-white/98 backdrop-blur-xl px-4 sm:px-6 py-4 sm:py-5 transition-all duration-200 animate-in fade-in slide-in-from-top-2 shadow-2xl max-h-[82vh] overflow-y-auto">
              <div className="flex flex-col gap-3">
                {/* Mobile Pill-styled Navigation Card */}
                <div className="bg-[#F1F3F5] rounded-2xl p-2.5 border border-[#F1F3F5] shadow-sm flex flex-col divide-y divide-white/60">
                  {data.links.map((link) => {
                    const isActive = isLinkActive(link.href);
                    const isContact = link.label === 'Contact Us';
                    const isCourses = link.label === 'Courses';

                    return (
                      <div key={link.label} className="flex flex-col">
                        <div className="flex items-center justify-between">
                          <a
                            href={link.href}
                            onClick={(e) => handleNavClick(e, link.href)}
                            className={`flex-1 text-[13.5px] px-3 py-2.5 rounded-lg transition-colors flex items-center justify-between ${
                              isActive
                                ? isContact
                                  ? 'font-semibold text-white bg-[#145A96]'
                                  : 'font-semibold text-[#145A96] bg-white'
                                : isContact
                                ? 'font-semibold text-[#222222] hover:bg-white/60'
                                : 'font-medium text-[#222222]/70 hover:text-[#222222] hover:bg-white/40'
                            }`}
                          >
                            <span>{link.label}</span>
                            {isActive && !isCourses && (
                              <span
                                className={`w-1.5 h-1.5 rounded-full ${
                                  isContact ? 'bg-[#F28C28]' : 'bg-[#145A96]'
                                }`}
                              />
                            )}
                          </a>

                          {/* Mobile Courses Chevron Accordion Toggle */}
                          {isCourses && (
                            <button
                              type="button"
                              onClick={() => setIsMobileCoursesOpen((prev) => !prev)}
                              aria-label="Toggle Disciplines Submenu"
                              className="p-2 ml-1 text-[#145A96] hover:bg-white rounded-lg transition-colors cursor-pointer"
                            >
                              <ChevronDown
                                className={`w-4 h-4 transition-transform duration-200 ${
                                  isMobileCoursesOpen ? 'rotate-180 text-[#F28C28]' : ''
                                }`}
                              />
                            </button>
                          )}
                        </div>

                        {/* Expandable Disciplines Under Courses in Mobile Drawer */}
                        {isCourses && isMobileCoursesOpen && (
                          <div className="my-1.5 p-2 rounded-xl bg-white/90 border border-[rgba(34,34,34,0.06)] grid grid-cols-1 gap-1.5 animate-in fade-in duration-150">
                            <div className="px-2 py-1 flex items-center justify-between text-[11px] font-bold uppercase tracking-wider text-[#145A96] border-b border-[rgba(34,34,34,0.06)] pb-1.5 mb-1">
                              <span>Available Disciplines</span>
                              <span className="text-[10px] text-[#F28C28]">8 Tracks</span>
                            </div>

                            {DISCIPLINES_LIST.map((disc) => (
                              <a
                                key={disc.id}
                                href={`/courses/${disc.id}`}
                                onClick={(e) => handleDisciplineClick(e, disc.id)}
                                className="flex items-center gap-2.5 p-2 rounded-lg bg-[#F1F3F5]/80 hover:bg-[#F1F3F5] text-xs font-semibold text-[#222222] transition-colors"
                              >
                                <div className="w-7 h-7 rounded-md bg-[#145A96]/10 p-1 flex items-center justify-center shrink-0">
                                  <img
                                    src={disc.figure || disc.figurePng}
                                    alt={disc.name}
                                    className="w-full h-full object-contain"
                                  />
                                </div>
                                <div className="flex-1 min-w-0">
                                  <div className="truncate font-bold text-[#145A96]">{disc.name}</div>
                                  <div className="text-[10px] text-[#222222]/60 truncate">{disc.tagline}</div>
                                </div>
                                <ArrowRight className="w-3.5 h-3.5 text-[#222222]/40" />
                              </a>
                            ))}
                          </div>
                        )}
                      </div>
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

export default Navbar;
