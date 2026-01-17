import { m } from 'motion/react';
import React, { memo, useMemo } from 'react';

type TImageRotateProps = { src: string; style?: React.CSSProperties };

const ImageRotate = ({ src, style }: TImageRotateProps) => {
  const zIndex = style?.zIndex || 10;
  const rotate = useMemo(() => Math.random() * 20 - 10, []);
  return (
    <m.div
      style={{ rotate }}
      whileHover={{
        scale: 1.1,
        rotate: 0,
        zIndex,
      }}
      whileTap={{
        scale: 1.1,
        rotate: 0,
        zIndex,
      }}
      className="mt-4 -mr-4 shrink-0 overflow-hidden rounded-xl border border-neutral-100 bg-white p-1"
    >
      <img
        alt="bali images"
        height={300}
        src={src}
        style={{ width: 300, height: 300, ...style }}
        width={300}
        className="shrink-0 rounded-lg object-cover"
        // loading="eager"
      />
    </m.div>
  );
};

export default memo(ImageRotate);
