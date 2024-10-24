import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { collection, getDocs, doc } from 'firebase/firestore';
import { db } from '../../firebase';

interface Log {
  adminEmail: string;
  change: string;
  timestamp: any; // We will later convert this to a Date
}

export const OrderLogs: React.FC = () => {
  const { orderId } = useParams<{ orderId: string }>();
  const [logs, setLogs] = useState<Log[]>([]);

  useEffect(() => {
    if (orderId) { // Ensure orderId is defined
      const fetchLogs = async () => {
        const orderDocRef = doc(db, 'orders', orderId); // Use orderId safely
        const logsRef = collection(orderDocRef, 'logs');
        const logSnapshot = await getDocs(logsRef);

        const logsData = logSnapshot.docs.map((doc) => doc.data() as Log);
        setLogs(logsData);
      };

      fetchLogs();
    }
  }, [orderId]);

  return (
    <div>
      <h2>Order Logs for Order {orderId}</h2>
      <table>
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
              <td>{log.timestamp?.toDate().toLocaleString()}</td> {/* Convert Firestore Timestamp to JS Date */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
