import { useEffect, useRef, useState, useCallback } from 'react';
import desktopHeroVideo from '../assets/hero-semiclassical-optimized.mp4';
import mobileHeroVideo from '../assets/hero-mobile-optimized.mp4';
import desktopPoster from '../assets/poster-semiclassical.webp';
import mobilePoster from '../assets/poster-family-dance.webp';
import rightHeroImg from '../assets/Right-side-hero.jpg';
import leftHeroImg from '../assets/Our-Story-2.jpg';
import { heroData } from '../data/hero';
import { DisciplineWatermark } from './DisciplineWatermark';

export const PortalHero = ({ data = heroData }) => {
  const containerRef = useRef(null);
  const videoRef = useRef(null);
  const isPlayingRef = useRef(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  const [isMobile, setIsMobile] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.innerWidth < 768;
    }
    return false;
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const mql = window.matchMedia('(max-width: 767px)');
    const onChange = (e) => setIsMobile(e.matches);
    setIsMobile(mql.matches);
    mql.addEventListener('change', onChange);
    return () => mql.removeEventListener('change', onChange);
  }, []);

  const currentVideoSrc = isMobile ? mobileHeroVideo : desktopHeroVideo;
  const currentPoster = isMobile ? mobilePoster : desktopPoster;

  // Safe robust play function with multiple recovery strategies
  const attemptPlay = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;

    // Enforce muted and inline playback strictly on DOM node
    video.muted = true;
    video.defaultMuted = true;
    video.playsInline = true;
    video.setAttribute('muted', '');
    video.setAttribute('playsinline', '');
    video.setAttribute('webkit-playsinline', '');

    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          isPlayingRef.current = true;
        })
        .catch(() => {
          isPlayingRef.current = false;
          // Autoplay was restricted by browser: resume automatically on first user touch/click/scroll
          const resumeOnInteraction = () => {
            if (videoRef.current) {
              videoRef.current.muted = true;
              videoRef.current.play().then(() => {
                isPlayingRef.current = true;
              }).catch(() => {});
            }
            window.removeEventListener('click', resumeOnInteraction);
            window.removeEventListener('scroll', resumeOnInteraction);
            window.removeEventListener('touchstart', resumeOnInteraction);
            window.removeEventListener('pointerdown', resumeOnInteraction);
          };

          window.addEventListener('click', resumeOnInteraction, { once: true, passive: true });
          window.addEventListener('scroll', resumeOnInteraction, { once: true, passive: true });
          window.addEventListener('touchstart', resumeOnInteraction, { once: true, passive: true });
          window.addEventListener('pointerdown', resumeOnInteraction, { once: true, passive: true });
        });
    }
  }, []);

  // Initialize playback on source change & component mount
  useEffect(() => {
    attemptPlay();
  }, [currentVideoSrc, attemptPlay]);

  // Tab visibility change listener: resume playback when user switches back to the tab
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible' && videoRef.current) {
        if (videoRef.current.paused) {
          attemptPlay();
        }
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, [attemptPlay]);

  // Viewport IntersectionObserver: resume playback whenever hero is visible
  useEffect(() => {
    if (!containerRef.current) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && videoRef.current) {
            if (videoRef.current.paused) {
              attemptPlay();
            }
          }
        });
      },
      { threshold: 0.05 }
    );

    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, [attemptPlay]);

  // Scroll Progress calculations for sticky portal animation
  useEffect(() => {
    let rafId;

    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const scrollableDistance = rect.height - window.innerHeight;
      if (scrollableDistance <= 0) return;

      const scrolled = -rect.top;
      const progress = Math.min(1, Math.max(0, scrolled / scrollableDistance));
      setScrollProgress(progress);

      // If user scrolls back into hero section and video is paused, wake it up
      if (rect.bottom > 0 && rect.top < window.innerHeight && videoRef.current) {
        if (videoRef.current.paused) {
          attemptPlay();
        }
      }
    };

    const onScroll = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(handleScroll);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    handleScroll();

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [attemptPlay]);

  // Video event handlers to prevent getting stuck
  const handleWaitingOrStalled = () => {
    if (videoRef.current && videoRef.current.paused) {
      setTimeout(() => {
        if (videoRef.current && videoRef.current.paused) {
          attemptPlay();
        }
      }, 150);
    }
  };

  const handleEnded = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      attemptPlay();
    }
  };

  const handleTimeUpdate = () => {
    const v = videoRef.current;
    if (v && v.duration > 0 && v.currentTime >= v.duration - 0.25) {
      v.currentTime = 0;
      attemptPlay();
    }
  };

  const handlePause = () => {
    // If paused unexpectedly while hero is in view, wake up
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      if (rect.bottom > 0 && rect.top < window.innerHeight) {
        attemptPlay();
      }
    }
  };

  const p = scrollProgress;

  // Transformations derived directly from scroll position (100% reversible)
  // 1. Dual ground panels translate outward past their own width
  const leftPanelX = -p * 105; // 0% to -105%
  const rightPanelX = p * 105; // 0% to +105%

  // 2. Full-bleed video settles from 1.15 overscale down to 1.00
  const imageScale = 1.15 - p * 0.15;

  // 3. Duotone wash blending blue (#145A96) and orange (#F28C28) raises from 0 to 0.32
  const duotoneOpacity = p * 0.32;

  // 4. Two accent dots travel from center to opposite corners of the field
  const dotOrangeX = -p * 42; // vw
  const dotOrangeY = -p * 38; // vh
  const dotBlueX = p * 42; // vw
  const dotBlueY = p * 38; // vh

  // 5. Signature Title kinematics:
  // Wordmark scales UP modestly (1.0 -> 1.28) while tracking tightens (-0.015em -> -0.05em)
  // And the two halves "RHYTHMIC" and "BEAT" travel apart horizontally
  const titleScale = 1 + p * 0.28;
  const letterSpacingEm = -0.015 - p * 0.035; // tightens from -0.015em down to -0.05em
  const spanLeftX = -p * 36; // % travel left
  const spanRightX = p * 36; // % travel right

  return (
    <section
      ref={containerRef}
      id="portal-hero"
      className="relative w-full h-[250vh]"
      aria-label="Rhythmic Beat Portal Hero"
    >
      {/* Sticky Stage: 100vh viewport, isolation isolate, overflow hidden */}
      <div
        className="sticky top-0 w-full h-screen overflow-hidden select-none"
        style={{ isolation: 'isolate' }}
      >
        {/* Layer 1: Full-Bleed Dance Video (settling from overscale) */}
        <div
          className="absolute inset-0 w-full h-full will-change-transform"
          style={{
            transform: `scale(${imageScale})`,
            transition: 'transform 0.05s linear',
          }}
        >
          <video
            ref={videoRef}
            key={currentVideoSrc}
            src={currentVideoSrc}
            poster={currentPoster}
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            onCanPlay={attemptPlay}
            onLoadedData={attemptPlay}
            onLoadedMetadata={attemptPlay}
            onWaiting={handleWaitingOrStalled}
            onStalled={handleWaitingOrStalled}
            onEnded={handleEnded}
            onTimeUpdate={handleTimeUpdate}
            onPause={handlePause}
            className="w-full h-full object-cover object-center"
            aria-label="Rhythmic Beat Dance Court academy hero performance video"
          />
        </div>

        {/* Layer 2: Duotone Wash (Blue #145A96 and Orange #F28C28 at soft-light) */}
        <div
          className="absolute inset-0 w-full h-full pointer-events-none mix-blend-soft-light"
          style={{
            background:
              'linear-gradient(135deg, rgba(20, 90, 150, 0.95) 0%, rgba(242, 140, 40, 0.85) 100%)',
            opacity: duotoneOpacity,
            transition: 'opacity 0.05s linear',
          }}
        />

        {/* Layer 3: Black Foggy Stage Atmosphere & Vignette */}
        <div
          className="absolute inset-0 w-full h-full pointer-events-none z-1"
          style={{
            background:
              'radial-gradient(ellipse at 50% 50%, rgba(34, 34, 34, 0.1) 20%, rgba(34, 34, 34, 0.5) 100%, rgba(34, 34, 34, 0.95) 100%)',
          }}
        />

        {/* Layer 4: Two Solid Ground Panels (meeting in center at start, parting outward) */}
        {/* Left Panel */}
        <div
          className="absolute top-0 bottom-0 left-0 w-[52%] bg-[#222222] z-10 will-change-transform border-r border-white/[0.08] overflow-hidden"
          style={{
            transform: `translateX(${leftPanelX}%)`,
            transition: 'transform 0.05s linear',
          }}
        >
          {/* Left Hero Image with Bright Stage Fog Effect */}
          <div className="absolute inset-0 w-full h-full pointer-events-none select-none">
            <img
              src={leftHeroImg}
              alt="Rhythmic Beat Classical Dance Heritage"
              className="w-full h-full object-cover object-[center_30%] opacity-65 sm:opacity-75 md:opacity-80 filter contrast-105 brightness-110"
              loading="eager"
            />
            {/* Soft Foggy Stage Wash */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                backgroundImage:
                  'radial-gradient(ellipse at 40% 50%, transparent 30%, rgba(34, 34, 34, 0.25) 65%, rgba(34, 34, 34, 0.75) 100%), radial-gradient(circle at 50% 65%, rgba(20, 90, 150, 0.22) 0%, transparent 60%)',
              }}
              aria-hidden="true"
            />
            {/* Center seam gentle fog fade */}
            <div
              className="absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-[#222222]/85 via-[#222222]/40 to-transparent pointer-events-none"
              aria-hidden="true"
            />
            {/* Top & bottom gentle black fog fades */}
            <div
              className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-[#222222]/75 via-[#222222]/40 to-transparent pointer-events-none"
              aria-hidden="true"
            />
            <div
              className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#222222]/75 via-[#222222]/40 to-transparent pointer-events-none"
              aria-hidden="true"
            />
          </div>
        </div>

        {/* Right Panel */}
        <div
          className="absolute top-0 bottom-0 right-0 w-[52%] bg-[#222222] z-10 will-change-transform border-l border-white/[0.08] overflow-hidden"
          style={{
            transform: `translateX(${rightPanelX}%)`,
            transition: 'transform 0.05s linear',
          }}
        >
          {/* Right Hero Image with Bright Stage Fog Effect */}
          <div className="absolute inset-0 w-full h-full pointer-events-none select-none">
            <img
              src={rightHeroImg}
              alt="Guru Yuvraaj Jayakumar and Leadership"
              className="w-full h-full object-cover object-[center_25%] opacity-65 sm:opacity-75 md:opacity-80 filter contrast-105 brightness-110"
              loading="eager"
            />
            {/* Soft Foggy Stage Wash */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                backgroundImage:
                  'radial-gradient(ellipse at 60% 50%, transparent 30%, rgba(34, 34, 34, 0.25) 65%, rgba(34, 34, 34, 0.75) 100%), radial-gradient(circle at 50% 65%, rgba(242, 140, 40, 0.22) 0%, transparent 60%)',
              }}
              aria-hidden="true"
            />
            {/* Center seam gentle fog fade */}
            <div
              className="absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-[#222222]/85 via-[#222222]/40 to-transparent pointer-events-none"
              aria-hidden="true"
            />
            {/* Top & bottom gentle black fog fades */}
            <div
              className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-[#222222]/75 via-[#222222]/40 to-transparent pointer-events-none"
              aria-hidden="true"
            />
            <div
              className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#222222]/75 via-[#222222]/40 to-transparent pointer-events-none"
              aria-hidden="true"
            />
          </div>
        </div>

        {/* Layer 5: Two Traveling Accent Dots */}
        {/* Orange Accent Dot (travels top-left) */}
        <div
          className="absolute top-1/2 left-1/2 w-2.5 h-2.5 rounded-full bg-[#F28C28] z-20 pointer-events-none shadow-[0_0_14px_rgba(242,140,40,0.9)] will-change-transform -translate-x-1/2 -translate-y-1/2"
          style={{
            transform: `translate(calc(-50% + ${dotOrangeX}vw), calc(-50% + ${dotOrangeY}vh))`,
            transition: 'transform 0.05s linear',
          }}
        />

        {/* Blue Accent Dot (travels bottom-right) */}
        <div
          className="absolute top-1/2 left-1/2 w-2.5 h-2.5 rounded-full bg-[#145A96] z-20 pointer-events-none shadow-[0_0_14px_rgba(20,90,150,0.9)] will-change-transform -translate-x-1/2 -translate-y-1/2"
          style={{
            transform: `translate(calc(-50% + ${dotBlueX}vw), calc(-50% + ${dotBlueY}vh))`,
            transition: 'transform 0.05s linear',
          }}
        />

        {/* Background Discipline Element 1: Western Dance */}
        <DisciplineWatermark
          discipline="westerndance"
          position="bottom-left"
          color="white"
          opacity={0.085}
          size="clamp(220px, 30vw, 440px)"
          rotation={-8}
          className="z-10 mb-6 sm:mb-10 left-3 sm:left-8 lg:left-14"
        />

        {/* Layer 6: Signature Title with Kinematics */}
        <div
          className="absolute inset-0 flex flex-col items-center justify-center z-20 pointer-events-none px-4 text-center will-change-transform"
          style={{
            transform: `scale(${titleScale})`,
            letterSpacing: `${letterSpacingEm}em`,
            transition: 'transform 0.05s linear, letter-spacing 0.05s linear',
          }}
        >
          {/* Main Title Row: RHYTHMIC + BEAT */}
          <div className="relative flex flex-col items-center">
            <div className="flex items-center justify-center gap-3 sm:gap-6 md:gap-8 font-display font-black text-white text-3xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-[84px] leading-none whitespace-nowrap drop-shadow-[0_10px_35px_rgba(0,0,0,0.95)]">
              <span
                className="inline-block will-change-transform"
                style={{
                  transform: `translateX(${spanLeftX}%)`,
                  transition: 'transform 0.05s linear',
                }}
              >
                {data.wordmarkLeft}
              </span>
              <span
                className="inline-block will-change-transform"
                style={{
                  transform: `translateX(${spanRightX}%)`,
                  transition: 'transform 0.05s linear',
                }}
              >
                {data.wordmarkRight}
              </span>
            </div>

            {/* Subtitle Underneath */}
            <div className="mt-4 sm:mt-6 flex items-center justify-center gap-3">
              <span className="h-[1px] w-6 sm:w-10 bg-white/25" />
              <p className="font-sans text-[11px] sm:text-xs md:text-sm font-semibold text-[#CBD5E1] uppercase tracking-[0.24em] drop-shadow-sm">
                {data.subTitle}
              </p>
              <span className="h-[1px] w-6 sm:w-10 bg-white/25" />
            </div>

            <p className="mt-1 font-sans text-[9px] sm:text-[10.5px] text-[#94A3B8] uppercase tracking-[0.16em]">
              {data.affiliation}
            </p>
          </div>
        </div>

        {/* Layer 7: Corner Metadata */}
        {/* Top-Left: Tagline */}
        <div className="absolute top-[74px] left-6 sm:left-10 z-30 pointer-events-none">
          <span className="text-[10.5px] font-semibold text-[#CBD5E1] uppercase tracking-[0.15em] flex items-center gap-2 drop-shadow-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-[#F28C28] shadow-[0_0_8px_rgba(242,140,40,0.9)]" />
            {data.tagline}
          </span>
        </div>

        {/* Top-Right: Affiliation Badge */}
        <div className="hidden sm:block absolute top-[74px] right-6 sm:right-10 z-30 pointer-events-none">
          <span className="text-[10.5px] font-medium text-[#94A3B8] uppercase tracking-[0.14em]">
            {data.affiliation}
          </span>
        </div>

        {/* Bottom-Left: Academy Coordinates */}
        <div className="absolute bottom-6 sm:bottom-10 left-6 sm:left-10 z-30 pointer-events-none">
          <span className="text-[10px] sm:text-[10.5px] font-medium text-[#94A3B8] uppercase tracking-[0.14em]">
            EST. 2004 • CHENNAI & PONDICHERRY
          </span>
        </div>

        {/* Bottom-Right: Scroll Indicator */}
        <div className="absolute bottom-6 sm:bottom-10 right-6 sm:right-10 z-30 pointer-events-none flex items-center gap-2">
          <span className="text-[10px] sm:text-[10.5px] font-semibold text-[#CBD5E1] uppercase tracking-[0.15em]">
            {data.scrollLabel}
          </span>
          <div className="w-4 h-7 rounded-full border border-white/30 flex items-start justify-center p-1 bg-black/20 backdrop-blur-sm">
            <div
              className="w-1 h-1.5 rounded-full bg-[#145A96] shadow-[0_0_6px_rgba(20,90,150,0.9)] will-change-transform"
              style={{
                transform: `translateY(${p * 12}px)`,
                transition: 'transform 0.05s linear',
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
};
