import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { LoginLogContext } from '../context/LoginLogContext';
import { RegisteredUsersContext } from '../context/RegisteredUsersContext';
import { UserRole } from '../types';
import styled from 'styled-components';

const Card = styled.div`
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 2px 12px rgba(0,0,0,0.08);
  padding: 40px 32px 32px 32px;
  max-width: 400px;
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
const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 18px;
  @media (max-width: 700px) {
    gap: 10px;
  }
`;
const Input = styled.input`
  padding: 10px 12px;
  border-radius: 6px;
  border: 1px solid #ccc;
  font-size: 1rem;
  @media (max-width: 700px) {
    padding: 7px 8px;
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
const ErrorMsg = styled.p`
  color: #c62828;
  text-align: center;
  margin-bottom: 0;
`;

const Signup: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const { login: authLogin } = useContext(AuthContext);
  const { addLog } = useContext(LoginLogContext);
  const { users: registeredCustomers, addUser } = useContext(RegisteredUsersContext);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username && password) {
      if (registeredCustomers.some(u => u.username === username)) {
        setError('You are already registered. Please log in.');
        return;
      }
      const rbacUser = {
        id: 'mock-' + username,
        name: username,
        role: 'customer' as UserRole, // force lowercase 'customer' role
      };
      authLogin('mock-token', rbacUser);
      addUser({ username, password });
      addLog({ username, role: 'customer', time: new Date().toLocaleString(), status: 'success' });
      navigate('/'); // redirect to home page for customers
    } else {
      setError('Signup failed');
    }
  };

  return (
    <Card>
      <Title>Sign Up</Title>
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
        <Button type="submit">Sign Up</Button>
      </StyledForm>
    </Card>
  );
};

export default Signup;
