import React, { useEffect, useRef } from 'react';
import { useChatStore } from '../../store/useChatStore';
import { fetchBotReply } from '../../api/chatbot';
import MessageBubble from './MessageBubble';
import ChatInput from './ChatInput';
import SubjectSelector from './SubjectSelector';

const ChatView: React.FC = () => {
  const {
    conversations,
    activeConversationId,
    addMessageToActive,
    createNewConversation,
    getActiveConversation,
    setActiveConversation,
  } = useChatStore();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const activeConv = getActiveConversation();
  const messages = activeConv?.messages || [];
  const subject = activeConv?.subject || 'general';

  useEffect(() => {
    if (conversations.length === 0) {
      createNewConversation('general');
    } else if (!activeConversationId) {
      setActiveConversation(conversations[0].id);
    }
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async (text: string) => {
  const userMsg = {
    id: Date.now().toString(),
    role: 'user' as const,
    content: text,
    timestamp: Date.now(),
  };
  addMessageToActive(userMsg);

  // 构建对话历史（包括刚发的用户消息）
  const updatedMessages = [...messages, userMsg];
  const messagesForApi = updatedMessages.map(m => ({
    role: m.role,
    content: m.content,
  }));

  const reply = await fetchBotReply(messagesForApi, subject);

  const botMsg = {
    id: (Date.now() + 1).toString(),
    role: 'bot' as const,
    content: reply,
    timestamp: Date.now(),
  };
  addMessageToActive(botMsg);
};

  const handleSubjectChange = (newSubject: string) => {
    createNewConversation(newSubject);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <div style={{ padding: '12px 24px', borderBottom: '1px solid #e2e5e9', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2 style={{ margin: 0 }}>🤖 Чат</h2>
        <SubjectSelector value={subject} onChange={handleSubjectChange} />
      </div>
      <div style={{ flex: 1, overflowY: 'auto', padding: '20px 24px' }}>
        {messages.length === 0 && (
          <p style={{ color: '#888' }}>Задайте вопрос по выбранному предмету.</p>
        )}
        {messages.map((msg) => (
          <MessageBubble key={msg.id} message={msg} />
        ))}
        <div ref={messagesEndRef} />
      </div>
      <ChatInput onSend={handleSend} />
    </div>
  );
};

export default ChatView;