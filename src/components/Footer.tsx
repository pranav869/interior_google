import { useState } from 'react';
import type { FormEvent } from 'react';
import { Instagram, Linkedin, ArrowRight } from 'lucide-react';

const socials = [
  { icon: <Instagram size={18} strokeWidth={1.5} />, label: 'Instagram', href: '#' },
  { icon: <Linkedin size={18} strokeWidth={1.5} />, label: 'LinkedIn', href: '#' },
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10c1.74 0 3.38-.45 4.82-1.23l3.36.84-.84-3.36A9.95 9.95 0 0 0 22 12c0-5.52-4.48-10-10-10z" />
      </svg>
    ),
    label: 'Pinterest',
    href: '#'
  },
];

export function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: FormEvent) => {
    e.preventDefault();
    if (email) { setSubscribed(true); }
  };

  return (
    <footer className="bg-sand-900 dark:bg-[#0A0A0A] pt-16 md:pt-24 pb-8 border-t border-sand-800 dark:border-dark-800">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8 mb-12 md:mb-16">

          <div className="lg:col-span-1">
            <a href="#" className="font-serif text-2xl tracking-widest uppercase text-sand-50 block mb-6">
              Lumina
            </a>
            <p className="text-sand-400 font-light text-sm leading-relaxed max-w-xs mb-8">
              Designing timeless, luxury spaces that breathe elegant simplicity globally.
            </p>
            <div className="flex gap-3">
              {socials.map(s => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  className="w-9 h-9 border border-sand-700 flex items-center justify-center text-sand-400 hover:border-gold-500 hover:text-gold-500 transition-colors"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-xs uppercase tracking-widest text-gold-500 mb-6">Explore</h4>
            <ul className="space-y-4">
              {['About Us', 'Portfolio', 'Services', 'Methodology', 'Contact'].map((item, i) => (
                <li key={i}>
                  <a
                    href={`#${item.toLowerCase().replace(' ', '')}`}
                    className="text-sm text-sand-300 hover:text-white transition-colors flex items-center gap-2 group"
                  >
                    <span className="w-0 h-px bg-gold-500 group-hover:w-3 transition-all duration-300" />
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs uppercase tracking-widest text-gold-500 mb-6">Contact</h4>
            <div className="space-y-4 text-sm text-sand-400 font-light">
              <p>124 Berkeley Square<br />Mayfair, London W1J 6BQ</p>
              <p>
                <a href="tel:+442079460124" className="hover:text-white transition-colors">+44 (0) 20 7946 0124</a>
              </p>
              <p>
                <a href="mailto:consult@luminainteriors.com" className="hover:text-white transition-colors">consult@luminainteriors.com</a>
              </p>
              <p className="text-sand-500 text-xs uppercase tracking-wider pt-2">Mon – Fri, 9:00am – 6:00pm</p>
            </div>
          </div>

          <div>
            <h4 className="text-xs uppercase tracking-widest text-gold-500 mb-6">Newsletter</h4>
            <p className="text-sm text-sand-400 font-light mb-6">Curated design insights, delivered monthly.</p>
            {subscribed ? (
              <div className="border border-gold-500/40 px-4 py-3 text-xs text-gold-500 uppercase tracking-widest">
                ✓ You're on the list
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-3">
                <div className="flex border-b border-sand-700 pb-2 focus-within:border-gold-500 transition-colors">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="Enter email address"
                    className="bg-transparent w-full focus:outline-none text-sand-50 text-sm placeholder-sand-600"
                  />
                  <button
                    type="submit"
                    className="text-sand-300 hover:text-gold-500 transition-colors ml-4 shrink-0"
                    aria-label="Subscribe"
                  >
                    <ArrowRight size={16} />
                  </button>
                </div>
              </form>
            )}
          </div>

        </div>

        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-sand-800 dark:border-dark-800 text-xs text-sand-500 tracking-wider">
          <p>&copy; {new Date().getFullYear()} Lumina Architecture & Design. All rights reserved.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-sand-300 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-sand-300 transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-sand-300 transition-colors">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
