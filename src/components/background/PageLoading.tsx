import React from 'react';

import { cn } from '@/libs/utils';

type TPageLoadingProps = { children?: React.ReactNode };

const PageLoading = ({ children }: TPageLoadingProps) => {
  return (
    <div id="preloader" className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-white/80 backdrop-blur-sm">
      <div className="relative">
        <svg viewBox="0 0 512 512" className="z-0 size-[300px] overflow-visible fill-transparent stroke-red-700 stroke-[5]">
          <path
            d="M462.3 62.6C407.5 15.9 326 24.3 275.7 76.2L256 96.5l-19.7-20.3C186.1 24.3 104.5 15.9 49.7 62.6c-62.8 53.6-66.1 149.8-9.9 207.9l193.5 199.8c12.5 12.9 32.8 12.9 45.3 0l193.5-199.8c56.3-58.1 53-154.3-9.8-207.9z"
            style={{ strokeDashoffset: 0, strokeDasharray: 1550, transformOrigin: 'center' }}
            className="animate-[stroke-animation_1s_ease-in-out_infinite_forwards]"
          ></path>
        </svg>
        <div className={cn('absolute top-1/2 left-1/2 z-10 -translate-x-1/2 -translate-y-1/2 text-center font-GreatVibes')}>
          <span className="text-center text-5xl whitespace-pre-line text-red-700">{`Khoa \n&\n Anh`}</span>
        </div>
      </div>
    </div>
  );
};

export default PageLoading;
