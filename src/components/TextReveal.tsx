import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface TextRevealProps {
  text: string;
  className?: string;
  tag?: 'h1' | 'h2' | 'h3' | 'p' | 'span';
}

export default function TextReveal({ text, className = '', tag: Tag = 'p' }: TextRevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const words = el.querySelectorAll('.reveal-word');

    gsap.fromTo(words, 
      { y: 60, opacity: 0, rotateX: -60 },
      { 
        y: 0, 
        opacity: 1, 
        rotateX: 0,
        duration: 0.9,
        stagger: 0.04,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
          toggleActions: 'play none none none',
        }
      }
    );
  }, []);

  return (
    <div ref={ref} className={className} style={{ perspective: 1000 }}>
      <Tag className="overflow-hidden">
        {text.split(' ').map((word, i) => (
          <span key={i} className="reveal-word inline-block overflow-hidden mr-[0.25em]">
            <span className="inline-block">{word}</span>
          </span>
        ))}
      </Tag>
    </div>
  );
}