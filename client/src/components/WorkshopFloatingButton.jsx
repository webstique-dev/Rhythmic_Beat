import { useState, useEffect, useRef } from 'react';
import {
  Sparkles,
  X,
  Clock,
  MapPin,
  ArrowRight,
  Phone,
  Zap
} from 'lucide-react';
import { workshopsData } from '../data/workshops';
import ishwaryaAvatar from '../assets/instructor-ishwarya.jpg';

export const WorkshopFloatingButton = ({ onSelectWorkshop, onClick }) => {
  const [position, setPosition] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isCardPopupOpen, setIsCardPopupOpen] = useState(false);

  const dragInfoRef = useRef({
    startX: 0,
    startY: 0,
    originX: 0,
    originY: 0,
    hasMoved: false,
    activePointerId: null,
  });

  const buttonRef = useRef(null);
  const popupRef = useRef(null);

  // Responsive button size
  const buttonSize = 56;
  const margin = 8;

  const upcomingWorkshops = workshopsData.filter((w) => w.status === 'Upcoming');

  // Initialize position at bottom-right corner once mounted
  useEffect(() => {
    const initX = Math.max(margin, window.innerWidth - buttonSize - margin - 8);
    const initY = Math.max(margin, window.innerHeight - buttonSize - margin - 10);
    setPosition({ x: initX, y: initY });

    const handleResize = () => {
      setPosition((prev) => {
        if (!prev) return prev;
        const maxX = Math.max(margin, window.innerWidth - buttonSize - margin);
        const maxY = Math.max(margin, window.innerHeight - buttonSize - margin);
        return {
          x: Math.min(Math.max(margin, prev.x), maxX),
          y: Math.min(Math.max(margin, prev.y), maxY),
        };
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Close popup on outside click
  useEffect(() => {
    if (!isCardPopupOpen) return;

    const handlePointerDownOutside = (e) => {
      if (
        popupRef.current &&
        !popupRef.current.contains(e.target) &&
        buttonRef.current &&
        !buttonRef.current.contains(e.target)
      ) {
        setIsCardPopupOpen(false);
      }
    };

    window.addEventListener('pointerdown', handlePointerDownOutside);
    return () => window.removeEventListener('pointerdown', handlePointerDownOutside);
  }, [isCardPopupOpen]);

  // Close popup on Escape key
  useEffect(() => {
    if (!isCardPopupOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setIsCardPopupOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isCardPopupOpen]);

  const handlePointerDown = (e) => {
    // Only respond to main button click/touch
    if (e.button !== undefined && e.button !== 0) return;

    dragInfoRef.current = {
      startX: e.clientX,
      startY: e.clientY,
      originX: position?.x || (window.innerWidth - buttonSize - margin),
      originY: position?.y || (window.innerHeight - buttonSize - margin),
      hasMoved: false,
      activePointerId: e.pointerId,
    };

    try {
      e.currentTarget.setPointerCapture(e.pointerId);
    } catch {
      // Ignore if pointer capture fails
    }
    setIsDragging(true);
  };

  const handlePointerMove = (e) => {
    if (!isDragging || dragInfoRef.current.activePointerId !== e.pointerId) return;

    const dx = e.clientX - dragInfoRef.current.startX;
    const dy = e.clientY - dragInfoRef.current.startY;

    if (!dragInfoRef.current.hasMoved && Math.hypot(dx, dy) > 5) {
      dragInfoRef.current.hasMoved = true;
      // Close popup while dragging for clear visibility
      setIsCardPopupOpen(false);
    }

    if (dragInfoRef.current.hasMoved) {
      const maxX = Math.max(margin, window.innerWidth - buttonSize - margin);
      const maxY = Math.max(margin, window.innerHeight - buttonSize - margin);

      const nextX = Math.min(Math.max(margin, dragInfoRef.current.originX + dx), maxX);
      const nextY = Math.min(Math.max(margin, dragInfoRef.current.originY + dy), maxY);

      setPosition({ x: nextX, y: nextY });
    }
  };

  const handlePointerUp = (e) => {
    if (dragInfoRef.current.activePointerId !== e.pointerId) return;

    try {
      e.currentTarget.releasePointerCapture(e.pointerId);
    } catch {
      // Ignore
    }

    setIsDragging(false);
    dragInfoRef.current.activePointerId = null;

    // If it was a clean click/tap without dragging, toggle popup or trigger onClick
    if (!dragInfoRef.current.hasMoved) {
      setIsCardPopupOpen((prev) => !prev);
      onClick?.();
    }
  };

  const handlePointerCancel = (e) => {
    if (dragInfoRef.current.activePointerId === e.pointerId) {
      try {
        e.currentTarget.releasePointerCapture(e.pointerId);
      } catch {
        // Ignore
      }
      setIsDragging(false);
      dragInfoRef.current.activePointerId = null;
    }
  };

  const handleSelect = (workshopId) => {
    setIsCardPopupOpen(false);
    onSelectWorkshop?.(workshopId);
  };

  if (!position) return null;

  // Calculate coordinates for the popup ensuring full visibility down to 320px
  const screenW = typeof window !== 'undefined' ? window.innerWidth : 360;
  const screenH = typeof window !== 'undefined' ? window.innerHeight : 600;

  // Fit smoothly within 320px viewports (304px width max with 8px gutters)
  const popupWidth = Math.min(350, Math.max(280, screenW - 16));
  const popupMaxHeight = Math.min(480, screenH - 24);

  let targetX = position.x - popupWidth - 10;
  if (position.x < popupWidth + 14) {
    targetX = position.x + buttonSize + 10;
  }
  const safeX = Math.max(8, Math.min(targetX, screenW - popupWidth - 8));

  let targetY = position.y - (popupMaxHeight - buttonSize);
  if (targetY < 8) {
    targetY = position.y;
  }
  const safeY = Math.max(8, Math.min(targetY, screenH - popupMaxHeight - 8));

  // Position tooltip to the right if dragged too close to the left boundary
  const showTooltipOnRight = position.x < 240;

  return (
    <>
      {/* Floating Action Button */}
      <aside
        ref={buttonRef}
        aria-label="Upcoming Workshop Quick Access"
        style={{
          transform: `translate3d(${position.x}px, ${position.y}px, 0)`,
          touchAction: 'none',
        }}
        className={`fixed top-0 left-0 z-40 flex items-center select-none pointer-events-auto transition-transform ${
          isDragging ? 'duration-0' : 'duration-75 ease-out'
        }`}
      >
        {/* Floating Hover Tooltip (Desktop - shown when popup is closed) */}
        {!isCardPopupOpen && (
          <div
            className={`hidden sm:flex items-center gap-2 bg-[#10203A] text-white px-3.5 py-1.5 rounded-full shadow-lg border border-white/10 opacity-0 group-hover:opacity-100 transition-all duration-200 pointer-events-none absolute whitespace-nowrap ${
              showTooltipOnRight ? 'left-[105%] ml-2' : 'right-[105%] mr-2'
            } ${isDragging ? '!opacity-0' : ''}`}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#F28C1E] animate-ping" />
            <span className="text-xs font-semibold">
              {upcomingWorkshops.length} Upcoming Workshops • Click to view
            </span>
          </div>
        )}

        {/* Main Draggable Circular Button */}
        <div className="relative group">
          {/* Pulsing Outer Rings */}
          <span className="absolute -inset-1 rounded-full bg-[#F28C1E]/35 animate-ping opacity-75 pointer-events-none" />
          <span className="absolute -inset-2 rounded-full bg-[#F28C1E]/15 animate-pulse pointer-events-none" />

          <button
            type="button"
            id="floating-workshop-btn"
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerCancel={handlePointerCancel}
            aria-label="Drag anywhere or click for upcoming workshops list"
            aria-expanded={isCardPopupOpen}
            title="Drag anywhere or click to view upcoming workshops"
            style={{ touchAction: 'none' }}
            className={`relative w-12 h-12 xs:w-13 xs:h-13 sm:w-14 sm:h-14 rounded-full bg-gradient-to-tr from-[#18181B] via-[#10203A] to-[#1E5BB8] text-white p-0.5 shadow-xl hover:shadow-2xl border-2 transition-all duration-200 flex items-center justify-center focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#F28C1E]/40 ${
              isCardPopupOpen
                ? 'border-[#F28C1E] ring-4 ring-[#F28C1E]/40 scale-105'
                : 'border-white'
            } ${
              isDragging
                ? 'cursor-grabbing scale-110 shadow-2xl ring-4 ring-[#F28C1E]/50'
                : 'cursor-grab hover:scale-108 active:scale-95'
            }`}
          >
            {/* Circular Thumbnail Inside Button */}
            <div className="relative w-full h-full rounded-full overflow-hidden flex items-center justify-center bg-[#10203A] pointer-events-none">
              <img
                src={ishwaryaAvatar}
                alt="Upcoming Workshops"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300 pointer-events-none"
                draggable="false"
              />
              {/* Dark wash & Sparkle Badge */}
              <div className="absolute inset-0 bg-black/25 group-hover:bg-transparent transition-colors" />
              <div className="absolute -top-1 -right-1 bg-[#F28C1E] text-white rounded-full p-1 shadow-xs border border-white">
                <Sparkles className="w-2.5 h-2.5" />
              </div>
            </div>
          </button>

          {/* Mobile Mini Badge */}
          <div className="sm:hidden absolute -bottom-1 left-1/2 -translate-x-1/2 bg-[#18181B] text-white text-[8.5px] font-bold px-1.5 py-0.2 rounded-full shadow-xs border border-white/20 whitespace-nowrap pointer-events-none">
            {upcomingWorkshops.length} Live
          </div>
        </div>
      </aside>

      {/* Nearby Floating Card Popup Showing All Upcoming Workshops */}
      {isCardPopupOpen && (
        <div
          ref={popupRef}
          role="dialog"
          aria-label="Upcoming Workshops List"
          style={{
            transform: `translate3d(${safeX}px, ${safeY}px, 0)`,
            width: `${popupWidth}px`,
            maxHeight: `${popupMaxHeight}px`,
          }}
          className="fixed top-0 left-0 z-50 bg-[#FAF9F5] text-[#10203A] rounded-2xl xs:rounded-3xl border border-[#ECE7DC] shadow-2xl flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200 select-none"
        >
          {/* Card Popup Header */}
          <div className="bg-[#10203A] text-white px-3 sm:px-4 py-2.5 sm:py-3.5 flex items-center justify-between border-b border-white/10 shrink-0">
            <div className="flex items-center gap-2 min-w-0">
              <span className="w-6 h-6 sm:w-7 sm:h-7 rounded-lg bg-[#F28C1E]/20 border border-[#F28C1E]/40 flex items-center justify-center text-[#F28C1E] shrink-0">
                <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </span>
              <div className="min-w-0">
                <div className="flex items-center gap-1.5">
                  <h3 className="font-display font-bold text-xs sm:text-sm tracking-tight text-white leading-tight truncate">
                    Upcoming Workshops
                  </h3>
                  <span className="text-[9px] sm:text-[10px] font-extrabold uppercase px-1.5 py-0.2 rounded-md bg-[#F28C1E] text-white shrink-0">
                    {upcomingWorkshops.length} Live
                  </span>
                </div>
                <p className="text-[9px] sm:text-[10px] text-white/70 leading-tight mt-0.5 truncate">
                  Click a workshop card to see details
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setIsCardPopupOpen(false)}
              aria-label="Close workshops popup"
              className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer shrink-0 ml-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F28C1E]"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* List of Upcoming Workshop Cards (Scrollbar Hidden cleanly) */}
          <div
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            className="flex-1 overflow-y-auto overscroll-contain divide-y divide-[#ECE7DC] scrollbar-none no-scrollbar p-2 space-y-1.5"
          >
            {upcomingWorkshops.map((item) => (
              <div
                key={item.id}
                role="button"
                tabIndex={0}
                onClick={() => handleSelect(item.id)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handleSelect(item.id);
                  }
                }}
                className="group w-full p-2.5 rounded-2xl bg-white hover:bg-[#F8FAFD] border border-[#ECE7DC] hover:border-[#F28C1E]/40 hover:shadow-md transition-all duration-200 cursor-pointer flex flex-col gap-2 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F28C1E]"
              >
                {/* Top Row: Thumbnail + Category & Price + Title */}
                <div className="flex items-start gap-2.5">
                  {/* Thumbnail */}
                  <div className="relative w-12 h-12 rounded-xl overflow-hidden shrink-0 border border-[#ECE7DC] group-hover:border-[#F28C1E]/50 transition-colors bg-[#10203A]">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent" />
                    <span className="absolute bottom-0.5 left-0.5 right-0.5 text-[7.5px] font-bold text-center text-white bg-black/60 py-0.2 rounded leading-none truncate">
                      {item.date.split(',')[0]}
                    </span>
                  </div>

                  {/* Middle Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-1">
                      <div className="flex items-center gap-1 min-w-0">
                        <span className="text-[8.5px] font-extrabold uppercase tracking-wider text-[#F28C1E] truncate">
                          {item.category}
                        </span>
                        {item.isFeatured && (
                          <span className="inline-flex items-center gap-0.5 text-[7.5px] font-bold uppercase px-1 py-0.2 rounded bg-[#FFF6EE] text-[#F28C1E] border border-[#F28C1E]/30 shrink-0">
                            <Zap className="w-2 h-2" />
                            Featured
                          </span>
                        )}
                      </div>

                      {/* Early Bird Price Tag */}
                      <span className="font-display font-extrabold text-[11px] sm:text-xs text-[#10203A] bg-[#FAF9F5] border border-[#ECE7DC] px-1.5 py-0.2 rounded-md shrink-0">
                        {item.pricing.earlyBird}
                      </span>
                    </div>

                    <h4 className="font-display font-bold text-xs sm:text-[13px] text-[#10203A] group-hover:text-[#1E5BB8] transition-colors leading-tight line-clamp-1 mt-0.5">
                      {item.title}
                    </h4>

                    <p className="text-[10px] text-[#4A5B78] font-medium truncate mt-0.5">
                      with {item.instructor}
                    </p>
                  </div>
                </div>

                {/* Bottom Row: Time, Location, and Details CTA */}
                <div className="pt-1.5 border-t border-[#F4F4F5] flex items-center justify-between text-[9.5px] sm:text-[10px] text-[#71717A]">
                  <div className="flex items-center gap-2 truncate">
                    <span className="flex items-center gap-1 shrink-0">
                      <Clock className="w-2.5 h-2.5 text-[#1E5BB8]" />
                      <span>{item.time.split('-')[0].trim()}</span>
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1 truncate">
                      <MapPin className="w-2.5 h-2.5 text-[#F28C1E] shrink-0" />
                      <span className="truncate">{item.location.split('(')[0].trim()}</span>
                    </span>
                  </div>

                  <div className="inline-flex items-center gap-1 font-semibold text-[#10203A] group-hover:text-[#F28C1E] transition-colors shrink-0 ml-1.5">
                    <span className="text-[9px]">Details</span>
                    <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Footer with Helpline & Quick Action */}
          <div className="bg-white px-3 py-2 border-t border-[#ECE7DC] flex items-center justify-between text-[10px] shrink-0">
            <a
              href="tel:+919655551055"
              className="text-[#71717A] hover:text-[#F28C1E] transition-colors inline-flex items-center gap-1 font-semibold"
            >
              <Phone className="w-3 h-3 text-[#F28C1E]" />
              <span>+91 96555 51055</span>
            </a>

            <span className="text-[9.5px] text-[#71717A] font-medium">
              Tap to view details
            </span>
          </div>
        </div>
      )}
    </>
  );
};
