import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import ru from './ru.json';
import zh from './zh.json';

i18n.use(initReactI18next).init({
  resources: {
    ru: { translation: ru },
    zh: { translation: zh },
  },
  lng: 'ru',
  fallbackLng: 'ru',
  interpolation: { escapeValue: false },
});

export default i18n;