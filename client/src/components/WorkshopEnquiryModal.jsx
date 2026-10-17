import { useState } from 'react';
import { X, Check, MapPin, Laptop, Sparkles, MessageSquare, Calendar, Clock } from 'lucide-react';

// Discipline Logo Watermarks
import yogaLogo from '../assets/disciplines/yoga-hd.svg';
import westernLogo from '../assets/disciplines/westerndance-hd.svg';
import bharatanatyamLogo from '../assets/disciplines/bharatanatyam-hd.svg';
import aerialLogo from '../assets/disciplines/aerialyoga-hd.svg';
import zumbaLogo from '../assets/disciplines/zumba-hd.svg';
import gymnasticsLogo from '../assets/disciplines/gymnastics-hd.svg';
import bungeeLogo from '../assets/disciplines/bungeeworkout-hd.svg';
import kalaripayattuLogo from '../assets/disciplines/kalaripayattu-hd.svg';

export const WorkshopEnquiryModal = ({
  isOpen,
  onClose,
  workshop,
}) => {
  const allCourses = [
    'Western Dance',
    'Bharatanatyam',
    'Zumba',
    'Yoga',
    'Aerial Yoga',
    'Bungee Workout',
    'Gymnastics',
    'Kalaripayattu',
    'Animal Flow',
    'Workshops',
  ];

  const [fullName, setFullName] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [email, setEmail] = useState('');
  const [selectedCourses, setSelectedCourses] = useState(['Workshops']);
  const [trainingMode, setTrainingMode] = useState('Offline'); // 'Offline' | 'Online'
  const [preferredLocation, setPreferredLocation] = useState('Valasaravakkam');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  // Select discipline logo based on workshop
  const getDisciplineLogo = () => {
    if (!workshop) return westernLogo;
    const cat = (workshop.category || '').toLowerCase();
    const t = (workshop.title || '').toLowerCase();
    const inst = (workshop.instructor || '').toLowerCase();

    if (cat.includes('wellness') || t.includes('sound') || t.includes('yoga') || cat.includes('yoga')) return yogaLogo;
    if (cat.includes('semiclassical') || t.includes('classical') || t.includes('bharatam') || t.includes('pavithra') || inst.includes('pavithra')) return bharatanatyamLogo;
    if (cat.includes('aerial') || t.includes('silk') || t.includes('aerial') || inst.includes('ishwarya')) return aerialLogo;
    if (cat.includes('zumba') || t.includes('zumba')) return zumbaLogo;
    if (cat.includes('gymnastics') || t.includes('gymnastic')) return gymnasticsLogo;
    if (cat.includes('bungee') || t.includes('bungee')) return bungeeLogo;
    if (cat.includes('kalaripayattu') || t.includes('kalari')) return kalaripayattuLogo;
    return westernLogo;
  };

  const disciplineLogo = getDisciplineLogo();

  const toggleCourse = (course) => {
    setSelectedCourses((prev) =>
      prev.includes(course)
        ? prev.filter((c) => c !== course)
        : [...prev, course]
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!fullName.trim() || !mobileNumber.trim()) {
      alert('Please enter your full name and mobile number.');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 600);
  };

  const handleClose = () => {
    setIsSubmitted(false);
    onClose();
  };

  const workshopTitle = workshop
    ? `ENQUIRE: ${workshop.title} (${(workshop.instructorDisplay || workshop.instructor || '').toUpperCase()})`
    : 'ENQUIRE: RHYTHMIC BEAT DANCE COURT';

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 md:p-6 bg-black/65 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={handleClose}
    >
      <div
        className="relative w-full max-w-[780px] sm:max-w-[820px] bg-white rounded-[2rem] sm:rounded-[2.25rem] shadow-2xl border border-black/10 text-[#111111] animate-in zoom-in-95 duration-200 max-h-[92vh] flex flex-col overflow-hidden no-scrollbar scrollbar-none"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Discipline Logo Watermark in Background */}
        <div className="absolute -right-10 -bottom-10 w-80 h-80 sm:w-96 sm:h-96 md:w-[460px] md:h-[460px] pointer-events-none select-none overflow-hidden flex items-center justify-center z-0">
          <img
            src={disciplineLogo}
            alt="Discipline Watermark"
            className="w-full h-full object-contain brightness-0 opacity-[0.08] sm:opacity-[0.10] select-none pointer-events-none"
          />
        </div>

        {/* Floating Close Button Top Right */}
        <button
          type="button"
          onClick={handleClose}
          aria-label="Close"
          className="absolute top-4 right-4 sm:top-5 sm:right-5 w-8 h-8 rounded-full bg-black/5 hover:bg-black/10 flex items-center justify-center text-black/70 hover:text-black transition-colors z-30 cursor-pointer shadow-xs"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Scrollable Modal Content with Scrollbars Completely Hidden */}
        <div
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          className="relative z-10 p-6 sm:p-8 md:p-9 overflow-y-auto overscroll-contain no-scrollbar scrollbar-none [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
        >
          {isSubmitted ? (
            /* Success State with Workshop / Academy Visual */
            <div className="text-center py-6 space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center shadow-inner">
                <Check className="w-8 h-8 stroke-[3]" />
              </div>

              <div>
                <span className="text-[11px] font-bold text-emerald-700 tracking-wider uppercase">
                  Enquiry Received
                </span>
                <h3 className="font-display font-black text-2xl sm:text-3xl text-[#145A96] mt-1">
                  Thank You, {fullName}!
                </h3>
                <p className="text-xs sm:text-sm text-black/70 mt-2 max-w-sm mx-auto leading-relaxed">
                  Our admissions and workshop team will call you back on{' '}
                  <strong className="text-black">{mobileNumber}</strong> shortly.
                </p>
              </div>

              {/* Booking / Enquiry Summary with Workshop Poster Image */}
              <div className="bg-[#F8F9FA] rounded-2xl p-4 sm:p-5 border border-black/5 flex items-center gap-4 text-left text-xs max-w-md mx-auto">
                {workshop?.image && (
                  <div className="w-16 h-20 sm:w-20 sm:h-24 rounded-xl overflow-hidden shrink-0 shadow-xs border border-black/10 bg-black/5">
                    <img
                      src={workshop.image}
                      alt={workshop.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                <div className="flex-1 min-w-0 space-y-1">
                  <span className="font-bold text-black block truncate text-sm">
                    {workshop?.title || 'RBDC Classes'}
                  </span>
                  <div className="text-[11px] text-black/60 flex items-center gap-1.5">
                    <MapPin className="w-3 h-3 text-[#145A96]" />
                    <span>{preferredLocation} ({trainingMode})</span>
                  </div>
                  <div className="text-[11px] text-[#145A96] font-medium truncate">
                    {selectedCourses.join(', ')}
                  </div>
                </div>
              </div>

              <div className="pt-3 flex flex-col sm:flex-row items-center gap-3 justify-center">
                <a
                  href={`https://wa.me/919655551055?text=${encodeURIComponent(
                    `Hi RBDC, I submitted an enquiry for ${workshop?.title || 'classes'}. My name is ${fullName}.`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto py-2.5 px-6 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs transition-colors flex items-center justify-center gap-2"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  Chat on WhatsApp
                </a>
                <button
                  type="button"
                  onClick={handleClose}
                  className="w-full sm:w-auto py-2.5 px-6 rounded-full bg-[#18181B] hover:bg-black text-white font-semibold text-xs transition-colors cursor-pointer"
                >
                  Done
                </button>
              </div>
            </div>
          ) : (
            /* Main Form */
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Top Tagline */}
              <div className="flex items-center gap-2 select-none">
                <span className="w-5 h-[2.5px] bg-[#F28C28]" />
                <span className="text-[11px] sm:text-xs font-bold uppercase tracking-[0.16em] text-[#F28C28]">
                  ENQUIRY
                </span>
              </div>

              {/* Title Header */}
              <h2 className="font-display font-extrabold text-xl sm:text-2xl text-[#145A96] tracking-tight leading-tight uppercase pr-8">
                {workshopTitle}
              </h2>

              {/* Workshop Preview Image Card (High visual appeal) */}
              {workshop?.image && (
                <div className="flex items-center gap-4 p-3.5 sm:p-4 rounded-2xl bg-[#F8F9FA] border border-black/8 shadow-2xs">
                  <div className="w-16 h-20 sm:w-20 sm:h-24 rounded-xl overflow-hidden shrink-0 shadow-xs border border-black/10 bg-black/5">
                    <img
                      src={workshop.image}
                      alt={workshop.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="text-[10px] sm:text-[11px] font-bold tracking-wider text-[#F28C28] uppercase block mb-0.5">
                      {workshop.category} • {workshop.instructorDisplay || workshop.instructor}
                    </span>
                    <h4 className="font-display font-extrabold text-sm sm:text-base text-[#111111] leading-snug line-clamp-2">
                      {workshop.title}
                    </h4>
                    <div className="flex flex-wrap items-center gap-2 text-[11px] text-black/60 font-medium mt-1">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3 text-[#145A96]" />
                        {workshop.date}
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3 text-[#145A96]" />
                        {workshop.time}
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* Row 1: Full name & Mobile number (2 Columns) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-black mb-1.5">
                    Full name
                  </label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder=""
                    className="w-full px-4 py-2.5 rounded-xl border border-black/15 bg-white text-xs sm:text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#145A96] focus:border-transparent transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-black mb-1.5">
                    Mobile number
                  </label>
                  <input
                    type="tel"
                    required
                    value={mobileNumber}
                    onChange={(e) => setMobileNumber(e.target.value)}
                    placeholder="10-digit mobile"
                    className="w-full px-4 py-2.5 rounded-xl border border-black/15 bg-white text-xs sm:text-sm font-medium placeholder:text-black/40 focus:outline-none focus:ring-2 focus:ring-[#145A96] focus:border-transparent transition-all"
                  />
                </div>
              </div>

              {/* Row 2: Email */}
              <div>
                <label className="block text-xs font-bold text-black mb-1.5">
                  Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full px-4 py-2.5 rounded-xl border border-black/15 bg-white text-xs sm:text-sm font-medium placeholder:text-black/40 focus:outline-none focus:ring-2 focus:ring-[#145A96] focus:border-transparent transition-all"
                />
              </div>

              {/* Courses you're looking for (Multi-select pill tags) */}
              <div>
                <label className="block text-xs font-bold text-black mb-2">
                  Courses you&apos;re looking for
                </label>
                <div
                  style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                  className="flex flex-wrap gap-2 no-scrollbar scrollbar-none"
                >
                  {allCourses.map((course) => {
                    const isSelected = selectedCourses.includes(course);
                    return (
                      <button
                        key={course}
                        type="button"
                        onClick={() => toggleCourse(course)}
                        className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-[#145A96] text-white shadow-xs font-semibold'
                            : 'bg-white hover:bg-black/5 text-black/80 border border-black/15'
                        }`}
                      >
                        {course}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* How would you like to train? (2 option cards) */}
              <div>
                <label className="block text-xs font-bold text-black mb-2">
                  How would you like to train?
                </label>
                <div className="grid grid-cols-2 gap-3 sm:gap-4">
                  {/* Offline Card */}
                  <button
                    type="button"
                    onClick={() => setTrainingMode('Offline')}
                    className={`p-4 rounded-2xl text-left border-2 transition-all cursor-pointer flex items-start gap-3 ${
                      trainingMode === 'Offline'
                        ? 'border-[#145A96] bg-blue-50/40 shadow-xs'
                        : 'border-black/10 hover:border-black/20 bg-white'
                    }`}
                  >
                    <span className="w-8 h-8 rounded-xl bg-[#145A96]/10 text-[#145A96] flex items-center justify-center shrink-0 mt-0.5">
                      <MapPin className="w-4 h-4" />
                    </span>
                    <div>
                      <span className="font-bold text-xs sm:text-sm text-black block mb-0.5">
                        Offline
                      </span>
                      <span className="text-[11px] text-black/60 block">
                        At a court near you
                      </span>
                    </div>
                  </button>

                  {/* Online Card */}
                  <button
                    type="button"
                    onClick={() => setTrainingMode('Online')}
                    className={`p-4 rounded-2xl text-left border-2 transition-all cursor-pointer flex items-start gap-3 ${
                      trainingMode === 'Online'
                        ? 'border-[#145A96] bg-blue-50/40 shadow-xs'
                        : 'border-black/10 hover:border-black/20 bg-white'
                    }`}
                  >
                    <span className="w-8 h-8 rounded-xl bg-[#145A96]/10 text-[#145A96] flex items-center justify-center shrink-0 mt-0.5">
                      <Laptop className="w-4 h-4" />
                    </span>
                    <div>
                      <span className="font-bold text-xs sm:text-sm text-black block mb-0.5">
                        Online
                      </span>
                      <span className="text-[11px] text-black/60 block">
                        Live from home
                      </span>
                    </div>
                  </button>
                </div>
              </div>

              {/* Preferred location */}
              <div>
                <label className="block text-xs font-bold text-black mb-1.5">
                  Preferred location
                </label>
                <div className="relative">
                  <select
                    value={preferredLocation}
                    onChange={(e) => setPreferredLocation(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-black/15 bg-white text-xs sm:text-sm font-semibold text-black focus:outline-none focus:ring-2 focus:ring-[#145A96] cursor-pointer appearance-none"
                  >
                    <option value="Valasaravakkam">Valasaravakkam</option>
                    <option value="Kolapakkam">Kolapakkam</option>
                    <option value="Ambattur">Ambattur</option>
                    <option value="Pondicherry">Pondicherry</option>
                  </select>
                  <div className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-black/50 text-xs">
                    ▼
                  </div>
                </div>
              </div>

              {/* Request a call back Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 px-6 rounded-2xl bg-[#F28C28] hover:bg-[#E07A18] text-white font-bold text-sm tracking-wide shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 mt-2"
              >
                {isSubmitting ? (
                  <span>Submitting...</span>
                ) : (
                  <span>Request a call back</span>
                )}
              </button>

              {/* Footer Trust Note */}
              <p className="text-[11px] text-center text-black/50 pt-1">
                We&apos;ll only use your details to contact you about RB classes.
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default WorkshopEnquiryModal;
