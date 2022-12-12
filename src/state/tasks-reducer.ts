import {
    AddTodolistActionType,
    RemoveTodolistActionType,
    SetTodolistActionType
} from './todolists-reducer';
import {TasksStateType} from '../App';
import {TaskStatuses, TaskType, todolistAPI, UpdateDomainTaskType, UpdateTaskType} from "../api/todoist-api";
import {Dispatch} from "redux";
import {AppRootStateType} from "./store";

export type RemoveTaskActionType = {
    type: 'REMOVE-TASK',
    todolistId: string
    taskId: string
}

export type AddTaskActionType = {
    type: 'ADD-TASK',
    task: TaskType
}

export type ChangeTaskStatusActionType = {
    type: 'CHANGE-TASK-STATUS',
    todolistId: string
    taskId: string
    status: TaskStatuses
}

export type ChangeTaskTitleActionType = {
    type: 'UPDATE-TASK',
    todolistId: string
    taskId: string
    model: UpdateTaskType
}
export type SetTasksActionType = {
    type: 'SET-TASKS',
    tasks: Array<TaskType>
    todolistId: string
}

export  type ActionsTypeTasks = RemoveTaskActionType | AddTaskActionType
    | ChangeTaskStatusActionType
    | ChangeTaskTitleActionType
    | AddTodolistActionType
    | RemoveTodolistActionType
    | SetTodolistActionType
    | SetTasksActionType
const initialState: TasksStateType = {}

export const tasksReducer = (state: TasksStateType = initialState, action: ActionsTypeTasks): TasksStateType => {
    switch (action.type) {
        case 'REMOVE-TASK': {
            return {
                ...state,
                [action.todolistId]: state[action.todolistId]
                    .filter(t => t.id !== action.taskId)
            };

        }
        case 'ADD-TASK': {
            return {...state, [action.task.todoListId]: [action.task, ...state[action.task.todoListId]]};
        }
        case 'CHANGE-TASK-STATUS': {
            return {
                ...state,
                [action.todolistId]: state[action.todolistId].map(t => t.id === action.taskId ? {
                    ...t,
                    status: action.status
                } : t)
            };
        }
        case 'UPDATE-TASK': {
            return {
                ...state,
                [action.todolistId]: state[action.todolistId].map(t => t.id === action.taskId ? {
                    ...t,
                    ...action.model
                } : t)
            };
        }
        case 'ADD-TODOLIST': {
            return {
                ...state,
                [action.todolist.id]: []
            }
        }
        case 'REMOVE-TODOLIST': {
            const copyState = {...state};
            delete copyState[action.id];
            return copyState;
        }
        case "SET-TODOLISTS": {
            const copystate = {...state}
            action.todolist.forEach(e => {
                copystate[e.id] = []
            })
            return copystate
        }
        case "SET-TASKS": {
            const copyState = {...state}
            copyState[action.todolistId] = action.tasks
            return copyState
        }
        default:
            return state;
    }
}

export const removeTaskAC = (taskId: string, todolistId: string): RemoveTaskActionType => {
    return {type: 'REMOVE-TASK', taskId: taskId, todolistId: todolistId}
}
export const addTaskAC = (task: TaskType): AddTaskActionType => {
    return {type: 'ADD-TASK', task}
}
export const changeTaskStatusAC = (taskId: string, status: TaskStatuses, todolistId: string): ChangeTaskStatusActionType => {
    return {type: 'CHANGE-TASK-STATUS', status, todolistId, taskId}
}
export const updateTaskAC = (taskId: string, model:UpdateTaskType, todolistId: string): ChangeTaskTitleActionType => {
    return {type: 'UPDATE-TASK', model, todolistId, taskId}
}
export const setTasksAC = (tasks: Array<TaskType>, todolistId: string): SetTasksActionType => {
    return {type: "SET-TASKS", tasks, todolistId}
}

export const fetchTaskTC = (todolistID: string) => {
    return (dispatch: Dispatch) => {
        todolistAPI.getTasks(todolistID)
            .then((res) => {
                dispatch(setTasksAC(res.data.items, todolistID))
            })
    }
}

export const removeTaskTC = (todolistID: string, taskid: string) => {
    return (dispatch: Dispatch) => {
        todolistAPI.deleteTask(todolistID, taskid)
            .then((res) => {
                dispatch(removeTaskAC(taskid, todolistID))
            })
    }
}
export const addTaskTC = (title: string, todolistID: string) => {
    return (dispatch: Dispatch) => {
        todolistAPI.addTask(todolistID, title)
            .then((res) => {
                dispatch(addTaskAC(res.data.data.items))
            })
    }
}
export const updateTaskTC = (taskId: string, model: UpdateDomainTaskType, todolistId: string) => {
    return (dispatch: Dispatch, getState: () => AppRootStateType) => {
        const state = getState()
        let task = state.tasks[todolistId].find(e => e.id === taskId)
        if (!task) {
            console.warn(`task wasnt found`)
            return
        }
        const apiModel: UpdateTaskType = {
            deadline: task.deadline,
            description: task.description,
            priority: task.priority,
            startDate: task.startDate,
            completed: task.completed,
            title: task.title,
            status: task.status,
            ...model
        }
        todolistAPI.upDateTask(todolistId, taskId, apiModel)
            .then((res) => {
                dispatch(updateTaskAC(taskId, apiModel, todolistId))
            })
    }
}

