import React, { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { Card, SectionTitle, List } from './DashboardCommon.styles';

const CustomerDashboard: React.FC = () => {
  const { user } = useContext(AuthContext);
  return (
    <Card>
      <SectionTitle>Welcome, {user?.name}!</SectionTitle>
      <h3 style={{ marginBottom: 16, color: '#444' }}>Your Orders (mocked)</h3>
      <List>
        <li>Order #1234 - Ribeye Steak - Completed</li>
        <li>Order #1235 - Filet Mignon - In Progress</li>
      </List>
      <h3 style={{ marginTop: 32, color: '#444' }}>Your Profile</h3>
      <List>
        <li>Username: {user?.name}</li>
        <li>Role: {user?.role}</li>
      </List>
    </Card>
  );
};

export default CustomerDashboard;
