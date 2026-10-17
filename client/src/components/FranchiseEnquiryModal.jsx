import { useState } from 'react';
import { X, Check, MapPin, Building, Phone, Mail, User, Sparkles, MessageSquare } from 'lucide-react';

export const FranchiseEnquiryModal = ({
  isOpen,
  onClose,
  initialFormat = 'Foundation Studio',
}) => {
  const formats = [
    { id: 'Foundation Studio', label: 'Format 1: Foundation Studio' },
    { id: 'Signature Studio', label: 'Format 2: Signature Studio' },
    { id: 'Platinum Hub', label: 'Format 3: Platinum Hub' },
    { id: 'Open to Discussion', label: 'Exploring / Open to Discussion' },
  ];

  const backgrounds = [
    'Dance / Fitness Professional',
    'Studio / Gym Owner',
    'Entrepreneur / Business Owner',
    'Investor',
    'Other',
  ];

  const [fullName, setFullName] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [email, setEmail] = useState('');
  const [city, setCity] = useState('');
  const [selectedFormat, setSelectedFormat] = useState(initialFormat);
  const [background, setBackground] = useState('Dance / Fitness Professional');
  const [notes, setNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!fullName.trim() || !mobileNumber.trim() || !city.trim()) {
      alert('Please fill in your name, mobile number, and target city.');
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

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 md:p-6 bg-black/65 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={handleClose}
      aria-modal="true"
      role="dialog"
    >
      <div
        className="relative w-full max-w-[720px] bg-white rounded-[2rem] sm:rounded-[2.25rem] shadow-2xl border border-black/10 text-[#111111] animate-in zoom-in-95 duration-200 max-h-[92vh] flex flex-col overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Strip */}
        <div className="bg-[#145A96] text-white px-5 sm:px-7 py-4 sm:py-5 flex items-center justify-between border-b border-white/10 shrink-0">
          <div className="flex items-center gap-2.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#F28C28] animate-pulse" />
            <div>
              <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-widest text-white/80 block">
                Franchise Partnership
              </span>
              <h3 className="font-display font-bold text-base sm:text-lg text-white leading-tight">
                Request Franchise Details
              </h3>
            </div>
          </div>

          <button
            type="button"
            onClick={handleClose}
            aria-label="Close Modal"
            className="w-8 h-8 rounded-full bg-white/15 hover:bg-white/25 text-white flex items-center justify-center transition-all cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-5 sm:p-7 md:p-8 overflow-y-auto max-h-[calc(92vh-80px)]">
          {isSubmitted ? (
            /* Success State */
            <div className="text-center py-8 sm:py-10 space-y-5">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-sm">
                <Check className="w-8 h-8 stroke-[3]" />
              </div>

              <div>
                <h4 className="font-display font-bold text-2xl sm:text-3xl text-[#145A96] mb-2">
                  Enquiry Submitted Successfully!
                </h4>
                <p className="text-sm text-[#444444] max-w-md mx-auto leading-relaxed">
                  Thank you, <span className="font-semibold text-black">{fullName}</span>. Our franchise leadership team has received your enquiry for{' '}
                  <span className="font-semibold text-[#145A96]">{city}</span> ({selectedFormat}) and will contact you within 24 hours.
                </p>
              </div>

              {/* Direct Contact Pills */}
              <div className="pt-3 flex flex-wrap items-center justify-center gap-3">
                <a
                  href="tel:+919655551055"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#145A96] text-white text-xs font-semibold hover:bg-[#0E4273] transition-all shadow-sm"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>Call Franchise Hotline</span>
                </a>
                <a
                  href="https://wa.me/919655551055?text=Hi%2C%20I%20am%20interested%20in%20a%20Rhythmic%20Beat%20Dance%20Court%20franchise."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-emerald-600 text-white text-xs font-semibold hover:bg-emerald-700 transition-all shadow-sm"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>WhatsApp Us</span>
                </a>
              </div>

              <div className="pt-4">
                <button
                  type="button"
                  onClick={handleClose}
                  className="text-xs font-medium text-[#71717A] hover:text-black underline cursor-pointer"
                >
                  Close Window
                </button>
              </div>
            </div>
          ) : (
            /* Main Form */
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Intro Tagline */}
              <p className="text-xs sm:text-sm text-[#555555] leading-relaxed">
                Partner with a dance and fitness brand established in 2003 with certified systems, curriculum, and ongoing support.
              </p>

              {/* Row 1: Full Name & Mobile */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-black mb-1.5">
                    Full Name <span className="text-[#F28C28]">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="Your full name"
                      className="w-full px-4 py-2.5 rounded-xl border border-black/15 bg-white text-xs sm:text-sm font-medium placeholder:text-black/35 focus:outline-none focus:ring-2 focus:ring-[#145A96] focus:border-transparent transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-black mb-1.5">
                    Mobile Number <span className="text-[#F28C28]">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    value={mobileNumber}
                    onChange={(e) => setMobileNumber(e.target.value)}
                    placeholder="10-digit mobile number"
                    className="w-full px-4 py-2.5 rounded-xl border border-black/15 bg-white text-xs sm:text-sm font-medium placeholder:text-black/35 focus:outline-none focus:ring-2 focus:ring-[#145A96] focus:border-transparent transition-all"
                  />
                </div>
              </div>

              {/* Row 2: Email & Target City */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-black mb-1.5">
                    Email Address <span className="text-[#F28C28]">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="w-full px-4 py-2.5 rounded-xl border border-black/15 bg-white text-xs sm:text-sm font-medium placeholder:text-black/35 focus:outline-none focus:ring-2 focus:ring-[#145A96] focus:border-transparent transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-black mb-1.5">
                    Target City / Locality <span className="text-[#F28C28]">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="e.g. Chennai, Bangalore, Coimbatore"
                    className="w-full px-4 py-2.5 rounded-xl border border-black/15 bg-white text-xs sm:text-sm font-medium placeholder:text-black/35 focus:outline-none focus:ring-2 focus:ring-[#145A96] focus:border-transparent transition-all"
                  />
                </div>
              </div>

              {/* Studio Format Selection */}
              <div>
                <label className="block text-xs font-bold text-black mb-2">
                  Format of Interest
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {formats.map((fmt) => {
                    const isSelected = selectedFormat === fmt.id;
                    return (
                      <button
                        key={fmt.id}
                        type="button"
                        onClick={() => setSelectedFormat(fmt.id)}
                        className={`text-left px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all cursor-pointer border ${
                          isSelected
                            ? 'bg-[#145A96] text-white border-[#145A96] shadow-xs font-semibold'
                            : 'bg-white hover:bg-black/5 text-black/80 border-black/15'
                        }`}
                      >
                        {fmt.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Background Selection */}
              <div>
                <label className="block text-xs font-bold text-black mb-2">
                  Your Professional Background
                </label>
                <div className="flex flex-wrap gap-2">
                  {backgrounds.map((bg) => {
                    const isSelected = background === bg;
                    return (
                      <button
                        key={bg}
                        type="button"
                        onClick={() => setBackground(bg)}
                        className={`px-3.5 py-1.5 rounded-full text-xs transition-all cursor-pointer border ${
                          isSelected
                            ? 'bg-[#F28C28] text-white border-[#F28C28] font-semibold shadow-xs'
                            : 'bg-white hover:bg-black/5 text-black/80 border-black/15 font-medium'
                        }`}
                      >
                        {bg}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Optional Notes / Message */}
              <div>
                <label className="block text-xs font-bold text-black mb-1.5">
                  Additional Notes or Questions (Optional)
                </label>
                <textarea
                  rows={2}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Share details on space, timeline, or any questions..."
                  className="w-full px-4 py-2.5 rounded-xl border border-black/15 bg-white text-xs sm:text-sm font-medium placeholder:text-black/35 focus:outline-none focus:ring-2 focus:ring-[#145A96] focus:border-transparent transition-all resize-none"
                />
              </div>

              {/* Submit CTA */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 px-6 rounded-xl bg-[#F28C28] hover:bg-[#E07A18] text-white font-bold text-sm tracking-wide shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <span>Submitting Enquiry...</span>
                  ) : (
                    <>
                      <span>Submit Franchise Enquiry</span>
                      <Sparkles className="w-4 h-4" />
                    </>
                  )}
                </button>
                <p className="text-[11px] text-[#71717A] text-center mt-2">
                  We respect your privacy. No spam. A franchise manager will get in touch directly.
                </p>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
