import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { cn } from '../../lib/utils';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  closeOnOverlayClick?: boolean;
  closeOnEscape?: boolean;
  className?: string;
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  size = 'md',
  closeOnOverlayClick = true,
  closeOnEscape = true,
  className
}) => {
  // Handle escape key
  useEffect(() => {
    if (!closeOnEscape) return;
    
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose, closeOnEscape]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const sizeClasses = {
    sm: 'max-w-md',
    md: 'max-w-lg',
    lg: 'max-w-2xl',
    xl: 'max-w-4xl'
  };

  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 }
  };

  const modalVariants = {
    hidden: { 
      opacity: 0, 
      scale: 0.8,
      y: 20
    },
    visible: { 
      opacity: 1, 
      scale: 1,
      y: 0,
      transition: {
        type: 'spring',
        damping: 25,
        stiffness: 300
      }
    },
    exit: {
      opacity: 0,
      scale: 0.8,
      y: 20,
      transition: {
        duration: 0.2
      }
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Overlay */}
          <motion.div
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            onClick={closeOnOverlayClick ? onClose : undefined}
          />
          
          {/* Modal */}
          <motion.div
            className={cn(
              'relative w-full bg-gradient-to-b from-primary-dark via-primary-dark/98 to-primary-dark border border-primary-blue/30 rounded-xl shadow-2xl shadow-primary-blue/10 overflow-hidden',
              sizeClasses[size],
              className
            )}
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Animated border glow */}
            <div className="absolute inset-0 bg-gradient-to-r from-primary-blue/20 via-secondary-purple/20 to-primary-gold/20 rounded-xl blur-xl" />
            
            {/* Content wrapper */}
            <div className="relative bg-primary-dark/95 rounded-xl">
              {/* Header */}
              {title && (
                <div className="flex items-center justify-between p-6 border-b border-primary-blue/20">
                  <h2 className="text-xl font-cinzel text-primary-blue">
                    {title}
                  </h2>
                  <button
                    onClick={onClose}
                    className="p-1 text-text-secondary hover:text-primary-blue transition-colors duration-200 rounded-full hover:bg-primary-blue/10"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>
              )}
              
              {/* Close button (when no title) */}
              {!title && (
                <button
                  onClick={onClose}
                  className="absolute top-4 right-4 z-10 p-2 text-text-secondary hover:text-primary-blue transition-colors duration-200 rounded-full hover:bg-primary-blue/10"
                >
                  <X className="w-6 h-6" />
                </button>
              )}
              
              {/* Content */}
              <div className={cn('p-6', title && 'pt-0')}>
                {children}
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};