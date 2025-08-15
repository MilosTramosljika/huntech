import { render, screen } from "@testing-library/react";
import App from "./App";
// Import test from Jest if not available globally

test("renders learn react link", () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
