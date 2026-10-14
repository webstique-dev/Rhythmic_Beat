import FlexCarousel from './FlexCarousel';

import img9 from '../assets/imgi_9_image.webp';
import img28 from '../assets/imgi_28_image.webp';
import img34 from '../assets/imgi_34_image.webp';
import img40 from '../assets/imgi_40_image.webp';
import img49 from '../assets/imgi_49_image.webp';
import img58 from '../assets/imgi_58_image.webp';
import img66 from '../assets/imgi_66_image.webp';
import img72 from '../assets/imgi_72_image.webp';
import footerGroupImg from '../assets/dance-court-footer-group.webp';

const DANCE_GALLERY_ITEMS = [
  {
    src: img9,
    alt: 'RBDC dancers executing high energy choreography',
    title: 'Bollywood Intensive',
    subtitle: 'Commercial & High Energy'
  },
  {
    src: img28,
    alt: 'Urban street dancer freezing in dynamic break',
    title: 'Urban Hip-Hop',
    subtitle: 'Popping & Street Cyphers'
  },
  {
    src: img34,
    alt: 'Contemporary dance expression with full body extension',
    title: 'Contemporary Flow',
    subtitle: 'Lyrical & Floor Suspensions'
  },
  {
    src: img40,
    alt: 'Classical dancer in traditional Bharatanatyam posture',
    title: 'Bharatanatyam',
    subtitle: 'Mudras & Classical Jathis'
  },
  {
    src: img49,
    alt: 'High octane Zumba cardio fitness session',
    title: 'Zumba Fitness',
    subtitle: 'Cardio & Latin Beats'
  },
  {
    src: img66,
    alt: 'Young performers in junior dance academy',
    title: 'Junior Foundations',
    subtitle: 'Musicality & Coordination'
  },
  {
    src: img72,
    alt: 'Academy faculty choreographing routine',
    title: 'Master Workshop',
    subtitle: 'Stage Choreography'
  },
  {
    src: img58,
    alt: 'Rhythm movement isolation on rehearsal floor',
    title: 'Studio Rehearsals',
    subtitle: 'Precision & Stamina'
  },
  {
    src: footerGroupImg,
    alt: 'Rhythmic Beat Dance Court academy ensemble crew',
    title: 'Academy Ensemble',
    subtitle: 'Company Dancers'
  }
];

export const GalleryShowcaseSection = () => {
  return (
    <section
      id="gallery"
      className="relative w-full py-12 sm:py-20 border-b border-[rgba(16,32,58,0.14)] bg-[#F8FAFD] overflow-hidden"
      aria-label="Dance Motion Gallery"
    >
      {/* Clean, minimal header responsive down to 320px */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-16 mb-6 sm:mb-10">
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

      {/* FlexCarousel Stage Container with straight cards and increased image height */}
      <div className="w-full relative h-[450px] xs:h-[490px] sm:h-[550px] md:h-[600px]">
        <FlexCarousel
          items={DANCE_GALLERY_ITEMS}
          preset="liquid"
          intro="rise"
          cardHeight={0.78}
          gap={16}
          radius={22}
          squeeze={0.05}
          focusOnClick={true}
          captions={false}
          bend={0}
          dispersion={0}
          tilt={0}
          roundness={0}
          autoplay={true}
          interval={4}
        />
      </div>
    </section>
  );
};
