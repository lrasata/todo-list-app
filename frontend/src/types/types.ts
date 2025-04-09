import {Dayjs} from "dayjs";

export interface ITask {
    _id: string;
    title: string;
    completed: boolean;
    taskDate: Dayjs | string | null;
}