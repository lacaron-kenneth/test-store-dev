import React from 'react';
import { useLocation } from 'react-router-dom';
import styles from './thank-you-page.module.scss';

export const ThankYouPage = () => {
    const location = useLocation();
    const { orderId } = location.state || {};

    return (
        <div className={styles.thankYou}>
            <h1>Thank You for Your Order!</h1>
            {orderId && <p>Your order ID is: {orderId}</p>}
            <p>You will receive a confirmation email shortly.</p>
        </div>
    );
};
