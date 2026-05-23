import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Github, Globe, Instagram, Linkedin, Send } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const navLinks = [
  { label: 'Home', id: 'home' },
  { label: 'About', id: 'about' },
  { label: 'Work', id: 'work' },
  { label: 'Contact', id: 'contacts' },
];

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const footer = footerRef.current;
    if (!footer) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(footer, { opacity: 0 }, {
        opacity: 1, duration: 0.5,
        scrollTrigger: { trigger: footer, start: 'top 95%', toggleActions: 'play none none none' },
      });
    }, footer);

    return () => ctx.revert();
  }, []);

  const handleNavClick = (id: string) => {
    if (id === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer
      ref={footerRef}
      className="relative w-full bg-mist-black border-t"
      style={{ borderColor: 'rgba(255,255,255,0.1)', padding: '32px 0' }}
    >
      <div
        className="mx-auto flex flex-col md:flex-row items-center justify-between gap-6"
        style={{ maxWidth: 1200, padding: '0 24px' }}
      >
        {/* Logo */}
        <div className="flex flex-col items-center md:items-start gap-1">
          <div className="flex items-center gap-2">
            <Globe className="w-4 h-4 text-kimono-white" strokeWidth={1.5} />
            <span
              className="font-sans text-kimono-white uppercase"
              style={{ fontSize: 12, letterSpacing: '0.15em', fontWeight: 500 }}
            >
              SOURAV / PORTFOLIO
            </span>
          </div>
          <span className="font-sans text-mouse-gray" style={{ fontSize: 11 }}>
            &copy; 2025
          </span>
        </div>

        {/* Center Nav */}
        <nav className="flex items-center gap-6">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => handleNavClick(link.id)}
              className="relative font-sans text-kimono-white uppercase group bg-transparent border-0"
              style={{ fontSize: 12, letterSpacing: '0.15em', fontWeight: 500 }}
              data-cursor="hover"
            >
              {link.label}
              <span
                className="absolute bottom-0 left-0 h-px bg-kimono-white"
                style={{
                  width: '0%',
                  transition: 'width 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                }}
                ref={(el) => {
                  if (!el) return;
                  const parent = el.parentElement;
                  if (!parent) return;
                  parent.addEventListener('mouseenter', () => { el.style.width = '100%'; });
                  parent.addEventListener('mouseleave', () => { el.style.width = '0%'; });
                }}
              />
            </button>
          ))}
        </nav>

        {/* Social Icons */}
        <div className="flex items-center gap-4">
          {[Github, Linkedin, Instagram, Send].map((Icon, i) => (
            <a
              key={i}
              href="#"
              className="text-kimono-white/50 hover:text-kimono-white transition-colors duration-300"
              data-cursor="hover"
            >
              <Icon className="w-[18px] h-[18px]" strokeWidth={1.5} />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
