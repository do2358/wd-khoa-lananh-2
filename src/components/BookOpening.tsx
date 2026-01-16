import { XIcon } from 'lucide-react';
import { AnimatePresence, m, useInView } from 'motion/react';
import { useRef, useState } from 'react';

const image1 = '/images/thiep-nha-gai-1-01.jpg';
const image2 = '/images/thiep-nha-gai-1-02.jpg';
const image3 = '/images/thiep-nha-gai-1-03.jpg';
const image4 = '/images/thiep-bia-1-01.jpg';
const image5 = '/images/thiep-bia-1-02.jpg';

// Spring configurations
const bookSpring = { type: 'spring' as const, stiffness: 100, damping: 15, mass: 1 };
const coverSpring = { type: 'spring' as const, stiffness: 80, damping: 12, mass: 1.2 };
const revealSpring = { type: 'spring' as const, stiffness: 120, damping: 14, mass: 0.8 };
const imageSpring = { type: 'spring' as const, stiffness: 100, damping: 10, mass: 0.6 };

const bookVariants = {
  closed: { opacity: 1, scale: 1 },
  open: { opacity: 0, scale: 0.9 },
};

const leftCoverVariants = {
  closed: { rotateY: 0 },
  open: { rotateY: -120 },
};

const rightCoverVariants = {
  closed: { rotateY: 0 },
  open: { rotateY: 120 },
};

const revealedContentVariants = {
  closed: { opacity: 0, y: 32 },
  open: { opacity: 1, y: 0 },
};

const leftImageVariants = {
  closed: { rotateY: 45, opacity: 0, x: -20 },
  open: { rotateY: 15, skewY: -3, opacity: 1, x: 0 },
};

const centerImageVariants = {
  closed: { scale: 0.8, opacity: 0, y: 20 },
  open: { scale: 1, opacity: 1, y: 0 },
};

const rightImageVariants = {
  closed: { rotateY: -45, opacity: 0, x: 20 },
  open: { rotateY: -15, skewY: 3, opacity: 1, x: 0 },
};

//
// MAIN
//
export function BookOpening() {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { amount: 0.5, once: false });

  // // Trigger open when in view
  // if (isInView && !isOpen) {
  //   setIsOpen(true);
  // }

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleOpen = () => {
    if (!isOpen) {
      setIsOpen(true);
    }
  };

  return (
    <div ref={containerRef} className="">
      <div className="relative mx-auto flex h-dvh w-dvw items-center justify-center overflow-hidden px-4">
        {/* Close Button */}
        <AnimatePresence>
          {isOpen && (
            <m.button
              animate={{ opacity: 1, scale: 1 }}
              aria-label="Close book"
              exit={{ opacity: 0, scale: 0.8 }}
              initial={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.2 }}
              className="bg-foreground/10 hover:bg-foreground/20 absolute top-4 right-4 z-50 rounded-full p-2 transition-colors duration-200"
              onClick={handleClose}
            >
              <XIcon className="text-foreground h-6 w-6" />
            </m.button>
          )}
        </AnimatePresence>

        {/* Book Container - Closed State */}
        <m.div
          animate={isOpen ? 'open' : 'closed'}
          initial="closed"
          style={{ transformStyle: 'preserve-3d' }}
          transition={bookSpring}
          variants={bookVariants}
          whileHover={!isOpen ? { scale: 1.02 } : {}}
          className={`relative z-10 mx-auto flex h-dvh w-dvw items-center justify-center bg-white ${isOpen ? 'pointer-events-none hidden' : 'cursor-pointer'}`}
          onClick={handleOpen}
        >
          {/* Closed Book (Back Cover) */}
          <div className="relative mx-auto h-[calc(100dvh-24px)] max-h-[600px] w-130 overflow-hidden rounded-lg shadow-2xl">
            {/* Image 4 - Left half of back */}
            <div className="absolute top-0 left-0 h-[calc(100dvh-24px)] max-h-[600px] w-50 shadow-xl">
              <img alt="Cover left" src={image4} className="h-full w-full object-cover object-center" />
            </div>
            {/* Image 5 - Right half of back */}
            <div className="absolute top-0 right-0 h-[calc(100dvh-24px)] max-h-[600px] w-80 shadow-xl">
              <img alt="Cover right" src={image5} className="h-full w-full object-cover object-center" />
            </div>
            {/* Book spine effect */}
            <div className="from-foreground/30 via-foreground/10 to-foreground/30 absolute inset-y-0 left-1/2 w-1 -translate-x-1/2 bg-gradient-to-b" />
          </div>
        </m.div>

        {/* Opening Animation Covers */}
        <m.div
          animate={{ opacity: isOpen ? 0 : 1 }}
          initial={{ opacity: 1 }}
          style={{ transformStyle: 'preserve-3d' }}
          transition={{ duration: 0.5 }}
          className={`absolute inset-0 z-0 flex h-dvh w-dvw items-center justify-center ${isOpen ? 'pointer-events-none' : ''}`}
        >
          {/* Left Cover (Image 4) */}
          <m.div
            animate={isOpen ? 'open' : 'closed'}
            initial="closed"
            style={{
              transformStyle: 'preserve-3d',
              right: 'calc(50% - 0.25rem)',
              height: 'calc(100dvh - 24px)',
              maxHeight: 600,
            }}
            transition={coverSpring}
            variants={leftCoverVariants}
            className="absolute w-50 origin-center overflow-hidden rounded-l-lg shadow-xl"
          >
            <img alt="Cover left" src={image4} className="h-full w-full object-cover object-center" />
          </m.div>

          {/* Right Cover (Image 5) */}
          <m.div
            animate={isOpen ? 'open' : 'closed'}
            initial="closed"
            style={{
              transformStyle: 'preserve-3d',
              left: 'calc(50% - 0.25rem)',
              height: 'calc(100dvh - 24px)',
              maxHeight: 600,
            }}
            transition={coverSpring}
            variants={rightCoverVariants}
            className="absolute w-80 origin-center overflow-hidden rounded-r-lg shadow-xl"
          >
            <img alt="Cover right" src={image5} className="h-full w-full object-cover object-center" />
          </m.div>
        </m.div>

        {/* Revealed Content (Images 1, 2, 3) */}
        <m.div
          animate={isOpen ? 'open' : 'closed'}
          initial="closed"
          style={{ perspective: '1000px' }}
          transition={{ ...revealSpring, delay: 0.3 }}
          variants={revealedContentVariants}
          className={`flex items-center justify-center gap-0 ${!isOpen ? 'pointer-events-none hidden' : ''}`}
        >
          {/* Image 1 - Left (skewed inward) */}
          <m.div
            animate={isOpen ? 'open' : 'closed'}
            initial="closed"
            style={{ transformOrigin: 'right center' }}
            transition={{ ...imageSpring, delay: 0.5 }}
            variants={leftImageVariants}
            className="h-[calc(100dvh-24px)] max-h-[600px] w-auto overflow-hidden rounded-none shadow-lg"
          >
            <img alt="Save the Date" src={image1} className="h-full w-full object-contain" />
          </m.div>

          {/* Image 2 - Center (larger, main) */}
          <m.div
            animate={isOpen ? 'open' : 'closed'}
            initial="closed"
            transition={{ ...imageSpring, delay: 0.4 }}
            variants={centerImageVariants}
            className="z-10 mx-1 h-[calc(100dvh-24px)] max-h-[680px] w-auto overflow-hidden rounded-none shadow-2xl"
          >
            <img alt="Wedding Invitation" src={image2} className="h-full w-full object-contain" />
          </m.div>

          {/* Image 3 - Right (skewed inward) */}
          <m.div
            animate={isOpen ? 'open' : 'closed'}
            initial="closed"
            style={{ transformOrigin: 'left center' }}
            transition={{ ...imageSpring, delay: 0.5 }}
            variants={rightImageVariants}
            className="h-[calc(100dvh-24px)] max-h-[600px] w-auto overflow-hidden rounded-none shadow-lg"
          >
            <img alt="Ceremony Details" src={image3} className="h-full w-full object-contain" />
          </m.div>
        </m.div>

        {/* Scroll hint */}
        {/* <AnimatePresence>
          {!isOpen && (
            <m.div
              animate={{ opacity: 1, y: [0, -10, 0] }}
              exit={{ opacity: 0 }}
              initial={{ opacity: 0 }}
              transition={{
                opacity: { duration: 0.3 },
                y: { duration: 1.5, repeat: Infinity, ease: 'easeInOut' },
              }}
              className="text-muted-foreground absolute bottom-8 left-1/2 -translate-x-1/2 text-sm"
            >
              Click or scroll to open
            </m.div>
          )}
        </AnimatePresence> */}
      </div>
    </div>
  );
}
