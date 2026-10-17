import { useState, useEffect } from 'react';
import { X, Check, ShieldCheck, Calendar, Clock, MapPin, User, Phone, Mail, MessageSquare, ArrowRight, Sparkles } from 'lucide-react';

// Discipline Logo Watermarks
import yogaLogo from '../assets/disciplines/yoga-hd.svg';
import westernLogo from '../assets/disciplines/westerndance-hd.svg';
import bharatanatyamLogo from '../assets/disciplines/bharatanatyam-hd.svg';
import aerialLogo from '../assets/disciplines/aerialyoga-hd.svg';
import zumbaLogo from '../assets/disciplines/zumba-hd.svg';
import gymnasticsLogo from '../assets/disciplines/gymnastics-hd.svg';
import bungeeLogo from '../assets/disciplines/bungeeworkout-hd.svg';
import kalaripayattuLogo from '../assets/disciplines/kalaripayattu-hd.svg';

export const WorkshopPaymentModal = ({
  isOpen,
  onClose,
  workshop,
  initialParticipants = 1,
}) => {
  const [step, setStep] = useState(1); // 1: Details, 2: Payment, 3: Confirmed
  const [count, setCount] = useState(initialParticipants || 1);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    agreeTerms: true,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Sync count with initialParticipants when modal opens or initialParticipants changes
  useEffect(() => {
    if (initialParticipants) {
      setCount(initialParticipants);
    }
  }, [initialParticipants, isOpen]);

  if (!isOpen || !workshop) return null;

  // Select discipline logo based on workshop
  const getDisciplineLogo = () => {
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
  const unitPrice = workshop.pricing?.entry || workshop.pricing?.earlyBird || 699;
  const totalPrice = unitPrice * count;

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleNextStep = (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.phone.trim()) {
      alert('Please enter your full name and mobile number.');
      return;
    }
    if (!formData.agreeTerms) {
      alert('Please agree to the workshop terms to proceed.');
      return;
    }
    setStep(2);
  };

  const handleConfirmPayment = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setStep(3);
    }, 800);
  };

  const handleClose = () => {
    setStep(1);
    setIsSubmitting(false);
    onClose();
  };

  const bookingRef = `RBDC-${workshop.dayNumber || '17'}OCT-${Math.floor(1000 + Math.random() * 9000)}`;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 md:p-6 bg-black/65 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={handleClose}
    >
      <div
        className="relative w-full max-w-[780px] sm:max-w-[820px] bg-white rounded-[2rem] sm:rounded-[2.25rem] shadow-2xl border border-black/10 overflow-hidden text-[#111111] animate-in zoom-in-95 duration-200 max-h-[92vh] flex flex-col no-scrollbar scrollbar-none"
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

        {/* Top Header: Stepper & Close */}
        <div className="relative z-10 flex items-center justify-between px-6 sm:px-8 pt-6 pb-4 border-b border-black/5 bg-white/80 backdrop-blur-md">
          <div className="flex items-center gap-2 sm:gap-3 text-xs font-semibold">
            <span
              className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full transition-all ${
                step === 1
                  ? 'bg-[#F28C28] text-white shadow-xs font-bold'
                  : 'bg-black/5 text-black/60'
              }`}
            >
              <span className="w-4 h-4 rounded-full bg-white/20 flex items-center justify-center text-[10px] font-bold">
                1
              </span>
              <span>Details</span>
            </span>

            <span
              className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full transition-all ${
                step === 2
                  ? 'bg-[#F28C28] text-white shadow-xs font-bold'
                  : 'bg-black/5 text-black/60'
              }`}
            >
              <span className="w-4 h-4 rounded-full bg-white/20 flex items-center justify-center text-[10px] font-bold">
                2
              </span>
              <span>Payment</span>
            </span>

            <span
              className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full transition-all ${
                step === 3
                  ? 'bg-emerald-600 text-white shadow-xs font-bold'
                  : 'bg-black/5 text-black/60'
              }`}
            >
              <span className="w-4 h-4 rounded-full bg-white/20 flex items-center justify-center text-[10px] font-bold">
                3
              </span>
              <span>Confirmed</span>
            </span>
          </div>

          <button
            type="button"
            onClick={handleClose}
            aria-label="Close"
            className="w-8 h-8 rounded-full bg-black/5 hover:bg-black/10 flex items-center justify-center text-black/70 hover:text-black transition-colors cursor-pointer shadow-xs"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Scrollable Body with Completely Hidden Scrollbar */}
        <div
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          className="relative z-10 p-6 sm:p-8 overflow-y-auto overscroll-contain no-scrollbar scrollbar-none [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
        >
          {/* STEP 1: Details & Participants */}
          {step === 1 && (
            <form onSubmit={handleNextStep} className="space-y-6">
              {/* Workshop Title & Poster Banner */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-5 p-4 rounded-2xl bg-[#F8F9FA] border border-black/8 shadow-2xs">
                {workshop.image && (
                  <div className="w-16 h-20 sm:w-20 sm:h-24 rounded-xl overflow-hidden shrink-0 shadow-xs border border-black/10 bg-black/5">
                    <img
                      src={workshop.image}
                      alt={workshop.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <span className="text-[10px] sm:text-[11px] font-bold tracking-wider text-[#F28C28] uppercase block mb-0.5">
                    — {workshop.instructorDisplay || workshop.instructor}
                  </span>
                  <h3 className="font-display font-extrabold text-base sm:text-lg text-[#145A96] leading-snug">
                    {workshop.title}
                  </h3>
                  <div className="flex flex-wrap items-center gap-2 text-[11px] text-black/60 font-medium mt-1.5">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-[#145A96]" />
                      {workshop.dateFull || workshop.date}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3 text-[#145A96]" />
                      {workshop.time}
                    </span>
                  </div>
                </div>
              </div>

              {/* Booking Summary Box */}
              <div className="bg-[#F8F9FA] rounded-2xl p-4 sm:p-5 border border-black/5 space-y-3 text-xs">
                <div className="flex items-center justify-between text-black/70">
                  <span className="font-medium">Selected Slot:</span>
                  <span className="font-bold text-black">{workshop.date}, {workshop.time.split('–')[0]}</span>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-black/5 text-black/80">
                  <div className="flex items-center gap-3">
                    <span>{workshop.pricing?.label || 'Single entry'} × {count}</span>
                    <div className="flex items-center gap-2 bg-white px-2.5 py-1 rounded-full border border-black/10">
                      <button
                        type="button"
                        onClick={() => setCount((c) => Math.max(1, c - 1))}
                        className="w-4 h-4 rounded-full bg-black/5 flex items-center justify-center font-bold text-xs hover:bg-black/10"
                      >
                        -
                      </button>
                      <span className="font-bold text-black min-w-3 text-center">{count}</span>
                      <button
                        type="button"
                        onClick={() => setCount((c) => Math.min(5, c + 1))}
                        className="w-4 h-4 rounded-full bg-black/5 flex items-center justify-center font-bold text-xs hover:bg-black/10"
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <span className="font-semibold text-black">₹{totalPrice}</span>
                </div>

                <div className="flex items-center justify-between pt-2.5 border-t border-black/5 text-sm sm:text-base font-bold text-[#111111]">
                  <span>Total</span>
                  <span className="text-lg sm:text-xl text-[#145A96]">₹{totalPrice}</span>
                </div>
              </div>

              {/* Form Fields: 2 Columns for Name & Mobile */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-black/80 mb-1.5">
                    Name (lead participant) *
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter full name"
                    className="w-full px-4 py-2.5 rounded-xl border border-black/15 bg-white text-xs sm:text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#145A96] focus:border-transparent transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-black/80 mb-1.5">
                    Mobile number *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="10-digit mobile"
                    className="w-full px-4 py-2.5 rounded-xl border border-black/15 bg-white text-xs sm:text-sm font-medium placeholder:text-black/40 focus:outline-none focus:ring-2 focus:ring-[#145A96] focus:border-transparent transition-all"
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="block text-xs font-bold text-black/80 mb-1.5">
                  Email for your e-ticket
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  className="w-full px-4 py-2.5 rounded-xl border border-black/15 bg-white text-xs sm:text-sm font-medium placeholder:text-black/40 focus:outline-none focus:ring-2 focus:ring-[#145A96] focus:border-transparent transition-all"
                />
              </div>

              {/* Terms Checkbox */}
              <label className="flex items-start gap-2.5 text-xs text-black/70 cursor-pointer pt-1">
                <input
                  type="checkbox"
                  name="agreeTerms"
                  checked={formData.agreeTerms}
                  onChange={handleChange}
                  className="mt-0.5 w-4 h-4 rounded text-[#F28C28] focus:ring-[#F28C28] border-gray-300"
                />
                <span>
                  I agree to the workshop terms: fees are non-refundable and non-transferable.
                </span>
              </label>

              {/* Primary Submit CTA */}
              <button
                type="submit"
                className="w-full py-3.5 px-6 rounded-2xl bg-[#F28C28] hover:bg-[#E07A18] text-white font-bold text-sm tracking-wide shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Continue to payment</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          )}

          {/* STEP 2: Payment Simulator */}
          {step === 2 && (
            <div className="space-y-6">
              <div>
                <span className="text-[11px] font-bold tracking-wider text-[#F28C28] uppercase block mb-1">
                  Step 2 of 3 • Secure Payment
                </span>
                <h3 className="font-display font-extrabold text-xl sm:text-2xl text-[#145A96]">
                  Select Payment Option
                </h3>
              </div>

              <div className="bg-[#F8F9FA] rounded-2xl p-4 sm:p-5 border border-black/5 text-xs space-y-2">
                <div className="flex justify-between font-medium text-black/70">
                  <span>Participant:</span>
                  <strong className="text-black">{formData.name}</strong>
                </div>
                <div className="flex justify-between font-medium text-black/70">
                  <span>Pass:</span>
                  <span className="text-black">{count} × {workshop.title}</span>
                </div>
                <div className="flex justify-between text-sm sm:text-base font-bold text-[#145A96] pt-2.5 border-t border-black/5">
                  <span>Amount to Pay:</span>
                  <span>₹{totalPrice}</span>
                </div>
              </div>

              <div className="space-y-3">
                <label className="flex items-center justify-between p-4 rounded-2xl border-2 border-[#F28C28] bg-orange-50/40 cursor-pointer shadow-xs">
                  <div className="flex items-center gap-3.5">
                    <span className="w-4 h-4 rounded-full border-4 border-[#F28C28] bg-white" />
                    <div>
                      <p className="text-xs sm:text-sm font-bold text-black">Instant UPI / QR Code</p>
                      <p className="text-[11px] text-black/60">GPay, PhonePe, Paytm &amp; all BHIM UPI apps</p>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-emerald-700 bg-emerald-100/70 px-2.5 py-0.5 rounded-full">
                    Recommended
                  </span>
                </label>

                <label className="flex items-center justify-between p-4 rounded-2xl border border-black/10 hover:border-black/20 bg-white cursor-pointer">
                  <div className="flex items-center gap-3.5">
                    <span className="w-4 h-4 rounded-full border border-black/30 bg-white" />
                    <div>
                      <p className="text-xs sm:text-sm font-bold text-black">Credit / Debit Card &amp; NetBanking</p>
                      <p className="text-[11px] text-black/60">Visa, Mastercard, RuPay &amp; all major banks</p>
                    </div>
                  </div>
                </label>

                <label className="flex items-center justify-between p-4 rounded-2xl border border-black/10 hover:border-black/20 bg-white cursor-pointer">
                  <div className="flex items-center gap-3.5">
                    <span className="w-4 h-4 rounded-full border border-black/30 bg-white" />
                    <div>
                      <p className="text-xs sm:text-sm font-bold text-black">Pay at Studio Desk</p>
                      <p className="text-[11px] text-black/60">Confirm reservation now &amp; pay on arrival</p>
                    </div>
                  </div>
                </label>
              </div>

              <div className="flex items-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="px-5 py-3 rounded-2xl border border-black/15 text-xs font-semibold text-black/70 hover:bg-black/5 cursor-pointer"
                >
                  Back
                </button>
                <button
                  type="button"
                  onClick={handleConfirmPayment}
                  disabled={isSubmitting}
                  className="flex-1 py-3.5 px-6 rounded-2xl bg-[#F28C28] hover:bg-[#E07A18] text-white font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  {isSubmitting ? 'Securing Slot...' : `Pay ₹${totalPrice} & Confirm Slot`}
                </button>
              </div>

              <p className="text-[11px] text-center text-black/50 flex items-center justify-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                256-bit encrypted bank gateway payment
              </p>
            </div>
          )}

          {/* STEP 3: Confirmed */}
          {step === 3 && (
            <div className="text-center py-6 space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center shadow-inner">
                <Check className="w-8 h-8 stroke-[3]" />
              </div>

              <div>
                <span className="text-[11px] font-bold text-emerald-700 tracking-wider uppercase">
                  Reservation Confirmed
                </span>
                <h3 className="font-display font-black text-2xl sm:text-3xl text-[#145A96] mt-1">
                  You&apos;re Registered!
                </h3>
                <p className="text-xs sm:text-sm text-black/70 mt-2 max-w-sm mx-auto">
                  We have secured your slot for{' '}
                  <strong className="text-black">{workshop.title}</strong> with {workshop.instructorDisplay}.
                </p>
              </div>

              <div className="bg-[#F8F9FA] rounded-2xl p-4 sm:p-5 border border-black/5 text-left text-xs space-y-2.5 max-w-md mx-auto">
                <div className="flex justify-between">
                  <span className="text-black/60">Booking ID:</span>
                  <span className="font-mono font-bold text-[#145A96]">{bookingRef}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-black/60">Lead Name:</span>
                  <span className="font-bold text-black">{formData.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-black/60">Date &amp; Time:</span>
                  <span className="font-medium text-black">{workshop.dateFull}, {workshop.time}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-black/60">Venue:</span>
                  <span className="font-medium text-black">{workshop.venueName || workshop.location}</span>
                </div>
              </div>

              <div className="pt-3 flex flex-col sm:flex-row items-center gap-3 justify-center">
                <a
                  href={`https://wa.me/919655551055?text=${encodeURIComponent(
                    `Hi RBDC, I have booked my slot for ${workshop.title} (Booking ID: ${bookingRef}). Looking forward!`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto py-2.5 px-6 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs transition-colors flex items-center justify-center gap-2"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  Chat on WhatsApp (+91 96555 51055)
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
          )}
        </div>
      </div>
    </div>
  );
};

export default WorkshopPaymentModal;
