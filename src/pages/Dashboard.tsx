import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import AdminDashboard from './dashboard/AdminDashboard';
import ManagerDashboard from './dashboard/ManagerDashboard';
import CustomerDashboard from './dashboard/CustomerDashboard';
import KitchenDashboard from './dashboard/KitchenDashboard';
import BranchManagerDashboard from './dashboard/BranchManagerDashboard';
import HQManagerDashboard from './dashboard/HQManagerDashboard';

const Dashboard: React.FC = () => {
  const { user } = useContext(AuthContext);
  if (!user) return null;
  if (user.role === 'admin') return <AdminDashboard />;
  if (user.role === 'manager') return <ManagerDashboard />;
  if (user.role === 'chef') return <KitchenDashboard />;
  if (user.role === 'branchManager') return <BranchManagerDashboard />;
  if (user.role === 'hqManager') return <HQManagerDashboard />;
  return <CustomerDashboard />;
};

export default Dashboard;
