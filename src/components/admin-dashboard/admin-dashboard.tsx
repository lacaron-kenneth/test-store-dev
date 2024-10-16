import React, { useState, useEffect } from 'react';
import { OrderTable } from '../order/order-table';
import { fetchOrders, updateOrderStatus } from '../../firebase'; // Fetch orders from firebase.ts
import { Order } from '../../firebase'; // Import the Order type

export const AdminDashboard: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    const loadOrders = async () => {
      const fetchedOrders = await fetchOrders();
      setOrders(fetchedOrders);
    };
    loadOrders();
  }, []);

  const handleUpdateOrderStatus = async (id: string, newStatus: string) => {
    await updateOrderStatus(id, newStatus);
    setOrders(prevOrders =>
      prevOrders.map(order =>
        order.id === id ? { ...order, status: newStatus } : order
      )
    );
  };

  const [filteredOrders, setFilteredOrders] = useState<Order[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  // Fetch orders on component mount
  useEffect(() => {
    const getOrders = async () => {
      const fetchedOrders = await fetchOrders();
      setOrders(fetchedOrders);
      setFilteredOrders(fetchedOrders); // Set initial filtered orders
    };
    getOrders();
  }, []);

  // Filter orders based on search query
  useEffect(() => {
    const lowerCaseQuery = searchQuery.toLowerCase();
    const filtered = orders.filter(order =>
      order.email.toLowerCase().includes(lowerCaseQuery) ||
      order.id.toLowerCase().includes(lowerCaseQuery)
    );
    setFilteredOrders(filtered);
  }, [searchQuery, orders]);

  return (
    <div>
      <h1>Admin Dashboard</h1>
      
      {/* Search bar */}
      <input
        type="text"
        placeholder="Search by Order ID or Email"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />

      {/* Order table */}
      <OrderTable orders={filteredOrders} updateOrderStatus={handleUpdateOrderStatus} />
    </div>
  );
};
