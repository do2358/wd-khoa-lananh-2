import { Link } from '@tanstack/react-router';
import { type ReactNode } from 'react';

import { cn } from '@/libs/utils';

type TButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & { icon?: ReactNode };

export function GradientButton({ children, icon, className, ...props }: TButtonProps) {
  return (
    <button className={cn('relative flex items-center justify-center px-2 py-1 [--bg-size:300%]', className)} {...props}>
      <div
        className={
          'absolute inset-0 block size-full animate-gradient rounded-[inherit] bg-linear-to-r from-[#dc2626]/50 via-[#f87171]/50 to-[#dc2626]/50 bg-size-[var(--bg-size)_100%] mask-subtract! p-[2px] [mask:linear-gradient(#fff_0_0)_content-box,linear-gradient(#fff_0_0)]'
        }
      />
      {icon}
      <span className={cn(`inline animate-gradient bg-linear-to-r from-[#dc2626] via-[#f87171] to-[#dc2626] bg-size-[var(--bg-size)_100%] bg-clip-text text-transparent`)}>{children}</span>
    </button>
  );
}

type TLinkProps = React.AnchorHTMLAttributes<HTMLAnchorElement> & { icon?: ReactNode; href: string };

export function GradientButtonLink({ href, children, icon, className, ...props }: TLinkProps) {
  return (
    <Link to={href} className={cn('relative flex items-center justify-center px-2 py-1 [--bg-size:300%]', className)} {...props}>
      <div
        className={
          'absolute inset-0 block size-full animate-gradient rounded-[inherit] bg-linear-to-r from-[#dc2626]/50 via-[#f87171]/50 to-[#dc2626]/50 bg-size-[var(--bg-size)_100%] mask-subtract! p-[2px] [mask:linear-gradient(#fff_0_0)_content-box,linear-gradient(#fff_0_0)]'
        }
      />
      {icon}
      <span className={cn(`inline animate-gradient bg-linear-to-r from-[#dc2626] via-[#f87171] to-[#dc2626] bg-size-[var(--bg-size)_100%] bg-clip-text text-transparent`)}>{children}</span>
    </Link>
  );
}
