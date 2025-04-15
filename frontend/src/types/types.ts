import {Dayjs} from "dayjs";

export interface ICategory {
    _id: string;
    name: string;
    colour: string;
}

export interface ITask {
    _id: string;
    title: string;
    completed: boolean;
    taskDate: Dayjs | string | null;
    categoryId?: string;
}

