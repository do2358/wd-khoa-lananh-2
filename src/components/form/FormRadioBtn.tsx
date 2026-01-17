import React, { useId } from 'react';

import { cn } from '@/libs/utils';

type TFormRadioBtnProps = {
  name: string;
  value: string;
  required?: boolean;
  disabled?: boolean;
  children?: React.ReactNode;
  extra?: React.ReactNode;
  className?: string;
  classNameWrapper?: string;
  onChange?: (v: string) => void;
};

const FormRadioBtn = ({ children, extra, classNameWrapper, name, value, required, className, onChange, disabled }: TFormRadioBtnProps) => {
  const uid = useId();
  return (
    <div className={classNameWrapper}>
      <input id={uid} name={name} disabled={disabled} required={required} type="radio" value={value} className="peer hidden" onChange={(e) => onChange?.(e.target.value)} />
      <label
        htmlFor={uid}
        className={cn(
          'relative inline-flex w-full cursor-pointer items-center justify-between rounded-lg border border-gray-200 bg-white text-gray-500 peer-checked:border-red-600 peer-checked:font-[600] peer-checked:text-red-600 peer-disabled:pointer-events-none peer-disabled:cursor-not-allowed hover:bg-gray-100 hover:text-gray-600',
          className,
        )}
      >
        {children}
      </label>
      {extra}
    </div>
  );
};

export default FormRadioBtn;
