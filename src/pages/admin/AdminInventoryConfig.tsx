import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import { InventoryContext } from '../../context/InventoryContext';

const Container = styled.div`
  max-width: 1200px;
  margin: 40px auto;
  background: #f8fbff;
  border-radius: 16px;
  box-shadow: 0 2px 16px rgba(0,0,0,0.10);
  padding: 32px 40px 40px 40px;
  color: #003d82;
`;
const Section = styled.section`
  margin-bottom: 40px;
`;
const Table = styled.table`
  width: 100%;
  background: #fff;
  border-radius: 8px;
  margin-bottom: 18px;
  color: #003d82;
`;
const Th = styled.th`
  background: #0066cc;
  color: #fff;
  padding: 10px;
`;
const Td = styled.td`
  padding: 10px;
  text-align: center;
`;
const Button = styled.button`
  background: #4da6ff;
  color: #fff;
  border: none;
  border-radius: 6px;
  padding: 8px 18px;
  font-weight: 600;
  cursor: pointer;
  margin-right: 8px;
  margin-bottom: 8px;
  &:hover { background: #0066cc; color: #fff; }
`;
const Input = styled.input`
  padding: 8px;
  border-radius: 6px;
  border: 1px solid #b3d9ff;
  background: #fff;
  color: #003d82;
`;

const mockCategoriesInit = ['Meat', 'Dairy', 'Packaging', 'Vegetables', 'Beverages'];
const mockRoles = [
  { role: 'admin', canEdit: false, canView: true },
  { role: 'hqManager', canEdit: true, canView: true },
  { role: 'chef', canEdit: true, canView: true },
  { role: 'manager', canEdit: true, canView: true },
  { role: 'customer', canEdit: false, canView: false },
];

const AdminInventoryConfig: React.FC = () => {
  const { inventory } = useContext(InventoryContext);
  const [categories, setCategories] = useState(mockCategoriesInit);
  const [newCat, setNewCat] = useState('');
  const [autoStock, setAutoStock] = useState(true);
  const [lowStock, setLowStock] = useState(10);
  const [criticalAlert, setCriticalAlert] = useState(5);
  const [roles, setRoles] = useState(mockRoles);

  // Add/delete categories
  const addCategory = (e: React.FormEvent) => {
    e.preventDefault();
    if (!categories.includes(newCat)) setCategories([...categories, newCat]);
    setNewCat('');
  };
  const deleteCategory = (cat: string) => {
    setCategories(categories.filter(c => c !== cat));
  };
  // Update role permissions
  const toggleRole = (role: string, field: 'canEdit' | 'canView') => {
    setRoles(roles.map(r => r.role === role ? { ...r, [field]: !r[field] } : r));
  };

  return (
    <Container>
      <h1 style={{color:'#0066cc',marginBottom:24}}>Inventory System Configuration</h1>
      {/* 1. View Ingredients (read-only) */}
      <Section>
        <h2 style={{color:'#0066cc',fontSize:'1.1rem'}}>Registered Ingredients</h2>
        <Table>
          <thead><tr><Th>Name</Th><Th>Used</Th><Th>Expected</Th><Th>Unit</Th><Th>Low Stock?</Th></tr></thead>
          <tbody>
            {inventory.map((m,i)=>(
              <tr key={i}>
                <Td>{m.name}</Td><Td>{m.used}</Td><Td>{m.expected}</Td><Td>{m.unit}</Td><Td>{m.low ? 'Yes' : 'No'}</Td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Section>
      {/* 2. Global Inventory System Rules */}
      <Section>
        <h2 style={{color:'#0066cc',fontSize:'1.1rem'}}>Global Inventory System Rules</h2>
        <label><input type="checkbox" checked={autoStock} onChange={e=>setAutoStock(e.target.checked)} /> Enable automatic stock management</label>
      </Section>
      {/* 3. Manage Ingredient Categories */}
      <Section>
        <h2 style={{color:'#0066cc',fontSize:'1.1rem'}}>Ingredient Categories</h2>
        <form onSubmit={addCategory} style={{display:'flex',gap:12,marginBottom:16,alignItems:'center'}}>
          <Input placeholder="New Category" value={newCat} onChange={e=>setNewCat(e.target.value)} required style={{minWidth:120}} />
          <Button type="submit">Add</Button>
        </form>
        <Table>
          <thead><tr><Th>Category</Th><Th>Actions</Th></tr></thead>
          <tbody>
            {categories.map(c=>(
              <tr key={c}>
                <Td>{c}</Td>
                <Td><Button type="button" onClick={()=>deleteCategory(c)} style={{background:'#0066cc',color:'#fff'}}>Delete</Button></Td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Section>
      {/* 4. Manage Roles & Permissions */}
      <Section>
        <h2 style={{color:'#0066cc',fontSize:'1.1rem'}}>Roles & Permissions (Inventory)</h2>
        <Table>
          <thead><tr><Th>Role</Th><Th>Can View</Th><Th>Can Edit</Th></tr></thead>
          <tbody>
            {roles.map(r=>(
              <tr key={r.role}>
                <Td>{r.role}</Td>
                <Td><input type="checkbox" checked={r.canView} disabled={r.role==='admin'} onChange={()=>toggleRole(r.role,'canView')} /></Td>
                <Td><input type="checkbox" checked={r.canEdit} disabled={r.role==='admin'} onChange={()=>toggleRole(r.role,'canEdit')} /></Td>
              </tr>
            ))}
          </tbody>
        </Table>
        <div style={{fontSize:'0.95em',color:'#aaa',marginTop:8}}>
          <b>Note:</b> Only branch managers and chefs can edit ingredients. Admin can only view.
        </div>
      </Section>
      {/* 5. Global Stock Alert Settings */}
      <Section>
        <h2 style={{color:'#0066cc',fontSize:'1.1rem'}}>Global Stock Alert Settings</h2>
        <label>Low-stock warning level: <Input type="number" min={1} value={lowStock} onChange={e=>setLowStock(Number(e.target.value))} style={{width:80}} /></label><br/>
        <label>Critical alert below: <Input type="number" min={1} value={criticalAlert} onChange={e=>setCriticalAlert(Number(e.target.value))} style={{width:80}} />%</label>
      </Section>
    </Container>
  );
};

export default AdminInventoryConfig;
