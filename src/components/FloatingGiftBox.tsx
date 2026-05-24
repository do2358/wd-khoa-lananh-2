import { m, AnimatePresence } from 'motion/react';
import { useState } from 'react';

import { cn } from '@/libs/utils';

interface FloatingGiftBoxProps {
  onClick: () => void;
  className?: string;
}

const FloatingGiftBox = ({ onClick, className }: FloatingGiftBoxProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);

  const handleClick = () => {
    setIsClicked(true);
    setTimeout(() => setIsClicked(false), 600);
    onClick();
  };

  return (
    <m.button
      type="button"
      className={cn(
        'group fixed right-4 bottom-20 z-40 flex flex-col items-center gap-1 focus:outline-none',
        'sm:right-6 sm:bottom-24',
        className,
      )}
      initial={{ opacity: 0, scale: 0, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ delay: 1.5, type: 'spring', stiffness: 260, damping: 20 }}
      onClick={handleClick}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      {/* Tooltip */}
      <AnimatePresence>
        {isHovered && (
          <m.div
            initial={{ opacity: 0, y: 6, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6, scale: 0.9 }}
            transition={{ duration: 0.15 }}
            className="rounded-full bg-red-600 px-3 py-1 text-xs font-semibold text-white shadow-lg whitespace-nowrap"
          >
            Mừng cưới 🧧
          </m.div>
        )}
      </AnimatePresence>

      {/* Gift Box Button */}
      <m.div
        animate={
          isClicked
            ? { scale: [1, 1.3, 0.9, 1.1, 1], rotate: [0, -10, 10, -5, 0] }
            : {
                y: [0, -8, 0],
                rotate: [0, 3, -3, 0],
              }
        }
        transition={
          isClicked
            ? { duration: 0.5 }
            : {
                duration: 2.5,
                repeat: Infinity,
                repeatType: 'loop',
                ease: 'easeInOut',
              }
        }
        className="relative"
      >
        {/* Glow ring */}
        <m.div
          animate={{ scale: [1, 1.4, 1], opacity: [0.6, 0, 0.6] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute inset-0 rounded-full bg-red-400 blur-md"
        />

        {/* Main button */}
        <div className="relative flex size-14 items-center justify-center rounded-full bg-gradient-to-br from-red-500 to-rose-600 shadow-xl ring-2 ring-white/60 sm:size-16">
          {/* Gift box SVG */}
          <GiftBoxSvg />
        </div>
      </m.div>
    </m.button>
  );
};

function GiftBoxSvg() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 64 64"
      className="size-8 sm:size-9"
      fill="none"
    >
      {/* Box body */}
      <rect x="8" y="28" width="48" height="30" rx="3" fill="#fff" fillOpacity="0.95" />
      {/* Box lid */}
      <rect x="6" y="20" width="52" height="12" rx="3" fill="#fff" fillOpacity="0.85" />
      {/* Vertical ribbon on body */}
      <rect x="29" y="28" width="6" height="30" fill="#e11d48" fillOpacity="0.9" />
      {/* Horizontal ribbon on lid */}
      <rect x="6" y="23" width="52" height="6" fill="#e11d48" fillOpacity="0.9" />
      {/* Bow left loop */}
      <ellipse cx="23" cy="18" rx="10" ry="6" fill="#fb7185" transform="rotate(-20 23 18)" />
      {/* Bow right loop */}
      <ellipse cx="41" cy="18" rx="10" ry="6" fill="#fb7185" transform="rotate(20 41 18)" />
      {/* Bow center */}
      <circle cx="32" cy="20" r="5" fill="#e11d48" />
      <circle cx="32" cy="20" r="2.5" fill="#fff" fillOpacity="0.7" />
      {/* Sparkles */}
      <circle cx="14" cy="40" r="2" fill="#fbbf24" fillOpacity="0.8" />
      <circle cx="50" cy="36" r="1.5" fill="#fbbf24" fillOpacity="0.8" />
      <circle cx="48" cy="50" r="1.5" fill="#fbbf24" fillOpacity="0.6" />
    </svg>
  );
}

export default FloatingGiftBox;
