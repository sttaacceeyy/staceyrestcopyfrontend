import React, { useState } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  max-width: 1200px;
  margin: 40px auto;
  background: #f8fbff;
  border-radius: 16px;
  box-shadow: 0 2px 16px rgba(0,102,204,0.10);
  padding: 32px 40px 40px 40px;
  color: #003d82;
  @media (max-width: 700px) {
    padding: 16px 4px 24px 4px;
    margin: 12px 0;
    border-radius: 8px;
  }
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
`;
const Td = styled.td`
  padding: 10px;
  text-align: center;
`;
const Button = styled.button`
  background: #0066cc;
  color: #003d82;
  border: none;
  border-radius: 6px;
  padding: 8px 18px;
  font-weight: 600;
  cursor: pointer;
  margin-right: 8px;
  margin-bottom: 8px;
  &:hover { background: #0052a3; color: #fff; }
  @media (max-width: 700px) {
    padding: 6px 10px;
    font-size: 0.95rem;
  }
`;
const Input = styled.input`
  padding: 8px;
  border-radius: 6px;
  border: 1px solid #b3d9ff;
  background: #fff;
  color: #003d82;
  @media (max-width: 700px) {
    padding: 6px;
    font-size: 0.95rem;
  }
`;
const Select = styled.select`
  padding: 8px;
  border-radius: 6px;
  border: 1px solid #b3d9ff;
  background: #fff;
  color: #003d82;
  @media (max-width: 700px) {
    padding: 6px;
    font-size: 0.95rem;
  }
`;

const mockBranches = ['London', 'Manchester', 'Birmingham'];
const mockTables = ['T1', 'T2', 'T3', 'T4', 'T5'];
const mockReservationsInit = [
  { id: 'r1', name: 'Alice', contact: 'alice@email.com', date: '2025-06-13', time: '19:00', branch: 'London', party: 2, table: 'T1', status: 'Confirmed', notes: '' },
  { id: 'r2', name: 'Bob', contact: '555-1234', date: '2025-06-13', time: '20:00', branch: 'Manchester', party: 4, table: 'T2', status: 'Pending', notes: 'Birthday' },
];

type Reservation = {
  id: string;
  name: string;
  contact: string;
  date: string;
  time: string;
  branch: string;
  party: number;
  table: string;
  status: string;
  notes: string;
};

const Reservations: React.FC = () => {
  const [reservations, setReservations] = useState<Reservation[]>(() => {
    const stored = localStorage.getItem('reservations');
    return stored ? JSON.parse(stored) : mockReservationsInit;
  });
  const [search, setSearch] = useState('');
  const [filterBranch, setFilterBranch] = useState('All');
  const [filterStatus, setFilterStatus] = useState('All');
  const [filterDate, setFilterDate] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ name: '', contact: '', date: '', time: '', branch: mockBranches[0], party: 2, table: '', status: 'Pending', notes: '' });
  const [editId, setEditId] = useState<string|null>(null);

  // Stats (mocked)
  const stats = {
    today: 5, week: 30, month: 120, noShows: 2, completed: 25, avgParty: 3, busiest: '19:00',
  };

  const filtered = reservations.filter((r: Reservation) =>
    (filterBranch === 'All' || r.branch === filterBranch) &&
    (filterStatus === 'All' || r.status === filterStatus) &&
    (!filterDate || r.date === filterDate) &&
    (r.name.toLowerCase().includes(search.toLowerCase()) || r.contact.toLowerCase().includes(search.toLowerCase()))
  );

  const handleForm = (e: React.FormEvent) => {
    e.preventDefault();
    if (editId) {
      setReservations(reservations.map((r: Reservation) => r.id === editId ? { ...form, id: editId } : r));
    } else {
      setReservations([...reservations, { ...form, id: 'r'+(reservations.length+1) }]);
    }
    setShowForm(false); setEditId(null); setForm({ name: '', contact: '', date: '', time: '', branch: mockBranches[0], party: 2, table: '', status: 'Pending', notes: '' });
  };
  const handleEdit = (r: Reservation) => {
    setEditId(r.id); setForm(r); setShowForm(true);
  };
  const handleCancel = (id: string) => {
    setReservations(reservations.map((r: Reservation) => r.id === id ? { ...r, status: 'Canceled' } : r));
  };
  const handleDelete = (id: string) => {
    setReservations(reservations.filter((r: Reservation) => r.id !== id));
  };

  // Save reservations to localStorage whenever they change
  React.useEffect(() => {
    localStorage.setItem('reservations', JSON.stringify(reservations));
  }, [reservations]);

  return (
    <Container>
      <h1 style={{color:'#0066cc',marginBottom:24}}>Reservations</h1>
      {/* Stats Dashboard */}
      <Section>
        <div style={{display:'flex',gap:32,flexWrap:'wrap',marginBottom:16}}>
          <div>Today: <b>{stats.today}</b></div>
          <div>This Week: <b>{stats.week}</b></div>
          <div>This Month: <b>{stats.month}</b></div>
          <div>No-shows: <b>{stats.noShows}</b></div>
          <div>Completed: <b>{stats.completed}</b></div>
          <div>Avg. Party Size: <b>{stats.avgParty}</b></div>
          <div>Busiest Slot: <b>{stats.busiest}</b></div>
        </div>
      </Section>
      {/* Search & Filter */}
      <Section>
        <Input placeholder="Search by name or contact" value={search} onChange={e=>setSearch(e.target.value)} style={{marginRight:12}} />
        <Select value={filterBranch} onChange={e=>setFilterBranch(e.target.value)}>
          <option>All</option>
          {mockBranches.map(b=>(<option key={b}>{b}</option>))}
        </Select>
        <Select value={filterStatus} onChange={e=>setFilterStatus(e.target.value)}>
          <option>All</option>
          <option>Pending</option>
          <option>Confirmed</option>
          <option>Completed</option>
          <option>Canceled</option>
        </Select>
        <Input type="date" value={filterDate} onChange={e=>setFilterDate(e.target.value)} style={{marginRight:12}} />
        <Button type="button" onClick={()=>{setShowForm(true);setEditId(null);setForm({ name: '', contact: '', date: '', time: '', branch: mockBranches[0], party: 2, table: '', status: 'Pending', notes: '' });}}>+ New Reservation</Button>
        <Button type="button">Export to PDF</Button>
        <Button type="button">Export to CSV</Button>
        <Button type="button">Print</Button>
      </Section>
      {/* Reservation Table */}
      <Section>
        <Table>
          <thead>
            <tr>
              <Th>Name</Th><Th>Contact</Th><Th>Date</Th><Th>Time</Th><Th>Branch</Th><Th>Party</Th><Th>Table</Th><Th>Status</Th><Th>Notes</Th><Th>Actions</Th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((r: Reservation) => (
              <tr key={r.id} style={{background:r.status==='Canceled'?'#e8f0ff':r.status==='Completed'?'#f8fbff':'#fff'}}>
                <Td>{r.name}</Td>
                <Td>{r.contact}</Td>
                <Td>{r.date}</Td>
                <Td>{r.time}</Td>
                <Td>{r.branch}</Td>
                <Td>{r.party}</Td>
                <Td>{r.table}</Td>
                <Td>{r.status}</Td>
                <Td>{r.notes}</Td>
                <Td>
                  <Button type="button" onClick={()=>handleEdit(r)}>Edit</Button>
                  <Button type="button" onClick={()=>handleCancel(r.id)}>Cancel</Button>
                  <Button type="button" onClick={()=>handleDelete(r.id)} style={{background:'#0066cc',color:'#fff'}}>Delete</Button>
                </Td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Section>
      {/* Create/Edit Reservation Form */}
      {showForm && (
        <Section>
          <form onSubmit={handleForm} style={{display:'flex',gap:16,flexWrap:'wrap',background:'#f8fbff',padding:24,borderRadius:12}}>
            <Input placeholder="Customer Name" value={form.name} onChange={e=>setForm(f=>({...f,name:e.target.value}))} required style={{minWidth:180}} />
            <Input placeholder="Contact (phone/email)" value={form.contact} onChange={e=>setForm(f=>({...f,contact:e.target.value}))} required style={{minWidth:180}} />
            <Input type="date" value={form.date} onChange={e=>setForm(f=>({...f,date:e.target.value}))} required style={{minWidth:120}} />
            <Input type="time" value={form.time} onChange={e=>setForm(f=>({...f,time:e.target.value}))} required style={{minWidth:100}} />
            <Select value={form.branch} onChange={e=>setForm(f=>({...f,branch:e.target.value}))}>
              {mockBranches.map(b=>(<option key={b}>{b}</option>))}
            </Select>
            <Input type="number" min={1} value={form.party} onChange={e=>setForm(f=>({...f,party:Number(e.target.value)}))} required style={{minWidth:80}} />
            <Select value={form.table} onChange={e=>setForm(f=>({...f,table:e.target.value}))}>
              <option value="">Auto-Assign</option>
              {mockTables.map(t=>(<option key={t}>{t}</option>))}
            </Select>
            <Input placeholder="Special Notes" value={form.notes} onChange={e=>setForm(f=>({...f,notes:e.target.value}))} style={{minWidth:180}} />
            <Select value={form.status} onChange={e=>setForm(f=>({...f,status:e.target.value}))}>
              <option>Pending</option>
              <option>Confirmed</option>
              <option>Completed</option>
              <option>Canceled</option>
            </Select>
            <Button type="submit">{editId?'Update':'Create'} Reservation</Button>
            <Button type="button" style={{background:'#0066cc',color:'#fff'}} onClick={()=>{setShowForm(false);setEditId(null);}}>Cancel</Button>
          </form>
        </Section>
      )}
    </Container>
  );
};

export default Reservations;
