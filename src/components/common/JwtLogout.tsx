import React, { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const Button = styled.button`
  background: #0066cc;
  color: #fff;
  border: none;
  border-radius: 6px;
  padding: 12px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  margin: 16px;
  transition: background 0.2s;
  &:hover {
    background: #0052a3;
  }
`;

const Logout: React.FC = () => {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const handleLogout = () => {
    logout();
    navigate('/login');
  };
  return <Button onClick={handleLogout}>Logout</Button>;
};

export default Logout;
