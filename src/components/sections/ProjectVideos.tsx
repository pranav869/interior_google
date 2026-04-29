import { motion } from 'motion/react';

const videos = [
  { id: 'H9gMqZiFCrI', title: 'Project Showcase' },
  { id: 'bzB1tnUlsy0', title: 'Interior Design Process' },
  { id: 'ahhfhpErGrk', title: 'Space Transformation' },
];

export function ProjectVideos() {
  return (
    <section id="videos" className="py-24 md:py-32 bg-white dark:bg-dark-800">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-14"
        >
          <span className="text-gold-500 text-xs tracking-[0.3em] uppercase mb-3 block">Behind The Work</span>
          <h2 className="font-serif text-4xl md:text-5xl text-sand-900 dark:text-sand-50">
            Our Project Videos
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {videos.map((video, i) => (
            <motion.div
              key={video.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="group relative overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-500"
            >
              {/* Gold accent top border */}
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gold-500 z-10" />
              <div className="aspect-video w-full">
                <iframe
                  src={`https://www.youtube.com/embed/${video.id}?rel=0&modestbranding=1`}
                  title={video.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full"
                  loading="lazy"
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
