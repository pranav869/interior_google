import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

export function Loader() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.8, ease: "easeInOut" } }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-sand-50 dark:bg-dark-900"
        >
          <div className="text-center overflow-hidden">
            <motion.h1 
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="font-serif text-4xl md:text-6xl tracking-widest text-sand-900 dark:text-sand-50"
            >
              LUMINA
            </motion.h1>
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1.2, delay: 0.4, ease: "easeInOut" }}
              className="h-px bg-gold-500 mt-4 origin-left"
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
