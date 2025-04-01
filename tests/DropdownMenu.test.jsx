import { describe, it, expect, vi } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import {mock_data_1,mock_data_2} from "../src/mock_data.jsx";
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

describe("dropdown menu behavior", () => {
  const classDropdown = "{ display: none;}";
  const classVisible = "{ display: grid;}";

  it("dropdown menu toggle close/open behavior", async () => {
    const user = userEvent.setup();
    render(
      <DropdownMenu
        clickImg={true}
        imgCharacters={mock_data_1.picture.characters}
        dropdownMenu={classDropdown}
        visible={classVisible}
      />
    );
    const button = screen.getByText(/tags/i);
    //when render the menu is close
    expect(screen.getByText(/tags/i)).toBeInTheDocument();
    expect(screen.getByRole("menu", { hidden: true })).not.toBeNull();

    // after click the menu is open
    await user.click(button);
    waitFor(() => {
      expect(screen.getByRole("menu", { hidden: true })).toBeNull();
    });

    // after click the menu is close
    await user.click(button);
    waitFor(() => {
      expect(screen.getByRole("menu", { hidden: true })).not.toBeNull();
    });
  });

  it("display options and change selected option", async () => {
    const user = userEvent.setup();
    render(
      <DropdownMenu
        clickImg={true}
        imgCharacters={mock_data_1.picture.characters}
        dropdownMenu={classDropdown}
        visible={classVisible}
      />
    );
    const button = screen.getByText(/tags/i);
    await user.click(button); // menu open
    let length = mock_data_1.picture.characters.length;
    expect(screen.queryAllByRole("option").length).toBe(
      mock_data_1.picture.characters.length
    );
    // the default value for select element is the firs option
    expect(screen.queryByRole("combobox").value).toBe(
      mock_data_1.picture.characters[0].name
    );

    // when select the last option change the combobox value
    await user.selectOptions(
      screen.getByRole("combobox"),
      `${[mock_data_1.picture.characters[length - 1].name]}`
    );
    expect(screen.queryByRole("combobox").value).toBe(
      mock_data_1.picture.characters[length - 1].name
    );
    if (length > 1) {
      expect(
        screen.getByRole("option", {
          name: `${[mock_data_1.picture.characters[0].name]}`,
        }).selected
      ).toBe(false);
    }
  });
});
