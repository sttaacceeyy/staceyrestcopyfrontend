import React from 'react';
import Section from './common/Section';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const menuItems = [
  { name: 'Ribeye Steak', desc: 'Juicy, marbled, flame-grilled perfection.', price: '$38', image: '/menu/ribeyesteak.jpg' },
  { name: 'Filet Mignon', desc: 'Tenderloin, melt-in-your-mouth, classic.', price: '$42', image: '/menu/filetmignon.jpg' },
  { name: 'NY Strip', desc: 'Bold, beefy, expertly seasoned.', price: '$36', image: '/menu/NYstripe.jpg' },
  { name: 'Wagyu Burger', desc: 'Premium beef, aged cheddar, brioche bun.', price: '$24', image: '/menu/burger.jpg' },
  { name: 'Truffle Fries', desc: 'Hand-cut, parmesan, truffle oil.', price: '$12', image: '/menu/trufflefries.jpeg' },
  { name: 'Caesar Salad', desc: 'Crisp romaine, house dressing, croutons.', price: '$14', image: '/menu/caesarsalad.jpg' },
];
const fallbackImg = '/menu/burger.jpg';

const MenuGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 32px;
  width: 100%;
  max-width: 900px;
  margin: 0 auto;
`;
const MenuCard = styled(motion.div)`
  background: #f8fbff;
  border-radius: 16px;
  box-shadow: 0 2px 12px rgba(0,0,0,0.10);
  padding: 32px 24px;
  color: #003d82;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  transition: transform 0.2s, box-shadow 0.2s;
  cursor: pointer;
  &:hover {
    transform: translateY(-8px) scale(1.03);
    box-shadow: 0 8px 32px rgba(0,102,204,0.10);
    background: #f0f4f8;
  }
`;
const ItemName = styled.h3`
  font-family: 'Playfair Display', serif;
  font-size: 1.3rem;
  color: #4da6ff;
  margin-bottom: 8px;
`;
const ItemDesc = styled.p`
  font-size: 1rem;
  color: #e0e0e0;
  margin-bottom: 12px;
`;
const ItemPrice = styled.span`
  font-size: 1.1rem;
  font-weight: 600;
  color: #fff;
  background: #0066cc;
  border-radius: 8px;
  padding: 4px 14px;
  margin-top: 8px;
`;

const Menu: React.FC = () => (
  <Section id="menu" aria-label="Menu" dark>
    <h2 style={{ color: '#fff', fontFamily: 'Playfair Display', fontSize: '2.5rem', marginBottom: 32 }}>Menu</h2>
    <MenuGrid>
      {menuItems.map((item, i) => (
        <MenuCard
          key={item.name}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: i * 0.1 }}
          tabIndex={0}
          aria-label={item.name}
        >
          <div style={{position:'relative',width:'100%',height:220,display:'flex',alignItems:'center',justifyContent:'center',overflow:'hidden'}}>
            <img 
              src={item.image} 
              alt={item.name}
              style={{ width: 'auto', maxWidth: '100%', height: 200, objectFit: 'contain', borderRadius: 12, marginBottom: 16, background:'#f0f4f8' }} 
              onError={e => {
                console.error(`Image failed to load: ${item.image}`);
                (e.currentTarget as HTMLImageElement).src = fallbackImg;
                e.currentTarget.alt = `Image not found: ${item.image}`;
                if (!e.currentTarget.nextSibling) {
                  const overlay = document.createElement('div');
                  overlay.textContent = 'Image not found';
                  overlay.style.position = 'absolute';
                  overlay.style.top = '50%';
                  overlay.style.left = '50%';
                  overlay.style.transform = 'translate(-50%, -50%)';
                  overlay.style.background = 'rgba(183,28,28,0.9)';
                  overlay.style.color = '#fff';
                  overlay.style.padding = '8px 16px';
                  overlay.style.borderRadius = '8px';
                  overlay.style.fontWeight = 'bold';
                  overlay.style.zIndex = '2';
                  e.currentTarget.parentElement?.appendChild(overlay);
                }
              }}
            />
          </div>
          <ItemName>{item.name}</ItemName>
          <ItemDesc>{item.desc}</ItemDesc>
          <ItemPrice>{item.price}</ItemPrice>
        </MenuCard>
      ))}
    </MenuGrid>
  </Section>
);

export default Menu;
