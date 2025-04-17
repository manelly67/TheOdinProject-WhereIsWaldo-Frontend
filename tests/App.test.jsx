import {  MemoryRouter } from "react-router-dom";
import { describe, it, expect, vi } from "vitest";
import { render, screen, waitFor, act } from "@testing-library/react";
import App from "../src/App.jsx";

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
 //the rerender doesnt work as expected
});
