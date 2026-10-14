import { useState, useEffect, useRef, useCallback } from 'react';

import imgKrishnaDevotional from '../assets/imgi_72_image.webp';
import imgPinkDuet from '../assets/imgi_58_image.webp';
import imgAmbatturGroup from '../assets/dance-court-footer-group.webp';
import imgShivaStage from '../assets/imgi_9_image.webp';
import imgAwardStage from '../assets/imgi_28_image.webp';
import imgStageEmbrace from '../assets/imgi_34_image.webp';
import imgStudioMentors from '../assets/imgi_40_image.webp';
import imgKalyanMaster from '../assets/imgi_49_image.webp';
import imgCertificate from '../assets/imgi_66_image.webp';
// import imgFamilyDance from '../assets/poster-family-dance.webp';
// import imgFriendship from '../assets/poster-friendship.webp';
// import imgNallaruPoo from '../assets/poster-nallaru-poo.webp';
// import imgPesama from '../assets/poster-pesama.webp';
// import imgVaadaVaada from '../assets/poster-vaada-vaada.webp';
// import imgAerial from '../assets/aerial-workshop-poster.webp';
import imgSummerFest from '../assets/Hero-image.png';

const GALLERY_ITEMS = [
  {
    src: imgKrishnaDevotional,
    width: 1200,
    height: 1600,
    alt: 'Devotional classical dance presentation with mother and toddler in traditional Krishna attire',
    title: 'Devotional Classical',
    subtitle: 'Costume & Heritage'
  },
  {
    src: imgPinkDuet,
    width: 720,
    height: 1280,
    alt: 'Master Yuvi Smart Semiclassical workshop duet routine in studio',
    title: 'Semiclassical Intensive',
    subtitle: 'Master Yuvi Smart'
  },
  {
    src: imgAmbatturGroup,
    width: 828,
    height: 957,
    alt: 'Rhythmic Beat Dance Court Ambattur branch students and instructor ensemble',
    title: 'Ambattur Studio Ensemble',
    subtitle: 'Academy Batch'
  },
  {
    src: imgShivaStage,
    width: 1920,
    height: 1920,
    alt: 'Grand stage production with Lord Shiva backdrop and academy ensemble dancers',
    title: 'Grand Stage Production',
    subtitle: 'Ensemble Performance'
  },
  {
    src: imgAwardStage,
    width: 1400,
    height: 1050,
    alt: 'RBDC choreographers and dancers stage honours ceremony',
    title: 'Stage Honours',
    subtitle: 'Annual Showcase'
  },
  {
    src: imgStageEmbrace,
    width: 1920,
    height: 1920,
    alt: 'Stage felicitation and trophy honour ceremony',
    title: 'Faculty Recognition',
    subtitle: 'Choreography Awards'
  },
  {
    src: imgStudioMentors,
    width: 1200,
    height: 2133,
    alt: 'Studio mentor and students celebration',
    title: 'Academy Foundations',
    subtitle: 'Mentorship & Growth'
  },
  {
    src: imgKalyanMaster,
    width: 1920,
    height: 1080,
    alt: 'Grand welcome to Kalyan Master on stage',
    title: 'Masterclass Stage',
    subtitle: 'Kalyan Master Workshop'
  },
  {
    src: imgCertificate,
    width: 640,
    height: 1136,
    alt: 'Junior certificate achievement presentation',
    title: 'Junior Achievement',
    subtitle: 'Academy Graduation'
  },
  // {
  //   src: imgFamilyDance,
  //   width: 720,
  //   height: 1280,
  //   alt: 'High energy commercial studio routine',
  //   title: 'Bollywood Commercial',
  //   subtitle: 'High Octane Beats'
  // },
  // {
  //   src: imgFriendship,
  //   width: 720,
  //   height: 1280,
  //   alt: 'Friendship duet routine in dance court studio',
  //   title: 'Friendship Routine',
  //   subtitle: 'Duet Expressions'
  // },
  // {
  //   src: imgNallaruPoo,
  //   width: 720,
  //   height: 1280,
  //   alt: 'Junior batch Nallaru Poo routine performers',
  //   title: 'Junior Batch',
  //   subtitle: 'Musicality & Rhythm'
  // },
  // {
  //   src: imgPesama,
  //   width: 720,
  //   height: 1280,
  //   alt: 'Pesama duet routine rehearsal in studio',
  //   title: 'Pesama Duet',
  //   subtitle: 'Lyrical Partnering'
  // },
  // {
  //   src: imgVaadaVaada,
  //   width: 720,
  //   height: 1280,
  //   alt: 'Street style commercial routine',
  //   title: 'Urban Street',
  //   subtitle: 'Cyphers & Grooves'
  // },
  // {
  //   src: imgAerial,
  //   width: 720,
  //   height: 1280,
  //   alt: 'Aerial dance silk workshop rehearsal at dance court',
  //   title: 'Aerial Workshop',
  //   subtitle: 'Silks & Acrobatic Flow'
  // },
  {
    src: imgSummerFest,
    width: 1920,
    height: 1080,
    alt: 'Summer Fest stage ceremony with performers',
    title: 'Summer Fest',
    subtitle: 'Annual Celebration'
  }
];

export const GalleryShowcaseSection = () => {
  const sectionRef = useRef(null);
  const headerInnerRef = useRef(null);
  const trackRef = useRef(null);

  const [headerLeft, setHeaderLeft] = useState(24);
  const [totalHeight, setTotalHeight] = useState(0);

  const targetXRef = useRef(0);
  const currentXRef = useRef(0);
  const rafRef = useRef(null);

  // Drag interaction state
  const isDraggingRef = useRef(false);
  const hasMovedRef = useRef(false);
  const dragStartXRef = useRef(0);
  const dragStartScrollYRef = useRef(0);

  // Synchronize horizontal translation with current scroll progress
  const updateScroll = useCallback(() => {
    if (!sectionRef.current || !trackRef.current) return;
    const rect = sectionRef.current.getBoundingClientRect();
    const maxTranslate = Math.max(0, trackRef.current.scrollWidth - window.innerWidth);

    if (maxTranslate <= 0) {
      targetXRef.current = 0;
      return;
    }

    // Pinned scroll calculation
    const scrolled = -rect.top;
    const progress = Math.min(Math.max(scrolled / maxTranslate, 0), 1);
    targetXRef.current = progress * maxTranslate;
  }, []);

  // Update layout measurements dynamically
  const recalculate = useCallback(() => {
    if (!sectionRef.current || !trackRef.current) return;

    if (headerInnerRef.current) {
      const rect = headerInnerRef.current.getBoundingClientRect();
      setHeaderLeft(Math.max(16, rect.left));
    }

    const maxTranslate = Math.max(0, trackRef.current.scrollWidth - window.innerWidth);
    const newTotalHeight = window.innerHeight + maxTranslate;
    setTotalHeight(newTotalHeight);

    updateScroll();
  }, [updateScroll]);

  // Smooth momentum rendering loop via rAF
  useEffect(() => {
    let isRunning = true;

    const loop = () => {
      if (!isRunning) return;
      const target = targetXRef.current;
      const current = currentXRef.current;
      const diff = target - current;

      if (Math.abs(diff) > 0.05) {
        currentXRef.current += diff * 0.16;
        if (trackRef.current) {
          trackRef.current.style.transform = `translate3d(-${currentXRef.current.toFixed(2)}px, 0, 0)`;
        }
      } else if (diff !== 0) {
        currentXRef.current = target;
        if (trackRef.current) {
          trackRef.current.style.transform = `translate3d(-${target.toFixed(2)}px, 0, 0)`;
        }
      }

      rafRef.current = requestAnimationFrame(loop);
    };

    rafRef.current = requestAnimationFrame(loop);

    return () => {
      isRunning = false;
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  // Event listeners for scroll, resize and dimension monitoring
  useEffect(() => {
    recalculate();

    const handleScroll = () => updateScroll();
    const handleResize = () => recalculate();

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleResize);

    let ro = null;
    if (trackRef.current && typeof ResizeObserver !== 'undefined') {
      ro = new ResizeObserver(() => recalculate());
      ro.observe(trackRef.current);
    }

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
      if (ro) ro.disconnect();
    };
  }, [recalculate, updateScroll]);

  // Click card to center it smoothly in the viewport
  const handleCardClick = (index) => {
    if (hasMovedRef.current) return;
    if (!sectionRef.current || !trackRef.current) return;

    const card = trackRef.current.children[index];
    if (!card) return;

    const maxTranslate = Math.max(0, trackRef.current.scrollWidth - window.innerWidth);
    if (maxTranslate <= 0) return;

    // Center card horizontally
    const cardLeft = card.offsetLeft;
    const cardWidth = card.offsetWidth;
    const desiredX = cardLeft - (window.innerWidth - cardWidth) / 2;
    const clampedX = Math.min(Math.max(0, desiredX), maxTranslate);

    const targetProgress = clampedX / maxTranslate;
    const sectionTop = sectionRef.current.offsetTop;
    const targetScrollY = sectionTop + targetProgress * maxTranslate;

    window.scrollTo({ top: targetScrollY, behavior: 'smooth' });
  };

  // Drag interaction to scroll horizontally
  const handlePointerDown = (e) => {
    isDraggingRef.current = true;
    hasMovedRef.current = false;
    dragStartXRef.current = e.clientX;
    dragStartScrollYRef.current = window.scrollY;
  };

  const handlePointerMove = (e) => {
    if (!isDraggingRef.current) return;
    const deltaX = e.clientX - dragStartXRef.current;
    if (Math.abs(deltaX) > 6) {
      hasMovedRef.current = true;
      window.scrollTo({
        top: dragStartScrollYRef.current - deltaX,
        behavior: 'auto'
      });
    }
  };

  const handlePointerUp = () => {
    isDraggingRef.current = false;
  };

  return (
    <section
      id="gallery"
      ref={sectionRef}
      className="relative w-full bg-[#F8FAFD] border-b border-[rgba(16,32,58,0.14)]"
      style={{ height: totalHeight > 0 ? `${totalHeight}px` : '320vh' }}
      aria-label="Dance Motion Archive"
    >
      {/* Pinned Sticky Stage */}
      <div className="sticky top-0 w-full h-screen overflow-hidden flex flex-col justify-center pt-14 sm:pt-20 pb-6 sm:pb-10">
        {/* Header container aligned to site grid */}
        <div
          ref={headerInnerRef}
          className="w-full max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 mb-5 sm:mb-8 flex-shrink-0"
        >
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 sm:gap-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#F28C1E]" />
                <span className="text-[10px] sm:text-[11px] font-semibold text-[#10203A] uppercase tracking-[0.15em]">
                  04 / MOTION ARCHIVE
                </span>
              </div>
              <h2 className="font-display font-bold text-2xl sm:text-3xl md:text-5xl text-[#10203A] tracking-[-0.025em] leading-tight">
                Rhythm In Continuous Motion.
              </h2>
            </div>

            <p className="font-sans text-xs sm:text-sm text-[#7B8AA3] max-w-xs leading-relaxed">
              Drag to explore disciplines • Click card to center & inspect.
            </p>
          </div>
        </div>

        {/* Horizontal Scrolling Gallery Stage */}
        <div
          className="w-full overflow-hidden flex-1 flex items-center min-h-0 cursor-grab active:cursor-grabbing select-none"
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerLeave={handlePointerUp}
        >
          <div
            ref={trackRef}
            className="flex items-center gap-4 sm:gap-6 will-change-transform"
            style={{
              paddingLeft: `${headerLeft}px`,
              paddingRight: `${headerLeft}px`
            }}
          >
            {GALLERY_ITEMS.map((item, idx) => (
              <div
                key={idx}
                onClick={() => handleCardClick(idx)}
                style={{ aspectRatio: `${item.width} / ${item.height}` }}
                className="group relative flex-shrink-0 h-[340px] xs:h-[380px] sm:h-[420px] md:h-[460px] lg:h-[480px] rounded-[22px] sm:rounded-[26px] overflow-hidden bg-[#10203A]/5 border border-[rgba(16,32,58,0.06)] shadow-[0_12px_36px_-12px_rgba(16,32,58,0.12)] cursor-pointer transition-all duration-300 hover:scale-[1.015] hover:shadow-[0_20px_45px_-12px_rgba(16,32,58,0.2)]"
              >
                <img
                  src={item.src}
                  alt={item.alt}
                  width={item.width}
                  height={item.height}
                  className="h-full w-full object-cover rounded-[22px] sm:rounded-[26px] pointer-events-none select-none block"
                  loading="lazy"
                  decoding="async"
                  draggable="false"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
