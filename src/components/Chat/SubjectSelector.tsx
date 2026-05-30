import React from 'react';

interface Props {
  value: string;
  onChange: (subject: string) => void;
}

const subjects = [
  { value: 'general', label: 'Общие вопросы' },
  { value: 'math', label: 'Математика' },
  { value: 'physics', label: 'Физика' },
  { value: 'history', label: 'История' },
  { value: 'programming', label: 'Программирование' },
];

const SubjectSelector: React.FC<Props> = ({ value, onChange }) => {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      style={{ padding: '8px 12px', borderRadius: 8, border: '1px solid #ccc', fontSize: '0.9rem' }}
    >
      {subjects.map((s) => (
        <option key={s.value} value={s.value}>{s.label}</option>
      ))}
    </select>
  );
};

export default SubjectSelector;