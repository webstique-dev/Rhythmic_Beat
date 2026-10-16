import { useMemo } from 'react';
import { DISCIPLINES } from '../data/disciplines';

export const DisciplineWatermark = ({
  discipline = 'bharatanatyam',
  position = 'right', // 'right' | 'left' | 'top-right' | 'bottom-right' | 'bottom-left' | 'center'
  color = 'blue', // 'blue' | 'orange' | 'white' | custom hex
  opacity = 0.055,
  size = 'clamp(200px, 26vw, 420px)',
  rotation = 0,
  showLabel = false,
  className = '',
}) => {
  const data = DISCIPLINES[discipline] || DISCIPLINES.bharatanatyam;

  // Resolve background fill color for CSS mask
  const fillColor = useMemo(() => {
    if (color === 'blue') return '#145A96';
    if (color === 'orange') return '#F28C28';
    if (color === 'white') return '#FFFFFF';
    return color;
  }, [color]);

  // Position classes
  const positionClass = useMemo(() => {
    switch (position) {
      case 'left':
        return 'left-[-30px] sm:left-[-10px] lg:left-[2%] top-1/2 -translate-y-1/2';
      case 'right':
        return 'right-[-30px] sm:right-[-10px] lg:right-[2%] top-1/2 -translate-y-1/2';
      case 'top-left':
        return 'left-2 sm:left-6 lg:left-12 top-4 sm:top-8';
      case 'top-right':
        return 'right-2 sm:right-6 lg:right-12 top-4 sm:top-8';
      case 'bottom-left':
        return 'left-[-10px] sm:left-4 lg:left-10 bottom-3 sm:bottom-6';
      case 'bottom-right':
        return 'right-[-10px] sm:right-4 lg:right-10 bottom-3 sm:bottom-6';
      case 'top-center':
        return 'left-1/2 -translate-x-1/2 top-4 sm:top-8';
      case 'bottom-center':
        return 'left-1/2 -translate-x-1/2 bottom-4 sm:bottom-8';
      case 'center':
        return 'left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2';
      default:
        return 'right-2 lg:right-10 top-1/2 -translate-y-1/2';
    }
  }, [position]);

  return (
    <div
      className={`absolute pointer-events-none select-none z-0 overflow-hidden flex flex-col items-center justify-center transition-opacity duration-300 ${positionClass} ${className}`}
      aria-hidden="true"
      style={{
        width: size,
        height: size,
      }}
    >
      <div
        className="w-full h-full flex flex-col items-center justify-center will-change-transform"
        style={{
          transform: rotation ? `rotate(${rotation}deg)` : undefined,
        }}
      >
        {/* Mask-based Silhouette Figure */}
        <div
          className="w-full h-full will-change-transform"
          style={{
            maskImage: `url(${data.figure})`,
            WebkitMaskImage: `url(${data.figure})`,
            maskSize: 'contain',
            WebkitMaskSize: 'contain',
            maskRepeat: 'no-repeat',
            WebkitMaskRepeat: 'no-repeat',
            maskPosition: 'center',
            WebkitMaskPosition: 'center',
            backgroundColor: fillColor,
            opacity: opacity,
          }}
        />

        {/* Optional Subtle Discipline Tag */}
        {showLabel && (
          <span
            className="mt-2 text-[8.5px] sm:text-[9.5px] font-bold uppercase tracking-[0.2em] px-2.5 py-0.5 rounded-full border border-black/5"
            style={{
              color: fillColor,
              opacity: Math.min(1, opacity * 3),
            }}
          >
            {data.name}
          </span>
        )}
      </div>
    </div>
  );
};

export default DisciplineWatermark;
