import React, { forwardRef } from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../lib/utils';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: boolean;
  errorMessage?: string;
  helperText?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ 
    label, 
    error = false, 
    errorMessage, 
    helperText, 
    leftIcon, 
    rightIcon, 
    className, 
    ...props 
  }, ref) => {
    const baseClasses = 'w-full px-4 py-3 bg-primary-dark/80 border rounded-lg text-text-primary placeholder-text-secondary transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-0 backdrop-blur-sm';
    
    const borderClasses = error 
      ? 'border-error focus:border-error focus:ring-error/20' 
      : 'border-primary-blue/30 hover:border-primary-blue/50 focus:border-primary-blue focus:ring-primary-blue/20';
    
    const glowClasses = error 
      ? 'focus:shadow-lg focus:shadow-error/25' 
      : 'focus:shadow-lg focus:shadow-primary-blue/25';

    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm font-medium text-text-primary mb-2">
            {label}
          </label>
        )}
        
        <div className="relative">
          {leftIcon && (
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-secondary">
              {leftIcon}
            </div>
          )}
          
          <motion.input
            ref={ref}
            className={cn(
              baseClasses,
              borderClasses,
              glowClasses,
              leftIcon && 'pl-10',
              rightIcon && 'pr-10',
              className
            )}
            whileFocus={{ scale: 1.01 }}
            transition={{ duration: 0.2 }}
            {...props}
          />
          
          {rightIcon && (
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-text-secondary">
              {rightIcon}
            </div>
          )}
          
          {/* Animated border glow effect */}
          <motion.div
            className={cn(
              'absolute inset-0 rounded-lg pointer-events-none',
              error ? 'bg-gradient-to-r from-error/20 to-error/10' : 'bg-gradient-to-r from-primary-blue/20 to-secondary-purple/10'
            )}
            initial={{ opacity: 0 }}
            whileFocus={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          />
        </div>
        
        {/* Error message */}
        {error && errorMessage && (
          <motion.p
            className="mt-2 text-sm text-error flex items-center gap-1"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            {errorMessage}
          </motion.p>
        )}
        
        {/* Helper text */}
        {!error && helperText && (
          <p className="mt-2 text-sm text-text-secondary">
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';