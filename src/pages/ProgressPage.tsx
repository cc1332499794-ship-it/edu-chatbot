// import StatCard from '../components/Dashboard/StatCard';
// import ProgressChart from '../components/Dashboard/ProgressChart';
// import RecentTopics from '../components/Dashboard/RecentTopics';

// const ProgressPage = () => (
//   <div style={{ padding: 24 }}>
//     <h2>📊 Прогресс обучения</h2>
//     <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 20, marginBottom: 24 }}>
//       <StatCard title="Всего вопросов" value={42} />
//       <StatCard title="Изучено тем" value={5} />
//     </div>
//     <ProgressChart />
//     <h3 style={{ marginTop: 24 }}>Последние темы</h3>
//     <RecentTopics />
//   </div>
// );

// export default ProgressPage;


import { Helmet } from 'react-helmet-async';
import StatCard from '../components/Dashboard/StatCard';
import ProgressChart from '../components/Dashboard/ProgressChart';
import RecentTopics from '../components/Dashboard/RecentTopics';

const ProgressPage = () => (
  <>
    <Helmet>
      <title>Прогресс | Учебный чат-бот</title>
      <meta name="description" content="Отслеживайте свой прогресс в обучении: количество вопросов, изученные темы, активность по дням." />
      <meta name="keywords" content="прогресс, обучение, статистика, вопросы, график" />
      <meta property="og:title" content="Прогресс обучения" />
      <meta property="og:description" content="Статистика вашей учебной активности." />
      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://твой-домен.ru/progress" />
    </Helmet>
    <div style={{ padding: 24 }}>
      <h2>📊 Прогресс обучения</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 20, marginBottom: 24 }}>
        <StatCard title="Всего вопросов" value={42} />
        <StatCard title="Изучено тем" value={5} />
      </div>
      <ProgressChart />
      <h3 style={{ marginTop: 24 }}>Последние темы</h3>
      <RecentTopics />
    </div>
  </>
);

export default ProgressPage;