import { useCallback, useEffect, useRef } from 'react';

const useIntersect = (onIntersect) => {
  const ref = useRef(null);

  const callback = useCallback(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          onIntersect();
        }
      });
    },
    [onIntersect],
  );

  useEffect(() => {
    if (!ref.current) return;
    const observer = new IntersectionObserver(callback);
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [ref, callback, onIntersect]);

  return ref;
};

export default useIntersect;
