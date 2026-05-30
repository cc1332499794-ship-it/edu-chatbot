import { render, screen } from '@testing-library/react';
import MessageBubble from '../components/Chat/MessageBubble';

test('renders user message', () => {
  const msg = { id: '1', role: 'user', content: 'Привет', timestamp: Date.now() };
  render(<MessageBubble message={msg as any} />);
  expect(screen.getByText('Привет')).toBeInTheDocument();
});