import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Order } from '../../types'; // Import the type for Order
import styles from './order-table.module.css';

interface OrderTableProps {
    orders: Order[];
    updateOrderStatus: (id: string, newStatus: string) => void;
}

export const OrderTable: React.FC<OrderTableProps> = ({ orders, updateOrderStatus }) => {
    const [filter, setFilter] = useState<string>('all');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 50;

    const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setFilter(e.target.value);
    };

    // Pagination logic
    const filteredOrders =
        filter === 'all' ? orders : orders.filter((order) => order.status === filter);

    const paginatedOrders = filteredOrders.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    return (
        <div className={styles.orders}>
            <div className={styles.filter}>
                <label htmlFor="filter">Filter Orders:</label>
                <select
                    id="filter"
                    value={filter}
                    onChange={handleFilterChange}
                    className={styles.categorySelect}
                >
                    <option value="all">All</option>
                    <option value="approved">Approved</option>
                    <option value="in delivery">In Delivery</option>
                    <option value="finished">Finished</option>
                    <option value="canceled">Canceled</option>
                </select>
            </div>
            <div className={styles.tablewrapper}>
                <table className={styles.f1table}>
                    <thead>
                        <tr>
                            <th>Order ID</th>
                            <th>Customer Name</th>
                            <th>Status</th>
                            <th>Total</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {paginatedOrders.map((order) => (
                            <tr key={order.id}>
                                <td>
                                    <Link to={`order/${order.id}`}>{order.id}</Link>
                                </td>
                                <td>{order.email}</td>
                                <td>{order.status}</td>
                                <td>${order.total}</td>
                                <td>
                                    <select
                                        title="filter"
                                        className={styles.categorySelect}
                                        value={order.status}
                                        onChange={(e) =>
                                            updateOrderStatus(order.id, e.target.value)
                                        }
                                    >
                                        <option value="approved">Approved</option>
                                        <option value="in delivery">In Delivery</option>
                                        <option value="finished">Finished</option>
                                        <option value="canceled">Canceled</option>
                                    </select>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {/* Pagination */}
            <div>
                {Array.from({ length: Math.ceil(filteredOrders.length / itemsPerPage) }, (_, i) => (
                    <button key={i + 1} onClick={() => setCurrentPage(i + 1)}>
                        {i + 1}
                    </button>
                ))}
            </div>
        </div>
    );
};
