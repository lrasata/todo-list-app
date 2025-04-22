import { render, screen} from "@testing-library/react";
import { describe, expect, test } from 'vitest';
import Dialog from "../components/Dialog";

const dialogData = {
    title: 'Title of dialog',
    content: <div>Dialog content</div>
}

describe('Dialog component', () => {
    test('renders dialog component with correct data', () => {

        render(<Dialog open={true} title={dialogData.title} onClose={() => {}} content={dialogData.content} />);

        const titleElement = screen.getByText('Title of dialog');
        expect(titleElement).toBeTruthy();

        const contentElement = screen.getByText('Dialog content');
        expect(contentElement).toBeTruthy();

        const dialogElement = screen.getByRole('dialog');
        expect(dialogElement).toBeTruthy();

        const closeElement = screen.getByTestId('CloseIcon');
        expect(closeElement).toBeTruthy();

    });

})