import { useEffect } from 'react';
import {
  ArrowLeft,
  Calendar,
  Clock,
  MapPin,
  Tag,
  Phone,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Award,
  Users,
  ExternalLink,
  Share2
} from 'lucide-react';
import { workshopsData } from '../data/workshops';

export const WorkshopDetailsPage = ({
  workshopId,
  onNavigate,
  onBookSlot,
}) => {
  const workshop =
    workshopsData.find((w) => w.id === workshopId) || workshopsData[0];

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [workshopId]);

  const mapQueryUrl = `https://maps.google.com/?q=${encodeURIComponent(workshop.address)}`;

  return (
    <div id="workshop-details-page" className="min-h-screen w-full overflow-x-hidden min-w-0 bg-[#F1F3F5] text-[#222222] selection:bg-[#145A96]/20 selection:text-[#222222]">
      {/* Top Header / Back Navigation */}
      <section
        id="workshop-details-hero"
        className="relative w-full pt-28 xs:pt-32 sm:pt-36 pb-10 sm:pb-14 border-b border-[#222222]/10 bg-gradient-to-b from-white to-[#F1F3F5]"
        aria-label="Workshop Overview"
      >
        <div className="max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16">
          {/* Breadcrumb / Back Button */}
          <div className="mb-6 sm:mb-8 flex items-center justify-between gap-4">
            <button
              type="button"
              onClick={() => onNavigate('/workshops')}
              className="inline-flex items-center gap-1.5 sm:gap-2 text-[11px] sm:text-xs font-semibold uppercase tracking-[0.12em] text-[#222222]/80 hover:text-[#145A96] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#145A96] rounded-full px-3 py-1 bg-white border border-[#222222]/15 shadow-xs cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to All Workshops</span>
            </button>

            <span className="hidden sm:inline-flex items-center gap-1.5 text-xs text-[#222222]/60">
              <span>Workshops</span>
              <span>/</span>
              <strong className="text-[#145A96] font-semibold">{workshop.title}</strong>
            </span>
          </div>

          {/* Hero Grid: Workshop Info & Poster */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            {/* Left Column: Workshop Details */}
            <div className="lg:col-span-7">
              {/* Category & Status Badges */}
              <div className="flex flex-wrap items-center gap-2 mb-3.5">
                <span className="px-3 py-1 rounded-full text-[10.5px] font-bold uppercase tracking-wider bg-[#F28C28] text-white shadow-xs">
                  {workshop.badgeText || workshop.category}
                </span>
                <span
                  className={`px-3 py-1 rounded-full text-[10.5px] font-bold uppercase tracking-wider ${
                    workshop.status === 'Upcoming'
                      ? 'bg-[#145A96] text-white'
                      : 'bg-[#F1F3F5] text-[#222222]/70'
                  }`}
                >
                  {workshop.status}
                </span>
                <span className="text-xs text-[#222222]/60 ml-1">
                  • {workshop.level}
                </span>
              </div>

              {/* Title & Subtitle */}
              <h1 className="font-display font-extrabold text-3xl xs:text-4xl sm:text-5xl lg:text-6xl text-[#145A96] tracking-[-0.03em] leading-[1.1] break-words">
                {workshop.title}
              </h1>
              <p className="mt-2 text-base sm:text-lg font-medium text-[#F28C28]">
                {workshop.subtitle}
              </p>

              <p className="mt-4 sm:mt-5 text-sm sm:text-base text-[#222222]/75 leading-relaxed">
                {workshop.description}
              </p>

              {/* Key Quick Fact Pills */}
              <div className="mt-6 sm:mt-7 grid grid-cols-2 sm:grid-cols-3 gap-3">
                <div className="bg-white p-3.5 rounded-2xl border border-[rgba(34,34,34,0.12)] shadow-xs">
                  <span className="text-[10px] font-bold text-[#222222]/60 uppercase tracking-wider block">
                    Date & Day
                  </span>
                  <span className="font-display font-bold text-sm text-[#145A96] mt-0.5 block">
                    {workshop.date}
                  </span>
                </div>

                <div className="bg-white p-3.5 rounded-2xl border border-[rgba(34,34,34,0.12)] shadow-xs">
                  <span className="text-[10px] font-bold text-[#222222]/60 uppercase tracking-wider block">
                    Session Timing
                  </span>
                  <span className="font-display font-bold text-sm text-[#145A96] mt-0.5 block">
                    {workshop.time}
                  </span>
                </div>

                <div className="bg-white p-3.5 rounded-2xl border border-[rgba(34,34,34,0.12)] shadow-xs col-span-2 sm:col-span-1">
                  <span className="text-[10px] font-bold text-[#222222]/60 uppercase tracking-wider block">
                    Studio Venue
                  </span>
                  <span className="font-display font-bold text-sm text-[#145A96] mt-0.5 block truncate">
                    {workshop.location}
                  </span>
                </div>
              </div>

              {/* Pricing & Booking Banner */}
              <div className="mt-6 sm:mt-8 p-5 sm:p-6 rounded-3xl bg-[#F1F3F5] border border-[#F28C28]/25 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-sm">
                <div>
                  <span className="text-xs uppercase tracking-wider font-semibold text-[#222222]/60 block">
                    Registration Fee
                  </span>
                  <div className="flex items-baseline gap-3 mt-1">
                    <span className="font-display font-black text-2xl sm:text-3xl text-[#145A96]">
                      {workshop.pricing.earlyBird}
                    </span>
                    <span className="text-xs font-semibold text-[#F28C28]">
                      {workshop.pricing.earlyBirdLabel}
                    </span>
                    <span className="text-xs text-[#222222]/60">
                      / Regular: {workshop.pricing.regular}
                    </span>
                  </div>
                  <span className="text-[11px] text-[#222222]/60 mt-1 block">
                    {workshop.capacity}
                  </span>
                </div>

                <button
                  type="button"
                  id="book-slot-cta"
                  onClick={() => onBookSlot(workshop)}
                  className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full text-xs sm:text-sm font-bold bg-[#145A96] text-white hover:bg-[#145A96]/90 active:scale-[0.98] transition-all shadow-md cursor-pointer shrink-0"
                >
                  <span>Book Your Slot</span>
                  <ArrowRight className="w-4 h-4 text-[#F28C28]" />
                </button>
              </div>
            </div>

            {/* Right Column: High-Res Poster Image & Visual Card */}
            <div className="lg:col-span-5">
              <div className="rounded-3xl overflow-hidden border border-[rgba(34,34,34,0.12)] shadow-xl bg-white sticky top-28">
                <div className="relative aspect-[4/5] overflow-hidden bg-[#145A96]">
                  <img
                    src={workshop.image}
                    alt={workshop.title}
                    className="w-full h-full object-cover object-top"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex items-end p-5">
                    <div className="text-white">
                      <span className="text-[10.5px] uppercase font-bold tracking-widest text-[#F28C28] block">
                        Official Workshop Poster
                      </span>
                      <p className="font-display font-bold text-lg sm:text-xl leading-tight">
                        {workshop.title} with {workshop.instructor}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Direct Contact Bar */}
                <div className="p-4 bg-white border-t border-[rgba(34,34,34,0.12)] flex items-center justify-between text-xs">
                  <span className="text-[#222222]/60">Need enquiry support?</span>
                  <a
                    href={`tel:${workshop.contactPhone}`}
                    className="font-bold text-[#145A96] hover:text-[#F28C28] transition-colors inline-flex items-center gap-1.5"
                  >
                    <Phone className="w-3.5 h-3.5 text-[#F28C28]" />
                    <span>{workshop.contactPhone}</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Instructor Profile & Highlights Section */}
      <section className="py-12 sm:py-16 max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Instructor Profile Card */}
          <div className="lg:col-span-5 bg-white rounded-3xl p-6 sm:p-7 border border-[rgba(34,34,34,0.12)] shadow-xs">
            <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-[#F1F3F5] border border-[#F28C28]/30 text-[11px] font-semibold text-[#F28C28] uppercase tracking-wider mb-4 max-w-fit">
              <Award className="w-3.5 h-3.5" />
              <span>Instructor Profile</span>
            </div>

            <div className="flex items-center gap-4 mb-5">
              <img
                src={workshop.instructorImage}
                alt={workshop.instructor}
                className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover border-2 border-[rgba(34,34,34,0.12)] shadow-sm shrink-0"
              />
              <div>
                <h3 className="font-display font-bold text-xl sm:text-2xl text-[#145A96]">
                  {workshop.instructor}
                </h3>
                <p className="text-xs sm:text-sm font-medium text-[#F28C28]">
                  {workshop.instructorRole}
                </p>
                <span className="text-xs text-[#222222]/60 mt-1 block">
                  Guest Faculty at Rhythmic Beat Dance Court
                </span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-[#222222]/75 leading-relaxed border-t border-[rgba(34,34,34,0.08)] pt-4">
              With extensive experience across theatrical stage productions and cinematic choreography, {workshop.instructor} specializes in expressive musical storytelling and high-energy viral routines.
            </p>
          </div>

          {/* Curriculum & Key Highlights */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-7 border border-[rgba(34,34,34,0.12)] shadow-xs">
            <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-[#F1F3F5] border border-[#145A96]/20 text-[11px] font-semibold text-[#145A96] uppercase tracking-wider mb-4 max-w-fit">
              <Sparkles className="w-3.5 h-3.5" />
              <span>What You Will Learn</span>
            </div>

            <h3 className="font-display font-bold text-xl sm:text-2xl text-[#145A96] mb-4">
              Masterclass Highlights & Takeaways
            </h3>

            <div className="space-y-3 sm:space-y-3.5">
              {workshop.highlights.map((item, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-[#145A96]/10 flex items-center justify-center text-[#145A96] shrink-0 mt-0.5">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                  </div>
                  <p className="text-xs sm:text-sm text-[#222222]/75 leading-relaxed">
                    {item}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Schedule & Venue Breakdown */}
      <section className="py-12 sm:py-16 bg-white border-y border-[rgba(34,34,34,0.08)]">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Timeline Schedule */}
            <div className="lg:col-span-7">
              <span className="text-xs font-bold text-[#F28C28] uppercase tracking-wider block mb-2">
                Timeline & Breakdown
              </span>
              <h3 className="font-display font-bold text-2xl sm:text-3xl text-[#145A96] mb-6">
                Workshop Session Schedule
              </h3>

              <div className="space-y-4">
                {workshop.schedule.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-2xl bg-[#F1F3F5] border border-[rgba(34,34,34,0.12)] flex items-start gap-4"
                  >
                    <span className="font-display font-bold text-sm text-[#145A96] min-w-[75px] shrink-0">
                      {item.time}
                    </span>
                    <div className="h-4 w-[1px] bg-[rgba(34,34,34,0.12)] mt-1 shrink-0" />
                    <p className="text-xs sm:text-sm text-[#222222]/75">
                      {item.activity}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Venue & Studio Address Card */}
            <div className="lg:col-span-5 bg-[#F1F3F5] rounded-3xl p-6 sm:p-7 border border-[rgba(34,34,34,0.12)]">
              <span className="text-xs font-bold text-[#145A96] uppercase tracking-wider block mb-2">
                Venue & Coordinates
              </span>
              <h3 className="font-display font-bold text-xl sm:text-2xl text-[#145A96] mb-3">
                {workshop.venueName}
              </h3>
              <p className="text-xs sm:text-sm text-[#222222]/75 leading-relaxed mb-4">
                {workshop.address}
              </p>

              <div className="p-4 rounded-2xl bg-white border border-[rgba(34,34,34,0.12)] mb-5 space-y-2 text-xs text-[#222222]/70">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#F28C28]" />
                  <span>Sprung wooden flooring & air-conditioned acoustics</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-[#145A96]" />
                  <span>Changing rooms, locker facilities & parent lounge</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <a
                  href={mapQueryUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 inline-flex items-center justify-center gap-1.5 py-3 px-4 rounded-full text-xs font-semibold bg-white border border-[rgba(34,34,34,0.12)] text-[#222222] hover:border-[#145A96] transition-colors"
                >
                  <MapPin className="w-3.5 h-3.5 text-[#145A96]" />
                  <span>Open in Google Maps</span>
                  <ExternalLink className="w-3 h-3 text-[#222222]/60" />
                </a>

                <button
                  type="button"
                  onClick={() => onBookSlot(workshop)}
                  className="flex-1 inline-flex items-center justify-center gap-1.5 py-3 px-4 rounded-full text-xs font-bold bg-[#145A96] text-white hover:bg-[#145A96]/90 transition-colors cursor-pointer"
                >
                  <span>Book This Slot</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom Floating/Fixed CTA Strip */}
      <section className="py-12 sm:py-16 max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16">
        <div className="p-6 sm:p-10 rounded-3xl bg-[#145A96] text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div>
            <span className="text-xs uppercase tracking-widest font-bold text-[#F28C28] block mb-1">
              Limited Seats Available
            </span>
            <h4 className="font-display font-bold text-xl sm:text-2xl text-white">
              Ready to learn with {workshop.instructor}?
            </h4>
            <p className="text-xs sm:text-sm text-white/90 mt-1 max-w-xl">
              Complete your reservation early to secure the {workshop.pricing.earlyBird} early bird rate. Our desk will confirm your slot and send venue check-in details.
            </p>
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto">
            <button
              type="button"
              onClick={() => onBookSlot(workshop)}
              className="flex-1 md:flex-none inline-flex items-center justify-center gap-2 py-3.5 px-8 rounded-full text-xs sm:text-sm font-bold bg-[#F28C28] text-white hover:bg-[#F28C28]/90 transition-all shadow-md cursor-pointer"
            >
              <span>Book Your Slot Now</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
