import { useEffect, useRef, useState } from 'react';

const MILESTONES = [
  {
    id: 'founded',
    value: 2004,
    formatted: '2,004',
    suffix: '',
    label: 'FOUNDED IN TRICHY',
  },
  {
    id: 'students',
    value: 7000,
    formatted: '7,000',
    suffix: '+',
    label: 'STUDENTS TRAINED',
  },
  {
    id: 'shows',
    value: 1000,
    formatted: '1,000',
    suffix: '+',
    label: 'SHOWS PERFORMED',
  },
  {
    id: 'passion',
    value: 1,
    formatted: '1',
    suffix: '',
    label: 'SHARED PASSION',
  },
];

export const MilestonesSection = () => {
  const sectionRef = useRef(null);
  const [isInView, setIsInView] = useState(false);
  const [counts, setCounts] = useState(() => MILESTONES.map(() => 0));

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.25, rootMargin: '0px 0px -50px 0px' }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isInView) return;

    const duration = 1000; // ms
    const startTime = performance.now();

    let frameId;
    const animate = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(1, elapsed / duration);
      // Smooth easeOutExpo curve
      const ease = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);

      setCounts(
        MILESTONES.map((item) => {
          if (item.value === 1) return 1;
          if (progress >= 1) return item.value;
          return Math.round(item.value * ease);
        })
      );

      if (progress < 1) {
        frameId = requestAnimationFrame(animate);
      }
    };

    frameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frameId);
  }, [isInView]);

  return (
    <section
      ref={sectionRef}
      id="milestones"
      aria-label="Academy Milestones and Legacy"
      className="relative w-full bg-[#FFFFFF] border-y border-[rgba(16,32,58,0.12)] overflow-hidden py-12 sm:py-16 md:py-20 lg:py-24"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        <div className="grid grid-cols-2 md:grid-cols-4">
          {MILESTONES.map((item, idx) => {
            const currentVal = isInView ? counts[idx] : item.value;
            const displayValue = currentVal.toLocaleString('en-US');

            return (
              <div
                key={item.id}
                className={`flex flex-col items-center justify-center py-6 sm:py-8 px-2 sm:px-4 md:px-6 relative text-center ${
                  // On mobile (< md): 2x2 grid with center divider & horizontal rule
                  idx % 2 === 0 ? 'border-r border-[rgba(16,32,58,0.12)]' : ''
                } ${
                  idx < 2 ? 'border-b md:border-b-0 border-[rgba(16,32,58,0.12)]' : ''
                } ${
                  // On tablet & desktop (>= md): 4 columns in one row with 3 vertical dividers
                  idx < 3 ? 'md:border-r md:border-[rgba(16,32,58,0.12)]' : 'md:border-r-0'
                }`}
              >
                {/* Large Distinctive Editorial Serif Numeral */}
                <div className="flex items-center justify-center leading-none select-none">
                  <span
                    className="font-serif font-normal text-4xl xs:text-5xl sm:text-6xl md:text-5xl lg:text-[72px] xl:text-[78px] text-[#10203A] tracking-[-0.02em] tabular-nums"
                    style={{ fontFeatureSettings: '"tnum"' }}
                  >
                    {displayValue}
                  </span>
                  {item.suffix && (
                    <span
                      className="text-[#C85A17] font-sans font-light text-2xl xs:text-3xl sm:text-4xl md:text-3xl lg:text-[48px] xl:text-[52px] ml-1 sm:ml-1.5 transform -translate-y-1 sm:-translate-y-2 select-none"
                      aria-hidden="true"
                    >
                      {item.suffix}
                    </span>
                  )}
                </div>

                {/* Uppercase spacious subtitle below */}
                <span className="font-sans font-semibold text-[10px] xs:text-[11px] sm:text-xs text-[#4A5B78] uppercase tracking-[0.18em] sm:tracking-[0.22em] mt-3 sm:mt-4 md:mt-5">
                  {item.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default MilestonesSection;
