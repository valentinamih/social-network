import { render, screen } from '@testing-library/react';
import MainApp from "./App";
import News from "./components/News/News";

test('renders learn react link', () => {
  render(<MainApp />);
  const linkElement = screen.getAllByText(/Music/i);
  expect(linkElement).toBeInTheDocument();
});
