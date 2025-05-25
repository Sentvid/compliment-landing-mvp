import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { TECHNOLOGY_CARDS, ANIMATION_VARIANTS } from '@/lib/constants';
import TechnologyCard from '@/components/ui/TechnologyCard';

const Hero: React.FC = () => {
  const [selectedTech, setSelectedTech] = useState<string | null>(null);

  return (
    <section 
      id="hero" 
      className="min-h-screen flex items-center justify-center bg-hero-pattern scroll-snap-section"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          {/* Problem-Solution Presentation */}
          <motion.div
            initial="initial"
            animate="animate"
            variants={ANIMATION_VARIANTS.staggerContainer}
            className="max-w-4xl mx-auto"
          >
            {/* Research Block */}
            <motion.div
              variants={ANIMATION_VARIANTS.fadeInUp}
              className="mb-12"
            >
              <motion.h2 
                className="text-sm uppercase tracking-wider text-primary-gold font-semibold mb-4"
                variants={ANIMATION_VARIANTS.letterByLetter}
              >
                Research Shows
              </motion.h2>
              <motion.p 
                className="text-lg md:text-xl text-text-secondary leading-relaxed mb-6"
                variants={ANIMATION_VARIANTS.fadeInUp}
              >
                70% of dating app users experience emotional burnout. People spend 3-5 years 
                in relationships with incompatible partners, wasting precious time and emotional energy.
              </motion.p>
              <motion.div 
                className="w-24 h-0.5 bg-gradient-to-r from-primary-gold to-transparent mx-auto"
                variants={ANIMATION_VARIANTS.fadeInUp}
              />
            </motion.div>

            {/* Solution Block */}
            <motion.div
              variants={ANIMATION_VARIANTS.fadeInUp}
              className="mb-12"
            >
              <motion.h1 
                className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6"
                variants={ANIMATION_VARIANTS.fadeInUp}
              >
                <span className="text-gradient-blue">Revolutionary AI</span>
                <br />
                <span className="text-text-primary">Predicts Long-Term</span>
                <br />
                <span className="text-gradient-gold">Compatibility</span>
              </motion.h1>
              
              <motion.p 
                className="text-xl md:text-2xl text-text-primary font-medium mb-8"
                variants={ANIMATION_VARIANTS.fadeInUp}
              >
                <span className="text-primary-blue">89% accuracy</span> in predicting 
                relationship success with QuantumMatch™ AI
              </motion.p>
            </motion.div>

            {/* Slogan */}
            <motion.div
              variants={ANIMATION_VARIANTS.fadeInUp}
              className="mb-16"
            >
              <motion.blockquote 
                className="text-2xl md:text-3xl font-display italic text-primary-gold text-glow"
                variants={ANIMATION_VARIANTS.glowPulse}
              >
                "Screen of the Compliment is a bridge, not a trap"
              </motion.blockquote>
            </motion.div>
          </motion.div>
        </div>

        {/* Technology Cards Section */}
        <motion.div
          id="features"
          initial="initial"
          animate="animate"
          variants={ANIMATION_VARIANTS.staggerContainer}
          className="scroll-snap-section"
        >
          <motion.h2 
            className="text-3xl md:text-4xl font-display font-bold text-center mb-4"
            variants={ANIMATION_VARIANTS.fadeInUp}
          >
            Our <span className="text-gradient-blue">Technology</span>
          </motion.h2>
          
          <motion.p 
            className="text-lg text-text-secondary text-center mb-12 max-w-2xl mx-auto"
            variants={ANIMATION_VARIANTS.fadeInUp}
          >
            Four revolutionary AI systems working together to create the most accurate 
            compatibility prediction platform ever built
          </motion.p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {TECHNOLOGY_CARDS.map((tech, index) => (
              <motion.div
                key={tech.id}
                variants={ANIMATION_VARIANTS.fadeInUp}
                custom={index}
                whileHover={{ y: -8 }}
                className="group"
              >
                <TechnologyCard
                  technology={tech}
                  isSelected={selectedTech === tech.id}
                  onSelect={() => setSelectedTech(selectedTech === tech.id ? null : tech.id)}
                  index={index}
                />
              </motion.div>
            ))}
          </div>

          {/* Stats Row */}
          <motion.div
            variants={ANIMATION_VARIANTS.fadeInUp}
            className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16 pt-16 border-t border-primary-blue/20"
          >
            <div className="text-center">
              <motion.div 
                className="text-3xl md:text-4xl font-bold text-primary-blue mb-2"
                variants={ANIMATION_VARIANTS.glowPulse}
              >
                89%
              </motion.div>
              <div className="text-sm text-text-secondary">Accuracy Rate</div>
            </div>
            <div className="text-center">
              <motion.div 
                className="text-3xl md:text-4xl font-bold text-primary-gold mb-2"
                variants={ANIMATION_VARIANTS.glowPulse}
              >
                4.2
              </motion.div>
              <div className="text-sm text-text-secondary">Years Saved</div>
            </div>
            <div className="text-center">
              <motion.div 
                className="text-3xl md:text-4xl font-bold text-secondary-purple mb-2"
                variants={ANIMATION_VARIANTS.glowPulse}
              >
                2.8K
              </motion.div>
              <div className="text-sm text-text-secondary">Beta Users</div>
            </div>
            <div className="text-center">
              <motion.div 
                className="text-3xl md:text-4xl font-bold text-tetra-green mb-2"
                variants={ANIMATION_VARIANTS.glowPulse}
              >
                3
              </motion.div>
              <div className="text-sm text-text-secondary">Patents Pending</div>
            </div>
          </motion.div>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          variants={ANIMATION_VARIANTS.fadeInUp}
          className="text-center mt-16"
        >
          <motion.button
            className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-primary-blue to-secondary-purple text-white rounded-lg font-semibold text-lg hover:shadow-glow-blue transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              const element = document.getElementById('wishlist');
              element?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            Join Early Access
            <svg 
              className="ml-2 w-5 h-5" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M13 7l5 5m0 0l-5 5m5-5H6" 
              />
            </svg>
          </motion.button>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2, duration: 1 }}
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-6 h-10 border-2 border-primary-blue/50 rounded-full flex justify-center"
        >
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-1 h-3 bg-primary-blue rounded-full mt-2"
          />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;