import React from 'react';

const Forbidden: React.FC = () => (
  <div style={{ minHeight: '60vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: '#0066cc', fontWeight: 700 }}>
    <h1 style={{ fontSize: '2.5rem', marginBottom: 16 }}>403 Forbidden</h1>
    <p style={{ fontSize: '1.2rem' }}>You do not have permission to access this page.</p>
  </div>
);

export default Forbidden;
