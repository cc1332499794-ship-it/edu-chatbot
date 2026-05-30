import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { day: 'Пн', questions: 4 },
  { day: 'Вт', questions: 7 },
  { day: 'Ср', questions: 2 },
  { day: 'Чт', questions: 9 },
  { day: 'Пт', questions: 5 },
  { day: 'Сб', questions: 6 },
  { day: 'Вс', questions: 8 },
];

const ProgressChart = () => (
  <ResponsiveContainer width="100%" height={250}>
    <LineChart data={data}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="day" />
      <YAxis />
      <Tooltip />
      <Line type="monotone" dataKey="questions" stroke="#4f6ef6" strokeWidth={2} />
    </LineChart>
  </ResponsiveContainer>
);

export default ProgressChart;