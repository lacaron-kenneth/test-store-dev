import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Order } from '../../types'; // Import the type for Order
import styles from './order-table.module.css';
import { Timestamp } from 'firebase/firestore';

// Helper function to format Firestore Timestamps to readable dates and times
const formatTimestamp = (timestamp: Timestamp | null) => {
  return timestamp ? timestamp.toDate().toLocaleString() : 'N/A'; // Include both date and time
};

interface OrderTableProps {
  orders: Order[];
  updateOrderStatus: (id: string, newStatus: string) => void;
}

export const OrderTable: React.FC<OrderTableProps> = ({ orders, updateOrderStatus }) => {
  const [filter, setFilter] = useState<string>('pending');
  const [currentPage, setCurrentPage] = useState(1);
  const [sortField, setSortField] = useState<string>('timestamp');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
  const itemsPerPage = 50;

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilter(e.target.value);
  };

  const handleSort = (field: string) => {
    const direction = sortField === field && sortDirection === 'asc' ? 'desc' : 'asc';
    setSortField(field);
    setSortDirection(direction);
  };

  const sortedOrders = [...orders].sort((a, b) => {
    const aValue = a[sortField as keyof Order];
    const bValue = b[sortField as keyof Order];
    if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1;
    if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1;
    return 0;
  });

  const filteredOrders = filter === 'all' ? sortedOrders : sortedOrders.filter((order) => order.status === filter);
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
          <option value="pending">Pending</option>
          <option value="approved">Approved</option>
          <option value="delivery">In Delivery</option>
          <option value="finished">Finished</option>
          <option value="delayed">Delayed</option>
          <option value="canceled">Canceled</option>
          <option value="all">All</option>
        </select>
      </div>
      <div className={styles.tablewrapper}>
        <table className={styles.f1table}>
          <thead>
            <tr>
              <th onClick={() => handleSort('id')}>Order ID</th>
              <th onClick={() => handleSort('email')}>Customer Name</th>
              <th onClick={() => handleSort('total')}>Total</th>
              <th onClick={() => handleSort('timestamp')}>Order Placed</th>
              <th onClick={() => handleSort('statusTimestamps.approved')}>Approved</th>
              <th onClick={() => handleSort('statusTimestamps.delivery')}>In Delivery</th>
              <th onClick={() => handleSort('statusTimestamps.finished')}>Finished</th>
              <th onClick={() => handleSort('statusTimestamps.canceled')}>Canceled</th>
              <th>Status</th>
              <th>Logs</th> {/* Add Logs Column */}
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginatedOrders.map((order) => (
              <tr key={order.id}>
                <td>
                  <Link to={`order/${order.id}`}
                    onClick={(e) => {
                      e.preventDefault(); // Prevents default link behavior
                      window.open(`/admin-dashboard/order/${order.id}`, '_blank'); // Opens in a new tab
                    }}>{order.id}</Link>
                </td>
                <td>{order.email}</td>
                <td>${order.total}</td>
                <td>{formatTimestamp(order.timestamp)}</td>
                <td>{formatTimestamp(order.statusTimestamps?.approved)}</td>
                <td>{formatTimestamp(order.statusTimestamps?.delivery)}</td>
                <td>{formatTimestamp(order.statusTimestamps?.finished)}</td>
                <td>{formatTimestamp(order.statusTimestamps?.canceled)}</td>
                <td className={styles.status}>{order.status}</td>
                <td>
                  <Link
                    to={`order/${order.id}/logs`}
                    onClick={(e) => {
                      e.preventDefault(); // Prevents default link behavior
                      window.open(`admin-dashboard/order/${order.id}/logs`, '_blank'); // Opens in a new tab
                    }}
                  >
                    View Logs
                  </Link>{' '}
                  {/* Link to logs */}
                </td>
                <td>
                  <select
                    title="filter"
                    className={styles.categorySelect}
                    value={order.status}
                    onChange={(e) =>
                      updateOrderStatus(order.id, e.target.value)
                    }
                  >
                    <option value="">Select Action</option>
                    <option value="approved">Approved</option>
                    <option value="delivery">In Delivery</option>
                    <option value="finished">Finished</option>
                    <option value="delayed">Delayed</option>
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
