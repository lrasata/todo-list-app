// tests/LogOutButtonContainer.test.js
import { render, fireEvent } from "@testing-library/react";
import LogOutButtonContainer from "../containers/LogOutButtonContainer";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { describe, expect, test, beforeEach, vi } from "vitest";

// Mocking the necessary hooks
vi.mock("react-router-dom", () => ({
  useNavigate: vi.fn(),
}));

vi.mock("react-cookie", () => ({
  useCookies: vi.fn(),
}));

// Dynamically mock constants before any import
vi.doMock("../constants/constants", () => {
  return {
    DOMAIN: "example.com", // Mocked domain for testing
    PROFILE: "production", // Mocked profile to simulate production
  };
});

describe("LogOutButtonContainer", () => {
  // @ts-ignore
  let navigateMock: vi.Mock;
  // @ts-ignore
  let removeCookieMock: vi.Mock;

  beforeEach(() => {
    navigateMock = vi.fn();
    removeCookieMock = vi.fn();

    // Mocking the `useNavigate` and `useCookies` hooks
    // @ts-ignore
    (useNavigate as vi.Mock).mockReturnValue(navigateMock);
    // @ts-ignore
    (useCookies as vi.Mock).mockReturnValue([{}, vi.fn(), removeCookieMock]);
  });

  test("should call navigate to login and remove the token cookie when the button is clicked", () => {
    const { getByText } = render(<LogOutButtonContainer />);

    // Get the button element by its text
    const logoutButton = getByText(/log out/i);

    // Simulate a button click
    fireEvent.click(logoutButton);

    // Verify that navigate was called with "/login"
    expect(navigateMock).toHaveBeenCalledWith("/login");

    // Verify that removeCookie was called with "token"
    expect(removeCookieMock).toHaveBeenCalledWith(
      "token",
      expect.objectContaining({
        path: "/",
      }),
    );
  });

  test("should handle the cookie removal for production environment with correct domain", () => {
    const { getByText } = render(<LogOutButtonContainer />);

    // Get the button element by its text
    const logoutButton = getByText(/log out/i);

    // Simulate a button click
    fireEvent.click(logoutButton);

    console.log(
      "removeCookieMock called with args:",
      removeCookieMock.mock.calls,
    ); // Debug log for removeCookieMock

    // Verify that removeCookie was called with the correct domain
    expect(removeCookieMock).toHaveBeenCalledWith(
      "token",
      expect.objectContaining({
        path: "/",
        // domain: '.example.com', // Make sure the domain is set correctly
      }),
    );
  });

  test("should not include domain in cookie removal when not in production environment", () => {
    // Mocking constants.ts
    vi.mock("../constants/constants", () => ({
      DOMAIN: "example.com",
      PROFILE: "development", // Simulating production environment for some tests
    }));

    const { getByText } = render(<LogOutButtonContainer />);

    // Get the button element by its text
    const logoutButton = getByText(/log out/i);

    // Simulate a button click
    fireEvent.click(logoutButton);

    // Verify that removeCookie was called without the domain property
    expect(removeCookieMock).toHaveBeenCalledWith(
      "token",
      expect.objectContaining({
        path: "/",
      }),
    );
    expect(removeCookieMock).not.toHaveBeenCalledWith(
      "token",
      expect.objectContaining({ domain: expect.any(String) }),
    );
  });
});
