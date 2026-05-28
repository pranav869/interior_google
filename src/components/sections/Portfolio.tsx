import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

const projects = [
  {
    title: 'The Kensington Residence',
    category: 'Residential',
    image:
      'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&q=80&w=1200',
    aspectRatio: '4 / 3',
  },
  {
    title: 'Oakhaven Estate',
    category: 'Architecture',
    image:
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=1200',
    aspectRatio: '3 / 4',
  },
  {
    title: 'Minimalist Loft',
    category: 'Residential',
    image:
      'https://images.unsplash.com/photo-1600210491369-e753d80a41f3?auto=format&fit=crop&q=80&w=1200',
    aspectRatio: '4 / 3',
  },
  {
    title: 'The Mayfair Penthouse',
    category: 'Residential',
    image:
      'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&q=80&w=1200',
    aspectRatio: '4 / 3',
  },
  {
    title: 'Luminary Corporate HQ',
    category: 'Commercial',
    image:
      'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1200',
    aspectRatio: '3 / 4',
  },
];

const filters = ['All', 'Residential', 'Commercial', 'Architecture'];

export function Portfolio() {
  const [activeFilter, setActiveFilter] = useState('All');

  const filteredProjects =
    activeFilter === 'All'
      ? projects
      : projects.filter(
          (project) => project.category === activeFilter
        );

  return (
    <section
      id="portfolio"
      className="relative overflow-hidden border-t border-sand-100 bg-white py-28 dark:border-dark-800 dark:bg-dark-900 md:py-40"
    >
      {/* Background Blur */}
      <div className="pointer-events-none absolute inset-0 opacity-30 dark:opacity-10">
        <div className="absolute right-0 top-0 h-96 w-96 rounded-full bg-gold-500/10 blur-3xl" />
        <div className="absolute bottom-0 left-0 h-96 w-96 rounded-full bg-sand-300/30 blur-3xl dark:bg-dark-700/20" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6 md:px-12">
        {/* Header */}
        <div className="mb-16 flex flex-col justify-between md:flex-row md:items-start">
          <div className="mb-10 max-w-2xl md:mb-0">
            <span className="mb-4 block text-xs uppercase tracking-[0.3em] text-gold-500">
              Portfolio
            </span>

            <h2 className="mb-6 font-serif text-5xl leading-tight text-sand-900 dark:text-sand-50 md:text-6xl lg:text-7xl">
              Featured Work
            </h2>

            <p className="max-w-lg text-lg font-light leading-relaxed text-sand-600 dark:text-sand-400">
              Curated spaces that blend timeless elegance with modern
              sensibilities. Each project tells a unique story through
              thoughtful design.
            </p>
          </div>

          <a
            href="#"
            className="group hidden items-center space-x-3 text-sm uppercase tracking-widest text-sand-800 transition-colors hover:text-gold-500 dark:text-sand-200 md:flex"
          >
            <span>View All Projects</span>

            <ArrowUpRight
              size={16}
              className="transition-transform group-hover:-translate-y-1 group-hover:translate-x-1"
            />
          </a>
        </div>

        {/* Filters */}
        <div className="mb-16 flex flex-wrap gap-3">
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-6 py-3 text-xs uppercase tracking-[0.2em] transition-all duration-300 ${
                activeFilter === filter
                  ? 'border border-sand-900 bg-sand-900 text-sand-50 dark:border-sand-50 dark:bg-sand-50 dark:text-dark-900'
                  : 'border border-sand-200 text-sand-600 hover:border-gold-500 hover:text-gold-500 dark:border-dark-700 dark:text-sand-400 dark:hover:border-gold-500 dark:hover:text-gold-500'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Portfolio Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.title}
                layout
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 40 }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                className="group relative overflow-hidden"
                style={{ aspectRatio: project.aspectRatio }}
              >
                {/* Image */}
                <img
                  src={project.image}
                  alt={project.title}
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                />

                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-70 transition-opacity duration-500 group-hover:opacity-90" />

                {/* Category tag */}
                <div className="absolute left-4 top-4 z-10">
                  <span className="border border-white/20 bg-black/30 px-3 py-1.5 text-[10px] uppercase tracking-[0.25em] text-white/90 backdrop-blur-md">
                    {project.category}
                  </span>
                </div>

                {/* Title + CTA */}
                <div className="absolute inset-x-0 bottom-0 z-10 p-6 md:p-8">
                  <div className="translate-y-3 transform transition-transform duration-500 group-hover:translate-y-0">
                    <h3 className="mb-3 font-serif text-xl leading-tight text-white md:text-2xl">
                      {project.title}
                    </h3>
                    <div className="flex items-center gap-2 opacity-0 transition-opacity delay-100 duration-500 group-hover:opacity-100">
                      <span className="text-xs uppercase tracking-widest text-white/80">
                        View Project
                      </span>
                      <div className="flex h-6 w-6 items-center justify-center rounded-full bg-gold-500">
                        <ArrowUpRight className="text-white" size={12} />
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Mobile Button */}
        <div className="mt-16 text-center md:hidden">
          <a
            href="#"
            className="group inline-flex items-center gap-2 border border-sand-900 px-8 py-4 text-sm uppercase tracking-widest text-sand-900 transition-colors hover:bg-sand-900 hover:text-sand-50 dark:border-sand-50 dark:text-sand-50 dark:hover:bg-sand-50 dark:hover:text-dark-900"
          >
            <span>View All Projects</span>

            <ArrowUpRight
              size={14}
              className="transition-transform group-hover:-translate-y-1 group-hover:translate-x-1"
            />
          </a>
        </div>
      </div>
    </section>
  );
}