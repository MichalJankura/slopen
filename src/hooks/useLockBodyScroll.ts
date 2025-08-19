import { useEffect, useRef } from 'react';

/**
 * Locks body scroll when `locked` is true. Restores previous inline styles when unlocked.
 * Works by setting body overflow hidden and preserving current scroll position to avoid layout shift.
 */
export function useLockBodyScroll(locked: boolean) {
  const scrollYRef = useRef<number>(0);
  const prevOverflowRef = useRef<string | null>(null);
  const prevPositionRef = useRef<string | null>(null);
  const prevTopRef = useRef<string | null>(null);
  const prevWidthRef = useRef<string | null>(null);

  useEffect(() => {
    const body = document.body;
    if (locked) {
      // Store scroll position & existing styles
      scrollYRef.current = window.scrollY;
      prevOverflowRef.current = body.style.overflow;
      prevPositionRef.current = body.style.position;
      prevTopRef.current = body.style.top;
      prevWidthRef.current = body.style.width;

      // Prevent scroll (also prevents iOS rubber-band by using fixed positioning)
      body.style.overflow = 'hidden';
      body.style.position = 'fixed';
      body.style.top = `-${scrollYRef.current}px`;
      body.style.width = '100%';
    } else {
      if (prevOverflowRef.current !== null) body.style.overflow = prevOverflowRef.current;
      if (prevPositionRef.current !== null) body.style.position = prevPositionRef.current;
      if (prevTopRef.current !== null) body.style.top = prevTopRef.current;
      if (prevWidthRef.current !== null) body.style.width = prevWidthRef.current;

      // Restore scroll position
      if (scrollYRef.current) window.scrollTo(0, scrollYRef.current);
    }

    return () => {
      // Cleanup if component unmounts while locked
      if (locked) {
        if (prevOverflowRef.current !== null) body.style.overflow = prevOverflowRef.current;
        if (prevPositionRef.current !== null) body.style.position = prevPositionRef.current;
        if (prevTopRef.current !== null) body.style.top = prevTopRef.current;
        if (prevWidthRef.current !== null) body.style.width = prevWidthRef.current;
        if (scrollYRef.current) window.scrollTo(0, scrollYRef.current);
      }
    };
  }, [locked]);
}
