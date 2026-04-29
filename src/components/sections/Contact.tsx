import { useState } from 'react';
import type { FormEvent, ChangeEvent } from 'react';
import { supabase } from '../../lib/supabase';
import { motion, AnimatePresence } from 'motion/react';
import { MapPin, Phone, Mail, MessageCircle, CheckCircle, Clock } from 'lucide-react';

export function Contact() {
  const [formData, setFormData] = useState({
    name: '', phone: '', email: '', projectType: '', budget: '', message: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setSubmitError('');
    const { error } = await supabase.from('bookings').insert({
      name: formData.name,
      email: formData.email,
      phone: formData.phone || null,
      project_type: formData.projectType || null,
      budget: formData.budget || null,
      message: formData.message || null,
      status: 'new',
    });
    setSubmitting(false);
    if (error) { console.error('Supabase insert error:', error); setSubmitError(`Error: ${error.message}`); return; }
    setSubmitted(true);
  };

  return (
    <section id="contact" className="py-24 md:py-32 bg-sand-50 dark:bg-dark-900 relative">
      {/* Floating WhatsApp Button */}
      <a 
        href="#"
        className="fixed bottom-8 right-8 z-50 bg-[#25D366] text-white p-4 rounded-full shadow-lg hover:scale-110 transition-transform flex items-center justify-center group"
        aria-label="Contact on WhatsApp"
      >
        <MessageCircle size={28} />
        <span className="absolute right-full mr-4 bg-white dark:bg-dark-800 text-sand-900 dark:text-sand-50 text-xs uppercase tracking-widest py-2 px-4 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-md">
          Chat with us
        </span>
      </a>

      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          
          {/* Contact Details & Map */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-gold-500 text-sm tracking-[0.2em] uppercase mb-4 block">Get in Touch</span>
            <h2 className="font-serif text-4xl md:text-5xl text-sand-900 dark:text-sand-50 mb-10">
              Let's Discuss Your Vision
            </h2>
            
            <div className="space-y-8 mb-12">
              <div className="flex items-start space-x-4">
                <MapPin className="text-gold-500 mt-1 shrink-0" size={20} />
                <div>
                  <h4 className="font-serif text-lg text-sand-900 dark:text-sand-50 mb-1">Studio</h4>
                  <p className="text-sand-600 dark:text-sand-400 font-light text-sm leading-relaxed">
                    124 Berkeley Square<br />Mayfair, London<br />W1J 6BQ, United Kingdom
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <Phone className="text-gold-500 mt-1 shrink-0" size={20} />
                <div>
                  <h4 className="font-serif text-lg text-sand-900 dark:text-sand-50 mb-1">Phone</h4>
                  <p className="text-sand-600 dark:text-sand-400 font-light text-sm">+44 (0) 20 7946 0124</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <Mail className="text-gold-500 mt-1 shrink-0" size={20} />
                <div>
                  <h4 className="font-serif text-lg text-sand-900 dark:text-sand-50 mb-1">Email</h4>
                  <p className="text-sand-600 dark:text-sand-400 font-light text-sm">consult@luminainteriors.com</p>
                </div>
              </div>
            </div>

            {/* Styled map placeholder */}
            <div className="w-full h-64 bg-sand-200 dark:bg-dark-800 relative overflow-hidden group">
              <div
                className="absolute inset-0 opacity-20"
                style={{
                  backgroundImage: 'linear-gradient(var(--color-sand-400) 1px, transparent 1px), linear-gradient(90deg, var(--color-sand-400) 1px, transparent 1px)',
                  backgroundSize: '32px 32px'
                }}
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <div className="w-3 h-3 bg-gold-500 rounded-full relative">
                  <div className="absolute inset-0 bg-gold-500 rounded-full animate-ping opacity-50" />
                </div>
                <div className="mt-3 text-center">
                  <p className="text-xs uppercase tracking-widest text-sand-600 dark:text-sand-400">124 Berkeley Square, Mayfair</p>
                  <p className="text-xs text-sand-500 dark:text-sand-500 mt-1">London, W1J 6BQ</p>
                </div>
              </div>
              <div className="absolute bottom-3 right-3">
                <a
                  href="https://maps.google.com/?q=Berkeley+Square+Mayfair+London"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs uppercase tracking-widest text-gold-500 hover:underline flex items-center gap-1"
                >
                  <Clock size={10} /> Open in Maps
                </a>
              </div>
            </div>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-white dark:bg-dark-800 p-8 md:p-12 shadow-sm"
          >
            <AnimatePresence mode="wait">
              {submitted ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center py-16 text-center"
                >
                  <div className="w-16 h-16 border border-gold-500 flex items-center justify-center mb-6">
                    <CheckCircle size={28} className="text-gold-500" />
                  </div>
                  <h3 className="font-serif text-2xl text-sand-900 dark:text-sand-50 mb-3">Thank You</h3>
                  <p className="text-sand-600 dark:text-sand-400 font-light text-sm max-w-xs">
                    Your inquiry has been received. Our design team will reach out within 24 hours.
                  </p>
                  <button
                    onClick={() => { setSubmitted(false); setFormData({ name: '', phone: '', email: '', projectType: '', budget: '', message: '' }); }}
                    className="mt-8 text-xs uppercase tracking-widest text-gold-500 hover:underline"
                  >
                    Submit another inquiry
                  </button>
                </motion.div>
              ) : (
                <motion.div key="form" initial={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  <h3 className="font-serif text-2xl text-sand-900 dark:text-sand-50 mb-8">Schedule a Consultation</h3>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 gap-6">
                      <div>
                        <label htmlFor="name" className="block text-xs uppercase tracking-widest text-sand-500 mb-2">Name *</label>
                        <input type="text" id="name" required value={formData.name} onChange={handleChange}
                          className="w-full bg-transparent border-b border-sand-300 dark:border-dark-700 py-2 focus:outline-none focus:border-gold-500 transition-colors text-sand-900 dark:text-sand-50"
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label htmlFor="email" className="block text-xs uppercase tracking-widest text-sand-500 mb-2">Email *</label>
                          <input type="email" id="email" required value={formData.email} onChange={handleChange}
                            className="w-full bg-transparent border-b border-sand-300 dark:border-dark-700 py-2 focus:outline-none focus:border-gold-500 transition-colors text-sand-900 dark:text-sand-50"
                          />
                        </div>
                        <div>
                          <label htmlFor="phone" className="block text-xs uppercase tracking-widest text-sand-500 mb-2">Phone</label>
                          <input type="tel" id="phone" value={formData.phone} onChange={handleChange}
                            className="w-full bg-transparent border-b border-sand-300 dark:border-dark-700 py-2 focus:outline-none focus:border-gold-500 transition-colors text-sand-900 dark:text-sand-50"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label htmlFor="projectType" className="block text-xs uppercase tracking-widest text-sand-500 mb-2">Project Type</label>
                          <select id="projectType" value={formData.projectType} onChange={handleChange}
                            className="w-full bg-transparent border-b border-sand-300 dark:border-dark-700 py-2 focus:outline-none focus:border-gold-500 transition-colors text-sand-900 dark:text-sand-50 text-sm font-light appearance-none"
                          >
                            <option value="" className="dark:bg-dark-800">Select...</option>
                            <option value="residential" className="dark:bg-dark-800">Residential</option>
                            <option value="commercial" className="dark:bg-dark-800">Commercial</option>
                            <option value="renovation" className="dark:bg-dark-800">Renovation</option>
                          </select>
                        </div>
                        <div>
                          <label htmlFor="budget" className="block text-xs uppercase tracking-widest text-sand-500 mb-2">Estimated Budget</label>
                          <select id="budget" value={formData.budget} onChange={handleChange}
                            className="w-full bg-transparent border-b border-sand-300 dark:border-dark-700 py-2 focus:outline-none focus:border-gold-500 transition-colors text-sand-900 dark:text-sand-50 text-sm font-light appearance-none"
                          >
                            <option value="" className="dark:bg-dark-800">Select...</option>
                            <option value="tier1" className="dark:bg-dark-800">₹5L – ₹25L</option>
                            <option value="tier2" className="dark:bg-dark-800">₹25L – ₹1Cr</option>
                            <option value="tier3" className="dark:bg-dark-800">₹1Cr+</option>
                          </select>
                        </div>
                      </div>

                      <div>
                        <label htmlFor="message" className="block text-xs uppercase tracking-widest text-sand-500 mb-2">Brief Details</label>
                        <textarea id="message" rows={3} value={formData.message} onChange={handleChange}
                          className="w-full bg-transparent border-b border-sand-300 dark:border-dark-700 py-2 focus:outline-none focus:border-gold-500 transition-colors text-sand-900 dark:text-sand-50 resize-none font-light"
                        />
                      </div>
                    </div>

                    {submitError && (
                      <p className="text-red-500 text-xs mt-1">{submitError}</p>
                    )}
                    <button type="submit" disabled={submitting}
                      className="w-full bg-sand-900 text-sand-50 dark:bg-sand-50 dark:text-dark-900 py-4 uppercase tracking-widest text-sm hover:bg-gold-500 hover:text-white dark:hover:bg-gold-500 dark:hover:text-white transition-colors duration-300 mt-4 disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                      {submitting ? 'Submitting…' : 'Submit Inquiry'}
                    </button>
                  </form>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
