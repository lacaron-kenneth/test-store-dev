import { useState } from 'react';
import { useCart } from '../../context/CartContext';
import styles from './cart-page.module.scss';
import { Link } from 'react-router-dom';
import { db } from '../../firebase'; // Import Firestore
import { useNavigate } from 'react-router-dom';
import { collection, addDoc } from 'firebase/firestore';

export const CartPage = () => {
    const { cart, updateQuantity, removeFromCart, clearCart } = useCart();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [contact, setContact] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleQuantityChange = (id: string, variation: string, newQuantity: number) => {
        updateQuantity(id, variation, newQuantity);
    };

    const handleRemoveItem = (id: string, variation: string) => {
        removeFromCart(id, variation);
    };

    const handlePlaceOrder = async () => {
        if (!name || !email || !contact) {
            setErrorMessage('Please fill in all fields.');
            return;
        }

        try {
            const orderDetails = {
                name,
                email,
                contact,
                items: cart,
                timestamp: new Date(),
            };

            const docRef = await addDoc(collection(db, 'orders'), orderDetails);
            clearCart(); // Clear cart after order is placed
            alert('Order placed successfully!');
            navigate('/thank-you', { state: { orderId: docRef.id , cart: cart }  });
        } catch (error) {
            console.error('Error adding document: ', error);
            setErrorMessage('Failed to place order. Please try again later.');
        }
    };

    return (
        <div className={styles.cartpage}>
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
                                    <Link to={`/merch/${item.id}`} className={styles.productLink}>
                                        <h3>{item.name}</h3>
                                    </Link>
                                    <p>Variation: {item.variation}</p>
                                    <div className={styles.quantityWrapper}>
                                        <label htmlFor={`quantity-${item.id}-${item.variation}`}>
                                            Quantity:
                                        </label>
                                        <input
                                            type="number"
                                            id={`quantity-${item.id}-${item.variation}`}
                                            value={item.quantity}
                                            onChange={(e) =>
                                                handleQuantityChange(
                                                    item.id,
                                                    item.variation,
                                                    parseInt(e.target.value)
                                                )
                                            }
                                            min="1"
                                        />
                                    </div>
                                    <p className={styles.price}>Price: ${item.price}</p>
                                    <button
                                        onClick={() => handleRemoveItem(item.id, item.variation)}
                                    >
                                        Remove
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
            <div className={styles.checkout}>
                <h2>Checkout Items</h2>

                <h3>Enter Your Contact Details</h3>
                <input
                    type="text"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Contact Number"
                    value={contact}
                    onChange={(e) => setContact(e.target.value)}
                />
                {errorMessage && <p className={styles.error}>{errorMessage}</p>}
                <button type="button" onClick={handlePlaceOrder} disabled={loading}>
                    {loading ? 'Placing Order...' : 'Place Order'}
                </button>
            </div>
        </div>
    );
};
