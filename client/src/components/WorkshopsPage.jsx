import { useState, useMemo, useRef } from 'react';
import {
  Calendar,
  Clock,
  MapPin,
  Search,
  Filter,
  ArrowRight,
  ArrowUpRight,
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  SlidersHorizontal,
  X,
  Music,
  Check,
  Ticket,
  Users,
  CalendarCheck,
  Flame,
} from 'lucide-react';
import { workshopsData } from '../data/workshops';
import { WorkshopEnquiryModal } from './WorkshopEnquiryModal';
import { DisciplineWatermark } from './DisciplineWatermark';

// Fanned posters for Hero
import soundHealingPoster from '../assets/workshops/poster-sound-healing.png';
import sujithPoster from '../assets/workshops/poster-sujith.png';
import pavithraPoster from '../assets/workshops/poster-pavithra.png';

// Instructor Avatars for sidebar
import avatarGuest from '../assets/workshops/avatar-guest.png';
import avatarSujith from '../assets/workshops/avatar-sujith.png';
import avatarPavithra from '../assets/workshops/avatar-pavithra.png';
import avatarIshwarya from '../assets/workshops/avatar-ishwarya.png';

export const WorkshopsPage = ({ onNavigate, onBookSlot, onSelectWorkshop }) => {
  // Calendar Strip State
  const [selectedCalendarDate, setSelectedCalendarDate] = useState(null); // '2026-10-17' | null
  const calendarScrollRef = useRef(null);

  // Filters State
  const [searchQuery, setSearchQuery] = useState('');
  const [whenFilter, setWhenFilter] = useState('All upcoming');
  const [typeFilter, setTypeFilter] = useState('All');
  const [instructorFilter, setInstructorFilter] = useState('All');
  const [timeOfDayFilter, setTimeOfDayFilter] = useState('All');
  const [priceFilter, setPriceFilter] = useState('All');
  const [sortBy, setSortBy] = useState('soonest');

  // Modal State
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedWorkshopForModal, setSelectedWorkshopForModal] = useState(null);
  const [modalMode, setModalMode] = useState('enquire'); // 'enquire' | 'book'

  // Calendar dates generation (Oct 16, 2026 to Nov 7, 2026)
  const calendarDays = useMemo(() => {
    const days = [];
    const startDate = new Date(2026, 9, 16); // Oct 16, 2026
    const dayNames = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
    const monthNames = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];

    for (let i = 0; i < 22; i++) {
      const d = new Date(startDate);
      d.setDate(startDate.getDate() + i);

      const year = d.getFullYear();
      const month = String(d.getMonth() + 1).padStart(2, '0');
      const dateNum = String(d.getDate()).padStart(2, '0');
      const dateString = `${year}-${month}-${dateNum}`;

      // Check if any workshop is on this date
      const hasWorkshop = workshopsData.some((w) => w.dateRaw === dateString);
      const isToday = i === 0;

      days.push({
        dateRaw: dateString,
        dayNumber: d.getDate(),
        dayName: isToday ? 'TODAY' : dayNames[d.getDay()],
        monthAbbr: monthNames[d.getMonth()],
        hasWorkshop,
        isToday,
      });
    }
    return days;
  }, []);

  const handleCalendarScroll = (direction) => {
    if (calendarScrollRef.current) {
      calendarScrollRef.current.scrollBy({
        left: direction === 'left' ? -240 : 240,
        behavior: 'smooth',
      });
    }
  };

  const handleDateClick = (dateRaw) => {
    if (selectedCalendarDate === dateRaw) {
      setSelectedCalendarDate(null);
    } else {
      setSelectedCalendarDate(dateRaw);
      setWhenFilter('All upcoming');
    }
  };

  // Filtered workshops
  const filteredWorkshops = useMemo(() => {
    let list = [...workshopsData];

    // Calendar date filter
    if (selectedCalendarDate) {
      list = list.filter((w) => w.dateRaw === selectedCalendarDate);
    }

    // Search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter((w) => {
        return (
          w.title.toLowerCase().includes(q) ||
          w.instructor.toLowerCase().includes(q) ||
          (w.song && w.song.toLowerCase().includes(q)) ||
          w.category.toLowerCase().includes(q)
        );
      });
    }

    // When filter
    if (whenFilter === 'This week') {
      list = list.filter((w) => w.dateRaw === '2026-10-17' || w.dateRaw === '2026-10-18');
    } else if (whenFilter === 'Next week') {
      list = list.filter((w) => w.dateRaw === '2026-10-25');
    } else if (whenFilter === 'This month') {
      list = list.filter((w) => w.dateRaw && w.dateRaw.startsWith('2026-10'));
    } else if (whenFilter === 'Next month') {
      list = list.filter((w) => w.dateRaw && w.dateRaw.startsWith('2026-11'));
    } else if (whenFilter === 'Past workshops') {
      list = list.filter((w) => w.status === 'Past');
    }

    // Type filter
    if (typeFilter !== 'All') {
      list = list.filter((w) => w.type === typeFilter || w.category === typeFilter);
    }

    // Instructor filter
    if (instructorFilter !== 'All') {
      list = list.filter((w) => w.instructor.toLowerCase().includes(instructorFilter.toLowerCase()));
    }

    // Time of day filter
    if (timeOfDayFilter !== 'All') {
      list = list.filter((w) => w.timeOfDay === timeOfDayFilter);
    }

    // Price filter
    if (priceFilter === 'under700') {
      list = list.filter((w) => (w.pricing?.earlyBird || w.pricing?.entry) <= 700);
    } else if (priceFilter === 'upto800') {
      list = list.filter((w) => (w.pricing?.earlyBird || w.pricing?.entry) <= 800);
    }

    // Sorting
    list.sort((a, b) => {
      if (sortBy === 'soonest') {
        return (a.dateRaw || '').localeCompare(b.dateRaw || '');
      }
      if (sortBy === 'price-low') {
        const pA = a.pricing?.earlyBird || a.pricing?.entry || 0;
        const pB = b.pricing?.earlyBird || b.pricing?.entry || 0;
        return pA - pB;
      }
      if (sortBy === 'price-high') {
        const pA = a.pricing?.earlyBird || a.pricing?.entry || 0;
        const pB = b.pricing?.earlyBird || b.pricing?.entry || 0;
        return pB - pA;
      }
      return 0;
    });

    return list;
  }, [
    selectedCalendarDate,
    searchQuery,
    whenFilter,
    typeFilter,
    instructorFilter,
    timeOfDayFilter,
    priceFilter,
    sortBy,
  ]);

  const handleCardClick = (id) => {
    if (onSelectWorkshop) {
      onSelectWorkshop(id);
    } else {
      onNavigate(`/workshops/${id}`);
    }
  };

  const handleOpenEnquiry = (e, workshop, mode = 'enquire') => {
    e.stopPropagation();
    setSelectedWorkshopForModal(workshop);
    setModalMode(mode);
    setModalOpen(true);
  };

  const resetAllFilters = () => {
    setSelectedCalendarDate(null);
    setSearchQuery('');
    setWhenFilter('All upcoming');
    setTypeFilter('All');
    setInstructorFilter('All');
    setTimeOfDayFilter('All');
    setPriceFilter('All');
    setSortBy('soonest');
  };

  return (
    <div
      id="workshops-page"
      className="min-h-screen w-full overflow-x-hidden min-w-0 bg-[#F4F5F7] text-[#111111] selection:bg-[#145A96]/20 selection:text-[#111111]"
    >
      {/* 1. Hero Section (Classic Deep Midnight Blue with Disciplines Watermarks & Luxury Calendar Deck) */}
      <section
        id="workshops-hero"
        className="relative w-full pt-24 xs:pt-28 sm:pt-32 pb-12 sm:pb-16 bg-gradient-to-br from-[#06172A] via-[#0B2C4E] to-[#124B82] text-white shadow-2xl overflow-hidden border-b border-[#145A96]/30"
      >
        {/* Ambient Theatrical Stage Glows */}
        <div className="absolute top-0 right-1/4 w-[480px] h-[480px] bg-[#F28C28]/12 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute -bottom-10 left-10 w-[500px] h-[500px] bg-[#145A96]/40 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.04)_0,transparent_70%)] pointer-events-none" />

        {/* Fine Geometric Grid Overlay for Classic Polish */}
        <div 
          className="absolute inset-0 opacity-[0.035] pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, #FFFFFF 1px, transparent 0)`,
            backgroundSize: '36px 36px'
          }}
        />

        {/* Discipline Watermarks in Background */}
        <DisciplineWatermark
          discipline="bharatanatyam"
          position="top-left"
          color="orange"
          opacity={0.075}
          size="clamp(280px, 32vw, 480px)"
          rotation={-6}
          className="-top-4 -left-6 sm:left-4 z-0 pointer-events-none"
        />
        <DisciplineWatermark
          discipline="westerndance"
          position="top-right"
          color="white"
          opacity={0.065}
          size="clamp(300px, 35vw, 520px)"
          rotation={12}
          className="top-6 -right-8 sm:right-6 z-0 pointer-events-none"
        />

        <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-10 relative z-10">
          {/* Top Row: Navigation Back to Home & Series Badge */}
          <div className="flex items-center justify-between mb-8 sm:mb-10 z-20 relative">
            <button
              type="button"
              onClick={() => onNavigate('/')}
              className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-white/90 hover:text-white transition-all bg-white/10 hover:bg-white/20 backdrop-blur-md px-4 py-2 rounded-full border border-white/20 shadow-sm cursor-pointer hover:-translate-x-0.5"
            >
              <ArrowLeft className="w-3.5 h-3.5 text-[#F28C28]" />
              <span>Back to Home</span>
            </button>

            <div className="flex items-center gap-2.5 text-xs font-semibold text-white/90 bg-black/40 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/15">
              <span className="w-2 h-2 rounded-full bg-[#F28C28] animate-pulse" />
              <span className="text-[#F28C28] font-black uppercase text-[10.5px] tracking-widest">
                CELEBRITY & MASTERCLASS SERIES
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center mb-10 sm:mb-14">
            {/* Left Column: Heading, Subtext & Stats */}
            <div className="lg:col-span-7 relative z-10">
              {/* Top Tagline */}
              <div className="flex items-center gap-2.5 mb-4 select-none">
                <span className="w-6 h-0.5 bg-[#F28C28] rounded-full inline-block" />
                <span className="text-xs sm:text-sm font-extrabold tracking-[0.2em] uppercase text-[#F28C28]">
                  LEARN FROM THE INDUSTRY BEST
                </span>
              </div>

              {/* Main Headline */}
              <h1 className="font-display font-black text-4xl xs:text-5xl sm:text-6xl lg:text-[4.2rem] text-white tracking-tight leading-[1.04] mb-5">
                WORKSHOPS <br className="hidden sm:inline" />
                <span className="bg-gradient-to-r from-[#F28C28] via-[#FFB36D] to-[#F28C28] bg-clip-text text-transparent">
                  AT RB DANCE COURT
                </span>
              </h1>

              {/* Subtitle */}
              <p className="text-sm sm:text-base lg:text-[1.05rem] text-white/85 max-w-xl leading-relaxed mb-8 font-normal">
                Celebrity choreographers, guest master mentors, and wellness facilitators. Explore our curated calendar, filter by dance discipline, and reserve your stage slot online.
              </p>

              {/* 3 Classic Glassmorphic Stat Cards */}
              <div className="grid grid-cols-3 gap-3 sm:gap-4 max-w-lg">
                <div className="group bg-white/[0.08] hover:bg-white/[0.14] backdrop-blur-xl rounded-2xl p-3.5 sm:p-4 border border-white/20 hover:border-[#F28C28]/60 text-left shadow-lg transition-all duration-300">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="font-display font-black text-2xl sm:text-3xl text-white block leading-none">
                      4
                    </span>
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  </div>
                  <span className="text-[11px] sm:text-xs text-white/90 font-bold leading-tight block">
                    Open for booking
                  </span>
                  <span className="text-[9.5px] text-[#F28C28] font-semibold block mt-0.5">
                    Live Passes
                  </span>
                </div>

                <div className="group bg-white/[0.08] hover:bg-white/[0.14] backdrop-blur-xl rounded-2xl p-3.5 sm:p-4 border border-white/20 hover:border-[#F28C28]/60 text-left shadow-lg transition-all duration-300">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="font-display font-black text-2xl sm:text-3xl text-white block leading-none">
                      4
                    </span>
                    <Sparkles className="w-3.5 h-3.5 text-[#F28C28]" />
                  </div>
                  <span className="text-[11px] sm:text-xs text-white/90 font-bold leading-tight block">
                    Guest artists
                  </span>
                  <span className="text-[9.5px] text-white/60 font-semibold block mt-0.5">
                    Industry Mentors
                  </span>
                </div>

                <div className="group bg-white/[0.08] hover:bg-white/[0.14] backdrop-blur-xl rounded-2xl p-3.5 sm:p-4 border border-white/20 hover:border-[#F28C28]/60 text-left shadow-lg transition-all duration-300">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="font-display font-black text-2xl sm:text-3xl text-white block leading-none">
                      ₹699
                    </span>
                    <Ticket className="w-3.5 h-3.5 text-[#F28C28]" />
                  </div>
                  <span className="text-[11px] sm:text-xs text-white/90 font-bold leading-tight block">
                    Early bird from
                  </span>
                  <span className="text-[9.5px] text-emerald-400 font-semibold block mt-0.5">
                    Limited Slots
                  </span>
                </div>
              </div>
            </div>

            {/* Right Column: 3 Fanned Dynamic Posters */}
            <div className="lg:col-span-5 flex items-center justify-center pt-6 lg:pt-0 relative z-10">
              {/* Golden Stage Spotlight behind posters */}
              <div className="absolute w-[300px] h-[300px] bg-[#F28C28]/25 rounded-full blur-[80px] pointer-events-none" />

              <div className="relative w-full max-w-[390px] h-[320px] sm:h-[360px] flex items-center justify-center select-none">
                {/* Poster 1 (Left - Sound Healing, -10deg tilt) */}
                <div
                  onClick={() => handleCardClick('sound-healing-workshop')}
                  className="absolute left-3 sm:left-5 w-[175px] sm:w-[200px] rounded-2xl overflow-hidden shadow-[0_20px_40px_rgba(0,0,0,0.4)] border-2 border-white/30 -rotate-[10deg] -translate-y-2 hover:-rotate-[13deg] hover:-translate-y-5 hover:z-30 transition-all duration-300 cursor-pointer group bg-black/40"
                >
                  <img
                    src={soundHealingPoster}
                    alt="Sound Healing Workshop"
                    className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3">
                    <span className="text-[11px] font-bold text-white bg-[#F28C28] px-2.5 py-1 rounded-full shadow-md">
                      View Oct 17
                    </span>
                  </div>
                </div>

                {/* Poster 2 (Center - Sujith, 0deg) */}
                <div
                  onClick={() => handleCardClick('choreography-workshop-sujith')}
                  className="relative z-20 w-[185px] sm:w-[215px] rounded-2xl overflow-hidden shadow-[0_24px_50px_rgba(0,0,0,0.5)] border-2 border-white/50 hover:scale-106 hover:z-40 transition-all duration-300 cursor-pointer group bg-black/40"
                >
                  <img
                    src={sujithPoster}
                    alt="Choreography with Sujith"
                    className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3">
                    <span className="text-[11px] font-bold text-white bg-[#F28C28] px-2.5 py-1 rounded-full shadow-md">
                      View Oct 18
                    </span>
                  </div>
                </div>

                {/* Poster 3 (Right - Pavithra, +10deg tilt) */}
                <div
                  onClick={() => handleCardClick('choreography-workshop-pavithra')}
                  className="absolute right-3 sm:right-5 w-[175px] sm:w-[200px] rounded-2xl overflow-hidden shadow-[0_20px_40px_rgba(0,0,0,0.4)] border-2 border-white/30 rotate-[10deg] -translate-y-2 hover:rotate-[13deg] hover:-translate-y-5 hover:z-30 transition-all duration-300 cursor-pointer group bg-black/40"
                >
                  <img
                    src={pavithraPoster}
                    alt="Choreography with Pavithra"
                    className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3">
                    <span className="text-[11px] font-bold text-white bg-[#F28C28] px-2.5 py-1 rounded-full shadow-md">
                      View Oct 25
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Calendar Strip: Luxury Date Scheduler Deck */}
          <div className="rounded-3xl bg-[#061D3B]/90 backdrop-blur-2xl border border-white/20 p-5 sm:p-6 shadow-[0_20px_50px_rgba(0,0,0,0.35)] relative z-20">
            <div className="flex flex-wrap items-center justify-between gap-3 mb-4 select-none pb-3 border-b border-white/10">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#F28C28] to-[#D97415] flex items-center justify-center shadow-md">
                  <Calendar className="w-4 h-4 text-white" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs sm:text-sm font-black uppercase tracking-wider text-white">
                      SCHEDULE EXPLORER
                    </span>
                    <span className="text-[10px] font-bold text-white/50 tracking-wider">
                      • PICK A DATE
                    </span>
                  </div>
                  <p className="text-[10.5px] text-white/60 font-medium">
                    Select any highlighted date to filter upcoming masterclasses
                  </p>
                </div>
                {selectedCalendarDate && (
                  <button
                    type="button"
                    onClick={() => setSelectedCalendarDate(null)}
                    className="inline-flex items-center gap-1 text-[11px] font-bold text-[#F28C28] hover:text-white bg-white/10 hover:bg-white/20 px-3 py-1 rounded-full border border-white/15 ml-2 cursor-pointer transition-colors"
                  >
                    <X className="w-3 h-3" />
                    <span>Clear Filter</span>
                  </button>
                )}
              </div>

              <div className="flex items-center gap-4 text-xs font-semibold text-white/80">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10">
                  <span className="w-2 h-2 rounded-full bg-[#F28C28] animate-pulse" />
                  <span className="text-white/90 font-bold">Workshop day</span>
                </span>

                {/* Left / Right Scroll Arrows */}
                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={() => handleCalendarScroll('left')}
                    aria-label="Scroll dates left"
                    className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/25 border border-white/15 flex items-center justify-center text-white transition-all cursor-pointer active:scale-95 shadow-sm"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleCalendarScroll('right')}
                    aria-label="Scroll dates right"
                    className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/25 border border-white/15 flex items-center justify-center text-white transition-all cursor-pointer active:scale-95 shadow-sm"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Horizontal Scrollable Calendar Strip */}
            <div
              ref={calendarScrollRef}
              className="flex items-center gap-3 overflow-x-auto pb-1 no-scrollbar select-none scroll-smooth pt-1"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {calendarDays.map((day) => {
                const isSelected = selectedCalendarDate === day.dateRaw;
                return (
                  <button
                    key={day.dateRaw}
                    type="button"
                    onClick={() => handleDateClick(day.dateRaw)}
                    className={`shrink-0 w-16 sm:w-18 h-22 sm:h-24 rounded-2xl flex flex-col items-center justify-between py-2.5 px-1.5 transition-all cursor-pointer relative group ${
                      isSelected
                        ? 'bg-gradient-to-b from-white to-[#F1F5F9] text-[#0A2E54] shadow-[0_12px_28px_rgba(0,0,0,0.35)] scale-105 border-2 border-[#F28C28] z-10'
                        : day.hasWorkshop
                        ? 'bg-white/[0.12] hover:bg-white/[0.20] text-white border border-[#F28C28]/50 hover:border-[#F28C28] shadow-sm'
                        : 'bg-white/[0.06] hover:bg-white/[0.12] text-white/90 border border-white/10 hover:border-white/25'
                    }`}
                  >
                    {/* Day name (TODAY / SAT / SUN ...) */}
                    <span
                      className={`text-[9.5px] sm:text-[10px] font-extrabold tracking-wider uppercase ${
                        isSelected ? 'text-[#145A96]' : day.hasWorkshop ? 'text-[#F28C28]' : 'text-white/70'
                      }`}
                    >
                      {day.dayName}
                    </span>

                    {/* Date Number */}
                    <span
                      className={`font-display font-black text-xl sm:text-2xl leading-none my-0.5 ${
                        isSelected ? 'text-[#0A2E54]' : 'text-white'
                      }`}
                    >
                      {day.dayNumber}
                    </span>

                    {/* Month and Indicator Dot */}
                    <div className="flex flex-col items-center">
                      <span
                        className={`text-[9.5px] font-bold tracking-wider uppercase ${
                          isSelected ? 'text-[#0A2E54]/70' : 'text-white/60'
                        }`}
                      >
                        {day.monthAbbr}
                      </span>
                      {day.hasWorkshop && (
                        <div className="relative mt-1">
                          <span className="w-2 h-2 rounded-full bg-[#F28C28] block" />
                          <span className="absolute inset-0 w-2 h-2 rounded-full bg-[#F28C28] animate-ping opacity-75" />
                        </div>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* 2. Main Workshop Catalog Layout (Classic Backdrop with Disciplines Watermarks, Sidebar & Cards Grid) */}
      <section className="relative w-full bg-gradient-to-b from-[#F4F6F9] via-[#F8FAFC] to-[#F1F4F8] py-12 sm:py-16 overflow-hidden border-t border-slate-200/60">
        {/* Subtle Discipline Watermarks in Catalog Background */}
        <DisciplineWatermark
          discipline="aerialyoga"
          position="top-right"
          color="blue"
          opacity={0.035}
          size="clamp(260px, 30vw, 440px)"
          rotation={-8}
          className="top-10 -right-8 pointer-events-none"
        />
        <DisciplineWatermark
          discipline="kalaripayattu"
          position="bottom-left"
          color="orange"
          opacity={0.03}
          size="clamp(280px, 32vw, 460px)"
          rotation={6}
          className="bottom-10 -left-10 pointer-events-none"
        />

        <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-10 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Column: Filter Sidebar (lg:col-span-3) */}
            <aside className="lg:col-span-3 bg-white/95 backdrop-blur-md rounded-3xl p-5 sm:p-6 border border-slate-200/90 shadow-sm space-y-6">
              {/* Header: Filters + Reset */}
              <div className="flex items-center justify-between pb-3.5 border-b border-slate-100">
                <div className="flex items-center gap-2 text-sm font-black text-[#0A2E54] tracking-wide">
                  <Filter className="w-4 h-4 text-[#F28C28]" />
                  <span>Filters</span>
                </div>
                <button
                  type="button"
                  onClick={resetAllFilters}
                  className="text-[11.5px] font-bold text-[#F28C28] hover:text-[#D97415] transition-colors cursor-pointer"
                >
                  Reset all
                </button>
              </div>

              {/* Search Input */}
              <div className="relative">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Instructor, song, style..."
                  className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-medium text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#145A96] focus:bg-white focus:border-transparent transition-all"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              {/* WHEN Filter */}
              <div>
                <span className="text-[11px] font-extrabold text-[#0A2E54]/70 uppercase tracking-wider block mb-2.5">
                  WHEN
                </span>
                <div className="space-y-1.5 text-xs">
                  {[
                    { label: 'All upcoming', count: 4 },
                    { label: 'This week', count: 2 },
                    { label: 'Next week', count: 1 },
                    { label: 'This month', count: 3 },
                    { label: 'Next month', count: 1 },
                    { label: 'Past workshops', count: 0 },
                  ].map((item) => (
                    <label
                      key={item.label}
                      className="flex items-center justify-between py-1.5 px-2 rounded-xl hover:bg-slate-50 cursor-pointer text-slate-700 font-medium transition-colors"
                    >
                      <div className="flex items-center gap-2.5">
                        <input
                          type="radio"
                          name="whenFilter"
                          checked={whenFilter === item.label}
                          onChange={() => setWhenFilter(item.label)}
                          className="w-3.5 h-3.5 text-[#145A96] focus:ring-[#145A96]"
                        />
                        <span className={whenFilter === item.label ? 'font-bold text-[#0A2E54]' : ''}>
                          {item.label}
                        </span>
                      </div>
                      <span className="text-[11px] text-slate-400 font-bold">{item.count}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* WORKSHOP TYPE Filter */}
              <div className="pt-3.5 border-t border-slate-100">
                <span className="text-[11px] font-extrabold text-[#0A2E54]/70 uppercase tracking-wider block mb-2.5">
                  WORKSHOP TYPE
                </span>
                <div className="space-y-1.5 text-xs">
                  {[
                    { label: 'Wellness', count: 1 },
                    { label: 'Choreography', count: 3 },
                  ].map((item) => (
                    <label
                      key={item.label}
                      className="flex items-center justify-between py-1.5 px-2 rounded-xl hover:bg-slate-50 cursor-pointer text-slate-700 font-medium transition-colors"
                    >
                      <div className="flex items-center gap-2.5">
                        <input
                          type="checkbox"
                          checked={typeFilter === item.label}
                          onChange={() =>
                            setTypeFilter((prev) => (prev === item.label ? 'All' : item.label))
                          }
                          className="w-3.5 h-3.5 rounded text-[#145A96] focus:ring-[#145A96]"
                        />
                        <span className={typeFilter === item.label ? 'font-bold text-[#0A2E54]' : ''}>
                          {item.label}
                        </span>
                      </div>
                      <span className="text-[11px] text-slate-400 font-bold">{item.count}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* INSTRUCTOR Filter with Circular Avatars */}
              <div className="pt-3.5 border-t border-slate-100">
                <span className="text-[11px] font-extrabold text-[#0A2E54]/70 uppercase tracking-wider block mb-2.5">
                  INSTRUCTOR
                </span>
                <div className="space-y-2 text-xs">
                  {[
                    { name: 'Guest facilitators', count: 1, avatar: avatarGuest },
                    { name: 'Sujith', count: 1, avatar: avatarSujith },
                    { name: 'Pavithra', count: 1, avatar: avatarPavithra },
                    { name: 'Ishwarya', count: 1, avatar: avatarIshwarya },
                  ].map((item) => (
                    <label
                      key={item.name}
                      className="flex items-center justify-between py-1.5 px-2 rounded-xl hover:bg-slate-50 cursor-pointer text-slate-700 font-medium transition-colors"
                    >
                      <div className="flex items-center gap-2.5">
                        <input
                          type="checkbox"
                          checked={instructorFilter === item.name}
                          onChange={() =>
                            setInstructorFilter((prev) => (prev === item.name ? 'All' : item.name))
                          }
                          className="w-3.5 h-3.5 rounded text-[#145A96] focus:ring-[#145A96]"
                        />
                        <img
                          src={item.avatar}
                          alt={item.name}
                          className="w-5 h-5 rounded-full object-cover border border-slate-200 shrink-0"
                        />
                        <span className={instructorFilter === item.name ? 'font-bold text-[#0A2E54]' : ''}>
                          {item.name}
                        </span>
                      </div>
                      <span className="text-[11px] text-slate-400 font-bold">{item.count}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* TIME OF DAY Filter */}
              <div className="pt-3.5 border-t border-slate-100">
                <span className="text-[11px] font-extrabold text-[#0A2E54]/70 uppercase tracking-wider block mb-2.5">
                  TIME OF DAY
                </span>
                <div className="space-y-1.5 text-xs">
                  {[
                    { label: 'Morning', count: 2 },
                    { label: 'Afternoon', count: 2 },
                    { label: 'Evening', count: 0 },
                  ].map((item) => (
                    <label
                      key={item.label}
                      className="flex items-center justify-between py-1.5 px-2 rounded-xl hover:bg-slate-50 cursor-pointer text-slate-700 font-medium transition-colors"
                    >
                      <div className="flex items-center gap-2.5">
                        <input
                          type="checkbox"
                          checked={timeOfDayFilter === item.label}
                          onChange={() =>
                            setTimeOfDayFilter((prev) => (prev === item.label ? 'All' : item.label))
                          }
                          className="w-3.5 h-3.5 rounded text-[#145A96] focus:ring-[#145A96]"
                        />
                        <span className={timeOfDayFilter === item.label ? 'font-bold text-[#0A2E54]' : ''}>
                          {item.label}
                        </span>
                      </div>
                      <span className="text-[11px] text-slate-400 font-bold">{item.count}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* PRICE Filter */}
              <div className="pt-3.5 border-t border-slate-100">
                <span className="text-[11px] font-extrabold text-[#0A2E54]/70 uppercase tracking-wider block mb-2.5">
                  PRICE
                </span>
                <div className="space-y-1.5 text-xs">
                  {[
                    { key: 'under700', label: 'Early bird under ₹700', count: 3 },
                    { key: 'upto800', label: 'Up to ₹800', count: 4 },
                  ].map((item) => (
                    <label
                      key={item.key}
                      className="flex items-center justify-between py-1.5 px-2 rounded-xl hover:bg-slate-50 cursor-pointer text-slate-700 font-medium transition-colors"
                    >
                      <div className="flex items-center gap-2.5">
                        <input
                          type="checkbox"
                          checked={priceFilter === item.key}
                          onChange={() =>
                            setPriceFilter((prev) => (prev === item.key ? 'All' : item.key))
                          }
                          className="w-3.5 h-3.5 rounded text-[#145A96] focus:ring-[#145A96]"
                        />
                        <span className={priceFilter === item.key ? 'font-bold text-[#0A2E54]' : ''}>
                          {item.label}
                        </span>
                      </div>
                      <span className="text-[11px] text-slate-400 font-bold">{item.count}</span>
                    </label>
                  ))}
                </div>
              </div>
            </aside>

            {/* Right Column: Workshops Grid & Sort Header (lg:col-span-9) */}
            <main className="lg:col-span-9 space-y-6">
              {/* Top Bar: Count & Sort */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-200">
                <div className="flex items-center gap-3">
                  <span className="font-display font-black text-xl sm:text-2xl text-[#0A2E54]">
                    {filteredWorkshops.length} Workshops Available
                  </span>
                  {selectedCalendarDate && (
                    <span className="inline-flex items-center gap-1.5 text-xs bg-[#145A96] text-white px-3 py-1 rounded-full font-bold shadow-sm">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#F28C28]" />
                      Filtered by Date
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-2 text-xs">
                  <span className="text-slate-500 font-semibold">Sort by:</span>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="px-3.5 py-2 rounded-xl border border-slate-200 bg-white font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#145A96] cursor-pointer shadow-xs"
                  >
                    <option value="soonest">Date: Soonest First</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                  </select>
                </div>
              </div>

              {/* Empty State */}
              {filteredWorkshops.length === 0 ? (
                <div className="bg-white rounded-3xl p-12 text-center border border-slate-200/90 shadow-sm">
                  <p className="text-base font-bold text-[#0A2E54] mb-1">
                    No workshops match your filters
                  </p>
                  <p className="text-xs text-slate-500 mb-5">
                    Try adjusting the date, workshop type or instructor filters.
                  </p>
                  <button
                    type="button"
                    onClick={resetAllFilters}
                    className="px-6 py-2.5 rounded-full bg-[#145A96] text-white text-xs font-bold hover:bg-[#0E4273] transition-colors cursor-pointer shadow-md"
                  >
                    View All Workshops
                  </button>
                </div>
              ) : (
                /* Workshop Cards Grid */
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                  {filteredWorkshops.map((workshop) => (
                    <div
                      key={workshop.id}
                      onClick={() => handleCardClick(workshop.id)}
                      className="group bg-white rounded-3xl overflow-hidden border border-slate-200/90 hover:border-[#145A96]/40 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_20px_45px_rgba(20,90,150,0.14)] transition-all duration-300 flex flex-col justify-between cursor-pointer hover:-translate-y-1.5"
                    >
                      {/* Top Poster Image with Badges */}
                      <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">
                        <img
                          src={workshop.image}
                          alt={workshop.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />

                        {/* Top-Left Date Badge (White card with Blue date & Orange Month) */}
                        <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-md rounded-2xl px-3 py-1.5 shadow-md flex flex-col items-center leading-none select-none border border-white/60">
                          <span className="font-display font-black text-base text-[#145A96]">
                            {workshop.dayNumber}
                          </span>
                          <span className="text-[9px] font-extrabold text-[#F28C28] uppercase tracking-wider mt-0.5">
                            {workshop.monthAbbr}
                          </span>
                        </div>

                        {/* Top-Right Status Badge */}
                        <div className="absolute top-3 right-3 select-none">
                          <span
                            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-wider shadow-md backdrop-blur-md ${
                              workshop.badgeVariant === 'tomorrow' || workshop.badgeVariant === 'in2days'
                                ? 'bg-[#F28C28] text-white border border-[#F28C28]/80'
                                : 'bg-emerald-600 text-white border border-emerald-500/80'
                            }`}
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                            <span>{workshop.badgeText}</span>
                          </span>
                        </div>
                      </div>

                      {/* Card Body */}
                      <div className="p-5 flex-1 flex flex-col justify-between">
                        <div>
                          {/* Category • Instructor Subtitle */}
                          <div className="flex items-center gap-1.5 text-[10.5px] font-black uppercase tracking-wider text-[#F28C28] mb-1.5">
                            <span>{workshop.category}</span>
                            <span className="text-slate-300">•</span>
                            <span className="text-slate-600">{workshop.instructor}</span>
                          </div>

                          {/* Title */}
                          <h3 className="font-display font-extrabold text-lg text-[#0A2E54] group-hover:text-[#145A96] transition-colors leading-snug mb-2.5">
                            {workshop.title}
                          </h3>

                          {/* Meta: Date & Time */}
                          <div className="space-y-1.5 text-xs text-slate-600 mb-3.5">
                            <p className="flex items-center gap-1.5">
                              <Calendar className="w-3.5 h-3.5 text-[#145A96] shrink-0" />
                              <span className="font-medium text-slate-700">{workshop.date}</span>
                              <span className="text-slate-300">•</span>
                              <Clock className="w-3.5 h-3.5 text-[#145A96] shrink-0" />
                              <span className="font-medium text-slate-700">{workshop.time}</span>
                            </p>

                            {workshop.song && (
                              <p className="flex items-center gap-1.5 text-xs font-semibold text-slate-800 bg-slate-50 py-1 px-2.5 rounded-lg border border-slate-100">
                                <Music className="w-3.5 h-3.5 text-[#F28C28] shrink-0" />
                                <span className="truncate">{workshop.song}</span>
                              </p>
                            )}
                          </div>
                        </div>

                        {/* Bottom Pricing & CTA Actions */}
                        <div className="pt-3.5 border-t border-slate-100 flex items-center justify-between">
                          <div>
                            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">
                              {workshop.pricing?.regular !== workshop.pricing?.earlyBird
                                ? 'Early bird'
                                : 'Entry pass'}
                            </span>
                            <div className="flex items-baseline gap-1.5">
                              <span className="font-display font-black text-xl text-[#0A2E54]">
                                ₹{workshop.pricing?.earlyBird || workshop.pricing?.entry}
                              </span>
                              {workshop.pricing?.regular &&
                                workshop.pricing?.regular !== workshop.pricing?.earlyBird && (
                                  <span className="text-xs text-slate-400 font-semibold line-through">
                                    ₹{workshop.pricing?.regular}
                                  </span>
                                )}
                            </div>
                          </div>

                          {/* Action buttons: Enquire pill + Orange Arrow Button */}
                          <div className="flex items-center gap-2">
                            <button
                              id={`enquire-btn-${workshop.id}`}
                              type="button"
                              onClick={(e) => handleOpenEnquiry(e, workshop, 'enquire')}
                              className="text-[11.5px] font-bold text-[#145A96] hover:text-white px-3 py-1.5 rounded-xl hover:bg-[#145A96] border border-[#145A96]/20 transition-all cursor-pointer"
                            >
                              Enquire
                            </button>
                            <button
                              type="button"
                              onClick={() => handleCardClick(workshop.id)}
                              aria-label={`View details for ${workshop.title}`}
                              className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#F28C28] to-[#E07A18] hover:from-[#E07A18] hover:to-[#D97415] text-white flex items-center justify-center transition-all shadow-sm group-hover:scale-105 active:scale-95 cursor-pointer"
                            >
                              <ArrowUpRight className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </main>
          </div>
        </div>
      </section>

      {/* Accessible Enquiry & Booking Popup Modal */}
      <WorkshopEnquiryModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        workshop={selectedWorkshopForModal}
        mode={modalMode}
      />
    </div>
  );
};

export default WorkshopsPage;
