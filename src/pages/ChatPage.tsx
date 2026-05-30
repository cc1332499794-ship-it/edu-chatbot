// import ChatView from '../components/Chat/ChatView';
// export default ChatView;

import { Helmet } from 'react-helmet-async';
import ChatView from '../components/Chat/ChatView';

const ChatPage = () => (
  <>
    <Helmet>
      <title>Чат | Учебный чат-бот</title>
      <meta name="description" content="Общайтесь с AI помощником по математике, физике, истории и программированию." />
      <meta name="keywords" content="чат, AI, обучение, математика, физика, история, программирование" />
      <meta property="og:title" content="Чат с учебным ботом" />
      <meta property="og:description" content="Задайте вопрос и получите объяснение." />
      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://твой-домен.ru/chat" />
    </Helmet>
    <ChatView />
  </>
);

export default ChatPage;