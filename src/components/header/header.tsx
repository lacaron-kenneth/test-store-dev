import classNames from 'classnames';
import styles from './header.module.scss';
import LogoPng from '../../assets/logo.png';
import MenuAlignLeftDescSvg from '../../assets/menu align left desc.svg';
import { Drawer } from '../drawer/drawer';
import { useState, useEffect, useRef } from 'react';
export interface HeaderProps {
    className?: string;
}

export const Header = ({ className }: HeaderProps) => {

 const [isDrawerVisible, setDrawerVisible] = useState(false);
    const drawerRef = useRef(null); // To reference the drawer element

    function toggleDrawer() {
        setDrawerVisible(!isDrawerVisible);
    }

    // Handle outside click
    useEffect(() => {
        function handleClickOutside(event) {
            if (drawerRef.current && !drawerRef.current.contains(event.target)) {
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
            <div className={classNames(styles['header-section'], styles.logo)}>
                <img src={LogoPng} alt="" className={classNames(styles.logo, styles['logo-img'])} />
            </div>
            <div className={classNames(styles['header-section'], styles.search)}></div>
            <div className={classNames(styles['header-section'], styles.nav)}>
                <h2 className={styles['nav-text']}>Merchandise</h2>
                <h2 className={styles['nav-text']}>Profile</h2>
                <h2 className={styles['nav-text']}>Cart</h2>
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
