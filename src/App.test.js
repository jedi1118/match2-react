import { render, screen } from '@testing-library/react';
import App from './App';

test('renders the match2 game', () => {
  render(<App />);
  expect(screen.getByText(/Change Graphics/i)).toBeInTheDocument();
});
