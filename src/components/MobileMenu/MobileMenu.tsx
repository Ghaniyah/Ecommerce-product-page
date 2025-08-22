import { FC, useEffect } from 'react';
import styles from './MobileMenu.module.css';

interface NavigationItem {
  label: string;
  href: string;
}

interface MobileMenuProps {
  navigationItems: NavigationItem[];
  onClose: () => void;
}

const MobileMenu: FC<MobileMenuProps> = ({ navigationItems, onClose }) => {
  useEffect(() => {
    // Prevent body scroll when menu is open
    document.body.style.overflow = 'hidden';
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  return (
    <div className={styles.overlay}>
      <div className={styles.backdrop} onClick={onClose} />
      
      <div className={styles.menu}>
        <button 
          className={styles.closeButton}
          onClick={onClose}
          aria-label="Close menu"
        >
          <img src="./images/icon-close.svg" alt="" />
        </button>
        
        <nav className={styles.navigation}>
          <ul className={styles.navigationList}>
            {navigationItems.map((item) => (
              <li key={item.label}>
                <a 
                  href={item.href} 
                  className={styles.navigationLink}
                  onClick={onClose}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default MobileMenu;