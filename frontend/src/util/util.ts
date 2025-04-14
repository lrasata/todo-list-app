import dayjs, {Dayjs} from "dayjs";
import {ITask} from "../types/types.ts";

export const dateIsInThePast = (date: Dayjs) => {
    const today = dayjs();
    return date.isBefore(today, 'date');
}

export const dateIsToday = (date: Dayjs) => {
    return date.isSame(dayjs(), 'date');
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
