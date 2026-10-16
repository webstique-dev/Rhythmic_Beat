import { DISCIPLINES_LIST } from '../data/disciplines';
import CurvedLoop from './CurvedLoop';

export const DisciplineBanner = ({ className = '', onSelectDiscipline }) => {
  // 2 sets of items for seamless infinite marquee loop
  const marqueeItems = [...DISCIPLINES_LIST, ...DISCIPLINES_LIST];

  return (
    <section
      className={`w-full overflow-hidden border-y border-[rgba(34,34,34,0.1)] bg-[#F1F3F5] py-5 sm:py-8 relative ${className}`}
      aria-label="Academy Disciplines & Movement Arts"
    >
      {/* 1. Header Metadata Bar */}
      <div className="max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-12 mb-3 sm:mb-4 flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#F28C28] animate-pulse" />
          <h2 className="text-xs sm:text-sm font-bold text-[#145A96] uppercase tracking-[0.16em]">
            Academy Disciplines &amp; Movement Arts
          </h2>
        </div>

        <div className="flex items-center gap-2 text-[10px] sm:text-xs text-[#222222]/60 font-medium">
          <span className="hidden sm:inline">Chennai &amp; Pondicherry Studios</span>
          <span className="hidden md:inline text-[#222222]/30">•</span>
          <span className="text-[#F28C28] font-semibold">Hover to Pause • Click to Explore</span>
        </div>
      </div>

      {/* 2. React Bits CurvedLoop Marquee Component */}
      <div className="w-full py-1 sm:py-2 pointer-events-auto">
        <CurvedLoop
          marqueeText="BHARATA NATYAM ✦ WESTERN DANCE ✦ ZUMBA ✦ YOGA ✦ AERIAL YOGA ✦ BUNGEE WORKOUT ✦ GYMNASTICS ✦ KALARIPAYATTU ✦"
          separator="✦"
          separatorColor="#F28C28"
          color="#145A96"
          shape="wave"
          curveAmount={50}
          speed={1.6}
          fontSize={44}
          fontWeight={800}
          letterSpacing={2}
          interactive={true}
          pauseOnHover={false}
          scrollBoost={0.5}
          className="font-display"
          style={{ minHeight: '65px' }}
        />
      </div>

      {/* 3. Infinite Discipline Cards Marquee Track */}
      <div className="relative w-full overflow-hidden mt-2 sm:mt-4 group/marquee">
        {/* Left & Right Soft Edge Gradient Masks */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-10 sm:w-24 md:w-32 bg-gradient-to-r from-[#F1F3F5] via-[#F1F3F5]/80 to-transparent z-10" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-10 sm:w-24 md:w-32 bg-gradient-to-l from-[#F1F3F5] via-[#F1F3F5]/80 to-transparent z-10" />

        {/* Marquee Moving Track */}
        <div className="animate-marquee-infinite flex items-center gap-3 sm:gap-4 py-2 px-2">
          {marqueeItems.map((item, index) => {
            const isBlue = item.bg === 'blue';
            return (
              <div
                key={`${item.id}-${index}`}
                onClick={() => onSelectDiscipline?.(item.id)}
                className={`shrink-0 w-[140px] xs:w-[155px] sm:w-[170px] md:w-[185px] h-[155px] xs:h-[170px] sm:h-[185px] rounded-2xl p-3 sm:p-4 flex flex-col items-center justify-between transition-all duration-300 hover:scale-105 hover:-translate-y-1.5 cursor-pointer select-none overflow-hidden relative shadow-xs hover:shadow-lg ${
                  isBlue
                    ? 'bg-[#145A96] text-white hover:ring-2 hover:ring-[#145A96]/50'
                    : 'bg-[#F28C28] text-white hover:ring-2 hover:ring-[#F28C28]/50'
                }`}
                title={`Explore ${item.name}`}
              >
                {/* Silhouette Figure */}
                <div className="w-full flex-1 flex items-center justify-center p-1 relative z-10">
                  <img
                    src={item.figure}
                    alt={item.name}
                    className="max-h-[70px] sm:max-h-[85px] w-auto object-contain transition-transform duration-300 group-hover:scale-110 drop-shadow-sm"
                    loading="lazy"
                  />
                </div>

                {/* Discipline Name & Tagline */}
                <div className="w-full text-center relative z-10 mt-1">
                  <span className="block text-[10px] xs:text-[11px] sm:text-xs font-black uppercase tracking-[0.08em] leading-tight text-white drop-shadow-2xs">
                    {item.name}
                  </span>
                  <span className="block text-[8px] xs:text-[8.5px] sm:text-[9.5px] text-white/80 font-medium truncate mt-0.5">
                    {item.tagline?.split('&')[0] || item.name}
                  </span>
                </div>

                {/* Subtle Ambient Hover Sheen */}
                <div className="absolute inset-0 bg-white/10 opacity-0 hover:opacity-100 transition-opacity pointer-events-none" />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default DisciplineBanner;
