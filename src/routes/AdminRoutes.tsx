import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { AdminDashboard } from '../components/admin-dashboard/admin-dashboard';
import { OrderDetailsPage } from '../components/order-details-page/order-details-page';
import {PrivateRoute} from './PrivateRoute'; // Assuming you're protecting these routes
import { OrderLogs } from '../components/order-log/order-log';
import { AdminProductPage } from '../components/admin-dashboard/admin-product-page';
import { ProductDetail } from '../components/product-page/product-detail-page';
import {ProductAdd} from '../components/product-page/product-add';

export const AdminRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<PrivateRoute><AdminDashboard /></PrivateRoute>} />
      <Route path="order/:orderId" element={<PrivateRoute><OrderDetailsPage /></PrivateRoute>} />
      <Route path="order/:orderId/logs" element={<OrderLogs />} />
      <Route path="/products" element={<AdminProductPage />} />
      {/* <Route path="/products/:productId" element={<ProductDetails productId={''} />} /> */}
      <Route path="/products/:productId" element={<ProductDetail />} />
      <Route path="/products/add" element={<ProductAdd />} />
    </Routes>
  );
};
