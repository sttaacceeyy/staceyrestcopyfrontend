import React from 'react';
import styled from 'styled-components';
import { Order } from '../../types';

// Demo/mock orders for the chef's kitchen dashboard
const mockOrders: Order[] = [
  { id: '1', items: [ { name: 'Ribeye Steak', quantity: 2, price: 38 } ], status: 'pending', paymentStatus: 'paid', createdAt: '2025-06-10T12:00:00Z', branchId: 'b1' },
  { id: '2', items: [ { name: 'NY Strip', quantity: 1, price: 36 } ], status: 'in_progress', paymentStatus: 'paid', createdAt: '2025-06-10T12:10:00Z', branchId: 'b1' },
];

const Card = styled.div`
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 2px 12px rgba(0,0,0,0.08);
  padding: 32px;
  max-width: 900px;
  margin: 32px auto;
`;
const OrderList = styled.ul`
  list-style: none;
  padding: 0;
`;
const OrderItem = styled.li`
  background: #f9f9f9;
  border-radius: 8px;
  margin-bottom: 18px;
  padding: 18px 24px;
  color: #222;
`;
const FulfillBtn = styled.button`
  background: #0066cc;
  color: #fff;
  border: none;
  border-radius: 6px;
  padding: 8px 18px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  margin-top: 8px;
  transition: background 0.2s;
  &:hover {
    background: #4da6ff;
    color: #fff;
  }
`;

const KitchenDashboard: React.FC = () => {
  // In a real app, fetch orders for the chef's branch and update status on fulfill
  const [orders, setOrders] = React.useState(mockOrders);
  const fulfillOrder = (id: string) => {
    setOrders(orders => orders.map(o => o.id === id ? { ...o, status: 'fulfilled' } : o));
  };
  return (
    <Card>
      <h2 style={{ color: '#222', marginBottom: 24 }}>Kitchen Dashboard</h2>
      <OrderList>
        {orders.map(order => (
          <OrderItem key={order.id}>
            <div><b>Order #{order.id}</b> - Status: {order.status}</div>
            <div>Items: {order.items.map(i => `${i.name} x${i.quantity}`).join(', ')}</div>
            {order.status !== 'fulfilled' && (
              <FulfillBtn onClick={() => fulfillOrder(order.id)}>Mark as Fulfilled</FulfillBtn>
            )}
          </OrderItem>
        ))}
      </OrderList>
    </Card>
  );
};

export default KitchenDashboard;
