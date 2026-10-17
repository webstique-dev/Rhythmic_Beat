import {
  ArrowLeft,
  Award,
  Home,
  BarChart2,
  BookOpen,
  Star,
  Sparkles,
  MapPin,
  Heart,
  Video,
  Users,
  ArrowUpRight,
} from 'lucide-react';
import rbdcFacadeImg from '../assets/rbdc-facade.png';
import storyHeroImg from '../assets/Our-Story-2.jpg';
import storyGroupImg from '../assets/Our-Story-1.jpg';
import courseBungeeImg from '../assets/disciplines/course-bungee-workout.jpg';
import courseBharathamImg from '../assets/brochure/course-bharatham.jpg';
import choreoWorkshopPoster from '../assets/choreography-workshop-poster.jpg';
import studioExteriorImg from '../assets/brochure/studio-exterior.jpg';
import franchise1Img from '../assets/Franchise-1.jpg';
import posterSemiclassical from '../assets/poster-semiclassical.webp';
import aboutHeroStreetFreeze from '../assets/about-hero-street-freeze.jpg';
import aboutHeroStageNeon from '../assets/about-hero-stage-neon.jpg';
import academyShowcaseImg from '../assets/brochure/academy-showcase.jpg';
import AccordionGallery from './AccordionGallery';

export const AboutUsPage = ({ onNavigate }) => {
  const milestones = [
    {
      id: 'founded-2003',
      category: 'THE BEGINNING',
      title: 'FOUNDED IN 2003',
      description: 'Master Yuvi starts Rhythmic Beat at Rock City.',
      icon: Sparkles,
      isPrimary: true,
      side: 'right',
    },
    {
      id: 'courts-chennai',
      category: 'GROWING',
      title: 'COURTS ACROSS CHENNAI',
      description: 'Valasaravakkam, Kolapakkam and Ambattur.',
      icon: MapPin,
      isPrimary: false,
      side: 'left',
    },
    {
      id: 'bharatanatyam',
      category: 'TRADITION',
      title: 'BHARATANATYAM CLASSES',
      description: 'A dedicated classical court for cultural enrichment.',
      icon: BookOpen,
      isPrimary: false,
      side: 'right',
    },
    {
      id: 'new-fitness',
      category: 'INNOVATION',
      title: 'NEW FITNESS FORMATS',
      description: 'Bungee workouts, aerial yoga, Kalaripayattu and gymnastics.',
      icon: Heart,
      isPrimary: false,
      side: 'left',
    },
    {
      id: 'social-presence',
      category: 'VISIBILITY',
      title: 'CREATIVE SOCIAL PRESENCE',
      description: 'Choreography videos that amplified the brand.',
      icon: Video,
      isPrimary: false,
      side: 'right',
    },
    {
      id: 'online-sessions',
      category: 'REACH',
      title: 'ONLINE SESSIONS',
      description: 'Live, structured classes streamed into students’ homes.',
      icon: Users,
      isPrimary: false,
      side: 'left',
    },
    {
      id: 'sop-training',
      category: 'QUALITY',
      title: 'SOP-BASED TRAINING',
      description: 'Periodic, step-by-step instructor training.',
      icon: Award,
      isPrimary: false,
      side: 'right',
    },
    {
      id: 'pro-batches',
      category: 'TODAY',
      title: 'FIRST PRO BATCHES',
      description: 'Little Legends, Alpha Squad and NextGen Rebels.',
      icon: Star,
      isPrimary: false,
      side: 'left',
    },
    {
      id: 'three-courts',
      category: 'NEXT',
      title: 'THREE MORE COURTS',
      description: 'New Rhythmic Beat courts are on the way.',
      icon: ArrowUpRight,
      isPrimary: false,
      isNext: true,
      side: 'right',
    },
  ];

  const rbStandards = [
    {
      icon: Award,
      title: 'Professional trainers',
      description: 'Certified instructors, supervised before every batch.',
      isHighlighted: false,
    },
    {
      icon: Home,
      title: 'Sophisticated ambiance',
      description: 'Wooden floors, full AC, 5.1 surround sound, 24/7 CCTV.',
      isHighlighted: false,
    },
    {
      icon: BarChart2,
      title: 'Progress you can see',
      description: 'Attendance and skill growth tracked, with regular feedback.',
      isHighlighted: true,
    },
    {
      icon: BookOpen,
      title: 'Fun curriculum',
      description: 'A structured 2-month curriculum with professional training.',
      isHighlighted: false,
    },
    {
      icon: Star,
      title: 'Celebrity workshops',
      description: 'Periodic workshops by leading choreographers.',
      isHighlighted: false,
    },
  ];

  const rbStandardAccordionItems = [
    {
      image: storyHeroImg,
      label: 'Professional trainers',
      description: 'Certified instructors, supervised before every batch.',
      icon: Award,
      link: '#',
      alt: 'Professional trainers at Rhythmic Beat'
    },
    {
      image: franchise1Img,
      label: 'Sophisticated ambiance',
      description: 'Wooden floors, full AC, 5.1 surround sound, 24/7 CCTV.',
      icon: Home,
      link: '#',
      alt: 'Sophisticated dance studio ambiance'
    },
    {
      image: storyGroupImg,
      label: 'Progress you can see',
      description: 'Attendance and skill growth tracked, with regular feedback.',
      icon: BarChart2,
      link: '#',
      alt: 'Student dance progress tracking'
    },
    {
      image: aboutHeroStreetFreeze,
      label: 'Fun curriculum',
      description: 'A structured 2-month curriculum with professional training.',
      icon: BookOpen,
      link: '#',
      alt: 'Structured dance curriculum'
    },
    {
      image: academyShowcaseImg,
      label: 'Celebrity workshops',
      description: 'Periodic workshops by leading cinema choreographers.',
      icon: Star,
      link: '#',
      alt: 'Celebrity masterclasses and workshops'
    }
  ];

  return (
    <div className="min-h-screen w-full overflow-x-hidden min-w-0 bg-[#F1F3F5] text-[#222222] selection:bg-[#145A96]/20 selection:text-[#222222]">
      {/* ========================================================
          FULL-WIDTH HERO SECTION: RHYTHMIC BEAT (Brand Editorial UI)
          ======================================================== */}
      <section
        id="about-hero-section"
        aria-label="About Rhythmic Beat Dance Court"
        className="relative w-full bg-gradient-to-br from-[#07192D] via-[#0E355B] to-[#145A96] text-white overflow-hidden shadow-xl border-b border-[#145A96]/30"
      >
        {/* Ambient Brand Glows */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#F28C28]/12 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-10 w-96 h-96 bg-[#145A96]/40 rounded-full blur-3xl pointer-events-none" />

        {/* Integrated Top Navigation Bar directly inside the Hero Fold */}
        <div className="w-full max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-14 pt-24 sm:pt-28 pb-3 sm:pb-4 flex items-center justify-between z-30 relative">
          <button
            type="button"
            onClick={() => onNavigate('/')}
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-white/90 hover:text-white transition-all bg-white/10 hover:bg-white/20 backdrop-blur-md px-4 py-2 rounded-full border border-white/20 shadow-sm cursor-pointer hover:translate-x-[-2px]"
          >
            <ArrowLeft className="w-3.5 h-3.5 text-[#F28C28]" />
            <span>Back to Home</span>
          </button>

          {/* Breadcrumbs & Badge */}
          <div className="flex items-center gap-2.5 text-xs font-semibold text-white/80 bg-black/30 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/10">
            <span className="hover:text-white cursor-pointer transition-colors" onClick={() => onNavigate('/')}>
              Home
            </span>
            <span className="text-[#F28C28] font-bold">/</span>
            <span className="text-white font-bold">About Us</span>
            <span className="hidden sm:inline-block mx-1 w-1 h-1 rounded-full bg-white/30" />
            <span className="hidden sm:inline-block text-[#F28C28] font-extrabold uppercase text-[10.5px] tracking-wider">
              EST. 2003 • CHENNAI
            </span>
          </div>
        </div>

        <div className="w-full grid grid-cols-1 lg:grid-cols-12 relative min-h-[580px] lg:min-h-[660px] xl:min-h-[720px]">
          {/* Left Column: Brand Badges, Tagline, Story, Giant Brand Title */}
          <div className="lg:col-span-6 xl:col-span-5 px-6 sm:px-10 lg:pl-12 lg:pr-6 xl:pl-20 xl:pr-8 pt-4 sm:pt-6 pb-10 sm:pb-14 lg:pb-16 flex flex-col justify-between z-20 relative">
            {/* Top Details */}
            <div>
              {/* Brand Tag with orange indicator line */}
              <div className="flex items-center gap-2.5 mb-5 sm:mb-6" aria-hidden="true">
                <span className="w-6 h-0.5 bg-[#F28C28] rounded-full inline-block" />
                <span className="text-xs sm:text-sm font-extrabold tracking-[0.2em] uppercase text-[#F28C28]">
                  EST. 2003 • CHENNAI
                </span>
              </div>

              {/* Editorial Quote */}
              <p className="font-sans italic text-base sm:text-lg lg:text-[1.3rem] text-white/95 leading-snug max-w-md mb-2 font-light tracking-wide">
                Where passion meets movement <br className="hidden sm:inline" />— and every step tells your story.
              </p>

              {/* Signature Cursive Accent */}
              <p className="font-['Caveat',cursive] text-2xl sm:text-3xl text-[#F28C28] mb-5 sm:mb-6 select-none">
                Let ur body speak ~
              </p>

              {/* Paragraph Blocks: Rhythmic Beat Dance Court Details */}
              <div className="space-y-3.5 text-xs sm:text-sm text-neutral-200 font-normal leading-relaxed max-w-md">
                <p>
                  Discover the joy of dance, fitness, and authentic cultural expression at Rhythmic Beat Dance Court — the home of Yuvraaj’s Dance School.
                </p>
                <p>
                  Founded in 2003 at Rock City, we provide professional training across Western Dance, Bharatanatyam, Aerial Yoga, Bungee Workout, Kalaripayattu, Gymnastics, and Zumba for all ages and experience levels across Chennai.
                </p>
              </div>
            </div>

            {/* Giant Brand Headline extending across the seam */}
            <div className="mt-10 sm:mt-14 lg:mt-auto pt-6 select-none relative z-20 w-max">
              <h1 className="font-display font-black tracking-tighter uppercase text-6xl sm:text-7xl md:text-8xl lg:text-[6.8rem] xl:text-[8.5rem] leading-[0.88]">
                <span className="!text-white block drop-shadow-md">RHYTHMIC</span>
                <span className="!text-[#F28C28] block mt-1 sm:mt-1.5 drop-shadow-md">BEAT.</span>
              </h1>
            </div>
          </div>

          {/* Center-Top Floating Tilted Card (RBDC Academy Showcase on Stage) */}
          <div className="hidden sm:block absolute top-12 sm:top-14 lg:top-16 left-[50%] lg:left-[45%] -translate-x-1/2 -rotate-8 z-30 w-36 sm:w-44 lg:w-52 xl:w-60 aspect-square rounded-2xl overflow-hidden shadow-2xl border-2 border-white/25 hover:rotate-0 transition-transform duration-500 group pointer-events-auto bg-[#07192D]">
            <img
              src={academyShowcaseImg}
              alt="Rhythmic Beat Dance Court Summer Fest Stage Showcase"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
            <span className="absolute bottom-2.5 left-2.5 text-[10px] font-bold text-white tracking-wider uppercase px-2 py-0.5 rounded-xs bg-black/70 backdrop-blur-xs">
              Summer Fest Stage
            </span>
          </div>

          {/* Right Column: Full-Width Authentic Dance Hero Photography */}
          <div className="lg:col-span-6 xl:col-span-7 relative overflow-hidden flex items-stretch min-h-[420px] sm:min-h-[520px] lg:min-h-full">
            <div className="relative w-full h-full min-h-[440px] sm:min-h-[540px] lg:min-h-[660px] xl:min-h-[720px]">
              <img
                src={storyHeroImg}
                alt="Guru Yuvraaj Jayakumar in dance posture at Adiyogi"
                className="w-full h-full object-cover object-[center_35%]"
              />
              {/* Gradient Overlays */}
              <div className="absolute inset-0 bg-gradient-to-r from-[#07192D]/70 via-transparent to-transparent hidden lg:block" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#07192D]/85 via-transparent to-transparent lg:hidden" />

              {/* Floating Dancer Badge */}
              <div className="absolute top-6 right-6 hidden md:flex items-center gap-2 bg-[#07192D]/80 backdrop-blur-md px-4 py-2 rounded-full border border-white/15 shadow-lg text-white">
                <Sparkles className="w-4 h-4 text-[#F28C28]" />
                <span className="text-xs font-bold tracking-wide">Guru Yuvraaj Jayakumar • Founder</span>
              </div>

              {/* Floating Orange Circular CTA Button */}
              <button
                type="button"
                onClick={() => onNavigate('/courses')}
                className="absolute bottom-6 right-6 sm:bottom-8 sm:right-8 lg:bottom-12 lg:right-12 z-20 w-32 h-32 sm:w-36 sm:h-36 md:w-42 md:h-42 lg:w-48 lg:h-48 rounded-full bg-[#F28C28] hover:bg-[#E07A18] text-[#111111] flex flex-col items-center justify-center p-3 sm:p-4 shadow-2xl hover:scale-105 active:scale-95 transition-all duration-300 group cursor-pointer border-4 border-[#07192D]"
                aria-label="Explore courses"
              >
                <ArrowUpRight className="w-6 h-6 sm:w-7 sm:h-7 mb-1 text-[#111111] stroke-[2.5] group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                <span className="font-display font-black tracking-wider text-[11px] sm:text-xs lg:text-sm uppercase text-center text-[#111111] px-2 whitespace-nowrap">
                  EXPLORE COURSES
                </span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          SECTION 3: MILESTONES — HOW WE'VE GROWN (SERPENTINE ROADMAP)
          ======================================================== */}
      <section
        id="milestones-section"
        aria-label="Milestones Roadmap"
        className="w-full relative overflow-hidden bg-[#F8FAFC] pt-12 sm:pt-16 lg:pt-20 pb-12 sm:pb-16 lg:pb-20 border-b border-neutral-200/80"
      >
        {/* Subtle Canvas Grain / Ambient Light */}
        <div className="absolute inset-0 bg-[radial-gradient(#145A96_1px,transparent_1px)] [background-size:28px_28px] opacity-[0.035] pointer-events-none" />
        <div className="absolute top-1/4 -left-40 w-[500px] h-[500px] bg-[#145A96]/5 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute bottom-1/4 -right-40 w-[500px] h-[500px] bg-[#F28C28]/6 rounded-full blur-[140px] pointer-events-none" />

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto px-4 mb-10 sm:mb-14 relative z-10">
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="w-5 h-0.5 bg-[#F28C28] rounded-full inline-block" />
            <span className="text-xs sm:text-sm font-extrabold tracking-widest text-[#F28C28] uppercase">
              MILESTONES
            </span>
            <span className="w-5 h-0.5 bg-[#F28C28] rounded-full inline-block" />
          </div>

          <h2 className="font-display font-black text-3xl sm:text-5xl lg:text-6xl tracking-tight uppercase leading-[1.1]">
            <span className="text-[#145A96]">HOW WE'VE </span>
            <span className="text-[#F28C28]">GROWN</span>
          </h2>

          <p className="mt-4 text-sm sm:text-base lg:text-lg text-neutral-600 leading-relaxed font-normal max-w-2xl mx-auto">
            From one studio in Rock City to a multi-court academy with its own systems, crews and online classes.
          </p>
        </div>

        {/* ============================================================
            DESKTOP SERPENTINE ROADMAP (9 MILESTONES — lg & md screens)
            ============================================================ */}
        <div className="hidden md:block relative max-w-5xl mx-auto px-6 lg:px-8">
          {/* Continuous Serpentine S-Curve Path connecting all 9 Milestones */}
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none z-0"
            viewBox="0 0 1000 3240"
            preserveAspectRatio="none"
            fill="none"
          >
            <defs>
              <marker
                id="roadmap-arrow"
                viewBox="0 0 12 12"
                refX="8"
                refY="6"
                markerWidth="8"
                markerHeight="8"
                orient="auto"
              >
                <path d="M 1 2 L 11 6 L 1 10 L 3.5 6 Z" fill="#145A96" />
              </marker>
            </defs>

            {/* Subtle path shadow */}
            <path
              d="M 280, 40
                 L 280, 170
                 C 280 320, 720 360, 720 510
                 C 720 660, 280 700, 280 850
                 C 280 1000, 720 1040, 720 1190
                 C 720 1340, 280 1380, 280 1530
                 C 280 1680, 720 1720, 720 1870
                 C 720 2020, 280 2060, 280 2210
                 C 280 2360, 720 2400, 720 2550
                 C 720 2700, 280 2740, 280 2890
                 C 280 3020, 500 3060, 500 3150"
              stroke="#145A96"
              strokeWidth="11"
              strokeLinecap="round"
              strokeLinejoin="round"
              opacity="0.12"
            />

            {/* Main Winding Blue Spline */}
            <path
              d="M 280, 40
                 L 280, 170
                 C 280 320, 720 360, 720 510
                 C 720 660, 280 700, 280 850
                 C 280 1000, 720 1040, 720 1190
                 C 720 1340, 280 1380, 280 1530
                 C 280 1680, 720 1720, 720 1870
                 C 720 2020, 280 2060, 280 2210
                 C 280 2360, 720 2400, 720 2550
                 C 720 2700, 280 2740, 280 2890
                 C 280 3020, 500 3060, 500 3150"
              stroke="#145A96"
              strokeWidth="5.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>

          {/* 9 Alternating Rows */}
          <div className="space-y-12 lg:space-y-16">
            {/* ROW 1: THE BEGINNING / FOUNDED IN 2003 */}
            <div className="relative z-10 grid grid-cols-12 items-center min-h-[300px]">
              {/* Left Slot: Circular Node */}
              <div className="col-span-5 flex justify-end pr-8 lg:pr-14">
                <div className="relative group">
                  <div className="absolute -top-7 -left-7 w-32 h-32 pointer-events-none -z-0">
                    <svg viewBox="0 0 100 100" className="w-full h-full fill-[#FBBF24]">
                      <polygon points="50,4 64,34 96,24 74,54 92,88 50,66 8,88 26,54 4,24 36,34" fill="#FBBF24" />
                    </svg>
                  </div>
                  <svg viewBox="0 0 24 24" className="absolute -bottom-2 -right-2 w-7 h-7 fill-[#F28C28] z-20" aria-hidden="true">
                    <path d="M12 0 L14.8 9.2 L24 12 L14.8 14.8 L12 24 L9.2 14.8 L0 12 L9.2 9.2 Z" />
                  </svg>
                  <div className="w-36 h-36 lg:w-40 lg:h-40 rounded-full overflow-hidden border-[6px] border-white shadow-2xl relative z-10 bg-white">
                    <img src={storyHeroImg} alt="Master Yuvi - Founder" className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105" />
                  </div>
                  <svg viewBox="0 0 200 200" className="absolute inset-0 w-full h-full pointer-events-none z-20">
                    <path id="path-badge-0" d="M 22, 142 A 86,86 0 0,0 178, 142" fill="none" />
                    <text fill="#145A96" fontSize="10.5" fontWeight="900" letterSpacing="0.2em">
                      <textPath href="#path-badge-0" startOffset="50%" textAnchor="middle">• THE BEGINNING •</textPath>
                    </text>
                  </svg>
                </div>
              </div>
              {/* Right Slot: Card (Signature Primary Blue) */}
              <div className="col-span-7 pl-6 lg:pl-10">
                <div className="rounded-2xl sm:rounded-3xl p-6 sm:p-7 bg-[#145A96] text-white border border-[#145A96] shadow-xl max-w-md">
                  <span className="text-xs font-black uppercase tracking-widest text-[#F28C28] block mb-1">THE BEGINNING</span>
                  <h3 className="font-display font-black text-xl sm:text-2xl uppercase leading-tight !text-white">FOUNDED IN 2003</h3>
                  <p className="mt-2 text-sm text-white/95 leading-relaxed font-medium">Master Yuvi starts Rhythmic Beat at Rock City.</p>
                </div>
              </div>
            </div>

            {/* ROW 2: GROWING / COURTS ACROSS CHENNAI */}
            <div className="relative z-10 grid grid-cols-12 items-center min-h-[300px]">
              {/* Left Slot: Card */}
              <div className="col-span-7 pr-6 lg:pr-10 text-right">
                <div className="rounded-2xl sm:rounded-3xl p-6 sm:p-7 bg-white border border-[rgba(34,34,34,0.12)] shadow-sm hover:shadow-md transition-all max-w-md ml-auto text-left">
                  <span className="text-xs font-black uppercase tracking-widest text-[#F28C28] block mb-1">GROWING</span>
                  <h3 className="font-display font-black text-xl sm:text-2xl uppercase leading-tight text-[#145A96]">COURTS ACROSS CHENNAI</h3>
                  <p className="mt-2 text-sm text-[#222222]/85 leading-relaxed font-normal">Valasaravakkam, Kolapakkam and Ambattur.</p>
                </div>
              </div>
              {/* Right Slot: Circular Node */}
              <div className="col-span-5 pl-8 lg:pl-14 flex justify-start">
                <div className="relative group">
                  <div className="absolute -top-6 -left-6 w-36 h-36 pointer-events-none -z-0">
                    <svg viewBox="0 0 100 100" className="w-full h-full">
                      <g transform="translate(50,50)">
                        <path d="M 0,-10 C -15,-40 -35,-35 -35,-15 C -35,5 -10,0 0,0 Z" fill="#10B981" />
                        <path d="M 10,0 C 40,-15 35,-35 15,-35 C -5,-35 0,-10 0,0 Z" fill="#059669" />
                        <path d="M 0,10 C 15,40 35,35 35,15 C 35,-5 10,0 0,0 Z" fill="#10B981" />
                        <path d="M -10,0 C -40,15 -35,35 -15,35 C 5,35 0,10 0,0 Z" fill="#059669" />
                      </g>
                    </svg>
                  </div>
                  <svg viewBox="0 0 24 24" className="absolute top-2 left-4 w-6 h-6 fill-[#07192D] z-20" aria-hidden="true">
                    <path d="M12 0 L14.8 9.2 L24 12 L14.8 14.8 L12 24 L9.2 14.8 L0 12 L9.2 9.2 Z" />
                  </svg>
                  <div className="w-36 h-36 lg:w-40 lg:h-40 rounded-full overflow-hidden border-[6px] border-white shadow-2xl relative z-10 bg-white">
                    <img src={studioExteriorImg} alt="RBDC Studios Facade" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                  </div>
                  <svg viewBox="0 0 200 200" className="absolute inset-0 w-full h-full pointer-events-none z-20">
                    <path id="path-badge-1" d="M 68, 174 A 88,88 0 0,0 188, 78" fill="none" />
                    <text fill="#145A96" fontSize="10" fontWeight="900" letterSpacing="0.22em">
                      <textPath href="#path-badge-1">• CHENNAI COURTS •</textPath>
                    </text>
                  </svg>
                </div>
              </div>
            </div>

            {/* ROW 3: TRADITION / BHARATANATYAM CLASSES */}
            <div className="relative z-10 grid grid-cols-12 items-center min-h-[300px]">
              {/* Left Slot: Circular Node */}
              <div className="col-span-5 flex justify-end pr-8 lg:pr-14">
                <div className="relative group">
                  <div className="absolute -inset-10 pointer-events-none -z-0 flex items-center justify-center">
                    <svg viewBox="0 0 200 200" className="w-full h-full">
                      <g transform="translate(100, 100)">
                        {Array.from({ length: 24 }).map((_, i) => (
                          <line key={i} x1="0" y1="-64" x2="0" y2="-94" stroke="#F28C28" strokeWidth="3.5" strokeLinecap="round" transform={`rotate(${i * 15})`} />
                        ))}
                      </g>
                    </svg>
                  </div>
                  <svg viewBox="0 0 24 24" className="absolute -top-3 -left-3 w-7 h-7 fill-[#84CC16] z-20" aria-hidden="true">
                    <path d="M12 0 L14.8 9.2 L24 12 L14.8 14.8 L12 24 L9.2 14.8 L0 12 L9.2 9.2 Z" />
                  </svg>
                  <div className="w-36 h-36 lg:w-40 lg:h-40 rounded-full overflow-hidden border-[6px] border-white shadow-2xl relative z-10 bg-white">
                    <img src={courseBharathamImg} alt="Bharatanatyam Classes" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                  </div>
                  <svg viewBox="0 0 200 200" className="absolute inset-0 w-full h-full pointer-events-none z-20">
                    <path id="path-badge-2" d="M 12, 78 A 88,88 0 0,0 132, 174" fill="none" />
                    <text fill="#145A96" fontSize="11" fontWeight="900" letterSpacing="0.2em">
                      <textPath href="#path-badge-2">• TRADITION •</textPath>
                    </text>
                  </svg>
                </div>
              </div>
              {/* Right Slot: Card */}
              <div className="col-span-7 pl-6 lg:pl-10">
                <div className="rounded-2xl sm:rounded-3xl p-6 sm:p-7 bg-white border border-[rgba(34,34,34,0.12)] shadow-sm hover:shadow-md transition-all max-w-md">
                  <span className="text-xs font-black uppercase tracking-widest text-[#F28C28] block mb-1">TRADITION</span>
                  <h3 className="font-display font-black text-xl sm:text-2xl uppercase leading-tight text-[#145A96]">BHARATANATYAM CLASSES</h3>
                  <p className="mt-2 text-sm text-[#222222]/85 leading-relaxed font-normal">A dedicated classical court for cultural enrichment.</p>
                </div>
              </div>
            </div>

            {/* ROW 4: INNOVATION / NEW FITNESS FORMATS */}
            <div className="relative z-10 grid grid-cols-12 items-center min-h-[300px]">
              {/* Left Slot: Card */}
              <div className="col-span-7 pr-6 lg:pr-10 text-right">
                <div className="rounded-2xl sm:rounded-3xl p-6 sm:p-7 bg-white border border-[rgba(34,34,34,0.12)] shadow-sm hover:shadow-md transition-all max-w-md ml-auto text-left">
                  <span className="text-xs font-black uppercase tracking-widest text-[#F28C28] block mb-1">INNOVATION</span>
                  <h3 className="font-display font-black text-xl sm:text-2xl uppercase leading-tight text-[#145A96]">NEW FITNESS FORMATS</h3>
                  <p className="mt-2 text-sm text-[#222222]/85 leading-relaxed font-normal">Bungee workouts, aerial yoga, Kalaripayattu and gymnastics.</p>
                </div>
              </div>
              {/* Right Slot: Circular Node */}
              <div className="col-span-5 pl-8 lg:pl-14 flex justify-start">
                <div className="relative group">
                  <div className="absolute -top-8 -right-8 w-36 h-36 pointer-events-none -z-0">
                    <svg viewBox="0 0 100 100" className="w-full h-full">
                      <g transform="translate(50,50)">
                        <path d="M 20,-30 A 45,45 0 0,1 45,-5 L 20,0 Z" fill="#84CC16" opacity="0.85" />
                        <path d="M 35,15 A 45,45 0 0,1 45,35 L 15,15 Z" fill="#84CC16" opacity="0.85" />
                        <path d="M 15,35 A 45,45 0 0,1 -5,45 L 0,15 Z" fill="#84CC16" opacity="0.85" />
                        <polygon points="0,-40 10,-14 38,-18 18,-2 34,24 8,14 0,40 -8,14 -34,24 -18,-2 -38,-18 -10,-14" fill="#145A96" />
                      </g>
                    </svg>
                  </div>
                  <div className="w-36 h-36 lg:w-40 lg:h-40 rounded-full overflow-hidden border-[6px] border-white shadow-2xl relative z-10 bg-white">
                    <img src={courseBungeeImg} alt="New Fitness Formats" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                  </div>
                  <svg viewBox="0 0 200 200" className="absolute inset-0 w-full h-full pointer-events-none z-20">
                    <path id="path-badge-3" d="M 68, 174 A 88,88 0 0,0 188, 78" fill="none" />
                    <text fill="#145A96" fontSize="10.5" fontWeight="900" letterSpacing="0.22em">
                      <textPath href="#path-badge-3">• NEW FITNESS •</textPath>
                    </text>
                  </svg>
                </div>
              </div>
            </div>

            {/* ROW 5: VISIBILITY / CREATIVE SOCIAL PRESENCE */}
            <div className="relative z-10 grid grid-cols-12 items-center min-h-[300px]">
              {/* Left Slot: Circular Node */}
              <div className="col-span-5 flex justify-end pr-8 lg:pr-14">
                <div className="relative group">
                  <div className="absolute -inset-10 pointer-events-none -z-0 flex items-center justify-center">
                    <svg viewBox="0 0 200 200" className="w-full h-full">
                      <g transform="translate(100, 100)">
                        {Array.from({ length: 24 }).map((_, i) => (
                          <line key={i} x1="0" y1="-64" x2="0" y2="-94" stroke="#0284C7" strokeWidth="3.5" strokeLinecap="round" transform={`rotate(${i * 15})`} />
                        ))}
                      </g>
                    </svg>
                  </div>
                  <svg viewBox="0 0 24 24" className="absolute -top-2 -left-2 w-7 h-7 fill-[#F59E0B] z-20" aria-hidden="true">
                    <path d="M12 0 L14.8 9.2 L24 12 L14.8 14.8 L12 24 L9.2 14.8 L0 12 L9.2 9.2 Z" />
                  </svg>
                  <div className="w-36 h-36 lg:w-40 lg:h-40 rounded-full overflow-hidden border-[6px] border-white shadow-2xl relative z-10 bg-white">
                    <img src={aboutHeroStreetFreeze} alt="Creative Social Presence" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                  </div>
                  <svg viewBox="0 0 200 200" className="absolute inset-0 w-full h-full pointer-events-none z-20">
                    <path id="path-badge-4" d="M 12, 78 A 88,88 0 0,0 132, 174" fill="none" />
                    <text fill="#145A96" fontSize="11" fontWeight="900" letterSpacing="0.2em">
                      <textPath href="#path-badge-4">• VISIBILITY •</textPath>
                    </text>
                  </svg>
                </div>
              </div>
              {/* Right Slot: Card */}
              <div className="col-span-7 pl-6 lg:pl-10">
                <div className="rounded-2xl sm:rounded-3xl p-6 sm:p-7 bg-white border border-[rgba(34,34,34,0.12)] shadow-sm hover:shadow-md transition-all max-w-md">
                  <span className="text-xs font-black uppercase tracking-widest text-[#F28C28] block mb-1">VISIBILITY</span>
                  <h3 className="font-display font-black text-xl sm:text-2xl uppercase leading-tight text-[#145A96]">CREATIVE SOCIAL PRESENCE</h3>
                  <p className="mt-2 text-sm text-[#222222]/85 leading-relaxed font-normal">Choreography videos that amplified the brand.</p>
                </div>
              </div>
            </div>

            {/* ROW 6: REACH / ONLINE SESSIONS */}
            <div className="relative z-10 grid grid-cols-12 items-center min-h-[300px]">
              {/* Left Slot: Card */}
              <div className="col-span-7 pr-6 lg:pr-10 text-right">
                <div className="rounded-2xl sm:rounded-3xl p-6 sm:p-7 bg-white border border-[rgba(34,34,34,0.12)] shadow-sm hover:shadow-md transition-all max-w-md ml-auto text-left">
                  <span className="text-xs font-black uppercase tracking-widest text-[#F28C28] block mb-1">REACH</span>
                  <h3 className="font-display font-black text-xl sm:text-2xl uppercase leading-tight text-[#145A96]">ONLINE SESSIONS</h3>
                  <p className="mt-2 text-sm text-[#222222]/85 leading-relaxed font-normal">Live, structured classes streamed into students’ homes.</p>
                </div>
              </div>
              {/* Right Slot: Circular Node */}
              <div className="col-span-5 pl-8 lg:pl-14 flex justify-start">
                <div className="relative group">
                  <div className="absolute -top-6 -right-6 w-36 h-36 pointer-events-none -z-0">
                    <svg viewBox="0 0 100 100" className="w-full h-full">
                      <g transform="translate(50,50)">
                        {Array.from({ length: 8 }).map((_, i) => (
                          <ellipse key={i} cx="0" cy="-34" rx="8" ry="18" fill="#F59E0B" opacity="0.8" transform={`rotate(${i * 45})`} />
                        ))}
                      </g>
                    </svg>
                  </div>
                  <svg viewBox="0 0 24 24" className="absolute -bottom-2 -left-2 w-6 h-6 fill-[#10B981] z-20" aria-hidden="true">
                    <path d="M12 0 L14.8 9.2 L24 12 L14.8 14.8 L12 24 L9.2 14.8 L0 12 L9.2 9.2 Z" />
                  </svg>
                  <div className="w-36 h-36 lg:w-40 lg:h-40 rounded-full overflow-hidden border-[6px] border-white shadow-2xl relative z-10 bg-white">
                    <img src={posterSemiclassical} alt="Online Sessions" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                  </div>
                  <svg viewBox="0 0 200 200" className="absolute inset-0 w-full h-full pointer-events-none z-20">
                    <path id="path-badge-5" d="M 68, 174 A 88,88 0 0,0 188, 78" fill="none" />
                    <text fill="#145A96" fontSize="10" fontWeight="900" letterSpacing="0.22em">
                      <textPath href="#path-badge-5">• ONLINE CLASSES •</textPath>
                    </text>
                  </svg>
                </div>
              </div>
            </div>

            {/* ROW 7: QUALITY / SOP-BASED TRAINING */}
            <div className="relative z-10 grid grid-cols-12 items-center min-h-[300px]">
              {/* Left Slot: Circular Node */}
              <div className="col-span-5 flex justify-end pr-8 lg:pr-14">
                <div className="relative group">
                  <div className="absolute -inset-10 pointer-events-none -z-0 flex items-center justify-center">
                    <svg viewBox="0 0 200 200" className="w-full h-full">
                      <g transform="translate(100, 100)">
                        {Array.from({ length: 24 }).map((_, i) => (
                          <line key={i} x1="0" y1="-64" x2="0" y2="-94" stroke="#F28C28" strokeWidth="3.5" strokeLinecap="round" transform={`rotate(${i * 15})`} />
                        ))}
                      </g>
                    </svg>
                  </div>
                  <svg viewBox="0 0 24 24" className="absolute -top-2 -left-2 w-7 h-7 fill-[#07192D] z-20" aria-hidden="true">
                    <path d="M12 0 L14.8 9.2 L24 12 L14.8 14.8 L12 24 L9.2 14.8 L0 12 L9.2 9.2 Z" />
                  </svg>
                  <div className="w-36 h-36 lg:w-40 lg:h-40 rounded-full overflow-hidden border-[6px] border-white shadow-2xl relative z-10 bg-white">
                    <img src={choreoWorkshopPoster} alt="SOP-Based Training" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                  </div>
                  <svg viewBox="0 0 200 200" className="absolute inset-0 w-full h-full pointer-events-none z-20">
                    <path id="path-badge-6" d="M 12, 78 A 88,88 0 0,0 132, 174" fill="none" />
                    <text fill="#145A96" fontSize="10.5" fontWeight="900" letterSpacing="0.2em">
                      <textPath href="#path-badge-6">• QUALITY SOP •</textPath>
                    </text>
                  </svg>
                </div>
              </div>
              {/* Right Slot: Card */}
              <div className="col-span-7 pl-6 lg:pl-10">
                <div className="rounded-2xl sm:rounded-3xl p-6 sm:p-7 bg-white border border-[rgba(34,34,34,0.12)] shadow-sm hover:shadow-md transition-all max-w-md">
                  <span className="text-xs font-black uppercase tracking-widest text-[#F28C28] block mb-1">QUALITY</span>
                  <h3 className="font-display font-black text-xl sm:text-2xl uppercase leading-tight text-[#145A96]">SOP-BASED TRAINING</h3>
                  <p className="mt-2 text-sm text-[#222222]/85 leading-relaxed font-normal">Periodic, step-by-step instructor training.</p>
                </div>
              </div>
            </div>

            {/* ROW 8: TODAY / FIRST PRO BATCHES */}
            <div className="relative z-10 grid grid-cols-12 items-center min-h-[300px]">
              {/* Left Slot: Card */}
              <div className="col-span-7 pr-6 lg:pr-10 text-right">
                <div className="rounded-2xl sm:rounded-3xl p-6 sm:p-7 bg-white border border-[rgba(34,34,34,0.12)] shadow-sm hover:shadow-md transition-all max-w-md ml-auto text-left">
                  <span className="text-xs font-black uppercase tracking-widest text-[#F28C28] block mb-1">TODAY</span>
                  <h3 className="font-display font-black text-xl sm:text-2xl uppercase leading-tight text-[#145A96]">FIRST PRO BATCHES</h3>
                  <p className="mt-2 text-sm text-[#222222]/85 leading-relaxed font-normal">Little Legends, Alpha Squad and NextGen Rebels.</p>
                </div>
              </div>
              {/* Right Slot: Circular Node */}
              <div className="col-span-5 pl-8 lg:pl-14 flex justify-start">
                <div className="relative group">
                  <div className="absolute -inset-10 pointer-events-none -z-0 flex items-center justify-center">
                    <svg viewBox="0 0 200 200" className="w-full h-full">
                      <g transform="translate(100, 100)">
                        {Array.from({ length: 24 }).map((_, i) => (
                          <line key={i} x1="0" y1="-64" x2="0" y2="-94" stroke="#145A96" strokeWidth="3.5" strokeLinecap="round" transform={`rotate(${i * 15})`} />
                        ))}
                      </g>
                    </svg>
                  </div>
                  <svg viewBox="0 0 24 24" className="absolute -top-2 -left-2 w-7 h-7 fill-[#06B6D4] z-20" aria-hidden="true">
                    <path d="M12 0 L14.8 9.2 L24 12 L14.8 14.8 L12 24 L9.2 14.8 L0 12 L9.2 9.2 Z" />
                  </svg>
                  <div className="w-36 h-36 lg:w-40 lg:h-40 rounded-full overflow-hidden border-[6px] border-white shadow-2xl relative z-10 bg-white">
                    <img src={academyShowcaseImg} alt="First Pro Batches" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                  </div>
                  <svg viewBox="0 0 200 200" className="absolute inset-0 w-full h-full pointer-events-none z-20">
                    <path id="path-badge-7" d="M 68, 174 A 88,88 0 0,0 188, 78" fill="none" />
                    <text fill="#145A96" fontSize="10.5" fontWeight="900" letterSpacing="0.22em">
                      <textPath href="#path-badge-7">• PRO CREWS •</textPath>
                    </text>
                  </svg>
                </div>
              </div>
            </div>

            {/* ROW 9: NEXT / THREE MORE COURTS */}
            <div className="relative z-10 grid grid-cols-12 items-center min-h-[300px]">
              {/* Left Slot: Circular Node */}
              <div className="col-span-5 flex justify-end pr-8 lg:pr-14">
                <div className="relative group">
                  <div className="absolute -top-6 -left-6 w-36 h-36 pointer-events-none -z-0">
                    <svg viewBox="0 0 100 100" className="w-full h-full">
                      <g transform="translate(50,50)">
                        {Array.from({ length: 12 }).map((_, i) => (
                          <rect key={i} x="-7" y="-44" width="14" height="14" rx="3" fill="#F59E0B" transform={`rotate(${i * 30})`} />
                        ))}
                      </g>
                    </svg>
                  </div>
                  <svg viewBox="0 0 24 24" className="absolute -bottom-2 -left-2 w-7 h-7 fill-[#FBBF24] z-20" aria-hidden="true">
                    <path d="M12 0 L14.8 9.2 L24 12 L14.8 14.8 L12 24 L9.2 14.8 L0 12 L9.2 9.2 Z" />
                  </svg>
                  <div className="w-36 h-36 lg:w-40 lg:h-40 rounded-full overflow-hidden border-[6px] border-white shadow-2xl relative z-10 bg-white">
                    <img src={franchise1Img} alt="Three More Courts" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                  </div>
                  <svg viewBox="0 0 200 200" className="absolute inset-0 w-full h-full pointer-events-none z-20">
                    <path id="path-badge-8" d="M 12, 78 A 88,88 0 0,0 132, 174" fill="none" />
                    <text fill="#145A96" fontSize="10.5" fontWeight="900" letterSpacing="0.2em">
                      <textPath href="#path-badge-8">• NEW COURTS •</textPath>
                    </text>
                  </svg>
                </div>
              </div>
              {/* Right Slot: Card (Signature Next Peach) */}
              <div className="col-span-7 pl-6 lg:pl-10">
                <div className="rounded-2xl sm:rounded-3xl p-6 sm:p-7 bg-[#FFF6EF] border border-[#F28C28]/40 shadow-sm max-w-md">
                  <span className="text-xs font-black uppercase tracking-widest text-[#F28C28] block mb-1">NEXT</span>
                  <h3 className="font-display font-black text-xl sm:text-2xl uppercase leading-tight text-[#145A96]">THREE MORE COURTS</h3>
                  <p className="mt-2 text-sm text-[#222222]/85 leading-relaxed font-normal">New Rhythmic Beat courts are on the way.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ============================================================
            MOBILE SERPENTINE ROADMAP (< md screens, ALL 9 MILESTONES)
            ============================================================ */}
        <div className="md:hidden relative max-w-md mx-auto px-5">
          {/* Continuous Vertical Winding Blue Line for Mobile */}
          <div className="absolute left-8 top-10 bottom-10 w-1 bg-[#145A96] rounded-full pointer-events-none" />

          <div className="space-y-10 relative z-10">
            {/* Mobile Item 1 */}
            <div className="flex items-start gap-4">
              <div className="relative shrink-0">
                <div className="w-20 h-20 rounded-full overflow-hidden border-4 border-white shadow-xl relative z-10 bg-white">
                  <img src={storyHeroImg} alt="Master Yuvi - Founder" className="w-full h-full object-cover object-top" />
                </div>
                <svg viewBox="0 0 24 24" className="absolute -bottom-1 -right-1 w-5 h-5 fill-[#F28C28] z-20">
                  <path d="M12 0 L14.8 9.2 L24 12 L14.8 14.8 L12 24 L9.2 14.8 L0 12 L9.2 9.2 Z" />
                </svg>
              </div>
              <div className="flex-1 rounded-2xl p-4 bg-[#145A96] text-white border border-[#145A96] shadow-sm">
                <span className="text-[10px] font-black uppercase tracking-widest text-[#F28C28] block">THE BEGINNING</span>
                <h3 className="font-display font-black text-base uppercase !text-white mt-0.5">FOUNDED IN 2003</h3>
                <p className="text-xs text-white/95 mt-1 leading-relaxed font-medium">Master Yuvi starts Rhythmic Beat at Rock City.</p>
              </div>
            </div>

            {/* Mobile Item 2 */}
            <div className="flex items-start gap-4">
              <div className="relative shrink-0">
                <div className="w-20 h-20 rounded-full overflow-hidden border-4 border-white shadow-xl relative z-10 bg-white">
                  <img src={studioExteriorImg} alt="RBDC Studios Facade" className="w-full h-full object-cover" />
                </div>
              </div>
              <div className="flex-1 rounded-2xl p-4 bg-white border border-[rgba(34,34,34,0.12)] shadow-xs">
                <span className="text-[10px] font-black uppercase tracking-widest text-[#F28C28] block">GROWING</span>
                <h3 className="font-display font-black text-base uppercase text-[#145A96] mt-0.5">COURTS ACROSS CHENNAI</h3>
                <p className="text-xs text-[#222222]/85 mt-1 leading-relaxed">Valasaravakkam, Kolapakkam and Ambattur.</p>
              </div>
            </div>

            {/* Mobile Item 3 */}
            <div className="flex items-start gap-4">
              <div className="relative shrink-0">
                <div className="w-20 h-20 rounded-full overflow-hidden border-4 border-white shadow-xl relative z-10 bg-white">
                  <img src={courseBharathamImg} alt="Bharatanatyam Court" className="w-full h-full object-cover" />
                </div>
              </div>
              <div className="flex-1 rounded-2xl p-4 bg-white border border-[rgba(34,34,34,0.12)] shadow-xs">
                <span className="text-[10px] font-black uppercase tracking-widest text-[#F28C28] block">TRADITION</span>
                <h3 className="font-display font-black text-base uppercase text-[#145A96] mt-0.5">BHARATANATYAM CLASSES</h3>
                <p className="text-xs text-[#222222]/85 mt-1 leading-relaxed">A dedicated classical court for cultural enrichment.</p>
              </div>
            </div>

            {/* Mobile Item 4 */}
            <div className="flex items-start gap-4">
              <div className="relative shrink-0">
                <div className="w-20 h-20 rounded-full overflow-hidden border-4 border-white shadow-xl relative z-10 bg-white">
                  <img src={courseBungeeImg} alt="Bungee & Aerial Yoga" className="w-full h-full object-cover" />
                </div>
              </div>
              <div className="flex-1 rounded-2xl p-4 bg-white border border-[rgba(34,34,34,0.12)] shadow-xs">
                <span className="text-[10px] font-black uppercase tracking-widest text-[#F28C28] block">INNOVATION</span>
                <h3 className="font-display font-black text-base uppercase text-[#145A96] mt-0.5">NEW FITNESS FORMATS</h3>
                <p className="text-xs text-[#222222]/85 mt-1 leading-relaxed">Bungee workouts, aerial yoga, Kalaripayattu and gymnastics.</p>
              </div>
            </div>

            {/* Mobile Item 5 */}
            <div className="flex items-start gap-4">
              <div className="relative shrink-0">
                <div className="w-20 h-20 rounded-full overflow-hidden border-4 border-white shadow-xl relative z-10 bg-white">
                  <img src={aboutHeroStreetFreeze} alt="Creative Social Presence" className="w-full h-full object-cover" />
                </div>
              </div>
              <div className="flex-1 rounded-2xl p-4 bg-white border border-[rgba(34,34,34,0.12)] shadow-xs">
                <span className="text-[10px] font-black uppercase tracking-widest text-[#F28C28] block">VISIBILITY</span>
                <h3 className="font-display font-black text-base uppercase text-[#145A96] mt-0.5">CREATIVE SOCIAL PRESENCE</h3>
                <p className="text-xs text-[#222222]/85 mt-1 leading-relaxed">Choreography videos that amplified the brand.</p>
              </div>
            </div>

            {/* Mobile Item 6 */}
            <div className="flex items-start gap-4">
              <div className="relative shrink-0">
                <div className="w-20 h-20 rounded-full overflow-hidden border-4 border-white shadow-xl relative z-10 bg-white">
                  <img src={posterSemiclassical} alt="Online Sessions" className="w-full h-full object-cover" />
                </div>
              </div>
              <div className="flex-1 rounded-2xl p-4 bg-white border border-[rgba(34,34,34,0.12)] shadow-xs">
                <span className="text-[10px] font-black uppercase tracking-widest text-[#F28C28] block">REACH</span>
                <h3 className="font-display font-black text-base uppercase text-[#145A96] mt-0.5">ONLINE SESSIONS</h3>
                <p className="text-xs text-[#222222]/85 mt-1 leading-relaxed">Live, structured classes streamed into students’ homes.</p>
              </div>
            </div>

            {/* Mobile Item 7 */}
            <div className="flex items-start gap-4">
              <div className="relative shrink-0">
                <div className="w-20 h-20 rounded-full overflow-hidden border-4 border-white shadow-xl relative z-10 bg-white">
                  <img src={choreoWorkshopPoster} alt="SOP-Based Training" className="w-full h-full object-cover" />
                </div>
              </div>
              <div className="flex-1 rounded-2xl p-4 bg-white border border-[rgba(34,34,34,0.12)] shadow-xs">
                <span className="text-[10px] font-black uppercase tracking-widest text-[#F28C28] block">QUALITY</span>
                <h3 className="font-display font-black text-base uppercase text-[#145A96] mt-0.5">SOP-BASED TRAINING</h3>
                <p className="text-xs text-[#222222]/85 mt-1 leading-relaxed">Periodic, step-by-step instructor training.</p>
              </div>
            </div>

            {/* Mobile Item 8 */}
            <div className="flex items-start gap-4">
              <div className="relative shrink-0">
                <div className="w-20 h-20 rounded-full overflow-hidden border-4 border-white shadow-xl relative z-10 bg-white">
                  <img src={academyShowcaseImg} alt="First Pro Batches" className="w-full h-full object-cover" />
                </div>
              </div>
              <div className="flex-1 rounded-2xl p-4 bg-white border border-[rgba(34,34,34,0.12)] shadow-xs">
                <span className="text-[10px] font-black uppercase tracking-widest text-[#F28C28] block">TODAY</span>
                <h3 className="font-display font-black text-base uppercase text-[#145A96] mt-0.5">FIRST PRO BATCHES</h3>
                <p className="text-xs text-[#222222]/85 mt-1 leading-relaxed">Little Legends, Alpha Squad and NextGen Rebels.</p>
              </div>
            </div>

            {/* Mobile Item 9 */}
            <div className="flex items-start gap-4">
              <div className="relative shrink-0">
                <div className="w-20 h-20 rounded-full overflow-hidden border-4 border-white shadow-xl relative z-10 bg-white">
                  <img src={franchise1Img} alt="Three More Courts" className="w-full h-full object-cover" />
                </div>
              </div>
              <div className="flex-1 rounded-2xl p-4 bg-[#FFF6EF] border border-[#F28C28]/40 shadow-xs">
                <span className="text-[10px] font-black uppercase tracking-widest text-[#F28C28] block">NEXT</span>
                <h3 className="font-display font-black text-base uppercase text-[#145A96] mt-0.5">THREE MORE COURTS</h3>
                <p className="text-xs text-[#222222]/85 mt-1 leading-relaxed">New Rhythmic Beat courts are on the way.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      

{/* ========================================================
          SECTION 2: VISION / OUR PROMISE (Full-Width Matching Reference UI)
          ======================================================== */}
      <section
        id="vision-section"
        aria-label="Our Vision & Promise"
        className="relative w-full bg-gradient-to-br from-[#06172A] via-[#0B2A4C] to-[#10385F] text-white py-16 sm:py-20 lg:py-24 overflow-hidden shadow-2xl border-b border-[#145A96]/30"
      >
        {/* Ambient Studio Background Texture & Brand Glows */}
        <div
          className="absolute inset-0 opacity-[0.06] bg-cover bg-center mix-blend-luminosity pointer-events-none"
          style={{ backgroundImage: `url(${rbdcFacadeImg})` }}
        />
        <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[500px] h-[350px] bg-[#145A96]/30 blur-[120px] pointer-events-none" />
        <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[400px] h-[350px] bg-[#F28C28]/15 blur-[100px] pointer-events-none" />

        <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-14 relative z-10">
          {/* Top Row: Editorial Heading on Left & Philosophy on Right */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-start mb-12 sm:mb-16 lg:mb-20">
            {/* Top Left */}
            <div className="lg:col-span-7">
              <div className="flex items-center gap-2.5 mb-3 sm:mb-4">
                <span className="w-5 h-0.5 bg-[#F28C28] rounded-full inline-block" />
                <span className="text-xs sm:text-sm font-extrabold tracking-widest text-[#F28C28] uppercase">
                  OUR PROMISE
                </span>
              </div>

              <h2 className="font-sans italic text-2xl sm:text-3xl lg:text-4xl text-white/95 font-light leading-snug tracking-tight mb-4">
                Your journey begins today <br className="hidden sm:inline" />
                <span className="not-italic font-display font-black !text-white uppercase tracking-tight">
                  — let your movement speak.
                </span>
              </h2>

              <p className="text-xs sm:text-sm lg:text-base text-neutral-300 font-normal leading-relaxed max-w-xl">
                At Rhythmic Beat Dance Court, we believe dance is more than just movement — it’s a way to express, connect, build confidence, and grow.
              </p>
            </div>

            {/* Top Right */}
            <div className="lg:col-span-5 lg:text-right lg:pt-8">
              <p className="font-sans italic text-lg sm:text-xl lg:text-2xl text-white/85 font-light leading-relaxed max-w-md lg:ml-auto">
                Whether you're just starting out or aiming for the stage, we have a place for you.
              </p>
              <p className="font-['Caveat',cursive] text-2xl sm:text-3xl text-[#F28C28] mt-2 select-none">
                Across all our Chennai courts ~
              </p>
            </div>
          </div>

          {/* Bottom Row: 4 Sleek Cards (Card 3 Tilted with Orange Dot) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-7 items-stretch">
            {/* Card 1 */}
            <div className="rounded-2xl sm:rounded-3xl p-6 sm:p-7 bg-white/[0.04] backdrop-blur-md border border-white/10 hover:border-white/20 transition-all duration-300 flex flex-col justify-between min-h-[210px] hover:translate-y-[-2px]">
              <div className="w-2.5 h-2.5 rounded-full bg-white mb-6 shadow-sm" />
              <p className="text-sm sm:text-base text-neutral-200 font-normal leading-relaxed">
                Take part in exciting events, seasonal showcases, and international masterclasses.
              </p>
            </div>

            {/* Card 2 */}
            <div className="rounded-2xl sm:rounded-3xl p-6 sm:p-7 bg-white/[0.04] backdrop-blur-md border border-white/10 hover:border-white/20 transition-all duration-300 flex flex-col justify-between min-h-[210px] hover:translate-y-[-2px]">
              <div className="w-2.5 h-2.5 rounded-full bg-white mb-6 shadow-sm" />
              <p className="text-sm sm:text-base text-neutral-200 font-normal leading-relaxed">
                Find your confidence, express yourself, and become part of our dance family.
              </p>
            </div>

            {/* Card 3 (THE TILTED ACCENT CARD!) */}
            <div className="rounded-2xl sm:rounded-3xl p-6 sm:p-7 bg-gradient-to-br from-[#123E6B] via-[#0D2D4E] to-[#0A2240] backdrop-blur-md border-2 border-[#F28C28]/60 shadow-2xl shadow-[#F28C28]/20 flex flex-col justify-between min-h-[220px] transform lg:-rotate-6 hover:rotate-0 transition-transform duration-500 cursor-pointer group">
              <div className="w-3 h-3 rounded-full bg-[#F28C28] mb-6 shadow-md shadow-[#F28C28]/50 group-hover:scale-125 transition-transform" />
              <p className="text-sm sm:text-base text-white font-medium leading-relaxed">
                Choose from a wide range of styles: Western Dance, Bharatanatyam, Aerial Yoga, Bungee, Kalaripayattu, and Zumba.
              </p>
            </div>

            {/* Card 4 */}
            <div className="rounded-2xl sm:rounded-3xl p-6 sm:p-7 bg-white/[0.04] backdrop-blur-md border border-white/10 hover:border-white/20 transition-all duration-300 flex flex-col justify-between min-h-[210px] hover:translate-y-[-2px]">
              <div className="w-2.5 h-2.5 rounded-full bg-white mb-6 shadow-sm" />
              <p className="text-sm sm:text-base text-neutral-200 font-normal leading-relaxed">
                Learn from world-class instructors who are passionate about teaching and performance.
              </p>
            </div>
          </div>
        </div>
      </section>

      

{/* ========================================================
          SECTION 4: WHY US — THE RB STANDARD (ACCORDION GALLERY)
          ======================================================== */}
      <section
        id="why-us-section"
        aria-label="Why Us - The RB Standard"
        className="w-full py-16 sm:py-20 lg:py-24 overflow-hidden"
      >
        <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16">
          <div className="flex items-center gap-2 mb-3">
            <span className="w-5 h-0.5 bg-[#F28C28] rounded-full inline-block" />
            <span className="text-xs sm:text-sm font-extrabold tracking-widest text-[#F28C28] uppercase">
              WHY US
            </span>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 sm:mb-12">
            <h2 className="font-display font-black text-3xl sm:text-5xl lg:text-6xl tracking-tight uppercase leading-[1.1]">
              <span className="text-[#145A96]">THE RB </span>
              <span className="text-[#F28C28]">STANDARD</span>
            </h2>
            <p className="text-xs sm:text-sm text-neutral-500 max-w-xs sm:text-right">
              Hover or tap on any panel to explore our core training standards.
            </p>
          </div>

          <div className="w-full">
            <AccordionGallery
              items={rbStandardAccordionItems}
              defaultIndex={2}
              expandRatio={0.46}
              trigger="hover"
              accentColor="#F28C28"
              overlayColor="#07192D"
              textColor="#ffffff"
              height={500}
              gap={14}
              radius={22}
              grayscale={true}
            />
          </div>
        </div>
      </section>

      {/* SECTION 5: TECH-INTEGRATED SUPPORT SYSTEM (Hidden per request) */}
    </div>
  );
};
