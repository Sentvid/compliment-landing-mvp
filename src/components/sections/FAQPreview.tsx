import React from 'react';
import { motion } from 'framer-motion';
import { ANIMATION_VARIANTS } from '@/lib/constants';

const FAQPreview: React.FC = () => {
  const previewQuestions = [
    {
      q: 'How accurate is QuantumMatch™ AI?',
      a: '89% accuracy in predicting long-term relationship compatibility, tested across 10,000+ relationships over 3 years.'
    },
    {
      q: 'What makes this different from other dating apps?',
      a: 'We predict future compatibility, not just current attraction. Our AI analyzes personality evolution and relationship dynamics.'
    },
    {
      q: 'When will the platform be available?',
      a: 'Beta testing begins Q3 2025 for early access members. Full launch planned for Q1 2026.'
    }
  ];

  return (
    <section 
      id="faq-preview" 
      className="section-padding scroll-snap-section bg-gradient-to-b from-primary-dark to-primary-dark/80"
    >
      <div className="section-container">
        <motion.div
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, amount: 0.3 }}
          variants={ANIMATION_VARIANTS.staggerContainer}
          className="max-w-4xl mx-auto"
        >
          <div className="text-center mb-12">
            <motion.h2 
              className="text-3xl md:text-4xl font-display font-bold mb-4"
              variants={ANIMATION_VARIANTS.fadeInUp}
            >
              Questions? We Have <span className="text-gradient-gold">Answers</span>
            </motion.h2>
            
            <motion.p 
              className="text-lg text-text-secondary max-w-2xl mx-auto"
              variants={ANIMATION_VARIANTS.fadeInUp}
            >
              Get insights into our revolutionary technology and investment opportunity
            </motion.p>
          </div>

          {/* Question Stone - Interactive Element */}
          <motion.div
            variants={ANIMATION_VARIANTS.fadeInUp}
            className="relative mb-12"
          >
            <motion.div
              className="mx-auto w-32 h-32 relative cursor-pointer group"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => window.location.href = '/faq'}
            >
              {/* Ancient-style stone with runes */}
              <div className="absolute inset-0 bg-gradient-to-br from-secondary-bronze to-primary-gold rounded-lg transform rotate-45">
                <div className="absolute inset-2 bg-primary-dark/80 rounded-sm flex items-center justify-center">
                  <motion.div
                    animate={{ 
                      textShadow: [
                        '0 0 10px rgba(196, 155, 66, 0.5)',
                        '0 0 20px rgba(196, 155, 66, 0.8)',
                        '0 0 10px rgba(196, 155, 66, 0.5)'
                      ]
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="text-primary-gold text-4xl font-display transform -rotate-45"
                  >
                    ?
                  </motion.div>
                </div>
              </div>
              
              {/* Mystical particles around the stone */}
              <div className="absolute inset-0 pointer-events-none">
                {[...Array(6)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-1 h-1 bg-primary-gold rounded-full"
                    style={{
                      top: `${20 + Math.sin(i * 60 * Math.PI / 180) * 40}%`,
                      left: `${50 + Math.cos(i * 60 * Math.PI / 180) * 40}%`,
                    }}
                    animate={{
                      opacity: [0.3, 1, 0.3],
                      scale: [0.5, 1, 0.5],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: i * 0.3,
                    }}
                  />
                ))}
              </div>
              
              {/* Hover tooltip */}
              <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="bg-primary-dark border border-primary-gold/30 rounded px-3 py-1 text-sm text-primary-gold whitespace-nowrap">
                  Click for full FAQ
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Preview Questions */}
          <div className="grid md:grid-cols-1 gap-6">
            {previewQuestions.map((item, index) => (
              <motion.div
                key={index}
                variants={ANIMATION_VARIANTS.fadeInUp}
                custom={index}
                className="bg-primary-dark/50 border border-primary-blue/20 rounded-lg p-6 hover:border-primary-blue/40 transition-colors"
              >
                <h3 className="text-lg font-semibold text-text-primary mb-3 flex items-start">
                  <span className="text-primary-gold mr-3 mt-1 flex-shrink-0">Q:</span>
                  {item.q}
                </h3>
                <p className="text-text-secondary leading-relaxed flex items-start">
                  <span className="text-primary-blue mr-3 mt-1 flex-shrink-0">A:</span>
                  {item.a}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Call to Action */}
          <motion.div
            variants={ANIMATION_VARIANTS.fadeInUp}
            className="text-center mt-12"
          >
            <motion.a
              href="/faq"
              className="inline-flex items-center px-8 py-3 bg-gradient-to-r from-secondary-bronze to-primary-gold text-white rounded-lg font-semibold hover:shadow-glow-gold transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              View All Questions
              <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </motion.a>

            <p className="mt-4 text-sm text-text-secondary">
              Can't find what you're looking for? 
              <button 
                onClick={() => window.location.href = '#footer'}
                className="text-primary-blue hover:text-primary-blue/80 transition-colors ml-1 underline"
              >
                Contact us directly
              </button>
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQPreview;