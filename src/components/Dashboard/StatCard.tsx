import React from 'react';

interface Props {
  title: string;
  value: number | string;
}

const StatCard: React.FC<Props> = ({ title, value }) => (
  <div style={{ background: 'white', padding: 20, borderRadius: 16, boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}>
    <h3 style={{ margin: '0 0 8px', fontSize: '0.9rem', color: '#666' }}>{title}</h3>
    <div style={{ fontSize: '2rem', fontWeight: 'bold' }}>{value}</div>
  </div>
);

export default StatCard;