import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../lib/utils';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled,
  children,
  className,
  ...props
}) => {
  const baseClasses = 'inline-flex items-center justify-center font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-blue/50 disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden';
  
  const variants = {
    primary: 'bg-gradient-to-r from-primary-blue to-secondary-purple text-white border border-white/10 hover:shadow-lg hover:shadow-primary-blue/25 hover:-translate-y-0.5 active:translate-y-0',
    secondary: 'bg-transparent border-2 border-primary-gold text-primary-gold hover:bg-primary-gold/10 hover:shadow-lg hover:shadow-primary-gold/25',
    outline: 'bg-transparent border border-text-secondary text-text-primary hover:bg-white/5 hover:border-primary-blue hover:text-primary-blue',
    ghost: 'bg-transparent text-text-primary hover:bg-white/5'
  };
  
  const sizes = {
    sm: 'px-3 py-1.5 text-sm rounded',
    md: 'px-4 py-2 text-base rounded-md',
    lg: 'px-6 py-3 text-lg rounded-lg'
  };

  const clipPaths = {
    primary: '',
    secondary: 'clip-path: polygon(8px 0, 100% 0, 100% calc(100% - 8px), calc(100% - 8px) 100%, 0 100%, 0 8px)',
    outline: '',
    ghost: ''
  };

  return (
    <motion.button
      className={cn(
        baseClasses,
        variants[variant],
        sizes[size],
        className
      )}
      style={variant === 'secondary' ? { clipPath: 'polygon(8px 0, 100% 0, 100% calc(100% - 8px), calc(100% - 8px) 100%, 0 100%, 0 8px)' } : {}}
      disabled={disabled || loading}
      whileHover={{ scale: variant === 'primary' ? 1.02 : 1.01 }}
      whileTap={{ scale: 0.98 }}
      {...props}
    >
      {/* Shimmer effect for primary buttons */}
      {variant === 'primary' && (
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
          initial={{ x: '-100%' }}
          whileHover={{ x: '100%' }}
          transition={{ duration: 0.6, ease: 'easeInOut' }}
        />
      )}
      
      {/* Glow effect for secondary buttons */}
      {variant === 'secondary' && (
        <div className="absolute inset-0.5 bg-gradient-to-r from-primary-gold/20 to-primary-gold/10 opacity-0 hover:opacity-100 transition-opacity duration-300" 
             style={{ clipPath: 'inherit' }} />
      )}
      
      {/* Content */}
      <span className="relative z-10 flex items-center gap-2">
        {loading && (
          <motion.div
            className="w-4 h-4 border-2 border-current border-t-transparent rounded-full"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
          />
        )}
        {children}
      </span>
    </motion.button>
  );
};