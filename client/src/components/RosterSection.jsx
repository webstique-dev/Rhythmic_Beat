import { rosterSectionData } from '../data/roster';

export const RosterSection = ({ data = rosterSectionData }) => {
  return (
    <section
      id="roster"
      className="relative w-full py-24 sm:py-32 border-b border-[rgba(16,32,58,0.14)]"
      style={{ backgroundColor: '#F8FAFD' }}
      aria-label="Academy Roster of Batches"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
        {/* Header Block */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-[rgba(16,32,58,0.14)]">
          <div className="max-w-xl">
            <div className="flex items-center gap-2 mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-[#1E5BB8]" />
              <span className="text-[11px] font-semibold text-[#10203A] uppercase tracking-[0.15em]">
                {data.label}
              </span>
            </div>
            <h2 className="font-display font-bold text-3xl sm:text-4xl text-[#10203A] tracking-[-0.025em]">
              {data.headline}
            </h2>
          </div>
          <p className="font-sans text-xs sm:text-sm text-[#4A5B78] max-w-sm leading-relaxed">
            {data.lede}
          </p>
        </div>

        {/* Hairline-Ruled Rows */}
        <div className="divide-y divide-[rgba(16,32,58,0.14)]" role="list">
          {data.items.map((item, index) => (
            <div
              key={item.id}
              role="listitem"
              className="group py-6 sm:py-8 flex flex-col md:flex-row md:items-center justify-between gap-4 transition-colors duration-150 hover:bg-[#EAF1FB]/40 px-2 sm:px-4 -mx-2 sm:-mx-4 rounded-sm"
            >
              {/* Left Side: Orange Label and Index */}
              <div className="flex items-center gap-6 md:w-1/4">
                <span className="text-[11px] text-[#7B8AA3] font-mono tracking-widest">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <span className="text-[11px] font-bold text-[#F28C1E] uppercase tracking-[0.15em]">
                  {item.category}
                </span>
              </div>

              {/* Middle: Display-face Batch Name & Mentor */}
              <div className="md:w-1/2 flex flex-col">
                <h3 className="font-display font-semibold text-lg sm:text-xl md:text-2xl text-[#10203A] group-hover:translate-x-1 transition-transform duration-150">
                  {item.batchName}
                </h3>
                <span className="text-xs text-[#7B8AA3] mt-0.5 font-normal">
                  Mentored by {item.mentor}
                </span>
              </div>

              {/* Right Side: Detail (Age range / Class count / Capacity) */}
              <div className="md:w-1/4 flex flex-col md:items-end text-left md:text-right">
                <span className="font-sans text-xs sm:text-[13px] font-medium text-[#10203A] tracking-[0.02em]">
                  {item.detail}
                </span>
                {item.capacity && (
                  <span className="text-[10px] text-[#7B8AA3] uppercase tracking-[0.1em] mt-0.5">
                    {item.capacity}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom hairline footer caption */}
        <div className="pt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between text-[11px] text-[#7B8AA3] tracking-[0.12em] uppercase">
          <span>Personal evaluations conducted prior to batch placement</span>
          <a
            href="#contact"
            className="mt-2 sm:mt-0 text-[#10203A] hover:text-[#F28C1E] transition-colors font-semibold underline underline-offset-4 decoration-[rgba(16,32,58,0.2)]"
          >
            Inquire about cohort openings →
          </a>
        </div>
      </div>
    </section>
  );
};
