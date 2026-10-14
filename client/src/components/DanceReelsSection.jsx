import { useState, useRef, useEffect, useMemo } from 'react';
import CircularCarousel from './CircularCarousel';

import videoPesama from '../assets/Dancing with him is always a pleasure!! The way he compliments , keep me comfortable ❤️❤️ Pesama.mp4';
import videoSemiclassical from '../assets/Glimpse of @yuvi_smart master’s Semiclassical workshop at Rhythmic beat dance court Valasaravakk.mp4';
import videoNallaru from '../assets/nallaru-poo-junior-batch.mp4';
import videoFamilyDance from '../assets/Romba excited-ah and happy-ah irukku! ❤️🥹 En paiyan Tarun-oda and en husband-oda serndhu dance .mp4';
import videoVaadaVaada from '../assets/Vaada Vaada paiya oru reel panla💃🕺Choreo @surendren_joe Edit @kalies_chittiboy Studio @rhythmi.mp4';
import videoFriendship from '../assets/When friendship meets dance, moments become extra special! ❤️💃So happy to dance with my dear fr.mp4';
import videoAerial from '../assets/A little bts from today’s aerial workshop at @rhythmicbeatdancecourt ✨.mp4';

import posterPesama from '../assets/poster-pesama.webp';
import posterSemiclassical from '../assets/poster-semiclassical.webp';
import posterNallaru from '../assets/poster-nallaru-poo.webp';
import posterFamilyDance from '../assets/poster-family-dance.webp';
import posterVaadaVaada from '../assets/poster-vaada-vaada.webp';
import posterFriendship from '../assets/poster-friendship.webp';
import posterAerial from '../assets/aerial-workshop-poster.webp';

const REELS_METADATA = [
  {
    id: 1,
    src: posterPesama,
    videoSrc: videoPesama,
    alt: 'Dancing with him is always a pleasure - Pesama dance reel',
    title: 'Pesama Duet Routine',
    subtitle: 'Choreography & Expressions'
  },
  {
    id: 2,
    src: posterSemiclassical,
    videoSrc: videoSemiclassical,
    alt: 'Master Yuvi Smart Semiclassical workshop at Rhythmic Beat',
    title: 'Semiclassical Workshop',
    subtitle: 'Master Yuvi Smart'
  },
  {
    id: 3,
    src: posterNallaru,
    videoSrc: videoNallaru,
    alt: 'Junior batch Nallaru poo choreography',
    title: 'Nallaru Poo',
    subtitle: 'Junior Batch • Giri Choreography'
  },
  {
    id: 4,
    src: posterFamilyDance,
    videoSrc: videoFamilyDance,
    alt: 'Tarun and family dance celebration at Rhythmic Beat',
    title: 'Family Dance Cypher',
    subtitle: 'Joyful Moments & Celebration'
  },
  {
    id: 5,
    src: posterVaadaVaada,
    videoSrc: videoVaadaVaada,
    alt: 'Vaada Vaada paiya choreographed by Surendren Joe',
    title: 'Vaada Vaada Paiya',
    subtitle: 'Choreo by Surendren Joe'
  },
  {
    id: 6,
    src: posterFriendship,
    videoSrc: videoFriendship,
    alt: 'Friendship and dance celebration on court',
    title: 'Friendship Meets Dance',
    subtitle: 'Court Routine & Energy'
  },
  {
    id: 7,
    src: posterAerial,
    videoSrc: videoAerial,
    alt: 'Aerial silks choreography and suspensions workshop',
    title: 'Aerial Workshop',
    subtitle: 'Silks, Suspensions & Acrobatics'
  }
];

export const DanceReelsSection = () => {
  const sectionRef = useRef(null);
  const [isSectionNear, setIsSectionNear] = useState(false);
  const [isMuted, setIsMuted] = useState(true);

  // Viewport proximity observer for lazy-loading videos (zero video downloads on initial page load)
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsSectionNear(true);
        }
      },
      { rootMargin: '350px 0px' }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const items = useMemo(() => {
    // 12 cards around the panorama ring creates a smooth 30-degree curvature
    const fullList = [...REELS_METADATA, ...REELS_METADATA];
    return fullList.map((item, index) => ({
      src: item.src,
      video: isSectionNear ? item.videoSrc : undefined,
      alt: item.alt,
      title: item.title,
      subtitle: item.subtitle
    }));
  }, [isSectionNear]);

  const toggleMute = () => {
    setIsMuted(prev => !prev);
  };

  return (
    <section
      ref={sectionRef}
      id="reels"
      className="relative w-full py-14 sm:py-20 border-b border-[rgba(16,32,58,0.14)] bg-[#F8FAFD] overflow-hidden scroll-mt-20"
      aria-label="Dance Reels Showcase"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-16 mb-6 sm:mb-10">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 sm:gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#1E5BB8]" />
              <span className="text-[10px] sm:text-[11px] font-semibold text-[#10203A] uppercase tracking-[0.15em]">
                05 / REELS IN MOTION
              </span>
            </div>
            <h2 className="font-display font-bold text-2xl sm:text-3xl md:text-5xl text-[#10203A] tracking-[-0.025em] leading-tight">
              Live Studio Cyphers & Routines.
            </h2>
          </div>

          <div className="flex items-center gap-4">
            <p className="font-sans text-xs sm:text-sm text-[#7B8AA3] max-w-xs leading-relaxed">
              Drag or swipe to spin the 3D ring • Click any video to toggle sound.
            </p>
          </div>
        </div>
      </div>

      {/* 3D Panorama Carousel Container */}
      <div className="w-full relative h-[420px] sm:h-[480px] md:h-[580px] lg:h-[660px]">
        <CircularCarousel
          items={items}
          preset="panorama"
          intro="none"
          responsiveCards={true}
          cardWidth={220}
          aspectRatio={0.62}
          speed={12}
          captions={false}
          gap={20}
          tilt={0}
          curve={0}
          perspective={2600}
          snapOffset={0}
          momentum={0.39}
          parallax={0.22}
          stretch={0.16}
          depthFade={0}
          fadeColor="transparent"
          cornerRadius={20}
          muted={isMuted}
          onToggleMute={toggleMute}
          autoplay="off"
        />
      </div>
    </section>
  );
};

export default DanceReelsSection;
