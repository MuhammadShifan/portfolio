import React, { useEffect, useState } from 'react';

export default function CustomCursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Only enable custom cursor on fine pointer devices (desktop)
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const handleMouseMove = (e) => {
      setPos({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseOver = (e) => {
      if (
        e.target.closest('button') ||
        e.target.closest('a') ||
        e.target.closest('.interactive-card') ||
        e.target.closest('input') ||
        e.target.closest('textarea')
      ) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseover', handleMouseOver, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <>
      {/* Outer Glow Halo */}
      <div
        className="spotlight-glow"
        style={{
          left: `${pos.x}px`,
          top: `${pos.y}px`,
        }}
      />
      {/* Precision Core Dot */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: isHovered ? '28px' : '8px',
          height: isHovered ? '28px' : '8px',
          borderRadius: '50%',
          backgroundColor: isHovered ? 'rgba(0, 242, 254, 0.15)' : '#00f2fe',
          border: isHovered ? '1px solid rgba(0, 242, 254, 0.8)' : 'none',
          boxShadow: isHovered
            ? '0 0 15px rgba(0, 242, 254, 0.4)'
            : '0 0 10px #00f2fe, 0 0 20px rgba(0, 242, 254, 0.5)',
          transform: `translate3d(${pos.x - (isHovered ? 14 : 4)}px, ${pos.y - (isHovered ? 14 : 4)}px, 0)`,
          pointerEvents: 'none',
          zIndex: 9999,
          transition: 'width 0.2s ease, height 0.2s ease, background-color 0.2s ease, transform 0.05s ease-out',
        }}
      />
    </>
  );
}
