import { motion } from 'motion/react';
import { ShieldCheck, Gem, BarChart3 } from 'lucide-react';

const reasons = [
  {
    icon: <Gem size={20} strokeWidth={1.5} />,
    title: 'Uncompromising Quality',
    desc: 'We source only from trusted artisans and premium global suppliers. Every finish, fabric, and fixture must meet our rigorous standards.'
  },
  {
    icon: <ShieldCheck size={20} strokeWidth={1.5} />,
    title: 'Bespoke by Default',
    desc: 'We do not replicate. Every project features custom millwork and tailored solutions that ensure your space is singularly yours.'
  },
  {
    icon: <BarChart3 size={20} strokeWidth={1.5} />,
    title: 'Transparent Management',
    desc: 'Our financial reporting and project timelines are transparent, giving you peace of mind while we handle the complexities.'
  }
];

const awards = [
  { label: 'Architectural Digest AD100', year: '2023' },
  { label: 'BIDA Gold Award', year: '2022' },
  { label: 'Elle Décor Grand Prix', year: '2021' },
  { label: 'SBID International Design Awards', year: '2020' },
];

export function WhyChooseUs() {
  return (
    <section className="py-24 bg-white dark:bg-dark-800 border-t border-sand-200 dark:border-dark-700">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center mb-20">

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-gold-500 text-sm tracking-[0.2em] uppercase mb-4 block">Our Distinction</span>
            <h2 className="font-serif text-3xl md:text-4xl text-sand-900 dark:text-sand-50 mb-10 leading-tight">
              Why Discerning Clients Choose Lumina
            </h2>

            <div className="space-y-8">
              {reasons.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="flex gap-5 group"
                >
                  <div className="w-10 h-10 border border-sand-200 dark:border-dark-700 flex items-center justify-center text-gold-500 shrink-0 group-hover:bg-gold-500 group-hover:border-gold-500 group-hover:text-white transition-all duration-300">
                    {item.icon}
                  </div>
                  <div>
                    <h3 className="font-serif text-xl text-sand-900 dark:text-sand-50 mb-2">{item.title}</h3>
                    <p className="text-sand-600 dark:text-sand-400 font-light text-sm leading-relaxed">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="aspect-square bg-sand-100 dark:bg-dark-900 relative"
          >
            <img
              src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&q=80&w=1000"
              alt="Detail shot of luxury materials"
              className="w-full h-full object-cover grayscale opacity-90 hover:grayscale-0 hover:opacity-100 transition-all duration-1000"
            />
          </motion.div>
        </div>

        {/* Awards strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="border-t border-sand-200 dark:border-dark-700 pt-12"
        >
          <p className="text-xs uppercase tracking-widest text-sand-500 dark:text-sand-400 mb-6 text-center">Recognition & Awards</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-px bg-sand-200 dark:bg-dark-700">
            {awards.map((award, i) => (
              <div key={i} className="bg-white dark:bg-dark-800 px-6 py-5 text-center">
                <div className="font-serif text-sm text-sand-900 dark:text-sand-50 mb-1">{award.label}</div>
                <div className="text-xs text-gold-500 tracking-widest">{award.year}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
