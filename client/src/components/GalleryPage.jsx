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

export const GalleryPage = ({ onNavigate }) => {
  const [activeFilter, setActiveFilter] = useState('All');

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
    <div className="min-h-screen w-full overflow-x-hidden min-w-0 bg-[#FAF9F5] text-[#10203A] selection:bg-[#EAF1FB] selection:text-[#10203A]">
      {/* Hero / Header Section */}
      <section
        id="gallery-hero"
        className="relative w-full pt-28 xs:pt-32 sm:pt-36 pb-12 sm:pb-16 border-b border-[rgba(16,32,58,0.08)]"
        aria-label="Gallery Introduction"
      >
        <div className="max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16">
          {/* Back Button */}
          <div className="mb-6 sm:mb-8">
            <button
              type="button"
              onClick={() => onNavigate('/')}
              className="inline-flex items-center gap-1.5 sm:gap-2 text-[11px] sm:text-xs font-semibold uppercase tracking-[0.12em] text-[#4A5B78] hover:text-[#10203A] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1E5BB8] rounded-full px-3 py-1 bg-white/80 border border-[#ECE7DC] shadow-xs cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Home</span>
            </button>
          </div>

          <div className="max-w-3xl">
            <div className="flex items-center gap-2 mb-3">
              <span className="w-2 h-2 rounded-full bg-[#F28C1E] shrink-0" />
              <span className="text-[10px] xs:text-[11px] font-semibold text-[#10203A] uppercase tracking-[0.14em]">
                Stage Moments • Studio Life • Captured Memories
              </span>
            </div>
            <h1 className="font-display font-extrabold text-3xl xs:text-4xl sm:text-6xl text-[#10203A] tracking-[-0.03em] leading-[1.1]">
              Performance Gallery
            </h1>
            <p className="mt-4 sm:mt-6 text-sm sm:text-base lg:text-lg text-[#4A5B78] leading-relaxed">
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
                      ? 'bg-[#18181B] text-white shadow-xs'
                      : 'bg-white border border-[#ECE7DC] text-[#4A5B78] hover:text-[#10203A]'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-14 sm:py-20 max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-3xl overflow-hidden border border-[#ECE7DC] shadow-xs group hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div className="relative h-[260px] overflow-hidden bg-[#10203A]">
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
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-[#F28C1E] block mb-1">
                    {item.category}
                  </span>
                  <h3 className="font-display font-bold text-sm text-[#10203A]">
                    {item.title}
                  </h3>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Informational Placeholder Notice */}
        <div className="mt-12 p-6 sm:p-8 rounded-3xl bg-white border border-[#ECE7DC] flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-2xl bg-[#FFF6EE] border border-[#F28C1E]/20 flex items-center justify-center text-[#F28C1E] shrink-0">
              <Camera className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-display font-bold text-base sm:text-lg text-[#10203A]">
                Full Media Archive & Video Reel Portal
              </h3>
              <p className="text-xs sm:text-sm text-[#4A5B78] mt-1 max-w-xl">
                High-definition stage video streams, behind-the-scenes footage, and event photo albums are currently being cataloged for progressive release.
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => onNavigate('/contact-us')}
            className="px-5 py-2.5 rounded-full text-xs font-semibold bg-[#18181B] text-white hover:bg-black transition-colors shrink-0 shadow-sm cursor-pointer"
          >
            Connect with Us
          </button>
        </div>
      </section>
    </div>
  );
};
