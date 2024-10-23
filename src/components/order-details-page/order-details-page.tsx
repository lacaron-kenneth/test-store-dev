import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getOrderById } from '../../firebase'; // Fetch individual order by ID
import { Order } from '../../firebase'; // Import the Order type
import styles from './order-details-page.module.scss';

export const OrderDetailsPage: React.FC = () => {
    const { orderId } = useParams<{ orderId: string }>();
    const [order, setOrder] = useState<Order | null>(null);

    useEffect(() => {
        const fetchOrder = async () => {
            if (orderId) {
                const fetchedOrder = await getOrderById(orderId);
                setOrder(fetchedOrder);
            }
        };
        fetchOrder();
    }, [orderId]);

    if (!order) return <div>Loading...</div>;

    return (
        <div className={styles.thankYou}>
            <h1>Order Details for Order ID: {order.id}</h1>
                <h3>Customer Name: {order.name}</h3>
                <h3>Email:{order.email}</h3>
                <h3>Contact: {order.contact}</h3>
                <h3>Status: {order.status}</h3>
                <h3>Total: ${order.total}</h3>
                <h3>Items:</h3>

            <div className={styles.cart}>
                {order.items.length === 0 ? (
                    <p>Order is empty.</p>
                ) : (
                    <div className={styles.cartItems}>
                        {order.items.map((item) => (
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
                                        <label htmlFor={`quantity-${item.id}-${item.variation}`}>
                                            Quantity: {item.quantity}
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
