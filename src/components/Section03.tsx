import { Image } from '@unpic/react';
import { useMotionValueEvent, useScroll } from 'motion/react';
import { useEffect, useRef, useState } from 'react';
import { useMediaQuery } from 'react-responsive';

import { cn } from '@/libs/utils';

import FlickeringGrid from './animation/FlickeringGrid';
import { BgBookOpening } from './background/BgBookOpening';
import { DoubleHappyFillSvg } from './icons';

type TSection03Props = { pType?: string; pName?: string };

// Mờ Tùng

const Section03 = ({ pType, pName }: TSection03Props) => {
  const mediaAbove640 = useMediaQuery({ minWidth: 640 });
  const [isOpen, setIsOpen] = useState(false);
  const [scrollYProgressValue, setScrollYProgressValue] = useState(0);

  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 50%', 'end end'],
  });

  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    setScrollYProgressValue(latest);
  });

  useEffect(() => {
    if (!isOpen && scrollYProgressValue > 0.3) {
      setIsOpen(true);
    }
  }, [scrollYProgressValue]);

  return (
    <>
      <section id="invitation" ref={ref} className={'relative flex min-h-dvh flex-col items-center justify-center font-Questrial text-lg sm:-translate-y-30'}>
        <BgBookOpening
          isOpen={isOpen}
          pName={pName}
          pType={pType}
          renderName={
            <div className="absolute top-[12%] left-0 flex w-full justify-center px-6 text-center sm:top-[78px]">
              <div
                className={cn(
                  'line-clamp-2 max-w-[280px] text-center !font-DancingScript text-2xl leading-[1.1] font-600 text-red-600 sm:max-w-[320px] sm:text-2xl',
                  'animate-gradient bg-gradient-to-r from-[#991b1b] via-[#f87171] to-[#991b1b] bg-[length:var(--bg-size)_100%] bg-clip-text text-transparent [--bg-size:300%]',
                )}
              >
                {pName}
              </div>
            </div>
          }
          renderOpenExtra={
            <>
              <div className="relative z-10 mt-4 flex items-center justify-center rounded-full max-sm:hidden sm:absolute sm:-bottom-20 sm:-left-20 sm:mt-0 sm:-translate-x-1/2">
                <Image alt="2611" height={0} src="/images/savethedate.svg" width={200} className="z-10 w-40 bg-transparent object-cover sm:w-50" />
                <div className="absolute top-[26px] left-1/2 z-0 size-[140px] -translate-x-1/2 rounded-full border border-red-500/20 bg-white sm:top-[33px] sm:size-[180px]"></div>
              </div>

              {mediaAbove640 && <DoubleHappyFillSvg className="absolute -right-15 -bottom-20 z-10 h-auto w-50 translate-x-1/2 animate-[bounceY_10s_linear_infinite] object-cover text-red-700" />}
            </>
          }
        ></BgBookOpening>

        <div className={cn('absolute top-1/2 left-0 -z-10 w-full -translate-y-1/2 overflow-hidden', isOpen && 'top-[calc(50%-40px)]')}>
          <FlickeringGrid color="#dc2626" flickerChance={0.1} gridGap={6} height={300} maxOpacity={0.5} squareSize={4} width={3000} className="" />
        </div>
      </section>
    </>
  );
};

export default Section03;
