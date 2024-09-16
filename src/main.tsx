import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HomePage } from './components/home-page/home-page';
import { BrowsePage } from './components/browse-page/browse-page';
import { Search } from './components/search/search';
import { ProductPage } from './components/product-page/product-page';
import { Layout } from './components/layout/layout';
import { CartProvider } from './context/CartContext';
import { CartPage } from './components/cart-page/cart-page';
const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
    <React.StrictMode>
        <Router>
            <CartProvider>
                <Layout>
                    <Routes>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/browse" element={<BrowsePage />} />
                        <Route path="/search" element={<Search />} />
                        <Route path="/merch/:id" element={<ProductPage />}/>
                        <Route path="/cart" element={<CartPage />}>
                            {' '}
                        </Route>
                    </Routes>
                </Layout>
            </CartProvider>
        </Router>
    </React.StrictMode>
);
