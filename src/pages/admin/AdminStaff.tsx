import React from 'react';
import styled from 'styled-components';
import { useStaff } from '../../context/StaffContext';

const Container = styled.div`
  max-width: 1200px;
  margin: 40px auto;
  background: #f8fbff;
  border-radius: 16px;
  box-shadow: 0 2px 16px rgba(0,102,204,0.10);
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
  &:hover { background: #0052a3; color: #fff; }
`;
const Select = styled.select`
  padding: 8px;
  border-radius: 6px;
  border: 1px solid #b3d9ff;
  background: #fff;
  color: #003d82;
`;

const statuses = ['active', 'on leave', 'terminated'];

const AdminStaff: React.FC = () => {
  const { staff: employees, updateStatus, setStaff } = useStaff();
  const [selected, setSelected] = React.useState<string|null>(null);
  const [editStatus, setEditStatus] = React.useState('');

  const handleSelect = (id: string) => {
    setSelected(id);
    setEditStatus(employees.find(e => e.id === id)?.status || '');
  };
  const handleStatusChange = (id: string, status: string) => {
    updateStatus(id, status);
    setEditStatus(status);
  };

  const handleBranchChange = (id: string, branch: string) => {
    setStaff(prev => prev.map(e => e.id === id ? {...e, branch} : e));
  };

  const selectedEmp = employees.find(e => e.id === selected);

  return (
    <Container>
      <h1 style={{color:'#0066cc',marginBottom:24}}>Employee Management</h1>
      {/* Employee List */}
      <Section>
        <h2 style={{color:'#0066cc',fontSize:'1.1rem'}}>All Employees</h2>
        <Table>
          <thead><tr><Th>Name</Th><Th>Role</Th><Th>Contact</Th><Th>Branch</Th><Th>Status</Th><Th>Actions</Th></tr></thead>
          <tbody>
            {employees.map(e=>(
              <tr key={e.id} style={{background:selected===e.id?'#333':'inherit'}}>
                <Td>{e.name}</Td>
                <Td>{e.role}</Td>
                <Td>{e.contact}</Td>
                <Td>{e.branch}</Td>
                <Td>{e.status}</Td>
                <Td><Button type="button" onClick={()=>handleSelect(e.id)}>View</Button></Td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Section>
      {/* Employee Details & Management */}
      {selectedEmp && (
        <Section>
          <h2 style={{color:'#0066cc',fontSize:'1.1rem'}}>Employee Details</h2>
          <div style={{display:'flex',gap:32,flexWrap:'wrap'}}>
            <div>
              <b>Name:</b> {selectedEmp.name}<br/>
              <b>Role:</b> {selectedEmp.role}<br/>
              <b>Contact:</b> {selectedEmp.contact}<br/>
              <b>Branch:</b> <Select value={selectedEmp.branch || ''} onChange={e => handleBranchChange(selectedEmp.id, e.target.value)}>
                <option value="">No Branch</option>
                <option value="1">Branch 1</option>
                <option value="2">Branch 2</option>
                <option value="3">Branch 3</option>
              </Select><br/>
              <b>Status:</b> <Select value={editStatus} onChange={e=>handleStatusChange(selectedEmp.id, e.target.value)}>{statuses.map((s: string)=>(<option key={s}>{s}</option>))}</Select>
            </div>
            <div>
              <b>Payroll:</b><br/>
              <div>Current Salary: ${selectedEmp.salary}</div>
              <div>Salary History: {selectedEmp.salaryHistory.map((s,i)=>(<span key={i}>${s}{i<selectedEmp.salaryHistory.length-1?', ':''}</span>))}</div>
            </div>
            <div>
              <b>Reports:</b><br/>
              <div>Attendance: {selectedEmp.attendance}%</div>
              <div>Performance: {selectedEmp.performance} / 5.0</div>
            </div>
          </div>
        </Section>
      )}
    </Container>
  );
};

export default AdminStaff;
