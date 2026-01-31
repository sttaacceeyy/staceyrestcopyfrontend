import React, { useContext, useState } from 'react';
import { Link, useNavigate, NavLink as RouterNavLink } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import styled from 'styled-components';

const Nav = styled.nav`
  background: linear-gradient(90deg, #003d82 60%, #0066cc 100%);
  color: #fff;
  padding: 0 32px;
  height: 60px;
  display: flex;
  align-items: center;
  position: sticky;
  top: 0;
  z-index: 100;
  box-shadow: 0 2px 8px rgba(0,61,130,0.08);
  @media (max-width: 700px) {
    padding: 0 8px;
    height: 52px;
  }
`;
const Container = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  justify-content: space-between;
  @media (max-width: 700px) {
    max-width: 100vw;
  }
`;
const Logo = styled(Link)`
  font-size: 1.5rem;
  font-weight: 700;
  color: #fff;
  text-decoration: none;
  letter-spacing: 2px;
  @media (max-width: 700px) {
    font-size: 1.1rem;
    padding: 0 4px;
  }
`;
const NavLinks = styled.div`
  display: flex;
  align-items: center;
  gap: 18px;
  @media (max-width: 700px) {
    gap: 8px;
  }
`;
const StyledNavLink = styled(RouterNavLink)`
  color: #fff;
  text-decoration: none;
  font-size: 1rem;
  font-weight: 500;
  padding: 6px 12px;
  border-radius: 4px;
  transition: background 0.2s;
  &.active {
    background: #0052a3;
    color: #fff;
  }
  &:hover {
    background: #0052a3;
  }
  @media (max-width: 700px) {
    font-size: 0.95rem;
    padding: 4px 6px;
  }
`;
const LogoutBtn = styled.button`
  background: #0052a3;
  color: #fff;
  border: none;
  border-radius: 4px;
  padding: 6px 14px;
  font-size: 1rem;
  font-weight: 500;
  margin-left: 12px;
  cursor: pointer;
  transition: background 0.2s;
  &:hover {
    background: #003d82;
  }
  @media (max-width: 700px) {
    font-size: 0.95rem;
    padding: 4px 8px;
    margin-left: 4px;
  }
`;
const MoreMenu = styled.div`
  position: relative;
  display: inline-block;
`;
const MoreDropdown = styled.div<{ $open: boolean }>`
  display: ${({ $open }) => ($open ? 'block' : 'none')};
  position: absolute;
  right: 0;
  background: #f8fbff;
  min-width: 180px;
  box-shadow: 0 2px 8px rgba(0,61,130,0.18);
  border-radius: 8px;
  z-index: 9999;
`;
const MoreTrigger = styled.div`
  color: #fff;
  font-size: 1rem;
  font-weight: 500;
  padding: 6px 12px;
  border-radius: 4px;
  cursor: pointer;
  transition: background 0.2s;
  &:hover {
    background: #0052a3;
  }
`;
const MoreLink = styled(StyledNavLink)`
  display: block;
  padding: 10px 18px;
  border-radius: 0;
  font-size: 1rem;
  &:hover {
    background: #0052a3;
    color: #fff;
  }
`;

const Navbar: React.FC = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [moreOpen, setMoreOpen] = useState(false);

  // Admin should not see customer/cashier/kitchen-only links
  const isAdmin = user?.role === 'admin';

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <Nav>
      <Container>
        <Logo to="/" style={{display:'flex',alignItems:'center',gap:8}}>
          <span style={{fontWeight:700,letterSpacing:2}}>Steakz</span>
        </Logo>
        <NavLinks>
          {/* Remove Home and Menu for admin and cashier */}
          {/* Home link removed for all users */}
          {/* CUSTOMER: Only customer pages */}
          {user?.role === 'customer' && !isAdmin && (
            <>
              <StyledNavLink to="/menu">Menu</StyledNavLink>
              <StyledNavLink to="/leave-review">Leave a Review</StyledNavLink>
              <StyledNavLink to="/checkout">Checkout</StyledNavLink>
            </>
          )}
          {/* BRANCH_MANAGER: Show all branch manager pages as separate links, remove Branch Dashboard */}
          {user?.role === 'branchManager' && !isAdmin && (
            <>
              <StyledNavLink to="/dashboard/branch/reports">Reports</StyledNavLink>
              <StyledNavLink to="/dashboard/branch/inventory">Inventory</StyledNavLink>
              <StyledNavLink to="/dashboard/branch/orders">Orders</StyledNavLink>
              <StyledNavLink to="/dashboard/branch/kitchen">Kitchen</StyledNavLink>
              <StyledNavLink to="/dashboard/branch/staff">Staff</StyledNavLink>
              <StyledNavLink to="/dashboard/branch/feedback">Feedback</StyledNavLink>
            </>
          )}
          {/* HQ_MANAGER: All branches' dashboards and reports */}
          {user?.role === 'hqManager' && !isAdmin && (
            <>
              <StyledNavLink to="/dashboard/hq/reports">Reports</StyledNavLink>
              <StyledNavLink to="/dashboard/hq/menu">Menu</StyledNavLink>
              <StyledNavLink to="/dashboard/hq/orders">Orders</StyledNavLink>
              <StyledNavLink to="/dashboard/hq/kitchen">Kitchen</StyledNavLink>
              <StyledNavLink to="/dashboard/hq/inventory">Inventory</StyledNavLink>
              <StyledNavLink to="/dashboard/hq/staff">Staff</StyledNavLink>
              <StyledNavLink to="/dashboard/hq/feedback">Feedback</StyledNavLink>
            </>
          )}
          {/* MANAGER: Show all manager dashboard pages as separate links, remove Manager Dashboard, Menu, About Us, Contact */}
          {user?.role === 'manager' && !isAdmin && (
            <>
              <StyledNavLink to="/dashboard/manager/reports">Reports</StyledNavLink>
              <StyledNavLink to="/dashboard/manager/menu">Menu</StyledNavLink>
              <StyledNavLink to="/dashboard/manager/orders">Orders</StyledNavLink>
              <StyledNavLink to="/dashboard/manager/kitchen">Kitchen</StyledNavLink>
              <StyledNavLink to="/dashboard/manager/inventory">Inventory</StyledNavLink>
              <StyledNavLink to="/dashboard/manager/staff">Staff</StyledNavLink>
              <StyledNavLink to="/dashboard/manager/feedback">Feedback</StyledNavLink>
            </>
          )}
          {/* CASHIER: Show all cashier dashboard pages as separate links */}
          {user?.role === 'cashier' && !isAdmin && (
            <>
              <StyledNavLink to="/menu">Menu</StyledNavLink>
              <StyledNavLink to="/dashboard/cashier/orders">Order Management</StyledNavLink>
              <StyledNavLink to="/dashboard/cashier/payment">Payment Processing</StyledNavLink>
              <StyledNavLink to="/dashboard/cashier/kitchen">Kitchen Queue</StyledNavLink>
            </>
          )}
          {/* ADMIN: Only admin management/configuration/reporting links */}
          {isAdmin && (
            <>
              <StyledNavLink to="/admin/users">User Management</StyledNavLink>
              <StyledNavLink to="/admin/branches">Branch Management</StyledNavLink>
              <StyledNavLink to="/admin/logs">Audit Logs</StyledNavLink>
              <StyledNavLink to="/admin/staff">Staff Info</StyledNavLink>
              <MoreMenu
                onMouseEnter={() => setMoreOpen(true)}
                onMouseLeave={() => setMoreOpen(false)}
              >
                <MoreTrigger>
                  More ▾
                </MoreTrigger>
                <MoreDropdown $open={moreOpen}>
                  <MoreLink to="/admin/inventory-config">Inventory Config</MoreLink>
                  <MoreLink to="/reports">Reports</MoreLink>
                  <MoreLink to="/reservations">Reservation Management</MoreLink>
                  <MoreLink to="/admin/menu-management">Menu Management</MoreLink>
                  <MoreLink to="/admin/settings">Settings</MoreLink>
                </MoreDropdown>
              </MoreMenu>
            </>
          )}
          {/* Public pages for all users except cashier and manager */}
          {user?.role !== 'cashier' && user?.role !== 'manager' && <StyledNavLink to="/about">About Us</StyledNavLink>}
          {user?.role !== 'cashier' && user?.role !== 'manager' && <StyledNavLink to="/contact">Contact</StyledNavLink>}
          {/* Open area: show menu, reservations, and checkout for unauthenticated users */}
          {!user && <StyledNavLink to="/menu">Menu</StyledNavLink>}
          {!user && <StyledNavLink to="/reservations">Book a Table</StyledNavLink>}
          {!user && <StyledNavLink to="/checkout">Checkout</StyledNavLink>}
          {!user && <StyledNavLink to="/">Home</StyledNavLink>}
          {/* Auth links */}
          {!user && <StyledNavLink to="/login">Login</StyledNavLink>}
          {!user && <StyledNavLink to="/signup">Signup</StyledNavLink>}
          {user && <LogoutBtn onClick={handleLogout}>Logout</LogoutBtn>}
        </NavLinks>
      </Container>
    </Nav>
  );
};

export default Navbar;

// TODO: Students - Enhance the Navbar with the following:
// 1. Add responsive design (e.g., hamburger menu for mobile)
// 2. Add styling for active links using react-router-dom's NavLink
// 3. Add accessibility attributes (e.g., aria-labels)
