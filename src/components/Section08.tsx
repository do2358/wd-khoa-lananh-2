import { Image } from '@unpic/react';
import { ImagesIcon } from 'lucide-react';
import { memo } from 'react';

import { IMG_BLUR } from '@/libs/constant';
import { cn } from '@/libs/utils';

import { GradientButtonLink } from './button/GradientButton';
import RcImage from './media/RcImage';

type TSection08Props = { setModalImage?: (src?: string) => void };

const IMAGES = [
  'https://res.cloudinary.com/dnon5lwok/image/upload/v1779610967/2aOboQYKfW2dN93GdNe5diQhwUrmX2zTbdZYwUt6_dwhc9n.jpg',
  'https://res.cloudinary.com/dnon5lwok/image/upload/v1779609831/MO_06612_1_i8qpyr.jpg',
  'https://res.cloudinary.com/dnon5lwok/image/upload/v1779609447/MO_04567_fy3wqi.jpg',
  'https://res.cloudinary.com/dnon5lwok/image/upload/q_auto/f_auto/v1779622205/MO_04675_1_uep1y3.jpg',
  'https://res.cloudinary.com/dnon5lwok/image/upload/v1779610966/2aOboQYKfVitlrQaRw002AmEGrvvSNIOPyp9UeuG_b36xuq.jpg',
  'https://res.cloudinary.com/dnon5lwok/image/upload/q_auto/f_auto/v1779622207/MO_05316_1_cwdfrd.jpg',
];

const Section08 = ({ setModalImage }: TSection08Props) => {
  return (
    <section className="relative flex min-h-dvh max-w-[100dvw] flex-col items-center justify-center overflow-x-hidden pb-28">
      <div className="text-center text-xl text-red-500 uppercase">Kỉ niệm cưới</div>
      <div className={cn('mb-8 text-center font-DancingScript text-4xl font-[600] text-red-800 sm:text-6xl ')}>Những khoảnh khắc đáng nhớ</div>

      <div className="flex max-w-screen-lg items-stretch gap-4 px-4 max-sm:flex-col">
        <div className="grid flex-1 grid-cols-2 items-stretch gap-4">
          <div className="col-span-2 flex items-center sm:min-h-16">
            <div className={cn('col-span-2 text-left font-Questrial text-xl leading-[1.1] font-[600] text-red-800')}>Album ảnh</div>

            <GradientButtonLink href="/albums" icon={<ImagesIcon className="mr-2 text-[#dc2626]" />} className="ml-auto rounded-full py-1.5 pr-4 pl-3 font-[600] whitespace-nowrap">
              Xem tất cả
            </GradientButtonLink>
          </div>
          <RcImage
            alt=""
            fallback={IMG_BLUR}
            height={'auto'}
            rootClassName="max-h-[160px] max-sm:min-h-[160px] sm:h-auto"
            src={IMAGES[0]}
            style={{ width: '100%', height: 'auto' }}
            width={'100%'}
            className="max-h-[160px] cursor-pointer rounded-xl object-cover max-sm:min-h-[160px] sm:h-auto"
          />
          <RcImage
            alt=""
            fallback={IMG_BLUR}
            height={'auto'}
            rootClassName="max-h-[160px] max-sm:min-h-[160px] sm:h-auto"
            src={IMAGES[1]}
            style={{ width: '100%', height: 'auto' }}
            width={'100%'}
            className="max-h-[160px] cursor-pointer rounded-xl object-cover max-sm:min-h-[160px] sm:h-auto"
          />
          <RcImage
            alt=""
            fallback={IMG_BLUR}
            height={'auto'}
            loading="eager"
            rootClassName="col-span-2"
            src={IMAGES[2]}
            style={{ width: '100%', height: 'auto' }}
            width={'100%'}
            className="cursor-pointer rounded-xl object-cover"
          />
        </div>
        <div className="grid flex-1 grid-cols-2 items-stretch gap-4">
          <RcImage
            alt=""
            fallback={IMG_BLUR}
            height={'auto'}
            loading="eager"
            rootClassName="col-span-2"
            src={IMAGES[3]}
            style={{ width: '100%', height: 'auto' }}
            width={'100%'}
            className="cursor-pointer rounded-xl object-cover max-sm:order-3"
          />
          <RcImage
            alt=""
            fallback={IMG_BLUR}
            height={'auto'}
            rootClassName="max-h-[160px] max-sm:min-h-[160px] sm:h-auto"
            src={IMAGES[4]}
            style={{ width: '100%', height: 'auto' }}
            width={'100%'}
            className="max-h-[160px] cursor-pointer rounded-xl object-cover max-sm:min-h-[160px] sm:h-auto"
          />
          <RcImage
            alt=""
            fallback={IMG_BLUR}
            height={'auto'}
            rootClassName="max-h-[160px] max-sm:min-h-[160px] sm:h-auto"
            src={IMAGES[5]}
            style={{ width: '100%', height: 'auto' }}
            width={'100%'}
            className="max-h-[160px] cursor-pointer rounded-xl object-cover max-sm:min-h-[160px] sm:h-auto"
          />
          <div className={cn('col-span-2 text-left font-Questrial text-xl font-500 text-red-900/50 italic')}>“ Hãy để tình yêu diễn biến thật tự nhiên, đã là duyên thì cũng chẳng sợ lạc đường. ”</div>
        </div>
      </div>

      <div className="absolute top-1/2 left-0 -z-10 w-full -translate-y-1/2">
        <Image alt="2611" height={0} src="/images/pattern-5.png" width={366} className="-z-10 size-full animate-[bounceY_10s_linear_infinite] object-cover" />
      </div>
    </section>
  );
};

export default memo(Section08);
