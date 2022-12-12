import {
    AddTodolistActionType,
    RemoveTodolistActionType,
    SetTodolistActionType
} from './todolists-reducer';
import {TasksStateType} from '../../app/App';
import { TaskType, todolistAPI, UpdateTaskType} from "../../api/todoist-api";
import {Dispatch} from "redux";
import {AppRootStateType} from "../../app/store";

const initialState: TasksStateType = {}

export const tasksReducer = (state: TasksStateType = initialState, action: ActionsTypeTasks): TasksStateType => {
    switch (action.type) {
        case 'REMOVE-TASK':
            return {
                ...state, [action.todolistId]: state[action.todolistId]
                    .filter(t => t.id !== action.taskId)
            }
        case 'ADD-TASK':
            return {...state, [action.task.todoListId]: [action.task, ...state[action.task.todoListId]]};
        case 'UPDATE-TASK':
            return {
                ...state, [action.todolistId]: state[action.todolistId].map(t => t.id === action.taskId
                    ? {...t, ...action.model}
                    : t)
            }
        case 'ADD-TODOLIST':
            return {...state, [action.todolist.id]: []}
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
        case "SET-TASKS":
            return {...state, [action.todolistId]: action.tasks}
        default:
            return state;
    }
}
//actions
export const removeTaskAC = (taskId: string, todolistId: string) => {
    return {type: 'REMOVE-TASK', taskId, todolistId} as const
}
export const addTaskAC = (task: TaskType) => {
    return {type: 'ADD-TASK', task} as const
}
export const updateTaskAC = (taskId: string, model: UpdateTaskType, todolistId: string) => {
    return {type: 'UPDATE-TASK', model, todolistId, taskId} as const
}
export const setTasksAC = (tasks: Array<TaskType>, todolistId: string) => {
    return {type: "SET-TASKS", tasks, todolistId} as const
}

//thunks
export const fetchTaskTC = (todolistID: string) => (dispatch: Dispatch<ActionsTypeTasks>) => {
    todolistAPI.getTasks(todolistID)
        .then((res) => {
            dispatch(setTasksAC(res.data.items, todolistID))
        })
}
export const removeTaskTC = (todolistID: string, taskid: string) => (dispatch: Dispatch<ActionsTypeTasks>) => {
    todolistAPI.deleteTask(todolistID, taskid)
        .then((res) => {
            dispatch(removeTaskAC(taskid, todolistID))
        })
}
export const addTaskTC = (title: string, todolistID: string) => (dispatch: Dispatch<ActionsTypeTasks>) => {
    todolistAPI.addTask(todolistID, title)
        .then((res) => {
            dispatch(addTaskAC(res.data.data.items))
        })
}
export const updateTaskTC = (taskId: string, model: UpdateDomainTaskType, todolistId: string) =>
    (dispatch: Dispatch<ActionsTypeTasks>, getState: () => AppRootStateType) => {
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


// types
export  type ActionsTypeTasks = ReturnType<typeof removeTaskAC>
    | ReturnType<typeof addTaskAC>
    | ReturnType<typeof updateTaskAC>
    | AddTodolistActionType
    | RemoveTodolistActionType
    | SetTodolistActionType
    | ReturnType<typeof setTasksAC>

type UpdateDomainTaskType = {
    title?: string
    description?: string
    completed?: boolean
    status?: number
    priority?: number
    startDate?: string
    deadline?: string
}