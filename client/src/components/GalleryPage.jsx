import { useState } from 'react';
import {
  ArrowLeft,
  Sparkles,
  Camera,
  Play,
  Maximize2,
  ArrowRight
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
import showcaseImg from '../assets/brochure/academy-showcase.jpg';
import aerialPoster from '../assets/aerial-workshop-poster.webp';
import choreoPoster from '../assets/choreography-workshop-poster.jpg';
import aerialYogaImg from '../assets/brochure/course-aerial-yoga.jpg';
import westernKidsImg from '../assets/brochure/course-western-kids.jpg';
import gymnasticsImg from '../assets/brochure/course-gymnastics.jpg';
import ImageTrail from './ImageTrail';

export const GalleryPage = ({ onNavigate }) => {
  const [activeFilter, setActiveFilter] = useState('All');

  const trailImages = [
    showcaseImg,
    story1,
    aerialYogaImg,
    story2,
    semiclassicalPoster,
    choreoPoster,
    rightHero,
    familyPoster,
    aerialPoster,
    friendshipPoster,
    westernKidsImg,
    pesamaPoster,
    gymnasticsImg,
    vaadaPoster,
    footerGroup
  ];

  const galleryItems = [
    {
      id: 1,
      title: 'Guru Yuvraaj Jayakumar in Motion',
      category: 'Stage Arena',
      image: story1,
    },
    {
      id: 2,
      title: 'Ensemble Studio Community',
      category: 'Studio Rehearsals',
      image: footerGroup,
    },
    {
      id: 3,
      title: 'Semiclassical Lyrical Series',
      category: 'Celebrity Workshops',
      image: semiclassicalPoster,
    },
    {
      id: 4,
      title: 'Academy Rehearsal Hall',
      category: 'Studio Rehearsals',
      image: rightHero,
    },
    {
      id: 5,
      title: 'Stage Production Highlights',
      category: 'Stage Arena',
      image: story2,
    },
    {
      id: 6,
      title: 'Family & Junior Dance Showcase',
      category: 'Studio Rehearsals',
      image: familyPoster,
    },
    {
      id: 7,
      title: 'Friendship Duet Choreography',
      category: 'Celebrity Workshops',
      image: friendshipPoster,
    },
    {
      id: 8,
      title: 'Urban Street & Reels Production',
      category: 'Stage Arena',
      image: pesamaPoster,
    },
    {
      id: 9,
      title: 'Cinematic Duo Intensive',
      category: 'Celebrity Workshops',
      image: vaadaPoster,
    },
  ];

  const categories = ['All', 'Stage Arena', 'Studio Rehearsals', 'Celebrity Workshops'];

  const filteredItems =
    activeFilter === 'All'
      ? galleryItems
      : galleryItems.filter((item) => item.category === activeFilter);

  return (
    <div className="min-h-screen w-full overflow-x-hidden min-w-0 bg-[#F1F3F5] text-[#222222] selection:bg-[#145A96]/20 selection:text-[#222222]">
      {/* Hero / Header Section */}
      <section
        id="gallery-hero"
        className="relative w-full pt-28 xs:pt-32 sm:pt-36 pb-12 sm:pb-16 border-b border-[rgba(34,34,34,0.08)]"
        aria-label="Gallery Introduction"
      >
        <div className="max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16">
          {/* Back Button */}
          <div className="mb-6 sm:mb-8">
            <button
              type="button"
              onClick={() => onNavigate('/')}
              className="inline-flex items-center gap-1.5 sm:gap-2 text-[11px] sm:text-xs font-semibold uppercase tracking-[0.12em] text-[#222222]/70 hover:text-[#145A96] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#145A96] rounded-full px-3 py-1 bg-white border border-[rgba(34,34,34,0.12)] shadow-xs cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Home</span>
            </button>
          </div>

          <div className="max-w-3xl">
            <div className="flex items-center gap-2 mb-3">
              <span className="w-2 h-2 rounded-full bg-[#F28C28] shrink-0" />
              <span className="text-[10px] xs:text-[11px] font-semibold text-[#222222] uppercase tracking-[0.14em]">
                Stage Moments • Studio Life • Captured Memories
              </span>
            </div>
            <h1 className="font-display font-extrabold text-3xl xs:text-4xl sm:text-6xl text-[#145A96] tracking-[-0.03em] leading-[1.1]">
              Performance Gallery
            </h1>
            <p className="mt-4 sm:mt-6 text-sm sm:text-base lg:text-lg text-[#222222]/75 leading-relaxed">
              Explore photographic archives and motion captures from our annual productions, masterclass intensives, and everyday studio breakthroughs across our campuses.
            </p>

            {/* Filter Buttons */}
            <div className="mt-8 flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setActiveFilter(cat)}
                  className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer ${
                    activeFilter === cat
                      ? 'bg-[#145A96] text-white shadow-xs'
                      : 'bg-white border border-[rgba(34,34,34,0.12)] text-[#222222]/70 hover:text-[#145A96]'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Movement Image Trail Section (React Bits Component) */}
      <section
        id="motion-trail-section"
        className="relative w-full py-12 sm:py-16 border-b border-[rgba(34,34,34,0.08)] bg-white overflow-hidden"
        aria-label="Interactive Motion Gallery"
      >
        <div className="max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6 sm:mb-8">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="w-2 h-2 rounded-full bg-[#F28C28] animate-pulse" />
                <span className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.18em] text-[#145A96]">
                  Interactive Motion Experience
                </span>
              </div>
              <h2 className="font-display font-black text-2xl xs:text-3xl sm:text-4xl text-[#145A96] tracking-tight">
                Movement Trail Canvas
              </h2>
              <p className="text-xs sm:text-sm text-[#222222]/70 mt-1 max-w-xl">
                Glide your cursor or touch-drag across the arena below to unleash live moments, choreography intensives, and studio breakthroughs in a dynamic photo trail.
              </p>
            </div>

            <div className="hidden sm:inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#F1F3F5] border border-[rgba(34,34,34,0.1)] text-xs text-[#145A96] font-semibold">
              <Sparkles className="w-3.5 h-3.5 text-[#F28C28]" />
              <span>Hover &amp; Move Cursor</span>
            </div>
          </div>

          {/* Interactive Canvas Box */}
          <div className="relative w-full h-[360px] xs:h-[420px] sm:h-[480px] lg:h-[520px] rounded-3xl overflow-hidden bg-gradient-to-br from-[#145A96] via-[#104877] to-[#0d3b63] border border-[rgba(34,34,34,0.12)] shadow-xl cursor-crosshair select-none flex items-center justify-center">
            {/* Ambient Watermark */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none opacity-[0.07]">
              <span className="font-display font-black text-6xl xs:text-7xl sm:text-9xl tracking-[0.2em] uppercase text-white whitespace-nowrap">
                RHYTHMIC BEAT
              </span>
            </div>

            {/* Instruction pill overlay */}
            <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center text-center p-6 z-0">
              <span className="px-4 py-1.5 rounded-full bg-white/15 backdrop-blur-md border border-white/25 text-xs sm:text-sm font-bold uppercase tracking-wider text-white shadow-md mb-2">
                ✦ Move Cursor Across Stage ✦
              </span>
              <p className="text-[11px] sm:text-xs text-white/75 max-w-xs sm:max-w-sm">
                Interactive photo trail responds to your speed, direction, and gestures
              </p>
            </div>

            <ImageTrail
              items={trailImages}
              size={195}
              aspectRatio={1.15}
              radius={16}
              threshold={60}
              lifetime={0.45}
              appearScale={0}
              zoom={2.2}
              flash={0.5}
              drift={0.25}
              rotation={16}
              sizeVariance={0.3}
              tilt={10}
            />
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-14 sm:py-20 max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-3xl overflow-hidden border border-[rgba(34,34,34,0.12)] shadow-xs group hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div className="relative h-[260px] overflow-hidden bg-[#145A96]">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-5">
                  <span className="text-white text-xs font-semibold flex items-center gap-1.5">
                    <Maximize2 className="w-3.5 h-3.5" />
                    <span>View Full Size</span>
                  </span>
                </div>
              </div>

              <div className="p-5 flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-[#F28C28] block mb-1">
                    {item.category}
                  </span>
                  <h3 className="font-display font-bold text-sm text-[#145A96]">
                    {item.title}
                  </h3>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Informational Placeholder Notice */}
        <div className="mt-12 p-6 sm:p-8 rounded-3xl bg-white border border-[rgba(34,34,34,0.12)] flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-2xl bg-[#F1F3F5] border border-[#F28C28]/25 flex items-center justify-center text-[#F28C28] shrink-0">
              <Camera className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-display font-bold text-base sm:text-lg text-[#145A96]">
                Full Media Archive & Video Reel Portal
              </h3>
              <p className="text-xs sm:text-sm text-[#222222]/75 mt-1 max-w-xl">
                High-definition stage video streams, behind-the-scenes footage, and event photo albums are currently being cataloged for progressive release.
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => onNavigate('/contact-us')}
            className="px-5 py-2.5 rounded-full text-xs font-semibold bg-[#145A96] text-white hover:bg-[#145A96]/90 transition-colors shrink-0 shadow-sm cursor-pointer"
          >
            Connect with Us
          </button>
        </div>
      </section>
    </div>
  );
};
