import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAuthStore } from '@/lib/store';
import { supabase } from '@/lib/supabase';
import { ANIMATION_VARIANTS } from '@/lib/constants';
import Header from '@/components/sections/Header';
import Footer from '@/components/sections/Footer';

interface GlossaryTerm {
  id: string;
  term: string;
  category: string;
  definition: string;
  technical_details: string;
  related_patents?: string;
  research_links?: string[];
}

const GlossaryPage: React.FC = () => {
  const { user, hasSignedNDA } = useAuthStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isLoading, setIsLoading] = useState(true);
  const [hasAccess, setHasAccess] = useState(false);

  useEffect(() => {
    const checkAccess = async () => {
      if (!user) {
        setIsLoading(false);
        return;
      }

      try {
        // Check if user has signed NDA
        const { data, error } = await supabase
          .from('nda_signatures')
          .select('id')
          .eq('user_id', user.id)
          .single();

        if (!error && data) {
          setHasAccess(true);
        }
      } catch (err) {
        console.error('Error checking NDA status:', err);
      } finally {
        setIsLoading(false);
      }
    };

    checkAccess();
  }, [user]);

  // Mock glossary data - in real app would come from protected API
  const glossaryTerms: GlossaryTerm[] = [
    {
      id: '1',
      term: 'QuantumMatch™ AI',
      category: 'Core Technology',
      definition: 'Revolutionary compatibility prediction system using quantum-inspired algorithms combined with Graph Neural Networks and LSTM architecture.',
      technical_details: 'QuantumMatch™ processes over 400 compatibility factors through a hybrid GNN-LSTM architecture. The quantum-inspired component uses superposition principles to model multiple relationship possibilities simultaneously, while the GNN analyzes social graph connections and the LSTM component learns temporal relationship patterns.',
      related_patents: 'US Patent Application #18/123,456 - "Quantum-Inspired Relationship Compatibility Prediction System"',
      research_links: ['https://arxiv.org/quantum-social-networks', 'https://papers.compliment.tech/quantummatch-whitepaper']
    },
    {
      id: '2',
      term: 'Tetrahedron AI',
      category: 'Core Technology',
      definition: 'Four-dimensional personality analysis system mapping Emotional Harmony, Personal Values, Social Activity, and Creativity compatibility.',
      technical_details: 'Tetrahedron AI uses a 4-dimensional vector space where each vertex represents one core personality dimension. The system calculates compatibility by measuring the geometric distance between two personality tetrahedrons in this space, with machine learning algorithms optimizing the dimensional weights based on successful long-term relationships.',
      related_patents: 'US Patent Application #18/234,567 - "Multi-Dimensional Personality Compatibility Analysis"'
    },
    {
      id: '3',
      term: 'Shadow Scenarios™',
      category: 'Predictive Analytics',
      definition: 'Advanced simulation system that models how relationships evolve over time by predicting future compatibility scenarios.',
      technical_details: 'Shadow Scenarios™ employs Monte Carlo simulations running 10,000+ relationship timeline scenarios. The system factors in personality evolution, life stage changes, career trajectories, and major life events to predict relationship stability over 5-10 year periods with 89% accuracy.',
      research_links: ['https://papers.compliment.tech/shadow-scenarios-methodology']
    },
    {
      id: '4',
      term: 'Social Capital Index (SCI)',
      category: 'Blockchain & Web3',
      definition: 'Blockchain-based reputation system that quantifies authentic social capital and relationship-building behavior.',
      technical_details: 'SCI operates on a custom Layer 2 blockchain solution, recording verified social interactions, relationship outcomes, and community contributions. The index uses a Byzantine Fault Tolerant consensus mechanism to prevent gaming and ensures authentic reputation scoring. Smart contracts automatically update SCI scores based on verified relationship milestones.',
      related_patents: 'US Patent Application #18/345,678 - "Blockchain-Based Social Capital Measurement System"'
    },
    {
      id: '5',
      term: 'Verification Trinity',
      category: 'Security & Trust',
      definition: 'Three-layer identity verification system combining GPS location proof, QR code authentication, and NFC proximity detection.',
      technical_details: 'Layer 1: GPS verification with ±3 meter accuracy using satellite triangulation. Layer 2: Dynamic QR codes generated every 60 seconds with cryptographic signatures. Layer 3: NFC handshake protocol requiring physical proximity within 10cm. All three layers must validate simultaneously for verified meeting confirmation.',
    },
    {
      id: '6',
      term: 'Emotional Resonance Algorithm (ERA)',
      category: 'AI & Machine Learning',
      definition: 'Deep learning system that analyzes communication patterns to predict emotional compatibility and conflict resolution styles.',
      technical_details: 'ERA uses transformer-based natural language processing to analyze text communication patterns, emoji usage, response timing, and conversation flow. The algorithm identifies emotional intelligence markers, conflict resolution styles, and communication compatibility patterns with 94% accuracy in predicting relationship communication success.',
    }
  ];

  const categories = ['all', ...Array.from(new Set(glossaryTerms.map(term => term.category)))];

  const filteredTerms = glossaryTerms.filter(term => {
    const matchesSearch = term.term.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         term.definition.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         term.technical_details.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || term.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-primary-dark">
        <Header />
        <main className="pt-20 section-padding">
          <div className="section-container flex items-center justify-center">
            <div className="text-center">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                className="w-8 h-8 border-2 border-primary-blue border-t-transparent rounded-full mx-auto mb-4"
              />
              <p className="text-text-secondary">Verifying access permissions...</p>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!user || !hasAccess) {
    return (
      <div className="min-h-screen bg-primary-dark">
        <Header />
        <main className="pt-20 section-padding">
          <div className="section-container">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-2xl mx-auto text-center"
            >
              <div className="text-6xl mb-6">🔒</div>
              <h1 className="text-3xl md:text-4xl font-display font-bold mb-4">
                Access <span className="text-gradient-gold">Restricted</span>
              </h1>
              <p className="text-lg text-text-secondary mb-8">
                The technical glossary contains confidential information and requires 
                signing our Non-Disclosure Agreement (NDA) to access.
              </p>
              
              <div className="space-y-4">
                {!user ? (
                  <motion.button
                    onClick={() => window.location.href = '/'}
                    className="inline-flex items-center px-8 py-3 bg-gradient-to-r from-primary-blue to-secondary-purple text-white rounded-lg font-semibold hover:shadow-glow-blue transition-all duration-300"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Sign In to Continue
                    <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                    </svg>
                  </motion.button>
                ) : (
                  <motion.a
                    href="/nda"
                    className="inline-flex items-center px-8 py-3 bg-gradient-to-r from-primary-gold to-secondary-bronze text-white rounded-lg font-semibold hover:shadow-glow-gold transition-all duration-300"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Sign NDA to Access
                    <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                    </svg>
                  </motion.a>
                )}

                <div>
                  <motion.a
                    href="/"
                    className="text-primary-blue hover:text-primary-blue/80 transition-colors underline"
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
        {/* Hero Section */}
        <section className="section-padding bg-hero-pattern">
          <div className="section-container">
            <motion.div
              initial="initial"
              animate="animate"
              variants={ANIMATION_VARIANTS.staggerContainer}
              className="text-center mb-12"
            >
              <motion.div
                variants={ANIMATION_VARIANTS.fadeInUp}
                className="inline-flex items-center bg-primary-gold/10 border border-primary-gold/30 rounded-full px-6 py-2 mb-6"
              >
                <svg className="w-4 h-4 text-primary-gold mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                </svg>
                <span className="text-sm font-medium text-primary-gold">NDA Protected Content</span>
              </motion.div>

              <motion.h1 
                className="text-4xl md:text-5xl font-display font-bold mb-6"
                variants={ANIMATION_VARIANTS.fadeInUp}
              >
                Technical <span className="text-gradient-blue">Glossary</span>
              </motion.h1>
              
              <motion.p 
                className="text-xl text-text-secondary max-w-3xl mx-auto mb-8"
                variants={ANIMATION_VARIANTS.fadeInUp}
              >
                Comprehensive technical documentation of Compliment's proprietary AI technologies, 
                algorithms, and innovative relationship prediction systems.
              </motion.p>

              {/* Search & Filter */}
              <motion.div
                variants={ANIMATION_VARIANTS.fadeInUp}
                className="flex flex-col md:flex-row gap-4 max-w-2xl mx-auto"
              >
                <div className="flex-1 relative">
                  <input
                    type="text"
                    placeholder="Search terms and definitions..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full px-4 py-3 pl-12 bg-primary-dark/80 border border-primary-blue/30 rounded-lg text-text-primary placeholder:text-text-secondary/70 focus:outline-none focus:border-primary-blue focus:ring-1 focus:ring-primary-blue/20"
                  />
                  <svg
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-text-secondary"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>

                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="px-4 py-3 bg-primary-dark/80 border border-primary-blue/30 rounded-lg text-text-primary focus:outline-none focus:border-primary-blue focus:ring-1 focus:ring-primary-blue/20"
                >
                  {categories.map(category => (
                    <option key={category} value={category}>
                      {category === 'all' ? 'All Categories' : category}
                    </option>
                  ))}
                </select>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Glossary Terms */}
        <section className="section-padding">
          <div className="section-container">
            {filteredTerms.length === 0 ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center py-12"
              >
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-xl font-semibold text-text-primary mb-2">No terms found</h3>
                <p className="text-text-secondary">Try searching with different keywords or select a different category</p>
              </motion.div>
            ) : (
              <div className="max-w-4xl mx-auto space-y-8">
                {filteredTerms.map((term, index) => (
                  <motion.article
                    key={term.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-gradient-to-r from-primary-dark/80 to-primary-dark/60 border border-primary-blue/20 rounded-lg p-8 hover:border-primary-blue/40 transition-colors"
                  >
                    <div className="flex flex-col lg:flex-row lg:items-start lg:space-x-8">
                      <div className="flex-1">
                        <div className="flex items-center mb-4">
                          <span className="inline-block bg-primary-gold/20 text-primary-gold text-xs font-semibold px-2 py-1 rounded-full mr-3">
                            {term.category}
                          </span>
                          <h2 className="text-2xl font-display font-bold text-primary-blue">
                            {term.term}
                          </h2>
                        </div>

                        <p className="text-lg text-text-primary mb-4 leading-relaxed">
                          {term.definition}
                        </p>

                        <div className="bg-primary-dark/50 border border-primary-blue/10 rounded-lg p-4 mb-6">
                          <h3 className="text-sm font-semibold text-primary-gold mb-2 uppercase tracking-wide">
                            Technical Implementation
                          </h3>
                          <p className="text-text-secondary text-sm leading-relaxed">
                            {term.technical_details}
                          </p>
                        </div>

                        {term.related_patents && (
                          <div className="mb-4">
                            <h3 className="text-sm font-semibold text-tetra-green mb-2">Related Patents</h3>
                            <p className="text-text-secondary text-sm">{term.related_patents}</p>
                          </div>
                        )}

                        {term.research_links && term.research_links.length > 0 && (
                          <div>
                            <h3 className="text-sm font-semibold text-secondary-purple mb-2">Research Papers</h3>
                            <div className="space-y-1">
                              {term.research_links.map((link, linkIndex) => (
                                <a
                                  key={linkIndex}
                                  href={link}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="block text-primary-blue hover:text-primary-blue/80 text-sm transition-colors underline"
                                >
                                  {link}
                                </a>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </motion.article>
                ))}
              </div>
            )}

            {/* Download Section */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="mt-16 text-center"
            >
              <div className="bg-gradient-to-r from-primary-dark/80 to-primary-dark/60 border border-primary-gold/30 rounded-lg p-8">
                <h3 className="text-2xl font-display font-bold text-primary-gold mb-4">
                  Complete Technical Documentation
                </h3>
                <p className="text-text-secondary mb-6 max-w-2xl mx-auto">
                  Download the complete technical glossary as a PDF for offline reference. 
                  Includes detailed algorithmic specifications, implementation guides, and patent information.
                </p>
                <motion.button
                  className="inline-flex items-center px-8 py-3 bg-gradient-to-r from-primary-gold to-secondary-bronze text-white rounded-lg font-semibold hover:shadow-glow-gold transition-all duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    // In real app, would trigger PDF download
                    alert('PDF download would be triggered here');
                  }}
                >
                  Download PDF Documentation
                  <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </motion.button>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default GlossaryPage;