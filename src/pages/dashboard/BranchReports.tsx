import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { OrdersContext, Order } from '../../context/OrdersContext';
import styled from 'styled-components';
import jsPDF from 'jspdf';

const Container = styled.div`
  max-width: 1200px;
  margin: 40px auto;
  background: #f8fbff;
  border-radius: 16px;
  box-shadow: 0 2px 16px rgba(0,0,0,0.10);
  padding: 32px 40px 40px 40px;
  color: #003d82;
  @media (max-width: 700px) {
    padding: 16px 4px 24px 4px;
    margin: 12px 0;
    border-radius: 8px;
  }
`;

const Title = styled.h1`
  color: #0066cc;
  font-size: 2rem;
  margin-bottom: 8px;
  text-align: center;
`;

const BranchBadge = styled.div`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 12px 24px;
  border-radius: 8px;
  text-align: center;
  margin-bottom: 32px;
  font-weight: 600;
  font-size: 1.1rem;
`;

const Section = styled.section`
  margin-bottom: 40px;
`;

const SectionTitle = styled.h2`
  color: #0066cc;
  font-size: 1.5rem;
  margin-bottom: 20px;
  border-bottom: 3px solid #0066cc;
  padding-bottom: 12px;
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  margin-bottom: 32px;
`;

const StatCard = styled.div`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 24px;
  border-radius: 12px;
  text-align: center;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);

  .label {
    font-size: 0.9rem;
    opacity: 0.9;
    margin-bottom: 12px;
    text-transform: uppercase;
  }

  .value {
    font-size: 2.5rem;
    font-weight: 700;
  }

  .change {
    font-size: 0.85rem;
    margin-top: 8px;
    opacity: 0.8;
  }
`;

const FilterRow = styled.div`
  display: flex;
  gap: 16px;
  margin-bottom: 20px;
  flex-wrap: wrap;
`;

const Select = styled.select`
  padding: 10px 12px;
  border-radius: 6px;
  border: 1px solid #ccc;
  font-size: 1rem;
`;

const Button = styled.button`
  background: #0066cc;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 600;
  transition: background 0.2s;
  &:hover {
    background: #0052a3;
  }
`;

const Table = styled.table`
  width: 100%;
  background: #fff;
  border-radius: 8px;
  margin-bottom: 18px;
  color: #003d82;
  font-size: 1rem;
  border-collapse: collapse;
  @media (max-width: 700px) {
    font-size: 0.92rem;
  }
`;

const Th = styled.th`
  background: #0066cc;
  color: #fff;
  padding: 12px;
  text-align: left;
`;

const Td = styled.td`
  padding: 12px;
  border-bottom: 1px solid #e0e0e0;
`;

const Tr = styled.tr`
  &:hover {
    background: #f5f5f5;
  }
`;

interface DateRange {
  startDate: string;
  endDate: string;
}

const BranchReports: React.FC = () => {
  const { user } = useContext(AuthContext);
  const { orders } = useContext(OrdersContext);
  const [timeFrame, setTimeFrame] = useState<'daily' | 'weekly' | 'monthly'>('daily');
  const [dateRange, setDateRange] = useState<DateRange>({
    startDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    endDate: new Date().toISOString().split('T')[0],
  });

  // Filter orders by branch
  const branchOrders = orders.filter(order => order.branchId === user?.branchId);

  // Calculate statistics
  const totalOrders = branchOrders.length;
  const completedOrders = branchOrders.filter(o => o.status === 'fulfilled').length;
  const pendingOrders = branchOrders.filter(o => o.status === 'pending').length;
  const inProgressOrders = branchOrders.filter(o => o.status === 'in_progress').length;

  // Calculate orders by date
  const ordersByDate = branchOrders.reduce((acc, order) => {
    const date = order.placedAt || new Date().toLocaleDateString();
    acc[date] = (acc[date] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  // Calculate orders by week
  const getWeekNumber = (date: Date) => {
    const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
    const dayNum = d.getUTCDay() || 7;
    d.setUTCDate(d.getUTCDate() + 4 - dayNum);
    const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
    return Math.ceil((((d.getTime() - yearStart.getTime()) / 86400000) + 1) / 7);
  };

  const ordersByWeek = branchOrders.reduce((acc, order) => {
    const date = new Date(order.placedAt || new Date());
    const week = `Week ${getWeekNumber(date)}`;
    acc[week] = (acc[week] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  // Calculate orders by month
  const ordersByMonth = branchOrders.reduce((acc, order) => {
    const date = new Date(order.placedAt || new Date());
    const month = date.toLocaleString('default', { month: 'long', year: 'numeric' });
    acc[month] = (acc[month] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const generatePDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text(`Branch ${user?.branchId} - Order Report`, 14, 22);
    doc.setFontSize(10);
    doc.text(`Generated: ${new Date().toLocaleString()}`, 14, 32);

    doc.setFontSize(12);
    doc.text('Summary Statistics', 14, 45);
    doc.setFontSize(10);
    doc.text(`Total Orders: ${totalOrders}`, 14, 55);
    doc.text(`Completed: ${completedOrders} | Pending: ${pendingOrders} | In Progress: ${inProgressOrders}`, 14, 63);

    doc.setFontSize(12);
    doc.text(`Orders by ${timeFrame === 'daily' ? 'Day' : timeFrame === 'weekly' ? 'Week' : 'Month'}`, 14, 75);
    doc.setFontSize(10);

    const data = timeFrame === 'daily' ? ordersByDate : timeFrame === 'weekly' ? ordersByWeek : ordersByMonth;
    let yPos = 85;
    Object.entries(data).forEach(([key, value]) => {
      doc.text(`${key}: ${value} orders`, 14, yPos);
      yPos += 8;
    });

    doc.save(`branch-${user?.branchId}-report-${new Date().toISOString().split('T')[0]}.pdf`);
  };

  return (
    <Container>
      <Title>📊 Branch Reports & Analytics</Title>
      <BranchBadge>🏢 Branch {user?.branchId}</BranchBadge>

      <Section>
        <SectionTitle>📈 Quick Statistics</SectionTitle>
        <StatsGrid>
          <StatCard>
            <div className="label">Total Orders</div>
            <div className="value">{totalOrders}</div>
          </StatCard>
          <StatCard>
            <div className="label">Completed</div>
            <div className="value">{completedOrders}</div>
            <div className="change">✅ {((completedOrders / totalOrders) * 100).toFixed(0)}%</div>
          </StatCard>
          <StatCard>
            <div className="label">In Progress</div>
            <div className="value">{inProgressOrders}</div>
            <div className="change">🔄 {((inProgressOrders / totalOrders) * 100).toFixed(0)}%</div>
          </StatCard>
          <StatCard>
            <div className="label">Pending</div>
            <div className="value">{pendingOrders}</div>
            <div className="change">⏳ {((pendingOrders / totalOrders) * 100).toFixed(0)}%</div>
          </StatCard>
        </StatsGrid>
      </Section>

      <Section>
        <SectionTitle>📅 Orders Over Time</SectionTitle>
        <FilterRow>
          <Select value={timeFrame} onChange={(e) => setTimeFrame(e.target.value as 'daily' | 'weekly' | 'monthly')}>
            <option value="daily">📅 Daily</option>
            <option value="weekly">📊 Weekly</option>
            <option value="monthly">📈 Monthly</option>
          </Select>
          <Button onClick={generatePDF}>📥 Download PDF Report</Button>
        </FilterRow>

        <Table>
          <thead>
            <tr>
              <Th>{timeFrame === 'daily' ? 'Date' : timeFrame === 'weekly' ? 'Week' : 'Month'}</Th>
              <Th>Number of Orders</Th>
              <Th>Percentage</Th>
            </tr>
          </thead>
          <tbody>
            {(timeFrame === 'daily' ? ordersByDate : timeFrame === 'weekly' ? ordersByWeek : ordersByMonth) && Object.entries(
              timeFrame === 'daily' ? ordersByDate : timeFrame === 'weekly' ? ordersByWeek : ordersByMonth
            ).map(([key, value]) => (
              <Tr key={key}>
                <Td>{key}</Td>
                <Td>{value}</Td>
                <Td>{((value / totalOrders) * 100).toFixed(1)}%</Td>
              </Tr>
            ))}
          </tbody>
        </Table>
      </Section>

      <Section>
        <SectionTitle>📋 Recent Orders</SectionTitle>
        <Table>
          <thead>
            <tr>
              <Th>Order ID</Th>
              <Th>Items</Th>
              <Th>Status</Th>
              <Th>Time</Th>
            </tr>
          </thead>
          <tbody>
            {branchOrders.slice(0, 10).map(order => (
              <Tr key={order.id}>
                <Td>#{order.id}</Td>
                <Td>{order.items.map(i => i.name).join(', ')}</Td>
                <Td>
                  <span style={{
                    padding: '6px 12px',
                    borderRadius: '20px',
                    background: order.status === 'fulfilled' ? '#d1e7dd' : order.status === 'in_progress' ? '#cfe2ff' : '#fff3cd',
                    color: order.status === 'fulfilled' ? '#155724' : order.status === 'in_progress' ? '#0c5460' : '#856404',
                    fontWeight: '600'
                  }}>
                    {order.status.toUpperCase()}
                  </span>
                </Td>
                <Td>{order.placedAt}</Td>
              </Tr>
            ))}
          </tbody>
        </Table>
      </Section>
    </Container>
  );
};

export default BranchReports;
