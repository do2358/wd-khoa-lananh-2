import { type Variants, m } from 'motion/react';
import { type ForwardRefRenderFunction, forwardRef, useMemo } from 'react';

type FadeWrapperProps = {
  direction?: 'up' | 'down' | 'left' | 'right';
  framerProps?: Variants;
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
};

const FadeWrapper: ForwardRefRenderFunction<HTMLDivElement, FadeWrapperProps> = (
  {
    direction = 'down',
    framerProps = {
      hidden: { opacity: 0 },
      show: { opacity: 1, transition: { type: 'spring' } },
    },
    className,
    style,
    children,
    ...props
  },
  forwardedRef,
) => {
  const directionOffset = useMemo(() => {
    const map = { up: 10, down: -10, left: -10, right: 10 };
    return map[direction];
  }, [direction]);

  const axis = direction === 'up' || direction === 'down' ? 'y' : 'x';

  const FADE_ANIMATION_VARIANTS = useMemo<Variants>(() => {
    const { hidden, show, ...rest } = framerProps as {
      [name: string]: { [name: string]: number; opacity: number };
    };

    return {
      ...rest,
      hidden: {
        ...(hidden ?? {}),
        opacity: hidden?.opacity ?? 0,
        [axis]: hidden?.[axis] ?? directionOffset,
      },
      show: {
        transition: { type: 'spring', bounce: 0.5, duration: 5, delay: 5 },
        ...(show ?? {}),
        opacity: show?.opacity ?? 1,
        [axis]: show?.[axis] ?? 0,
      },
    };
  }, [directionOffset, axis, framerProps]);

  return (
    <m.div initial="hidden" ref={forwardedRef} style={style} variants={FADE_ANIMATION_VARIANTS} viewport={{ once: false }} whileInView="show" className={className} {...props}>
      {children}
    </m.div>
  );
};

export default forwardRef(FadeWrapper);
