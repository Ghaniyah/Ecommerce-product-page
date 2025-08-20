import React from 'react';
import Header from './components/Header/Header';
import ProductGallery from './components/ProductGallery/ProductGallery';
import ProductInfo from './components/ProductInfo/ProductInfo';
import Lightbox from './components/Lightbox/Lightbox';
import { useCart } from './hooks/useCart';
import { useLightbox } from './hooks/useLightbox';
import { Product } from './types';
import styles from './App.module.css';

// Product data
const product: Product = {
  id: 1,
  name: 'Fall Limited Edition Sneakers',
  description: 'These low-profile sneakers are your perfect casual wear companion. Featuring a durable rubber outer sole, they\'ll withstand everything the weather can offer.',
  price: 125.00,
  originalPrice: 250.00,
  discount: 50,
  company: 'Sneaker Company',
  images: [
    {
      id: 1,
      main: './images/image-product-1.jpg',
      thumbnail: './images/image-product-1-thumbnail.jpg',
      alt: 'Fall Limited Edition Sneakers - Front view'
    },
    {
      id: 2,
      main: './images/image-product-2.jpg',
      thumbnail: './images/image-product-2-thumbnail.jpg',
      alt: 'Fall Limited Edition Sneakers - Side view'
    },
    {
      id: 3,
      main: './images/image-product-3.jpg',
      thumbnail: './images/image-product-3-thumbnail.jpg',
      alt: 'Fall Limited Edition Sneakers - Back view'
    },
    {
      id: 4,
      main: './images/image-product-4.jpg',
      thumbnail: './images/image-product-4-thumbnail.jpg',
      alt: 'Fall Limited Edition Sneakers - Detail view'
    }
  ]
};

function App() {
  const cart = useCart();
  const lightbox = useLightbox();

  return (
    <div className={styles.app}>
      <Header cart={cart} />
      
      <main className={styles.main}>
        <div className={styles.container}>
          <div className={styles.productContainer}>
            <ProductGallery 
              product={product} 
              onImageClick={lightbox.openLightbox}
            />
            <ProductInfo 
              product={product} 
              onAddToCart={cart.addItem}
            />
          </div>
        </div>
      </main>

      {lightbox.isOpen && (
        <Lightbox
          images={product.images}
          currentIndex={lightbox.currentImageIndex}
          onClose={lightbox.closeLightbox}
          onNext={lightbox.nextImage}
          onPrevious={lightbox.previousImage}
          onThumbnailClick={lightbox.setCurrentImage}
        />
      )}
    </div>
  );
}

export default App;