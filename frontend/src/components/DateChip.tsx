import ScheduleIcon from "@mui/icons-material/Schedule";
import {Chip} from "@mui/material";
import dayjs from "dayjs";

interface Props {
    dateLabel: string;
}

const DateChip = ({dateLabel}: Props) => {
    return (<Chip icon={<ScheduleIcon />} label={dayjs(dateLabel).format('DD/MM/YYYY')} />);
};

export default DateChip;