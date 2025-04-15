import {
  MemoryRouter,
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import { describe, it, expect } from "vitest";
import { render, screen, waitFor, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import toHaveStyle from "@testing-library/jest-dom";
import mockdata from "../src/mock_data.jsx";

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

    expect(screen.getAllByRole("button").length).toBe(1);
  });

  it("should display fetched data", async () => {
    // a rather simple mock, you might use something more advanced for your needs
    const mock_getPlayer = vi.fn();
    mock_getPlayer({
      message: 'new player created',
      player: {
        id: '11c10925-dd64-4cf3-96f0-c7d805b092a3',
        playername: 'ANONIMOUS',
        sessionId: 'XreW60dmse2ueeS5MNU5cB4ISxiPM9Xe',
        Game: []
      }
    });
    const mock_update = vi.fn();

    let resolve;
    function fetch() {
      return new Promise((_resolve) => {
        resolve = _resolve;
      });
    }

    const {rerender} =  render(
    <MemoryRouter initialEntries={["/"]}>
          <App
            getPlayer={mock_getPlayer}
            updatePlayerObj={mock_update}
            playerId={resolve}
          />
        </MemoryRouter>
      );

    await act(async () => {
     [resolve] = await mock_getPlayer.mock.calls[0];
    });
    console.log(resolve); 
    rerender(
      <MemoryRouter initialEntries={["/"]}>
        <App
          getPlayer={mock_getPlayer}
          updatePlayerObj={mock_update}
          playerId={resolve}
        />
      </MemoryRouter>
    );
  });
  // eL RERENDER NO ESTA FUNCIONANDO Y NO ACTUALIZA EL DOM
});

/* ESTE TEST CAMBIARLO CUANDO SE HAYA TRAIDO EL USUARIO DE LA PAGINA WEB
 
 it("navigate to drawing board", async () => {
    const router = createBrowserRouter(routes);
    render(<RouterProvider router={router} />);

    const user = userEvent.setup();

    expect(screen.getByText(/Waldo In The Galactic City/i)).toBeInTheDocument();
    const buttons = screen.getAllByRole("button");
    const [,second,third] = buttons;

    await user.click(second);

    expect(
      screen.getByAltText(/Waldo In The Galactic City/i)
    ).toBeInTheDocument();

    const homeLink = screen.getByText(/home/i);
    // back to home
    await user.click(homeLink);
    // select other image
    await user.click(third);

    waitFor(()=>{
      expect(
        screen.getByAltText(/Oh! Waldo is not here/i)
      ).toBeInTheDocument();
  
    });

  });
}); */
