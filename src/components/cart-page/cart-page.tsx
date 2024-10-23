import { useState, useEffect } from 'react';
import { useCart } from '../../context/CartContext';
import styles from './cart-page.module.scss';
import { Link } from 'react-router-dom';
import { db, auth } from '../../firebase'; // Import Firestore and Auth
import { useNavigate } from 'react-router-dom';
import { collection, addDoc } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';

export const CartPage = () => {
    const { cart, updateQuantity, removeFromCart, clearCart } = useCart();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [contact, setContact] = useState('');
    const [user, setUser] = useState<any>(null); // Store logged-in user
    const [errorMessage, setErrorMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    // Calculate the total price of the items in the cart
    const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

    // Get logged-in user details
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            if (currentUser) {
                setUser(currentUser); // Set the current user
                setEmail(currentUser.email || ''); // Pre-fill email
            }
        });
        return () => unsubscribe(); // Cleanup on unmount
    }, []);

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
            setLoading(true);
            const orderDetails = {
                name,
                email,
                contact,
                items: cart,
                total, // Add total price
                userId: user?.uid || null, // Store user UID
                status: 'pending', // Default status
                timestamp: new Date(), // Store order date
            };

            const docRef = await addDoc(collection(db, 'orders'), orderDetails);
            clearCart(); // Clear cart after order is placed
            alert('Order placed successfully!');
            navigate('/thank-you', { state: { orderId: docRef.id, cart: cart } });
        } catch (error) {
            console.error('Error adding document: ', error);
            setErrorMessage('Failed to place order. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={styles.cartpage}>
            <div className={styles.cart}>
                <h1>Your Cart</h1>
                {cart.length === 0 ? (
                    <p>Your cart is empty.</p>
                ) : (
                    <>
                        <h2>Total: ${total.toFixed(2)}</h2> {/* Display the total price */}
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
                                        <Link
                                            to={`/merch/${item.id}`}
                                            className={styles.productLink}
                                        >
                                            <h3>{item.name}</h3>
                                        </Link>
                                        <p>Variation: {item.variation}</p>
                                        <div className={styles.quantityWrapper}>
                                            <label
                                                htmlFor={`quantity-${item.id}-${item.variation}`}
                                            >
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
                                            onClick={() =>
                                                handleRemoveItem(item.id, item.variation)
                                            }
                                        >
                                            Remove
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </>
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
                    disabled
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
