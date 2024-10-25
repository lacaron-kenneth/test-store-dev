import { BrowsePage } from './components/browse-page/browse-page';
import { HomePage } from './components/home-page/home-page';
import { Routes, Route } from 'react-router-dom';
import { Layout } from './components/layout/layout';
import { CartProvider } from './context/CartContext';
import { CartPage } from './components/cart-page/cart-page';
import { CheckoutPage } from './components/checkout-page/checkout-page';
import { ThankYouPage } from './components/thank-you-page/thank-you-page';
import { AdminDashboard } from './components/admin-dashboard/admin-dashboard';
import { Login } from './components/login/login';
import { PrivateRoute } from './routes/PrivateRoute';
import { BrowserRouter as Router } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { AdminRoutes } from './routes/AdminRoutes';
import { Search } from './components/search/search';
import { ProductPage } from './components/product-page/product-page';

function App() {
    return (
      <AuthProvider>
        <CartProvider>
          <Router>
            <Layout>
              <Routes>
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
              </Routes>
            </Layout>
          </Router>
        </CartProvider>
      </AuthProvider>
    );
  }
  
  export default App;