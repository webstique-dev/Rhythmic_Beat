import { closeSectionData } from '../data/close';
import footerGroupImg from '../assets/dance-court-footer-group.webp';

export const CloseSection = ({ data = closeSectionData }) => {
  return (
    <footer
      id="contact"
      className="relative w-full overflow-hidden border-t border-[rgba(16,32,58,0.14)]"
      style={{ backgroundColor: '#F8FAFD' }}
      aria-label="Contact and Academy Details"
    >
      <div className="max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 pt-24 sm:pt-32 pb-12">
        {/* Top Split: Headline & Action Buttons */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-10 pb-16 border-b border-[rgba(16,32,58,0.14)]">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-[#1E5BB8]" />
              <span className="text-[11px] font-semibold text-[#10203A] uppercase tracking-[0.15em]">
                {data.tagline}
              </span>
            </div>
            <h2 className="font-display font-bold text-4xl sm:text-5xl md:text-6xl text-[#10203A] tracking-[-0.03em]">
              {data.headline}
            </h2>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-4 flex-wrap">
            <a
              href={`https://wa.me/${data.whatsappNumber}?text=Hi%20RBDC%20Team,%20I%20would%20like%20to%20inquire%20about%20dance%20batches`}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2.5 px-6 py-3.5 rounded-full border border-[rgba(16,32,58,0.22)] text-xs font-semibold text-[#10203A] tracking-[0.06em] hover:border-[#10203A] hover:bg-[#EAF1FB]/50 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1E5BB8]"
            >
              <span>WhatsApp Us</span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#F28C1E] group-hover:scale-125 transition-transform" />
            </a>

            <a
              href={`tel:${data.phone}`}
              className="group inline-flex items-center gap-2.5 px-6 py-3.5 rounded-full border border-[rgba(16,32,58,0.22)] text-xs font-semibold text-[#10203A] tracking-[0.06em] hover:border-[#10203A] hover:bg-[#EAF1FB]/50 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1E5BB8]"
            >
              <span>Call: {data.displayPhone}</span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#1E5BB8] group-hover:scale-125 transition-transform" />
            </a>
          </div>
        </div>

        {/* Academy Ensemble Community Banner */}
        <div className="my-10 sm:my-14 rounded-3xl overflow-hidden border border-[rgba(16,32,58,0.12)] relative shadow-sm">
          <img
            src={footerGroupImg}
            alt="Rhythmic Beat Dance Court academy ensemble crew"
            width="1200"
            height="400"
            decoding="async"
            className="w-full h-[220px] xs:h-[260px] sm:h-[320px] md:h-[400px] object-cover object-center"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#10203A]/90 via-[#10203A]/30 to-transparent flex items-end p-5 sm:p-8">
            <div>
              <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.16em] font-semibold text-[#F28C1E] block mb-1">
                One Family • Infinite Movement
              </span>
              <p className="font-display font-bold text-lg sm:text-2xl text-white">
                RBDC Ensemble Community
              </p>
            </div>
          </div>
        </div>

        {/* Branches Grid & Contact Metadata */}
        <div id="branches" className="py-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 border-b border-[rgba(16,32,58,0.14)]">
          {data.branches.map((branch) => (
            <div key={branch.name} className="flex flex-col">
              <span className="font-display font-semibold text-base text-[#10203A] mb-2">
                {branch.name}
              </span>
              <p className="font-sans text-xs text-[#4A5B78] leading-relaxed mb-3">
                {branch.address}
              </p>
              <a
                href={`tel:${branch.phone.replace(/\s+/g, '')}`}
                className="font-mono text-xs text-[#10203A] hover:text-[#F28C1E] transition-colors inline-flex items-center gap-1.5"
              >
                <span className="w-1 h-1 rounded-full bg-[#1E5BB8]" />
                {branch.phone}
              </a>
            </div>
          ))}
        </div>

        {/* Fine-print line with Phone, Email, Address and Instagram */}
        <div className="py-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs text-[#7B8AA3]">
          <div className="flex wrap items-center gap-x-6 gap-y-2 flex-wrap">
            <span>Official Inquiries: {data.displayPhone}</span>
            <span>•</span>
            <a
              href={`mailto:${data.email}`}
              className="text-[#10203A] hover:text-[#F28C1E] transition-colors"
            >
              {data.email}
            </a>
            <span>•</span>
            <a
              href={data.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#10203A] hover:text-[#F28C1E] font-medium transition-colors flex items-center gap-1.5"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#F28C1E]" />
              Instagram {data.instagramHandle}
            </a>
          </div>

          <div className="text-[11px] uppercase tracking-[0.1em]">
            {data.copyright}
          </div>
        </div>
      </div>

      {/* Hairline Strip */}
      <div className="w-full h-[1px] bg-[rgba(16,32,58,0.14)]" />

      {/* Cropped Full-Width Wordmark: Translated down slightly so page edge crops it */}
      <div className="w-full overflow-hidden select-none pointer-events-none -mb-3 sm:-mb-6 md:-mb-10 lg:-mb-12">
        <div className="w-full text-center">
          <span
            className="font-display font-extrabold text-[#10203A] uppercase tracking-[-0.035em] whitespace-nowrap block leading-none opacity-90"
            style={{
              fontSize: 'clamp(56px, 14vw, 210px)',
              transform: 'translateY(22%)',
            }}
          >
            {data.bottomWordmark}
          </span>
        </div>
      </div>
    </footer>
  );
};
