import { render, screen } from "@testing-library/react";
import { describe, expect, test, vi } from "vitest";
import DrawerAppBar from "../components/DrawerAppBar.tsx";
import { userEvent } from "@testing-library/user-event";

const navItems = [
  {
    title: "Home",
    url: "/",
  },
  {
    title: "Overdue tasks",
    url: "/overdue-tasks",
  },
  {
    title: "Log out",
    url: "/log-out",
  },
];

describe("DrawerAppBar component", () => {
  test("renders with all menu items", () => {
    render(
      <DrawerAppBar
        navItems={navItems}
        handleOnClickNavigate={() => {}}
        handleOnClickLogout={() => {}}
      />,
    );

    const homeButton = screen.getByRole("button", {
      name: /Home/i,
    });
    expect(homeButton).toBeTruthy();

    const overdueButton = screen.getByRole("button", {
      name: /Overdue tasks/i,
    });
    expect(overdueButton).toBeTruthy();

    const logoutButton = screen.getByRole("button", {
      name: /Log out/i,
    });
    expect(logoutButton).toBeTruthy();
  });

  test("renders menu items with correct onClick function ", async () => {
    const user = userEvent.setup();
    const handleOnClickNavigate = vi.fn();
    render(
      <DrawerAppBar
        navItems={navItems}
        handleOnClickNavigate={handleOnClickNavigate}
        handleOnClickLogout={() => {}}
      />,
    );

    const overdueButton = screen.getByRole("button", {
      name: /Overdue tasks/i,
    });
    expect(overdueButton).toBeTruthy();

    await user.click(overdueButton);

    expect(handleOnClickNavigate).toHaveBeenCalledOnce();
  });

  test("renders menu items with correct log out function ", async () => {
    const user = userEvent.setup();
    const handleOnClickNavigate = vi.fn();
    const handleOnClickLogout = vi.fn();
    render(
      <DrawerAppBar
        navItems={navItems}
        handleOnClickNavigate={handleOnClickNavigate}
        handleOnClickLogout={handleOnClickLogout}
      />,
    );

    const logoutButton = screen.getByRole("button", {
      name: /Log out/i,
    });
    expect(logoutButton).toBeTruthy();

    await user.click(logoutButton);

    expect(handleOnClickLogout).toHaveBeenCalledOnce();
  });
});
