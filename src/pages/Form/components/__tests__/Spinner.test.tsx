import { render, screen } from "@testing-library/react";

import Spinner from "../Spinner";

describe("Spinner", () => {
  it("renders", () => {
    render(<Spinner />);

    const spinner = screen.getByRole("status", {
      name: /loading/i,
    });
    expect(spinner).toBeInTheDocument();
  });

  it("has the correct ARIA attributes", () => {
    render(<Spinner />);

    const spinner = screen.getByRole("status");
    expect(spinner).toHaveAttribute("aria-busy", "true");
    expect(spinner).toHaveAttribute("aria-live", "polite");
  });
});
