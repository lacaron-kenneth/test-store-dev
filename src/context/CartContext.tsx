// context/CartContext.tsx
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface CartItem {
    id: string;
    name: string;
    price: number;
    variation: string;
    image: string; // Store the image URL
    quantity: number;
}

interface CartContextProps {
    cart: CartItem[];
    addToCart: (item: CartItem) => void;
    updateQuantity: (id: string, variation: string, quantity: number) => void;
    removeFromCart: (id: string, variation: string) => void;
}

const CartContext = createContext<CartContextProps | undefined>(undefined);

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [cart, setCart] = useState<CartItem[]>([]);

    const addToCart = (item: CartItem) => {
        setCart((prevCart) => {
            const existingItemIndex = prevCart.findIndex(
                (cartItem) => cartItem.id === item.id && cartItem.variation === item.variation
            );

            if (existingItemIndex !== -1) {
                const updatedCart = [...prevCart];
                updatedCart[existingItemIndex].quantity += item.quantity; // Update quantity if already in cart
                return updatedCart;
            }

            return [...prevCart, item]; // Add new item to the cart
        });
    };

    const updateQuantity = (id: string, variation: string, quantity: number) => {
        setCart((prevCart) =>
            prevCart.map((item) =>
                item.id === id && item.variation === variation
                    ? { ...item, quantity }
                    : item
            )
        );
    };

    const removeFromCart = (id: string, variation: string) => {
        setCart((prevCart) => prevCart.filter((item) => !(item.id === id && item.variation === variation)));
    };

    return (
        <CartContext.Provider value={{ cart, addToCart, updateQuantity, removeFromCart }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};
