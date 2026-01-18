import { useMemo } from 'react';

import { useCountdownTimer } from '@/hooks/useCountdownTimer';
import { cn } from '@/libs/utils';

import { MotionEffect } from '../animation/MotionEffect';

type TTimerCountDownProps = { targetDate: Date };

const formatNumber = (num: number) => ('0' + num).slice(-2);

const TimerCountDown = ({ targetDate }: TTimerCountDownProps) => {
  const durationTimes = useCountdownTimer({ targetDate });
  const memoDurationTimes = useMemo(() => durationTimes, [durationTimes]);
  return (
    <MotionEffect
      inView
      inViewOnce
      slide={{ direction: 'left' }}
      className="mt-4 flex w-full max-w-[700px] items-center justify-between divide-x divide-neutral-200 rounded-full border border-red-700 px-4 py-5 sm:mt-8 sm:px-4"
    >
      <div className="flex flex-1 flex-col items-center justify-center">
        <div className={cn('mb-2 font-DancingScript text-3xl font-[600] text-red-800')}>{formatNumber(memoDurationTimes.days)}</div>
        <div className={cn('font-DancingScript text-red-600')}>Ngày</div>
      </div>
      <div className="flex flex-1 flex-col items-center justify-center">
        <div className={cn('mb-2 font-DancingScript text-3xl font-[600] text-red-800')}>{formatNumber(memoDurationTimes.hours)}</div>
        <div className={cn('font-DancingScript text-red-600')}>Giờ</div>
      </div>
      <div className="flex flex-1 flex-col items-center justify-center">
        <div className={cn('mb-2 font-DancingScript text-3xl font-[600] text-red-800')}>{formatNumber(memoDurationTimes.minutes)}</div>
        <div className={cn('font-DancingScript text-red-600')}>Phút</div>
      </div>
      <div className="flex flex-1 flex-col items-center justify-center">
        <div className={cn('mb-2 font-DancingScript text-3xl font-[600] text-red-800')}>{formatNumber(memoDurationTimes.seconds)}</div>
        <div className={cn('font-DancingScript text-red-600')}>Giây</div>
      </div>
    </MotionEffect>
  );
};

export default TimerCountDown;
