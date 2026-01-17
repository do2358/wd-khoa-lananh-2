import { MacScrollbar, type MacScrollbarProps } from 'mac-scrollbar';
import { forwardRef } from 'react';

import { cn } from '@/libs/utils';

type TScrollAreaProps = MacScrollbarProps & {
  className?: string;
};

const ScrollArea = forwardRef(({ children, className, ...props }: TScrollAreaProps, forwardedRef: any) => {
  return (
    <MacScrollbar ref={forwardedRef} className={cn('scrollbar-hide', className)} {...props}>
      {children}
    </MacScrollbar>
  );
});

export default ScrollArea;
