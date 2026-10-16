import {
  ArrowLeft,
  Sparkles,
  TrendingUp,
  Building,
  GraduationCap,
  ShieldAlert,
  Award,
  CheckCircle2,
  ArrowRight,
  Handshake
} from 'lucide-react';
import footerGroupImg from '../assets/dance-court-footer-group.webp';

export const FranchisePage = ({ onNavigate }) => {
  const benefits = [
    {
      icon: Award,
      title: 'Reputed Artistic Brand',
      description: 'Leverage the goodwill, industry recognition, and artistic trust established by Guru Yuvraaj Jayakumar across South India.',
    },
    {
      icon: GraduationCap,
      title: 'Certified Faculty & Training',
      description: 'Comprehensive instructor training, standardized syllabus modules, and continuous faculty upskilling directly from main court masters.',
    },
    {
      icon: Building,
      title: 'Turnkey Studio Setup Guidance',
      description: 'Complete architectural specifications for sprung floors, acoustic dampening, mirror alignment, lighting, and sound configuration.',
    },
    {
      icon: TrendingUp,
      title: 'Multi-Stream Revenue Model',
      description: 'Consistent earnings through regular weekly batches, celebrity masterclasses, private lessons, summer camps, and annual showcases.',
    },
  ];

  return (
    <div className="min-h-screen w-full overflow-x-hidden min-w-0 bg-[#F1F3F5] text-[#222222] selection:bg-[#145A96]/20 selection:text-[#222222]">
      {/* Hero / Header Section */}
      <section
        id="franchise-hero"
        className="relative w-full pt-28 xs:pt-32 sm:pt-36 pb-12 sm:pb-16 border-b border-[rgba(34,34,34,0.08)]"
        aria-label="Franchise Introduction"
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
                  Partner with RBDC • Expand the Movement
                </span>
              </div>
              <h1 className="font-display font-extrabold text-3xl xs:text-4xl sm:text-6xl text-[#145A96] tracking-[-0.03em] leading-[1.1]">
                Franchise Opportunities
              </h1>
              <p className="mt-4 sm:mt-6 text-sm sm:text-base lg:text-lg text-[#222222]/75 max-w-2xl leading-relaxed">
                Empower dancers in your city. Partner with Rhythmic Beat Dance Court to establish a premier dance center backed by our proven pedagogy, operational blueprints, and celebrity masterclass network.
              </p>
              <div className="mt-6 flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={() => onNavigate('/contact-us')}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-semibold bg-[#145A96] text-white hover:bg-[#145A96]/90 transition-colors shadow-sm cursor-pointer"
                >
                  <Handshake className="w-4 h-4 text-[#F28C28]" />
                  <span>Request Franchise Prospectus</span>
                </button>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="rounded-3xl overflow-hidden border border-[rgba(34,34,34,0.12)] shadow-md bg-white">
                <img
                  src={footerGroupImg}
                  alt="RBDC Academy Community"
                  className="w-full h-[240px] sm:h-[300px] object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Franchise Benefits Grid */}
      <section className="py-14 sm:py-20 max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16">
        <div className="mb-10 text-center max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-[rgba(34,34,34,0.12)] text-[11px] font-semibold text-[#222222] uppercase tracking-[0.14em] mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[#F28C28]" />
            <span>Partnership Advantages</span>
          </div>
          <h2 className="font-display font-bold text-2xl sm:text-4xl text-[#145A96] tracking-tight">
            Why Partner with Rhythmic Beat?
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {benefits.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className="bg-white rounded-3xl p-7 border border-[rgba(34,34,34,0.12)] shadow-xs flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-[#F1F3F5] border border-[rgba(34,34,34,0.12)] flex items-center justify-center text-[#145A96] mb-5">
                    <Icon className="w-6 h-6 text-[#145A96]" />
                  </div>
                  <h3 className="font-display font-bold text-xl text-[#145A96] mb-2">
                    {item.title}
                  </h3>
                  <p className="text-sm text-[#222222]/75 leading-relaxed">
                    {item.description}
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-[rgba(34,34,34,0.08)] flex items-center justify-between text-xs text-[#222222]/60">
                  <span>Pillar 0{index + 1}</span>
                  <span className="font-semibold text-[#F28C28]">Full Operational Support</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Informational Placeholder Notice */}
        <div className="mt-12 p-6 sm:p-8 rounded-3xl bg-white border border-[rgba(34,34,34,0.12)] flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="font-display font-bold text-base sm:text-lg text-[#145A96]">
              Detailed Investment Prospectus
            </h3>
            <p className="text-xs sm:text-sm text-[#222222]/75 mt-1 max-w-xl">
              Financial models, territorial exclusivity criteria, and space requirements will be detailed in the upcoming franchise portal release. Connect with our leadership team for initial consultations.
            </p>
          </div>
          <button
            type="button"
            onClick={() => onNavigate('/contact-us')}
            className="px-5 py-2.5 rounded-full text-xs font-semibold bg-[#145A96] text-white hover:bg-[#145A96]/90 transition-colors shrink-0 shadow-sm cursor-pointer"
          >
            Connect with Management
          </button>
        </div>
      </section>
    </div>
  );
};
