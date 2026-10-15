import {
  ArrowLeft,
  Sparkles,
  Users,
  Award,
  Heart,
  Target,
  Flame,
  ArrowRight
} from 'lucide-react';
import storyHeroImg from '../assets/Our-Story-1.jpg';
import story2Img from '../assets/Our-Story-2.jpg';

export const AboutUsPage = ({ onNavigate }) => {
  return (
    <div className="min-h-screen w-full overflow-x-hidden min-w-0 bg-[#FAF9F5] text-[#10203A] selection:bg-[#EAF1FB] selection:text-[#10203A]">
      {/* Hero / Header Section */}
      <section
        id="about-hero"
        className="relative w-full pt-28 xs:pt-32 sm:pt-36 pb-12 sm:pb-16 lg:pb-20 border-b border-[rgba(16,32,58,0.08)]"
        aria-label="About Us Introduction"
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

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 items-center">
            <div className="lg:col-span-7">
              <div className="flex items-center gap-2 mb-3">
                <span className="w-2 h-2 rounded-full bg-[#F28C1E] shrink-0" />
                <span className="text-[10px] xs:text-[11px] font-semibold text-[#10203A] uppercase tracking-[0.14em]">
                  Legacy & Heritage • Founded by Guru Yuvraaj Jayakumar
                </span>
              </div>
              <h1 className="font-display font-extrabold text-3xl xs:text-4xl sm:text-6xl text-[#10203A] tracking-[-0.03em] leading-[1.1]">
                About Us
              </h1>
              <p className="mt-4 sm:mt-6 text-sm sm:text-base lg:text-lg text-[#4A5B78] max-w-2xl leading-relaxed">
                Rhythmic Beat Dance Court (RBDC) was founded with a singular conviction: dance is not merely a sequence of steps, but an authentic language of soul and discipline. From classical finesse to cinematic dynamism, we nurture performers across generations.
              </p>
              <div className="mt-6 flex flex-wrap items-center gap-3">
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-[#ECE7DC] text-xs font-medium text-[#10203A]">
                  <Award className="w-3.5 h-3.5 text-[#F28C1E]" />
                  15+ Years of Artistic Excellence
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-[#ECE7DC] text-xs font-medium text-[#10203A]">
                  <Users className="w-3.5 h-3.5 text-[#1E5BB8]" />
                  10,000+ Dancers Mentored
                </span>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="relative rounded-3xl overflow-hidden border border-[#ECE7DC] shadow-md bg-white">
                <img
                  src={storyHeroImg}
                  alt="Guru Yuvraaj Jayakumar and RBDC dancers"
                  className="w-full h-[260px] sm:h-[320px] object-cover"
                />
                <div className="p-5 bg-white">
                  <p className="text-xs uppercase tracking-widest font-semibold text-[#F28C1E]">
                    Artistic Vision
                  </p>
                  <p className="font-display font-bold text-lg text-[#10203A] mt-1">
                    "Let ur body speak"
                  </p>
                  <p className="text-xs text-[#71717A] mt-1">
                    Fostering artistic authenticity and emotional depth in every movement.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values / Philosophy Grid */}
      <section className="py-14 sm:py-20 max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16">
        <div className="mb-10 text-center max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-[#ECE7DC] text-[11px] font-semibold text-[#10203A] uppercase tracking-[0.14em] mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[#F28C1E]" />
            <span>Our Foundation</span>
          </div>
          <h2 className="font-display font-bold text-2xl sm:text-4xl text-[#10203A] tracking-tight">
            The Pillars of Rhythmic Beat
          </h2>
          <p className="mt-3 text-sm text-[#4A5B78]">
            Detailed faculty profiles, student testimonials, and historical milestones are currently being organized for this section.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-3xl p-7 border border-[#ECE7DC] shadow-xs flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-2xl bg-[#FFF6EE] border border-[#F28C1E]/20 flex items-center justify-center text-[#F28C1E] mb-5">
                <Heart className="w-5 h-5" />
              </div>
              <h3 className="font-display font-bold text-xl text-[#10203A] mb-2">
                Authentic Passion
              </h3>
              <p className="text-sm text-[#4A5B78] leading-relaxed">
                We believe rhythm is inherent in everyone. Our instructors nurture individual expression rather than forcing rigid conformity.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-[#F2EFE8] flex items-center justify-between text-xs text-[#71717A]">
              <span>Inclusive Pedagogy</span>
              <span className="font-semibold text-[#F28C1E]">Core Value 01</span>
            </div>
          </div>

          <div className="bg-white rounded-3xl p-7 border border-[#ECE7DC] shadow-xs flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-2xl bg-[#EEF4FF] border border-[#1E5BB8]/20 flex items-center justify-center text-[#1E5BB8] mb-5">
                <Target className="w-5 h-5" />
              </div>
              <h3 className="font-display font-bold text-xl text-[#10203A] mb-2">
                Technical Discipline
              </h3>
              <p className="text-sm text-[#4A5B78] leading-relaxed">
                From precision mudras to acrobatic leaps, our progressive syllabus instills anatomical awareness and physical endurance.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-[#F2EFE8] flex items-center justify-between text-xs text-[#71717A]">
              <span>Anatomy & Form</span>
              <span className="font-semibold text-[#1E5BB8]">Core Value 02</span>
            </div>
          </div>

          <div className="bg-white rounded-3xl p-7 border border-[#ECE7DC] shadow-xs flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-2xl bg-[#FFF3EE] border border-[#F28C1E]/20 flex items-center justify-center text-[#F28C1E] mb-5">
                <Flame className="w-5 h-5" />
              </div>
              <h3 className="font-display font-bold text-xl text-[#10203A] mb-2">
                Stage Readiness
              </h3>
              <p className="text-sm text-[#4A5B78] leading-relaxed">
                Beyond studio mirrors, we train dancers for the spotlight—reels, national stages, television broadcasts, and competitive arenas.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-[#F2EFE8] flex items-center justify-between text-xs text-[#71717A]">
              <span>Real Performance</span>
              <span className="font-semibold text-[#F28C1E]">Core Value 03</span>
            </div>
          </div>
        </div>

        {/* Placeholder Information Notice */}
        <div className="mt-12 p-6 rounded-2xl bg-white border border-dashed border-[#1E5BB8]/30 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="w-3 h-3 rounded-full bg-[#1E5BB8] animate-pulse" />
            <p className="text-xs sm:text-sm text-[#4A5B78]">
              <strong className="text-[#10203A]">Page Structure Initialized:</strong> Detailed instructor biographies, academy timeline, and philosophy editorial are scheduled for sequential content updates.
            </p>
          </div>
          <button
            type="button"
            onClick={() => onNavigate('/courses')}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold bg-[#10203A] text-white hover:bg-black transition-colors shrink-0 cursor-pointer"
          >
            <span>Explore Courses</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </section>
    </div>
  );
};
