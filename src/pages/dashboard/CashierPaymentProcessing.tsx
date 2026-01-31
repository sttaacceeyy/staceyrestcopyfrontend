import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import { OrdersContext } from '../../context/OrdersContext';
import { AuthContext } from '../../context/AuthContext';

const Card = styled.div`
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 2px 12px rgba(0,0,0,0.08);
  padding: 32px;
  max-width: 700px;
  margin: 32px auto;
`;
const Table = styled.table`
  width: 100%;
  margin-bottom: 18px;
  border-collapse: collapse;
`;
const Th = styled.th`
  background: #0066cc;
  color: #fff;
  padding: 10px;
`;
const Td = styled.td`
  padding: 10px;
  text-align: center;
  color: #222;
`;
const Button = styled.button`
  background: #4da6ff;
  color: #fff;
  border: none;
  border-radius: 6px;
  padding: 8px 18px;
  font-weight: 600;
  cursor: pointer;
  margin-right: 8px;
  margin-bottom: 8px;
  &:hover { background: #0066cc; color: #fff; }
`;
const Select = styled.select`
  padding: 8px;
  border-radius: 6px;
  border: 1px solid #b3d9ff;
  background: #f8fbff;
  color: #003d82;
`;
const Receipt = styled.div`
  background: #f7f7f7;
  color: #222;
  border-radius: 8px;
  padding: 18px;
  margin: 18px 0;
  font-size: 1.05rem;
`;
const OrderDetails = styled.div`
  background: #f7f7f7;
  color: #222;
  border-radius: 8px;
  padding: 18px;
  margin: 18px 0;
  font-size: 1.05rem;
`;

const paymentMethods = ['Cash', 'Card', 'Other'];

const CashierPaymentProcessing: React.FC = () => {
  const { orders, updateOrderStatus } = useContext(OrdersContext);
  const { user } = useContext(AuthContext);
  const [selectedOrder, setSelectedOrder] = useState<string | null>(null);
  const [paymentType, setPaymentType] = useState('Cash');
  const [showReceipt, setShowReceipt] = useState(false);
  const [paidOrderId, setPaidOrderId] = useState<string | null>(null);
  const [receiptGenerated, setReceiptGenerated] = useState(false);

  // Filter orders by branch
  const branchOrders = orders.filter(o => o.branchId === user?.branchId || !o.branchId);
  const unpaidOrders = branchOrders.filter(o => o.status !== 'fulfilled');
  // If no unpaid orders, show a message
  if (unpaidOrders.length === 0) {
    return (
      <Card>
        <h2 style={{ color: '#003d82', marginBottom: 24 }}>Payment Processing - Branch {user?.branchId}</h2>
        <div style={{ color: '#0066cc', fontWeight: 600, textAlign: 'center', margin: '32px 0' }}>
          No unpaid orders found. New orders will appear here in real time as customers place them.
        </div>
      </Card>
    );
  }
  const order = unpaidOrders.find(o => o.id === selectedOrder);
  const totalAmount = order ? order.items.reduce((sum, i) => sum + ((i.qty ?? 0) * 20), 0) : 0; // $20 per item mock

  // Store payment method in order (mock: add to status string)
  const handleMarkPaid = () => {
    if (order) {
      // Set a prep time (e.g., random 10-25 min) when marking as paid
      const prepTime = order.prepTime || Math.floor(Math.random() * 16) + 10;
      updateOrderStatus(order.id, 'in_progress', prepTime);
      // Save payment method in localStorage for this order
      const paymentInfoKey = `order_payment_method_${order.id}`;
      localStorage.setItem(paymentInfoKey, paymentType);
      setPaidOrderId(order.id);
      setShowReceipt(true);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const handleGenerateReceipt = () => {
    setReceiptGenerated(true);
    setTimeout(() => setReceiptGenerated(false), 2000);
  };

  // Get payment method for order if paid
  const getPaymentMethod = (orderId: string) => {
    return localStorage.getItem(`order_payment_method_${orderId}`) || '-';
  };

  return (
    <Card>
      <h2 style={{ color: '#222', marginBottom: 24 }}>Payment Processing - Branch {user?.branchId}</h2>
      <Table>
        <thead>
          <tr>
            <Th>Order ID</Th>
            <Th>Items</Th>
            <Th>Total Due</Th>
            <Th>Status</Th>
            <Th>Payment Method</Th>
            <Th>Action</Th>
          </tr>
        </thead>
        <tbody>
          {unpaidOrders.map(o => (
            <tr key={o.id} style={{ background: selectedOrder === o.id ? '#f5f5f5' : undefined }}>
              <Td>{o.id}</Td>
              <Td>{o.items.map(i => `${i.name} x${i.qty ?? 0}`).join(', ')}</Td>
              <Td>${o.items.reduce((sum, i) => sum + ((i.qty ?? 0) * 20), 0).toFixed(2)}</Td>
              <Td>{o.status}</Td>
              <Td>{getPaymentMethod(o.id)}</Td>
              <Td>
                <Button onClick={() => setSelectedOrder(o.id)}>Select</Button>
                {paidOrderId === o.id && showReceipt && (
                  <span style={{ color: '#2e7d32', fontWeight: 600, marginLeft: 8 }}>Order Paid</span>
                )}
              </Td>
            </tr>
          ))}
        </tbody>
      </Table>
      {order && (
        <OrderDetails>
          <h3>Order #{order.id} - Payment</h3>
          <div style={{ marginBottom: 12 }}>Total Due: <b>${totalAmount.toFixed(2)}</b></div>
          <label>Payment Method: </label>
          <Select value={paymentType} onChange={e => setPaymentType(e.target.value)}>
            {paymentMethods.map(m => <option key={m}>{m}</option>)}
          </Select>
          <Button onClick={handleMarkPaid} style={{ marginLeft: 12 }}>Mark as Paid</Button>
          <Button onClick={handleGenerateReceipt} style={{ marginLeft: 12, background: '#222', color: '#fff' }}>Generate Receipt</Button>
          {receiptGenerated && <div style={{ color: '#2e7d32', marginTop: 10 }}>Receipt generated</div>}
        </OrderDetails>
      )}
      {showReceipt && order && paidOrderId === order.id && (
        <Receipt>
          <b>Receipt</b><br />
          Order ID: {order.id}<br />
          Items: {order.items.map(i => `${i.name} x${i.qty}`).join(', ')}<br />
          Total Paid: ${totalAmount.toFixed(2)}<br />
          Payment Method: {paymentType}<br />
          <Button onClick={handlePrint}>Print Receipt</Button>
        </Receipt>
      )}
    </Card>
  );
};

export default CashierPaymentProcessing;
