import { m, useScroll, useTransform } from 'motion/react';
import React, { useEffect, useId, useRef, useState } from 'react';
import { useMediaQuery } from 'react-responsive';

import { cn } from '@/libs/utils';

import ScrollArea from '../ScrollArea';

interface TimelineEntry {
  center: React.ReactNode;
  left?: React.ReactNode;
  right?: React.ReactNode;
  className?: string;
}

export const Timeline = ({ data }: { data: TimelineEntry[] }) => {
  const uid = useId();
  const ref = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);
  const mediaAbove640 = useMediaQuery({ minWidth: 640 });

  useEffect(() => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      setHeight(rect.height);
    }
  }, [ref]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 10%', 'end 100%'],
  });

  const heightTransform = useTransform(scrollYProgress, [0, 1], [0, height]);
  const opacityTransform = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

  return (
    <>
      {/* Mobile horizontal layout */}
      {!mediaAbove640 && (
        <div className="w-full bg-white py-10 font-sans">
          <ScrollArea suppressScrollY className="w-full">
            <div className="flex gap-6 px-6 pb-4">
              {data.map((item, index) => (
                <div key={uid + index} className={cn('relative flex min-w-[300px] flex-shrink-0 flex-col gap-4', item?.className)}>
                  {/* Center content (usually time badge) */}
                  <div className="flex items-center justify-center">{item.center}</div>

                  {/* Left/Right content stacked vertically on mobile */}
                  {item.left && <div className="flex flex-col">{item.left}</div>}
                  {item.right && <div className="flex flex-col">{item.right}</div>}

                  {/* Connector Line (except for last item) */}
                  {index < data.length - 1 && <div className="absolute top-1/4 -right-6 h-0.5 w-6 bg-gradient-to-r from-red-400 to-red-200" />}
                </div>
              ))}
            </div>
          </ScrollArea>
        </div>
      )}

      {/* Desktop vertical layout (original) - Always rendered for refs */}
      <div ref={containerRef} className={cn('w-full bg-white font-sans md:px-10', !mediaAbove640 && 'hidden')}>
        <div ref={ref} className="relative mx-auto max-w-7xl pb-20">
          {data.map((item, index) => (
            <m.div key={uid + index} className={cn('flex flex-row justify-center', index % 2 !== 0 && 'flex-row-reverse', item?.className)}>
              {item.left}

              {item.center}

              {item.right}
            </m.div>
          ))}
          <div
            style={{
              height: height + 'px',
            }}
            className="absolute top-0 left-1/2 w-[2px] -translate-x-1/2 overflow-hidden bg-[linear-gradient(to_bottom,var(--tw-gradient-stops))] from-transparent from-0% via-neutral-200 to-transparent to-[99%] [mask-image:linear-gradient(to_bottom,transparent_0%,black_10%,black_90%,transparent_100%)] "
          >
            <m.div
              style={{
                height: heightTransform,
                opacity: opacityTransform,
              }}
              className="absolute inset-x-0 top-0 w-[2px] rounded-full bg-gradient-to-t from-red-600 from-0% via-red-400 via-10% to-transparent"
            />
          </div>
        </div>
      </div>
    </>
  );
};
