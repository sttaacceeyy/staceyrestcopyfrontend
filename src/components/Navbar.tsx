import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-scroll';
import styled, { css } from 'styled-components';
import { motion } from 'framer-motion';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const NavbarContainer = styled(motion.nav)<{scrolled: boolean}>`
  position: sticky;
  top: 0;
  width: 100vw;
  z-index: 100;
  background: ${({ scrolled }: { scrolled: boolean }) =>
    scrolled
      ? 'rgba(0, 61, 130, 0.95)'
      : 'linear-gradient(90deg, #003d82 60%, #0066cc 100%)'};
  box-shadow: ${({ scrolled }: { scrolled: boolean }) =>
    scrolled ? '0 2px 8px rgba(0,0,0,0.12)' : 'none'};
  transition: background 0.3s, box-shadow 0.3s;
`;

const NavContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 70px;
  padding: 0 24px;
`;

const Logo = styled(Link)`
  font-family: 'Playfair Display', serif;
  font-size: 2.2rem;
  color: #f8fbff;
`;

const NavLinks = styled.ul`
  display: flex;
  gap: 36px;
  list-style: none;
  margin: 0;
  padding: 0;
`;

const NavLink = styled(Link)`
  color: #f8fbff;
  font-size: 1.1rem;
  font-weight: 500;
  cursor: pointer;
  text-decoration: none;
  transition: color 0.2s;
  &:hover {
    color: #4da6ff;
  }
`;

const Hamburger = styled.button`
  display: none;
  background: none;
  border: none;
  flex-direction: column;
  gap: 5px;
  cursor: pointer;
  @media (max-width: 900px) {
    display: flex;
  }
`;

const Bar = styled.span`
  width: 28px;
  height: 3px;
  background: #fff8f0;
  border-radius: 2px;
  transition: all 0.3s;
`;

const MobileMenu = styled(motion.ul)`
  display: none;
  @media (max-width: 900px) {
    display: flex;
    flex-direction: column;
    position: absolute;
    top: 70px;
    left: 0;
    width: 100vw;
    background: #1a1a1a;
    gap: 0;
    z-index: 200;
    padding: 0;
  }
`;

const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Manager-specific nav items
  const managerNavItems = [
    { label: 'Reports', path: '/dashboard/manager?tab=Reports' },
    { label: 'Menu', path: '/dashboard/manager?tab=Menu' },
    { label: 'Orders', path: '/dashboard/manager?tab=Orders' },
    { label: 'Kitchen', path: '/dashboard/manager?tab=Kitchen' },
    { label: 'Inventory', path: '/dashboard/manager?tab=Inventory' },
    { label: 'Staff', path: '/dashboard/manager?tab=Staff' },
    { label: 'Feedback', path: '/dashboard/manager?tab=Feedback' },
  ];

  // Default nav items
  const navItems = [
    { to: 'hero', label: 'Home' },
    { to: 'about', label: 'About' },
    { to: 'menu', label: 'Menu' },
    { to: 'reservation', label: 'Reservations' },
    { to: 'contact', label: 'Contact' },
  ];

  return (
    <NavbarContainer scrolled={scrolled} initial={{ y: -80 }} animate={{ y: 0 }}>
      <NavContent>
        <Logo to="hero" smooth duration={600} offset={-70} spy>Steakz</Logo>
        <NavLinks className="desktop-nav">
          {user?.role === 'manager'
            ? managerNavItems.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.path}
                    style={{ color: '#fff8f0', fontSize: '1.1rem', fontWeight: 500, textDecoration: 'none', cursor: 'pointer' }}
                    onClick={e => {
                      e.preventDefault();
                      navigate(item.path);
                      setMobileOpen(false);
                    }}
                  >
                    {item.label}
                  </a>
                </li>
              ))
            : navItems.map((item) => (
                <li key={item.to}>
                  <NavLink
                    to={item.to}
                    smooth
                    duration={600}
                    offset={-70}
                    spy
                    onClick={() => setMobileOpen(false)}
                  >
                    {item.label}
                  </NavLink>
                </li>
              ))}
        </NavLinks>
        <Hamburger onClick={() => setMobileOpen((o) => !o)} aria-label="Toggle navigation">
          <Bar />
          <Bar />
          <Bar />
        </Hamburger>
        {mobileOpen && (
          <MobileMenu
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -100, opacity: 0 }}
          >
            {user?.role === 'manager'
              ? managerNavItems.map((item) => (
                  <li key={item.label}>
                    <a
                      href={item.path}
                      style={{ color: '#fff8f0', fontSize: '1.1rem', fontWeight: 500, textDecoration: 'none', cursor: 'pointer' }}
                      onClick={e => {
                        e.preventDefault();
                        navigate(item.path);
                        setMobileOpen(false);
                      }}
                    >
                      {item.label}
                    </a>
                  </li>
                ))
              : navItems.map((item) => (
                  <li key={item.to}>
                    <NavLink
                      to={item.to}
                      smooth
                      duration={600}
                      offset={-70}
                      spy
                      onClick={() => setMobileOpen(false)}
                    >
                      {item.label}
                    </NavLink>
                  </li>
                ))}
          </MobileMenu>
        )}
      </NavContent>
    </NavbarContainer>
  );
};

export default Navbar;

export {};
