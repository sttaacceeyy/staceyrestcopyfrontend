import React, { useState, useContext } from 'react';
import Section from '../components/common/Section';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { AuthContext } from '../context/AuthContext';

const ContactGrid = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 32px;
  max-width: 700px;
  margin: 0 auto;
`;
const Form = styled(motion.form)`
  background: #f8fbff;
  border-radius: 16px;
  box-shadow: 0 2px 12px rgba(0,102,204,0.10);
  padding: 32px 24px;
  max-width: 400px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 18px;
`;
const Input = styled.input`
  padding: 12px;
  border-radius: 8px;
  border: 1px solid #b3d9ff;
  background: #fff;
  color: #003d82;
  font-size: 1rem;
`;
const TextArea = styled.textarea`
  padding: 12px;
  border-radius: 8px;
  border: 1px solid #b3d9ff;
  background: #fff;
  color: #003d82;
  font-size: 1rem;
  min-height: 80px;
`;
const Button = styled(motion.button)`
  background: #0066cc;
  color: #fff;
  border: none;
  border-radius: 8px;
  padding: 12px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  margin-top: 8px;
  transition: background 0.2s;
  &:hover, &:focus {
    background: #4da6ff;
    color: #fff;
    outline: none;
  }
`;
const SuccessMsg = styled.div`
  color: #2e7d32;
  font-size: 1.2rem;
  text-align: center;
  margin-top: 32px;
`;
const InfoBox = styled.div`
  background: #f8fbff;
  border-radius: 12px;
  color: #003d82;
  padding: 24px 32px;
  margin-bottom: 24px;
  box-shadow: 0 2px 12px rgba(0,102,204,0.08);
  font-size: 1.1rem;
  text-align: center;
`;

const mockMessages = [
  { id: 'm1', name: 'John Doe', email: 'john@example.com', message: 'What are your opening hours?', date: '2025-06-12', status: 'new', category: 'General', response: '', forwardedTo: '' },
  { id: 'm2', name: 'Jane Smith', email: 'jane@example.com', message: 'Can I book a table for 10?', date: '2025-06-13', status: 'pending', category: 'Reservation', response: '', forwardedTo: '' },
  { id: 'm3', name: 'Mike Brown', email: 'mike@example.com', message: 'Do you have vegan options?', date: '2025-06-13', status: 'responded', category: 'Menu', response: 'Yes, we do!', forwardedTo: '' },
];
const mockCategories = ['General', 'Reservation', 'Menu', 'Complaint', 'Other'];
const mockStats = {
  total: 3,
  byType: { General: 1, Reservation: 1, Menu: 1 },
  avgResponseTime: '2h 15m',
};
const mockBranches = [
  { id: 'b1', name: 'Downtown', phone: '+1 (234) 567-890', email: 'downtown@steakz.com' },
  { id: 'b2', name: 'Uptown', phone: '+1 (234) 567-891', email: 'uptown@steakz.com' },
];

const Contact: React.FC = () => {
  const { user } = useContext(AuthContext);
  const [sent, setSent] = useState(false);
  const [messages, setMessages] = useState(mockMessages);
  const [categories, setCategories] = useState(mockCategories);
  const [branches, setBranches] = useState(mockBranches);
  const [editingBranch, setEditingBranch] = useState<string|null>(null);
  const [branchEdit, setBranchEdit] = useState({ name: '', phone: '', email: '' });
  const [selectedMsg, setSelectedMsg] = useState<string|null>(null);
  const [response, setResponse] = useState('');
  const [forwardTo, setForwardTo] = useState('');
  const [newCategory, setNewCategory] = useState('');
  const [responseSent, setResponseSent] = useState(false);
  const [forwardSent, setForwardSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  // Admin panel logic
  const handleRespond = (id: string) => {
    setMessages(msgs => msgs.map(m => m.id === id ? { ...m, response, status: 'responded' } : m));
    setResponse('');
    setSelectedMsg(null);
    setResponseSent(true);
    setTimeout(() => setResponseSent(false), 2000);
  };
  const handleForward = (id: string) => {
    setMessages(msgs => msgs.map(m => m.id === id ? { ...m, forwardedTo: forwardTo, status: 'pending' } : m));
    setForwardTo('');
    setSelectedMsg(null);
    setForwardSent(true);
    setTimeout(() => setForwardSent(false), 2000);
  };
  const handleCategorize = (id: string, cat: string) => {
    setMessages(msgs => msgs.map(m => m.id === id ? { ...m, category: cat } : m));
  };
  const handleAddCategory = (e: React.FormEvent) => {
    e.preventDefault();
    if (newCategory && !categories.includes(newCategory)) setCategories([...categories, newCategory]);
    setNewCategory('');
  };
  const handleEditBranch = (id: string) => {
    const b = branches.find(b => b.id === id);
    if (b) {
      setEditingBranch(id);
      setBranchEdit({ name: b.name, phone: b.phone, email: b.email });
    }
  };
  const handleSaveBranch = (id: string) => {
    setBranches(bs => bs.map(b => b.id === id ? { ...b, ...branchEdit } : b));
    setEditingBranch(null);
  };
  const handleDeleteCategory = (cat: string) => {
    setCategories(categories.filter(c => c !== cat));
    setMessages(msgs => msgs.map(m => m.category === cat ? { ...m, category: categories[0] || '' } : m));
  };

  if (user?.role === 'admin') {
    return (
      <Section id="contact-admin" aria-label="Contact Admin Panel">
        <h2 style={{ color: '#fff', fontFamily: 'Playfair Display', fontSize: '2.2rem', marginBottom: 32 }}>Contact Management</h2>
        {/* Stats */}
        <InfoBox>
          <div><b>Total Inquiries:</b> {mockStats.total}</div>
          <div><b>By Type:</b> {Object.entries(mockStats.byType).map(([k,v])=>(<span key={k}>{k}: {v} </span>))}</div>
          <div><b>Avg. Response Time:</b> {mockStats.avgResponseTime}</div>
        </InfoBox>
        {/* Messages Table */}
        <div style={{marginBottom:32}}>
          <h3 style={{color:'#0066cc',marginBottom:8}}>Customer Inquiries</h3>
          <table style={{width:'100%',background:'#f8fbff',color:'#003d82',borderRadius:8}}>
            <tbody>
              {messages.map(m=>(
                <tr key={m.id} style={{background:selectedMsg===m.id?'#333':'inherit'}}>
                  <td>{m.name}</td><td>{m.email}</td><td>{m.message}</td><td>{m.date}</td><td>{m.status}</td>
                  <td>
                    <select value={m.category} onChange={e=>handleCategorize(m.id, e.target.value)}>
                      {categories.map(c=>(<option key={c}>{c}</option>))}
                    </select>
                  </td>
                  <td>
                    <button style={{marginRight:8}} onClick={()=>setSelectedMsg(m.id)}>Respond/Forward</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {/* Respond/Forward UI */}
          {selectedMsg && (
            <div style={{background:'#f8fbff',padding:16,borderRadius:8,marginTop:12}}>
              <h4 style={{color:'#0066cc'}}>Respond or Forward</h4>
              <textarea value={response} onChange={e=>setResponse(e.target.value)} placeholder="Type your response..." style={{width:'100%',minHeight:60,marginBottom:8}} />
              <button onClick={()=>handleRespond(selectedMsg)} style={{marginRight:8}}>Send Response</button>
              <input value={forwardTo} onChange={e=>setForwardTo(e.target.value)} placeholder="Forward to (staff email)" style={{marginRight:8}} />
              <button onClick={()=>handleForward(selectedMsg)}>Forward</button>
              <button onClick={()=>setSelectedMsg(null)} style={{marginLeft:8}}>Cancel</button>
            </div>
          )}
          {responseSent && (
            <div style={{color:'#2e7d32',marginTop:12,fontWeight:600}}>Response sent!</div>
          )}
          {forwardSent && (
            <div style={{color:'#2e7d32',marginTop:12,fontWeight:600}}>Message forwarded!</div>
          )}
        </div>
        {/* Category Management */}
        <div style={{marginBottom:32}}>
          <h3 style={{color:'#0066cc',marginBottom:8}}>Manage Categories</h3>
          <form onSubmit={handleAddCategory} style={{display:'flex',gap:12,alignItems:'center',marginBottom:8}}>
            <input value={newCategory} onChange={e=>setNewCategory(e.target.value)} placeholder="New Category" required style={{padding:8,borderRadius:6}} />
            <button type="submit">Add</button>
          </form>
          <div style={{display:'flex',flexWrap:'wrap',gap:8}}>
            {categories.map(cat => (
              <span key={cat} style={{background:'#f8fbff',padding:'6px 12px',borderRadius:6,display:'flex',alignItems:'center'}}>
                {cat}
                <button onClick={()=>handleDeleteCategory(cat)} style={{marginLeft:6,background:'none',color:'#0066cc',border:'none',cursor:'pointer',fontWeight:'bold'}}>×</button>
              </span>
            ))}
          </div>
        </div>
        {/* Branch Contact Info Management */}
        <div style={{marginBottom:32}}>
          <h3 style={{color:'#0066cc',marginBottom:8}}>Branch & Support Contacts</h3>
          <table style={{width:'100%',background:'#f8fbff',color:'#003d82',borderRadius:8}}>
            <thead><tr style={{background:'#0066cc'}}><th>Branch</th><th>Phone</th><th>Email</th><th>Actions</th></tr></thead>
            <tbody>
              {branches.map(b=>(
                <tr key={b.id}>
                  <td>{editingBranch===b.id ? <input value={branchEdit.name} onChange={e=>setBranchEdit(f=>({...f,name:e.target.value}))} /> : b.name}</td>
                  <td>{editingBranch===b.id ? <input value={branchEdit.phone} onChange={e=>setBranchEdit(f=>({...f,phone:e.target.value}))} /> : b.phone}</td>
                  <td>{editingBranch===b.id ? <input value={branchEdit.email} onChange={e=>setBranchEdit(f=>({...f,email:e.target.value}))} /> : b.email}</td>
                  <td>
                    {editingBranch===b.id ? (
                      <>
                        <button onClick={()=>handleSaveBranch(b.id)} style={{marginRight:8}}>Save</button>
                        <button onClick={()=>setEditingBranch(null)}>Cancel</button>
                      </>
                    ) : (
                      <button onClick={()=>handleEditBranch(b.id)}>Edit</button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>
    );
  }

  return (
    <Section id="contact" aria-label="Contact">
      <h2 style={{ color: '#fff', fontFamily: 'Playfair Display', fontSize: '2.2rem', marginBottom: 32 }}>Contact</h2>
      <ContactGrid>
        <InfoBox>
          <div><b>Phone:</b> <a href="tel:+1234567890" style={{color:'#0066cc'}}>+1 (234) 567-890</a></div>
          <div><b>Email:</b> <a href="mailto:info@steakz.com" style={{color:'#0066cc'}}>info@steakz.com</a></div>
          <div><b>Instagram:</b> <a href="https://instagram.com/steakzrestaurant" target="_blank" rel="noopener noreferrer" style={{color:'#0066cc'}}>@steakzrestaurant</a></div>
        </InfoBox>
        {sent ? (
          <SuccessMsg>Your message has been sent! Thank you for contacting us.</SuccessMsg>
        ) : (
          <Form
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            aria-label="Contact Form"
            onSubmit={handleSubmit}
          >
            <Input type="text" placeholder="Name" required aria-label="Name" />
            <Input type="email" placeholder="Email" required aria-label="Email" />
            <TextArea placeholder="Message" required aria-label="Message" />
            <Button type="submit" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>Send Message</Button>
          </Form>
        )}
      </ContactGrid>
    </Section>
  );
};

export default Contact;
