import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  collection,
  doc,
  setDoc,
  updateDoc,
  deleteField,
  onSnapshot,
  Timestamp,
} from 'firebase/firestore';
import { db } from '../firebase';
import { useAuth } from './AuthContext'; // Assuming you have an AuthContext

interface CartItem {
  id: string;
  name: string;
  price: number;
  variation: string;
  image: string;
  quantity: number;
  category?: string;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (userId: string, item: CartItem) => Promise<void>;
  updateQuantity: (userId: string, id: string, variation: string, quantity: number) => Promise<void>;
  removeFromCart: (userId: string, id: string, variation: string) => Promise<void>;
  clearCart: (userId: string) => Promise<void>;
  fetchCart: (userId: string) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const { currentUser } = useAuth();

  useEffect(() => {
    let unsubscribe: (() => void) | null = null;

    if (currentUser) {
      unsubscribe = fetchCart(currentUser.uid);
    } else {
      setCart([]);
    }

    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, [currentUser]);

  const fetchCart = (userId: string) => {
    const cartRef = doc(db, 'carts', userId);
    const unsubscribe = onSnapshot(cartRef, (doc) => {
      if (doc.exists()) {
        setCart(doc.data().items || []);
      } else {
        setCart([]);
        console.log('No cart found for user:', userId);
      }
    });

    return unsubscribe;
  };

  const addToCart = async (userId: string, item: CartItem) => {
    const cartRef = doc(db, 'carts', userId);

    const updatedCart = [...cart];
    const existingItemIndex = updatedCart.findIndex(
      (cartItem) => cartItem.id === item.id && cartItem.variation === item.variation
    );

    if (existingItemIndex > -1) {
      updatedCart[existingItemIndex].quantity += item.quantity;
    } else {
      updatedCart.push(item);
    }

    setCart(updatedCart);

    try {
      await setDoc(cartRef, {
        items: updatedCart,
        updatedAt: Timestamp.now(),
      });
      console.log('Cart updated successfully');
    } catch (error) {
      console.error('Error updating cart:', error);
    }
  };

  const updateQuantity = async (userId: string, id: string, variation: string, quantity: number) => {
    const cartRef = doc(db, 'carts', userId);

    const updatedCart = cart.map((item) =>
      item.id === id && item.variation === variation ? { ...item, quantity } : item
    );

    setCart(updatedCart);

    try {
      await updateDoc(cartRef, {
        items: updatedCart,
        updatedAt: Timestamp.now(),
      });
      console.log('Cart quantity updated');
    } catch (error) {
      console.error('Error updating quantity:', error);
    }
  };

  const removeFromCart = async (userId: string, id: string, variation: string) => {
    const cartRef = doc(db, 'carts', userId);

    const updatedCart = cart.filter(
      (item) => !(item.id === id && item.variation === variation)
    );

    setCart(updatedCart);

    try {
      await updateDoc(cartRef, {
        items: updatedCart,
        updatedAt: Timestamp.now(),
      });
      console.log('Item removed from cart');
    } catch (error) {
      console.error('Error removing item:', error);
    }
  };

  const clearCart = async (userId: string) => {
    const cartRef = doc(db, 'carts', userId);

    setCart([]);

    try {
      await updateDoc(cartRef, {
        items: deleteField(),
        updatedAt: Timestamp.now(),
      });
      console.log('Cart cleared');
    } catch (error) {
      console.error('Error clearing cart:', error);
    }
  };

  return (
    <CartContext.Provider
      value={{ cart, addToCart, updateQuantity, removeFromCart, clearCart, fetchCart }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
