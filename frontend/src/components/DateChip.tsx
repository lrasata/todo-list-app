import ScheduleIcon from "@mui/icons-material/Schedule";
import {Chip} from "@mui/material";
import dayjs from "dayjs";
import {dateIsInThePast} from "../util/util.ts";

interface Props {
    dateLabel: string;
}

const DateChip = ({dateLabel}: Props) => {
    const isInThePast = dateIsInThePast(dayjs(dateLabel));

    return (<Chip icon={<ScheduleIcon />} label={dayjs(dateLabel).format('DD/MM/YYYY')} color={ isInThePast ? "warning" : "default"}/>);
};

export default DateChip;