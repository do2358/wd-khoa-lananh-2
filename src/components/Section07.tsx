import { m } from 'motion/react';
import { useMediaQuery } from 'react-responsive';

import { IMG_BLUR } from '@/libs/constant';
import { cn } from '@/libs/utils';

import RcImage from './media/RcImage';
import ScrollArea from './ScrollArea';

type TSection07Props = {
  onClickBtn01?: () => void;
  setModalImage?: (src?: string) => void;
};

const Section07 = ({ onClickBtn01, setModalImage }: TSection07Props) => {
  const mediaAbove640 = useMediaQuery({ minWidth: 640 });
  return (
    <section className="relative flex min-h-fit max-w-[100dvw] flex-col items-center justify-center overflow-x-hidden py-40">
      <div className="mb-1 text-center text-base text-red-500 uppercase max-sm:px-8">♥ ♥ ♥</div>
      <div className={cn('mb-4 text-center font-DancingScript text-4xl font-[600] text-red-800')}>Sự hiện diện của Quý khách là niềm vinh hạnh của gia đình chúng tôi!</div>

      {/* <div className="z-50 flex items-center justify-center sm:px-8">
        <RainbowButton className="items-center text-base tracking-[2px] text-red-900 uppercase ring-1 ring-red-300" onClick={onClickBtn01}>
          <PartyPopperIcon className="mr-2 size-6" />
          <span>Bạn sẽ đến chứ?</span>
        </RainbowButton>
      </div> */}

      <div className="relative flex min-h-fit w-full justify-center overflow-hidden">
        <ScrollArea suppressScrollY className="flex items-center overflow-x-auto px-10 py-8">
          {[
            // "https://res.cloudinary.com/dcos6mpjy/image/upload/v1730487167/cuonglinh2611/albums/bygc1uvdcp8sssvosah0.jpg",
            // "https://res.cloudinary.com/dcos6mpjy/image/upload/v1730487153/cuonglinh2611/albums/jm3pn3xcrm2n2qyrtwly.jpg",
            // "https://res.cloudinary.com/dcos6mpjy/image/upload/v1730487170/cuonglinh2611/albums/sjb4sqfg9jy3ik0lth9x.jpg",
            // "https://res.cloudinary.com/dcos6mpjy/image/upload/v1730487151/cuonglinh2611/albums/vgc8bcfwhfqdew2aqm93.jpg",
            // "https://res.cloudinary.com/dcos6mpjy/image/upload/v1730487156/cuonglinh2611/albums/jqhpuelqjqy7kiylyso2.jpg",
            'https://res.cloudinary.com/ngoviettung154/image/upload/v1768129840/TH/DSC04587_hdauel.jpg',
            'https://res.cloudinary.com/ngoviettung154/image/upload/v1768129843/TH/ING07568_kb8kpb.jpg',
            'https://res.cloudinary.com/ngoviettung154/image/upload/v1768129842/TH/ING07247_vvdefw.jpg',
            // "https://res.cloudinary.com/dcos6mpjy/image/upload/v1731244972/cuonglinh2611/albums/yxq5em5w2bfwojkjn2va.jpg",
            'https://res.cloudinary.com/ngoviettung154/image/upload/v1768129844/TH/ING07822_ok6yg9.jpg',
            'https://res.cloudinary.com/ngoviettung154/image/upload/v1768129842/TH/ING07111_wkwlkc.jpg',
          ].map((image, index) => {
            const zIndex = 10;
            return (
              <m.div
                key={'ImageRotate' + index}
                style={{ rotate: Math.random() * 20 - 10 }}
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
                <RcImage
                  alt="3101"
                  fallback={IMG_BLUR}
                  height={300}
                  loading={index === 2 ? 'eager' : 'lazy'}
                  src={image}
                  style={index === 2 ? { width: 320, height: 320 } : { width: 300, height: 300 }}
                  width={300}
                  className="shrink-0 cursor-pointer rounded-lg object-cover"
                />
              </m.div>
            );
          })}
        </ScrollArea>
      </div>
    </section>
  );
};

export default Section07;
