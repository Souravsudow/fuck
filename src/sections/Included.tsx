import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight, BrainCircuit, GraduationCap, ScanFace, Sparkles, ExternalLink, Github } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface CardData {
  icon: LucideIcon;
  category: string;
  title: string;
  subtitle: string;
  image: string;
  deployment: string;
  tags: string[];
  details: string[];
}

const cards: CardData[] = [
  {
    icon: ScanFace,
    category: 'AI & Computer Vision',
    title: 'Attendance System',
    subtitle: 'Face recognition attendance manager',
    image: '/images/projects/attendance-system.jpg',
    deployment: '#',
    tags: ['Python', 'OpenCV', 'AI'],
    details: [
      'Developed an attendance management system using OpenCV and Python with 95% recognition accuracy.',
      'Reduced manual entry time by around 15 hours per month.',
      'Reduced manual errors by 40% for 10 daily records, improving overall tracking efficiency.',
    ],
  },
  {
    icon: Sparkles,
    category: 'AI-Based Interview Platform',
    title: 'Mockstar',
    subtitle: 'Resume-aware interview preparation',
    image: '/images/projects/Mockstar.png',
    deployment: 'https://www.mockstar.in',
    tags: ['AI', 'Resume', 'Feedback'],
    details: [
      'Built an AI-powered interview platform that generates personalized questions by analyzing user resumes.',
      'Combined AI question generation with real-time behavioral feedback.',
      'Designed the platform to make interview preparation more interactive and focused.',
    ],
  },
  {
    icon: BrainCircuit,
    category: 'ML & ATS Optimization Tool',
    title: 'AI Resume Checker',
    subtitle: 'Resume analysis and feedback tool',
    image: '/images/projects/Airesume.gif',
    deployment: '',
    tags: ['ML', 'Streamlit', 'NLP'],
    details: [
      'Built a resume analysis tool using Hugging Face models and Streamlit.',
      'Handled 200+ monthly uploads from students and professionals.',
      'Added real-time feedback and user-friendly analysis, improving satisfaction by 25% based on survey responses.',
    ],
  },
  {
    icon: GraduationCap,
    category: 'AI-Powered Learning Platform',
    title: 'LERNO AI System',
    subtitle: 'Centralized study and doubt solving',
    image: '/images/projects/LernoAi.png',
    deployment: 'https://deployment-adaa.vercel.app',
    tags: ['ChatGPT API', 'Learning', 'AI Tutor'],
    details: [
      'Built an AI-driven platform to centralize study materials and reduce exam-time stress for students.',
      'Developed an AI tutor using the ChatGPT API for instant doubt solving.',
      'Added exam-focused 5 and 10 mark question support for structured preparation.',
    ],
  },
];

export default function Included() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const [activeProject, setActiveProject] = useState(-1);

  useEffect(() => {
    const section = sectionRef.current;
    const heading = headingRef.current;
    const grid = gridRef.current;

    if (!section || !heading || !grid) return;

    const ctx = gsap.context(() => {
      const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      if (reduceMotion) {
        gsap.set([heading, grid.querySelectorAll('.included-card')], { opacity: 1, y: 0 });
        return;
      }

      gsap.fromTo(heading, { opacity: 0, y: 30 }, {
        opacity: 1, y: 0, duration: 0.8, ease: 'power2.out',
        scrollTrigger: { trigger: heading, start: 'top 80%', toggleActions: 'play none none none' },
      });

      const cardElements = grid.querySelectorAll('.included-card');
      gsap.fromTo(cardElements, { opacity: 0, y: 30 }, {
        opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: 'power2.out',
        scrollTrigger: { trigger: grid, start: 'top 75%', toggleActions: 'play none none none' },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="work"
      className="relative w-full bg-mist-black"
      style={{ padding: 'clamp(80px, 10vh, 140px) 0' }}
    >
      <div className="mx-auto" style={{ maxWidth: 1200, padding: '0 24px' }}>
        <div ref={headingRef} className="mb-16 flex items-center gap-4">
          <h2
            className="font-display uppercase text-kimono-white"
            style={{
              fontSize: 'clamp(48px, 6vw, 80px)',
              letterSpacing: '0.08em',
              lineHeight: 1,
            }}
          >
            PROJECTS
          </h2>
          <div className="h-px flex-1 bg-glass-border" />
        </div>

        <div
          ref={gridRef}
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"
        >
          {cards.map((card, i) => (
            <ProjectCard
              key={card.title}
              card={card}
              isActive={activeProject === i}
              onClick={() => setActiveProject(activeProject === i ? -1 : i)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectCard({
  card,
  isActive,
  onClick,
}: {
  card: CardData;
  isActive: boolean;
  onClick: () => void;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const { icon: Icon, category, title, subtitle, image, deployment, tags, details } = card;

  const handleMouseEnter = () => {
    const cardElement = cardRef.current;
    if (!cardElement) return;

    cardElement.style.transform = 'translateY(-8px) rotateX(4deg) rotateY(-5deg)';
    cardElement.style.borderColor = 'rgba(212,248,122,0.4)';
    cardElement.style.boxShadow = '0 18px 44px rgba(212,248,122,0.12)';

    const icon = cardElement.querySelector('.card-icon') as HTMLElement | null;
    if (icon) icon.style.transform = 'scale(1.1)';

    const arrow = cardElement.querySelector('.project-arrow') as HTMLElement | null;
    if (arrow) arrow.style.transform = 'translate(3px, -3px)';
  };

  const handleMouseLeave = () => {
    const cardElement = cardRef.current;
    if (!cardElement) return;

    cardElement.style.transform = isActive ? 'translateY(-4px)' : 'translateY(0)';
    cardElement.style.borderColor = isActive ? 'rgba(212,248,122,0.42)' : 'rgba(255,255,255,0.1)';
    cardElement.style.boxShadow = isActive ? '0 22px 60px rgba(212,248,122,0.11)' : 'none';

    const icon = cardElement.querySelector('.card-icon') as HTMLElement | null;
    if (icon) icon.style.transform = 'scale(1)';

    const arrow = cardElement.querySelector('.project-arrow') as HTMLElement | null;
    if (arrow) arrow.style.transform = 'translate(0, 0)';
  };

  return (
    <div
      ref={cardRef}
      className={`included-card flex min-h-[360px] flex-col overflow-hidden rounded-xl transition-all duration-300 ${
        isActive ? 'sm:col-span-2 lg:col-span-2' : ''
      }`}
      style={{
        background: 'rgba(255,255,255,0.04)',
        border: `1px solid ${isActive ? 'rgba(212,248,122,0.42)' : 'rgba(255,255,255,0.1)'}`,
        backdropFilter: 'blur(12px)',
        boxShadow: isActive ? '0 22px 60px rgba(212,248,122,0.11)' : 'none',
        perspective: 900,
        transform: isActive ? 'translateY(-4px)' : 'translateY(0)',
        transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
      }}
      onClick={onClick}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick();
        }
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      role="button"
      tabIndex={0}
      data-cursor="hover"
    >
      <div className="relative h-44 overflow-hidden border-b border-kimono-white/10 bg-[#111]">
        <img
          src={image}
          alt={`${title} preview`}
          className="h-full w-full object-cover opacity-70 transition duration-500"
          onError={(e) => {
            e.currentTarget.style.display = 'none';
          }}
          loading="lazy"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(135deg, rgba(212,248,122,0.16), rgba(0,0,0,0.2) 36%, rgba(0,0,0,0.72) 100%)',
          }}
        />
        <div className="absolute inset-x-5 top-5 flex items-start justify-between gap-4">
          <div className="rounded-xl border border-lime-accent/30 bg-black/45 p-3 backdrop-blur-md">
            <Icon
              className="card-icon text-lime-accent transition-transform duration-300"
              style={{ width: 24, height: 24, strokeWidth: 1.5 }}
            />
          </div>
          <ArrowUpRight
            className="project-arrow text-kimono-white/55 transition-transform duration-300"
            style={{ width: 18, height: 18, strokeWidth: 1.5 }}
          />
        </div>
        <div className="absolute bottom-5 left-5 right-5">
          <span
            className="font-sans uppercase text-lime-accent"
            style={{ fontSize: 11, letterSpacing: '0.14em', fontWeight: 500 }}
          >
            {category}
          </span>
          <h3
            className="mt-2 font-sans uppercase text-kimono-white"
            style={{ fontSize: 15, letterSpacing: '0.14em', fontWeight: 700, lineHeight: 1.25 }}
          >
            {title}
          </h3>
        </div>
      </div>

      <div className="flex flex-1 flex-col p-6">
        <p className="font-sans text-mouse-gray" style={{ fontSize: 14, lineHeight: 1.55 }}>
          {subtitle}
        </p>

        <div className="mt-auto flex flex-wrap gap-2 pt-6">
          {tags.map((tag) => (
            <span
              key={tag}
              className="font-sans uppercase text-kimono-white/55"
              style={{
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: 999,
                fontSize: 10,
                letterSpacing: '0.1em',
                padding: '5px 9px',
              }}
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Buttons - Always visible */}
        <div className="mt-5 flex flex-wrap gap-2.5">
          {deployment ? (
            <a
              href={deployment}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-lime-accent/35 bg-lime-accent/10 px-4 py-2 font-sans text-[11px] uppercase tracking-[0.12em] text-lime-accent transition duration-300 hover:bg-lime-accent hover:text-mist-black"
              onClick={(e) => e.stopPropagation()}
            >
              Live Demo
              <ExternalLink size={13} strokeWidth={1.7} />
            </a>
          ) : (
            <span className="inline-flex items-center gap-2 rounded-full border border-kimono-white/10 px-4 py-2 font-sans text-[11px] uppercase tracking-[0.12em] text-kimono-white/30 cursor-not-allowed">
              Live Demo
              <ExternalLink size={13} strokeWidth={1.7} />
            </span>
          )}
          <a
            href={`https://github.com/Souravsudow/${title.toLowerCase().split(' ').join('-')}`}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-kimono-white/20 px-4 py-2 font-sans text-[11px] uppercase tracking-[0.12em] text-kimono-white/60 transition duration-300 hover:border-kimono-white/40 hover:text-kimono-white"
            onClick={(e) => e.stopPropagation()}
          >
            GitHub
            <Github size={13} strokeWidth={1.7} />
          </a>
        </div>

        {/* Details - Expandable */}
        <div
          className="overflow-hidden transition-all duration-500"
          style={{
            maxHeight: isActive ? 360 : 0,
            opacity: isActive ? 1 : 0,
            transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        >
          <div className="mt-5 border-t border-kimono-white/10 pt-5">
            <ul className="space-y-3">
              {details.map((detail) => (
                <li
                  key={detail}
                  className="font-sans text-mouse-gray"
                  style={{ fontSize: 13, lineHeight: 1.55 }}
                >
                  <span className="mr-2 text-lime-accent">-</span>
                  {detail}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}