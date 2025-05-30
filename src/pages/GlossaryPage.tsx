import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuthStore } from '@/lib/store';
import { supabase } from '@/lib/supabase';
import { ANIMATION_VARIANTS } from '@/lib/constants';
import Header from '@/components/sections/Header';
import Footer from '@/components/sections/Footer';
import { GLOSSARY_TERMS, getGlossaryStats } from '@/data/glossaryTerms';
import type { GlossaryTerm } from '@/data/glossaryTerms';

const GlossaryPage: React.FC = () => {
  const { user, hasSignedNDA } = useAuthStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState('all');
  const [selectedType, setSelectedType] = useState('all');
  const [expandedTerm, setExpandedTerm] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasAccess, setHasAccess] = useState(false);

  useEffect(() => {
    const checkAccess = async () => {
      if (!user) {
        setIsLoading(false);
        return;
      }

      try {
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

  const difficulties = ['all', 'Basic', 'Advanced', 'Expert'];
  const types = ['all', ...Array.from(new Set(GLOSSARY_TERMS.map(term => term.type)))];

  const filteredTerms = useMemo(() => {
    return GLOSSARY_TERMS.filter(term => {
      const matchesSearch = searchQuery === '' || 
        term.term.toLowerCase().includes(searchQuery.toLowerCase()) ||
        term.explanation.toLowerCase().includes(searchQuery.toLowerCase()) ||
        term.context.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesDifficulty = selectedDifficulty === 'all' || term.difficulty === selectedDifficulty;
      const matchesType = selectedType === 'all' || term.type === selectedType;
      
      return matchesSearch && matchesDifficulty && matchesType;
    });
  }, [searchQuery, selectedDifficulty, selectedType]);

  const stats = useMemo(() => getGlossaryStats(), []);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Basic': return 'text-tetra-green bg-tetra-green/20 border-tetra-green/30';
      case 'Advanced': return 'text-tetra-yellow bg-tetra-yellow/20 border-tetra-yellow/30';
      case 'Expert': return 'text-tetra-red bg-tetra-red/20 border-tetra-red/30';
      default: return 'text-text-secondary bg-primary-dark/20 border-primary-blue/30';
    }
  };

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

              {/* Statistics */}
              <motion.div
                variants={ANIMATION_VARIANTS.fadeInUp}
                className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto mb-8"
              >
                <div className="bg-primary-dark/50 border border-primary-blue/20 rounded-lg p-4">
                  <div className="text-2xl font-bold text-primary-blue">{stats.total}</div>
                  <div className="text-sm text-text-secondary">Total Terms</div>
                </div>
                <div className="bg-primary-dark/50 border border-tetra-green/20 rounded-lg p-4">
                  <div className="text-2xl font-bold text-tetra-green">{stats.basic}</div>
                  <div className="text-sm text-text-secondary">Basic</div>
                </div>
                <div className="bg-primary-dark/50 border border-tetra-yellow/20 rounded-lg p-4">
                  <div className="text-2xl font-bold text-tetra-yellow">{stats.advanced}</div>
                  <div className="text-sm text-text-secondary">Advanced</div>
                </div>
                <div className="bg-primary-dark/50 border border-tetra-red/20 rounded-lg p-4">
                  <div className="text-2xl font-bold text-tetra-red">{stats.expert}</div>
                  <div className="text-sm text-text-secondary">Expert</div>
                </div>
              </motion.div>

              {/* Search & Filters */}
              <motion.div
                variants={ANIMATION_VARIANTS.fadeInUp}
                className="flex flex-col lg:flex-row gap-4 max-w-4xl mx-auto"
              >
                <div className="flex-1 relative">
                  <input
                    type="text"
                    placeholder="Search terms, explanations, and context..."
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
                  value={selectedDifficulty}
                  onChange={(e) => setSelectedDifficulty(e.target.value)}
                  className="px-4 py-3 bg-primary-dark/80 border border-primary-blue/30 rounded-lg text-text-primary focus:outline-none focus:border-primary-blue focus:ring-1 focus:ring-primary-blue/20"
                >
                  {difficulties.map(difficulty => (
                    <option key={difficulty} value={difficulty}>
                      {difficulty === 'all' ? 'All Difficulties' : difficulty}
                    </option>
                  ))}
                </select>

                <select
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                  className="px-4 py-3 bg-primary-dark/80 border border-primary-blue/30 rounded-lg text-text-primary focus:outline-none focus:border-primary-blue focus:ring-1 focus:ring-primary-blue/20 min-w-0"
                >
                  {types.map(type => (
                    <option key={type} value={type}>
                      {type === 'all' ? 'All Types' : type}
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
                <p className="text-text-secondary">Try searching with different keywords or adjust your filters</p>
              </motion.div>
            ) : (
              <div className="max-w-4xl mx-auto space-y-6">
                <div className="text-sm text-text-secondary mb-6">
                  Showing {filteredTerms.length} of {stats.total} terms
                </div>
                
                {filteredTerms.map((term, index) => (
                  <motion.article
                    key={term.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="bg-gradient-to-r from-primary-dark/80 to-primary-dark/60 border border-primary-blue/20 rounded-lg overflow-hidden hover:border-primary-blue/40 transition-all duration-300"
                  >
                    <div className="p-6">
                      <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-4">
                        <div className="flex-1">
                          <div className="flex items-center flex-wrap gap-2 mb-3">
                            <span className={`inline-block text-xs font-semibold px-2 py-1 rounded-full border ${getDifficultyColor(term.difficulty)}`}>
                              {term.difficulty}
                            </span>
                            <span className="inline-block bg-primary-gold/20 text-primary-gold text-xs font-semibold px-2 py-1 rounded-full border border-primary-gold/30">
                              {term.type}
                            </span>
                            <span className="inline-block bg-secondary-purple/20 text-secondary-purple text-xs font-semibold px-2 py-1 rounded-full border border-secondary-purple/30">
                              {term.status}
                            </span>
                          </div>
                          <h2 className="text-2xl font-display font-bold text-primary-blue mb-3">
                            {term.term}
                          </h2>
                        </div>
                        
                        <motion.button
                          onClick={() => setExpandedTerm(expandedTerm === term.id ? null : term.id)}
                          className="mt-4 lg:mt-0 flex items-center text-primary-gold hover:text-primary-gold/80 transition-colors"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <span className="text-sm font-medium mr-2">
                            {expandedTerm === term.id ? 'Show Less' : 'Show More'}
                          </span>
                          <motion.svg
                            className="w-5 h-5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            animate={{ rotate: expandedTerm === term.id ? 180 : 0 }}
                            transition={{ duration: 0.2 }}
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </motion.svg>
                        </motion.button>
                      </div>

                      <p className="text-lg text-text-primary mb-4 leading-relaxed">
                        {term.explanation}
                      </p>

                      <AnimatePresence>
                        {expandedTerm === term.id && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3 }}
                            className="overflow-hidden"
                          >
                            <div className="bg-primary-dark/50 border border-primary-blue/10 rounded-lg p-4 mb-4">
                              <h3 className="text-sm font-semibold text-primary-gold mb-2 uppercase tracking-wide">
                                Context & Usage
                              </h3>
                              <p className="text-text-secondary text-sm leading-relaxed">
                                {term.context}
                              </p>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
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