import { m } from 'motion/react';
import { useId } from 'react';
import { useMediaQuery } from 'react-responsive';

import { cn } from '@/libs/utils';

import { MovingBorder } from '../button/MovingBorder';

type TCardEventsProps = {
  pType?: string;
  pName?: string;
};
const CardEvents = ({ pType, pName }: TCardEventsProps) => {
  const uid = useId();
  const mediaAbove640 = useMediaQuery({ minWidth: 640 });

  const first = {
    initial: {
      x: 40,
      rotate: -5,
    },
    hover: {
      x: 0,
      rotate: 0,
    },
  };
  const second = {
    initial: {
      x: -40,
      rotate: 5,
    },
    hover: {
      x: 0,
      rotate: 0,
    },
  };
  return (
    <m.div key={uid + mediaAbove640} animate={'animate'} initial={'initial'} whileHover={'hover'} className="flex min-h-[300px] space-x-4 max-sm:w-dvw max-sm:overflow-x-auto max-sm:px-4">
      <m.div
        variants={mediaAbove640 ? first : {}}
        className="group flex w-[260px] shrink-0 cursor-pointer flex-col items-center justify-center rounded-2xl border border-amber-500/50 bg-white p-4 sm:w-[300px] lg:w-[340px]"
      >
        <img
          alt="avatar"
          height={200}
          // src="/images/services2-3.png"
          src="/images/icon-circle-star.png"
          width={200}
          className="rounded-full object-cover transition-all group-hover:-scale-x-100"
        />
        <p className="mt-2 text-amber-600 underline">{pType === 'h' ? '09:00' : '10:00'}</p>
        <p className={cn('mt-2 shrink-0 text-center font-DancingScript! text-3xl font-700 text-red-900')}>Đón khách</p>
        <p className="mt-2 text-red-800">Bắt đầu đón khách</p>
      </m.div>

      <m.div className="group relative z-20 flex w-[260px] shrink-0 cursor-pointer flex-col items-center justify-center overflow-hidden rounded-[18px] bg-amber-500/50 p-[3px] py-[2px] sm:w-[300px] lg:w-[366px]">
        <div className="relative z-10 flex size-full flex-col items-center justify-center rounded-[calc(16px*0.96)] bg-white">
          <img alt="avatar" height={200} src="/images/services2-1.png" width={200} className="rounded-full transition-all group-hover:-scale-x-100" />
          <p className="mt-2 text-amber-600 underline"> {pType === 'h' ? '10:30' : '10:30'}</p>
          <p className={cn('mt-2 shrink-0 text-center font-DancingScript! text-3xl font-700 text-red-900')}>Làm lễ</p>
          <p className="mt-2 text-center text-red-800 max-sm:mb-4">{pType === 'h' ? 'Chú rể rước cô dâu và làm lễ' : 'Tiến hành rước cô dâu vào sân khấu và làm lễ'}</p>
        </div>

        <div style={{ borderRadius: `calc(16px * 0.96)` }} className="absolute inset-0">
          <MovingBorder duration={5000} rx="50%" ry="30%">
            <div className="size-40 bg-[radial-gradient(#fef3c7_40%,transparent_60%)]" />
          </MovingBorder>
        </div>
      </m.div>

      <m.div
        variants={mediaAbove640 ? second : {}}
        className="group flex w-[260px] shrink-0 cursor-pointer flex-col items-center justify-center rounded-2xl border border-amber-500/50 bg-white p-4 sm:w-[300px] lg:w-[340px]"
      >
        <img alt="avatar" height={200} src="/images/services2-3.png" width={200} className="rounded-full transition-all group-hover:-scale-x-100" />
        <p className="mt-2 text-amber-600 underline"> {pType === 'h' ? '12:00' : '12:00'}</p>
        <p className={cn('mt-2 shrink-0 text-center font-DancingScript! text-3xl font-700 text-red-900')}>Chụp ảnh</p>
        <p className="mt-2 text-red-800">Chụp ảnh kỷ niệm</p>
      </m.div>
    </m.div>
  );
};

export default CardEvents;
