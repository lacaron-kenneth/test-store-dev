import { ReactNode } from 'react';
import { Header } from '../header/header';
import { Footer } from '../footer/footer';
import styles from './layout.module.scss'; // Add your layout styles here
interface LayoutProps {
    children: ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
    return (
        <div className={styles.layout}>
            <Header />
            <main className={styles.main}>{children}</main>
            <Footer />
        </div>
    );
};
