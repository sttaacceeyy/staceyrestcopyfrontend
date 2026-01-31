import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

export type Staff = {
  id: string;
  name: string;
  role: string;
  contact: string;
  branch: string;
  status: string;
  salary: number;
  salaryHistory: number[];
  attendance: number;
  performance: number;
};

const initialStaff: Staff[] = [
  { id: 'e1', name: 'Alice Smith', role: 'manager', contact: 'alice@steakz.com', branch: '1', status: 'active', salary: 5000, salaryHistory: [5000, 4800, 4700], attendance: 96, performance: 4.7 },
  { id: 'e2', name: 'Bob Lee', role: 'chef', contact: 'bob@steakz.com', branch: '2', status: 'on leave', salary: 4200, salaryHistory: [4200, 4200, 4100], attendance: 89, performance: 4.2 },
  { id: 'e3', name: 'Carol Jones', role: 'branchManager', contact: 'carol@steakz.com', branch: '3', status: 'active', salary: 6000, salaryHistory: [6000, 5900, 5800], attendance: 98, performance: 4.9 },
  { id: 'e4', name: 'David Kim', role: 'cashier', contact: 'david@steakz.com', branch: '1', status: 'terminated', salary: 3200, salaryHistory: [3200, 3200, 3200], attendance: 75, performance: 3.8 },
];

interface StaffContextType {
  staff: Staff[];
  setStaff: React.Dispatch<React.SetStateAction<Staff[]>>;
  updateRole: (id: string, role: string) => void;
  updateStatus: (id: string, status: string) => void;
}

const StaffContext = createContext<StaffContextType | undefined>(undefined);

const STAFF_STORAGE_KEY = 'steakz_staff_data';

const getInitialStaff = () => {
  const stored = localStorage.getItem(STAFF_STORAGE_KEY);
  if (stored) return JSON.parse(stored);
  return initialStaff;
};

export const StaffProvider = ({ children }: { children: ReactNode }) => {
  const [staff, setStaff] = useState<Staff[]>(getInitialStaff());

  useEffect(() => {
    localStorage.setItem(STAFF_STORAGE_KEY, JSON.stringify(staff));
  }, [staff]);

  const updateRole = (id: string, role: string) => {
    setStaff(prev => prev.map(e => e.id === id ? { ...e, role } : e));
  };
  const updateStatus = (id: string, status: string) => {
    setStaff(prev => prev.map(e => e.id === id ? { ...e, status } : e));
  };

  return (
    <StaffContext.Provider value={{ staff, setStaff, updateRole, updateStatus }}>
      {children}
    </StaffContext.Provider>
  );
};

export const useStaff = () => {
  const ctx = useContext(StaffContext);
  if (!ctx) throw new Error('useStaff must be used within StaffProvider');
  return ctx;
};
