import { CardDeck } from './CardDeck';
import { stylesSectionData } from '../data/styles';

export const DanceStyles = ({ data = stylesSectionData }) => {
  return (
    <section
      id="styles"
      className="relative w-full py-24 sm:py-32 border-b border-[rgba(34,34,34,0.12)]"
      style={{ backgroundColor: '#F1F3F5' }}
      aria-label="Dance Styles Section"
    >
      <div className="max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-12 items-center">
          {/* Left Column: Headline, Lede, Action Links */}
          <div className="lg:col-span-6 flex flex-col items-start">
            {/* Section Tag */}
            <div className="flex items-center gap-2.5 mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-[#F28C28]" />
              <span className="text-[11px] font-semibold text-[#222222] uppercase tracking-[0.15em]">
                {data.label}
              </span>
            </div>

            {/* Headline */}
            <h2 className="font-display font-bold text-3xl sm:text-4xl md:text-5xl text-[#145A96] leading-[1.12] tracking-[-0.025em]">
              {data.headline}
            </h2>

            {/* Hairline Divider */}
            <div className="w-16 h-[1px] bg-[rgba(34,34,34,0.12)] my-6" />

            {/* Lede */}
            <p className="font-sans text-sm sm:text-base text-[#222222]/75 leading-relaxed max-w-xl">
              {data.lede}
            </p>

            {/* Two Action Buttons (Outlined with hairline, strictly respecting no-filled-area rule) */}
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <a
                href="#contact"
                className="group inline-flex items-center gap-2 px-6 py-3 rounded-full border border-[rgba(34,34,34,0.2)] text-xs font-semibold text-[#222222] tracking-[0.06em] hover:border-[#145A96] hover:bg-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#145A96]"
              >
                <span>Book a Free Trial</span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#F28C28] group-hover:scale-125 transition-transform" />
              </a>

              <a
                href="#schedule"
                className="group inline-flex items-center gap-2 px-6 py-3 rounded-full border border-[rgba(34,34,34,0.15)] text-xs font-semibold text-[#222222]/70 tracking-[0.06em] hover:text-[#145A96] hover:border-[#145A96] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#145A96]"
              >
                <span>View Schedule</span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#145A96] group-hover:scale-125 transition-transform" />
              </a>
            </div>

            {/* Batch highlight strip */}
            <div className="mt-12 pt-6 border-t border-[rgba(34,34,34,0.08)] w-full flex items-center justify-between text-[11px] text-[#222222]/60">
              <span className="uppercase tracking-[0.12em]">6 Certified Disciplines</span>
              <span className="uppercase tracking-[0.12em]">Sprung Wooden Floors</span>
            </div>
          </div>

          {/* Right Column: Throwable Card Deck */}
          <div className="lg:col-span-6 flex justify-center lg:justify-end">
            <CardDeck cards={data.cards} hintText={data.dragHint} />
          </div>
        </div>
      </div>
    </section>
  );
};
