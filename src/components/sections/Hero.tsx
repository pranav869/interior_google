import { useRef } from 'react';
import type { MouseEvent } from 'react';
import { motion, useMotionValue, useTransform, useSpring } from 'motion/react';
import { ArrowRight } from 'lucide-react';

const heroStats = [
  { value: '300+', label: 'Projects Completed' },
  { value: '15+', label: 'Years of Excellence' },
  { value: '98%', label: 'Client Satisfaction' },
  { value: '20', label: 'Countries Served' },
];

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const smoothX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const smoothY = useSpring(mouseY, { stiffness: 50, damping: 20 });

  const bgX = useTransform(smoothX, [-1, 1], ['-2%', '2%']);
  const bgY = useTransform(smoothY, [-1, 1], ['-2%', '2%']);

  const handleMouseMove = (e: MouseEvent<HTMLElement>) => {
    const rect = sectionRef.current?.getBoundingClientRect();
    if (!rect) return;
    mouseX.set(((e.clientX - rect.left) / rect.width - 0.5) * 2);
    mouseY.set(((e.clientY - rect.top) / rect.height - 0.5) * 2);
  };

  return (
    <section
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      className="relative h-screen w-full flex flex-col overflow-hidden"
    >
      {/* Parallax Background */}
      <motion.div
        className="absolute inset-[-4%] z-0"
        style={{ x: bgX, y: bgY }}
      >
        <motion.div
          initial={{ scale: 1.15 }}
          animate={{ scale: 1.04 }}
          transition={{ duration: 2.5, ease: "easeOut" }}
          className="w-full h-full"
        >
          <img
            src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&q=80&w=2560"
            alt="Luxury Interior"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/75" />
        </motion.div>
      </motion.div>

      {/* Centered content — flex-1 absorbs available space, centers children */}
      <div className="flex-1 flex flex-col items-center justify-center relative z-10 px-6 pt-20">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-white/45 text-[10px] tracking-[0.45em] uppercase mb-7 font-light"
        >
          Est. 2009 &nbsp;·&nbsp; London, UK
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 36 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-white leading-[1.15] text-center mb-8 md:mb-10 max-w-3xl px-2"
        >
          Designing Timeless Spaces
          <br />
          <span className="italic text-gold-400">That Define You</span>
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 1.1 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-3"
        >
          <a
            href="#contact"
            className="inline-flex items-center gap-3 bg-gold-500 text-white px-8 py-3.5 uppercase tracking-widest text-xs hover:bg-white hover:text-sand-900 transition-all duration-300 group"
          >
            <span>Book a Consultation</span>
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </a>
          <a
            href="#portfolio"
            className="inline-flex items-center gap-3 border border-white/40 text-white/90 px-8 py-3.5 uppercase tracking-widest text-xs hover:border-white hover:text-white transition-all duration-300"
          >
            <span>View Portfolio</span>
          </a>
        </motion.div>
      </div>

      {/* Stats Bar — always anchored at bottom */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 1.3 }}
        className="relative z-10 w-full flex-shrink-0"
      >
        <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-white/10 border-t border-white/10 bg-black/40 backdrop-blur-md">
          {heroStats.map((stat, i) => (
            <div key={i} className="text-center py-4 px-2 sm:px-4">
              <div className="font-serif text-xl sm:text-2xl md:text-3xl text-gold-400 mb-1">{stat.value}</div>
              <div className="text-[9px] sm:text-[10px] uppercase tracking-widest text-white/55 leading-tight">{stat.label}</div>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
