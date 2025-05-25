import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { TechnologyCard as TechCardType } from '@/types';

interface TechnologyCardProps {
  technology: TechCardType;
  isSelected: boolean;
  onSelect: () => void;
  index: number;
}

const TechnologyCard: React.FC<TechnologyCardProps> = ({
  technology,
  isSelected,
  onSelect,
  index
}) => {
  const getIconComponent = (iconType: string) => {
    switch (iconType) {
      case 'quantum-mandala':
        return <QuantumMandalaIcon />;
      case 'tetrahedron-3d':
        return <TetrahedronIcon />;
      case 'trust-seal':
        return <TrustSealIcon />;
      case 'hologram-map':
        return <HologramMapIcon />;
      default:
        return <div className="w-20 h-20 bg-primary-blue/20 rounded-full" />;
    }
  };

  const getColorClasses = (color: string) => {
    switch (color) {
      case 'primary-blue':
        return 'border-primary-blue/30 hover:border-primary-blue/60 hover:shadow-glow-blue';
      case 'tetra-multi':
        return 'border-tetra-blue/30 hover:border-tetra-blue/60 hover:shadow-glow-blue';
      case 'primary-gold':
        return 'border-primary-gold/30 hover:border-primary-gold/60 hover:shadow-glow-gold';
      case 'secondary-purple':
        return 'border-secondary-purple/30 hover:border-secondary-purple/60 hover:shadow-glow-purple';
      default:
        return 'border-primary-blue/30 hover:border-primary-blue/60 hover:shadow-glow-blue';
    }
  };

  return (
    <motion.div
      className={`tech-card ${getColorClasses(technology.color)}`}
      layoutId={`card-${technology.id}`}
      data-tech-card
      tabIndex={0}
      role="button"
      aria-expanded={isSelected}
      aria-controls={`${technology.id}-details`}
      aria-label={`Learn more about ${technology.title}`}
      onClick={onSelect}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onSelect();
        }
      }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      {/* Icon */}
      <motion.div
        className={`tech-icon ${technology.icon} mb-4`}
        animate={{
          rotate: technology.icon === 'quantum-mandala' ? [0, 360] : 0,
        }}
        transition={{
          rotate: {
            duration: 10,
            repeat: Infinity,
            ease: 'linear',
          },
        }}
      >
        {getIconComponent(technology.icon)}
      </motion.div>

      {/* Title */}
      <motion.h3 
        className="text-xl font-display font-semibold text-text-primary mb-2"
        layoutId={`title-${technology.id}`}
      >
        {technology.title}
      </motion.h3>

      {/* Subtitle */}
      <motion.p 
        className="text-sm text-primary-gold font-medium mb-3"
        layoutId={`subtitle-${technology.id}`}
      >
        {technology.subtitle}
      </motion.p>

      {/* Description */}
      <motion.p 
        className="text-sm text-text-secondary leading-relaxed mb-4"
        layoutId={`description-${technology.id}`}
      >
        {technology.description}
      </motion.p>

      {/* Expand Indicator */}
      <motion.div
        className="flex items-center justify-center mt-auto"
        animate={{ rotate: isSelected ? 180 : 0 }}
        transition={{ duration: 0.3 }}
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

      {/* Expanded Details */}
      <AnimatePresence>
        {isSelected && (
          <motion.div
            id={`${technology.id}-details`}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="overflow-hidden mt-4 pt-4 border-t border-primary-blue/20"
          >
            <div className="space-y-4">
              {/* Technology */}
              <div>
                <h4 className="text-sm font-semibold text-primary-blue mb-2">Technology</h4>
                <ul className="text-xs text-text-secondary space-y-1">
                  {technology.details.technology.map((item, idx) => (
                    <li key={idx} className="flex items-start">
                      <span className="w-1 h-1 bg-primary-blue rounded-full mt-2 mr-2 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Features */}
              <div>
                <h4 className="text-sm font-semibold text-primary-gold mb-2">Features</h4>
                <ul className="text-xs text-text-secondary space-y-1">
                  {technology.details.features.map((item, idx) => (
                    <li key={idx} className="flex items-start">
                      <span className="w-1 h-1 bg-primary-gold rounded-full mt-2 mr-2 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Benefits */}
              <div>
                <h4 className="text-sm font-semibold text-tetra-green mb-2">Benefits</h4>
                <ul className="text-xs text-text-secondary space-y-1">
                  {technology.details.benefits.map((item, idx) => (
                    <li key={idx} className="flex items-start">
                      <span className="w-1 h-1 bg-tetra-green rounded-full mt-2 mr-2 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

// Icon Components
const QuantumMandalaIcon: React.FC = () => (
  <div className="relative w-20 h-20">
    <motion.div
      className="absolute inset-0 border-2 border-primary-blue rounded-full"
      animate={{ rotate: 360 }}
      transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
    />
    <motion.div
      className="absolute inset-2 border border-primary-blue/60 rounded-full"
      animate={{ rotate: -360 }}
      transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
    />
    <motion.div
      className="absolute inset-4 border border-primary-blue/40 rounded-full"
      animate={{ rotate: 360 }}
      transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
    />
    <div className="absolute inset-6 bg-primary-blue/20 rounded-full" />
  </div>
);

const TetrahedronIcon: React.FC = () => (
  <div className="relative w-20 h-20">
    <motion.div
      className="absolute inset-0"
      animate={{ rotateX: [0, 360], rotateY: [0, 360] }}
      transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
    >
      <div className="w-full h-full relative">
        <div className="absolute top-0 left-1/2 w-0 h-0 border-l-8 border-r-8 border-b-8 border-l-transparent border-r-transparent border-b-tetra-blue transform -translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-0 h-0 border-t-8 border-r-8 border-t-tetra-red border-r-transparent" />
        <div className="absolute bottom-0 right-0 w-0 h-0 border-t-8 border-l-8 border-t-tetra-green border-l-transparent" />
        <div className="absolute bottom-2 left-1/2 w-0 h-0 border-l-6 border-r-6 border-t-6 border-l-transparent border-r-transparent border-t-tetra-yellow transform -translate-x-1/2" />
      </div>
    </motion.div>
  </div>
);

const TrustSealIcon: React.FC = () => (
  <div className="relative w-20 h-20">
    <motion.div
      className="absolute inset-0 border-2 border-primary-gold rounded-lg transform rotate-45"
      animate={{ rotate: [45, 405] }}
      transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
    >
      <div className="absolute inset-2 bg-primary-gold/20 rounded-sm" />
    </motion.div>
    <div className="absolute top-1/2 left-1/2 w-8 h-8 transform -translate-x-1/2 -translate-y-1/2">
      <div className="w-full h-full border-2 border-primary-gold rounded-full bg-primary-gold/10 flex items-center justify-center">
        <svg className="w-4 h-4 text-primary-gold" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
        </svg>
      </div>
    </div>
  </div>
);

const HologramMapIcon: React.FC = () => (
  <div className="relative w-20 h-20">
    <motion.div
      className="absolute inset-0"
      animate={{ rotateY: [0, 360] }}
      transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
    >
      <div className="w-full h-full relative">
        <div className="absolute inset-0 bg-gradient-to-r from-secondary-purple/20 to-primary-blue/20 rounded-lg" />
        <div className="absolute top-2 left-2 w-3 h-3 bg-secondary-purple rounded-full animate-pulse" />
        <div className="absolute top-6 right-3 w-2 h-2 bg-primary-blue rounded-full animate-pulse animate-delay-200" />
        <div className="absolute bottom-4 left-4 w-2 h-2 bg-tetra-green rounded-full animate-pulse animate-delay-500" />
        <div className="absolute bottom-3 right-2 w-3 h-3 bg-primary-gold rounded-full animate-pulse animate-delay-300" />
        
        {/* Grid lines */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-1/4 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary-blue to-transparent" />
          <div className="absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-secondary-purple to-transparent" />
          <div className="absolute top-3/4 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary-gold to-transparent" />
          <div className="absolute top-0 bottom-0 left-1/4 w-px bg-gradient-to-b from-transparent via-primary-blue to-transparent" />
          <div className="absolute top-0 bottom-0 left-1/2 w-px bg-gradient-to-b from-transparent via-secondary-purple to-transparent" />
          <div className="absolute top-0 bottom-0 left-3/4 w-px bg-gradient-to-b from-transparent via-primary-gold to-transparent" />
        </div>
      </div>
    </motion.div>
  </div>
);

export default TechnologyCard;