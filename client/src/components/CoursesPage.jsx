import {
  ArrowLeft,
  Sparkles,
  BookOpen,
  Music,
  Zap,
  Smile,
  CheckCircle2,
  Calendar,
  ArrowRight
} from 'lucide-react';
import semiclassicalImg from '../assets/poster-semiclassical.webp';
import juniorImg from '../assets/poster-nallaru-poo.webp';
import contemporaryImg from '../assets/poster-vaada-vaada.webp';
import hiphopImg from '../assets/poster-pesama.webp';

export const CoursesPage = ({ onNavigate }) => {
  const courses = [
    {
      id: 'semiclassical',
      title: 'Semiclassical & Indian Fusion',
      instructor: 'Guru Yuvraaj Jayakumar',
      level: 'All Levels (Beginner to Advanced)',
      description: 'Lyrical storytelling, emotive abhinaya, and fast rhythmic footwork blending Indian classical traditions with modern rhythm.',
      image: semiclassicalImg,
      tags: ['Mudras', 'Footwork', 'Expression', 'Fusion'],
    },
    {
      id: 'contemporary',
      title: 'Contemporary & Western Flow',
      instructor: 'Senior Faculty Instructors',
      level: 'Intermediate & Advanced',
      description: 'Dynamic floor work, release technique, spatial awareness, and acrobatic fluidity designed for theatrical dance.',
      image: contemporaryImg,
      tags: ['Floorwork', 'Fluidity', 'Flexibility', 'Stage'],
    },
    {
      id: 'hiphop',
      title: 'Urban Street & Hip-Hop',
      instructor: 'Street Ensemble Mentors',
      level: 'Beginner & Open Styles',
      description: 'Isolations, grooves, popping, locking, and contemporary urban choreography suitable for reels, crews, and battles.',
      image: hiphopImg,
      tags: ['Grooves', 'Isolations', 'Freestyle', 'Energy'],
    },
    {
      id: 'junior',
      title: 'Junior Rhythm & Kids Batches',
      instructor: 'Specialized Child Mentors',
      level: 'Ages 4 to 12',
      description: 'Fun-filled rhythmic training focusing on posture, coordination, musical ear development, and foundational confidence.',
      image: juniorImg,
      tags: ['Coordination', 'Ear Training', 'Fun', 'Confidence'],
    },
  ];

  return (
    <div className="min-h-screen w-full overflow-x-hidden min-w-0 bg-[#FAF9F5] text-[#10203A] selection:bg-[#EAF1FB] selection:text-[#10203A]">
      {/* Hero / Header Section */}
      <section
        id="courses-hero"
        className="relative w-full pt-28 xs:pt-32 sm:pt-36 pb-12 sm:pb-16 border-b border-[rgba(16,32,58,0.08)]"
        aria-label="Courses Introduction"
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
                Structured Training • Chennai & Puducherry Studios
              </span>
            </div>
            <h1 className="font-display font-extrabold text-3xl xs:text-4xl sm:text-6xl text-[#10203A] tracking-[-0.03em] leading-[1.1]">
              Courses & Disciplines
            </h1>
            <p className="mt-4 sm:mt-6 text-sm sm:text-base lg:text-lg text-[#4A5B78] leading-relaxed">
              Whether you are taking your first steps or preparing for professional stage performances, our multi-tiered curriculum provides foundational discipline and artistic excellence.
            </p>
          </div>
        </div>
      </section>

      {/* Courses Grid */}
      <section className="py-14 sm:py-20 max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {courses.map((course) => (
            <div
              key={course.id}
              className="bg-white rounded-3xl overflow-hidden border border-[#ECE7DC] shadow-xs flex flex-col justify-between group hover:shadow-md transition-shadow"
            >
              <div className="relative h-[220px] sm:h-[260px] overflow-hidden bg-[#10203A]">
                <img
                  src={course.image}
                  alt={course.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90"
                />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 rounded-full text-[11px] font-semibold uppercase tracking-wider bg-white/90 backdrop-blur-md text-[#10203A] shadow-xs">
                    {course.level}
                  </span>
                </div>
              </div>

              <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-[#F28C1E] uppercase tracking-wider mb-2">
                    <BookOpen className="w-3.5 h-3.5" />
                    <span>{course.instructor}</span>
                  </div>
                  <h2 className="font-display font-bold text-xl sm:text-2xl text-[#10203A] mb-3">
                    {course.title}
                  </h2>
                  <p className="text-sm text-[#4A5B78] leading-relaxed mb-5">
                    {course.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {course.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2.5 py-1 rounded-md text-xs font-medium bg-[#FAF9F5] border border-[#ECE7DC] text-[#71717A]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-[#F2EFE8] flex items-center justify-between">
                  <span className="text-xs text-[#71717A]">Weekday & Weekend Batches</span>
                  <button
                    type="button"
                    onClick={() => onNavigate('/contact-us')}
                    className="inline-flex items-center gap-1 text-xs font-semibold text-[#1E5BB8] hover:text-[#10203A] transition-colors cursor-pointer"
                  >
                    <span>Enquire Batch</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Notice & CTA Box */}
        <div className="mt-12 p-6 sm:p-8 rounded-3xl bg-[#FFFBF5] border border-[#F28C1E]/20 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Sparkles className="w-4 h-4 text-[#F28C1E]" />
              <h3 className="font-display font-bold text-base sm:text-lg text-[#10203A]">
                Customized Curriculum & Trial Sessions
              </h3>
            </div>
            <p className="text-xs sm:text-sm text-[#4A5B78] max-w-xl">
              Course modules, batch timings, and certification paths are currently being synchronized for the upcoming term. Connect with our academy coordinators to book a studio placement trial.
            </p>
          </div>
          <button
            type="button"
            onClick={() => onNavigate('/contact-us')}
            className="px-5 py-2.5 rounded-full text-xs font-semibold bg-[#18181B] text-white hover:bg-black transition-colors shrink-0 shadow-sm cursor-pointer"
          >
            Book Free Trial Session
          </button>
        </div>
      </section>
    </div>
  );
};
