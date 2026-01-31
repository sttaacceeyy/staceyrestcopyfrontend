import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../../context/AuthContext';
import styled from 'styled-components';

export interface StockItem {
  id: string;
  name: string;
  quantity: number;
  unit: string;
  minThreshold: number;
  lastUpdated: string;
  branchId: string;
}

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
    border-radius: 4px;
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

const Input = styled.input`
  padding: 8px 12px;
  border-radius: 6px;
  border: 1px solid #ccc;
  font-size: 0.95rem;
  width: 100px;
`;

const Button = styled.button`
  background: #0066cc;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 600;
  transition: background 0.2s;
  &:hover {
    background: #0052a3;
  }
`;

const AddButton = styled(Button)`
  margin-bottom: 20px;
`;

const StockBadge = styled.span<{ status: 'normal' | 'low' | 'empty' }>`
  padding: 6px 12px;
  border-radius: 20px;
  font-weight: 600;
  font-size: 0.85rem;
  background: ${props => {
    if (props.status === 'empty') return '#f8d7da';
    if (props.status === 'low') return '#fff3cd';
    return '#d1e7dd';
  }};
  color: ${props => {
    if (props.status === 'empty') return '#721c24';
    if (props.status === 'low') return '#856404';
    return '#155724';
  }};
`;

const BranchInventoryManagement: React.FC = () => {
  const { user } = useContext(AuthContext);
  const [stock, setStock] = useState<StockItem[]>([]);
  const [newItem, setNewItem] = useState({ name: '', quantity: 0, unit: 'kg', minThreshold: 10 });
  const [editingId, setEditingId] = useState<string | null>(null);

  // Initialize stock from localStorage
  useEffect(() => {
    const stored = localStorage.getItem(`inventory-branch-${user?.branchId}`);
    if (stored) {
      setStock(JSON.parse(stored));
    } else {
      // Initialize with sample data
      const initialStock: StockItem[] = [
        { id: '1', name: 'Beef (kg)', quantity: 50, unit: 'kg', minThreshold: 20, lastUpdated: new Date().toLocaleString(), branchId: user?.branchId || '1' },
        { id: '2', name: 'Potatoes (kg)', quantity: 30, unit: 'kg', minThreshold: 15, lastUpdated: new Date().toLocaleString(), branchId: user?.branchId || '1' },
        { id: '3', name: 'Butter (kg)', quantity: 10, unit: 'kg', minThreshold: 5, lastUpdated: new Date().toLocaleString(), branchId: user?.branchId || '1' },
        { id: '4', name: 'Salt (kg)', quantity: 5, unit: 'kg', minThreshold: 10, lastUpdated: new Date().toLocaleString(), branchId: user?.branchId || '1' },
      ];
      setStock(initialStock);
      localStorage.setItem(`inventory-branch-${user?.branchId}`, JSON.stringify(initialStock));
    }
  }, [user?.branchId]);

  const saveStock = (updatedStock: StockItem[]) => {
    setStock(updatedStock);
    localStorage.setItem(`inventory-branch-${user?.branchId}`, JSON.stringify(updatedStock));
  };

  const addItem = () => {
    if (!newItem.name) return;
    const item: StockItem = {
      id: Date.now().toString(),
      name: newItem.name,
      quantity: newItem.quantity,
      unit: newItem.unit,
      minThreshold: newItem.minThreshold,
      lastUpdated: new Date().toLocaleString(),
      branchId: user?.branchId || '1',
    };
    saveStock([...stock, item]);
    setNewItem({ name: '', quantity: 0, unit: 'kg', minThreshold: 10 });
  };

  const updateQuantity = (id: string, quantity: number) => {
    const updated = stock.map(item =>
      item.id === id ? { ...item, quantity, lastUpdated: new Date().toLocaleString() } : item
    );
    saveStock(updated);
  };

  const deleteItem = (id: string) => {
    saveStock(stock.filter(item => item.id !== id));
  };

  const getStockStatus = (quantity: number, minThreshold: number): 'normal' | 'low' | 'empty' => {
    if (quantity === 0) return 'empty';
    if (quantity < minThreshold) return 'low';
    return 'normal';
  };

  const lowStockItems = stock.filter(item => getStockStatus(item.quantity, item.minThreshold) !== 'normal');
  const emptyItems = stock.filter(item => item.quantity === 0);

  return (
    <Container>
      <Title>📦 Inventory Management</Title>
      <BranchBadge>🏢 Branch {user?.branchId}</BranchBadge>

      <Section>
        <SectionTitle>⚠️ Stock Alerts</SectionTitle>
        <Table>
          <thead>
            <tr>
              <Th>Product</Th>
              <Th>Current Stock</Th>
              <Th>Min. Threshold</Th>
              <Th>Status</Th>
            </tr>
          </thead>
          <tbody>
            {emptyItems.length === 0 && lowStockItems.length === 0 ? (
              <Tr>
                <Td colSpan={4} style={{ textAlign: 'center', color: '#228B22' }}>✅ All items are well stocked</Td>
              </Tr>
            ) : (
              lowStockItems.map(item => (
                <Tr key={item.id}>
                  <Td>{item.name}</Td>
                  <Td>{item.quantity} {item.unit}</Td>
                  <Td>{item.minThreshold} {item.unit}</Td>
                  <Td>
                    <StockBadge status={getStockStatus(item.quantity, item.minThreshold)}>
                      {item.quantity === 0 ? '❌ Out of Stock' : '⚠️ Low Stock'}
                    </StockBadge>
                  </Td>
                </Tr>
              ))
            )}
          </tbody>
        </Table>
      </Section>

      <Section>
        <SectionTitle>Add New Stock Item</SectionTitle>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginBottom: '20px' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>Product Name</label>
            <Input
              type="text"
              style={{ width: '100%' }}
              value={newItem.name}
              onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
              placeholder="e.g., Beef"
            />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>Quantity</label>
            <Input
              type="number"
              style={{ width: '100%' }}
              value={newItem.quantity}
              onChange={(e) => setNewItem({ ...newItem, quantity: parseFloat(e.target.value) })}
              placeholder="0"
            />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>Unit</label>
            <Input
              type="text"
              style={{ width: '100%' }}
              value={newItem.unit}
              onChange={(e) => setNewItem({ ...newItem, unit: e.target.value })}
              placeholder="kg, L, etc"
            />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>Min. Threshold</label>
            <Input
              type="number"
              style={{ width: '100%' }}
              value={newItem.minThreshold}
              onChange={(e) => setNewItem({ ...newItem, minThreshold: parseFloat(e.target.value) })}
              placeholder="10"
            />
          </div>
        </div>
        <AddButton onClick={addItem}>➕ Add Item</AddButton>
      </Section>

      <Section>
        <SectionTitle>Current Stock Levels</SectionTitle>
        <Table>
          <thead>
            <tr>
              <Th>Product</Th>
              <Th>Quantity</Th>
              <Th>Unit</Th>
              <Th>Min Threshold</Th>
              <Th>Status</Th>
              <Th>Last Updated</Th>
              <Th>Actions</Th>
            </tr>
          </thead>
          <tbody>
            {stock.map(item => (
              <Tr key={item.id}>
                <Td>{item.name}</Td>
                <Td>
                  <Input
                    type="number"
                    value={item.quantity}
                    onChange={(e) => updateQuantity(item.id, parseFloat(e.target.value))}
                  />
                </Td>
                <Td>{item.unit}</Td>
                <Td>{item.minThreshold}</Td>
                <Td>
                  <StockBadge status={getStockStatus(item.quantity, item.minThreshold)}>
                    {getStockStatus(item.quantity, item.minThreshold) === 'normal' ? '✅ OK' : '⚠️ Low'}
                  </StockBadge>
                </Td>
                <Td>{item.lastUpdated}</Td>
                <Td>
                  <Button onClick={() => deleteItem(item.id)} style={{ background: '#dc3545' }}>🗑️ Delete</Button>
                </Td>
              </Tr>
            ))}
          </tbody>
        </Table>
      </Section>
    </Container>
  );
};

export default BranchInventoryManagement;
