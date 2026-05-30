import React from 'react';
import type { Message } from '../../store/useChatStore';

interface Props {
  message: Message;
}

const MessageBubble: React.FC<Props> = ({ message }) => {
  const isUser = message.role === 'user';
  return (
    <div style={{ display: 'flex', gap: 10, flexDirection: isUser ? 'row-reverse' : 'row', marginBottom: 12 }}>
      <div style={{ width: 32, height: 32, borderRadius: 8, background: isUser ? '#3b82f6' : '#4f6ef6', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 'bold' }}>
        {isUser ? 'U' : 'AI'}
      </div>
      <div style={{ maxWidth: '75%', background: isUser ? '#e9f0ff' : '#f1f3f5', padding: '12px 16px', borderRadius: 16, borderBottomRightRadius: isUser ? 4 : 16, borderBottomLeftRadius: isUser ? 16 : 4 }}>
        <p style={{ margin: 0, whiteSpace: 'pre-wrap' }}>{message.content}</p>
        <span style={{ fontSize: '0.75rem', color: '#888', marginTop: 4, display: 'block' }}>
          {new Date(message.timestamp).toLocaleTimeString()}
        </span>
      </div>
    </div>
  );
};

export default MessageBubble;