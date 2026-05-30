// const HelpPage = () => (
//   <div style={{ padding: 24 }}>
//     <h2>❓ Помощь</h2>
//     <p>Выберите предмет в чате и задайте вопрос. Бот постарается ответить простыми словами.</p>
//     <p>Для переключения языка зайдите в Настройки.</p>
//   </div>
// );

// export default HelpPage;


import { Helmet } from 'react-helmet-async';

const HelpPage = () => (
  <>
    <Helmet>
      <title>Помощь | Учебный чат-бот</title>
      <meta name="description" content="Узнайте, как пользоваться учебным чат-ботом: выбор предмета, отправка вопросов, просмотр прогресса." />
      <meta name="keywords" content="помощь, инструкция, чат-бот, обучение" />
      <meta property="og:title" content="Помощь по учебному боту" />
      <meta property="og:description" content="Инструкция по использованию AI помощника." />
      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://твой-домен.ru/help" />
    </Helmet>
    <div style={{ padding: 24 }}>
      <h2>❓ Помощь</h2>
      <p>Выберите предмет в чате и задайте вопрос. Бот постарается ответить простыми словами.</p>
      <p>Для переключения языка зайдите в Настройки.</p>
    </div>
  </>
);

export default HelpPage;