import dayjs, {Dayjs} from "dayjs";

export const dateIsInThePast = (date: Dayjs) => {
    const today = dayjs();
    return date.isBefore(today);
}