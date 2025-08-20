import React from 'react';
import styles from './QuantitySelector.module.css';

interface QuantitySelectorProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
}

const QuantitySelector: React.FC<QuantitySelectorProps> = ({ 
  value, 
  onChange, 
  min = 0, 
  max = 99 
}) => {
  const handleDecrease = () => {
    if (value > min) {
      onChange(value - 1);
    }
  };

  const handleIncrease = () => {
    if (value < max) {
      onChange(value + 1);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseInt(e.target.value, 10);
    if (!isNaN(newValue) && newValue >= min && newValue <= max) {
      onChange(newValue);
    }
  };

  return (
    <div className={styles.quantitySelector}>
      <button 
        className={styles.button}
        onClick={handleDecrease}
        disabled={value <= min}
        aria-label="Decrease quantity"
      >
        <img src="./images/icon-minus.svg" alt="" />
      </button>
      
      <input 
        type="number"
        className={styles.input}
        value={value}
        onChange={handleInputChange}
        min={min}
        max={max}
        aria-label="Quantity"
      />
      
      <button 
        className={styles.button}
        onClick={handleIncrease}
        disabled={value >= max}
        aria-label="Increase quantity"
      >
        <img src="./images/icon-plus.svg" alt="" />
      </button>
    </div>
  );
};

export default QuantitySelector;