import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { AdminDashboard } from '../components/admin-dashboard/admin-dashboard';
import { OrderDetailsPage } from '../components/order-details-page/order-details-page';
import {PrivateRoute} from './PrivateRoute'; // Assuming you're protecting these routes

export const AdminRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<PrivateRoute><AdminDashboard /></PrivateRoute>} />
      <Route path="order/:orderId" element={<PrivateRoute><OrderDetailsPage /></PrivateRoute>} />
    </Routes>
  );
};
