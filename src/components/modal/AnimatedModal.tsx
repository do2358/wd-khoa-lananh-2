import { XIcon } from 'lucide-react';
import { AnimatePresence, m } from 'motion/react';
import { type ReactNode, useEffect, useId } from 'react';

import { cn } from '@/libs/utils';

interface IModalBodyProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  children: ReactNode;
  className?: string;
  classNameCloseBtn?: string;
}

export const Modal = ({ open, children, className, classNameCloseBtn, setOpen }: IModalBodyProps) => {
  const uid = useId();
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [open]);

  // const ref = useClickOutside(() => {
  //   setOpen(false);
  // });

  return (
    <AnimatePresence>
      <m.div
        key={uid + open}
        animate={{
          opacity: 1,
          backdropFilter: 'blur(10px)',
        }}
        exit={{
          opacity: 0,
          backdropFilter: 'blur(0px)',
        }}
        initial={{
          opacity: 0,
        }}
        style={{ display: open ? 'flex' : 'none' }}
        className="fixed inset-0 z-[100] flex size-full sm:items-center sm:justify-center"
      >
        <Overlay />

        <m.div
          key={uid + 'Modal' + open}
          className={cn('relative !z-[100] flex max-h-[calc(100dvh-40px)]  min-h-[50%] flex-1 flex-col overflow-hidden border border-transparent bg-white md:max-w-[1000px] md:rounded-2xl', className)}
        >
          <CloseIcon className={cn('absolute top-2 right-2', classNameCloseBtn)} onClick={() => setOpen(false)} />
          {children}
        </m.div>
      </m.div>
    </AnimatePresence>
  );
};

const Overlay = ({ className }: { className?: string }) => {
  return (
    <m.div
      animate={{
        opacity: 1,
      }}
      exit={{
        opacity: 0,
      }}
      initial={{
        opacity: 0,
      }}
      className={cn('bg-opacity-50 fixed inset-0 z-[100] size-full bg-black/50', className)}
    ></m.div>
  );
};

const CloseIcon = ({ onClick, className }: { className?: string; onClick?: () => void }) => {
  return (
    <button className={cn('group z-10 flex items-center justify-center', className)} onClick={onClick}>
      <XIcon className="size-6 text-black transition duration-200 group-hover:scale-125 group-hover:rotate-3" />
    </button>
  );
};
