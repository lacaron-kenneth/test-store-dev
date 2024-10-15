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

function App() {
    return (
      <AuthProvider>
        <CartProvider>
          <Router>
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
                <Route path="/" element={<HomePage />} />
                <Route path="/browse" element={<BrowsePage />} />
                <Route path="/cart" element={<CartPage />} />
                <Route path="/checkout" element={<CheckoutPage />} />
                <Route path="/thank-you" element={<ThankYouPage />} />
              </Routes>
            </Layout>
          </Router>
        </CartProvider>
      </AuthProvider>
    );
  }
  
  export default App;