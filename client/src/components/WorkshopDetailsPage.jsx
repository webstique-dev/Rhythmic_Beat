import { useState, useEffect } from 'react';
import {
  ArrowLeft,
  Calendar,
  Clock,
  MapPin,
  Tag,
  Phone,
  CheckCircle2,
  Check,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Award,
  Users,
  ExternalLink,
  Share2,
  Star
} from 'lucide-react';
import { workshopsData, getWorkshopById } from '../data/workshops';
import { WorkshopEnquiryModal } from './WorkshopEnquiryModal';
import { WorkshopPaymentModal } from './WorkshopPaymentModal';
import rbdcLogo from '../assets/logo.png';

export const WorkshopDetailsPage = ({ workshopId, onNavigate, onBookSlot }) => {
  const workshop = getWorkshopById(workshopId) || workshopsData[0];
  const [participantsCount, setParticipantsCount] = useState(1);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [isEnquiryModalOpen, setIsEnquiryModalOpen] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [workshopId]);

  const unitPrice = workshop.pricing?.entry || workshop.pricing?.earlyBird || 699;
  const totalPrice = unitPrice * participantsCount;

  return (
    <div
      id="workshop-details-page"
      className="min-h-screen w-full overflow-x-clip min-w-0 bg-[#F4F5F7] text-[#111111] selection:bg-[#145A96]/20 selection:text-[#111111] pb-24 lg:pb-0"
    >
      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-10 pt-24 xs:pt-28 sm:pt-32 pb-16 sm:pb-24">
        {/* Top Breadcrumb Navigation */}
        <div className="mb-6 sm:mb-8 flex items-center justify-between">
          <button
            type="button"
            onClick={() => onNavigate('/workshops')}
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#145A96] hover:text-[#0E4273] transition-colors cursor-pointer bg-white px-4 py-2 rounded-full border border-black/10 shadow-2xs"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Workshops</span>
          </button>

          <span className="hidden sm:inline-flex items-center gap-2 text-xs text-black/50">
            <span>Workshops</span>
            <span>/</span>
            <strong className="text-black font-semibold">{workshop.title}</strong>
          </span>
        </div>

        {/* Main Grid: Left Content (lg:col-span-8) & Right Sticky Booking Card (lg:col-span-4) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          {/* Left Column: Workshop Details & Editorial Sections */}
          <div className="lg:col-span-8 space-y-8 sm:space-y-10">
            {/* 1. Header Card: Poster & Title Section */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-black/8 shadow-xs">
              <div className="flex flex-col sm:flex-row gap-6 sm:gap-8 items-start">
                {/* Poster Image */}
                <div className="w-full sm:w-[220px] shrink-0 rounded-2xl overflow-hidden shadow-md border border-black/10">
                  <img
                    src={workshop.image}
                    alt={workshop.title}
                    className="w-full h-auto object-cover"
                  />
                </div>

                {/* Title Info */}
                <div className="flex-1">
                  {/* Badges Row */}
                  <div className="flex flex-wrap items-center gap-2 mb-3">
                    <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-[#145A96] text-white">
                      {workshop.category}
                    </span>
                    <span
                      className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                        workshop.badgeVariant === 'tomorrow' || workshop.badgeVariant === 'in2days'
                          ? 'bg-[#F28C28] text-white'
                          : 'bg-emerald-600 text-white'
                      }`}
                    >
                      {workshop.badgeText}
                    </span>
                  </div>

                  {/* Title */}
                  <h1 className="font-display font-extrabold text-2xl xs:text-3xl sm:text-4xl text-[#145A96] tracking-tight leading-tight mb-2">
                    {workshop.title}
                  </h1>

                  {/* Byline */}
                  <p className="text-xs sm:text-sm font-bold text-[#F28C28] uppercase tracking-wide mb-3">
                    by {workshop.instructorDisplay || workshop.instructor}
                  </p>

                  {/* Subtitle / Hook */}
                  <p className="text-xs sm:text-sm text-black/75 leading-relaxed font-normal mb-6">
                    {workshop.subtitle}
                  </p>

                  {/* 4 Key Info Cards */}
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-[#F8F9FA] rounded-2xl p-3 border border-black/5">
                      <span className="text-[10px] font-bold text-black/50 uppercase tracking-wider block mb-0.5">
                        DATE
                      </span>
                      <p className="text-xs font-bold text-black">
                        {workshop.dateFull || workshop.date}
                      </p>
                    </div>

                    <div className="bg-[#F8F9FA] rounded-2xl p-3 border border-black/5">
                      <span className="text-[10px] font-bold text-black/50 uppercase tracking-wider block mb-0.5">
                        TIME
                      </span>
                      <p className="text-xs font-bold text-black">
                        {workshop.time}
                      </p>
                    </div>

                    <div className="bg-[#F8F9FA] rounded-2xl p-3 border border-black/5">
                      <span className="text-[10px] font-bold text-black/50 uppercase tracking-wider block mb-0.5">
                        VENUE
                      </span>
                      <p className="text-xs font-bold text-black truncate">
                        {workshop.venueName || workshop.location}
                      </p>
                    </div>

                    <div className="bg-[#F8F9FA] rounded-2xl p-3 border border-black/5">
                      <span className="text-[10px] font-bold text-black/50 uppercase tracking-wider block mb-0.5">
                        DURATION
                      </span>
                      <p className="text-xs font-bold text-black">
                        {workshop.duration}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 2. ABOUT THE WORKSHOP */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-black/8 shadow-xs">
              <div className="flex items-center gap-2 mb-4">
                <span className="w-1.5 h-5 rounded-full bg-[#F28C28]" />
                <h2 className="font-display font-extrabold text-lg sm:text-xl text-[#111111] uppercase tracking-wide">
                  ABOUT THE WORKSHOP
                </h2>
              </div>
              <div className="text-xs sm:text-sm text-black/80 leading-relaxed space-y-3 font-normal whitespace-pre-line">
                {workshop.about || workshop.description}
              </div>
            </div>

            {/* 3. WHAT YOU'LL LEARN */}
            {workshop.learn && (
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-black/8 shadow-xs">
                <div className="flex items-center gap-2 mb-5">
                  <span className="w-1.5 h-5 rounded-full bg-[#F28C28]" />
                  <h2 className="font-display font-extrabold text-lg sm:text-xl text-[#111111] uppercase tracking-wide">
                    WHAT YOU&apos;LL LEARN
                  </h2>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  {workshop.learn.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-2.5">
                      <span className="w-5 h-5 rounded-full bg-[#F28C28] text-white flex items-center justify-center shrink-0 mt-0.5 shadow-2xs">
                        <Check className="w-3 h-3 stroke-[3]" />
                      </span>
                      <span className="text-xs sm:text-sm text-black/85 font-medium leading-snug">
                        {item}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 4. WHO SHOULD ATTEND & WHAT TO BRING */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Who Should Attend */}
              <div className="bg-white rounded-3xl p-6 border border-black/8 shadow-xs">
                <div className="flex items-center gap-2 mb-3">
                  <span className="w-1.5 h-4 rounded-full bg-[#F28C28]" />
                  <h3 className="font-display font-extrabold text-sm sm:text-base text-[#111111] uppercase tracking-wide">
                    WHO SHOULD ATTEND
                  </h3>
                </div>
                <p className="text-xs sm:text-sm text-black/75 leading-relaxed">
                  {workshop.whoShouldAttend || 'Adults and teens looking to learn and express themselves. No prior experience required.'}
                </p>
              </div>

              {/* What to Bring */}
              <div className="bg-white rounded-3xl p-6 border border-black/8 shadow-xs">
                <div className="flex items-center gap-2 mb-3">
                  <span className="w-1.5 h-4 rounded-full bg-[#F28C28]" />
                  <h3 className="font-display font-extrabold text-sm sm:text-base text-[#111111] uppercase tracking-wide">
                    WHAT TO BRING
                  </h3>
                </div>
                <div className="space-y-2">
                  {(workshop.whatToBring || [
                    'Comfortable workout / dance wear',
                    'Water bottle',
                    'A towel',
                  ]).map((item, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <span className="w-4 h-4 rounded-full bg-[#F28C28] text-white flex items-center justify-center shrink-0">
                        <Check className="w-2.5 h-2.5 stroke-[3]" />
                      </span>
                      <span className="text-xs text-black/80 font-medium">
                        {item}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* 5. YOUR INSTRUCTOR */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-black/8 shadow-xs">
              <div className="flex items-center gap-2 mb-5">
                <span className="w-1.5 h-5 rounded-full bg-[#F28C28]" />
                <h2 className="font-display font-extrabold text-lg sm:text-xl text-[#111111] uppercase tracking-wide">
                  YOUR INSTRUCTOR
                </h2>
              </div>
              <div className="bg-[#F8F9FA] rounded-2xl p-5 border border-black/5 flex flex-col sm:flex-row items-center sm:items-start gap-5">
                <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden shrink-0 shadow-md border border-black/10">
                  <img
                    src={workshop.instructorImage}
                    alt={workshop.instructor}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 text-center sm:text-left">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-[#145A96]/10 text-[#145A96] inline-block mb-1.5">
                    {workshop.category === 'Wellness' ? 'FACILITATOR' : 'CHOREOGRAPHER'}
                  </span>
                  <h3 className="font-display font-bold text-base sm:text-lg text-black mb-1">
                    {workshop.instructorDisplay || workshop.instructor}
                  </h3>
                  <p className="text-xs text-black/75 leading-relaxed font-normal">
                    {workshop.instructorBio || workshop.instructorRole}
                  </p>
                </div>
              </div>
            </div>

            {/* 6. VENUE & ORGANISER */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-black/8 shadow-xs">
              <div className="flex items-center gap-2 mb-5">
                <span className="w-1.5 h-5 rounded-full bg-[#F28C28]" />
                <h2 className="font-display font-extrabold text-lg sm:text-xl text-[#111111] uppercase tracking-wide">
                  VENUE &amp; ORGANISER
                </h2>
              </div>

              <div className="bg-[#F8F9FA] rounded-2xl p-5 border border-black/5 flex flex-col sm:flex-row items-center sm:items-start gap-4 mb-4">
                <div className="w-14 h-14 rounded-xl bg-white p-2 shadow-xs border border-black/5 shrink-0 flex items-center justify-center">
                  <img src={rbdcLogo} alt="RBDC Logo" className="w-full h-auto object-contain" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-sm text-black">
                    Organised by Rhythmic Beat Dance Court
                  </h3>
                  <p className="text-xs text-black/60 mt-0.5">
                    {workshop.address}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="bg-[#F8F9FA] rounded-xl p-3 border border-black/5 flex items-center gap-2.5">
                  <MapPin className="w-4 h-4 text-[#145A96] shrink-0" />
                  <div>
                    <span className="text-[10px] font-bold text-black/50 uppercase block">FACILITIES</span>
                    <span className="font-medium text-black">{workshop.facilities}</span>
                  </div>
                </div>

                <div className="bg-[#F8F9FA] rounded-xl p-3 border border-black/5 flex items-center gap-2.5">
                  <Phone className="w-4 h-4 text-[#F28C28] shrink-0" />
                  <div>
                    <span className="text-[10px] font-bold text-black/50 uppercase block">QUESTIONS</span>
                    <a href="tel:+919655551055" className="font-bold text-black hover:underline">
                      +91 96555 51055
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* 7. WHAT ATTENDEES SAY */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-black/8 shadow-xs">
              <div className="flex items-center gap-2 mb-4">
                <span className="w-1.5 h-5 rounded-full bg-[#F28C28]" />
                <h2 className="font-display font-extrabold text-lg sm:text-xl text-[#111111] uppercase tracking-wide">
                  WHAT ATTENDEES SAY
                </h2>
              </div>
              <div className="rounded-2xl border-2 border-dashed border-black/10 p-5 text-center bg-[#F8F9FA]">
                <div className="flex items-center justify-center gap-1 text-[#F28C28] mb-2">
                  <Star className="w-4 h-4" />
                  <Star className="w-4 h-4" />
                  <Star className="w-4 h-4" />
                  <Star className="w-4 h-4" />
                  <Star className="w-4 h-4" />
                </div>
                <p className="text-xs font-bold text-black mb-1">
                  Reviews open after the workshop
                </p>
                <p className="text-[11px] text-black/60 max-w-sm mx-auto">
                  Attendees can rate and review this workshop once it&apos;s done. Ratings from past RB workshops will appear here.
                </p>
              </div>
            </div>

            {/* 8. TERMS & CONDITIONS */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-black/8 shadow-xs">
              <div className="flex items-center gap-2 mb-4">
                <span className="w-1.5 h-5 rounded-full bg-[#F28C28]" />
                <h2 className="font-display font-extrabold text-lg sm:text-xl text-[#111111] uppercase tracking-wide">
                  TERMS &amp; CONDITIONS
                </h2>
              </div>
              <div className="space-y-2.5 text-xs text-black/75 font-medium">
                {[
                  'Workshop fees are non-refundable and non-transferable.',
                  'Please arrive at least 10 minutes before the session starts.',
                  'Floor shoes only. Outside shoes are not allowed on the floor.',
                  'Early-bird pricing applies only while early-bird slots last.',
                  'The management reserves the right to change the schedule or timing.',
                  'Please avoid bringing valuables to the session.',
                ].map((term, idx) => (
                  <div key={idx} className="flex items-start gap-2.5">
                    <span className="text-[#F28C28] font-bold font-mono">
                      {String(idx + 1).padStart(2, '0')}
                    </span>
                    <span className="leading-relaxed">{term}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Sticky Booking Widget (lg:col-span-4) */}
          {/* Right Column: Sticky Booking Widget (lg:col-span-4) - Floats and stays fixed on scroll on desktop */}
          <div className="lg:col-span-4 sticky top-24 sm:top-28 self-start z-30 space-y-4">
            <div className="bg-white rounded-3xl p-6 sm:p-7 border border-black/8 shadow-xl max-h-[calc(100vh-8rem)] overflow-y-auto no-scrollbar scrollbar-none">
              {/* Header: Date & Time */}
              <div className="mb-4">
                <span className="text-[11px] font-bold text-[#F28C28] uppercase tracking-wider block mb-1">
                  {workshop.dayNumber} {workshop.monthAbbr} • {workshop.time.split('–')[0].trim()}
                </span>
                <h3 className="font-display font-black text-xl text-[#145A96] tracking-tight">
                  RESERVE YOUR SLOT
                </h3>
              </div>

              {/* Radio Option Card */}
              <div className="p-4 rounded-2xl border-2 border-[#F28C28] bg-orange-50/40 mb-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="w-4 h-4 rounded-full border-4 border-[#F28C28] bg-white" />
                  <div>
                    <p className="text-xs font-bold text-black">
                      {workshop.pricing?.label || 'Single entry'}
                    </p>
                    <p className="text-[11px] text-black/60">
                      {workshop.pricing?.sublabel || 'Includes workshop slot & recording'}
                    </p>
                  </div>
                </div>
                <span className="font-display font-black text-lg text-black">
                  ₹{unitPrice}
                </span>
              </div>

              {/* Participants Counter */}
              <div className="flex items-center justify-between py-2 border-b border-black/5 mb-4">
                <div>
                  <span className="text-xs font-bold text-black block">Participants</span>
                  <span className="text-[10px] text-black/50">Max 5 per booking</span>
                </div>
                <div className="flex items-center gap-3 bg-[#F1F3F5] px-3 py-1 rounded-full border border-black/5">
                  <button
                    type="button"
                    onClick={() => setParticipantsCount((c) => Math.max(1, c - 1))}
                    className="w-5 h-5 rounded-full bg-white flex items-center justify-center font-bold text-xs shadow-2xs hover:bg-black/5 cursor-pointer"
                  >
                    -
                  </button>
                  <span className="text-xs font-bold text-black min-w-4 text-center">
                    {participantsCount}
                  </span>
                  <button
                    type="button"
                    onClick={() => setParticipantsCount((c) => Math.min(5, c + 1))}
                    className="w-5 h-5 rounded-full bg-white flex items-center justify-center font-bold text-xs shadow-2xs hover:bg-black/5 cursor-pointer"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Total Calculation */}
              <div className="flex items-center justify-between mb-5">
                <span className="text-sm font-medium text-black/70">Total</span>
                <span className="font-display font-black text-2xl text-[#111111]">
                  ₹{totalPrice}
                </span>
              </div>

              {/* Primary CTA: Pay & reserve slot (Opens Payment Popup Modal) */}
              <button
                id="workshop-pay-reserve-btn"
                type="button"
                onClick={() => setIsPaymentModalOpen(true)}
                className="w-full py-3.5 px-6 rounded-2xl bg-[#F28C28] hover:bg-[#E07A18] text-white font-bold text-sm tracking-wide shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer mb-2.5 active:scale-[0.99]"
              >
                <span>Pay &amp; reserve slot</span>
              </button>

              {/* Secondary CTA: Enquire now (Opens Enquiry Popup Modal) */}
              <button
                id="workshop-enquire-now-btn"
                type="button"
                onClick={() => setIsEnquiryModalOpen(true)}
                className="w-full py-2.5 px-6 rounded-2xl bg-white hover:bg-black/5 text-black font-semibold text-xs border border-black/15 transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-[0.99]"
              >
                <span>Enquire now</span>
              </button>

              {/* Trust Badge */}
              <p className="text-[11px] text-center text-black/50 pt-4 flex items-center justify-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>Secure payment · UPI, cards &amp; net banking</span>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Responsive Fixed Reservation Bar for Mobile & Tablet screens (< lg) so it stays pinned on scroll */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-black/10 px-4 py-3 shadow-[0_-8px_30px_rgba(0,0,0,0.15)] animate-in slide-in-from-bottom duration-200">
        <div className="max-w-[700px] mx-auto flex items-center justify-between gap-3">
          {/* Price & Slot Info */}
          <div className="min-w-0">
            <span className="text-[10px] font-bold text-[#F28C28] uppercase tracking-wider block leading-none mb-1 truncate">
              {workshop.dayNumber} {workshop.monthAbbr} • {workshop.time.split('–')[0].trim()}
            </span>
            <div className="flex items-baseline gap-1.5">
              <span className="font-display font-black text-xl text-[#111111] leading-none">
                ₹{totalPrice}
              </span>
              {participantsCount > 1 && (
                <span className="text-[10px] text-black/50 font-medium">
                  ({participantsCount} slots)
                </span>
              )}
            </div>
          </div>

          {/* Action CTAs */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              id="mobile-workshop-enquire-btn"
              type="button"
              onClick={() => setIsEnquiryModalOpen(true)}
              className="py-2.5 px-3.5 rounded-xl bg-white hover:bg-black/5 text-black font-semibold text-xs border border-black/15 transition-all cursor-pointer shadow-2xs active:scale-95"
            >
              Enquire
            </button>
            <button
              id="mobile-workshop-pay-reserve-btn"
              type="button"
              onClick={() => setIsPaymentModalOpen(true)}
              className="py-2.5 px-4 rounded-xl bg-[#F28C28] hover:bg-[#E07A18] text-white font-bold text-xs shadow-md transition-all flex items-center gap-1.5 cursor-pointer active:scale-95"
            >
              <span>Pay &amp; reserve</span>
            </button>
          </div>
        </div>
      </div>

      {/* Payment Popup Modal on click 'Pay & reserve slot' */}
      <WorkshopPaymentModal
        isOpen={isPaymentModalOpen}
        onClose={() => setIsPaymentModalOpen(false)}
        workshop={workshop}
        initialParticipants={participantsCount}
      />

      {/* Enquiry Popup Modal on click 'Enquire now' */}
      <WorkshopEnquiryModal
        isOpen={isEnquiryModalOpen}
        onClose={() => setIsEnquiryModalOpen(false)}
        workshop={workshop}
      />
    </div>
  );
};

export default WorkshopDetailsPage;
