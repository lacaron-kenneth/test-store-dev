import classNames from 'classnames';
import styles from './mini-cart.module.scss';
import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';

export interface MiniCartProps {
    className?: string;
}

export const MiniCart = ({ className }: MiniCartProps) => {
    const { cart } = useCart();

    // Calculate total price
    const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

    return (
        <div className={styles.miniCart}>
            <h3>Your Cart</h3>
            {cart.length === 0 ? (
                <p>Your cart is empty.</p>
            ) : (
                <div className={styles.cartItems}>
                    {cart.map((item) => (
                        <div key={item.id + item.variation} className={styles.cartItem}>
                            <img
                                src={item.image}
                                alt={item.name}
                                className={styles.cartImage}
                            />
                            <div className={styles.cartDetails}>
                                <p>{item.name}</p>
                                <p>Qty: {item.quantity}</p>
                                <p className={styles.price}>Price: ${item.price}</p>
                            </div>
                        </div>
                    ))}
                </div>
            )}
            {/* Total price and link to cart */}
            <div className={styles.cartSummary}>
                <p className={styles.total}>Total: ${totalPrice.toFixed(2)}</p>
                <Link to="/cart" className={styles.cartLink}>
                    Go to Cart
                </Link>
            </div>
        </div>
    );
};
