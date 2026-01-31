import React from 'react';
import { Card, SectionTitle, List } from './DashboardCommon.styles';

const insights = [
  { id: 1, label: 'Active Customers', value: 42 },
  { id: 2, label: 'Reservations Today', value: 8 },
  { id: 3, label: 'Revenue (mock)', value: '$1,200' },
];

const ManagerDashboard: React.FC = () => (
  <Card>
    <SectionTitle>Manager Dashboard</SectionTitle>
    <h3 style={{marginBottom: 16, color: '#444'}}>Customer Insights</h3>
    <List>
      {insights.map(i => (
        <li key={i.id}>{i.label}: {i.value}</li>
      ))}
    </List>
    <h3 style={{marginTop: 32, color: '#444'}}>Manager Tools</h3>
    <List>
      <li>Reservation Management (mocked)</li>
      <li>Menu Editor (mocked)</li>
    </List>
  </Card>
);

export default ManagerDashboard;
