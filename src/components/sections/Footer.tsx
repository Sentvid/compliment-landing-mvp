import React from 'react';
import { motion } from 'framer-motion';
import { useUIStore } from '@/lib/store';
import { CONTACT_INFO, ANIMATION_VARIANTS } from '@/lib/constants';
import { Button } from '@/components/ui/Button';

const Footer: React.FC = () => {
  const { openModal } = useUIStore();

  const socialLinks = [
    {
      name: 'LinkedIn',
      url: 'https://linkedin.com/company/compliment-tech',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
        </svg>
      )
    },
    {
      name: 'Twitter',
      url: 'https://twitter.com/compliment_tech',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
        </svg>
      )
    },
    {
      name: 'GitHub',
      url: 'https://github.com/compliment-tech',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
        </svg>
      )
    }
  ];

  const quickLinks = [
    { name: 'Technology', href: '#features' },
    { name: 'Demo Video', href: '#video' },
    { name: 'Early Access', href: '#wishlist' },
    { name: 'FAQ', href: '/faq' },
    { name: 'Glossary', href: '/glossary' },
  ];

  const legalLinks = [
    { name: 'Privacy Policy', href: '/privacy' },
    { name: 'Terms of Service', href: '/terms' },
    { name: 'NDA', href: '/nda' },
  ];

  return (
    <footer 
      id="footer" 
      className="bg-gradient-to-t from-primary-dark to-primary-dark/80 border-t border-primary-blue/20"
    >
      <div className="section-container py-16">
        <motion.div
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, amount: 0.3 }}
          variants={ANIMATION_VARIANTS.staggerContainer}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12"
        >
          {/* Company Info */}
          <motion.div variants={ANIMATION_VARIANTS.fadeInUp} className="lg:col-span-2">
            <motion.h3 
              className="text-2xl font-display font-bold text-primary-blue mb-4"
              whileHover={{ textShadow: '0 0 10px rgba(37, 198, 245, 0.5)' }}
            >
              Compliment
            </motion.h3>
            <p className="text-text-secondary mb-6 leading-relaxed">
              Revolutionary AI platform using QuantumMatch™ technology to predict long-term 
              relationship compatibility with 89% accuracy. Invest in the future of meaningful connections.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <svg className="w-4 h-4 text-primary-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <a 
                  href={`mailto:${CONTACT_INFO.email}`}
                  className="text-text-secondary hover:text-primary-gold transition-colors"
                >
                  {CONTACT_INFO.email}
                </a>
              </div>
              
              <div className="flex items-center space-x-3">
                <svg className="w-4 h-4 text-primary-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span className="text-text-secondary">Global • Remote First</span>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex space-x-4 mt-6">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-primary-dark/50 border border-primary-blue/30 rounded-lg text-text-secondary hover:text-primary-blue hover:border-primary-blue/60 transition-all duration-300"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label={`Follow us on ${social.name}`}
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div variants={ANIMATION_VARIANTS.fadeInUp}>
            <h4 className="text-lg font-semibold text-text-primary mb-4">Quick Links</h4>
            <nav className="space-y-3">
              {quickLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="block text-text-secondary hover:text-primary-blue transition-colors"
                >
                  {link.name}
                </a>
              ))}
            </nav>
          </motion.div>

          {/* Legal & Actions */}
          <motion.div variants={ANIMATION_VARIANTS.fadeInUp}>
            <h4 className="text-lg font-semibold text-text-primary mb-4">Legal & More</h4>
            <nav className="space-y-3 mb-6">
              {legalLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="block text-text-secondary hover:text-primary-blue transition-colors"
                >
                  {link.name}
                </a>
              ))}
            </nav>

            {/* Action Buttons */}
            <div className="space-y-3">
              <Button
                variant="secondary"
                size="sm"
                onClick={() => openModal('feedback')}
                className="w-full"
              >
                Send Feedback
              </Button>
              
              <Button
                variant="primary"
                size="sm"
                onClick={() => window.location.href = '/nda'}
                className="w-full"
              >
                Accept NDA
              </Button>
            </div>
          </motion.div>
        </motion.div>

        {/* Bottom Bar */}
        <motion.div
          variants={ANIMATION_VARIANTS.fadeInUp}
          className="pt-8 border-t border-primary-blue/20"
        >
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-text-secondary text-sm">
              © 2025 Compliment Technologies. All rights reserved.
            </div>
            
            <div className="flex items-center space-x-6 text-sm text-text-secondary">
              <span>Made with ❤️ for meaningful connections</span>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-tetra-green rounded-full animate-pulse" />
                <span>System Operational</span>
              </div>
            </div>
          </div>

          {/* Investment Notice */}
          <motion.div
            variants={ANIMATION_VARIANTS.fadeInUp}
            className="mt-6 p-4 bg-primary-dark/30 border border-primary-gold/30 rounded-lg text-center"
          >
            <p className="text-sm text-text-secondary">
              <span className="text-primary-gold font-semibold">Investment Opportunity:</span> 
              {' '}Seeking $2M seed funding to revolutionize the $500B relationship market. 
              <button
                onClick={() => openModal('auth')}
                className="text-primary-blue hover:text-primary-blue/80 transition-colors ml-1 underline"
              >
                Contact for pitch deck
              </button>
            </p>
          </motion.div>

          {/* Legal Disclaimer */}
          <div className="mt-4 text-xs text-text-secondary/60 text-center">
            This website contains forward-looking statements about Compliment Technologies. 
            Past performance does not guarantee future results. Investment involves risk.
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;