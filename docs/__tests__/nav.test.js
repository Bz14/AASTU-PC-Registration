// tests/Navbar.test.js
import { render, screen } from "@testing-library/react";
import { test, expect } from "@jest/globals";
import Navbar from "../src/Navbar"; // Adjust the import path as needed.

test("renders the Navbar component", () => {
  render(<Navbar />);
  const logo = screen.getByAltText("");
  expect(logo).toBeInTheDocument();
});
