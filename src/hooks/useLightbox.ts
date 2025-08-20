import { useState, useCallback, useEffect } from 'react';
import { LightboxState } from '../types';

export const useLightbox = () => {
  const [lightbox, setLightbox] = useState<LightboxState>({
    isOpen: false,
    currentImageIndex: 0
  });

  const openLightbox = useCallback((imageIndex: number = 0) => {
    setLightbox({
      isOpen: true,
      currentImageIndex: imageIndex
    });
  }, []);

  const closeLightbox = useCallback(() => {
    setLightbox(prev => ({ ...prev, isOpen: false }));
  }, []);

  const nextImage = useCallback((totalImages: number) => {
    setLightbox(prev => ({
      ...prev,
      currentImageIndex: (prev.currentImageIndex + 1) % totalImages
    }));
  }, []);

  const previousImage = useCallback((totalImages: number) => {
    setLightbox(prev => ({
      ...prev,
      currentImageIndex: prev.currentImageIndex === 0 ? totalImages - 1 : prev.currentImageIndex - 1
    }));
  }, []);

  const setCurrentImage = useCallback((index: number) => {
    setLightbox(prev => ({ ...prev, currentImageIndex: index }));
  }, []);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!lightbox.isOpen) return;

      switch (event.key) {
        case 'Escape':
          closeLightbox();
          break;
        case 'ArrowLeft':
          previousImage(4); // Assuming 4 images, could be made dynamic
          break;
        case 'ArrowRight':
          nextImage(4); // Assuming 4 images, could be made dynamic
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [lightbox.isOpen, closeLightbox, nextImage, previousImage]);

  // Prevent body scroll when lightbox is open
  useEffect(() => {
    if (lightbox.isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [lightbox.isOpen]);

  return {
    isOpen: lightbox.isOpen,
    currentImageIndex: lightbox.currentImageIndex,
    openLightbox,
    closeLightbox,
    nextImage,
    previousImage,
    setCurrentImage
  };
};