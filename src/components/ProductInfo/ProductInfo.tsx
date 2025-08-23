import { FC, useState } from 'react';
import { Product } from '../../types';
import QuantitySelector from '../QuantitySelector/QuantitySelector';
import styles from './ProductInfo.module.css';

interface ProductInfoProps {
  product: Product;
  onAddToCart: (product: Product, quantity: number) => void;
}

const ProductInfo: FC<ProductInfoProps> = ({ product, onAddToCart }) => {
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = () => {
    if (quantity > 0) {
      onAddToCart(product, quantity);
    }
  };

  const formatPrice = (price: number) => {
    return `$${price.toFixed(2)}`;
  };

  return (
    <div className={styles.productInfo}>
      <div className={styles.company}>{product.company}</div>
      
      <h1 className={styles.title}>{product.name}</h1>
      
      <p className={styles.description}>{product.description}</p>
      
      <div className={styles.priceContainer}>
        <div className={styles.currentPriceRow}>
          <span className={styles.currentPrice}>
            {formatPrice(product.price)}
          </span>
          <span className={styles.discount}>
            {product.discount}%
          </span>
        </div>
        <div className={styles.originalPrice}>
          {formatPrice(product.originalPrice)}
        </div>
      </div>
      
      <div className={styles.actionsContainer}>
        <QuantitySelector 
          value={quantity}
          onChange={setQuantity}
          min={0}
          max={99}
        />
        
        <button 
          className={styles.addToCartButton}
          onClick={handleAddToCart}
          disabled={quantity === 0}
        >
          <img src="/images/icon-cart.svg" alt="" />
          Add to cart
        </button>
      </div>
    </div>
  );
};

export default ProductInfo;