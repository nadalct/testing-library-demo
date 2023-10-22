import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';

import Form from '../Form';

/**
 * Testing Library is a library that helps you to test your UI from the user's perspective.
 *
 * About Queries: https://testing-library.com/docs/queries/about
 * About userEvent: https://testing-library.com/docs/user-event/intro
 */

describe('Form', () => {
  it('renders', () => {
    render(<Form />);

    // const email = screen.getByTestId("email");
    // const email = screen.getByText("Email address");
    // const email = screen.getByPlaceholderText('Enter email');
    // const email = screen.getByLabelText('Email address');

    // Using getByRole is the advised way to get elements as it takes into account
    // the accessibility of the element. It also makes the test more resilient to
    // changes in the UI.
    const email = screen.getByRole('textbox', { name: /email address/i });
    expect(email).toBeInTheDocument();

    // An input type password does not have a role by a security reason.
    // Assistive technologies should not be able to read the value of the password.
    // So we can use the label of the input to find it.
    const password = screen.getByLabelText('Password');
    expect(password).toBeInTheDocument();

    const terms = screen.getByRole('checkbox', {
      name: /i accept the terms and conditions/i,
    });
    expect(terms).toBeInTheDocument();

    const submit = screen.getByRole('button', { name: /submit/i });
    expect(submit).toBeInTheDocument();
  });

  it('can be submitted', async () => {
    render(<Form />);

    const email = screen.getByRole('textbox', { name: /email address/i });
    await userEvent.type(email, 'test@test.com');
    expect(email).toHaveValue('test@test.com');

    const password = screen.getByLabelText('Password');
    await userEvent.type(password, '1234');
    expect(password).toHaveValue('1234');

    // Aan example using a variable
    // const passwordText = "1234";
    // await userEvent.type(password, passwordText);
    // expect(password).toHaveValue(passwordText);

    const terms = screen.getByRole('checkbox', {
      name: /i accept the terms and conditions/i,
    });
    await userEvent.click(terms);
    expect(terms).toBeChecked();

    const submit = screen.getByRole('button', { name: /submit/i });
    await userEvent.click(submit);

    // Using findBy instead of getBy
    const spinner = await screen.findByRole('status', {
      name: /loading/i,
    });
    expect(spinner).toBeInTheDocument();

    // Using findBy instead of getBy again
    const message = await screen.findByRole('heading', {
      name: /you are logged in!/i,
    });
    expect(message).toBeInTheDocument();

    //TODO: This will fail
    // Using getBy instead of findBy
    // const thanksString = screen.getByText(/thanks for registering/i);
    // expect(thanksString).toBeInTheDocument();

    // Let's create a method to retrieve the element with the text "thanks for registering"
    // Queries accept functions
    const thanksString = screen.getByText((_content, node) => {
      if (!node) {
        return false;
      }

      // Helper function to check if the node has the text that we are looking for
      const hasText = (node: Element): boolean => node.textContent === 'Thanks for registering';

      const nodeHasText = node ? hasText(node) : false;

      // If the node has text, we want to make sure that none of its children have
      // the same text as it's parent. This way we are making sure that the node
      // we are returning for is the only one with that text.
      const childrenDontHaveText = Array.from(node.children).every(
        (child) => !hasText(child as HTMLElement),
      );

      return nodeHasText && childrenDontHaveText;
    });

    expect(thanksString).toBeInTheDocument();
  });

  it('if required fields are not filled, the form should not be submitted', async () => {
    render(<Form />);

    const submit = screen.getByRole('button', { name: /submit/i });
    await userEvent.click(submit);

    // getBy returns the matching node or throws an error if no elements match or if more than one match is found
    // findBy returns a promise which resolves when an element is found which matches the given query. The promise is rejected if no element is found or if more than one element is found after a default timeout of 1000ms.
    // queryBy returns the matching node or null if no elements match
    const spinner = screen.queryByRole('status', {
      name: /loading/i,
    });
    expect(spinner).not.toBeInTheDocument();

    const message = screen.queryByRole('heading', {
      name: /you are logged in!/i,
    });
    expect(message).not.toBeInTheDocument();
  });
});
