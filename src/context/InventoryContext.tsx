import React, { createContext, useState, ReactNode } from 'react';

export interface InventoryItem {
  name: string;
  used: number;
  expected: number;
  unit: string;
  low: boolean;
}

interface InventoryContextType {
  inventory: InventoryItem[];
  setInventory: React.Dispatch<React.SetStateAction<InventoryItem[]>>;
  updateInventory: (name: string, used: number) => void;
}

const initialInventory: InventoryItem[] = [
  { name: 'Beef', used: 12, expected: 10, unit: 'kg', low: false },
  { name: 'Potato', used: 5, expected: 7, unit: 'kg', low: true },
  { name: 'Cheese', used: 2, expected: 2, unit: 'kg', low: false },
];

export const InventoryContext = createContext<InventoryContextType>({
  inventory: [],
  setInventory: () => {},
  updateInventory: () => {},
});

export const InventoryProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [inventory, setInventory] = useState<InventoryItem[]>(() => {
    const stored = localStorage.getItem('inventory');
    return stored ? JSON.parse(stored) : initialInventory;
  });

  const updateInventory = (name: string, used: number) => {
    setInventory(prev => {
      const updated = prev.map(i => i.name === name ? { ...i, used } : i);
      localStorage.setItem('inventory', JSON.stringify(updated));
      return updated;
    });
  };

  return (
    <InventoryContext.Provider value={{ inventory, setInventory, updateInventory }}>
      {children}
    </InventoryContext.Provider>
  );
};
