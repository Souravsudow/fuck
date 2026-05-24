import { useEffect, useState } from 'react';

export function useScramble(text: string, trigger: boolean = true, speed: number = 30) {
  const [display, setDisplay] = useState(text);
  const chars = '!<>-_\/[]{}—=+*^?#________';

  useEffect(() => {
    if (!trigger) {
      setDisplay(text);
      return;
    }

    let i = 0;
    const interval = setInterval(() => {
      setDisplay(
        text
          .split('')
          .map((char, idx) => {
            if (char === ' ') return ' ';
            if (idx < i) return text[idx];
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join('')
      );
      i += 0.5;
      if (i >= text.length) {
        setDisplay(text);
        clearInterval(interval);
      }
    }, speed);

    return () => clearInterval(interval);
  }, [trigger, text, speed]);

  return display;
}