import { useState, useRef, useCallback } from 'react';

export const CardDeck = ({
  cards,
  hintText = 'Drag or use the arrow keys to cycle cards',
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0, rot: 0, scale: 1 });
  const [isDragging, setIsDragging] = useState(false);
  const [isThrowing, setIsThrowing] = useState(false);
  const [throwDirection, setThrowDirection] = useState(null);

  const deckRef = useRef(null);
  const startPos = useRef({ x: 0, y: 0 });

  // Advance card with throw animation
  const cycleNext = useCallback((direction = 'right') => {
    setIsThrowing(true);
    setThrowDirection(direction);

    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % cards.length);
      setIsThrowing(false);
      setThrowDirection(null);
      setDragOffset({ x: 0, y: 0, rot: 0, scale: 1 });
    }, 280);
  }, [cards.length]);

  const cyclePrev = useCallback(() => {
    setIsThrowing(true);
    setThrowDirection('left');

    setTimeout(() => {
      setCurrentIndex((prev) => (prev - 1 + cards.length) % cards.length);
      setIsThrowing(false);
      setThrowDirection(null);
      setDragOffset({ x: 0, y: 0, rot: 0, scale: 1 });
    }, 280);
  }, [cards.length]);

  // Pointer event handlers
  const handlePointerDown = (e) => {
    if (isThrowing) return;
    try {
      e.currentTarget.setPointerCapture(e.pointerId);
    } catch {
      // ignore
    }
    startPos.current = { x: e.clientX, y: e.clientY };
    setIsDragging(true);
  };

  const handlePointerMove = (e) => {
    if (!isDragging || isThrowing) return;
    const deltaX = e.clientX - startPos.current.x;
    const deltaY = (e.clientY - startPos.current.y) * 0.35; // damped vertical drag
    const deckWidth = deckRef.current?.offsetWidth || 340;
    const rot = (deltaX / deckWidth) * 16;
    const scale = 1 + Math.min(0.04, (Math.abs(deltaX) / deckWidth) * 0.05);

    setDragOffset({ x: deltaX, y: deltaY, rot, scale });
  };

  const handlePointerUp = (e) => {
    if (!isDragging || isThrowing) return;
    setIsDragging(false);

    try {
      e.currentTarget.releasePointerCapture(e.pointerId);
    } catch {
      // ignore
    }

    const deckWidth = deckRef.current?.offsetWidth || 340;
    const threshold = deckWidth * 0.12; // roughly 1/10th of deck width

    if (dragOffset.x > threshold) {
      cycleNext('right');
    } else if (dragOffset.x < -threshold) {
      cycleNext('left');
    } else {
      // Snap back
      setDragOffset({ x: 0, y: 0, rot: 0, scale: 1 });
    }
  };

  const handlePointerCancel = () => {
    if (!isDragging) return;
    setIsDragging(false);
    setDragOffset({ x: 0, y: 0, rot: 0, scale: 1 });
  };

  // Keyboard navigation
  const handleKeyDown = (e) => {
    if (e.key === 'ArrowRight') {
      e.preventDefault();
      cycleNext('right');
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      cyclePrev();
    }
  };

  // Stack offsets for cards in depth
  const getStackStyle = (stackRank) => {
    if (stackRank === 0) {
      // Top active card
      if (isThrowing) {
        const throwX = throwDirection === 'left' ? -420 : 420;
        const throwRot = throwDirection === 'left' ? -26 : 26;
        return {
          transform: `translate3d(${throwX}px, -24px, 0) rotate(${throwRot}deg) scale(1.02)`,
          opacity: 0,
          transition: 'transform 0.28s cubic-bezier(0.2, 0.8, 0.4, 1), opacity 0.28s linear',
          zIndex: 30,
        };
      }

      if (isDragging) {
        return {
          transform: `translate3d(${dragOffset.x}px, ${dragOffset.y}px, 0) rotate(${dragOffset.rot}deg) scale(${dragOffset.scale})`,
          transition: 'none',
          cursor: 'grabbing',
          zIndex: 30,
        };
      }

      return {
        transform: 'translate3d(0, 0, 0) rotate(0deg) scale(1)',
        transition: 'transform 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
        cursor: 'grab',
        zIndex: 30,
      };
    }

    if (stackRank === 1) {
      return {
        transform: 'translate3d(8px, 12px, 0) rotate(2deg) scale(0.96)',
        transition: 'transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
        zIndex: 20,
      };
    }

    if (stackRank === 2) {
      return {
        transform: 'translate3d(-8px, 22px, 0) rotate(-2deg) scale(0.92)',
        transition: 'transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
        zIndex: 10,
      };
    }

    // Stack 3 or beyond
    return {
      transform: 'translate3d(0, 30px, 0) rotate(1deg) scale(0.88)',
      opacity: 0.6,
      zIndex: 5,
    };
  };

  // Prepare visible stack (up to 4 cards)
  const visibleCards = [0, 1, 2, 3].map((offset) => {
    const cardIndex = (currentIndex + offset) % cards.length;
    return {
      card: cards[cardIndex],
      rank: offset,
      originalIndex: cardIndex,
    };
  });

  return (
    <div className="w-full flex flex-col items-center select-none">
      {/* Physical Stack Deck Container */}
      <div
        ref={deckRef}
        tabIndex={0}
        role="region"
        aria-roledescription="carousel"
        aria-label="Dance Style Cards Deck"
        onKeyDown={handleKeyDown}
        className="relative w-[280px] sm:w-[330px] md:w-[360px] h-[460px] sm:h-[490px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#145A96] rounded-2xl"
        style={{ touchAction: 'pan-y' }}
      >
        {[...visibleCards].reverse().map(({ card, rank, originalIndex }) => {
          const isTop = rank === 0;
          return (
            <div
              key={`${card.id}-${originalIndex}`}
              onPointerDown={isTop ? handlePointerDown : undefined}
              onPointerMove={isTop ? handlePointerMove : undefined}
              onPointerUp={isTop ? handlePointerUp : undefined}
              onPointerCancel={isTop ? handlePointerCancel : undefined}
              className="absolute inset-0 w-full h-full bg-white rounded-2xl border border-[rgba(34,34,34,0.12)] card-deck-shadow overflow-hidden will-change-transform flex flex-col"
              style={getStackStyle(rank)}
            >
              {/* Card Image */}
              <div className="relative w-full h-[54%] overflow-hidden bg-[#F1F3F5]">
                <img
                  src={card.image}
                  alt={card.name}
                  width="360"
                  height="260"
                  decoding="async"
                  className="w-full h-full object-cover pointer-events-none"
                  loading="lazy"
                />
                {/* Category Pill Tag */}
                <div className="absolute top-3.5 left-3.5">
                  <span className="px-2.5 py-1 rounded bg-[#FFFFFF]/90 backdrop-blur-sm border border-[rgba(34,34,34,0.12)] text-[9.5px] font-bold text-[#222222] uppercase tracking-[0.12em]">
                    {card.tag}
                  </span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between bg-white pointer-events-none">
                <div>
                  <div className="flex items-center justify-between">
                    <h3 className="font-display font-bold text-xl sm:text-2xl text-[#145A96]">
                      {card.name}
                    </h3>
                    <span className="text-[10px] font-semibold text-[#F28C28] uppercase tracking-[0.14em]">
                      {card.details.intensity}
                    </span>
                  </div>
                  <p className="mt-2 text-xs sm:text-[13px] text-[#222222]/75 leading-relaxed line-clamp-2">
                    {card.summary}
                  </p>
                </div>

                {/* Card Footer Detail */}
                <div className="pt-3 border-t border-[rgba(34,34,34,0.1)] flex items-center justify-between text-[10.5px]">
                  <span className="font-semibold text-[#222222] tracking-[0.05em]">
                    {card.details.focus}
                  </span>
                  <span className="text-[#222222]/60 text-[9.5px] uppercase tracking-[0.1em]">
                    {card.details.mentor}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Control Hint & Progress Dots */}
      <div className="mt-6 flex flex-col items-center gap-3">
        <p className="text-[10.5px] font-medium text-[#222222]/60 uppercase tracking-[0.15em] flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[#145A96]" />
          {hintText}
        </p>

        {/* Progress Dots */}
        <div className="flex items-center gap-2" aria-label="Deck pagination">
          {cards.map((c, idx) => (
            <button
              key={c.id}
              type="button"
              onClick={() => setCurrentIndex(idx)}
              aria-label={`Go to ${c.name} card`}
              className={`h-2 transition-all duration-200 rounded-full focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#145A96] ${
                idx === currentIndex
                  ? 'w-6 bg-[#145A96]'
                  : 'w-2 bg-[rgba(34,34,34,0.2)] hover:bg-[rgba(34,34,34,0.4)]'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
