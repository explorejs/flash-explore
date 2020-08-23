import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { render } from "@testing-library/react";
import Header from "../components/layout/Header";

describe("Header", () => {
  test("renders and renders site title", () => {
    const { getByText } = render(
      <Router>
        <Header />
      </Router>
    );
    expect(getByText("Flash Explorer")).toBeTruthy();
  });
});
