import { m, useMotionValueEvent, useScroll, useTransform } from 'motion/react';
import React, { useEffect, useId, useRef, useState } from 'react';
import { useMediaQuery } from 'react-responsive';

import { cn } from '@/libs/utils';

import { MotionEffect } from '../animation/MotionEffect';
import { FlowerBlossomSvg } from '../icons';
import RcImage from '../media/RcImage';
import ScrollArea from '../ScrollArea';

const dataText = [
  {
    time1: '15',
    time2: '11/2022',
    title: 'Ngày bắt đầu',
    desc: 'Vào một đêm tháng 11 lung linh, sau nhiều năm quen biết, ánh mắt ta tìm thấy nhau giữa muôn ngàn ánh đèn, từ đó một câu chuyện tình yêu bắt đầu.',
    image: 'https://res.cloudinary.com/ngoviettung154/image/upload/v1768614590/TH/426184736_3584930311836479_1463596972360896750_n_mglw0j.jpg',
  },
  {
    time1: '03',
    time2: '12/2025',
    title: 'Anh ngỏ lời',
    desc: 'Trong khoảnh khắc dịu dàng của tháng 12, anh bất ngờ quỳ gối, ánh mắt trao trọn tình yêu, ngỏ lời gắn kết đời ta mãi mãi.',
    image: 'https://res.cloudinary.com/ngoviettung154/image/upload/v1768614667/TH/IMG_3442_c1jzv0.jpg',
  },
  {
    time1: '31',
    time2: '01/2026',
    title: 'Chính thức ở bên nhau',
    desc: 'Ngày 31 tháng 01 năm 2026, sau khoảng thời gian cùng trải qua những thăng trầm, chúng mình chính thức trở về chung một mái nhà, viết tiếp câu chuyện tình yêu đẹp như mơ.',
    image: 'https://res.cloudinary.com/ngoviettung154/image/upload/v1768129844/TH/ING07844_v3fjlh.jpg',
  },
];

const TimelineDating = (props: { className?: string; setModalImage?: (src?: string) => void }) => {
  const uid = useId();
  const ref = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  const mediaAbove640 = useMediaQuery({ minWidth: 640 });

  useEffect(() => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      setHeight(rect.height);
    }
  }, [ref]);

  const [scrollYProgressValue, setScrollYProgressValue] = useState(0);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 10%', 'end 100%'],
  });

  const heightTransform = useTransform(scrollYProgress, [0, 1], [0, height]);
  const opacityTransform = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

  const activeTitleStyle: React.CSSProperties = {
    textDecoration: 'underline',
    color: '#b91c1c ',
  };

  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    setScrollYProgressValue(latest);
  });

  const formatActiveTitleStyle = (progress: number, index: number) => {
    const progresses = [0.1, 0.5, 0.7];
    if (progress > progresses[index]) {
      return activeTitleStyle;
    }
    return {};
  };

  return (
    <>
      {/* Mobile horizontal layout */}
      {!mediaAbove640 && (
        <div className={cn('w-full py-10', props?.className)}>
          <ScrollArea suppressScrollY className="w-full">
            <div className="flex gap-8 px-6 pb-4">
              {dataText.map((item, index) => (
                <div key={uid + index} className="relative flex min-w-[320px] flex-shrink-0 flex-col">
                  {/* Time Badge */}
                  <div className="mb-4 flex items-baseline gap-2 text-red-700">
                    <div className="font-DancingScript text-6xl">{item.time1}</div>
                    <div className="text-base">{item.time2}</div>
                  </div>

                  {/* Image */}
                  <div className="relative mb-4 flex h-[300px] w-[280px] flex-col items-center justify-center rounded-xl border-2 border-red-900/50 p-2">
                    <RcImage alt={item.title} height={'100%'} src={item.image} width={'100%'} className="cursor-pointer rounded-lg object-cover" />
                    <div className="absolute -top-2 -left-2 animate-[bounceY_12s_linear_infinite]">
                      <FlowerBlossomSvg className="h-auto w-20 rotate-[-82deg]" />
                    </div>
                    <div className="absolute -right-8 -bottom-8 animate-[bounceY_12s_linear_infinite]">
                      <FlowerBlossomSvg className="h-auto w-24 rotate-[-82deg]" />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex flex-col">
                    <h3 className="mb-3 font-DancingScript text-3xl font-[600] text-red-700">{item.title}</h3>
                    <p className="max-w-[300px] font-Questrial text-base leading-relaxed text-gray-700">{item.desc}</p>
                  </div>

                  {/* Connector Line (except for last item) */}
                  {index < dataText.length - 1 && <div className="absolute top-8 -right-8 h-0.5 w-8 bg-gradient-to-r from-red-400 to-red-200" />}
                </div>
              ))}
            </div>
          </ScrollArea>
        </div>
      )}

      {/* Desktop vertical layout (original) - Always rendered for refs */}
      <div ref={containerRef} className={cn('w-full md:px-10', !mediaAbove640 && 'hidden', props?.className)}>
        <div ref={ref} className="relative mx-auto max-w-7xl pb-20">
          {dataText.map((item, index) => (
            <div key={uid + index} className={cn('group flex justify-center pt-20 sm:items-center sm:pt-40', index % 2 !== 0 && 'sm:flex-row-reverse')}>
              <MotionEffect
                inView
                inViewOnce
                slide={{ direction: index % 2 === 0 ? 'left' : 'right' }}
                className={cn('flex flex-col sm:max-w-md sm:flex-1', index % 2 === 0 ? 'sm:pr-5' : 'sm:pl-5')}
              >
                <h3 style={formatActiveTitleStyle(scrollYProgressValue, index)} className={cn('mb-4 font-DancingScript text-4xl font-[600] transition-all sm:text-5xl ')}>
                  {item.title}
                </h3>
                <p className="font-Questrial text-base">{item.desc}</p>
              </MotionEffect>

              <div className="z-10 flex shrink-0 items-baseline border-red-600 text-red-700 sm:mx-10 sm:size-40 sm:flex-col sm:items-center sm:justify-center sm:rounded-full sm:border sm:bg-white">
                <div className={cn('font-DancingScript text-7xl')}>{item.time1}</div>
                <div className="text-lg sm:text-base">{item.time2}</div>
              </div>

              <MotionEffect inView inViewOnce slide={{ direction: index % 2 === 0 ? 'right' : 'left' }} className="flex sm:max-w-md sm:flex-1">
                <div className="relative mx-auto flex h-[360px] w-[300px] shrink-0 flex-col items-center justify-center rounded-xl border-2 border-red-900/50 p-2 sm:mx-16 sm:w-[250px] sm:rounded-full">
                  <RcImage alt="2611" height={'100%'} src={item.image} width={'100%'} className=" cursor-pointer rounded-lg object-cover sm:rounded-full" />
                  <div className="absolute top-0 left-[-10px] animate-[bounceY_12s_linear_infinite]">
                    <FlowerBlossomSvg className="h-auto w-25 rotate-[-82deg]" />
                  </div>
                  <div className="absolute right-[-40px] bottom-[-40px] animate-[bounceY_12s_linear_infinite]">
                    <FlowerBlossomSvg className="h-auto w-30 rotate-[-82deg]" />
                  </div>
                </div>
              </MotionEffect>
            </div>
          ))}
          <div
            style={{
              height: height + 'px',
            }}
            className="absolute top-0 left-1/2 w-[2px] -translate-x-1/2 overflow-hidden bg-red-100 bg-[linear-gradient(to_bottom,var(--tw-gradient-stops))] from-transparent from-0% via-neutral-200 to-transparent to-[99%] [mask-image:linear-gradient(to_bottom,transparent_0%,black_10%,black_90%,transparent_100%)]"
          >
            <m.div
              style={{
                height: heightTransform,
                opacity: opacityTransform,
              }}
              className="absolute inset-x-0 top-0 w-[2px] rounded-full bg-gradient-to-t from-red-600 from-0% via-red-400 via-10% to-transparent"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default TimelineDating;
