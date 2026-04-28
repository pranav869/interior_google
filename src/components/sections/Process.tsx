import { motion } from 'motion/react';

const steps = [
  {
    number: '01',
    title: 'Consultation & Brief',
    description: 'We begin with an in-depth dialogue to understand your vision, lifestyle, functional needs, and aesthetic aspirations.'
  },
  {
    number: '02',
    title: 'Concept & Spatial Planning',
    description: 'Our team develops mood boards, initial layout, and defining the architectural language of the space.'
  },
  {
    number: '03',
    title: 'Detailed Design',
    description: 'Refining the concept with precise material selections, bespoke furniture design, 3D renderings, and technical drawings.'
  },
  {
    number: '04',
    title: 'Project Execution',
    description: 'Our dedicated project managers oversee construction, procurement, and liaise with artisans to ensure exact implementation.'
  },
  {
    number: '05',
    title: 'Styling & Handover',
    description: 'The final layer. We meticulously place art, accessories, and soft furnishings before presenting you with a finished, turn-key home.'
  }
];

export function Process() {
  return (
    <section id="process" className="py-24 md:py-32 bg-white dark:bg-dark-800">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
          <div className="lg:col-span-1 border-r-0 lg:border-r border-sand-200 dark:border-dark-700 pr-0 lg:pr-12">
            <div className="sticky top-32">
              <span className="text-gold-500 text-sm tracking-[0.2em] uppercase mb-4 block">Our Methodology</span>
              <h2 className="font-serif text-4xl lg:text-5xl text-sand-900 dark:text-sand-50 mb-6">
                A Journey of Precision
              </h2>
              <p className="text-sand-600 dark:text-sand-400 font-light mb-8">
                Our proven five-step process ensures a seamless, transparent experience from the initial handshake to the final reveal. We handle the complexity so you can enjoy the transformation.
              </p>
            </div>
          </div>

          <div className="lg:col-span-2">
            <div className="space-y-14">
              {steps.map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.6, delay: index * 0.05 }}
                  className="flex gap-8 items-baseline"
                >
                  <span className="font-serif text-4xl text-sand-300 dark:text-dark-700 shrink-0 w-16">
                    {step.number}
                  </span>
                  <div>
                    <h3 className="font-serif text-2xl text-sand-900 dark:text-sand-50 mb-3">
                      {step.title}
                    </h3>
                    <p className="text-sand-600 dark:text-sand-400 font-light leading-relaxed max-w-xl">
                      {step.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
