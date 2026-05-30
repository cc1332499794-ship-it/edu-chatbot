import React from 'react';

const subjectsInfo = [
  { subject: 'Математика', topics: ['Алгебра', 'Геометрия', 'Матанализ', 'Статистика'] },
  { subject: 'Физика', topics: ['Механика', 'Термодинамика', 'Электричество', 'Оптика'] },
  { subject: 'История', topics: ['Древний мир', 'Средневековье', 'Новое время', 'XX век'] },
  { subject: 'Программирование', topics: ['Python', 'JavaScript', 'Алгоритмы', 'Структуры данных'] },
];

const KnowledgeBaseView: React.FC = () => (
  <div style={{ padding: 24 }}>
    <h2>📚 База знаний</h2>
    {subjectsInfo.map((item) => (
      <div key={item.subject} style={{ marginBottom: 24 }}>
        <h3>{item.subject}</h3>
        <ul>
          {item.topics.map((t) => (
            <li key={t}>{t}</li>
          ))}
        </ul>
      </div>
    ))}
  </div>
);

export default KnowledgeBaseView;