import { render, screen } from "@testing-library/react";
import { describe, expect, test, vi } from "vitest";
import TodoListContainer from "../containers/TodoListContainer.tsx";
import { Provider, useDispatch } from "react-redux";
import configureMockStore from "redux-mock-store";

const tasks = [
  {
    _id: "123",
    title: "Mock task",
    completed: false,
    taskDate: "2025-04-30T00:00:00.000Z",
    category: {
      categoryId: "123",
      name: "category 1",
      colour: "#fffff",
    },
  },
];

vi.mock("react-redux", async () => {
  const actual = await vi.importActual("react-redux");
  return {
    ...actual,
    useDispatch: vi.fn(),
  };
});

const mockStore = configureMockStore();
const store = mockStore({
  categories: [{ _id: "1", text: "finance", colour: "#fffff" }],
});

describe("TodoListContainer component", () => {
  test("renders correct data and date", () => {
    const mockDispatch = vi.fn();
    // @ts-ignore
    (useDispatch as vi.Mock).mockReturnValue(mockDispatch); // Mocking useDispatch

    render(
      <Provider store={store}>
        <TodoListContainer tasks={tasks} displayDate={true} />
      </Provider>,
    );

    const titleElement = screen.getByText("Mock task");
    expect(titleElement).toBeTruthy();

    const taskDateElement = screen.getByText("30/04/2025");
    expect(taskDateElement).toBeTruthy();
  });
  test("renders correct data without date", () => {
    const mockDispatch = vi.fn();
    // @ts-ignore
    (useDispatch as vi.Mock).mockReturnValue(mockDispatch); // Mocking useDispatch

    render(
      <Provider store={store}>
        <TodoListContainer tasks={tasks} displayDate={false} />
      </Provider>,
    );

    const titleElement = screen.getByText("Mock task");
    expect(titleElement).toBeTruthy();

    const taskDateElement = screen.queryByText("30/04/2025");
    expect(taskDateElement).toBeFalsy();
  });
});
