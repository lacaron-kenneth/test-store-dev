import classNames from 'classnames';
import styles from './header.module.scss';
import LogoPng from '../../assets/logo.png';
import MenuAlignLeftDescSvg from '../../assets/menu align left desc.svg';
import { Drawer } from '../drawer/drawer';
import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { SearchBar } from '../search-bar/search-bar';
import { MiniCart } from '../mini-cart/mini-cart';
import { FaShoppingCart } from 'react-icons/fa';

export interface HeaderProps {
    className?: string;
}

export const Header = ({ className }: HeaderProps) => {
    const [isDrawerVisible, setDrawerVisible] = useState(false);
    const drawerRef = useRef<HTMLDivElement | null>(null); // Ref for the drawer element
    function toggleDrawer() {
        setDrawerVisible(!isDrawerVisible);
    }

    // Handle outside click
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (drawerRef.current && !drawerRef.current.contains(event.target as Node)) {
                setDrawerVisible(false); // Close drawer if clicked outside
            }
        }

        if (isDrawerVisible) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }

        // Cleanup the event listener on unmount
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isDrawerVisible]);

    return (
        <div className={styles.header}>
            <Link to={'/'} className={classNames(styles['header-section'], styles.logo)}>
                <img src={LogoPng} alt="" className={classNames(styles.logo, styles['logo-img'])} />
            </Link>
            <div className={classNames(styles.search, styles['header-section'])}>
                <SearchBar />
            </div>
            <div className={classNames(styles['header-section'], styles.nav)}>
                <Link to={'/browse'}>
                    <h2 className={styles['nav-text']}>Merchandise</h2>
                </Link>
                <Link to={'/'}>
                    <h2 className={styles['nav-text']}>Profile</h2>
                </Link>
                <Link to={'/cart'}>
                    <h2 className={styles['nav-text']}>Cart</h2>
                </Link>
                <div className={styles.cartWrapper}>
                    {/* Cart icon */}
                    <Link to="/cart" className={styles.cartIcon}>
                        <FaShoppingCart /> {/* Use the cart icon here */}
                    </Link>

                    {/* Mini Cart */}
                    <div className={styles.miniCartWrapper}>
                        <MiniCart />
                    </div>
                </div>
            </div>
            <div className={styles.hamburger}>
                <img src={MenuAlignLeftDescSvg} alt="" onClick={toggleDrawer} />
            </div>
            {isDrawerVisible && (
                <div ref={drawerRef}>
                    <Drawer className={styles.drawer} />
                </div>
            )}
        </div>
    );
};
