import { useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  Sparkles,
  ShieldCheck,
  Volume2,
  Maximize2,
  Wind,
  Layers,
  Camera,
  MapPin,
  Tv,
  MonitorPlay,
  DoorClosed,
  Radio,
  Coffee,
  Activity,
  Flame,
  Lightbulb,
  CheckCircle2,
  Sun,
  Eye,
  Check
} from 'lucide-react';

import court1Img from '../assets/facilities/court-1-clean.png';
import court2Img from '../assets/facilities/court-2-clean.png';
import court3Img from '../assets/facilities/court-3-clean.png';
import studioExterior from '../assets/brochure/studio-exterior.jpg';

export const OurFacilitiesPage = ({ onNavigate }) => {
  const [activeCourtTab, setActiveCourtTab] = useState('court-1');

  const courtsData = [
    {
      id: 'court-1',
      courtNumber: '1',
      badge: 'COURT 01 • JUNIORS & CLASSICAL',
      title: 'Court 1: Creative and Calm Arena',
      focus: 'Kids, Juniors, Classical Dance, and Yoga Facilities',
      tagline: 'A gentle, vibration-isolated haven crafted for foundational rhythm, breath, and posture mastery.',
      image: court1Img,
      accentColor: '#F28C28',
      facilities: [
        {
          title: 'Child-Friendly Setup',
          desc: 'Soft, anti-slip flooring with colorful wall designs crafted specifically for kids and junior learners.',
          icon: Sparkles
        },
        {
          title: 'Full-Length Mirrors',
          desc: 'High-clarity mirror arrays to enhance posture, precision, and coordination for Juniors and classical dance.',
          icon: Maximize2
        },
        {
          title: 'Dedicated Yoga Zone',
          desc: 'Partitioned with serene lighting, natural calming décor, and meditation aids for mindful balance.',
          icon: Sun
        },
        {
          title: 'Classical Training Space',
          desc: 'Atmospheric Indo-inspired aesthetic creating the proper mood and sanctity for classical arts and Bharatham.',
          icon: Layers
        },
        {
          title: 'Air Purification & Smart Cooling',
          desc: 'Centralized HEPA filtration and climate control maintaining a continuously fresh, hygienic environment.',
          icon: Wind
        },
        {
          title: 'CCTV Monitoring',
          desc: 'Real-time video feed for parents to view kids’ sessions comfortably from the executive lounge area.',
          icon: Eye
        }
      ],
      quickTags: ['Ages 4–14+', 'Anti-Slip Safe', 'Serene Lighting', 'Parent Lounge CCTV']
    },
    {
      id: 'court-2',
      courtNumber: '2',
      badge: 'COURT 02 • PRIVATE & DIGITAL',
      title: 'Court 2: Virtual and Personalized Training Hub',
      focus: 'Online Classes and Personal Training (PT)',
      tagline: 'An executive hybrid suite equipped with smart video capture, sound isolation, and dedicated 1-on-1 coaching.',
      image: court2Img,
      accentColor: '#145A96',
      facilities: [
        {
          title: 'Virtual Training Studio',
          desc: 'Equipped with ultra HD cameras, broadcast-grade lighting, and studio microphones for live online sessions.',
          icon: Tv
        },
        {
          title: 'Interactive Smart Screens',
          desc: 'Large wall-mounted displays allowing instructors to demonstrate, review footage, and annotate virtually in real-time.',
          icon: MonitorPlay
        },
        {
          title: 'Adjustable Flooring',
          desc: 'Modular multi-surface flooring adaptable for various PT programs including dance, HIIT, and strength conditioning.',
          icon: Layers
        },
        {
          title: 'Private PT Rooms',
          desc: 'Acoustically enclosed private zones designed for confidential, distraction-free one-on-one coaching.',
          icon: DoorClosed
        },
        {
          title: 'Live Streaming Pods',
          desc: 'Soundproof broadcast cabins ensuring zero ambient echo during global remote masterclasses and workshops.',
          icon: Radio
        },
        {
          title: 'Locker & Refreshment Area',
          desc: 'Dedicated private storage lockers and a premium hydration lounge for PT clients to refresh post-workout.',
          icon: Coffee
        }
      ],
      quickTags: ['1-on-1 Coaching', '4K Broadcast Rig', 'Smart Annotations', 'Private Lockers']
    },
    {
      id: 'court-3',
      courtNumber: '3',
      badge: 'COURT 03 • AERIAL, BUNGEE & ZUMBA',
      title: 'Court 3: High-Energy Studio',
      focus: 'Aerial Yoga, Bungee Workouts, and Zumba',
      tagline: 'A high-ceiling theatrical arena engineered with dynamic lighting and heavy-duty suspension rigging.',
      image: court3Img,
      accentColor: '#F28C28',
      facilities: [
        {
          title: 'Aerial Rigs',
          desc: 'Heavy-duty ceiling mountings installed with adjustable silk hammocks and lyra hoops for aerial yoga mastery.',
          icon: ShieldCheck
        },
        {
          title: 'Bungee Systems',
          desc: 'High-tensile strength anti-gravity cords with adjustable resistance heights for explosive cardio workouts.',
          icon: Activity
        },
        {
          title: 'Zumba-Friendly Flooring',
          desc: 'Multi-tiered shock-absorbent sprung flooring engineered specifically for high-cadence, high-energy movements.',
          icon: Flame
        },
        {
          title: 'Dynamic Lighting',
          desc: 'Programmable RGB ambiance and color-changing LED arrays to set the rhythm and mood for Zumba sessions.',
          icon: Lightbulb
        },
        {
          title: 'Surround Sound System',
          desc: 'Concert-grade acoustic speakers and subwoofers delivering high-energy music to boost adrenaline and enthusiasm.',
          icon: Volume2
        },
        {
          title: 'Safety Features',
          desc: 'High-density cushioned crash mats and dual quick-release safety carabiners for all aerial and bungee activities.',
          icon: CheckCircle2
        }
      ],
      quickTags: ['Aerial Silks & Hoops', 'Bungee Suspension', 'Color RGB Lights', 'Concert Audio']
    }
  ];

  const generalHighlights = [
    {
      icon: Layers,
      title: 'Sprung Wooden Flooring',
      desc: 'Multi-layer engineered shock absorption preventing joint fatigue across all campuses.'
    },
    {
      icon: Volume2,
      title: 'Acoustic Sound Architecture',
      desc: 'Tuned room acoustics and professional monitor arrays for crystalline musical clarity.'
    },
    {
      icon: Maximize2,
      title: 'Full-Span Mirror Walls',
      desc: 'Distortion-free floor-to-ceiling mirror walls for complete 360-degree posture visual feedback.'
    },
    {
      icon: Camera,
      title: 'Cinematic Reel Setup',
      desc: 'Ambient lighting and dedicated capture zones for high-definition portfolio reel shoots.'
    },
    {
      icon: Wind,
      title: 'Climate Controlled Halls',
      desc: 'Centralized air conditioning with constant fresh-air circulation for peak stamina.'
    },
    {
      icon: ShieldCheck,
      title: 'Certified Rigging Points',
      desc: 'Load-tested structural ceiling mounts with safety crash mats permanently on hand.'
    }
  ];

  const scrollToCourt = (courtId) => {
    setActiveCourtTab(courtId);
    const element = document.getElementById(courtId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="min-h-screen w-full overflow-x-hidden min-w-0 bg-[#F8F9FA] text-[#222222] selection:bg-[#145A96]/20 selection:text-[#222222]">
      {/* 1. EDITORIAL HEADER & HERO (Inspired by Reference 4) */}
      <section
        id="facilities-hero"
        className="relative w-full pt-28 xs:pt-32 sm:pt-36 pb-12 sm:pb-20 bg-white border-b border-[rgba(34,34,34,0.08)] overflow-hidden"
        aria-label="Facilities Overview"
      >
        {/* Subtle decorative curves in background */}
        <svg
          className="absolute right-0 top-0 w-96 sm:w-[540px] h-96 sm:h-[540px] text-[#F28C28]/10 pointer-events-none -z-0 translate-x-1/3 -translate-y-1/4"
          viewBox="0 0 400 400"
          fill="none"
        >
          <circle cx="200" cy="200" r="180" stroke="currentColor" strokeWidth="1.5" strokeDasharray="6 6" />
          <circle cx="200" cy="200" r="130" stroke="currentColor" strokeWidth="1" />
        </svg>

        <div className="max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 relative z-10">
          {/* Back Button */}
          <div className="mb-6 sm:mb-8">
            <button
              type="button"
              onClick={() => onNavigate('/')}
              className="inline-flex items-center gap-1.5 sm:gap-2 text-[11px] sm:text-xs font-semibold uppercase tracking-[0.12em] text-[#222222]/70 hover:text-[#145A96] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#145A96] rounded-full px-3.5 py-1.5 bg-[#F1F3F5] border border-[rgba(34,34,34,0.1)] shadow-xs cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Home</span>
            </button>
          </div>

          {/* Top Pill & Main Editorial Statement */}
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F1F3F5] border border-[rgba(34,34,34,0.1)] text-[#145A96] text-[10px] sm:text-xs font-bold uppercase tracking-[0.16em] mb-4">
              <span className="w-2 h-2 rounded-full bg-[#F28C28] shrink-0" />
              <span>Campus Architecture &amp; Studio Design</span>
            </div>

            <h1 className="font-display font-extrabold text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-5xl text-[#145A96] tracking-tight leading-[1.18] sm:leading-[1.15]">
              Purpose-built dance courts engineered for acoustic purity, injury-free movement, and high-energy performance.
            </h1>

            <p className="mt-4 sm:mt-6 text-sm sm:text-base lg:text-lg text-[#222222]/75 leading-relaxed max-w-3xl">
              Every court across our campuses has been architecturally tailored to its dedicated discipline—from serene, child-safe mirrored arenas to high-tensile aerial suspension rigs and virtual streaming hubs.
            </p>
          </div>

          {/* Editorial Stats Counter (Matching Reference 4) */}
          <div className="mt-10 sm:mt-14 pt-8 border-t border-[rgba(34,34,34,0.08)] grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
            <div>
              <span className="font-display font-black text-3xl sm:text-4xl lg:text-5xl text-[#145A96] tracking-tight block">
                3
              </span>
              <span className="text-xs sm:text-sm font-semibold text-[#222222]/75 mt-1 block">
                Specialized Studio Courts
              </span>
            </div>

            <div>
              <span className="font-display font-black text-3xl sm:text-4xl lg:text-5xl text-[#F28C28] tracking-tight block">
                4+
              </span>
              <span className="text-xs sm:text-sm font-semibold text-[#222222]/75 mt-1 block">
                Campuses (Chennai &amp; Pondy)
              </span>
            </div>

            <div>
              <span className="font-display font-black text-3xl sm:text-4xl lg:text-5xl text-[#145A96] tracking-tight block">
                100%
              </span>
              <span className="text-xs sm:text-sm font-semibold text-[#222222]/75 mt-1 block">
                Certified Anti-Slip Sprung Floors
              </span>
            </div>

            <div>
              <span className="font-display font-black text-3xl sm:text-4xl lg:text-5xl text-[#F28C28] tracking-tight block">
                4.9★
              </span>
              <span className="text-xs sm:text-sm font-semibold text-[#222222]/75 mt-1 block">
                Student &amp; Parent Rating
              </span>
            </div>
          </div>

          {/* Quick Court Navigation Pills */}
          <div className="mt-10 flex flex-wrap gap-2.5 sm:gap-3">
            {courtsData.map((c) => (
              <button
                key={c.id}
                type="button"
                onClick={() => scrollToCourt(c.id)}
                className={`px-4 sm:px-5 py-2 rounded-full text-xs sm:text-sm font-bold transition-all cursor-pointer flex items-center gap-2 ${
                  activeCourtTab === c.id
                    ? 'bg-[#145A96] text-white shadow-md'
                    : 'bg-[#F1F3F5] text-[#222222]/80 hover:text-[#145A96] hover:bg-white border border-[rgba(34,34,34,0.08)]'
                }`}
              >
                <span className="w-2 h-2 rounded-full bg-[#F28C28]" />
                <span>Court {c.courtNumber} Overview</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* 2. THE THREE COURT SECTIONS (SPLIT LAYOUT WITH ROUNDED IMAGE & OVERLAPPING ORANGE COURT LABEL) */}
      <div className="w-full">
        {courtsData.map((court, index) => {
          const isEven = index % 2 === 1;
          return (
            <section
              key={court.id}
              id={court.id}
              className={`relative w-full py-16 sm:py-24 border-b border-[rgba(34,34,34,0.08)] overflow-hidden ${
                isEven ? 'bg-white' : 'bg-[#F8F9FA]'
              }`}
              aria-label={court.title}
            >
              {/* Subtle background decorative contours */}
              <svg
                className={`absolute w-80 sm:w-[500px] h-80 sm:h-[500px] text-[#F28C28]/10 pointer-events-none -z-0 ${
                  isEven ? 'left-0 top-1/4 -translate-x-1/2' : 'right-0 top-1/4 translate-x-1/2'
                }`}
                viewBox="0 0 300 300"
                fill="none"
              >
                <path d="M 0,150 Q 150,0 300,150 T 600,150" stroke="currentColor" strokeWidth="1.5" />
                <circle cx="150" cy="150" r="100" stroke="currentColor" strokeWidth="1" strokeDasharray="4 4" />
              </svg>

              <div className="max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 sm:gap-14 lg:gap-16 items-center">
                  {/* Content Column (7 cols on lg) */}
                  <div className={`lg:col-span-7 ${isEven ? 'lg:order-2' : 'lg:order-1'}`}>
                    {/* Court Badge & Category Focus */}
                    <div className="flex flex-wrap items-center gap-2 mb-3">
                      <span className="inline-block px-3 py-1 rounded-full text-[10px] sm:text-xs font-bold uppercase tracking-[0.14em] bg-[#F28C28] text-white shadow-xs">
                        {court.badge}
                      </span>
                    </div>

                    {/* Court Title */}
                    <h2 className="font-display font-extrabold text-2xl xs:text-3xl sm:text-4xl text-[#145A96] tracking-tight leading-[1.15]">
                      {court.title}
                    </h2>

                    {/* Focus Description */}
                    <div className="mt-3 p-3.5 sm:p-4 rounded-2xl bg-white border border-[rgba(34,34,34,0.08)] shadow-2xs">
                      <p className="text-xs sm:text-sm font-bold text-[#F28C28] uppercase tracking-wider">
                        Focus: {court.focus}
                      </p>
                      <p className="text-xs sm:text-sm text-[#222222]/80 mt-1 leading-relaxed">
                        {court.tagline}
                      </p>
                    </div>

                    {/* Neatly Organized Facility Details Grid */}
                    <div className="mt-6 sm:mt-8">
                      <h3 className="text-xs font-extrabold uppercase tracking-[0.18em] text-[#145A96] mb-4 flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#F28C28]" />
                        <span>Dedicated Arena Facilities</span>
                      </h3>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                        {court.facilities.map((fac, fIdx) => {
                          const IconComp = fac.icon;
                          return (
                            <div
                              key={fIdx}
                              className="p-4 rounded-2xl bg-white border border-[rgba(34,34,34,0.08)] shadow-xs hover:border-[#F28C28]/40 hover:shadow-sm transition-all flex items-start gap-3.5"
                            >
                              <div className="w-9 h-9 rounded-xl bg-[#F1F3F5] text-[#145A96] flex items-center justify-center shrink-0 border border-[rgba(34,34,34,0.06)]">
                                <IconComp className="w-4 h-4 text-[#F28C28]" />
                              </div>
                              <div className="min-w-0">
                                <h4 className="font-display font-bold text-xs sm:text-sm text-[#145A96] leading-snug">
                                  {fac.title}
                                </h4>
                                <p className="text-[11px] sm:text-xs text-[#222222]/75 mt-1 leading-relaxed">
                                  {fac.desc}
                                </p>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* Quick Tags & CTA Action */}
                    <div className="mt-8 pt-6 border-t border-[rgba(34,34,34,0.08)] flex flex-wrap items-center justify-between gap-4">
                      <div className="flex flex-wrap gap-2">
                        {court.quickTags.map((tag, tIdx) => (
                          <span
                            key={tIdx}
                            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold text-[#222222]/75 bg-white border border-[rgba(34,34,34,0.08)]"
                          >
                            <Check className="w-3 h-3 text-[#F28C28]" />
                            <span>{tag}</span>
                          </span>
                        ))}
                      </div>

                      <button
                        type="button"
                        onClick={() => onNavigate('/contact-us')}
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider bg-[#145A96] text-white hover:bg-[#104877] shadow-sm hover:shadow-md transition-all cursor-pointer"
                      >
                        <span>Enquire for Court {court.courtNumber}</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  {/* Image Column with Overlapping Orange Circle Court Badge (5 cols on lg) */}
                  <div
                    className={`lg:col-span-5 relative flex items-center justify-center pb-8 sm:pb-10 ${
                      isEven ? 'lg:order-1' : 'lg:order-2'
                    }`}
                  >
                    <div className="relative w-full max-w-[420px] sm:max-w-[460px] mx-auto">
                      {/* Decorative outer glow */}
                      <div className="absolute -inset-4 sm:-inset-6 rounded-[48px] bg-gradient-to-tr from-[#F28C28]/15 via-[#145A96]/10 to-transparent blur-xl pointer-events-none" />

                      {/* Large curved / rounded image container */}
                      <div className="relative w-full aspect-[4/5] sm:aspect-[3/4] rounded-[36px] sm:rounded-[48px] overflow-hidden bg-slate-900 border-2 border-white shadow-xl group">
                        <img
                          src={court.image}
                          alt={court.title}
                          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                        />
                        {/* Soft overlay gradient */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />

                        {/* Top corner subtle badge */}
                        <div className="absolute top-4 right-4 z-10">
                          <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-white/20 backdrop-blur-md text-white border border-white/25">
                            Active Studio Arena
                          </span>
                        </div>
                      </div>

                      {/* BOLD ORANGE CIRCULAR COURT-NUMBER LABEL OVERLAPPING THE BOTTOM EDGE */}
                      <div
                        className="absolute -bottom-6 sm:-bottom-8 left-8 sm:left-10 w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-[#F28C28] text-white shadow-2xl border-4 border-white flex flex-col items-center justify-center z-20 select-none transform hover:scale-105 transition-transform"
                        aria-label={`Court number ${court.courtNumber}`}
                      >
                        <span className="text-[10px] sm:text-xs font-black uppercase tracking-[0.22em] text-white/90">
                          COURT
                        </span>
                        <span className="font-display font-black text-2xl sm:text-3xl text-white leading-none mt-0.5">
                          {court.courtNumber}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          );
        })}
      </div>

      {/* 3. SHARED CAMPUS INFRASTRUCTURE STANDARDS (Preserving General Facility Features) */}
      <section
        id="campus-standards"
        className="py-16 sm:py-24 bg-white border-b border-[rgba(34,34,34,0.08)]"
        aria-label="Universal Campus Infrastructure"
      >
        <div className="max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16">
          <div className="max-w-2xl mb-12 sm:mb-16">
            <span className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.18em] text-[#F28C28] block mb-2">
              Integrated Architectural Standards
            </span>
            <h2 className="font-display font-black text-2xl sm:text-4xl text-[#145A96] tracking-tight">
              Safety, Sound &amp; Flooring Across Every Court
            </h2>
            <p className="mt-3 text-xs sm:text-sm text-[#222222]/75 leading-relaxed">
              Regardless of the campus or court you step into, these six core technical baselines protect dancers, enhance musicality, and guarantee an uncompromising learning environment.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {generalHighlights.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={idx}
                  className="p-6 rounded-3xl bg-[#F8F9FA] border border-[rgba(34,34,34,0.08)] shadow-2xs hover:shadow-md hover:border-[#145A96]/20 transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="w-11 h-11 rounded-2xl bg-white text-[#145A96] border border-[rgba(34,34,34,0.08)] flex items-center justify-center mb-4 shadow-2xs">
                      <Icon className="w-5 h-5 text-[#F28C28]" />
                    </div>
                    <h3 className="font-display font-bold text-base text-[#145A96] mb-2">
                      {item.title}
                    </h3>
                    <p className="text-xs text-[#222222]/75 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. STUDIO VISIT CALL TO ACTION */}
      <section
        id="book-tour"
        className="py-16 sm:py-20 bg-[#F8F9FA]"
        aria-label="Studio Tour Consultation"
      >
        <div className="max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16">
          <div className="relative rounded-[36px] sm:rounded-[48px] overflow-hidden bg-gradient-to-br from-[#145A96] via-[#104877] to-[#0a2e4d] text-white p-8 sm:p-12 lg:p-16 shadow-xl">
            {/* Background Studio Photo Accent */}
            <div className="absolute right-0 top-0 bottom-0 w-1/2 opacity-15 pointer-events-none hidden md:block">
              <img
                src={studioExterior}
                alt="Dance Court Exterior"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="relative z-10 max-w-2xl">
              <span className="px-3 py-1 rounded-full text-[10px] sm:text-xs font-bold uppercase tracking-wider bg-white/15 backdrop-blur-md text-white border border-white/20 inline-block mb-4">
                Walkthroughs &amp; Free Trial Sessions
              </span>
              <h2 className="font-display font-black text-2xl xs:text-3xl sm:text-4xl lg:text-5xl tracking-tight leading-tight">
                Experience the Dance Courts in Person.
              </h2>
              <p className="mt-4 text-xs sm:text-sm lg:text-base text-white/80 leading-relaxed">
                Tour Court 1, Court 2, and Court 3 with our senior faculty. Schedule a guided campus visit, review batch timings, and test the sprung flooring before enrollment.
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-4">
                <button
                  type="button"
                  onClick={() => onNavigate('/contact-us')}
                  className="px-6 py-3 rounded-full text-xs sm:text-sm font-bold uppercase tracking-wider bg-[#F28C28] text-white hover:bg-[#d97718] transition-all shadow-md hover:shadow-lg cursor-pointer"
                >
                  Schedule Studio Walkthrough
                </button>
                <button
                  type="button"
                  onClick={() => onNavigate('/courses')}
                  className="px-6 py-3 rounded-full text-xs sm:text-sm font-bold uppercase tracking-wider bg-white/10 hover:bg-white/20 text-white border border-white/20 transition-all cursor-pointer"
                >
                  Explore Course Batches
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
