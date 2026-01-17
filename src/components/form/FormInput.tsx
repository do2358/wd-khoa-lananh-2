import React, { useId } from 'react';

import { cn } from '@/libs/utils';

type TFormInputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label?: React.ReactNode;
  classNameWrapper?: string;
  classNameLabel?: string;
  showCount?: boolean;
  maxCount?: number;
};

export const FormInputFloating = ({ label, classNameWrapper, classNameLabel, className, showCount, maxCount, ...props }: TFormInputProps) => {
  const uid = useId();
  return (
    <div className={cn('relative', classNameWrapper)}>
      <input
        id={uid + 'FormInputFloating'}
        placeholder=" "
        type="text"
        className={cn(
          'peer block w-full appearance-none rounded-lg border border-gray-300 bg-transparent px-2.5 pt-5 pb-3.5 text-base text-gray-900 placeholder:text-transparent focus:border-red-600 focus:ring-0 focus:outline-none focus:placeholder:text-gray-400',
          className,
        )}
        {...props}
      />
      {!!label && (
        <label
          htmlFor={uid + 'FormInputFloating'}
          className={cn(
            'absolute start-1 top-2 z-10 origin-[0] -translate-y-4 scale-75 bg-white px-2 text-base text-gray-500 duration-300 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:px-2 peer-focus:text-red-600 rtl:peer-focus:left-auto rtl:peer-focus:translate-x-1/4',
            classNameLabel,
          )}
        >
          {label}
        </label>
      )}

      {showCount && <div className="absolute top-1/2 right-0 -translate-y-1/2 pr-4 text-sm text-gray-500">{[String(props.value)?.length, maxCount].filter(Boolean).join('/')}</div>}
    </div>
  );
};
