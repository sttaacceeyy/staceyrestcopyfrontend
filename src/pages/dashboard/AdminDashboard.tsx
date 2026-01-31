import React, { useContext } from 'react';
import { LoginLogContext } from '../../context/LoginLogContext';
import { Card, Table, Th, Td, TrAlt } from './AdminDashboard.styles';

const AdminDashboard: React.FC = () => {
  const { logs } = useContext(LoginLogContext);

  // Mock staff data
  const staff = [
    { name: 'Alice Johnson', role: 'Waiter', email: 'alice@steakz.com', phone: '555-1111' },
    { name: 'Brian Smith', role: 'Waitress', email: 'brian@steakz.com', phone: '555-2222' },
    { name: 'Carlos Lee', role: 'Waiter', email: 'carlos@steakz.com', phone: '555-3333' },
    { name: 'Diana Evans', role: 'Waitress', email: 'diana@steakz.com', phone: '555-4444' },
    { name: 'Evelyn Turner', role: 'Cashier', email: 'evelyn@steakz.com', phone: '555-5555' },
    { name: 'Frank Miller', role: 'Cashier', email: 'frank@steakz.com', phone: '555-6666' },
    { name: 'Grace Kim', role: 'Chef', email: 'grace@steakz.com', phone: '555-7777' },
    { name: 'Henry Clark', role: 'Waiter', email: 'henry@steakz.com', phone: '555-8888' },
  ];
  const total = staff.length;

  // Mock order and inventory data for estimations
  const ordersToday = 48;
  const ordersMonth = 1120;
  const revenueToday = 2400; // USD
  const revenueMonth = 56000; // USD
  const inventory = [
    { name: 'Beef', quantity: 18, unit: 'kg' },
    { name: 'Potatoes', quantity: 9, unit: 'kg' },
    { name: 'Salad Greens', quantity: 6, unit: 'kg' },
    { name: 'Cheese', quantity: 4, unit: 'kg' },
    { name: 'Wine', quantity: 12, unit: 'bottles' },
  ];

  // Mock reservation data
  const reservations = [
    { id: 1, name: 'John Doe', date: '2025-06-10', time: '19:00', guests: 2, status: 'Confirmed' },
    { id: 2, name: 'Jane Smith', date: '2025-06-11', time: '20:00', guests: 4, status: 'Pending' },
    { id: 3, name: 'Carlos Lee', date: '2025-06-12', time: '18:30', guests: 3, status: 'Confirmed' },
    { id: 4, name: 'Diana Evans', date: '2025-06-12', time: '21:00', guests: 2, status: 'Cancelled' },
  ];

  return (
    <Card>
      <h2 style={{marginBottom: 24, color: '#222'}}>Admin Dashboard</h2>
      <h3 style={{marginBottom: 16, color: '#444'}}>Login Access Log</h3>
      <Table>
        <thead>
          <tr>
            <Th style={{ color: '#000' }}>Username</Th>
            <Th style={{ color: '#000' }}>Role</Th>
            <Th style={{ color: '#000' }}>Login Time</Th>
            <Th style={{ color: '#000' }}>Status</Th>
          </tr>
        </thead>
        <tbody>
          {logs.length === 0 && (
            <tr><Td colSpan={4} style={{ textAlign: 'center', padding: 16, color: '#000' }}>No logins yet.</Td></tr>
          )}
          {logs.map((log, idx) => {
            const Row = idx % 2 ? TrAlt : 'tr';
            return (
              <Row key={idx}>
                <Td style={{ color: '#000' }}>{log.username}</Td>
                <Td style={{ color: '#000' }}>{log.role}</Td>
                <Td style={{ color: '#000' }}>{log.time}</Td>
                <Td style={{ color: log.status === 'success' ? '#2e7d32' : '#c62828', fontWeight: 500 }}>{log.status}</Td>
              </Row>
            );
          })}
        </tbody>
      </Table>

      <h3 style={{margin: '32px 0 12px 0', color: '#444'}}>Staff Information</h3>
      <div style={{marginBottom: 16, color: '#222'}}>
        <b>Total Employees:</b> {total} <br />
      </div>
      <Table>
        <thead>
          <tr>
            <Th style={{ color: '#000' }}>Name</Th>
            <Th style={{ color: '#000' }}>Role</Th>
            <Th style={{ color: '#000' }}>Email</Th>
            <Th style={{ color: '#000' }}>Phone</Th>
          </tr>
        </thead>
        <tbody>
          {staff.map((s, idx) => {
            const Row = idx % 2 ? TrAlt : 'tr';
            return (
              <Row key={s.name}>
                <Td style={{ color: '#000' }}>{s.name}</Td>
                <Td style={{ color: '#000' }}>{s.role}</Td>
                <Td style={{ color: '#000' }}>{s.email}</Td>
                <Td style={{ color: '#000' }}>{s.phone}</Td>
              </Row>
            );
          })}
        </tbody>
      </Table>

      <h3 style={{margin: '32px 0 12px 0', color: '#444'}}>Business Overview</h3>
      <div style={{marginBottom: 16, color: '#222'}}>
        <b>Estimated Orders Today:</b> {ordersToday}<br />
        <b>Estimated Orders This Month:</b> {ordersMonth}<br />
        <b>Total Revenue Today:</b> ${revenueToday.toLocaleString()}<br />
        <b>Total Revenue This Month:</b> ${revenueMonth.toLocaleString()}<br />
      </div>
      <h4 style={{margin: '18px 0 8px 0', color: '#444'}}>Estimated Food Stock Left</h4>
      <Table>
        <thead>
          <tr>
            <Th style={{ color: '#000' }}>Item</Th>
            <Th style={{ color: '#000' }}>Quantity Left</Th>
          </tr>
        </thead>
        <tbody>
          {inventory.map((item, idx) => {
            const Row = idx % 2 ? TrAlt : 'tr';
            return (
              <Row key={item.name}>
                <Td style={{ color: '#000' }}>{item.name}</Td>
                <Td style={{ color: '#000' }}>{item.quantity} {item.unit}</Td>
              </Row>
            );
          })}
        </tbody>
      </Table>

      <h3 style={{margin: '32px 0 12px 0', color: '#444'}}>Reservations List</h3>
      <Table>
        <thead>
          <tr>
            <Th style={{ color: '#000' }}>Name</Th>
            <Th style={{ color: '#000' }}>Date</Th>
            <Th style={{ color: '#000' }}>Time</Th>
            <Th style={{ color: '#000' }}>Guests</Th>
            <Th style={{ color: '#000' }}>Status</Th>
          </tr>
        </thead>
        <tbody>
          {reservations.map((r, idx) => {
            const Row = idx % 2 ? TrAlt : 'tr';
            return (
              <Row key={r.id}>
                <Td style={{ color: '#000' }}>{r.name}</Td>
                <Td style={{ color: '#000' }}>{r.date}</Td>
                <Td style={{ color: '#000' }}>{r.time}</Td>
                <Td style={{ color: '#000' }}>{r.guests}</Td>
                <Td style={{ color: r.status === 'Confirmed' ? '#2e7d32' : r.status === 'Pending' ? '#4da6ff' : '#c62828', fontWeight: 500 }}>{r.status}</Td>
              </Row>
            );
          })}
        </tbody>
      </Table>
    </Card>
  );
};

export default AdminDashboard;
