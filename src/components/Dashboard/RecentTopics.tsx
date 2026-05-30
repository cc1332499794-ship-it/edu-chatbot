import React from 'react';
import { useChatStore } from '../../store/useChatStore';

const RecentTopics: React.FC = () => {
  const conversations = useChatStore((s) => s.conversations);
  const recent = conversations.slice(0, 5);
  return (
    <ul style={{ padding: '0 16px' }}>
      {recent.map((c) => (
        <li key={c.id} style={{ marginBottom: 6 }}>{c.title}</li>
      ))}
    </ul>
  );
};

export default RecentTopics;