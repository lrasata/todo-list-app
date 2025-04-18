import {render, screen} from "@testing-library/react";
import {describe, expect, test} from 'vitest';
import TaskCardContent from "../components/TaskCardContent.tsx";

const taskData = {
    task: {
        _id: "123",
        title: "task",
        completed: false,
        taskDate: "2025-04-30T00:00:00.000Z",
        category: {
            categoryId: "123",
            name: "category 1",
            colour: "#fffff"
        }
    },
    displayDate: true,
    updateTask: () => {},
    startEditing: () => {},
    deleteTask: () => {},
    setEditingTitle: () => {},
    setEditingTaskDate: () => {},
    setEditingCategoryId: () => {}
}
describe('TaskCardContent component', () => {
    test('renders correct data and date', () => {

        render(<TaskCardContent {...taskData} />);

        const titleElement = screen.getByText('task');
        expect(titleElement).toBeTruthy();

        const taskDateElement = screen.getByText('30/04/2025');
        expect(taskDateElement).toBeTruthy();

        const categoryElement = screen.getByText('category 1');
        expect(categoryElement).toBeTruthy();

    });

    test('renders correct data without date', () => {

        render(<TaskCardContent {...taskData} displayDate={false}/>);

        const titleElement = screen.getByText('task');
        expect(titleElement).toBeTruthy();

        const categoryElement = screen.getByText('category 1');
        expect(categoryElement).toBeTruthy();

        const taskDateElement = screen.queryByText('30/04/2025');
        expect(taskDateElement).toBeFalsy();

    });

    test('renders correct data without category', () => {
        const taskWithoutCategory = {
            ...taskData, task: {
                _id: "123",
                title: "task",
                completed: false,
                taskDate: "2025-04-30T00:00:00.000Z",
                category: undefined
            },
        }

        render(<TaskCardContent {...taskWithoutCategory} />);

        const titleElement = screen.getByText('task');
        expect(titleElement).toBeTruthy();

        const categoryElement = screen.queryByText('category 1');
        expect(categoryElement).toBeFalsy();

    });

})