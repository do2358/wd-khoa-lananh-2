'use client';
import React, { type ReactNode } from 'react';

import { cn } from '@/libs/utils';

interface BgAuroraProps extends React.HTMLProps<HTMLDivElement> {
  children: ReactNode;
  showRadialGradient?: boolean;
  classNameContainer?: string;
}

export const BgAurora = ({ className, children, showRadialGradient = true, classNameContainer, ...props }: BgAuroraProps) => {
  return (
    <div className={cn('transition-bg relative flex h-[100vh] flex-col items-center justify-center bg-white', className)} {...props}>
      <div
        style={
          {
            '--aurora': 'repeating-linear-gradient(100deg,#ef4444_10%,#a5b4fc_15%,#fca5a5_20%,#ddd6fe_25%,#f87171_30%)',
            '--dark-gradient': 'repeating-linear-gradient(100deg,#000_0%,#000_7%,transparent_10%,transparent_12%,#000_16%)',
            '--white-gradient': 'repeating-linear-gradient(100deg,#fff_0%,#fff_7%,transparent_10%,transparent_12%,#fff_16%)',
            '--red-300': '#fca5a5',
            '--red-400': '#f87171',
            '--red-500': '#ef4444',
            '--indigo-300': '#fff',
            '--violet-200': '#fff',
            '--black': '#000',
            '--white': '#fff',
            '--transparent': 'transparent',
          } as React.CSSProperties
        }
        className={cn('absolute inset-0 overflow-hidden', classNameContainer)}
      >
        <div
          //   I'm sorry but this is what peak developer performance looks like // trigger warning
          className={cn(
            `pointer-events-none absolute -inset-[10px] [background-image:var(--white-gradient),var(--aurora)] [background-size:300%,_200%] [background-position:50%_50%,50%_50%] opacity-50 blur-[10px] invert filter will-change-transform [--aurora:repeating-linear-gradient(100deg,var(--red-500)_10%,var(--indigo-300)_15%,var(--red-300)_20%,var(--violet-200)_25%,var(--red-400)_30%)] [--dark-gradient:repeating-linear-gradient(100deg,var(--black)_0%,var(--black)_7%,var(--transparent)_10%,var(--transparent)_12%,var(--black)_16%)] [--white-gradient:repeating-linear-gradient(100deg,var(--white)_0%,var(--white)_7%,var(--transparent)_10%,var(--transparent)_12%,var(--white)_16%)] after:absolute after:inset-0 after:animate-aurora after:[background-image:var(--white-gradient),var(--aurora)] after:[background-size:200%,_100%] after:[background-attachment:fixed] after:mix-blend-difference after:content-[""]`,

            showRadialGradient && `[mask-image:radial-gradient(ellipse_at_100%_0%,black_10%,var(--transparent)_70%)]`,
          )}
        ></div>
      </div>
    </div>
  );
};
