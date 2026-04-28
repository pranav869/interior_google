import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';

const projects = [
  {
    title: 'The Kensington Residence',
    category: 'Residential',
    image: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&q=80&w=1200',
    aspectRatio: 'aspect-[4/3]',
  },
  {
    title: 'Aesop Flagship Store',
    category: 'Commercial',
    image: 'https://images.unsplash.com/photo-1597423233827-024c03b13192?auto=format&fit=crop&q=80&w=1200',
    aspectRatio: 'aspect-[3/4]',
  },
  {
    title: 'Oakhaven Estate',
    category: 'Architecture',
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=1200',
    aspectRatio: 'aspect-[3/4]',
  },
  {
    title: 'Minimalist Loft',
    category: 'Residential',
    image: 'https://images.unsplash.com/photo-1600210491369-e753d80a41f3?auto=format&fit=crop&q=80&w=1200',
    aspectRatio: 'aspect-[4/3]',
  },
  {
    title: 'The Mayfair Penthouse',
    category: 'Residential',
    image: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&q=80&w=1200',
    aspectRatio: 'aspect-[4/3]',
  },
  {
    title: 'Luminary Corporate HQ',
    category: 'Commercial',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1200',
    aspectRatio: 'aspect-[3/4]',
  },
];

const filters = ['All', 'Residential', 'Commercial', 'Architecture'];

export function Portfolio() {
  const [activeFilter, setActiveFilter] = useState('All');

  const filtered = activeFilter === 'All'
    ? projects
    : projects.filter(p => p.category === activeFilter);

  return (
    <section id="portfolio" className="py-24 md:py-32 bg-sand-50 dark:bg-dark-900 border-t border-sand-200 dark:border-dark-700">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10">
          <div className="max-w-xl mb-8 md:mb-0">
            <span className="text-gold-500 text-sm tracking-[0.2em] uppercase mb-4 block">Featured Work</span>
            <h2 className="font-serif text-4xl md:text-5xl text-sand-900 dark:text-sand-50">
              A Selection of Our Finest Projects
            </h2>
          </div>
          <a
            href="#"
            className="hidden md:inline-flex items-center space-x-2 text-sm tracking-widest uppercase text-sand-800 dark:text-sand-200 hover:text-gold-500 transition-colors border-b border-sand-800 dark:border-sand-200 pb-1 hover:border-gold-500"
          >
            <span>View Complete Archive</span>
          </a>
        </div>

        {/* Filter Tabs */}
        <div className="flex gap-2 mb-12 flex-wrap">
          {filters.map(filter => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-5 py-2 text-xs uppercase tracking-widest border transition-all duration-300 ${
                activeFilter === filter
                  ? 'bg-sand-900 dark:bg-sand-50 text-sand-50 dark:text-dark-900 border-sand-900 dark:border-sand-50'
                  : 'border-sand-300 dark:border-dark-700 text-sand-600 dark:text-sand-400 hover:border-sand-900 dark:hover:border-sand-200 hover:text-sand-900 dark:hover:text-sand-200'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          <AnimatePresence mode="popLayout">
            {filtered.map((project, index) => (
              <motion.div
                key={project.title}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.5, delay: index * 0.07 }}
                className={`group relative overflow-hidden bg-white dark:bg-dark-800 ${project.aspectRatio} ${index % 2 !== 0 ? 'md:mt-24' : ''}`}
              >
                <div className="absolute inset-0 z-0">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/50 transition-colors duration-500" />
                </div>

                {/* Always-visible category tag */}
                <div className="absolute top-6 left-6 z-10">
                  <span className="text-xs uppercase tracking-widest text-white/80 bg-black/30 backdrop-blur-sm px-3 py-1">
                    {project.category}
                  </span>
                </div>

                <div className="absolute inset-0 z-10 flex flex-col justify-end p-8 md:p-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="transform translate-y-8 group-hover:translate-y-0 transition-transform duration-500">
                    <div className="flex justify-between items-center">
                      <h3 className="font-serif text-2xl md:text-3xl text-white">
                        {project.title}
                      </h3>
                      <div className="bg-white/10 backdrop-blur-sm p-3 rounded-full hover:bg-gold-500 transition-colors shrink-0 ml-4">
                        <ArrowUpRight className="text-white" size={20} />
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        <div className="mt-12 text-center md:hidden">
          <a
            href="#"
            className="inline-flex border border-sand-900 dark:border-sand-50 px-8 py-3 text-sm tracking-widest uppercase text-sand-900 dark:text-sand-50 hover:bg-sand-900 hover:text-sand-50 dark:hover:bg-sand-50 dark:hover:text-dark-900 transition-colors"
          >
            View Complete Archive
          </a>
        </div>
      </div>
    </section>
  );
}
