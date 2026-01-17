import { cn } from '@/libs/utils';

type TCircleLoadingProps = { className?: string; classNameWrapper?: string };

const CircleLoading = ({ className, classNameWrapper }: TCircleLoadingProps) => {
  return (
    <div role="status" className={cn('flex items-center', classNameWrapper)}>
      <div className={cn('loading h-5 w-5 animate-spin rounded-full border-2 border-t-amber-500', className)}></div>
      <span className="sr-only">...</span>
    </div>
  );
};

export default CircleLoading;
