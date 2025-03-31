import {
  MemoryRouter,
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { describe, it, expect} from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import toHaveStyle from "@testing-library/jest-dom";

import App from "../src/App.jsx";
import routes from "../src/components/routes.jsx";

describe("App Component", () => {
  it("display the page", () => {
    const { container } = render(
      <MemoryRouter initialEntries={["/"]}>
        <App />
      </MemoryRouter>
    );
    expect(container).toMatchSnapshot();

    expect(screen.getAllByRole("button").length).toBe(3);
  });

  it("navigate to drawing board", async () => {
    const router = createBrowserRouter(routes);
    render(<RouterProvider router={router} />);
    const user = userEvent.setup();

    expect(screen.getByText(/Waldo In The Galactic City/i)).toBeInTheDocument();
    const buttons = screen.getAllByRole("button");
    const button = buttons[1];

    await user.click(button);

    expect(
      screen.getByAltText(/Waldo In The Galactic City/i)
    ).toBeInTheDocument();
  });
});
