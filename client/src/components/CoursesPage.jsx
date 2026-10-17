import { ALL_DISCIPLINES_ITEMS } from '../data/courses';
import Masonry from './Masonry';
import academyShowcaseImg from '../assets/brochure/academy-showcase.jpg';

export const CoursesPage = ({ onNavigate }) => {
  const masonryItems = ALL_DISCIPLINES_ITEMS.map((item) => ({
    id: item.id,
    img: item.image,
    width: item.width || 600,
    height: item.height || 600,
    title: item.title,
    link: item.link,
  }));

  return (
    <div className="min-h-screen w-full overflow-x-hidden min-w-0 bg-[#F1F3F5] text-[#222222] selection:bg-[#145A96]/20 selection:text-[#222222]">
      {/* 1. Hero Section (Spacious Editorial Header) */}
      <section
        id="courses-hero"
        className="relative w-full pt-24 xs:pt-28 sm:pt-36 pb-10 sm:pb-16 lg:pb-20 border-b border-[rgba(34,34,34,0.08)] bg-gradient-to-b from-white via-white to-[#F1F3F5] overflow-hidden"
        aria-label="Courses & Disciplines"
      >
        <div className="max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16">
          {/* Main Hero Grid */}
          <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 items-center min-h-[380px]">
            {/* Left Column: Title & Description */}
            <div className="lg:col-span-7 xl:col-span-7 relative z-20 flex flex-col justify-center">
              {/* Top Category Badge */}
              <div className="flex items-center gap-2 mb-3 sm:mb-4">
                <span className="w-2 h-2 rounded-full bg-[#F28C28]" />
                <span className="text-[11px] sm:text-xs font-bold uppercase tracking-[0.2em] text-[#145A96]">
                  Academy Movement Arts &amp; Training
                </span>
              </div>

              {/* Massive Display Title */}
              <div className="relative mb-3 sm:mb-4">
                <h1 className="font-display font-extrabold text-4xl xs:text-5xl sm:text-6xl md:text-7xl lg:text-[4.75rem] xl:text-[5.5rem] text-[#145A96] tracking-tighter leading-[0.95] select-none">
                  Courses &amp; Disciplines<span className="text-[#F28C28] inline-block ml-1">.</span>
                </h1>
              </div>

              {/* Description Body Copy (No Timings) */}
              <p className="max-w-xl text-xs xs:text-sm sm:text-base text-[#222222]/80 leading-relaxed font-normal">
                Explore our comprehensive 2026 academy curriculum across Western Dance, Classical Bharatham, Aerial Yoga, Movement Conditioning, and holistic fitness disciplines. Choose your track and enroll today.
              </p>
            </div>

            {/* Right Column: Framed Editorial Card with 001 Double Underline & Vertical Watermark */}
            <div className="lg:col-span-5 xl:col-span-5 relative z-10 flex justify-center lg:justify-end">
              <div className="relative w-full max-w-[420px] sm:max-w-[460px] lg:max-w-[440px]">
                {/* Framed Image Card */}
                <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden border-2 border-white shadow-xl bg-[#145A96] aspect-[4/5] sm:aspect-[3/4]">
                  <img
                    src={academyShowcaseImg}
                    alt="Rhythmic Beat Dance Court Stage Arena Performance"
                    className="w-full h-full object-cover"
                    loading="eager"
                  />
                  {/* Subtle Top & Bottom Vignette Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30 pointer-events-none" />

                  {/* Top-Right Index Number with Double Underline */}
                  <div className="absolute top-4 right-4 sm:top-5 sm:right-5 text-right z-10 select-none">
                    <span className="font-mono font-extrabold text-xl sm:text-2xl text-white tracking-widest drop-shadow-md">
                      001
                    </span>
                    <div className="mt-0.5 flex flex-col gap-[2px] items-end">
                      <span className="w-7 h-[2px] bg-[#F28C28]" />
                      <span className="w-7 h-[2px] bg-[#F28C28]" />
                    </div>
                  </div>

                  {/* Vertical Outline Typography on Right Edge */}
                  <div className="absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 pointer-events-none select-none z-10">
                    <span
                      className="font-display font-extrabold text-xl sm:text-2xl uppercase tracking-[0.24em] text-white/30 whitespace-nowrap block drop-shadow-xs"
                      style={{
                        writingMode: 'vertical-rl',
                        textOrientation: 'mixed',
                      }}
                    >
                      RHYTHMIC BEAT
                    </span>
                  </div>

                  {/* Bottom Image Caption */}
                  <div className="absolute bottom-4 left-4 right-12 text-white z-10">
                    <span className="text-[9.5px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-[#145A96]/85 backdrop-blur-md border border-white/20 inline-block mb-1">
                      Main Court Arena
                    </span>
                    <p className="text-xs sm:text-sm font-semibold text-white/95 leading-tight">
                      Annual Academy Showcase &amp; Performance Stage
                    </p>
                  </div>
                </div>

                {/* Decorative Offset Backdrop Frame */}
                <div className="absolute -bottom-2.5 -right-2.5 -top-2.5 -left-2.5 rounded-3xl border border-[#145A96]/15 pointer-events-none hidden sm:block -z-10" />
              </div>
            </div>
          </div>
        </div>
      </section>



      {/* 3. Full Course Directory with React Bits Masonry (No Timings) */}
      <section
        id="course-directory"
        className="py-10 sm:py-16 max-w-[1400px] mx-auto px-3.5 sm:px-8 lg:px-12 xl:px-16"
        aria-label="All Studio Courses Directory"
      >
        {/* Polished Full-Width Title UI */}
        <div className="mb-6 sm:mb-10 border-b border-[rgba(34,34,34,0.08)] pb-5 sm:pb-6">
          <div className="flex items-center gap-2 mb-2">
            <span className="w-2 h-2 rounded-full bg-[#F28C28]" />
            <span className="text-[11px] sm:text-xs font-bold text-[#145A96] uppercase tracking-[0.18em]">
              Academy Curriculum
            </span>
          </div>
          <h2 className="font-display font-black text-2xl xs:text-3xl sm:text-4xl md:text-5xl text-[#145A96] tracking-tight">
            All Studio Disciplines &amp; Courses
          </h2>
          <p className="text-xs sm:text-sm md:text-base text-[#222222]/70 mt-2 max-w-2xl leading-relaxed">
            Explore all studio disciplines across Chennai and Pondicherry. Tap any card or the top-right arrow button to view curriculum, training focus, and full details.
          </p>
        </div>

        {/* Masonry Course Cards Grid with Top-Right Redirect Buttons */}
        <div className="w-full">
          <Masonry
            items={masonryItems}
            columns="auto"
            columnWidth={280}
            gap={18}
            radius={16}
            animateFrom="bottom"
            hoverEffect="zoom"
            captions="hover"
            lightbox={false}
            draggable={false}
            onItemClick={(item, index, event) => {
              event?.preventDefault?.();
              const target = masonryItems.find((m) => m.id === item.id);
              onNavigate(target?.link || `/courses/${item.id}`);
            }}
          />
        </div>
      </section>
    </div>
  );
};

export default CoursesPage;
