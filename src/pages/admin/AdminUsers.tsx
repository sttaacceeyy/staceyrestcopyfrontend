import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import { RegisteredUsersContext } from '../../context/RegisteredUsersContext';
import { useStaff } from '../../context/StaffContext';

const AdminContainer = styled.div`
  max-width: 1100px;
  margin: 40px auto;
  background: #f8fbff;
  border-radius: 16px;
  box-shadow: 0 2px 16px rgba(0,102,204,0.10);
  padding: 32px 40px 40px 40px;
  min-height: 60vh;
  color: #003d82;

  @media (max-width: 700px) {
    padding: 16px 4px 24px 4px;
    margin: 12px 0;
    border-radius: 8px;
    min-width: 0;
  }
`;

const Title = styled.h1`
  color: #0066cc;
  font-size: 2.2rem;
  margin-bottom: 24px;
`;

const Desc = styled.p`
  font-size: 1.1rem;
  margin-bottom: 32px;
`;

const AccessTable = styled.table`
  width: 100%;
  background: #fff;
  border-radius: 8px;
  margin-top: 24px;
  overflow: hidden;
  color: #003d82;
  font-size: 1rem;

  @media (max-width: 700px) {
    font-size: 0.92rem;
    border-radius: 4px;
  }
`;

const Th = styled.th`
  background: #0066cc;
  color: #fff;
  padding: 10px;
  font-size: 1.1rem;
`;
const Td = styled.td`
  padding: 10px;
  text-align: center;
`;

const Input = styled.input`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  flex: 1;

  @media (max-width: 700px) {
    padding: 7px;
    font-size: 0.95rem;
  }
`;

const Button = styled.button`
  background: #0066cc;
  color: #fff;
  border: none;
  padding: 10px 20px;
  border-radius: 4px;
  cursor: pointer;

  @media (max-width: 700px) {
    padding: 7px 12px;
    font-size: 0.95rem;
  }
`;

const allRoles = ['customer', 'cashier', 'branchManager', 'hqManager', 'chef', 'admin'];

const rolePages = {
  customer: [
    'Menu',
    'Leave a Review',
    'Checkout',
    'About Us',
    'Contact',
  ],
  admin: [
    'User Management',
    'Branch Management',
    'About Us',
    'Contact',
    'Audit Logs',
    'Staff Info',
    'Inventory Config',
    'Reports',
    'Reservation Management',
    'Menu Management',
  ],
  branchManager: [
    'Branch Dashboard',
    'Inventory',
    'About Us',
    'Contact',
  ],
  hqManager: [
    'HQ Dashboard',
    'Inventory',
    'About Us',
    'Contact',
  ],
  cashier: [
    'Cashier Dashboard',
    'Menu',
    'Checkout',
    'About Us',
    'Contact',
  ],
  chef: [
    'Menu',
    'About Us',
    'Contact',
  ],
};

const rolesDisplay = {
  customer: 'Customer',
  admin: 'Admin',
  branchManager: 'Branch Manager',
  hqManager: 'HQ Manager',
  cashier: 'Cashier',
  chef: 'Chef',
};

const AdminPageAccess: React.FC = () => (
  <div style={{marginTop:32, marginBottom:32}}>
    <h2 style={{color:'#0066cc', fontSize:'1.3rem', marginBottom:16}}>Role Page Access Overview</h2>
    <AccessTable>
      <thead>
        <tr>
          <Th>Role</Th>
          <Th>Pages Accessible</Th>
        </tr>
      </thead>
      <tbody>
        {Object.entries(rolePages).map(([role, pages]) => (
          <tr key={role}>
            <Td>{rolesDisplay[role as keyof typeof rolesDisplay]}</Td>
            <Td>{(pages as string[]).join(', ')}</Td>
          </tr>
        ))}
      </tbody>
    </AccessTable>
  </div>
);

const AdminUsers: React.FC = () => {
  const { staff, updateRole, setStaff } = useStaff();
  const [newName, setNewName] = useState('');
  const [newRole, setNewRole] = useState('customer');
  const [newBranch, setNewBranch] = useState('');
  const { users: registeredCustomers } = useContext(RegisteredUsersContext);
  const [registeredUsers, setRegisteredUsers] = useState(registeredCustomers);

  // Remove customer from registered users
  const deleteCustomer = (username: string) => {
    const updated = registeredUsers.filter(u => u.username !== username);
    setRegisteredUsers(updated);
    localStorage.setItem('registeredUsers', JSON.stringify(updated));
  };

  // Remove staff/role account
  const deleteStaff = (id: string) => {
    setStaff(prev => prev.filter(u => u.id !== id));
  };

  const handleAddStaff = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim()) return;
    setStaff(prev => [
      ...prev,
      {
        id: Date.now().toString(),
        name: newName,
        role: newRole,
        contact: '',
        branch: newBranch || '',
        status: 'active',
        salary: 0,
        salaryHistory: [],
        attendance: 0,
        performance: 0,
      },
    ]);
    setNewName('');
    setNewRole('customer');
    setNewBranch('');
  };
  // const updateRole = (id: string, role: string) => {
  //   setUsers(users.map(u => u.id === id ? { ...u, role } : u));
  // };
  // const deleteUser = (id: string) => {
  //   setUsers(users.filter(u => u.id !== id));
  // };

  return (
    <AdminContainer>
      <Title>User & Role Management</Title>
      <Desc>Manage users, assign roles, and control access here.</Desc>
      {/* Registered Customers Section */}
      <div style={{marginBottom:32}}>
        <h2 style={{color:'#0066cc',fontSize:'1.2rem',marginBottom:8}}>Registered Customers</h2>
        {registeredUsers.length === 0 ? (
          <div style={{color:'#aaa'}}>No customers have signed up yet.</div>
        ) : (
          <ul style={{color:'#fff',fontSize:'1.05rem',margin:0,paddingLeft:20}}>
            {registeredUsers.map((u,i) => (
              <li key={i} style={{display:'flex',alignItems:'center',gap:12}}>
                {u.username}
                <Button type="button" style={{background:'#0066cc',color:'#fff',padding:'4px 12px',fontSize:'0.95em'}} onClick={()=>deleteCustomer(u.username)}>Delete</Button>
              </li>
            ))}
          </ul>
        )}
      </div>
      <AdminPageAccess />
      <form onSubmit={handleAddStaff} style={{display:'flex',gap:12,marginBottom:24,alignItems:'center',flexWrap:'wrap'}}>
        <Input
          type="text"
          placeholder="New user name"
          value={newName}
          onChange={e => setNewName(e.target.value)}
          style={{minWidth:180}}
        />
        <select value={newRole} onChange={e => setNewRole(e.target.value)} style={{padding:8,borderRadius:6}}>
          {allRoles.map(r => <option key={r} value={r}>{rolesDisplay[r as keyof typeof rolesDisplay]}</option>)}
        </select>
        <select value={newBranch} onChange={e => setNewBranch(e.target.value)} style={{padding:8,borderRadius:6}}>
          <option value="">No Branch</option>
          <option value="1">Branch 1</option>
          <option value="2">Branch 2</option>
          <option value="3">Branch 3</option>
        </select>
        <Button type="submit">Add User</Button>
      </form>
      <AccessTable>
        <thead>
          <tr>
            <Th>Name</Th>
            <Th>Role</Th>
            <Th>Branch</Th>
            <Th>Actions</Th>
          </tr>
        </thead>
        <tbody>
          {staff.map(u => (
            <tr key={u.id}>
              <Td>{u.name}</Td>
              <Td>
                <select value={u.role} onChange={e => updateRole(u.id, e.target.value)} style={{padding:6,borderRadius:6}}>
                  {allRoles.map(r => <option key={r} value={r}>{rolesDisplay[r as keyof typeof rolesDisplay]}</option>)}
                </select>
              </Td>
              <Td>
                <select 
                  value={u.branch} 
                  onChange={e => setStaff(prev => prev.map(s => s.id === u.id ? {...s, branch: e.target.value} : s))} 
                  style={{padding:6,borderRadius:6}}
                >
                  <option value="">No Branch</option>
                  <option value="1">Branch 1</option>
                  <option value="2">Branch 2</option>
                  <option value="3">Branch 3</option>
                </select>
              </Td>
              <Td>
                <Button type="button" style={{background:'#0066cc',color:'#fff',padding:'4px 12px',fontSize:'0.95em'}} onClick={()=>deleteStaff(u.id)}>Delete</Button>
              </Td>
            </tr>
          ))}
        </tbody>
      </AccessTable>
    </AdminContainer>
  );
};

export default AdminUsers;
