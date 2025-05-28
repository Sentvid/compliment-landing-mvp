import { useEffect } from 'react';
import { useModalStore } from '@/lib/store';

export const useKeyboardNavigation = () => {
  const { isAuthModalOpen, isFeedbackModalOpen, setAuthModalOpen, setFeedbackModalOpen } = useModalStore();
  
  const isModalOpen = isAuthModalOpen || isFeedbackModalOpen;

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Escape closes modals
      if (e.key === 'Escape' && isModalOpen) {
        if (isAuthModalOpen) {
          setAuthModalOpen(false);
        }
        if (isFeedbackModalOpen) {
          setFeedbackModalOpen(false);
        }
        return;
      }

      // Tab trap for modals
      if (e.key === 'Tab' && isModalOpen) {
        const modal = document.querySelector('[role="dialog"]');
        if (!modal) return;

        const focusableElements = modal.querySelectorAll(
          'a[href], button, textarea, input[type="text"], input[type="email"], input[type="password"], select, [tabindex]:not([tabindex="-1"])'
        );
        
        if (focusableElements.length === 0) return;

        const firstElement = focusableElements[0] as HTMLElement;
        const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

        if (e.shiftKey && document.activeElement === firstElement) {
          lastElement.focus();
          e.preventDefault();
        } else if (!e.shiftKey && document.activeElement === lastElement) {
          firstElement.focus();
          e.preventDefault();
        }
      }

      // Arrow keys for tech cards navigation
      if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
        const techCards = document.querySelectorAll('[data-tech-card]');
        const currentIndex = Array.from(techCards).findIndex(
          (card) => card === document.activeElement
        );

        if (currentIndex !== -1) {
          const nextIndex = e.key === 'ArrowRight' 
            ? (currentIndex + 1) % techCards.length
            : (currentIndex - 1 + techCards.length) % techCards.length;
          
          (techCards[nextIndex] as HTMLElement).focus();
          e.preventDefault();
        }
      }

      // Smooth scroll to sections with Page Up/Down
      if (e.key === 'PageDown' || e.key === 'PageUp') {
        const sections = ['hero', 'video', 'wishlist', 'faq'];
        const currentSection = sections.findIndex(
          (id) => document.getElementById(id)?.getBoundingClientRect().top! <= 100
        );

        if (currentSection !== -1) {
          const nextIndex = e.key === 'PageDown'
            ? Math.min(currentSection + 1, sections.length - 1)
            : Math.max(currentSection - 1, 0);
          
          const targetElement = document.getElementById(sections[nextIndex]);
          if (targetElement) {
            targetElement.scrollIntoView({ behavior: 'smooth' });
            e.preventDefault();
          }
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isModalOpen, isAuthModalOpen, isFeedbackModalOpen, setAuthModalOpen, setFeedbackModalOpen]);
};
