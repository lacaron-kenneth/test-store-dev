import React, { useState, useEffect } from 'react';
import { OrderTable } from '../order/order-table';
import { fetchOrders, updateOrderStatus } from '../../firebase'; // Fetch orders from firebase.ts
import { Order } from '../../firebase'; // Import the Order type
import styles from './admin-dashboard.module.scss';

export const AdminDashboard: React.FC = () => {
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true); // Loading state for fetching orders
    const [error, setError] = useState<string | null>(null); // Error state

    // Fetch orders on component mount
    useEffect(() => {
        const loadOrders = async () => {
            try {
                setLoading(true);
                const fetchedOrders = await fetchOrders();
                setOrders(fetchedOrders);
            } catch (err) {
                console.error('Failed to fetch orders:', err);
                setError('Failed to load orders. Please try again later.');
            } finally {
                setLoading(false);
            }
        };
        loadOrders();
    }, []);

    const handleUpdateOrderStatus = async (id: string, newStatus: string) => {
        try {
            await updateOrderStatus(id, newStatus);
            // Fetch the updated orders
            const updatedOrders = await fetchOrders();
            setOrders(updatedOrders); // Update state with fetched orders
        } catch (err) {
            console.error('Error updating order status:', err);
            setError('Failed to update order status. Please try again later.');
        }
    };

    const [filteredOrders, setFilteredOrders] = useState<Order[]>([]);
    const [searchQuery, setSearchQuery] = useState('');

    // Filter orders based on search query
    useEffect(() => {
        const lowerCaseQuery = searchQuery.toLowerCase();
        const filtered = orders.filter(order =>
            order.email.toLowerCase().includes(lowerCaseQuery) ||
            order.id.toLowerCase().includes(lowerCaseQuery)
        );
        setFilteredOrders(filtered);
    }, [searchQuery, orders]);

    if (loading) {
        return <div>Loading...</div>; // Show loading state
    }

    if (error) {
        return <div>{error}</div>; // Show error message
    }

    return (
        <div className={styles.dashboard}>
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
