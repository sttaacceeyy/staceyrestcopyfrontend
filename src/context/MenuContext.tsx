import React, { createContext, useState, ReactNode } from 'react';

export interface MenuItem {
  id: number;
  name: string;
  desc: string;
  price: number;
  img: string;
  category: string;
  available: boolean;
}

interface MenuContextType {
  menu: MenuItem[];
  setMenu: React.Dispatch<React.SetStateAction<MenuItem[]>>;
  addMenuItem: (item: Omit<MenuItem, 'id'>) => void;
  editMenuItem: (id: number, item: Partial<MenuItem>) => void;
  deleteMenuItem: (id: number) => void;
  toggleAvailability: (id: number) => void;
}

const initialMenu: MenuItem[] = [
  { id: 1, name: 'Ribeye Steak', desc: 'Juicy, marbled, flame-grilled perfection.', price: 38, img: '/menu/ribeyesteak.jpg', category: 'Main', available: true },
  { id: 2, name: 'Filet Mignon', desc: 'Tenderloin, melt-in-your-mouth, classic.', price: 42, img: '/menu/filetmignon.jpg', category: 'Main', available: true },
  { id: 3, name: 'NY Strip', desc: 'Bold, beefy, expertly seasoned.', price: 36, img: '/menu/NYstripe.jpg', category: 'Main', available: false },
  { id: 4, name: 'Wagyu Burger', desc: 'Premium beef, aged cheddar, brioche bun.', price: 24, img: '/menu/burger.jpg', category: 'Main', available: true },
  { id: 5, name: 'Truffle Fries', desc: 'Hand-cut, parmesan, truffle oil.', price: 12, img: '/menu/trufflefries.jpeg', category: 'Sides', available: true },
  { id: 6, name: 'Caesar Salad', desc: 'Crisp romaine, house dressing, croutons.', price: 14, img: '/menu/caesarsalad.jpg', category: 'Sides', available: true },
];

export const MenuContext = createContext<MenuContextType>({
  menu: [],
  setMenu: () => {},
  addMenuItem: () => {},
  editMenuItem: () => {},
  deleteMenuItem: () => {},
  toggleAvailability: () => {},
});

export const MenuProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [menu, setMenu] = useState<MenuItem[]>(() => {
    const stored = localStorage.getItem('menu');
    return stored ? JSON.parse(stored) : initialMenu;
  });

  const addMenuItem = (item: Omit<MenuItem, 'id'>) => {
    setMenu(prev => {
      const newItem = { ...item, id: Date.now() };
      const updated = [...prev, newItem];
      localStorage.setItem('menu', JSON.stringify(updated));
      return updated;
    });
  };

  const editMenuItem = (id: number, item: Partial<MenuItem>) => {
    setMenu(prev => {
      const updated = prev.map(m => m.id === id ? { ...m, ...item } : m);
      localStorage.setItem('menu', JSON.stringify(updated));
      return updated;
    });
  };

  const deleteMenuItem = (id: number) => {
    setMenu(prev => {
      const updated = prev.filter(m => m.id !== id);
      localStorage.setItem('menu', JSON.stringify(updated));
      return updated;
    });
  };

  const toggleAvailability = (id: number) => {
    setMenu(prev => {
      const updated = prev.map(m => m.id === id ? { ...m, available: !m.available } : m);
      localStorage.setItem('menu', JSON.stringify(updated));
      return updated;
    });
  };

  return (
    <MenuContext.Provider value={{ menu, setMenu, addMenuItem, editMenuItem, deleteMenuItem, toggleAvailability }}>
      {children}
    </MenuContext.Provider>
  );
};
