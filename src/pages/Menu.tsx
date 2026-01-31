import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import { MenuContext } from '../context/MenuContext';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Cart from '../components/Cart';

const MenuGrid = styled.div`
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
	gap: 32px;
	width: 100%;
	max-width: 900px;
	margin: 0 auto;
	@media (max-width: 700px) {
		gap: 16px;
		padding: 0 4px;
	}
`;
const MenuCard = styled(motion.div)`
	background: #f8fbff;
	border-radius: 16px;
	box-shadow: 0 2px 12px rgba(0, 102, 204, 0.1);
	padding: 32px 24px;
	color: #003d82;
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	transition: transform 0.2s, box-shadow 0.2s;
	cursor: pointer;
	&:hover {
		transform: translateY(-8px) scale(1.03);
		box-shadow: 0 8px 32px rgba(0, 102, 204, 0.15);
		background: #eef6ff;
	}
	@media (max-width: 700px) {
		padding: 18px 8px;
	}
`;
const ItemImg = styled.img`
	width: 100%;
	max-width: 220px;
	border-radius: 12px;
	margin-bottom: 18px;
	align-self: center;
	@media (max-width: 700px) {
		max-width: 120px;
		margin-bottom: 10px;
	}
`;
const ItemName = styled.h3`
	font-family: 'Playfair Display', serif;
	font-size: 1.3rem;
	color: #0066cc;
	margin-bottom: 8px;
`;
const ItemDesc = styled.p`
	font-size: 1rem;
	color: #555;
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
const AddButton = styled.button`
	margin-top: 16px;
	background: #4da6ff;
	color: #fff;
	border: none;
	border-radius: 8px;
	padding: 10px 20px;
	font-size: 1rem;
	font-weight: 600;
	cursor: pointer;
	transition: background 0.2s;
	&:hover {
		background: #0052a3;
		color: #fff;
	}
`;
const CartButton = styled.button`
	position: fixed;
	top: 50%;
	right: 32px;
	transform: translateY(-50%);
	background: #fff;
	color: #0066cc;
	border: 3px solid #0066cc;
	border-radius: 32px;
	width: auto;
	min-width: 64px;
	height: 64px;
	font-size: 2.2rem;
	box-shadow: 0 4px 24px rgba(0, 102, 204, 0.22);
	cursor: pointer;
	z-index: 2000;
	display: flex;
	align-items: center;
	justify-content: center;
	padding: 0 24px 0 16px;
	gap: 10px;
	font-weight: bold;
	letter-spacing: 0.5px;
	transition: background 0.2s, color 0.2s, border 0.2s;
	outline: none;
	&:hover {
		background: #0066cc;
		color: #fff;
		border: 3px solid #0052a3;
	}
	@media (max-width: 600px) {
		right: 8px;
		min-width: 48px;
		height: 48px;
		font-size: 1.4rem;
		padding: 0 12px 0 8px;
	}
`;
const CartBadge = styled.span`
	position: absolute;
	top: 8px;
	right: 8px;
	background: #4da6ff;
	color: #fff;
	font-weight: bold;
	font-size: 1.1rem;
	border-radius: 50%;
	width: 26px;
	height: 26px;
	display: flex;
	align-items: center;
	justify-content: center;
	box-shadow: 0 1px 4px rgba(0, 0, 0, 0.12);
`;

const Menu: React.FC = () => {
	const { menu } = useContext(MenuContext);
	const { cart, setCart } = useCart();
	const [cartOpen, setCartOpen] = useState(false);
	const navigate = useNavigate();

	// Reset cartOpen when the Menu page is mounted to fix re-navigation issue
	useEffect(() => {
		setCartOpen(false);
	}, []);

	const addToCart = (item: { id: number; name: string; price: number }) => {
		setCart((prev) => {
			const found = prev.find((i) => i.id === String(item.id));
			if (found) {
				return prev.map((i) => (i.id === String(item.id) ? { ...i, quantity: i.quantity + 1 } : i));
			}
			return [...prev, { ...item, quantity: 1, id: String(item.id) }];
		});
	};

	const total = cart.reduce((sum, i) => sum + i.price * i.quantity, 0);

	const handleCheckout = () => {
		setCartOpen(false);
		navigate('/checkout'); // Redirect to checkout page
		// When an order is fulfilled, update inventory usage here (future integration)
		// Example: deductInventoryForOrder(order: Order)
	};

	return (
		<div style={{ minHeight: '100vh', background: '#f0f4f8', padding: '80px 0 40px 0' }}>
			<h2
				style={{
					color: '#003d82',
					fontFamily: 'Playfair Display',
					fontSize: '2.5rem',
					marginBottom: 32,
					textAlign: 'center',
				}}
			>
				Menu
			</h2>
			<MenuGrid>
				{menu.filter((item) => item.available).map((item, i) => (
					<MenuCard
						key={item.id}
						initial={{ opacity: 0, y: 40 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ duration: 0.5, delay: i * 0.1 }}
						tabIndex={0}
						aria-label={item.name}
					>
						<ItemImg src={item.img} alt={item.name} />
						<ItemName>{item.name}</ItemName>
						<ItemDesc>{item.desc}</ItemDesc>
						<ItemPrice>${item.price}</ItemPrice>
						<AddButton onClick={() => addToCart(item)}>Add to Cart</AddButton>
					</MenuCard>
				))}
			</MenuGrid>
			<CartButton aria-label="Open Cart" onClick={() => setCartOpen(true)} style={{ position: 'fixed' }}>
				<span style={{ position: 'relative', display: 'inline-block', fontSize: '2.2rem', marginRight: 6, filter: 'drop-shadow(0 2px 2px #4da6ff)' }}>
					🛒
					{cart.length > 0 && <CartBadge>{cart.reduce((sum, i) => sum + i.quantity, 0)}</CartBadge>}
				</span>
				<span style={{ fontWeight: 700, fontSize: '1.1rem', color: '#0066cc', letterSpacing: 0.5 }}>View Cart</span>
			</CartButton>
			<Cart
				open={cartOpen}
				onClose={() => setCartOpen(false)}
				items={cart}
				total={total}
				onCheckout={handleCheckout}
			/>
		</div>
	);
};

export default Menu;
