import { LazyMotion, domAnimation } from 'motion/react';
import React from 'react';
import { ToastContainer } from 'react-toastify';
import { SWRConfig } from 'swr';

type TProvidersProps = { children?: React.ReactNode };

const Providers = ({ children }: TProvidersProps) => {
  return (
    <LazyMotion features={domAnimation}>
      <SWRConfig>{children}</SWRConfig>

      <ToastContainer autoClose={3000} closeOnClick={false} draggable={false} icon={false} newestOnTop={false} position="top-right" stacked theme="light" />
    </LazyMotion>
  );
};

export default Providers;
