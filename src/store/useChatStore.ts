import { create } from 'zustand';

export interface Message {
  id: string;
  role: 'user' | 'bot';
  content: string;
  timestamp: number;
}

export interface Conversation {
  id: string;
  title: string;
  subject: string;
  messages: Message[];
}

interface ChatState {
  conversations: Conversation[];
  activeConversationId: string | null;
  setActiveConversation: (id: string) => void;
  addMessageToActive: (msg: Message) => void;
  createNewConversation: (subject?: string) => void;
  getActiveConversation: () => Conversation | undefined;
}

export const useChatStore = create<ChatState>((set, get) => ({
  conversations: [],
  activeConversationId: null,

  setActiveConversation: (id) => set({ activeConversationId: id }),

  addMessageToActive: (msg) =>
    set((state) => {
      const convs = state.conversations.map((c) => {
        if (c.id === state.activeConversationId) {
          const updated = { ...c, messages: [...c.messages, msg] };
          if (c.messages.length === 0) {
            updated.title = msg.content.slice(0, 25);
          }
          return updated;
        }
        return c;
      });
      return { conversations: convs };
    }),

  createNewConversation: (subject = 'general') => {
    const id = Date.now().toString();
    const newConv: Conversation = {
      id,
      title: 'Новый диалог',
      subject,
      messages: [],
    };
    set((state) => ({
      conversations: [newConv, ...state.conversations],
      activeConversationId: id,
    }));
  },

  getActiveConversation: () => {
    const state = get();
    return state.conversations.find((c) => c.id === state.activeConversationId);
  },
}));