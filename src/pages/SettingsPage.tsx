// import { useTranslation } from 'react-i18next';
// import { useSettingsStore } from '../store/useSettingsStore';
// import { useAuthStore } from '../store/useAuthStore';

// const SettingsPage = () => {
//   const { t, i18n } = useTranslation();
//   const language = useSettingsStore((s) => s.language);
//   const setLanguage = useSettingsStore((s) => s.setLanguage);
//   const user = useAuthStore((s) => s.user);

//   const changeLanguage = (lang: 'ru' | 'zh') => {
//     i18n.changeLanguage(lang);
//     setLanguage(lang);
//   };

//   return (
//     <div style={{ padding: 24 }}>
//       <h2>⚙️ {t('settings')}</h2>
//       <div style={{ marginBottom: 16 }}>
//         <strong>Имя:</strong> {user?.name}
//       </div>
//       <div style={{ marginBottom: 16 }}>
//         <strong>Язык / 语言:</strong>
//         <button onClick={() => changeLanguage('ru')} style={{ margin: '0 8px', background: language === 'ru' ? '#4f6ef6' : '#eee', color: language === 'ru' ? 'white' : 'black', border: 'none', padding: '4px 12px', borderRadius: 6 }}>Русский</button>
//         <button onClick={() => changeLanguage('zh')} style={{ background: language === 'zh' ? '#4f6ef6' : '#eee', color: language === 'zh' ? 'white' : 'black', border: 'none', padding: '4px 12px', borderRadius: 6 }}>中文</button>
//       </div>
//     </div>
//   );
// };

// export default SettingsPage;


import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { useSettingsStore } from '../store/useSettingsStore';
import { useAuthStore } from '../store/useAuthStore';

const SettingsPage = () => {
  const { t, i18n } = useTranslation();
  const language = useSettingsStore((s) => s.language);
  const setLanguage = useSettingsStore((s) => s.setLanguage);
  const user = useAuthStore((s) => s.user);

  const changeLanguage = (lang: 'ru' | 'zh') => {
    i18n.changeLanguage(lang);
    setLanguage(lang);
  };

  return (
    <>
      <Helmet>
        <title>Настройки | Учебный чат-бот</title>
        <meta name="description" content="Настройте язык интерфейса и просмотрите информацию о профиле." />
        <meta name="keywords" content="настройки, язык, профиль, русский, китайский" />
        <meta property="og:title" content="Настройки учебного бота" />
        <meta property="og:description" content="Персонализация учебного помощника." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://твой-домен.ru/settings" />
      </Helmet>
      <div style={{ padding: 24 }}>
        <h2>⚙️ {t('settings')}</h2>
        <div style={{ marginBottom: 16 }}>
          <strong>Имя:</strong> {user?.name}
        </div>
        <div style={{ marginBottom: 16 }}>
          <strong>Язык / 语言:</strong>
          <button onClick={() => changeLanguage('ru')} style={{ margin: '0 8px', background: language === 'ru' ? '#4f6ef6' : '#eee', color: language === 'ru' ? 'white' : 'black', border: 'none', padding: '4px 12px', borderRadius: 6 }}>Русский</button>
          <button onClick={() => changeLanguage('zh')} style={{ background: language === 'zh' ? '#4f6ef6' : '#eee', color: language === 'zh' ? 'white' : 'black', border: 'none', padding: '4px 12px', borderRadius: 6 }}>中文</button>
        </div>
      </div>
    </>
  );
};

export default SettingsPage;
