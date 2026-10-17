import { useState } from 'react';
import {
  Play,
  Check,
  ArrowRight,
  Sparkles,
  ArrowLeft,
  Building2,
  Crown,
  Award,
  ShieldCheck,
  Headphones,
  Calendar,
  CheckCircle2,
  Layers,
  MapPin,
  TrendingUp,
} from 'lucide-react';
import { FranchiseEnquiryModal } from './FranchiseEnquiryModal';
import { DisciplineWatermark } from './DisciplineWatermark';

// Assets
import rightHeroImg from '../assets/Right-side-hero.jpg';
import celebrityWorkshopImg from '../assets/imgi_49_image.webp';
import pairRbImg from '../assets/pair-RB.png';
import sampleVideo from '../assets/nallaru-poo-junior-batch.mp4';

export const FranchisePage = ({ onNavigate }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedFormat, setSelectedFormat] = useState('Foundation Studio');

  const openModalWithFormat = (fmt) => {
    setSelectedFormat(fmt);
    setIsModalOpen(true);
  };

  const formatsData = [
    {
      formatId: 'Format 1',
      formatName: 'Foundation Studio',
      tag: 'FORMAT 01',
      badge: 'ENTRY LEVEL',
      title: 'FOUNDATION STUDIO',
      subtitle: 'Single-Court Community Studio',
      description:
        'Entry-level, single-court format focused on Western Dance, Zumba, and kids batches with streamlined setup and low operational overhead.',
      space: '1,200 – 1,800 sq.ft',
      courts: '1 Studio Court',
      disciplines: ['Western Dance', 'Zumba Fitness', 'Kids Junior Batches'],
      isFeatured: false,
      accentColor: '#145A96',
    },
    {
      formatId: 'Format 2',
      formatName: 'Signature Studio',
      tag: 'FORMAT 02',
      badge: 'MOST POPULAR',
      title: 'SIGNATURE STUDIO',
      subtitle: 'Dual-Court Comprehensive Academy',
      description:
        'Our most balanced two-court format adding classical Bharatanatyam training, holistic wellness, and competitive pro crew batches.',
      space: '2,200 – 3,200 sq.ft',
      courts: '2 Studio Courts',
      disciplines: ['Classical Bharatanatyam', 'Western & Hip-Hop', 'Pro Crews & Fitness'],
      isFeatured: true,
      accentColor: '#F28C28',
    },
    {
      formatId: 'Format 3',
      formatName: 'Platinum Hub',
      tag: 'FORMAT 03',
      badge: 'FLAGSHIP HUB',
      title: 'PLATINUM HUB',
      subtitle: 'Full Academy Ecosystem',
      description:
        'Flagship multi-court format with the complete RB ecosystem — aerial yoga, bungee workout, Kalaripayattu, and celebrity workshops.',
      space: '3,500+ sq.ft',
      courts: '3+ Studio Courts',
      disciplines: ['Full RB Disciplines', 'Aerial & Bungee Rigging', 'Masterclass Stage'],
      isFeatured: false,
      accentColor: '#145A96',
    },
  ];

  const supportChecklist = [
    { title: 'RB Brand Kit & Blueprints', desc: 'Complete architectural and acoustic design specs' },
    { title: 'Instructor Hiring & Training', desc: 'Rigorous trainer recruitment and SOP certification' },
    { title: 'Studio ERP Software & Hotline', desc: 'Automated student billing, attendance & portal' },
    { title: 'Structured Monthly Curricula', desc: 'Standardized lesson plans for every level and style' },
    { title: 'Assessment & Award Framework', desc: 'Annual grade examinations and stage recognition' },
    { title: 'Launch & Promotions Guidance', desc: 'Local area marketing playbook and digital ads' },
    { title: 'Social Media & Ad Creative Kit', desc: 'High-converting video and photo templates' },
    { title: 'Direct Access to RB Stage Events', desc: 'Celebrity masterclasses, Summer Fests & showcases' },
  ];

  return (
    <div
      id="franchise-page"
      className="min-h-screen w-full overflow-x-hidden min-w-0 bg-[#F8FAFC] text-[#111111] selection:bg-[#145A96]/20 selection:text-[#111111]"
    >
      {/* ========================================================= */}
      {/* SECTION 1: TOP HERO SECTION (Full-Width Editorial Hero Matching About Us Page) */}
      {/* ========================================================= */}
      <section
        id="hero-section"
        aria-label="Franchise Hero"
        className="relative w-full bg-gradient-to-br from-[#07192D] via-[#0E355B] to-[#145A96] text-white overflow-hidden shadow-2xl border-b border-[#145A96]/30"
      >
        {/* Ambient Theatrical Brand Glows */}
        <div className="absolute top-0 right-1/4 w-[480px] h-[480px] bg-[#F28C28]/15 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute -bottom-10 left-10 w-[500px] h-[500px] bg-[#145A96]/45 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.035)_0,transparent_70%)] pointer-events-none" />

        {/* Fine Geometric Grid Overlay for Classic Polish */}
        <div
          className="absolute inset-0 opacity-[0.035] pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, #FFFFFF 1px, transparent 0)`,
            backgroundSize: '36px 36px',
          }}
        />

        {/* Dance Disciplines Watermarks in Background */}
        <DisciplineWatermark
          discipline="westerndance"
          position="top-left"
          color="orange"
          opacity={0.07}
          size="clamp(280px, 30vw, 460px)"
          rotation={-10}
          className="-top-6 -left-6 sm:left-4 z-0 pointer-events-none"
        />
        <DisciplineWatermark
          discipline="bharatanatyam"
          position="top-right"
          color="white"
          opacity={0.06}
          size="clamp(300px, 32vw, 500px)"
          rotation={12}
          className="top-8 -right-10 sm:right-6 z-0 pointer-events-none"
        />

        {/* Integrated Top Navigation Bar inside Hero Fold */}
        <div className="w-full max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-10 pt-24 xs:pt-28 sm:pt-32 pb-4 flex items-center justify-between z-30 relative">
          <button
            type="button"
            onClick={() => onNavigate('/')}
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-white/90 hover:text-white transition-all bg-white/10 hover:bg-white/20 backdrop-blur-md px-4 py-2 rounded-full border border-white/20 shadow-sm cursor-pointer hover:-translate-x-0.5"
          >
            <ArrowLeft className="w-3.5 h-3.5 text-[#F28C28]" />
            <span>Back to Home</span>
          </button>

          {/* Breadcrumbs & Series Badge */}
          <div className="flex items-center gap-2.5 text-xs font-semibold text-white/90 bg-black/40 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/15">
            <span
              className="hover:text-white cursor-pointer transition-colors"
              onClick={() => onNavigate('/')}
            >
              Home
            </span>
            <span className="text-[#F28C28] font-bold">/</span>
            <span className="text-white font-bold">Franchise</span>
            <span className="hidden sm:inline-block mx-1 w-1 h-1 rounded-full bg-white/30" />
            <span className="hidden sm:inline-block text-[#F28C28] font-black uppercase text-[10.5px] tracking-wider">
              PARTNER WITH RB • EST. 2003
            </span>
          </div>
        </div>

        {/* Main Hero Content */}
        <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-10 pb-16 sm:pb-20 lg:pb-24 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            {/* Left Column: Franchise Headline, Story & CTA */}
            <div className="lg:col-span-7 flex flex-col justify-center">
              {/* Category Tag with Orange Dash */}
              <div className="flex items-center gap-2.5 mb-4 sm:mb-5">
                <span className="w-6 h-0.5 bg-[#F28C28] rounded-full inline-block" />
                <span className="text-xs sm:text-sm font-extrabold text-[#F28C28] uppercase tracking-[0.2em]">
                  FRANCHISE OPPORTUNITIES • EST. 2003
                </span>
              </div>

              {/* Editorial Quote & Signature Cursive Accent */}
              <p className="font-sans italic text-base sm:text-lg lg:text-xl text-white/90 leading-snug max-w-lg mb-1 font-light tracking-wide">
                Where passion meets sustainable business — and every court builds future champions.
              </p>
              <p className="font-['Caveat',cursive] text-2xl sm:text-3xl text-[#F28C28] mb-6 select-none">
                Let ur body speak ~
              </p>

              {/* Big Bold Headline matching Logo Typography */}
              <h1 className="font-display font-black text-4xl xs:text-5xl sm:text-6xl lg:text-[4.75rem] xl:text-[5.25rem] tracking-tight leading-[0.96] uppercase mb-6 select-none">
                <span className="text-white block drop-shadow-md">BRING</span>
                <span className="text-white block drop-shadow-md">RHYTHMIC</span>
                <span className="text-white">BEAT </span>
                <span className="bg-gradient-to-r from-[#F28C28] via-[#FFB36D] to-[#F28C28] bg-clip-text text-transparent">
                  TO
                </span>
                <span className="bg-gradient-to-r from-[#F28C28] via-[#FFB36D] to-[#F28C28] bg-clip-text text-transparent block">
                  YOUR CITY
                </span>
              </h1>

              {/* Subtitle */}
              <p className="font-sans text-sm sm:text-base md:text-lg text-white/85 leading-relaxed max-w-xl mb-8 font-normal">
                One brand, three proven formats. Partner with a dance and fitness academy that has trained thousands of students since 2003 with standardized curricula, automated operations, and national masterclasses.
              </p>

              {/* 3 Trust Indicator Pills */}
              <div className="grid grid-cols-3 gap-3 sm:gap-4 max-w-lg mb-8">
                <div className="bg-white/[0.08] backdrop-blur-xl rounded-2xl p-3 sm:p-3.5 border border-white/15">
                  <span className="font-display font-black text-xl sm:text-2xl text-white block leading-none mb-1">
                    20+
                  </span>
                  <span className="text-[10.5px] sm:text-xs text-white/80 font-bold leading-tight block">
                    Years Legacy
                  </span>
                  <span className="text-[9px] text-[#F28C28] font-semibold block mt-0.5">
                    Est. 2003
                  </span>
                </div>

                <div className="bg-white/[0.08] backdrop-blur-xl rounded-2xl p-3 sm:p-3.5 border border-white/15">
                  <span className="font-display font-black text-xl sm:text-2xl text-white block leading-none mb-1">
                    3
                  </span>
                  <span className="text-[10.5px] sm:text-xs text-white/80 font-bold leading-tight block">
                    Studio Formats
                  </span>
                  <span className="text-[9px] text-white/60 font-semibold block mt-0.5">
                    Scalable Capex
                  </span>
                </div>

                <div className="bg-white/[0.08] backdrop-blur-xl rounded-2xl p-3 sm:p-3.5 border border-white/15">
                  <span className="font-display font-black text-xl sm:text-2xl text-white block leading-none mb-1">
                    100%
                  </span>
                  <span className="text-[10.5px] sm:text-xs text-white/80 font-bold leading-tight block">
                    Turnkey SOPs
                  </span>
                  <span className="text-[9px] text-emerald-400 font-semibold block mt-0.5">
                    Full Support
                  </span>
                </div>
              </div>

              {/* Primary Action Button */}
              <div className="flex flex-wrap items-center gap-4">
                <button
                  type="button"
                  onClick={() => openModalWithFormat('Foundation Studio')}
                  className="px-8 sm:px-10 py-4 rounded-2xl bg-gradient-to-r from-[#F28C28] to-[#E07A18] hover:from-[#E07A18] hover:to-[#D97415] text-white font-black text-sm sm:text-base tracking-wide shadow-[0_12px_28px_rgba(242,140,40,0.35)] hover:shadow-xl transition-all cursor-pointer inline-flex items-center gap-2.5 group hover:scale-102 active:scale-98"
                >
                  <span>Request Franchise Details</span>
                  <Sparkles className="w-4 h-4 group-hover:scale-110 transition-transform text-white" />
                </button>
                <a
                  href="#formats-section"
                  className="px-6 py-4 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-bold text-sm tracking-wide border border-white/20 transition-all cursor-pointer"
                >
                  Explore Studio Formats
                </a>
              </div>
            </div>

            {/* Right Column: Hero Visual with Founder Badge & Glowing Backlight */}
            <div className="lg:col-span-5 flex items-center justify-center relative">
              {/* Golden Spotlight behind image */}
              <div className="absolute w-[360px] h-[360px] bg-[#F28C28]/25 rounded-full blur-[90px] pointer-events-none" />

              <div className="w-full relative z-10 group">
                <div className="w-full rounded-[2.5rem] overflow-hidden shadow-[0_25px_60px_rgba(0,0,0,0.45)] border-2 border-white/25 bg-[#07192D] aspect-[4/3] sm:aspect-[16/12] lg:aspect-[4/5] flex items-center justify-center relative">
                  <img
                    src={rightHeroImg}
                    alt="Guru Yuvraaj Jayakumar & Rhythmic Beat Leadership"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-103"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#07192D]/85 via-transparent to-transparent pointer-events-none" />

                  {/* Top-Right Floating Founder Tag */}
                  <div className="absolute top-5 right-5 flex items-center gap-2 bg-[#07192D]/85 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/20 shadow-lg text-white">
                    <Sparkles className="w-3.5 h-3.5 text-[#F28C28]" />
                    <span className="text-[11px] font-bold tracking-wide">
                      Guru Yuvraaj • Founder
                    </span>
                  </div>

                  {/* Bottom Info Pill */}
                  <div className="absolute bottom-5 left-5 right-5 flex items-center justify-between bg-black/60 backdrop-blur-md px-4 py-2.5 rounded-2xl border border-white/15">
                    <div>
                      <span className="text-[10px] uppercase tracking-wider text-[#F28C28] font-black block">
                        RBDC EXPANSION
                      </span>
                      <span className="text-xs text-white font-bold block">
                        Valasaravakkam • Kolapakkam • Ambattur
                      </span>
                    </div>
                    <span className="text-[11px] font-extrabold text-emerald-400 bg-emerald-500/20 px-2.5 py-1 rounded-full border border-emerald-500/30">
                      Active Courts
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* SECTION 2: CHOOSE YOUR FORMAT (Studio Formats Section) */}
      {/* ========================================================= */}
      <section
        id="formats-section"
        aria-label="Studio Formats"
        className="w-full relative py-16 sm:py-20 lg:py-24 bg-[#F8FAFC] border-b border-neutral-200/80 overflow-hidden"
      >
        {/* Subtle Canvas Grain / Ambient Light */}
        <div className="absolute inset-0 bg-[radial-gradient(#145A96_1px,transparent_1px)] [background-size:28px_28px] opacity-[0.035] pointer-events-none" />
        <div className="absolute top-1/4 -left-40 w-[500px] h-[500px] bg-[#145A96]/5 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute bottom-1/4 -right-40 w-[500px] h-[500px] bg-[#F28C28]/6 rounded-full blur-[140px] pointer-events-none" />

        {/* Background Silhouette Watermarks */}
        <DisciplineWatermark
          discipline="kalaripayattu"
          position="top-right"
          color="blue"
          opacity={0.03}
          size="clamp(260px, 28vw, 420px)"
          rotation={-8}
          className="top-6 -right-10 pointer-events-none"
        />

        <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-10 relative z-10">
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
            <div className="inline-flex items-center gap-2 mb-3">
              <span className="w-5 h-0.5 bg-[#F28C28] rounded-full inline-block" />
              <span className="text-xs sm:text-sm font-extrabold tracking-widest text-[#F28C28] uppercase">
                STUDIO FORMATS
              </span>
              <span className="w-5 h-0.5 bg-[#F28C28] rounded-full inline-block" />
            </div>

            <h2 className="font-display font-black text-3xl sm:text-5xl lg:text-6xl tracking-tight uppercase leading-[1.1]">
              <span className="text-[#145A96]">CHOOSE YOUR </span>
              <span className="text-[#F28C28]">FORMAT</span>
            </h2>

            <p className="mt-4 text-sm sm:text-base lg:text-lg text-neutral-600 leading-relaxed font-normal max-w-2xl mx-auto">
              Select the franchise model that matches your commercial property footprint, local demographic demand, and investment appetite.
            </p>
          </div>

          {/* 3 Format Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 items-stretch mb-10">
            {formatsData.map((item) => (
              <div
                key={item.formatId}
                onClick={() => openModalWithFormat(item.formatName)}
                className={`group rounded-3xl p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 cursor-pointer relative ${
                  item.isFeatured
                    ? 'bg-white border-2 border-[#F28C28] shadow-[0_20px_45px_rgba(242,140,40,0.15)] md:-translate-y-2 hover:-translate-y-3'
                    : 'bg-white border border-slate-200/90 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_20px_40px_rgba(20,90,150,0.12)] hover:border-[#145A96]/40 hover:-translate-y-1.5'
                }`}
              >
                {/* Top Badge & Format Tag */}
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-black tracking-widest text-[#F28C28] uppercase">
                      {item.tag}
                    </span>
                    <span
                      className={`text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-full ${
                        item.isFeatured
                          ? 'bg-[#F28C28] text-white shadow-xs'
                          : 'bg-slate-100 text-slate-700'
                      }`}
                    >
                      {item.badge}
                    </span>
                  </div>

                  {/* Title & Subtitle */}
                  <h3 className="font-display font-black text-2xl sm:text-3xl text-[#0A2E54] group-hover:text-[#145A96] transition-colors mb-1 tracking-tight">
                    {item.title}
                  </h3>
                  <span className="text-xs font-bold text-[#F28C28] uppercase tracking-wider block mb-3.5">
                    {item.subtitle}
                  </span>

                  {/* Description */}
                  <p className="font-sans text-xs sm:text-sm text-slate-600 leading-relaxed mb-6 font-normal">
                    {item.description}
                  </p>

                  {/* Space & Court Specifications */}
                  <div className="space-y-2 py-4 border-y border-slate-100 text-xs text-slate-700 font-semibold mb-6">
                    <div className="flex items-center justify-between">
                      <span className="text-slate-400 font-medium">Space required:</span>
                      <span className="font-black text-[#0A2E54]">{item.space}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-400 font-medium">Courts layout:</span>
                      <span className="font-black text-[#0A2E54]">{item.courts}</span>
                    </div>
                  </div>

                  {/* Disciplines Included */}
                  <div className="space-y-2 mb-6">
                    <span className="text-[11px] font-black uppercase tracking-wider text-slate-400 block">
                      Key Disciplines:
                    </span>
                    {item.disciplines.map((disc) => (
                      <div key={disc} className="flex items-center gap-2 text-xs text-slate-700 font-medium">
                        <Check className="w-3.5 h-3.5 text-[#F28C28] stroke-[3]" />
                        <span>{disc}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Card Action Button */}
                <div className="pt-4 border-t border-slate-100">
                  <div
                    className={`w-full py-3 px-4 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-all ${
                      item.isFeatured
                        ? 'bg-[#F28C28] text-white shadow-sm group-hover:bg-[#E07A18]'
                        : 'bg-slate-50 text-[#145A96] group-hover:bg-[#145A96] group-hover:text-white border border-slate-200 group-hover:border-[#145A96]'
                    }`}
                  >
                    <span>Request Format Blueprints</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Notice Banner Below Cards */}
          <div className="rounded-2xl bg-white border border-slate-200/90 p-4 sm:p-5 flex items-center gap-3 text-xs sm:text-sm text-slate-600 shadow-xs">
            <ShieldCheck className="w-5 h-5 text-[#F28C28] shrink-0" />
            <p className="leading-relaxed">
              <strong className="text-[#0A2E54]">Custom & Hybrid Formats:</strong> Multi-story and hybrid studio formats are evaluated case-by-case under Guru Yuvraaj&apos;s direct supervision. Full architectural blueprints, revenue model spreadsheets, and equipment vendor lists are provided to shortlisted candidates.
            </p>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* SECTION 3: SUPPORT ACROSS ALL FORMATS & PARTNERING CALLOUT (Deep Royal Navy Thematic Section) */}
      {/* ========================================================= */}
      <section
        id="support-section"
        aria-label="Support & Partnering"
        className="relative w-full bg-gradient-to-br from-[#06172A] via-[#0B2A4C] to-[#10385F] text-white py-16 sm:py-20 lg:py-24 overflow-hidden shadow-2xl border-b border-[#145A96]/30"
      >
        {/* Ambient Theatrical Brand Glows */}
        <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[500px] h-[350px] bg-[#145A96]/35 blur-[120px] pointer-events-none" />
        <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[400px] h-[350px] bg-[#F28C28]/15 blur-[100px] pointer-events-none" />

        {/* Silhouette Watermark */}
        <DisciplineWatermark
          discipline="aerialyoga"
          position="bottom-left"
          color="white"
          opacity={0.04}
          size="clamp(280px, 32vw, 480px)"
          rotation={6}
          className="bottom-4 -left-8 pointer-events-none"
        />

        <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-10 relative z-10">
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
            <div className="inline-flex items-center gap-2 mb-3">
              <span className="w-5 h-0.5 bg-[#F28C28] rounded-full inline-block" />
              <span className="text-xs sm:text-sm font-extrabold tracking-widest text-[#F28C28] uppercase">
                COMPREHENSIVE FRANCHISE ECOSYSTEM
              </span>
              <span className="w-5 h-0.5 bg-[#F28C28] rounded-full inline-block" />
            </div>

            <h2 className="font-display font-black text-3xl sm:text-5xl lg:text-6xl tracking-tight uppercase leading-[1.08]">
              <span className="text-white block">YOU RUN THE COURT.</span>
              <span className="bg-gradient-to-r from-[#F28C28] via-[#FFB36D] to-[#F28C28] bg-clip-text text-transparent block">
                WE BRING THE SYSTEM.
              </span>
            </h2>

            <p className="mt-4 text-sm sm:text-base lg:text-lg text-neutral-300 leading-relaxed font-normal max-w-2xl mx-auto">
              From day one, you get access to our 20+ years of operational blueprints, instructor recruitment pipelines, and centralized event networks.
            </p>
          </div>

          {/* 8 Support Pillar Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 mb-12 sm:mb-16">
            {supportChecklist.map((item, idx) => (
              <div
                key={item.title}
                className="group bg-white/[0.07] hover:bg-white/[0.12] backdrop-blur-md rounded-2xl p-5 border border-white/15 hover:border-[#F28C28]/60 transition-all duration-300 flex flex-col justify-between shadow-lg"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[10px] font-black uppercase tracking-wider text-[#F28C28]">
                      PILLAR 0{idx + 1}
                    </span>
                    <div className="w-6 h-6 rounded-full bg-[#F28C28] text-white flex items-center justify-center shadow-xs">
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                    </div>
                  </div>
                  <h3 className="font-display font-bold text-base text-white mb-1.5 leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-xs text-neutral-300 font-normal leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Interested in Partnering Callout Deck */}
          <div className="rounded-3xl bg-gradient-to-r from-white/[0.10] via-white/[0.06] to-white/[0.03] backdrop-blur-xl border border-white/20 p-7 sm:p-10 md:p-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-8 shadow-2xl relative overflow-hidden">
            <div className="max-w-2xl">
              <span className="text-xs font-black tracking-widest text-[#F28C28] uppercase block mb-1.5">
                START YOUR EXPANSION JOURNEY
              </span>
              <h3 className="font-display font-black text-2xl xs:text-3xl sm:text-4xl tracking-tight uppercase text-white leading-tight">
                <span>INTERESTED IN </span>
                <span className="text-[#F28C28]">PARTNERING?</span>
              </h3>
              <p className="text-xs sm:text-sm md:text-base text-neutral-200 mt-2.5 leading-relaxed font-normal">
                Share your target city and commercial background. Our franchise expansion team will reach out with the comprehensive prospectus within 24 hours.
              </p>
            </div>

            <button
              type="button"
              onClick={() => openModalWithFormat('Open to Discussion')}
              className="px-8 sm:px-10 py-4 rounded-2xl bg-[#F28C28] hover:bg-[#E07A18] text-white font-black text-sm sm:text-base shadow-[0_10px_25px_rgba(242,140,40,0.35)] hover:shadow-xl transition-all cursor-pointer shrink-0 hover:scale-102 active:scale-98"
            >
              Request Prospectus
            </button>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* SECTION 4: FEATURES SECTION (NO BOX / NO CONTAINER BG COLOR - Organic Page Flow) */}
      {/* ========================================================= */}
      <section
        id="features-section"
        aria-label="Features & Insights"
        className="relative w-full py-16 sm:py-24 lg:py-28 overflow-hidden bg-gradient-to-b from-[#FFFFFF] via-[#F8FAFC] to-[#FFFFFF]"
      >
        <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-10 relative z-10">
          {/* Centered Category Tag matching uploaded screenshot */}
          <div className="text-center mb-5">
            <span className="text-xs sm:text-sm font-bold text-slate-400 tracking-widest uppercase">
              /Features
            </span>
          </div>

          {/* Centered Large Mixed-Typography Display Statement (Exact Copy from Screenshot) */}
          <div className="max-w-4xl mx-auto text-center mb-12 sm:mb-16">
            <h2 className="font-display font-black text-2xl xs:text-3xl sm:text-4xl lg:text-[2.65rem] text-[#111111] tracking-tight leading-[1.25] mb-3">
              We are a team of certified trainers, choreographers, and innovators
            </h2>
            <p className="font-sans font-normal text-lg xs:text-xl sm:text-2xl lg:text-[1.85rem] text-[#6B7280] leading-relaxed">
              dedicated to sophisticated ambiance, software-monitored growth, and celebrity masterclasses. Our mission is to bridge professional dance with positive energy and fun.
            </p>
          </div>

          {/* Bottom Grid: Left Wide Video Player Card & Right Seamless Dance Partner Showcase */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-end">
            {/* Left Card: 16:9 Cinematic Video Player Container (7 cols) */}
            <div className="lg:col-span-7 group relative rounded-3xl sm:rounded-[2.5rem] overflow-hidden bg-[#07192D] aspect-[16/9] shadow-[0_20px_50px_rgba(0,0,0,0.2)] border border-slate-200/80 flex items-center justify-center">
              {isPlaying ? (
                <video
                  src={sampleVideo}
                  autoPlay
                  controls
                  className="w-full h-full object-cover"
                  onEnded={() => setIsPlaying(false)}
                />
              ) : (
                <>
                  <img
                    src={celebrityWorkshopImg}
                    alt="RBDC Celebrity Workshop & Masterclasses"
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-104"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#07192D]/85 via-black/40 to-transparent pointer-events-none" />

                  {/* Center Play Button with Pulse */}
                  <div className="relative z-10 flex flex-col items-center">
                    <button
                      type="button"
                      onClick={() => setIsPlaying(true)}
                      aria-label="Play Workshop Video"
                      className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-white text-[#145A96] flex items-center justify-center shadow-2xl hover:scale-110 active:scale-95 transition-all cursor-pointer group-hover:shadow-[0_0_30px_rgba(242,140,40,0.5)]"
                    >
                      <Play className="w-6 h-6 sm:w-7 sm:h-7 fill-[#145A96] ml-1" />
                    </button>
                    <span className="text-[11px] font-extrabold uppercase tracking-wider text-white mt-2.5 drop-shadow-md">
                      Watch RB Masterclasses
                    </span>
                  </div>

                  {/* Bottom-Left Badges: Let Ur Body Speak & Guru Yuvraaj */}
                  <div className="absolute bottom-5 left-5 z-10 flex flex-wrap items-center gap-2.5">
                    <span className="px-3.5 py-1.5 rounded-full bg-black/70 backdrop-blur-md text-white text-xs sm:text-sm font-bold border border-white/15 shadow-lg">
                      &ldquo;Let Ur Body Speak&rdquo;
                    </span>
                    <span className="text-white/90 text-xs sm:text-sm font-medium drop-shadow-sm">
                      Guru Yuvraaj Jayakumar
                    </span>
                  </div>
                </>
              )}
            </div>

            {/* Right: Guru Yuvraaj & Dance Partner Seamless Showcase (No Box / No Card Frame) */}
            <div className="lg:col-span-5 flex items-end justify-center relative group w-full pt-4 lg:pt-0">
              <img
                src={pairRbImg}
                alt="Guru Yuvraaj Jayakumar & Dance Partner - Rhythmic Beat Dance Court"
                className="w-full max-w-[340px] xs:max-w-[400px] sm:max-w-[460px] md:max-w-[500px] lg:max-w-[540px] xl:max-w-[580px] h-auto max-h-[500px] sm:max-h-[560px] lg:max-h-[560px] xl:max-h-[620px] object-contain object-bottom drop-shadow-[0_25px_45px_rgba(0,0,0,0.18)] transition-transform duration-500 group-hover:scale-[1.02]"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* FRANCHISE ENQUIRY CUSTOM MODAL */}
      {/* ========================================================= */}
      <FranchiseEnquiryModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        initialFormat={selectedFormat}
      />
    </div>
  );
};

export default FranchisePage;
