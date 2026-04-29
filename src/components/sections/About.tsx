import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'motion/react';

const stats = [
  { value: 15, suffix: '+', label: 'Years of Excellence' },
  { value: 300, suffix: '+', label: 'Projects Delivered' },
  { value: 20, suffix: '', label: 'Countries Served' },
  { value: 98, suffix: '%', label: 'Client Satisfaction' },
];

function AnimatedCounter({ value, suffix }: { value: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const duration = 1600;
    const step = 16;
    const increment = value / (duration / step);
    const timer = setInterval(() => {
      start += increment;
      if (start >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, step);
    return () => clearInterval(timer);
  }, [inView, value]);

  return (
    <span ref={ref}>
      {count}{suffix}
    </span>
  );
}

export function About() {
  return (
    <section id="about" className="py-24 md:py-32 bg-sand-50 dark:bg-dark-900">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">

          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="relative"
          >
            <div className="aspect-[3/4] overflow-hidden relative group">
              <img
                src="/ceo.png"
                alt="Venkat, Principal Designer & Founder"
                className="w-full h-full object-cover object-top saturate-[0.8] group-hover:saturate-100 group-hover:scale-105 transition-all duration-1000"
              />
              {/* Warm luxury overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-sand-900/60 via-sand-800/10 to-transparent" />
              {/* Name badge */}
              <div className="absolute bottom-0 left-0 right-0 px-6 py-5">
                <p className="font-serif text-lg italic text-white">Venkat</p>
                <p className="text-[10px] uppercase tracking-[0.25em] text-white/60 mt-0.5">Principal Designer &amp; Founder</p>
              </div>
            </div>
            {/* Decorative offset block */}
            <div className="absolute -bottom-6 -right-6 w-40 h-40 bg-sand-200 dark:bg-dark-800 -z-10" />
            <div className="absolute -top-4 -left-4 w-16 h-16 border border-gold-500/30 -z-10" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            <span className="text-gold-500 text-sm tracking-[0.2em] uppercase mb-4 block">Our Philosophy</span>
            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-sand-900 dark:text-sand-50 mb-8 leading-tight">
              Curating spaces that breathe elegant simplicity.
            </h2>
            <div className="space-y-6 text-sand-700 dark:text-sand-300 font-light leading-relaxed">
              <p>
                At Lumina, we believe that luxury is not just about opulence; it is about the quiet refinement of space, light, and material. We curate environments that reflect the unique narratives of those who inhabit them.
              </p>
              <p>
                Our approach blends architectural integrity with bespoke craftsmanship. From the initial conceptual sketch to the final placement of curated artifacts, every decision is made with intentionality and an uncompromising eye for detail.
              </p>
            </div>

            {/* Animated stats grid */}
            <div className="mt-10 grid grid-cols-2 gap-px bg-sand-200 dark:bg-dark-700 border border-sand-200 dark:border-dark-700">
              {stats.map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                  className="bg-sand-50 dark:bg-dark-900 px-6 py-5"
                >
                  <div className="font-serif text-3xl text-gold-500 mb-1">
                    <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                  </div>
                  <div className="text-xs uppercase tracking-widest text-sand-500 dark:text-sand-400">{stat.label}</div>
                </motion.div>
              ))}
            </div>

            <div className="mt-10 pt-8 border-t border-sand-200 dark:border-dark-700 flex items-center gap-4">
              <div className="w-8 h-px bg-gold-500" />
              <p className="text-xs uppercase tracking-widest text-sand-500 dark:text-sand-400">
                Lumina Architecture &amp; Design · Est. 2009
              </p>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
