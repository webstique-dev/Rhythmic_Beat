import { useState } from 'react';
import { storyData } from '../data/story';

export const OurStorySection = ({ data = storyData }) => {
  const [activeImage, setActiveImage] = useState('heritage'); // 'heritage' | 'stage'

  const currentImage =
    activeImage === 'heritage' ? data.heritageImage : data.stageImage;
  const currentAlt =
    activeImage === 'heritage'
      ? 'Guru Yuvraaj Jayakumar in classical mudra pose before the Adiyogi statue'
      : 'Guru Yuvraaj Jayakumar embracing student performers on stage';

  return (
    <section
      id="our-story"
      className="relative w-full overflow-hidden bg-[#0B111E] text-white border-b border-[rgba(16,32,58,0.14)]"
      aria-label="Our Story and Heritage"
    >
      {/* Subtle Ambient Radial Lighting */}
      <div
        className="absolute inset-0 pointer-events-none opacity-40 mix-blend-screen"
        style={{
          backgroundImage:
            'radial-gradient(circle at 50% 15%, rgba(30, 91, 184, 0.28) 0%, transparent 65%), radial-gradient(circle at 80% 85%, rgba(242, 140, 30, 0.12) 0%, transparent 50%)',
        }}
        aria-hidden="true"
      />

      {/* Background Watermark Lettering */}
      <div
        className="absolute inset-0 w-full max-w-full overflow-hidden pointer-events-none select-none z-0 flex flex-col justify-between py-8 sm:py-12"
        aria-hidden="true"
      >
        <span className="font-display font-black text-[12vw] sm:text-[14vw] tracking-[-0.04em] uppercase text-white/[0.022] whitespace-nowrap leading-none block -translate-x-4 sm:-translate-x-12">
          RHYTHMIC BEAT
        </span>
        <span className="font-display font-black text-[12vw] sm:text-[14vw] tracking-[-0.04em] uppercase text-white/[0.02] whitespace-nowrap leading-none block translate-x-4 sm:translate-x-16">
          SINCE 2004 • COURT
        </span>
      </div>

      {/* Main Container */}
      <div className="relative z-10 max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 pt-16 sm:pt-20 md:pt-24 pb-12 sm:pb-16">
        {/* Header Block */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-10 px-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.06] border border-white/10 mb-3 sm:mb-4 backdrop-blur-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-[#F28C1E]" />
            <span className="text-[10px] sm:text-[11px] font-semibold text-[#CBD5E1] uppercase tracking-[0.18em]">
              {data.sectionTag}
            </span>
          </div>

          <h2
            className="font-display font-bold uppercase text-white tracking-[0.04em] sm:tracking-[0.08em] leading-tight mx-auto"
            style={{ fontSize: 'clamp(20px, 3.4vw, 40px)' }}
          >
            {data.headline}
          </h2>

          <p className="font-sans text-xs sm:text-sm text-[#94A3B8] max-w-xl mx-auto mt-2.5 sm:mt-3 leading-relaxed">
            {data.subheadline}
          </p>
        </div>

        {/* Centerpiece Photographic Frame */}
        <div className="relative mx-auto max-w-[1100px] mb-10 sm:mb-14">
          <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden border border-white/15 shadow-[0_24px_70px_-15px_rgba(0,0,0,0.9)] bg-[#10203A]/70 aspect-[4/3] xs:aspect-[16/11] sm:aspect-[16/9] group">
            <img
              key={activeImage}
              src={currentImage}
              alt={currentAlt}
              className={`w-full h-full object-cover transition-all duration-500 ease-out ${
                activeImage === 'heritage'
                  ? 'object-[center_25%]'
                  : 'object-[center_20%]'
              }`}
              loading="lazy"
            />

            {/* Vignette gradients */}
            <div
              className="absolute inset-0 bg-gradient-to-t from-[#0B111E] via-[#0B111E]/30 to-transparent pointer-events-none"
              aria-hidden="true"
            />
            <div
              className="absolute inset-0 bg-gradient-to-b from-black/45 via-transparent to-transparent pointer-events-none"
              aria-hidden="true"
            />

            {/* Image Perspective Switcher Pill */}
            <div className="absolute top-3 sm:top-5 right-3 sm:right-5 z-20 flex items-center gap-1 p-0.5 sm:p-1 rounded-full bg-black/65 backdrop-blur-md border border-white/15">
              <button
                type="button"
                onClick={() => setActiveImage('heritage')}
                className={`px-3 py-1 rounded-full text-[9.5px] sm:text-[11px] font-semibold uppercase tracking-[0.08em] transition-all ${
                  activeImage === 'heritage'
                    ? 'bg-white text-[#10203A] shadow-sm'
                    : 'text-white/70 hover:text-white'
                }`}
                aria-label="View Adiyogi Heritage Photograph"
              >
                Heritage Pose
              </button>
              <button
                type="button"
                onClick={() => setActiveImage('stage')}
                className={`px-3 py-1 rounded-full text-[9.5px] sm:text-[11px] font-semibold uppercase tracking-[0.08em] transition-all ${
                  activeImage === 'stage'
                    ? 'bg-white text-[#10203A] shadow-sm'
                    : 'text-white/70 hover:text-white'
                }`}
                aria-label="View Stage Mentorship Photograph"
              >
                Stage Family
              </button>
            </div>

            {/* Bottom Caption Pill */}
            <div className="absolute bottom-10 sm:bottom-12 left-3 sm:left-6 z-20 hidden xs:flex items-center gap-2 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-[10px] sm:text-xs text-white/90">
              <span className="w-1.5 h-1.5 rounded-full bg-[#F28C1E]" />
              <span>
                {activeImage === 'heritage'
                  ? 'Guru Yuvraaj Jayakumar • Adiyogi Classical Pose'
                  : 'Guru Yuvraaj Jayakumar • Stage Mentorship'}
              </span>
            </div>
          </div>

          {/* Overlapping Hero Typography matching reference layout */}
          <div className="absolute top-full left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none z-30 w-max max-w-none text-center">
            <span
              className="font-display font-black uppercase text-white block whitespace-nowrap select-none leading-none tracking-[-0.025em]"
              style={{
                fontSize: 'clamp(20px, 4.8vw, 84px)',
                textShadow:
                  '0 8px 25px rgba(0,0,0,0.95), 0 2px 8px rgba(0,0,0,0.85), 0 0 1px rgba(255,255,255,0.4)',
                WebkitTextStroke: '1px rgba(255,255,255,0.22)',
              }}
            >
              {data.overlapTitle}
            </span>
          </div>
        </div>

        {/* Simplified, Clean Narrative Statement */}
        <div className="max-w-3xl mx-auto text-center px-4 pt-2 sm:pt-4">
          <p className="font-sans text-xs sm:text-sm md:text-base text-[#CBD5E1] leading-relaxed font-normal">
            {data.narrative}
          </p>
        </div>
      </div>

      {/* Bottom Minimal Timeline Strip matching reference layout */}
      <div className="w-full bg-[#FFFFFF] text-[#10203A] border-t border-[rgba(16,32,58,0.14)] py-10 sm:py-14 md:py-16">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16">
          <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-[rgba(16,32,58,0.14)]">
            {data.timeline.map((item, idx) => (
              <div
                key={item.year}
                className={`flex flex-col py-6 md:py-1 min-w-0 ${
                  idx === 0
                    ? 'md:pr-6 lg:pr-10'
                    : idx === 1
                    ? 'md:px-6 lg:px-10'
                    : 'md:pl-6 lg:pl-10'
                }`}
              >
                {/* Year Numeral Header */}
                <div className="flex items-center gap-2 mb-2 sm:mb-3">
                  <span
                    className="font-display font-black text-[#10203A] tracking-tight leading-none tabular-nums"
                    style={{ fontSize: 'clamp(28px, 3.8vw, 54px)' }}
                  >
                    {item.year}
                  </span>
                  <span
                    className="w-2 h-2 rounded-full flex-shrink-0"
                    style={{ backgroundColor: item.accent }}
                    aria-hidden="true"
                  />
                </div>

                {/* Milestone Label */}
                <span className="font-sans font-bold text-[11px] sm:text-xs md:text-sm text-[#10203A] uppercase tracking-[0.14em] mb-1.5 sm:mb-2 block">
                  {item.title}
                </span>

                {/* Milestone Description */}
                <p className="font-sans text-xs sm:text-sm text-[#4A5B78] leading-relaxed max-w-sm">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default OurStorySection;
