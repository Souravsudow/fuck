import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Github, Globe, Instagram, Linkedin, Send } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const projectPreviews = [
  { caption: 'portfolio', accent: '#D4F87A', image: '/images/profile-selfie.jpg' },
  { caption: 'dashboard', accent: '#9CD9FF', image: '/images/profile-2.jpeg' },
  { caption: 'ai chat', accent: '#FFB7C5', image: '/images/profile-3.jpeg' },
  { caption: 'landing', accent: '#F5E8D3', image: '/images/profile-4.jpeg' },
  { caption: 'motion', accent: '#B7A7FF', image: '/images/profile-5.jpeg' },
];

const editorFiles = [
  {
    group: 'EXPERIENCE',
    items: [
      {
        name: 'frontend_intern.ts',
        icon: '<>',
        lines: [
          { text: '/**', color: '#6B7280' },
          { text: ' * @role Frontend Developer Intern', color: '#D4F87A' },
          { text: ' * @status Available for internship', color: '#9CD9FF' },
          { text: ' */', color: '#6B7280' },
          { text: 'export const experience = {', color: '#FF79C6' },
          { text: '  focus: "Frontend systems with product polish",', color: '#F5E8D3' },
          { text: '  currentlyBuilding: [', color: '#9CD9FF' },
          { text: '    "responsive React interfaces",', color: '#D4F87A' },
          { text: '    "cinematic landing pages",', color: '#D4F87A' },
          { text: '    "clean UI states and micro-interactions"', color: '#D4F87A' },
          { text: '  ]', color: '#9CD9FF' },
          { text: '  goal: "ship useful screens, not just pretty ones"', color: '#FFB7C5' },
          { text: '};', color: '#F5E8D3' },
        ],
      },
      {
        name: 'freelance_work.ts',
        icon: '<>',
        lines: [
          { text: 'export const workStyle = {', color: '#FF79C6' },
          { text: '  approach: "structure first, polish second",', color: '#F5E8D3' },
          { text: '  strengths: [', color: '#9CD9FF' },
          { text: '    "turn rough ideas into clean sections",', color: '#D4F87A' },
          { text: '    "make layouts feel premium and intentional",', color: '#D4F87A' },
          { text: '    "keep the code easy to improve later"', color: '#D4F87A' },
          { text: '  ]', color: '#9CD9FF' },
          { text: '};', color: '#FF79C6' },
        ],
      },
    ],
  },
  {
    group: 'EDUCATION',
    items: [
      {
        name: 'bca_degree.json',
        icon: '{}',
        lines: [
          { text: '/**', color: '#6B7280' },
          { text: ' * @degree Bachelor of Computer Application (BCA)', color: '#50FA7B' },
          { text: ' * @university K.R. Mangalam University', color: '#BD93F9' },
          { text: ' * @years Aug 2023 - June 2026', color: '#F1C40F' },
          { text: ' */', color: '#6B7280' },
          { text: 'export const education = {', color: '#FF79C6' },
          { text: '  degree: "BCA",', color: '#F5E8D3' },
          { text: '  specialization: "AI & Data Science",', color: '#50FA7B' },
          { text: '  cgpa: "7.4/10",', color: '#9CD9FF' },
          { text: '  highlights: ["AI", "Data Science", "Frontend"]', color: '#F1C40F' },
          { text: '  learningMode: "build, test, improve, repeat"', color: '#D4F87A' },
          { text: '};', color: '#F5E8D3' },
        ],
      },
    ],
  },
  {
    group: 'PROJECTS',
    items: [
      {
        name: 'portfolio_app.tsx',
        icon: '<>',
        lines: [
          { text: 'export function PortfolioProject() {', color: '#FF79C6' },
          { text: '  return {', color: '#F5E8D3' },
          { text: '    title: "Sourav Portfolio",', color: '#D4F87A' },
          { text: '    stack: ["React", "Tailwind", "GSAP"],', color: '#9CD9FF' },
          { text: '    features: [', color: '#FFB7C5' },
          { text: '      "interactive code editor hero",', color: '#F5E8D3' },
          { text: '      "clickable project case cards",', color: '#F5E8D3' },
          { text: '      "experience timeline and contact flow"', color: '#F5E8D3' },
          { text: '    ]', color: '#FFB7C5' },
          { text: '  };', color: '#F5E8D3' },
          { text: '}', color: '#FF79C6' },
        ],
      },
      {
        name: 'ai_workspace.ts',
        icon: '<>',
        lines: [
          { text: 'export const aiProjects = [', color: '#FF79C6' },
          { text: '  "Attendance System with Face Recognition",', color: '#D4F87A' },
          { text: '  "Mockstar AI Interview Platform",', color: '#F5E8D3' },
          { text: '  "AI Resume Checker",', color: '#9CD9FF' },
          { text: '  "LERNO AI Study Assistant"', color: '#FFB7C5' },
          { text: '];', color: '#FF79C6' },
        ],
      },
    ],
  },
  {
    group: 'SKILLS',
    items: [
      {
        name: 'react.config.ts',
        icon: '<>',
        lines: [
          { text: 'export const frontend = {', color: '#FF79C6' },
          { text: '  core: ["React", "TypeScript", "Tailwind"],', color: '#D4F87A' },
          { text: '  ui: ["responsive layouts", "design systems"],', color: '#9CD9FF' },
          { text: '  backendAware: ["APIs", "auth flows", "AI tools"],', color: '#F5E8D3' },
          { text: '  mindset: "clean, reusable, practical"', color: '#FFB7C5' },
          { text: '};', color: '#FF79C6' },
        ],
      },
      {
        name: 'motion.gsap.ts',
        icon: '<>',
        lines: [
          { text: 'export const motion = {', color: '#FF79C6' },
          { text: '  library: "GSAP",', color: '#F5E8D3' },
          { text: '  patterns: ["scroll reveals", "hover states", "parallax"],', color: '#D4F87A' },
          { text: '  rule: "motion should guide attention"', color: '#9CD9FF' },
          { text: '  feel: "cinematic, fast, and controlled"', color: '#FFB7C5' },
          { text: '};', color: '#FF79C6' },
        ],
      },
    ],
  },
];

const flatEditorFiles = editorFiles.flatMap((section) => section.items);

export default function Hero() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const skyRef = useRef<HTMLDivElement>(null);
  const mountainsRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const kimonoRef = useRef<HTMLDivElement>(null);
  const polaroidRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const sky = skyRef.current;
    const mountains = mountainsRef.current;
    const text = textRef.current;
    const title = titleRef.current;
    const kimono = kimonoRef.current;
    const polaroid = polaroidRef.current;
    const nav = navRef.current;
    const scrollIndicator = scrollIndicatorRef.current;

    if (!section || !sky || !mountains || !text || !title || !kimono || !polaroid || !nav || !scrollIndicator) return;

    const ctx = gsap.context(() => {
      const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      gsap.set([sky, mountains, text, polaroid], { willChange: 'transform' });

      if (reduceMotion) {
        gsap.set([sky, mountains, text, title, kimono, nav, polaroid.children, scrollIndicator], { opacity: 1, clearProps: 'transform' });
        return;
      }

      gsap.to([sky, mountains], {
        y: () => window.innerHeight * 0.3,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      });

      gsap.to(text, {
        y: () => window.innerHeight * 0.5,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      });

      gsap.to(polaroid, {
        x: () => window.innerWidth * -0.4,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      });

      // Entrance animations
      gsap.fromTo([sky, mountains], { opacity: 0 }, { opacity: 1, duration: 1, ease: 'power2.out', delay: 0 });
      gsap.fromTo(title, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 1.2, ease: 'power3.out', delay: 0.2 });
      gsap.fromTo(nav, { opacity: 0 }, { opacity: 1, duration: 0.6, delay: 0.4 });
      gsap.fromTo(kimono, { opacity: 0 }, { opacity: 1, duration: 1, delay: 0.6 });
      gsap.fromTo(
        polaroid.children,
        { x: -50, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.8, stagger: 0.1, delay: 0.8, ease: 'power2.out' }
      );
      gsap.fromTo(scrollIndicator, { opacity: 0 }, { opacity: 1, duration: 0.5, delay: 1 });

      // Hide scroll indicator after 100px scroll
      ScrollTrigger.create({
        trigger: section,
        start: 'top top',
        end: '+=100',
        onLeave: () => gsap.to(scrollIndicator, { opacity: 0, duration: 0.3 }),
        onEnterBack: () => gsap.to(scrollIndicator, { opacity: 1, duration: 0.3 }),
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="home"
      className="relative w-full overflow-hidden"
      style={{ height: '100vh' }}
    >
      {/* Background Plane - cinematic developer desk */}
      <div
        ref={skyRef}
        className="absolute inset-0 z-[1] will-change-transform"
        style={{
          background:
            'radial-gradient(circle at 50% 18%, rgba(212,248,122,0.16), transparent 28%), radial-gradient(circle at 78% 42%, rgba(156,217,255,0.14), transparent 30%), linear-gradient(180deg, #151515 0%, #0A0A0A 58%, #050505 100%)',
        }}
      >
        <div className="absolute inset-0 opacity-[0.14]" style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px)',
          backgroundSize: '72px 72px',
        }} />
        <div className="absolute left-[8%] right-[8%] top-[18%] h-px bg-kimono-white/10" />
        <div className="absolute left-[12%] top-[30%] h-[42%] w-[34%] rounded-full bg-lime-accent/10 blur-[90px]" />
        <div className="absolute bottom-0 left-0 right-0 h-[42%]" style={{
          background: 'linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.72) 52%, #050505 100%)',
        }} />
      </div>

      {/* Mid-ground Plane - portfolio title, tucked behind the mountain facade */}
      <div
        ref={textRef}
        className="absolute inset-0 z-[2] flex items-start justify-center will-change-transform"
        style={{ top: '12%' }}
      >
        <div
          ref={titleRef}
          className="relative select-none"
          style={{
            fontSize: 'clamp(110px, 15vw, 300px)',
            letterSpacing: '0.02em',
            lineHeight: 0.85,
          }}
        >
          <h1
            className="font-display uppercase"
            style={{
              WebkitTextStroke: '1.7px rgba(250,250,250,0.82)',
              color: 'transparent',
              textShadow: '0 0 18px rgba(250,250,250,0.12)',
            }}
          >
            SOURAV
          </h1>
          <h1
            aria-hidden="true"
            className="sourav-fill-title pointer-events-none absolute inset-0 font-display uppercase"
          >
            SOURAV
          </h1>
        </div>
      </div>

      {/* Mid-ground Plane - laptop and UI mockup crossing the title */}
      <div
        ref={mountainsRef}
        className="absolute inset-0 z-[3] will-change-transform"
      >
        <LaptopScene />
      </div>

      {/* Foreground Plane - developer portrait placeholder */}
      <div
        ref={kimonoRef}
        className="absolute z-[4] will-change-transform"
        style={{
          bottom: 0,
          right: '4%',
          width: 'clamp(210px, 23vw, 360px)',
          height: '78%',
        }}
      >
        <DeveloperFigure />
      </div>

      {/* Navigation */}
      <nav
        ref={navRef}
        className="absolute top-0 left-0 right-0 z-10 flex items-center justify-between px-8 py-6"
      >
        {/* Logo */}
        <div className="flex items-center gap-2">
          <Globe className="w-4 h-4 text-kimono-white" strokeWidth={1.5} />
          <span
            className="font-sans text-kimono-white uppercase"
            style={{ fontSize: 12, letterSpacing: '0.15em', fontWeight: 500 }}
          >
            SOURAV / PORTFOLIO
          </span>
        </div>

        {/* Center Nav Links */}
        <div className="hidden md:flex items-center gap-8">
          {[
            { label: 'About', href: '#about' },
            { label: 'Work', href: '#work' },
            { label: 'Contact', href: '#contacts' },
          ].map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="relative font-sans text-kimono-white uppercase group"
              style={{ fontSize: 12, letterSpacing: '0.15em', fontWeight: 500 }}
              data-cursor="hover"
            >
              {item.label}
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
            </a>
          ))}
        </div>

        {/* Book Button */}
        <a
          href="#contacts"
          className="hidden md:block font-sans uppercase text-kimono-white border border-kimono-white rounded-full transition-all duration-300 hover:bg-mountain-cream hover:text-mist-black"
          style={{
            fontSize: 12,
            letterSpacing: '0.1em',
            fontWeight: 500,
            padding: '8px 24px',
          }}
          data-cursor="hover"
        >
          Hire me
        </a>
      </nav>

      {/* Social Icons - Right Edge */}
      <div className="absolute right-4 top-1/2 -translate-y-1/2 z-10 flex flex-col items-center gap-4">
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

      {/* Polaroid Strip */}
      <div
        ref={polaroidRef}
        className="absolute z-[5] flex flex-col items-start will-change-transform"
        style={{
          top: '31%',
          left: '2.5%',
          gap: 12,
        }}
      >
        {projectPreviews.map((item, i) => (
          <ProjectPreviewCard key={i} caption={item.caption} accent={item.accent} image={item.image} index={i} />
        ))}
      </div>

      {/* Scroll Indicator */}
      <div
        ref={scrollIndicatorRef}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center"
      >
        <div className="relative w-px h-10 bg-kimono-white/30">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-kimono-white animate-scroll-dot" />
        </div>
      </div>
    </section>
  );
}

function LaptopScene() {
  const [activeFileName, setActiveFileName] = useState('bca_degree.json');
  const activeFile = flatEditorFiles.find((file) => file.name === activeFileName) ?? flatEditorFiles[0];
  const openTabs = flatEditorFiles.filter((file) => ['bca_degree.json', 'portfolio_app.tsx'].includes(file.name) || file.name === activeFileName);

  return (
    <div className="absolute inset-0">
      <div
        className="absolute left-1/2 top-[32%] -translate-x-1/2 overflow-hidden rounded-xl"
        style={{
          width: 'clamp(560px, 64vw, 980px)',
          height: 'clamp(300px, 36vw, 520px)',
          background: 'linear-gradient(135deg, rgba(18,18,22,0.98), rgba(7,7,10,0.98))',
          border: '1px solid rgba(255,255,255,0.16)',
          boxShadow: '0 38px 100px rgba(0,0,0,0.62), 0 0 70px rgba(212,248,122,0.08)',
        }}
      >
        <div className="absolute left-0 right-0 top-0 flex h-12 items-center gap-2 border-b border-kimono-white/10 px-5">
          <span className="h-2.5 w-2.5 rounded-full bg-[#FF6B6B]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#FFD166]" />
          <span className="h-2.5 w-2.5 rounded-full bg-lime-accent" />
          <div className="ml-6 flex items-center gap-2 font-mono text-[11px] text-kimono-white/45">
            <span className="text-lime-accent">›</span>
            <span>sourav ~/portfolio</span>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 top-12 w-[27%] border-r border-kimono-white/10 bg-black/20 px-6 py-6">
          {editorFiles.map((section) => (
            <div key={section.group} className="mb-5">
              <p className="mb-3 font-sans text-[11px] font-semibold uppercase tracking-[0.18em] text-kimono-white/75">
                {section.group}
              </p>
              <div className="space-y-2">
                {section.items.map((file) => (
                  <button
                    key={file.name}
                    type="button"
                    className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-left font-mono text-[11px] transition-colors duration-200 hover:bg-kimono-white/[0.07]"
                    style={{
                      background: activeFile.name === file.name ? 'rgba(212,248,122,0.08)' : 'transparent',
                      color: activeFile.name === file.name ? '#FAFAFA' : 'rgba(250,250,250,0.48)',
                    }}
                    onClick={() => setActiveFileName(file.name)}
                    data-cursor="hover"
                  >
                    <span style={{ color: file.icon === '{}' ? '#D4F87A' : '#9CD9FF' }}>
                      {file.icon}
                    </span>
                    <span className="truncate">{file.name}</span>
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="absolute bottom-0 right-0 top-12 w-[73%]">
          <div className="flex h-12 items-end border-b border-kimono-white/10 bg-black/10">
            {openTabs.slice(0, 3).map((file) => (
              <button
                key={file.name}
                type="button"
                className="flex h-full min-w-0 max-w-[34%] items-center gap-2 border-r border-kimono-white/10 px-5 text-left font-mono text-[12px]"
                style={{
                  borderTop: activeFile.name === file.name ? '2px solid #D4F87A' : '2px solid transparent',
                  color: activeFile.name === file.name ? 'rgba(250,250,250,0.78)' : 'rgba(250,250,250,0.34)',
                }}
                onClick={() => setActiveFileName(file.name)}
                data-cursor="hover"
              >
                <span className="text-lime-accent">{file.icon}</span>
                <span className="truncate">{file.name}</span>
                {activeFile.name === file.name && <span className="ml-auto h-1.5 w-1.5 rounded-full bg-kimono-white/35" />}
              </button>
            ))}
          </div>

          <div className="relative h-[calc(100%-3rem)] overflow-hidden p-8 font-mono">
            <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#07070A] to-transparent" />
            {activeFile.lines.map((line, index) => (
              <div key={`${line.text}-${index}`} className="flex min-w-0 items-center gap-6 text-[13px] leading-7">
                <span className="w-6 shrink-0 select-none text-right text-kimono-white/18">{index + 1}</span>
                <span style={{ color: line.color }}>{line.text}</span>
              </div>
            ))}
            <div className="mt-7 h-px w-full bg-kimono-white/10" />
            <div className="mt-5 space-y-2 text-[12px] text-kimono-white/32">
              <p>// status: available for internship</p>
              <p>// memory usage: ambition high</p>
              <p>// build mode: cinematic frontend</p>
            </div>
          </div>
        </div>
      </div>

      <div
        className="absolute left-1/2 top-[74%] -translate-x-1/2 rounded-[50%]"
        style={{
          width: 'clamp(420px, 58vw, 940px)',
          height: 46,
          background: 'radial-gradient(ellipse at center, rgba(0,0,0,0.76), transparent 68%)',
        }}
      />
    </div>
  );
}

function DeveloperFigure() {
  return (
    <div className="relative h-full w-full" aria-label="Developer silhouette">
      <div className="absolute left-1/2 top-[20%] z-0 h-[58%] w-[78%] -translate-x-1/2 rounded-full border border-lime-accent/10" />
      <div className="absolute left-1/2 top-[29%] z-0 h-[42%] w-[62%] -translate-x-1/2 rounded-full border border-kimono-white/[0.07]" />
      <div className="absolute bottom-[70%] left-1/2 h-20 w-20 -translate-x-1/2 rounded-full bg-[#151515] shadow-[0_0_40px_rgba(212,248,122,0.12)]" />
      <div
        className="absolute bottom-[31%] left-1/2 h-[42%] w-[58%] -translate-x-1/2 rounded-t-[90px]"
        style={{
          background: 'linear-gradient(180deg, #1D1D1D 0%, #080808 100%)',
          border: '1px solid rgba(255,255,255,0.08)',
          boxShadow: 'inset 0 0 32px rgba(255,255,255,0.05), 0 28px 70px rgba(0,0,0,0.48)',
        }}
      />
      <div className="absolute bottom-[32%] left-[18%] h-[36%] w-12 -rotate-12 rounded-full bg-[#101010]" />
      <div className="absolute bottom-[32%] right-[18%] h-[36%] w-12 rotate-12 rounded-full bg-[#101010]" />
      <div
        className="absolute left-1/2 top-[43%] z-20 flex -translate-x-1/2 items-center gap-2 rounded-full border border-lime-accent/30 bg-black/55 px-4 py-2 font-mono text-[11px] uppercase tracking-[0.16em] text-lime-accent backdrop-blur-md"
        style={{
          boxShadow: '0 0 26px rgba(212,248,122,0.22)',
          animation: 'loading-pulse 1.8s ease-in-out infinite',
        }}
      >
        <span>Something Loading</span>
        <span className="inline-flex gap-1">
          <span className="h-1 w-1 rounded-full bg-lime-accent" style={{ animation: 'loading-dot 1s ease-in-out infinite' }} />
          <span className="h-1 w-1 rounded-full bg-lime-accent" style={{ animation: 'loading-dot 1s ease-in-out 0.15s infinite' }} />
          <span className="h-1 w-1 rounded-full bg-lime-accent" style={{ animation: 'loading-dot 1s ease-in-out 0.3s infinite' }} />
        </span>
      </div>
      <div
        className="absolute bottom-0 left-1/2 h-[34%] w-[82%] -translate-x-1/2"
        style={{
          background: 'linear-gradient(180deg, rgba(212,248,122,0.16), transparent 72%)',
          clipPath: 'polygon(22% 0, 78% 0, 100% 100%, 0 100%)',
        }}
      />
      <div className="absolute bottom-[55%] left-1/2 h-px w-[52%] -translate-x-1/2 bg-lime-accent/50" />
    </div>
  );
}

function ProjectPreviewCard({
  caption,
  accent,
  image,
  index,
}: {
  caption: string;
  accent: string;
  image: string;
  index: number;
}) {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseEnter = () => {
    const card = cardRef.current;
    if (card) {
      card.style.transform = 'translateX(8px) scale(1.04)';
      card.style.boxShadow = '0 20px 40px rgba(255,184,197,0.2)';
    }
  };

  const handleMouseLeave = () => {
    const card = cardRef.current;
    if (card) {
      card.style.transform = 'translateY(0)';
      card.style.boxShadow = 'none';
    }
  };

  return (
    <div
      ref={cardRef}
      className="transition-all duration-300"
      style={{
        width: 96,
        height: 96,
        background: 'rgba(255,255,255,0.045)',
        border: '1px solid rgba(255,255,255,0.15)',
        borderRadius: 12,
        padding: 6,
        transitionDuration: '0.4s',
        transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
        willChange: 'transform, opacity',
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      data-cursor="hover"
      aria-label={caption}
    >
      <div
        className="relative h-full w-full overflow-hidden rounded-lg"
        style={{
          background: `linear-gradient(135deg, ${accent}55, rgba(255,255,255,0.06)), #111`,
          animation: `photo-card-float-side 2.8s ease-in-out ${index * 0.18}s infinite`,
          transformOrigin: 'center',
          willChange: 'transform',
        }}
      >
        <img
          src={image}
          alt=""
          className="h-full w-full object-cover"
          style={{
            filter: 'contrast(1.05) saturate(0.85) brightness(0.82)',
            objectPosition: '50% 18%',
            transform: 'scale(1.12)',
          }}
          aria-hidden="true"
        />
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(135deg, ${accent}22, rgba(0,0,0,0.12))`,
          }}
        />
      </div>
    </div>
  );
}
