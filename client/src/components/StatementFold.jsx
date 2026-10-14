import { useEffect, useRef, useState } from 'react';
import statementImg from '../assets/dance-court-footer-group.webp';
import { statementData } from '../data/statement';

export const StatementFold = ({ data = statementData }) => {
  const sectionRef = useRef(null);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      // Calculate how far into the viewport the section has moved
      const offset = -rect.top;
      setScrollY(offset);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Subtle drift and rotation for circular image on scroll
  const imageDriftY = Math.max(-120, Math.min(120, scrollY * 0.15));
  const imageRotation = Math.max(-25, Math.min(25, scrollY * 0.04));

  return (
    <section
      ref={sectionRef}
      id="philosophy"
      className="relative min-h-screen w-full flex items-center overflow-hidden border-b border-[rgba(16,32,58,0.14)] py-24 sm:py-32"
      style={{ backgroundColor: '#F8FAFD' }}
      aria-label="Philosophy and Creed"
    >
      <div className="max-w-[1400px] mx-auto w-full px-4 sm:px-8 lg:px-12 xl:px-16 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Index numeral and Statement content */}
          <div className="lg:col-span-8 flex flex-col items-start">
            {/* Top row: Outlined Index Numeral & Small Uppercase Label */}
            <div className="flex items-center gap-6 mb-8">
              <span
                className="font-display font-extrabold text-5xl sm:text-7xl stroke-numeral select-none leading-none"
                aria-hidden="true"
              >
                {data.index}
              </span>
              <div className="flex flex-col">
                <span className="text-[11px] font-semibold text-[#10203A] uppercase tracking-[0.15em] flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#1E5BB8]" />
                  {data.label}
                </span>
                <span className="text-[10px] text-[#7B8AA3] uppercase tracking-[0.12em] mt-0.5">
                  Artistic Vision & Methodology
                </span>
              </div>
            </div>

            {/* Statement text with clamp(24px, 3.6vw, 52px) over ~22ch with orange phrase */}
            <h2
              className="font-display font-bold text-[#10203A] leading-[1.18] tracking-[-0.025em] max-w-[24ch]"
              style={{ fontSize: 'clamp(26px, 3.8vw, 54px)' }}
            >
              <span>{data.headlinePrefix}</span>
              <span className="text-[#F28C1E] underline decoration-1 underline-offset-8 decoration-[rgba(242,140,30,0.35)]">
                {data.headlineAccent}
              </span>
              <span>{data.headlineSuffix}</span>
            </h2>

            {/* Hairline divider rule */}
            <div className="w-24 h-[1px] bg-[rgba(16,32,58,0.18)] my-8" />

            {/* Body paragraph */}
            <p className="font-sans text-sm sm:text-base text-[#4A5B78] leading-relaxed max-w-2xl font-normal">
              {data.body}
            </p>

            {/* Subtext info */}
            <div className="mt-8 flex items-center gap-3 text-[11px] font-medium text-[#7B8AA3] uppercase tracking-[0.14em]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#F28C1E]" />
              <span>{data.subtext}</span>
            </div>
          </div>

          {/* Right Column: Spacer for floating circular dance photo */}
          <div className="lg:col-span-4 hidden lg:block" />
        </div>
      </div>

      {/* Floating Circular Dance Photo off right edge at reduced opacity drifting and rotating */}
      <div
        className="absolute -right-20 sm:-right-24 md:-right-28 lg:-right-32 top-1/2 -translate-y-1/2 w-[340px] h-[340px] sm:w-[420px] sm:h-[420px] lg:w-[540px] lg:h-[540px] rounded-full overflow-hidden pointer-events-none opacity-40 mix-blend-multiply border border-[rgba(16,32,58,0.1)] transition-transform duration-75 ease-out will-change-transform z-0"
        style={{
          transform: `translateY(calc(-50% + ${imageDriftY}px)) rotate(${imageRotation}deg)`,
        }}
        aria-hidden="true"
      >
        <img
          src={statementImg}
          alt=""
          width="540"
          height="540"
          decoding="async"
          className="w-full h-full object-cover scale-110"
          loading="lazy"
        />
      </div>
    </section>
  );
};
