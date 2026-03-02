import { useState, useEffect, useCallback, useRef } from 'react';

interface UseIdleTimerOptions {
  timeout: number; // tiempo en milisegundos
  onIdle?: () => void;
  onActive?: () => void;
  enabled?: boolean;
}

interface UseIdleTimerReturn {
  isIdle: boolean;
  resetTimer: () => void;
}

const ACTIVITY_EVENTS = [
  'mousemove',
  'mousedown',
  'keydown',
  'touchstart',
  'scroll',
  'wheel',
  'resize',
] as const;

export function useIdleTimer({
  timeout,
  onIdle,
  onActive,
  enabled = true,
}: UseIdleTimerOptions): UseIdleTimerReturn {
  const [isIdle, setIsIdle] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isIdleRef = useRef(false);

  const clearTimer = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const startTimer = useCallback(() => {
    clearTimer();
    timerRef.current = setTimeout(() => {
      if (!isIdleRef.current) {
        isIdleRef.current = true;
        setIsIdle(true);
        onIdle?.();
      }
    }, timeout);
  }, [timeout, onIdle, clearTimer]);

  const resetTimer = useCallback(() => {
    if (isIdleRef.current) {
      isIdleRef.current = false;
      setIsIdle(false);
      onActive?.();
    }
    startTimer();
  }, [startTimer, onActive]);

  const handleActivity = useCallback(() => {
    if (!enabled) return;
    resetTimer();
  }, [enabled, resetTimer]);

  useEffect(() => {
    if (!enabled) {
      clearTimer();
      if (isIdleRef.current) {
        isIdleRef.current = false;
        setIsIdle(false);
      }
      return;
    }

    // Iniciar el timer
    startTimer();

    // Agregar event listeners
    ACTIVITY_EVENTS.forEach((event) => {
      window.addEventListener(event, handleActivity, { passive: true });
    });

    // Cleanup
    return () => {
      clearTimer();
      ACTIVITY_EVENTS.forEach((event) => {
        window.removeEventListener(event, handleActivity);
      });
    };
  }, [enabled, startTimer, handleActivity, clearTimer]);

  return { isIdle, resetTimer };
}
