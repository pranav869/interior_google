import { motion } from 'motion/react';
import { Home, Briefcase, Hammer, Box, ArrowRight } from 'lucide-react';

const services = [
  {
    number: '01',
    icon: <Home size={28} strokeWidth={1} />,
    title: 'Residential Interiors',
    description: 'Bespoke designs that elevate everyday living, tailored to your family\'s unique lifestyle and aesthetic preferences.',
    image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&q=80&w=800',
  },
  {
    number: '02',
    icon: <Briefcase size={28} strokeWidth={1} />,
    title: 'Commercial Spaces',
    description: 'Immersive environments for brands, designed to enhance productivity, client experience, and brand identity.',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=800',
  },
  {
    number: '03',
    icon: <Hammer size={28} strokeWidth={1} />,
    title: 'Renovation & Turnkey',
    description: 'End-to-end project management, from structural alterations to final styling, ensuring a seamless transformation.',
    image: 'https://images.unsplash.com/photo-1503174971373-b1f69850bded?auto=format&fit=crop&q=80&w=800',
  },
  {
    number: '04',
    icon: <Box size={28} strokeWidth={1} />,
    title: '3D Visualization',
    description: 'Photorealistic renderings that allow you to experience and refine your space before execution begins.',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&q=80&w=800',
  },
];

export function Services() {
  return (
    <section id="services" className="py-24 md:py-32 bg-white dark:bg-dark-800">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="text-center max-w-3xl mx-auto mb-20 relative">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-gold-500 text-sm tracking-[0.2em] uppercase mb-4 block"
          >
            Expertise
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-serif text-4xl md:text-5xl text-sand-900 dark:text-sand-50 mb-6"
          >
            Comprehensive Design Services
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-sand-600 dark:text-sand-400 font-light"
          >
            We offer a full spectrum of interior design and architectural services, ensuring meticulous attention to detail at every phase of your project.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-sand-200 dark:bg-dark-700 border border-sand-200 dark:border-dark-700">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              className="group relative bg-white dark:bg-dark-800 p-8 overflow-hidden cursor-default"
            >
              {/* Hover background image */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-700 bg-cover bg-center"
                style={{ backgroundImage: `url(${service.image})` }}
              />

              <div className="relative z-10">
                <div className="flex justify-between items-start mb-6">
                  <div className="text-sand-400 dark:text-sand-500 group-hover:text-gold-500 transition-colors duration-500">
                    {service.icon}
                  </div>
                  <span className="font-serif text-3xl text-sand-200 dark:text-dark-700 group-hover:text-gold-500/20 transition-colors duration-500">
                    {service.number}
                  </span>
                </div>
                <h3 className="font-serif text-xl text-sand-900 dark:text-sand-50 mb-3 group-hover:text-gold-500 transition-colors duration-500">
                  {service.title}
                </h3>
                <p className="text-sand-600 dark:text-sand-400 font-light text-sm leading-relaxed mb-6">
                  {service.description}
                </p>
                <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-sand-400 dark:text-sand-500 group-hover:text-gold-500 transition-colors duration-500">
                  <span>Learn More</span>
                  <ArrowRight size={12} className="transform group-hover:translate-x-1 transition-transform" />
                </div>
                <div className="absolute bottom-0 left-0 w-0 h-[2px] bg-gold-500 group-hover:w-full transition-all duration-700 ease-out" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
