import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { YOUTUBE_VIDEOS, ANIMATION_VARIANTS } from '@/lib/constants';
import { getRandomElement } from '@/lib/utils';

declare global {
  interface Window {
    YT: any;
    onYouTubeIframeAPIReady: () => void;
  }
}

const VideoSection: React.FC = () => {
  const [player, setPlayer] = useState<any>(null);
  const [isReady, setIsReady] = useState(false);
  const [currentVideoId, setCurrentVideoId] = useState(YOUTUBE_VIDEOS[0]);
  const [error, setError] = useState<string | null>(null);

  const initializePlayer = useCallback(() => {
    if (window.YT && window.YT.Player) {
      try {
        const newPlayer = new window.YT.Player('youtube-player', {
          videoId: currentVideoId,
          width: '100%',
          height: '100%',
          playerVars: {
            autoplay: 1,
            mute: 1,
            controls: 1,
            rel: 0,
            modestbranding: 1,
            playsinline: 1,
          },
          events: {
            onReady: (event: any) => {
              setIsReady(true);
              setError(null);
            },
            onStateChange: (event: any) => {
              // Handle state changes if needed
            },
            onError: (event: any) => {
              console.error('YouTube Player Error:', event.data);
              setError('Failed to load video. Please try again.');
            },
          },
        });
        setPlayer(newPlayer);
      } catch (err) {
        console.error('Error initializing YouTube player:', err);
        setError('Failed to initialize video player.');
      }
    }
  }, [currentVideoId]);

  useEffect(() => {
    // Set random video on mount
    setCurrentVideoId(getRandomElement(YOUTUBE_VIDEOS));

    // Load YouTube IFrame API if not already loaded
    if (!window.YT) {
      const script = document.createElement('script');
      script.src = 'https://www.youtube.com/iframe_api';
      script.async = true;
      
      window.onYouTubeIframeAPIReady = initializePlayer;
      
      document.body.appendChild(script);
    } else {
      initializePlayer();
    }

    return () => {
      if (player) {
        player.destroy();
      }
    };
  }, [initializePlayer]);

  const handleVideoChange = () => {
    const newVideoId = getRandomElement(YOUTUBE_VIDEOS.filter(id => id !== currentVideoId));
    setCurrentVideoId(newVideoId);
    
    if (player && player.loadVideoById) {
      player.loadVideoById(newVideoId);
    }
  };

  const toggleMute = () => {
    if (player) {
      if (player.isMuted()) {
        player.unMute();
      } else {
        player.mute();
      }
    }
  };

  return (
    <section 
      id="video" 
      className="section-padding scroll-snap-section bg-gradient-to-b from-primary-dark to-primary-dark/90"
    >
      <div className="section-container">
        <motion.div
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, amount: 0.3 }}
          variants={ANIMATION_VARIANTS.staggerContainer}
          className="text-center mb-12"
        >
          <motion.h2 
            className="text-3xl md:text-4xl font-display font-bold mb-4"
            variants={ANIMATION_VARIANTS.fadeInUp}
          >
            See <span className="text-gradient-blue">Compliment</span> in Action
          </motion.h2>
          
          <motion.p 
            className="text-lg text-text-secondary max-w-2xl mx-auto"
            variants={ANIMATION_VARIANTS.fadeInUp}
          >
            Watch how our revolutionary QuantumMatch™ technology creates meaningful connections 
            through scientific compatibility prediction
          </motion.p>
        </motion.div>

        <motion.div
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, amount: 0.3 }}
          variants={ANIMATION_VARIANTS.fadeInUp}
          className="max-w-4xl mx-auto"
        >
          {/* Video Container */}
          <div className="relative bg-primary-dark border border-primary-blue/30 rounded-lg overflow-hidden shadow-2xl">
            {/* Video Player */}
            <div className="relative aspect-video bg-black">
              {error ? (
                <div className="absolute inset-0 flex items-center justify-center bg-primary-dark/80">
                  <div className="text-center">
                    <div className="text-red-400 mb-4">
                      <svg className="w-12 h-12 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <p className="text-text-secondary mb-4">{error}</p>
                    <button
                      onClick={() => {
                        setError(null);
                        initializePlayer();
                      }}
                      className="px-4 py-2 bg-primary-blue text-white rounded hover:bg-primary-blue/80 transition-colors"
                    >
                      Retry
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <div id="youtube-player" className="w-full h-full" />
                  
                  {/* Loading Overlay */}
                  {!isReady && (
                    <div className="absolute inset-0 flex items-center justify-center bg-primary-dark">
                      <div className="text-center">
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                          className="w-8 h-8 border-2 border-primary-blue border-t-transparent rounded-full mx-auto mb-4"
                        />
                        <p className="text-text-secondary">Loading video...</p>
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>

            {/* Video Controls */}
            <div className="p-4 bg-gradient-to-r from-primary-dark/90 to-primary-dark/80 border-t border-primary-blue/20">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <button
                    onClick={toggleMute}
                    className="flex items-center space-x-2 px-3 py-2 bg-primary-blue/20 hover:bg-primary-blue/30 text-primary-blue rounded transition-colors"
                    aria-label="Toggle audio"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 12a3 3 0 003-3V7a3 3 0 00-6 0v2a3 3 0 003 3z" />
                    </svg>
                    <span className="text-sm">Audio</span>
                  </button>

                  {YOUTUBE_VIDEOS.length > 1 && (
                    <button
                      onClick={handleVideoChange}
                      className="flex items-center space-x-2 px-3 py-2 bg-primary-gold/20 hover:bg-primary-gold/30 text-primary-gold rounded transition-colors"
                      aria-label="Switch to different demo video"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                      </svg>
                      <span className="text-sm">Different Demo</span>
                    </button>
                  )}
                </div>

                <div className="text-xs text-text-secondary">
                  Demo Video • Compliment Platform
                </div>
              </div>
            </div>
          </div>

          {/* Video Description */}
          <motion.div
            variants={ANIMATION_VARIANTS.fadeInUp}
            className="mt-8 text-center"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
              <div className="flex items-center justify-center space-x-2">
                <div className="w-2 h-2 bg-primary-blue rounded-full" />
                <span className="text-text-secondary">AI-Powered Matching</span>
              </div>
              <div className="flex items-center justify-center space-x-2">
                <div className="w-2 h-2 bg-primary-gold rounded-full" />
                <span className="text-text-secondary">Real-Time Compatibility</span>
              </div>
              <div className="flex items-center justify-center space-x-2">
                <div className="w-2 h-2 bg-tetra-green rounded-full" />
                <span className="text-text-secondary">Future Prediction</span>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, amount: 0.3 }}
          variants={ANIMATION_VARIANTS.fadeInUp}
          className="text-center mt-12"
        >
          <motion.button
            onClick={() => {
              const element = document.getElementById('wishlist');
              element?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="inline-flex items-center px-8 py-3 bg-gradient-to-r from-primary-gold to-secondary-bronze text-white rounded-lg font-semibold hover:shadow-glow-gold transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Ready to Experience This?
            <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default VideoSection;