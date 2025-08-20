import React, { useEffect, useRef } from 'react';
import { CartItem } from '../../types';
import styles from './Cart.module.css';

interface CartProps {
  items: CartItem[];
  onRemoveItem: (itemId: number) => void;
  onClose: () => void;
}

const Cart: React.FC<CartProps> = ({ items, onRemoveItem, onClose }) => {
  const cartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (cartRef.current && !cartRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [onClose]);

  const formatPrice = (price: number) => {
    return `$${price.toFixed(2)}`;
  };

  const calculateTotal = (item: CartItem) => {
    return item.product.price * item.quantity;
  };

  return (
    <div className={styles.cartOverlay}>
      <div className={styles.cart} ref={cartRef}>
        <div className={styles.header}>
          <h2 className={styles.title}>Cart</h2>
        </div>
        
        <div className={styles.content}>
          {items.length === 0 ? (
            <div className={styles.emptyCart}>
              <p>Your cart is empty.</p>
            </div>
          ) : (
            <>
              <div className={styles.items}>
                {items.map((item) => (
                  <div key={item.id} className={styles.item}>
                    <img 
                      src={item.product.images[0].thumbnail}
                      alt={item.product.images[0].alt}
                      className={styles.itemImage}
                    />
                    
                    <div className={styles.itemDetails}>
                      <div className={styles.itemName}>
                        {item.product.name}
                      </div>
                      <div className={styles.itemPrice}>
                        {formatPrice(item.product.price)} × {item.quantity}{' '}
                        <span className={styles.itemTotal}>
                          {formatPrice(calculateTotal(item))}
                        </span>
                      </div>
                    </div>
                    
                    <button 
                      className={styles.removeButton}
                      onClick={() => onRemoveItem(item.id)}
                      aria-label={`Remove ${item.product.name} from cart`}
                    >
                      <img src="./images/icon-delete.svg" alt="" />
                    </button>
                  </div>
                ))}
              </div>
              
              <button className={styles.checkoutButton}>
                Checkout
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;