import { useState, useMemo } from 'react';
import {
  ArrowLeft,
  Sparkles,
  Calendar,
  Clock,
  MapPin,
  Tag,
  Search,
  Filter,
  ArrowRight,
  CheckCircle2,
  SlidersHorizontal,
  X,
  Phone
} from 'lucide-react';
import { workshopsData } from '../data/workshops';

export const WorkshopsPage = ({ onNavigate, onBookSlot, onSelectWorkshop }) => {
  const [statusFilter, setStatusFilter] = useState('All'); // 'All' | 'Upcoming' | 'Past'
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [locationFilter, setLocationFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  // Extract unique categories & locations from data
  const categories = useMemo(() => {
    const set = new Set(workshopsData.map((w) => w.category));
    return ['All', ...Array.from(set)];
  }, []);

  const locations = useMemo(() => {
    const locNames = [
      'All',
      'Valasaravakkam (Main Studio)',
      'Kolapakkam Branch',
      'Ambattur Branch',
      'Pondicherry Branch',
    ];
    return locNames;
  }, []);

  // Filter workshops dynamically
  const filteredWorkshops = useMemo(() => {
    return workshopsData.filter((item) => {
      // 1. Status Filter
      if (statusFilter !== 'All' && item.status !== statusFilter) {
        return false;
      }

      // 2. Category Filter
      if (categoryFilter !== 'All' && item.category !== categoryFilter) {
        return false;
      }

      // 3. Location Filter
      if (locationFilter !== 'All') {
        if (!item.location.toLowerCase().includes(locationFilter.split(' ')[0].toLowerCase())) {
          return false;
        }
      }

      // 4. Search Query (matches title, instructor, location, date)
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesTitle = item.title.toLowerCase().includes(q);
        const matchesInstructor = item.instructor.toLowerCase().includes(q);
        const matchesLocation = item.location.toLowerCase().includes(q);
        const matchesDate = item.date.toLowerCase().includes(q);
        if (!matchesTitle && !matchesInstructor && !matchesLocation && !matchesDate) {
          return false;
        }
      }

      return true;
    });
  }, [statusFilter, categoryFilter, locationFilter, searchQuery]);

  const hasActiveFilters =
    statusFilter !== 'All' ||
    categoryFilter !== 'All' ||
    locationFilter !== 'All' ||
    searchQuery.trim().length > 0;

  const resetFilters = () => {
    setStatusFilter('All');
    setCategoryFilter('All');
    setLocationFilter('All');
    setSearchQuery('');
  };

  const handleCardClick = (id) => {
    if (onSelectWorkshop) {
      onSelectWorkshop(id);
    } else {
      onNavigate(`/workshops/${id}`);
    }
  };

  return (
    <div id="workshops-page" className="min-h-screen w-full overflow-x-hidden min-w-0 bg-[#FAF9F5] text-[#10203A] selection:bg-[#EAF1FB] selection:text-[#10203A]">
      {/* Hero / Header Section */}
      <section
        id="workshops-hero"
        className="relative w-full pt-28 xs:pt-32 sm:pt-36 pb-12 sm:pb-16 border-b border-[rgba(16,32,58,0.08)] bg-gradient-to-b from-white to-[#FAF9F5]"
        aria-label="Workshops Introduction"
      >
        <div className="max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16">
          {/* Back Button */}
          <div className="mb-6 sm:mb-8">
            <button
              type="button"
              onClick={() => onNavigate('/')}
              className="inline-flex items-center gap-1.5 sm:gap-2 text-[11px] sm:text-xs font-semibold uppercase tracking-[0.12em] text-[#4A5B78] hover:text-[#10203A] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1E5BB8] rounded-full px-3 py-1 bg-white border border-[#ECE7DC] shadow-xs cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Home</span>
            </button>
          </div>

          <div className="max-w-3xl">
            <div className="flex items-center gap-2 mb-3">
              <span className="w-2 h-2 rounded-full bg-[#F28C1E] shrink-0" />
              <span className="text-[10px] xs:text-[11px] font-semibold text-[#10203A] uppercase tracking-[0.14em]">
                Master Intensives • Celebrity Mentors • Certified Syllabi
              </span>
            </div>
            <h1 className="font-display font-extrabold text-3xl xs:text-4xl sm:text-6xl text-[#10203A] tracking-[-0.03em] leading-[1.1]">
              Workshops & Masterclasses
            </h1>
            <p className="mt-4 sm:mt-6 text-sm sm:text-base lg:text-lg text-[#4A5B78] leading-relaxed">
              Accelerate your dancing with weekend masterclasses led by acclaimed choreographers, aerial specialists, and Guru Yuvraaj Jayakumar. Browse upcoming intensives or revisit past production archives below.
            </p>
          </div>
        </div>
      </section>

      {/* Filter & Search Bar Section */}
      <section className="sticky top-[80px] z-30 bg-[#FAF9F5]/95 backdrop-blur-md border-b border-[#ECE7DC] py-4 sm:py-5 shadow-xs">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16">
          <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
            {/* Primary Status Filter Tabs (All / Upcoming / Past) */}
            <div className="flex items-center gap-1.5 bg-white p-1 rounded-full border border-[#ECE7DC] shadow-xs self-start sm:self-auto overflow-x-auto max-w-full">
              {['All', 'Upcoming', 'Past'].map((tab) => (
                <button
                  key={tab}
                  type="button"
                  id={`filter-status-${tab.toLowerCase()}`}
                  onClick={() => setStatusFilter(tab)}
                  className={`px-4 sm:px-5 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer whitespace-nowrap ${
                    statusFilter === tab
                      ? 'bg-[#18181B] text-white shadow-xs'
                      : 'text-[#71717A] hover:text-[#10203A]'
                  }`}
                >
                  {tab === 'All' ? 'All Workshops' : `${tab} Workshops`}
                </button>
              ))}
            </div>

            {/* Dropdown Filters & Search */}
            <div className="flex flex-wrap sm:flex-nowrap items-center gap-2.5 sm:gap-3">
              {/* Category Dropdown */}
              <div className="relative flex-1 sm:flex-none min-w-[140px]">
                <select
                  id="category-filter-select"
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                  aria-label="Filter by category"
                  className="w-full appearance-none px-3.5 py-2 rounded-xl text-xs font-medium bg-white border border-[#ECE7DC] text-[#10203A] focus:outline-none focus:ring-2 focus:ring-[#10203A]/10 pr-8 cursor-pointer"
                >
                  {categories.map((c) => (
                    <option key={c} value={c}>
                      {c === 'All' ? 'All Categories' : c}
                    </option>
                  ))}
                </select>
                <div className="absolute inset-y-0 right-0 pr-2.5 flex items-center pointer-events-none text-[#71717A]">
                  <SlidersHorizontal className="w-3.5 h-3.5" />
                </div>
              </div>

              {/* Location Dropdown */}
              <div className="relative flex-1 sm:flex-none min-w-[140px]">
                <select
                  id="location-filter-select"
                  value={locationFilter}
                  onChange={(e) => setLocationFilter(e.target.value)}
                  aria-label="Filter by location"
                  className="w-full appearance-none px-3.5 py-2 rounded-xl text-xs font-medium bg-white border border-[#ECE7DC] text-[#10203A] focus:outline-none focus:ring-2 focus:ring-[#10203A]/10 pr-8 cursor-pointer"
                >
                  {locations.map((loc) => (
                    <option key={loc} value={loc}>
                      {loc === 'All' ? 'All Studios' : loc}
                    </option>
                  ))}
                </select>
                <div className="absolute inset-y-0 right-0 pr-2.5 flex items-center pointer-events-none text-[#71717A]">
                  <MapPin className="w-3.5 h-3.5" />
                </div>
              </div>

              {/* Search Field */}
              <div className="relative w-full sm:w-56">
                <input
                  type="text"
                  id="workshop-search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search workshop or mentor..."
                  aria-label="Search workshops"
                  className="w-full pl-9 pr-3 py-2 rounded-xl text-xs bg-white border border-[#ECE7DC] text-[#10203A] placeholder-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-[#10203A]/10"
                />
                <Search className="w-3.5 h-3.5 text-[#9CA3AF] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery('')}
                    aria-label="Clear search"
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#9CA3AF] hover:text-[#10203A]"
                  >
                    <X className="w-3 h-3" />
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Active Filter Summary Bar */}
          <div className="mt-3 flex items-center justify-between text-xs text-[#71717A] pt-2 border-t border-[#F2EFE8]">
            <p>
              Showing <strong className="text-[#10203A]">{filteredWorkshops.length}</strong>{' '}
              {filteredWorkshops.length === 1 ? 'workshop' : 'workshops'}
              {statusFilter !== 'All' && <span> in <strong>{statusFilter}</strong></span>}
            </p>

            {hasActiveFilters && (
              <button
                type="button"
                id="reset-filters-btn"
                onClick={resetFilters}
                className="text-[#F28C1E] hover:underline font-semibold inline-flex items-center gap-1 cursor-pointer"
              >
                <X className="w-3 h-3" />
                <span>Reset all filters</span>
              </button>
            )}
          </div>
        </div>
      </section>

      {/* Workshop Cards Grid */}
      <section className="py-12 sm:py-16 max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16">
        {filteredWorkshops.length === 0 ? (
          <div className="p-12 text-center bg-white rounded-3xl border border-[#ECE7DC] shadow-xs">
            <Calendar className="w-10 h-10 text-[#9CA3AF] mx-auto mb-3" />
            <h3 className="font-display font-bold text-xl text-[#10203A]">
              No workshops match your selected filters
            </h3>
            <p className="text-sm text-[#71717A] mt-1 max-w-md mx-auto">
              Try adjusting your category, location, or search term to discover other intensive sessions.
            </p>
            <button
              type="button"
              id="empty-reset-filters-btn"
              onClick={resetFilters}
              className="mt-5 px-5 py-2 rounded-full text-xs font-semibold bg-[#18181B] text-white hover:bg-black transition-colors cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredWorkshops.map((workshop) => {
              const isUpcoming = workshop.status === 'Upcoming';
              return (
                <div
                  key={workshop.id}
                  data-testid={`workshop-card-${workshop.id}`}
                  onClick={() => handleCardClick(workshop.id)}
                  className="bg-white rounded-3xl overflow-hidden border border-[#ECE7DC] shadow-xs flex flex-col justify-between group hover:shadow-xl hover:border-[#10203A]/20 transition-all duration-300 cursor-pointer"
                >
                  {/* Card Image Banner */}
                  <div className="relative aspect-[16/11] overflow-hidden bg-[#10203A]">
                    <img
                      src={workshop.image}
                      alt={workshop.title}
                      className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                    />

                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 pointer-events-none" />

                    {/* Top Status & Category Badges */}
                    <div className="absolute top-3.5 left-3.5 right-3.5 flex items-center justify-between gap-2 pointer-events-none">
                      <span
                        className={`px-3 py-1 rounded-full text-[10.5px] font-bold uppercase tracking-wider shadow-sm ${
                          isUpcoming
                            ? 'bg-[#F28C1E] text-white'
                            : 'bg-black/60 backdrop-blur-md text-[#CBD5E1] border border-white/10'
                        }`}
                      >
                        {workshop.status}
                      </span>

                      <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-white/90 backdrop-blur-md text-[#10203A] shadow-xs">
                        {workshop.category}
                      </span>
                    </div>

                    {/* Pricing Pill at Bottom Right of Image */}
                    <div className="absolute bottom-3 right-3 bg-white/95 backdrop-blur-md px-3 py-1 rounded-full shadow-sm border border-[#ECE7DC] pointer-events-none">
                      <span className="text-[11.5px] font-extrabold text-[#10203A]">
                        {workshop.pricing.earlyBird}
                      </span>
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between">
                    <div>
                      {/* Instructor Avatar & Name */}
                      <div className="flex items-center gap-2.5 mb-3">
                        <img
                          src={workshop.instructorImage}
                          alt={workshop.instructor}
                          className="w-8 h-8 rounded-full object-cover border border-[#ECE7DC]"
                        />
                        <div className="min-w-0">
                          <span className="text-[10px] font-bold uppercase tracking-wider text-[#71717A] block">
                            Instructor
                          </span>
                          <span className="text-xs font-bold text-[#10203A] truncate block">
                            {workshop.instructor}
                          </span>
                        </div>
                      </div>

                      {/* Workshop Title */}
                      <h2 className="font-display font-bold text-lg sm:text-xl text-[#10203A] mb-1.5 group-hover:text-[#F28C1E] transition-colors leading-snug">
                        {workshop.title}
                      </h2>
                      <p className="text-xs text-[#4A5B78] line-clamp-2 leading-relaxed mb-4">
                        {workshop.description}
                      </p>

                      {/* Date, Time & Venue Specs */}
                      <div className="space-y-1.5 text-xs text-[#71717A] mb-5 pt-3 border-t border-[#F2EFE8]">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-3.5 h-3.5 text-[#F28C1E] shrink-0" />
                          <span className="font-medium text-[#10203A]">{workshop.date}</span>
                          <span className="text-[#CBD5E1]">•</span>
                          <span>{workshop.time}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="w-3.5 h-3.5 text-[#1E5BB8] shrink-0" />
                          <span className="truncate">{workshop.location}</span>
                        </div>
                      </div>
                    </div>

                    {/* Action Triggers */}
                    <div className="pt-3 border-t border-[#F2EFE8] flex items-center justify-between gap-2">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleCardClick(workshop.id);
                        }}
                        className="text-xs font-semibold text-[#10203A] hover:text-[#F28C1E] inline-flex items-center gap-1 transition-colors cursor-pointer py-1.5"
                      >
                        <span>View Details</span>
                        <ArrowRight className="w-3 h-3" />
                      </button>

                      {isUpcoming ? (
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            onBookSlot(workshop);
                          }}
                          className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-bold bg-[#18181B] text-white hover:bg-black active:scale-[0.98] transition-all shadow-xs cursor-pointer"
                        >
                          <span>Book Slot</span>
                        </button>
                      ) : (
                        <span className="text-[11px] font-semibold text-[#71717A] uppercase tracking-wider">
                          Completed
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Bottom Booking Assistance Card */}
        <div className="mt-14 sm:mt-16 p-6 sm:p-8 rounded-3xl bg-white border border-[#ECE7DC] shadow-xs flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-start gap-4">
            <div className="w-11 h-11 rounded-2xl bg-[#FFF6EE] border border-[#F28C1E]/20 flex items-center justify-center text-[#F28C1E] shrink-0">
              <Phone className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-display font-bold text-base sm:text-lg text-[#10203A]">
                Host a Private Masterclass or Inquire for Group Bookings
              </h3>
              <p className="text-xs sm:text-sm text-[#4A5B78] mt-1 max-w-xl">
                Interested in customized choreography workshops for your college troupe, school ensemble, or corporate team? Connect with our master management desk.
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => onNavigate('/contact-us')}
            className="px-6 py-2.5 rounded-full text-xs font-semibold bg-[#18181B] text-white hover:bg-black transition-colors shrink-0 shadow-sm cursor-pointer"
          >
            Contact Admissions
          </button>
        </div>
      </section>
    </div>
  );
};
