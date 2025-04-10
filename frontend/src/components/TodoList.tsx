import React from "react";
import {Card} from "@mui/material";
import {ITask} from "../types/types.ts";
import {Dayjs} from 'dayjs';
import TaskCardContent from "./TaskCardContent.tsx";
import TaskCardContentEdit from "./TaskCardContentEdit.tsx";


interface ITodoList {
    tasks: ITask[];
    deleteTask: (id: string) => void;
    updateTask: (id: string, updatedTask: Partial<ITask>) => void;
    editingTitle: string;
    setEditingTitle: (title: string) => void;
    editingTaskDate: Dayjs | null;
    setEditingTaskDate: (date: Dayjs) => void;
    editingTaskId: string | null;
    setEditingTaskId: (id: string | null) => void;
    startEditing: (id: string) => void;
    handleTitleEditChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleTaskDateEditChange: (date: Dayjs | null) => void;
}


const TodoList = ({
                      tasks,
                      deleteTask,
                      updateTask,
                      editingTitle,
                      setEditingTitle,
                      editingTaskDate,
                      setEditingTaskDate,
                      editingTaskId,
                      setEditingTaskId,
                      startEditing,
                      handleTitleEditChange,
                      handleTaskDateEditChange,
                  }: ITodoList) => {
    // TODO refactor to avoid props drilling
    return (
        <>
            {tasks.map((task) => {
                return <Card key={task._id} sx={{my: 2, padding: 1}}>
                    {editingTaskId === task._id ? (
                        <TaskCardContentEdit task={task} editingTitle={editingTitle} editingTaskDate={editingTaskDate}
                                             updateTask={updateTask} setEditingTaskId={setEditingTaskId}
                                             handleTitleEditChange={handleTitleEditChange}
                                             handleTaskDateEditChange={handleTaskDateEditChange}/>

                    ) : (<TaskCardContent task={task}
                                          updateTask={updateTask}
                                          startEditing={startEditing}
                                          deleteTask={deleteTask}
                                          setEditingTitle={setEditingTitle} setEditingTaskDate={setEditingTaskDate}/>
                    )}
                </Card>
            })}
        </>
    );
};

export default TodoList;