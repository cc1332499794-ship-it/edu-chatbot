import axios from 'axios';

export const fetchBotReply = async (
  messages: { role: string; content: string }[],
  subject: string
): Promise<string> => {
  const response = await axios.post('/api/chat', { messages, subject });
  return response.data.reply;
};