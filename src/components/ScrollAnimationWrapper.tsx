'use client';

import { useEffect, useRef } from 'react';

interface ScrollAnimationWrapperProps {
  children: React.ReactNode;
}

export default function ScrollAnimationWrapper({ children }: ScrollAnimationWrapperProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
          }
        });
      },
      {
        threshold: 0.1,
      }
    );

    const fadeElements = wrapper.getElementsByClassName('fade-in-section');
    Array.from(fadeElements).forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={wrapperRef} className="relative w-full">
      {children}
    </div>
  );
}
