/* eslint-disable @typescript-eslint/no-unsafe-function-type */
import { useEffect, useRef } from 'react';

type TuseIntervalProps = {};

export function useInterval(callback: Function, delay?: number | null) {
  const savedCallback = useRef<Function>(() => {});

  useEffect(() => {
    savedCallback.current = callback;
  });

  useEffect(() => {
    if (delay !== null) {
      const interval = setInterval(() => savedCallback.current(), delay || 0);
      return () => clearInterval(interval);
    }

    return undefined;
  }, [delay]);
}
