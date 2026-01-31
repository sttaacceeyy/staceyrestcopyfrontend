import React, { useState } from 'react';
import styled from 'styled-components';

const Card = styled.div`
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 2px 12px rgba(0,0,0,0.08);
  padding: 40px 32px 32px 32px;
  max-width: 400px;
  margin: 48px auto;
`;
const Title = styled.h1`
  color: #222;
  margin-bottom: 24px;
  text-align: center;
`;
const Input = styled.input`
  padding: 10px 12px;
  border-radius: 6px;
  border: 1px solid #ccc;
  font-size: 1rem;
  margin-bottom: 16px;
  width: 100%;
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
  width: 100%;
  transition: background 0.2s;
  &:hover {
    background: #7f1010;
  }
`;
const SuccessMsg = styled.div`
  color: #2e7d32;
  font-size: 1.2rem;
  text-align: center;
  margin-top: 32px;
`;

const CardPayment: React.FC = () => {
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');
  const [name, setName] = useState('');
  const [success, setSuccess] = useState(false);

  const handlePay = (e: React.FormEvent) => {
    e.preventDefault();
    setSuccess(true);
  };

  if (success) {
    return (
      <Card>
        <SuccessMsg>
          Payment successful!<br />Thank you for your order.
        </SuccessMsg>
      </Card>
    );
  }

  return (
    <Card>
      <Title>Card Payment</Title>
      <form onSubmit={handlePay}>
        <Input
          type="text"
          placeholder="Cardholder Name"
          value={name}
          onChange={e => setName(e.target.value)}
          required
        />
        <Input
          type="text"
          placeholder="Card Number"
          value={cardNumber}
          onChange={e => setCardNumber(e.target.value)}
          maxLength={19}
          required
        />
        <Input
          type="text"
          placeholder="MM/YY"
          value={expiry}
          onChange={e => setExpiry(e.target.value)}
          maxLength={5}
          required
        />
        <Input
          type="password"
          placeholder="CVV"
          value={cvv}
          onChange={e => setCvv(e.target.value)}
          maxLength={4}
          required
        />
        <Button type="submit">Pay</Button>
      </form>
    </Card>
  );
};

export default CardPayment;
