import React, { useState, useEffect } from 'react';
import { OrderTable } from '../order/order-table';
import { fetchOrders, updateOrderStatus } from '../../firebase'; // Fetch orders from firebase.ts
import { Order } from '../../firebase'; // Import the Order type
import { getAuth, onAuthStateChanged } from 'firebase/auth'; // Import Firebase Auth
import styles from './admin-dashboard.module.scss';

export const AdminDashboard: React.FC = () => {
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true); // Loading state for fetching orders
    const [error, setError] = useState<string | null>(null); // Error state
    const [userEmail, setUserEmail] = useState<string | null>(null); // State to hold current user's email

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

    // Get the currently logged-in user’s email
    useEffect(() => {
        const auth = getAuth();
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUserEmail(user.email); // Set the user's email
            } else {
                setUserEmail(null);
            }
        });
        return () => unsubscribe();
    }, []);

    const handleUpdateOrderStatus = async (id: string, newStatus: string) => {
        try {
            if (userEmail) {
                await updateOrderStatus(id, newStatus, userEmail); // Use current user email
                // Fetch the updated orders
                const updatedOrders = await fetchOrders();
                setOrders(updatedOrders); // Update state with fetched orders
            } else {
                console.error('User email is not available.');
            }
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
            {userEmail && <p>Welcome, {userEmail}</p>}
            
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
