import React from "react";
import { MemoryRouter } from "react-router-dom";
import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import toHaveStyle from "@testing-library/jest-dom";
import App from "./App.jsx";


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

 

});