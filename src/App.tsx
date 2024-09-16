import styles from './App.module.scss';
import { BrowsePage } from './components/browse-page/browse-page';
import { HomePage } from './components/home-page/home-page';
import { Routes, Route } from 'react-router-dom';
import { MemoryRouter } from 'react-router-dom';
import { Search } from './components/search/search';
import { ProductPage } from './components/product-page/product-page';
import { Layout } from './components/layout/layout';
import { CartProvider } from './context/CartContext';
import { CartPage } from './components/cart-page/cart-page';

function App() {
    return (
        <div className={styles.App}>
            <MemoryRouter>
                <CartProvider>
                    <Layout>
                        <Routes>
                            <Route path="/" element={<HomePage />}></Route>
                            <Route path="/browse" element={<BrowsePage />}></Route>
                            <Route path="/search" element={<Search />}></Route>
                            <Route path="/merch/:id" element={<ProductPage />}></Route>
                            <Route path="/cart" element={<CartPage />}></Route>
                        </Routes>
                        <HomePage />
                    </Layout>
                </CartProvider>
            </MemoryRouter>
        </div>
    );
}

export default App;
