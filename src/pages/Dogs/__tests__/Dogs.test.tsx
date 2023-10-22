import { render, screen, waitFor, within } from '@testing-library/react';
import Dogs from '../Dogs';
import { userEvent } from '@testing-library/user-event';

describe('Dogs', () => {
  // Adding msw to mock the API call
  // https://mswjs.io/docs/
  // Is a library that uses Service Worker API to intercept API calls
  // We also will need to add jest-fetch-mock to mock the fetch API
  // yarn add -D msw jest-fetch-mock
  it('renders', async () => {
    render(<Dogs />);

    const img = await screen.findByRole('img', {
      name: /a good boy/i,
    });
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute('src', 'https://placehold.co/600x400');

    const select = screen.getByRole('combobox', {
      name: /select a breed/i,
    });
    expect(select).toBeInTheDocument();

    // Using within() to get elements within a container instead of the document
    const loadingOption = within(select).getByRole('option', {
      name: /loading/i,
    });
    expect(loadingOption).toBeInTheDocument();

    // After adding the handler for this API call, we can test the image has been updated
    await waitFor(() => {
      expect(img).toHaveAttribute('src', 'https://dog.ceo/api/img/placeholder.jpg');
    });
    // We can check that the Select has been updated with the breeds as options
    const breeds = screen.getAllByRole('option');
    expect(breeds).toHaveLength(2);

    // If the message: { retriever: ['golden', 'labrador'] } is a constant, we can do something like
    const goldenOption = screen.getByRole('option', {
      name: /golden/i,
    });
    expect(goldenOption).toBeInTheDocument();

    const labradorOption = screen.getByRole('option', {
      name: /labrador/i,
    });
    expect(labradorOption).toBeInTheDocument();
  });

  // Lets mock an user interaction
  // For that, we will need to update the handler to include this new API call
  it('breed can be changed', async () => {
    render(<Dogs />);

    // We select the select
    const select = screen.getByRole('combobox', {
      name: /select a breed/i,
    });
    expect(select).toBeInTheDocument();

    // It has a loading option by default
    const loadingOption = within(select).getByRole('option', {
      name: /loading/i,
    });
    expect(loadingOption).toBeInTheDocument();

    // We can wait until the options are loaded by looking that the loading option is not in the document
    await waitFor(() => {
      expect(loadingOption).not.toBeInTheDocument();
    });

    // We can check that the Select has been updated with the breeds as options
    const breeds = screen.getAllByRole('option');
    expect(breeds).toHaveLength(2);

    // Lets select the golden option
    const goldenOption = screen.getByRole('option', {
      name: /golden/i,
    });
    expect(goldenOption).toBeInTheDocument();

    await userEvent.selectOptions(select, goldenOption);

    // After adding the handler for this API call, we can test the image has been updated
    await waitFor(() =>
      expect(screen.getByRole('img')).toHaveAttribute('src', 'https://dog-by-breed.jpg'),
    );
  });
});
