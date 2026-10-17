import { closeSectionData } from '../data/close';
import footerGroupImg from '../assets/dance-court-footer-group.webp';
import { DisciplineWatermark } from './DisciplineWatermark';

export const CloseSection = ({ data = closeSectionData }) => {
  return (
    <footer
      id="contact"
      className="relative w-full overflow-hidden border-t border-[rgba(34,34,34,0.12)] bg-[#F1F3F5]"
      aria-label="Contact and Academy Details"
    >
      {/* Background Discipline Element 8: Kalaripayattu (Top-Right) */}
      <DisciplineWatermark
        discipline="kalaripayattu"
        position="top-right"
        color="blue"
        opacity={0.06}
        size="clamp(240px, 30vw, 440px)"
        rotation={5}
        className="top-8 sm:top-14 right-3 sm:right-12 z-0"
      />

      {/* Background Discipline Element: Bharatanatyam (Bottom-Left) */}
      <DisciplineWatermark
        discipline="bharatanatyam"
        position="bottom-left"
        color="orange"
        opacity={0.065}
        size="clamp(240px, 30vw, 440px)"
        rotation={-6}
        className="bottom-8 sm:bottom-16 left-2 sm:left-8 z-0"
      />
      <div className="max-w-[1400px] mx-auto px-3 xs:px-4 sm:px-8 lg:px-12 xl:px-16 pt-16 sm:pt-32 pb-12">
        {/* Top Split: Headline & Action Buttons */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 sm:gap-10 pb-12 sm:pb-16 border-b border-[rgba(34,34,34,0.12)]">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-[#145A96] shrink-0" />
              <span className="text-[10px] sm:text-[11px] font-semibold text-[#222222] uppercase tracking-[0.12em] sm:tracking-[0.15em] break-words">
                {data.tagline}
              </span>
            </div>
            <h2 className="font-display font-bold text-3xl xs:text-4xl sm:text-5xl md:text-6xl text-[#145A96] tracking-[-0.03em] break-words">
              {data.headline}
            </h2>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-3 sm:gap-4 flex-wrap w-full sm:w-auto">
            <a
              href={`https://wa.me/${data.whatsappNumber}?text=Hi%20RBDC%20Team,%20I%20would%20like%20to%20inquire%20about%20dance%20batches`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto justify-center group inline-flex items-center gap-2.5 px-5 sm:px-6 py-3 sm:py-3.5 rounded-full border border-[rgba(34,34,34,0.2)] text-xs font-semibold text-[#222222] tracking-[0.04em] sm:tracking-[0.06em] hover:border-[#145A96] hover:bg-white transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#145A96]"
            >
              <span>WhatsApp Us</span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#F28C28] group-hover:scale-125 transition-transform" />
            </a>

            <a
              href={`tel:${data.phone}`}
              className="w-full sm:w-auto justify-center group inline-flex items-center gap-2.5 px-5 sm:px-6 py-3 sm:py-3.5 rounded-full border border-[rgba(34,34,34,0.2)] text-xs font-semibold text-[#222222] tracking-[0.04em] sm:tracking-[0.06em] hover:border-[#145A96] hover:bg-white transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#145A96]"
            >
              <span>Call: {data.displayPhone}</span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#145A96] group-hover:scale-125 transition-transform" />
            </a>
          </div>
        </div>

        {/* Academy Ensemble Community Banner */}
        <div className="my-10 sm:my-14 rounded-3xl overflow-hidden border border-[rgba(34,34,34,0.12)] relative shadow-sm">
          <img
            src={footerGroupImg}
            alt="Rhythmic Beat Dance Court academy ensemble crew"
            width="1200"
            height="600"
            decoding="async"
            className="w-full h-[280px] xs:h-[340px] sm:h-[420px] md:h-[500px] lg:h-[560px] object-cover object-[center_16%]"
            loading="eager"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#222222]/85 via-black/20 to-transparent flex items-end p-4 sm:p-6 md:p-8 pointer-events-none">
            <div className="bg-[#222222]/80 backdrop-blur-md px-3.5 sm:px-5 py-2 sm:py-3 rounded-2xl border border-white/15 max-w-fit shadow-lg">
              <span className="text-[9.5px] sm:text-[11px] uppercase tracking-[0.16em] font-semibold text-[#F28C28] block mb-0.5 sm:mb-1">
                One Family • Infinite Movement
              </span>
              <p className="font-display font-bold text-base sm:text-xl md:text-2xl text-white leading-tight">
                RBDC Ensemble Community
              </p>
            </div>
          </div>
        </div>

        {/* Branches Grid & Contact Metadata */}
        <div id="branches" className="py-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 border-b border-[rgba(34,34,34,0.12)]">
          {data.branches.map((branch) => (
            <div key={branch.name} className="flex flex-col">
              <span className="font-display font-semibold text-base text-[#222222] mb-2">
                {branch.name}
              </span>
              <p className="font-sans text-xs text-[#222222]/75 leading-relaxed mb-3">
                {branch.address}
              </p>
              <a
                href={`tel:${branch.phone.replace(/\s+/g, '')}`}
                className="font-mono text-xs text-[#222222] hover:text-[#F28C28] transition-colors inline-flex items-center gap-1.5"
              >
                <span className="w-1 h-1 rounded-full bg-[#145A96]" />
                {branch.phone}
              </a>
            </div>
          ))}
        </div>

        {/* Fine-print line with Phone, Email, Address and Instagram */}
        <div className="py-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs text-[#222222]/60">
          <div className="flex wrap items-center gap-x-6 gap-y-2 flex-wrap">
            <span>Official Inquiries: {data.displayPhone}</span>
            <span>•</span>
            <a
              href={`mailto:${data.email}`}
              className="text-[#222222] hover:text-[#F28C28] transition-colors"
            >
              {data.email}
            </a>
            <span>•</span>
            <a
              href={data.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#222222] hover:text-[#F28C28] font-medium transition-colors flex items-center gap-1.5"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#F28C28]" />
              Instagram {data.instagramHandle}
            </a>
          </div>

          <div className="text-[11px] uppercase tracking-[0.1em]">
            {data.copyright}
          </div>
        </div>
      </div>

      {/* Hairline Strip */}
      <div className="w-full h-[1px] bg-[rgba(34,34,34,0.12)]" />

      {/* Full-Width Signature Wordmark */}
      <div className="w-full overflow-hidden select-none pointer-events-none py-6 sm:py-8 md:py-12 px-4">
        <div className="w-full text-center">
          <span
            className="font-display font-extrabold text-[#145A96] uppercase tracking-[-0.025em] whitespace-nowrap block leading-none opacity-90"
            style={{
              fontSize: 'clamp(20px, 6.4vw, 108px)',
            }}
          >
            {data.bottomWordmark}
          </span>
        </div>
      </div>
    </footer>
  );
};
