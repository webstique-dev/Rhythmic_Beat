import { useState, useEffect } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';

import imgFamilyDance from '../assets/poster-family-dance.webp';
import imgCertificate from '../assets/imgi_66_image.webp';
import imgPinkDuet from '../assets/imgi_58_image.webp';
import imgPesama from '../assets/poster-pesama.webp';

const TESTIMONIALS = [
  {
    id: 1,
    image: imgFamilyDance,
    name: 'Lavanya Sundar',
    role: 'Parent & Junior Batch Student • Valasaravakkam Studio',
    highlight: 'Confidence, discipline & pure stage joy on every beat.',
    review:
      'Dancing with my son Tarun and seeing his stage confidence blossom at Rhythmic Beat has been an unforgettable experience. The mentors take personal care of every child’s posture, musicality, and joy of movement.',
  },
  {
    id: 2,
    image: imgCertificate,
    name: 'Ananya & Family',
    role: 'Junior Foundations Graduate • Ambattur Studio',
    highlight: 'Targeted corrections with utmost patience & warmth.',
    review:
      'The structured syllabus and patience of the instructors made all the difference. Ananya started with zero rhythm basics and now performs complex routines with ease and beautiful stage expression.',
  },
  {
    id: 3,
    image: imgPinkDuet,
    name: 'Kaaviya Krishna',
    role: 'Contemporary & Semiclassical Intensive • Chennai',
    highlight: 'Industry-level stage choreography & safe kinesiology.',
    review:
      'RBDC provides an environment where you are pushed to elevate your stamina while feeling completely supported. The master workshops bring cutting-edge commercial and classical choreography right to the studio floor.',
  },
  {
    id: 4,
    image: imgPesama,
    name: 'Samyuktha & Joe',
    role: 'Urban Duet & Bollywood Repertoire • Kolapakkam Studio',
    highlight: 'A warm space that brings out your authentic rhythm.',
    review:
      'The faculty understands how to keep dancers comfortable while polishing timing, partnering, and nuanced expressions. Every rehearsal session translates directly to spotlight-ready stage execution.',
  },
];

export const TestimonialsSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const handlePrev = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex((prev) => (prev === 0 ? TESTIMONIALS.length - 1 : prev - 1));
  };

  const handleNext = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex((prev) => (prev === TESTIMONIALS.length - 1 ? 0 : prev + 1));
  };

  const handleSelect = (index) => {
    if (index === currentIndex || isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex(index);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsTransitioning(false);
    }, 250);
    return () => clearTimeout(timer);
  }, [currentIndex]);

  const current = TESTIMONIALS[currentIndex];

  return (
    <section
      id="testimonials"
      className="relative w-full py-14 sm:py-20 md:py-24 border-b border-[rgba(16,32,58,0.14)] bg-[#F8FAFD] overflow-hidden"
      aria-label="Student and Parent Testimonials"
    >
      <div className="max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 sm:gap-6 mb-8 sm:mb-12">
          <div>
            <div className="flex items-center gap-2 mb-2 sm:mb-2.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#F28C1E]" />
              <span className="text-[10px] sm:text-[11px] font-semibold text-[#10203A] uppercase tracking-[0.15em]">
                06 / VOICES OF THE COURT
              </span>
            </div>
            <h2 className="font-display font-bold text-2xl sm:text-3xl md:text-5xl text-[#10203A] tracking-[-0.025em] leading-tight">
              What Our Dancers & Parents Say.
            </h2>
          </div>

          <p className="font-sans text-xs sm:text-sm text-[#7B8AA3] max-w-sm leading-relaxed">
            Authentic experiences from students, parents, and workshop artists across our Valasaravakkam, Ambattur, Kolapakkam & Pondicherry studios.
          </p>
        </div>

        {/* Featured Testimonial Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-stretch mb-8 sm:mb-10">
          {/* Left Column: Featured Client / Student Photo */}
          <div className="lg:col-span-5 relative rounded-[22px] sm:rounded-[28px] overflow-hidden bg-[#10203A]/5 border border-[rgba(16,32,58,0.08)] shadow-[0_16px_40px_-12px_rgba(16,32,58,0.1)] h-[360px] sm:h-[440px] lg:h-[480px]">
            <img
              key={`img-${current.id}`}
              src={current.image}
              alt={current.name}
              className={`w-full h-full object-cover transition-all duration-300 ${
                isTransitioning ? 'opacity-70 scale-[1.02]' : 'opacity-100 scale-100'
              }`}
            />

            {/* Overlaid Pull-Quote Badge matching reference layout */}
            <div className="absolute bottom-4 left-4 right-4 sm:right-6 bg-[#10203A]/90 backdrop-blur-md text-white p-4 sm:p-5 rounded-xl sm:rounded-2xl border border-white/10 shadow-xl">
              <p className="font-display font-semibold text-xs sm:text-sm text-white leading-snug">
                “{current.highlight}”
              </p>
            </div>
          </div>

          {/* Right Column: Featured Review Card */}
          <div className="lg:col-span-7 rounded-[22px] sm:rounded-[28px] bg-white p-6 sm:p-10 md:p-12 border border-[rgba(16,32,58,0.08)] shadow-[0_16px_40px_-12px_rgba(16,32,58,0.06)] flex flex-col justify-between min-h-[360px] sm:min-h-[440px] lg:min-h-[480px]">
            <div
              key={`text-${current.id}`}
              className={`space-y-6 transition-all duration-300 ${
                isTransitioning ? 'opacity-50 translate-y-1' : 'opacity-100 translate-y-0'
              }`}
            >
              {/* Review Text in Quotations */}
              <blockquote className="font-sans text-base sm:text-lg md:text-xl text-[#10203A] font-normal leading-relaxed">
                “{current.review}”
              </blockquote>

              {/* Client Name & Designation */}
              <div className="pt-2">
                <h3 className="font-display font-bold text-base sm:text-lg text-[#10203A] tracking-tight">
                  {current.name}
                </h3>
                <p className="font-sans text-xs sm:text-sm text-[#7B8AA3] mt-0.5 font-medium">
                  {current.role}
                </p>
              </div>
            </div>

            {/* Bottom Controls Bar with Index and Arrows */}
            <div className="flex items-center justify-between pt-6 border-t border-[rgba(16,32,58,0.08)] mt-6">
              <div className="text-xs font-semibold text-[#7B8AA3] uppercase tracking-[0.14em]">
                <span className="text-[#10203A] font-bold">0{currentIndex + 1}</span> / 0{TESTIMONIALS.length}
              </div>

              <div className="flex items-center gap-2 sm:gap-3">
                <button
                  type="button"
                  onClick={handlePrev}
                  aria-label="Previous testimonial"
                  className="w-11 h-11 rounded-xl bg-[#F0F4FA] hover:bg-[#10203A] hover:text-white text-[#10203A] flex items-center justify-center transition-all duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1E5BB8] active:scale-95"
                >
                  <ArrowLeft className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={handleNext}
                  aria-label="Next testimonial"
                  className="w-11 h-11 rounded-xl bg-[#F0F4FA] hover:bg-[#10203A] hover:text-white text-[#10203A] flex items-center justify-center transition-all duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1E5BB8] active:scale-95"
                >
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Small Client Thumbnail Previews (Matching Reference UI) */}
        <div className="flex items-center justify-center gap-3 sm:gap-4">
          {TESTIMONIALS.map((item, idx) => {
            const isActive = idx === currentIndex;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => handleSelect(idx)}
                aria-label={`View testimonial from ${item.name}`}
                aria-pressed={isActive}
                className={`relative w-14 h-14 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl overflow-hidden cursor-pointer transition-all duration-200 ${
                  isActive
                    ? 'ring-2 ring-[#10203A] shadow-md scale-105 opacity-100'
                    : 'opacity-40 hover:opacity-80 scale-100'
                }`}
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover"
                />
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};
