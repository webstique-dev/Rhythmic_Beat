import { useState, useEffect } from 'react';
import {
  ArrowLeft,
  Calendar,
  Clock,
  Sparkles,
  CheckCircle2,
  Phone,
  MessageCircle,
  MapPin,
  ShieldCheck,
  Award,
  Layers,
  ArrowRight,
  Dumbbell,
  Flame,
  Heart,
  Music
} from 'lucide-react';
import { COURSES_DATA } from '../data/courses';

const ALIAS_MAP = {
  aerialyoga: 'aerial-yoga',
  'aerial-yoga': 'aerialyoga',
  bharatham: 'bharatanatyam',
  bharatanatyam: 'bharatham',
  'bungee-workout': 'bungeeworkout',
  'western-dance': 'westerndance',
};

export const CourseDetailsPage = ({ courseId, initialTab, onNavigate }) => {
  const course =
    COURSES_DATA.find((c) => c.id === courseId) ||
    COURSES_DATA.find((c) => c.id === ALIAS_MAP[courseId]) ||
    COURSES_DATA[0];
  const hasSubcategories = Boolean(course.subcategories && course.subcategories.length > 0);

  const [activeSubTab, setActiveSubTab] = useState(
    initialTab && course.subcategories?.some((s) => s.id === initialTab)
      ? initialTab
      : hasSubcategories
      ? course.subcategories[0].id
      : null
  );

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (initialTab && course.subcategories?.some((s) => s.id === initialTab)) {
      setActiveSubTab(initialTab);
    } else if (course.subcategories && course.subcategories.length > 0) {
      setActiveSubTab(course.subcategories[0].id);
    } else {
      setActiveSubTab(null);
    }
  }, [courseId, course, initialTab]);

  const activeSubcategory = hasSubcategories
    ? course.subcategories.find((s) => s.id === activeSubTab) || course.subcategories[0]
    : null;

  const currentDisplayImage = activeSubcategory ? activeSubcategory.image : course.image;
  const currentTitle = activeSubcategory ? `${course.title} — ${activeSubcategory.name}` : course.title;
  const currentTagline = activeSubcategory ? activeSubcategory.tagline : course.tagline;
  const currentDescription = activeSubcategory ? activeSubcategory.description : course.description;
  const currentHighlights = activeSubcategory ? activeSubcategory.highlights : course.highlights;

  const getSubcategoryIcon = (id) => {
    switch (id) {
      case 'strengthening':
        return <Dumbbell className="w-3.5 h-3.5" />;
      case 'zumba':
        return <Flame className="w-3.5 h-3.5" />;
      case 'power-yoga':
        return <Heart className="w-3.5 h-3.5" />;
      case 'choreo':
        return <Music className="w-3.5 h-3.5" />;
      default:
        return <Sparkles className="w-3.5 h-3.5" />;
    }
  };

  return (
    <div
      id="course-details-page"
      className="min-h-screen w-full overflow-x-hidden min-w-0 bg-[#F1F3F5] text-[#222222] selection:bg-[#145A96]/20 selection:text-[#222222]"
    >
      {/* 1. Top Header / Split Editorial Course Details Section */}
      <section
        id="course-details-hero"
        className="relative w-full pt-24 xs:pt-28 sm:pt-36 pb-12 sm:pb-20 border-b border-[rgba(34,34,34,0.08)] bg-gradient-to-b from-white via-white to-[#F1F3F5]"
        aria-label="Course Overview"
      >
        <div className="max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16">
          {/* Top Breadcrumb & Back Navigation */}
          <div className="mb-6 sm:mb-10 flex flex-wrap items-center justify-between gap-3">
            <button
              type="button"
              onClick={() => onNavigate('/courses')}
              className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-[#222222]/80 hover:text-[#145A96] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#145A96] rounded-full px-4 py-1.5 bg-white border border-[rgba(34,34,34,0.12)] shadow-2xs cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Courses</span>
            </button>

            <div className="flex items-center gap-2 text-xs text-[#222222]/60">
              <span className="cursor-pointer hover:text-[#145A96]" onClick={() => onNavigate('/courses')}>
                Courses
              </span>
              <span>/</span>
              <span className="text-[#145A96] font-semibold">{course.title}</span>
              {activeSubcategory && (
                <>
                  <span>/</span>
                  <span className="text-[#F28C28] font-bold">{activeSubcategory.name}</span>
                </>
              )}
            </div>
          </div>

          {/* Top Editorial Header Row (Inspired by Reference) */}
          <div className="mb-8 sm:mb-12">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#145A96]/10 text-[#145A96] border border-[#145A96]/15 text-[11px] font-bold uppercase tracking-wider mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-[#F28C28]" />
              <span>
                {course.category === 'aerial'
                  ? 'Aerial Silk Arts'
                  : course.category === 'dance'
                  ? 'Western Dance'
                  : course.category === 'classical'
                  ? 'Classical Arts'
                  : 'Movement & Fitness'}
              </span>
              <span className="text-[#222222]/30">•</span>
              <span className="text-[#222222]/70 font-medium">Valasaravakkam Studio</span>
            </div>

            <h1 className="font-display font-extrabold text-3xl xs:text-4xl sm:text-5xl lg:text-6xl text-[#145A96] tracking-tight leading-[1.08] max-w-4xl">
              {currentTitle}
            </h1>
            <p className="mt-3 text-base sm:text-xl font-semibold text-[#F28C28] max-w-2xl">
              {currentTagline}
            </p>
          </div>

          {/* Sub-Category Modalities Switcher (if course has subcategories) */}
          {hasSubcategories && (
            <div className="mb-8 bg-white rounded-2xl p-3 sm:p-4 border border-[rgba(34,34,34,0.1)] shadow-xs max-w-4xl">
              <div className="flex items-center justify-between gap-2 mb-2.5">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#F28C28]" />
                  <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#145A96]">
                    Select Modality Tab
                  </span>
                </div>
                <span className="text-[10px] text-[#222222]/60 hidden xs:inline font-medium">
                  All 4 included in Holistic Fitness curriculum
                </span>
              </div>

              <div className="grid grid-cols-2 xs:grid-cols-4 gap-2">
                {course.subcategories.map((sub) => {
                  const isActive = activeSubcategory.id === sub.id;
                  return (
                    <button
                      key={sub.id}
                      type="button"
                      onClick={() => setActiveSubTab(sub.id)}
                      className={`py-2 px-3 rounded-xl text-xs sm:text-sm font-bold tracking-wide transition-all cursor-pointer flex items-center justify-center gap-1.5 text-center ${
                        isActive
                          ? 'bg-[#145A96] text-white shadow-xs ring-2 ring-[#145A96]/20'
                          : 'bg-[#F1F3F5] text-[#222222]/80 hover:bg-white hover:text-[#145A96] border border-transparent hover:border-[rgba(34,34,34,0.12)]'
                      }`}
                    >
                      <span className={isActive ? 'text-[#F28C28]' : 'text-[#145A96]'}>
                        {getSubcategoryIcon(sub.id)}
                      </span>
                      <span>{sub.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Split Layout: Course Information Panel (Left) & Large Rounded Image Card (Right) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            {/* Left Column (7 cols): Course Information, Highlights, Schedule & Actions */}
            <div className="lg:col-span-6 xl:col-span-7 flex flex-col gap-6">
              {/* Description Card */}
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[rgba(34,34,34,0.1)] shadow-xs">
                <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#145A96] block mb-2">
                  About The Discipline
                </span>
                <p className="text-sm sm:text-base text-[#222222]/80 leading-relaxed font-normal">
                  {currentDescription}
                </p>

                {/* Key Training Focus Highlights */}
                <div className="mt-6 pt-6 border-t border-[rgba(34,34,34,0.08)]">
                  <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#222222]/60 block mb-3">
                    {activeSubcategory ? `${activeSubcategory.name} Training Focus` : 'Core Training Highlights'}
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {currentHighlights.map((h, i) => (
                      <span
                        key={i}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-[#F1F3F5] text-[#145A96] border border-[rgba(34,34,34,0.08)]"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#F28C28] shrink-0" />
                        <span>{h}</span>
                      </span>
                    ))}
                  </div>
                </div>

                {/* Skill Progression Tiers (if available) */}
                {course.levels && (
                  <div className="mt-6 pt-6 border-t border-[rgba(34,34,34,0.08)]">
                    <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#222222]/60 block mb-3">
                      Skill Progression Tiers
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {course.levels.map((lvl) => (
                        <span
                          key={lvl}
                          className="px-3 py-1 rounded-xl text-xs font-bold bg-[#145A96]/10 text-[#145A96]"
                        >
                          {lvl}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Weekly Batch Timings Card (Clean, Minimal, Well-Spaced) */}
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[rgba(34,34,34,0.1)] shadow-xs">
                <div className="flex items-center justify-between pb-4 mb-4 border-b border-[rgba(34,34,34,0.08)]">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-[#F28C28]" />
                    <h3 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-[#145A96]">
                      Available Batch Timings
                    </h3>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {(course.schedule || []).map((slot, idx) => (
                    <div
                      key={idx}
                      className="p-3.5 rounded-2xl bg-[#F1F3F5] border border-[rgba(34,34,34,0.06)] flex flex-col justify-between"
                    >
                      <span className="text-xs font-bold text-[#222222] mb-1">
                        {slot.days}
                      </span>
                      <span className="text-xs font-semibold text-[#145A96]">
                        {slot.time}
                      </span>
                    </div>
                  ))}
                </div>

                {course.notes && (
                  <p className="mt-4 text-xs font-semibold text-[#F28C28]">
                    • {course.notes}
                  </p>
                )}
              </div>

              {/* Primary Action Buttons */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 mt-1">
                <button
                  type="button"
                  onClick={() => onNavigate('/contact-us')}
                  className="flex-1 px-6 py-3.5 rounded-full bg-[#145A96] text-white text-xs sm:text-sm font-bold uppercase tracking-[0.1em] hover:bg-[#145A96]/90 transition-all shadow-md hover:shadow-lg inline-flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Enquire / Book Studio Slot</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <a
                  href="tel:+919840228224"
                  className="px-6 py-3.5 rounded-full bg-white text-[#222222] border border-[rgba(34,34,34,0.15)] text-xs sm:text-sm font-bold uppercase tracking-[0.08em] hover:text-[#145A96] hover:border-[#145A96] transition-all inline-flex items-center justify-center gap-2 shadow-2xs"
                >
                  <Phone className="w-3.5 h-3.5 text-[#F28C28]" />
                  <span>Call Studio</span>
                </a>
              </div>
            </div>

            {/* Right Column (5 cols): Large Rounded Image Card */}
            <div className="lg:col-span-6 xl:col-span-5 lg:sticky lg:top-28 space-y-4">
              <div className="relative rounded-3xl overflow-hidden shadow-xl border-2 border-white bg-[#145A96] aspect-[4/5] sm:aspect-[3/4]">
                <img
                  src={currentDisplayImage}
                  alt={currentTitle}
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-103"
                  loading="eager"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent pointer-events-none" />

                {/* Floating Bottom Card Over Image */}
                <div className="absolute bottom-5 left-5 right-5 text-white z-10">
                  <span className="inline-block px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-[#F28C28] text-white shadow-xs mb-2">
                    {activeSubcategory ? activeSubcategory.name : 'Official Academy Batch'}
                  </span>
                  <p className="font-display font-extrabold text-xl sm:text-2xl text-white drop-shadow-md">
                    {course.title}
                  </p>
                  <p className="text-xs text-white/80 font-medium mt-1">
                    Valasaravakkam Studio • Certified Instructors
                  </p>
                </div>
              </div>

              {/* Subcategories Thumbnails selector (when available) */}
              {hasSubcategories && (
                <div className="grid grid-cols-4 gap-2 pt-2">
                  {course.subcategories.map((sub) => {
                    const isSelected = activeSubcategory.id === sub.id;
                    return (
                      <button
                        key={sub.id}
                        type="button"
                        onClick={() => setActiveSubTab(sub.id)}
                        className={`group relative rounded-2xl overflow-hidden aspect-[4/3] border-2 transition-all cursor-pointer ${
                          isSelected
                            ? 'border-[#F28C28] ring-2 ring-[#F28C28]/30 shadow-xs'
                            : 'border-transparent opacity-75 hover:opacity-100'
                        }`}
                      >
                        <img
                          src={sub.image}
                          alt={sub.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                        />
                        <div className="absolute inset-0 bg-black/35 group-hover:bg-black/15 transition-colors" />
                        <span className="absolute bottom-1.5 left-1 right-1 text-[9.5px] font-bold text-white text-center leading-tight truncate drop-shadow-xs">
                          {sub.name}
                        </span>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* 2. Visual Modalities Grid (If course has subcategories) */}
      {hasSubcategories && (
        <section
          className="py-10 sm:py-16 border-b border-[rgba(34,34,34,0.08)] bg-white"
          aria-label="Holistic Fitness Disciplines"
        >
          <div className="max-w-[1400px] mx-auto px-3.5 sm:px-8 lg:px-12 xl:px-16">
            <div className="max-w-3xl mb-8">
              <div className="flex items-center gap-2 mb-2">
                <span className="w-2 h-2 rounded-full bg-[#F28C28]" />
                <span className="text-xs font-bold uppercase tracking-[0.14em] text-[#145A96]">
                  Curriculum Overview
                </span>
              </div>
              <h2 className="font-display font-extrabold text-2xl xs:text-3xl sm:text-4xl text-[#145A96]">
                The 4 Modalities of Holistic Fitness
              </h2>
              <p className="text-xs sm:text-sm text-[#222222]/70 mt-1.5 leading-relaxed">
                As detailed in the brochure curriculum, our holistic fitness program combines four complete disciplines to provide a balanced full-body transformation.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {course.subcategories.map((sub) => {
                const isCurrent = activeSubcategory.id === sub.id;
                return (
                  <div
                    key={sub.id}
                    onClick={() => {
                      setActiveSubTab(sub.id);
                      window.scrollTo({ top: 120, behavior: 'smooth' });
                    }}
                    className={`rounded-2xl overflow-hidden border transition-all cursor-pointer flex flex-col justify-between bg-[#F1F3F5] group ${
                      isCurrent
                        ? 'border-[#145A96] ring-2 ring-[#145A96]/20 shadow-md bg-white'
                        : 'border-[rgba(34,34,34,0.1)] hover:border-[#145A96]/40 hover:shadow-xs'
                    }`}
                  >
                    <div>
                      <div className="relative aspect-[16/11] overflow-hidden bg-[#145A96]">
                        <img
                          src={sub.image}
                          alt={sub.name}
                          className="w-full h-full object-cover group-hover:scale-104 transition-transform duration-500"
                        />
                        <div className="absolute top-2.5 left-2.5">
                          <span className="px-2.5 py-0.5 rounded-full text-[9.5px] font-bold uppercase tracking-wider bg-white/95 text-[#145A96] shadow-2xs">
                            {sub.name}
                          </span>
                        </div>
                      </div>

                      <div className="p-4">
                        <h3 className="font-display font-bold text-base text-[#145A96] mb-1">
                          {sub.name}
                        </h3>
                        <p className="text-xs font-semibold text-[#F28C28] mb-2">
                          {sub.tagline}
                        </p>
                        <p className="text-[11px] text-[#222222]/75 leading-relaxed mb-3">
                          {sub.description}
                        </p>
                      </div>
                    </div>

                    <div className="p-4 pt-0">
                      <span className="inline-flex items-center gap-1 text-xs font-bold text-[#145A96] group-hover:text-[#F28C28] transition-colors">
                        <span>Select this tab</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

    </div>
  );
};

export default CourseDetailsPage;
