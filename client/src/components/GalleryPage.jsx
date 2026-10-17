import { useState, useEffect, useCallback, useMemo } from 'react';
import {
  ArrowLeft,
  Sparkles,
  X,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import story1 from '../assets/Our-Story-1.jpg';
import story2 from '../assets/Our-Story-2.jpg';
import rightHero from '../assets/Right-side-hero.jpg';
import footerGroup from '../assets/dance-court-footer-group.webp';
import semiclassicalPoster from '../assets/poster-semiclassical.webp';
import familyPoster from '../assets/poster-family-dance.webp';
import friendshipPoster from '../assets/poster-friendship.webp';
import pesamaPoster from '../assets/poster-pesama.webp';
import vaadaPoster from '../assets/poster-vaada-vaada.webp';
import nallaruPoster from '../assets/poster-nallaru-poo.webp';
import showcaseImg from '../assets/brochure/academy-showcase.jpg';
import aerialPoster from '../assets/aerial-workshop-poster.webp';
import choreoPoster from '../assets/choreography-workshop-poster.jpg';
import aerialYogaImg from '../assets/brochure/course-aerial-yoga.jpg';
import westernKidsImg from '../assets/brochure/course-western-kids.jpg';
import gymnasticsImg from '../assets/brochure/course-gymnastics.jpg';
import imgi49 from '../assets/imgi_49_image.webp';
import imgi28 from '../assets/imgi_28_image.webp';
import DriftWall from './DriftWall';

export const GalleryPage = ({ onNavigate }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== 'undefined' ? window.innerWidth : 1440
  );

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Dynamically calculate columns so the 3D plane stretches across the entire screen from edge to edge
  const driftColumns = useMemo(() => {
    if (windowWidth < 640) return 4;
    if (windowWidth < 1024) return 6;
    if (windowWidth < 1440) return 8;
    if (windowWidth < 1920) return 10;
    return 12;
  }, [windowWidth]);

  const driftTileWidth = useMemo(() => {
    if (windowWidth < 640) return 175;
    if (windowWidth < 1024) return 210;
    if (windowWidth < 1440) return 240;
    return 260;
  }, [windowWidth]);

  const driftTileHeight = useMemo(() => {
    if (windowWidth < 640) return 118;
    if (windowWidth < 1024) return 142;
    if (windowWidth < 1440) return 162;
    return 175;
  }, [windowWidth]);

  const driftWallItems = useMemo(
    () => [
      {
        id: 'dw-1',
        image: story1,
        title: 'Guru Yuvraaj Jayakumar in Motion',
        category: 'Stage Arena',
        desc: 'Cinematic stage capture of artistic founder Guru Yuvraaj Jayakumar.'
      },
      {
        id: 'dw-2',
        image: footerGroup,
        title: 'Ensemble Studio Community',
        category: 'Studio Rehearsals',
        desc: 'Our vibrant multi-generational academy family celebrating post-rehearsal.'
      },
      {
        id: 'dw-3',
        image: semiclassicalPoster,
        title: 'Semiclassical Lyrical Series',
        category: 'Celebrity Workshops',
        desc: 'Masterclass workshop focusing on emotional cadence and fluid classical transitions.'
      },
      {
        id: 'dw-4',
        image: rightHero,
        title: 'Academy Rehearsal Hall',
        category: 'Studio Rehearsals',
        desc: 'Spacious studio halls with sprung flooring and acoustic isolation.'
      },
      {
        id: 'dw-5',
        image: story2,
        title: 'Stage Production Highlights',
        category: 'Stage Arena',
        desc: 'Theatrical stage production featuring junior and senior ensemble choreography.'
      },
      {
        id: 'dw-6',
        image: familyPoster,
        title: 'Family & Junior Dance Showcase',
        category: 'Studio Rehearsals',
        desc: 'Parent and child joint choreography celebrating rhythmic bonding.'
      },
      {
        id: 'dw-7',
        image: friendshipPoster,
        title: 'Friendship Duet Choreography',
        category: 'Celebrity Workshops',
        desc: 'Intensive duet routine blending contemporary floorwork and sync partner steps.'
      },
      {
        id: 'dw-8',
        image: pesamaPoster,
        title: 'Urban Street & Reels Production',
        category: 'Stage Arena',
        desc: 'High-energy urban hip-hop set filmed live in the dance arena.'
      },
      {
        id: 'dw-9',
        image: vaadaPoster,
        title: 'Cinematic Duo Intensive',
        category: 'Celebrity Workshops',
        desc: 'Stylized cinematic choreography masterclass with industry guest artists.'
      },
      {
        id: 'dw-10',
        image: showcaseImg,
        title: 'Academy Annual Showcase',
        category: 'Stage Arena',
        desc: 'Year-end dance court festival with full stage lighting and live audience.'
      },
      {
        id: 'dw-11',
        image: aerialPoster,
        title: 'Aerial Silk & Hoop Workshop',
        category: 'Movement & Fitness',
        desc: 'Anti-gravity suspension routines building upper-body power and elegance.'
      },
      {
        id: 'dw-12',
        image: choreoPoster,
        title: 'Masterclass Choreography Intensive',
        category: 'Celebrity Workshops',
        desc: 'Advanced movement development and musicality conditioning workshop.'
      },
      {
        id: 'dw-13',
        image: aerialYogaImg,
        title: 'Anti-Gravity Aerial Arts',
        category: 'Movement & Fitness',
        desc: 'Suspension conditioning and therapeutic flexibility training.'
      },
      {
        id: 'dw-14',
        image: westernKidsImg,
        title: 'Western Dance Juniors',
        category: 'Studio Rehearsals',
        desc: 'Fast-paced rhythmic routines fostering confidence in young performers.'
      },
      {
        id: 'dw-15',
        image: gymnasticsImg,
        title: 'Acrobatic Gymnastics & Agility',
        category: 'Movement & Fitness',
        desc: 'Tumbling drills, back-handsprings, and balance agility coaching.'
      },
      {
        id: 'dw-16',
        image: nallaruPoster,
        title: 'Nallaru Poo Junior Batch',
        category: 'Studio Rehearsals',
        desc: 'Vibrant kids batch rhythmic exploration and routine execution.'
      },
      {
        id: 'dw-17',
        image: imgi49,
        title: 'Contemporary Studio Flow',
        category: 'Stage Arena',
        desc: 'Fluid expressive sequences merging modern dance dynamics.'
      },
      {
        id: 'dw-18',
        image: imgi28,
        title: 'Academy Training Session',
        category: 'Studio Rehearsals',
        desc: 'Rigorous technique refinement during weekly intensive sessions.'
      }
    ],
    []
  );

  const masterpieceItems = useMemo(
    () => [
      {
        id: 'mp-1',
        image: story1,
        title: 'Guru Yuvraaj Jayakumar in Motion',
        category: 'Stage Arena',
        desc: 'Cinematic stage capture of artistic founder Guru Yuvraaj Jayakumar.',
        rot: -13,
        ty: 14,
        zIndex: 10
      },
      {
        id: 'mp-2',
        image: story2,
        title: 'Guru Yuvraaj at Adiyogi',
        category: 'Bharatanatyam & Classical',
        desc: 'Sacred classical expression and traditional postures by Founder Guru Yuvraaj Jayakumar.',
        rot: -8.5,
        ty: 7,
        zIndex: 20,
        handle: '@guru_yuvraaj',
        handleBg: '#145A96'
      },
      {
        id: 'mp-3',
        image: aerialPoster,
        title: 'Anti-Gravity Aerial Arts Intensive',
        category: 'Movement & Fitness',
        desc: 'Suspension silks and hoop choreography conditioning balance, flexibility, and agility.',
        rot: -4,
        ty: 2,
        zIndex: 30
      },
      {
        id: 'mp-4',
        image: showcaseImg,
        title: 'RBDC Annual Stage Arena Showcase',
        category: 'Stage Arena',
        desc: 'Year-end dance court festival with full stage lighting and live audience.',
        rot: 0,
        ty: -5,
        zIndex: 40
      },
      {
        id: 'mp-5',
        image: westernKidsImg,
        title: 'Junior Performance Ensemble',
        category: 'Studio Rehearsals',
        desc: 'High-energy junior batch performing sync choreography routines.',
        rot: 4,
        ty: 2,
        zIndex: 30
      },
      {
        id: 'mp-6',
        image: choreoPoster,
        title: 'Choreography Masterclass Intensive',
        category: 'Celebrity Workshops',
        desc: 'Advanced movement development, stage confidence, and musicality conditioning workshop.',
        rot: 8.5,
        ty: 7,
        zIndex: 20,
        handle: '@rhythmicbeat',
        handleBg: '#22C55E'
      },
      {
        id: 'mp-7',
        image: footerGroup,
        title: 'RBDC Dance Court Family',
        category: 'Studio Community',
        desc: 'Our vibrant multi-generational academy family celebrating post-rehearsal.',
        rot: 13,
        ty: 14,
        zIndex: 10
      }
    ],
    []
  );

  const allImages = useMemo(() => {
    const list = [...masterpieceItems];
    driftWallItems.forEach((item) => {
      if (!list.some((existing) => existing.image === item.image)) {
        list.push(item);
      }
    });
    return list;
  }, [masterpieceItems, driftWallItems]);

  const currentIndex = useMemo(() => {
    if (!selectedImage) return -1;
    return allImages.findIndex(
      (item) => item.image === selectedImage.image || item.title === selectedImage.title
    );
  }, [selectedImage, allImages]);

  const handleOpenLightbox = useCallback((item) => {
    setSelectedImage(item);
  }, []);

  const handleCloseLightbox = useCallback(() => {
    setSelectedImage(null);
  }, []);

  const handleNextImage = useCallback(() => {
    if (allImages.length === 0) return;
    const nextIdx = (currentIndex + 1) % allImages.length;
    setSelectedImage(allImages[nextIdx]);
  }, [allImages, currentIndex]);

  const handlePrevImage = useCallback(() => {
    if (allImages.length === 0) return;
    const prevIdx = (currentIndex - 1 + allImages.length) % allImages.length;
    setSelectedImage(allImages[prevIdx]);
  }, [allImages, currentIndex]);

  // Handle ESC key and arrows
  useEffect(() => {
    if (!selectedImage) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setSelectedImage(null);
      } else if (e.key === 'ArrowRight') {
        handleNextImage();
      } else if (e.key === 'ArrowLeft') {
        handlePrevImage();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [selectedImage, handleNextImage, handlePrevImage]);

  return (
    <div className="min-h-screen w-full overflow-x-hidden min-w-0 bg-[#F1F3F5] text-[#222222] selection:bg-[#145A96]/20 selection:text-[#222222]">
      {/* MASTERPIECE SHOWCASE SECTION (Top of Gallery Page) */}
      <section
        id="masterpiece-showcase"
        className="relative w-full pt-20 sm:pt-24 md:pt-28 pb-12 sm:pb-16 bg-white border-b border-[rgba(34,34,34,0.06)] overflow-hidden"
        aria-label="Masterpiece Showcase"
      >
        <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8">
          {/* Top Row: Navigation Back to Home */}
          <div className="flex items-center justify-between mb-6 sm:mb-10">
            <button
              type="button"
              onClick={() => onNavigate('/')}
              className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#222222]/70 hover:text-[#145A96] transition-colors bg-[#F1F3F5] hover:bg-[#E5E7EB] px-4 py-2 rounded-full border border-[rgba(34,34,34,0.08)] shadow-2xs cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Home</span>
            </button>

            <div className="hidden sm:flex items-center gap-2 text-xs font-bold text-[#F28C28] uppercase tracking-widest">
              <span className="w-2 h-2 rounded-full bg-[#F28C28] animate-pulse" />
              <span>Masterpiece Showcase</span>
            </div>
          </div>

          {/* Centered Headline matching reference layout */}
          <div className="text-center max-w-3xl mx-auto mb-6 sm:mb-10">
            <h1 className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight !text-[#111827] leading-[1.14]">
              A stage to display your dance masterpiece.
            </h1>
          </div>

          {/* Fanned Cards Deck with Speech Bubbles - 100% responsive */}
          <div className="relative w-full max-w-5xl mx-auto pt-8 sm:pt-12 pb-4">
            <div className="w-full flex items-center justify-center py-4 px-1">
              <div className="flex items-center justify-center -space-x-3.5 xs:-space-x-4.5 sm:-space-x-7 md:-space-x-9 lg:-space-x-11 mx-auto">
                {masterpieceItems.map((item, idx) => (
                  <div
                    key={item.id}
                    className="relative shrink-0"
                    style={{ zIndex: item.zIndex }}
                  >
                    {/* Floating Speech Tag (e.g. @guru_yuvraaj or @rhythmicbeat) */}
                    {item.handle && (
                      <div
                        className={`absolute -top-7 xs:-top-8 sm:-top-11 md:-top-12 left-1/2 -translate-x-1/2 z-50 pointer-events-none ${
                          idx < 3 ? 'speech-bubble-float' : 'speech-bubble-float-delayed'
                        }`}
                      >
                        <div
                          className="relative text-white text-[9px] xs:text-[10px] sm:text-xs md:text-sm font-bold px-2.5 xs:px-3 sm:px-4 py-0.5 sm:py-1.5 rounded-full shadow-md flex items-center justify-center tracking-wide select-none whitespace-nowrap"
                          style={{ backgroundColor: item.handleBg }}
                        >
                          {item.handle}
                          <span
                            className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-l-[4px] sm:border-l-[6px] border-l-transparent border-r-[4px] sm:border-r-[6px] border-r-transparent border-t-[5px] sm:border-t-[7px]"
                            style={{ borderTopColor: item.handleBg }}
                          />
                        </div>
                      </div>
                    )}

                    {/* Arched Deck Card */}
                    <button
                      type="button"
                      onClick={() => handleOpenLightbox(item)}
                      aria-label={`Open ${item.title}`}
                      className="masterpiece-card group relative block w-[56px] h-[56px] xs:w-[68px] xs:h-[68px] sm:w-36 sm:h-36 md:w-48 md:h-48 lg:w-56 lg:h-56 rounded-xl xs:rounded-2xl sm:rounded-3xl border-2 sm:border-4 border-white shadow-[0_8px_20px_rgba(0,0,0,0.14)] sm:shadow-[0_16px_32px_rgba(0,0,0,0.18)] bg-white cursor-pointer overflow-hidden text-left focus:outline-none focus:ring-2 focus:ring-[#145A96]"
                      style={{
                        '--rot': `${item.rot}deg`,
                        '--ty': `${item.ty}px`,
                      }}
                    >
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 select-none pointer-events-none"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/15 transition-colors pointer-events-none" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Subtitle Below Cards */}
          <p className="text-center text-[#4B5563] text-xs sm:text-sm md:text-base max-w-xl mx-auto leading-relaxed mt-4 sm:mt-6 px-4 font-normal">
            Dancers showcase their stage masterpieces, and audiences discover movements and rhythms that resonate with them.
          </p>

          {/* Click hint */}
          <div className="mt-3 flex items-center justify-center gap-1.5 text-xs text-[#222222]/50 font-medium">
            <Sparkles className="w-3.5 h-3.5 text-[#F28C28]" />
            <span>Click any stage capture to open high-resolution popup</span>
          </div>
        </div>
      </section>


      {/* FULL WIDTH DriftWall Gallery (Edge to Edge, Clean & Immediate) */}
      <section
        id="driftwall-experience"
        className="relative w-full pt-8 sm:pt-12 pb-10 sm:pb-16 bg-[#F1F3F5] text-[#222222] overflow-hidden"
        aria-label="Photo Gallery"
      >
        {/* Visual Archive Intro */}
        <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 mb-6 sm:mb-8">
          <div className="flex items-center gap-2 mb-2">
            <span className="w-5 h-0.5 bg-[#F28C28] rounded-full inline-block" />
            <span className="text-xs sm:text-sm font-extrabold tracking-widest text-[#F28C28] uppercase">
              VISUAL ARCHIVE
            </span>
          </div>
          <h2 className="font-display font-black text-2xl xs:text-3xl sm:text-4xl tracking-tight uppercase leading-[1.1]">
            <span className="text-[#145A96]">3D DRIFT WALL </span>
            <span className="text-[#F28C28]">COLLECTION.</span>
          </h2>
          <p className="mt-2 text-xs sm:text-sm md:text-base text-[#222222]/75 max-w-2xl font-normal">
            Pan and explore interactive stage moments, masterclass intensives, and studio rehearsals in our continuous 3D drifting gallery.
          </p>
        </div>


        {/* FULL WIDTH DriftWall Container (Edge to Edge, Zero Fog Mask, Crystal-Clear Images) */}
        <div className="relative w-full h-[620px] xs:h-[700px] sm:h-[780px] lg:h-[840px] xl:h-[900px] overflow-hidden select-none">
          <DriftWall
            items={driftWallItems}
            columns={driftColumns}
            tileWidth={driftTileWidth}
            tileHeight={driftTileHeight}
            gap={22}
            radius={16}
            tilt={14}
            turn={-12}
            roll={0}
            perspective={1200}
            depth={110}
            speed={38}
            direction="up"
            variance={0.45}
            parallax={0.65}
            pauseOnHover={false}
            lift={70}
            fade={0}
            dim={1}
            grayscale={false}
            overlayColor="transparent"
            hasFog={false}
            onItemClick={handleOpenLightbox}
          />
        </div>
      </section>

      {/* FULL IMAGE LIGHTBOX MODAL */}
      {selectedImage && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={selectedImage.title || 'Image Preview'}
          className="fixed inset-0 z-[120] flex items-center justify-center p-3 sm:p-6 bg-black/90 backdrop-blur-md animate-in fade-in duration-200"
          onClick={handleCloseLightbox}
        >
          <div
            className="relative max-w-5xl w-full max-h-[95vh] flex flex-col items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top Modal Controls */}
            <div className="w-full flex items-center justify-between pb-3 px-2 text-white">
              <div className="flex items-center gap-2.5 truncate mr-4">
                {selectedImage.category && (
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-[#F28C28] text-white shrink-0">
                    {selectedImage.category}
                  </span>
                )}
                <h3 className="text-sm sm:text-base font-bold text-white/95 truncate">
                  {selectedImage.title}
                </h3>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  type="button"
                  onClick={handleCloseLightbox}
                  className="p-2 sm:p-2.5 rounded-full bg-white/10 hover:bg-white/25 text-white transition-colors cursor-pointer border border-white/10"
                  aria-label="Close Preview"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* High-Resolution Full Image Display */}
            <div className="relative w-full flex items-center justify-center overflow-hidden rounded-2xl bg-black/60 border border-white/15 shadow-2xl">
              <img
                src={selectedImage.image}
                alt={selectedImage.title || 'Studio gallery'}
                className="max-h-[72vh] sm:max-h-[78vh] w-auto max-w-full object-contain rounded-xl select-none"
              />

              {/* Prev / Next Navigation Arrows */}
              <button
                type="button"
                onClick={handlePrevImage}
                className="absolute left-3 top-1/2 -translate-y-1/2 p-2.5 sm:p-3 rounded-full bg-black/60 hover:bg-black/90 text-white backdrop-blur-md border border-white/15 transition-all cursor-pointer shadow-lg hover:scale-105"
                aria-label="Previous Image"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                type="button"
                onClick={handleNextImage}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-2.5 sm:p-3 rounded-full bg-black/60 hover:bg-black/90 text-white backdrop-blur-md border border-white/15 transition-all cursor-pointer shadow-lg hover:scale-105"
                aria-label="Next Image"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Bottom Caption & Indicator */}
            <div className="w-full flex items-center justify-between pt-3 px-2 text-white/70 text-xs">
              <span className="truncate max-w-xs sm:max-w-md">
                {selectedImage.desc || selectedImage.title}
              </span>
              <div className="flex items-center gap-3 shrink-0">
                <span className="font-semibold text-white/80">
                  {currentIndex >= 0 ? `${currentIndex + 1} / ${allImages.length}` : ''}
                </span>
                <span className="hidden sm:inline text-white/40">
                  • Press ESC to close
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
