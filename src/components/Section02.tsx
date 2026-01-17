import { cn } from '@/libs/utils';

import { MotionEffect } from './animation/MotionEffect';
import CardEvents from './card/CardEvents';

export type TSection02Props = { pType?: string; pName?: string };

const Section02 = ({ pType, pName }: TSection02Props) => {
  return (
    <section className="relative flex max-w-[100dvw] flex-col items-center justify-center overflow-hidden max-sm:py-20 sm:pb-20">
      <div className="mb-2 text-center text-xl text-red-700 uppercase">26/11/2024</div>
      <div className={cn('mb-4 text-center font-DancingScript text-4xl font-[600] text-red-800 sm:text-6xl ')}>{pType === 'h' ? 'Lễ Vu Quy' : `Lễ Thành Hôn`} </div>
      <div className="mb-4 text-center text-xl text-red-700 uppercase">{pType === 'h' ? 'Tại nhà gái' : 'Tại nhà trai'}</div>
      <div className="mb-4 flex items-center gap-1 font-Questrial text-base leading-[1.2] sm:mb-2 sm:text-lg">
        <span>{pType === 'h' ? 'Nhà văn hoá thôn Hà Lỗ, Thư Lâm, Hà Nội' : 'Ngõ cây xăng khu 6, Thuỵ Lôi, Thư Lâm, Hà Nội'}</span>
      </div>
      <MotionEffect inView inViewOnce={false} slide={{ direction: 'left' }} className="sm:px-10 sm:py-5">
        <CardEvents pName={pName} pType={pType} />
      </MotionEffect>
    </section>
  );
};

export default Section02;
