import React from 'react';
import styled from 'styled-components';

const inventory = [
  { name: 'Beef', quantity: 18, unit: 'kg' },
  { name: 'Potatoes', quantity: 9, unit: 'kg' },
  { name: 'Salad Greens', quantity: 6, unit: 'kg' },
  { name: 'Cheese', quantity: 4, unit: 'kg' },
  { name: 'Wine', quantity: 12, unit: 'bottles' },
];

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin: 32px auto;
  max-width: 600px;
`;
const Th = styled.th`
  background: #222;
  color: #fff;
  padding: 10px;
`;
const Td = styled.td`
  border: 1px solid #eee;
  padding: 10px;
  color: #222;
`;

const Inventory: React.FC = () => (
  <div style={{ padding: '40px 0' }}>
    <h2 style={{ textAlign: 'center', color: '#0066cc', fontSize: '2.2rem', marginBottom: 32 }}>Inventory</h2>
    <Table>
      <thead>
        <tr>
          <Th>Item</Th>
          <Th>Quantity</Th>
          <Th>Unit</Th>
        </tr>
      </thead>
      <tbody>
        {inventory.map(item => (
          <tr key={item.name}>
            <Td>{item.name}</Td>
            <Td>{item.quantity}</Td>
            <Td>{item.unit}</Td>
          </tr>
        ))}
      </tbody>
    </Table>
  </div>
);

export default Inventory;
