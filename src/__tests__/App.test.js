import React from "react";
import { render } from "@testing-library/react";
import App from "../App";

describe("App renders home page first", () => {
  test("renders Home page first", () => {
    const { getByText } = render(<App />);
    expect(getByText("Welcome")).toBeTruthy();
  });
});
