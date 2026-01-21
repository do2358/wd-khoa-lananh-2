import { m, useAnimationFrame, useMotionTemplate, useMotionValue, useTransform } from 'motion/react';
import React, { useRef } from 'react';

export const MovingBorder = ({ children, duration = 2000, rx, ry, ...otherProps }: { children: React.ReactNode; duration?: number; rx?: string; ry?: string; [key: string]: any }) => {
  const pathRef = useRef<any>(null);
  const progress = useMotionValue<number>(0);

  useAnimationFrame((time) => {
    const length = pathRef.current?.getTotalLength();
    if (length) {
      const pxPerMillisecond = length / duration;
      progress.set((time * pxPerMillisecond) % length);
    }
  });

  const x = useTransform(progress, (val) => pathRef.current?.getPointAtLength(val).x);
  const y = useTransform(progress, (val) => pathRef.current?.getPointAtLength(val).y);

  const transform = useMotionTemplate`translateX(${x}px) translateY(${y}px) translateX(-50%) translateY(-50%)`;

  return (
    <>
      <svg height="100%" preserveAspectRatio="none" width="100%" xmlns="http://www.w3.org/2000/svg" className="absolute size-full" {...otherProps}>
        <rect fill="none" height="100%" ref={pathRef} rx={rx} ry={ry} width="100%" />
      </svg>
      <m.div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          display: 'inline-block',
          transform,
        }}
      >
        {children}
      </m.div>
    </>
  );
};
