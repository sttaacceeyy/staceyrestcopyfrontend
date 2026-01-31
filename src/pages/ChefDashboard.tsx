import React, { useContext } from 'react';
import { OrdersContext } from '../context/OrdersContext';

const statusLabels: Record<string, string> = {
  pending: 'Pending',
  in_progress: 'In Preparation',
  fulfilled: 'Ready to Serve',
};

const ChefDashboard: React.FC = () => {
  const { orders, updateOrderStatus } = useContext(OrdersContext);

  return (
    <div style={{ padding: 32 }}>
      <h2>Chef Dashboard</h2>
      <h3>All Orders</h3>
      <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: 32 }}>
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Items</th>
            <th>Status</th>
            <th>Placed At</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders.map(order => (
            <tr key={order.id} style={{ borderBottom: '1px solid #ccc' }}>
              <td>{order.id}</td>
              <td>{order.items.map(i => `${i.name} x${i.qty}`).join(', ')}</td>
              <td>{statusLabels[order.status]}</td>
              <td>{order.placedAt}</td>
              <td>
                {order.status === 'pending' && (
                  <button onClick={() => updateOrderStatus(order.id, 'in_progress')}>Start Preparation</button>
                )}
                {order.status === 'in_progress' && (
                  <button onClick={() => updateOrderStatus(order.id, 'fulfilled')}>Mark as Ready</button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <h3>Orders In Preparation</h3>
      <ul>
        {orders.filter(o => o.status === 'in_progress').map(order => (
          <li key={order.id}>{order.id}: {order.items.map(i => `${i.name} x${i.qty}`).join(', ')}</li>
        ))}
      </ul>
      <h3>Ready Orders</h3>
      <ul>
        {orders.filter(o => o.status === 'fulfilled').map(order => (
          <li key={order.id}>{order.id}: {order.items.map(i => `${i.name} x${i.qty}`).join(', ')}</li>
        ))}
      </ul>
    </div>
  );
};

export default ChefDashboard;
export {};