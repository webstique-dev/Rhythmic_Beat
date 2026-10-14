import ScrollExpand from './ScrollExpand';
import desktopVideo from '../assets/Glimpse of @yuvi_smart master’s Semiclassical workshop at Rhythmic beat dance court Valasaravakk (online-video-cutter.com).mp4';
import pesamaVideo from '../assets/Dancing with him is always a pleasure!! The way he compliments , keep me comfortable ❤️❤️ Pesama.mp4';
import semiclassicalPoster from '../assets/poster-semiclassical.webp';
import pesamaPoster from '../assets/poster-pesama.webp';

export const StageArenaSection = () => {
  return (
    <section
      id="arena"
      className="relative w-full border-b border-[rgba(16,32,58,0.14)] bg-[#F8FAFD]"
      aria-label="Studio Immersion & Stage Experience"
    >
      {/* Intro Header strip above the scroll expander */}
      <div className="max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 pt-12 sm:pt-16 pb-5 sm:pb-8 flex flex-col md:flex-row md:items-end justify-between gap-3 sm:gap-6">
        <div>
          <div className="flex items-center gap-2 mb-2 sm:mb-2.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#1E5BB8]" />
            <span className="text-[10px] sm:text-[11px] font-semibold text-[#10203A] uppercase tracking-[0.15em]">
              03 / THE STAGE ARENA
            </span>
          </div>
          <h2 className="font-display font-bold text-2xl sm:text-3xl md:text-5xl text-[#10203A] tracking-[-0.025em] leading-tight">
            From Rehearsal Floor to Spotlight.
          </h2>
        </div>
        <p className="font-sans text-xs sm:text-sm text-[#4A5B78] max-w-sm leading-relaxed">
          Scroll down into the frame to unlock the full stage experience.
        </p>
      </div>

      {/* The ScrollExpand Interactive Showcase with live video reel from assets */}
      <div className="w-full relative">
        <ScrollExpand
          desktopSrc={desktopVideo}
          mobileSrc={pesamaVideo}
          src={desktopVideo}
          poster={semiclassicalPoster}
          mobilePoster={pesamaPoster}
          breakpoint={1024}
          mediaType="video"
          alt="Rhythmic Beat Dance Court stage performance reel"
          title="RHYTHMIC BEAT"
          scrollHint="Scroll to Expand the Stage ↓"
          useWindowScroll={true}
          startWidth={48}
          startHeight={58}
          startRadius={24}
          endRadius={0}
          mediaZoom={1.25}
          scrollDistance={0.55}
          holdDistance={0.15}
          smoothing={0.08}
          overlayScrim={0}
          className="w-full"
        />
      </div>
    </section>
  );
};
