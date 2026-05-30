import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

interface Props {
  onSend: (text: string) => void;
}

const ChatInput: React.FC<Props> = ({ onSend }) => {
  const [text, setText] = useState('');
  const { t } = useTranslation();

  const handleSend = () => {
    if (text.trim()) {
      onSend(text.trim());
      setText('');
    }
  };

  return (
    <div style={{ display: 'flex', gap: 10, padding: '16px 24px', borderTop: '1px solid #e2e5e9', background: 'white' }}>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend(); } }}
        placeholder="Введите вопрос..."
        style={{ flex: 1, padding: 12, borderRadius: 14, border: '1px solid #e2e5e9', resize: 'none', fontSize: '0.95rem', outline: 'none' }}
        rows={1}
      />
      <button onClick={handleSend} style={{ background: '#4f6ef6', color: 'white', border: 'none', borderRadius: 12, width: 44, height: 44, cursor: 'pointer', fontWeight: 'bold' }}>
        ➤
      </button>
    </div>
  );
};

export default ChatInput;