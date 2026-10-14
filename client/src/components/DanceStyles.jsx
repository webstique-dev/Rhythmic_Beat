import { CardDeck } from './CardDeck';
import { stylesSectionData } from '../data/styles';

export const DanceStyles = ({ data = stylesSectionData }) => {
  return (
    <section
      id="styles"
      className="relative w-full py-24 sm:py-32 border-b border-[rgba(16,32,58,0.14)]"
      style={{ backgroundColor: '#F8FAFD' }}
      aria-label="Dance Styles Section"
    >
      <div className="max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-12 items-center">
          {/* Left Column: Headline, Lede, Action Links */}
          <div className="lg:col-span-6 flex flex-col items-start">
            {/* Section Tag */}
            <div className="flex items-center gap-2.5 mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-[#F28C1E]" />
              <span className="text-[11px] font-semibold text-[#10203A] uppercase tracking-[0.15em]">
                {data.label}
              </span>
            </div>

            {/* Headline */}
            <h2 className="font-display font-bold text-3xl sm:text-4xl md:text-5xl text-[#10203A] leading-[1.12] tracking-[-0.025em]">
              {data.headline}
            </h2>

            {/* Hairline Divider */}
            <div className="w-16 h-[1px] bg-[rgba(16,32,58,0.16)] my-6" />

            {/* Lede */}
            <p className="font-sans text-sm sm:text-base text-[#4A5B78] leading-relaxed max-w-xl">
              {data.lede}
            </p>

            {/* Two Action Buttons (Outlined with hairline, strictly respecting no-filled-area rule) */}
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <a
                href="#contact"
                className="group inline-flex items-center gap-2 px-6 py-3 rounded-full border border-[rgba(16,32,58,0.24)] text-xs font-semibold text-[#10203A] tracking-[0.06em] hover:border-[#10203A] hover:bg-[#EAF1FB]/50 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1E5BB8]"
              >
                <span>Book a Free Trial</span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#F28C1E] group-hover:scale-125 transition-transform" />
              </a>

              <a
                href="#schedule"
                className="group inline-flex items-center gap-2 px-6 py-3 rounded-full border border-[rgba(16,32,58,0.16)] text-xs font-semibold text-[#4A5B78] tracking-[0.06em] hover:text-[#10203A] hover:border-[rgba(16,32,58,0.35)] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1E5BB8]"
              >
                <span>View Schedule</span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#1E5BB8] group-hover:scale-125 transition-transform" />
              </a>
            </div>

            {/* Batch highlight strip */}
            <div className="mt-12 pt-6 border-t border-[rgba(16,32,58,0.1)] w-full flex items-center justify-between text-[11px] text-[#7B8AA3]">
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
