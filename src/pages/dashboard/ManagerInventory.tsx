import React, { useContext } from 'react';
import styled from 'styled-components';
import { InventoryContext } from '../../context/InventoryContext';

interface ManagerInventoryProps {
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
const Alert = styled.div`
  background: #fff3cd;
  color: #856404;
  border: 1px solid #ffeeba;
  border-radius: 6px;
  padding: 12px;
  margin-bottom: 18px;
  @media (max-width: 700px) {
    padding: 8px 4px;
    font-size: 0.97em;
  }
`;

const mockInventories = [
  {
    branch: 'Downtown',
    inventory: [
      { name: 'Beef', used: 12, expected: 15, unit: 'kg', low: false },
      { name: 'Potato', used: 5, expected: 8, unit: 'kg', low: true },
    ],
  },
  {
    branch: 'Uptown',
    inventory: [
      { name: 'Beef', used: 10, expected: 12, unit: 'kg', low: false },
      { name: 'Potato', used: 7, expected: 7, unit: 'kg', low: false },
    ],
  },
];

const ManagerInventory: React.FC<ManagerInventoryProps> = ({ allBranches }) => {
  const { inventory } = useContext(InventoryContext);

  if (allBranches) {
    return (
      <Card>
        <h2 style={{ color: '#222', marginBottom: 24 }}>Inventory Usage Monitoring (All Branches)</h2>
        {mockInventories.map((branchData, idx) => (
          <div key={idx} style={{marginBottom:32}}>
            <h3 style={{color:'#0066cc',marginBottom:8}}>{branchData.branch} Branch</h3>
            {branchData.inventory.some(i => i.low) && (
              <Alert>
                <b>Low Stock Alert:</b> {branchData.inventory.filter(i => i.low).map(i => i.name).join(', ')}. Admin has been notified.
              </Alert>
            )}
            <Table>
              <thead>
                <tr>
                  <Th>Ingredient</Th>
                  <Th>Used</Th>
                  <Th>Expected</Th>
                  <Th>Unit</Th>
                  <Th>Low Stock?</Th>
                </tr>
              </thead>
              <tbody>
                {branchData.inventory.map((item, i) => (
                  <tr key={i}>
                    <Td>{item.name}</Td>
                    <Td>{item.used}</Td>
                    <Td>{item.expected}</Td>
                    <Td>{item.unit}</Td>
                    <Td>{item.low ? 'Yes' : 'No'}</Td>
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
      <h2 style={{ color: '#222', marginBottom: 24 }}>Inventory Usage Monitoring</h2>
      {inventory.some(i => i.low) && (
        <Alert>
          <b>Low Stock Alert:</b> {inventory.filter(i => i.low).map(i => i.name).join(', ')}. Admin has been notified.
        </Alert>
      )}
      <Table>
        <thead>
          <tr>
            <Th>Ingredient</Th>
            <Th>Used</Th>
            <Th>Expected</Th>
            <Th>Unit</Th>
            <Th>Low Stock?</Th>
          </tr>
        </thead>
        <tbody>
          {inventory.map((item, i) => (
            <tr key={i}>
              <Td>{item.name}</Td>
              <Td>{item.used}</Td>
              <Td>{item.expected}</Td>
              <Td>{item.unit}</Td>
              <Td>{item.low ? 'Yes' : 'No'}</Td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Card>
  );
};

export default ManagerInventory;
