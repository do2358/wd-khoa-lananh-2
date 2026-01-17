import { Image } from '@unpic/react';

import { cn } from '@/libs/utils';

import { MotionEffect } from './animation/MotionEffect';
import TimelineDating from './timeline/TimelineDating';

type TSection06Props = { setModalImage?: (src?: string) => void };

const Section06 = ({ setModalImage }: TSection06Props) => {
  return (
    <section className="relative flex min-h-dvh flex-col items-center justify-center">
      <MotionEffect inView inViewOnce={false} slide={{ direction: 'right' }} className="text-center text-xl text-red-500 uppercase max-sm:w-[90dvw] max-sm:overflow-hidden">
        Chuyện chúng mình
      </MotionEffect>
      <MotionEffect
        inView
        inViewOnce={false}
        slide={{ direction: 'right' }}
        className={cn('mb-4 text-center font-DancingScript text-5xl font-[600] text-red-800 max-sm:w-[90dvw] max-sm:overflow-hidden sm:text-6xl')}
      >
        Đã bắt đầu như thế nào
      </MotionEffect>

      <TimelineDating setModalImage={setModalImage} />

      <Image alt="2611" height={400} src="/images/icon-flowers-1.png" width={200} className="absolute -bottom-16 left-0 animate-[bounceY_10s_linear_infinite] opacity-50 max-sm:w-[160px]" />
      <Image alt="2611" height={320} src="/images/icon-flowers-2.png" width={160} className="absolute top-0 right-0 animate-[bounceY_10s_linear_infinite] opacity-50 max-sm:w-[140px]" />
    </section>
  );
};

export default Section06;
