import React, { createContext, useState, ReactNode } from 'react';

export interface LoginLogEntry {
  username: string;
  role: string;
  time: string;
  status: 'success' | 'fail';
}

interface LoginLogContextType {
  logs: LoginLogEntry[];
  addLog: (entry: LoginLogEntry) => void;
}

export const LoginLogContext = createContext<LoginLogContextType>({
  logs: [],
  addLog: () => {},
});

export const LoginLogProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [logs, setLogs] = useState<LoginLogEntry[]>(() => {
    const stored = localStorage.getItem('auditLogs');
    return stored ? JSON.parse(stored) : [];
  });

  const addLog = (entry: LoginLogEntry) => {
    setLogs((prev) => {
      const updated = [entry, ...prev];
      localStorage.setItem('auditLogs', JSON.stringify(updated));
      return updated;
    });
  };

  return (
    <LoginLogContext.Provider value={{ logs, addLog }}>
      {children}
    </LoginLogContext.Provider>
  );
};
