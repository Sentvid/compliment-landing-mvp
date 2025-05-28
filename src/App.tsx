import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { motion } from 'framer-motion';

// Components
import Header from './components/sections/Header';
import Hero from './components/sections/Hero';
import VideoSection from './components/sections/VideoSection';
import WishlistSection from './components/sections/WishlistSection';
import FAQPreview from './components/sections/FAQPreview';
import Footer from './components/sections/Footer';

// Pages
import FAQPage from './pages/FAQPage';
import NDAPage from './pages/NDAPage';
import GlossaryPage from './pages/GlossaryPage';

// Hooks
import { useAuth } from './hooks/useAuth';
import { useKeyboardNavigation } from './hooks/useKeyboardNavigation';

function App() {
  const { isLoading } = useAuth();
  
  // Initialize keyboard navigation
  useKeyboardNavigation();
  
  React.useEffect(() => {
    // Set up error boundary for production
    if (import.meta.env.PROD) {
      const handleError = (event: ErrorEvent) => {
        console.error('Global error:', event.error);
        // Send to error tracking service
      };
      
      window.addEventListener('error', handleError);
      return () => window.removeEventListener('error', handleError);
    }
  }, []);

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-primary-dark flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center"
        >
          <div className="w-12 h-12 border-2 border-primary-blue border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-text-secondary">Loading Compliment...</p>
        </motion.div>
      </div>
    );
  }

  return (
    <Router>
      <div className="min-h-screen bg-primary-dark">
        <Routes>
          {/* Main Landing Page */}
          <Route
            path="/"
            element={
              <>
                <Header />
                <main id="main-content" className="scroll-snap-container">
                  <Hero />
                  <VideoSection />
                  <WishlistSection />
                  <FAQPreview />
                </main>
                <Footer />
              </>
            }
          />
          
          {/* Separate Pages */}
          <Route path="/faq" element={<FAQPage />} />
          <Route path="/nda" element={<NDAPage />} />
          <Route path="/glossary" element={<GlossaryPage />} />
          
          {/* 404 Page */}
          <Route
            path="*"
            element={
              <div className="min-h-screen bg-primary-dark flex items-center justify-center">
                <div className="text-center">
                  <h1 className="text-6xl font-display font-bold text-primary-blue mb-4">404</h1>
                  <p className="text-xl text-text-secondary mb-8">Page not found</p>
                  <motion.a
                    href="/"
                    className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-primary-blue to-secondary-purple text-white rounded-md hover:shadow-glow-blue transition-all duration-300"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Return Home
                  </motion.a>
                </div>
              </div>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
