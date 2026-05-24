import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const favoriteAudioRef = useRef<HTMLAudioElement>(null);
  const animeAudioRef = useRef<HTMLAudioElement>(null);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    comment: '',
  });

  const stats = [
    { value: '10+', label: 'Projects' },
    { value: '4', label: 'AI Builds' },
    { value: '7.4', label: 'CGPA' },
  ];

  useEffect(() => {
    const section = sectionRef.current;
    const form = formRef.current;

    if (!section || !form) return;

    const ctx = gsap.context(() => {
      // Form panel entrance
      gsap.fromTo(form, { opacity: 0, x: -40 }, {
        opacity: 1, x: 0, duration: 0.8, ease: 'power2.out',
        scrollTrigger: { trigger: section, start: 'top 70%', toggleActions: 'play none none none' },
      });

      // Form fields stagger
      const fields = form.querySelectorAll('.form-field');
      gsap.fromTo(fields, { opacity: 0, y: 20 }, {
        opacity: 1, y: 0, duration: 0.5, stagger: 0.1, ease: 'power2.out',
        scrollTrigger: { trigger: section, start: 'top 65%', toggleActions: 'play none none none' },
      });

      const extras = section.querySelectorAll('.contact-extra');
      gsap.fromTo(extras, { opacity: 0, y: 28 }, {
        opacity: 1, y: 0, duration: 0.7, stagger: 0.12, ease: 'power2.out',
        scrollTrigger: { trigger: section, start: 'top 62%', toggleActions: 'play none none none' },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Thanks! I will get back to you soon.');
    setFormData({ name: '', email: '', comment: '' });
  };

  const playAudio = (audio: HTMLAudioElement | null) => {
    if (!audio) return;

    audio.currentTime = 0;
    void audio.play().catch(() => undefined);
  };

  const stopAudio = (audio: HTMLAudioElement | null) => {
    if (!audio) return;

    audio.pause();
    audio.currentTime = 0;
  };

  const [coverImage, setCoverImage] = useState<string>('/images/boyfriend-cover.jpg');
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const coverObjectUrlRef = useRef<string | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;

    // revoke previous object URL
    if (coverObjectUrlRef.current) {
      URL.revokeObjectURL(coverObjectUrlRef.current);
      coverObjectUrlRef.current = null;
    }

    const url = URL.createObjectURL(file);
    coverObjectUrlRef.current = url;
    setCoverImage(url);
  };

  // cleanup object URL on unmount
  useEffect(() => {
    return () => {
      if (coverObjectUrlRef.current) URL.revokeObjectURL(coverObjectUrlRef.current);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="contacts"
      className="relative w-full overflow-hidden"
      style={{ minHeight: '100vh' }}
    >
      {/* Background */}
      <div className="absolute inset-0 z-[1] bg-mist-black">
        <div
          className="absolute inset-0 opacity-45"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.045) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.045) 1px, transparent 1px)',
            backgroundSize: '72px 72px',
          }}
        />
        <div className="absolute left-[5%] top-[18%] h-[36%] w-[32%] rounded-full bg-lime-accent/10 blur-[100px]" />
        <div className="absolute right-[12%] bottom-[12%] h-[34%] w-[30%] rounded-full bg-[#6AA8FF]/10 blur-[110px]" />
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(90deg, rgba(5,5,5,0.92) 0%, rgba(5,5,5,0.64) 42%, rgba(5,5,5,0.88) 100%)',
          }}
        />
        <div className="absolute left-[8%] right-[8%] top-[18%] h-px bg-kimono-white/10" />
        <div
          className="absolute inset-x-0 bottom-0 h-40"
          style={{ background: 'linear-gradient(180deg, transparent, #050505)' }}
        />
      </div>

      <audio ref={favoriteAudioRef} src="/audio/favorite-song.mp3" preload="none" />
      <audio ref={animeAudioRef} src="/audio/jjk-hover.mp3" preload="none" />

      {/* Contact Content */}
      <div
        className="relative z-[2] mx-auto flex w-full max-w-[1680px] flex-col items-center gap-8 px-6 lg:flex-row lg:justify-between lg:px-[8%]"
        style={{ minHeight: '100vh', paddingTop: 'clamp(80px, 10vh, 140px)', paddingBottom: 'clamp(80px, 10vh, 140px)' }}
      >
        <div
          ref={formRef}
          className="rounded-2xl"
          style={{
            maxWidth: 440,
            width: '100%',
            background: 'rgba(20,20,20,0.5)',
            backdropFilter: 'blur(24px)',
            WebkitBackdropFilter: 'blur(24px)',
            border: '1px solid rgba(255,255,255,0.15)',
            padding: 48,
          }}
        >
          <h2
            className="font-serif text-kimono-white"
            style={{ fontSize: 24, lineHeight: 1.4, fontWeight: 400 }}
          >
            Have an idea that needs a polished web experience?
          </h2>

          <p
            className="font-sans uppercase text-lime-accent mt-6"
            style={{ fontSize: 12, letterSpacing: '0.15em', fontWeight: 500 }}
          >
            Send a project brief
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col gap-6 mt-8">
            <div className="form-field">
              <input
                type="text"
                placeholder="Your name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full bg-transparent border-0 border-b font-sans text-kimono-white placeholder:text-mouse-gray py-3 px-0 outline-none transition-all duration-300 focus:border-lime-accent"
                style={{
                  fontSize: 14,
                  borderBottomWidth: 1,
                  borderBottomColor: 'rgba(255,255,255,0.1)',
                }}
                onFocus={(e) => {
                  e.target.style.borderBottomColor = '#D4F87A';
                  e.target.style.boxShadow = '0 2px 8px rgba(212,248,122,0.1)';
                }}
                onBlur={(e) => {
                  e.target.style.borderBottomColor = 'rgba(255,255,255,0.1)';
                  e.target.style.boxShadow = 'none';
                }}
                required
              />
            </div>

            <div className="form-field">
              <input
                type="email"
                placeholder="Email address"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full bg-transparent border-0 border-b font-sans text-kimono-white placeholder:text-mouse-gray py-3 px-0 outline-none transition-all duration-300"
                style={{
                  fontSize: 14,
                  borderBottomWidth: 1,
                  borderBottomColor: 'rgba(255,255,255,0.1)',
                }}
                onFocus={(e) => {
                  e.target.style.borderBottomColor = '#D4F87A';
                  e.target.style.boxShadow = '0 2px 8px rgba(212,248,122,0.1)';
                }}
                onBlur={(e) => {
                  e.target.style.borderBottomColor = 'rgba(255,255,255,0.1)';
                  e.target.style.boxShadow = 'none';
                }}
                required
              />
            </div>

            <div className="form-field">
              <textarea
                placeholder="Tell me about the project"
                value={formData.comment}
                onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
                rows={3}
                className="w-full bg-transparent border-0 border-b font-sans text-kimono-white placeholder:text-mouse-gray py-3 px-0 outline-none transition-all duration-300 resize-none"
                style={{
                  fontSize: 14,
                  borderBottomWidth: 1,
                  borderBottomColor: 'rgba(255,255,255,0.1)',
                }}
                onFocus={(e) => {
                  e.target.style.borderBottomColor = '#D4F87A';
                  e.target.style.boxShadow = '0 2px 8px rgba(212,248,122,0.1)';
                }}
                onBlur={(e) => {
                  e.target.style.borderBottomColor = 'rgba(255,255,255,0.1)';
                  e.target.style.boxShadow = 'none';
                }}
              />
            </div>

            <button
              type="submit"
              className="w-full font-sans uppercase rounded-full transition-all duration-300 hover:bg-lime-accent mt-4"
              style={{
                background: '#FAFAFA',
                color: '#0A0A0A',
                fontSize: 14,
                letterSpacing: '0.08em',
                fontWeight: 500,
                padding: 16,
                transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
              }}
              data-cursor="hover"
            >
              Send brief
            </button>
          </form>
        </div>

        <div className="grid w-full max-w-[900px] grid-cols-1 gap-4 lg:grid-cols-[0.9fr_1.35fr_0.82fr]">
          <button
            type="button"
            className="contact-extra group relative h-[480px] overflow-hidden rounded-2xl border border-kimono-white/15 bg-kimono-white/[0.035] p-6 text-left transition duration-500 hover:-translate-y-4 hover:scale-[1.02] hover:border-lime-accent/40 hover:shadow-[0_24px_70px_rgba(212,248,122,0.11)]"
            onMouseEnter={() => playAudio(favoriteAudioRef.current)}
            onMouseLeave={() => stopAudio(favoriteAudioRef.current)}
          >
            <p className="font-sans text-[12px] uppercase tracking-[0.18em] text-lime-accent">Recent Favorite</p>
            <h3 className="mt-5 font-serif text-[25px] leading-tight text-kimono-white">
              Song for late night builds.
            </h3>
            <p className="mt-4 max-w-[220px] font-sans text-[13px] leading-5 text-mouse-gray">
              Hover to preview the track.
            </p>

            <div className="absolute bottom-[-68px] left-1/2 h-56 w-56 -translate-x-1/2 rounded-full border border-kimono-white/10 bg-[#191919] shadow-[inset_0_0_0_18px_rgba(255,255,255,0.025)] transition duration-500 group-hover:bottom-[-44px] group-hover:rotate-6">
              <div className="absolute inset-7 rounded-full border border-kimono-white/10" />
              <div className="absolute inset-14 rounded-full border border-kimono-white/10" />
              <div className="absolute left-1/2 top-1/2 h-20 w-20 -translate-x-1/2 -translate-y-1/2 rounded-full bg-lime-accent/20" />
            </div>

            <div
              className="absolute bottom-7 left-7 right-7 h-36 overflow-hidden rounded-xl border border-kimono-white/10 bg-black/55 backdrop-blur-md transition duration-500 group-hover:-translate-y-3"
              style={{
                backgroundImage: `url("${coverImage}")`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-black/10" />

              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageChange}
              />
            </div>
          </button>

          <div className="contact-extra relative h-[480px] overflow-hidden rounded-2xl border border-kimono-white/15 bg-[#0D0F0C]/80 p-6 backdrop-blur-xl">
            <div
              className="absolute inset-0 rounded-2xl opacity-30"
              style={{
                backgroundImage: 'radial-gradient(rgba(212,248,122,0.18) 1px, transparent 1px)',
                backgroundSize: '18px 18px',
              }}
            />
            <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-lime-accent/10 blur-3xl" />
            <div className="absolute -bottom-20 left-10 h-52 w-52 rounded-full bg-[#6AA8FF]/10 blur-3xl" />

            <div className="relative">
              <div className="flex items-center justify-between gap-4">
                <p className="font-sans text-[12px] uppercase tracking-[0.18em] text-lime-accent">Build Board</p>
                <span className="rounded-full border border-lime-accent/25 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.16em] text-lime-accent/80">
                  Open to intern
                </span>
              </div>
              <h3 className="mt-4 font-display text-[33px] leading-none tracking-normal text-outline">
                BUILD SIGNALS
              </h3>
              <p className="mt-3 max-w-[400px] font-sans text-[12px] leading-5 text-mouse-gray">
                Frontend taste, AI project thinking, and a shipping mindset.
              </p>

              <div className="mt-5 grid grid-cols-3 gap-2.5">
                {stats.map((stat) => (
                  <div
                    key={stat.label}
                    className="rounded-xl border border-kimono-white/10 bg-black/40 p-3 transition duration-300 hover:-translate-y-1 hover:border-lime-accent/35"
                  >
                    <p className="font-sans text-[26px] font-semibold leading-none text-kimono-white">{stat.value}</p>
                    <p className="mt-2 font-sans text-[10px] uppercase tracking-[0.1em] text-kimono-white/65">{stat.label}</p>
                  </div>
                ))}
              </div>

              <div className="mt-5 rounded-xl border border-lime-accent/20 bg-lime-accent/[0.06] p-4">
                <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-lime-accent">Current Focus</p>
                <p className="mt-3 font-serif text-[18px] leading-snug text-kimono-white">
                  Polished React interfaces with AI features, clean UX, and controlled motion.
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {['React', 'Tailwind', 'GSAP', 'AI UX'].map((item) => (
                    <span
                      key={item}
                      className="rounded-full border border-kimono-white/10 px-2.5 py-1 font-sans text-[9px] uppercase tracking-[0.12em] text-kimono-white/60"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <button
            type="button"
            className="contact-extra group relative h-[480px] overflow-hidden rounded-2xl border border-kimono-white/15 bg-kimono-white/[0.035] p-7 text-left transition duration-500 hover:-translate-y-4 hover:scale-[1.02] hover:border-lime-accent/40 hover:shadow-[0_24px_70px_rgba(212,248,122,0.11)]"
            onMouseEnter={() => playAudio(animeAudioRef.current)}
            onMouseLeave={() => stopAudio(animeAudioRef.current)}
          >
            <p className="font-sans text-[12px] uppercase tracking-[0.18em] text-lime-accent">Currently Watching</p>
            <div
              className="absolute inset-x-7 bottom-7 top-24 overflow-hidden rounded-xl border border-kimono-white/10 bg-[#111]"
              style={{
                backgroundImage:
                  'linear-gradient(180deg, rgba(0,0,0,0.05), rgba(0,0,0,0.45)), url("/images/jjk-poster.jpg")',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4">
                <p className="font-display text-[34px] leading-none text-kimono-white drop-shadow-lg">
                  JUJUTSU
                </p>
                <p className="font-sans text-[11px] uppercase tracking-[0.16em] text-lime-accent">
                  hover sound cue
                </p>
              </div>
            </div>
          </button>
        </div>
      </div>
    </section>
  );
}
