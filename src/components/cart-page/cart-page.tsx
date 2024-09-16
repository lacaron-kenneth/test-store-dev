// CartPage.tsx
import React from 'react';
import { useCart } from '../../context/CartContext';
import styles from './cart-page.module.scss';

export const CartPage = () => {
    const { cart, updateQuantity, removeFromCart } = useCart();

    const handleQuantityChange = (id: string, variation: string, newQuantity: number) => {
        updateQuantity(id, variation, newQuantity);
    };

    const handleRemoveItem = (id: string, variation: string) => {
        removeFromCart(id, variation);
    };

    return (
        <div className={styles.cart}>
            <h1>Your Cart</h1>
            {cart.length === 0 ? (
                <p>Your cart is empty.</p>
            ) : (
                <div className={styles.cartItems}>
                    {cart.map((item) => (
                        <div key={item.id + item.variation} className={styles.cartItem}>
                            <div className={styles['image-wrapper']}>
                                <img
                                    src={item.image}
                                    alt={item.name}
                                    className={styles.cartImage}
                                />
                            </div>
                            <div className={styles.cartDetails}>
                                <h3>{item.name}</h3>
                                <p>Variation: {item.variation}</p>
                                <div className={styles.quantityWrapper}>
                                    <label htmlFor={`quantity-${item.id}-${item.variation}`}>Quantity:</label>
                                    <input
                                        type="number"
                                        id={`quantity-${item.id}-${item.variation}`}
                                        value={item.quantity}
                                        onChange={(e) => handleQuantityChange(item.id, item.variation, parseInt(e.target.value))}
                                        min="1"
                                    />
                                </div>
                                <p className={styles.price}>Price: ${item.price}</p>
                                <button onClick={() => handleRemoveItem(item.id, item.variation)}>Remove</button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};
