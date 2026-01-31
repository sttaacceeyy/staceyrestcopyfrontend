import React, { useState } from 'react';
import styled from 'styled-components';
import { HQReport } from '../../types';

// Demo/mock HQ report
const mockHQReport: HQReport = {
  period: 'month',
  startDate: '2025-06-01',
  endDate: '2025-06-30',
  branches: [
    {
      branchId: 'b1',
      date: '2025-06',
      totalOrders: 120,
      totalSales: 6000,
      avgPrepTime: 17,
      inventoryUsage: [
        { inventoryId: 'beef', used: 60, unit: 'kg' },
        { inventoryId: 'potato', used: 25, unit: 'kg' },
      ],
    },
    {
      branchId: 'b2',
      date: '2025-06',
      totalOrders: 90,
      totalSales: 4500,
      avgPrepTime: 19,
      inventoryUsage: [
        { inventoryId: 'beef', used: 45, unit: 'kg' },
        { inventoryId: 'potato', used: 18, unit: 'kg' },
      ],
    },
  ],
  totalOrders: 210,
  totalSales: 10500,
  avgPrepTime: 18,
  inventoryUsage: [
    { inventoryId: 'beef', used: 105, unit: 'kg' },
    { inventoryId: 'potato', used: 43, unit: 'kg' },
  ],
};

const Card = styled.div`
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 2px 12px rgba(0,0,0,0.08);
  padding: 32px;
  max-width: 1100px;
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
const Select = styled.select`
  margin-bottom: 16px;
  padding: 6px 12px;
  border-radius: 6px;
`;

const HQManagerDashboard: React.FC = () => {
  const [period, setPeriod] = useState<'month' | 'week' | 'quarter'>('month');
  // In a real app, fetch and filter data by period
  const report = mockHQReport;
  return (
    <Card>
      <h2 style={{ color: '#222', marginBottom: 24 }}>HQ Manager Dashboard</h2>
      <Section>
        <label htmlFor="period">Report Period: </label>
        <Select id="period" value={period} onChange={e => setPeriod(e.target.value as any)}>
          <option value="month">Month</option>
          <option value="week">Week</option>
          <option value="quarter">Quarter</option>
        </Select>
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
        <b>Inventory Usage (All Branches):</b>
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
      <Section>
        <b>Branch Reports:</b>
        {report.branches.map((branch, i) => (
          <div key={i} style={{ marginBottom: 24 }}>
            <h4>Branch {branch.branchId}</h4>
            <Table>
              <thead>
                <tr>
                  <Th>Date</Th>
                  <Th>Total Orders</Th>
                  <Th>Total Sales</Th>
                  <Th>Avg Prep Time</Th>
                  <Th>Inventory Usage</Th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <Td>{branch.date}</Td>
                  <Td>{branch.totalOrders}</Td>
                  <Td>${branch.totalSales}</Td>
                  <Td>{branch.avgPrepTime} min</Td>
                  <Td>
                    {branch.inventoryUsage.map((item, j) => (
                      <span key={j}>{item.inventoryId}: {item.used}{item.unit}{j < branch.inventoryUsage.length - 1 ? ', ' : ''}</span>
                    ))}
                  </Td>
                </tr>
              </tbody>
            </Table>
          </div>
        ))}
      </Section>
    </Card>
  );
};

export default HQManagerDashboard;
