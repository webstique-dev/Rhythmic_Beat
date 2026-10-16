import { useEffect } from 'react';
import {
  X,
  Calendar,
  Clock,
  MapPin,
  Phone,
  ArrowRight
} from 'lucide-react';
import { workshopsData, getNextUpcomingWorkshop } from '../data/workshops';

export const UpcomingWorkshopModal = ({
  isOpen,
  onClose,
  onBookSlot,
  onViewDetails,
  selectedWorkshopId,
  workshop = getNextUpcomingWorkshop(),
}) => {
  const activeWorkshop =
    workshopsData.find((w) => w.id === selectedWorkshopId) ||
    workshop ||
    workshopsData[0];

  // Close on ESC key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Lock body scroll when modal is active
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen || !activeWorkshop) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="upcoming-workshop-title"
      className="fixed inset-0 z-[100] flex items-center justify-center p-2 xs:p-3 sm:p-5 md:p-6 overflow-hidden animate-in fade-in duration-200"
    >
      {/* Dimmed Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/75 backdrop-blur-sm transition-opacity"
        aria-hidden="true"
      />

      {/* Main Dialog Card */}
      <div className="relative w-full max-w-[500px] sm:max-w-[540px] max-h-[96vh] sm:max-h-[92vh] bg-[#F1F3F5] rounded-2xl xs:rounded-3xl border border-[rgba(34,34,34,0.12)] shadow-2xl flex flex-col overflow-hidden z-10 my-auto text-[#222222] animate-in zoom-in-95 duration-200">
        {/* Floating Close Button */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Close workshop announcement"
          className="absolute top-3 right-3 z-30 w-8 h-8 rounded-full bg-black/65 hover:bg-black/85 text-white border border-white/20 shadow-md flex items-center justify-center transition-transform hover:scale-105 active:scale-95 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#145A96]"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Scrollable Container (Scrollbar Hidden) */}
        <div
          id="upcoming-workshop-scroll-body"
          tabIndex={0}
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          className="flex-1 overflow-y-auto overscroll-contain divide-y divide-[rgba(34,34,34,0.1)] focus:outline-none scrollbar-none no-scrollbar"
        >
          {/* Full Poster Image Display (Completely visible, uncropped) */}
          <div className="relative w-full bg-[#222222] flex items-center justify-center overflow-hidden">
            <img
              src={activeWorkshop.image}
              alt={activeWorkshop.title}
              className="w-full max-h-[56vh] sm:max-h-[62vh] object-contain block mx-auto"
            />
          </div>

          {/* Simple, On-Point Details */}
          <div className="p-3.5 sm:p-4.5 bg-[#F1F3F5] space-y-2.5 sm:space-y-3">
            {/* Category Pill, Title & Early Bird Fee */}
            <div className="flex items-start justify-between gap-2">
              <div className="min-w-0">
                <div className="flex items-center gap-1.5 mb-0.5">
                  <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-[#F28C28]">
                    {activeWorkshop.category}
                  </span>
                  <span className="text-[#222222]/30">•</span>
                  <span className="text-[10px] sm:text-xs font-semibold text-[#145A96]">
                    {activeWorkshop.duration}
                  </span>
                </div>
                <h3
                  id="upcoming-workshop-title"
                  className="font-display font-extrabold text-base sm:text-xl text-[#145A96] tracking-tight leading-snug"
                >
                  {activeWorkshop.title}
                </h3>
                <p className="text-[11px] sm:text-xs text-[#222222]/70 mt-0.5">
                  with {activeWorkshop.instructor}
                </p>
              </div>

              {/* Price Tag */}
              <div className="bg-white px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-xl border border-[rgba(34,34,34,0.1)] shadow-2xs text-right shrink-0">
                <span className="text-[8px] sm:text-[9px] uppercase font-bold text-[#222222]/70 block">
                  Early Bird
                </span>
                <span className="font-display font-extrabold text-sm sm:text-base text-[#222222]">
                  {activeWorkshop.pricing.earlyBird}
                </span>
              </div>
            </div>

            {/* Quick When & Where Strip */}
            <div className="bg-white rounded-xl p-2.5 sm:p-3 border border-[rgba(34,34,34,0.1)] grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-white border border-[#F28C28]/30 flex items-center justify-center text-[#F28C28] shrink-0">
                  <Calendar className="w-3.5 h-3.5" />
                </div>
                <div className="min-w-0">
                  <span className="font-bold text-[#222222] block truncate text-xs">
                    {activeWorkshop.date}
                  </span>
                  <span className="text-[#222222]/70 text-[10.5px] block truncate">
                    {activeWorkshop.time}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-white border border-[#145A96]/30 flex items-center justify-center text-[#145A96] shrink-0">
                  <MapPin className="w-3.5 h-3.5" />
                </div>
                <div className="min-w-0">
                  <span className="font-bold text-[#222222] block truncate text-xs">
                    {activeWorkshop.location.split('(')[0].trim()}
                  </span>
                  <span className="text-[#222222]/70 text-[10.5px] block truncate">
                    {activeWorkshop.address.split(',')[0]}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Action Footer */}
        <div className="p-2.5 sm:p-3.5 bg-white border-t border-[rgba(34,34,34,0.1)] flex flex-col sm:flex-row items-center justify-between gap-2 sm:gap-3 shrink-0">
          <div className="hidden sm:flex items-center gap-1.5 text-xs">
            <span className="text-[#222222]/70 text-[11px]">Enquiry:</span>
            <a
              href={`tel:${activeWorkshop.contactPhone}`}
              className="font-bold text-[#222222] hover:text-[#F28C28] transition-colors inline-flex items-center gap-1"
            >
              <Phone className="w-3.5 h-3.5 text-[#F28C28]" />
              <span>{activeWorkshop.contactPhone}</span>
            </a>
          </div>

          <div className="flex flex-col xs:flex-row items-stretch sm:items-center gap-2 w-full sm:w-auto">
            <button
              type="button"
              id="modal-view-details-btn"
              onClick={() => onViewDetails(activeWorkshop.id)}
              className="w-full sm:w-auto inline-flex items-center justify-center py-2 px-3.5 rounded-full text-xs font-semibold border border-[rgba(34,34,34,0.15)] bg-white text-[#222222] hover:bg-[#F1F3F5] transition-colors cursor-pointer text-center"
            >
              View Full Details Page
            </button>

            <button
              type="button"
              id="modal-book-slot-btn"
              onClick={() => onBookSlot(activeWorkshop)}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 py-2 px-5 rounded-full text-xs sm:text-sm font-bold bg-[#145A96] text-white hover:bg-[#145A96]/90 active:scale-[0.98] transition-all shadow-md cursor-pointer text-center"
            >
              <span>Book Your Slot</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#F28C28]" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
