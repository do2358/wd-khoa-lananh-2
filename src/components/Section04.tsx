import { Image } from '@unpic/react';
import { useMediaQuery } from 'react-responsive';

import { cn } from '@/libs/utils';

import { MotionEffect } from './animation/MotionEffect';
import { FlowerBlossomSvg } from './icons';
import RcImage from './media/RcImage';

const Section04 = (props: { setModalImage?: (src?: string) => void }) => {
  const mediaAbove640 = useMediaQuery({ minWidth: 640 });

  return (
    <section className="relative flex min-h-dvh items-center justify-center max-sm:flex-col max-sm:pt-20 max-sm:pb-40 sm:max-h-[1500px]">
      <div className="flex flex-col items-center justify-center max-sm:mt-20">
        <MotionEffect inView inViewOnce slide={{ direction: 'left' }} className={cn('mb-1 font-DancingScript text-xl font-[700] text-red-400 uppercase')}>
          Cô dâu
        </MotionEffect>
        <MotionEffect inView inViewOnce slide={{ direction: 'left' }} className={cn('mb-6 font-DancingScript text-5xl text-red-800 sm:mb-3')}>
          Trịnh Thu Huyền
        </MotionEffect>
        <MotionEffect inView inViewOnce slide={{ direction: 'left' }} className="relative flex size-[300px] items-center justify-center max-sm:mt-4 sm:size-[260px]">
          <RcImage
            height={'auto'}
            loading="eager"
            rootClassName="sm:!size-[180px] max-sm:max-h-[340px] max-sm:!w-[280px]"
            src="https://res.cloudinary.com/ngoviettung154/image/upload/v1768129840/TH/ING07017_xoqy0s.jpg"
            width={'auto'}
            className="size-full cursor-pointer rounded-xl object-cover sm:rounded-full"
          />
          <div className="absolute -z-10 max-sm:right-[-40px] max-sm:bottom-[-60px] sm:top-1/2 sm:left-1/2 sm:-translate-x-1/2 sm:-translate-y-1/2">
            <Image alt="2611" height={260} src="/images/cricle2.png" width={260} className="size-[300px] max-w-screen-sm animate-[zoomTwo_5s_linear_infinite] object-cover sm:size-[260px]" />
          </div>
        </MotionEffect>
      </div>

      {mediaAbove640 && (
        <MotionEffect
          inView
          inViewOnce
          slide={{ direction: 'left' }}
          className="relative mx-16 hidden h-full max-h-[60%] max-w-xs min-w-[300px] shrink-0 flex-col items-center justify-center rounded-full border-2 border-red-900 p-2 max-sm:-order-1 sm:flex"
        >
          <RcImage
            alt="2611"
            height={'auto'}
            src="https://res.cloudinary.com/ngoviettung154/image/upload/v1768129841/TH/ING07084_n2i20s.jpg"
            width={'100%'}
            className="w-full cursor-pointer rounded-full object-cover sm:min-h-[456px]!"
          />
          {/* <Image alt="2611" height={0} src="/images/icon-flowers-3.png" width={100} className="absolute top-0 left-[-10px] animate-[bounceY_10s_linear_infinite]" /> */}
          {/* <Image alt="2611" height={0} src="/images/icon-flowers-4.png" width={120} className="absolute right-[-40px] bottom-0 animate-[bounceY_10s_linear_infinite]" /> */}

          <div className="absolute top-0 left-[-10px] animate-[bounceY_12s_linear_infinite]">
            <FlowerBlossomSvg className="h-auto w-30 rotate-[-82deg]" />
          </div>
          <div className="absolute right-[-40px] bottom-[-40px] animate-[bounceY_12s_linear_infinite]">
            <FlowerBlossomSvg className="h-auto w-35 rotate-[-82deg]" />
          </div>
        </MotionEffect>
      )}

      <div className="flex flex-col items-center justify-center max-sm:-order-1">
        <MotionEffect inView inViewOnce slide={{ direction: 'right' }} className="relative mb-3 flex size-[300px] items-center justify-center max-sm:order-3 max-sm:mt-6 sm:size-[260px]">
          <RcImage
            height={'auto'}
            loading="eager"
            rootClassName="sm:!size-[180px] max-sm:max-h-[340px] max-sm:!w-[280px]"
            src="https://res.cloudinary.com/ngoviettung154/image/upload/v1768129843/TH/ING07329_xodtaa.jpg"
            width={'auto'}
            className="size-full cursor-pointer rounded-xl object-cover sm:rounded-full"
          />
          <div className="absolute -z-10 max-sm:bottom-[-60px] max-sm:left-[-40px] sm:top-1/2 sm:left-1/2 sm:-translate-x-1/2 sm:-translate-y-1/2">
            <Image alt="2611" height={260} src="/images/cricle1.png" width={260} className="size-[300px] max-w-screen-sm animate-[zoomTwo_5s_linear_infinite] object-cover sm:size-[260px]" />
          </div>
        </MotionEffect>
        <MotionEffect inView inViewOnce slide={{ direction: 'right' }} className={cn('mb-1 font-DancingScript text-xl font-[700] text-red-400 uppercase')}>
          Chú rể
        </MotionEffect>
        <MotionEffect inView inViewOnce slide={{ direction: 'right' }} className={cn('font-DancingScript text-5xl text-red-800 max-sm:mb-4')}>
          Ngô Việt Tùng
        </MotionEffect>
      </div>

      <Image
        alt="2611"
        height={400}
        src="/images/icon-flowers-1.png"
        width={200}
        className="absolute -bottom-16 left-0 -z-10 animate-[bounceY_10s_linear_infinite] opacity-50 max-sm:w-[160px] sm:bottom-1/4"
      />
      <Image alt="2611" height={320} src="/images/icon-flowers-2.png" width={160} className="absolute -top-16 right-0 -z-10 animate-[bounceY_10s_linear_infinite] opacity-50 max-sm:w-[140px]" />
    </section>
  );
};

export default Section04;
