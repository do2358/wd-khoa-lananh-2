import { useEffect, useState } from 'react';

/**
 * Hook to detect when user is idle
 * @param timeout - Time in milliseconds before considering user idle (default: 30 seconds)
 * @returns boolean indicating if user is idle
 */
export function useIdleDetection(timeout: number = 30000): boolean {
  const [isIdle, setIsIdle] = useState(false);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    const resetTimer = () => {
      setIsIdle(false);
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => setIsIdle(true), timeout);
    };

    // Events that indicate user activity
    const events = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart', 'click'];

    // Add event listeners
    events.forEach((event) => {
      document.addEventListener(event, resetTimer);
    });

    // Initialize timer
    resetTimer();

    // Cleanup
    return () => {
      events.forEach((event) => {
        document.removeEventListener(event, resetTimer);
      });
      clearTimeout(timeoutId);
    };
  }, [timeout]);

  return isIdle;
}
