import React from 'react';
import { useLocation } from 'react-router-dom';
import styles from './thank-you-page.module.scss';
import { Link } from 'react-router-dom';

export const ThankYouPage = () => {
    const location = useLocation();
    const { orderId, cart } = location.state || {};
    return (
        <div className={styles.thankYou}>
            <h1>Thank you for your order. We will get in touch with you via email</h1>
            {orderId && <h3>Your order ID is: {orderId}</h3>}
            {/* <p>You will receive a confirmation email shortly.</p> */}
            <Link to={`/`} className={styles.productLink}>
                <button>Return Home</button>
            </Link>
            <div className={styles.cart}>
                {cart.length === 0 ? (
                    <p>Your cart is empty.</p>
                ) : (
                    <div className={styles.cartItems}>
                        @ts-ignore
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
                                    {/* <Link to={`/merch/${item.id}`} className={styles.productLink}> */}
                                        <h3>{item.name}</h3>
                                    {/* </Link> */}
                                    <p>Variation: {item.variation}</p>
                                    <div className={styles.quantityWrapper}>
                                        <label htmlFor={`quantity-${item.id}-${item.variation}`}>
                                            Quantity:
                                        </label>
                                    </div>
                                    <p className={styles.price}>Price: ${item.price}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};
