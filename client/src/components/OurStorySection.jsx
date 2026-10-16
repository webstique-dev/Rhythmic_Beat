import { useState } from 'react';
import { storyData } from '../data/story';
import { DisciplineWatermark } from './DisciplineWatermark';

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
      className="relative w-full overflow-hidden bg-[#F1F3F5] text-[#222222] border-b border-[#222222]/12"
      aria-label="Our Story and Heritage"
    >
      {/* Top Half Stage Container with Watermark */}
      <div className="relative w-full">
        {/* Background Watermark Lettering (Responsively Contained Above Timeline) */}
        <div
          className="absolute inset-0 w-full overflow-hidden pointer-events-none select-none z-0 flex flex-col justify-between py-6 sm:py-10"
          aria-hidden="true"
        >
          <span
            className="font-display font-black text-[11vw] sm:text-[13vw] tracking-[-0.04em] uppercase whitespace-nowrap leading-none block -translate-x-4 sm:-translate-x-12 select-none"
            style={{ color: 'rgba(20, 90, 150, 0.045)' }}
          >
            RHYTHMIC BEAT
          </span>
          <span
            className="font-display font-black text-[11vw] sm:text-[13vw] tracking-[-0.04em] uppercase whitespace-nowrap leading-none block translate-x-4 sm:translate-x-16 select-none"
            style={{ color: 'rgba(20, 90, 150, 0.04)' }}
          >
            SINCE 2004 • COURT
          </span>
        </div>

        {/* Background Discipline Element 2: Bharata Natyam */}
        <DisciplineWatermark
          discipline="bharatanatyam"
          position="top-right"
          color="orange"
          opacity={0.06}
          size="clamp(240px, 30vw, 440px)"
          rotation={6}
          className="top-6 sm:top-12 right-4 sm:right-12 z-0"
        />

        {/* Main Content Area */}
        <div className="relative z-10 max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 pt-16 sm:pt-20 md:pt-24 pb-14 sm:pb-20">
          {/* Header Block */}
          <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12 px-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/80 border border-[#222222]/15 mb-3 sm:mb-4 backdrop-blur-sm shadow-2xs">
              <span className="w-1.5 h-1.5 rounded-full bg-[#F28C28]" />
              <span className="text-[10px] sm:text-[11px] font-semibold text-[#222222] uppercase tracking-[0.18em]">
                {data.sectionTag}
              </span>
            </div>

            <h2
              className="font-display font-bold uppercase text-[#145A96] tracking-[0.04em] sm:tracking-[0.08em] leading-tight mx-auto"
              style={{ fontSize: 'clamp(22px, 3.6vw, 42px)' }}
            >
              {data.headline}
            </h2>

            <p className="font-sans text-xs sm:text-sm text-[#222222]/75 max-w-xl mx-auto mt-2.5 sm:mt-3 leading-relaxed font-normal">
              {data.subheadline}
            </p>
          </div>

          {/* Centerpiece Photographic Frame */}
          <div className="relative mx-auto max-w-[1100px] mb-12 sm:mb-16 md:mb-20">
            <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden border border-[#222222]/15 shadow-[0_20px_50px_-15px_rgba(34,34,34,0.12)] bg-[#222222]/5 aspect-[4/3] xs:aspect-[16/11] sm:aspect-[16/9] group">
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

              {/* Natural photo vignette gradients */}
              <div
                className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent pointer-events-none"
                aria-hidden="true"
              />
              <div
                className="absolute inset-0 bg-gradient-to-b from-black/35 via-transparent to-transparent pointer-events-none"
                aria-hidden="true"
              />

              {/* Image Perspective Switcher Pill */}
              <div className="absolute top-3 sm:top-5 right-3 sm:right-5 z-20 flex items-center gap-1 p-0.5 sm:p-1 rounded-full bg-white/90 backdrop-blur-md border border-[#222222]/15 shadow-sm">
                <button
                  type="button"
                  onClick={() => setActiveImage('heritage')}
                  className={`px-3 py-1 rounded-full text-[9.5px] sm:text-[11px] font-semibold uppercase tracking-[0.08em] transition-all cursor-pointer ${
                    activeImage === 'heritage'
                      ? 'bg-[#145A96] text-white shadow-xs font-bold'
                      : 'text-[#222222]/75 hover:text-[#222222]'
                  }`}
                  aria-label="View Adiyogi Heritage Photograph"
                >
                  Heritage Pose
                </button>
                <button
                  type="button"
                  onClick={() => setActiveImage('stage')}
                  className={`px-3 py-1 rounded-full text-[9.5px] sm:text-[11px] font-semibold uppercase tracking-[0.08em] transition-all cursor-pointer ${
                    activeImage === 'stage'
                      ? 'bg-[#145A96] text-white shadow-xs font-bold'
                      : 'text-[#222222]/75 hover:text-[#222222]'
                  }`}
                  aria-label="View Stage Mentorship Photograph"
                >
                  Stage Family
                </button>
              </div>

              {/* Bottom Caption Pill */}
              <div className="absolute bottom-6 sm:bottom-10 left-3 sm:left-6 z-20 hidden xs:flex items-center gap-2 px-3 py-1 rounded-full bg-[#222222]/85 backdrop-blur-md border border-white/20 text-[10px] sm:text-xs text-white shadow-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-[#F28C28]" />
                <span className="font-medium">
                  {activeImage === 'heritage'
                    ? 'Guru Yuvraaj Jayakumar • Adiyogi Classical Pose'
                    : 'Guru Yuvraaj Jayakumar • Stage Mentorship'}
                </span>
              </div>
            </div>

            {/* Overlapping Hero Typography */}
            <div className="absolute top-full left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none z-30 w-max max-w-none text-center">
              <span
                className="font-display font-black uppercase text-[#145A96] block whitespace-nowrap select-none leading-none tracking-[-0.025em] drop-shadow-[0_4px_16px_rgba(255,255,255,0.9)]"
                style={{
                  fontSize: 'clamp(20px, 4.8vw, 84px)',
                }}
              >
                {data.overlapTitle}
              </span>
            </div>
          </div>

          {/* Narrative Statement (Proper Responsive Clearance Below Overlapping Title) */}
          <div className="max-w-3xl mx-auto text-center px-4 pt-8 sm:pt-12 md:pt-14">
            <p className="font-sans text-xs sm:text-sm md:text-base text-[#222222]/80 leading-relaxed font-normal">
              {data.narrative}
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Minimal Timeline Strip matching reference layout */}
      <div className="relative z-10 w-full bg-white text-[#222222] border-t border-[#222222]/12 py-10 sm:py-14 md:py-16 shadow-xs">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16">
          <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-[#222222]/12">
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
                    className="font-display font-black text-[#145A96] tracking-tight leading-none tabular-nums"
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
                <span className="font-sans font-bold text-[11px] sm:text-xs md:text-sm text-[#145A96] uppercase tracking-[0.14em] mb-1.5 sm:mb-2 block">
                  {item.title}
                </span>

                {/* Milestone Description */}
                <p className="font-sans text-xs sm:text-sm text-[#222222]/75 leading-relaxed max-w-sm">
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
