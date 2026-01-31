import React, { useState } from 'react';
import styled from 'styled-components';
import ManagerReports from './ManagerReports';
import ManagerMenu from './ManagerMenu';
import ManagerOrders from './ManagerOrders';
import ManagerKitchen from './ManagerKitchen';
import ManagerInventory from './ManagerInventory';
import ManagerStaff from './ManagerStaff';
import ManagerFeedback from './ManagerFeedback';

const Card = styled.div`
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 2px 12px rgba(0,0,0,0.08);
  padding: 32px;
  max-width: 1100px;
  margin: 32px auto;
`;
const Tabs = styled.div`
  display: flex;
  gap: 16px;
  margin-bottom: 24px;
`;
const Tab = styled.button<{ active: boolean }>`
  background: ${({ active }) => (active ? '#0066cc' : '#eee')};
  color: ${({ active }) => (active ? '#fff' : '#222')};
  border: none;
  border-radius: 8px 8px 0 0;
  padding: 12px 28px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  outline: none;
`;
const Section = styled.div`
  margin-bottom: 32px;
`;

const tabList = [
  'Reports',
  'Menu',
  'Orders',
  'Kitchen',
  'Inventory',
  'Staff',
  'Feedback',
];

const ManagerFullDashboard: React.FC = () => {
  const [tab, setTab] = useState('Reports');

  return (
    <Card>
      <h2 style={{ color: '#222', marginBottom: 24 }}>Branch Manager Portal</h2>
      <Tabs>
        {tabList.map(t => (
          <Tab key={t} active={tab === t} onClick={() => setTab(t)}>{t}</Tab>
        ))}
      </Tabs>
      {tab === 'Reports' && (
        <Section>
          <ManagerReports />
        </Section>
      )}
      {tab === 'Menu' && (
        <Section>
          <ManagerMenu />
        </Section>
      )}
      {tab === 'Orders' && (
        <Section>
          <ManagerOrders />
        </Section>
      )}
      {tab === 'Kitchen' && (
        <Section>
          <ManagerKitchen />
        </Section>
      )}
      {tab === 'Inventory' && (
        <Section>
          <ManagerInventory />
        </Section>
      )}
      {tab === 'Staff' && (
        <Section>
          <ManagerStaff />
        </Section>
      )}
      {tab === 'Feedback' && (
        <Section>
          <ManagerFeedback />
        </Section>
      )}
    </Card>
  );
};

export default ManagerFullDashboard;
