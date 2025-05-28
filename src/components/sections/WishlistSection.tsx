import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, CheckCircle, AlertCircle } from 'lucide-react';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { supabase } from '../../lib/supabase';

interface WishlistSectionProps {
  className?: string;
}

export const WishlistSection: React.FC<WishlistSectionProps> = ({ className = '' }) => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !email.includes('@')) {
      setStatus('error');
      setErrorMessage('Please enter a valid email address');
      return;
    }

    setStatus('loading');
    setErrorMessage('');

    try {
      // Get UTM parameters from URL
      const urlParams = new URLSearchParams(window.location.search);
      const utmSource = urlParams.get('utm_source') || null;
      const utmMedium = urlParams.get('utm_medium') || null;
      const utmCampaign = urlParams.get('utm_campaign') || null;

      const { error } = await supabase
        .from('wishlist')
        .insert([
          {
            email: email.toLowerCase().trim(),
            ip_address: null, // Will be handled by Supabase Edge Function if needed
            user_agent: navigator.userAgent,
            referrer: document.referrer || null,
            utm_source: utmSource,
            utm_medium: utmMedium,
            utm_campaign: utmCampaign,
          }
        ]);

      if (error) {
        if (error.code === '23505') { // Unique constraint violation
          setStatus('error');
          setErrorMessage('This email is already on our wishlist!');
        } else {
          throw error;
        }
      } else {
        setStatus('success');
        setEmail('');
        
        // Track conversion event
        if (typeof gtag !== 'undefined') {
          gtag('event', 'wishlist_signup', {
            'event_category': 'engagement',
            'event_label': 'email_signup'
          });
        }
      }
    } catch (error) {
      console.error('Error adding to wishlist:', error);
      setStatus('error');
      setErrorMessage('Something went wrong. Please try again.');
    }
  };

  const benefits = [
    'First access to revolutionary AI matching technology',
    'Exclusive investor updates and partnership opportunities',
    'Early preview of scientific breakthroughs in relationship prediction',
    'VIP invitation to private demo sessions and beta testing',
    'Direct access to founding team insights and progress reports'
  ];

  return (
    <section className={`py-20 px-4 bg-gradient-to-b from-primary-dark via-primary-dark/95 to-primary-dark ${className}`}>
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-cinzel text-primary-blue mb-6">
            Join the Revolution
          </h2>
          
          <p className="text-xl text-text-secondary max-w-2xl mx-auto mb-12">
            Be among the first to experience AI that mathematically predicts 
            long-term relationship compatibility. Join our exclusive wishlist 
            for early access and investor opportunities.
          </p>

          {/* Benefits List */}
          <motion.div
            className="grid gap-4 max-w-3xl mx-auto mb-12 text-left"
            variants={{
              hidden: {},
              visible: {
                transition: {
                  staggerChildren: 0.1
                }
              }
            }}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                className="flex items-start gap-3 p-4 rounded-lg bg-gradient-to-r from-primary-blue/10 to-secondary-purple/10 border border-primary-gold/20"
                variants={{
                  hidden: { opacity: 0, x: -20 },
                  visible: { opacity: 1, x: 0 }
                }}
              >
                <CheckCircle className="w-6 h-6 text-primary-gold flex-shrink-0 mt-0.5" />
                <span className="text-text-primary">{benefit}</span>
              </motion.div>
            ))}
          </motion.div>

          {/* Email Form */}
          <motion.div
            className="max-w-md mx-auto"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
          >
            {status === 'success' ? (
              <motion.div
                className="flex items-center justify-center gap-3 p-6 rounded-lg bg-success/20 border border-success/40"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                <CheckCircle className="w-8 h-8 text-success" />
                <div className="text-left">
                  <h3 className="text-lg font-semibold text-success">Welcome to the Future!</h3>
                  <p className="text-sm text-success/80">You're now on our exclusive wishlist.</p>
                </div>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="relative">
                  <Input
                    type="email"
                    placeholder="Enter your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-12"
                    disabled={status === 'loading'}
                    error={status === 'error'}
                  />
                  <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-text-secondary" />
                </div>

                {status === 'error' && (
                  <motion.div
                    className="flex items-center gap-2 text-error text-sm"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <AlertCircle className="w-4 h-4" />
                    {errorMessage}
                  </motion.div>
                )}

                <Button
                  type="submit"
                  size="lg"
                  disabled={status === 'loading'}
                  className="w-full"
                >
                  {status === 'loading' ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Joining Wishlist...
                    </div>
                  ) : (
                    'Join Wishlist'
                  )}
                </Button>

                <p className="text-xs text-text-secondary">
                  By joining, you agree to receive updates about Compliment. 
                  We respect your privacy and won't share your information.
                </p>
              </form>
            )}
          </motion.div>

          {/* Stats */}
          <motion.div
            className="flex justify-center gap-8 mt-12 pt-8 border-t border-primary-gold/20"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            viewport={{ once: true }}
          >
            <div className="text-center">
              <div className="text-2xl font-bold text-primary-gold">89%</div>
              <div className="text-sm text-text-secondary">Accuracy Rate</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary-blue">$500B</div>
              <div className="text-sm text-text-secondary">Market Size</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-secondary-purple">2025</div>
              <div className="text-sm text-text-secondary">Launch Year</div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};