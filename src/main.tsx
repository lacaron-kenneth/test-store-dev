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
import { CheckoutPage } from './components/checkout-page/checkout-page';
import { ThankYouPage } from './components/thank-you-page/thank-you-page';
import { AdminDashboard } from './components/admin-dashboard/admin-dashboard';
import { Login } from './components/login/login';
import { PrivateRoute } from './routes/PrivateRoute';
import { AuthProvider } from './context/AuthContext';
import { AdminRoutes } from './routes/AdminRoutes';
const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
    <React.StrictMode>
        <Router>
            <AuthProvider>

            <CartProvider>
                <Layout>
                    <Routes>
                        <Route path="/login" element={<Login />} />
                        <Route
                            path="/admin-dashboard"
                            element={
                                <PrivateRoute adminOnly>
                                    <AdminDashboard />
                                </PrivateRoute>
                            }
                        />
                        <Route path="/login" element={<Login />} />
                        <Route path="/admin-dashboard" element={<AdminDashboard />} />
                        <Route path="/" element={<HomePage />} />
                        <Route path="/browse" element={<BrowsePage />} />
                        <Route path="/search" element={<Search />} />
                        <Route path="/merch/:id" element={<ProductPage />} />
                        
                        <Route path="/cart" element={<CartPage />} />
                        <Route path="/thank-you" element={<ThankYouPage />} />
                        <Route path="/checkout" element={<CheckoutPage />}></Route>
                        <Route path="admin-dashboard/*" element={<AdminRoutes />} /> {/* Nested routes */}
                    </Routes>
                </Layout>
            </CartProvider>
            </AuthProvider>
        </Router>
    </React.StrictMode>
);
