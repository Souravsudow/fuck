import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const timelineData = [
  {
    period: 'May 2025 - Nov 2025',
    role: 'Operations Intern - IT Services',
    company: 'TKV Solutions / Gurugram',
    summary: 'Supported daily IT operations, task coordination, project management, and resource planning to improve team workflow efficiency.',
    photos: ['/images/timeline-osaka-1.jpg', '/images/timeline-osaka-2.jpg'],
    rotations: [{ top: -2, bottom: 3 }],
  },
  {
    period: 'Jan 2025 - May 2025',
    role: 'Marketing Intern',
    company: 'Airmaxon Marketing / Remote',
    summary: 'Led digital promotion for the Millionaire Mind Game app and executed data-driven campaigns focused on audience analysis and lead generation.',
    photos: ['/images/timeline-kyoto-1.jpg', '/images/timeline-kyoto-2.jpg'],
    rotations: [{ top: 2, bottom: -3 }],
  },
  {
    period: 'June 2024 - August 2024',
    role: 'Cyber Security Intern',
    company: 'Placify / Gurugram',
    summary: 'Identified and mitigated 20+ vulnerabilities, monitored network traffic and logs, and helped improve data protection through access control practices.',
    photos: ['/images/timeline-tokyo-1.jpg', '/images/timeline-tokyo-2.jpg'],
    rotations: [{ top: -3, bottom: 2 }],
  },
];

export default function About() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const heading = headingRef.current;
    const text = textRef.current;
    const timeline = timelineRef.current;
    const line = lineRef.current;

    if (!section || !heading || !text || !timeline || !line) return;

    const ctx = gsap.context(() => {
      const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      if (reduceMotion) {
        gsap.set([heading, text.querySelectorAll('.about-text'), timeline.querySelectorAll('.timeline-node')], { opacity: 1, y: 0 });
        gsap.set(line, { scaleY: 1 });
        return;
      }

      // Heading animation
      gsap.fromTo(heading, { opacity: 0, y: 30 }, {
        opacity: 1, y: 0, duration: 0.8, ease: 'power2.out',
        scrollTrigger: { trigger: heading, start: 'top 80%', toggleActions: 'play none none none' },
      });

      // Text paragraphs with highlighted phrases
      const paragraphs = text.querySelectorAll('.about-text');
      paragraphs.forEach((p) => {
        gsap.fromTo(p, { opacity: 0, y: 20 }, {
          opacity: 1, y: 0, duration: 0.6, ease: 'power2.out',
          scrollTrigger: { trigger: p, start: 'top 85%', toggleActions: 'play none none none' },
        });

        const highlight = p.querySelector('.highlight');
        if (highlight) {
          gsap.fromTo(highlight, { opacity: 0, textShadow: '0 0 20px rgba(212,248,122,0.3)' }, {
            opacity: 1, textShadow: '0 0 0px rgba(212,248,122,0)', duration: 0.8, ease: 'power2.out',
            scrollTrigger: { trigger: p, start: 'top 80%', toggleActions: 'play none none none' },
          });
        }
      });

      // Timeline line draw
      gsap.fromTo(line, { scaleY: 0 }, {
        scaleY: 1, duration: 0.8, ease: 'power2.inOut', transformOrigin: 'top',
        scrollTrigger: { trigger: timeline, start: 'top 70%', toggleActions: 'play none none none' },
      });

      // Timeline nodes stagger
      const nodes = timeline.querySelectorAll('.timeline-node');
      nodes.forEach((node, i) => {
        gsap.fromTo(node, { opacity: 0, y: 40 }, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          delay: i * 0.2,
          scrollTrigger: {
            trigger: node,
            start: 'top 70%',
            once: true,
          },
        });
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative w-full bg-mist-black"
      style={{ padding: 'clamp(80px, 10vh, 140px) 0' }}
    >
      <div className="mx-auto" style={{ maxWidth: 1200, padding: '0 24px' }}>
        {/* Section Heading */}
        <div ref={headingRef} className="flex items-center justify-center gap-4 mb-20">
          <div className="flex-1 h-px bg-glass-border" />
          <div className="flex items-center gap-3">
            <div className="w-1 h-1 rounded-full bg-lime-accent" />
            <h2
              className="font-display uppercase text-kimono-white text-center"
              style={{
                fontSize: 'clamp(48px, 6vw, 80px)',
                letterSpacing: '0.08em',
                lineHeight: 1,
              }}
            >
              EXPERIENCE
            </h2>
            <div className="w-1 h-1 rounded-full bg-lime-accent" />
          </div>
          <div className="flex-1 h-px bg-glass-border" />
        </div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          {/* Left Column - Text */}
          <div ref={textRef} className="flex flex-col justify-center gap-8">
            <p
              className="about-text font-serif text-kimono-white"
              style={{ fontSize: 'clamp(16px, 1.2vw, 20px)', lineHeight: 1.7 }}
            >
              I have built hands-on experience across IT operations, digital marketing, and cyber security internships. That mix helps me understand products from multiple angles: systems, users, campaigns, and the details that make work feel{' '}
              <span className="highlight text-lime-accent">organized, measurable, and reliable</span>.
            </p>
            <p
              className="about-text font-serif text-kimono-white"
              style={{ fontSize: 'clamp(16px, 1.2vw, 20px)', lineHeight: 1.7 }}
            >
              Now I am connecting that experience with frontend development: building clean React interfaces, polished portfolio sections, and motion-led web experiences that show both technical skill and{' '}
              <span className="highlight text-lime-accent">real-world problem solving</span>.
            </p>
          </div>

          {/* Right Column - Timeline */}
          <div ref={timelineRef} className="relative pl-8">
            {/* Vertical Line */}
            <div
              ref={lineRef}
              className="absolute left-0 top-0 bottom-0 w-px bg-glass-border"
              style={{ transformOrigin: 'top' }}
            />

            {/* Timeline Nodes */}
            <div className="flex flex-col" style={{ gap: 80 }}>
              {timelineData.map((item, i) => (
                <TimelineNode
                  key={i}
                  period={item.period}
                  role={item.role}
                  company={item.company}
                  summary={item.summary}
                  photos={item.photos}
                  rotations={item.rotations[0]}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function TimelineNode({
  period,
  role,
  company,
  summary,
  photos,
  rotations,
}: {
  period: string;
  role: string;
  company: string;
  summary: string;
  photos: string[];
  rotations: { top: number; bottom: number };
}) {
  const clusterRef = useRef<HTMLDivElement>(null);

  const handleMouseEnter = () => {
    const cluster = clusterRef.current;
    if (!cluster) return;
    const imgs = cluster.querySelectorAll('img');
    if (imgs[0]) {
      imgs[0].style.transform = `rotate(${rotations.top - 4}deg) translateX(-8px)`;
    }
    if (imgs[1]) {
      imgs[1].style.transform = `rotate(${rotations.bottom + 4}deg) translateX(8px)`;
    }
  };

  const handleMouseLeave = () => {
    const cluster = clusterRef.current;
    if (!cluster) return;
    const imgs = cluster.querySelectorAll('img');
    if (imgs[0]) {
      imgs[0].style.transform = `rotate(${rotations.top}deg)`;
    }
    if (imgs[1]) {
      imgs[1].style.transform = `rotate(${rotations.bottom}deg)`;
    }
  };

  return (
    <div className="timeline-node relative flex items-start gap-6" style={{ willChange: 'transform, opacity' }}>
      {/* Dot */}
      <div
        className="absolute -left-1.5 top-1 w-2.5 h-2.5 rounded-full bg-lime-accent"
        style={{ transform: 'translateX(-50%)' }}
      />

      {/* Content */}
      <div className="ml-4">
        <div className="mb-4">
          <span className="font-sans text-mouse-gray" style={{ fontSize: 12, letterSpacing: '0.04em' }}>
            {period}
          </span>
          <h3
            className="font-sans text-kimono-white font-semibold"
            style={{ fontSize: 14, letterSpacing: '0.04em', lineHeight: 1.3 }}
          >
            {role}
          </h3>
          <p
            className="font-sans uppercase text-lime-accent mt-1"
            style={{ fontSize: 11, letterSpacing: '0.12em', fontWeight: 500 }}
          >
            {company}
          </p>
          <p
            className="font-sans text-mouse-gray mt-3"
            style={{ maxWidth: 320, fontSize: 13, lineHeight: 1.55 }}
          >
            {summary}
          </p>
        </div>

        {/* Photo Cluster */}
        <div
          ref={clusterRef}
          className="photo-cluster relative"
          style={{ width: 200, height: 140 }}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          data-cursor="hover"
        >
          {photos.map((photo, j) => (
            <img
              key={j}
              src={photo}
              alt={`${role} visual ${j + 1}`}
              className="absolute object-cover transition-transform duration-300"
              style={{
                width: 120,
                height: 80,
                borderRadius: 4,
                border: '2px solid white',
                boxShadow: '0 4px 16px rgba(0,0,0,0.3)',
                top: j === 0 ? 0 : 40,
                left: j === 0 ? 0 : 20,
                transform: `rotate(${j === 0 ? rotations.top : rotations.bottom}deg)`,
                transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
                zIndex: j,
              }}
              loading="lazy"
            />
          ))}
        </div>
      </div>
    </div>
  );
}
