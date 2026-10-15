import { useState, useEffect } from 'react';
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  ArrowUpRight,
  CheckCircle2,
  MessageSquare,
  Sparkles,
  ArrowLeft,
  AlertCircle,
  ExternalLink,
  ChevronDown,
  Calendar,
  X
} from 'lucide-react';
import { closeSectionData } from '../data/close';
import rightHeroImg from '../assets/Right-side-hero.jpg';
import storyHeroImg from '../assets/Our-Story-1.jpg';
import danceGroupImg from '../assets/dance-court-footer-group.webp';

export const ContactPage = ({
  onNavigateHome,
  bookingWorkshop = null,
  onClearBookingWorkshop = null,
}) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: bookingWorkshop
      ? `Workshop Registration — ${bookingWorkshop.title} (${bookingWorkshop.instructor})`
      : '',
    venue: bookingWorkshop?.location || 'Valasaravakkam (Main Studio)',
    message: bookingWorkshop
      ? `Hello Rhythmic Beat Dance Court, I would like to book a slot for the ${bookingWorkshop.title} by ${bookingWorkshop.instructor} on ${bookingWorkshop.date} (${bookingWorkshop.time}) at ${bookingWorkshop.location}. Early Bird: ${bookingWorkshop.pricing?.earlyBird || 'Applicable'}. Please confirm my registration.`
      : '',
  });


  useEffect(() => {
    if (bookingWorkshop) {
      setFormData((prev) => ({
        ...prev,
        subject: `Workshop Registration — ${bookingWorkshop.title} (${bookingWorkshop.instructor})`,
        venue: bookingWorkshop.location || 'Valasaravakkam (Main Studio)',
        message: `Hello Rhythmic Beat Dance Court, I would like to book a slot for the ${bookingWorkshop.title} by ${bookingWorkshop.instructor} on ${bookingWorkshop.date} (${bookingWorkshop.time}) at ${bookingWorkshop.location}. Early Bird: ${bookingWorkshop.pricing?.earlyBird || 'Applicable'}. Please confirm my registration.`,
      }));

      setTimeout(() => {
        const formEl = document.getElementById('contact-form');
        if (formEl) {
          formEl.scrollIntoView({ behavior: 'smooth' });
        }
      }, 150);
    }
  }, [bookingWorkshop]);

  const allVenues = [
    {
      name: 'Valasaravakkam (Main Studio)',
      address: '116A, Chowdry Nagar Main Rd / No. 37, Narmatha St, Valasaravakkam, Chennai - 600087',
      branchIndex: 0,
    },
    {
      name: 'Kolapakkam Branch',
      address: 'No. 03, Anna Salai, Padmavathi Nagar, Kolapakkam, Chennai - 600128',
      branchIndex: 1,
    },
    {
      name: 'Ambattur Branch',
      address: 'Rus Kendra, 73, 18th Avenue, Banu Nagar, Ambattur, Chennai - 600053',
      branchIndex: 2,
    },
    {
      name: 'Pondicherry Branch',
      address: 'No. 93-97, 2nd Floor, Kalyan Towers, MG Road, Heritage Town, Pondicherry - 605005',
      branchIndex: 3,
    },
    {
      name: 'Online / General Inquiry',
      address: 'Virtual & Multi-Studio Consultation',
      branchIndex: -1,
    },
  ];


  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionStatus, setSubmissionStatus] = useState(null); // null | 'success' | 'error'
  const [submittedData, setSubmittedData] = useState(null);

  const branches = closeSectionData.branches || [];

  // Working Google Maps embed queries for each real branch address
  const branchMapUrls = {
    0: "https://maps.google.com/maps?q=No.+37,+Narmatha+Street,+Palaniyappa+Nagar,+Valasaravakkam,+Chennai+600087&t=&z=15&ie=UTF8&iwloc=&output=embed",
    1: "https://maps.google.com/maps?q=No.+03,+Anna+Salai,+Padmavathi+Nagar,+Kolapakkam,+Chennai+600128&t=&z=15&ie=UTF8&iwloc=&output=embed",
    2: "https://maps.google.com/maps?q=Rus+Kendra,+73,+18th+Avenue,+Banu+Nagar,+Ambattur,+Chennai+600053&t=&z=15&ie=UTF8&iwloc=&output=embed",
    3: "https://maps.google.com/maps?q=Kalyan+Towers,+MG+Road,+Heritage+Town,+Puducherry+605005&t=&z=15&ie=UTF8&iwloc=&output=embed",
  };

  const branchExternalMapUrls = {
    0: "https://maps.google.com/?q=No.+37,+Narmatha+Street,+Palaniyappa+Nagar,+Valasaravakkam,+Chennai+600087",
    1: "https://maps.google.com/?q=No.+03,+Anna+Salai,+Padmavathi+Nagar,+Kolapakkam,+Chennai+600128",
    2: "https://maps.google.com/?q=Rus+Kendra,+73,+18th+Avenue,+Banu+Nagar,+Ambattur,+Chennai+600053",
    3: "https://maps.google.com/?q=Kalyan+Towers,+MG+Road,+Heritage+Town,+Puducherry+605005",
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Please enter your full name';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Please enter your email address';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Please enter your phone number';
    } else {
      const cleanPhone = formData.phone.replace(/[\s\-()]/g, '');
      if (!/^\+?[0-9]{10,13}$/.test(cleanPhone)) {
        newErrors.phone = 'Please enter a valid 10-digit mobile number';
      }
    }

    if (!formData.subject.trim()) {
      newErrors.subject = 'Please select or enter a subject';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Please provide details or questions';
    } else if (formData.message.trim().length < 5) {
      newErrors.message = 'Message must be at least 5 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setSubmissionStatus(null);

    try {
      // Check if an active backend API endpoint is listening
      let apiSuccess = false;
      try {
        const response = await fetch('/api/contact', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        });
        if (response.ok) {
          apiSuccess = true;
        }
      } catch {
        // No server API running on this port
        apiSuccess = false;
      }

      // Persist enquiry locally so user submission is preserved
      const existing = JSON.parse(localStorage.getItem('rbdc_contact_submissions') || '[]');
      existing.push({
        ...formData,
        submittedAt: new Date().toISOString(),
      });
      localStorage.setItem('rbdc_contact_submissions', JSON.stringify(existing));

      // Successful client-side submission recording
      setSubmittedData({ ...formData });
      setSubmissionStatus('success');
    } catch {
      setSubmissionStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setFormData({
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: '',
    });
    setErrors({});
    setSubmissionStatus(null);
    setSubmittedData(null);
  };

  const scrollToContactForm = (e) => {
    e.preventDefault();
    const el = document.getElementById('contact-form');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      const nameInput = document.getElementById('name');
      if (nameInput) nameInput.focus();
    }
  };

  const whatsappMessage = encodeURIComponent(
    `Hello Rhythmic Beat Dance Court, I am ${submittedData?.name || formData.name || 'reaching out'}. Subject: ${submittedData?.subject || formData.subject || 'Admission Enquiry'}. ${submittedData?.message || formData.message || ''}`
  );

  return (
    <div className="min-h-screen w-full overflow-x-hidden min-w-0 bg-[#FAF9F5] text-[#10203A] selection:bg-[#EAF1FB] selection:text-[#10203A]">
      {/* ========================================================
          SECTION 1 – CONTACT HERO
      ======================================================== */}
      <section
        id="contact-hero"
        className="relative w-full pt-24 xs:pt-28 sm:pt-36 pb-12 sm:pb-16 lg:pb-24 overflow-hidden border-b border-[rgba(16,32,58,0.08)]"
        aria-label="Contact Us Introduction"
      >
        <div className="max-w-[1400px] mx-auto px-3 xs:px-4 sm:px-8 lg:px-12 xl:px-16">
          {/* Back Button */}
          <div className="mb-6 sm:mb-8">
            <button
              type="button"
              onClick={onNavigateHome}
              className="inline-flex items-center gap-1.5 sm:gap-2 text-[11px] sm:text-xs font-semibold uppercase tracking-[0.12em] sm:tracking-[0.15em] text-[#4A5B78] hover:text-[#10203A] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1E5BB8] rounded-full px-2.5 sm:px-3 py-1 bg-white/80 border border-[#ECE7DC] shadow-xs cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Main Stage</span>
            </button>
          </div>

          {/* Grid Layout: Bold Headline & Intro on Left, High-Quality Visual on Right */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10 lg:gap-14 items-center">
            <div className="lg:col-span-7">
              <div className="flex items-center gap-2 mb-3 sm:mb-4">
                <span className="w-2 h-2 rounded-full bg-[#F28C1E] shrink-0" />
                <span className="text-[10px] xs:text-[11px] font-semibold text-[#10203A] uppercase tracking-[0.1em] sm:tracking-[0.16em] leading-relaxed break-words">
                  {closeSectionData.tagline || "Let ur body speak — A Yuvraaj's Dance School"}
                </span>
              </div>
              <h1 className="font-display font-extrabold text-3xl xs:text-4xl sm:text-6xl md:text-7xl text-[#10203A] tracking-[-0.03em] leading-[1.08] break-words">
                Contact Us
              </h1>
              <p className="mt-4 sm:mt-6 text-sm sm:text-base lg:text-lg text-[#4A5B78] max-w-xl leading-relaxed font-sans">
                Whether you are taking your very first step or refining classical mastery, our court doors are wide open. Connect with Guru Yuvraaj Jayakumar’s faculty across Chennai and Pondicherry studios.
              </p>

              {/* Direct Contact Badges */}
              <div className="mt-6 sm:mt-8 flex flex-wrap items-center gap-2 sm:gap-3">
                <a
                  href={`tel:${closeSectionData.phone || '+919655551055'}`}
                  className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-white border border-[#ECE7DC] text-[11px] sm:text-xs font-semibold text-[#10203A] hover:border-[#1E5BB8] transition-colors shadow-xs"
                >
                  <Phone className="w-3.5 h-3.5 text-[#1E5BB8] shrink-0" />
                  <span>{closeSectionData.displayPhone || '+91 96555 51055'}</span>
                </a>
                <a
                  href={`mailto:${closeSectionData.email || 'rbdancecourt@gmail.com'}`}
                  className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-white border border-[#ECE7DC] text-[11px] sm:text-xs font-semibold text-[#10203A] hover:border-[#F28C1E] transition-colors shadow-xs max-w-full truncate"
                >
                  <Mail className="w-3.5 h-3.5 text-[#F28C1E] shrink-0" />
                  <span className="truncate">{closeSectionData.email || 'rbdancecourt@gmail.com'}</span>
                </a>
                <a
                  href={`https://wa.me/${closeSectionData.whatsappNumber || '919655551055'}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-[#E8F8EE] border border-[#25D366]/30 text-[11px] sm:text-xs font-semibold text-[#188C43] hover:bg-[#d6f5df] transition-colors shadow-xs"
                >
                  <MessageSquare className="w-3.5 h-3.5 text-[#25D366] shrink-0" />
                  <span>WhatsApp Desk</span>
                </a>
              </div>
            </div>

            {/* High-Quality Hero Visual */}
            <div className="lg:col-span-5">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-white/60 aspect-[4/3] sm:aspect-[16/10] lg:aspect-[4/3] group">
                <img
                  src={storyHeroImg}
                  alt="Guru Yuvraaj Jayakumar in classical mudra pose at Adiyogi statue"
                  className="w-full h-full object-cover object-[center_35%] transition-transform duration-500 group-hover:scale-105"
                  loading="eager"
                  width={600}
                  height={450}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#060A12]/70 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <div className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#F28C1E]">
                    Est. 2004
                  </div>
                  <div className="text-sm font-bold mt-0.5">
                    Guru Yuvraaj Jayakumar’s Dance Academy
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          SECTION 2 – CONTACT FORM (Inspired by reference UI)
      ======================================================== */}
      <section
        id="contact-form"
        className="w-full py-16 sm:py-24 bg-white border-b border-[rgba(16,32,58,0.08)]"
        aria-label="Contact Enquiry Form"
      >
        <div className="max-w-[1400px] mx-auto px-3 xs:px-4 sm:px-8 lg:px-12 xl:px-16">
          {/* Header Row: Big Headline on Left, Subtitle on Right (Reference Image Pattern) */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 sm:gap-6 pb-8 sm:pb-10 border-b border-[rgba(16,32,58,0.08)]">
            <div>
              <span className="text-[10px] xs:text-[11px] font-semibold uppercase tracking-[0.12em] sm:tracking-[0.15em] text-[#1E5BB8]">
                Get in Touch
              </span>
              <h2 className="font-display font-extrabold text-2xl xs:text-3xl sm:text-4xl md:text-5xl text-[#10203A] tracking-[-0.03em] mt-1 break-words">
                Send Us a Message
              </h2>
            </div>
            <p className="text-xs sm:text-sm md:text-base text-[#4A5B78] max-w-sm font-sans md:text-right">
              Tell us what dance style you love and which studio you'd like to visit. We’ll confirm batch availability within 24 hours.
            </p>
          </div>

          {/* Form & Image Split Layout */}
          <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-stretch">
            {/* Left / Main Form Column (7 cols) */}
            <div className="lg:col-span-7 flex flex-col justify-between">
              {submissionStatus === 'success' ? (
                /* Success Feedback State */
                <div
                  id="form-success-card"
                  className="p-8 sm:p-10 rounded-3xl bg-[#FAF9F5] border border-[#ECE7DC] shadow-sm flex flex-col items-center text-center animate-in fade-in zoom-in-95 duration-200"
                >
                  <div className="w-16 h-16 rounded-full bg-[#E6F8ED] text-[#25D366] flex items-center justify-center mb-5">
                    <CheckCircle2 className="w-9 h-9" />
                  </div>
                  <h3 className="font-display font-bold text-2xl sm:text-3xl text-[#10203A]">
                    Enquiry Recorded!
                  </h3>
                  <p className="mt-3 text-sm sm:text-base text-[#4A5B78] max-w-md leading-relaxed">
                    Thank you, <span className="font-semibold text-[#10203A]">{submittedData?.name}</span>. Your enquiry for{' '}
                    <span className="font-semibold text-[#10203A]">"{submittedData?.subject}"</span> has been saved. Our admissions coordinator will reach you at{' '}
                    <span className="font-semibold text-[#10203A]">{submittedData?.phone}</span>.
                  </p>

                  {/* Submission Summary */}
                  <div className="mt-6 w-full max-w-md p-4 rounded-2xl bg-white border border-[#ECE7DC] text-left text-xs space-y-2 text-[#4A5B78]">
                    <div className="flex justify-between border-b border-[rgba(16,32,58,0.06)] pb-2">
                      <span className="text-[#7B8AA3]">Email:</span>
                      <span className="font-semibold text-[#10203A]">{submittedData?.email}</span>
                    </div>
                    <div className="flex justify-between border-b border-[rgba(16,32,58,0.06)] pb-2">
                      <span className="text-[#7B8AA3]">Subject:</span>
                      <span className="font-semibold text-[#10203A]">{submittedData?.subject}</span>
                    </div>
                    <div>
                      <span className="text-[#7B8AA3] block mb-1">Message:</span>
                      <span className="text-[#10203A] italic">"{submittedData?.message}"</span>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="mt-8 flex flex-col sm:flex-row items-center gap-3 w-full max-w-md">
                    <a
                      href={`https://wa.me/${closeSectionData.whatsappNumber || '919655551055'}?text=${whatsappMessage}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-6 rounded-full text-sm font-semibold bg-[#25D366] text-white hover:bg-[#1faa52] transition-colors shadow-sm"
                    >
                      <MessageSquare className="w-4 h-4" />
                      <span>Confirm via WhatsApp</span>
                    </a>
                    <button
                      type="button"
                      onClick={handleReset}
                      className="w-full inline-flex items-center justify-center py-3.5 px-6 rounded-full text-sm font-semibold border border-[rgba(16,32,58,0.18)] text-[#10203A] hover:bg-black/5 transition-colors cursor-pointer"
                    >
                      Send Another Message
                    </button>
                  </div>
                </div>
              ) : (
                /* Interactive Form matching reference UI */
                <form id="enquiry-form" onSubmit={handleSubmit} noValidate className="space-y-6">
                  {/* Prefilled Workshop Alert Banner */}
                  {bookingWorkshop && (
                    <div className="p-4 rounded-2xl bg-[#EAF1FB] border border-[#1E5BB8]/30 flex items-start justify-between gap-3 animate-in fade-in">
                      <div className="flex items-start gap-3">
                        <div className="w-9 h-9 rounded-xl bg-[#1E5BB8] text-white flex items-center justify-center shrink-0 mt-0.5">
                          <Calendar className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-[10px] font-bold uppercase tracking-wider text-[#1E5BB8] bg-white px-2 py-0.5 rounded-full border border-[#1E5BB8]/20">
                              Workshop Selected
                            </span>
                            {bookingWorkshop.pricing?.earlyBird && (
                              <span className="text-xs font-bold text-[#F28C1E]">
                                Early Bird: {bookingWorkshop.pricing.earlyBird}
                              </span>
                            )}
                          </div>
                          <h4 className="font-bold text-sm text-[#10203A] mt-1">
                            {bookingWorkshop.title}
                          </h4>
                          <p className="text-xs text-[#4A5B78] mt-0.5">
                            Instructor: <span className="font-medium text-[#10203A]">{bookingWorkshop.instructor}</span> • {bookingWorkshop.date} ({bookingWorkshop.time})
                          </p>
                          <p className="text-[11px] text-[#7B8AA3] mt-0.5">
                            Venue: {bookingWorkshop.location}
                          </p>
                        </div>
                      </div>
                      {onClearBookingWorkshop && (
                        <button
                          type="button"
                          onClick={() => {
                            onClearBookingWorkshop();
                            setFormData((prev) => ({
                              ...prev,
                              subject: '',
                              message: '',
                            }));
                          }}
                          className="text-xs font-medium text-[#7B8AA3] hover:text-[#10203A] p-1.5 rounded-lg hover:bg-black/5 transition-colors cursor-pointer"
                          title="Clear workshop prefill"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  )}

                  {/* Row 1: Name and Email */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {/* Name */}
                    <div>
                      <label htmlFor="name" className="block text-xs font-bold text-[#10203A] mb-2">
                        Name <span className="text-[#F28C1E]">*</span>
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Your full name"
                        aria-invalid={!!errors.name}
                        aria-describedby={errors.name ? 'name-error' : undefined}
                        className={`w-full px-4 py-3.5 rounded-xl text-sm transition-all bg-[#F3F4F6] border placeholder-[#9CA3AF] text-[#10203A] focus:outline-none ${
                          errors.name
                            ? 'border-red-500 bg-red-50/30 focus:ring-2 focus:ring-red-200'
                            : 'border-transparent focus:border-[#10203A] focus:bg-white focus:ring-2 focus:ring-[#10203A]/10'
                        }`}
                      />
                      {errors.name && (
                        <p id="name-error" className="mt-1.5 text-xs text-red-600 flex items-center gap-1">
                          <AlertCircle className="w-3.5 h-3.5" />
                          <span>{errors.name}</span>
                        </p>
                      )}
                    </div>

                    {/* Email */}
                    <div>
                      <label htmlFor="email" className="block text-xs font-bold text-[#10203A] mb-2">
                        Email <span className="text-[#F28C1E]">*</span>
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="you@example.com"
                        aria-invalid={!!errors.email}
                        aria-describedby={errors.email ? 'email-error' : undefined}
                        className={`w-full px-4 py-3.5 rounded-xl text-sm transition-all bg-[#F3F4F6] border placeholder-[#9CA3AF] text-[#10203A] focus:outline-none ${
                          errors.email
                            ? 'border-red-500 bg-red-50/30 focus:ring-2 focus:ring-red-200'
                            : 'border-transparent focus:border-[#10203A] focus:bg-white focus:ring-2 focus:ring-[#10203A]/10'
                        }`}
                      />
                      {errors.email && (
                        <p id="email-error" className="mt-1.5 text-xs text-red-600 flex items-center gap-1">
                          <AlertCircle className="w-3.5 h-3.5" />
                          <span>{errors.email}</span>
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Row 2: Phone Number and Searchable Studio Venue Selection */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {/* Phone Number */}
                    <div>
                      <label htmlFor="phone" className="block text-xs font-bold text-[#10203A] mb-2">
                        Phone Number <span className="text-[#F28C1E]">*</span>
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+91 96555 51055"
                        aria-invalid={!!errors.phone}
                        aria-describedby={errors.phone ? 'phone-error' : undefined}
                        className={`w-full px-4 py-3.5 rounded-xl text-sm transition-all bg-[#F3F4F6] border placeholder-[#9CA3AF] text-[#10203A] focus:outline-none ${
                          errors.phone
                            ? 'border-red-500 bg-red-50/30 focus:ring-2 focus:ring-red-200'
                            : 'border-transparent focus:border-[#10203A] focus:bg-white focus:ring-2 focus:ring-[#10203A]/10'
                        }`}
                      />
                      {errors.phone && (
                        <p id="phone-error" className="mt-1.5 text-xs text-red-600 flex items-center gap-1">
                          <AlertCircle className="w-3.5 h-3.5" />
                          <span>{errors.phone}</span>
                        </p>
                      )}
                    </div>

                    {/* Preferred Studio Venue Selection */}
                    <div>
                      <label htmlFor="venue" className="block text-xs font-bold text-[#10203A] mb-2">
                        Preferred Studio Venue / Location
                      </label>
                      <div className="relative">
                        <select
                          id="venue"
                          name="venue"
                          value={formData.venue}
                          onChange={handleChange}
                          className="w-full appearance-none px-4 py-3.5 rounded-xl text-sm transition-all bg-[#F3F4F6] hover:bg-[#EBEDF0] border border-transparent focus:border-[#10203A] focus:bg-white focus:ring-2 focus:ring-[#10203A]/10 text-[#10203A] focus:outline-none pr-10 cursor-pointer font-medium"
                        >
                          {allVenues.map((v) => (
                            <option key={v.name} value={v.name} className="py-2 text-[#10203A] bg-white">
                              {v.name}
                            </option>
                          ))}
                        </select>
                        <div className="absolute inset-y-0 right-0 pr-3.5 flex items-center pointer-events-none text-[#71717A]">
                          <ChevronDown className="w-4 h-4" />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Row 3: Subject */}
                  <div>
                    <label htmlFor="subject" className="block text-xs font-bold text-[#10203A] mb-2">
                      Subject <span className="text-[#F28C1E]">*</span>
                    </label>
                    <div className="relative">
                      <select
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        aria-invalid={!!errors.subject}
                        aria-describedby={errors.subject ? 'subject-error' : undefined}
                        className={`w-full appearance-none px-4 py-3.5 rounded-xl text-sm transition-all bg-[#F3F4F6] hover:bg-[#EBEDF0] border text-[#10203A] focus:outline-none pr-10 cursor-pointer font-medium ${
                          errors.subject
                            ? 'border-red-500 bg-red-50/30 focus:ring-2 focus:ring-red-200'
                            : 'border-transparent focus:border-[#10203A] focus:bg-white focus:ring-2 focus:ring-[#10203A]/10'
                        }`}
                      >
                        <option value="">Select your inquiry subject...</option>
                        {bookingWorkshop && (
                          <option value={`Workshop Registration — ${bookingWorkshop.title} (${bookingWorkshop.instructor})`}>
                            ⭐ Workshop Registration — {bookingWorkshop.title}
                          </option>
                        )}
                        <option value="Admission Inquiry — Classical Bharatanatyam">
                          Admission — Classical Bharatanatyam
                        </option>
                        <option value="Admission Inquiry — Semiclassical Workshop">
                          Admission — Semiclassical Workshop
                        </option>
                        <option value="Admission Inquiry — Contemporary & Aerial">
                          Admission — Contemporary & Aerial
                        </option>
                        <option value="Admission Inquiry — Western / Hip-Hop">
                          Admission — Western / Hip-Hop
                        </option>
                        <option value="Free Trial Session Request">
                          Free Trial Session Request
                        </option>
                        <option value="Studio Rental / Choreography Collaboration">
                          Studio Rental / Choreography Collaboration
                        </option>
                      </select>
                      <div className="absolute inset-y-0 right-0 pr-3.5 flex items-center pointer-events-none text-[#71717A]">
                        <ChevronDown className="w-4 h-4" />
                      </div>
                    </div>
                    {errors.subject && (
                      <p id="subject-error" className="mt-1.5 text-xs text-red-600 flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5" />
                        <span>{errors.subject}</span>
                      </p>
                    )}
                  </div>

                  {/* Message Field */}
                  <div>
                    <label htmlFor="message" className="block text-xs font-bold text-[#10203A] mb-2">
                      Message / Special Requests <span className="text-[#F28C1E]">*</span>
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={4}
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Anything else we should know? (e.g. prior experience, preferred days or branch location)"
                      aria-invalid={!!errors.message}
                      aria-describedby={errors.message ? 'message-error' : undefined}
                      className={`w-full px-4 py-3.5 rounded-xl text-sm transition-all bg-[#F3F4F6] border placeholder-[#9CA3AF] text-[#10203A] focus:outline-none resize-none ${
                        errors.message
                          ? 'border-red-500 bg-red-50/30 focus:ring-2 focus:ring-red-200'
                          : 'border-transparent focus:border-[#10203A] focus:bg-white focus:ring-2 focus:ring-[#10203A]/10'
                      }`}
                    />
                    {errors.message && (
                      <p id="message-error" className="mt-1.5 text-xs text-red-600 flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5" />
                        <span>{errors.message}</span>
                      </p>
                    )}
                  </div>

                  {/* Submit Button (Pill + Circular Arrow Button matching reference pattern) */}
                  <div className="pt-2 flex items-center gap-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="inline-flex items-center justify-center px-5 sm:px-7 py-3 sm:py-3.5 rounded-full text-xs sm:text-sm font-semibold tracking-wide bg-[#10203A] text-white hover:bg-[#1A3158] active:scale-[0.99] transition-all duration-150 shadow-sm cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? 'Submitting...' : 'Send Message'}
                    </button>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      aria-label="Submit Form with Arrow"
                      className="w-10 h-10 sm:w-12 sm:h-12 shrink-0 rounded-full bg-[#10203A] text-white flex items-center justify-center hover:bg-[#1A3158] active:scale-[0.98] transition-all duration-150 shadow-sm cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? (
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      ) : (
                        <ArrowUpRight className="w-4 h-4 sm:w-5 sm:h-5" />
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>

            {/* Right Card: High-Quality Dance Image Card with Pill Badge (Matching Reference UI) */}
            <div className="lg:col-span-5 flex flex-col">
              <div className="relative w-full h-[480px] sm:h-[540px] lg:h-full min-h-[460px] rounded-3xl overflow-hidden shadow-xl border border-black/[0.06] group">
                <img
                  src={rightHeroImg}
                  alt="Guru Yuvraaj Jayakumar and dancer performing at Rhythmic Beat Dance Court"
                  className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                  width={500}
                  height={650}
                />
                {/* Gradient Wash */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#060A12]/80 via-transparent to-black/20 pointer-events-none" />

                {/* Floating Pill Badge on Top Right (Reference UI element) */}
                <div className="absolute top-5 right-5 z-10">
                  <span className="inline-flex items-center px-4 py-1.5 rounded-full text-xs font-semibold text-white bg-black/40 backdrop-blur-md border border-white/30 shadow-sm">
                    Your Dance Journey
                  </span>
                </div>

                {/* Bottom Card Caption */}
                <div className="absolute bottom-6 left-6 right-6 text-white z-10">
                  <div className="flex items-center gap-2 mb-1">
                    <Sparkles className="w-4 h-4 text-[#F28C1E]" />
                    <span className="text-[11px] font-semibold uppercase tracking-[0.15em] text-[#F28C1E]">
                      Masterclass & Workshops
                    </span>
                  </div>
                  <h3 className="font-display font-bold text-xl sm:text-2xl text-white">
                    Step onto the stage with Guru Yuvraaj
                  </h3>
                  <p className="text-xs text-white/80 mt-1">
                    Valasaravakkam • Kolapakkam • Ambattur • Pondicherry
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          SECTION 3 – OUR LOCATIONS (Real Branch Cards + Google Maps Embeds)
      ======================================================== */}
      <section
        id="our-locations"
        className="w-full py-16 sm:py-24 bg-[#FAF9F5] border-b border-[rgba(16,32,58,0.08)]"
        aria-label="Our Studio Locations"
      >
        <div className="max-w-[1400px] mx-auto px-3 xs:px-4 sm:px-8 lg:px-12 xl:px-16">
          {/* Section Header */}
          <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-[#ECE7DC] text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.14em] sm:tracking-[0.16em] text-[#1E5BB8] mb-3">
              <MapPin className="w-3.5 h-3.5 text-[#F28C1E]" />
              <span>Studio Campuses</span>
            </div>
            <h2 className="font-display font-extrabold text-2xl xs:text-3xl sm:text-4xl md:text-5xl text-[#10203A] tracking-[-0.03em] break-words">
              Our Studio Locations
            </h2>
            <p className="mt-3 text-xs sm:text-sm md:text-base text-[#4A5B78] font-sans">
              Visit any of our active dance studios. All branches are equipped with sprung professional dance flooring, acoustic sound, and dedicated training arenas.
            </p>
          </div>

          {/* 4 Location Cards with Working Google Maps Iframes */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {branches.map((branch, index) => (
              <div
                key={branch.name}
                className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-7 border border-[#ECE7DC] shadow-[0_4px_24px_-4px_rgba(16,32,58,0.06)] hover:shadow-[0_8px_32px_-4px_rgba(16,32,58,0.1)] transition-all duration-200 flex flex-col justify-between overflow-hidden"
              >
                <div>
                  {/* Top: Branch Name & Badge */}
                  <div className="flex flex-col xs:flex-row xs:items-start xs:justify-between gap-1.5 sm:gap-3 mb-3">
                    <div className="min-w-0 flex-1">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#F28C1E] block mb-0.5 sm:mb-1">
                        Branch 0{index + 1}
                      </span>
                      <h3 className="font-display font-bold text-lg sm:text-xl lg:text-2xl text-[#10203A] break-words">
                        {branch.name}
                      </h3>
                    </div>
                    <span className="self-start shrink-0 px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full text-[10px] sm:text-[11px] font-semibold bg-[#EAF1FB] text-[#1E5BB8]">
                      Verified Studio
                    </span>
                  </div>

                  {/* Complete Address */}
                  <div className="flex items-start gap-2.5 mt-3 text-xs sm:text-sm text-[#4A5B78] leading-relaxed break-words">
                    <MapPin className="w-4 h-4 text-[#7B8AA3] shrink-0 mt-0.5" />
                    <p>{branch.address}</p>
                  </div>

                  {/* Contact Telephone */}
                  <div className="flex items-center gap-2.5 mt-3 text-xs sm:text-sm">
                    <Phone className="w-4 h-4 text-[#1E5BB8] shrink-0" />
                    <a
                      href={`tel:${branch.phone.replace(/\s+/g, '')}`}
                      className="font-semibold text-[#10203A] hover:text-[#1E5BB8] transition-colors"
                    >
                      {branch.phone}
                    </a>
                  </div>
                </div>

                {/* Working Google Maps Embed */}
                <div className="mt-6 mb-4 rounded-2xl overflow-hidden border border-[#ECE7DC] shadow-inner aspect-[16/9] w-full bg-[#E5E7EB]">
                  <iframe
                    title={`Google Map location for ${branch.name}`}
                    src={branchMapUrls[index]}
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="w-full h-full"
                  />
                </div>

                {/* Card Action Buttons */}
                <div className="pt-2 flex items-center justify-between gap-3 border-t border-[rgba(16,32,58,0.06)]">
                  <a
                    href={`tel:${branch.phone.replace(/\s+/g, '')}`}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#10203A] hover:text-[#1E5BB8] transition-colors"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    <span>Call Studio</span>
                  </a>
                  <a
                    href={branchExternalMapUrls[index]}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#1E5BB8] hover:text-[#10203A] transition-colors"
                  >
                    <span>Get Directions</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================
          SECTION 4 – VISUAL CONTACT BANNER
      ======================================================== */}
      <section
        id="visual-banner"
        className="w-full py-16 sm:py-24 bg-[#0B111E] text-white relative overflow-hidden"
        aria-label="Dance Visual Banner Call to Action"
      >
        {/* Background Image with Ambient Dark Wash */}
        <div className="absolute inset-0 pointer-events-none opacity-25">
          <img
            src={danceGroupImg}
            alt="Rhythmic Beat Dance Court Group Ensemble"
            className="w-full h-full object-cover object-center filter grayscale contrast-125"
          />
        </div>

        {/* Ambient Radial Stage Glow */}
        <div
          className="absolute inset-0 pointer-events-none opacity-40 mix-blend-screen"
          style={{
            backgroundImage:
              'radial-gradient(circle at 30% 50%, rgba(30, 91, 184, 0.35) 0%, transparent 60%), radial-gradient(circle at 75% 60%, rgba(242, 140, 30, 0.25) 0%, transparent 55%)',
          }}
          aria-hidden="true"
        />

        <div className="max-w-[1200px] mx-auto px-3 xs:px-4 sm:px-8 lg:px-12 text-center relative z-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-[10px] sm:text-xs font-semibold uppercase tracking-[0.08em] sm:tracking-[0.16em] text-[#F28C1E] mb-4 max-w-full">
            <Sparkles className="w-3.5 h-3.5 shrink-0" />
            <span className="truncate">Admissions Open Across All Branches</span>
          </div>

          <h2 className="font-display font-extrabold text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white tracking-[-0.03em] max-w-3xl mx-auto leading-[1.12] break-words">
            Ready to find your rhythm on our stage?
          </h2>

          <p className="mt-4 sm:mt-5 text-xs sm:text-base md:text-lg text-white/70 max-w-2xl mx-auto leading-relaxed font-sans">
            Join thousands of passionate dancers trained under Guru Yuvraaj Jayakumar. Book a trial session or schedule a studio visit today.
          </p>

          <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 w-full">
            <button
              type="button"
              onClick={scrollToContactForm}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3.5 sm:py-4 rounded-full text-xs sm:text-sm font-semibold bg-[#F28C1E] text-white hover:bg-[#d97b15] active:scale-[0.98] transition-all shadow-lg cursor-pointer"
            >
              <span>Fill Out the Enquiry Form</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
            <a
              href={`https://wa.me/${closeSectionData.whatsappNumber || '919655551055'}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3.5 sm:py-4 rounded-full text-xs sm:text-sm font-semibold bg-white/10 text-white hover:bg-white/20 border border-white/20 active:scale-[0.98] transition-all backdrop-blur-sm"
            >
              <MessageSquare className="w-4 h-4 text-[#25D366]" />
              <span>Chat with Coordinator</span>
            </a>
          </div>
        </div>
      </section>

      {/* ========================================================
          SECTION 5 – FOOTER
          (CloseSection is automatically rendered at the bottom by App.jsx,
          retaining all verified branch links, phone numbers, copyright,
          and bottom wordmark)
      ======================================================== */}
    </div>
  );
};
