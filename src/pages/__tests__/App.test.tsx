import { render, screen } from '@testing-library/react';
import App from '../../App';
import { userEvent } from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';

// How can we test React Router?
// https://testing-library.com/docs/example-react-router

// We can wrap our component in a MemoryRouter component.
test('renders the correct content', async () => {
  // This will fail. Explain why
  // render(<App />);

  render(
    <BrowserRouter>
      <App />
    </BrowserRouter>,
  );

  // Now we can proceed with our tests
  expect(screen.getByRole('heading', { name: 'Hello! 👋' })).toBeInTheDocument();
  expect(screen.getByText('Where should we go?')).toBeInTheDocument();

  const dogsLink = screen.getByRole('link', { name: 'Dogs page' });
  expect(dogsLink).toBeInTheDocument();

  const formLink = screen.getByRole('link', { name: 'Form page' });
  expect(formLink).toBeInTheDocument();

  await userEvent.click(formLink);

  const email = await screen.findByRole('textbox', { name: /email address/i });
  expect(email).toBeInTheDocument();

  const password = screen.getByLabelText('Password');
  expect(password).toBeInTheDocument();
});
