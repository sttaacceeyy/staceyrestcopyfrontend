import React, { createContext, useState, ReactNode } from 'react';

export interface OrderItem {
  name: string;
  qty?: number;
  quantity?: number;
  price?: number;
}

export interface Order {
  id: string;
  items: OrderItem[];
  status: 'pending' | 'in_progress' | 'fulfilled';
  placedAt?: string;
  createdAt?: string;
  updatedAt?: string;
  kitchen?: string;
  cashier?: string;
  prepTime?: number;
  branchId?: string;
}

interface OrdersContextType {
  orders: Order[];
  addOrder: (order: Omit<Order, 'id' | 'placedAt' | 'updatedAt'> & { prepTime?: number }) => void;
  updateOrderStatus: (id: string, status: Order['status'], prepTime?: number) => void;
}

const initialOrders: Order[] = [
  {
    id: '101',
    items: [ { name: 'Ribeye Steak', qty: 2 }, { name: 'Fries', qty: 1 } ],
    status: 'pending',
    placedAt: '12:00',
    updatedAt: '12:01',
    kitchen: 'Grace Kim',
    cashier: 'Evelyn Turner',
    branchId: '1',
  },
  {
    id: '102',
    items: [ { name: 'NY Strip', qty: 1 } ],
    status: 'in_progress',
    placedAt: '12:10',
    updatedAt: '12:12',
    kitchen: 'Frank Miller',
    cashier: 'Evelyn Turner',
    branchId: '1',
  },
  {
    id: '103',
    items: [ { name: 'Wagyu Burger', qty: 1 }, { name: 'Salad', qty: 1 } ],
    status: 'fulfilled',
    placedAt: '12:15',
    updatedAt: '12:30',
    kitchen: 'Grace Kim',
    cashier: 'Frank Miller',
    branchId: '2',
  },
];

export const OrdersContext = createContext<OrdersContextType>({
  orders: [],
  addOrder: () => {},
  updateOrderStatus: () => {},
});

export const OrdersProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [orders, setOrders] = useState<Order[]>(() => {
    const stored = localStorage.getItem('orders');
    return stored ? JSON.parse(stored) : initialOrders;
  });

  const addOrder = (order: Omit<Order, 'id' | 'placedAt' | 'updatedAt'> & { prepTime?: number }) => {
    setOrders(prev => {
      const now = new Date().toLocaleTimeString();
      const newOrder: Order = {
        ...order,
        id: Date.now().toString(),
        placedAt: now,
        updatedAt: now,
        prepTime: order.prepTime || Math.floor(Math.random() * 16) + 10 // random 10-25 min if not provided
      };
      const updated = [newOrder, ...prev];
      localStorage.setItem('orders', JSON.stringify(updated));
      return updated;
    });
  };

  const updateOrderStatus = (id: string, status: Order['status'], prepTime?: number) => {
    setOrders(prev => {
      const updated = prev.map(o =>
        o.id === id ? { ...o, status, updatedAt: new Date().toLocaleTimeString(), prepTime: prepTime ?? o.prepTime } : o
      );
      localStorage.setItem('orders', JSON.stringify(updated));
      return updated;
    });
  };

  return (
    <OrdersContext.Provider value={{ orders, addOrder, updateOrderStatus }}>
      {children}
    </OrdersContext.Provider>
  );
};
