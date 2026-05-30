import React from 'react';

interface Props {
  onClick?: () => void;
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
  style?: React.CSSProperties;
}

const Button: React.FC<Props> = ({ onClick, children, variant = 'primary', style }) => {
  const bg = variant === 'primary' ? '#4f6ef6' : '#e2e5e9';
  const color = variant === 'primary' ? 'white' : '#333';
  return (
    <button
      onClick={onClick}
      style={{
        background: bg,
        color,
        border: 'none',
        padding: '10px 20px',
        borderRadius: '8px',
        fontWeight: 600,
        cursor: 'pointer',
        ...style,
      }}
    >
      {children}
    </button>
  );
};

export default Button;