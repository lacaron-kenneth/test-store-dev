import { useEffect, useState } from 'react';
import { fetchOrders, updateOrderStatus } from '../../firebase'; // Adjust path as needed
import styles from './admin-dashboard.module.scss'; // Add your own styles

interface Order {
    id: string;
    contact: string;
    email: string;
    items: Array<{
        id: string;
        image: string;
        name: string;
        price: number;
        quantity: number;
        variation: string;
    }>;
    name: string;
    timestamp: any;
    status?: string;
}

export const AdminDashboard = () => {
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);
    const [statusFilter, setStatusFilter] = useState('pending'); // For filtering by status

    useEffect(() => {
        const loadOrders = async () => {
            const fetchedOrders = await fetchOrders();
            setOrders(fetchedOrders);
            setLoading(false);
        };

        loadOrders();
    }, []);

    const handleStatusChange = async (orderId: string, status: string) => {
        await updateOrderStatus(orderId, status);
        setOrders(orders.map((order) => (order.id === orderId ? { ...order, status } : order)));
    };

    // Pagination logic (e.g., show 5 orders per page)
    const [currentPage, setCurrentPage] = useState(1);
    const ordersPerPage = 5;
    const indexOfLastOrder = currentPage * ordersPerPage;
    const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
    const currentOrders = orders.slice(indexOfFirstOrder, indexOfLastOrder);

    const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

    if (loading) {
        return <div>Loading orders...</div>;
    }

    return (
        <div className={styles.adminDashboard}>
            <h1>Admin Dashboard - Orders</h1>
            <div className={styles.filters}>
                <button onClick={() => setStatusFilter('pending')}>Pending</button>
                <button onClick={() => setStatusFilter('approved')}>Approved</button>
                <button onClick={() => setStatusFilter('in delivery')}>In Delivery</button>
                <button onClick={() => setStatusFilter('finished')}>Finished</button>
                <button onClick={() => setStatusFilter('canceled')}>Canceled</button>
                <button onClick={() => setStatusFilter('')}>All</button>
            </div>
            <h2 style={{ textTransform: 'capitalize' }}>{statusFilter}</h2>
            {currentOrders
                .filter((order) => !statusFilter || order.status === statusFilter)
                .map((order) => (
                    <div key={order.id} className={styles.order}>
                        <h2>
                            Order from {order.name} ({order.email})
                        </h2>
                        <p>Contact: {order.contact}</p>
                        <p>Items:</p>
                        <ul>
                            {order.items.map((item) => (
                                <li key={item.id} className={styles.cartItem}>
                                    <div className={styles['image-wrapper']}>
                                        <img
                                            src={item.image}
                                            alt={item.name}
                                            className={styles.cartImage}
                                        />
                                    </div>
                                    <div className={styles.cartDetails}>
                                        {/* <Link to={`/merch/${item.id}`} className={styles.productLink}> */}
                                        <h3>{item.name}</h3>
                                        {/* </Link> */}
                                        <p>Variation: {item.variation}</p>
                                        <div className={styles.quantityWrapper}>
                                            <label
                                                htmlFor={`quantity-${item.id}-${item.variation}`}
                                            >
                                                Quantity: {item.quantity}
                                            </label>
                                        </div>
                                        <p className={styles.price}>Price: ${item.price}</p>
                                    </div>
                                </li>
                            ))}
                        </ul>
                        <p>
                            Ordered on: {new Date(order.timestamp.seconds * 1000).toLocaleString()}
                        </p>
                        <p>Status: {order.status || 'Pending'}</p>
                        <div className={styles.orderActions}>
                            <button onClick={() => handleStatusChange(order.id, 'approved')}>
                                Approve
                            </button>
                            <button onClick={() => handleStatusChange(order.id, 'in delivery')}>
                                In Delivery
                            </button>
                            <button onClick={() => handleStatusChange(order.id, 'finished')}>
                                Finish
                            </button>
                            <button onClick={() => handleStatusChange(order.id, 'canceled')}>
                                Cancel
                            </button>
                        </div>
                    </div>
                ))}

            {/* Pagination Controls */}
            <div className={styles.pagination}>
                {Array.from({ length: Math.ceil(orders.length / ordersPerPage) }, (_, i) => (
                    <button key={i} onClick={() => paginate(i + 1)}>
                        {i + 1}
                    </button>
                ))}
            </div>
        </div>
    );
};
