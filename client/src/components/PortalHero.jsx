import { useEffect, useRef, useState } from 'react';
import heroImg from '../assets/Hero-image.png';
import { heroData } from '../data/hero';

export const PortalHero = ({ data = heroData }) => {
  const containerRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);

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
  }, []);

  const p = scrollProgress;

  // Transformations derived directly from scroll position (100% reversible)
  // 1. Dual ground panels translate outward past their own width
  const leftPanelX = -p * 105; // 0% to -105%
  const rightPanelX = p * 105; // 0% to +105%

  // 2. Full-bleed photograph settles from 1.15 overscale down to 1.00
  const imageScale = 1.15 - p * 0.15;

  // 3. Duotone wash blending blue (#1E5BB8) and orange (#F28C1E) raises from 0 to 0.32
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
        {/* Layer 1: Full-Bleed Dance Photograph (settling from overscale) */}
        <div
          className="absolute inset-0 w-full h-full will-change-transform"
          style={{
            transform: `scale(${imageScale})`,
            transition: 'transform 0.05s linear',
          }}
        >
          <img
            src={heroImg}
            alt="Rhythmic Beat Dance Court Summer Fest celebration and student awards presentation"
            className="w-full h-full object-cover object-[center_35%]"
            loading="eager"
            fetchPriority="high"
          />
        </div>

        {/* Layer 2: Duotone Wash (Blue #1E5BB8 and Orange #F28C1E at soft-light) */}
        <div
          className="absolute inset-0 w-full h-full pointer-events-none mix-blend-soft-light"
          style={{
            background:
              'linear-gradient(135deg, rgba(30, 91, 184, 0.95) 0%, rgba(242, 140, 30, 0.85) 100%)',
            opacity: duotoneOpacity,
            transition: 'opacity 0.05s linear',
          }}
        />

        {/* Layer 3: Radial Veil lightening edges toward #F8FAFD ground */}
        <div
          className="absolute inset-0 w-full h-full pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse at 50% 50%, rgba(248, 250, 253, 0) 30%, rgba(248, 250, 253, 0.45) 70%, rgba(248, 250, 253, 0.9) 100%)',
          }}
        />

        {/* Layer 4: Two Solid Ground Panels (meeting in center at start, parting outward) */}
        {/* Left Panel */}
        <div
          className="absolute top-0 bottom-0 left-0 w-[52%] bg-[#F8FAFD] z-10 will-change-transform border-r border-[rgba(16,32,58,0.08)]"
          style={{
            transform: `translateX(${leftPanelX}%)`,
            transition: 'transform 0.05s linear',
          }}
        />

        {/* Right Panel */}
        <div
          className="absolute top-0 bottom-0 right-0 w-[52%] bg-[#F8FAFD] z-10 will-change-transform border-l border-[rgba(16,32,58,0.08)]"
          style={{
            transform: `translateX(${rightPanelX}%)`,
            transition: 'transform 0.05s linear',
          }}
        />

        {/* Layer 5: Accent Dots travelling out toward opposite corners */}
        <div className="absolute inset-0 z-20 pointer-events-none flex items-center justify-center">
          {/* Orange Dot */}
          <div
            className="w-2.5 h-2.5 rounded-full bg-[#F28C1E] absolute will-change-transform"
            style={{
              transform: `translate(${dotOrangeX}vw, ${dotOrangeY}vh)`,
              transition: 'transform 0.05s linear',
            }}
          />
          {/* Blue Dot */}
          <div
            className="w-2.5 h-2.5 rounded-full bg-[#1E5BB8] absolute will-change-transform"
            style={{
              transform: `translate(${dotBlueX}vw, ${dotBlueY}vh)`,
              transition: 'transform 0.05s linear',
            }}
          />
        </div>

        {/* Layer 6: Signature Wordmark (Grows, Tightens, and Halves Part) */}
        <div className="absolute inset-0 z-30 pointer-events-none flex flex-col items-center justify-center px-4 sm:px-8">
          <div
            className="text-center will-change-transform max-w-full"
            style={{
              transform: `scale(${titleScale})`,
              letterSpacing: `${letterSpacingEm}em`,
              transition: 'transform 0.05s linear, letter-spacing 0.05s linear',
            }}
          >
            {/* Wordmark Spans: Sized to fit cleanly at start, splitting apart on scroll */}
            <div className="flex items-center justify-center gap-3 sm:gap-6 md:gap-8 font-display font-extrabold text-[#10203A] text-3xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-[84px] leading-none whitespace-nowrap">
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
              <span className="h-[1px] w-6 sm:w-10 bg-[rgba(16,32,58,0.22)]" />
              <p className="font-sans text-[11px] sm:text-xs md:text-sm font-semibold text-[#4A5B78] uppercase tracking-[0.24em]">
                {data.subTitle}
              </p>
              <span className="h-[1px] w-6 sm:w-10 bg-[rgba(16,32,58,0.22)]" />
            </div>

            <p className="mt-1 font-sans text-[9px] sm:text-[10.5px] text-[#7B8AA3] uppercase tracking-[0.16em]">
              {data.affiliation}
            </p>
          </div>
        </div>

        {/* Layer 7: Corner Metadata */}
        {/* Top-Left: Tagline */}
        <div className="absolute top-[74px] left-6 sm:left-10 z-30 pointer-events-none">
          <span className="text-[10.5px] font-semibold text-[#10203A] uppercase tracking-[0.15em] flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#F28C1E]" />
            {data.tagline}
          </span>
        </div>

        {/* Top-Right: Affiliation Badge */}
        <div className="hidden sm:block absolute top-[74px] right-6 sm:right-10 z-30 pointer-events-none">
          <span className="text-[10.5px] font-medium text-[#4A5B78] uppercase tracking-[0.14em]">
            {data.affiliation}
          </span>
        </div>

        {/* Bottom-Left: Academy Coordinates */}
        <div className="absolute bottom-6 sm:bottom-10 left-6 sm:left-10 z-30 pointer-events-none">
          <span className="text-[10px] sm:text-[10.5px] font-medium text-[#7B8AA3] uppercase tracking-[0.14em]">
            EST. 2004 • CHENNAI & PONDICHERRY
          </span>
        </div>

        {/* Bottom-Right: Scroll Indicator */}
        <div className="absolute bottom-6 sm:bottom-10 right-6 sm:right-10 z-30 pointer-events-none flex items-center gap-2">
          <span className="text-[10px] sm:text-[10.5px] font-semibold text-[#10203A] uppercase tracking-[0.15em]">
            {data.scrollLabel}
          </span>
          <div className="w-4 h-7 rounded-full border border-[rgba(16,32,58,0.25)] flex items-start justify-center p-1">
            <div
              className="w-1 h-1.5 rounded-full bg-[#1E5BB8] will-change-transform"
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
