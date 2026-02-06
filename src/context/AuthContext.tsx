import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { RBACUser, UserRole } from '../types';
import { LoginLogContext } from './LoginLogContext';

export interface User {
  id: string;
  name: string;
  role: UserRole;
  loginTime?: string; // Add loginTime to User interface
  branchId?: string; // Add branchId for branchManager/chef
}

// Simulate a logged-in user (replace with real auth in production)
export const mockUser: RBACUser = {
  id: '1',
  name: 'Jane Doe',
  role: 'manager', // Change to 'admin' or 'customer' to test
};

interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (token: string, user: RBACUser) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType & { loading: boolean }>({
  user: null,
  token: null,
  login: () => {},
  logout: () => {},
  loading: true,
});

const normalizeRole = (role: string): UserRole => {
  if (!role) return 'customer';
  const roleMap: { [key: string]: UserRole } = {
    'CHEF': 'chef',
    'CASHIER': 'cashier',
    'BRANCHMANAGER': 'branchManager',
    'HQMANAGER': 'hqManager',
    'ADMIN': 'admin',
    'CUSTOMER': 'customer',
    'MANAGER': 'branchManager',
    'WRITER': 'customer',
  };
  return roleMap[role.toUpperCase()] || 'customer';
};

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const { addLog } = React.useContext(LoginLogContext);

  useEffect(() => {
    // Check for existing token on mount
    const storedToken = localStorage.getItem('authToken');
    const storedUser = localStorage.getItem('user');
    if (storedToken && storedUser) {
      setToken(storedToken);
      const userData = JSON.parse(storedUser);
      setUser({
        id: userData.id,
        name: userData.username || userData.name,
        role: normalizeRole(userData.role),
        branchId: userData.branchId ? String(userData.branchId) : undefined,
        loginTime: new Date().toISOString(),
      });
    }
    setLoading(false);
  }, []);

  // Always restore user from localStorage if missing (for all roles, including cashier)
  useEffect(() => {
    if (!user) {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        const userData = JSON.parse(storedUser);
        setUser({
          ...userData,
          role: normalizeRole(userData.role),
          branchId: userData.branchId ? String(userData.branchId) : undefined,
        });
      }
    }
  }, [user]);

  const login = (token: string, user: RBACUser) => {
    const normalizedRole = normalizeRole(user.role);
    const normalizedUser = {
      ...user,
      role: normalizedRole,
      branchId: user.branchId ? String(user.branchId) : undefined,
    };
    setToken(token);
    setUser({ ...normalizedUser, loginTime: new Date().toLocaleString() });
    localStorage.setItem('authToken', token);
    localStorage.setItem('user', JSON.stringify({ ...normalizedUser, loginTime: new Date().toLocaleString() }));
    addLog({
      username: normalizedUser.name,
      role: normalizedRole,
      time: new Date().toLocaleString(),
      status: 'success',
    });
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
    // Optionally, clear cookies if you use them for auth (not shown here)
  };

  if (loading) return <div>Loading...</div>;

  return (
    <AuthContext.Provider value={{ user, token, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

interface UserContextType {
  user: RBACUser;
  setUser: React.Dispatch<React.SetStateAction<RBACUser>>;
}

export const UserContext = React.createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = React.useState<RBACUser>(mockUser);
  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

