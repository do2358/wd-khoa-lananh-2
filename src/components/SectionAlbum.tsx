import { useRouter } from '@tanstack/react-router';
import { useWindowVirtualizer } from '@tanstack/react-virtual';
import { ArrowUpIcon } from 'lucide-react';
import React, { useId } from 'react';
import { useMediaQuery } from 'react-responsive';

import { IMG_BLUR } from '@/libs/constant';
import { cn } from '@/libs/utils';

import RcImage from './media/RcImage';

// shuffleArray
// shuffleArray
function shuffleArray(array: string[]) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}
const ALBUMS_LIST = [
  'https://res.cloudinary.com/dnon5lwok/image/upload/v1779610968/2aOboQYKfX2OIP7wuDOmKFqq6A9i5jlgZwtnoLjc_lacuna.jpg',
  'https://res.cloudinary.com/dnon5lwok/image/upload/v1779610966/2aOboQYKfVitlrQaRw002AmEGrvvSNIOPyp9UeuG_b36xuq.jpg',
  'https://res.cloudinary.com/dnon5lwok/image/upload/v1779610967/2aOboQYKfW2dN93GdNe5diQhwUrmX2zTbdZYwUt6_dwhc9n.jpg',
  'https://res.cloudinary.com/dnon5lwok/image/upload/v1779611931/MO_05517_ccisg4.jpg',
  'https://res.cloudinary.com/dnon5lwok/image/upload/v1779610968/2aOboQYKfX2OIP7wuDOmKFqq6A9i5jlgZwtnoLjc_lacuna.jpg',
  'https://res.cloudinary.com/dnon5lwok/image/upload/v1779610967/2aOboQYKfW2dN93GdNe5diQhwUrmX2zTbdZYwUt6_dwhc9n.jpg',
  'https://res.cloudinary.com/dnon5lwok/image/upload/v1779609831/MO_06612_1_i8qpyr.jpg',
  'https://res.cloudinary.com/dnon5lwok/image/upload/q_auto/f_auto/v1779622209/MO_06710_1_eontie.jpg',
 'https://res.cloudinary.com/dnon5lwok/image/upload/q_auto/f_auto/v1779622208/MO_06682_1_qkeuiz.jpg',
 'https://res.cloudinary.com/dnon5lwok/image/upload/q_auto/f_auto/v1779622207/MO_05316_1_cwdfrd.jpg',
 'https://res.cloudinary.com/dnon5lwok/image/upload/q_auto/f_auto/v1779622205/MO_04675_1_uep1y3.jpg',
 'https://res.cloudinary.com/dnon5lwok/image/upload/q_auto/f_auto/v1779622205/MO_05124_1_qztm79.jpg',
 'https://res.cloudinary.com/dnon5lwok/image/upload/q_auto/f_auto/v1779622205/MO_06353_1_r8yvjw.jpg'
];
const ALBUMS = shuffleArray(ALBUMS_LIST);

const SectionAlbum = () => {
  const uid = useId();
  const router = useRouter();
  const mediaAbove640 = useMediaQuery({ minWidth: 640 });

  const listRef = React.useRef<HTMLDivElement | null>(null);
  const virtualizer = useWindowVirtualizer({
    count: ALBUMS.length,
    estimateSize: (i) => 100,
    overscan: mediaAbove640 ? 3 : 1000,
    lanes: mediaAbove640 ? 3 : 2,
    gap: mediaAbove640 ? 20 : 10,
    scrollMargin: 0,
    paddingEnd: 80,
    scrollPaddingEnd: 20,
    enabled: true,
  });

  return (
    <>
      <div className="relative mx-auto flex w-full max-w-[1900px] items-center p-2 sm:p-5">
        {/* <button
          onClick={() => {
            window.scrollTo(0, 0);
            router.history.back();
          }}
        >
          <HomeIcon className="size-6 text-red-600 sm:size-8" />
        </button> */}
        {/* <SlashIcon className="rotate-[-17deg] text-red-500" /> */}
        <div className={cn('relative z-10 text-left font-DancingScript text-3xl font-[600] text-red-600 sm:text-4xl')}>Album ảnh</div>
      </div>

      <div ref={listRef} style={{ overflowAnchor: 'none' }} className="relative mx-auto w-full max-w-[1900px] px-1 sm:px-5">
        <div style={{ height: `${virtualizer.getTotalSize()}px` }} className="relative min-h-dvh w-full">
          {virtualizer.getVirtualItems().map((item) => {
            const src = ALBUMS[item.index];
            return (
              <button
                key={uid + item.key}
                ref={virtualizer.measureElement}
                style={
                  mediaAbove640
                    ? {
                        position: 'absolute',
                        top: 0,
                        left: `calc(${item.lane * 33}% + 20px)`,
                        width: 'calc(33% - 20px)',
                        transform: `translateY(${item.start}px)`,
                      }
                    : {
                        position: 'absolute',
                        top: 0,
                        left: `calc(${item.lane * 50}% + 4px)`,
                        width: 'calc(50% - 8px)',
                        transform: `translateY(${item.start}px)`,
                      }
                }
                data-index={item.index}
              >
                <RcImage alt="" fallback={IMG_BLUR} height={'auto'} src={src} width={'auto'} className="inset-0 !h-auto w-auto rounded object-cover object-top transition duration-200" />
              </button>
            );
          })}
        </div>
      </div>

      <button className="fixed right-2 bottom-2 flex size-12 items-center justify-center rounded-full bg-white text-red-600 shadow" onClick={() => window.scrollTo(0, 0)}>
        <ArrowUpIcon className="size-7" />
      </button>
    </>
  );
};

export default SectionAlbum;
