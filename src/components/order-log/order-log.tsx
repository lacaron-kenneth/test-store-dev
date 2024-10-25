import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase';
import { Timestamp } from 'firebase/firestore';
import styles from './order-log.module.css';

interface Log {
  adminEmail: string;
  change: string;
  timestamp: string; // Convert to string format
}

export const OrderLogs: React.FC = () => {
  const { orderId } = useParams<{ orderId: string }>();
  const [logs, setLogs] = useState<Log[]>([]);

  useEffect(() => {
    const fetchLogs = async () => {
      if (orderId) {
        const logsRef = collection(db, 'orders', orderId, 'logs');
        const logSnapshot = await getDocs(logsRef);

        const logsData = logSnapshot.docs.map((doc) => {
          const data = doc.data();
          return {
            ...data,
            timestamp: (data.timestamp as Timestamp).toDate().toLocaleString(), // Format timestamp
          };
        }) as Log[];
        
        setLogs(logsData);
      }
    };

    fetchLogs();
  }, [orderId]);

  return (
    <div className={styles.tablewrapper}>
      <h1>Order Logs for Order: {orderId}</h1>
      <table className={styles.f1table}>
        <thead>
          <tr>
            <th>Admin Email</th>
            <th>Change</th>
            <th>Timestamp</th>
          </tr>
        </thead>
        <tbody>
          {logs.map((log, index) => (
            <tr key={index}>
              <td>{log.adminEmail}</td>
              <td>{log.change}</td>
              <td>{log.timestamp}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
