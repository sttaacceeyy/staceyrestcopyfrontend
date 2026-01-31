import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { RegisteredUsersContext } from '../context/RegisteredUsersContext';
import styled from 'styled-components';
import { login as apiLogin } from '../services/api';

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
  color: #222;
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
    background: #7f1010;
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

const Login: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login: authLogin } = useContext(AuthContext);
  const { users: registeredUsers } = useContext(RegisteredUsersContext);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      console.log('[Login] ========== LOGIN ATTEMPT ==========');
      console.log('[Login] Username:', username);
      console.log('[Login] Password length:', password.length);
      console.log('[Login] Calling API...');
      
      // Call backend API with trimmed username and password
      const response = await apiLogin(username.trim(), password.trim());
      
      console.log('[Login] API returned successfully');
      console.log('[Login] Response:', response);
      
      handleLoginSuccess(response, authLogin, navigate);
    } catch (err: any) {
      console.error('[Login] ========== LOGIN FAILED - TRYING FALLBACK CREDENTIALS ==========');
      console.error('[Login] Error:', err?.message);
      
      // Fallback to hardcoded test credentials if API fails
      if (username === 'chef_branch_1' && password === 'password123') {
        const mockResponse = {
          token: 'mock-jwt-token-branch-1',
          user: { id: '1', username: 'chef_branch_1', role: 'chef', branchId: '1' }
        };
        handleLoginSuccess(mockResponse, authLogin, navigate);
        return;
      }
      
      if (username === 'chef_branch_2' && password === 'password123') {
        const mockResponse = {
          token: 'mock-jwt-token-branch-2',
          user: { id: '2', username: 'chef_branch_2', role: 'chef', branchId: '2' }
        };
        handleLoginSuccess(mockResponse, authLogin, navigate);
        return;
      }
      
      if (username === 'chef_branch_3' && password === 'password123') {
        const mockResponse = {
          token: 'mock-jwt-token-branch-3',
          user: { id: '3', username: 'chef_branch_3', role: 'chef', branchId: '3' }
        };
        handleLoginSuccess(mockResponse, authLogin, navigate);
        return;
      }

      if (username === 'manager_branch_1' && password === 'password123') {
        const mockResponse = {
          token: 'mock-jwt-token-manager-1',
          user: { id: '4', username: 'manager_branch_1', role: 'branchManager', branchId: '1' }
        };
        handleLoginSuccess(mockResponse, authLogin, navigate);
        return;
      }

      if (username === 'manager_branch_2' && password === 'password123') {
        const mockResponse = {
          token: 'mock-jwt-token-manager-2',
          user: { id: '5', username: 'manager_branch_2', role: 'branchManager', branchId: '2' }
        };
        handleLoginSuccess(mockResponse, authLogin, navigate);
        return;
      }

      if (username === 'manager_branch_3' && password === 'password123') {
        const mockResponse = {
          token: 'mock-jwt-token-manager-3',
          user: { id: '6', username: 'manager_branch_3', role: 'branchManager', branchId: '3' }
        };
        handleLoginSuccess(mockResponse, authLogin, navigate);
        return;
      }

      if (username === 'cashier_branch_1' && password === 'password123') {
        const mockResponse = {
          token: 'mock-jwt-token-cashier-1',
          user: { id: '7', username: 'cashier_branch_1', role: 'cashier', branchId: '1' }
        };
        handleLoginSuccess(mockResponse, authLogin, navigate);
        return;
      }

      if (username === 'cashier_branch_2' && password === 'password123') {
        const mockResponse = {
          token: 'mock-jwt-token-cashier-2',
          user: { id: '8', username: 'cashier_branch_2', role: 'cashier', branchId: '2' }
        };
        handleLoginSuccess(mockResponse, authLogin, navigate);
        return;
      }

      if (username === 'cashier_branch_3' && password === 'password123') {
        const mockResponse = {
          token: 'mock-jwt-token-cashier-3',
          user: { id: '9', username: 'cashier_branch_3', role: 'cashier', branchId: '3' }
        };
        handleLoginSuccess(mockResponse, authLogin, navigate);
        return;
      }

      if (username === 'admin' && password === 'password123') {
        const mockResponse = {
          token: 'mock-jwt-token-admin',
          user: { id: '10', username: 'admin', role: 'admin' }
        };
        handleLoginSuccess(mockResponse, authLogin, navigate);
        return;
      }

      if (username === 'hqmanager' && password === 'password123') {
        const mockResponse = {
          token: 'mock-jwt-token-hqmanager',
          user: { id: '11', username: 'hqmanager', role: 'hqManager' }
        };
        handleLoginSuccess(mockResponse, authLogin, navigate);
        return;
      }

      // Check for registered customers
      const registeredUser = registeredUsers.find(u => u.username === username && u.password === password);
      if (registeredUser) {
        const mockResponse = {
          token: 'mock-jwt-token-customer-' + username,
          user: { id: 'customer-' + username, username: registeredUser.username, role: 'customer' }
        };
        handleLoginSuccess(mockResponse, authLogin, navigate);
        return;
      }
      
      setError('Invalid username or password');
    } finally {
      setLoading(false);
    }
  };

  const handleLoginSuccess = (response: any, authLogin: any, navigate: any) => {
    if (response.user) {
      localStorage.setItem('authToken', response.token);
      localStorage.setItem('user', JSON.stringify(response.user));
      
      const user = response.user;
      console.log('[Login] Parsed user:', user);
      console.log('[Login] User role:', user.role);
      console.log('[Login] User branchId:', user.branchId);
      
      // Update AuthContext
      authLogin(response.token, {
        id: user.id,
        name: user.username || user.name,
        role: user.role,
        branchId: user.branchId,
      });
      
      // Redirect based on role
      const roleRoutes: { [key: string]: string } = {
        'chef': user.branchId === '1' ? '/dashboard/chef/branch1' 
                : user.branchId === '2' ? '/dashboard/chef/branch2' 
                : user.branchId === '3' ? '/dashboard/chef/branch3' 
                : '/',
        'cashier': '/dashboard/cashier',
        'manager': '/dashboard/branch',
        'branchManager': '/dashboard/branch',
        'hqManager': '/dashboard/hq/reports',
        'admin': '/admin/users',
      };
      
      const redirectUrl = roleRoutes[user.role] || '/';
      console.log('[Login] Redirecting to:', redirectUrl);
      navigate(redirectUrl);
    }
  };

  return (
    <Card>
      <Title>Login</Title>
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
        <Button type="submit" disabled={loading}>{loading ? '🔄 Logging in...' : 'Login'}</Button>
      </StyledForm>
    </Card>
  );
};

export default Login;
