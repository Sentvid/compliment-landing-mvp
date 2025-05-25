import { useEffect } from 'react';
import { useUIStore } from '@/lib/store';

export const useKeyboardNavigation = () => {
  const { isModalOpen, closeModal } = useUIStore();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Escape closes modals
      if (e.key === 'Escape' && isModalOpen) {
        closeModal();
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
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isModalOpen, closeModal]);
};
