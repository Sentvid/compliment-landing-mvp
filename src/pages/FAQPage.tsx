import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FAQ_DATA, ANIMATION_VARIANTS } from '@/lib/constants';
import Header from '@/components/sections/Header';
import Footer from '@/components/sections/Footer';

const FAQPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());

  const toggleExpanded = (id: string) => {
    const newExpanded = new Set(expandedItems);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpandedItems(newExpanded);
  };

  const filteredFAQ = FAQ_DATA.map(category => ({
    ...category,
    questions: category.questions.filter(
      item =>
        item.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.a.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })).filter(category => category.questions.length > 0);

  return (
    <div className="min-h-screen bg-primary-dark">
      <Header />
      
      <main className="pt-20">
        {/* Hero Section */}
        <section className="section-padding bg-hero-pattern">
          <div className="section-container">
            <motion.div
              initial="initial"
              animate="animate"
              variants={ANIMATION_VARIANTS.staggerContainer}
              className="text-center mb-12"
            >
              <motion.h1 
                className="text-4xl md:text-5xl font-display font-bold mb-6"
                variants={ANIMATION_VARIANTS.fadeInUp}
              >
                Frequently Asked <span className="text-gradient-blue">Questions</span>
              </motion.h1>
              
              <motion.p 
                className="text-xl text-text-secondary max-w-3xl mx-auto mb-8"
                variants={ANIMATION_VARIANTS.fadeInUp}
              >
                Everything you need to know about Compliment's revolutionary AI technology, 
                investment opportunity, and our vision for the future of relationships.
              </motion.p>

              {/* Search */}
              <motion.div
                variants={ANIMATION_VARIANTS.fadeInUp}
                className="max-w-md mx-auto"
              >
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search questions..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full px-4 py-3 pl-12 bg-primary-dark/80 border border-primary-blue/30 rounded-lg text-text-primary placeholder:text-text-secondary/70 focus:outline-none focus:border-primary-blue focus:ring-1 focus:ring-primary-blue/20"
                  />
                  <svg
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-text-secondary"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* FAQ Content */}
        <section className="section-padding">
          <div className="section-container">
            {filteredFAQ.length === 0 ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center py-12"
              >
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-xl font-semibold text-text-primary mb-2">No results found</h3>
                <p className="text-text-secondary">Try searching with different keywords</p>
              </motion.div>
            ) : (
              <div className="max-w-4xl mx-auto space-y-12">
                {filteredFAQ.map((category, categoryIndex) => (
                  <motion.div
                    key={category.category}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: categoryIndex * 0.1 }}
                  >
                    <h2 className="text-2xl font-display font-bold text-primary-gold mb-6 flex items-center">
                      {category.category === 'Technology' && '🧠'}
                      {category.category === 'Business' && '💼'}
                      {category.category === 'Investment' && '💰'}
                      <span className="ml-3">{category.category}</span>
                    </h2>

                    <div className="space-y-4">
                      {category.questions.map((item, itemIndex) => {
                        const itemId = `${category.category}-${itemIndex}`;
                        const isExpanded = expandedItems.has(itemId);

                        return (
                          <motion.div
                            key={itemId}
                            className="bg-primary-dark/50 border border-primary-blue/20 rounded-lg overflow-hidden hover:border-primary-blue/40 transition-colors"
                            layout
                          >
                            <button
                              onClick={() => toggleExpanded(itemId)}
                              className="w-full p-6 text-left flex items-center justify-between group"
                              aria-expanded={isExpanded}
                              aria-controls={`answer-${itemId}`}
                            >
                              <h3 className="text-lg font-semibold text-text-primary group-hover:text-primary-blue transition-colors pr-4">
                                {item.q}
                              </h3>
                              <motion.div
                                animate={{ rotate: isExpanded ? 180 : 0 }}
                                transition={{ duration: 0.2 }}
                                className="flex-shrink-0"
                              >
                                <svg
                                  className="w-5 h-5 text-primary-blue"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M19 9l-7 7-7-7"
                                  />
                                </svg>
                              </motion.div>
                            </button>

                            <AnimatePresence>
                              {isExpanded && (
                                <motion.div
                                  id={`answer-${itemId}`}
                                  initial={{ height: 0, opacity: 0 }}
                                  animate={{ height: 'auto', opacity: 1 }}
                                  exit={{ height: 0, opacity: 0 }}
                                  transition={{ duration: 0.3, ease: 'easeInOut' }}
                                  className="overflow-hidden"
                                >
                                  <div className="px-6 pb-6 pt-0">
                                    <div className="h-px bg-primary-blue/20 mb-4" />
                                    <p className="text-text-secondary leading-relaxed">
                                      {item.a}
                                    </p>
                                  </div>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </motion.div>
                        );
                      })}
                    </div>
                  </motion.div>
                ))
              </div>
            )}

            {/* Contact Section */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="mt-16 text-center"
            >
              <div className="bg-gradient-to-r from-primary-dark/80 to-primary-dark/60 border border-primary-gold/30 rounded-lg p-8">
                <h3 className="text-2xl font-display font-bold text-primary-gold mb-4">
                  Still have questions?
                </h3>
                <p className="text-text-secondary mb-6">
                  Can't find what you're looking for? Our team is here to help.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <motion.a
                    href="mailto:hub@compliment.quest"
                    className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-primary-blue to-secondary-purple text-white rounded-lg font-semibold hover:shadow-glow-blue transition-all duration-300"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Contact Us
                    <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </motion.a>
                  <motion.a
                    href="/"
                    className="inline-flex items-center px-6 py-3 bg-transparent border-2 border-primary-gold text-primary-gold rounded-lg font-semibold hover:shadow-glow-gold transition-all duration-300"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Back to Home
                    <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                  </motion.a>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default FAQPage;