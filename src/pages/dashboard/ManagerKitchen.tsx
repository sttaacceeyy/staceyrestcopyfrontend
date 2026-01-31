import React, { useContext } from 'react';
import styled from 'styled-components';
import { OrdersContext } from '../../context/OrdersContext';
import { AuthContext } from '../../context/AuthContext';

interface ManagerKitchenProps {
  allBranches?: boolean;
}

const Card = styled.div`
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 2px 12px rgba(0,0,0,0.08);
  padding: 32px;
  max-width: 900px;
  margin: 32px auto;
  @media (max-width: 700px) {
    padding: 14px 2px 14px 2px;
    max-width: 98vw;
    margin: 10px 0;
    border-radius: 8px;
  }
`;
const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 16px;
  font-size: 1rem;
  @media (max-width: 700px) {
    display: block;
    width: 100%;
    overflow-x: auto;
    font-size: 0.92rem;
    border-radius: 4px;
  }
`;
const Th = styled.th`
  background: #222;
  color: #fff;
  padding: 10px;
  @media (max-width: 700px) {
    padding: 7px 4px;
    font-size: 0.95em;
  }
`;
const Td = styled.td`
  border: 1px solid #eee;
  padding: 10px;
  color: #222;
  @media (max-width: 700px) {
    padding: 7px 4px;
    font-size: 0.95em;
    word-break: break-word;
  }
`;
const Status = styled.span<{ status: string }>`
  color: ${({ status }) =>
    status === 'pending' ? '#0066cc' :
    status === 'in_progress' ? '#4da6ff' :
    '#2e7d32'};
  font-weight: 600;
`;

const mockKitchenQueues = [
  {
    branch: 'Downtown',
    queue: [
      { id: 1, items: [{ name: 'Ribeye', qty: 2 }], status: 'in_progress', prepTime: 15 },
    ],
  },
  {
    branch: 'Uptown',
    queue: [
      { id: 2, items: [{ name: 'Salad', qty: 1 }], status: 'in_progress', prepTime: 10 },
    ],
  },
];

const ManagerKitchen: React.FC<ManagerKitchenProps> = ({ allBranches }) => {
  const { orders } = useContext(OrdersContext);
  const { user } = useContext(AuthContext);
  
  // Filter by branch
  const filteredOrders = orders.filter(order => order.branchId === user?.branchId || !order.branchId);
  const queue = filteredOrders.filter(order => order.status === 'in_progress');

  if (allBranches) {
    return (
      <Card>
        <h2 style={{ color: '#003d82', marginBottom: 24 }}>Kitchen Overview (All Branches)</h2>
        {mockKitchenQueues.map((branchData, idx) => (
          <div key={idx} style={{marginBottom:32}}>
            <h3 style={{color:'#0066cc',marginBottom:8}}>{branchData.branch} Branch</h3>
            <Table>
              <thead>
                <tr>
                  <Th>Order #</Th>
                  <Th>Items</Th>
                  <Th>Status</Th>
                  <Th>Prep Time (min)</Th>
                </tr>
              </thead>
              <tbody>
                {branchData.queue.map(order => (
                  <tr key={order.id}>
                    <Td>{order.id}</Td>
                    <Td>{order.items.map(i => `${i.name} x${i.qty}`).join(', ')}</Td>
                    <Td><Status status={order.status}>{order.status.replace('_', ' ')}</Status></Td>
                    <Td>{order.prepTime ?? '-'}</Td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        ))}
      </Card>
    );
  }

  return (
    <Card>
      <h2 style={{ color: '#222', marginBottom: 24 }}>Kitchen Overview - Branch {user?.branchId}</h2>
      <Table>
        <thead>
          <tr>
            <Th>Order #</Th>
            <Th>Items</Th>
            <Th>Status</Th>
            <Th>Prep Time (min)</Th>
          </tr>
        </thead>
        <tbody>
          {queue.map(order => (
            <tr key={order.id}>
              <Td>{order.id}</Td>
              <Td>{order.items.map(i => `${i.name} x${i.qty}`).join(', ')}</Td>
              <Td><Status status={order.status}>{order.status.replace('_', ' ')}</Status></Td>
              <Td>{order.prepTime ?? '-'}</Td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Card>
  );
};

export default ManagerKitchen;
