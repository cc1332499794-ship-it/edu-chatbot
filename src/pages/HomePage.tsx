// import { useTranslation } from 'react-i18next';

// const HomePage = () => {
//   const { t } = useTranslation();
//   return (
//     <div style={{ padding: 40 }}>
//       <h1>{t('welcome')}</h1>
//       <p>Это учебный AI-ассистент, помогающий изучать математику, физику, историю и программирование.</p>
//     </div>
//   );
// };

// export default HomePage;


import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet-async';

const HomePage = () => {
  const { t } = useTranslation();
  return (
    <>
      <Helmet>
        <title>Главная | Учебный чат-бот</title>
        <meta name="description" content="Учебный чат-бот – AI помощник для студентов. Помощь в изучении математики, физики, истории и программирования." />
        <meta name="keywords" content="учебный чат-бот, обучение, AI, помощник, математика, физика, история, программирование" />
        <meta property="og:title" content="Учебный чат-бот – AI помощник" />
        <meta property="og:description" content="Задавайте вопросы по учёбе и получайте понятные объяснения." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://твой-домен.ru/" />
      </Helmet>
      <div style={{ padding: 40 }}>
        <h1>{t('welcome')}</h1>
        <p>Это учебный AI-ассистент, помогающий изучать математику, физику, историю и программирование.</p>
      </div>
    </>
  );
};

export default HomePage;