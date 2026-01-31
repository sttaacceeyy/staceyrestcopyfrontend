import React, { useContext } from 'react';
import styled from 'styled-components';
import { BranchReport } from '../../types';
import { AuthContext } from '../../context/AuthContext';

// Demo/mock branch reports for multiple branches
const mockReports: BranchReport[] = [
  {
    branchId: 'b1',
    date: '2025-06-10',
    totalOrders: 24,
    totalSales: 1200,
    avgPrepTime: 18,
    inventoryUsage: [
      { inventoryId: 'beef', used: 12, unit: 'kg' },
      { inventoryId: 'potato', used: 5, unit: 'kg' },
    ],
  },
  {
    branchId: 'b2',
    date: '2025-06-10',
    totalOrders: 18,
    totalSales: 900,
    avgPrepTime: 20,
    inventoryUsage: [
      { inventoryId: 'beef', used: 8, unit: 'kg' },
      { inventoryId: 'potato', used: 3, unit: 'kg' },
    ],
  },
];

const Card = styled.div`
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 2px 12px rgba(0,0,0,0.08);
  padding: 32px;
  max-width: 900px;
  margin: 32px auto;
`;
const Section = styled.div`
  margin-bottom: 32px;
`;
const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 16px;
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

const BranchManagerDashboard: React.FC = () => {
  const { user } = useContext(AuthContext);
  // Only show the report for the branch the manager manages
  const branchId = user?.branchId || 'b1';
  const report = mockReports.find(r => r.branchId === branchId) || mockReports[0];

  return (
    <Card>
      <h2 style={{ color: '#222', marginBottom: 24 }}>Branch Manager Dashboard</h2>
      <Section>
        <b>Branch:</b> {branchId}
      </Section>
      <Section>
        <b>Date:</b> {report.date}
      </Section>
      <Section>
        <b>Total Orders:</b> {report.totalOrders}
      </Section>
      <Section>
        <b>Total Sales:</b> ${report.totalSales}
      </Section>
      <Section>
        <b>Average Preparation Time:</b> {report.avgPrepTime} min
      </Section>
      <Section>
        <b>Inventory Usage:</b>
        <Table>
          <thead>
            <tr>
              <Th>Ingredient</Th>
              <Th>Used</Th>
              <Th>Unit</Th>
            </tr>
          </thead>
          <tbody>
            {report.inventoryUsage.map((item, i) => (
              <tr key={i}>
                <Td>{item.inventoryId}</Td>
                <Td>{item.used}</Td>
                <Td>{item.unit}</Td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Section>
    </Card>
  );
};

export default BranchManagerDashboard;
