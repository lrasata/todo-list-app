import dayjs, {Dayjs} from "dayjs";

export const dateIsInThePast = (date: Dayjs) => {
    const today = dayjs();
    return date.isBefore(today);
}

export const dateIsToday = (date: Dayjs) => {
    return dayjs(date).isSame(dayjs());
}