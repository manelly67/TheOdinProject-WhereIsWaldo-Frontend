import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";

import TagTheChar from "../src/components/TagTheChar.jsx";

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

describe("display the tag of characters", () => {
    const W = 900;
    const H = 500;
    const coords = {x:36,y:138};
   
  it("tags when no characters have been founded", () => {
    const imgCharacters = [
      { id: "char-1", name: "Wally", found: false, x: 0, y: 0 },
      { id: "char-2", name: "The Wizard", found: false, x: 0, y: 0 },
      {
        id: "char-3",
        name: "Courage the Cowardly Dog",
        found: false,
        x: 0,
        y: 0,
      },
    ];

    render(<TagTheChar imgCharacters={imgCharacters} coords={coords} W={W} H={H} />);
    expect(screen.queryAllByRole("tag").length).toBe(0);
  });

  it("tags when 1 character have been founded", () => {
   
    const imgCharacters = [
      { id: "char-1", name: "Wally", found: false, x: 0, y: 0 },
      { id: "char-2", name: "The Wizard", found: false, x: 0, y: 0 },
      {
        id: "char-3",
        name: "Courage the Cowardly Dog",
        found: true,
        x: -0.1586304817,
        y: -0.6217662801,
      },
    ];

    const {container} = render(<TagTheChar imgCharacters={imgCharacters} coords={coords} W={W} H={H} />);
    expect(container).toMatchSnapshot();
    expect(screen.queryAllByRole("tag").length).toBe(1);
    expect(screen.getByText(/Courage the Cowardly Dog/i)).toBeInTheDocument();
    expect(screen.queryByText(/The Wizard/i)).not.toBeInTheDocument();

  });

});
