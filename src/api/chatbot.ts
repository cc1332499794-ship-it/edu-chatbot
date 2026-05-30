import { mockAiReply } from '../utils/mockAi';

export const fetchBotReply = async (message: string, subject: string): Promise<string> => {
  await new Promise((resolve) => setTimeout(resolve, 800 + Math.random() * 1000));
  return mockAiReply(message, subject);
};