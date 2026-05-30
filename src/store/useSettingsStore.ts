import { create } from 'zustand';

interface SettingsState {
  language: 'ru' | 'zh';
  setLanguage: (lang: 'ru' | 'zh') => void;
}

export const useSettingsStore = create<SettingsState>((set) => ({
  language: 'ru',
  setLanguage: (lang) => set({ language: lang }),
}));