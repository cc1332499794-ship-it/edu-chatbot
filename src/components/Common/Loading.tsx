import React from 'react';

const Loading: React.FC = () => (
  <div style={{ display: 'flex', justifyContent: 'center', padding: '20px' }}>
    <div style={{ width: 24, height: 24, border: '3px solid #e2e5e9', borderTopColor: '#4f6ef6', borderRadius: '50%', animation: 'spin 1s linear infinite' }} />
  </div>
);

export default Loading;