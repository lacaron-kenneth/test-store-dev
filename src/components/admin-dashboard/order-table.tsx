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
    status: string; // Optional or required based on how it's set up in Firestore
    total: number;  // Assuming total is calculated from items
  }


interface OrderTableProps {
    orders: Order[];
    updateOrderStatus: (id: string, newStatus: string) => void;
}

export const OrderTable: React.FC<OrderTableProps> = ({ orders, updateOrderStatus }) => {
    return (
        <table>
            <thead>
                <tr>
                    <th>Customer Name</th>
                    <th>Status</th>
                    <th>Total</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {orders.map((order) => (
                    <tr key={order.id}>
                        <td>{order.name}</td> {/* Assuming 'name' is the customer name */}
                        <td>{order.status}</td>
                        <td>${order.total.toFixed(2)}</td> {/* Show total price */}
                        <td>
                            <select
                                title="orderstatus"
                                value={order.status}
                                onChange={(e) => updateOrderStatus(order.id, e.target.value)}
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
    );
};
