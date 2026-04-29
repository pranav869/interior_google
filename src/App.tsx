/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useCallback } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowUp } from 'lucide-react';
import Lenis from 'lenis';
import { Admin } from './pages/Admin';
import { Loader } from './components/Loader';
import { CustomCursor } from './components/CustomCursor';
import { Navigation } from './components/Navigation';
import { Hero } from './components/sections/Hero';
import { About } from './components/sections/About';
import { Services } from './components/sections/Services';
import { Portfolio } from './components/sections/Portfolio';
import { Process } from './components/sections/Process';
import { Testimonials } from './components/sections/Testimonials';
import { WhyChooseUs } from './components/sections/WhyChooseUs';
import { TrustedPartners } from './components/sections/TrustedPartners';
import { ProjectVideos } from './components/sections/ProjectVideos';
import { CtaBanner } from './components/sections/CtaBanner';
import { Contact } from './components/sections/Contact';
import { Footer } from './components/Footer';

function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > window.innerHeight * 0.8);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-24 right-8 z-50 w-10 h-10 border border-sand-300 dark:border-dark-700 bg-sand-50 dark:bg-dark-900 flex items-center justify-center text-sand-600 dark:text-sand-400 hover:border-gold-500 hover:text-gold-500 transition-colors shadow-md"
          aria-label="Scroll to top"
        >
          <ArrowUp size={16} />
        </motion.button>
      )}
    </AnimatePresence>
  );
}

function useLenis() {
  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) return;
    const lenis = new Lenis({
      duration: 1.4,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 0.9,
    });

    let rafId: number;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);
}

function MainSite() {
  useLenis();
  return (
    <>
      <Loader />
      <CustomCursor />
      <Navigation />

      <main className="relative z-0">
        <Hero />
        <About />
        <Services />
        <Portfolio />
        <Process />
        <Testimonials />
        <ProjectVideos />
        <WhyChooseUs />
        <TrustedPartners />
        <CtaBanner />
        <Contact />
      </main>

      <Footer />
      <ScrollToTop />
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/admin" element={<Admin />} />
        <Route path="*" element={<MainSite />} />
      </Routes>
    </BrowserRouter>
  );
}
