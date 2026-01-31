import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import { OrdersContext } from '../context/OrdersContext';

const TAX_RATE = 0.1;

const Card = styled.div`
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 2px 12px rgba(0,0,0,0.08);
  padding: 40px 32px 32px 32px;
  max-width: 500px;
  margin: 48px auto;
  @media (max-width: 700px) {
    padding: 18px 4px 18px 4px;
    max-width: 98vw;
    margin: 12px 0;
    border-radius: 8px;
  }
`;
const Title = styled.h1`
  color: #003d82;
  margin-bottom: 24px;
  text-align: center;
`;
const Table = styled.table`
  width: 100%;
  margin-bottom: 18px;
  border-collapse: collapse;
  font-size: 1rem;
  @media (max-width: 700px) {
    font-size: 0.92rem;
  }
`;
const Th = styled.th`
  text-align: left;
  color: #0066cc;
  padding-bottom: 8px;
`;
const Td = styled.td`
  padding: 6px 0;
  color: #003d82;
`;
const TotalRow = styled.tr`
  font-weight: bold;
  color: #0066cc;
`;
const Input = styled.input`
  padding: 8px 12px;
  border-radius: 6px;
  border: 1px solid #ccc;
  font-size: 1rem;
  margin-bottom: 12px;
  width: 100%;
  @media (max-width: 700px) {
    padding: 6px 8px;
    font-size: 0.95rem;
  }
`;
const Select = styled.select`
  padding: 8px 12px;
  border-radius: 6px;
  border: 1px solid #ccc;
  font-size: 1rem;
  margin-bottom: 18px;
  width: 100%;
  @media (max-width: 700px) {
    padding: 6px 8px;
    font-size: 0.95rem;
  }
`;
const Button = styled.button`
  background: #0066cc;
  color: #fff;
  border: none;
  border-radius: 6px;
  padding: 12px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  margin-top: 8px;
  transition: background 0.2s;
  &:hover {
    background: #0052a3;
  }
  @media (max-width: 700px) {
    padding: 8px;
    font-size: 0.95rem;
  }
`;
const SuccessMsg = styled.div`
  color: #2e7d32;
  font-size: 1.2rem;
  text-align: center;
  margin-top: 32px;
`;

const Checkout: React.FC = () => {
  const { cart, clearCart } = useCart();
  const { addOrder } = useContext(OrdersContext);
  const [name, setName] = useState('');
  const [table, setTable] = useState('');
  const [branch, setBranch] = useState('1');
  const [payment, setPayment] = useState('Pay at Counter');
  const [success, setSuccess] = useState(false);
  const [redirectToCard, setRedirectToCard] = useState(false);
  const navigate = useNavigate();

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const tax = subtotal * TAX_RATE;
  const total = subtotal + tax;

  const handleOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (cart.length === 0) return;
    // Add order to OrdersContext with branchId
    addOrder({
      items: cart.map(item => ({ name: item.name, qty: item.quantity })),
      status: 'pending',
      kitchen: '',
      cashier: '',
      branchId: branch,
    });
    if (payment === 'Card') {
      setRedirectToCard(true);
      return;
    }
    setSuccess(true);
    clearCart();
  };

  if (redirectToCard) {
    navigate('/card-payment');
    return null;
  }

  if (success) {
    return (
      <Card>
        <SuccessMsg>
          Thank you! Your order has been placed.<br />
          Estimated preparation time: 20-30 minutes.
        </SuccessMsg>
      </Card>
    );
  }

  return (
    <Card>
      <Title>Checkout</Title>
      <form onSubmit={handleOrder}>
        <Table>
          <thead>
            <tr>
              <Th>Item</Th>
              <Th>Qty</Th>
              <Th>Price</Th>
              <Th>Total</Th>
            </tr>
          </thead>
          <tbody>
            {cart.map(item => (
              <tr key={item.name}>
                <Td>{item.name}</Td>
                <Td>{item.quantity}</Td>
                <Td>${item.price}</Td>
                <Td>${item.price * item.quantity}</Td>
              </tr>
            ))}
            <TotalRow>
              <Td colSpan={3}>Subtotal</Td>
              <Td>${subtotal.toFixed(2)}</Td>
            </TotalRow>
            <TotalRow>
              <Td colSpan={3}>Tax (10%)</Td>
              <Td>${tax.toFixed(2)}</Td>
            </TotalRow>
            <TotalRow>
              <Td colSpan={3}>Total</Td>
              <Td>${total.toFixed(2)}</Td>
            </TotalRow>
          </tbody>
        </Table>
        <Input
          type="text"
          placeholder="Customer Name (optional)"
          value={name}
          onChange={e => setName(e.target.value)}
        />
        <Input
          type="text"
          placeholder="Table Number (optional)"
          value={table}
          onChange={e => setTable(e.target.value)}
        />
        <Select value={branch} onChange={e => setBranch(e.target.value)}>
          <option value="1">📍 Branch 1</option>
          <option value="2">📍 Branch 2</option>
          <option value="3">📍 Branch 3</option>
        </Select>
        <Select value={payment} onChange={e => setPayment(e.target.value)}>
          <option>Pay at Counter</option>
          <option>Card</option>
        </Select>
        <Button type="submit">Place Order</Button>
      </form>
    </Card>
  );
};

export default Checkout;
