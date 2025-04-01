import { describe, it, expect, vi } from "vitest";
import { render, screen} from "@testing-library/react";
import {
  MemoryRouter,
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import userEvent from "@testing-library/user-event";


import routes from "../src/components/routes.jsx";
import {mock_data_1, mock_data_2} from "../src/mock_data.jsx";
import DrawingBoard from "../src/components/DrawingBoard";
import DropdownMenu from "../src/components/DropdownMenu.jsx";

describe("simple use of mock fuction", () => {
  it("mock function", () => {
    const fn = vi.fn();
    fn("hello world");

    expect(fn.mock.calls[0]).toEqual(["hello world"]);

    const market = {
      getApples: () => 100,
    };

    const getApplesSpy = vi.spyOn(market, "getApples");
    market.getApples();

    expect(getApplesSpy.mock.calls.length).toEqual(1);
    expect(market.getApples()).toBe(100);
  });
});

describe("display DrawingBoard", () => {
  it("display the page when location.state is null", () => {
    const { container } = render(
      <MemoryRouter initialEntries={["/board"]}>
        <DrawingBoard />
      </MemoryRouter>
    );
    expect(container).toMatchSnapshot();
    expect(
      screen.getByText(
        /Dear user, this is a study project, please wait 1 minute for the server to wake up./i
      )
    ).toBeInTheDocument();
  });

  it("display drawing board when location.state is not null", async () => {
    const router = createBrowserRouter(routes);
    render(<RouterProvider router={router} />);
    const user = userEvent.setup();

    const buttons = screen.getAllByRole("button");
    const button = buttons[1]; // choose the button for galactic city

    await user.click(button);

    expect(
      screen.getByAltText(/Waldo In The Galactic City/i)
    ).toBeInTheDocument();
  });

  it("render behavior when the click is inside the image", async () => {
    const router = createBrowserRouter(routes);
    render(<RouterProvider router={router} />);
    const user = userEvent.setup();

    const buttons = screen.getAllByRole("button");
    const button = buttons[1];
    await user.click(button);  // display the image
    
    // when click Img is true
    render(
      <DropdownMenu
        clickImg={true}
        imgCharacters={mock_data_1.picture.characters}
      />
    );
    expect(screen.getByText(/tags/i)).toBeInTheDocument();
  });

  it("render behavior when the click is outside the image", async () => {
    const router = createBrowserRouter(routes);
    render(<RouterProvider router={router} />);
    const user = userEvent.setup();
    const buttons = screen.getAllByRole("button");
    const button = buttons[1];
    await user.click(button);  // display the image

    // when click Img is false
    render(
      <DropdownMenu
        clickImg={false}
        imgCharacters={mock_data_1.picture.characters}
      />
    );
    expect(screen.queryByText(/tags/i)).not.toBeInTheDocument();


  });
});
