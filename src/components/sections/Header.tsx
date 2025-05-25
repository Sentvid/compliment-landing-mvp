import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuthStore, useUIStore } from '@/lib/store';
import { Button } from '@/components/ui/Button';

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const { user, permissions } = useAuthStore();
  const { openModal, isMobileMenuOpen, toggleMobileMenu } = useUIStore();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleAuthAction = () => {
    if (user) {
      // User is logged in, show profile menu or sign out
      openModal('auth');
    } else {
      // User is not logged in, show sign in modal
      openModal('auth');
    }
  };

  const handleGlossaryClick = () => {
    if (!user) {
      openModal('auth');
    } else if (!permissions.canViewGlossary) {
      window.location.href = '/nda';
    } else {
      window.location.href = '/glossary';
    }
  };

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-primary-dark/90 backdrop-blur-md border-b border-primary-blue/20' 
          : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <motion.div
            className="flex items-center cursor-pointer"
            onClick={() => scrollToSection('hero')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.h1
              className="text-2xl lg:text-3xl font-display font-bold text-primary-blue"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              <motion.span
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3, duration: 0.1 }}
              >
                C
              </motion.span>
              <motion.span
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4, duration: 0.1 }}
              >
                o
              </motion.span>
              <motion.span
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5, duration: 0.1 }}
              >
                m
              </motion.span>
              <motion.span
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6, duration: 0.1 }}
              >
                p
              </motion.span>
              <motion.span
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7, duration: 0.1 }}
              >
                l
              </motion.span>
              <motion.span
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8, duration: 0.1 }}
              >
                i
              </motion.span>
              <motion.span
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.9, duration: 0.1 }}
              >
                m
              </motion.span>
              <motion.span
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.0, duration: 0.1 }}
              >
                e
              </motion.span>
              <motion.span
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.1, duration: 0.1 }}
              >
                n
              </motion.span>
              <motion.span
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.2, duration: 0.1 }}
              >
                t
              </motion.span>
            </motion.h1>
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8" role="navigation" aria-label="Main navigation">
            <button
              onClick={() => scrollToSection('features')}
              className="nav-link"
              aria-label="View technology features"
            >
              Features
            </button>
            <button
              onClick={() => scrollToSection('video')}
              className="nav-link"
              aria-label="Watch product demo"
            >
              Demo
            </button>
            <button
              onClick={() => scrollToSection('wishlist')}
              className="nav-link"
              aria-label="Join early access wishlist"
            >
              Wishlist
            </button>
            <a
              href="/faq"
              className="nav-link"
              aria-label="Frequently asked questions"
            >
              FAQ
            </a>
            <button
              onClick={handleGlossaryClick}
              className="nav-link"
              aria-label="Technical glossary (requires NDA)"
            >
              Glossary
              {!permissions.canViewGlossary && (
                <span className="ml-1 text-xs text-primary-gold">NDA</span>
              )}
            </button>
          </nav>

          {/* Auth Button */}
          <div className="hidden lg:flex items-center space-x-4">
            <Button
              variant="primary"
              size="sm"
              onClick={handleAuthAction}
              aria-label={user ? 'User account' : 'Sign in or register'}
            >
              {user ? `Hello, ${user.full_name || user.email}` : 'Investor Access'}
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 text-text-secondary hover:text-text-primary transition-colors"
            onClick={toggleMobileMenu}
            aria-label="Toggle mobile menu"
            aria-expanded={isMobileMenuOpen}
          >
            <motion.div className="w-6 h-6 flex flex-col justify-center items-center">
              <motion.span
                className="w-6 h-0.5 bg-current transition-all duration-300"
                animate={{
                  rotate: isMobileMenuOpen ? 45 : 0,
                  y: isMobileMenuOpen ? 2 : 0,
                }}
              />
              <motion.span
                className="w-6 h-0.5 bg-current transition-all duration-300 mt-1"
                animate={{
                  opacity: isMobileMenuOpen ? 0 : 1,
                }}
              />
              <motion.span
                className="w-6 h-0.5 bg-current transition-all duration-300 mt-1"
                animate={{
                  rotate: isMobileMenuOpen ? -45 : 0,
                  y: isMobileMenuOpen ? -2 : 0,
                }}
              />
            </motion.div>
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="lg:hidden overflow-hidden bg-primary-dark/95 backdrop-blur-md border-t border-primary-blue/20"
            >
              <nav className="py-4 space-y-4" role="navigation" aria-label="Mobile navigation">
                <button
                  onClick={() => {
                    scrollToSection('features');
                    toggleMobileMenu();
                  }}
                  className="block w-full text-left px-4 py-2 text-text-secondary hover:text-text-primary transition-colors"
                >
                  Features
                </button>
                <button
                  onClick={() => {
                    scrollToSection('video');
                    toggleMobileMenu();
                  }}
                  className="block w-full text-left px-4 py-2 text-text-secondary hover:text-text-primary transition-colors"
                >
                  Demo
                </button>
                <button
                  onClick={() => {
                    scrollToSection('wishlist');
                    toggleMobileMenu();
                  }}
                  className="block w-full text-left px-4 py-2 text-text-secondary hover:text-text-primary transition-colors"
                >
                  Wishlist
                </button>
                <a
                  href="/faq"
                  className="block px-4 py-2 text-text-secondary hover:text-text-primary transition-colors"
                >
                  FAQ
                </a>
                <button
                  onClick={() => {
                    handleGlossaryClick();
                    toggleMobileMenu();
                  }}
                  className="block w-full text-left px-4 py-2 text-text-secondary hover:text-text-primary transition-colors"
                >
                  Glossary {!permissions.canViewGlossary && <span className="text-xs text-primary-gold">NDA</span>}
                </button>
                <div className="px-4 pt-4 border-t border-primary-blue/20">
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => {
                      handleAuthAction();
                      toggleMobileMenu();
                    }}
                    className="w-full"
                  >
                    {user ? `Hello, ${user.full_name || user.email}` : 'Investor Access'}
                  </Button>
                </div>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
};

export default Header;