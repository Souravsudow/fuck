import { useEffect, useState } from 'react';

export default function CustomCursor() {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [hovering, setHovering] = useState(false);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const move = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
      setHidden(false);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isInteractive = target.closest('a, button, [role="button"], input, textarea, [data-cursor="hover"]');
      setHovering(!!isInteractive);
    };

    const handleMouseLeave = () => setHidden(true);
    const handleMouseEnter = () => setHidden(false);

    window.addEventListener('mousemove', move);
    window.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('mousemove', move);
      window.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, []);

  if (hidden) return null;

  return (
    <>
      {/* Dot */}
      <div 
        className="fixed pointer-events-none z-[9999] mix-blend-difference hidden lg:block"
        style={{
          left: pos.x - 4,
          top: pos.y - 4,
          width: 8,
          height: 8,
          background: '#D4F87A',
          borderRadius: '50%',
          transition: 'transform 0.08s ease-out',
          transform: hovering ? 'scale(0.5)' : 'scale(1)',
        }}
      />
      {/* Ring */}
      <div 
        className="fixed pointer-events-none z-[9998] mix-blend-difference hidden lg:block"
        style={{
          left: pos.x - 24,
          top: pos.y - 24,
          width: 48,
          height: 48,
          border: '1px solid rgba(212,248,122,0.4)',
          borderRadius: '50%',
          transition: 'transform 0.15s ease-out, width 0.2s, height 0.2s, left 0.15s, top 0.15s',
          transform: hovering ? 'scale(1.6)' : 'scale(1)',
        }}
      />
    </>
  );
}