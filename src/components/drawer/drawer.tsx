import classNames from 'classnames';
import styles from './drawer.module.scss';
import LogoPng from '../../assets/logo.png';
import XLogoSvg from '../../assets/x  logo.svg';
import { SearchBar } from '../search-bar/search-bar';
import { useCart } from '../../context/CartContext';
import { Link } from 'react-router-dom';

export interface DrawerProps {
    className?: string;
}

/**
 * This component was created using Codux's Default new component template.
 * To create custom component templates, see https://help.codux.com/kb/en/article/kb16522
 */
export const Drawer = ({ className }: DrawerProps) => {
    const { cart } = useCart();
    const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

    return (
        <div className={styles.drawer}>
            <div className={styles.div2}>
                <img src={LogoPng} alt="" className={styles.logo} />
                <SearchBar />
                <div className={styles.nav}>
                <Link to={'/browse'}>
                    <h2 className={styles['nav-text']}>Merchandise</h2>
                </Link>
                <Link to={'/'}>
                    <h2 className={styles['nav-text']}>Profile</h2>
                </Link>
                <Link to={'/cart'}>
                    <h2 className={styles['nav-text']}>Cart</h2>
                </Link>
                </div>
                <div className={styles.miniCart}>
            <h3>Your Cart</h3>
            {cart.length === 0 ? (
                <b>Your cart is empty.</b>
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
            </div>
            <div className={styles.footer}>
                <img src={XLogoSvg} alt="" className={styles.img1} />
                <p>All rights reserved. 2024</p>
                <div className={styles.div3} />
                <nav>
                    <a href="/home" className={styles.a1}>
                        Home
                    </a>{' '}
                    | | <a href="/about">About</a> | <a href="/contact">Contact Us</a>
                </nav>
            </div>
        </div>
    );
};
