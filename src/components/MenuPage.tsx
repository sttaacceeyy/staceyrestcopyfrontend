import React, { useState } from 'react';
import styled from 'styled-components';
import Cart from './Cart';

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: 'Starters' | 'Mains' | 'Desserts' | 'Drinks';
}

const menu: MenuItem[] = [
  { id: '1', name: 'Wagyu Tartare', description: 'Hand-chopped wagyu, quail egg, crostini.', price: 95, category: 'Starters' },
  { id: '2', name: 'Caesar Salad', description: 'Crisp romaine, parmesan, house dressing.', price: 65, category: 'Starters' },
  { id: '3', name: 'Wagyu Ribeye', description: 'Premium Japanese Wagyu, grilled to perfection.', price: 320, category: 'Mains' },
  { id: '4', name: 'Filet Mignon', description: 'Tenderloin steak with truffle butter.', price: 260, category: 'Mains' },
  { id: '5', name: 'Tomahawk', description: 'Massive bone-in ribeye, perfect for sharing.', price: 480, category: 'Mains' },
  { id: '6', name: 'Molten Chocolate Cake', description: 'Rich chocolate cake with a gooey center.', price: 55, category: 'Desserts' },
  { id: '7', name: 'Classic Tiramisu', description: 'Espresso-soaked ladyfingers, mascarpone.', price: 48, category: 'Desserts' },
  { id: '8', name: 'Old Fashioned', description: 'Bourbon, bitters, orange zest.', price: 60, category: 'Drinks' },
  { id: '9', name: 'Cabernet Sauvignon', description: 'Full-bodied red wine, glass.', price: 75, category: 'Drinks' },
];

const categories = ['Starters', 'Mains', 'Desserts', 'Drinks'] as const;

type CartItem = MenuItem & { quantity: number };

const MenuPage: React.FC = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const addToCart = (item: MenuItem) => {
    setCart((prev) => {
      const found = prev.find((i) => i.id === item.id);
      if (found) {
        return prev.map((i) => i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i);
      }
      return [...prev, { ...item, quantity: 1 }];
    });
  };
  const total = cart.reduce((sum, i) => sum + i.price * i.quantity, 0);
  const handleCheckout = () => {
    alert('Thank you for your order!');
    setCart([]);
    setCartOpen(false);
  };
  return (
    <MenuWrapper>
      <h1>Steakz Menu</h1>
      {categories.map((cat) => (
        <CategorySection key={cat}>
          <CategoryTitle>{cat}</CategoryTitle>
          <ItemsGrid>
            {menu.filter((m) => m.category === cat).map((item) => (
              <MenuCard key={item.id}>
                <div>
                  <ItemName>{item.name}</ItemName>
                  <ItemDesc>{item.description}</ItemDesc>
                </div>
                <CardFooter>
                  <ItemPrice>AED {item.price}</ItemPrice>
                  <AddBtn onClick={() => addToCart(item)}>Add to Cart</AddBtn>
                </CardFooter>
              </MenuCard>
            ))}
          </ItemsGrid>
        </CategorySection>
      ))}
      <CartIconBtn onClick={() => setCartOpen(true)}>
        <span role="img" aria-label="cart">🛒</span>
        {cart.length > 0 && <CartBadge>{cart.length}</CartBadge>}
      </CartIconBtn>
      <Cart
        items={cart}
        total={total}
        onCheckout={handleCheckout}
        onClose={() => setCartOpen(false)}
        open={cartOpen}
      />
    </MenuWrapper>
  );
};

export default MenuPage;

// Styled-components
const MenuWrapper = styled.div`
  max-width: 900px;
  margin: 0 auto;
  padding: 2rem 1rem 5rem 1rem;
  background: #fff8f0;
  border-radius: 18px;
  box-shadow: 0 4px 32px rgba(80,30,30,0.08);
`;
const CategorySection = styled.section`
  margin-bottom: 2.5rem;
`;
const CategoryTitle = styled.h2`
  color: #0066cc;
  font-size: 2rem;
  font-family: 'Playfair Display', serif;
  margin-bottom: 1.2rem;
`;
const ItemsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 1.5rem;
`;
const MenuCard = styled.div`
  background: #fff;
  border-radius: 14px;
  box-shadow: 0 2px 12px rgba(0,102,204,0.08);
  padding: 1.5rem 1.2rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 160px;
`;
const ItemName = styled.h3`
  font-size: 1.15rem;
  color: #0052a3;
  font-weight: bold;
  margin-bottom: 0.3rem;
`;
const ItemDesc = styled.p`
  color: #555;
  font-size: 1rem;
  margin-bottom: 0.7rem;
`;
const CardFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const ItemPrice = styled.span`
  color: #0066cc;
  font-weight: 600;
  font-size: 1.1rem;
`;
const AddBtn = styled.button`
  background: linear-gradient(90deg, #003d82 60%, #0066cc 100%);
  color: #fff;
  border: none;
  border-radius: 8px;
  padding: 0.5rem 1.2rem;
  font-weight: bold;
  font-size: 1rem;
  cursor: pointer;
  transition: background 0.2s;
  &:hover {
    background: linear-gradient(90deg, #0066cc 60%, #003d82 100%);
  }
`;
// Cart Drawer (for demo, always visible at bottom)
const CartIconBtn = styled.button`
  position: fixed;
  top: 24px;
  right: 32px;
  z-index: 3001;
  background: #f8fbff;
  border: 2px solid #0066cc;
  border-radius: 50%;
  width: 52px;
  height: 52px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  box-shadow: 0 2px 8px rgba(0,102,204,0.10);
  cursor: pointer;
  transition: background 0.2s;
  &:hover {
    background: #4da6ff;
  }
  @media (max-width: 600px) {
    top: 16px;
    right: 16px;
    width: 44px;
    height: 44px;
    font-size: 1.5rem;
  }
`;
const CartBadge = styled.span`
  position: absolute;
  top: 6px;
  right: 6px;
  background: #0066cc;
  color: #fff;
  border-radius: 50%;
  font-size: 0.9rem;
  padding: 2px 7px;
  font-weight: bold;
`;
// Cart Drawer (for demo, always visible at bottom)
const CartDrawer = styled.div`
  position: fixed;
  right: 0;
  bottom: 0;
  width: 320px;
  background: #003d82;
  color: #f8fbff;
  box-shadow: -2px 0 16px rgba(0,61,130,0.12);
  border-top-left-radius: 18px;
  padding: 1.5rem 1.2rem 1.2rem 1.2rem;
  z-index: 2000;
  @media (max-width: 600px) {
    width: 100vw;
    left: 0;
    border-radius: 0;
  }
`;
const CartTitle = styled.h3`
  font-size: 1.3rem;
  margin-bottom: 1rem;
`;
const EmptyCart = styled.div`
  color: #4da6ff;
  font-size: 1.1rem;
  margin-bottom: 1rem;
`;
const CartList = styled.div`
  margin-bottom: 1rem;
`;
const CartItemRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.5rem;
`;
const CartTotal = styled.div`
  font-weight: bold;
  font-size: 1.15rem;
  margin-bottom: 1rem;
`;
const CheckoutBtn = styled.button`
  width: 100%;
  background: #4da6ff;
  color: #003d82;
  font-weight: bold;
  border: none;
  border-radius: 8px;
  padding: 0.8rem 0;
  font-size: 1.1rem;
  cursor: pointer;
  transition: background 0.2s;
  &:hover:enabled {
    background: #0066cc;
    color: #fff;
  }
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;
