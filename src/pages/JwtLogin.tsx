import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
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
  color: #003d82;
  margin-bottom: 24px;
  text-align: center;
`;
const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 18px;
`;
const Input = styled.input`
  padding: 10px 12px;
  border-radius: 6px;
  border: 1px solid #ccc;
  font-size: 1rem;
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
`;
const ErrorMsg = styled.p`
  color: #c62828;
  text-align: center;
  margin-bottom: 0;
`;

// Simulate JWT generation for demo
function generateJwt(role: string, name: string) {
  // This is NOT secure, just for demo/testing
  const payload = {
    id: name,
    name,
    role,
    exp: Math.floor(Date.now() / 1000) + 60 * 60,
  };
  return btoa(JSON.stringify(payload)) + '.' + btoa('signature');
}

const Login: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Demo: hardcoded users
    if (username === 'admin' && password === 'admin123') {
      login(
        generateJwt('admin', 'admin'),
        { id: 'admin', name: 'admin', role: 'admin' }
      );
      navigate('/admin/users');
      return;
    }
    if (username === 'manager' && password === 'manager123') {
      login(
        generateJwt('manager', 'manager'),
        { id: 'manager', name: 'manager', role: 'manager' }
      );
      navigate('/dashboard/branch');
      return;
    }
    if (username === 'cashier' && password === 'cashier123') {
      login(
        generateJwt('cashier', 'cashier'),
        { id: 'cashier', name: 'cashier', role: 'cashier' }
      );
      navigate('/dashboard/cashier/orders');
      return;
    }
    if (username && password) {
      // Simulate customer
      login(
        generateJwt('customer', username),
        { id: username, name: username, role: 'customer' }
      );
      navigate('/');
      return;
    }
    setError('Login failed');
  };

  return (
    <Card>
      <Title>Login (JWT Demo)</Title>
      {error && <ErrorMsg>{error}</ErrorMsg>}
      <StyledForm onSubmit={handleSubmit}>
        <Input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
          required
        />
        <Input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
        />
        <Button type="submit">Login</Button>
      </StyledForm>
    </Card>
  );
};

export default Login;
