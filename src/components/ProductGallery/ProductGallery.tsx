import { FC, useState } from 'react';
import { Product } from '../../types';
import styles from './ProductGallery.module.css';

interface ProductGalleryProps {
  product: Product;
  onImageClick: (index: number) => void;
}

const ProductGallery: FC<ProductGalleryProps> = ({ product, onImageClick }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleThumbnailClick = (index: number) => {
    setCurrentImageIndex(index);
  };

  const handleMainImageClick = () => {
    onImageClick(currentImageIndex);
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % product.images.length);
  };

  const previousImage = () => {
    setCurrentImageIndex((prev) => 
      prev === 0 ? product.images.length - 1 : prev - 1
    );
  };

  return (
    <div className={styles.gallery}>
      <div className={styles.mainImageContainer}>
        <button 
          className={styles.mainImageButton}
          onClick={handleMainImageClick}
          aria-label="Open lightbox gallery"
        >
          <img 
            src={product.images[currentImageIndex].main}
            alt={product.images[currentImageIndex].alt}
            className={styles.mainImage}
          />
        </button>
        
        {/* Mobile navigation arrows */}
        <button 
          className={`${styles.navButton} ${styles.prevButton}`}
          onClick={previousImage}
          aria-label="Previous image"
        >
          <img src="/images/icon-previous.svg" alt="" />
        </button>
        
        <button 
          className={`${styles.navButton} ${styles.nextButton}`}
          onClick={nextImage}
          aria-label="Next image"
        >
          <img src="/images/icon-next.svg" alt="" />
        </button>
      </div>

      <div className={styles.thumbnailContainer}>
        {product.images.map((image, index) => (
          <button
            key={image.id}
            className={`${styles.thumbnailButton} ${
              index === currentImageIndex ? styles.active : ''
            }`}
            onClick={() => handleThumbnailClick(index)}
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
  );
};

export default ProductGallery;