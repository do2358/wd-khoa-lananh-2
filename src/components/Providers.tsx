import { LazyMotion, domAnimation } from 'motion/react';
import React from 'react';

type TProvidersProps = { children?: React.ReactNode };

const Providers = ({ children }: TProvidersProps) => {
  return <LazyMotion features={domAnimation}>{children}</LazyMotion>;
};

export default Providers;
