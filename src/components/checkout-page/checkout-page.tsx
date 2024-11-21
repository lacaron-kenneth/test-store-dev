import React, { useState } from 'react';
import { useCart } from '../../context/CartContext';
import { useNavigate } from 'react-router-dom';
import { db } from '../../firebase'; // Import firebase setup
import { collection, addDoc } from 'firebase/firestore';
import styles from './checkout-page.module.scss';

export const CheckoutPage = () => {
    const { cart, clearCart } = useCart();
    const [formData, setFormData] = useState({ name: '', email: '', contact: '' });
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handlePlaceOrder = async () => {
        setLoading(true);
        try {
            const orderData = {
                ...formData,
                cart,
                date: new Date(),
            };
            const docRef = await addDoc(collection(db, 'orders'), orderData);
            console.log('Order placed with ID: ', docRef.id);
            // clearCart(); // Clear cart after placing order
            navigate('/thank-you', { state: { orderId: docRef.id } });
        } catch (error) {
            console.error('Error placing order: ', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={styles.checkout}>
            <h1>Checkout</h1>
            <form className={styles.checkoutForm}>
                <div>
                    <label htmlFor="name">Name</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="contact">Contact Information</label>
                    <input
                        type="text"
                        id="contact"
                        name="contact"
                        value={formData.contact}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <button type="button" onClick={handlePlaceOrder} disabled={loading}>
                    {loading ? 'Placing Order...' : 'Place Order'}
                </button>
            </form>
        </div>
    );
};
