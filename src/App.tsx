import { useState, useEffect } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import Loader from './components/Loader';
import CustomCursor from './components/CustomCursor';
import ScrollProgress from './components/ScrollProgress';
import NoiseOverlay from './components/NoiseOverlay';
import Hero from './sections/Hero';
import About from './sections/About';
import Included from './sections/Included';
import Contact from './sections/Contact';
import Footer from './sections/Footer';

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (isLoading) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const lenis = new Lenis({
      duration: prefersReducedMotion ? 0 : 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      syncTouch: true,
    });

    lenis.on('scroll', ScrollTrigger.update);

    const rafCallback = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(rafCallback);
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      gsap.ticker.remove(rafCallback);
    };
  }, [isLoading]);

  return (
    <div className="relative">
      {isLoading && <Loader />}
      {!isLoading && (
        <>
          <CustomCursor />
          <ScrollProgress />
          <NoiseOverlay />
        </>
      )}
      <Hero />
      <About />
      <Included />
      <Contact />
      <Footer />
    </div>
  );
}