import { Image } from '@unpic/react';

import { cn } from '@/libs/utils';

import { MotionEffect } from './animation/MotionEffect';
import Calendar from './card/Calendar';
import TimerCountDown from './card/CardTimerCountDown';

type TSection05Props = { setModalImage?: (src?: string) => void };

const Section05 = ({ setModalImage }: TSection05Props) => {
  return (
    <section className="relative -mt-10 flex min-h-dvh max-w-[100dvw] flex-col items-center justify-center overflow-x-hidden px-4 pb-20 sm:max-h-[1400px] sm:px-6">
      <MotionEffect inView inViewOnce={false} slide={{ direction: 'left' }} className="text-center text-xl text-red-500 uppercase">
        Cho đến ngày
      </MotionEffect>
      <MotionEffect inView inViewOnce={false} slide={{ direction: 'left' }} className={cn('mb-4 text-center font-DancingScript text-5xl font-[600] text-red-800 sm:text-6xl')}>
        Về chung một nhà
      </MotionEffect>
      <MotionEffect inView inViewOnce={false} slide={{ direction: 'left' }} className="text-center font-Questrial text-lg text-neutral-500">
        Cùng chúng mình đếm ngược nhé!
      </MotionEffect>

      <Calendar
        initialRange={{
          startDate: new Date('2026-01-01T00:00:01'),
          secondTarget: new Date('2026-01-30T00:00:01'),
          endDate: new Date('2026-01-31T00:00:01'),
        }}
      />

      <TimerCountDown targetDate={new Date('2026-01-31T00:00:01')} />

      <div className="absolute top-1/2 left-0 -z-10 w-full -translate-y-1/2 -scale-x-100">
        <Image alt="2611" height={0} src="/images/pattern-4.png" width={366} className="-z-10 size-full animate-[bounceY_10s_linear_infinite] object-cover" />
      </div>
    </section>
  );
};

export default Section05;
