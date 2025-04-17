import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { act } from "react";

import Message from "../src/components/Message";

describe("display message behaviour", () => {
  it("display message object", () => {
    const messageObj = { round_answer: "INCORRECT", message: "WRONG COORDS" };

    render(<Message messageObj={messageObj} />);
    expect(screen.queryAllByRole("message").length).toBe(1);
    expect(screen.getByText(messageObj.message)).toBeInTheDocument();
  });

  it("after timer, the function to setMessageObj null will be called", () => {
    const setMessageObj = vi.fn();
    vi.useFakeTimers();
    const messageObj = { round_answer: "INCORRECT", message: "WRONG COORDS" };
    const el = document.createElement("div");
    act(() => {
      render(
        <Message messageObj={messageObj} setMessageObj={setMessageObj} />,
        el
      );
    });
    expect(screen.queryAllByRole("message").length).toBe(1);
    vi.runAllTimers();
    expect(setMessageObj).toHaveBeenCalled();
  });
});
