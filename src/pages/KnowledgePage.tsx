// import KnowledgeBaseView from '../components/KnowledgeBase/KnowledgeBaseView';
// export default KnowledgeBaseView;


import { Helmet } from 'react-helmet-async';
import KnowledgeBaseView from '../components/KnowledgeBase/KnowledgeBaseView';

const KnowledgePage = () => (
  <>
    <Helmet>
      <title>База знаний | Учебный чат-бот</title>
      <meta name="description" content="Изучайте математику, физику, историю и программирование с помощью структурированной базы знаний." />
      <meta name="keywords" content="база знаний, математика, физика, история, программирование, обучение" />
      <meta property="og:title" content="База знаний учебного бота" />
      <meta property="og:description" content="Структурированные материалы по основным предметам." />
      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://твой-домен.ru/knowledge" />
    </Helmet>
    <KnowledgeBaseView />
  </>
);

export default KnowledgePage;