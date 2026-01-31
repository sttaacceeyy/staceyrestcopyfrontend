import React, { useContext, useEffect, useState } from 'react';
import { OrdersContext, Order } from '../context/OrdersContext';
import styled from 'styled-components';

const Container = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 40px 20px;
`;

const DashboardCard = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  background: white;
  border-radius: 16px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
  padding: 40px;
`;

const HeaderSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 40px;
  border-bottom: 3px solid #667eea;
  padding-bottom: 20px;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  color: #222;
  margin: 0;
`;

const BranchInfo = styled.div`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 20px;
  border-radius: 12px;
  margin-bottom: 40px;
  
  p {
    margin: 8px 0;
    font-size: 1.1rem;
    
    strong {
      font-weight: 600;
    }
  }
`;

const OrdersGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 24px;
  margin-bottom: 40px;
`;

const OrderCard = styled.div<{ status: string }>`
  background: ${props => {
    if (props.status === 'pending') return '#fff3cd';
    if (props.status === 'in_progress') return '#cfe2ff';
    if (props.status === 'fulfilled') return '#d1e7dd';
    return '#f8f9fa';
  }};
  border-left: 5px solid ${props => {
    if (props.status === 'pending') return '#ffc107';
    if (props.status === 'in_progress') return '#0d6efd';
    if (props.status === 'fulfilled') return '#198754';
    return '#6c757d';
  }};
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s, box-shadow 0.2s;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
  }

  h3 {
    margin: 0 0 12px 0;
    color: #222;
    font-size: 1.2rem;
  }

  p {
    margin: 8px 0;
    color: #555;
    font-size: 0.95rem;
  }

  .status-badge {
    display: inline-block;
    padding: 6px 12px;
    border-radius: 20px;
    font-weight: 600;
    font-size: 0.85rem;
    margin-top: 12px;
    
    ${props => {
      if (props.status === 'pending') return 'background: #ffc107; color: #000;';
      if (props.status === 'in_progress') return 'background: #0d6efd; color: white;';
      if (props.status === 'fulfilled') return 'background: #198754; color: white;';
      return 'background: #6c757d; color: white;';
    }}
  }
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 12px;
  margin-top: 16px;
`;

const Button = styled.button<{ variant?: string }>`
  flex: 1;
  padding: 10px 16px;
  border: none;
  border-radius: 8px;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;

  ${props => {
    if (props.variant === 'success') {
      return `
        background: #198754;
        color: white;
        
        &:hover {
          background: #157347;
        }
      `;
    }
    if (props.variant === 'primary') {
      return `
        background: #0d6efd;
        color: white;
        
        &:hover {
          background: #0a58ca;
        }
      `;
    }
    return `
      background: #6c757d;
      color: white;
      
      &:hover {
        background: #5c636a;
      }
    `;
  }}

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const StatsSection = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 16px;
  margin-bottom: 40px;
`;

const StatCard = styled.div`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 20px;
  border-radius: 12px;
  text-align: center;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);

  .label {
    font-size: 0.9rem;
    opacity: 0.9;
    margin-bottom: 8px;
  }

  .value {
    font-size: 2rem;
    font-weight: 700;
  }
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 60px 20px;
  color: #999;

  h2 {
    font-size: 1.5rem;
    margin-bottom: 12px;
    color: #666;
  }

  p {
    font-size: 1rem;
  }
`;

const KitchenDashboardBranch1: React.FC = () => {
  const { orders: rawOrders, updateOrderStatus } = useContext(OrdersContext);
  const orders: Order[] = rawOrders;
  const [branchOrders, setBranchOrders] = useState<Order[]>([]);

  useEffect(() => {
    // Filter orders for branch 1
    const filtered = orders.filter(order => order.branchId === '1' || !order.branchId);
    setBranchOrders(filtered);
  }, [orders]);

  const pendingOrders = branchOrders.filter(o => o.status === 'pending');
  const inProgressOrders = branchOrders.filter(o => o.status === 'in_progress');
  const readyOrders = branchOrders.filter(o => o.status === 'fulfilled');

  const handleStartCooking = (orderId: string) => {
    updateOrderStatus(orderId, 'in_progress');
  };

  const handleMarkReady = (orderId: string) => {
    updateOrderStatus(orderId, 'fulfilled');
  };

  return (
    <Container>
      <DashboardCard>
        <HeaderSection>
          <Title>👨‍🍳 Kitchen Dashboard - Branch 1</Title>
        </HeaderSection>

        <BranchInfo>
          <p><strong>🏢 Branch:</strong> Branch 1</p>
          <p><strong>📊 Total Orders:</strong> {branchOrders.length}</p>
        </BranchInfo>

        <StatsSection>
          <StatCard>
            <div className="label">🔴 Pending</div>
            <div className="value">{pendingOrders.length}</div>
          </StatCard>
          <StatCard>
            <div className="label">🟡 Cooking</div>
            <div className="value">{inProgressOrders.length}</div>
          </StatCard>
          <StatCard>
            <div className="label">🟢 Ready</div>
            <div className="value">{readyOrders.length}</div>
          </StatCard>
        </StatsSection>

        {branchOrders.length === 0 ? (
          <EmptyState>
            <h2>No Orders Yet</h2>
            <p>Check back soon for new orders</p>
          </EmptyState>
        ) : (
          <OrdersGrid>
            {pendingOrders.map(order => (
              <OrderCard key={order.id} status="pending">
                <h3>Order #{order.id}</h3>
                <p><strong>Items:</strong> {order.items.map(i => i.name).join(', ')}</p>
                <p><strong>Qty:</strong> {order.items.reduce((sum, i) => sum + (i.qty || 1), 0)}</p>
                <p><strong>Status:</strong></p>
                <div className="status-badge">🔴 Pending</div>
                <ActionButtons>
                  <Button variant="primary" onClick={() => handleStartCooking(order.id)}>
                    Start Cooking
                  </Button>
                </ActionButtons>
              </OrderCard>
            ))}

            {inProgressOrders.map(order => (
              <OrderCard key={order.id} status="in_progress">
                <h3>Order #{order.id}</h3>
                <p><strong>Items:</strong> {order.items.map(i => i.name).join(', ')}</p>
                <p><strong>Qty:</strong> {order.items.reduce((sum, i) => sum + (i.qty || 1), 0)}</p>
                <p><strong>Status:</strong></p>
                <div className="status-badge">🟡 In Progress</div>
                <ActionButtons>
                  <Button variant="success" onClick={() => handleMarkReady(order.id)}>
                    Mark Ready
                  </Button>
                </ActionButtons>
              </OrderCard>
            ))}

            {readyOrders.map(order => (
              <OrderCard key={order.id} status="fulfilled">
                <h3>Order #{order.id}</h3>
                <p><strong>Items:</strong> {order.items.map(i => i.name).join(', ')}</p>
                <p><strong>Qty:</strong> {order.items.reduce((sum, i) => sum + (i.qty || 1), 0)}</p>
                <p><strong>Status:</strong></p>
                <div className="status-badge">🟢 Ready to Serve</div>
              </OrderCard>
            ))}
          </OrdersGrid>
        )}
      </DashboardCard>
    </Container>
  );
};

export default KitchenDashboardBranch1;
