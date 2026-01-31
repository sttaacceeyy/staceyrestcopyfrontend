import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import { MenuContext } from '../../context/MenuContext';

interface ManagerMenuProps {
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
const Button = styled.button`
  background: #0066cc;
  color: #fff;
  border: none;
  border-radius: 6px;
  padding: 8px 18px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  margin-right: 12px;
  margin-top: 8px;
  transition: background 0.2s;
  &:hover {
    background: #4da6ff;
    color: #fff;
  }
  @media (max-width: 700px) {
    padding: 7px 10px;
    font-size: 0.97em;
    margin-right: 6px;
  }
`;
const Input = styled.input`
  padding: 8px 12px;
  border-radius: 6px;
  border: 1px solid #ccc;
  font-size: 1rem;
  margin-bottom: 12px;
  width: 100%;
  @media (max-width: 700px) {
    padding: 7px 8px;
    font-size: 0.97em;
  }
`;

const mockMenus = [
  { branch: 'Downtown', menu: [
    { id: 1, name: 'Ribeye Steak', available: true },
    { id: 2, name: 'Caesar Salad', available: false },
  ]},
  { branch: 'Uptown', menu: [
    { id: 1, name: 'Ribeye Steak', available: false },
    { id: 2, name: 'Caesar Salad', available: true },
  ]},
  { branch: 'Suburb', menu: [
    { id: 1, name: 'Ribeye Steak', available: true },
    { id: 2, name: 'Caesar Salad', available: true },
  ]},
];

const ManagerMenu: React.FC<ManagerMenuProps> = ({ allBranches }) => {
  const { menu, toggleAvailability } = useContext(MenuContext);
  const [suggestion, setSuggestion] = useState('');
  const [suggested, setSuggested] = useState<string[]>([]);

  const handleSuggest = (e: React.FormEvent) => {
    e.preventDefault();
    if (suggestion.trim()) {
      setSuggested([...suggested, suggestion]);
      setSuggestion('');
      alert('Suggestion sent to admin for approval (mock)');
    }
  };

  if (allBranches) {
    return (
      <Card>
        <h2 style={{ color: '#222', marginBottom: 24 }}>Menu Management (All Branches)</h2>
        {mockMenus.map((branchMenu, idx) => (
          <div key={idx} style={{marginBottom:32}}>
            <h3 style={{color:'#0066cc',marginBottom:8}}>{branchMenu.branch} Branch</h3>
            <Table>
              <thead>
                <tr>
                  <Th>Dish</Th>
                  <Th>Status</Th>
                </tr>
              </thead>
              <tbody>
                {branchMenu.menu.map(item => (
                  <tr key={item.id}>
                    <Td>{item.name}</Td>
                    <Td>{item.available ? 'Available' : 'Out of Stock'}</Td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        ))}
      </Card>
    );
  }

  return (
    <Card>
      <h2 style={{ color: '#222', marginBottom: 24 }}>Menu Management</h2>
      <Table>
        <thead>
          <tr>
            <Th>Dish</Th>
            <Th>Status</Th>
            <Th>Action</Th>
          </tr>
        </thead>
        <tbody>
          {menu.map(item => (
            <tr key={item.id}>
              <Td>{item.name}</Td>
              <Td>{item.available ? 'Available' : 'Out of Stock'}</Td>
              <Td>
                <Button onClick={() => toggleAvailability(item.id)}>
                  {item.available ? 'Mark Out of Stock' : 'Mark Available'}
                </Button>
              </Td>
            </tr>
          ))}
        </tbody>
      </Table>
      <form onSubmit={handleSuggest} style={{ marginTop: 32 }}>
        <label style={{ fontWeight: 600 }}>Suggest New Menu Item:</label>
        <Input
          type="text"
          value={suggestion}
          onChange={e => setSuggestion(e.target.value)}
          placeholder="Dish name"
        />
        <Button type="submit">Suggest</Button>
      </form>
      {suggested.length > 0 && (
        <div style={{ marginTop: 16 }}>
          <b>Suggestions sent:</b>
          <ul>
            {suggested.map((s, i) => <li key={i}>{s}</li>)}
          </ul>
        </div>
      )}
    </Card>
  );
};

export default ManagerMenu;
