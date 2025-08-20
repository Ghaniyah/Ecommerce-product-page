import React, { useState } from 'react';
import Cart from '../Cart/Cart';
import MobileMenu from '../MobileMenu/MobileMenu';
import styles from './Header.module.css';

interface HeaderProps {
  cart: {
    items: any[];
    isOpen: boolean;
    toggleCart: () => void;
    closeCart: () => void;
    removeItem: (id: number) => void;
    getTotalItems: () => number;
  };
}

const Header: React.FC<HeaderProps> = ({ cart }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const navigationItems = [
    { label: 'Collections', href: '#' },
    { label: 'Men', href: '#' },
    { label: 'Women', href: '#' },
    { label: 'About', href: '#' },
    { label: 'Contact', href: '#' }
  ];

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.leftSection}>
          <button 
            className={styles.mobileMenuButton}
            onClick={toggleMobileMenu}
            aria-label="Open menu"
          >
            <img src="./images/icon-menu.svg" alt="" />
          </button>
          
          <div className={styles.logo}>
            <img src="./images/logo.svg" alt="Sneakers" />
          </div>
          
          <nav className={styles.navigation}>
            <ul className={styles.navigationList}>
              {navigationItems.map((item) => (
                <li key={item.label}>
                  <a href={item.href} className={styles.navigationLink}>
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className={styles.rightSection}>
          <div className={styles.cartContainer}>
            <button 
              className={styles.cartButton}
              onClick={cart.toggleCart}
              aria-label={`Cart with ${cart.getTotalItems()} items`}
            >
              <img src="./images/icon-cart.svg" alt="" />
              {cart.getTotalItems() > 0 && (
                <span className={styles.cartBadge}>
                  {cart.getTotalItems()}
                </span>
              )}
            </button>
            
            {cart.isOpen && (
              <Cart 
                items={cart.items}
                onRemoveItem={cart.removeItem}
                onClose={cart.closeCart}
              />
            )}
          </div>
          
          <button className={styles.avatarButton}>
            <img 
              src="./images/image-avatar.png" 
              alt="User avatar" 
              className={styles.avatar}
            />
          </button>
        </div>
      </div>

      {isMobileMenuOpen && (
        <MobileMenu 
          navigationItems={navigationItems}
          onClose={closeMobileMenu}
        />
      )}
    </header>
  );
};

export default Header;