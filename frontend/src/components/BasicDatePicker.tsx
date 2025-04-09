import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import {useMediaQuery, useTheme} from "@mui/material";
import {Dayjs} from "dayjs";

interface Props {
    value?: Dayjs;
    onChange: (date: Dayjs | null ) => void;
}
const BasicDatePicker = ({ value, onChange }: Props ) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={['DatePicker']}>
                <DatePicker format="DD/MM/YYYY" value={value} label="Task date" sx={{ maxWidth: isMobile ? "100%": "20px"}} onChange={onChange} />
            </DemoContainer>
        </LocalizationProvider>
    );
}

export default BasicDatePicker;