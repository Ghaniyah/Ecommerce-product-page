import { useState, useCallback } from 'react';
import { CartState, CartItem, Product } from '../types';

export const useCart = () => {
  const [cart, setCart] = useState<CartState>({
    items: [],
    isOpen: false
  });

  const addItem = useCallback((product: Product, quantity: number) => {
    if (quantity <= 0) return;

    setCart(prevCart => {
      const existingItemIndex = prevCart.items.findIndex(item => item.product.id === product.id);
      
      if (existingItemIndex >= 0) {
        // Update existing item
        const updatedItems = [...prevCart.items];
        updatedItems[existingItemIndex] = {
          ...updatedItems[existingItemIndex],
          quantity: updatedItems[existingItemIndex].quantity + quantity
        };
        return { ...prevCart, items: updatedItems };
      } else {
        // Add new item
        const newItem: CartItem = {
          id: Date.now(), // Simple ID generation
          product,
          quantity
        };
        return { ...prevCart, items: [...prevCart.items, newItem] };
      }
    });
  }, []);

  const removeItem = useCallback((itemId: number) => {
    setCart(prevCart => ({
      ...prevCart,
      items: prevCart.items.filter(item => item.id !== itemId)
    }));
  }, []);

  const toggleCart = useCallback(() => {
    setCart(prevCart => ({ ...prevCart, isOpen: !prevCart.isOpen }));
  }, []);

  const closeCart = useCallback(() => {
    setCart(prevCart => ({ ...prevCart, isOpen: false }));
  }, []);

  const getTotalItems = useCallback(() => {
    return cart.items.reduce((total, item) => total + item.quantity, 0);
  }, [cart.items]);

  const getTotalPrice = useCallback(() => {
    return cart.items.reduce((total, item) => total + (item.product.price * item.quantity), 0);
  }, [cart.items]);

  return {
    items: cart.items,
    isOpen: cart.isOpen,
    addItem,
    removeItem,
    toggleCart,
    closeCart,
    getTotalItems,
    getTotalPrice
  };
};