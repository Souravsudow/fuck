import { useEffect, useState } from 'react';

export default function Loader() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + Math.random() * 15;
      });
    }, 200);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 z-[100] bg-mist-black flex flex-col items-center justify-center">
      {/* Animated ring */}
      <div className="relative w-20 h-20">
        <div className="absolute inset-0 border border-kimono-white/10 rounded-full" />
        <div 
          className="absolute inset-0 border-2 border-lime-accent rounded-full border-t-transparent animate-spin"
          style={{ animationDuration: '1.2s' }}
        />
        {/* Inner pulse */}
        <div className="absolute inset-4 bg-lime-accent/20 rounded-full animate-pulse" />
      </div>

      {/* Progress text */}
      <div className="mt-8 flex flex-col items-center gap-3">
        <p className="font-mono text-xs uppercase tracking-[0.25em] text-kimono-white/40">
          Initializing experience
        </p>

        {/* Progress bar */}
        <div className="w-48 h-px bg-kimono-white/10 relative overflow-hidden">
          <div 
            className="absolute inset-y-0 left-0 bg-lime-accent transition-all duration-300"
            style={{ width: `${Math.min(progress, 100)}%` }}
          />
        </div>

        <p className="font-mono text-[10px] text-lime-accent/60">
          {Math.min(Math.round(progress), 100)}%
        </p>
      </div>
    </div>
  );
}