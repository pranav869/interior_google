import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';

const testimonials = [
  {
    name: 'Sarah & James Carrington',
    role: 'Private Residence, London',
    initials: 'SC',
    quote: '"Lumina did not just design a house; they crafted a home that feels intimately ours. Their attention to detail and insistence on quality materials transformed our space into a sanctuary of calm and elegance."'
  },
  {
    name: 'David Chen',
    role: 'CEO, Horizon Tech',
    initials: 'DC',
    quote: '"The office environment Lumina created for us elevated our entire company culture. It balances sophisticated executive areas with warm, collaborative spaces perfectly. Worth every penny of the investment."'
  },
  {
    name: 'Isabella Rossi',
    role: 'Boutique Hotel Owner',
    initials: 'IR',
    quote: '"Their team possesses a rare understanding of lighting, flow, and texture. The renovation was handled with utmost professionalism, and the final result exceeded our highest expectations."'
  },
  {
    name: 'Marcus & Leila Fontaine',
    role: 'Private Villa, Monaco',
    initials: 'MF',
    quote: '"Engaging Lumina was the single best decision we made for our Monaco villa. Their ability to blend local Mediterranean character with refined contemporary aesthetics is unmatched globally."'
  },
  {
    name: 'Priya Mehta',
    role: 'Founder, Aurum Wellness',
    initials: 'PM',
    quote: '"Our wellness centre needed to exude calm the moment clients walked in. Lumina delivered that and more — a space so thoughtfully designed, it heals before any treatment even begins."'
  }
];

export function Testimonials() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);

  const next = useCallback(() => {
    setDirection(1);
    setCurrent(prev => (prev + 1) % testimonials.length);
  }, []);

  const prev = () => {
    setDirection(-1);
    setCurrent(prev => (prev - 1 + testimonials.length) % testimonials.length);
  };

  useEffect(() => {
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [next]);

  const item = testimonials[current];

  return (
    <section className="py-24 md:py-32 bg-sand-100 dark:bg-dark-900 overflow-hidden">
      <div className="max-w-5xl mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-gold-500 text-sm tracking-[0.2em] uppercase mb-4 block">Client Voices</span>
          <h2 className="font-serif text-4xl md:text-5xl text-sand-900 dark:text-sand-50">Endorsements</h2>
        </motion.div>

        {/* Card */}
        <div className="relative md:mx-16">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={current}
              custom={direction}
              initial={{ opacity: 0, x: direction * 60 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: direction * -60 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="bg-white dark:bg-dark-800 p-6 sm:p-10 md:p-14 shadow-sm"
            >
              <div className="flex space-x-1 mb-6 md:mb-8 text-gold-500 justify-center">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={16} fill="currentColor" stroke="none" />
                ))}
              </div>
              <p className="text-sand-600 dark:text-sand-300 font-light italic leading-relaxed text-base md:text-xl text-center mb-8 md:mb-10 max-w-3xl mx-auto">
                {item.quote}
              </p>
              <div className="flex items-center justify-center gap-4 border-t border-sand-200 dark:border-dark-700 pt-6 md:pt-8">
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-gold-500/20 flex items-center justify-center shrink-0">
                  <span className="font-serif text-gold-500 text-sm font-medium">{item.initials}</span>
                </div>
                <div>
                  <div className="font-serif text-base md:text-lg text-sand-900 dark:text-sand-50">{item.name}</div>
                  <div className="text-xs tracking-widest uppercase text-sand-500 mt-1">{item.role}</div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Desktop side arrows */}
          <button
            onClick={prev}
            className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 -translate-x-12 w-10 h-10 border border-sand-300 dark:border-dark-700 items-center justify-center text-sand-600 dark:text-sand-400 hover:border-gold-500 hover:text-gold-500 transition-colors bg-white dark:bg-dark-800"
            aria-label="Previous"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            onClick={next}
            className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 translate-x-12 w-10 h-10 border border-sand-300 dark:border-dark-700 items-center justify-center text-sand-600 dark:text-sand-400 hover:border-gold-500 hover:text-gold-500 transition-colors bg-white dark:bg-dark-800"
            aria-label="Next"
          >
            <ChevronRight size={18} />
          </button>
        </div>

        {/* Dots + mobile arrows row */}
        <div className="flex items-center justify-center gap-4 mt-6">
          <button onClick={prev} className="md:hidden w-9 h-9 border border-sand-300 dark:border-dark-700 flex items-center justify-center text-sand-600 dark:text-sand-400 hover:border-gold-500 hover:text-gold-500 transition-colors" aria-label="Previous">
            <ChevronLeft size={16} />
          </button>
          <div className="flex gap-2">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => { setDirection(i > current ? 1 : -1); setCurrent(i); }}
                className={`transition-all duration-300 rounded-full ${
                  i === current ? 'w-6 h-1.5 bg-gold-500' : 'w-1.5 h-1.5 bg-sand-300 dark:bg-dark-700 hover:bg-gold-500/50'
                }`}
                aria-label={`Go to testimonial ${i + 1}`}
              />
            ))}
          </div>
          <button onClick={next} className="md:hidden w-9 h-9 border border-sand-300 dark:border-dark-700 flex items-center justify-center text-sand-600 dark:text-sand-400 hover:border-gold-500 hover:text-gold-500 transition-colors" aria-label="Next">
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </section>
  );
}
