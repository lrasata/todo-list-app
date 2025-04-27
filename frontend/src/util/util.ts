import dayjs, {Dayjs} from "dayjs";
import {ITask} from "../types/types.ts";
import utc from 'dayjs/plugin/utc';
dayjs.extend(utc);

export const dateIsInThePast = (date: Dayjs) => {
    const today = dayjs().utc();
    return dayjs.utc(date).isBefore(today, 'day');
}

export const dateIsToday = (date: Dayjs) => {
    return dayjs.utc(date).isSame(dayjs().utc(), 'day');
}

export const findAndUpdateTask = (task: ITask, array: ITask[]): ITask[] => {
    let index = array.findIndex( (item: ITask) => item._id === task._id)
    if (index >= 0) {
        array[index] = {...task}
    }
    return array;
}

export const removeIfExistTask = (task: ITask, array: ITask[]) => {
    return array.filter( (item: ITask) => item._id !== task._id)
}

export const formatDate = (date: Dayjs): string => {
    // get the date only
    const dateOnly = dayjs(date).format('YYYY-MM-DD');
    return dayjs.utc(dateOnly).startOf('day').toISOString(); // transform in UTC midnight without timezone math ex: 2025-04-27T00:00:00.000Z (for the backend to work)
}