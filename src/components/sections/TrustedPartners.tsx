import { motion } from 'motion/react';

const logos = [
  '/logo1.png', '/logo2.png', '/logo3.png', '/logo4.png', '/logo5.png',
  '/logo6.png', '/logo7.png', '/logo8.png', '/logo9.png',
];

const track = [...logos, ...logos];

export function TrustedPartners() {
  return (
    <section className="py-16 md:py-20 bg-sand-50 dark:bg-dark-900 border-y border-sand-200 dark:border-dark-700 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12 mb-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <span className="text-gold-500 text-xs tracking-[0.3em] uppercase mb-3 block">Collaborations</span>
          <h2 className="font-serif text-3xl md:text-4xl text-sand-900 dark:text-sand-50">
            Our Trusted Partners
          </h2>
        </motion.div>
      </div>

      {/* Infinite scrolling marquee */}
      <div className="relative">
        {/* Fade masks on edges */}
        <div className="absolute left-0 top-0 bottom-0 w-24 z-10 bg-gradient-to-r from-sand-50 dark:from-dark-900 to-transparent pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 z-10 bg-gradient-to-l from-sand-50 dark:from-dark-900 to-transparent pointer-events-none" />

        <motion.div
          className="flex gap-16 md:gap-24 items-center"
          animate={{ x: ['0%', '-50%'] }}
          transition={{ duration: 18, ease: 'linear', repeat: Infinity }}
        >
          {track.map((src, i) => (
            <div
              key={i}
              className="flex-shrink-0 w-36 md:w-48 h-20 md:h-24 flex items-center justify-center"
            >
              <img
                src={src}
                alt={`Partner ${(i % logos.length) + 1}`}
                className="max-h-full max-w-full object-contain"
                draggable={false}
              />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
