import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import { MenuContext } from '../../context/MenuContext';

const categories = ['Main', 'Sides', 'Drinks', 'Desserts'];

const Container = styled.div`
  max-width: 1100px;
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

const AdminMenuManagement: React.FC = () => {
  const { menu, addMenuItem, editMenuItem, deleteMenuItem } = useContext(MenuContext);
  const [editing, setEditing] = useState<number|null>(null);
  const [editItem, setEditItem] = useState<any>(null);
  const [newItem, setNewItem] = useState({ name: '', desc: '', price: '', img: '', category: categories[0] });

  const handleEdit = (id: number) => {
    const item = menu.find(m => m.id === id);
    if (item) {
      setEditing(id);
      setEditItem({ ...item });
    }
  };
  const handleSave = (id: number) => {
    editMenuItem(id, { ...editItem, price: Number(editItem.price) });
    setEditing(null);
    setEditItem(null);
  };
  const handleDelete = (id: number) => {
    deleteMenuItem(id);
  };
  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    addMenuItem({ ...newItem, price: Number(newItem.price), available: true });
    setNewItem({ name: '', desc: '', price: '', img: '', category: categories[0] });
  };

  return (
    <Container>
      <h1 style={{color:'#0066cc',marginBottom:24}}>Menu Management</h1>
      <Section>
        <h2 style={{color:'#0066cc',fontSize:'1.1rem'}}>Current Menu</h2>
        <Table>
          <thead><tr><Th>Name</Th><Th>Description</Th><Th>Price</Th><Th>Category</Th><Th>Image</Th><Th>Actions</Th></tr></thead>
          <tbody>
            {menu.map(item => (
              <tr key={item.id}>
                <Td>{editing===item.id ? <Input value={editItem.name} onChange={e=>setEditItem((f:any)=>({...f,name:e.target.value}))} /> : item.name}</Td>
                <Td>{editing===item.id ? <Input value={editItem.desc} onChange={e=>setEditItem((f:any)=>({...f,desc:e.target.value}))} /> : item.desc}</Td>
                <Td>{editing===item.id ? <Input type="number" value={editItem.price} onChange={e=>setEditItem((f:any)=>({...f,price:e.target.value}))} /> : `$${item.price}`}</Td>
                <Td>{editing===item.id ? <select value={editItem.category} onChange={e=>setEditItem((f:any)=>({...f,category:e.target.value}))}>{categories.map(c=>(<option key={c}>{c}</option>))}</select> : item.category}</Td>
                <Td>{editing===item.id ? <Input value={editItem.img} onChange={e=>setEditItem((f:any)=>({...f,img:e.target.value}))} /> : <img src={item.img} alt={item.name} style={{width:60,borderRadius:8}} />}</Td>
                <Td>
                  {editing===item.id ? (
                    <>
                      <Button onClick={()=>handleSave(item.id)} style={{marginRight:8}}>Save</Button>
                      <Button onClick={()=>{setEditing(null);setEditItem(null);}} style={{background:'#444',color:'#fff'}}>Cancel</Button>
                    </>
                  ) : (
                    <>
                      <Button onClick={()=>handleEdit(item.id)} style={{marginRight:8}}>Edit</Button>
                      <Button onClick={()=>handleDelete(item.id)} style={{background:'#0066cc',color:'#fff'}}>Delete</Button>
                    </>
                  )}
                </Td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Section>
      <Section>
        <h2 style={{color:'#0066cc',fontSize:'1.1rem'}}>Add New Menu Item</h2>
        <form onSubmit={handleAdd} style={{display:'flex',gap:12,alignItems:'center',marginBottom:16}}>
          <Input placeholder="Name" value={newItem.name} onChange={e=>setNewItem(f=>({...f,name:e.target.value}))} required style={{minWidth:120}} />
          <Input placeholder="Description" value={newItem.desc} onChange={e=>setNewItem(f=>({...f,desc:e.target.value}))} required style={{minWidth:180}} />
          <Input type="number" placeholder="Price" value={newItem.price} onChange={e=>setNewItem(f=>({...f,price:e.target.value}))} required style={{minWidth:80}} />
          <select value={newItem.category} onChange={e=>setNewItem(f=>({...f,category:e.target.value}))} style={{padding:8,borderRadius:6}}>
            {categories.map(c=>(<option key={c}>{c}</option>))}
          </select>
          <Input placeholder="Image URL" value={newItem.img} onChange={e=>setNewItem(f=>({...f,img:e.target.value}))} style={{minWidth:120}} />
          <Button type="submit">Add</Button>
        </form>
      </Section>
    </Container>
  );
};

export default AdminMenuManagement;
