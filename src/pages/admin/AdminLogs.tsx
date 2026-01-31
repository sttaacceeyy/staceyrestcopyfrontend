import React, { useContext } from 'react';
import styled from 'styled-components';
import { LoginLogContext } from '../../context/LoginLogContext';

const AdminContainer = styled.div`
  max-width: 1100px;
  margin: 40px auto;
  background: #f8fbff;
  border-radius: 16px;
  box-shadow: 0 2px 16px rgba(0,102,204,0.10);
  padding: 32px 40px 40px 40px;
  min-height: 60vh;
  color: #003d82;
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

const AdminLogs: React.FC = () => {
  const { logs } = useContext(LoginLogContext);
  return (
    <AdminContainer>
      <Title>Audit & Security Logs</Title>
      <Desc>View login attempts, access control, and suspicious activity here.</Desc>
      <table style={{width:'100%',marginTop:24,background:'#fff',color:'#003d82',borderRadius:8,overflow:'hidden'}}>
        <thead>
          <tr style={{background:'#0066cc',color:'#fff'}}>
            <th style={{padding:8}}>Type</th>
            <th style={{padding:8}}>User</th>
            <th style={{padding:8}}>Role</th>
            <th style={{padding:8}}>Time</th>
            <th style={{padding:8}}>Status</th>
          </tr>
        </thead>
        <tbody>
          {logs.length === 0 ? (
            <tr><td colSpan={5} style={{textAlign:'center',padding:16,color:'#999'}}>No logs yet.</td></tr>
          ) : (
            logs.map((log, i) => (
              <tr key={i} style={{background:i%2?'#fff':'#f8fbff'}}>
                <td style={{padding:8}}>Login</td>
                <td style={{padding:8}}>{log.username}</td>
                <td style={{padding:8}}>{log.role}</td>
                <td style={{padding:8}}>{log.time}</td>
                <td style={{padding:8}}>{log.status === 'success' ? 'Success' : 'Fail'}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </AdminContainer>
  );
};

export default AdminLogs;
