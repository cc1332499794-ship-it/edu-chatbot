import { create } from 'zustand';

interface User {
  id: string;
  name: string;
  email: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  login: (user: User) => void;
  logout: () => void;
}

// 从 localStorage 恢复登录状态
const savedUser = localStorage.getItem('eduUser');
const initialUser: User | null = savedUser ? JSON.parse(savedUser) : null;

export const useAuthStore = create<AuthState>((set) => ({
  user: initialUser,
  isAuthenticated: initialUser !== null,

  login: (user) => {
    localStorage.setItem('eduUser', JSON.stringify(user));
    set({ user, isAuthenticated: true });
  },

  logout: () => {
    localStorage.removeItem('eduUser');
    set({ user: null, isAuthenticated: false });
  },
}));