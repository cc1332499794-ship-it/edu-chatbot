import { render, fireEvent } from '@testing-library/react';
import ChatInput from '../components/Chat/ChatInput';

test('calls onSend when button clicked', () => {
  const handleSend = jest.fn();
  const { getByPlaceholderText, getByText } = render(<ChatInput onSend={handleSend} />);
  const input = getByPlaceholderText('Введите вопрос...');
  fireEvent.change(input, { target: { value: 'Тест' } });
  fireEvent.click(getByText('➤'));
  expect(handleSend).toHaveBeenCalledWith('Тест');
});