import React, { createContext, useState, ReactNode } from 'react';

export interface RegisteredUser {
  username: string;
  password: string;
}

interface RegisteredUsersContextType {
  users: RegisteredUser[];
  addUser: (user: RegisteredUser) => void;
  isRegistered: (username: string, password: string) => boolean;
}

export const RegisteredUsersContext = createContext<RegisteredUsersContextType>({
  users: [],
  addUser: () => {},
  isRegistered: () => false,
});

export const RegisteredUsersProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [users, setUsers] = useState<RegisteredUser[]>(() => {
    const stored = localStorage.getItem('registeredUsers');
    return stored ? JSON.parse(stored) : [];
  });

  const addUser = (user: RegisteredUser) => {
    setUsers(prev => {
      const updated = [...prev, user];
      localStorage.setItem('registeredUsers', JSON.stringify(updated));
      return updated;
    });
  };

  const isRegistered = (username: string, password: string) => {
    return users.some(u => u.username === username && u.password === password);
  };

  return (
    <RegisteredUsersContext.Provider value={{ users, addUser, isRegistered }}>
      {children}
    </RegisteredUsersContext.Provider>
  );
};
