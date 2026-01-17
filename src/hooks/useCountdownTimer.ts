import { differenceInMilliseconds } from 'date-fns';
import { useEffect, useState } from 'react';

interface CountdownTimerProps {
  targetDate: Date;
}

export const formatNumber = (num: number) => ('0' + num).slice(-2);

export function useCountdownTimer({ targetDate }: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState(() => Math.max(0, differenceInMilliseconds(targetDate, new Date())));

  useEffect(() => {
    const intervalId = setInterval(() => {
      const remainingTime = differenceInMilliseconds(targetDate, new Date());
      setTimeLeft(Math.max(0, remainingTime));

      if (remainingTime <= 0) {
        clearInterval(intervalId);
      }
    }, 1000);

    return () => clearInterval(intervalId);
  }, [targetDate]);

  const totalSeconds = Math.floor(timeLeft / 1000);
  const days = Math.floor(totalSeconds / (60 * 60 * 24));
  const hours = Math.floor((totalSeconds % (60 * 60 * 24)) / (60 * 60));
  const minutes = Math.floor((totalSeconds % (60 * 60)) / 60);
  const seconds = totalSeconds % 60;

  return {
    days,
    hours,
    minutes,
    seconds,
    isExpired: timeLeft <= 0,
  };
}
