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
  // "https://res.cloudinary.com/dcos6mpjy/image/upload/v1730487174/cuonglinh2611/albums/hjxx9mrwkilmlxpab95p.jpg",
  // "https://res.cloudinary.com/dcos6mpjy/image/upload/v1730487174/cuonglinh2611/albums/xr89qr0buoarwut8lhog.jpg",
  // "https://res.cloudinary.com/dcos6mpjy/image/upload/v1730487173/cuonglinh2611/albums/ddnk58qaa40et3opjmjl.jpg",
  // "https://res.cloudinary.com/dcos6mpjy/image/upload/v1730487173/cuonglinh2611/albums/bygc1uvdcp8sssvosah0.jpg",
  // "https://res.cloudinary.com/dcos6mpjy/image/upload/v1730487172/cuonglinh2611/albums/fyhxoiixev8hlkmk1trc.jpg",
  // "https://res.cloudinary.com/dcos6mpjy/image/upload/v1730487171/cuonglinh2611/albums/jqobblxufiurneld84be.jpg",
  // "https://res.cloudinary.com/dcos6mpjy/image/upload/v1730487170/cuonglinh2611/albums/sjb4sqfg9jy3ik0lth9x.jpg",
  // "https://res.cloudinary.com/dcos6mpjy/image/upload/v1730487170/cuonglinh2611/albums/cv5javq9t38zwfzaheuy.jpg",
  // "https://res.cloudinary.com/dcos6mpjy/image/upload/v1730487168/cuonglinh2611/albums/luhrhhxn1dsd5x20jlgz.jpg",
  // "https://res.cloudinary.com/dcos6mpjy/image/upload/v1730487167/cuonglinh2611/albums/f343zkiaynh7mjspuio7.jpg",
  // "https://res.cloudinary.com/dcos6mpjy/image/upload/v1730487165/cuonglinh2611/albums/nqfxygyeju6tssxwzzjm.jpg",
  // "https://res.cloudinary.com/dcos6mpjy/image/upload/v1730487160/cuonglinh2611/albums/t3zyf53w2kw5aqqaedr0.jpg",
  // "https://res.cloudinary.com/dcos6mpjy/image/upload/v1730487160/cuonglinh2611/albums/tn13c7f1agrybsh0utcy.jpg",
  // "https://res.cloudinary.com/dcos6mpjy/image/upload/v1730487159/cuonglinh2611/albums/jurh3dhvnzzsdp36rplq.jpg",
  // "https://res.cloudinary.com/dcos6mpjy/image/upload/v1730487156/cuonglinh2611/albums/jqhpuelqjqy7kiylyso2.jpg",
  // "https://res.cloudinary.com/dcos6mpjy/image/upload/v1730487155/cuonglinh2611/albums/nng9e6urtj6qclwmqghp.jpg",
  // "https://res.cloudinary.com/dcos6mpjy/image/upload/v1730487155/cuonglinh2611/albums/gdfbybldvrc6qnby0bhp.jpg",
  // "https://res.cloudinary.com/dcos6mpjy/image/upload/v1730487154/cuonglinh2611/albums/ullr9z4l2wga1umepqjt.jpg",
  // "https://res.cloudinary.com/dcos6mpjy/image/upload/v1730487154/cuonglinh2611/albums/heep1txy6d0d3hvqq5in.jpg",
  // "https://res.cloudinary.com/dcos6mpjy/image/upload/v1730487153/cuonglinh2611/albums/jm3pn3xcrm2n2qyrtwly.jpg",
  // "https://res.cloudinary.com/dcos6mpjy/image/upload/v1730487153/cuonglinh2611/albums/dx96rtpoodv1ly7c8xcj.jpg",
  // "https://res.cloudinary.com/dcos6mpjy/image/upload/v1730487152/cuonglinh2611/albums/ypw8ls6wyx0jo2ezu141.jpg",
  // "https://res.cloudinary.com/dcos6mpjy/image/upload/v1730487152/cuonglinh2611/albums/mkf5wzetrfrnma8sigdh.jpg",
  // "https://res.cloudinary.com/dcos6mpjy/image/upload/v1730487151/cuonglinh2611/albums/ducg6fms51qvoekp0qqd.jpg",
  // "https://res.cloudinary.com/dcos6mpjy/image/upload/v1730487151/cuonglinh2611/albums/vgc8bcfwhfqdew2aqm93.jpg",
  // "https://res.cloudinary.com/dcos6mpjy/image/upload/v1730487149/cuonglinh2611/albums/pr8omw0riiihnokxibb7.jpg",
  // "https://res.cloudinary.com/dcos6mpjy/image/upload/v1730487149/cuonglinh2611/albums/hmotrtcp9mbzfowyzyig.jpg",
  // "https://res.cloudinary.com/dcos6mpjy/image/upload/v1730487149/cuonglinh2611/albums/qvhwfzvej6pdshzb8mdf.jpg",
  // "https://res.cloudinary.com/dcos6mpjy/image/upload/v1730487149/cuonglinh2611/albums/id2uzctozekzwzd9imgs.jpg",
  // "https://res.cloudinary.com/dcos6mpjy/image/upload/v1730487149/cuonglinh2611/albums/vozpxxvtgvegvxljffba.jpg",
  // "https://res.cloudinary.com/dcos6mpjy/image/upload/v1730487149/cuonglinh2611/albums/f9rayufebx4tjxxlqlfa.jpg",
  // "https://res.cloudinary.com/dcos6mpjy/image/upload/v1730487149/cuonglinh2611/albums/ivcfrrxvoazuol8uhfky.jpg",
  // "https://res.cloudinary.com/dcos6mpjy/image/upload/v1730487149/cuonglinh2611/albums/vgbhhtidetaxuj4yyofi.jpg",
  // "https://res.cloudinary.com/dcos6mpjy/image/upload/v1730487149/cuonglinh2611/albums/sye9k3khgdj9t8smy3uj.jpg",
  // "https://res.cloudinary.com/dcos6mpjy/image/upload/v1730487149/cuonglinh2611/albums/bd0yypy6ow7sjot3ul9p.jpg",
  // "https://res.cloudinary.com/dcos6mpjy/image/upload/v1730487149/cuonglinh2611/albums/hl8rmit2gz19iskhqvh8.jpg",
  // "https://res.cloudinary.com/dcos6mpjy/image/upload/v1730487149/cuonglinh2611/albums/jqofrdkcacj66bqiptts.jpg",
  // "https://res.cloudinary.com/dcos6mpjy/image/upload/v1730487149/cuonglinh2611/albums/saj6tyqpq9f2vzt1ibt9.jpg",
  // "https://res.cloudinary.com/dcos6mpjy/image/upload/v1730487149/cuonglinh2611/albums/ulunqtpkinh0bkxh1ul9.jpg",
  // "https://res.cloudinary.com/dcos6mpjy/image/upload/v1730487149/cuonglinh2611/albums/fqn5nu8fun96dd0d3f9s.jpg",
  'https://res.cloudinary.com/ngoviettung154/image/upload/v1768129845/TH/ING07801_nom8vl.jpg',
  'https://res.cloudinary.com/ngoviettung154/image/upload/v1768129840/TH/DSC04587_hdauel.jpg',
  'https://res.cloudinary.com/ngoviettung154/image/upload/v1768129843/TH/ING07568_kb8kpb.jpg',
  'https://res.cloudinary.com/ngoviettung154/image/upload/v1768129842/TH/ING07247_vvdefw.jpg',
  'https://res.cloudinary.com/ngoviettung154/image/upload/v1768129844/TH/ING07822_ok6yg9.jpg',
  'https://res.cloudinary.com/ngoviettung154/image/upload/v1768129842/TH/ING07111_wkwlkc.jpg',
  'https://res.cloudinary.com/ngoviettung154/image/upload/v1768129843/TH/ING07499_uz0gns.jpg',
  'https://res.cloudinary.com/ngoviettung154/image/upload/v1768129845/TH/ING07963_y7gkng.jpg',
  'https://res.cloudinary.com/ngoviettung154/image/upload/v1768129845/TH/ING08014_krxrsg.jpg',
  'https://res.cloudinary.com/ngoviettung154/image/upload/v1768129843/TH/ING07416_kt4cix.jpg',
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
