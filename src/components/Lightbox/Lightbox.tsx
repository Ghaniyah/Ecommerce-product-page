import { FC, useEffect, MouseEvent } from 'react';
import { ProductImage } from '../../types';
import styles from './Lightbox.module.css';

interface LightboxProps {
  images: ProductImage[];
  currentIndex: number;
  onClose: () => void;
  onNext: (totalImages: number) => void;
  onPrevious: (totalImages: number) => void;
  onThumbnailClick: (index: number) => void;
}

const Lightbox: FC<LightboxProps> = ({
  images,
  currentIndex,
  onClose,
  onNext,
  onPrevious,
  onThumbnailClick
}) => {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      switch (event.key) {
        case 'Escape':
          onClose();
          break;
        case 'ArrowLeft':
          onPrevious(images.length);
          break;
        case 'ArrowRight':
          onNext(images.length);
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [onClose, onNext, onPrevious, images.length]);

  const handleBackdropClick = (event: MouseEvent) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  return (
    <div className={styles.overlay} onClick={handleBackdropClick}>
      <div className={styles.lightbox}>
        <button 
          className={styles.closeButton}
          onClick={onClose}
          aria-label="Close lightbox"
        >
          <img src="/images/icon-close.svg" alt="" />
        </button>
        
        <div className={styles.mainImageContainer}>
          <button 
            className={`${styles.navButton} ${styles.prevButton}`}
            onClick={() => onPrevious(images.length)}
            aria-label="Previous image"
          >
            <img src="/images/icon-previous.svg" alt="" />
          </button>
          
          <img 
            src={images[currentIndex].main}
            alt={images[currentIndex].alt}
            className={styles.mainImage}
          />
          
          <button 
            className={`${styles.navButton} ${styles.nextButton}`}
            onClick={() => onNext(images.length)}
            aria-label="Next image"
          >
            <img src="/images/icon-next.svg" alt="" />
          </button>
        </div>

        <div className={styles.thumbnailContainer}>
          {images.map((image, index) => (
            <button
              key={image.id}
              className={`${styles.thumbnailButton} ${
                index === currentIndex ? styles.active : ''
              }`}
              onClick={() => onThumbnailClick(index)}
              aria-label={`View ${image.alt}`}
            >
              <img 
                src={image.thumbnail}
                alt={image.alt}
                className={styles.thumbnail}
              />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Lightbox;