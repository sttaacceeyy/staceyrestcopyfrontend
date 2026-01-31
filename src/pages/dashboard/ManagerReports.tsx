import React, { useState } from 'react';
import styled from 'styled-components';

interface ManagerReportsProps {
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
const Section = styled.div`
  margin-bottom: 32px;
  @media (max-width: 700px) {
    margin-bottom: 18px;
  }
`;
const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 16px;
  font-size: 1rem;
  @media (max-width: 700px) {
    font-size: 0.92rem;
    border-radius: 4px;
  }
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
const Button = styled.button`
  background: #0066cc;
  color: #fff;
  border: none;
  border-radius: 6px;
  padding: 8px 18px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  margin-right: 12px;
  margin-top: 8px;
  transition: background 0.2s;
  &:hover {
    background: #4da6ff;
    color: #fff;
  }
  @media (max-width: 700px) {
    padding: 6px 10px;
    font-size: 0.95rem;
  }
`;

const mockReports = [
  {
    period: 'Daily',
    date: '2025-06-14',
    totalOrders: 24,
    totalSales: 1200,
    avgPrepTime: 18,
    reviews: [
      { customer: 'John Doe', rating: 5, comment: 'Great food!' },
      { customer: 'Jane Smith', rating: 4, comment: 'Quick service.' },
    ],
    inventoryUsage: [
      { name: 'Beef', used: 12, unit: 'kg' },
      { name: 'Potato', used: 5, unit: 'kg' },
    ],
  },
  {
    period: 'Weekly',
    date: '2025-06-08 to 2025-06-14',
    totalOrders: 160,
    totalSales: 8000,
    avgPrepTime: 19,
    reviews: [
      { customer: 'Carlos Lee', rating: 5, comment: 'Amazing steak.' },
      { customer: 'Diana Evans', rating: 3, comment: 'A bit slow.' },
    ],
    inventoryUsage: [
      { name: 'Beef', used: 80, unit: 'kg' },
      { name: 'Potato', used: 30, unit: 'kg' },
    ],
  },
  {
    period: 'Monthly',
    date: '2025-06',
    totalOrders: 650,
    totalSales: 32000,
    avgPrepTime: 20,
    reviews: [
      { customer: 'Evelyn Turner', rating: 4, comment: 'Consistent quality.' },
      { customer: 'Frank Miller', rating: 5, comment: 'Best in town!' },
    ],
    inventoryUsage: [
      { name: 'Beef', used: 320, unit: 'kg' },
      { name: 'Potato', used: 120, unit: 'kg' },
    ],
  },
];

const mockAllBranchesReports = [
  {
    branch: 'Downtown',
    ...mockReports[0],
  },
  {
    branch: 'Uptown',
    ...mockReports[1],
  },
  {
    branch: 'Suburb',
    ...mockReports[2],
  },
];

const ManagerReports: React.FC<ManagerReportsProps> = ({ allBranches }) => {
  const [period, setPeriod] = useState<'Daily'|'Weekly'|'Monthly'>('Daily');
  const report = mockReports.find(r => r.period === period)!;

  const handleDownload = () => {
    alert('Report downloaded (mock)');
  };
  const handlePrint = () => {
    window.print();
  };

  if (allBranches) {
    return (
      <Card>
        <h2 style={{ color: '#222', marginBottom: 24 }}>All Branches Reports</h2>
        <Section>
          <label style={{ fontWeight: 600, marginRight: 12 }}>Period:</label>
          <select value={period} onChange={e => setPeriod(e.target.value as any)}>
            <option value="Daily">Daily</option>
            <option value="Weekly">Weekly</option>
            <option value="Monthly">Monthly</option>
          </select>
          <Button onClick={handleDownload}>Download</Button>
          <Button onClick={handlePrint}>Print</Button>
        </Section>
        {mockAllBranchesReports.map((branchReport, idx) => (
          <Section key={idx}>
            <h3 style={{marginBottom:8, color:'#0066cc'}}>{branchReport.branch} Branch</h3>
            <div><b>Date:</b> {branchReport.date}</div>
            <div><b>Total Orders:</b> {branchReport.totalOrders}</div>
            <div><b>Total Sales:</b> ${branchReport.totalSales}</div>
            <div><b>Average Preparation Time:</b> {branchReport.avgPrepTime} min</div>
            <div><b>Customer Reviews & Ratings:</b>
              <ul>
                {branchReport.reviews.map((r, i) => (
                  <li key={i}><b>{r.customer}</b> ({r.rating}/5): {r.comment}</li>
                ))}
              </ul>
            </div>
            <div><b>Inventory Usage Estimates:</b>
              <Table>
                <thead>
                  <tr>
                    <Th>Ingredient</Th>
                    <Th>Used</Th>
                    <Th>Unit</Th>
                  </tr>
                </thead>
                <tbody>
                  {branchReport.inventoryUsage.map((item, i) => (
                    <tr key={i}>
                      <Td>{item.name}</Td>
                      <Td>{item.used}</Td>
                      <Td>{item.unit}</Td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          </Section>
        ))}
      </Card>
    );
  }

  return (
    <Card>
      <h2 style={{ color: '#222', marginBottom: 24 }}>Branch Reports</h2>
      <Section>
        <label style={{ fontWeight: 600, marginRight: 12 }}>Period:</label>
        <select value={period} onChange={e => setPeriod(e.target.value as any)}>
          <option value="Daily">Daily</option>
          <option value="Weekly">Weekly</option>
          <option value="Monthly">Monthly</option>
        </select>
        <Button onClick={handleDownload}>Download</Button>
        <Button onClick={handlePrint}>Print</Button>
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
        <b>Customer Reviews & Ratings:</b>
        <ul>
          {report.reviews.map((r, i) => (
            <li key={i}><b>{r.customer}</b> ({r.rating}/5): {r.comment}</li>
          ))}
        </ul>
      </Section>
      <Section>
        <b>Inventory Usage Estimates:</b>
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
                <Td>{item.name}</Td>
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

export default ManagerReports;
