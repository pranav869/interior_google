import { motion } from 'motion/react';
import { ArrowRight, Phone } from 'lucide-react';

export function CtaBanner() {
  return (
    <section className="relative py-32 text-center px-6 overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&q=80&w=2560"
          alt="Luxury space"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-sand-900/85 dark:bg-black/90" />
      </div>

      {/* Decorative lines */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-px h-24 bg-gold-500/20" />
        <div className="absolute bottom-0 right-1/4 w-px h-24 bg-gold-500/20" />
        <div className="absolute top-1/2 left-0 h-px w-24 bg-gold-500/20 -translate-y-1/2" />
        <div className="absolute top-1/2 right-0 h-px w-24 bg-gold-500/20 -translate-y-1/2" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto">
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-gold-500 text-sm tracking-[0.2em] uppercase mb-6 block"
        >
          Begin The Journey
        </motion.span>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="font-serif text-4xl md:text-5xl lg:text-6xl text-sand-50 mb-6 leading-tight"
        >
          Ready to elevate your<br className="hidden md:block" /> everyday living?
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15 }}
          className="text-sand-400 font-light mb-12 max-w-xl mx-auto"
        >
          From the first conversation to the final reveal — we design spaces that are unmistakably yours.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a
            href="#contact"
            className="inline-flex items-center gap-3 bg-gold-500 text-white px-10 py-5 uppercase tracking-widest text-sm hover:bg-white hover:text-sand-900 transition-colors duration-500 group"
          >
            <span>Start Your Project Today</span>
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </a>
          <a
            href="tel:+442079460124"
            className="inline-flex items-center gap-3 border border-sand-500 text-sand-200 px-10 py-5 uppercase tracking-widest text-sm hover:border-white hover:text-white transition-colors duration-500"
          >
            <Phone size={14} />
            <span>Call the Studio</span>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
