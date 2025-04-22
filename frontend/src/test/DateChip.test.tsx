import { render, screen} from "@testing-library/react";
import { describe, expect, test } from 'vitest';
import DateChip from "../components/DateChip.tsx";

describe('DateChip component', () => {
    test('renders date chip with correct date format', () => {

        render(<DateChip dateLabel="2025-04-30T00:00:00.000Z" />);

        const titleElement = screen.getByText('30/04/2025');
        expect(titleElement).toBeTruthy();


        const clockElement = screen.getByTestId('ScheduleIcon');
        expect(clockElement).toBeTruthy();

    });

})