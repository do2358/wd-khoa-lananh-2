import { XIcon } from 'lucide-react';
import { AnimatePresence, m } from 'motion/react';
import { useMediaQuery } from 'react-responsive';

import { cn } from '@/libs/utils';

const imgs = (pType = 'h') => {
  if (pType === 'h')
    return {
      image1: '/thiep/thiep-nha-gai-1-01.jpg',
      image2: '/thiep/thiep-nha-gai-1-02.png',
      image3: '/thiep/thiep-nha-gai-1-03.jpg',
    };
  if (pType === 't-31')
    return {
      image1: '/thiep/thiep-nha-trai-2-01.jpg',
      image2: '/thiep/thiep-nha-trai-2-02.png',
      image3: '/thiep/thiep-nha-trai-1-03.jpg',
    };
  return {
    image1: '/thiep/thiep-nha-trai-1-01.jpg',
    image2: '/thiep/thiep-nha-trai-1-02.png',
    image3: '/thiep/thiep-nha-trai-1-03.jpg',
  };
};

const image4 = '/thiep/thiep-bia-1-01.jpg';
const image5 = '/thiep/thiep-bia-1-02.jpg';

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
type TBgBookOpeningProps = {
  pType?: string;
  pName?: string;
  className?: string;
  isOpen?: boolean;
  setIsOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  renderName?: React.ReactNode;
  renderOpenExtra?: React.ReactNode;
};
export function BgBookOpening({ pType, pName, className, isOpen, setIsOpen, renderName, renderOpenExtra }: TBgBookOpeningProps) {
  const mediaAbove640 = useMediaQuery({ minWidth: 640 });
  // // Trigger open when in view
  // if (isInView && !isOpen) {
  //   setIsOpen(true);
  // }

  const handleClose = () => {
    setIsOpen?.(false);
  };

  const handleOpen = () => {
    if (!isOpen) {
      setIsOpen?.(true);
    }
  };

  return (
    <div className={cn('relative mx-auto flex w-dvw items-center justify-center overflow-hidden px-4 max-sm:min-h-dvh sm:h-dvh', className)}>
      {/* 
        // 
        Close Button */}
      <AnimatePresence>
        {isOpen && !!setIsOpen && (
          <m.button
            animate={{ opacity: 1, scale: 1 }}
            aria-label="Close book"
            exit={{ opacity: 0, scale: 0.8 }}
            initial={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.2 }}
            className="absolute top-4 right-4 z-50 rounded-full bg-gray-900/10 p-2 transition-colors duration-200 hover:bg-gray-900/20"
            onClick={handleClose}
          >
            <XIcon className="h-6 w-6 text-gray-900" />
          </m.button>
        )}
      </AnimatePresence>

      {/*
        // 
        Book Container - Closed State */}
      <m.div
        animate={isOpen ? 'open' : 'closed'}
        initial="closed"
        style={{ transformStyle: 'preserve-3d', perspective: '2000px' }}
        transition={bookSpring}
        variants={bookVariants}
        whileHover={!isOpen ? { scale: 1.02 } : {}}
        className={cn('relative z-11 mx-auto flex h-dvh w-dvw cursor-pointer items-center justify-center', isOpen && 'pointer-events-none hidden')}
        onClick={handleOpen}
      >
        {/* Closed Book (Back Cover) */}
        <div style={{ transformStyle: 'preserve-3d' }} className="relative mx-auto h-[calc(100dvh-24px)] max-h-[620px] w-[90vw] overflow-visible rounded-lg shadow-2xl sm:w-130">
          {/* Image 4 - Left half of back */}
          <div className="absolute top-0 left-0 z-0 h-[calc(100dvh-24px)] max-h-[620px] w-52 overflow-hidden rounded-l-lg shadow-xl">
            <img alt="Cover left" src={image4} className="h-full w-full object-cover object-center" />
          </div>
          {/* Image 5 - Right half of back */}
          <m.div
            animate={{
              rotateY: [5, 20, 5],
            }}
            initial={{ rotateY: -5 }}
            style={{
              transformStyle: 'preserve-3d',
              transformOrigin: 'right center',
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="absolute top-0 right-0 z-10 h-[calc(100dvh-24px)] max-h-[620px] w-82 overflow-hidden rounded-lg shadow-xl"
          >
            <img alt="Cover right" src={image5} className="h-full w-full object-cover object-center" />
          </m.div>
          {/* Book spine effect */}
          <div className="absolute inset-y-0 left-1/2 w-1 -translate-x-1/2 bg-linear-to-b from-gray-900/30 via-gray-900/10 to-gray-900/30" />
        </div>
      </m.div>

      {/*
        // 
        Opening Animation Covers */}
      <m.div
        animate={{ opacity: isOpen ? 0 : 1 }}
        initial={{ opacity: 1 }}
        style={{ transformStyle: 'preserve-3d', perspective: '2000px' }}
        transition={{ duration: 0.5 }}
        className={cn('pointer-events-none absolute top-1/2 left-1/2 z-0 flex -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-lg bg-primary-400', !isOpen && 'hidden')}
      >
        {/* Left Cover (Image 4) */}
        <m.div
          animate={isOpen ? 'open' : 'closed'}
          initial="closed"
          style={{
            transformStyle: 'preserve-3d',
            transformOrigin: 'left center',
            right: 'calc(50% - 0.25rem)',
          }}
          transition={coverSpring}
          variants={leftCoverVariants}
          className="absolute h-[calc(100dvh-24px)] max-h-[620px] w-52 overflow-hidden rounded-l-lg shadow-xl"
        >
          <img alt="Cover left" src={image4} className="h-full w-full object-cover object-center" />
        </m.div>

        {/* Right Cover (Image 5) */}
        <m.div
          animate={isOpen ? 'open' : 'closed'}
          initial="closed"
          style={{
            transformStyle: 'preserve-3d',
            transformOrigin: 'right center',
            left: 'calc(50% - 0.25rem)',
          }}
          transition={coverSpring}
          variants={rightCoverVariants}
          className="absolute h-[calc(100dvh-24px)] max-h-[620px] w-82 overflow-hidden rounded-r-lg shadow-xl"
        >
          <img alt="Cover right" src={image5} className="h-full w-full object-cover object-center" />
        </m.div>
      </m.div>

      {/*
        // 
        Revealed Content (Images 1, 2, 3) */}
      <m.div
        animate={isOpen ? 'open' : 'closed'}
        initial="closed"
        style={{ perspective: '1000px' }}
        transition={{ ...revealSpring, delay: 0.3 }}
        variants={revealedContentVariants}
        className={cn(`relative flex translate-x-0 items-center justify-center gap-0 max-sm:flex-col sm:translate-x-10`, !isOpen && 'pointer-events-none hidden')}
      >
        {/* Image 1 - Left (skewed inward) */}
        <m.div
          animate={isOpen ? 'open' : 'closed'}
          initial="closed"
          style={{ transformOrigin: 'right center' }}
          transition={{ ...imageSpring, delay: 0.5 }}
          variants={mediaAbove640 ? leftImageVariants : centerImageVariants}
          className="h-[calc(100dvh-24px)] max-h-[620px] w-auto overflow-hidden rounded-none rounded-l-lg shadow-lg"
        >
          <img alt="Save the Date" src={imgs(pType)?.image1} className="h-full w-full object-contain" />
        </m.div>

        {/* Image 2 - Center (larger, main) */}
        <m.div
          animate={isOpen ? 'open' : 'closed'}
          initial="closed"
          transition={{ ...imageSpring, delay: 0.4 }}
          variants={centerImageVariants}
          className="relative z-10 h-fit w-dvw overflow-hidden max-sm:px-2 sm:mx-0.5 sm:h-[calc(100dvh-24px)] sm:max-h-[620px] sm:max-h-[620px] sm:w-auto sm:shadow-2xl"
        >
          <img alt="Wedding Invitation" src={imgs(pType)?.image2} className="h-full w-full object-contain object-top" />
          {renderName}
        </m.div>

        {/* Image 3 - Right (skewed inward) */}
        <m.div
          animate={isOpen ? 'open' : 'closed'}
          initial="closed"
          style={{ transformOrigin: 'left center' }}
          transition={{ ...imageSpring, delay: 0.5 }}
          variants={mediaAbove640 ? rightImageVariants : centerImageVariants}
          className="h-fit w-dvw overflow-hidden rounded-none shadow-lg max-sm:px-2 sm:h-[calc(100dvh-24px)] sm:max-h-[620px] sm:w-auto sm:rounded-r-lg"
        >
          <img alt="Ceremony Details" src={imgs(pType)?.image3} className="h-full w-full object-contain" />
        </m.div>

        {renderOpenExtra}
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
              className="text-muted-gray-900 absolute bottom-8 left-1/2 -translate-x-1/2 text-sm"
            >
              Click or scroll to open
            </m.div>
          )}
        </AnimatePresence> */}
    </div>
  );
}
