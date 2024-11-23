'use client';

import { useEffect } from 'react';
import { motion as m, useMotionValue } from 'framer-motion';

export default function CustomCursor() {
  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      // Center the cursor by offsetting by half its width/height (4px)
      cursorX.set(e.clientX - 4);
      cursorY.set(e.clientY - 4);
    };

    window.addEventListener('mousemove', moveCursor);
    return () => window.removeEventListener('mousemove', moveCursor);
  }, []);

  return (
    <m.div
      className="fixed w-8 h-8 pointer-events-none z-50"
      style={{
        x: cursorX,
        y: cursorY,
        transform: 'translate(-50%, -50%)'
      }}
    >
      <div className="w-full h-full rounded-full bg-white/30 backdrop-blur-sm border border-white/50" />
    </m.div>
  );
}