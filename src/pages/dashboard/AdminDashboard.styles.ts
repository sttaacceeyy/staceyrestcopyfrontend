import styled from 'styled-components';

export const Card = styled.div`
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 2px 12px rgba(0,0,0,0.08);
  padding: 32px;
  max-width: 900px;
  margin: 32px auto;
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 32px;
  background: #f9f9f9;
  border-radius: 8px;
  overflow: hidden;
`;

export const Th = styled.th`
  background: #0066cc;
  color: #fff;
  padding: 12px;
  font-weight: 600;
`;

export const Td = styled.td`
  border: 1px solid #eee;
  padding: 10px;
  text-align: center;
  background: #fff;
`;

export const TrAlt = styled.tr`
  background: #f1f3f6;
`;
