export const mockAiReply = (question: string, subject: string): string => {
  const q = question.toLowerCase();
  if (q.includes('привет') || q.includes('здравствуй') || q.includes('你好')) return 'Здравствуй! Готов помочь с учёбой.';
  switch (subject) {
    case 'math':
      if (q.includes('производн') || q.includes('интеграл')) return 'Производная показывает скорость изменения функции. Могу объяснить подробнее.';
      return 'Математика – это язык науки. Уточни тему.';
    case 'physics':
      if (q.includes('закон') || q.includes('ньютон')) return 'Законы Ньютона: 1) Инерция, 2) F=ma, 3) Действие равно противодействию.';
      return 'Физика объясняет мир. Спроси о конкретном явлении.';
    case 'history':
      return 'История полна уроков. Какой период вас интересует?';
    case 'programming':
      if (q.includes('python')) return 'Python – отличный язык для начинающих. Что именно изучаете?';
      return 'Программирование требует практики. Показать пример кода?';
    default:
      return 'Отличный вопрос! Я пока учусь, но могу помочь разобраться.';
  }
};