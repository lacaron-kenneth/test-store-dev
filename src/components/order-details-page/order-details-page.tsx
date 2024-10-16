import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getOrderById } from '../../firebase'; // Fetch individual order by ID
import { Order } from '../../firebase'; // Import the Order type

export const OrderDetailsPage: React.FC = () => {
  const { orderId } = useParams<{ orderId: string }>();
  const [order, setOrder] = useState<Order | null>(null);

  useEffect(() => {
    const fetchOrder = async () => {
      if (orderId) {
        const fetchedOrder = await getOrderById(orderId);
        setOrder(fetchedOrder);
      }
    };
    fetchOrder();
  }, [orderId]);

  if (!order) return <div>Loading...</div>;

  return (
    <div>
      <h1>Order Details for Order ID: {order.id}</h1>
      <p><strong>Customer Name:</strong> {order.name}</p>
      <p><strong>Email:</strong> {order.email}</p>
      <p><strong>Contact:</strong> {order.contact}</p>
      <p><strong>Status:</strong> {order.status}</p>
      <p><strong>Total:</strong> ${order.total}</p>

      <p><strong>Items:</strong></p>
      <ul>
        {order.items.map(item => (
          <li key={item.id}>
            {item.name} - {item.quantity} x ${item.price} ({item.variation})
          </li>
        ))}
      </ul>
    </div>
  );
};
