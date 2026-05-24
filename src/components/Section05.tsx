import { Image } from '@unpic/react';
import { HeartIcon } from 'lucide-react';

import { cn } from '@/libs/utils';

import { MotionEffect } from './animation/MotionEffect';
import Calendar from './card/Calendar';
import TimerCountDown from './card/CardTimerCountDown';

type TSection05Props = { setModalImage?: (src?: string) => void; pType?: string };

const Section05 = ({ setModalImage, pType }: TSection05Props) => {
  // Nhà trai (/t): Giờ G 11:30 ngày 1/6 | Nhà gái (default): Giờ G 9:00 ngày 1/6
  const isGroom = pType === 't' || pType === 't-31';
  const targetDate = isGroom ? new Date('2026-06-01T11:30:00') : new Date('2026-06-01T09:00:00');

  return (
    <section className="relative -mt-10 flex min-h-dvh max-w-[100dvw] flex-col items-center justify-center overflow-x-hidden px-4 pb-20 sm:max-h-[1400px] sm:px-6">
      <MotionEffect inView inViewOnce slide={{ direction: 'left' }} className="text-center text-xl text-red-500 uppercase">
        Cho đến ngày
      </MotionEffect>
      <MotionEffect inView inViewOnce slide={{ direction: 'left' }} className={cn('mb-4 text-center font-DancingScript text-5xl font-[600] text-red-800 sm:text-6xl')}>
        Về chung một nhà
      </MotionEffect>

      {/* Chip ngày 31/5 */}
      <MotionEffect inView inViewOnce slide={{ direction: 'left' }} className="mb-1 flex items-center gap-2 rounded-full border border-red-200 bg-red-50 px-4 py-1.5 text-sm text-red-500">
        <HeartIcon className="size-3.5 fill-red-400 text-red-400" />
        <span>Vu quy: <strong>31 tháng 5</strong></span>
        <HeartIcon className="size-3.5 fill-red-400 text-red-400" />
      </MotionEffect>

      {/* Chỉ hiện lịch tháng 6 */}
      <Calendar
        singleMonth
        initialRange={{
          startDate: new Date('2026-06-01T00:00:01'),
          endDate: new Date('2026-06-01T00:00:01'),
        }}
      />

      <TimerCountDown targetDate={targetDate} />

      <div className="absolute top-1/2 left-0 -z-10 w-full -translate-y-1/2 -scale-x-100">
        <Image alt="2611" height={0} src="/images/pattern-4.png" width={366} className="-z-10 size-full animate-[bounceY_10s_linear_infinite] object-cover" />
      </div>
    </section>
  );
};

export default Section05;
