import { useState, useEffect, useRef } from 'react';
import {
  Sparkles,
  X,
  ArrowRight,
} from 'lucide-react';
import { workshopsData } from '../data/workshops';
import ishwaryaAvatar from '../assets/instructor-ishwarya.jpg';
import soundHealingDetailImg from '../assets/workshops/sound-healing-detail.png';
import sujithPosterImg from '../assets/workshops/sujith-poster.png';
import pavithraPosterImg from '../assets/workshops/pavithra-poster.png';

export const WorkshopFloatingButton = ({
  isOpen: controlledIsOpen,
  onToggle,
  onClose,
  onNavigate,
  onSelectWorkshop,
}) => {
  const [position, setPosition] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [internalIsOpen, setInternalIsOpen] = useState(false);
  const [activeChipIndex, setActiveChipIndex] = useState(0);

  const isControlled = controlledIsOpen !== undefined;
  const isPopupOpen = isControlled ? controlledIsOpen : internalIsOpen;

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

  const buttonSize = 56;
  const margin = 12;

  const upcomingWorkshops = workshopsData.filter((w) => w.status === 'Upcoming');

  // Workshop cards matching the exact 4 photos in the reference
  const fannedCards = [
    {
      id: upcomingWorkshops[0]?.id || 'sound-healing-workshop',
      title: upcomingWorkshops[0]?.title || 'Sound Healing Workshop',
      image: soundHealingDetailImg,
      cropClass: 'object-cover object-[center_65%]',
      rotateClass: '-rotate-[12deg] -translate-x-1',
      zIndexClass: 'z-10',
    },
    {
      id: upcomingWorkshops[1]?.id || 'choreography-workshop-sujith',
      title: upcomingWorkshops[1]?.title || 'Choreography Workshop (Sujith)',
      image: sujithPosterImg,
      cropClass: 'object-cover object-[center_28%]',
      rotateClass: '-rotate-[3deg]',
      zIndexClass: 'z-20',
    },
    {
      id: upcomingWorkshops[2]?.id || 'choreography-workshop-pavithra',
      title: upcomingWorkshops[2]?.title || 'Choreography Workshop (Pavithra)',
      image: pavithraPosterImg,
      cropClass: 'object-cover object-[center_25%]',
      rotateClass: 'rotate-[4deg]',
      zIndexClass: 'z-30',
    },
    {
      id: upcomingWorkshops[3]?.id || 'bollywood-intensive-ishwarya',
      title: upcomingWorkshops[3]?.title || 'Western & Zumba (Ishwarya)',
      image: ishwaryaAvatar,
      cropClass: 'object-cover object-center',
      rotateClass: 'rotate-[12deg] translate-x-1',
      zIndexClass: 'z-20',
    },
  ];

  // Initialize position at bottom-right corner once mounted
  useEffect(() => {
    const initX = Math.max(margin, window.innerWidth - buttonSize - margin - 4);
    const initY = Math.max(margin, window.innerHeight - buttonSize - margin - 6);
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

  // Cycle workshop preview chip every 3.5 seconds when popup is open
  useEffect(() => {
    if (!isPopupOpen || upcomingWorkshops.length <= 1) return;
    const interval = setInterval(() => {
      setActiveChipIndex((prev) => (prev + 1) % upcomingWorkshops.length);
    }, 3500);
    return () => clearInterval(interval);
  }, [isPopupOpen, upcomingWorkshops.length]);

  // Close popup on outside click
  useEffect(() => {
    if (!isPopupOpen) return;

    const handlePointerDownOutside = (e) => {
      if (
        popupRef.current &&
        !popupRef.current.contains(e.target) &&
        buttonRef.current &&
        !buttonRef.current.contains(e.target)
      ) {
        handleDismiss();
      }
    };

    window.addEventListener('pointerdown', handlePointerDownOutside);
    return () => window.removeEventListener('pointerdown', handlePointerDownOutside);
  }, [isPopupOpen]);

  // Close popup on Escape key
  useEffect(() => {
    if (!isPopupOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        handleDismiss();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isPopupOpen]);

  const handleDismiss = () => {
    try {
      sessionStorage.setItem('rbdc_workshop_popup_dismissed', 'true');
    } catch {
      // Ignore storage restrictions
    }
    if (isControlled) {
      onClose?.();
    } else {
      setInternalIsOpen(false);
    }
  };

  const handleToggle = () => {
    if (isControlled) {
      onToggle?.();
    } else {
      setInternalIsOpen((prev) => !prev);
    }
  };

  const handlePointerDown = (e) => {
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
      // Ignore
    }
    setIsDragging(true);
  };

  const handlePointerMove = (e) => {
    if (!isDragging || dragInfoRef.current.activePointerId !== e.pointerId) return;

    const dx = e.clientX - dragInfoRef.current.startX;
    const dy = e.clientY - dragInfoRef.current.startY;

    if (!dragInfoRef.current.hasMoved && Math.hypot(dx, dy) > 5) {
      dragInfoRef.current.hasMoved = true;
      if (isControlled) {
        onClose?.();
      } else {
        setInternalIsOpen(false);
      }
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

    if (!dragInfoRef.current.hasMoved) {
      handleToggle();
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

  const handleExplore = () => {
    handleDismiss();
    if (onNavigate) {
      onNavigate('/workshops');
    } else {
      window.history.pushState(null, '', '/workshops');
      window.dispatchEvent(new PopStateEvent('popstate'));
    }
  };

  const handleSelectWorkshopItem = (workshopId) => {
    handleDismiss();
    if (onSelectWorkshop) {
      onSelectWorkshop(workshopId);
    } else if (onNavigate) {
      onNavigate(`/workshops/${workshopId}`);
    } else {
      window.history.pushState(null, '', `/workshops/${workshopId}`);
      window.dispatchEvent(new PopStateEvent('popstate'));
    }
  };

  if (!position) return null;

  // Responsive popup positioning anchored directly nearby the circle button
  const screenW = typeof window !== 'undefined' ? window.innerWidth : 360;
  const screenH = typeof window !== 'undefined' ? window.innerHeight : 600;

  const popupWidth = Math.min(326, Math.max(285, screenW - 24));
  const popupEstimatedHeight = 365;

  // Position popup right above the circle button by default
  let targetX = position.x - popupWidth + buttonSize;
  let targetY = position.y - popupEstimatedHeight - 14;

  if (targetY < 12) {
    targetY = position.y + buttonSize + 14;
    if (targetY + popupEstimatedHeight > screenH - 12) {
      targetY = Math.max(12, screenH - popupEstimatedHeight - 12);
    }
  }

  const safeX = Math.max(12, Math.min(targetX, screenW - popupWidth - 12));
  const safeY = Math.max(12, Math.min(targetY, screenH - popupEstimatedHeight - 12));

  const activeWorkshop = upcomingWorkshops[activeChipIndex % upcomingWorkshops.length] || upcomingWorkshops[0];

  return (
    <>
      {/* Floating Action Button */}
      <aside
        ref={buttonRef}
        aria-label="Upcoming Workshops Quick Access"
        style={{
          transform: `translate3d(${position.x}px, ${position.y}px, 0)`,
          touchAction: 'none',
        }}
        className={`fixed top-0 left-0 z-40 flex items-center select-none pointer-events-auto transition-transform ${
          isDragging ? 'duration-0' : 'duration-75 ease-out'
        }`}
      >
        {/* Main Draggable Circular Button */}
        <div className="relative group">
          {/* Pulsing Outer Rings */}
          <span className="absolute -inset-1 rounded-full bg-[#F28C28]/35 animate-ping opacity-75 pointer-events-none" />
          <span className="absolute -inset-2 rounded-full bg-[#F28C28]/15 animate-pulse pointer-events-none" />

          <button
            type="button"
            id="floating-workshop-btn"
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerCancel={handlePointerCancel}
            aria-label="Click to view upcoming workshops"
            aria-expanded={isPopupOpen}
            title="Click to view upcoming workshops"
            style={{ touchAction: 'none' }}
            className={`relative w-12 h-12 xs:w-13 xs:h-13 sm:w-14 sm:h-14 rounded-full bg-gradient-to-tr from-[#222222] via-[#145A96] to-[#F28C28] text-white p-0.5 shadow-xl hover:shadow-2xl border-2 transition-all duration-200 flex items-center justify-center focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#F28C28]/40 ${
              isPopupOpen
                ? 'border-[#F28C28] ring-4 ring-[#F28C28]/40 scale-105'
                : 'border-white'
            } ${
              isDragging
                ? 'cursor-grabbing scale-110 shadow-2xl ring-4 ring-[#F28C28]/50'
                : 'cursor-grab hover:scale-108 active:scale-95'
            }`}
          >
            {/* Circular Thumbnail Inside Button */}
            <div className="relative w-full h-full rounded-full overflow-hidden flex items-center justify-center bg-[#222222] pointer-events-none">
              <img
                src={ishwaryaAvatar}
                alt="Upcoming Workshops"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300 pointer-events-none"
                draggable="false"
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors" />
              <div className="absolute -top-1 -right-1 bg-[#F28C28] text-white rounded-full p-1 shadow-xs border border-white">
                <Sparkles className="w-2.5 h-2.5" />
              </div>
            </div>
          </button>

          {/* Mini Badge */}
          <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 bg-[#222222] text-white text-[8px] font-black px-1.5 py-0.2 rounded-full shadow-xs border border-white/20 whitespace-nowrap pointer-events-none tracking-wider">
            {fannedCards.length} LIVE
          </div>
        </div>
      </aside>

      {/* Nearby Compact Popup Card (Matching Reference UI Exactly) */}
      {isPopupOpen && (
        <div
          ref={popupRef}
          role="dialog"
          aria-label="Upcoming Workshops Preview"
          style={{
            transform: `translate3d(${safeX}px, ${safeY}px, 0)`,
            width: `${popupWidth}px`,
          }}
          className="fixed top-0 left-0 z-50 bg-white text-[#222222] rounded-[26px] sm:rounded-[28px] border border-black/5 shadow-2xl flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200 select-none"
        >
          {/* Top Gradient Banner with Fanned Photo Deck */}
          <div className="relative bg-gradient-to-r from-[#FF7E1D] via-[#F28C28] to-[#253950] pt-3 px-3 pb-2 flex flex-col justify-between overflow-hidden">
            {/* Top Bar: Live Now Pill + Close Button */}
            <div className="flex items-center justify-between relative z-20">
              <div className="inline-flex items-center gap-1.5 bg-white text-[#111827] px-2.5 py-1 rounded-full text-[10.5px] font-black tracking-wider uppercase shadow-xs">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-red-600" />
                </span>
                <span>LIVE NOW</span>
              </div>

              <button
                type="button"
                onClick={handleDismiss}
                aria-label="Close workshops popup"
                className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white text-gray-700 hover:text-black flex items-center justify-center shadow-md transition-all hover:scale-105 active:scale-95 cursor-pointer ml-auto"
              >
                <X className="w-3.5 h-3.5 sm:w-4 sm:h-4 stroke-[2.5]" />
              </button>
            </div>

            {/* Fanned 4 Photo Cards Deck */}
            <div className="relative flex items-center justify-center -space-x-3.5 pt-2 pb-1 px-1">
              {fannedCards.map((card, idx) => {
                const isSelected = (activeChipIndex % upcomingWorkshops.length) === idx;
                return (
                  <button
                    key={card.id}
                    type="button"
                    onClick={() => setActiveChipIndex(idx)}
                    title={card.title}
                    aria-label={`Select ${card.title}`}
                    className={`relative w-[60px] h-[80px] sm:w-[66px] sm:h-[88px] rounded-xl bg-white p-[2px] shadow-lg border border-white/90 overflow-hidden shrink-0 transition-all duration-300 cursor-pointer ${
                      card.rotateClass
                    } ${
                      isSelected
                        ? 'scale-108 z-40 ring-2 ring-[#F28C28] -translate-y-1'
                        : `${card.zIndexClass} hover:scale-105 hover:z-35 opacity-95 hover:opacity-100`
                    }`}
                  >
                    <img
                      src={card.image}
                      alt={card.title}
                      className={`w-full h-full rounded-[9px] ${card.cropClass}`}
                      draggable="false"
                    />
                  </button>
                );
              })}
            </div>
          </div>

          {/* Card Body */}
          <div className="p-4 sm:p-5 bg-white flex flex-col">
            {/* Bold Two-Tone Headline */}
            <h3 className="font-display font-black text-xl sm:text-[22px] text-[#F28C28] leading-none tracking-tight uppercase">
              {fannedCards.length} WORKSHOPS
            </h3>
            <h4 className="font-display font-black text-xl sm:text-[22px] text-[#145A96] leading-tight tracking-tight uppercase mt-0.5">
              OPEN FOR BOOKING
            </h4>

            {/* Clickable Workshop Preview Chip */}
            <div
              role="button"
              tabIndex={0}
              onClick={() => handleSelectWorkshopItem(activeWorkshop.id)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  handleSelectWorkshopItem(activeWorkshop.id);
                }
              }}
              title="Click to view workshop"
              className="mt-3 px-3.5 py-2.5 rounded-2xl bg-[#F5F6F8] hover:bg-[#EEF1F5] border border-gray-100 flex items-center justify-between transition-all cursor-pointer group"
            >
              <div className="flex items-center gap-2 min-w-0 pr-1">
                <span className="text-[#F28C28] font-bold text-xs shrink-0 whitespace-nowrap">
                  {activeWorkshop.date}
                </span>
                <span className="text-[#222222] font-bold text-xs truncate">
                  {activeWorkshop.title}
                </span>
              </div>
              <ArrowRight className="w-3.5 h-3.5 text-gray-400 group-hover:text-[#F28C28] group-hover:translate-x-0.5 transition-all shrink-0 ml-1" />
            </div>

            {/* Animated Progress Indicator */}
            <div className="mt-2 w-full h-[3px] bg-gray-200 rounded-full overflow-hidden flex">
              <div
                className="h-full bg-[#F28C28] rounded-full transition-all duration-500 ease-out"
                style={{
                  width: `${(((activeChipIndex % upcomingWorkshops.length) + 1) / upcomingWorkshops.length) * 100}%`,
                }}
              />
            </div>

            {/* Action Buttons: Explore workshops + Later */}
            <div className="mt-4 flex items-center gap-2.5">
              <button
                type="button"
                onClick={handleExplore}
                className="flex-1 py-3 px-3 rounded-2xl bg-[#F28C28] hover:bg-[#E07A18] active:scale-[0.98] text-white font-bold text-xs sm:text-sm tracking-wide shadow-md hover:shadow-lg transition-all text-center cursor-pointer"
              >
                Explore workshops
              </button>
              <button
                type="button"
                onClick={handleDismiss}
                className="py-3 px-5 rounded-2xl border border-gray-200 hover:bg-gray-100 active:scale-[0.98] text-gray-800 font-bold text-xs sm:text-sm transition-all text-center cursor-pointer"
              >
                Later
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
