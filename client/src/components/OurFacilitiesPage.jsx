import {
  ArrowLeft,
  Sparkles,
  ShieldCheck,
  Volume2,
  Maximize2,
  Wind,
  Layers,
  Camera,
  MapPin,
  ArrowRight
} from 'lucide-react';
import heroStudioImg from '../assets/Right-side-hero.jpg';

export const OurFacilitiesPage = ({ onNavigate }) => {
  const facilities = [
    {
      icon: Layers,
      title: 'Spring Wooden Flooring',
      description: 'Professional multi-layer sprung wooden floors engineered to absorb impact, preventing shin splints and joint strain during high-impact routines and footwork.',
      accent: 'border-[#F28C28]/25 bg-[#F1F3F5] text-[#F28C28]',
    },
    {
      icon: Volume2,
      title: 'Acoustic Sound Architecture',
      description: 'Custom-tuned studio acoustics paired with high-clarity professional monitor systems ensure every beat, drop, and rhythmic nuance is heard with crystalline fidelity.',
      accent: 'border-[#145A96]/20 bg-[#F1F3F5] text-[#145A96]',
    },
    {
      icon: Maximize2,
      title: 'Full-Span Mirror Walls',
      description: 'Distortion-free, ceiling-to-floor mirrored arenas that give dancers and instructors 360-degree visual feedback on body alignment, lines, and synchronization.',
      accent: 'border-[#145A96]/20 bg-[#F1F3F5] text-[#145A96]',
    },
    {
      icon: Camera,
      title: 'Cinematic Reel Stage Setup',
      description: 'Specialized studio lighting with ambient RGB rigs, backdrop options, and 4K content recording spaces for video reels, portfolio shoots, and showcases.',
      accent: 'border-[#F28C28]/25 bg-[#F1F3F5] text-[#F28C28]',
    },
    {
      icon: Wind,
      title: 'Climate Controlled Studios',
      description: 'Complete centralized air-conditioning with optimized air circulation systems to keep stamina high and humidity low even during intensive rehearsals.',
      accent: 'border-[#145A96]/20 bg-[#F1F3F5] text-[#145A96]',
    },
    {
      icon: ShieldCheck,
      title: 'Aerial Rigging Points',
      description: 'Certified structural ceiling mountings load-tested for aerial silks, lyra hoops, and stunt suspension ropes with safety crash mats on hand.',
      accent: 'border-[#145A96]/20 bg-[#F1F3F5] text-[#145A96]',
    },
  ];

  return (
    <div className="min-h-screen w-full overflow-x-hidden min-w-0 bg-[#F1F3F5] text-[#222222] selection:bg-[#145A96]/20 selection:text-[#222222]">
      {/* Hero / Header Section */}
      <section
        id="facilities-hero"
        className="relative w-full pt-28 xs:pt-32 sm:pt-36 pb-12 sm:pb-16 border-b border-[rgba(34,34,34,0.08)]"
        aria-label="Facilities Introduction"
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

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 items-center">
            <div className="lg:col-span-7">
              <div className="flex items-center gap-2 mb-3">
                <span className="w-2 h-2 rounded-full bg-[#F28C28] shrink-0" />
                <span className="text-[10px] xs:text-[11px] font-semibold text-[#222222] uppercase tracking-[0.14em]">
                  World-Class Infrastructure • Built for Performers
                </span>
              </div>
              <h1 className="font-display font-extrabold text-3xl xs:text-4xl sm:text-6xl text-[#145A96] tracking-[-0.03em] leading-[1.1]">
                Our Facilities
              </h1>
              <p className="mt-4 sm:mt-6 text-sm sm:text-base lg:text-lg text-[#222222]/75 max-w-2xl leading-relaxed">
                Step into arenas designed specifically for dancers. Every studio across our Chennai and Puducherry campuses is built with safety, acoustic balance, and theatrical scale in mind.
              </p>
              <div className="mt-6 flex flex-wrap items-center gap-3 text-xs text-[#222222]">
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-[rgba(34,34,34,0.12)] font-medium">
                  <MapPin className="w-3.5 h-3.5 text-[#145A96]" />
                  4 Campuses Across Chennai & Puducherry
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-[rgba(34,34,34,0.12)] font-medium">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#F28C28]" />
                  100% Certified Safe Dance Floors
                </span>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="rounded-3xl overflow-hidden border border-[rgba(34,34,34,0.12)] shadow-md bg-white">
                <img
                  src={heroStudioImg}
                  alt="RBDC Dance Studio Facility"
                  className="w-full h-[240px] sm:h-[300px] object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Facilities Grid */}
      <section className="py-14 sm:py-20 max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16">
        <div className="mb-10 text-center max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-[rgba(34,34,34,0.12)] text-[11px] font-semibold text-[#222222] uppercase tracking-[0.14em] mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[#F28C28]" />
            <span>Studio Standards</span>
          </div>
          <h2 className="font-display font-bold text-2xl sm:text-4xl text-[#145A96] tracking-tight">
            Engineered For Dancers' Safety & Artistry
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {facilities.map((fac, idx) => {
            const Icon = fac.icon;
            return (
              <div
                key={fac.title}
                className="bg-white rounded-3xl p-7 border border-[rgba(34,34,34,0.12)] shadow-xs flex flex-col justify-between hover:shadow-md transition-shadow"
              >
                <div>
                  <div className={`w-12 h-12 rounded-2xl border flex items-center justify-center mb-5 ${fac.accent}`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-display font-bold text-lg text-[#145A96] mb-2">
                    {fac.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#222222]/75 leading-relaxed">
                    {fac.description}
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-[rgba(34,34,34,0.08)] flex items-center justify-between text-xs text-[#222222]/60">
                  <span>Studio Spec</span>
                  <span className="font-semibold text-[#145A96]">0{idx + 1}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Schedule Tour CTA Card */}
        <div className="mt-12 p-6 sm:p-8 rounded-3xl bg-white border border-[rgba(34,34,34,0.12)] flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="font-display font-bold text-lg text-[#145A96]">
              Book an In-Person Studio Walkthrough
            </h3>
            <p className="text-xs sm:text-sm text-[#222222]/75 mt-1 max-w-xl">
              Virtual 360-degree tours and interactive studio blueprints will be added here soon. In the meantime, visitors are welcome to tour our studios in person.
            </p>
          </div>
          <button
            type="button"
            onClick={() => onNavigate('/contact-us')}
            className="px-5 py-2.5 rounded-full text-xs font-semibold bg-[#145A96] text-white hover:bg-[#145A96]/90 transition-colors shrink-0 shadow-sm cursor-pointer"
          >
            Schedule a Studio Visit
          </button>
        </div>
      </section>
    </div>
  );
};
