import React from "react";
import { render, screen } from "@testing-library/react";
import Avatar from "../components/Avatar";

// Mock react-bootstrap/Image
jest.mock("react-bootstrap/Image", () => (props) => {
  // eslint-disable-next-line no-unused-vars
  const { rounded, fluid, ...rest } = props;
  return <img {...rest} />;
});

describe("Avatar component", () => {
  it("renders with correct props", () => {
    render(
      <Avatar
        avatarURL="http://example.com/avatar.png"
        className="test-class"
      />
    );
    const img = screen.getByRole("img");
    expect(img).toHaveAttribute("src", "http://example.com/avatar.png");
    expect(img).toHaveAttribute("width", "40");
    expect(img).toHaveAttribute("height", "40");
    expect(img).toHaveClass("test-class");
  });
});
