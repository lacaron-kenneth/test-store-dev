import classNames from 'classnames';
import styles from './drawer.module.scss';
import LogoPng from '../../assets/logo.png';
import XLogoSvg from '../../assets/x  logo.svg';
import { SearchBar } from '../search-bar/search-bar';

export interface DrawerProps {
    className?: string;
}

/**
 * This component was created using Codux's Default new component template.
 * To create custom component templates, see https://help.codux.com/kb/en/article/kb16522
 */
export const Drawer = ({ className }: DrawerProps) => {
    return (
        <div className={styles.drawer}>
            <div className={styles.div2}>
                <img src={LogoPng} alt="" className={styles.logo} />
                <SearchBar />
                <div className={styles.nav}>
                    <h3>Merchandise</h3>
                    <h3>Profile</h3>
                    <h3>Cart</h3>
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
