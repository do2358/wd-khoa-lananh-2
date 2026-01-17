import { Image } from '@unpic/react';
import { useMediaQuery } from 'react-responsive';

import { IMG_BLUR } from '@/libs/constant';
import { cn } from '@/libs/utils';

import { MotionEffect } from './animation/MotionEffect';
import { RainbowButtonLink } from './button/RainbowButton';
import { FlowerBlossomSvg, GgMapSvg } from './icons';
import RcImage from './media/RcImage';

type TSection01Props = { pType: string; onClickBtn01?: () => void };

const Section01 = ({ pType, onClickBtn01 }: TSection01Props) => {
  const mapParty = pType === 'h' ? 'https://maps.app.goo.gl/CH1Yi2JWQdu4c1LVA' : 'https://maps.app.goo.gl/7XFB6K6QAaBbRWYP9';

  const mediaAbove640 = useMediaQuery({ minWidth: 640 });

  // const items = [
  //   {
  //     image: 'https://res.cloudinary.com/ngoviettung154/image/upload/q_10/v1768129841/TH/ING07197_iwmjs0.jpg',
  //     className: 'absolute bottom-10 left-[10%] rotate-[-5deg]',
  //   },
  //   {
  //     image: 'https://res.cloudinary.com/ngoviettung154/image/upload/q_10/v1768129841/TH/ING07104_oqzza6.jpg',
  //     className: 'absolute bottom-60 left-[2%] rotate-[-7deg]',
  //   },
  //   {
  //     image: 'https://res.cloudinary.com/ngoviettung154/image/upload/q_10/v1768129844/TH/ING07822_ok6yg9.jpg',
  //     className: 'absolute top-10 left-[5%] rotate-[8deg]',
  //   },
  //   {
  //     image: 'https://res.cloudinary.com/ngoviettung154/image/upload/q_10/v1768129844/TH/ING07589_wuk2hd.jpg',
  //     className: 'absolute top-12 right-[15%] rotate-[10deg]',
  //   },
  //   {
  //     image: 'https://res.cloudinary.com/ngoviettung154/image/upload/q_10/v1768129841/TH/DSC04695_rmofzw.jpg',
  //     className: 'absolute top-50 right-[2%] rotate-[2deg]',
  //   },
  //   {
  //     image: 'https://res.cloudinary.com/ngoviettung154/image/upload/q_10/v1768129845/TH/ING07931_qz4omc.jpg',
  //     className: 'absolute bottom-22 right-[22%] rotate-[-7deg]',
  //   },
  //   {
  //     image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=2560&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  //     className: 'absolute bottom-8 right-[5%] rotate-[4deg]',
  //   },
  // ];

  return (
    <section className="relative flex min-h-dvh max-w-dvw flex-col items-center justify-center overflow-clip overflow-x-hidden [perspective:3000px] max-sm:py-20 sm:max-h-[1500px]">
      <div className="z-10 flex items-center max-sm:flex-col sm:justify-between">
        {mediaAbove640 && (
          <MotionEffect
            inView
            inViewOnce={false}
            slide={{ direction: 'left' }}
            className="relative hidden h-[476px] max-w-xs flex-col items-center justify-center rounded-full border-2 border-red-900 p-2 sm:flex"
          >
            <RcImage
              alt="2611"
              fallback={IMG_BLUR}
              height={'100%'}
              loading="eager"
              src="https://res.cloudinary.com/ngoviettung154/image/upload/v1768129843/TH/ING07568_kb8kpb.jpg"
              width={240}
              className="!h-auto !w-full cursor-pointer rounded-full object-cover"
            />
            <div className="absolute bottom-[-10px] left-[-55px] animate-[bounceY_12s_linear_infinite]">
              <FlowerBlossomSvg className="h-auto w-30 rotate-[-169deg]" />
            </div>
            <div className="absolute top-0 right-[-20px] animate-[bounceY_12s_linear_infinite]">
              <FlowerBlossomSvg className="h-auto w-25 rotate-[-169deg]" />
            </div>
          </MotionEffect>
        )}

        <div className="relative flex flex-col items-center justify-center px-0 text-center max-sm:-order-1 sm:px-20">
          <div className={'mb-4 font-Manrope text-base font-600 tracking-[2px] text-red-800 sm:mb-8 sm:text-xl'}>CHÚNG MÌNH CƯỚI</div>
          <h2
            className={cn(
              'mb-8 text-center font-GreatVibes! text-4xl leading-[1.3] font-600 tracking-[4px] whitespace-pre-line  text-red-800 sm:text-6xl',
              'animate-gradient bg-gradient-to-r from-[#991b1b] via-[#f87171] to-[#991b1b] bg-[length:var(--bg-size)_100%] bg-clip-text text-transparent [--bg-size:300%]',
            )}
          >
            {pType === 'h' ? `Trịnh Thu Huyền \n&\n Ngô Việt Tùng` : `Ngô Việt Tùng \n&\n Trịnh Thu Huyền`}
          </h2>
          <div className={'mb-6 border-y-2 border-red-900 py-3 font-DancingScript text-2xl font-600 tracking-[2px] text-red-700 sm:text-3xl'}>
            {pType === 'h' ? `30 Tháng 01, 2026` : pType === 't-31' ? `30 Tháng 01, 2026` : `30 Tháng 01, 2026`}
          </div>

          <div className="mb-4 flex items-center gap-1 font-Questrial text-base leading-[1.2] sm:text-lg">
            <GgMapSvg className="h-5 w-auto shrink-0" />
            <span>{pType === 'h' ? 'Nhà Gái: Nhà văn hoá thôn Hà Lỗ, Thư Lâm, Hà Nội' : 'Trung tâm tiệc cưới Thanh Bình (gần Đền Sái), Thư Lâm, Hà Nội'}</span>
          </div>

          <RainbowButtonLink href={mapParty} rel="noopener noreferrer" target="_blank" className="text-base tracking-[2px] text-red-900 uppercase ring-1 ring-red-500">
            Xem vị trí
          </RainbowButtonLink>
        </div>

        <MotionEffect
          inView
          inViewOnce={false}
          slide={{ direction: 'left' }}
          className="relative h-[480px] max-w-xs flex-col items-center justify-center rounded-xl border-2 border-red-900 p-2 max-sm:mt-10 sm:flex sm:h-[476px] sm:rounded-full"
        >
          <RcImage
            alt="2611"
            fallback={IMG_BLUR}
            height={'100%'}
            loading="eager"
            src="https://res.cloudinary.com/ngoviettung154/image/upload/v1768129841/TH/ING07062_onvh4q.jpg"
            width={240}
            className="!h-auto !min-h-full !w-full cursor-pointer rounded-md object-cover object-[25%_center] sm:rounded-full"
          />
          <div className="absolute top-0 left-[-20px]  animate-[bounceY_12s_linear_infinite]">
            <FlowerBlossomSvg className="h-auto w-25 rotate-[-82deg]" />
          </div>
          <div className="absolute right-[-40px] bottom-[-40px] animate-[bounceY_12s_linear_infinite] sm:right-[-50px] sm:bottom-[-10px]">
            <FlowerBlossomSvg className="h-auto w-30 rotate-[-82deg]" />
          </div>
        </MotionEffect>
      </div>

      <Image alt="2611" height={420} src="/images/icon-flowers-1.png" width={240} className="absolute bottom-10 left-0 animate-[bounceY_10s_linear_infinite] opacity-50 max-sm:w-[200px]" />
      <Image alt="2611" height={420} src="/images/icon-flowers-2.png" width={260} className="absolute top-4 right-0 animate-[bounceY_10s_linear_infinite] opacity-50 max-sm:w-[180px]" />

      {/* 
      {items.map((item) => (
        <DndCardBody className={cn('min-h-50 w-50 p-0', item.className)}>
          <img alt={item.title} src={item.image} className="pointer-events-none relative z-10 h-50 w-50 object-cover" />
        </DndCardBody>
      ))} */}
    </section>
  );
};

export default Section01;
