import { render, screen } from '@testing-library/react';
import MainApp from "./App";

test('renders learn react link', () => {
  render(<MainApp />);
  const linkElement = screen.getAllByText(/Music/i);
  expect(linkElement).toBeInTheDocument();
});
