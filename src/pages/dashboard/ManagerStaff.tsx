import React from 'react';
import styled from 'styled-components';
import { useStaff } from '../../context/StaffContext';

interface ManagerStaffProps {
  allBranches?: boolean;
}

const Card = styled.div`
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 2px 12px rgba(0,0,0,0.08);
  padding: 32px;
  max-width: 900px;
  margin: 32px auto;
  @media (max-width: 700px) {
    padding: 14px 2px 14px 2px;
    max-width: 98vw;
    margin: 10px 0;
    border-radius: 8px;
  }
`;
const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 16px;
  font-size: 1rem;
  @media (max-width: 700px) {
    display: block;
    width: 100%;
    overflow-x: auto;
    font-size: 0.92rem;
    border-radius: 4px;
  }
`;
const Th = styled.th`
  background: #222;
  color: #fff;
  padding: 10px;
  @media (max-width: 700px) {
    padding: 7px 4px;
    font-size: 0.95em;
  }
`;
const Td = styled.td`
  border: 1px solid #eee;
  padding: 10px;
  color: #222;
  @media (max-width: 700px) {
    padding: 7px 4px;
    font-size: 0.95em;
    word-break: break-word;
  }
`;

const mockStaffByBranch = [
  {
    branch: 'Downtown',
    staff: [
      { name: 'Alice', role: 'Chef', status: 'Active', performance: 4.8 },
      { name: 'Bob', role: 'Waiter', status: 'Active', performance: 4.5 },
    ],
  },
  {
    branch: 'Uptown',
    staff: [
      { name: 'Carol', role: 'Chef', status: 'Active', performance: 4.7 },
      { name: 'Dave', role: 'Waiter', status: 'Inactive', performance: 4.2 },
    ],
  },
];

const ManagerStaff: React.FC<ManagerStaffProps> = ({ allBranches }) => {
  // Only show staff for the manager's branch (mock: Downtown)
  const branch = 'Downtown';
  const { staff } = useStaff();
  const branchStaff = staff.filter((e: any) => e.branch === branch);

  if (allBranches) {
    return (
      <Card>
        <h2 style={{ color: '#222', marginBottom: 24 }}>Staff Overview (All Branches)</h2>
        {mockStaffByBranch.map((branchData, idx) => (
          <div key={idx} style={{marginBottom:32}}>
            <h3 style={{color:'#0066cc',marginBottom:8}}>{branchData.branch} Branch</h3>
            <Table>
              <thead>
                <tr>
                  <Th>Name</Th>
                  <Th>Role</Th>
                  <Th>Schedule</Th>
                  <Th>Performance</Th>
                </tr>
              </thead>
              <tbody>
                {branchData.staff.map((s: any, i: number) => (
                  <tr key={i}>
                    <Td>{s.name}</Td>
                    <Td>{s.role}</Td>
                    <Td>{s.status}</Td>
                    <Td>{s.performance}</Td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        ))}
        <div style={{marginTop:16, color:'#0066cc', fontWeight:600}}>
          * Payroll and system roles cannot be edited by managers.
        </div>
      </Card>
    );
  }

  return (
    <Card>
      <h2 style={{ color: '#003d82', marginBottom: 24 }}>Staff Overview</h2>
      <Table>
        <thead>
          <tr>
            <Th>Name</Th>
            <Th>Role</Th>
            <Th>Schedule</Th>
            <Th>Performance</Th>
          </tr>
        </thead>
        <tbody>
          {branchStaff.map((s: any, i: number) => (
            <tr key={i}>
              <Td>{s.name}</Td>
              <Td>{s.role}</Td>
              <Td>{s.status}</Td>
              <Td>{s.performance}</Td>
            </tr>
          ))}
        </tbody>
      </Table>
      <div style={{marginTop:16, color:'#0066cc', fontWeight:600}}>
        * Payroll and system roles cannot be edited by managers.
      </div>
    </Card>
  );
};

export default ManagerStaff;
