import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, Moon, Sun } from 'lucide-react';
import { useTheme } from '../hooks/useTheme';

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const { isDark, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isMobileMenuOpen]);

  useEffect(() => {
    const sectionIds = ['about', 'services', 'portfolio', 'process', 'contact'];
    const observers: IntersectionObserver[] = [];

    sectionIds.forEach(id => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveSection(id); },
        { rootMargin: '-40% 0px -55% 0px' }
      );
      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach(o => o.disconnect());
  }, []);

  const navLinks = [
    { name: 'About', href: '#about', id: 'about' },
    { name: 'Services', href: '#services', id: 'services' },
    { name: 'Portfolio', href: '#portfolio', id: 'portfolio' },
    { name: 'Process', href: '#process', id: 'process' },
    { name: 'Contact', href: '#contact', id: 'contact' },
  ];

  return (
    <header 
      className={`fixed top-0 w-full z-40 transition-all duration-300 ${
        isScrolled 
          ? 'bg-sand-50/90 dark:bg-dark-900/90 backdrop-blur-md py-4 shadow-sm' 
          : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center">
        {/* Logo */}
        <a href="#" className={`font-serif text-2xl tracking-widest z-50 uppercase relative group transition-colors duration-300 ${
          isScrolled ? 'text-sand-900 dark:text-sand-50' : 'text-white'
        }`}>
          Lumina
          <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-gold-500 transition-all duration-300 group-hover:w-full"></span>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center space-x-12">
          <ul className="flex space-x-8">
            {navLinks.map((link) => (
              <li key={link.name} className="relative">
                <a
                  href={link.href}
                  className={`text-sm tracking-widest uppercase transition-colors ${
                    activeSection === link.id
                      ? 'text-gold-500'
                      : isScrolled
                        ? 'text-sand-800 dark:text-sand-200 hover:text-gold-500 dark:hover:text-gold-500'
                        : 'text-white/90 hover:text-white'
                  }`}
                >
                  {link.name}
                </a>
                {activeSection === link.id && (
                  <motion.div
                    layoutId="activeNav"
                    className="absolute -bottom-1 left-0 right-0 h-px bg-gold-500"
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
              </li>
            ))}
          </ul>
          
          <div className={`flex items-center space-x-6 pl-6 border-l transition-colors duration-300 ${isScrolled ? 'border-sand-200 dark:border-dark-700' : 'border-white/20'}`}>
            <button 
              onClick={toggleTheme}
              className={`hover:text-gold-500 transition-colors ${isScrolled ? 'text-sand-800 dark:text-sand-200' : 'text-white/90 hover:text-white'}`}
              aria-label="Toggle Dark Mode"
            >
              {isDark ? <Sun size={20} className="font-light" /> : <Moon size={20} className="font-light" />}
            </button>
            <a 
              href="#contact"
              className={`px-6 py-2 text-sm tracking-widest uppercase transition-all duration-300 ${
                isScrolled
                  ? 'border border-sand-900 dark:border-sand-50 hover:bg-sand-900 hover:text-sand-50 dark:hover:bg-sand-50 dark:hover:text-dark-900'
                  : 'border border-white/70 text-white hover:bg-white hover:text-sand-900'
              }`}
            >
              Consult
            </a>
          </div>
        </nav>

        {/* Mobile Toggle */}
        <div className="md:hidden flex items-center space-x-2 z-50">
          <button
            onClick={toggleTheme}
            className={`p-2 transition-colors ${isScrolled ? 'text-sand-800 dark:text-sand-200' : 'text-white'}`}
            aria-label="Toggle theme"
          >
            {isDark ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={`p-2 transition-colors ${isScrolled ? 'text-sand-900 dark:text-sand-50' : 'text-white'}`}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: '-100%' }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: '-100%' }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 bg-sand-50 dark:bg-dark-900 flex flex-col justify-center items-center z-30"
        >
        <ul className="flex flex-col space-y-8 text-center">
          {navLinks.map((link) => (
            <li key={link.name}>
              <a 
                href={link.href} 
                onClick={() => setIsMobileMenuOpen(false)}
                className="font-serif text-3xl text-sand-900 dark:text-sand-50 hover:text-gold-500 transition-colors"
              >
                {link.name}
              </a>
            </li>
          ))}
          <li>
             <a 
              href="#contact" 
              onClick={() => setIsMobileMenuOpen(false)}
              className="inline-block mt-8 border border-sand-900 dark:border-sand-50 px-8 py-3 text-sm tracking-widest uppercase hover:bg-sand-900 hover:text-sand-50 transition-colors"
            >
              Book Consultation
            </a>
          </li>
        </ul>
        </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
