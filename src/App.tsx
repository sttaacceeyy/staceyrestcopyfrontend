import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import GlobalStyle from './components/common/GlobalStyle';
import Navbar from './components/common/Navbar';
import HeroBanner from './components/HeroBanner';
import About from './components/About';
import Menu from './pages/Menu';
import Footer from './components/Footer';
import ScrollToSection from './components/common/ScrollToSection';
import { LoginLogProvider } from './context/LoginLogContext';
import { AuthContext as AuthContextType } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { RegisteredUsersProvider } from './context/RegisteredUsersContext';
import { FeedbackProvider } from './context/FeedbackContext';
import { MenuProvider } from './context/MenuContext';
import { OrdersProvider } from './context/OrdersContext';
import { InventoryProvider } from './context/InventoryContext';
import { StaffProvider } from './context/StaffContext';
import './index.css';
import Login from './pages/Login';
import Signup from './pages/Signup';
import ReservationConfirmation from './pages/ReservationConfirmation';
import ContactConfirmation from './pages/ContactConfirmation';
import Checkout from './pages/Checkout';
import LeaveReview from './pages/LeaveReview';
// import AdminSettings from './pages/AdminSettings';
import Dashboard from './pages/Dashboard';
import Inventory from './pages/Inventory';
import Contact from './pages/Contact';
import Forbidden from './pages/Forbidden';
import AboutUs from './pages/AboutUs';
import styled from 'styled-components';
import AdminUsers from './pages/admin/AdminUsers';
import AdminSettingsPage from './pages/admin/AdminSettings';
import AdminBranches from './pages/admin/AdminBranches';
import AdminLogs from './pages/admin/AdminLogs';
import AdminInventoryConfig from './pages/admin/AdminInventoryConfig';
import Reports from './pages/Reports';
import AdminStaff from './pages/admin/AdminStaff';
import AdminMenuManagement from './pages/admin/AdminMenuManagement';
import ProtectedRoute from './components/common/ProtectedRoute';
import CardPayment from './pages/CardPayment';
import CashierDashboard from './pages/dashboard/CashierDashboard';
import ManagerOrders from './pages/dashboard/ManagerOrders';
import ManagerKitchen from './pages/dashboard/ManagerKitchen';
import ManagerStaff from './pages/dashboard/ManagerStaff';
import ManagerFeedback from './pages/dashboard/ManagerFeedback';
import ManagerReports from './pages/dashboard/ManagerReports';
import ManagerMenu from './pages/dashboard/ManagerMenu';
import ManagerInventory from './pages/dashboard/ManagerInventory';
import ReservationForm from './components/ReservationForm';
import Reservations from './pages/Reservations';
import KitchenDashboardBranch1 from './pages/KitchenDashboardBranch1';
import KitchenDashboardBranch2 from './pages/KitchenDashboardBranch2';
import KitchenDashboardBranch3 from './pages/KitchenDashboardBranch3';
import BranchInventoryManagement from './pages/dashboard/BranchInventoryManagement';
import BranchReports from './pages/dashboard/BranchReports';

const NotFound: React.FC = () => (
  <div style={{ minHeight: '60vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: '#0066cc', fontWeight: 700 }}>
    <h1 style={{ fontSize: '2.5rem', marginBottom: 16 }}>404 - Page Not Found</h1>
    <p style={{ fontSize: '1.2rem', color: '#444', marginBottom: 16 }}>Sorry, the page you are looking for does not exist or you do not have access.</p>
    <a href="/" style={{ color: '#0066cc', marginTop: 24, fontSize: '1.1rem', textDecoration: 'underline' }}>Go to Home</a>
  </div>
);

const HomeBg = styled.div`
  min-height: 100vh;
  width: 100vw;
  background: url('/steakhouse-bg.jpg') center center/cover no-repeat fixed;
  display: flex;
  flex-direction: column;
  align-items: stretch;
`;

const MapContainer = styled.div`
  width: 100vw;
  max-width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 32px;
  margin-bottom: 0;
`;

const Home: React.FC = () => (
  <HomeBg>
    <HeroBanner />
    <About />
    <Footer />
    <MapContainer>
      <iframe
        title="Steakz Location"
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3151.835434509374!2d144.9537353159047!3d-37.8162797420216!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad65d43f1f0b1b1%3A0x5045675218ce6e0!2sSteakhouse!5e0!3m2!1sen!2sus!4v1686789000000!5m2!1sen!2sus"
        width="800"
        height="450"
        style={{ border: 0, borderRadius: 16 }}
        allowFullScreen={true}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      ></iframe>
    </MapContainer>
  </HomeBg>
);

const App: React.FC = () => {
  return (
    <>
      <GlobalStyle />
      <LoginLogProvider>
        <RegisteredUsersProvider>
          <CartProvider>
            <FeedbackProvider>
              <MenuProvider>
                <OrdersProvider>
                  <InventoryProvider>
                    <StaffProvider>
                      <Router>
                        <ScrollToSection />
                        <Navbar />
                        <AuthContextType.Consumer>
                          {({ user, loading }) => (
                            loading ? (
                              <div>Loading...</div>
                            ) : (
                              <Routes key={user?.role}>
                                {user?.role === 'manager' ? (
                                  <Route path="/" element={<Navigate to="/dashboard/manager/reports" replace />} />
                                  ) : user?.role === 'hqManager' ? (
                                  <Route path="/" element={<Navigate to="/dashboard/hq/reports" replace />} />
                                  ) : user?.role === 'admin' ? (
                                  <Route path="/" element={<Navigate to="/admin/users" replace />} />
                                  ) : user?.role === 'chef' ? (
                                  <Route path="/" element={
                                    user?.branchId === '1' ? <Navigate to="/dashboard/chef/branch1" replace />
                                    : user?.branchId === '2' ? <Navigate to="/dashboard/chef/branch2" replace />
                                    : user?.branchId === '3' ? <Navigate to="/dashboard/chef/branch3" replace />
                                    : <Forbidden />
                                  } />
                                  ) : user?.role === 'branchManager' ? (
                                  <Route path="/" element={<Navigate to="/dashboard/branch/reports" replace />} />
                                  ) : user?.role === 'cashier' ? (
                                  <Route path="/" element={<Navigate to="/dashboard/cashier/orders" replace />} />
                                  ) : (
                                  <Route path="/" element={<Home />} />
                                )}
                                <Route path="/menu" element={<Menu />} />
                                <Route path="/reservations" element={
                                  user && user.role === 'admin'
                                    ? <Reservations />
                                    : <ReservationForm />
                                } />
                                <Route path="/checkout" element={<Checkout />} />
                                <Route path="/leave-review" element={
                                  user && user.role === 'customer' ? <LeaveReview /> : <Forbidden />
                                } />
                                <Route path="/card-payment" element={
                                  <ProtectedRoute allowedRoles={['customer','admin']} userRole={user?.role}>
                                    <CardPayment />
                                  </ProtectedRoute>
                                } />
                                {/* MANAGER: Only manager dashboard */}
                                <Route path="/dashboard/branch" element={['branchManager','admin'].includes(user?.role || '') ? <Dashboard /> : <Forbidden />} />
                                <Route path="/inventory" element={['branchManager','hqManager','admin'].includes(user?.role || '') ? <Inventory /> : <Forbidden />} />
                                <Route path="/dashboard/hq" element={['hqManager','admin'].includes(user?.role || '') ? <Dashboard /> : <Forbidden />} />
                                {/* CASHIER: Always allow access to all POS features */}
                                <Route path="/dashboard/cashier" element={
                                  user?.role === 'cashier' ? <CashierDashboard /> : <Forbidden />
                                } />
                                <Route path="/dashboard/cashier/orders" element={
                                  user?.role === 'cashier' ? <CashierDashboard tab="orders" /> : <Forbidden />
                                } />
                                <Route path="/dashboard/cashier/payment" element={
                                  user?.role === 'cashier' ? <CashierDashboard tab="payment" /> : <Forbidden />
                                } />
                                <Route path="/dashboard/cashier/kitchen" element={
                                  user?.role === 'cashier' ? <CashierDashboard tab="kitchen" /> : <Forbidden />
                                } />
                                {/* BRANCH_MANAGER: Direct links for each page, no portal */}
                                <Route path="/dashboard/branch/reports" element={user?.role === 'branchManager' ? <BranchReports /> : <Forbidden />} />
                                <Route path="/dashboard/branch/inventory" element={user?.role === 'branchManager' ? <BranchInventoryManagement /> : <Forbidden />} />
                                <Route path="/dashboard/branch/inventory" element={user?.role === 'branchManager' ? <Inventory /> : <Forbidden />} />
                                <Route path="/dashboard/branch/orders" element={user?.role === 'branchManager' ? <ManagerOrders /> : <Forbidden />} />
                                <Route path="/dashboard/branch/kitchen" element={user?.role === 'branchManager' ? <ManagerKitchen /> : <Forbidden />} />
                                <Route path="/dashboard/branch/staff" element={user?.role === 'branchManager' ? <ManagerStaff /> : <Forbidden />} />
                                <Route path="/dashboard/branch/feedback" element={user?.role === 'branchManager' ? <ManagerFeedback /> : <Forbidden />} />
                                {/* MANAGER: Direct links for each page, no portal */}
                                <Route path="/dashboard/manager" element={<Navigate to="/dashboard/manager/reports" replace />} />
                                <Route path="/dashboard/manager/reports" element={user?.role === 'manager' ? <ManagerReports /> : <Forbidden />} />
                                <Route path="/dashboard/manager/menu" element={user?.role === 'manager' ? <ManagerMenu /> : <Forbidden />} />
                                <Route path="/dashboard/manager/orders" element={user?.role === 'manager' ? <ManagerOrders /> : <Forbidden />} />
                                <Route path="/dashboard/manager/kitchen" element={user?.role === 'manager' ? <ManagerKitchen /> : <Forbidden />} />
                                <Route path="/dashboard/manager/inventory" element={user?.role === 'manager' ? <ManagerInventory /> : <Forbidden />} />
                                <Route path="/dashboard/manager/staff" element={user?.role === 'manager' ? <ManagerStaff /> : <Forbidden />} />
                                <Route path="/dashboard/manager/feedback" element={user?.role === 'manager' ? <ManagerFeedback /> : <Forbidden />} />
                                {/* HQ_MANAGER: Direct links for each page, no portal */}
                                <Route path="/dashboard/hq/reports" element={user?.role === 'hqManager' ? <ManagerReports allBranches /> : <Forbidden />} />
                                <Route path="/dashboard/hq/menu" element={user?.role === 'hqManager' ? <ManagerMenu allBranches /> : <Forbidden />} />
                                <Route path="/dashboard/hq/orders" element={user?.role === 'hqManager' ? <ManagerOrders allBranches /> : <Forbidden />} />
                                <Route path="/dashboard/hq/kitchen" element={user?.role === 'hqManager' ? <ManagerKitchen allBranches /> : <Forbidden />} />
                                <Route path="/dashboard/hq/inventory" element={user?.role === 'hqManager' ? <ManagerInventory allBranches /> : <Forbidden />} />
                                <Route path="/dashboard/hq/staff" element={user?.role === 'hqManager' ? <ManagerStaff allBranches /> : <Forbidden />} />
                                <Route path="/dashboard/hq/feedback" element={user?.role === 'hqManager' ? <ManagerFeedback allBranches /> : <Forbidden />} />
                                {/* Public pages for all users */}
                                <Route path="/about" element={<AboutUs />} />
                                <Route path="/contact" element={<Contact />} />
                                <Route path="/login" element={<Login />} />
                                <Route path="/signup" element={<Signup />} />
                                <Route path="/reservation-confirmation" element={<ReservationConfirmation />} />
                                <Route path="/contact-confirmation" element={<ContactConfirmation />} />
                                <Route path="/403" element={<Forbidden />} />
                                {/* ADMIN: Management/configuration/reporting pages */}
                                <Route path="/admin/users" element={user && user.role === 'admin' ? <AdminUsers /> : <Forbidden />} />
                                <Route path="/admin/settings" element={user && user.role === 'admin' ? <AdminSettingsPage /> : <Forbidden />} />
                                <Route path="/admin/branches" element={user && user.role === 'admin' ? <AdminBranches /> : <Forbidden />} />
                                <Route path="/admin/logs" element={user && user.role === 'admin' ? <AdminLogs /> : <Forbidden />} />
                                <Route path="/admin/inventory-config" element={user && user.role === 'admin' ? <AdminInventoryConfig /> : <Forbidden />} />
                                <Route path="/reports" element={user && user.role === 'admin' ? <Reports /> : <Forbidden />} />
                                <Route path="/admin/staff" element={user && user.role === 'admin' ? <AdminStaff /> : <Forbidden />} />
                                <Route path="/admin/menu-management" element={user && user.role === 'admin' ? <AdminMenuManagement /> : <Forbidden />} />
                                {/* CHEF: Branch-specific kitchen dashboards */}
                                <Route path="/dashboard/chef/branch1" element={
                                  user?.role === 'chef' && user?.branchId === '1' 
                                    ? <KitchenDashboardBranch1 />
                                    : <Forbidden />
                                } />
                                <Route path="/dashboard/chef/branch2" element={
                                  user?.role === 'chef' && user?.branchId === '2' 
                                    ? <KitchenDashboardBranch2 />
                                    : <Forbidden />
                                } />
                                <Route path="/dashboard/chef/branch3" element={
                                  user?.role === 'chef' && user?.branchId === '3' 
                                    ? <KitchenDashboardBranch3 />
                                    : <Forbidden />
                                } />
                                <Route path="*" element={<NotFound />} />
                              </Routes>
                            )
                          )}
                        </AuthContextType.Consumer>
                      </Router>
                    </StaffProvider>
                  </InventoryProvider>
                </OrdersProvider>
              </MenuProvider>
            </FeedbackProvider>
          </CartProvider>
        </RegisteredUsersProvider>
      </LoginLogProvider>
    </>
  );
};

export default App;

// TODO: Students - Complete the routing setup by:
// 1. Implementing the MyPosts page (/my-posts) to show the logged-in user's posts
// 2. Adding protected route logic to restrict access to certain routes based on user role
// 3. Adding a 404 page for invalid routes
