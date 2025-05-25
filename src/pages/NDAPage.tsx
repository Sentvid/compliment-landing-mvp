import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useAuthStore } from '@/lib/store';
import { supabase } from '@/lib/supabase';
import { ANIMATION_VARIANTS } from '@/lib/constants';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import Header from '@/components/sections/Header';
import Footer from '@/components/sections/Footer';

const NDAPage: React.FC = () => {
  const { user } = useAuthStore();
  const [formData, setFormData] = useState({
    full_name: user?.full_name || '',
    company: user?.company || '',
    position: user?.position || '',
    email: user?.email || '',
    signature_text: '',
  });
  const [agreed, setAgreed] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      setError('Please sign in first to access NDA');
      return;
    }

    if (!agreed) {
      setError('Please agree to the NDA terms');
      return;
    }

    if (!formData.signature_text.trim()) {
      setError('Please provide your digital signature');
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      const { error: ndaError } = await supabase
        .from('nda_signatures')
        .insert({
          user_id: user.id,
          full_name: formData.full_name,
          company: formData.company,
          position: formData.position,
          email: formData.email,
          signature_text: formData.signature_text,
          ip_address: null, // Will be set by server
          user_agent: navigator.userAgent,
        });

      if (ndaError) {
        throw ndaError;
      }

      setIsSubmitted(true);
    } catch (err) {
      console.error('NDA submission error:', err);
      setError('Failed to submit NDA. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-primary-dark">
        <Header />
        <main className="pt-20 section-padding">
          <div className="section-container">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="max-w-2xl mx-auto text-center"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                className="w-20 h-20 bg-gradient-to-r from-tetra-green to-primary-blue rounded-full flex items-center justify-center mx-auto mb-6"
              >
                <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </motion.div>

              <h1 className="text-3xl md:text-4xl font-display font-bold mb-4">
                NDA Successfully <span className="text-gradient-blue">Signed</span>
              </h1>

              <p className="text-lg text-text-secondary mb-8">
                Thank you for signing our Non-Disclosure Agreement. You now have access to 
                confidential technical documentation and investor materials.
              </p>

              <div className="space-y-4">
                <motion.a
                  href="/glossary"
                  className="inline-flex items-center px-8 py-3 bg-gradient-to-r from-primary-blue to-secondary-purple text-white rounded-lg font-semibold hover:shadow-glow-blue transition-all duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Access Technical Glossary
                  <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </motion.a>

                <div>
                  <motion.a
                    href="/"
                    className="text-primary-gold hover:text-primary-gold/80 transition-colors underline"
                    whileHover={{ scale: 1.05 }}
                  >
                    Return to Homepage
                  </motion.a>
                </div>
              </div>
            </motion.div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-primary-dark">
      <Header />
      
      <main className="pt-20">
        <section className="section-padding">
          <div className="section-container">
            <motion.div
              initial="initial"
              animate="animate"
              variants={ANIMATION_VARIANTS.staggerContainer}
              className="max-w-4xl mx-auto"
            >
              <div className="text-center mb-12">
                <motion.h1 
                  className="text-4xl md:text-5xl font-display font-bold mb-6"
                  variants={ANIMATION_VARIANTS.fadeInUp}
                >
                  Non-Disclosure <span className="text-gradient-gold">Agreement</span>
                </motion.h1>
                
                <motion.p 
                  className="text-xl text-text-secondary max-w-2xl mx-auto"
                  variants={ANIMATION_VARIANTS.fadeInUp}
                >
                  Access confidential technical documentation and investor materials
                </motion.p>
              </div>

              <div className="grid lg:grid-cols-2 gap-12">
                {/* NDA Text */}
                <motion.div 
                  variants={ANIMATION_VARIANTS.slideInFromLeft}
                  className="space-y-6"
                >
                  <div className="bg-primary-dark/50 border border-primary-blue/20 rounded-lg p-6 max-h-96 overflow-y-auto">
                    <h2 className="text-xl font-semibold text-primary-blue mb-4">
                      MUTUAL NON-DISCLOSURE AGREEMENT
                    </h2>
                    
                    <div className="space-y-4 text-sm text-text-secondary leading-relaxed">
                      <p>
                        This Mutual Non-Disclosure Agreement ("Agreement") is entered into between 
                        Compliment Technologies, Inc. ("Company") and the undersigned party ("Recipient").
                      </p>
                      
                      <div>
                        <h3 className="font-semibold text-text-primary mb-2">1. CONFIDENTIAL INFORMATION</h3>
                        <p>
                          "Confidential Information" includes all technical, business, financial, and other 
                          information relating to QuantumMatch™ AI technology, Tetrahedron AI algorithms, 
                          verification systems, blockchain implementations, business plans, financial 
                          projections, customer data, and any other proprietary information disclosed 
                          by Company.
                        </p>
                      </div>

                      <div>
                        <h3 className="font-semibold text-text-primary mb-2">2. OBLIGATIONS</h3>
                        <p>
                          Recipient agrees to: (a) hold all Confidential Information in strict confidence; 
                          (b) not disclose Confidential Information to third parties without prior written consent; 
                          (c) use Confidential Information solely for evaluation purposes; (d) protect 
                          Confidential Information with the same degree of care used for own confidential information.
                        </p>
                      </div>

                      <div>
                        <h3 className="font-semibold text-text-primary mb-2">3. TERM</h3>
                        <p>
                          This Agreement shall remain in effect for five (5) years from the date of signature, 
                          unless terminated earlier by mutual written consent.
                        </p>
                      </div>

                      <div>
                        <h3 className="font-semibold text-text-primary mb-2">4. RETURN OF INFORMATION</h3>
                        <p>
                          Upon termination or upon Company's request, Recipient shall return or destroy 
                          all Confidential Information and any copies thereof.
                        </p>
                      </div>

                      <div>
                        <h3 className="font-semibold text-text-primary mb-2">5. GOVERNING LAW</h3>
                        <p>
                          This Agreement shall be governed by the laws of Delaware, United States, 
                          without regard to conflict of law principles.
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Signature Form */}
                <motion.div 
                  variants={ANIMATION_VARIANTS.slideInFromRight}
                  className="bg-gradient-to-br from-primary-dark/80 to-primary-dark/60 border border-primary-gold/30 rounded-lg p-8"
                >
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <h2 className="text-2xl font-display font-semibold text-primary-gold mb-6">
                      Digital Signature
                    </h2>

                    <Input
                      label="Full Name"
                      name="full_name"
                      value={formData.full_name}
                      onChange={handleInputChange}
                      required
                      placeholder="Your full legal name"
                    />

                    <Input
                      label="Company"
                      name="company"
                      value={formData.company}
                      onChange={handleInputChange}
                      required
                      placeholder="Your company or organization"
                    />

                    <Input
                      label="Position"
                      name="position"
                      value={formData.position}
                      onChange={handleInputChange}
                      required
                      placeholder="Your job title or role"
                    />

                    <Input
                      label="Email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      placeholder="Your email address"
                    />

                    <Input
                      label="Digital Signature"
                      name="signature_text"
                      value={formData.signature_text}
                      onChange={handleInputChange}
                      required
                      placeholder="Type your full name as digital signature"
                      helperText="By typing your name, you agree to be legally bound by this NDA"
                    />

                    <div className="flex items-start space-x-3">
                      <input
                        type="checkbox"
                        id="nda-agreement"
                        checked={agreed}
                        onChange={(e) => setAgreed(e.target.checked)}
                        className="mt-1 w-4 h-4 text-primary-blue bg-primary-dark border-primary-blue/30 rounded focus:ring-primary-blue/20 focus:ring-2"
                      />
                      <label htmlFor="nda-agreement" className="text-sm text-text-secondary">
                        I have read and agree to the terms of this Non-Disclosure Agreement. 
                        I understand that this creates a legally binding obligation to maintain 
                        confidentiality of all disclosed information.
                      </label>
                    </div>

                    {error && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-red-400 text-sm"
                      >
                        {error}
                      </motion.div>
                    )}

                    <Button
                      type="submit"
                      variant="primary"
                      size="lg"
                      isLoading={isSubmitting}
                      disabled={!agreed || isSubmitting}
                      className="w-full"
                    >
                      {isSubmitting ? 'Signing NDA...' : 'Sign NDA & Access Materials'}
                    </Button>

                    <div className="text-xs text-text-secondary text-center">
                      <p>
                        By signing this NDA, you acknowledge that you have the authority to 
                        enter into this agreement on behalf of yourself and/or your organization.
                      </p>
                    </div>
                  </form>
                </motion.div>
              </div>

              <motion.div
                variants={ANIMATION_VARIANTS.fadeInUp}
                className="mt-12 text-center"
              >
                <div className="bg-primary-dark/30 border border-primary-blue/20 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-primary-blue mb-3">
                    What you'll get access to:
                  </h3>
                  <div className="grid md:grid-cols-3 gap-4 text-sm text-text-secondary">
                    <div>
                      <div className="text-primary-gold font-medium mb-1">Technical Documentation</div>
                      <p>Detailed specifications of our AI algorithms and architecture</p>
                    </div>
                    <div>
                      <div className="text-primary-blue font-medium mb-1">Business Intelligence</div>
                      <p>Market analysis, competitive landscape, and growth projections</p>
                    </div>
                    <div>
                      <div className="text-tetra-green font-medium mb-1">Investment Materials</div>
                      <p>Financial models, funding requirements, and partnership opportunities</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default NDAPage;